"use client";

import { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { FALLBACK_PRODUCTS } from "@/lib/catalog-data";
import ShopTabSwitcher, { ShopTab } from "@/components/ShopTabSwitcher";
import TopBrandsSection from "@/components/TopBrandsSection";
import NearbyStoresSection from "@/components/NearbyStoresSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import BottomNav, { BottomNavTab } from "@/components/BottomNav";
import HeroBanner from "@/components/HeroBanner";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  X,
  Clock,
  Home,
  ReceiptText,
  User,
  ShoppingBag,
} from "lucide-react";

function ShopHomeContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("search") || "";

  // Bottom Navigation State
  const [bottomTab, setBottomTab] = useState<BottomNavTab>("shop");

  // Shop Sub-Tab State: Top Brands | Nearby Stores | 1Fi Marketplace
  const [activeShopTab, setActiveShopTab] = useState<ShopTab>("marketplace");
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS || []);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // If a category param is passed, switch directly to Marketplace
  useEffect(() => {
    if (initialCategory) {
      setBottomTab("shop");
      setActiveShopTab("marketplace");
    }
  }, [initialCategory]);

  // Record scroll position continuously so refresh maintains exact scroll point
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      sessionStorage.setItem("1fi_shop_scroll_pos", currentScroll.toString());
    };

    const handleBeforeUnload = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      sessionStorage.setItem("1fi_shop_scroll_pos", currentScroll.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : json.data || [];
          if (items && items.length > 0) {
            setProducts(items);
          }
        }
      } catch (err) {
        console.warn("Background catalog refresh notice:", err);
      }
    }
    fetchCatalog();
  }, []);

  // Restore exact scroll position as soon as products finish loading
  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const savedScroll = sessionStorage.getItem("1fi_shop_scroll_pos");
      if (savedScroll) {
        const targetY = parseInt(savedScroll, 10);
        if (!isNaN(targetY) && targetY > 0) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: targetY,
              behavior: "instant" as ScrollBehavior,
            });
          });
          setTimeout(() => {
            window.scrollTo({
              top: targetY,
              behavior: "instant" as ScrollBehavior,
            });
          }, 60);
        }
      }
    }
  }, [isLoading, products]);

  // Dynamic search placeholder depending on active tab
  const searchPlaceholder = useMemo(() => {
    if (activeShopTab === "brands") return "Search online stores & partner brands...";
    if (activeShopTab === "nearby") return "Search nearby stores in Gurugram, Bengaluru...";
    return "Search products (e.g. iPhone 17, MacBook, Sony, Dyson)...";
  }, [activeShopTab]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8 pb-28">
      {/* If bottom navigation is set to Home, EMI Dues, Limit, or Profile -> Render Coming Soon */}
      {bottomTab !== "shop" ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 text-center shadow-xs space-y-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-50 text-[#6320EE]">
            {bottomTab === "home" && <Home className="h-10 w-10" />}
            {bottomTab === "emi_dues" && <ReceiptText className="h-10 w-10" />}
            {bottomTab === "limit" && <TrendingUp className="h-10 w-10" />}
            {bottomTab === "profile" && <User className="h-10 w-10" />}
          </div>

          <div className="space-y-2 max-w-md">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-[#6320EE] border border-purple-100">
              <Clock className="h-3.5 w-3.5" />
              <span>Coming Soon</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 capitalize">
              {bottomTab === "home" && "1Fi Portfolio Overview"}
              {bottomTab === "emi_dues" && "EMI Repayment Dashboard"}
              {bottomTab === "limit" && "Mutual Fund Credit Limit"}
              {bottomTab === "profile" && "Account & KYC Profile"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              This feature is currently under active development. You can explore products, calculate 0% interest tenures, and shop using mutual funds in the Marketplace.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setBottomTab("shop")}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#6320EE] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#5218cc] transition active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Go to Shop &amp; Marketplace</span>
          </button>
        </div>
      ) : (
        /* SHOP TAB ACTIVE: Complete 1Fi Shop Experience */
        <div className="space-y-8">
          {/* 1. Ultra-HD Dynamic Hero Promotional Banner */}
          <HeroBanner />

          {/* 2. Shop Tab Switcher (Top Brands | Nearby Stores | 1Fi Marketplace) */}
          <ShopTabSwitcher
            activeTab={activeShopTab}
            onTabChange={(tab) => {
              setActiveShopTab(tab);
              setSearchQuery("");
            }}
          />

          {/* 3. Active Shop Section Content */}
          <div className="pt-2">
            {activeShopTab === "brands" && (
              <TopBrandsSection searchQuery={searchQuery} />
            )}

            {activeShopTab === "nearby" && (
              <NearbyStoresSection searchQuery={searchQuery} />
            )}

            {activeShopTab === "marketplace" && (
              <MarketplaceSection
                products={products}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery("")}
              />
            )}
          </div>
        </div>
      )}

      {/* 5. Persistent Mobile Floating Bottom Navigation */}
      <BottomNav activeTab={bottomTab} onTabChange={setBottomTab} />
    </div>
  );
}

export default function ShopHomePage() {
  return (
    <Suspense fallback={<div className="h-96 flex items-center justify-center text-xs text-slate-400">Loading 1Fi Shop...</div>}>
      <ShopHomeContent />
    </Suspense>
  );
}
