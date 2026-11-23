"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Heart,
  Sparkles,
  Cake,
  ExternalLink,
  Copy,
  Check,
  X,
  Wand2,
  ShoppingBag,
  MessageCircle,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  tag: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "post-1",
    image: "/assets/products/2-tier-rainbow-cake.jpg",
    caption: "Behind the scenes: Frosting the iconic 2-Tier Rainbow Gateau with sweet vanilla cloud sponge & rainbow drip cascade 🌈✨",
    likes: "3,420",
    comments: "142",
    tag: "🎂 Celebration Gateau",
  },
  {
    id: "post-2",
    image: "/assets/products/classic-banana-split.jpg",
    caption: "Midnight car-hop drive-in orders outside MG Road. Twin scoops, roasted almonds, and boiling hot fudge since 1930 🚗🍌",
    likes: "4,890",
    comments: "285",
    tag: "🍨 Midnight Car-Hop",
  },
  {
    id: "post-3",
    image: "/assets/products/demon-slayer-kimetsu-no-yaiba-anime-cake.jpg",
    caption: "Artisan hand-piped Demon Slayer anime birthday cake! Tanjiro checkered haori fondant with 55% Dutch chocolate truffle 🗡️🍰",
    likes: "5,130",
    comments: "394",
    tag: "⚔️ Anime Patisserie",
  },
  {
    id: "post-4",
    image: "/assets/products/belgian-truffle-cake.jpg",
    caption: "Pouring 55% Callebaut dark ganache over moist Dutch cocoa sponge. Handcrafted daily in Bengaluru 🍫🤤",
    likes: "2,980",
    comments: "98",
    tag: "🍫 Pure Truffle",
  },
];

export const BerniceNewsletter: React.FC = () => {
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [cakeParticles, setCakeParticles] = useState<
    { id: number; x: number; y: number; icon: string }[]
  >([]);

  const handleCakeButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    haptics.success();
    sound.playSweetChime();
    setIsCandleBlown(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const icons = ["🎂", "✨", "🍰", "💖", "🌸", "🧁", "🍓", "⭐"];
    const newItems = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() - 0.5) * 80,
      y: y + (Math.random() - 0.5) * 40,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));

    setCakeParticles((prev) => [...prev.slice(-15), ...newItems]);
    setIsSurpriseOpen(true);

    setTimeout(() => {
      setIsCandleBlown(false);
    }, 2500);
  };

  const handleCopyCode = () => {
    haptics.light();
    sound.playBubblePop();
    navigator.clipboard.writeText("SWEET1930");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-24 bg-[#147c98] text-[#f8f8f2] select-none">
      {/* Decorative Floating SVGs (Preserved from Bernice design) */}
      <div className="absolute top-6 left-6 w-32 sm:w-44 opacity-20 pointer-events-none -rotate-12">
        <Image
          src="/assets/decorative/cake_full.svg"
          alt="Cake Decoration"
          width={200}
          height={182}
          className="w-full h-auto"
        />
      </div>
      <div className="absolute bottom-6 right-6 w-32 sm:w-44 opacity-20 pointer-events-none rotate-12">
        <Image
          src="/assets/decorative/cookie_full.svg"
          alt="Cookie Decoration"
          width={200}
          height={109}
          className="w-full h-auto"
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 z-10 space-y-12">
        {/* Instagram Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 backdrop-blur-md shadow-sm">
            <Instagram className="w-4 h-4 text-[#ffa7ee]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#ffa7ee]">
              @lakeviewmilkbar · Bengaluru Since 1930
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white">
            Follow Us On Instagram
          </h2>

          <p className="font-sans text-sm sm:text-base text-white/85 max-w-xl mx-auto leading-relaxed">
            Step into our confectionery reels, midnight car-hop stories, behind-the-scenes pastry masterclasses, and tagged celebration memories.
          </p>

          {/* Follow Button */}
          <div className="pt-2">
            <a
              href="https://www.instagram.com/lakeviewmilkbar/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.light()}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @lakeviewmilkbar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Curated Instagram Grid / Reels Showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-5">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://www.instagram.com/lakeviewmilkbar/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptics.light()}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square border-2 border-white/20 bg-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Tag Pill Top Left */}
              <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-white tracking-wide">
                {post.tag}
              </div>

              {/* Instagram Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4 text-white">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="flex items-center gap-1 text-[#ffa7ee]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{post.likes}</span>
                  </span>
                  <Instagram className="w-4 h-4 text-white/80" />
                </div>
                <p className="text-[11px] leading-tight line-clamp-2 text-white/90 font-sans">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* ==========================================================================
            INTERACTIVE CAKE BUTTON BELOW (Requested by User)
            ========================================================================== */}
        <div className="pt-6 sm:pt-8 text-center space-y-4">
          <p className="font-cursive text-2xl sm:text-3xl text-[#ffa7ee] tracking-wide">
            A sweet little surprise awaits in our heritage ovens...
          </p>

          <div className="relative inline-block">
            {/* Pulsing Glow behind Cake Button */}
            <div className="absolute -inset-3 rounded-full bg-[#ffa7ee]/30 blur-xl animate-pulse pointer-events-none" />

            {/* The Interactive Cake Button */}
            <button
              type="button"
              onClick={handleCakeButtonClick}
              className="relative px-8 py-4 sm:px-10 sm:py-5 rounded-full bg-white text-[#112229] hover:bg-[#ffa7ee] hover:text-[#112229] border-4 border-[#ffa7ee] shadow-[0_10px_35px_rgba(255,167,238,0.4)] flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              {/* Animated Cake Icon */}
              <div className="relative text-2xl sm:text-3xl transition-transform group-hover:scale-125">
                🎂
                {isCandleBlown && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">
                    💨
                  </span>
                )}
              </div>

              <div className="text-left">
                <span className="block font-serif font-black text-base sm:text-lg uppercase tracking-wider leading-none">
                  Tap The Cake For A Sweet Surprise
                </span>
                <span className="block text-[11px] font-sans font-bold text-stone-600 group-hover:text-espresso mt-0.5">
                  Click to slice &amp; claim secret patron gift ✨
                </span>
              </div>
            </button>

            {/* Cake Particle Bursts */}
            {cakeParticles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{ opacity: 0, scale: 2.2, y: -65 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute pointer-events-none text-2xl font-bold select-none z-30"
                style={{ left: p.x, top: p.y }}
              >
                {p.icon}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE SWEET SURPRISE MODAL */}
      <AnimatePresence>
        {isSurpriseOpen && (
          <div className="fixed inset-0 z-[10004] flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 25 }}
              className="relative w-full max-w-md bg-[#FFFDF9] text-espresso rounded-3xl p-6 sm:p-7 shadow-2xl border-4 border-[#ffa7ee] space-y-5 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsSurpriseOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-espresso rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Header */}
              <div className="space-y-2">
                <div className="text-5xl animate-bounce">🍰</div>
                <h3 className="font-cursive text-3xl sm:text-4xl font-bold text-espresso">
                  You Unlocked a Sweet Secret!
                </h3>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Thank you for celebrating with Lakeview Milk Bar. Use our secret master baker perk for your celebration!
                </p>
              </div>

              {/* Promo Code Box */}
              <div className="bg-amber-50 rounded-2xl p-4 border-2 border-dashed border-amber-300 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Secret Patron Promo Code (10% Off)
                </div>

                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-espresso tracking-widest bg-white px-4 py-1.5 rounded-xl border border-amber-200 shadow-2xs">
                    SWEET1930
                  </span>

                  <button
                    onClick={handleCopyCode}
                    className="p-2.5 rounded-xl bg-espresso hover:bg-caramel text-white transition-all active:scale-95 shadow-sm"
                    title="Copy Promo Code"
                  >
                    {copiedCode ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-amber-700 font-medium">
                  {copiedCode
                    ? "✓ Copied to clipboard! Apply at checkout or WhatsApp"
                    : "Tap to copy code for online or WhatsApp orders"}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <Link
                  href="/custom-cake"
                  onClick={() => setIsSurpriseOpen(false)}
                  className="w-full py-3 rounded-full bg-[#BE185D] hover:bg-[#9D174D] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Wand2 className="w-4 h-4" />
                  <span>Build Custom 3D Cake with Code</span>
                </Link>

                <a
                  href={`https://wa.me/919663812036?text=${encodeURIComponent(
                    "Hello Lakeview Milk Bar! I unlocked the secret promo code *SWEET1930* on your website. I would like to place an order!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsSurpriseOpen(false)}
                  className="w-full py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp (+91 9663812036)</span>
                </a>

                <button
                  onClick={() => setIsSurpriseOpen(false)}
                  className="text-xs text-stone-500 hover:text-espresso font-semibold underline underline-offset-4"
                >
                  Continue Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
