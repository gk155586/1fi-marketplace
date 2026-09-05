"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Cpu,
  Camera,
  BatteryCharging,
  Shield,
  Smartphone,
  Layers,
  PenTool,
  Radio,
  Laptop,
  Watch,
  Headphones,
  Tv,
  Wind,
} from "lucide-react";

interface TeardownExplodedViewProps {
  productSlug?: string;
  productName?: string;
}

interface ComponentItem {
  title: string;
  desc: string;
  icon: any;
}

export default function TeardownExplodedView({
  productSlug = "",
  productName = "",
}: TeardownExplodedViewProps) {
  const [activeTab, setActiveTab] = useState<"exploded" | "ingredients">("exploded");

  let explodedImage = "";
  let ingredientsImage = "";
  let hasIngredientsTab = false;
  let hasTeardown = false;

  let components: ComponentItem[] = [];

  if (productSlug === "macbook-pro-m3") {
    explodedImage = "/products/macbook-pro-m3-teardown.jpg";
    ingredientsImage = "/products/macbook-pro-m3-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Apple M3 Pro 3nm Silicon SoC",
        desc: "12-core CPU, 18-core GPU with hardware ray tracing and 150GB/s unified memory bandwidth.",
        icon: Cpu,
      },
      {
        title: "Dual-Fan Thermal Architecture",
        desc: "Precision aluminum heat pipes moving 50% more airflow quietly at low RPM speeds.",
        icon: Wind,
      },
      {
        title: "Liquid Retina XDR Mini-LED",
        desc: "10,000 mini-LED zones delivering 1,600 nits peak HDR brightness and 120Hz ProMotion.",
        icon: Laptop,
      },
      {
        title: "70Wh Lithium-Polymer Battery",
        desc: "High-density multi-cell battery system providing up to 18 hours continuous battery life.",
        icon: BatteryCharging,
      },
      {
        title: "Six-Speaker Spatial Audio System",
        desc: "Force-cancelling woofers with wide stereo imaging and Dolby Atmos immersion.",
        icon: Headphones,
      },
      {
        title: "MagSafe 3 & Thunderbolt 4 IO",
        desc: "High-speed 40Gbps data transfer, HDMI 2.1 8K output, and SDXC high-speed card slot.",
        icon: Shield,
      },
    ];
  } else if (productSlug === "apple-watch-ultra-2") {
    explodedImage = "/products/apple-watch-ultra-2-teardown.jpg";
    ingredientsImage = "/products/apple-watch-ultra-2-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Apple S9 SiP Dual-Core Processor",
        desc: "5.6 billion transistors with 4-core Neural Engine for on-device Siri & Double Tap gestures.",
        icon: Cpu,
      },
      {
        title: "49mm Grade 5 Titanium Enclosure",
        desc: "Raised bezel guarding the flat sapphire crystal front glass from edge impacts in extreme terrain.",
        icon: Shield,
      },
      {
        title: "Precision Dual-Frequency GPS (L1+L5)",
        desc: "Custom helical antenna array calculating distance, pace, and route maps in dense cities.",
        icon: Radio,
      },
      {
        title: "3000 Nits Always-On LTPO OLED",
        desc: "Apple's brightest display with automatic Night Mode sensor switching for direct sunlight readability.",
        icon: Watch,
      },
      {
        title: "Depth Gauge & Water Temp Sensor",
        desc: "EN13319 certified dive computer with real-time depth tracking up to 40 meters underwater.",
        icon: BatteryCharging,
      },
    ];
  } else if (productSlug === "sony-wh-1000xm5") {
    explodedImage = "/products/sony-wh-1000xm5-teardown.jpg";
    ingredientsImage = "/products/sony-wh-1000xm5-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "HD Noise Cancelling Processor QN1",
        desc: "Dedicated hardware processor executing real-time inverse frequency acoustic cancellation.",
        icon: Cpu,
      },
      {
        title: "Integrated Processor V1",
        desc: "Unlocks the full potential of QN1 for unprecedented ambient isolation in airplanes and trains.",
        icon: Shield,
      },
      {
        title: "30mm Carbon Fiber Driver Unit",
        desc: "High-rigidity dome reproducing crystal-clear high frequencies up to 40kHz Hi-Res audio.",
        icon: Headphones,
      },
      {
        title: "8-Microphone Beamforming Array",
        desc: "4 microphones per ear cup filtering wind noise and capturing vocal clarity.",
        icon: Radio,
      },
      {
        title: "30-Hour Fast Charging Battery",
        desc: "3 minutes of USB-PD charging delivers 3 full hours of continuous audio playback.",
        icon: BatteryCharging,
      },
    ];
  } else if (productSlug === "lg-oled-c4") {
    explodedImage = "/products/lg-oled-c4-teardown.jpg";
    ingredientsImage = "/products/lg-oled-c4-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "α9 AI Processor 4K Gen7",
        desc: "Deep-learning AI Super Upscaling, Dynamic Tone Mapping Pro, and Object Enhancing.",
        icon: Cpu,
      },
      {
        title: "8.3 Million Self-Lit OLED Pixels",
        desc: "Individual pixel dimming achieving perfect infinite black levels with zero backlight bleed.",
        icon: Tv,
      },
      {
        title: "144Hz Gaming & 0.1ms Response",
        desc: "NVIDIA G-Sync, AMD FreeSync Premium, and 4 full-bandwidth HDMI 2.1 ports.",
        icon: Shield,
      },
      {
        title: "Brightness Booster Architecture",
        desc: "Light-boosting algorithms delivering 30% higher peak highlights across HDR content.",
        icon: Layers,
      },
      {
        title: "2.2 Channel Dolby Atmos Audio",
        desc: "AI Sound Pro virtually up-mixing audio into 9.1.2 surround sound immersion.",
        icon: Headphones,
      },
    ];
  } else if (productSlug === "dyson-v15") {
    explodedImage = "/products/dyson-v15-teardown.jpg";
    ingredientsImage = "/products/dyson-v15-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Dyson Hyperdymium 125,000 RPM Motor",
        desc: "Spins at 125,000 RPM creating 230 Air Watts of powerful fade-free cyclone suction.",
        icon: Wind,
      },
      {
        title: "Acoustic Piezo Dust Sensor",
        desc: "Measures and counts dust particles 15,000 times/sec, automatically boosting suction on heavy debris.",
        icon: Radio,
      },
      {
        title: "14 Concentric Root Cyclones",
        desc: "Generates 100,000g of centrifugal force to fling microscopic dust straight into the bin.",
        icon: Layers,
      },
      {
        title: "Whole-Machine HEPA Filtration",
        desc: "Fully-sealed 5-stage filtration trapping 99.99% of particles down to 0.3 microns.",
        icon: Shield,
      },
      {
        title: "Click-in 7-Cell High-Density Battery",
        desc: "Provides up to 60 minutes of uninterrupted whole-home deep cleaning power.",
        icon: BatteryCharging,
      },
    ];
  } else if (productSlug === "iphone-17e") {
    explodedImage = "/products/iphone-17e-teardown.jpg";
    ingredientsImage = "/products/iphone-17e-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Single 48MP Fusion Camera",
        desc: "High-resolution sensor with sapphire crystal lens cover, 2x telephoto crop & 4K Dolby Vision.",
        icon: Camera,
      },
      {
        title: "Apple A18 3nm Bionic Logic Board",
        desc: "Next-gen 3nm architecture with 6-core CPU, 5-core GPU, and 16-core Neural Engine for Apple Intelligence.",
        icon: Cpu,
      },
      {
        title: "MagSafe Charging Coil & RF Module",
        desc: "Integrated circular copper induction coil with precision magnets for 15W MagSafe wireless fast charging.",
        icon: Radio,
      },
      {
        title: "3877mAh Lithium-Ion Battery",
        desc: "Optimized energy-dense battery pack delivering up to 26 hours of continuous video playback.",
        icon: BatteryCharging,
      },
      {
        title: "Precision Aluminum Frame",
        desc: "Aerospace-grade satin aluminum middle chassis with Action Button and USB-C port assembly.",
        icon: Shield,
      },
      {
        title: "6.1-inch Super Retina OLED",
        desc: "Edge-to-edge display with Dynamic Island, True Tone, and Ceramic Shield front glass.",
        icon: Smartphone,
      },
    ];
  } else if (productSlug === "iphone-17-pro-max") {
    explodedImage = "/products/iphone-17-pro-max-teardown.jpg";
    ingredientsImage = "/products/iphone-17-pro-max-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "48MP Triple Pro Periscope Camera",
        desc: "Large tetraprism telephoto with up to 8x optical zoom, 48MP ultra-wide, and LiDAR scanner.",
        icon: Camera,
      },
      {
        title: "Apple A19 Pro 3nm SoC Logic Board",
        desc: "Cutting-edge 3nm processor with graphitic thermal sheet, hardware-accelerated ray tracing, and 5G modem.",
        icon: Cpu,
      },
      {
        title: "Grade 5 Titanium Back & Mid-Frame",
        desc: "Ultralight brushed titanium chassis bonded with internal structural aluminum.",
        icon: Shield,
      },
      {
        title: "Large 4676mAh Battery Pack",
        desc: "Massive high-capacity lithium cell providing up to 33 hours of video playback.",
        icon: BatteryCharging,
      },
      {
        title: "6.9-inch Super Retina XDR OLED",
        desc: "Massive 120Hz ProMotion display with ultra-thin 1.1mm symmetrical borders and 2500 nits peak brightness.",
        icon: Smartphone,
      },
    ];
  } else if (productSlug === "iphone-17") {
    explodedImage = "/products/iphone-17-teardown.jpg";
    ingredientsImage = "/products/iphone-17-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Dual Vertical Camera Module",
        desc: "48MP Main with sensor-shift optical image stabilization and 12MP ultra-wide lens for spatial video capture.",
        icon: Camera,
      },
      {
        title: "Apple A19 3nm Bionic Chip",
        desc: "Enhanced 3nm processor architecture with 16-core Neural Engine and on-device AI capabilities.",
        icon: Cpu,
      },
      {
        title: "Color-Infused Back Glass",
        desc: "Custom formulated back glass with etched matte finish and contoured aluminum frame.",
        icon: Shield,
      },
      {
        title: "3561mAh Lithium-Ion Battery",
        desc: "All-day battery longevity with 50% charge in 30 minutes via USB-C.",
        icon: BatteryCharging,
      },
      {
        title: "6.3-inch Super Retina OLED",
        desc: "Dynamic Island pill, Ceramic Shield protection, and HDR brightness up to 2000 nits.",
        icon: Smartphone,
      },
    ];
  } else if (productSlug === "samsung-s24-ultra") {
    explodedImage = "/products/samsung-s24-ultra-teardown.jpg";
    ingredientsImage = "/products/samsung-s24-ultra-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "200MP Quad Camera System",
        desc: "200MP Main + 50MP 5x Periscope Telephoto with Optical Image Stabilization & 8K recording.",
        icon: Camera,
      },
      {
        title: "Snapdragon 8 Gen 3 for Galaxy",
        desc: "Custom-tuned 4nm flagship SoC with on-device Galaxy AI NPU acceleration.",
        icon: Cpu,
      },
      {
        title: "Titanium Armor & S Pen Slot",
        desc: "Structural titanium rails with embedded Bluetooth S Pen digitizer coil.",
        icon: PenTool,
      },
      {
        title: "6.8\" Dynamic AMOLED 2X 120Hz",
        desc: "Flat QHD+ display with Corning Gorilla Armor anti-reflective glass.",
        icon: Smartphone,
      },
      {
        title: "5000mAh Battery & Vapor Chamber",
        desc: "1.9x larger vapor chamber cooling with intelligent 45W fast charging.",
        icon: BatteryCharging,
      },
    ];
  } else if (productSlug === "google-pixel-9-pro") {
    explodedImage = "/products/google-pixel-9-pro-teardown.jpg";
    ingredientsImage = "/products/google-pixel-9-pro-teardown.jpg";
    hasTeardown = true;
    components = [
      {
        title: "Horizontal Camera Visor Bar Module",
        desc: "50MP Main + 48MP Ultra-wide + 48MP 5x Periscope Telephoto with laser autofocus and temperature sensor.",
        icon: Camera,
      },
      {
        title: "Google Tensor G4 SoC & Titan M2",
        desc: "Google custom silicon designed for multimodal Gemini Nano AI models and hardware security.",
        icon: Cpu,
      },
      {
        title: "Polished Metal Frame & Matte Back",
        desc: "Recycled aluminum frame with IP68 water resistance and satin glass finish.",
        icon: Shield,
      },
      {
        title: "4700mAh Intelligent Battery",
        desc: "Adaptive battery system delivering over 24 hours of endurance with 30W fast charge.",
        icon: BatteryCharging,
      },
      {
        title: "6.3-inch Super Actua LTPO OLED",
        desc: "1-120Hz refresh rate with up to 3000 nits peak brightness and Gorilla Glass Victus 2.",
        icon: Smartphone,
      },
    ];
  } else if (productSlug === "iphone-17-pro") {
    explodedImage = "/products/iphone-17-pro-exploded.jpg";
    ingredientsImage = "/products/iphone-17-pro-ingredients.jpg";
    hasIngredientsTab = true;
    hasTeardown = true;
    components = [
      {
        title: "Pro Camera System",
        desc: "48MP Main with sensor-shift OIS, 12MP Ultra Wide, 12MP 5x Telephoto.",
        icon: Camera,
      },
      {
        title: "A19 Pro Bionic Chip",
        desc: "Industry-leading 3nm architecture with 6-core GPU & Neural Engine.",
        icon: Cpu,
      },
      {
        title: "Aerospace Titanium Frame",
        desc: "Contoured grade 5 titanium frame bonded with internal aluminum.",
        icon: Shield,
      },
      {
        title: "Super Retina XDR OLED",
        desc: "Edge-to-edge display with 1-120Hz ProMotion & 2000 nits peak brightness.",
        icon: Smartphone,
      },
      {
        title: "High-Density Battery",
        desc: "Advanced lithium cell with up to 29 hours continuous video playback.",
        icon: BatteryCharging,
      },
    ];
  } else {
    hasTeardown = false;
  }

  // If there is no genuine model-specific architecture diagram for this product, do not render.
  if (!hasTeardown || !explodedImage) {
    return null;
  }

  return (
    <div className="mt-14 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-900 text-xs font-bold text-white">
              <Layers className="h-3.5 w-3.5 text-orange-400" />
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              {productName} Architecture & Exploded Breakdown
            </h3>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Precision engineering teardown of internal hardware components.
          </p>
        </div>

        {hasIngredientsTab && (
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("exploded")}
              className={`rounded-md px-3 py-1 font-semibold transition ${
                activeTab === "exploded"
                  ? "bg-white text-orange-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Exploded View
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("ingredients")}
              className={`rounded-md px-3 py-1 font-semibold transition ${
                activeTab === "ingredients"
                  ? "bg-white text-orange-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Ingredients Schema
            </button>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="relative flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-slate-900 p-2 overflow-hidden border border-slate-200">
          <Image
            src={activeTab === "exploded" ? explodedImage : ingredientsImage}
            alt={`${productName} Exploded Hardware Breakdown`}
            fill
            className="object-contain"
          />
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {components.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-xs"
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Icon className="h-4 w-4 text-orange-600" />
                  <span>{c.title}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
