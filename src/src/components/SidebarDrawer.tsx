"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  X,
  Smartphone,
  Laptop,
  Headphones,
  Tv,
  Wind,
  ShieldCheck,
  CreditCard,
  PhoneCall,
  Lock,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Percent,
  Sparkles,
} from "lucide-react";

interface SidebarDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPayEmi: () => void;
}

export default function SidebarDrawer({
  isOpen,
  onClose,
  onOpenPayEmi,
}: SidebarDrawerProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer Container */}
      <div className="relative z-50 flex h-full w-full max-w-xs flex-col bg-white shadow-2xl transition-transform animate-in slide-in-from-left duration-200">
        {/* User Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-[#6320EE] font-black text-sm">
              1Fi
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Welcome Investor</p>
              <Link
                href="/how-it-works"
                onClick={onClose}
                className="text-[11px] font-semibold text-[#6320EE] hover:underline"
              >
                Link Mutual Funds &gt;
              </Link>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 1Fi App & Zero Downpayment Banner */}
        <div className="p-3">
          <div className="rounded-2xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-3.5 text-xs text-slate-900">
            <div className="flex items-center gap-2 font-black text-[#6320EE]">
              <Sparkles className="h-4 w-4" />
              <span>0% Downpayment EMI</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600 leading-tight">
              Pledge existing CAMS/KFintech units. Keep compounding returns!
            </p>
            <Link
              href="/how-it-works"
              onClick={onClose}
              className="mt-2 block w-full rounded-xl bg-slate-900 py-1.5 text-center text-[11px] font-bold text-white hover:bg-slate-800 transition"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1 text-xs font-semibold text-slate-700">
          {/* Categories Accordion */}
          <div>
            <button
              type="button"
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-slate-900 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-purple-50 text-[#6320EE]">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <span className="font-bold">Categories</span>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform ${
                  isCategoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCategoriesOpen && (
              <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-purple-100 pl-3 text-slate-600">
                <Link
                  href="/?category=mobiles"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-[#6320EE] transition"
                >
                  <span>Smartphones &amp; Tablets</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </Link>
                <Link
                  href="/?category=electronics"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-[#6320EE] transition"
                >
                  <span>Laptops &amp; Headphones</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </Link>
                <Link
                  href="/?category=appliances"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-[#6320EE] transition"
                >
                  <span>TV &amp; Home Appliances</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </Link>
                <Link
                  href="/?category=kitchen"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-[#6320EE] transition"
                >
                  <span>Kitchen &amp; Vacuums</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </Link>
                <Link
                  href="/?category=deals"
                  onClick={onClose}
                  className="flex items-center justify-between py-1.5 hover:text-[#6320EE] transition"
                >
                  <span>Special Deals &amp; Offers</span>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/?category=deals"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition"
          >
            <Percent className="h-4 w-4 text-[#6320EE]" />
            <span>0% EMI Deals</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPayEmi();
            }}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition text-left"
          >
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <span>Pay Monthly EMI</span>
          </button>

          <Link
            href="/how-it-works"
            onClick={onClose}
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 hover:bg-slate-50 transition"
          >
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <span>How 0% MF EMI Works</span>
          </Link>

          <div className="border-t border-slate-100 pt-2">
            <Link
              href="/about"
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition text-slate-500"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Contact Us &amp; Support</span>
            </Link>

            <Link
              href="/privacy"
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition text-slate-500"
            >
              <Lock className="h-4 w-4" />
              <span>Privacy Policy</span>
            </Link>

            <Link
              href="/terms"
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition text-slate-500"
            >
              <FileText className="h-4 w-4" />
              <span>Terms &amp; Conditions</span>
            </Link>

            <Link
              href="/disclosures"
              onClick={onClose}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 hover:bg-slate-50 transition text-slate-500"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Regulatory Disclosures</span>
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-100 p-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} 1Fi Technologies Pvt. Ltd.</p>
          <p className="text-[10px] text-slate-500 mt-0.5">SEBI &amp; RBI Regulated Intermediary</p>
        </div>
      </div>
    </div>
  );
}
