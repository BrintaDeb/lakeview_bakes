"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  ExternalLink,
  Sparkles,
  Car,
  Navigation,
  ArrowRight,
} from "lucide-react";
import { OUTLETS, BRAND_INFO } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";
import { sound } from "@/lib/sound";

const OUTLET_MEDIA: Record<
  string,
  {
    image: string;
    vibe: string;
    driveIn: boolean;
    landmark: string;
  }
> = {
  "mg-road": {
    image: "/assets/outlets/outlet-mg-road.jpg",
    vibe: "The Iconic 1970 Flagship & Midnight Drive-In Hotspot",
    driveIn: true,
    landmark: "Kannan Building, Metro Pillar 110",
  },
  indiranagar: {
    image: "/assets/outlets/outlet-indiranagar.jpg",
    vibe: "Chic East Bengaluru Dessert Lounge & Patisserie",
    driveIn: true,
    landmark: "Link Road 4, Off 100 Feet Road",
  },
  "kalyan-nagar": {
    image: "/assets/outlets/outlet-kalyan-nagar.jpg",
    vibe: "Family Celebration Hub & Bespoke Cake Studio",
    driveIn: true,
    landmark: "HRBR Layout 1st Block, Banaswadi",
  },
  whitefield: {
    image: "/assets/outlets/outlet-whitefield.jpg",
    vibe: "Tech Corridor Parlour & Weekend Family Destination",
    driveIn: true,
    landmark: "Whitefield Main Road, Near ITPL",
  },
};

export const OutletsPreviewSection: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<string>("mg-road");

  const activeOutlet = OUTLETS.find((o) => o.id === selectedOutlet) || OUTLETS[0];
  const activeMedia = OUTLET_MEDIA[selectedOutlet] || OUTLET_MEDIA["mg-road"];

  return (
    <section className="py-24 bg-gradient-to-b from-cream-50 via-cream-100/70 to-cream-50 relative overflow-hidden">
      {/* Ambient background confectionery glow */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bengaluru Destination Parlours</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
            Visit Our 4 Iconic Outlets
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            From our legendary 1970 MG Road drive-in to modern neighbourhood parlours across Bengaluru.
          </p>
        </div>

        {/* Outlet Switcher Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {OUTLETS.map((outlet) => {
            const isSelected = outlet.id === selectedOutlet;
            return (
              <button
                key={outlet.id}
                onClick={() => {
                  setSelectedOutlet(outlet.id);
                  sound.playBubblePop();
                }}
                data-cursor="Outlet"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-300 relative ${
                  isSelected
                    ? "bg-espresso text-white shadow-xl scale-105"
                    : "glass-card text-stone-600 hover:text-espresso hover:bg-white"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-caramel"}`} />
                <span>{outlet.name.split("|")[1]?.trim() || outlet.name}</span>
                {isSelected && (
                  <motion.div
                    layoutId="active-outlet-pill"
                    className="absolute inset-0 border-2 border-caramel/40 rounded-full pointer-events-none"
                    transition={{ type: "spring", damping: 25, stiffness: 350 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Showcase Feature Card */}
        <div className="max-w-5xl mx-auto mb-16">
          <TiltCard
            maxTilt={4}
            className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOutlet.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Location Frame */}
                <div className="lg:col-span-6 relative">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card p-2 border border-white/80 shadow-lg group">
                    <div className="relative w-full h-full rounded-xl overflow-hidden bg-stone-100">
                      <Image
                        src={activeMedia.image}
                        alt={activeOutlet.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />

                      {/* Location Badge */}
                      <div className="absolute top-3 left-3 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-caramel" />
                        <span>{activeOutlet.id === "mg-road" ? "Historic Flagship" : "Bengaluru Parlour"}</span>
                      </div>

                      {activeMedia.driveIn && (
                        <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1 shadow-sm">
                          <Car className="w-3 h-3" />
                          <span>Drive-In Available</span>
                        </div>
                      )}

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block mb-0.5">
                          {activeMedia.landmark}
                        </span>
                        <p className="font-serif text-sm font-bold italic line-clamp-1">
                          {activeMedia.vibe}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outlet Information & Controls */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                      {activeOutlet.significance || `Established in ${activeOutlet.established_year}`}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
                      {activeOutlet.name}
                    </h3>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed">
                    {activeOutlet.address}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="glass-card rounded-xl p-3 border border-white/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-espresso mb-1">
                        <Clock className="w-3.5 h-3.5 text-caramel" />
                        <span>Timings</span>
                      </div>
                      <span className="text-[11px] text-stone-600 block">
                        {activeOutlet.timings || "Open Daily: 9:00 AM – 1:00 AM"}
                      </span>
                    </div>

                    <div className="glass-card rounded-xl p-3 border border-white/80">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-espresso mb-1">
                        <Phone className="w-3.5 h-3.5 text-caramel" />
                        <span>Direct Line</span>
                      </div>
                      <a
                        href={`tel:${activeOutlet.phone}`}
                        className="text-[11px] text-caramel font-bold hover:underline block"
                      >
                        {activeOutlet.phone}
                      </a>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href={activeOutlet.google_maps_query}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="Maps"
                      className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold px-6 py-3 rounded-full transition-all shadow-md hover:shadow-xl"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-300" />
                      <span>Navigate via Google Maps</span>
                    </a>

                    <a
                      href={`tel:${activeOutlet.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-espresso px-4 py-3 rounded-full glass-card border border-stone-200"
                    >
                      <Phone className="w-3.5 h-3.5 text-caramel" />
                      <span>Call Parlour</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </TiltCard>
        </div>

        {/* 4 Cards Quick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTLETS.map((outlet) => {
            const media = OUTLET_MEDIA[outlet.id] || OUTLET_MEDIA["mg-road"];
            return (
              <TiltCard
                key={outlet.id}
                maxTilt={6}
                className="glass-card rounded-3xl p-5 border border-white/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100">
                    <Image
                      src={media.image}
                      alt={outlet.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-75" />
                    <div className="absolute bottom-2 left-2 text-white">
                      <span className="text-[10px] font-bold block">{outlet.name.split("|")[1]?.trim()}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-serif text-base font-bold text-espresso group-hover:text-caramel transition-colors">
                      {outlet.name.split("|")[1]?.trim() || outlet.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                      {outlet.address}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                  <a
                    href={`tel:${outlet.phone}`}
                    className="text-stone-500 hover:text-caramel font-semibold"
                  >
                    {outlet.phone}
                  </a>
                  <a
                    href={outlet.google_maps_query}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-caramel hover:text-espresso font-bold inline-flex items-center gap-1"
                  >
                    <span>Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
