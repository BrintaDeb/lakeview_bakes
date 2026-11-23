"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Heart, Clock, ShieldCheck } from "lucide-react";
import { BRAND_INFO, OUTLETS } from "@/data/brand";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso text-cream-100 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info & Heritage */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="relative h-12 w-48 brightness-0 invert">
                <Image
                  src="/assets/logo/lakeview-logo.svg"
                  alt="Lakeview Milk Bar"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
              Since 1930, Lakeview Milk Bar has stood as Bengaluru’s most cherished dessert
              destination. From our legendary drive-in sundaes to bespoke celebration cakes, baking
              remains our true love language.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-stone-300">
                <Phone className="w-4 h-4 text-caramel shrink-0" />
                <a href={`tel:${BRAND_INFO.centralOrderPhone}`} className="hover:text-caramel font-semibold">
                  +91 {BRAND_INFO.centralOrderPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-stone-300">
                <Mail className="w-4 h-4 text-caramel shrink-0" />
                <a href={`mailto:${BRAND_INFO.officialEmail}`} className="hover:text-caramel">
                  {BRAND_INFO.officialEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-stone-300">
                <MapPin className="w-4 h-4 text-caramel shrink-0 mt-1" />
                <span>MG Road Flagship: Kannan Bldg, 89 MG Road, Bengaluru - 560001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Explore Menu
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link href="/collections/cake" className="hover:text-caramel transition-colors">
                  Artisanal Cakes
                </Link>
              </li>
              <li>
                <Link href="/collections/desserts" className="hover:text-caramel transition-colors">
                  Desserts & Pastries
                </Link>
              </li>
              <li>
                <Link href="/collections/bakery" className="hover:text-caramel transition-colors">
                  Fresh Bakery & Breads
                </Link>
              </li>
              <li>
                <Link href="/custom-cake" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                  <span>Custom Cakes</span>
                  <span className="text-[10px] bg-caramel text-white font-bold px-1.5 py-0.5 rounded">3D Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-caramel transition-colors flex items-center gap-1.5">
                  <span>Complete Menu</span>
                  <span className="text-[10px] bg-amber-600 text-white font-bold px-1.5 py-0.5 rounded">All Items</span>
                </Link>
              </li>
              <li>
                <Link href="/collections/favourites" className="hover:text-caramel transition-colors">
                  Customer Favourites
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Locations */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Our 4 Outlets
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              {OUTLETS.map((outlet) => (
                <li key={outlet.id}>
                  <Link
                    href={`/contact#${outlet.id}`}
                    className="hover:text-caramel transition-colors block"
                  >
                    <span className="font-medium text-white">{outlet.name.split("|")[1]?.trim() || outlet.name}</span>
                    <span className="block text-xs text-stone-400">{outlet.phone}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care & Policies */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide">
              Help & Policies
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li>
                <Link href="/about" className="hover:text-caramel transition-colors">
                  Our 94-Year Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-caramel transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-caramel transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-and-returns" className="hover:text-caramel transition-colors">
                  Refund and Returns
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-caramel transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/terms-policy" className="hover:text-caramel transition-colors">
                  Terms & Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Lakeview Milk Bar. All Rights Reserved. Crafted with love in Bengaluru.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-caramel" />
              <span>100% Secure Razorpay Checkout</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-300">
              <Clock className="w-4 h-4 text-caramel" />
              <span>Drive-In & Delivery Everyday</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
