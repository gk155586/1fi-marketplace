import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, Smartphone, HeartHandshake, FileText, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 pb-10 border-b border-slate-100">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Electronics on EMI
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/?category=mobiles" className="hover:text-[#6320EE] transition-colors">
                  Smart Phones on EMI
                </Link>
              </li>
              <li>
                <Link href="/products/macbook-pro-m3" className="hover:text-[#6320EE] transition-colors">
                  Laptops on EMI
                </Link>
              </li>
              <li>
                <Link href="/products/sony-wh-1000xm5" className="hover:text-[#6320EE] transition-colors">
                  Headphones on EMI
                </Link>
              </li>
              <li>
                <Link href="/products/apple-watch-ultra-2" className="hover:text-[#6320EE] transition-colors">
                  Smart Watches on EMI
                </Link>
              </li>
              <li>
                <Link href="/?category=electronics" className="hover:text-[#6320EE] transition-colors">
                  Speakers & Soundbars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Kitchen & Home on EMI
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/products/dyson-v15" className="hover:text-[#6320EE] transition-colors">
                  Dyson Smart Vacuums
                </Link>
              </li>
              <li>
                <Link href="/?category=kitchen" className="hover:text-[#6320EE] transition-colors">
                  Juicers, Mixers & Grinders
                </Link>
              </li>
              <li>
                <Link href="/?category=kitchen" className="hover:text-[#6320EE] transition-colors">
                  Fans & Inverters on EMI
                </Link>
              </li>
              <li>
                <Link href="/?category=kitchen" className="hover:text-[#6320EE] transition-colors">
                  Irons & Steamers
                </Link>
              </li>
              <li>
                <Link href="/?category=kitchen" className="hover:text-[#6320EE] transition-colors">
                  Coffee Makers & Kettles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              TV, AC & Appliances
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/products/lg-oled-c4" className="hover:text-[#6320EE] transition-colors">
                  LG 4K OLED Televisions
                </Link>
              </li>
              <li>
                <Link href="/?category=appliances" className="hover:text-[#6320EE] transition-colors">
                  Refrigerators on EMI
                </Link>
              </li>
              <li>
                <Link href="/?category=appliances" className="hover:text-[#6320EE] transition-colors">
                  Washing Machines on EMI
                </Link>
              </li>
              <li>
                <Link href="/?category=appliances" className="hover:text-[#6320EE] transition-colors">
                  Air Conditioners on EMI
                </Link>
              </li>
              <li>
                <Link href="/?category=appliances" className="hover:text-[#6320EE] transition-colors">
                  Air Coolers on EMI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Health & Wellness on EMI
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/?category=deals" className="hover:text-[#6320EE] transition-colors">
                  Protein & Health Supplements
                </Link>
              </li>
              <li>
                <Link href="/?category=deals" className="hover:text-[#6320EE] transition-colors">
                  Cycles & Fitness Bikes
                </Link>
              </li>
              <li>
                <Link href="/?category=deals" className="hover:text-[#6320EE] transition-colors">
                  Gym & Cardio Equipment
                </Link>
              </li>
              <li>
                <Link href="/?category=deals" className="hover:text-[#6320EE] transition-colors">
                  Wearable Health Trackers
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-b border-slate-100 text-xs">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-sm">
                <Image
                  src="/logo.png"
                  alt="1Fi Official Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-base font-black text-slate-900 leading-none">
                1Fi <span className="text-[#6320EE] font-bold text-xs">Technologies</span>
              </span>
            </Link>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Orchid Business Park, Sector-48, Sohna Road, Gurgaon<br />
              Contact: support@1fi.in • Mon to Sun (10 AM to 8 PM)
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Quick Links</h5>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/about" className="hover:text-[#6320EE] transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-[#6320EE] transition-colors">Careers at 1Fi</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#6320EE] transition-colors">How 0% MF EMI Works</Link></li>
              <li><Link href="/how-it-works" className="hover:text-[#6320EE] transition-colors">Partner with Us</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Support & Legal</h5>
            <ul className="space-y-1.5 text-slate-600">
              <li><Link href="/replacement-policy" className="hover:text-[#6320EE] transition-colors">Return & Replacement Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#6320EE] transition-colors">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-[#6320EE] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclosures" className="hover:text-[#6320EE] transition-colors">SEBI / RBI Regulatory Disclosures</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-2.5">Download 1Fi App</h5>
            <p className="text-[11px] text-slate-500 mb-3">Shop at 0% EMI anywhere on iOS &amp; Android</p>
            <div className="flex flex-col gap-2.5">
              {/* Apple App Store Button */}
              <a
                href="https://apple.com"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black px-4 py-2.5 text-white border border-slate-700/80 shadow-md shadow-black/25 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="h-6 w-6 fill-white shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.63-2.65 1.38-.56.65-1.04 1.73-.91 2.76 1.05.08 2.06-.54 2.64-1.27z"/>
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-tight">
                    Download on the
                  </span>
                  <span className="text-sm font-black text-white tracking-tight leading-none">
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play Store Button */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="group relative flex items-center gap-3 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black px-4 py-2.5 text-white border border-slate-700/80 shadow-md shadow-black/25 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/20 hover:scale-[1.02] active:scale-95 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg className="h-6 w-6 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.61 1.81L13.88 12.08 3.61 22.35c-.38-.43-.61-1.02-.61-1.7V3.51c0-.68.23-1.27.61-1.7z" />
                  <path fill="#FBBC04" d="M17.3 8.66l-3.42 3.42 3.42 3.42 3.91-2.22c.76-.43.76-1.14 0-1.57L17.3 8.66z" />
                  <path fill="#EA4335" d="M13.88 12.08L3.61 1.81c.56-.34 1.27-.31 1.94.07l11.75 6.78-3.42 3.42z" />
                  <path fill="#34A853" d="M13.88 12.08l3.42 3.42-11.75 6.78c-.67.38-1.38.41-1.94.07l10.27-10.27z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-semibold leading-tight">
                    GET IT ON
                  </span>
                  <span className="text-sm font-black text-white tracking-tight leading-none">
                    Google Play
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} 1Fi Technologies Private Limited. Proudly made in India.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3 text-emerald-600" />
              256-bit SSL Encrypted
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              CAMS & KFintech Digital Lien
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
