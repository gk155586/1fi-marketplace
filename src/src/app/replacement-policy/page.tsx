import Link from "next/link";
import { ShieldCheck, AlertCircle, FileCheck, ArrowRight } from "lucide-react";

export default function ReplacementPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Return & Replacement Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • 1Fi Technologies Private Limited
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-amber-900 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Mandatory Unboxing Video Requirement</p>
            <p className="mt-0.5 text-[11px] text-amber-800">
              An uninterrupted video recording of the outer package and unboxing must be recorded at delivery time for transit damage or missing accessory claims.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">1. Replacement Period & Eligibility</h2>
          <div className="overflow-hidden rounded-xl border border-slate-200 text-xs my-3">
            <table className="w-full text-left">
              <thead className="bg-slate-100 font-bold text-slate-800">
                <tr>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Eligible Period</th>
                  <th className="p-3">Resolution Policy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="p-3 font-medium text-slate-900">Technical / Manufacturing Defect</td>
                  <td className="p-3">2 days from delivery</td>
                  <td className="p-3">Authorized Brand Warranty (at official Apple / Samsung Service Centre)</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Transit Physical Damage or Wrong Item</td>
                  <td className="p-3">2 days from delivery</td>
                  <td className="p-3">Free 1-to-1 Replacement after video verification</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-slate-900">Missing Accessories</td>
                  <td className="p-3">2 days from delivery</td>
                  <td className="p-3">Immediate dispatch of missing components</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">2. Mutual Fund Lien Impact During Replacement</h2>
          <p>
            In case of a replacement, your 0% EMI schedule and digital mutual fund lien status will remain unchanged and active. If an order is canceled before dispatch, the digital lien on your CAMS/KFintech units is automatically released within 24 business hours.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-2">3. How to Raise a Claim</h2>
          <p>
            Send an email to <a href="mailto:support@1fi.in" className="text-[#6320EE] font-bold">support@1fi.in</a> with your Order ID, registered mobile number, and the mandatory unboxing video within 48 hours of product delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
