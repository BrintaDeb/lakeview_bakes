"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Award, Flame, Heart } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export const SundaeLabTeaser: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-cream-100/50 via-cream-50 to-cream-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TiltCard
          maxTilt={4}
          className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/90 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-pastel/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ulsoor Lake Roots • 1930 Inception</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight leading-[1.1]">
                Step Into The <br />
                <span className="italic font-serif font-normal text-caramel">
                  Sundae Alchemy Lab
                </span>
              </h2>

              <p className="text-stone-700 text-sm sm:text-base leading-relaxed max-w-xl">
                Before cakes and savoury bakes, Lakeview Milk Bar began by Ulsoor Lake with three
                hand-churned scoops — Vanilla, Chocolate, and Strawberry. Today, you can architect
                your own bespoke sundae in vintage fluted glass with our secret 1970 hot chocolate
                fudge and roasted nuts.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/sundae-lab"
                  data-cursor="Taste"
                  className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <span>Launch Sundae Lab</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 bg-white/60 px-4 py-2.5 rounded-full border border-stone-200">
                  <Flame className="w-3.5 h-3.5 text-caramel" />
                  <span>Real 1970 Warm Fudge Recipe</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card p-3 border border-white/80 shadow-2xl group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src="/assets/promotions/category-dessert.png"
                    alt="Lakeview Artisanal Ice Cream Sundae"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-75" />

                  <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-caramel" />
                    <span>Vintage Tulip Dishware</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block mb-0.5">
                      Parlour Special
                    </span>
                    <h4 className="font-serif text-lg font-bold">
                      Layered Hot Chocolate Fudge Sundae
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};
