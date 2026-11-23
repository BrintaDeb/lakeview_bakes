"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Quote, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { TESTIMONIALS } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-cream-100/80 via-cream-50 to-cream-100/60 relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-rose-pastel/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-current text-rose-muted" />
            <span>Verbatim Customer Words</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
            &ldquo; What Our Patrons Say &rdquo;
          </h2>

          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            From childhood birthdays to golden anniversaries — here is what four generations of Bengaluru families say about Lakeview.
          </p>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/80 w-fit mx-auto px-4 py-1.5 rounded-full shadow-sm">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>4.9 / 5.0 Average Rating across 12,000+ Bangalore Celebrations</span>
          </div>
        </div>

        {/* Testimonials Grid (Desktop: 3 Cards, Mobile: Interactive Slider) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <TiltCard
              key={t.reviewer_name}
              maxTilt={6}
              className={`glass-card rounded-3xl p-8 border border-white/90 shadow-lg hover:shadow-2xl flex flex-col justify-between relative transition-all duration-300 group ${
                idx === activeIndex ? "ring-2 ring-caramel/40 bg-white/95" : ""
              }`}
            >
              <Quote className="w-10 h-10 text-caramel/15 absolute top-6 right-6 transition-transform duration-300 group-hover:scale-110" />

              <div className="space-y-4 relative z-10">
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Verbatim Text from Host Site */}
                <p className="text-stone-700 text-sm sm:text-base leading-relaxed italic font-serif">
                  &ldquo;{t.review_text}&rdquo;
                </p>
              </div>

              {/* Reviewer Bio with Original Host Photos */}
              <div className="flex items-center gap-4 pt-6 mt-6 border-t border-stone-200/60 relative z-10">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-caramel/50 shadow-md bg-stone-100 group-hover:border-caramel transition-colors">
                  <Image
                    src={t.image}
                    alt={t.reviewer_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-espresso group-hover:text-caramel transition-colors flex items-center gap-1.5">
                    <span>{t.reviewer_name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </h4>
                  <span className="text-xs text-stone-500 font-medium block">
                    Verified Lakeview Patron
                  </span>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full glass-panel text-espresso hover:text-caramel shadow-sm"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-semibold text-stone-500">
            {activeIndex + 1} of {TESTIMONIALS.length}
          </span>
          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full glass-panel text-espresso hover:text-caramel shadow-sm"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
