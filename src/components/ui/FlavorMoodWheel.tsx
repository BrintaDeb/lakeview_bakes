"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Heart, ShoppingBag, Eye } from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { TiltCard } from "@/components/ui/TiltCard";
import { useCart } from "@/context/CartContext";

const MOODS = [
  {
    id: "chocolate",
    title: "Belgian Chocolate & Truffle",
    emoji: "🍫",
    tagline: "Silky ganache, molten lava & Dutch cocoa",
    filterKeywords: ["chocolate", "truffle", "fudge", "dutch"],
    badgeColor: "from-amber-900 to-amber-950",
  },
  {
    id: "fruit",
    title: "Fresh Fruit & Berries",
    emoji: "🍓",
    tagline: "Farm strawberries, dark cherries & tropical lychee",
    filterKeywords: ["fruit", "forest", "strawberry", "pineapple", "cherry", "mango"],
    badgeColor: "from-rose-600 to-rose-900",
  },
  {
    id: "caramel",
    title: "Praline & Salted Caramel",
    emoji: "🍯",
    tagline: "Golden butterscotch crunch & roasted almond",
    filterKeywords: ["butterscotch", "caramel", "almond", "praline", "crunch"],
    badgeColor: "from-amber-600 to-amber-800",
  },
  {
    id: "velvet",
    title: "Velvet & Artisanal Cheese",
    emoji: "🧀",
    tagline: "Ruby red velvet & New York style blueberry cheesecake",
    filterKeywords: ["velvet", "cheese", "blueberry", "lotus", "biscoff"],
    badgeColor: "from-red-700 to-purple-900",
  },
  {
    id: "heritage",
    title: "1930 Heritage Favourites",
    emoji: "🍨",
    tagline: "Vintage recipes that put Bangalore on the map",
    filterKeywords: ["cake", "vanilla", "sundae", "classic", "pound"],
    badgeColor: "from-caramel to-espresso",
  },
];

export const FlavorMoodWheel: React.FC = () => {
  const [activeMood, setActiveMood] = useState<string>("chocolate");
  const { addToCart } = useCart();

  const selectedMood = MOODS.find((m) => m.id === activeMood) || MOODS[0];

  const matchedProducts = React.useMemo(() => {
    return ALL_PRODUCTS.filter((p) => {
      const text = `${p.title} ${p.description} ${(p.tags || []).join(" ")}`.toLowerCase();
      return selectedMood.filterKeywords.some((kw) => text.includes(kw));
    }).slice(0, 4);
  }, [selectedMood]);

  return (
    <section className="py-20 bg-cream-100/50 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Palate Curations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
            What Are You Craving Today?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Select your flavor mood — our pâtisserie curators have handpicked the finest bakes to match your palate.
          </p>
        </div>

        {/* Mood Selector Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {MOODS.map((mood) => {
            const isSelected = mood.id === activeMood;
            return (
              <button
                key={mood.id}
                onClick={() => setActiveMood(mood.id)}
                data-cursor="Flavour"
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 relative shadow-sm ${
                  isSelected
                    ? "bg-espresso text-white shadow-xl scale-105"
                    : "glass-card text-stone-700 hover:text-espresso hover:bg-white"
                }`}
              >
                <span className="text-base">{mood.emoji}</span>
                <span>{mood.title.split("&")[0].trim()}</span>
                {isSelected && (
                  <motion.div
                    layoutId="active-mood-pill"
                    className="absolute inset-0 border-2 border-caramel/40 rounded-full pointer-events-none"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Mood Banner Info */}
        <div className="text-center max-w-md mx-auto mb-10">
          <motion.div
            key={selectedMood.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              {selectedMood.title}
            </span>
            <p className="text-stone-600 text-sm italic font-serif">
              &quot;{selectedMood.tagline}&quot;
            </p>
          </motion.div>
        </div>

        {/* Dynamic Matched Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMood.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {matchedProducts.map((p) => (
              <TiltCard
                key={p.id}
                maxTilt={6}
                className="glass-card rounded-3xl overflow-hidden p-3 border border-white/90 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 mb-3">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-espresso shadow-sm">
                    🟢 Eggless
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-espresso/80 backdrop-blur-md text-white font-mono text-xs font-bold px-2.5 py-1 rounded-full">
                    ₹{p.price_min}
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-caramel">
                    {p.product_type}
                  </span>
                  <Link href={`/products/${p.handle}`}>
                    <h4 className="font-serif text-base font-bold text-espresso hover:text-caramel transition-colors line-clamp-1">
                      {p.title}
                    </h4>
                  </Link>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-200/60 flex items-center gap-2">
                  <Link
                    href={`/products/${p.handle}`}
                    className="flex-1 text-center py-2 px-3 rounded-xl bg-espresso hover:bg-caramel text-white text-xs font-bold transition-all"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => addToCart(p, undefined, 1, { size: "1 kg", eggless: true })}
                    className="p-2 rounded-xl glass-panel text-espresso hover:text-caramel border border-stone-200"
                    aria-label="Add to cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </TiltCard>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All In Mood CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/collections/cake"
            className="inline-flex items-center gap-2 text-xs font-bold text-caramel hover:text-espresso tracking-widest uppercase group"
          >
            <span>Explore All 204 Signature Creations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};
