"use client";

import AnimatedLetterText from "@/components/AnimatedLetterText";

export type ShopTab = "brands" | "nearby" | "marketplace";

interface ShopTabSwitcherProps {
  activeTab: ShopTab;
  onTabChange: (tab: ShopTab) => void;
}

export default function ShopTabSwitcher({
  activeTab,
  onTabChange,
}: ShopTabSwitcherProps) {
  const tabs: { id: ShopTab; label: string }[] = [
    { id: "brands", label: "Top Brands" },
    { id: "nearby", label: "Nearby Stores" },
    { id: "marketplace", label: "Marketplace" },
  ];

  return (
    <div className="mx-auto w-full max-w-lg rounded-full bg-slate-100/90 p-1.5 shadow-xs border border-slate-200/80">
      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center rounded-full py-2.5 px-3 text-xs sm:text-sm font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-white text-[#6320EE] shadow-md ring-1 ring-purple-100"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <AnimatedLetterText text={tab.label} isActive={isSelected} delayMultiplier={12} />
              {isSelected && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-[#6320EE]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
