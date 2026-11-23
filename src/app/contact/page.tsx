"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Car,
  Navigation,
} from "lucide-react";
import { BRAND_INFO, OUTLETS } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";
import { CreamBackground } from "@/components/ui/CreamBackground";

const OUTLET_PHOTOS: Record<string, string> = {
  "mg-road": "/assets/outlets/outlet-mg-road.jpg",
  indiranagar: "/assets/outlets/outlet-indiranagar.jpg",
  "kalyan-nagar": "/assets/outlets/outlet-kalyan-nagar.jpg",
  whitefield: "/assets/outlets/outlet-whitefield.jpg",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <CreamBackground className="pt-28 sm:pt-36 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-caramel text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bengaluru Outlets &amp; Customer Care</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-black text-espresso tracking-tight">
            Get In Touch With Us
          </h1>
          <p className="text-stone-600 text-sm sm:text-base">
            Have a question about a bespoke celebration cake, corporate catering, or visiting our four heritage parlours? We are always here to help.
          </p>
        </div>

        {/* Contact Form & Main Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form */}
          <div className="lg:col-span-7">
            <TiltCard maxTilt={3} className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl space-y-6">
              <h2 className="font-serif text-2xl font-bold text-espresso">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-8 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="font-serif text-xl font-bold text-espresso">
                    Thank You, {formData.name || "Patron"}!
                  </h3>
                  <p className="text-stone-600 text-sm max-w-md mx-auto">
                    Your message has been received by our customer care team. We will get back to you within 2-4 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-espresso text-white text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input w-full px-4 py-3 rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9663812036"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="glass-input w-full px-4 py-3 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Your Message or Cake Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your celebration date, cake flavor, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Send Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </TiltCard>
          </div>

          {/* Right Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard maxTilt={4} className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-6">
              <h3 className="font-serif text-xl font-bold text-espresso">
                Central Ordering &amp; Concierge
              </h3>

              <div className="space-y-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel shrink-0">
                    <Phone className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-bold">
                      Order by Phone / WhatsApp
                    </span>
                    <a
                      href={`tel:${BRAND_INFO.centralOrderPhone}`}
                      className="text-lg font-bold text-espresso hover:text-caramel font-serif"
                    >
                      {BRAND_INFO.centralOrderPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel shrink-0">
                    <Mail className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-bold">
                      Official Support Email
                    </span>
                    <a
                      href={`mailto:${BRAND_INFO.officialEmail}`}
                      className="text-base font-bold text-espresso hover:text-caramel"
                    >
                      {BRAND_INFO.officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-caramel/10 flex items-center justify-center text-caramel shrink-0">
                    <Clock className="w-5 h-5 text-caramel" />
                  </div>
                  <div>
                    <span className="text-[11px] text-stone-500 uppercase tracking-wider block font-bold">
                      Customer Service Hours
                    </span>
                    <span className="text-sm font-semibold text-espresso">
                      9:00 AM – 1:00 AM (Everyday)
                    </span>
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Heritage Trust Frame with quote banner */}
            <TiltCard maxTilt={4} className="glass-card rounded-3xl p-3 border border-white/80 shadow-lg overflow-hidden group">
              <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-stone-100">
                <Image
                  src="/assets/banners/quote-desktop.png"
                  alt="Lakeview Archival Banner"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 block">
                    Lakeview Milk Bar
                  </span>
                  <p className="font-serif text-sm italic font-bold">
                    &quot;Baking is our Love Language Since 1930&quot;
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        {/* 4 Outlets Comprehensive Directory */}
        <div className="space-y-8 pt-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel">
              Visit Us in Person
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
              Our 4 Official Bengaluru Outlets
            </h2>
            <p className="text-stone-600 text-sm">
              All locations feature dine-in, takeaway, and our signature drive-in car hop service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OUTLETS.map((outlet) => {
              const photo = OUTLET_PHOTOS[outlet.id] || "/assets/promotions/delicious-cakes-promo.png";

              return (
                <TiltCard
                  key={outlet.id}
                  id={outlet.id}
                  maxTilt={5}
                  className="glass-card rounded-3xl p-6 sm:p-8 border border-white/90 shadow-xl space-y-5 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Outlet Photo Header */}
                    <div className="relative aspect-[16/8] rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                      <Image
                        src={photo}
                        alt={outlet.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-75" />
                      
                      <div className="absolute top-3 left-3 bg-espresso/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-caramel" />
                        <span>{outlet.id === "mg-road" ? "Historic Flagship" : `Est. ${outlet.established_year}`}</span>
                      </div>

                      <div className="absolute top-3 right-3 bg-amber-500/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1">
                        <Car className="w-3 h-3" />
                        <span>Drive-In Car Hop</span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <h3 className="font-serif text-xl font-bold">
                          {outlet.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed">
                      {outlet.address}
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-stone-600 border-t border-stone-200/60">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-caramel shrink-0" />
                        <span>{outlet.timings}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-caramel shrink-0" />
                        <a href={`tel:${outlet.phone}`} className="hover:text-caramel font-semibold truncate">
                          {outlet.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href={outlet.google_maps_query}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 flex-1 py-3 px-6 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold transition-all shadow-md"
                    >
                      <Navigation className="w-3.5 h-3.5 text-amber-300" />
                      <span>Directions on Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={`tel:${outlet.phone}`}
                      className="inline-flex items-center justify-center p-3 rounded-full glass-panel text-espresso hover:text-caramel border border-stone-200"
                      aria-label="Call outlet"
                    >
                      <Phone className="w-4 h-4 text-caramel" />
                    </a>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </div>
    </CreamBackground>
  );
}
