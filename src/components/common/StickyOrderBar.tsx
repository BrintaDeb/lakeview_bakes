"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  ShoppingBag,
  Cake,
  Sparkles,
  Truck,
  MessageCircle,
  ChevronUp,
  ChevronDown,
  X,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND_INFO } from "@/data/brand";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

export const StickyOrderBar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { totalItems, subtotal, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Appear after modest scroll or keep visible when items in cart
      setVisible(window.scrollY > 200 || totalItems > 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalItems]);

  const freeDeliveryThreshold = 999;
  const progress = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 320 }}
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none"
        >
          {/* EXPANDABLE QUICK ACTIONS PANEL (Slides smoothly above horizontal bar) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="w-76 sm:w-84 rounded-3xl p-4 sm:p-5 bg-[#FFFDF9]/95 backdrop-blur-xl border border-stone-200/90 shadow-2xl space-y-3.5 text-espresso"
              >
                {/* Panel Header */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-caramel">
                      Express Bengaluru Dispatch
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      haptics.light();
                      setIsExpanded(false);
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-espresso hover:bg-stone-100 transition-colors"
                    aria-label="Collapse panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Free Delivery Meter */}
                <div className="bg-cream-100/70 rounded-2xl p-3 border border-stone-200/60 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-espresso">
                      <Truck className="w-3.5 h-3.5 text-caramel" />
                      <span>
                        {subtotal >= freeDeliveryThreshold
                          ? "🎉 Free Delivery Unlocked!"
                          : `Add ₹${amountNeeded} for Free Delivery`}
                      </span>
                    </span>
                    <span className="font-mono text-[11px] text-caramel font-bold">
                      {progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-stone-200/80 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-amber-500 to-caramel rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Direct Call & WhatsApp Hotline Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:9663812036"
                    onClick={() => haptics.light()}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-900 text-xs font-bold transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-700" />
                    <span>Call Hotline</span>
                  </a>

                  <a
                    href="https://wa.me/919663812036?text=Hello%20Lakeview%20Milk%20Bar!%20I%20would%20like%20to%20order."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptics.light()}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 text-emerald-900 text-xs font-bold transition-all"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* 3D Custom Cake Studio Shortcut */}
                <Link
                  href="/custom-cake"
                  onClick={() => {
                    haptics.light();
                    setIsExpanded(false);
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-xl bg-pink-50/70 hover:bg-pink-100/70 border border-pink-200/70 text-espresso text-xs font-bold transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <Cake className="w-4 h-4 text-pink-600" />
                    <span>Build Bespoke 3D Cake</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-pink-600 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                {/* View Cart & Checkout Button */}
                <button
                  type="button"
                  onClick={() => {
                    haptics.medium();
                    sound.playSweetChime();
                    setIsCartOpen(true);
                    setIsExpanded(false);
                  }}
                  className="w-full py-2.5 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    Open Basket ({totalItems}) · {formatPrice(subtotal)}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* COMPACT HORIZONTAL BAR ON THE RIGHT (Smaller & Sleeker with Call + WhatsApp + Basket) */}
          <div className="glass-panel rounded-full p-1.5 sm:p-2 border border-white/95 shadow-xl flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-xl">
            {/* 1. Call Button */}
            <a
              href="tel:9663812036"
              onClick={() => haptics.light()}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200/60 text-amber-800 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
              title="Call Central Order Desk: +91 9663812036"
              aria-label="Call Central Order Desk"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700" />
            </a>

            {/* 2. WhatsApp Button */}
            <a
              href="https://wa.me/919663812036?text=Hello%20Lakeview%20Milk%20Bar!%20I%20would%20like%20to%20order."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.light()}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60 text-emerald-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xs"
              title="Chat on WhatsApp (+91 9663812036)"
              aria-label="WhatsApp Quick Order"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-emerald-600 text-emerald-600" />
            </a>

            {/* 3. Smaller Basket Button (Direct trigger for cart) */}
            <button
              type="button"
              onClick={() => {
                haptics.medium();
                sound.playSweetChime();
                setIsCartOpen(true);
              }}
              className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-full bg-espresso hover:bg-caramel text-white font-bold text-xs flex items-center gap-1.5 sm:gap-2 transition-all shadow-md active:scale-95"
              aria-label={`View Basket with ${totalItems} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="font-sans">Basket ({totalItems})</span>
              {subtotal > 0 && (
                <span className="border-l border-white/20 pl-1.5 font-mono text-[11px] text-amber-200">
                  {formatPrice(subtotal)}
                </span>
              )}
            </button>

            {/* 4. Expand / Collapse Panel Toggle Chevron Button */}
            <button
              type="button"
              onClick={() => {
                haptics.light();
                sound.playBubblePop();
                setIsExpanded((prev) => !prev);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-stone-600 hover:text-espresso transition-all ${
                isExpanded
                  ? "bg-stone-200 text-espresso rotate-180"
                  : "bg-stone-100 hover:bg-stone-200"
              }`}
              title={isExpanded ? "Collapse Quick Panel" : "Expand Delivery & Hotline Panel"}
              aria-label="Toggle Quick Panel"
            >
              <ChevronUp className="w-4 h-4 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
