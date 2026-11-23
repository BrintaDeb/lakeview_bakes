"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Users,
  Cake,
  Calendar,
  ArrowRight,
  Check,
  Heart,
  Scale,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OCCASIONS = [
  { id: "birthday", label: "🎂 Birthday Celebration" },
  { id: "anniversary", label: "💍 Milestone Anniversary" },
  { id: "party", label: "🎉 Weekend House Party" },
  { id: "baby-shower", label: "👶 Baby Shower" },
  { id: "corporate", label: "💼 Corporate & Office Event" },
];

export const CelebrationPlannerModal: React.FC<PlannerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [occasion, setOccasion] = useState<string>("birthday");
  const [guestCount, setGuestCount] = useState<number>(12);
  const [dietary, setDietary] = useState<"eggless" | "mixed">("eggless");

  if (!isOpen) return null;

  // Calculate recommended weight based on guest count
  const calculateRecommendation = () => {
    let weight = "1 kg";
    let tiers = "Single Tier Classic";
    let basePrice = 1250;

    if (guestCount <= 5) {
      weight = "500g";
      tiers = "Single Tier Petite";
      basePrice = 750;
    } else if (guestCount <= 10) {
      weight = "1 kg";
      tiers = "Single Tier Classic";
      basePrice = 1350;
    } else if (guestCount <= 18) {
      weight = "2 kg";
      tiers = "Grand Single Tier / Petite 2-Tier";
      basePrice = 2500;
    } else if (guestCount <= 28) {
      weight = "3 kg";
      tiers = "Double Tier Showstopper";
      basePrice = 3800;
    } else {
      weight = "5 kg+";
      tiers = "Custom Grand Multi-Tier";
      basePrice = 6200;
    }

    return { weight, tiers, basePrice };
  };

  const rec = calculateRecommendation();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-espresso/60 backdrop-blur-md flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl relative overflow-hidden bg-white/95"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-espresso hover:bg-stone-100 transition-colors"
          aria-label="Close Planner"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center max-w-md mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 text-caramel text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Party Concierge Calculator</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-black text-espresso tracking-tight">
            Plan Your Celebration
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Tell us about your guests — we will calculate the perfect cake size, tier structure, and portion guide.
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Occasion */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
              1. Celebration Occasion
            </label>
            <div className="flex flex-wrap gap-2">
              {OCCASIONS.map((occ) => (
                <button
                  key={occ.id}
                  onClick={() => setOccasion(occ.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
                    occasion === occ.id
                      ? "bg-espresso text-white border-espresso shadow-sm"
                      : "bg-white/80 text-stone-700 border-stone-200 hover:border-caramel"
                  }`}
                >
                  {occ.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Guest Count Slider */}
          <div className="space-y-2 bg-cream-50 p-4 rounded-2xl border border-stone-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-caramel" />
                <span>2. Expected Guest Count</span>
              </label>
              <span className="font-serif text-lg font-black text-caramel">
                {guestCount} Guests
              </span>
            </div>

            <input
              type="range"
              min={4}
              max={50}
              step={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-caramel"
            />

            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>Intimate (4)</span>
              <span>Dinner Party (15)</span>
              <span>Grand Milestone (50+)</span>
            </div>
          </div>

          {/* Step 3: Dietary Preference */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
              3. Dietary Preference
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDietary("eggless")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  dietary === "eggless"
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                    : "bg-white text-stone-700 border-stone-200"
                }`}
              >
                🟢 100% Eggless (Pure Vegetarian)
              </button>
              <button
                onClick={() => setDietary("mixed")}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  dietary === "mixed"
                    ? "bg-amber-800 text-white border-amber-800 shadow-sm"
                    : "bg-white text-stone-700 border-stone-200"
                }`}
              >
                🟡 Mixed / Traditional Recipe
              </button>
            </div>
          </div>

          {/* Calculated Recommendation Box */}
          <div className="bg-gradient-to-r from-cream-100 via-amber-50 to-cream-100 p-5 rounded-2xl border border-amber-300/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">
                Patisserie Master Recommendation
              </span>
              <span className="text-[10px] font-mono bg-espresso text-white px-2 py-0.5 rounded-full font-bold">
                Free Delivery Unlocked
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  Recommended Weight
                </span>
                <span className="font-serif text-xl font-black text-espresso">
                  {rec.weight}
                </span>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  Tier Structure
                </span>
                <span className="font-serif text-sm font-bold text-espresso leading-snug block mt-1">
                  {rec.tiers.split(" ")[0]} Tier
                </span>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60">
                <span className="text-[10px] text-stone-400 uppercase font-bold block">
                  Estimated Price
                </span>
                <span className="font-serif text-xl font-black text-caramel">
                  ~{formatPrice(rec.basePrice)}
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 text-center italic">
              Suggested Flavours: Belgian Chocolate Truffle, Red Velvet Cream Cheese, or Butterscotch Praline.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/custom-cake"
              onClick={onClose}
              className="flex-1 py-3.5 px-6 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md text-center flex items-center justify-center gap-2"
            >
              <span>Build This in Custom Cake Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/collections/cake"
              onClick={onClose}
              className="py-3.5 px-6 rounded-full glass-card text-espresso hover:text-caramel text-xs font-bold uppercase tracking-widest border border-stone-300 text-center"
            >
              Browse Ready Bakes
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
