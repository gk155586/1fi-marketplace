import { ShieldCheck, FileText } from "lucide-react";

export default function DisclosuresPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-3 border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          SEBI & RBI Regulatory Disclosures
        </h1>
        <p className="text-xs text-slate-500">
          Statutory financial disclosures • 1Fi Technologies Private Limited
        </p>
      </div>

      <div className="mt-8 space-y-6 text-xs text-slate-700 leading-relaxed">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-900 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Regulated Fintech Intermediary</p>
            <p className="mt-0.5 text-[11px] text-emerald-800">
              1Fi Technologies operates as a technology service provider and loan origination platform in strict adherence with SEBI Mutual Fund regulations and RBI Master Direction - Digital Lending 2022.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">1. Lending Partners</h2>
          <p>
            Credit lines and 0% EMI financing are underwritten and sanctioned by RBI-registered Non-Banking Financial Companies (NBFCs) and Scheduled Commercial Banks partnered with 1Fi.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">2. Digital Registrar and Transfer Agents (RTAs)</h2>
          <p>
            Mutual fund pledge creation and release are processed directly via SEBI-registered RTAs:
          </p>
          <ul className="list-disc pl-5 mt-1.5 space-y-1">
            <li><strong>CAMS</strong> (Computer Age Management Services Limited)</li>
            <li><strong>KFintech</strong> (KFin Technologies Limited)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 mb-1">3. Grievance Redressal</h2>
          <p>
            For any queries or regulatory escalations, our Grievance Redressal Officer can be reached at <a href="mailto:support@1fi.in" className="text-[#6320EE] font-bold">support@1fi.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
