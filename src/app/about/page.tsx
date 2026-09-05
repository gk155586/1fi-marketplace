import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Users, Target, Award, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <span className="rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold text-[#6320EE] border border-purple-100">
          About 1Fi Technologies
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Democratizing Credit via Real Investment Collateral
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
          1Fi is a revolutionary Indian fintech platform enabling retail investors to finance smartphones, gadgets, and consumer goods at 0% interest by pledging digital mutual fund portfolios.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE] mb-4">
            <Target className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Our Mission</h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Eliminate predatory 24-36% credit card interest rates and empower disciplined mutual fund investors with true 0% liquidity.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE] mb-4">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Regulatory Compliance</h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Operating under SEBI guidelines with CAMS & KFintech registered RTA infrastructure and RBI-compliant lending NBFC partners.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE] mb-4">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Zero Compounding Loss</h3>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">
            Your SIP investments never get liquidated or paused. You continue earning regular dividend and market appreciation returns.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-600 space-y-2">
        <p className="font-bold text-slate-900">Registered Corporate Office:</p>
        <p>1Fi Technologies Private Limited</p>
        <p>Orchid Business Park, Sector-48, Sohna Road, Gurgaon, Haryana, India</p>
        <p>Email: <a href="mailto:support@1fi.in" className="text-[#6320EE] font-medium">support@1fi.in</a></p>
      </div>
    </div>
  );
}
