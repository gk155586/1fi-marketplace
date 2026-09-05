"use client";

import { useState } from "react";
import { formatINR } from "@/lib/utils";
import {
  CreditCard,
  CheckCircle2,
  Lock,
  Smartphone,
  ShieldCheck,
  Calendar,
  AlertCircle,
  X,
  ArrowRight,
} from "lucide-react";

interface PayEmiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PayEmiModal({ isOpen, onClose }: PayEmiModalProps) {
  const [mobileNumber, setMobileNumber] = useState<string>("9876543210");
  const [step, setStep] = useState<"search" | "bill" | "success">("search");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  if (!isOpen) return null;

  const handleFetchBill = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("bill");
    }, 600);
  };

  const handlePay = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1000);
  };

  const handleReset = () => {
    setStep("search");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl transition-all animate-in fade-in zoom-in duration-150">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-[#6320EE]">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              1Fi Quick EMI Payment Portal
            </h3>
            <p className="text-xs text-slate-500">
              Pay your monthly 0% Mutual Fund-backed EMI securely
            </p>
          </div>
        </div>

        {step === "search" && (
          <form onSubmit={handleFetchBill} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Registered Mobile Number or Loan ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="e.g. 9876543210 or 1FI-LN-8921"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 focus:border-[#6320EE] focus:bg-white focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-400">
                Enter your 10-digit mobile number linked to your mutual fund lien.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Instant Lien Status Sync</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Successful EMI payments are immediately reported to CAMS &amp; KFintech to maintain your digital collateral health.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6320EE] py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-200 hover:bg-[#5218cc] transition active:scale-[0.99]"
            >
              {isLoading ? (
                <span>Fetching Active Loan Details...</span>
              ) : (
                <>
                  <span>Fetch Due EMI</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        )}

        {step === "bill" && (
          <div className="space-y-4">
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">Loan ID: 1FI-2026-8941</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-800 text-[10px]">
                  ACTIVE LOAN
                </span>
              </div>
              <div className="border-t border-purple-100/60 pt-2 flex items-center justify-between text-slate-600">
                <span>Financed Product:</span>
                <strong className="text-slate-900">Apple iPhone 17 (Mist Blue)</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Installment:</span>
                <span className="font-semibold text-slate-800">Month 3 of 12 (0% EMI)</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Due Date:</span>
                <span className="font-semibold text-amber-700">3rd Oct 2026</span>
              </div>
              <div className="border-t border-purple-100/60 pt-2 flex items-center justify-between text-slate-900">
                <span className="font-bold">Total Payable Amount:</span>
                <span className="text-base font-black text-[#6320EE]">{formatINR(7491)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("upi")}
                  className={`rounded-xl border p-2.5 font-bold text-center transition ${
                    paymentMethod === "upi"
                      ? "border-[#6320EE] bg-purple-50 text-[#6320EE] ring-1 ring-[#6320EE]"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Instant UPI
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`rounded-xl border p-2.5 font-bold text-center transition ${
                    paymentMethod === "netbanking"
                      ? "border-[#6320EE] bg-purple-50 text-[#6320EE] ring-1 ring-[#6320EE]"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Net Banking
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("mandate")}
                  className={`rounded-xl border p-2.5 font-bold text-center transition ${
                    paymentMethod === "mandate"
                      ? "border-[#6320EE] bg-purple-50 text-[#6320EE] ring-1 ring-[#6320EE]"
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Auto-Debit
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePay}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition active:scale-[0.99]"
            >
              {isLoading ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  <span>Pay {formatINR(7491)} Instantly</span>
                </>
              )}
            </button>
          </div>
        )}

        {step === "success" && (
          <div className="text-center space-y-4 py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-900">
                Payment Successful!
              </h4>
              <p className="text-xs text-slate-500">
                Transaction Ref: TXN-1FI-{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 space-y-1 text-left border border-slate-100">
              <p><strong>Amount Paid:</strong> {formatINR(7491)}</p>
              <p><strong>Next EMI Due:</strong> 3rd Nov 2026</p>
              <p><strong>Lien Status:</strong> In Good Standing (100% Units Compounding)</p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-bold text-white hover:bg-slate-800 transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
