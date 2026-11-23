"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  Award,
  Compass,
  Coffee,
  Cake,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { HISTORY_TIMELINE } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";

// Real archival media mappings from the downloaded assets
const ERA_MEDIA: Record<
  string,
  {
    image: string;
    caption: string;
    tag: string;
    badge: string;
  }
> = {
  "1930": {
    image: "/assets/heritage/1930.jpg",
    caption: "Ulsoor Lake Parlour — Three original flavours: Vanilla, Chocolate, and Strawberry.",
    tag: "Ulsoor Lake Inception",
    badge: "Origin Era",
  },
  "1947": {
    image: "/assets/heritage/Lakeview-1947-Sale-Agreement.jpg",
    caption: "19-year-old Vrajlal Jamnadas trained in California with elite ice cream masters; 1947 acquisition agreement.",
    tag: "California Craft",
    badge: "The New Custodian",
  },
  "1950": {
    image: "/assets/heritage/PARLOUR_OF_THE_MIDNIGHT_ROAD.jpg",
    caption: "Bengaluru's first drive-in ice cream parlour; sundaes became an everyday celebration.",
    tag: "Drive-In Culture",
    badge: "The Sensation",
  },
  "1970": {
    image: "/assets/heritage/1970.png",
    caption: "Setting up shop on MG Road — over 700 daily patrons and midnight car hops.",
    tag: "MG Road Flagship",
    badge: "City Icon",
  },
  "1980": {
    image: "/assets/heritage/TURNING_A_NEW_LEAF.jpg",
    caption: "Continental breakfasts, burgers, pizzas, and fresh savoury snacks added to the menu.",
    tag: "Menu Expansion",
    badge: "Modern Food",
  },
  "1993": {
    image: "/assets/heritage/1993.png",
    caption: "Fresh celebration cakes, cookies, and artisanal patisserie beloved across Karnataka.",
    tag: "Artisan Bakery",
    badge: "Sweet Acclaim",
  },
  "2012 - Present": {
    image: "/assets/heritage/2012.png",
    caption: "Carrying 94 years forward with 4 premier parlours across Bengaluru.",
    tag: "Modern Legacy",
    badge: "4 Bangalore Outlets",
  },
};

export const HistoryTimelineSection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>("1930");

  const icons = [Calendar, Award, Compass, Clock, Coffee, Cake, Sparkles];

  const currentItem =
    HISTORY_TIMELINE.find((item) => item.year === selectedYear) || HISTORY_TIMELINE[0];
  const currentMedia = ERA_MEDIA[selectedYear] || ERA_MEDIA["1930"];

  return (
    <section className="py-24 bg-cream-100/60 relative overflow-hidden">
      {/* Decorative Confectionery Flourishes */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-rose-pastel/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/20 text-caramel text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Chronicle</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-espresso tracking-tight">
            The 94-Year Milestone Journey
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Click through nine decades of Bangalore heritage — from James Meadow Charles to the 4 modern destination parlours.
          </p>
        </div>

        {/* Interactive Year Pill Stepper */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {HISTORY_TIMELINE.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            const isSelected = item.year === selectedYear;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                data-cursor="Era"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 relative ${
                  isSelected
                    ? "bg-espresso text-white shadow-xl scale-105"
                    : "glass-card text-stone-600 hover:text-espresso hover:bg-white"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-colors ${
                    isSelected ? "text-amber-300" : "text-caramel"
                  }`}
                />
                <span>{item.year}</span>
                {isSelected && (
                  <motion.div
                    layoutId="timeline-active-pill"
                    className="absolute inset-0 border-2 border-caramel/50 rounded-full pointer-events-none"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Milestone Feature Card with 3D Tilt & Archival Media Showcase */}
        <div className="max-w-5xl mx-auto">
          <TiltCard
            maxTilt={4}
            className="glass-panel rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/90 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
              >
                {/* Visual Archival Media Column */}
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card p-2 border border-white/80 shadow-lg group">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-100">
                      <Image
                        src={currentMedia.image}
                        alt={currentItem.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                        {currentMedia.badge}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block mb-0.5">
                          {currentMedia.tag}
                        </span>
                        <p className="text-xs text-stone-200 line-clamp-2">
                          {currentMedia.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-stone-500 px-1">
                    <span className="font-mono text-[11px]">ARCHIVE RECORD #{selectedYear}</span>
                    <span className="italic font-serif text-caramel">Lakeview Heritage Vault</span>
                  </div>
                </div>

                {/* Narrative Detail Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-5xl sm:text-6xl font-black text-caramel leading-none">
                      {currentItem.year}
                    </span>
                    <div className="h-8 w-px bg-stone-300" />
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-500">
                      {currentMedia.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-espresso leading-snug">
                    {currentItem.title}
                  </h3>

                  <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                    {currentItem.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center gap-4">
                    <Link
                      href="/about"
                      data-cursor="Read"
                      className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-sm"
                    >
                      <span>Read Full History Chronicle</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-espresso"
                    >
                      <MapPin className="w-3.5 h-3.5 text-caramel" />
                      <span>Visit MG Road Flagship</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};
