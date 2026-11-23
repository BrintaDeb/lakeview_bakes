"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  RotateCcw,
  Check,
  Heart,
  MessageCircle,
  Award,
  Layers,
  Flame,
  Info,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { sound } from "@/lib/sound";
import { formatPrice } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";

// Heritage Flavours with authentic palette colors
export interface SundaeFlavour {
  id: string;
  name: string;
  color: string;
  accent: string;
  is1930Original?: boolean;
  notes: string;
}

export const SUNDAE_FLAVOURS: SundaeFlavour[] = [
  {
    id: "vanilla",
    name: "Pure Vanilla Crème",
    color: "#FFF8DC",
    accent: "#E6C280",
    is1930Original: true,
    notes: "Madagascar vanilla bean steeped in whole cream",
  },
  {
    id: "chocolate",
    name: "Dutch Cocoa Truffle",
    color: "#3D2314",
    accent: "#5C3317",
    is1930Original: true,
    notes: "55% Belgian cocoa churned in old Bangalore style",
  },
  {
    id: "strawberry",
    name: "Ulsoor Fresh Strawberry",
    color: "#F8B7CD",
    accent: "#E25875",
    is1930Original: true,
    notes: "Real strawberry pulp inspired by the 1930 lake parlour",
  },
  {
    id: "butterscotch",
    name: "Old Bangalore Butterscotch",
    color: "#E5A93C",
    accent: "#B8781B",
    notes: "Golden caramelized brown butter crunch and praline",
  },
  {
    id: "cassata",
    name: "Royal Cassata Siciliana",
    color: "#FBE6B7",
    accent: "#D96885",
    notes: "Layered sponge, candied fruits, and pistachio ice cream",
  },
  {
    id: "coffee",
    name: "Roast Almond Coffee",
    color: "#A27448",
    accent: "#7A4E26",
    notes: "Filter kaapi decoction churned with roasted almonds",
  },
  {
    id: "pista",
    name: "Royal Green Pistachio",
    color: "#BBDCB6",
    accent: "#6B9B64",
    notes: "California pistachio nuts ground into dense gelato",
  },
  {
    id: "blackcurrant",
    name: "Blackcurrant Velvet",
    color: "#6C3483",
    accent: "#4A235A",
    notes: "Vibrant wild berries with tart sweet finish",
  },
];

export interface SundaeSauce {
  id: string;
  name: string;
  color: string;
  description: string;
  isHot?: boolean;
}

export const SUNDAE_SAUCES: SundaeSauce[] = [
  {
    id: "fudge",
    name: "Hot Chocolate Fudge",
    color: "#2C180E",
    description: "Lakeview's iconic 1970 secret hot fudge recipe",
    isHot: true,
  },
  {
    id: "caramel",
    name: "Warm Salted Butterscotch",
    color: "#C68B59",
    description: "Slow-simmered buttery caramel with sea salt flakes",
    isHot: true,
  },
  {
    id: "strawberry-coulis",
    name: "Wild Strawberry Coulis",
    color: "#D81B60",
    description: "Sweet tart fruit reduction with visible berry seeds",
  },
  {
    id: "mocha",
    name: "Dark Mocha Ganache",
    color: "#4A2E1B",
    description: "Espresso-infused dark chocolate reduction",
    isHot: true,
  },
];

export interface SundaeTopping {
  id: string;
  name: string;
  emoji: string;
  price: number;
}

export const SUNDAE_TOPPINGS: SundaeTopping[] = [
  { id: "roasted-nuts", name: "Toasted Cashews & Almonds", emoji: "🥜", price: 30 },
  { id: "wafer-stick", name: "Crispy Wafer Roll Stick", emoji: "🥖", price: 25 },
  { id: "maraschino-cherry", name: "Glacé Maraschino Cherry", emoji: "🍒", price: 20 },
  { id: "choc-curls", name: "Belgian Chocolate Shavings", emoji: "🍫", price: 30 },
  { id: "whipped-cream", name: "Fresh Whipped Cream Cloud", emoji: "☁️", price: 35 },
  { id: "sprinkles", name: "Vintage Rainbow Sprinkles", emoji: "✨", price: 20 },
  { id: "brownie-chunks", name: "Warm Brownie Chunks", emoji: "🟫", price: 40 },
];

export const GLASS_STYLES = [
  { id: "tulip", name: "Vintage Tulip Dish", era: "1930 Inception" },
  { id: "fountain", name: "Tall Fountain Glass", era: "1950s Drive-In" },
  { id: "banana", name: "Artisanal Boat Platter", era: "Parlour Special" },
];

export const SundaeAlchemyLab: React.FC = () => {
  const { addCustomItem } = useCart();

  const [glassStyle, setGlassStyle] = useState("tulip");
  const [selectedScoops, setSelectedScoops] = useState<string[]>(["vanilla", "chocolate"]);
  const [selectedSauce, setSelectedSauce] = useState<string>("fudge");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([
    "roasted-nuts",
    "maraschino-cherry",
    "wafer-stick",
  ]);
  const [customName, setCustomName] = useState("My Lakeview Signature Sundae");
  const [isSaved, setIsSaved] = useState(false);

  // Price Calculation: Base dish ₹160 (includes 1 scoop) + extra scoops (₹60 each) + toppings
  const basePrice = 160;
  const extraScoopsCost = Math.max(0, selectedScoops.length - 1) * 60;
  const toppingsCost = selectedToppings.reduce((acc, tId) => {
    const top = SUNDAE_TOPPINGS.find((t) => t.id === tId);
    return acc + (top ? top.price : 0);
  }, 0);
  const totalPrice = basePrice + extraScoopsCost + toppingsCost;

  const handleToggleScoop = (flavourId: string) => {
    sound.playBubblePop();
    if (selectedScoops.includes(flavourId)) {
      if (selectedScoops.length > 1) {
        setSelectedScoops(selectedScoops.filter((id) => id !== flavourId));
      }
    } else {
      if (selectedScoops.length < 3) {
        setSelectedScoops([...selectedScoops, flavourId]);
      } else {
        // replace last
        setSelectedScoops([selectedScoops[0], selectedScoops[1], flavourId]);
      }
    }
  };

  const handleToggleTopping = (toppingId: string) => {
    sound.playBubblePop();
    if (selectedToppings.includes(toppingId)) {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    } else {
      setSelectedToppings([...selectedToppings, toppingId]);
    }
  };

  const handleAddToCart = () => {
    sound.playSparkle();
    const scoopNames = selectedScoops
      .map((id) => SUNDAE_FLAVOURS.find((f) => f.id === id)?.name || id)
      .join(" + ");
    const sauceName = SUNDAE_SAUCES.find((s) => s.id === selectedSauce)?.name || "Hot Fudge";
    const toppingNames = selectedToppings
      .map((id) => SUNDAE_TOPPINGS.find((t) => t.id === id)?.name || id)
      .join(", ");

    addCustomItem({
      id: `sundae-${Date.now()}`,
      productId: "sundae-alchemy",
      variantId: `sundae-${glassStyle}`,
      title: customName || "Bespoke Lakeview Sundae",
      variantTitle: `${scoopNames} | ${sauceName}`,
      price: totalPrice,
      quantity: 1,
      image: "/assets/promotions/category-dessert.png",
      size: `${selectedScoops.length} Scoops`,
      eggless: true,
      messageOnCake: `Sauce: ${sauceName} • Toppings: ${toppingNames}`,
      sundaeDetails: {
        scoops: selectedScoops,
        sauce: selectedSauce,
        toppings: selectedToppings,
        glassType: glassStyle,
      },
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const generateWhatsAppLink = () => {
    const scoopNames = selectedScoops
      .map((id) => SUNDAE_FLAVOURS.find((f) => f.id === id)?.name || id)
      .join(" + ");
    const sauceName = SUNDAE_SAUCES.find((s) => s.id === selectedSauce)?.name || "Hot Fudge";
    const toppingNames = selectedToppings
      .map((id) => SUNDAE_TOPPINGS.find((t) => t.id === id)?.name || id)
      .join(", ");

    const text = encodeURIComponent(
      `Hello Lakeview Milk Bar! 🍨\n\nI just crafted a custom sundae on your Sundae Alchemy Lab:\n• Name: *${customName}*\n• Glass: ${glassStyle.toUpperCase()}\n• Scoops: *${scoopNames}*\n• Warm Drizzle: *${sauceName}*\n• Toppings: ${toppingNames}\n• Total Price: ₹${totalPrice}\n\nI would like to order this for pickup / drive-in at your parlour! Please confirm availability.`
    );
    return `https://wa.me/919663812036?text=${text}`;
  };

  const activeSauceObj = SUNDAE_SAUCES.find((s) => s.id === selectedSauce);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ulsoor Lake Heritage • Est. 1930</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-espresso tracking-tight">
          The Sundae Alchemy Lab
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Craft your bespoke artisanal ice cream creation in vintage glass dishware, layered with
          Lakeview’s legendary 1970 hot fudge and farm-churned scoops.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Visual Sundae Presentation Dish (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-5">
          <TiltCard
            maxTilt={5}
            className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl relative overflow-hidden flex flex-col items-center justify-between min-h-[480px]"
          >
            {/* Ambient Confectionery Glows */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-caramel/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-pastel/20 rounded-full blur-3xl pointer-events-none" />

            {/* Top Badges */}
            <div className="w-full flex items-center justify-between z-10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-espresso/80 text-amber-200 backdrop-blur-md">
                {selectedScoops.length} of 3 Scoops
              </span>
              <span className="text-xs font-serif font-black text-caramel bg-white/80 px-3 py-1 rounded-full border border-caramel/20 shadow-sm">
                {formatPrice(totalPrice)}
              </span>
            </div>

            {/* THE VISUAL SUNDAE TOWER (Dynamic SVG & CSS Canvas) */}
            <div className="relative w-64 h-72 flex flex-col items-center justify-end z-10 my-4">
              {/* 1. Glacé Cherry on top if selected */}
              <AnimatePresence>
                {selectedToppings.includes("maraschino-cherry") && (
                  <motion.div
                    initial={{ scale: 0, y: -20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="absolute -top-4 z-40 flex flex-col items-center"
                  >
                    {/* Cherry stem */}
                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-700">
                      <path
                        d="M 12 24 C 14 16, 18 10, 22 6"
                        fill="none"
                        stroke="#2D5A27"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Cherry globe with shine */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 via-rose-700 to-red-950 shadow-md relative -mt-1 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/70 absolute top-1 left-1.5" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 2. Wafer Stick diagonal insertion if selected */}
              <AnimatePresence>
                {selectedToppings.includes("wafer-stick") && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 28 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-2 right-4 w-4 h-36 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-700 rounded-full shadow-lg border border-amber-800/20 z-30 pointer-events-none"
                    style={{ transformOrigin: "bottom center" }}
                  >
                    {/* Waffle spiral stripes */}
                    <div className="w-full h-full opacity-40 bg-[repeating-linear-gradient(45deg,#7A4E26,#7A4E26_4px,transparent_4px,transparent_8px)] rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3. Whipped cream cloud if selected */}
              {selectedToppings.includes("whipped-cream") && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-2 z-25 w-32 h-14 bg-white/95 rounded-full blur-[0.5px] shadow-sm border border-stone-200/40 flex items-center justify-center"
                >
                  <div className="w-8 h-8 rounded-full bg-white absolute -top-2 left-6 shadow-xs" />
                  <div className="w-10 h-10 rounded-full bg-white absolute -top-3 right-6 shadow-xs" />
                </motion.div>
              )}

              {/* 4. Warm Drizzle Layer dripping down */}
              <div
                className="absolute top-8 left-8 right-8 h-20 rounded-full blur-[1px] opacity-80 z-20 pointer-events-none transition-colors duration-500"
                style={{
                  backgroundColor: activeSauceObj?.color || "#2C180E",
                  boxShadow: `0 4px 15px ${activeSauceObj?.color}66`,
                }}
              />

              {/* 5. Scoops Stack Container */}
              <div className="relative w-48 h-40 flex flex-col items-center justify-end z-15">
                {selectedScoops.map((scId, idx) => {
                  const flav = SUNDAE_FLAVOURS.find((f) => f.id === scId);
                  const isTop = idx === selectedScoops.length - 1;
                  const isBottom = idx === 0;

                  return (
                    <motion.div
                      key={`${scId}-${idx}`}
                      initial={{ scale: 0.6, y: -30, opacity: 0 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.08 }}
                      className="relative rounded-full shadow-md flex items-center justify-center border border-black/10"
                      style={{
                        width: isTop && selectedScoops.length > 1 ? 110 : 130,
                        height: isTop && selectedScoops.length > 1 ? 75 : 85,
                        backgroundColor: flav?.color || "#FFF8DC",
                        marginBottom: idx > 0 ? -32 : 0,
                        zIndex: 10 + idx,
                      }}
                    >
                      {/* Scoop highlight texture */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/15 via-transparent to-white/40" />

                      {/* Sprinkles on top scoop */}
                      {selectedToppings.includes("sprinkles") && isTop && (
                        <div className="absolute inset-2 flex flex-wrap gap-2 items-center justify-center opacity-75">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        </div>
                      )}

                      {/* Roasted Nuts speckles */}
                      {selectedToppings.includes("roasted-nuts") && (
                        <div className="absolute inset-3 flex flex-wrap gap-2 items-center justify-around opacity-60">
                          <div className="w-2.5 h-1.5 bg-[#8B5A2B] rounded-xs rotate-12" />
                          <div className="w-2 h-2 bg-[#D2B48C] rounded-xs -rotate-45" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* 6. Glass Sundae Dish Structure */}
              <div className="relative w-56 flex flex-col items-center z-25 mt-[-10px]">
                {/* Tulip Cup / Bowl */}
                <div
                  className={`w-full rounded-b-[60px] border border-white/70 backdrop-blur-md shadow-2xl relative overflow-hidden flex items-center justify-center ${
                    glassStyle === "tulip"
                      ? "h-20 bg-gradient-to-b from-white/30 via-white/20 to-white/10"
                      : glassStyle === "fountain"
                      ? "h-28 w-44 rounded-b-[40px] bg-gradient-to-b from-white/35 via-white/20 to-white/10"
                      : "h-16 w-60 rounded-b-[30px] rounded-t-[10px] bg-gradient-to-b from-white/35 via-white/20 to-white/10"
                  }`}
                >
                  {/* Glass Specular Glare & Fluting lines */}
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_20%,rgba(255,255,255,0.4)_50%,transparent_80%)] opacity-70 pointer-events-none" />
                  <span className="text-[10px] font-mono font-bold tracking-widest text-espresso/40 uppercase">
                    Lakeview 1930
                  </span>
                </div>

                {/* Glass Stem */}
                <div className="w-4 h-8 bg-gradient-to-r from-white/40 via-white/60 to-white/30 border-x border-white/70 shadow-sm" />

                {/* Glass Base Pedestal */}
                <div className="w-28 h-3.5 rounded-full bg-gradient-to-b from-white/60 via-white/40 to-stone-300/40 border border-white/80 shadow-md" />
              </div>
            </div>

            {/* Recipe Summary Box */}
            <div className="w-full z-10 pt-4 border-t border-stone-200/60 text-center space-y-1">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="text-center font-serif text-base font-bold text-espresso bg-transparent hover:bg-white/50 focus:bg-white rounded-lg px-2 py-0.5 w-full border-b border-dashed border-caramel/40 outline-none"
              />
              <p className="text-[11px] text-stone-500 line-clamp-1">
                {selectedScoops.map((id) => SUNDAE_FLAVOURS.find((f) => f.id === id)?.name).join(" • ")}
              </p>
            </div>

            {/* Actions: Add to Cart & WhatsApp */}
            <div className="w-full z-10 space-y-2 pt-3">
              <button
                type="button"
                onClick={handleAddToCart}
                data-cursor="Taste"
                className="w-full bg-espresso hover:bg-caramel text-white font-bold text-xs py-3.5 px-4 rounded-2xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>{isSaved ? "✓ Added to Basket!" : `Add to Basket • ${formatPrice(totalPrice)}`}</span>
              </button>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-2.5 px-4 rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order via WhatsApp Direct</span>
              </a>
            </div>
          </TiltCard>
        </div>

        {/* RIGHT COLUMN: Interactive Ingredient & Recipe Customizer (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* 1. Dish Style Selector */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-caramel" />
                <h3 className="font-serif text-lg font-bold text-espresso">
                  1. Choose Vintage Dishware
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Authentic Glass</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {GLASS_STYLES.map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => {
                    setGlassStyle(style.id);
                    sound.playBubblePop();
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all ${
                    glassStyle === style.id
                      ? "bg-espresso text-white border-espresso shadow-lg scale-[1.02]"
                      : "glass-card text-stone-700 border-white/80 hover:bg-white"
                  }`}
                >
                  <span className="text-xs font-bold block">{style.name}</span>
                  <span
                    className={`text-[10px] block mt-0.5 ${
                      glassStyle === style.id ? "text-amber-200" : "text-stone-400"
                    }`}
                  >
                    {style.era}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Artisanal Scoop Selector (Pick up to 3) */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-caramel" />
                <h3 className="font-serif text-lg font-bold text-espresso">
                  2. Farm-Churned Scoops (Pick 1 to 3)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-caramel font-bold">
                {selectedScoops.length}/3 Selected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUNDAE_FLAVOURS.map((flav) => {
                const isSelected = selectedScoops.includes(flav.id);
                return (
                  <button
                    key={flav.id}
                    type="button"
                    onClick={() => handleToggleScoop(flav.id)}
                    className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? "bg-cream-100 border-caramel/70 shadow-md ring-2 ring-caramel/40"
                        : "glass-card border-white/80 hover:bg-white/90"
                    }`}
                  >
                    {/* Color badge preview */}
                    <div
                      className="w-10 h-10 rounded-xl shadow-inner border border-black/10 shrink-0 flex items-center justify-center relative mt-0.5"
                      style={{ backgroundColor: flav.color }}
                    >
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-espresso text-white flex items-center justify-center text-[10px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-espresso truncate">
                          {flav.name}
                        </span>
                        {flav.is1930Original && (
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded shrink-0">
                            1930 Original
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                        {flav.notes}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Warm Drizzle & Sauces */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-caramel" />
                <h3 className="font-serif text-lg font-bold text-espresso">
                  3. Legendary Warm Drizzles
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">1 Included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUNDAE_SAUCES.map((sauce) => {
                const isSelected = selectedSauce === sauce.id;
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => {
                      setSelectedSauce(sauce.id);
                      sound.playBubblePop();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "bg-espresso text-white border-espresso shadow-md"
                        : "glass-card text-stone-700 border-white/80 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{sauce.name}</span>
                      {sauce.isHot && (
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                            isSelected ? "bg-amber-400/30 text-amber-200" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          🔥 Served Warm
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? "text-stone-300" : "text-stone-500"
                      }`}
                    >
                      {sauce.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Confectionery Toppings */}
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-caramel" />
                <h3 className="font-serif text-lg font-bold text-espresso">
                  4. Handcrafted Toppings &amp; Crunch
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Select any</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SUNDAE_TOPPINGS.map((top) => {
                const isSelected = selectedToppings.includes(top.id);
                return (
                  <button
                    key={top.id}
                    type="button"
                    onClick={() => handleToggleTopping(top.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-caramel/15 border-caramel/60 text-espresso shadow-sm ring-1 ring-caramel"
                        : "glass-card text-stone-700 border-white/80 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{top.emoji}</span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-caramel text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-bold block leading-tight">{top.name}</span>
                      <span className="text-[10px] text-stone-500 font-mono mt-0.5 block">
                        +{formatPrice(top.price)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
