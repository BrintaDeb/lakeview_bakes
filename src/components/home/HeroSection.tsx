"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles, Cake, MapPin, Clock } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-rose-soft/40 via-caramel-light/30 to-amber-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Brand Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Heritage Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-caramel/30 text-espresso text-xs font-semibold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-caramel animate-spin-slow" />
              <span>Since 1930 • 94 Years of Bengaluru Culinary Heritage</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black text-espresso tracking-tight leading-[1.1]">
                Baking is our <br />
                <span className="italic font-serif text-caramel bg-clip-text text-transparent bg-gradient-to-r from-caramel via-[#B37440] to-espresso">
                  Love Language
                </span>
              </h1>
              <p className="text-base sm:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed pt-2">
                From pre-independence Ulsoor Lake pushcarts to pioneering Bangalore&apos;s iconic 1950s
                drive-in dessert culture — taste handcrafted celebration cakes, sundaes, and fresh bakes.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/collections/cake"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white font-bold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
              >
                <span>Explore Artisan Cakes</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/custom-cake"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel hover:bg-white text-espresso font-bold text-sm px-6 py-3.5 rounded-full transition-all border border-stone-300 shadow-sm hover:shadow"
              >
                <Cake className="w-4 h-4 text-caramel" />
                <span>Custom Celebration Cake</span>
              </Link>

              <a
                href={`tel:${BRAND_INFO.centralOrderPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-lakeview-blue bg-blue-50/80 hover:bg-blue-100 border border-blue-200/60 px-4 py-3 rounded-full transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-lakeview-blue" />
                <span>Quick Call</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-stone-200/60 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="font-serif text-2xl font-black text-espresso block">94+</span>
                <span className="text-xs text-stone-500 font-medium">Years of Trust</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-black text-espresso block">4</span>
                <span className="text-xs text-stone-500 font-medium">Outlets in Bangalore</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-black text-espresso block">100%</span>
                <span className="text-xs text-stone-500 font-medium">Fresh Daily Craft</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Frame (Original Banners) */}
          <div className="lg:col-span-6 relative">
            <TiltCard
              maxTilt={5}
              className="relative rounded-3xl overflow-hidden glass-card p-2.5 border border-white/80 shadow-2xl"
            >
              {/* Desktop Banner Display */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-cream-200 shadow-inner">
                <Image
                  src="/assets/banners/banner-hero-desktop.png"
                  alt="Lakeview Milk Bar Hero Banner"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating Glass Pill: Drive-in Legacy */}
              <div className="absolute -bottom-4 -left-4 sm:bottom-6 sm:left-6 glass-panel rounded-2xl p-4 shadow-xl border border-white/90 flex items-center gap-3 max-w-xs animate-float">
                <div className="w-10 h-10 rounded-xl bg-caramel/10 flex items-center justify-center text-caramel shrink-0">
                  <Clock className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-espresso">Midnight Drive-In Culture</h4>
                  <p className="text-[11px] text-stone-500">MG Road Flagship Open Till 12:30 AM</p>
                </div>
              </div>

              {/* Floating Glass Pill: Outlets Badge */}
              <div className="absolute -top-3 -right-3 glass-panel rounded-full px-4 py-2 shadow-lg border border-white/90 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D51919]" />
                <span className="text-xs font-bold text-espresso">MG Rd • Indiranagar • Kalyan Nagar • Whitefield</span>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
};
