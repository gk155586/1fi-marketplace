import Link from "next/link";
import { ShieldCheck, TrendingUp, Percent, ArrowRight, Smartphone } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      step: "01",
      title: "Select Product & 0% EMI Tenure",
      desc: "Pick your favorite smartphone, laptop, or gadget from 1Fi catalog and choose your preferred EMI plan (6, 9, 12, or 24 months).",
      icon: Smartphone,
    },
    {
      step: "02",
      title: "Link & Pledge Mutual Funds Digitally",
      desc: "Connect your existing folio with CAMS or KFintech using your PAN & OTP. Pledge mutual funds as digital collateral without liquidating them.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      title: "Instant 0% Credit Line Approval",
      desc: "Your credit limit is approved in under 2 minutes. No credit score or CIBIL hard inquiry required.",
      icon: Percent,
    },
    {
      step: "04",
      title: "Fast Delivery & Continuous Growth",
      desc: "We dispatch your product in under 48 hours. Your pledged mutual fund units continue to earn daily NAV returns and compounding gains!",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <span className="rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold text-[#6320EE] border border-purple-100">
          The 1Fi Innovation
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          How 0% Mutual Fund-Backed EMI Works
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
          Why break compounding returns or pay high credit card interest when your existing investments can power your purchases at 0% rate?
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-[#6320EE]/30">
                  {s.step}
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-[#6320EE]">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-xl font-black">Ready to unlock 0% EMI?</h3>
          <p className="text-xs text-slate-300">
            Explore all products across smartphones, electronics, appliances, and home essentials.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#6320EE] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#5218cc] transition active:scale-95"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
