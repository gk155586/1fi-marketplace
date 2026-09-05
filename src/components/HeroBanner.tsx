"use client";

import Image from "next/image";

export default function HeroBanner() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-r from-[#18038c] via-[#2105a5] to-[#2d07c4] shadow-xl border border-purple-800/30">
      <div className="relative w-full aspect-[2.7/1] sm:aspect-[2.95/1] max-h-[340px]">
        <Image
          src="/hero-1fi-banner-wide.jpg"
          alt="1Fi - Shop today, Pay later using Mutual funds. No credit score required. No interest. Backed by your investments."
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          className="object-cover object-center block"
        />
      </div>
    </div>
  );
}



