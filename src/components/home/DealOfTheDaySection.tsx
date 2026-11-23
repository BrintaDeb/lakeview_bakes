"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Clock, Sparkles } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

export const DealOfTheDaySection: React.FC = () => {
  // Set real promotion end time for today midnight
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative bg-[#2D1E18] text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-dark via-espresso to-[#3F2A21] opacity-90" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-caramel/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Visual Creative (Original Image) */}
          <div className="lg:col-span-7">
            <TiltCard
              maxTilt={5}
              className="relative rounded-3xl overflow-hidden glass-panel p-3 border border-white/20 shadow-2xl"
            >
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-900">
                <Image
                  src="/assets/promotions/deal-of-the-day-countdown.jpg"
                  alt="Deal of the Day - Lakeview Milk Bar"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Floating Live Tag */}
              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-[#D51919] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
                <span>Special Daily Bake</span>
              </div>
            </TiltCard>
          </div>

          {/* Right Text & Countdown */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Limited Daily Batch</span>
            </div>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                Deal of the Day
              </h2>
              <p className="text-stone-300 text-sm sm:text-base mt-2 leading-relaxed">
                Enjoy 15% off on our signature chef-curated Belgian Chocolate Truffle and seasonal
                Berry Cheesecakes. Baked fresh every morning in limited quantities.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
                <Clock className="w-4 h-4" />
                <span>HURRY UP@ DEAL ENDS IN:</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/10">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-white block">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Hours</span>
                </div>
                <span className="text-2xl font-bold text-amber-300">:</span>
                <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/10">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-white block">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Mins</span>
                </div>
                <span className="text-2xl font-bold text-amber-300">:</span>
                <div className="bg-black/40 rounded-xl px-4 py-3 min-w-[70px] text-center border border-white/10">
                  <span className="font-serif text-2xl sm:text-3xl font-black text-amber-400 block">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] text-stone-400 uppercase font-semibold">Secs</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                href="/collections/cake"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-caramel hover:bg-caramel-hover text-white font-bold text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span>Hurry Up, Order Now!</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
