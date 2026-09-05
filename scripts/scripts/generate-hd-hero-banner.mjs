import sharp from "sharp";
import path from "path";
import fs from "fs";

function writeMarketplaceSectionComponent() {
  const code = `"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import {
  Smartphone,
  Laptop,
  Tv,
  RotateCcw,
  SlidersHorizontal,
  Wind,
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
} from "lucide-react";

interface MarketplaceSectionProps {
  products: Product[];
  isLoading: boolean;
  searchQuery: string;
  onClearSearch: () => void;
}

export default function MarketplaceSection({
  products,
  isLoading,
  searchQuery,
  onClearSearch,
}: MarketplaceSectionProps) {
  // Category State (Default: Mobiles)
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeSubFilter, setActiveSubFilter] = useState<string>("all");

  // Filter States
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [selectedTenure, setSelectedTenure] = useState<string>("all");
  const [onlyZeroInterest, setOnlyZeroInterest] = useState<boolean>(false);
  const [onlyCashback, setOnlyCashback] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Scroll Animation State for Category Icons (Emerge from behind Mobile icon from left to right)
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [isCategoryAnimated, setIsCategoryAnimated] = useState<boolean>(false);

  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;

    // Trigger on scroll into view or initial mount
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCategoryAnimated(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Ordered Category Navigation (Mobiles is index 0 anchor, followed by Electronics, Laptops, Appliances, Kitchen, Cleaners, Deals, All)
  const visualCategories = [
    {
      id: "mobiles",
      label: "Mobiles",
      count: products.filter((p) => p.category === "mobiles").length,
      icon: Smartphone,
      color: "text-indigo-600 bg-indigo-50",
    },
    {
      id: "electronics",
      label: "Electronics",
      count: products.filter((p) => p.category === "electronics").length,
      icon: Headphones,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "laptops",
      cat: "electronics",
      sub: "macbook",
      label: "Laptops",
      count: products.filter((p) => p.slug.includes("macbook") || p.name.toLowerCase().includes("laptop")).length,
      icon: Laptop,
      color: "text-purple-600 bg-purple-50",
    },
    {
      id: "appliances",
      label: "Appliances",
      count: products.filter((p) => p.category === "appliances").length,
      icon: Tv,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "kitchen",
      label: "Kitchen & Home",
      count: products.filter((p) => p.category === "kitchen").length,
      icon: ChefHat,
      color: "text-amber-600 bg-amber-50",
    },
    {
      id: "cleaners",
      cat: "kitchen",
      sub: "dyson",
      label: "Cleaners",
      count: products.filter((p) => p.slug.includes("dyson") || p.category === "kitchen").length,
      icon: Wind,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      id: "deals",
      label: "0% EMI Deals",
      count: products.filter((p) => p.emiPlans.some((ep) => ep.isZeroInterest)).length,
      icon: BadgePercent,
      color: "text-rose-600 bg-rose-50",
    },
    {
      id: "all",
      label: "All Items",
      count: products.length,
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50",
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

  // Active filters counter (Calculates exact number of active filters)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (activeCategory !== "all") count++;
    if (activeSubFilter !== "all") count++;
    if (selectedBrand !== "all") count++;
    if (priceRange !== "all") count++;
    if (selectedTenure !== "all") count++;
    if (onlyZeroInterest) count++;
    if (onlyCashback) count++;
    if (minRating > 0) count++;
    if (sortBy !== "featured") count++;
    if (searchQuery.trim().length > 0) count++;
    return count;
  }, [
    activeCategory,
    activeSubFilter,
    selectedBrand,
    priceRange,
    selectedTenure,
    onlyZeroInterest,
    onlyCashback,
    minRating,
    sortBy,
    searchQuery,
  ]);

  // Reset text logic: 0 -> None, 1 -> "Reset", >1 -> "Reset All"
  const resetLabel = activeFiltersCount === 1 ? "Reset" : "Reset All";

  // Master Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);

        const matchesCategory =
          activeCategory === "all" ||
          (activeCategory === "deals"
            ? p.badge || p.emiPlans.some((ep) => ep.isZeroInterest)
            : p.category === activeCategory);

        let matchesSub = true;
        if (activeSubFilter !== "all") {
          const sf = activeSubFilter.toLowerCase();
          matchesSub =
            p.name.toLowerCase().includes(sf) ||
            p.slug.toLowerCase().includes(sf) ||
            p.description.toLowerCase().includes(sf) ||
            p.brand.toLowerCase().includes(sf);
        }

        const matchesBrand =
          selectedBrand === "all" ||
          p.brand.toLowerCase() === selectedBrand.toLowerCase();

        const defaultPrice = p.variants[0]?.price || 0;
        let matchesPrice = true;
        if (priceRange === "under15k") matchesPrice = defaultPrice < 15000;
        else if (priceRange === "15k-50k") matchesPrice = defaultPrice >= 15000 && defaultPrice <= 50000;
        else if (priceRange === "50k-100k") matchesPrice = defaultPrice > 50000 && defaultPrice <= 100000;
        else if (priceRange === "above100k") matchesPrice = defaultPrice > 100000;

        let matchesTenure = true;
        if (selectedTenure !== "all") {
          const t = parseInt(selectedTenure, 10);
          matchesTenure = p.emiPlans.some((ep) => ep.tenureMonths === t);
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
    selectedBrand,
    priceRange,
    selectedTenure,
    onlyZeroInterest,
    onlyCashback,
    minRating,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setActiveCategory("all");
    setActiveSubFilter("all");
    setSelectedBrand("all");
    setPriceRange("all");
    setSelectedTenure("all");
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

      {/* 2. Sleek Animated Category Navigation Bar (Icons emerge from behind Mobiles icon from left to right) */}
      <div
        ref={categoriesRef}
        className="relative flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-1"
      >
        {visualCategories.map((cat, idx) => {
          const isSelected =
            cat.id === "all"
              ? activeCategory === "all" && activeSubFilter === "all"
              : activeCategory === (cat.cat || cat.id) &&
                (cat.sub ? activeSubFilter === cat.sub : activeSubFilter === "all");
          const Icon = cat.icon;
          const isAnchor = idx === 0;

          // Animation style: Anchor stays solid; other icons emerge from behind with staggered delay
          const animStyle = isAnchor
            ? {}
            : isCategoryAnimated
            ? {
                transform: "translateX(0) scale(1)",
                opacity: 1,
                transition: "all 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: \`\${idx * 70}ms\`,
              }
            : {
                transform: "translateX(-45px) scale(0.85)",
                opacity: 0,
                pointerEvents: "none" as const,
                transition: "all 0.4s ease-in",
              };

          return (
            <button
              key={cat.id}
              type="button"
              style={animStyle}
              onClick={() => {
                if (cat.cat) {
                  setActiveCategory(cat.cat);
                  setActiveSubFilter(cat.sub || "all");
                } else {
                  setActiveCategory(cat.id);
                  setActiveSubFilter("all");
                }
              }}
              className={\`group relative flex shrink-0 items-center gap-2.5 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all duration-200 active:scale-95 shadow-2xs border \${
                isAnchor ? "z-20" : \`z-\${10 - idx}\`
              } \${
                isSelected
                  ? "bg-[#6320EE] text-white border-[#6320EE] shadow-md shadow-purple-200 ring-2 ring-purple-300"
                  : "bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:bg-purple-50/40"
              }\`}
            >
              <span
                className={\`flex h-7 w-7 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 \${
                  isSelected ? "bg-white/20 text-white" : cat.color
                }\`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div className="flex flex-col text-left">
                <span className="leading-tight font-extrabold">{cat.label}</span>
                <span
                  className={\`text-[10px] font-medium \${
                    isSelected ? "text-purple-200" : "text-slate-400"
                  }\`}
                >
                  {cat.count} items
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Main 2-Column E-Commerce Interactive Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sticky Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs sticky top-24 self-start">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
              <Filter className="h-4 w-4 text-[#6320EE]" />
              <span>Refine Products</span>
            </div>

            {/* ONLY render Reset/Reset All if filters are active */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-[#6320EE] hover:underline"
              >
                {resetLabel} ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* Special Toggles */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Special Benefits
            </label>

            <button
              type="button"
              onClick={() => setOnlyZeroInterest(!onlyZeroInterest)}
              className={\`flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-bold transition border \${
                onlyZeroInterest
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-2xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-200"
              }\`}
            >
              <div className="flex items-center gap-2">
                <BadgePercent className="h-4 w-4 text-emerald-600" />
                <span>0% True No-Cost EMI</span>
              </div>
              <span
                className={\`flex h-4 w-4 items-center justify-center rounded-md border \${
                  onlyZeroInterest
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "border-slate-300 bg-white"
                }\`}
              >
                {onlyZeroInterest && <Check className="h-3 w-3" />}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyCashback(!onlyCashback)}
              className={\`flex w-full items-center justify-between rounded-xl p-2.5 text-xs font-bold transition border \${
                onlyCashback
                  ? "bg-amber-50 text-amber-800 border-amber-300 shadow-2xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:border-amber-200"
              }\`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-600" />
                <span>Direct Cashback Deals</span>
              </div>
              <span
                className={\`flex h-4 w-4 items-center justify-center rounded-md border \${
                  onlyCashback
                    ? "bg-amber-500 border-amber-500 text-white"
                    : "border-slate-300 bg-white"
                }\`}
              >
                {onlyCashback && <Check className="h-3 w-3" />}
              </span>
            </button>
          </div>

          {/* Financed Price Range */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Financed Price
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: "all", label: "All Prices" },
                { id: "under15k", label: "Under ₹15,000" },
                { id: "15k-50k", label: "₹15,000 – ₹50,000" },
                { id: "50k-100k", label: "₹50,000 – ₹1,00,000" },
                { id: "above100k", label: "Above ₹1,00,000" },
              ].map((p) => {
                const isSel = priceRange === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriceRange(p.id)}
                    className={\`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition \${
                      isSel
                        ? "bg-[#6320EE] text-white shadow-xs"
                        : "bg-slate-50 text-slate-600 hover:bg-purple-50 hover:text-[#6320EE]"
                    }\`}
                  >
                    <span>{p.label}</span>
                    {isSel && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Partner Brand
            </label>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto no-scrollbar pt-0.5">
              {availableBrands.map((b) => {
                const isSel = selectedBrand === b;
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setSelectedBrand(b)}
                    className={\`rounded-xl px-2.5 py-1.5 text-[11px] font-bold capitalize transition \${
                      isSel
                        ? "bg-[#6320EE] text-white shadow-2xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }\`}
                  >
                    {b === "all" ? "All Brands" : b}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 0% EMI Tenure */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              0% EMI Tenure
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "3", label: "3M (Pay in 3)" },
                { id: "6", label: "6 Months 0%" },
                { id: "12", label: "12 Months 0%" },
                { id: "24", label: "24 Months 0%" },
              ].map((t) => {
                const isSel = selectedTenure === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTenure(t.id)}
                    className={\`rounded-xl px-2.5 py-1.5 text-[11px] font-bold transition \${
                      isSel
                        ? "bg-[#6320EE] text-white shadow-2xs"
                        : "bg-slate-50 text-slate-700 border border-slate-200/80 hover:bg-purple-50"
                    }\`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Customer Rating */}
          <div className="space-y-2">
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              Minimum Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[0, 4.5, 4.8].map((r) => {
                const isSel = minRating === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={\`flex flex-1 items-center justify-center gap-1 rounded-xl py-1.5 text-[11px] font-bold transition \${
                      isSel
                        ? "bg-[#6320EE] text-white shadow-2xs"
                        : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-purple-50"
                    }\`}
                  >
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{r === 0 ? "All" : \`\${r}+\`}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Column: Products Grid & Controls */}
        <div className="lg:col-span-9 space-y-4">
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

          {/* Active Filter Chips (ONLY visible when at least 1 filter is active) */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-bold text-[11px]">Active:</span>

              {activeCategory !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 text-[#6320EE] border border-purple-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Category: {activeCategory}</span>
                  <button type="button" onClick={() => setActiveCategory("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedBrand !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Brand: {selectedBrand}</span>
                  <button type="button" onClick={() => setSelectedBrand("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {priceRange !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Price: {priceRange}</span>
                  <button type="button" onClick={() => setPriceRange("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {selectedTenure !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>{selectedTenure}M 0%</span>
                  <button type="button" onClick={() => setSelectedTenure("all")}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {onlyZeroInterest && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>0% No-Cost Only</span>
                  <button type="button" onClick={() => setOnlyZeroInterest(false)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {onlyCashback && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>Cashback Only</span>
                  <button type="button" onClick={() => setOnlyCashback(false)}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-0.5 font-bold text-[11px]">
                  <span>&quot;{searchQuery}&quot;</span>
                  <button type="button" onClick={onClearSearch}>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}

              {/* Dynamic Reset / Reset All button */}
              <button
                type="button"
                onClick={resetAllFilters}
                className="text-[11px] font-bold text-red-600 hover:underline pl-1"
              >
                {resetLabel}
              </button>
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
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-black transition shadow-md"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : (
            /* Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 font-black text-slate-900 text-sm">
                  <Filter className="h-4 w-4 text-[#6320EE]" />
                  <span>Filters</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Mobile Price Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Financed Price</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: "all", label: "All Prices" },
                    { id: "under15k", label: "Under ₹15,000" },
                    { id: "15k-50k", label: "₹15,000 – ₹50,000" },
                    { id: "50k-100k", label: "₹50,000 – ₹1,00,000" },
                    { id: "above100k", label: "Above ₹1,00,000" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriceRange(p.id)}
                      className={\`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition \${
                        priceRange === p.id
                          ? "bg-[#6320EE] text-white"
                          : "bg-slate-50 text-slate-700"
                      }\`}
                    >
                      <span>{p.label}</span>
                      {priceRange === p.id && <Check className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Brands Filter */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-900">Brand</label>
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
                  {availableBrands.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBrand(b)}
                      className={\`rounded-xl px-3 py-1.5 text-xs font-bold capitalize transition \${
                        selectedBrand === b
                          ? "bg-[#6320EE] text-white"
                          : "bg-slate-100 text-slate-700"
                      }\`}
                    >
                      {b === "all" ? "All Brands" : b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Special Toggles */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOnlyZeroInterest(!onlyZeroInterest)}
                  className={\`flex w-full items-center justify-between rounded-xl p-3 text-xs font-bold border \${
                    onlyZeroInterest
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }\`}
                >
                  <span>0% No-Cost EMI Only</span>
                  {onlyZeroInterest && <Check className="h-4 w-4 text-emerald-600" />}
                </button>

                <button
                  type="button"
                  onClick={() => setOnlyCashback(!onlyCashback)}
                  className={\`flex w-full items-center justify-between rounded-xl p-3 text-xs font-bold border \${
                    onlyCashback
                      ? "bg-amber-50 text-amber-800 border-amber-300"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  }\`}
                >
                  <span>Direct Cashback Deals</span>
                  {onlyCashback && <Check className="h-4 w-4 text-amber-600" />}
                </button>
              </div>
            </div>

            {/* Mobile Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="flex-1 rounded-xl bg-slate-100 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200"
                >
                  {resetLabel}
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 rounded-xl bg-[#6320EE] py-3 text-xs font-bold text-white shadow-md"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
`;

  fs.writeFileSync("src/components/MarketplaceSection.tsx", code);
  console.log("Written src/componentwriteMarketplaceSectionComponent();HeroBanner.tsx", code);
  console.log("Written src/components/HeroBanner.tsx successfully!");
}

writeHeroBannerComponent();

async function generateCompositeHeroBanner() {
  const width = 2400;
  const height = 980;

  console.log("Generating high-definition 1Fi hero banner...");

  // 1. Create rich background SVG with modern Fintech gradient, neon mesh, radial flares, and crisp typography
  const baseSvg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Deep Luxury Fintech Gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B011D" />
        <stop offset="30%" stop-color="#180438" />
        <stop offset="65%" stop-color="#28085C" />
        <stop offset="100%" stop-color="#43108E" />
      </linearGradient>

      <!-- Ambient Glow Spheres -->
      <radialGradient id="purpleGlow" cx="20%" cy="30%" r="50%">
        <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="cyanGlow" cx="85%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.35" />
        <stop offset="50%" stop-color="#A855F7" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="goldGlow" cx="50%" cy="85%" r="45%">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.25" />
        <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
      </radialGradient>

      <!-- Glass Card Gradients -->
      <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.04" />
      </linearGradient>

      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FDE047" />
        <stop offset="50%" stop-color="#F472B6" />
        <stop offset="100%" stop-color="#A78BFA" />
      </linearGradient>

      <linearGradient id="greenGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#10B981" />
        <stop offset="100%" stop-color="#34D399" />
      </linearGradient>

      <!-- Filters for Drop Shadows & Glow -->
      <filter id="shadowLarge" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="25" stdDeviation="35" flood-color="#04000C" flood-opacity="0.75" />
      </filter>

      <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.5" />
      </filter>

      <filter id="badgeGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="16" flood-color="#8B5CF6" flood-opacity="0.5" />
      </filter>
    </defs>

    <!-- Canvas Background -->
    <rect width="${width}" height="${height}" rx="48" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" rx="48" fill="url(#purpleGlow)" />
    <rect width="${width}" height="${height}" rx="48" fill="url(#cyanGlow)" />
    <rect width="${width}" height="${height}" rx="48" fill="url(#goldGlow)" />

    <!-- Modern Grid Overlay with low opacity -->
    <g stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1.5">
      <line x1="0" y1="140" x2="${width}" y2="140" />
      <line x1="0" y1="280" x2="${width}" y2="280" />
      <line x1="0" y1="420" x2="${width}" y2="420" />
      <line x1="0" y1="560" x2="${width}" y2="560" />
      <line x1="0" y1="700" x2="${width}" y2="700" />
      <line x1="0" y1="840" x2="${width}" y2="840" />
      
      <line x1="200" y1="0" x2="200" y2="${height}" />
      <line x1="500" y1="0" x2="500" y2="${height}" />
      <line x1="800" y1="0" x2="800" y2="${height}" />
      <line x1="1100" y1="0" x2="1100" y2="${height}" />
      <line x1="1400" y1="0" x2="1400" y2="${height}" />
      <line x1="1700" y1="0" x2="1700" y2="${height}" />
      <line x1="2000" y1="0" x2="2000" y2="${height}" />
    </g>

    <!-- Ambient Sparkle Stars -->
    <g fill="#FEF08A">
      <polygon points="160,190 166,210 186,216 166,222 160,242 154,222 134,216 154,210" opacity="0.85" />
      <polygon points="980,140 985,155 1000,160 985,165 980,180 975,165 960,160 975,155" opacity="0.9" />
      <polygon points="1260,110 1264,124 1278,128 1264,132 1260,146 1256,132 1242,128 1256,124" opacity="0.8" />
      <polygon points="2280,180 2285,195 2300,200 2285,205 2280,220 2275,205 2260,200 2275,195" opacity="0.95" />
      <polygon points="2140,820 2145,835 2160,840 2145,845 2140,860 2135,845 2120,840 2135,835" opacity="0.75" />
    </g>

    <!-- Ambient Glowing Light Orbs in Right Visual Stage -->
    <circle cx="1780" cy="480" r="320" fill="#7C3AED" opacity="0.35" filter="url(#shadowLarge)" />
    <circle cx="2050" cy="420" r="260" fill="#06B6D4" opacity="0.25" filter="url(#shadowLarge)" />

    <!-- ================= LEFT COLUMN: HERO TYPOGRAPHY & VALUE PROPOSITION ================= -->
    <g transform="translate(130, 140)">
      <!-- 1. Glowing Badge: 1Fi REVOLUTION -->
      <g filter="url(#badgeGlow)">
        <rect x="0" y="0" width="460" height="64" rx="32" fill="url(#glassGrad)" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2" />
        <!-- Neon Dot -->
        <circle cx="34" cy="32" r="9" fill="#10B981" />
        <circle cx="34" cy="32" r="14" fill="#10B981" opacity="0.35" />
        <text x="58" y="41" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" letter-spacing="1.5">0% INTEREST • NO CREDIT CARD</text>
      </g>

      <!-- 2. Main High-Impact Headline -->
      <text x="0" y="180" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="88" font-weight="900" letter-spacing="-2">Shop Today,</text>
      <text x="0" y="275" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="88" font-weight="900" letter-spacing="-2">Pay at <tspan fill="url(#textGrad)">0% EMI</tspan></text>
      <text x="0" y="370" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="88" font-weight="900" letter-spacing="-2">using Mutual Funds.</text>

      <!-- 3. Subtitle / Value Prop -->
      <text x="0" y="460" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="500" letter-spacing="0.2">Don&apos;t break your investments. Keep compounding at 12–15%</text>
      <text x="0" y="505" fill="#CBD5E1" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="400" letter-spacing="0.2">while enjoying latest flagship electronics with zero extra cost.</text>

      <!-- 4. Feature Trust Bullets -->
      <g transform="translate(0, 565)">
        <!-- Bullet 1 -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="310" height="56" rx="18" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5" />
          <text x="24" y="36" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800">✓</text>
          <text x="56" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700">100% Digital Approval</text>
        </g>
        <!-- Bullet 2 -->
        <g transform="translate(330, 0)">
          <rect x="0" y="0" width="290" height="56" rx="18" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5" />
          <text x="24" y="36" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800">✓</text>
          <text x="56" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700">Zero Interest Rate</text>
        </g>
        <!-- Bullet 3 -->
        <g transform="translate(640, 0)">
          <rect x="0" y="0" width="300" height="56" rx="18" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5" />
          <text x="24" y="36" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800">✓</text>
          <text x="56" y="36" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="700">Portfolio Keeps Growing</text>
        </g>
      </g>
    </g>

    <!-- ================= RIGHT COLUMN: FINTECH STATS GLASS CARDS ================= -->
    <!-- Top Glass Stat Pill (Mutual Fund Growth) -->
    <g transform="translate(1360, 110)" filter="url(#cardShadow)">
      <rect x="0" y="0" width="440" height="110" rx="28" fill="#1E103E" fill-opacity="0.85" stroke="#8B5CF6" stroke-opacity="0.45" stroke-width="2" />
      <circle cx="56" cy="55" r="30" fill="#10B981" fill-opacity="0.2" />
      <text x="44" y="63" fill="#10B981" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900">↗</text>
      <text x="104" y="46" fill="#E2E8F0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="600">SIP Investment Value</text>
      <text x="104" y="80" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="900">Compounding +14.8% p.a.</text>
    </g>

    <!-- Bottom Glass Stat Pill (Total Saved in Interest) -->
    <g transform="translate(1820, 770)" filter="url(#cardShadow)">
      <rect x="0" y="0" width="460" height="120" rx="28" fill="#15062C" fill-opacity="0.9" stroke="#EC4899" stroke-opacity="0.4" stroke-width="2" />
      <circle cx="60" cy="60" r="32" fill="#F59E0B" fill-opacity="0.2" />
      <text x="46" y="70" fill="#F59E0B" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900">₹</text>
      <text x="110" y="50" fill="#FBCFE8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="700">0% True No-Cost EMI</text>
      <text x="110" y="86" fill="#34D399" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="900">₹0 Interest • ₹0 Processing</text>
    </g>
  </svg>
  `;

  // 2. Prepare sharp composition: render SVG background, then overlay high-res product devices
  const svgBuffer = Buffer.from(baseSvg);
  let image = sharp(svgBuffer);

  // Resize and prepare device overlays
  // MacBook Pro M3 (Right Stage background)
  const macBuffer = await sharp("public/products/macbook-pro-m3.jpg")
    .resize(540, 540, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // iPhone 17 Pro (Center Stage hero)
  const iphoneBuffer = await sharp("public/products/iphone-17-pro.jpg")
    .resize(420, 580, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Sony XM5 / Watch (Right Accent)
  const watchBuffer = await sharp("public/products/apple-watch-ultra-2.jpg")
    .resize(320, 320, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const sonyBuffer = await sharp("public/products/sony-wh-1000xm5.jpg")
    .resize(340, 340, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Composite images on top of the banner
  // Using rounded borders / soft masks for clean integration
  const macOverlay = await sharp(macBuffer)
    .composite([
      {
        input: Buffer.from(
          `<svg width="540" height="540"><rect x="0" y="0" width="540" height="540" rx="36" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .toBuffer();

  const iphoneOverlay = await sharp(iphoneBuffer)
    .composite([
      {
        input: Buffer.from(
          `<svg width="420" height="580"><rect x="0" y="0" width="420" height="580" rx="40" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .toBuffer();

  const watchOverlay = await sharp(watchBuffer)
    .composite([
      {
        input: Buffer.from(
          `<svg width="320" height="320"><rect x="0" y="0" width="320" height="320" rx="32" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .toBuffer();

  const sonyOverlay = await sharp(sonyBuffer)
    .composite([
      {
        input: Buffer.from(
          `<svg width="340" height="340"><rect x="0" y="0" width="340" height="340" rx="32" fill="#fff"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .toBuffer();

  // Overlay device images onto the banner canvas
  const finalBanner = await image
    .composite([
      { input: macOverlay, top: 220, left: 1420 },
      { input: sonyOverlay, top: 160, left: 1940 },
      { input: iphoneOverlay, top: 260, left: 1680 },
      { input: watchOverlay, top: 480, left: 1360 },
    ])
    .png({ quality: 100 })
    .toFile("public/hero-1fi-banner.png");

  console.log("Successfully rendered public/hero-1fi-banner.png", finalBanner);
}

generateCompositeHeroBanner().catch(console.error);
