"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Store, Navigation } from "lucide-react";

interface NearbyStoresSectionProps {
  searchQuery: string;
}

export default function NearbyStoresSection({
  searchQuery,
}: NearbyStoresSectionProps) {
  const [selectedCity, setSelectedCity] = useState<string>("Gurugram");
  const cities = ["Gurugram", "Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"];

  const stores = [
    {
      id: "pacholi-1",
      name: "Pacholi Suzuki Railway Road",
      distance: "1.0 KM",
      address: "64/9, New Railway Rd, near DSD college, Subhash Nagar, Sector 8, Gurugram, Haryana, 122001",
      category: "Two-Wheelers & Bikes on EMI",
      city: "Gurugram",
      logoLetter: "S",
      logoColor: "bg-red-600 text-white",
    },
    {
      id: "pacholi-2",
      name: "Pacholi Suzuki Rajiv Chowk",
      distance: "1.4 KM",
      address: "6/38, Rajiv Chowk, Sector 33, Rajiv Chowk, Gurugram, Haryana, 122001",
      category: "Two-Wheelers & Service",
      city: "Gurugram",
      logoLetter: "S",
      logoColor: "bg-red-600 text-white",
    },
    {
      id: "malwa-honda",
      name: "Malwa Honda Automobiles",
      distance: "2.1 KM",
      address: "22, Khandsa Rd, Opp. Prem Motors, Sector 10A, Gurugram, Haryana, 122001",
      category: "Honda Two-Wheelers on 0% EMI",
      city: "Gurugram",
      logoLetter: "H",
      logoColor: "bg-red-700 text-white",
    },
    {
      id: "croma-sec29",
      name: "Croma Megastore",
      distance: "2.8 KM",
      address: "Ground Floor, City Centre Mall, Sector 29, Gurugram, Haryana, 122002",
      category: "Smartphones, TVs & Appliances",
      city: "Gurugram",
      logoLetter: "C",
      logoColor: "bg-teal-700 text-white",
    },
    {
      id: "reliance-mg",
      name: "Reliance Digital Megastore",
      distance: "3.2 KM",
      address: "MGF Metropolitan Mall, MG Road, Gurugram, Haryana, 122002",
      category: "Laptops, Audio & Electronics",
      city: "Gurugram",
      logoLetter: "R",
      logoColor: "bg-blue-700 text-white",
    },
    {
      id: "apple-ambience",
      name: "Imagine Apple Premium Reseller",
      distance: "4.5 KM",
      address: "Ambience Mall, NH-8, DLF Phase 3, Gurugram, Haryana, 122002",
      category: "iPhone, Mac, iPad 0% EMI",
      city: "Gurugram",
      logoLetter: "",
      logoColor: "bg-black text-white",
    },
  ];

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">
          Nearby Stores
        </h2>

        {/* City Picker Dropdown */}
        <div className="relative self-start sm:self-auto">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="appearance-none rounded-full border border-purple-200 bg-purple-50/70 py-1.5 pl-3.5 pr-8 text-xs font-bold text-[#6320EE] focus:border-[#6320EE] focus:outline-none cursor-pointer"
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#6320EE] pointer-events-none" />
        </div>
      </div>

      {filteredStores.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center space-y-2">
          <p className="text-sm font-bold text-slate-700">No stores matching &quot;{searchQuery}&quot;</p>
          <p className="text-xs text-slate-500">Try searching for Suzuki, Honda, Croma, or Apple</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs hover:border-[#6320EE] hover:shadow-md transition"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black text-base shadow-xs ${store.logoColor}`}
                >
                  {store.logoLetter}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-slate-900">
                      {store.name}
                    </h3>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                      {store.distance}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    {store.address}
                  </p>
                  <p className="text-[11px] font-semibold text-[#6320EE] pt-0.5">
                    {store.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => alert(`Directions to ${store.name} in ${selectedCity} are open via 1Fi Maps!`)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-purple-200 bg-purple-50 px-3 py-2 text-xs font-bold text-[#6320EE] hover:bg-purple-100 transition"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
