"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

interface CakeVisualizerProps {
  flavor: string;
  tier: string;
  shape: string;
  eggless: boolean;
  message: string;
}

const FLAVOR_PALETTES: Record<
  string,
  {
    sponge: string;
    filling: string;
    glaze: string;
    drip: string;
    toppings: string;
    name: string;
  }
> = {
  "Chocolate Truffle": {
    sponge: "from-[#2A150D] to-[#1F0E08]",
    filling: "bg-[#422115]",
    glaze: "bg-[#1E0C06]",
    drip: "#150804",
    toppings: "🍫 Belgian Chocolate Shavings & Gold Flakes",
    name: "Dark Chocolate Truffle",
  },
  "Dutch Chocolate": {
    sponge: "from-[#381B10] to-[#251109]",
    filling: "bg-[#4E2A1C]",
    glaze: "bg-[#2A1208]",
    drip: "#1C0A04",
    toppings: "☕ Dutch Cocoa Nibs & Dark Ganache Pearls",
    name: "Dutch Cocoa Ganache",
  },
  "Red Velvet": {
    sponge: "from-[#7F1D1D] to-[#591414]",
    filling: "bg-[#FFFDF7]",
    glaze: "bg-[#991B1B]",
    drip: "#591414",
    toppings: "❤️ Red Velvet Sponge Crumb & Cream Rosettes",
    name: "Red Velvet Cream Cheese",
  },
  "Fresh Fruit & Cream": {
    sponge: "from-[#FDE68A] to-[#F59E0B]",
    filling: "bg-[#FFFFFF]",
    glaze: "bg-[#FEF3C7]",
    drip: "#F59E0B",
    toppings: "🍓 Fresh Strawberries, Kiwi & Dragonfruit Glaze",
    name: "Whipped Cream & Fresh Fruit",
  },
  Butterscotch: {
    sponge: "from-[#D97706] to-[#B45309]",
    filling: "bg-[#FEF3C7]",
    glaze: "bg-[#F59E0B]",
    drip: "#B45309",
    toppings: "🍯 Butterscotch Praline Crunch & Caramel Drip",
    name: "Salted Butterscotch Crunch",
  },
  "Black Forest": {
    sponge: "from-[#2D160D] to-[#1C0D07]",
    filling: "bg-[#FFFFFF]",
    glaze: "bg-[#3D1E12]",
    drip: "#1A0A04",
    toppings: "🍒 Maraschino Cherries & Dark Chocolate Curls",
    name: "Traditional Black Forest",
  },
  "Blueberry Cheese": {
    sponge: "from-[#D4A373] to-[#B07D48]",
    filling: "bg-[#FDF4FF]",
    glaze: "bg-[#581C87]",
    drip: "#3B0764",
    toppings: "🫐 Wild Blueberry Compote & White Chocolate",
    name: "Blueberry Cold Cheesecake",
  },
};

export const CakeStackVisualizer: React.FC<CakeVisualizerProps> = ({
  flavor,
  tier,
  shape,
  eggless,
  message,
}) => {
  const palette = FLAVOR_PALETTES[flavor] || FLAVOR_PALETTES["Chocolate Truffle"];
  const isDoubleTier = tier.toLowerCase().includes("double") || tier.toLowerCase().includes("2 tier");
  const isHeart = shape.toLowerCase().includes("heart");

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-square max-h-[460px] rounded-3xl overflow-hidden glass-panel p-6 border border-white/90 shadow-2xl flex flex-col items-center justify-between bg-gradient-to-b from-cream-100/70 via-cream-50 to-cream-200/50">
      {/* Top Status Indicators */}
      <div className="w-full flex items-center justify-between z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-caramel/20 text-espresso text-[11px] font-bold shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-caramel animate-spin-slow" />
          <span>Live 3D-Stack Preview</span>
        </div>

        <div className="flex items-center gap-2">
          {eggless && (
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
              🟢 100% Eggless
            </span>
          )}
          {isHeart && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-300 flex items-center gap-1">
              <Heart className="w-3 h-3 fill-current" />
              <span>Heart Cut</span>
            </span>
          )}
        </div>
      </div>

      {/* Center 3D Cake Visualizer */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center my-4">
        {/* Floating Ambient Sugar Dust Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [-5, 5, -5], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-12 w-2 h-2 rounded-full bg-amber-300 blur-[1px]"
          />
          <motion.div
            animate={{ y: [5, -5, 5], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-16 right-12 w-2.5 h-2.5 rounded-full bg-rose-pastel blur-[1px]"
          />
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {/* Top Tier (If Double Tier) */}
          <AnimatePresence>
            {isDoubleTier && (
              <motion.div
                initial={{ opacity: 0, y: -25, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -25, scale: 0.8 }}
                transition={{ type: "spring", damping: 18, stiffness: 200 }}
                className="relative z-10 -mb-3 flex flex-col items-center"
              >
                {/* Top Tier Glaze & Topper */}
                <div
                  className={`w-32 h-10 rounded-t-2xl bg-gradient-to-b ${palette.sponge} shadow-lg relative border-t-2 border-white/30 flex items-center justify-center`}
                >
                  {/* Piped Icing Message Preview */}
                  <span className="font-serif italic text-[11px] font-bold text-amber-100 drop-shadow px-2 truncate max-w-[110px]">
                    {message ? `“${message}”` : "Lakeview 1930"}
                  </span>
                </div>
                {/* Top Tier Cream Layer */}
                <div className={`w-36 h-3 ${palette.filling} rounded-full shadow-inner -my-1 z-10`} />
                {/* Top Tier Bottom Sponge */}
                <div
                  className={`w-36 h-10 rounded-b-xl bg-gradient-to-b ${palette.sponge} shadow-md`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Base Tier */}
          <motion.div
            layout
            transition={{ type: "spring", damping: 20, stiffness: 250 }}
            className="relative flex flex-col items-center"
          >
            {/* Base Tier Crown & Glaze */}
            <div
              className={`w-52 sm:w-60 h-14 rounded-t-3xl bg-gradient-to-b ${palette.sponge} shadow-xl relative border-t-2 border-white/40 flex items-center justify-center overflow-hidden`}
            >
              {/* Dripping Chocolate/Caramel effect */}
              <div
                className="absolute top-0 left-0 right-0 h-4 opacity-90"
                style={{
                  backgroundColor: palette.drip,
                  clipPath:
                    "polygon(0% 0%, 100% 0%, 100% 70%, 90% 40%, 80% 90%, 70% 50%, 60% 100%, 50% 60%, 40% 95%, 30% 55%, 20% 90%, 10% 45%, 0% 70%)",
                }}
              />

              {!isDoubleTier && (
                <span className="font-serif italic text-xs sm:text-sm font-bold text-amber-100 drop-shadow-md px-4 truncate max-w-[200px] z-10">
                  {message ? `“${message}”` : "Lakeview Milk Bar"}
                </span>
              )}
            </div>

            {/* Base Tier Cream Filling Layer */}
            <div
              className={`w-56 sm:w-64 h-3.5 ${palette.filling} rounded-full shadow-inner -my-1 z-10 border-y border-black/10`}
            />

            {/* Base Tier Foundation Sponge */}
            <div
              className={`w-56 sm:w-64 h-14 rounded-b-2xl bg-gradient-to-b ${palette.sponge} shadow-2xl relative`}
            />

            {/* Luxury Golden Pedestal Stand */}
            <div className="w-64 sm:w-72 h-3.5 rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-caramel shadow-2xl mt-1 border border-amber-500/30" />
            <div className="w-40 h-2 bg-stone-800/20 rounded-full blur-sm mt-0.5" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Flavor & Craft Specs */}
      <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/90 shadow-sm flex items-center justify-between z-20 text-left">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-caramel block">
            Selected Flavour Profile
          </span>
          <h4 className="font-serif text-xs sm:text-sm font-bold text-espresso line-clamp-1">
            {palette.name}
          </h4>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono text-stone-500 block">
            {isDoubleTier ? "2-Tier Celebration" : "Single Tier Classic"}
          </span>
          <span className="text-[11px] font-bold text-espresso">
            {palette.toppings.split(" ")[0]} Artisan Garnish
          </span>
        </div>
      </div>
    </div>
  );
};
