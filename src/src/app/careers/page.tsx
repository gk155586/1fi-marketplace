import Link from "next/link";
import { Briefcase, MapPin, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const openings = [
    {
      title: "Software Development Engineer (SDE-1 / Full-Stack)",
      team: "Engineering",
      location: "Gurgaon / Remote",
      type: "Full-Time",
      desc: "Build mission-critical fintech infrastructure across Next.js, Node.js, Prisma, PostgreSQL, and CAMS/KFintech lien APIs.",
    },
    {
      title: "Backend Engineer - Financial Systems",
      team: "Core Banking",
      location: "Gurgaon, India",
      type: "Full-Time",
      desc: "Design zero-latency loan management, automated lien release webhooks, and regulatory reporting pipelines.",
    },
    {
      title: "Product Designer (UI/UX)",
      team: "Design",
      location: "Bangalore / Remote",
      type: "Full-Time",
      desc: "Craft seamless, intuitive e-commerce & portfolio checkout flows for millions of Indian mutual fund investors.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center space-y-4">
        <span className="rounded-full bg-purple-50 px-3.5 py-1 text-xs font-bold text-[#6320EE] border border-purple-100">
          Work with 1Fi
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Shape the Future of Investment-Backed Financing
        </h1>
        <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-600 leading-relaxed">
          Join an agile team of engineers, designers, and fintech pioneers building the modern financial operating system for Bharat.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {openings.map((job, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-purple-300 transition"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-[#6320EE]">{job.team}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{job.title}</h3>
              <p className="text-xs text-slate-600 max-w-xl">{job.desc}</p>
            </div>

            <a
              href="mailto:careers@1fi.in?subject=Application for SDE Role"
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-[#6320EE] transition whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
