export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Terms and Conditions
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • 1Fi Technologies Private Limited
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">1. 0% EMI Financing Agreement</h2>
          <p>
            By placing an order with 0% Mutual Fund-backed EMI, you authorize 1Fi Technologies and our RBI-regulated partner lending NBFCs to establish a digital lien on your pledged mutual fund units via registered RTAs (CAMS & KFintech).
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">2. Pledged Asset Security & Compounding</h2>
          <p>
            Your pledged units remain under your ownership in the folio. You will continue to earn regular NAV gains and dividend payouts. Upon successful completion of all EMI payments, the digital lien is automatically revoked.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">3. Repayment & Default Handling</h2>
          <p>
            Monthly EMI installments are automatically debited via NACH/e-Mandate on the scheduled due date. In the event of persistent default exceeding 90 days, the partner NBFC reserves the right to invoke the lien as per RBI Master Directions.
          </p>
        </div>
      </div>
    </div>
  );
}
