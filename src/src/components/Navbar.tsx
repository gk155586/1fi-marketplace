"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import PayEmiModal from "@/components/PayEmiModal";
import SidebarDrawer from "@/components/SidebarDrawer";
import {
  Menu,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

function NavbarContent() {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: 3-Lines Hamburger Menu + 1Fi Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-800 hover:bg-slate-100 transition focus:outline-none active:scale-95"
                aria-label="Open 1Fi Navigation Menu"
              >
                <Menu className="h-6 w-6 text-slate-800" />
              </button>

              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-xs">
                  <Image
                    src="/logo.png"
                    alt="1Fi Official Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                    1Fi <span className="text-[#6320EE] font-bold text-sm">Store</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    0% Mutual Fund EMI
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Regulatory Status & Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden lg:flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>SEBI &amp; RBI Regulated</span>
              </div>

              <button
                type="button"
                onClick={() => setIsPayModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-purple-300 transition"
              >
                <CreditCard className="h-3.5 w-3.5 text-[#6320EE]" />
                <span>Pay EMI</span>
              </button>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#6320EE] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#5218cc] transition active:scale-95"
              >
                <span>Get 0% Credit</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-Out Drawer Triggered by 3-Lines Menu */}
      <SidebarDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenPayEmi={() => setIsPayModalOpen(true)}
      />

      {/* Quick Pay EMI Modal */}
      <PayEmiModal
        isOpen={isPayModalOpen}
        onClose={() => setIsPayModalOpen(false)}
      />
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
      <NavbarContent />
    </Suspense>
  );
}
