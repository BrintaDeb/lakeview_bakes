"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowRight, Sparkles, Award, History, Clock } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";
import { CreamWaveDivider } from "@/components/ui/CreamBackground";
import { VintageSlider } from "@/components/ui/VintageSlider";

export const OurLoveAffairSection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100/60 to-cream-50">
      {/* Decorative Organic Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-caramel/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-rose-pastel/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel/10 border border-caramel/20 text-caramel text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bangalore&apos;s Sweetheart Since 1930</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-espresso tracking-tight leading-[1.1]">
              Our 94-Year <br />
              <span className="italic font-serif font-normal text-caramel">Love Affair</span> With Bengaluru
            </h2>
          </div>

          <div className="max-w-md space-y-4">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Before Silicon Valley, before the metro, before the ring roads — there was a quaint parlour by Ulsoor Lake where love, laughter, and handcrafted ice cream became synonymous with Bangalore culture.
            </p>
            <Link
              href="/about"
              data-cursor="Story"
              className="inline-flex items-center gap-2 text-xs font-bold text-caramel hover:text-espresso tracking-wider uppercase group"
            >
              <span>Explore The Full Archival Chronicle</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Dynamic Asymmetric Media & Story Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Left Column: Interactive 3D Tilt Media Mosaic */}
          <div className="lg:col-span-7 grid grid-cols-12 gap-4 sm:gap-6 relative">
            {/* Primary Archival Banner with 3D Tilt */}
            <div className="col-span-12 sm:col-span-8">
              <TiltCard maxTilt={6} className="rounded-3xl overflow-hidden glass-panel p-2.5 border border-white/80 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/banners/quote-desktop.png"
                    alt="Baking is our Love Language - Lakeview Archival Quote"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                      Archival Philosophy
                    </span>
                    <p className="font-serif text-lg font-bold italic leading-snug">
                      &quot;Baking is our Love Language&quot;
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Secondary Artisan Cake Craft Frame */}
            <div className="col-span-12 sm:col-span-4 flex flex-col gap-4 sm:gap-6 justify-between">
              <TiltCard maxTilt={8} className="rounded-2xl overflow-hidden glass-card p-2 border border-white/80 shadow-xl">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/heritage/1930.jpg"
                    alt="Lakeview Milk Bar 1930 Inception"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-espresso/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-amber-300">
                    Est. 1930
                  </div>
                </div>
              </TiltCard>

              {/* Celebration Confectionery Frame */}
              <TiltCard maxTilt={8} className="rounded-2xl overflow-hidden glass-card p-2 border border-white/80 shadow-xl">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/heritage/PARLOUR_OF_THE_MIDNIGHT_ROAD.jpg"
                    alt="Parlour of the Midnight Road - MG Road Drive-in"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/50 via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-2.5 left-2.5 text-white">
                    <span className="text-[9px] font-bold uppercase tracking-wider block">Midnight Drive-In</span>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Rotating Archival Gold Seal Badge */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="hidden md:flex absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-caramel p-1 shadow-2xl items-center justify-center z-20"
            >
              <div className="w-full h-full rounded-full bg-espresso flex flex-col items-center justify-center text-center p-2 text-amber-200 border border-amber-300/40">
                <Heart className="w-4 h-4 fill-current text-rose-pastel mb-0.5" />
                <span className="text-[8px] font-black uppercase tracking-widest leading-none">
                  Bengaluru&apos;s
                </span>
                <span className="text-[10px] font-serif font-black text-white leading-none my-0.5">
                  Sweetheart
                </span>
                <span className="text-[8px] font-mono text-amber-300">SINCE 1930</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Custodian Manifesto & Living History */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard maxTilt={5} className="glass-panel rounded-3xl p-8 sm:p-10 border border-white/90 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-caramel/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-0.5 bg-caramel rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                    A Third-Generation Custodian Promise
                  </span>
                </div>

                <div className="relative">
                  <span className="text-6xl font-serif text-caramel/15 absolute -top-5 -left-3 leading-none pointer-events-none">
                    “
                  </span>
                  <p className="font-serif text-lg sm:text-xl italic text-espresso leading-relaxed relative z-10 pt-2">
                    &quot;{BRAND_INFO.quote.text}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-base text-espresso">{BRAND_INFO.quote.author}</h4>
                    <p className="text-xs text-stone-500">Third Generation Family Custodian</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-serif font-bold text-caramel block">
                      Lakeview Milk Bar
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-stone-400">
                      MG Road Flagship
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Heritage Metric Badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card rounded-2xl p-4 text-center border border-white/80 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-black text-caramel block">
                  94
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Years of Sweetness
                </span>
              </div>

              <div className="glass-card rounded-2xl p-4 text-center border border-white/80 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-black text-espresso block">
                  4
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Iconic Parlours
                </span>
              </div>

              <div className="glass-card rounded-2xl p-4 text-center border border-white/80 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-black text-caramel block">
                  700+
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">
                  Daily Drive-In Patrons
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 1930 vs 2024 Interactive Heritage Time-Lens Slider */}
        <div className="pt-6 space-y-4">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Visual Time Capsule
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
              1930 Roots vs. 2024 Bengaluru Flagship
            </h3>
          </div>
          <VintageSlider
            beforeImage="/assets/heritage/1930.jpg"
            afterImage="/assets/outlets/outlet-mg-road.jpg"
            beforeLabel="1930 Ulsoor Lake Origin"
            afterLabel="2024 MG Road Flagship"
          />
        </div>
      </div>
    </section>
  );
};
