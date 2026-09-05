"use client";

import Link from "next/link";
import { ChevronRight, Sparkles, Plane, Smartphone, Gem, Building2, Store } from "lucide-react";

interface TopBrandsSectionProps {
  searchQuery: string;
  onSelectBrandCategory?: (brand: string) => void;
}

export default function TopBrandsSection({
  searchQuery,
  onSelectBrandCategory,
}: TopBrandsSectionProps) {
  const brands = [
    {
      id: "air-india",
      name: "Air India",
      emiSubtitle: "No-cost EMIs upto 18 months",
      logoBg: "bg-red-600 text-white",
      icon: Plane,
      categoryFilter: "deals",
    },
    {
      id: "apple",
      name: "Apple Premium Reseller",
      emiSubtitle: "No-cost EMIs upto 24 months",
      logoBg: "bg-black text-white",
      icon: Smartphone,
      categoryFilter: "mobiles",
    },
    {
      id: "caratlane",
      name: "CaratLane",
      emiSubtitle: "No-cost EMIs upto 6 months",
      logoBg: "bg-purple-900 text-white",
      icon: Gem,
      categoryFilter: "deals",
    },
    {
      id: "cygnus",
      name: "Cygnus Experience Hotels",
      emiSubtitle: "No-cost EMIs upto 24 months",
      logoBg: "bg-slate-900 text-white",
      icon: Building2,
      categoryFilter: "deals",
    },
    {
      id: "samsung",
      name: "Samsung Official Experience Store",
      emiSubtitle: "No-cost EMIs upto 24 months",
      logoBg: "bg-blue-600 text-white",
      icon: Smartphone,
      categoryFilter: "mobiles",
    },
    {
      id: "croma",
      name: "Croma Megastore",
      emiSubtitle: "No-cost EMIs upto 18 months",
      logoBg: "bg-teal-700 text-white",
      icon: Store,
      categoryFilter: "electronics",
    },
    {
      id: "vijaysales",
      name: "Vijay Sales Electronics",
      emiSubtitle: "No-cost EMIs upto 12 months",
      logoBg: "bg-orange-600 text-white",
      icon: Store,
      categoryFilter: "appliances",
    },
    {
      id: "reliance",
      name: "Reliance Digital",
      emiSubtitle: "No-cost EMIs upto 24 months",
      logoBg: "bg-red-700 text-white",
      icon: Store,
      categoryFilter: "electronics",
    },
  ];

  const filteredBrands = brands.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Top Brands
        </h2>
        <span className="text-xs font-semibold text-slate-500">
          {filteredBrands.length} Partner Brands
        </span>
      </div>

      {filteredBrands.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-2">
          <p className="text-sm font-bold text-slate-700">No partner brands matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-slate-500">Try searching for Apple, Samsung, Air India, or Croma</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBrands.map((brand) => {
            const Icon = brand.icon;
            return (
              <Link
                key={brand.id}
                href={`/?category=${brand.categoryFilter}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-[#6320EE] hover:shadow-md transition group"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl font-black shadow-xs ${brand.logoBg}`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#6320EE] transition">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {brand.emiSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block text-xs font-bold text-[#6320EE] opacity-0 group-hover:opacity-100 transition">
                    Explore Offers
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 group-hover:bg-purple-50 text-slate-400 group-hover:text-[#6320EE] transition">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
