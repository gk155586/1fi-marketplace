"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, ArrowRight, Sparkles, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // IntersectionObserver triggers animation strictly when user scrolls down to this card
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const defaultVariant = product.variants.find((v) => v.isDefault) || product.variants[0];
  const lowestEmi = product.emiPlans.reduce((prev, curr) =>
    curr.monthlyAmount < prev.monthlyAmount ? curr : prev
  );

  const zeroInterestPlans = product.emiPlans.filter((p) => p.isZeroInterest);
  const maxZeroTenure = zeroInterestPlans.length
    ? Math.max(...zeroInterestPlans.map((p) => p.tenureMonths))
    : 0;

  const discountPercent =
    defaultVariant.mrp > defaultVariant.price
      ? Math.round(((defaultVariant.mrp - defaultVariant.price) / defaultVariant.mrp) * 100)
      : 0;

  // Staggered cascading emergence delay per row column (index % 3 * 90ms)
  const staggerDelay = (index % 3) * 90;

  const animStyle: React.CSSProperties = {
    transform: isVisible ? "translateY(0) scale(1)" : "translateY(-30px) scale(0.95)",
    opacity: isVisible ? 1 : 0,
    transition: `transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms, opacity 650ms cubic-bezier(0.16, 1, 0.3, 1) ${staggerDelay}ms`,
  };

  return (
    <div ref={cardRef} style={animStyle} className="h-full flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="group relative flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-purple-300 cursor-pointer"
      >
        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between pointer-events-none">
          {product.badge ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/90 backdrop-blur-md px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-xs">
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{product.badge}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 border border-purple-200 px-2.5 py-0.5 text-[10px] font-bold text-[#6320EE]">
              0% NO-COST EMI
            </span>
          )}

          {discountPercent > 0 && (
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Product Image Stage */}
        <div className="relative flex h-64 w-full items-center justify-center bg-gradient-to-b from-slate-50/70 via-white to-white p-6 overflow-hidden">
          <Image
            src={defaultVariant.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-108 drop-shadow-md"
          />
        </div>

        {/* Card Details Body */}
        <div className="flex flex-1 flex-col p-5 pt-3">
          {/* Brand & Live Stock / Color Swatches Preview */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-2">
              {/* Real-time stock status badge */}
              {defaultVariant.stockQuantity > 10 ? (
                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {defaultVariant.stockQuantity} in stock
                </span>
              ) : defaultVariant.stockQuantity > 0 ? (
                <span className="text-[10px] font-bold text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Only {defaultVariant.stockQuantity} left
                </span>
              ) : (
                <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Out of Stock
                </span>
              )}

              <div className="flex items-center gap-1">
                {Array.from(new Set(product.variants.map((v) => v.colorHex))).map((hex, i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 rounded-full border border-slate-300/80 shadow-2xs transition-transform group-hover:scale-110"
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="mt-1 text-base font-extrabold text-slate-900 group-hover:text-[#6320EE] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Highlighted 0% EMI text badge directly down the product name */}
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-lg bg-purple-50 px-2 py-0.5 text-[11px] font-black text-[#6320EE] border border-purple-200/80 shadow-2xs">
              <Sparkles className="h-3 w-3 text-[#6320EE]" />
              <span>0% EMI from {formatINR(lowestEmi.monthlyAmount)}/mo</span>
            </span>
            {maxZeroTenure > 0 && (
              <span className="inline-flex items-center rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                {maxZeroTenure}M 0% Interest
              </span>
            )}
          </div>

          {/* Star Rating & Reviews */}
          <div className="mt-2 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 border border-emerald-100">
              <Star className="h-3 w-3 fill-emerald-600 text-emerald-600" />
              <span className="text-[10px] font-bold text-emerald-700">{product.rating || 4.8}</span>
            </div>
            <span className="text-[10px] text-slate-400">({product.reviewCount || 120}+ reviews)</span>
            {product.emiPlans[0]?.cashbackAmount > 0 && (
              <span className="ml-auto text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                <CheckCircle2 className="h-2.5 w-2.5" />
                <span>+{formatINR(product.emiPlans[0].cashbackAmount)} Cashback</span>
              </span>
            )}
          </div>

          {/* Price & Action Strip */}
          <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-slate-900">
                {formatINR(defaultVariant.price)}
              </span>
              {defaultVariant.mrp > defaultVariant.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatINR(defaultVariant.mrp)}
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#6320EE] group-hover:translate-x-0.5 transition-transform">
              <span>Details</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
