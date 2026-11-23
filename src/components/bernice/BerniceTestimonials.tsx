"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Heart,
  Quote,
} from "lucide-react";
import { haptics } from "@/lib/haptics";
import { sound } from "@/lib/sound";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  branch: string;
  category: "cakes" | "sundaes" | "press";
  avatar: string;
  rating: number;
  celebrationTag: string;
  text: string;
  date: string;
}

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "rev-1",
    name: "Lavanya Natarajan",
    role: "Verified Bengaluru Patron",
    branch: "Indiranagar Parlour",
    category: "cakes",
    avatar: "/assets/testimonials/testimonial-lavanya.png",
    rating: 5,
    celebrationTag: "🎂 3rd-Gen Birthday Tradition",
    text: "The birthday cakes from Lakeview have celebrated three generations of our family in Bangalore. Pure butter, incredible taste, and genuine love in every single slice. The Belgian chocolate truffle is unmatched!",
    date: "November 2026",
  },
  {
    id: "rev-2",
    name: "Ambareen Fathima",
    role: "Patron Since 1998",
    branch: "MG Road Flagship",
    category: "sundaes",
    avatar: "/assets/testimonials/testimonial-ambareen.png",
    rating: 5,
    celebrationTag: "🚗 Midnight Car-Hop Memory",
    text: "Late-night car-hop drive-in service on MG Road with a Banana Split and hot fudge is the quintessential Bangalore memory that no modern delivery app could ever duplicate. The attendants are so warm!",
    date: "October 2026",
  },
  {
    id: "rev-3",
    name: "The Hindu Metroplus",
    role: "Bangalore Food & Heritage Critic",
    branch: "Ulsoor & MG Road",
    category: "press",
    avatar: "/assets/testimonials/testimonial-ambareen.png",
    rating: 5,
    celebrationTag: "🏛️ Heritage Icon Award",
    text: "Lakeview Milk Bar is not just an ice cream parlour; it is a living, breathing chapter of Bengaluru's confectionery soul. The 1930 hot cocoa fudge and sourdough bakes remain legendary across decades.",
    date: "Heritage Review",
  },
  {
    id: "rev-4",
    name: "Shilpa & Gaurav",
    role: "Celebration Patrons",
    branch: "Whitefield Parlour",
    category: "cakes",
    avatar: "/assets/testimonials/testimonial-shilpa-gaurav.png",
    rating: 5,
    celebrationTag: "💍 25th Silver Anniversary",
    text: "We ordered a bespoke 3-tier anniversary gateau with hand-piped cursive love notes. The presentation stunned all our guests. 100% eggless, extraordinarily moist, and utterly divine.",
    date: "September 2026",
  },
  {
    id: "rev-5",
    name: "Bangalore Mirror",
    role: "Lifestyle & Culture Desk",
    branch: "Central Bangalore",
    category: "press",
    avatar: "/assets/testimonials/testimonial-lavanya.png",
    rating: 5,
    celebrationTag: "🍦 Best Sundae in Town",
    text: "Generations of couples, college gangs, and midnight foodies swear by Lakeview's chocolate boat sundaes. MG Road would simply not be the same without the warm glow of Lakeview Milk Bar.",
    date: "Food Guide",
  },
];

export const BerniceTestimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [filter, setFilter] = useState<"all" | "cakes" | "sundaes" | "press">("all");
  const [isPaused, setIsPaused] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for new memory submission
  const [newName, setNewName] = useState("");
  const [newBranch, setNewBranch] = useState("MG Road Flagship");
  const [newCategory, setNewCategory] = useState<"cakes" | "sundaes">("cakes");
  const [newTag, setNewTag] = useState("🎂 Birthday Celebration");
  const [newText, setNewText] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  const filteredReviews = testimonials.filter(
    (t) => filter === "all" || t.category === filter
  );

  const handlePrev = () => {
    haptics.light();
    setActiveReviewIndex((prev) =>
      prev === 0 ? filteredReviews.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    haptics.light();
    setActiveReviewIndex((prev) =>
      prev === filteredReviews.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    haptics.success();
    sound.playSweetChime();

    const newRev: TestimonialItem = {
      id: `rev-${Date.now()}`,
      name: newName.trim(),
      role: "Verified Bengaluru Patron",
      branch: newBranch,
      category: newCategory,
      avatar: "/assets/testimonials/testimonial-ambareen.png",
      rating: newRating,
      celebrationTag: newTag,
      text: newText.trim(),
      date: "Just Now",
    };

    setTestimonials([newRev, ...testimonials]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsModalOpen(false);
      setNewName("");
      setNewText("");
    }, 1800);
  };

  return (
    <section className="relative py-20 bg-[#FDFBF7] overflow-hidden border-t border-stone-200/60 select-none">
      {/* Background Subtle Sparkle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C68B59_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/15 text-caramel text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>94 Years of Sweet Memories</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
              Stories from Our Patrons
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Three generations of Bengaluru birthdays, anniversaries, and midnight car-hop sundaes on MG Road. Read what our patrons cherish most.
            </p>
          </div>

          {/* Action Button: Share Your Story */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                haptics.medium();
                sound.playBubblePop();
                setIsModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-300" />
              <span>Share Your Lakeview Story</span>
            </button>
          </div>
        </div>

        {/* Filter Pills & Interactive Marquee Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-stone-200/80 pb-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Stories" },
              { id: "cakes", label: "Celebration Cakes" },
              { id: "sundaes", label: "Midnight Car-Hop & Sundaes" },
              { id: "press", label: "Press & Heritage Critics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  haptics.selection();
                  setFilter(tab.id as any);
                  setActiveReviewIndex(0);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === tab.id
                    ? "bg-espresso text-white shadow-sm"
                    : "bg-white text-stone-600 hover:text-espresso border border-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Pause / Play & Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                haptics.light();
                setIsPaused(!isPaused);
              }}
              title={isPaused ? "Play Continuous Scroll" : "Pause Scroll"}
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-espresso shadow-xs"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-espresso shadow-xs active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="p-2 rounded-full bg-white border border-stone-200 text-stone-600 hover:text-espresso shadow-xs active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Testimonial Cards Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
          }}
        >
          <div
            className="flex gap-6 animate-marquee"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
              animationDuration: "38s",
            }}
          >
            {[...filteredReviews, ...filteredReviews].map((rev, idx) => (
              <div
                key={`${rev.id}-${idx}`}
                className="w-80 sm:w-96 shrink-0 glass-panel rounded-3xl p-6 sm:p-7 border border-white/90 shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between space-y-4 bg-white/90 hover:scale-[1.02] duration-300"
              >
                {/* Header: Stars & Celebration Tag */}
                <div className="flex items-center justify-between">
                  {/* 5 Golden Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-caramel bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full">
                    {rev.celebrationTag}
                  </span>
                </div>

                {/* Review Quote */}
                <div className="relative flex-1">
                  <Quote className="w-8 h-8 text-rose-200 absolute -top-2 -left-1 opacity-40 pointer-events-none" />
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans relative z-10 pt-2 line-clamp-4">
                    &ldquo;{rev.text}&rdquo;
                  </p>
                </div>

                {/* Patron Profile Footer with Real Visual Avatar */}
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-caramel/40 shrink-0 bg-stone-100 shadow-xs">
                    <Image
                      src={rev.avatar}
                      alt={rev.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-serif text-base font-bold text-espresso truncate">
                      {rev.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 truncate">
                      {rev.role} • <span className="text-caramel font-semibold">{rev.branch}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal: Share Your Lakeview Sweet Memory */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10005] flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90 space-y-5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                    ❤️
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-espresso">
                      Share Your Lakeview Memory
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">
                      Join our 94-year wall of celebration stories
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full text-stone-400 hover:text-espresso bg-stone-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-espresso">
                    Thank You for Sharing the Love!
                  </h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto">
                    Your memory has been added to our live Patron Wall.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Your Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            haptics.selection();
                            setNewRating(star);
                          }}
                          className="p-1 transition-transform hover:scale-125"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? "fill-amber-400 text-amber-400"
                                : "text-stone-300"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-600 pl-2">
                        {newRating === 5 ? "5.0 — Legendary!" : `${newRating}.0`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Parlour Visited
                      </label>
                      <select
                        value={newBranch}
                        onChange={(e) => setNewBranch(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                      >
                        <option>MG Road Flagship (1930)</option>
                        <option>Indiranagar Parlour (100ft Road)</option>
                        <option>Kalyan Nagar Hub</option>
                        <option>Whitefield Parlour</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Celebration Occasion
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 🎂 21st Birthday / 🍨 Midnight Drive-In"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Your Story or Review *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share what makes Lakeview special for you and your family..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      className="w-full p-3 rounded-xl text-xs bg-white border border-stone-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-espresso hover:bg-caramel text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Post Memory on Wall
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
