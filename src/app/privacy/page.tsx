export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 • 1Fi Technologies Private Limited
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">1. Data Protection & Encryption</h2>
          <p>
            1Fi Technologies is committed to protecting your personal and financial information. All communication between your client device and our servers is secured using 256-bit SSL encryption.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">2. Information Collected</h2>
          <p>
            We only collect information essential for KYC compliance, digital lien registration, and order fulfillment, including PAN, registered mobile number, email address, and shipping address. We never store debit/credit card CVV or net banking passwords.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">3. Third-Party Sharing</h2>
          <p>
            Information is strictly shared with regulated financial intermediaries including CAMS, KFintech, and partner NBFCs for lien establishment as mandated by SEBI and RBI regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
