"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, ArrowRight, Sparkles, Cake } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";
import { CelebrationPlannerModal } from "@/components/ui/CelebrationPlannerModal";

export const AnnouncementBar: React.FC = () => {
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  return (
    <>
      <div className="bg-[#2D3594] text-white py-2 px-4 text-xs font-medium tracking-wide relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Bangalore Heritage Tag */}
          <div className="hidden md:flex items-center gap-2 text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>Est. 1930 • 4 Bangalore Parlours Open Today Till 1:00 AM</span>
          </div>

          {/* Center: Ordering Phone & Shop Link */}
          <div className="flex-1 md:flex-initial text-center flex items-center justify-center gap-2.5">
            <a
              href={`tel:${BRAND_INFO.centralOrderPhone}`}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-semibold bg-white/10 px-3 py-0.5 rounded-full border border-white/15"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>Call: {BRAND_INFO.centralOrderPhone}</span>
            </a>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setIsPlannerOpen(true)}
              className="inline-flex items-center gap-1 hover:text-amber-300 text-amber-200 font-bold transition-colors"
            >
              <Cake className="w-3.5 h-3.5" />
              <span>Party Calculator</span>
            </button>
            <span className="text-white/40">|</span>
            <Link
              href="/collections/cake"
              className="inline-flex items-center gap-1 hover:text-amber-300 font-semibold underline underline-offset-4 transition-colors"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Right: Quick Delivery Promise */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-blue-200">
            <span>Free Delivery Over ₹999</span>
            <span>•</span>
            <span>4-Hour Guarantee</span>
          </div>
        </div>
      </div>

      {/* Celebration Planner Modal */}
      <CelebrationPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
      />
    </>
  );
};
