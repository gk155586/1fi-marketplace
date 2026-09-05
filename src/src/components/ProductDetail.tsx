"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant, EmiPlan } from "@/types";
import { formatINR } from "@/lib/utils";
import ProceedModal from "@/components/ProceedModal";
import TeardownExplodedView from "@/components/TeardownExplodedView";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ChevronRight,
  Flame,
  Star,
  CheckCircle2,
  Lock,
  ChevronDown,
  Check,
} from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [variants, setVariants] = useState<ProductVariant[]>(product.variants);

  // Preserve and restore scroll position on page refresh
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const key = `1fi_prod_scroll_${product.slug}`;
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const targetY = parseInt(saved, 10);
      if (!isNaN(targetY) && targetY > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
        });
      }
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      sessionStorage.setItem(key, currentScroll.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [product.slug]);

  const defaultVariant = useMemo(() => {
    return variants.find((v) => v.isDefault) || variants[0];
  }, [variants]);

  const [selectedColor, setSelectedColor] = useState<string>(
    () => defaultVariant?.colorName || variants[0]?.colorName || ""
  );

  const [selectedStorage, setSelectedStorage] = useState<string>(
    () => defaultVariant?.storage || variants[0]?.storage || ""
  );

  const availableColors = useMemo(() => {
    const map = new Map<string, { colorName: string; colorHex: string; imageUrl: string }>();
    variants.forEach((v) => {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, { colorName: v.colorName, colorHex: v.colorHex, imageUrl: v.imageUrl });
      }
    });
    return Array.from(map.values());
  }, [variants]);

  const availableStorages = useMemo(() => {
    const storages = new Set<string>();
    variants
      .filter((v) => v.colorName === selectedColor)
      .forEach((v) => storages.add(v.storage));
    const list = Array.from(storages);
    return list.length > 0 ? list : [defaultVariant?.storage || ""];
  }, [variants, selectedColor, defaultVariant]);

  const currentVariant = useMemo(() => {
    const exact = variants.find(
      (v) => v.colorName === selectedColor && v.storage === selectedStorage
    );
    if (exact) return exact;

    const colorOnly = variants.find((v) => v.colorName === selectedColor);
    if (colorOnly) return colorOnly;

    return defaultVariant || variants[0];
  }, [variants, selectedColor, selectedStorage, defaultVariant]);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const currentGalleryImages = useMemo(() => {
    if (!currentVariant) return [];
    let list: string[] = [currentVariant.imageUrl];
    if (currentVariant.galleryImages) {
      try {
        const parsed = JSON.parse(currentVariant.galleryImages);
        if (Array.isArray(parsed)) {
          parsed.forEach((img) => {
            if (img && typeof img === "string" && !list.includes(img)) {
              list.push(img);
            }
          });
        }
      } catch (e) {}
    }
    return list;
  }, [currentVariant]);

  const dynamicEmiPlans = useMemo(() => {
    const currentPrice = currentVariant.price;

    return product.emiPlans.map((plan) => {
      let monthly = Math.round(currentPrice / plan.tenureMonths);
      if (plan.interestRate > 0) {
        const monthlyRate = plan.interestRate / 12 / 100;
        const num =
          currentPrice * monthlyRate * Math.pow(1 + monthlyRate, plan.tenureMonths);
        const den = Math.pow(1 + monthlyRate, plan.tenureMonths) - 1;
        monthly = Math.round(num / den);
      }

      return {
        ...plan,
        monthlyAmount: monthly,
        minMfPledge: Math.round(currentPrice * 1.5),
      };
    });
  }, [product.emiPlans, currentVariant.price]);

  const [selectedPlanId, setSelectedPlanId] = useState<string>(
    product.emiPlans[0]?.id || ""
  );

  const selectedPlan = useMemo(() => {
    return (
      dynamicEmiPlans.find((p) => p.id === selectedPlanId) || dynamicEmiPlans[0]
    );
  }, [dynamicEmiPlans, selectedPlanId]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const downPayment = Math.round(currentVariant.price * 0.15);

  const dynamicSpecs = useMemo(() => {
    const s = product.slug;
    if (s === "logitech-mx-bundle") {
      return [
        { label: "Sensor Technology", value: "Darkfield High Precision 8,000 DPI laser tracking (works seamlessly on glass)" },
        { label: "Buttons & Scrolling", value: "7 customizable buttons with MagSpeed electromagnetic SmartShift wheel & thumb scroll" },
        { label: "Acoustic Switches", value: "Quiet Click switches offering 90% noise reduction with tactile click feel" },
        { label: "Battery Life", value: "Rechargeable 500mAh Li-Po battery providing up to 70 days per charge (3 hours from 1-min quick charge)" },
        { label: "Connectivity", value: "Bluetooth Low Energy + Logi Bolt USB Receiver, Multi-device pairing up to 3 computers with Logitech Flow" },
      ];
    } else if (s === "macbook-pro-m3") {
      return [
        { label: "Configuration", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple M3 Pro 3nm (12-core CPU, 18-core GPU, 16-core Neural Engine, 150GB/s bandwidth)" },
        { label: "Display", value: "14.2-inch Liquid Retina XDR (3024 x 1964), 1600 nits peak HDR, 120Hz ProMotion" },
        { label: "Battery & Power", value: "70Wh battery providing up to 18 hours Apple TV playback with 70W MagSafe 3 charger" },
        { label: "Audio & Ports", value: "Six-speaker Spatial Audio system with force-cancelling woofers, 3x TB4, HDMI 2.1, SDXC slot" },
      ];
    } else if (s === "apple-watch-ultra-2") {
      return [
        { label: "Case & Finish", value: `49mm Aerospace Titanium with ${selectedColor} Band` },
        { label: "Processor", value: "Apple S9 SiP with 64-bit dual-core and 4-core Neural Engine" },
        { label: "Display", value: "Always-On Retina LTPO OLED (3000 nits peak brightness, flat sapphire crystal front)" },
        { label: "Battery Life", value: "Up to 36 hours regular use (up to 72 hours in Low Power Mode) with magnetic fast charge" },
        { label: "GPS & Sensors", value: "Precision dual-frequency GPS (L1+L5), depth gauge, water temp sensor, ECG, blood oxygen" },
      ];
    } else if (s === "sony-wh-1000xm5") {
      return [
        { label: "Driver & Acoustic", value: "30mm precision carbon fiber dome reproducing up to 40kHz Hi-Res sound" },
        { label: "Active Noise Cancelling", value: "HD Noise Cancelling Processor QN1 + Integrated Processor V1 with 8 microphones" },
        { label: "Battery Life", value: "Up to 30 hours continuous playback with ANC (3-min charge for 3 hours audio)" },
        { label: "Codecs & Connectivity", value: "Bluetooth 5.2, LDAC, AAC, SBC, multipoint simultaneous connection, DSEE Extreme" },
      ];
    } else if (s === "lg-oled-c4") {
      return [
        { label: "Display Panel", value: "55-inch 4K Self-Lit OLED evo (3840 x 2160) with infinite contrast & 100% color volume" },
        { label: "Processor", value: "α9 AI Processor 4K Gen7 with AI Picture Pro & Dynamic Tone Mapping Pro" },
        { label: "Gaming Specs", value: "Native 144Hz refresh rate, 0.1ms response time, NVIDIA G-Sync, AMD FreeSync, 4x HDMI 2.1" },
        { label: "Audio System", value: "2.2 Channel 40W Dolby Atmos and DTS:X cinema immersion sound" },
      ];
    } else if (s === "dyson-v15") {
      return [
        { label: "Motor & Suction", value: "Dyson Hyperdymium motor spinning at 125,000 RPM delivering 230 Air Watts of cyclone suction" },
        { label: "Filtration", value: "Whole-machine 5-stage HEPA filtration trapping 99.99% of microscopic dust down to 0.3μm" },
        { label: "Dust Sensor", value: "Acoustic Piezo sensor measuring particle count 15,000 times/sec with auto-boost" },
        { label: "Battery & Runtime", value: "Click-in 7-cell high-density battery with up to 60 minutes fade-free run time" },
      ];
    } else if (s === "samsung-s24-ultra") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Qualcomm Snapdragon 8 Gen 3 for Galaxy (4nm) with on-device Galaxy AI NPU" },
        { label: "Display", value: "6.8-inch Flat Dynamic AMOLED 2X QHD+ (3120 x 1440), 1-120Hz, Gorilla Armor glass" },
        { label: "Rear Camera", value: "200MP Main + 50MP 5x Periscope Telephoto + 10MP 3x Telephoto + 12MP Ultra-wide" },
        { label: "Front Camera", value: "12MP Dual Pixel AF selfie camera" },
        { label: "Battery", value: "5000mAh with 45W fast charging and integrated Bluetooth S Pen" },
      ];
    } else if (s === "google-pixel-9-pro") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Google Tensor G4 SoC with Titan M2 security coprocessor and Gemini Nano AI" },
        { label: "Display", value: "6.3-inch Super Actua LTPO OLED (1280 x 2856) with 1-120Hz and 3000 nits peak brightness" },
        { label: "Rear Camera", value: "50MP Main + 48MP Ultra-wide with Macro Focus + 48MP 5x Telephoto (30x Super Res Zoom)" },
        { label: "Front Camera", value: "42MP Dual PD selfie camera with autofocus" },
        { label: "Battery", value: "4700mAh with 24+ hour battery life and 30W fast charge" },
      ];
    } else if (s === "iphone-16") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A18 (3nm) with 6-core CPU, 5-core GPU, 16-core Neural Engine & Apple Intelligence" },
        { label: "Display", value: "6.1-inch Super Retina XDR OLED (2556 x 1179), Dynamic Island, Ceramic Shield, 2000 nits peak" },
        { label: "Rear Camera", value: "48MP Fusion (26mm, f/1.6, Sensor-shift OIS, 2x Telephoto) + 12MP Ultra-wide (Macro, Spatial Photos)" },
        { label: "Hardware Controls", value: "Camera Control (touch-sensitive slide & press) + Customizable Action Button" },
        { label: "Battery & Power", value: "Up to 22 hours video playback with MagSafe wireless fast charging (up to 25W with 30W adapter) & USB-C" },
      ];
    } else if (s === "iphone-16-pro") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A18 Pro (3nm) with 6-core CPU, 6-core GPU with hardware ray tracing, and 16-core Neural Engine" },
        { label: "Display", value: "6.3-inch Super Retina XDR OLED (2622 x 1206) with ProMotion 120Hz, Always-On, Dynamic Island" },
        { label: "Rear Camera", value: "Pro camera system: 48MP Fusion + 48MP Ultra-wide + 12MP 5x Telephoto with LiDAR & 4K 120 fps Dolby Vision" },
        { label: "Design & Frame", value: "Grade 5 Titanium design with textured matte glass back and Camera Control tactile switch" },
        { label: "Battery & Power", value: "Up to 27 hours video playback with MagSafe fast charging and USB 3 speeds up to 10Gb/s" },
      ];
    } else if (s === "iphone-17-air") {
      return [
        { label: "Design & Dimensions", value: "Razor-thin 5.5mm aerospace Grade 5 titanium unibody enclosure in Cloud White, Sky Blue, and Space Black" },
        { label: "Processor", value: "Apple A19 Pro (3nm) with 6-core CPU, 6-core GPU, next-generation Neural Engine & Apple Intelligence" },
        { label: "Display", value: "6.6-inch Super Retina XDR OLED (2736 x 1260), ProMotion 1-120Hz, Dynamic Island, 3000 nits peak" },
        { label: "Camera System", value: "48MP Fusion Center Camera with 2nd-gen Sensor-shift OIS, 2x Optical Telephoto crop, and Spatial Video" },
        { label: "Cellular & Connectivity", value: "eSIM-only streamlined architecture with Wi-Fi 7, Bluetooth 5.4, and Thread smart home support" },
        { label: "Battery & MagSafe", value: "High-density silicon-carbon battery with MagSafe fast charging up to 25W" },
      ];
    } else if (s === "iphone-17e") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A18 Bionic chip (3nm) with 6-core CPU, 5-core GPU, and 16-core Neural Engine" },
        { label: "Display", value: "6.1-inch Super Retina OLED display (2556 x 1179 pixels) with Dynamic Island and Ceramic Shield" },
        { label: "Rear Camera", value: "Single 48MP Fusion camera with sensor-shift OIS, 2x telephoto crop, 4K Dolby Vision" },
        { label: "Front Camera", value: "12MP TrueDepth camera with autofocus" },
        { label: "Battery", value: "Up to 26 hours video playback with MagSafe wireless fast charging" },
      ];
    } else if (s === "iphone-17") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A19 3nm Bionic chip with 6-core CPU, 5-core GPU, and 16-core Neural Engine" },
        { label: "Display", value: "6.3-inch Super Retina OLED display (2622 x 1206 pixels) with Dynamic Island" },
        { label: "Rear Camera", value: "Dual Vertical Camera (48MP Main with sensor-shift OIS + 12MP Ultra-wide with Spatial Video)" },
        { label: "Front Camera", value: "12MP TrueDepth camera with autofocus and 4K HDR recording" },
        { label: "Battery", value: "Up to 27 hours video playback with USB-C fast charging" },
      ];
    } else if (s === "iphone-17-pro-max") {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A19 Pro 3nm SoC with graphitic thermal architecture and hardware ray tracing" },
        { label: "Display", value: "6.9-inch Super Retina XDR OLED (2868 x 1320), ProMotion 1-120Hz, 2500 nits peak brightness" },
        { label: "Rear Camera", value: "48MP Main + 48MP Ultra-wide + 48MP Tetraprism 5x Telephoto with LiDAR & ProRAW" },
        { label: "Front Camera", value: "18MP TrueDepth camera with autofocus and Center Stage" },
        { label: "Battery", value: "4676mAh battery providing up to 33 hours continuous video playback" },
      ];
    } else {
      return [
        { label: "Storage & Finish", value: `${currentVariant.storage}, ${selectedColor}` },
        { label: "Processor", value: "Apple A19 Pro (3nm) with 6-core CPU, 6-core GPU, and 16-core Neural Engine" },
        { label: "Display", value: "6.3-inch Super Retina XDR OLED (2622 x 1206) with ProMotion 120Hz & 2000 nits brightness" },
        { label: "Rear Camera", value: "48MP Main + 48MP Ultra-wide + 48MP 5x Telephoto with LiDAR scanner and ProRAW" },
        { label: "Front Camera", value: "18MP front cam with autofocus, Center Stage, Night mode, and 4K stabilized video" },
        { label: "Battery", value: "Advanced lithium cell with up to 29 hours continuous video playback" },
      ];
    }
  }, [product.slug, currentVariant.storage, selectedColor]);

  const reviews = [
    {
      name: "Anuradha Doshi",
      location: "Mumbai",
      date: "4 months ago",
      rating: 5,
      variantText: `Variant: ${currentVariant.storage}, Color: ${selectedColor}`,
      review: "This is a great support by 1Fi team for this product is fantastic thanks. 0% EMI with mutual funds was super smooth!",
    },
    {
      name: "Jayalaxmi Arigela",
      location: "Tarnaka",
      date: "4 months ago",
      rating: 5,
      variantText: `Variant: ${currentVariant.storage}, Color: ${selectedColor}`,
      review: "Good experience. Did not have to break my SIP and got delivery in 3 days.",
    },
    {
      name: "Ajad Ali",
      location: "Unnao",
      date: "4 months ago",
      rating: 5,
      variantText: `Variant: ${currentVariant.storage}, Color: ${selectedColor}`,
      review: "Excellent device and true zero percent interest without extra file charges.",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-[#6320EE]">
          Shop on EMI
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href={`/?category=${product.category}`} className="hover:text-[#6320EE] capitalize">
          {product.category}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <Link href="/" className="hover:text-[#6320EE]">
          {product.brand}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-400" />
        <span className="font-semibold text-slate-800">
          {product.name} ({selectedColor}, {currentVariant.storage})
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6 flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto shrink-0 no-scrollbar order-2 md:order-1">
            {currentGalleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative h-16 w-16 md:h-18 md:w-18 shrink-0 rounded-xl border p-1 transition-all bg-white overflow-hidden ${
                  selectedImageIndex === idx
                    ? "border-[#6320EE] ring-2 ring-purple-200"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>

          <div className="flex-1 order-1 md:order-2">
            <div className="relative flex aspect-square w-full items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs overflow-hidden">
              <div className="relative h-full w-full flex items-center justify-center">
                <Image
                  src={
                    currentGalleryImages[selectedImageIndex] ||
                    currentVariant.imageUrl
                  }
                  alt={`${product.name} in ${selectedColor}`}
                  width={600}
                  height={600}
                  priority
                  className="h-full w-auto max-h-[460px] object-contain transition-all duration-200 drop-shadow-sm"
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold text-slate-800 shadow-xs border border-slate-200">
                  <span>{product.rating || 4.8}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              {product.name} ({selectedColor}, {currentVariant.storage})
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              (Variant: {currentVariant.storage}, Color: {selectedColor})
            </p>

            <div className="mt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("customer-reviews")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition"
              >
                <div className="flex items-center gap-0.5">
                  <Star className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                  <span>{product.rating || 4.8}</span>
                </div>
                <span className="text-emerald-800 underline">({product.reviewCount || 3120}+ reviews)</span>
              </button>

              <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-xs font-bold text-[#6320EE]">
                <Flame className="h-3.5 w-3.5 text-[#6320EE]" />
                70+ ordered
              </span>

              {/* Real-time Live Stock Counter */}
              {currentVariant.stockQuantity > 10 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock: <strong className="font-extrabold">{currentVariant.stockQuantity} units</strong></span>
                </span>
              ) : currentVariant.stockQuantity > 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-800 border border-amber-200 shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>🔥 Hurry! Only <strong className="font-extrabold">{currentVariant.stockQuantity} units left</strong></span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-800 border border-rose-200">
                  <span>Out of Stock</span>
                </span>
              )}
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-slate-900">
              {formatINR(currentVariant.price)}
            </span>
            {currentVariant.mrp > currentVariant.price && (
              <span className="text-base text-slate-400 line-through">
                {formatINR(currentVariant.mrp)}
              </span>
            )}
          </div>

          {/* Single, Elegant Color & Storage Selector */}
          <div className="space-y-3.5 rounded-2xl bg-slate-50/80 p-4 border border-slate-200/80">
            {/* Color Swatch Options */}
            {availableColors.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">
                  Select Color: <span className="font-extrabold text-[#6320EE]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                  {availableColors.map((c) => {
                    const isSelected = selectedColor === c.colorName;
                    return (
                      <button
                        key={c.colorName}
                        type="button"
                        onClick={() => {
                          setSelectedColor(c.colorName);
                          setSelectedImageIndex(0);
                        }}
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold transition-all active:scale-95 ${
                          isSelected
                            ? "border-[#6320EE] bg-purple-50 text-[#6320EE] ring-2 ring-purple-200 shadow-xs"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-slate-300 shadow-2xs shrink-0"
                          style={{ backgroundColor: c.colorHex }}
                        />
                        <span>{c.colorName}</span>
                        {isSelected && <Check className="h-3 w-3 text-[#6320EE] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Storage / Configuration Capacity Options */}
            {availableStorages.length > 1 && (
              <div>
                <label className="block text-xs font-bold text-slate-900 mb-2">
                  Select Storage / Capacity: <span className="font-extrabold text-[#6320EE]">{selectedStorage}</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {availableStorages.map((s) => {
                    const isSelected = selectedStorage === s;
                    const variantForStorage = product.variants.find(
                      (v) => v.colorName === selectedColor && v.storage === s
                    ) || product.variants.find((v) => v.storage === s);

                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedStorage(s)}
                        className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all active:scale-95 ${
                          isSelected
                            ? "border-[#6320EE] bg-purple-50 ring-2 ring-purple-200 shadow-xs"
                            : "border-slate-200 bg-white hover:border-purple-200 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span className={`text-xs font-black ${isSelected ? "text-[#6320EE]" : "text-slate-900"}`}>
                            {s}
                          </span>
                          {isSelected && <Check className="h-3.5 w-3.5 text-[#6320EE]" />}
                        </div>
                        {variantForStorage && (
                          <span className="text-[11px] font-bold text-slate-500 mt-0.5">
                            {formatINR(variantForStorage.price)}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2.5 text-white shadow-xs">
            <div>
              <p className="text-xs font-bold">1Fi Mutual Fund Credit Line</p>
              <p className="text-[10px] text-slate-300">Zero interest • 100% digital approval against your portfolio</p>
            </div>
            <div className="flex gap-2 text-[10px]">
              <span className="rounded bg-white/10 px-2 py-1 font-semibold">SEBI Regulated</span>
            </div>
          </div>

          <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 text-xs flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#6320EE] shrink-0" />
            <span className="text-slate-800">
              <strong className="font-bold text-[#6320EE]">0% No-Cost EMI Available:</strong> Pay only <strong className="text-slate-900">{formatINR(selectedPlan.monthlyAmount)}/month</strong> with 1Fi Mutual Fund Lien.
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Choose 0% EMI Tenure</span>
              <span className="text-slate-500 font-medium">EMIs starting next billing cycle</span>
            </div>

            <div className="space-y-2">
              {dynamicEmiPlans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`flex items-center justify-between cursor-pointer rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? "border-[#6320EE] bg-purple-50/40 ring-1 ring-[#6320EE]"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="emiTenure"
                        checked={isSelected}
                        onChange={() => setSelectedPlanId(plan.id)}
                        className="h-4 w-4 text-[#6320EE] focus:ring-[#6320EE]"
                      />
                      <div>
                        <span className="text-sm font-bold text-slate-900">
                          {formatINR(plan.monthlyAmount)} x {plan.tenureMonths} months
                        </span>
                        {plan.cashbackAmount > 0 && (
                          <p className="text-[11px] text-emerald-700 font-medium">
                            Additional cashback of {formatINR(plan.cashbackAmount)}
                          </p>
                        )}
                      </div>
                    </div>

                    <span
                      className={`rounded px-2.5 py-0.5 text-xs font-bold ${
                        plan.isZeroInterest
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {plan.interestRate === 0
                        ? "0% EMI"
                        : `${plan.interestRate}% interest`}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-[10px] text-slate-400">
              *100% Zero extra cost. Powered by 1Fi 0% mutual fund credit line.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6320EE] py-3.5 text-base font-bold text-white shadow-lg shadow-purple-200 transition-all hover:bg-[#5218cc] active:scale-[0.99]"
            >
              <span>Proceed with 0% EMI</span>
            </button>
            <p className="mt-1.5 text-center text-xs text-slate-500 font-medium">
              Sold By : <span className="font-bold text-slate-800">1Fi Verified Partner Merchant</span>
            </p>
          </div>
        </div>
      </div>

      {/* Specifications & Replacement Policy Strip */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Shipping &amp; Delivery Details:
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Dispatched in under 24 hours with free express insured shipping. Delivery in 2-4 working days across all major pin codes in India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Shop with Confidence
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>2 Days Service Centre Replacement</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <span>100% Genuine Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <Truck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Free Insured Courier</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                <Lock className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>SEBI Regulated Credit</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Product Details &amp; Technical Specifications
            </h3>
            <ul className="space-y-2 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
              {dynamicSpecs.map((spec, i) => (
                <li key={i}>
                  <strong>{spec.label}:</strong> {spec.value}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Hassle-Free Replacement Policy
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-200 text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-bold text-slate-800">
                  <tr>
                    <th className="p-2.5">Reason</th>
                    <th className="p-2.5">Period</th>
                    <th className="p-2.5">Resolution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-600">
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Defective / Dead On Arrival</td>
                    <td className="p-2.5">7 days from delivery</td>
                    <td className="p-2.5 text-emerald-700 font-semibold">Immediate Replacement / Brand Warranty</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium text-slate-900">Physical Damage / Wrong Model</td>
                    <td className="p-2.5">2 days from delivery</td>
                    <td className="p-2.5 text-emerald-700 font-semibold">Instant Exchange</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              *Unboxing video is recommended for fastest claim processing.
            </p>
          </div>
        </div>
      </div>

      {/* DEDICATED FULL-WIDTH HIGH-VISIBILITY CUSTOMER REVIEWS & RATINGS */}
      <div id="customer-reviews" className="mt-14 border-t border-slate-200 pt-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              Customer Ratings &amp; Reviews
            </h2>
            <p className="text-xs text-slate-500">
              Verified feedback from 1Fi customers who purchased on 0% Mutual Fund EMI
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert("Thank you for your feedback! Review submission form will open here.")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-[#6320EE] transition shadow-xs"
          >
            <span>Write a Review</span>
          </button>
        </div>

        {/* Rating Breakdown Header Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 rounded-3xl bg-slate-50 border border-slate-200/90 p-6">
          <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-slate-200">
            <span className="text-5xl font-black text-slate-900">{product.rating || 4.8}</span>
            <div className="flex text-amber-400 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">Based on {product.reviewCount || 3120} verified reviews</span>
            <span className="mt-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
              98% of buyers recommend this product
            </span>
          </div>

          <div className="md:col-span-8 flex flex-col justify-center space-y-2.5 p-2">
            {[
              { stars: 5, pct: 92, count: "2,870" },
              { stars: 4, pct: 6, count: "188" },
              { stars: 3, pct: 1, count: "31" },
              { stars: 2, pct: 0.5, count: "16" },
              { stars: 1, pct: 0.5, count: "15" },
            ].map((row) => (
              <div key={row.stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-bold text-slate-700 flex items-center gap-1">
                  <span>{row.stars}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${row.pct}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-500 text-[11px]">{row.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews Feed */}
        <div className="space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">
            Recent Verified Reviews
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-purple-200 transition-all space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-black text-white">
                      <span>{rev.rating}.0</span>
                      <Star className="h-3 w-3 fill-white" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-400">{rev.date}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">&ldquo;{rev.review}&rdquo;</p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-bold text-slate-900 block">{rev.name}</span>
                    <span className="text-slate-400">{rev.location}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-bold text-emerald-700 text-[10px]">
                    <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Exploded Teardown (Only rendered if model-specific genuine schematic exists) */}
      <TeardownExplodedView
        productSlug={product.slug}
        productName={product.name}
      />

      <ProceedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={currentVariant}
        selectedPlan={selectedPlan}
        onOrderSuccess={(remainingStock, variantId) => {
          setVariants((prev) =>
            prev.map((v) =>
              v.id === variantId ? { ...v, stockQuantity: remainingStock } : v
            )
          );
        }}
      />
    </div>
  );
}
