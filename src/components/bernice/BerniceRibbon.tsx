"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, Coffee, X, ChevronRight, Gift, Clock, Flame } from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface Particle {
  id: number;
  x: number;
  y: number;
  icon: string;
}

export const BerniceRibbon: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Phrases for the ribbon
  const sloganPhrases = [
    "Baking is our Love language",
    "✦ Handcrafted in Bengaluru Since 1930 ✦",
    "Baking is our Love language",
    "♡ 100% Pure Dairy Butter & Slow-Churned Vanilla ♡",
    "Baking is our Love language",
    "✦ Midnight Cravings on MG Road ✦",
    "Baking is our Love language",
    "♡ Fresh Out of Our Heritage Ovens Daily ♡",
  ];

  // Quadruple to ensure seamless infinite looping
  const repeatedPhrases = [
    ...sloganPhrases,
    ...sloganPhrases,
    ...sloganPhrases,
    ...sloganPhrases,
  ];

  // Spawn fun particles on click/tap
  const handleRibbonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    haptics.light();
    sound.playSparkle();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const icons = ["💖", "✨", "🍰", "🍓", "🧁", "✦", "♡"];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x,
      y,
      icon: randomIcon,
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);
  };

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => Date.now() - p.id < 1200));
    }, 1200);
    return () => clearTimeout(timer);
  }, [particles]);

  const loveLanguages = [
    {
      title: "Quality Time",
      description:
        "Generations of Bengaluru families lingering over hot fudge sundaes and banana splits on MG Road past midnight.",
      icon: "☕",
      highlight: "94 Years of Unbroken Memories",
    },
    {
      title: "Words of Affirmation",
      description:
        "Every single birthday, anniversary, and milestone cake hand-piped with personalized cursive buttercream love notes.",
      icon: "✍️",
      highlight: "Custom Piped Messages on Every Cake",
    },
    {
      title: "Acts of Service",
      description:
        "Our legendary Car-Hop service: park outside on MG Road and we bring chilled sundaes directly to your car window.",
      icon: "🚗",
      highlight: "Midnight Drive-In Car-Hop",
    },
    {
      title: "Receiving Gifts",
      description:
        "Unwrapping the iconic Lakeview bakery box tied with golden ribbon, filled with warm bakes and artisan confections.",
      icon: "🎁",
      highlight: "Hand-Packaged with Golden Ribbons",
    },
    {
      title: "Physical Touch",
      description:
        "Hand-kneading delicate pastry dough, hand-whipping rich Belgian chocolate ganache, and slow-cooking real dark fudge.",
      icon: "🤲",
      highlight: "100% Artisan Handcrafted",
    },
  ];

  return (
    <section className="relative overflow-hidden py-14 select-none bg-[#FDFBF7]">
      {/* Background Subtle Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C68B59_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Ribbon Wrapper */}
      <div className="relative py-4">
        {/* Main Interactive Ribbon (High-contrast luxury warm velvet rose-crimson with gold metallic border) */}
        <div
          ref={containerRef}
          onClick={handleRibbonClick}
          onMouseEnter={() => {
            setIsPaused(true);
            setSpeedMultiplier(0.5);
          }}
          onMouseLeave={() => {
            setIsPaused(false);
            setSpeedMultiplier(1);
          }}
          className="relative py-5 md:py-6 shadow-2xl cursor-pointer transition-transform duration-300 hover:scale-[1.015] active:scale-[0.99] border-y-4 border-[#F59E0B]"
          style={{
            background:
              "linear-gradient(135deg, #7F1D1D 0%, #991B1B 25%, #BE123C 55%, #881337 80%, #701A75 100%)",
            boxShadow:
              "0 20px 35px -10px rgba(127, 29, 29, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Decorative Gold Stitching top and bottom */}
          <div
            className="absolute top-1 left-0 right-0 h-[2px] opacity-80 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #FDE68A 0px, #FDE68A 8px, transparent 8px, transparent 14px)",
            }}
          />
          <div
            className="absolute bottom-1 left-0 right-0 h-[2px] opacity-80 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #FDE68A 0px, #FDE68A 8px, transparent 8px, transparent 14px)",
            }}
          />

          {/* Marquee Track with CSS Animation */}
          <div
            className="flex items-center whitespace-nowrap overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            }}
          >
            <div
              className="flex items-center gap-10 md:gap-14 animate-marquee font-serif"
              style={{
                animationPlayState: isPaused ? "paused" : "running",
                animationDuration: `${36 / speedMultiplier}s`,
              }}
            >
              {repeatedPhrases.map((phrase, idx) => {
                const isMainSlogan = phrase === "Baking is our Love language";
                return (
                  <span
                    key={`ribbon-item-${idx}`}
                    className={`inline-flex items-center gap-3 text-lg sm:text-2xl md:text-3xl tracking-wide uppercase transition-transform hover:scale-110 ${
                      isMainSlogan
                        ? "font-black text-amber-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] tracking-widest"
                        : "font-semibold text-rose-100/90 text-base sm:text-xl"
                    }`}
                  >
                    {isMainSlogan && (
                      <Heart className="w-4 h-4 md:w-6 md:h-6 fill-amber-300 text-amber-300 animate-pulse inline-block" />
                    )}
                    <span>{phrase}</span>
                    {isMainSlogan && (
                      <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-amber-200 inline-block" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Floating Interactive Particle Bursts */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, y: -45 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute pointer-events-none text-2xl font-bold select-none z-30"
              style={{ left: p.x, top: p.y }}
            >
              {p.icon}
            </motion.div>
          ))}
        </div>

        {/* Interactive Sub-Ribbon with Action Button */}
        <div className="max-w-4xl mx-auto px-4 mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-espresso">
              Interactive Ribbon · Click to spawn sweet confections
            </span>
          </div>

          <button
            onClick={() => {
              sound.playSweetChime();
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/15 hover:bg-caramel text-caramel hover:text-white transition-all font-bold tracking-wider uppercase text-[11px] shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Our 5 Love Languages</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Interactive Modal: The 5 Confectionery Love Languages of Lakeview */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-caramel/30 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xl">
                    ❤️
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-black text-espresso">
                      Baking is our Love language
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Lakeview Milk Bar · Serving Bengaluru since 1930
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-stone-400 hover:text-espresso rounded-full hover:bg-stone-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* The 5 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {loveLanguages.map((lang, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-caramel hover:shadow-md transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{lang.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-caramel bg-amber-50 px-2 py-0.5 rounded-full">
                        {lang.highlight}
                      </span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-espresso group-hover:text-caramel transition-colors">
                      {lang.title}
                    </h4>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {lang.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-stone-500 text-center sm:text-left">
                  Every slice tells a 94-year story. What will you celebrate today?
                </p>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-espresso hover:bg-caramel text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  Close &amp; Taste the Love
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
