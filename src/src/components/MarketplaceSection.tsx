"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import AnimatedLetterText from "@/components/AnimatedLetterText";
import { Product } from "@/types";
import {
  Smartphone,
  Laptop,
  Tv,
  RotateCcw,
  SlidersHorizontal,
  Headphones,
  Sparkles,
  Check,
  X,
  Star,
  ArrowUpDown,
  BadgePercent,
  ChefHat,
  Search,
  Filter,
  CheckCircle2,
  Grid3X3,
  Flame,
  IndianRupee,
  Calendar,
  Building2,
} from "lucide-react";

interface MarketplaceSectionProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onClearSearch: () => void;
}

export default function MarketplaceSection({
  products,
  isLoading,
  searchQuery,
  onSearchChange,
  onClearSearch,
}: MarketplaceSectionProps) {
  // Category State
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubFilter, setActiveSubFilter] = useState<string>("all");

  // Multi-Select Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedTenures, setSelectedTenures] = useState<string[]>([]);
  const [onlyZeroInterest, setOnlyZeroInterest] = useState<boolean>(false);
  const [onlyCashback, setOnlyCashback] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Multi-Select Toggle Handlers (Supports select & deselect)
  const toggleBrand = (brand: string) => {
    if (brand === "all") {
      setSelectedBrands([]);
      return;
    }
    const lower = brand.toLowerCase();
    setSelectedBrands((prev) =>
      prev.includes(lower) ? prev.filter((b) => b !== lower) : [...prev, lower]
    );
  };

  const togglePriceRange = (rangeId: string) => {
    if (rangeId === "all") {
      setSelectedPriceRanges([]);
      return;
    }
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((r) => r !== rangeId) : [...prev, rangeId]
    );
  };

  const toggleTenure = (tenureId: string) => {
    if (tenureId === "all") {
      setSelectedTenures([]);
      return;
    }
    setSelectedTenures((prev) =>
      prev.includes(tenureId) ? prev.filter((t) => t !== tenureId) : [...prev, tenureId]
    );
  };

  // Scroll-Driven Animation Triggers (Only fires when user scrolls down to that specific section)
  const [hasCategoryAnimated, setHasCategoryAnimated] = useState<boolean>(false);
  const [hasFilterAnimated, setHasFilterAnimated] = useState<boolean>(false);
  const [hasTrendingAnimated, setHasTrendingAnimated] = useState<boolean>(false);
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const filterSidebarRef = useRef<HTMLElement>(null);
  const trendingBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trendingBarRef.current;
    if (!el) return;

    // Trigger trending emergence strictly when user scrolls into trending bar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTrendingAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = categoryBarRef.current;
    if (!el) return;

    // Trigger category emergence strictly when user scrolls into category bar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasCategoryAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = filterSidebarRef.current;
    if (!el) return;

    // Trigger filter container cascade strictly when user scrolls into filter sidebar
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasFilterAnimated(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Visual Category Definitions (All Items first, followed by Mobiles and others for left-to-right emergence animation)
  const visualCategories = [
    {
      id: "all",
      label: "All Items",
      count: products.length,
      icon: Grid3X3,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: "mobiles",
      label: "Mobiles",
      count: products.filter((p) => p.category === "mobiles").length,
      icon: Smartphone,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "electronics",
      label: "Audio & Wearables",
      count: products.filter((p) => p.category === "electronics" && !p.slug.includes("macbook")).length,
      icon: Headphones,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "laptops",
      label: "Laptops & PC",
      count: products.filter((p) => p.category === "electronics" && (p.slug.includes("macbook") || p.name.toLowerCase().includes("laptop") || p.name.toLowerCase().includes("mouse"))).length,
      icon: Laptop,
      color: "text-violet-600 bg-violet-50",
    },
    {
      id: "appliances",
      label: "TV & Appliances",
      count: products.filter((p) => p.category === "appliances").length,
      icon: Tv,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "kitchen",
      label: "Kitchen & Dining",
      count: products.filter((p) => p.category === "kitchen" && !p.slug.includes("dyson")).length,
      icon: ChefHat,
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: "cleaners",
      label: "Home & Cleaners",
      count: products.filter((p) => p.slug.includes("dyson") || p.slug.includes("washer") || p.name.toLowerCase().includes("vacuum")).length,
      icon: Sparkles,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      id: "deals",
      label: "0% EMI Deals",
      count: products.filter((p) => p.emiPlans.some((ep) => ep.isZeroInterest)).length,
      icon: BadgePercent,
      color: "text-rose-600 bg-rose-50",
    },
  ];

  // Dynamic brands list
  const availableBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => {
      if (p.brand) brandsSet.add(p.brand);
    });
    return ["all", ...Array.from(brandsSet)];
  }, [products]);

  // Active filters counter (Strictly counts all active dimensions with multi-select)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "all") count++;
    count += selectedBrands.length;
    count += selectedPriceRanges.length;
    count += selectedTenures.length;
    if (onlyZeroInterest) count++;
    if (onlyCashback) count++;
    if (minRating > 0) count++;
    if (sortBy !== "featured") count++;
    if (searchQuery && searchQuery.trim().length > 0) count++;
    return count;
  }, [
    activeCategory,
    selectedBrands,
    selectedPriceRanges,
    selectedTenures,
    onlyZeroInterest,
    onlyCashback,
    minRating,
    sortBy,
    searchQuery,
  ]);

  // Master Filter & Sort Logic with Multi-Select Matching
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);

        let matchesCategory = true;
        if (activeCategory === "all") {
          matchesCategory = true;
        } else if (activeCategory === "mobiles") {
          matchesCategory = p.category === "mobiles";
        } else if (activeCategory === "electronics") {
          matchesCategory = p.category === "electronics" && !p.slug.includes("macbook");
        } else if (activeCategory === "laptops") {
          matchesCategory =
            p.category === "electronics" &&
            (p.slug.includes("macbook") ||
              p.name.toLowerCase().includes("laptop") ||
              p.name.toLowerCase().includes("mouse"));
        } else if (activeCategory === "appliances") {
          matchesCategory = p.category === "appliances";
        } else if (activeCategory === "kitchen") {
          matchesCategory = p.category === "kitchen" && !p.slug.includes("dyson");
        } else if (activeCategory === "cleaners") {
          matchesCategory =
            p.slug.includes("dyson") ||
            p.slug.includes("washer") ||
            p.name.toLowerCase().includes("vacuum") ||
            p.name.toLowerCase().includes("cleaner");
        } else if (activeCategory === "deals") {
          matchesCategory = p.badge !== undefined || p.emiPlans.some((ep) => ep.isZeroInterest);
        }

        let matchesSub = true;
        if (activeSubFilter !== "all") {
          const sf = activeSubFilter.toLowerCase();
          matchesSub =
            p.name.toLowerCase().includes(sf) ||
            p.slug.toLowerCase().includes(sf) ||
            p.description.toLowerCase().includes(sf) ||
            p.brand.toLowerCase().includes(sf);
        }

        // Multi-Brand Matching
        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.includes(p.brand.toLowerCase());

        // Multi-Price Range Matching
        let matchesPrice = true;
        if (selectedPriceRanges.length > 0) {
          const defaultPrice = p.variants[0]?.price || 0;
          matchesPrice = selectedPriceRanges.some((range) => {
            if (range === "under15k") return defaultPrice < 15000;
            if (range === "15k-50k") return defaultPrice >= 15000 && defaultPrice <= 50000;
            if (range === "50k-100k") return defaultPrice > 50000 && defaultPrice <= 100000;
            if (range === "above100k") return defaultPrice > 100000;
            return false;
          });
        }

        // Multi-Tenure Matching
        let matchesTenure = true;
        if (selectedTenures.length > 0) {
          matchesTenure = selectedTenures.some((tStr) => {
            const t = parseInt(tStr, 10);
            return p.emiPlans.some((ep) => ep.tenureMonths === t);
          });
        }

        let matchesZeroInterest = true;
        if (onlyZeroInterest) {
          matchesZeroInterest = p.emiPlans.some((ep) => ep.isZeroInterest);
        }

        let matchesCashback = true;
        if (onlyCashback) {
          matchesCashback = p.emiPlans.some((ep) => ep.cashbackAmount > 0);
        }

        let matchesRating = true;
        if (minRating > 0) {
          matchesRating = (p.rating || 4.5) >= minRating;
        }

        return (
          matchesSearch &&
          matchesCategory &&
          matchesSub &&
          matchesBrand &&
          matchesPrice &&
          matchesTenure &&
          matchesZeroInterest &&
          matchesCashback &&
          matchesRating
        );
      })
      .sort((a, b) => {
        const priceA = a.variants[0]?.price || 0;
        const priceB = b.variants[0]?.price || 0;

        if (sortBy === "price-low") return priceA - priceB;
        if (sortBy === "price-high") return priceB - priceA;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        if (sortBy === "emi-low") {
          const emiA = a.emiPlans[0]?.monthlyAmount || priceA / 12;
          const emiB = b.emiPlans[0]?.monthlyAmount || priceB / 12;
          return emiA - emiB;
        }
        return 0;
      });
  }, [
    products,
    searchQuery,
    activeCategory,
    activeSubFilter,
    selectedBrands,
    selectedPriceRanges,
    selectedTenures,
    onlyZeroInterest,
    onlyCashback,
    minRating,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setActiveCategory("all");
    setActiveSubFilter("all");
    setSelectedBrands([]);
    setSelectedPriceRanges([]);
    setSelectedTenures([]);
    setOnlyZeroInterest(false);
    setOnlyCashback(false);
    setMinRating(0);
    setSortBy("featured");
    onClearSearch();
  };

  return (
    <div id="marketplace-products" className="space-y-6">
      {/* 1. Header & Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#6320EE] text-white shadow-xs">
              <Sparkles className="h-4 w-4" />
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Marketplace</h2>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">
            Explore authentic flagship smartphones, electronics &amp; appliances with 100% digital 0% Mutual Fund EMI.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-purple-50 px-3 py-1 font-bold text-[#6320EE] border border-purple-200">
            {filteredProducts.length} Items Available
          </span>
        </div>
      </div>

      {/* 2. Sleek Search Bar & Integrated Trending Discovery Strip (Marketplace Specific) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-xs">
        {/* Search Input Box */}
        <div className="relative flex-1 w-full flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-[#6320EE]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products (e.g. iPhone 17, MacBook, Sony XM5, Dyson)..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-9 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-[#6320EE] focus:bg-white focus:ring-2 focus:ring-purple-100 focus:outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-2.5 rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Inline Trending Quick Tags with Left-to-Right Emergence Animation behind Flame Icon */}
        <div
          ref={trendingBarRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto shrink-0 pt-1 md:pt-0"
        >
          <span
            style={{
              transform: hasTrendingAnimated ? "translateX(0) scale(1)" : "translateX(0) scale(0.95)",
              opacity: 1,
              zIndex: 20,
              transition: "all 600ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-600 shrink-0 bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-200/80 shadow-2xs"
          >
            <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500 shrink-0" />
            <span>Trending:</span>
          </span>
          {[
            { label: "iPhone 17 Pro", q: "iphone 17" },
            { label: "MacBook Pro", q: "macbook" },
            { label: "Sony XM5", q: "sony" },
            { label: "LG OLED", q: "oled" },
            { label: "Dyson V15", q: "dyson" },
          ].map((item, index) => {
            const isSelected = searchQuery.toLowerCase().includes(item.q);
            const chipAnimationStyle = {
              transform: hasTrendingAnimated
                ? "translateX(0) scale(1)"
                : `translateX(-${(index * 22) + 20}px) scale(0.85)`,
              opacity: hasTrendingAnimated ? 1 : 0,
              pointerEvents: hasTrendingAnimated ? ("auto" as const) : ("none" as const),
              zIndex: 10 - index,
              transition: `all 800ms cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 90}ms`,
            };

            return (
              <button
                key={item.label}
                type="button"
                style={chipAnimationStyle}
                onClick={() => onSearchChange(searchQuery === item.q ? "" : item.q)}
                className={`relative shrink-0 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all duration-150 active:scale-95 cursor-pointer border ${
                  isSelected
                    ? "bg-[#6320EE] text-white border-[#6320EE] shadow-2xs"
                    : "bg-slate-100 text-slate-700 border-slate-200/60 hover:bg-purple-50 hover:text-[#6320EE] hover:border-purple-200"
                }`}
              >
                <AnimatedLetterText text={item.label} isActive={isSelected} delayMultiplier={10} />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sleek Category Navigation with Left-to-Right Emergence Animation */}
      {/* Subsequent icons emerge from behind the Mobile icon as user scrolls into view */}
      <div
        ref={categoryBarRef}
        className="relative overflow-x-auto no-scrollbar py-2 px-1 -my-1"
      >
        <div className="flex items-center gap-2.5 min-w-max">
          {visualCategories.map((cat, index) => {
            const isSelected = activeCategory === cat.id;
            const Icon = cat.icon;
            const isAnchor = index === 0;

            const animationStyle = isAnchor
              ? {
                  transform: hasCategoryAnimated ? "translateX(0) scale(1)" : "translateX(0) scale(0.95)",
                  opacity: 1,
                  zIndex: 20,
                  transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)",
                }
              : {
                  transform: hasCategoryAnimated
                    ? "translateX(0) scale(1)"
                    : `translateX(-${(index * 32) + 26}px) scale(0.82)`,
                  opacity: hasCategoryAnimated ? 1 : 0,
                  pointerEvents: hasCategoryAnimated ? ("auto" as const) : ("none" as const),
                  zIndex: 10 - index,
                  transition: `transform 850ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 130}ms, opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) ${index * 130}ms`,
                };

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveSubFilter("all");
                }}
                style={animationStyle}
                className={`group relative flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold active:scale-95 shadow-2xs border cursor-pointer ${
                  isSelected
                    ? "bg-[#6320EE] text-white border-[#6320EE] shadow-md shadow-purple-200 ring-2 ring-purple-300"
                    : "bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40"
                }`}
              >
                {/* 1. Icon is ALWAYS FIRST (Left), solidly in foreground at z-20, NEVER hidden */}
                <span
                  className={`relative z-20 shrink-0 flex h-7 w-7 items-center justify-center rounded-xl shadow-xs ${
                    isSelected ? "bg-white text-[#6320EE]" : cat.color
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                </span>

                {/* 2. Text is SECOND (Right), at z-10, emerging from behind the icon */}
                <div className="relative z-10 flex flex-col text-left">
                  <AnimatedLetterText
                    text={cat.label}
                    isActive={isSelected}
                    className="leading-tight font-extrabold"
                    delayMultiplier={12}
                  />
                  <span
                    className={`text-[10px] font-medium transition-colors duration-200 ${
                      isSelected ? "text-purple-200 font-semibold" : "text-slate-400"
                    }`}
                  >
                    {cat.count} items
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main 2-Column E-Commerce Interactive Layout (Compact Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Filter Sidebar (Desktop) - Sleek, Ergonomic, Compact & Premium */}
        <aside
          ref={filterSidebarRef}
          className="hidden lg:block lg:col-span-3 space-y-4 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-4 shadow-sm shadow-slate-200/40 sticky top-24 self-start max-h-[calc(100vh-6.5rem)] overflow-y-auto no-scrollbar relative"
        >
          {/* Ambient decorative soft glow in top corner */}
          <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-purple-100/40 blur-2xl pointer-events-none" />

          {/* Sidebar Header */}
          <div className="relative z-30 flex items-center justify-between border-b border-slate-100 pb-3 bg-transparent">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE] border border-purple-200/70 shadow-2xs">
                <Filter className="h-3.5 w-3.5" />
              </span>
              <div>
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-900">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#6320EE] text-white text-[10px] font-black shadow-xs">
                      {activeFiltersCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-slate-400">Refine catalog</span>
              </div>
            </div>

            {/* Reset All on Top Right of Filter Name */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer border border-red-200/60 shadow-2xs active:scale-95"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset All{activeFiltersCount > 1 ? ` (${activeFiltersCount})` : ""}</span>
              </button>
            )}
          </div>

          {/* 1. Quick Perks Toggles (Anchor / Top origin: 0% EMI and Cashback button) */}
          <div className="relative z-30 space-y-2 pb-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-purple-600" />
                <span>Financing Perks</span>
              </span>
              {(onlyZeroInterest || onlyCashback) && (
                <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.2 rounded-md border border-purple-200/60">
                  Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => setOnlyZeroInterest(!onlyZeroInterest)}
                className={`relative flex h-10 items-center justify-center gap-1.5 rounded-2xl px-2.5 text-[11px] font-bold border cursor-pointer active:scale-95 whitespace-nowrap overflow-hidden transition-colors ${
                  onlyZeroInterest
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-100 ring-2 ring-emerald-200/80"
                    : "bg-slate-50/90 text-slate-700 border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/40"
                }`}
              >
                <span
                  className={`relative z-20 shrink-0 flex h-5 w-5 items-center justify-center rounded-lg ${
                    onlyZeroInterest ? "bg-white/20 text-white" : "bg-emerald-100/80 text-emerald-700"
                  }`}
                >
                  <BadgePercent className="h-3.5 w-3.5 shrink-0" />
                </span>
                <AnimatedLetterText text="0% EMI" isActive={onlyZeroInterest} delayMultiplier={10} className="font-extrabold whitespace-nowrap" />
              </button>

              <button
                type="button"
                onClick={() => setOnlyCashback(!onlyCashback)}
                className={`relative flex h-10 items-center justify-center gap-1.5 rounded-2xl px-2.5 text-[11px] font-bold border cursor-pointer active:scale-95 whitespace-nowrap overflow-hidden transition-colors ${
                  onlyCashback
                    ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-100 ring-2 ring-amber-200/80"
                    : "bg-slate-50/90 text-slate-700 border-slate-200/80 hover:border-amber-300 hover:bg-amber-50/40"
                }`}
              >
                <span
                  className={`relative z-20 shrink-0 flex h-5 w-5 items-center justify-center rounded-lg ${
                    onlyCashback ? "bg-white/20 text-white" : "bg-amber-100/80 text-amber-700"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 shrink-0" />
                </span>
                <AnimatedLetterText text="Cashback" isActive={onlyCashback} delayMultiplier={10} className="font-extrabold whitespace-nowrap" />
              </button>
            </div>
          </div>

          {/* 2. Financed Price Range (Emerges from behind 0% EMI & Cashback buttons down into place) */}
          <div
            style={{
              transform: hasFilterAnimated ? "translateY(0) scale(1)" : "translateY(-48px) scale(0.92)",
              opacity: hasFilterAnimated ? 1 : 0,
              pointerEvents: hasFilterAnimated ? ("auto" as const) : ("none" as const),
              zIndex: 25,
              transition: "all 800ms cubic-bezier(0.16, 1, 0.3, 1) 150ms",
            }}
            className="relative space-y-2 border-t border-slate-100 pt-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <IndianRupee className="h-3 w-3 text-indigo-600" />
                <span>Financed Price</span>
              </span>
              {selectedPriceRanges.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedPriceRanges([])}
                  className="text-[9px] font-bold text-slate-400 hover:text-[#6320EE] cursor-pointer"
                >
                  Clear ({selectedPriceRanges.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "all", label: "All Prices" },
                { id: "under15k", label: "< ₹15,000" },
                { id: "15k-50k", label: "₹15k – ₹50k" },
                { id: "50k-100k", label: "₹50k – ₹1L" },
                { id: "above100k", label: "> ₹1,00,000" },
              ].map((p) => {
                const isSel = p.id === "all" ? selectedPriceRanges.length === 0 : selectedPriceRanges.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePriceRange(p.id)}
                    className={`rounded-xl px-2.5 py-1.5 text-[11px] font-bold text-center cursor-pointer border active:scale-95 ${
                      isSel
                        ? "bg-[#6320EE] text-white border-[#6320EE] shadow-xs shadow-purple-200 ring-1 ring-purple-300"
                        : "bg-slate-50/80 text-slate-600 border-slate-200/70 hover:bg-purple-50 hover:text-[#6320EE] hover:border-purple-200"
                    } ${p.id === "above100k" ? "col-span-2" : ""}`}
                  >
                    <AnimatedLetterText text={p.label} isActive={isSel} delayMultiplier={10} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Partner Brands (Emerges from behind down into place) */}
          <div
            style={{
              transform: hasFilterAnimated ? "translateY(0) scale(1)" : "translateY(-95px) scale(0.9)",
              opacity: hasFilterAnimated ? 1 : 0,
              pointerEvents: hasFilterAnimated ? ("auto" as const) : ("none" as const),
              zIndex: 20,
              transition: "transform 850ms cubic-bezier(0.16, 1, 0.3, 1) 280ms, opacity 850ms cubic-bezier(0.16, 1, 0.3, 1) 280ms",
            }}
            className="relative space-y-2 border-t border-slate-100 pt-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-blue-600" />
                <span>Partner Brands</span>
              </span>
              {selectedBrands.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedBrands([])}
                  className="text-[9px] font-bold text-slate-400 hover:text-[#6320EE] cursor-pointer"
                >
                  Clear ({selectedBrands.length})
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar p-1.5 bg-slate-50/80 rounded-2xl border border-slate-100">
              {availableBrands.map((b) => {
                const isSel = b === "all" ? selectedBrands.length === 0 : selectedBrands.includes(b.toLowerCase());
                const displayLabel = b === "all" ? "All Brands" : b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => toggleBrand(b)}
                    className={`rounded-lg px-2.5 py-1 text-[10px] font-bold capitalize cursor-pointer border active:scale-95 ${
                      isSel
                        ? "bg-[#6320EE] text-white border-[#6320EE] shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200/70 hover:bg-purple-50 hover:border-purple-200 hover:text-[#6320EE]"
                    }`}
                  >
                    <AnimatedLetterText text={displayLabel} isActive={isSel} delayMultiplier={10} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. 0% EMI Tenure (Emerges from behind down into place) */}
          <div
            style={{
              transform: hasFilterAnimated ? "translateY(0) scale(1)" : "translateY(-145px) scale(0.88)",
              opacity: hasFilterAnimated ? 1 : 0,
              pointerEvents: hasFilterAnimated ? ("auto" as const) : ("none" as const),
              zIndex: 15,
              transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1) 410ms, opacity 900ms cubic-bezier(0.16, 1, 0.3, 1) 410ms",
            }}
            className="relative space-y-2 border-t border-slate-100 pt-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="h-3 w-3 text-emerald-600" />
                <span>0% EMI Tenure</span>
              </span>
              {selectedTenures.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTenures([])}
                  className="text-[9px] font-bold text-slate-400 hover:text-[#6320EE] cursor-pointer"
                >
                  Clear ({selectedTenures.length})
                </button>
              )}
            </div>

            <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100/90 rounded-xl border border-slate-200/70">
              {[
                { id: "all", label: "All" },
                { id: "3", label: "3M" },
                { id: "6", label: "6M" },
                { id: "12", label: "12M" },
                { id: "24", label: "24M" },
              ].map((t) => {
                const isSel = t.id === "all" ? selectedTenures.length === 0 : selectedTenures.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTenure(t.id)}
                    className={`rounded-lg py-1.5 text-[11px] font-extrabold text-center cursor-pointer active:scale-95 ${
                      isSel
                        ? "bg-[#6320EE] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/70"
                    }`}
                  >
                    <AnimatedLetterText text={t.label} isActive={isSel} delayMultiplier={10} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Customer Rating (Emerges from behind down into place) */}
          <div
            style={{
              transform: hasFilterAnimated ? "translateY(0) scale(1)" : "translateY(-195px) scale(0.86)",
              opacity: hasFilterAnimated ? 1 : 0,
              pointerEvents: hasFilterAnimated ? ("auto" as const) : ("none" as const),
              zIndex: 10,
              transition: "transform 950ms cubic-bezier(0.16, 1, 0.3, 1) 540ms, opacity 950ms cubic-bezier(0.16, 1, 0.3, 1) 540ms",
            }}
            className="relative space-y-2 border-t border-slate-100 pt-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                <span>Customer Rating</span>
              </span>
              {minRating > 0 && (
                <button
                  type="button"
                  onClick={() => setMinRating(0)}
                  className="text-[9px] font-bold text-slate-400 hover:text-[#6320EE] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {[0, 4.5, 4.8].map((r) => {
                const isSel = minRating === r;
                const labelText = r === 0 ? "All" : `${r}+`;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-1.5 px-2 text-[11px] font-bold cursor-pointer border active:scale-95 ${
                      isSel
                        ? "bg-[#6320EE] text-white border-[#6320EE] shadow-xs"
                        : "bg-slate-50/80 text-slate-700 border-slate-200/70 hover:bg-purple-50 hover:border-purple-200"
                    }`}
                  >
                    <span className="relative z-20 shrink-0 flex items-center justify-center">
                      <Star className={`h-3 w-3 ${isSel ? "fill-amber-300 text-amber-300" : "fill-amber-400 text-amber-400"} shrink-0`} />
                    </span>
                    <AnimatedLetterText text={labelText} isActive={isSel} delayMultiplier={10} />
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Column: Products Grid & Controls with Stable Minimum Height */}
        <div className="lg:col-span-9 space-y-4 min-h-[580px] flex flex-col justify-start">
          {/* Top Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-3.5 border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 rounded-xl bg-[#6320EE] px-3.5 py-2 text-xs font-bold text-white shadow-xs active:scale-95"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[#6320EE] text-[10px] font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <span className="text-xs font-bold text-slate-600 hidden sm:inline">
                Showing <span className="text-slate-900 font-extrabold">{filteredProducts.length}</span> devices
              </span>
            </div>

            {/* Sort By Dropdown */}
            <div className="flex items-center gap-2 text-xs ml-auto">
              <span className="text-slate-400 font-bold hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-3 pr-8 text-xs font-bold text-slate-800 focus:border-[#6320EE] focus:bg-white focus:outline-none cursor-pointer"
                >
                  <option value="featured">🔥 Best Sellers</option>
                  <option value="emi-low">⚡ Lowest Monthly EMI</option>
                  <option value="price-low">📉 Price: Low to High</option>
                  <option value="price-high">📈 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                </select>
                <ArrowUpDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips Strip (Only shown when activeFiltersCount > 0) */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs bg-purple-50/40 p-2.5 rounded-2xl border border-purple-100">
              <span className="text-slate-400 font-bold text-[11px]">Active:</span>

              {activeCategory !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 text-[#6320EE] border border-purple-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Category: {activeCategory}</span>
                  <button type="button" onClick={() => setActiveCategory("all")} className="cursor-pointer hover:opacity-75">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px] capitalize"
                >
                  <span>Brand: {b}</span>
                  <button
                    type="button"
                    onClick={() => toggleBrand(b)}
                    className="cursor-pointer hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {selectedPriceRanges.map((pr) => {
                const label =
                  pr === "under15k"
                    ? "< ₹15,000"
                    : pr === "15k-50k"
                    ? "₹15k – ₹50k"
                    : pr === "50k-100k"
                    ? "₹50k – ₹1L"
                    : "> ₹1,00,000";
                return (
                  <span
                    key={pr}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]"
                  >
                    <span>Price: {label}</span>
                    <button
                      type="button"
                      onClick={() => togglePriceRange(pr)}
                      className="cursor-pointer hover:opacity-75"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                );
              })}

              {selectedTenures.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]"
                >
                  <span>{t}M 0%</span>
                  <button
                    type="button"
                    onClick={() => toggleTenure(t)}
                    className="cursor-pointer hover:opacity-75"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}

              {onlyZeroInterest && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>0% No-Cost Only</span>
                  <button type="button" onClick={() => setOnlyZeroInterest(false)} className="cursor-pointer hover:opacity-75">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {onlyCashback && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Cashback Only</span>
                  <button type="button" onClick={() => setOnlyCashback(false)} className="cursor-pointer hover:opacity-75">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>{minRating}+ Stars</span>
                  <button type="button" onClick={() => setMinRating(0)} className="cursor-pointer hover:opacity-75">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button type="button" onClick={onClearSearch} className="cursor-pointer hover:opacity-75">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 rounded-3xl bg-slate-100 animate-pulse border border-slate-200/60"
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-xs">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 text-[#6320EE]">
                <Search className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">
                  No products found matching your filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing some filters or changing your search criteria to discover our catalog.
                </p>
              </div>

              {activeFiltersCount === 1 ? (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-black transition shadow-md cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset Filter</span>
                </button>
              ) : activeFiltersCount > 1 ? (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-black transition shadow-md cursor-pointer"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset All Filters</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#6320EE] px-6 py-3 text-xs font-bold text-white hover:bg-[#5218cc] transition shadow-md cursor-pointer"
                >
                  <span>Explore All Products</span>
                </button>
              )}
            </div>
          ) : (
            /* Products Grid with Clean Reconciliation */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Mobile Filter Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs lg:hidden animate-in fade-in duration-200">
          <div className="relative h-full w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE] border border-purple-200/70 shadow-2xs">
                    <Filter className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className="font-black text-slate-900 text-sm">Filters</span>
                      {activeFiltersCount > 0 && (
                        <span className="flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#6320EE] text-white text-[10px] font-black">
                          {activeFiltersCount}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-slate-400">Refine catalog</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* 1. Mobile Perks Toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                    <span>Financing Perks</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOnlyZeroInterest(!onlyZeroInterest)}
                    className={`relative flex h-11 items-center justify-center gap-1.5 rounded-2xl px-2.5 text-xs font-bold border cursor-pointer active:scale-95 whitespace-nowrap overflow-hidden transition-colors ${
                      onlyZeroInterest
                        ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50"
                    }`}
                  >
                    <span className={`relative z-20 shrink-0 flex h-5 w-5 items-center justify-center rounded-lg ${onlyZeroInterest ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"}`}>
                      <BadgePercent className="h-3.5 w-3.5 shrink-0" />
                    </span>
                    <AnimatedLetterText text="0% EMI" isActive={onlyZeroInterest} delayMultiplier={10} className="font-extrabold whitespace-nowrap" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setOnlyCashback(!onlyCashback)}
                    className={`relative flex h-11 items-center justify-center gap-1.5 rounded-2xl px-2.5 text-xs font-bold border cursor-pointer active:scale-95 whitespace-nowrap overflow-hidden transition-colors ${
                      onlyCashback
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50/50"
                    }`}
                  >
                    <span className={`relative z-20 shrink-0 flex h-5 w-5 items-center justify-center rounded-lg ${onlyCashback ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"}`}>
                      <Sparkles className="h-3.5 w-3.5 shrink-0" />
                    </span>
                    <AnimatedLetterText text="Cashback" isActive={onlyCashback} delayMultiplier={10} className="font-extrabold whitespace-nowrap" />
                  </button>
                </div>
              </div>

              {/* 2. Mobile Price Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <IndianRupee className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Financed Price</span>
                  </span>
                  {selectedPriceRanges.length > 0 && (
                    <button type="button" onClick={() => setSelectedPriceRanges([])} className="text-[10px] font-bold text-[#6320EE]">Clear ({selectedPriceRanges.length})</button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under15k", label: "< ₹15,000" },
                    { id: "15k-50k", label: "₹15k – ₹50k" },
                    { id: "50k-100k", label: "₹50k – ₹1L" },
                    { id: "above100k", label: "> ₹1,00,000" },
                  ].map((p) => {
                    const isSel = p.id === "all" ? selectedPriceRanges.length === 0 : selectedPriceRanges.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => togglePriceRange(p.id)}
                        className={`rounded-xl px-2.5 py-2 text-xs font-bold text-center cursor-pointer border active:scale-95 ${
                          isSel
                            ? "bg-[#6320EE] text-white border-[#6320EE] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50"
                        } ${p.id === "above100k" ? "col-span-2" : ""}`}
                      >
                        <AnimatedLetterText text={p.label} isActive={isSel} delayMultiplier={10} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Mobile Brands Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-blue-600" />
                    <span>Brand</span>
                  </span>
                  {selectedBrands.length > 0 && (
                    <button type="button" onClick={() => setSelectedBrands([])} className="text-[10px] font-bold text-[#6320EE]">Clear ({selectedBrands.length})</button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar p-1 bg-slate-50/70 rounded-2xl border border-slate-100">
                  {availableBrands.map((b) => {
                    const isSel = b === "all" ? selectedBrands.length === 0 : selectedBrands.includes(b.toLowerCase());
                    const displayLabel = b === "all" ? "All Brands" : b;
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBrand(b)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize cursor-pointer border active:scale-95 ${
                          isSel
                            ? "bg-[#6320EE] text-white border-[#6320EE] shadow-2xs"
                            : "bg-white text-slate-700 border-slate-200/80 hover:bg-slate-100"
                        }`}
                      >
                        <AnimatedLetterText text={displayLabel} isActive={isSel} delayMultiplier={10} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Mobile 0% EMI Tenure */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                    <span>0% EMI Tenure</span>
                  </span>
                  {selectedTenures.length > 0 && (
                    <button type="button" onClick={() => setSelectedTenures([])} className="text-[10px] font-bold text-[#6320EE]">Clear ({selectedTenures.length})</button>
                  )}
                </div>
                <div className="grid grid-cols-5 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
                  {[
                    { id: "all", label: "All" },
                    { id: "3", label: "3M" },
                    { id: "6", label: "6M" },
                    { id: "12", label: "12M" },
                    { id: "24", label: "24M" },
                  ].map((t) => {
                    const isSel = t.id === "all" ? selectedTenures.length === 0 : selectedTenures.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTenure(t.id)}
                        className={`rounded-lg py-2 text-xs font-extrabold text-center cursor-pointer active:scale-95 ${
                          isSel
                            ? "bg-[#6320EE] text-white shadow-xs"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                        }`}
                      >
                        <AnimatedLetterText text={t.label} isActive={isSel} delayMultiplier={10} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Mobile Customer Rating */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                    <span>Customer Rating</span>
                  </span>
                  {minRating > 0 && (
                    <button type="button" onClick={() => setMinRating(0)} className="text-[10px] font-bold text-[#6320EE]">Clear</button>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  {[0, 4.5, 4.8].map((r) => {
                    const isSel = minRating === r;
                    const labelText = r === 0 ? "All" : `${r}+ Stars`;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setMinRating(r)}
                        className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 px-2 text-xs font-bold cursor-pointer border active:scale-95 ${
                          isSel
                            ? "bg-[#6320EE] text-white border-[#6320EE] shadow-xs"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50"
                        }`}
                      >
                        <span className="relative z-20 shrink-0 flex items-center justify-center">
                          <Star className={`h-3.5 w-3.5 ${isSel ? "fill-amber-300 text-amber-300" : "fill-amber-400 text-amber-400"} shrink-0`} />
                        </span>
                        <AnimatedLetterText text={labelText} isActive={isSel} delayMultiplier={10} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-4">
              {activeFiltersCount === 1 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex-1 rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer border border-slate-200/80"
                >
                  Reset
                </button>
              )}
              {activeFiltersCount > 1 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex-1 rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer border border-slate-200/80"
                >
                  Reset All ({activeFiltersCount})
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className={`${activeFiltersCount > 0 ? "flex-2" : "w-full"} rounded-2xl bg-[#6320EE] py-3 text-xs font-black text-white shadow-md hover:bg-[#5218cc] transition cursor-pointer`}
              >
                Apply ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
