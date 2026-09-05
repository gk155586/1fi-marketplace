"use client";

import { EmiPlan } from "@/types";
import { formatINR } from "@/lib/utils";
import { Check } from "lucide-react";

interface EmiPlanListProps {
  plans: EmiPlan[];
  selectedPlanId: string;
  onSelectPlan: (plan: EmiPlan) => void;
}

export default function EmiPlanList({
  plans,
  selectedPlanId,
  onSelectPlan,
}: EmiPlanListProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-slate-900">
        EMI plans backed by mutual funds
      </h2>

      <div className="space-y-2.5">
        {plans.map((plan) => {
          const isSelected = plan.id === selectedPlanId;

          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`relative cursor-pointer rounded-xl border p-4 transition-all duration-150 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/40 shadow-sm ring-1 ring-indigo-600"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900">
                      {formatINR(plan.monthlyAmount)} x {plan.tenureMonths} months
                    </span>
                  </div>

                  {plan.cashbackAmount > 0 && (
                    <p className="text-xs font-medium text-emerald-700">
                      Additional cashback of {formatINR(plan.cashbackAmount)}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-bold ${
                        plan.isZeroInterest
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {plan.interestRate === 0
                        ? "0% interest"
                        : `${plan.interestRate}% interest`}
                    </span>
                  </div>

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
