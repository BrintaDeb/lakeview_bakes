"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Coffee,
  Wine,
  CupSoda,
  Flame,
  ArrowRight,
  Heart,
  Award,
  Compass,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { TiltCard } from "@/components/ui/TiltCard";

export interface PairingPair {
  beverageId: string;
  beverageName: string;
  beverageTag: string;
  beverageIcon: any;
  beverageDescription: string;
  cakeTitle: string;
  cakeType: string;
  cakeImage: string;
  cakeLink: string;
  harmonyScore: number;
  sommelierNotes: string;
  tasteAromas: string[];
}

export const PAIRING_DATABASE: PairingPair[] = [
  {
    beverageId: "filter-kaapi",
    beverageName: "South Indian Filter Kaapi",
    beverageTag: "Bold Chicory & Milk Brew",
    beverageIcon: Coffee,
    beverageDescription: "Dark-roasted peaberry beans with 15% chicory and scalded whole dairy.",
    cakeTitle: "Dutch Cocoa Truffle",
    cakeType: "Dark Ganache Sponge",
    cakeImage: "/assets/products/Truffel_1_1000x1000.jpg",
    cakeLink: "/collections/chocolate",
    harmonyScore: 98,
    sommelierNotes:
      "The earthy bitterness of roasted chicory cuts through the 55% Belgian chocolate ganache, creating a velvety contrast on the palate.",
    tasteAromas: ["Roasted Chicory", "Dark Cocoa", "Malty Sweetness"],
  },
  {
    beverageId: "darjeeling-tea",
    beverageName: "Darjeeling First Flush",
    beverageTag: "Floral Muscatel Black Tea",
    beverageIcon: Coffee,
    beverageDescription: "Single-estate spring harvest with delicate herbal and muscat grape notes.",
    cakeTitle: "Fresh Strawberry Gateau",
    cakeType: "Light Vanilla Chiffon",
    cakeImage: "/assets/products/StrawberryCake1_1000x1000.jpg",
    cakeLink: "/collections/cake",
    harmonyScore: 96,
    sommelierNotes:
      "The crisp tannins and light astringency of Darjeeling elevate the natural fruit acidity of fresh strawberries without masking the airy crumb.",
    tasteAromas: ["Muscatel Grape", "Fresh Berries", "Sweet Cream"],
  },
  {
    beverageId: "champagne",
    beverageName: "Sparkling Wine & Champagne",
    beverageTag: "Effervescent Celebrations",
    beverageIcon: Wine,
    beverageDescription: "Brut sparkling wine with crisp carbonation and brioche aromas.",
    cakeTitle: "Classic New York Cheesecake",
    cakeType: "Baked Cream Cheese",
    cakeImage: "/assets/products/BlueberryCheeseCake_1_1000x1000.jpg",
    cakeLink: "/collections/cheese-cake",
    harmonyScore: 99,
    sommelierNotes:
      "High effervescent acidity acts as a natural palate cleanser against rich mascarpone and philadelphia cream cheese layers.",
    tasteAromas: ["Brioche", "Citrus Zest", "Cultured Dairy"],
  },
  {
    beverageId: "hot-chocolate",
    beverageName: "Spiced Hot Chocolate",
    beverageTag: "Warm Winter Comfort",
    beverageIcon: Flame,
    beverageDescription: "Double-boiled dark cocoa infused with cinnamon quill and nutmeg.",
    cakeTitle: "Carrot Walnut Spiced Cake",
    cakeType: "Artisanal Spiced Bake",
    cakeImage: "/assets/products/CarrotCake1_1000x1000.jpg",
    cakeLink: "/collections/artisanal",
    harmonyScore: 95,
    sommelierNotes:
      "Warm aromatic baking spices resonate deeply between the cinnamon cocoa and freshly grated carrots, rounded by roasted walnut crunch.",
    tasteAromas: ["Warm Cinnamon", "Roasted Walnuts", "Molasses"],
  },
  {
    beverageId: "cold-milk",
    beverageName: "Old Parlour Cold Milk",
    beverageTag: "1930s Nostalgia",
    beverageIcon: CupSoda,
    beverageDescription: "Chilled whole farm milk served fresh, just like in James Meadow Charles’s lake cart.",
    cakeTitle: "Red Velvet Cream Cheese",
    cakeType: "Ruby Cocoa Chiffon",
    cakeImage: "/assets/products/Redvelvet_heart_cake1_1000x1000.jpg",
    cakeLink: "/collections/cake",
    harmonyScore: 97,
    sommelierNotes:
      "Sweet, silky dairy cream balances the slight cocoa buttermilk tang of authentic Red Velvet, making it the definitive comfort indulgence.",
    tasteAromas: ["Vanilla Bean", "Buttermilk Tang", "Pure Cream"],
  },
  {
    beverageId: "earl-grey",
    beverageName: "Earl Grey Bergamot",
    beverageTag: "Aromatic Citrus Tea",
    beverageIcon: Coffee,
    beverageDescription: "Black Ceylon tea scented with pure cold-pressed Italian bergamot oil.",
    cakeTitle: "Lavender Honey & Lemon Pound Cake",
    cakeType: "Tea-Time Pound Cake",
    cakeImage: "/assets/products/LemonTeaCake_1_1000x1000.jpg",
    cakeLink: "/collections/pound-cake",
    harmonyScore: 94,
    sommelierNotes:
      "Bright bergamot citrus oils lift the buttery crumb of our lemon pound cake, leaving an aromatic, floral finish on the palate.",
    tasteAromas: ["Bergamot Oil", "Lemon Zest", "Wild Honey"],
  },
];

export const FlavorPairingMatrix: React.FC = () => {
  const [selectedBev, setSelectedBev] = useState<string>("filter-kaapi");

  const currentPair =
    PAIRING_DATABASE.find((p) => p.beverageId === selectedBev) || PAIRING_DATABASE[0];

  return (
    <section className="py-24 bg-gradient-to-b from-cream-50 via-cream-100/70 to-cream-50 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-rose-pastel/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>The Baker’s Sommelier</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
            The Flavour Pairing Matrix
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            What are you sipping today? Discover our master baker’s scientifically harmonized
            confectionery pairings for Bengaluru’s favourite beverages.
          </p>
        </div>

        {/* Beverage Selector Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {PAIRING_DATABASE.map((item) => {
            const isSelected = item.beverageId === selectedBev;
            const Icon = item.beverageIcon;
            return (
              <button
                key={item.beverageId}
                onClick={() => {
                  setSelectedBev(item.beverageId);
                  sound.playBubblePop();
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 relative ${
                  isSelected
                    ? "bg-espresso text-white shadow-xl scale-105"
                    : "glass-card text-stone-600 hover:text-espresso hover:bg-white"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-caramel"}`} />
                <span>{item.beverageName}</span>
                {isSelected && (
                  <motion.div
                    layoutId="active-bev-pill"
                    className="absolute inset-0 rounded-full border border-caramel/40 -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Pairing Spotlight Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPair.beverageId}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Beverage Info & Harmony Score (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <TiltCard
                maxTilt={6}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-caramel block">
                      {currentPair.beverageTag}
                    </span>
                    <h3 className="font-serif text-2xl font-black text-espresso mt-0.5">
                      {currentPair.beverageName}
                    </h3>
                  </div>
                  {/* Harmony Score Radial Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-espresso text-amber-200 flex flex-col items-center justify-center shadow-lg border border-amber-300/30">
                    <span className="font-mono text-base font-black leading-none">
                      {currentPair.harmonyScore}%
                    </span>
                    <span className="text-[8px] uppercase tracking-wider text-stone-400 mt-0.5">
                      Harmony
                    </span>
                  </div>
                </div>

                <p className="text-stone-700 text-sm leading-relaxed">
                  {currentPair.beverageDescription}
                </p>

                {/* Sommelier Tasting Note */}
                <div className="bg-cream-100/80 rounded-2xl p-4 border border-caramel/25 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-espresso">
                    <Sparkles className="w-3.5 h-3.5 text-caramel" />
                    <span>Baker’s Sommelier Rationale</span>
                  </div>
                  <p className="font-serif italic text-xs text-stone-700 leading-relaxed">
                    &quot;{currentPair.sommelierNotes}&quot;
                  </p>
                </div>

                {/* Taste Aromas Pills */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Shared Flavor Notes
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentPair.tasteAromas.map((aroma, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-3 py-1 rounded-full bg-white text-stone-700 border border-stone-200/80 shadow-xs"
                      >
                        {aroma}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Middle: Visual Dynamic Connector Arrow (1 col on desktop) */}
            <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-espresso text-white flex items-center justify-center shadow-xl border border-white/80">
                <Heart className="w-5 h-5 text-rose-pastel fill-current animate-pulse" />
              </div>
              <span className="font-serif italic text-xs font-bold text-caramel">
                Harmonizes With
              </span>
            </div>

            {/* Right: Perfect Matching Confectionery Card (5 cols) */}
            <div className="lg:col-span-5">
              <TiltCard
                maxTilt={6}
                className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-2xl space-y-5 group"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 shadow-md">
                  <Image
                    src={currentPair.cakeImage}
                    alt={currentPair.cakeTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300">
                    Recommended Match
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block">
                      {currentPair.cakeType}
                    </span>
                    <h4 className="font-serif text-xl font-bold leading-tight">
                      {currentPair.cakeTitle}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-stone-500 block">Handcrafted Fresh Daily</span>
                    <span className="font-serif text-base font-bold text-espresso">
                      Available for Delivery &amp; Drive-In
                    </span>
                  </div>

                  <Link
                    href={currentPair.cakeLink}
                    className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold px-5 py-3 rounded-full transition-all shadow-md group-hover:shadow-xl"
                  >
                    <span>Explore Pairing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
