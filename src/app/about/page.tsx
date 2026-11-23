"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Heart,
  MapPin,
  Calendar,
  Award,
  Clock,
  Compass,
  Coffee,
  Cake,
  ShieldCheck,
  ChevronRight,
  Newspaper,
  BookOpen,
  Phone,
  Store,
} from "lucide-react";
import {
  BRAND_INFO,
  HISTORY_TIMELINE,
  BRAND_VALUES,
  OUTLETS,
  ARCHIVE_ARTICLES,
} from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";
import { CreamBackground, CreamWaveDivider } from "@/components/ui/CreamBackground";

// Curated archival photo collection from genuine host website files
const FEATURED_ARCHIVE_PHOTOS = [
  {
    src: "/assets/heritage/1930.jpg",
    title: "1930 Ulsoor Lake Parlour",
    subtitle: "James Meadow Charles and the original 3 flavours",
    era: "1930 Inception",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/assets/heritage/Lakeview-1947-Sale-Agreement.jpg",
    title: "The 1947 Acquisition Deed",
    subtitle: "Original handwritten transfer of business & secret recipes",
    era: "1947 Milestone",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/assets/heritage/PARLOUR_OF_THE_MIDNIGHT_ROAD.jpg",
    title: "Parlour of the Midnight Road",
    subtitle: "Pioneering Bengaluru's midnight drive-in car-hop tradition",
    era: "1950s Era",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/assets/heritage/1970.png",
    title: "1970 MG Road Flagship",
    subtitle: "Kannan Building institution serving 700+ daily patrons",
    era: "1970 Flagship",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/assets/heritage/TURNING_A_NEW_LEAF.jpg",
    title: "Turning a New Leaf",
    subtitle: "Introducing continental breakfast, pizzas, and savoury bakes",
    era: "1980 Expansion",
    aspect: "aspect-[16/9]",
  },
  {
    src: "/assets/heritage/1993.png",
    title: "Celebration Bakery & Patisserie",
    subtitle: "Fresh customized buttercream and birthday cakes",
    era: "1993 Patisserie",
    aspect: "aspect-[4/3]",
  },
];

// Exact historical timeline media pairings
const TIMELINE_PHOTOS: Record<string, string> = {
  "1930": "/assets/heritage/1930.jpg",
  "1947": "/assets/heritage/Lakeview-1947-Sale-Agreement.jpg",
  "1950": "/assets/heritage/PARLOUR_OF_THE_MIDNIGHT_ROAD.jpg",
  "1970": "/assets/heritage/1970.png",
  "1980": "/assets/heritage/TURNING_A_NEW_LEAF.jpg",
  "1993": "/assets/heritage/1993.png",
  "2012 - Present": "/assets/heritage/2012.png",
};

// Complete curated franchise & parlour directory for bold showcase
const ENHANCED_OUTLETS = [
  {
    id: "mg-road",
    name: "Lakeview Milk Bar — MG Road Flagship",
    shortName: "MG Road Flagship",
    locality: "Ashok Nagar / Central Bengaluru",
    isFlagship: true,
    year: "1970 Flagship",
    tag: "Historic Mother Parlour",
    status: "Open Daily till 1:00 AM",
    headline: "The 1970 Kannan Building Institution",
    story: "Bengaluru’s legendary dessert landmark since 1970. Generations of Bangaloreans have lined up outside Kannan Building for midnight drive-in car-window service, banana splits, and artisanal celebration cakes.",
    address: "Kannan Building, 89 Mahatma Gandhi Rd, Haridevpur, Ashok Nagar, Bengaluru, KA 560001",
    timings: "9:00 AM – 1:00 AM (All 7 Days)",
    phone: "+91 9663812036",
    mapsUrl: "https://maps.google.com/?q=Lakeview+Milk+Bar+MG+Road+Bengaluru",
    image: "/assets/outlets/outlet-mg-road.jpg",
    highlights: ["Midnight Car-Hop Window", "1930 Fresh Churns", "Iconic Red & White Seating", "Swiggy & Zomato Delivery"],
  },
  {
    id: "indiranagar",
    name: "Lakeview Milk Bar — Indiranagar Franchise",
    shortName: "Indiranagar Franchise",
    locality: "HAL 2nd Stage / 100 Feet Road",
    isFlagship: false,
    year: "Est. 2019",
    tag: "Premier East Franchise",
    status: "Open Daily till 11:30 PM",
    headline: "East Bengaluru's Vibrant Patisserie Hub",
    story: "Nestled in the bustling heart of Indiranagar’s cafe precinct, this franchise destination pairs Lakeview’s heritage sundaes with an artisanal European bakery counter and gourmet espresso bar.",
    address: "No. 3161 Link Road 4, Near to ESI Hospital, HAL 2nd Stage, Indiranagar, Bengaluru, KA 560008",
    timings: "10:00 AM – 11:30 PM (All 7 Days)",
    phone: "+91 8025200443",
    mapsUrl: "https://maps.google.com/?q=Lakeview+Milk+Bar+Indiranagar+Bengaluru",
    image: "/assets/outlets/outlet-indiranagar.jpg",
    highlights: ["Espresso & Patisserie Bar", "Fresh Celebration Cakes", "Canopy Outdoor Seating", "30-Min Fast Delivery"],
  },
  {
    id: "kalyan-nagar",
    name: "Lakeview Milk Bar — Kalyan Nagar Franchise",
    shortName: "Kalyan Nagar Franchise",
    locality: "HRBR Layout / North Bengaluru",
    isFlagship: false,
    year: "Est. 2018",
    tag: "Premier North Franchise",
    status: "Open Daily till 11:00 PM",
    headline: "North Bengaluru's Celebration Cake Studio",
    story: "North Bengaluru’s premier destination for custom birthday and anniversary centerpieces. Featuring Lakeview’s live cake consultation studio, savory continental bakes, and full dairy sundae menu.",
    address: "3rd A Cross Rd, HRBR Layout 1st Block, Banaswadi, Bengaluru, KA 560043",
    timings: "10:00 AM – 11:00 PM (All 7 Days)",
    phone: "+91 9972635636",
    mapsUrl: "https://maps.google.com/?q=Lakeview+Milk+Bar+Kalyan+Nagar+Bengaluru",
    image: "/assets/outlets/outlet-kalyan-nagar.jpg",
    highlights: ["3D Custom Cake Studio", "Fresh Pastry & Tart Display", "Family Celebration Lounge", "Catering & Bulk Orders"],
  },
  {
    id: "whitefield",
    name: "Lakeview Milk Bar — Whitefield Franchise",
    shortName: "Whitefield Franchise",
    locality: "Dodsworth Layout / Tech Corridor",
    isFlagship: false,
    year: "Est. 2021",
    tag: "Premier Tech Franchise",
    status: "Open Daily till 11:30 PM",
    headline: "Tech Corridor Garden Confectionery Hub",
    story: "Bringing 94 years of sweet craftsmanship to Bengaluru’s tech corridor. Features an airy garden patio, midnight sundae counters, and corporate celebration cake deliveries.",
    address: "273, Whitefield Main Road, Dodsworth Layout, Whitefield, Bengaluru, KA 560066",
    timings: "10:00 AM – 11:30 PM (All 7 Days)",
    phone: "+91 8025200443",
    mapsUrl: "https://maps.google.com/?q=Lakeview+Milk+Bar+Whitefield+Bengaluru",
    image: "/assets/outlets/outlet-whitefield.jpg",
    highlights: ["Garden Seating Courtyard", "High-Speed WiFi Lounge", "Midnight Dessert Drops", "Corporate Patisserie Service"],
  },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedOutletId, setSelectedOutletId] = useState<string>("indiranagar");
  const currentOutlet = ENHANCED_OUTLETS.find((o) => o.id === selectedOutletId) || ENHANCED_OUTLETS[0];

  return (
    <CreamBackground className="min-h-screen bg-cream-50">
      {/* 1. Grand Editorial Hero */}
      <section className="pt-28 sm:pt-36 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Est. 1930 • Bengaluru, India</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black text-espresso tracking-tight leading-[1.08]"
            >
              A Love Story Written in Buttercream &amp; Ice Cream
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-serif text-xl sm:text-2xl italic text-caramel font-normal"
            >
              &quot;Baking is our Love Language&quot;
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              For nearly a century, Lakeview Milk Bar has stood as Bengaluru’s cherished sweet institution — bearing witness as the quiet garden city blossomed into India’s bustling technological capital, all while holding true to our timeless recipes.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. Featured Media Showcase & Photographic Filmstrip */}
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-caramel block">
                Visual Archives
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
                Featured Photographs &amp; Media
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-500 hidden sm:inline-block">
              RECORDS: 1930 — PRESENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Lead Wide Banner Tilt Card */}
            <div className="md:col-span-8">
              <TiltCard maxTilt={5} className="rounded-3xl overflow-hidden glass-panel p-2.5 border border-white/80 shadow-2xl">
                <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/banners/quote-desktop.png"
                    alt="Lakeview Archival Banner - Baking is our Love Language"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-85" />
                  <div className="absolute bottom-5 left-6 right-6 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                        Archival Creative Banner
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold italic">
                        Baking is our Love Language
                      </h3>
                    </div>
                    <span className="text-xs font-mono bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white">
                      Original Artwork
                    </span>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Side Square Artisanal Card */}
            <div className="md:col-span-4">
              <TiltCard maxTilt={6} className="rounded-3xl overflow-hidden glass-panel p-2.5 border border-white/80 shadow-2xl">
                <div className="relative aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/promotions/collection-artisanal.jpg"
                    alt="Small-batch artisan cakes"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-75" />
                  <div className="absolute top-4 right-4 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 uppercase">
                    Since 1930
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block">
                      Handcrafted Daily
                    </span>
                    <h4 className="font-serif text-base font-bold">Artisanal Small-Batch Bakes</h4>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Bottom Row - 3 Gallery Columns */}
            <div className="md:col-span-4">
              <TiltCard maxTilt={6} className="rounded-3xl overflow-hidden glass-card p-2 border border-white/80 shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/promotions/delicious-cakes-promo.png"
                    alt="Delicious Celebration Cakes"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-75" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-200">
                      Heritage Recipe
                    </span>
                    <h4 className="font-serif text-sm font-bold">Classic Celebration Cakes</h4>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="md:col-span-4">
              <TiltCard maxTilt={6} className="rounded-3xl overflow-hidden glass-card p-2 border border-white/80 shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/promotions/collection-celebrations.jpg"
                    alt="Celebrations at Lakeview"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-75" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-200">
                      Milestone Moments
                    </span>
                    <h4 className="font-serif text-sm font-bold">Bespoke Custom Orders</h4>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="md:col-span-4">
              <TiltCard maxTilt={6} className="rounded-3xl overflow-hidden glass-card p-2 border border-white/80 shadow-xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100 group">
                  <Image
                    src="/assets/promotions/collection-favourites.webp"
                    alt="Timeless Lakeview Favourites"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-75" />
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-amber-200">
                      Drive-In Legend
                    </span>
                    <h4 className="font-serif text-sm font-bold">Sundaes, Shakes &amp; Bakes</h4>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Archival Chronicle (94-Year Milestone Journey) */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Chronicles of Sweetness
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
              The 94-Year Milestone Journey
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Explore the history of Lakeview Milk Bar through every chapter of its culinary evolution.
            </p>
          </div>

          <div className="space-y-8 relative">
            {/* Center Timeline Spine on Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-caramel/40 via-caramel to-caramel/20 -translate-x-1/2" />

            {HISTORY_TIMELINE.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const photo = TIMELINE_PHOTOS[item.year] || "/assets/banners/quote-desktop.png";

              return (
                <div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Text Content Card */}
                  <div className="w-full lg:w-1/2">
                    <TiltCard
                      maxTilt={4}
                      className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-4 hover:border-caramel/40 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-3xl sm:text-4xl font-black text-caramel">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-caramel/10 text-caramel">
                          Chapter {idx + 1}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-espresso">
                        {item.title}
                      </h3>

                      <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                    </TiltCard>
                  </div>

                  {/* Visual Archival Photo Card */}
                  <div className="w-full lg:w-1/2">
                    <TiltCard
                      maxTilt={5}
                      className="rounded-3xl overflow-hidden glass-card p-2 border border-white/80 shadow-lg"
                    >
                      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 group">
                        <Image
                          src={photo}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />
                        <div className="absolute bottom-3 left-4 right-4 text-white flex items-center justify-between">
                          <span className="font-serif text-xs italic text-amber-200">
                            Lakeview Archival Record
                          </span>
                          <span className="text-[10px] font-mono bg-espresso/80 px-2 py-0.5 rounded text-amber-300">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. The 5 Heritage Brand Values (Original Downloaded Icons) */}
      <section className="py-20 bg-cream-100/60 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Our Unshakable Foundation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-espresso tracking-tight">
              The 5 Heritage Brand Values
            </h2>
            <p className="text-stone-600 text-sm sm:text-base">
              Preserved verbatim since the days of Vrajlal Jamnadas and upheld by the third-generation custodians today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {BRAND_VALUES.map((val) => (
              <TiltCard
                key={val.title}
                maxTilt={8}
                className="glass-panel rounded-3xl p-6 border border-white/90 shadow-xl text-center space-y-4 hover:border-caramel/40 transition-all flex flex-col items-center justify-between"
              >
                <div className="relative w-16 h-16 rounded-2xl bg-cream-100 p-2.5 shadow-inner border border-caramel/20 flex items-center justify-center">
                  <Image
                    src={val.icon}
                    alt={val.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-espresso leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="w-8 h-0.5 bg-caramel/30 rounded-full" />
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custodian's Manifesto Quote Box */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard
            maxTilt={4}
            className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/95 shadow-2xl bg-gradient-to-br from-white via-cream-50 to-white space-y-6 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex p-3 rounded-full bg-caramel/10 text-caramel mx-auto">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            <p className="font-serif text-2xl sm:text-3xl italic text-espresso max-w-2xl mx-auto leading-relaxed">
              &quot;{BRAND_INFO.quote.text}&quot;
            </p>

            <div className="pt-4 border-t border-stone-200/60 max-w-sm mx-auto">
              <h4 className="font-bold text-lg text-espresso">{BRAND_INFO.quote.author}</h4>
              <p className="text-xs text-stone-500">
                Third-Generation Family Custodian • Lakeview Milk Bar
              </p>
            </div>
          </TiltCard>
        </div>
      </section>

      {/* 6. The 4 Bangalore Parlours & Franchises Showcase */}
      <section className="py-24 bg-gradient-to-b from-cream-100/60 via-cream-50 to-cream-100/70 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
              <Store className="w-3.5 h-3.5" />
              <span>Bengaluru&apos;s Confectionery Network</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-espresso tracking-tight">
              The 4 Iconic Bengaluru Parlours &amp; Franchises
            </h2>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
              From our legendary 1970 MG Road Flagship to premier neighborhood franchise destinations across Indiranagar, Kalyan Nagar, and Whitefield — each parlour delivers our authentic 1930 recipes with signature car-hop warmth.
            </p>
          </div>

          {/* Interactive Franchise Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {ENHANCED_OUTLETS.map((outlet) => {
              const isSelected = selectedOutletId === outlet.id;
              return (
                <button
                  key={outlet.id}
                  onClick={() => setSelectedOutletId(outlet.id)}
                  className={`px-5 py-3 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 shadow-sm border ${
                    isSelected
                      ? "bg-espresso text-cream-100 border-espresso shadow-lg scale-105"
                      : "bg-white/80 hover:bg-white text-stone-700 hover:text-espresso border-stone-200"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${outlet.isFlagship ? "bg-amber-400" : "bg-caramel"}`} />
                  <span>{outlet.shortName}</span>
                  <span className="text-[10px] opacity-75 font-mono">({outlet.year})</span>
                </button>
              );
            })}
          </div>

          {/* Big Featured Interactive Spotlight Card */}
          {currentOutlet && (
            <div className="mb-20">
              <TiltCard
                maxTilt={3}
                className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/95 shadow-2xl bg-white/90 overflow-hidden relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Photo with Cathedral Arch Frame */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-t-[140px] sm:rounded-t-[200px] rounded-b-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/11] shadow-2xl border-4 border-white bg-stone-100 group">
                      <Image
                        src={currentOutlet.image}
                        alt={currentOutlet.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-70" />
                      
                      {/* Live Status Pill */}
                      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-espresso/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-md">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{currentOutlet.status}</span>
                      </div>

                      {/* Founding Milestone Badge */}
                      <div className="absolute top-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-caramel text-espresso text-xs font-bold uppercase tracking-wider shadow-md">
                        {currentOutlet.tag}
                      </div>

                      {/* Bottom Banner Title */}
                      <div className="absolute bottom-5 left-6 right-6 text-white">
                        <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-1">
                          {currentOutlet.locality}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
                          {currentOutlet.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Details & Action Station */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-caramel text-xs font-bold uppercase tracking-wider mb-2">
                        <span>{currentOutlet.isFlagship ? "👑 The Mother Parlour" : "✨ Premier Franchise Destination"}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-4xl font-black text-espresso leading-tight">
                        {currentOutlet.headline}
                      </h3>
                      <p className="text-stone-600 text-sm sm:text-base leading-relaxed mt-3">
                        {currentOutlet.story}
                      </p>
                    </div>

                    {/* Highlights / Special Features Badges */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
                        Signature Parlour Highlights:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {currentOutlet.highlights.map((hl) => (
                          <span
                            key={hl}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 text-espresso text-xs font-semibold border border-caramel/20 shadow-sm"
                          >
                            <Sparkles className="w-3 h-3 text-caramel" />
                            <span>{hl}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata: Address & Timings */}
                    <div className="p-4 rounded-2xl bg-cream-50/80 border border-stone-200/60 space-y-3 text-xs sm:text-sm">
                      <div className="flex items-start gap-3 text-stone-700">
                        <MapPin className="w-4 h-4 text-caramel shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-espresso font-semibold">Address: </strong>
                          <span>{currentOutlet.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-stone-700">
                        <Clock className="w-4 h-4 text-caramel shrink-0" />
                        <div>
                          <strong className="text-espresso font-semibold">Hours: </strong>
                          <span>{currentOutlet.timings}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-stone-700">
                        <Phone className="w-4 h-4 text-caramel shrink-0" />
                        <div>
                          <strong className="text-espresso font-semibold">Hotline: </strong>
                          <a href={`tel:${currentOutlet.phone}`} className="text-caramel font-bold hover:underline">
                            {currentOutlet.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Call to Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={currentOutlet.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-cream-100 hover:bg-caramel hover:text-espresso font-bold text-xs uppercase tracking-wider transition-all shadow-md group"
                      >
                        <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        <span>Get GPS Directions</span>
                      </a>
                      <a
                        href={`tel:${currentOutlet.phone}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-cream-100 text-espresso font-bold text-xs uppercase tracking-wider border border-stone-300 transition-all shadow-sm"
                      >
                        <Phone className="w-4 h-4 text-caramel" />
                        <span>Call Parlour</span>
                      </a>
                      <Link
                        href="/collections/cakes"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-caramel/15 hover:bg-caramel text-caramel hover:text-espresso font-bold text-xs uppercase tracking-wider transition-all"
                      >
                        <Cake className="w-4 h-4" />
                        <span>Order For This Outlet</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          )}

          {/* Bold 4-Column Architectural Showcase (All 4 Side-by-Side) */}
          <div className="mb-20">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel block">
                At a Glance Directory
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
                Explore All 4 Destinations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ENHANCED_OUTLETS.map((outlet) => (
                <TiltCard
                  key={outlet.id}
                  maxTilt={6}
                  className={`glass-panel rounded-3xl p-5 border shadow-xl flex flex-col justify-between group transition-all duration-300 ${
                    selectedOutletId === outlet.id
                      ? "border-caramel/70 ring-2 ring-caramel/30 bg-white"
                      : "border-white/90 hover:border-caramel/40 bg-white/80"
                  }`}
                >
                  <div className="space-y-4">
                    {/* Architectural Cathedral Arched Image Top */}
                    <div className="relative aspect-[4/3] rounded-t-[48px] rounded-b-2xl overflow-hidden bg-stone-100 shadow-md">
                      <Image
                        src={outlet.image}
                        alt={outlet.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute top-2.5 left-2.5 bg-espresso/85 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold text-amber-300 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-caramel" />
                        <span>{outlet.year}</span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-200 block truncate">
                          {outlet.locality}
                        </span>
                        <h4 className="font-serif text-base font-bold text-white truncate">
                          {outlet.shortName}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-1.5 px-1">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-cream-100 text-caramel">
                        {outlet.isFlagship ? "Flagship" : "Franchise Parlour"}
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                        {outlet.address}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-stone-200/60 px-1 mt-4">
                    <div className="flex items-center gap-2 text-xs text-stone-600">
                      <Clock className="w-3.5 h-3.5 text-caramel shrink-0" />
                      <span className="truncate">{outlet.timings}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <button
                        onClick={() => setSelectedOutletId(outlet.id)}
                        className="text-xs font-bold text-caramel hover:text-espresso transition-colors underline underline-offset-2"
                      >
                        View Spotlight
                      </button>
                      <a
                        href={outlet.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-cream-100 hover:bg-caramel hover:text-white text-espresso transition-colors"
                        title="Get Directions"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Prestigious Franchise Partnership Opportunity Banner */}
          <div className="mt-16 mb-20">
            <TiltCard
              maxTilt={2}
              className="rounded-3xl p-8 sm:p-14 bg-gradient-to-br from-espresso via-[#2a170e] to-espresso text-cream-100 shadow-2xl relative overflow-hidden border border-amber-900/40"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/20 border border-caramel/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
                  <Award className="w-4 h-4" />
                  <span>Franchise &amp; Expansion Inquiries</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Bring the 94-Year Legacy to Your City
                </h3>

                <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                  Lakeview Milk Bar is partnering with passionate entrepreneurs, hospitality operators, and premium commercial landlords to expand our iconic heritage parlours across Karnataka and major Indian metropolitan hubs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center max-w-2xl mx-auto pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-serif text-2xl font-black text-amber-300">203</div>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Proprietary Recipes</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-serif text-2xl font-black text-amber-300">1930</div>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Generational Equity</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="font-serif text-2xl font-black text-amber-300">94 Yrs</div>
                    <div className="text-[11px] text-stone-400 uppercase tracking-wider mt-0.5">Proven Unit Economics</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <a
                    href="tel:+919663812036"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-caramel hover:bg-amber-500 text-espresso font-bold text-xs uppercase tracking-wider transition-all shadow-xl"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Franchise Desk: +91 9663812036</span>
                  </a>
                  <a
                    href="mailto:support@lakeviewmilkbar.in?subject=Lakeview%20Franchise%20Inquiry"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/25 transition-all"
                  >
                    <span>Inquire via Email</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Vintage Press & Newspaper Archives Gallery */}
          <div className="mt-20 pt-16 border-t border-stone-200/80">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/20 text-caramel text-xs font-bold uppercase tracking-widest">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Vintage Press Archives</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-black text-espresso">
                Nine Decades in the Headlines
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm">
                Authentic archival articles and press clippings celebrating Lakeview Milk Bar through the 20th and 21st centuries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ARCHIVE_ARTICLES.slice(0, 5).map((art, idx) => (
                <TiltCard
                  key={idx}
                  maxTilt={6}
                  className="glass-card rounded-2xl p-2.5 border border-white/80 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-100">
                      <Image
                        src={art.src}
                        alt={art.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-60" />
                      <div className="absolute top-2 right-2 bg-espresso/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-mono text-amber-300">
                        {art.date}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-serif text-xs font-bold text-espresso group-hover:text-caramel transition-colors line-clamp-1">
                        {art.title}
                      </h4>
                      <p className="text-[10px] text-stone-500 line-clamp-2 mt-0.5">
                        {art.snippet}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Action CTA Box */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-espresso text-white px-8 py-5 rounded-3xl shadow-2xl">
              <span className="font-serif text-lg font-bold">
                Craving Lakeview’s artisanal celebration cakes delivered to your doorstep?
              </span>
              <Link
                href="/collections/cakes"
                className="bg-caramel hover:bg-amber-600 text-espresso font-bold text-xs px-6 py-3 rounded-full transition-all whitespace-nowrap shadow-md"
              >
                Order Online Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CreamBackground>
  );
}
