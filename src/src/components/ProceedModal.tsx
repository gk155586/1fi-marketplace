"use client";

import { useState } from "react";
import Image from "next/image";
import { Product, ProductVariant, EmiPlan } from "@/types";
import { formatINR } from "@/lib/utils";
import { X, CheckCircle2, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";

interface ProceedModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  selectedVariant: ProductVariant;
  selectedPlan: EmiPlan;
  onOrderSuccess?: (remainingStock: number, variantId: string) => void;
}

export default function ProceedModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
  selectedPlan,
  onOrderSuccess,
}: ProceedModalProps) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "Alex Sharma",
    phone: "9876543210",
    pan: "ABCDE1234F",
    mfProvider: "Groww / Zerodha (CAMS & KFintech)",
  });
  const [orderResult, setOrderResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setStep("loading");

    try {
      const res = await fetch("/api/orders/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          variantId: selectedVariant.id,
          emiPlanId: selectedPlan.id,
          customerName: formData.name,
          phone: formData.phone,
          pan: formData.pan.toUpperCase(),
          folioNumber: "FOLIO-" + Math.floor(10000000 + Math.random() * 90000000),
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setOrderResult(json.data);
        setStep("success");
        if (typeof json.data.remainingStock === "number") {
          onOrderSuccess?.(json.data.remainingStock, json.data.variantId || selectedVariant.id);
        }
      } else {
        setErrorMessage(json.error?.message || "Failed to process pledge");
        setStep("form");
      }
    } catch (err) {
      setErrorMessage("Network error processing order");
      setStep("form");
    }
  };

  const handleReset = () => {
    setErrorMessage(null);
    setStep("form");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl transition-all">
        <button
          onClick={handleReset}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "form" && (
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                ↑Fi
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Confirm Mutual Fund Backed EMI
              </h3>
            </div>

            {errorMessage && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700 border border-rose-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="mt-4 rounded-xl bg-slate-50 p-3.5 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 rounded-lg bg-white p-1 border border-slate-200">
                  <Image
                    src={selectedVariant.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {selectedVariant.colorName} • {selectedVariant.storage}
                  </p>
                  <p className="text-xs font-bold text-slate-900">
                    {formatINR(selectedVariant.price)}
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-200 pt-3 text-xs">
                <div>
                  <span className="text-slate-500">Monthly EMI</span>
                  <p className="font-bold text-indigo-700">
                    {formatINR(selectedPlan.monthlyAmount)} x {selectedPlan.tenureMonths}m
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Interest & Cashback</span>
                  <p className="font-bold text-emerald-700">
                    {selectedPlan.interestRate}% Int. | {formatINR(selectedPlan.cashbackAmount)} CB
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-lg bg-indigo-50/60 p-2.5 border border-indigo-100 text-[11px] text-indigo-900 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Security Lien: </span>
                Requires approx. {formatINR(selectedPlan.minMfPledge)} in active mutual fund holdings. No liquidation required; your funds keep compounding.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    title="10-digit Indian Mobile Number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-indigo-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-indigo-600 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700">
                  Mutual Fund Platform
                </label>
                <select
                  value={formData.mfProvider}
                  onChange={(e) =>
                    setFormData({ ...formData, mfProvider: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:border-indigo-600 focus:outline-none bg-white"
                >
                  <option>Groww / Zerodha (CAMS & KFintech)</option>
                  <option>Kuvera / INDmoney</option>
                  <option>Direct AMC / Registrar</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700"
              >
                <span>Authorize Lien & Place Order</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        )}

        {step === "loading" && (
          <div className="py-12 text-center">
            <Loader2 className="mx-auto h-10 w-10 animate-spin text-indigo-600" />
            <h4 className="mt-4 text-base font-bold text-slate-900">
              Verifying Mutual Fund Portfolio...
            </h4>
            <p className="mt-1 text-xs text-slate-500">
              Connecting with CAMS / KFintech for instant digital lien authorization.
            </p>
          </div>
        )}

        {step === "success" && orderResult && (
          <div className="py-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h3 className="mt-3 text-lg font-extrabold text-slate-900">
              Order & 0% EMI Activated!
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Your mutual fund backed loan has been digitally sanctioned.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-left border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-bold text-slate-900">{orderResult.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Lien Reference</span>
                <span className="font-mono font-bold text-indigo-700">
                  {orderResult.pledgeRef}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">First Monthly EMI</span>
                <span className="font-bold text-slate-900">
                  {formatINR(orderResult.monthlyEmi)} (Due in 30 days)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cashback Status</span>
                <span className="font-bold text-emerald-700">
                  {formatINR(orderResult.cashbackAmount)} credited on delivery
                </span>
              </div>
              {typeof orderResult.remainingStock === "number" && (
                <div className="flex justify-between border-t border-slate-200/60 pt-1.5">
                  <span className="text-slate-500">Live Inventory Status</span>
                  <span className="font-bold text-slate-800">
                    {orderResult.remainingStock > 0 ? `${orderResult.remainingStock} units left` : "Last unit sold!"}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="mt-5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
            >
              Done & Return to Store
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
