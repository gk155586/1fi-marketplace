"use client";

import {
  Home,
  ShoppingBag,
  ReceiptText,
  TrendingUp,
  User,
} from "lucide-react";

export type BottomNavTab = "home" | "shop" | "emi_dues" | "limit" | "profile";

interface BottomNavProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: BottomNavTab; label: string; icon: any }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: ShoppingBag },
    { id: "emi_dues", label: "EMI Dues", icon: ReceiptText },
    { id: "limit", label: "Limit", icon: TrendingUp },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md rounded-3xl border border-slate-200/80 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-0.5 relative py-1 px-3 rounded-2xl transition-all ${
                isSelected ? "text-[#6320EE]" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-bold">{item.label}</span>
              {isSelected && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full bg-[#6320EE]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
