"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  MessageCircle,
  ShoppingBag,
  CheckCircle2,
  X,
  Clock,
  ShieldCheck,
  Calendar,
  Gift,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { haptics } from "@/lib/haptics";
import { sound } from "@/lib/sound";

interface WeightOption {
  weight: string;
  servings: string;
  price: number;
  label: string;
}

const WEIGHT_OPTIONS: WeightOption[] = [
  { weight: "0.5 kg", servings: "Serves 4–5", price: 650, label: "Intimate Gathering" },
  { weight: "1.0 kg", servings: "Serves 8–10", price: 1150, label: "Most Popular · Serves 10" },
  { weight: "1.5 kg", servings: "Serves 12–15", price: 1650, label: "Grand Celebration" },
  { weight: "2.0 kg", servings: "Serves 16–20", price: 2100, label: "Party Tier Stack" },
];

export const BerniceCakeCTA: React.FC = () => {
  const { addCustomItem, setIsCartOpen } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  // Ordering modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(WEIGHT_OPTIONS[1]);
  const [isEggless, setIsEggless] = useState(true);
  const [flavor, setFlavor] = useState("Heritage Confetti Vanilla Cloud");
  const [pipedMessage, setPipedMessage] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Today Express (within 2-3 hrs)");
  const [deliveryDate, setDeliveryDate] = useState("Today");
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Mouse tracking on button for Bernice magnetic ripple effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    buttonRef.current.style.setProperty("--mouse-x", `${x}px`);
    buttonRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, []);

  // Scrollable SVG textPath animation matching bernicebakery.com
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!sectionRef.current || !textPathRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Bernice GSAP formula:
      // start: "top bottom+=40" (when top enters 40px below viewport bottom)
      // end: "bottom top" (when bottom leaves top of viewport)
      const startY = windowH + 40;
      const endY = -rect.height;
      const currentY = rect.top;

      // Progress from 0 (at enter) to 1 (at exit)
      const progress = Math.min(Math.max((startY - currentY) / (startY - endY), 0), 1);

      // Scrub startOffset from 230 down to 20
      const newOffset = 230 - progress * (230 - 20);

      textPathRef.current.setAttribute("startOffset", `${newOffset.toFixed(1)}`);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Handle adding custom celebration cake to cart
  const handleAddToBasket = () => {
    haptics.medium();
    sound.playSweetChime();

    addCustomItem({
      id: `celebrate-cake-${selectedWeight.weight}-${Date.now()}`,
      productId: "celebrate-cake-heritage",
      variantId: `variant-${selectedWeight.weight}`,
      title: "Heritage Celebration Cake",
      variantTitle: `${selectedWeight.weight} (${selectedWeight.servings})`,
      price: selectedWeight.price,
      quantity: 1,
      image: "/assets/products/bernice-celebrate-cake.jpg",
      size: selectedWeight.weight,
      eggless: isEggless,
      messageOnCake: pipedMessage.trim() || undefined,
    });

    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      setIsOrderModalOpen(false);
      setIsCartOpen(true);
    }, 900);
  };

  // WhatsApp order formatting
  const handleWhatsAppOrder = () => {
    haptics.light();
    sound.playSparkle();

    const text = encodeURIComponent(
      `🎂 *Lakeview Milk Bar — Celebration Cake Order*\n` +
      `──────────────────────────\n` +
      `*Item:* Heritage Celebration Cake (Funfetti Confetti)\n` +
      `*Weight:* ${selectedWeight.weight} (${selectedWeight.servings})\n` +
      `*Flavor:* ${flavor}\n` +
      `*Dietary:* ${isEggless ? "100% Eggless 🌱" : "Classic Recipe (Egg)"}\n` +
      `*Piped Inscription:* "${pipedMessage.trim() || "Happy Celebration!"}"\n` +
      `*Delivery Slot:* ${deliveryDate} — ${deliverySlot}\n` +
      `*Price:* ₹${selectedWeight.price}\n` +
      `──────────────────────────\n` +
      `Please confirm my bespoke order! 🍰`
    );
    window.open(`https://wa.me/919845012345?text=${text}`, "_blank");
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="Section Collections_CTA_Section Parallax_Wrapper SectionPadded py-16 md:py-24 bg-[#FAF8F5] relative overflow-hidden"
      >
        {/* Subtle decorative background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#112229 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic Arched Window with Scrollable Curved SVG Title */}
        <div className="Collections_CTA_Image Dynamic_Window relative mx-auto my-12 md:my-16 flex items-center justify-center">
          {/* Arched Window Image matching Bernice .Window_Image */}
          <div
            className="Window_Image No_Anim relative overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
            style={{
              aspectRatio: "0.75",
              width: "min(340px, 75vw)",
              borderRadius: "500px 500px 4rem 4rem",
              backgroundColor: "#FAF6F0",
            }}
          >
            <div className="Window_Image_Limit w-full h-full relative overflow-hidden">
              <div className="Window_Image_Container Fluid w-full h-full relative">
                <Image
                  src="/assets/products/bernice-celebrate-cake.jpg"
                  alt="Celebrate with cake — Lakeview Milk Bar"
                  fill
                  sizes="(max-width: 768px) 75vw, 360px"
                  priority
                  className="object-cover object-center scale-[1.08] transition-transform duration-1000 hover:scale-115"
                />
              </div>
            </div>
          </div>

          {/* Circular Pink ORDER Button overlapping bottom border */}
          <div
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            className="Collections_CTA_Button absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 group cursor-pointer"
            onClick={() => {
              haptics.medium();
              sound.playSparkle();
              setIsOrderModalOpen(true);
            }}
            style={{
              backgroundColor: "var(--pink, #FFA7EE)",
              borderRadius: "1000px",
              boxShadow: "0 12px 30px rgba(255, 117, 181, 0.45)",
              border: "6px solid #FAF8F5",
              outline: "6px solid rgba(255, 167, 238, 0.25)",
            }}
          >
            <button
              type="button"
              className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full text-white font-extrabold uppercase tracking-widest text-base md:text-lg transition-transform duration-300 group-hover:scale-95 group-hover:text-[#112229]"
              aria-label="Order Celebration Cake"
            >
              <span className="relative z-10 drop-shadow-sm font-['Apfel_Grotezk',sans-serif]">
                Order
              </span>
            </button>
          </div>

          {/* Curved SVG Title: CELEBRATE WITH CAKE on dynamic scroll textPath */}
          <svg
            id="Calque_2"
            data-name="Calque 2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 221.66 283.6"
            className="Collections_CTA_Title_SVG absolute bottom-0 left-1/2 -translate-x-1/2 w-[116%] h-auto overflow-visible pointer-events-none select-none z-20"
            aria-hidden="true"
          >
            <path
              fill="none"
              id="Text_Path"
              d="M 0.5 283.6 V 106 C 0.5 48.7 48.7 5 106 5 H 111.6 C 171.1 5 219.4 48.8 219.4 108.4 V 283.6 H 0.5 Z"
            />
            <text
              fill="#112229"
              className="font-extrabold uppercase tracking-[0.05em]"
              style={{
                fontFamily: "var(--title-font, 'Apfel Grotezk', sans-serif)",
                fontSize: "19px",
                letterSpacing: "0.06em",
              }}
            >
              <textPath
                ref={textPathRef}
                href="#Text_Path"
                startOffset="220"
                className="transition-all duration-75 ease-out"
              >
                CELEBRATE WITH CAKE
              </textPath>
            </text>
          </svg>
        </div>

        {/* Narrative Copy below the arch matching Bernice Bakery styling */}
        <div className="Collections_CTA_Text max-w-xl mx-auto px-6 text-center mt-12 md:mt-16 text-stone-700 text-sm md:text-base leading-relaxed space-y-4">
          <p>
            Ordering a celebration cake at <strong className="text-[#112229] font-semibold">Lakeview Milk Bar</strong> is a seamless and personalized experience. Customers can either visit our MG Road parlour in person, connect with our master confectioners over WhatsApp, or conveniently order online.
          </p>
          <p className="text-stone-500 text-xs md:text-sm">
            The process begins with selecting from our heritage 1930 recipes and artisanal sponge flavors, followed by selecting your preferred delivery date and time slot. Every celebration cake is baked fresh to order with pure European butter and dairy cream. Our cake will most certainly be the sweet centerpiece to any of your celebrations!
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setIsOrderModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-[var(--blue)] hover:text-[var(--pink)] transition-colors underline underline-offset-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Customize This Cake
            </button>
            <span className="text-stone-300">•</span>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-stone-600 hover:text-stone-900 transition-colors"
            >
              View Full 28+ Cake Menu
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* BESPOKE CELEBRATION CAKE ORDER MODAL                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isOrderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#FAF8F5] rounded-3xl p-6 md:p-8 shadow-2xl border border-stone-200"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[var(--pink)] text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3 h-3" />
                  Bespoke Studio Order
                </span>
                <h3 className="text-2xl font-bold font-serif text-[#112229]">
                  Heritage Celebration Gateau
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Vanilla confetti cloud sponge soaked in sweet milk, frosted with silky European buttercream
                </p>
              </div>

              {/* Cake Thumbnail & Dietary Switch */}
              <div className="flex items-center gap-4 p-3.5 bg-white rounded-2xl border border-stone-200/80 mb-5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src="/assets/products/bernice-celebrate-cake.jpg"
                    alt="Celebration Cake Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-stone-900 truncate">
                    Confetti Vanilla Layer Cake
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        haptics.light();
                        setIsEggless(!isEggless);
                      }}
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-all ${isEggless
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-amber-50 text-amber-700 border-amber-300"
                        }`}
                    >
                      {isEggless ? "🌱 100% Eggless" : "🥚 Classic Recipe"}
                    </button>
                    <span className="text-xs text-stone-400">· Freshly Baked</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-serif text-[#112229]">
                    ₹{selectedWeight.price}
                  </span>
                </div>
              </div>

              {/* 1. Weight & Servings Selector */}
              <div className="mb-5">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Select Size & Servings
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {WEIGHT_OPTIONS.map((opt) => (
                    <button
                      key={opt.weight}
                      type="button"
                      onClick={() => {
                        haptics.light();
                        setSelectedWeight(opt);
                      }}
                      className={`p-3 rounded-2xl border text-left transition-all ${selectedWeight.weight === opt.weight
                        ? "border-[var(--pink)] bg-pink-50/50 shadow-sm ring-1 ring-[var(--pink)]"
                        : "border-stone-200 bg-white hover:border-stone-300"
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#112229]">{opt.weight}</span>
                        <span className="font-bold text-xs text-[var(--blue)]">₹{opt.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">{opt.servings}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Custom Piped Message */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                    Piped Inscription on Cake
                  </label>
                  <span className="text-[10px] text-stone-400">Free Artisan Calligraphy</span>
                </div>
                <input
                  type="text"
                  maxLength={40}
                  value={pipedMessage}
                  onChange={(e) => setPipedMessage(e.target.value)}
                  placeholder="e.g., Happy Birthday Rhea! 🎉"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-[var(--pink)] focus:border-transparent"
                />
                {pipedMessage && (
                  <p className="mt-1.5 text-xs text-stone-500 italic flex items-center gap-1.5">
                    <span>Preview:</span>
                    <span className="font-serif font-bold text-stone-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      &ldquo;{pipedMessage}&rdquo;
                    </span>
                  </p>
                )}
              </div>

              {/* 3. Delivery / Pickup Slot */}
              <div className="mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                  Delivery / Pickup Schedule
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setDeliveryDate("Today");
                      setDeliverySlot("Today Express (within 2-3 hrs)");
                    }}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${deliveryDate === "Today"
                      ? "border-[#112229] bg-[#112229] text-white"
                      : "border-stone-200 bg-white text-stone-700"
                      }`}
                  >
                    ⚡ Today (Express)
                    <span className="block text-[10px] opacity-80 mt-0.5">Dispatched in 2-3 hrs</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setDeliveryDate("Tomorrow");
                      setDeliverySlot("Tomorrow Evening (5 PM - 8 PM)");
                    }}
                    className={`p-2.5 rounded-xl border text-left font-medium transition-all ${deliveryDate === "Tomorrow"
                      ? "border-[#112229] bg-[#112229] text-white"
                      : "border-stone-200 bg-white text-stone-700"
                      }`}
                  >
                    📅 Tomorrow
                    <span className="block text-[10px] opacity-80 mt-0.5">Fresh morning bake</span>
                  </button>
                </div>
              </div>

              {/* 4. Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleAddToBasket}
                  disabled={isAddedSuccess}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md ${isAddedSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-[#112229] text-white hover:bg-stone-800"
                    }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Added to Basket! Opening Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      Add to Basket · ₹{selectedWeight.price}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3 px-4 rounded-2xl font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  Order via WhatsApp Confectionery Concierge
                </button>
              </div>

              {/* Reassurance note */}
              <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-center gap-4 text-[11px] text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Quality Guaranteed
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Cold-Chain Delivery
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
