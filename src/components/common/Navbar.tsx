"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  User,
  Cake,
  ChevronDown,
  MapPin,
  Clock,
  Phone,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ALL_PRODUCTS } from "@/data/products";
import { OUTLETS, BRAND_INFO } from "@/data/brand";
import { Product } from "@/types";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [scrolled, setScrolled] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Handle live search
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = ALL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.product_type.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleMouseEnter = (menu: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "glass-nav shadow-md py-2.5"
            : "bg-[#FAF7F2]/95 backdrop-blur-md py-3.5 border-b border-stone-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-espresso hover:text-caramel transition-colors rounded-lg hover:bg-white/50"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo (Exact Original SVG) */}
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative h-11 w-40 sm:h-13 sm:w-48 transition-transform duration-300 group-hover:scale-[1.02]">
                <Image
                  src="/assets/logo/lakeview-logo.svg"
                  alt="Lakeview Milk Bar Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links with Rich Dropdowns */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link
                href="/"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors ${
                  pathname === "/" ? "text-caramel font-bold" : "text-espresso/80 hover:text-caramel"
                }`}
              >
                Home
              </Link>

              {/* 1. Cakes Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("cakes")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/collections/cake"
                  className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold py-2 transition-colors ${
                    pathname.startsWith("/collections/cake") || activeDropdown === "cakes"
                      ? "text-caramel font-bold"
                      : "text-espresso/80 hover:text-caramel"
                  }`}
                >
                  <span>Cakes</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "cakes" ? "rotate-180 text-caramel" : ""
                    }`}
                  />
                </Link>

                {/* Cakes Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === "cakes" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full -left-12 w-[620px] bg-[#FAF7F2]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/90 grid grid-cols-12 gap-6 z-50 mt-1"
                    >
                      {/* Left Subcategory Links */}
                      <div className="col-span-7 space-y-3">
                        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">
                            Curated Cake Collections
                          </span>
                          <Link
                            href="/collections/cake"
                            className="text-[10px] font-bold text-espresso hover:text-caramel"
                          >
                            View All (204) →
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          <Link
                            href="/collections/birthday"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🎂 Birthday Cakes
                          </Link>
                          <Link
                            href="/collections/anniversary"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            💍 Anniversary
                          </Link>
                          <Link
                            href="/collections/chocolate"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🍫 Belgian Chocolate
                          </Link>
                          <Link
                            href="/collections/cheese-cake"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🫐 Cheesecakes
                          </Link>
                          <Link
                            href="/collections/floral"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🌸 Floral &amp; Botanical
                          </Link>
                          <Link
                            href="/collections/kids-birthday"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🎈 Kids Birthday
                          </Link>
                          <Link
                            href="/collections/pound-cake"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🍞 Pound &amp; Tea Cakes
                          </Link>
                          <Link
                            href="/collections/cakes-by-flavour"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            ✨ Cakes by Flavour
                          </Link>
                        </div>
                      </div>

                      {/* Right Visual Promo Frame */}
                      <div className="col-span-5 bg-cream-100 rounded-2xl p-3 border border-caramel/20 flex flex-col justify-between overflow-hidden relative group">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 mb-2">
                          <Image
                            src="/assets/promotions/category-cakes.png"
                            alt="Handcrafted Celebration Cakes"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-caramel block">
                            Bespoke Bakery
                          </span>
                          <h4 className="font-serif text-xs font-bold text-espresso leading-snug">
                            Custom Celebration Cake
                          </h4>
                          <Link
                            href="/custom-cake"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-white bg-espresso hover:bg-caramel px-3 py-1.5 rounded-full transition-all w-full justify-center shadow-sm"
                          >
                            <span>Design Online</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Desserts & Bakes Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("desserts")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/collections/desserts"
                  className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold py-2 transition-colors ${
                    pathname.startsWith("/collections/desserts") || activeDropdown === "desserts"
                      ? "text-caramel font-bold"
                      : "text-espresso/80 hover:text-caramel"
                  }`}
                >
                  <span>Desserts &amp; Bakes</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "desserts" ? "rotate-180 text-caramel" : ""
                    }`}
                  />
                </Link>

                {/* Desserts Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === "desserts" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full -left-20 w-[580px] bg-[#FAF7F2]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/90 grid grid-cols-12 gap-6 z-50 mt-1"
                    >
                      <div className="col-span-7 space-y-3">
                        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-caramel">
                            Artisanal Pâtisserie &amp; Bakes
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                          <Link
                            href="/collections/patisserie"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🥐 French Patisserie
                          </Link>
                          <Link
                            href="/collections/breads"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🥖 Artisanal Breads
                          </Link>
                          <Link
                            href="/collections/brownies"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🍫 Fudgy Brownies
                          </Link>
                          <Link
                            href="/collections/cupcakes"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🧁 Gourmet Cupcakes
                          </Link>
                          <Link
                            href="/collections/artisanal"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🍪 Small-Batch Bakes
                          </Link>
                          <Link
                            href="/collections/favourites"
                            className="p-1.5 rounded-lg hover:bg-white text-stone-700 hover:text-espresso font-medium transition-colors"
                          >
                            🍨 Parlour Favourites
                          </Link>
                        </div>
                      </div>

                      {/* Right Visual Frame */}
                      <div className="col-span-5 bg-cream-100 rounded-2xl p-3 border border-caramel/20 flex flex-col justify-between">
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 mb-2">
                          <Image
                            src="/assets/promotions/category-dessert.png"
                            alt="Lakeview Artisanal Desserts"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-caramel block">
                            Daily Freshness
                          </span>
                          <h4 className="font-serif text-xs font-bold text-espresso leading-snug">
                            Baked Daily in Bengaluru
                          </h4>
                          <Link
                            href="/collections/desserts"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-espresso hover:text-caramel"
                          >
                            <span>Explore Menu</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Outlets & Locations Dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter("outlets")}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-1 text-xs uppercase tracking-widest font-semibold py-2 transition-colors ${
                    pathname === "/contact" || activeDropdown === "outlets"
                      ? "text-caramel font-bold"
                      : "text-espresso/80 hover:text-caramel"
                  }`}
                >
                  <span>Outlets</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDropdown === "outlets" ? "rotate-180 text-caramel" : ""
                    }`}
                  />
                </Link>

                {/* Outlets Mega Menu */}
                <AnimatePresence>
                  {activeDropdown === "outlets" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full -left-28 w-[640px] bg-[#FAF7F2]/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/90 z-50 mt-1"
                    >
                      <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-caramel" />
                          <span className="text-xs font-bold uppercase tracking-widest text-espresso">
                            4 Iconic Bengaluru Parlours
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                          ● Open Today Till 1:00 AM
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        {OUTLETS.map((outlet) => (
                          <div
                            key={outlet.id}
                            className="glass-card rounded-2xl p-3 border border-white/80 hover:border-caramel/40 transition-all flex items-center gap-3.5 group shadow-sm hover:shadow-md"
                          >
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-200">
                              <Image
                                src={outlet.image || `/assets/outlets/outlet-${outlet.id}.jpg`}
                                alt={outlet.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col justify-between">
                              <div className="space-y-0.5">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-serif text-xs font-bold text-espresso group-hover:text-caramel transition-colors truncate">
                                    {outlet.name.split("|")[1]?.trim() || outlet.name}
                                  </h4>
                                  {outlet.id === "mg-road" && (
                                    <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded flex-shrink-0">
                                      Flagship
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-stone-600 line-clamp-1">
                                  {outlet.address}
                                </p>
                              </div>

                              <div className="pt-1.5 mt-1 border-t border-stone-200/50 flex items-center justify-between text-[11px]">
                                <a
                                  href={`tel:${outlet.phone}`}
                                  className="text-stone-500 hover:text-caramel font-medium flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3 text-caramel" />
                                  <span className="truncate">{outlet.phone}</span>
                                </a>
                                <a
                                  href={outlet.google_maps_query}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-caramel hover:text-espresso font-bold inline-flex items-center gap-0.5"
                                >
                                  <span>Directions</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs">
                        <span className="text-stone-500">
                          Drive-in car hop service available at all locations.
                        </span>
                        <Link
                          href="/contact"
                          className="font-bold text-espresso hover:text-caramel inline-flex items-center gap-1"
                        >
                          <span>Full Outlets &amp; Contact Page</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. Custom Cake Builder Direct Link */}
              <Link
                href="/custom-cake"
                className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/25 text-espresso hover:bg-caramel hover:text-white transition-all text-xs uppercase tracking-widest font-bold shadow-sm"
              >
                <Cake className="w-3.5 h-3.5 text-caramel group-hover:text-white" />
                <span>Custom Cake</span>
              </Link>

              {/* 5. Menu Link */}
              <Link
                href="/menu"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-1 ${
                  pathname === "/menu"
                    ? "text-caramel font-bold"
                    : "text-espresso/80 hover:text-caramel"
                }`}
              >
                <span>Full Menu</span>
              </Link>

              {/* 6. Heritage & About Link */}
              <Link
                href="/about"
                className={`text-xs uppercase tracking-widest font-semibold transition-colors ${
                  pathname === "/about"
                    ? "text-caramel font-bold"
                    : "text-espresso/80 hover:text-caramel"
                }`}
              >
                About Us
              </Link>
            </nav>

            {/* Actions: Search, Wishlist, Account, Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                data-cursor="Search"
                className="p-2 text-espresso/80 hover:text-caramel hover:bg-white/70 transition-all rounded-full"
                aria-label="Search Catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                data-cursor="Saved"
                className="relative p-2 text-espresso/80 hover:text-caramel hover:bg-white/70 transition-all rounded-full"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 text-[10px] font-bold bg-[#D51919] text-white flex items-center justify-center rounded-full animate-scale">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Account Link */}
              <Link
                href="/account"
                data-cursor="Account"
                className="hidden sm:flex p-2 text-espresso/80 hover:text-caramel hover:bg-white/70 transition-all rounded-full"
                aria-label="My Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                data-cursor="Cart"
                className="relative flex items-center gap-2 bg-espresso hover:bg-caramel text-white px-3.5 py-2 sm:px-4 sm:py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                aria-label="Shopping Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-xs font-bold font-mono">{totalItems}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-md flex items-start justify-center pt-20 px-4"
              onClick={() => setIsSearchOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: -20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl glass-panel rounded-3xl p-6 border border-white/80 shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <Search className="w-5 h-5 text-caramel" />
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search artisan cakes, flavours, truffles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-espresso placeholder-stone-400 font-serif text-lg focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-espresso"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Results dropdown */}
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((p) => (
                      <Link
                        key={p.id}
                        href={`/products/${p.handle}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/80 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                          <Image src={p.image} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-sm font-bold text-espresso group-hover:text-caramel transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <span className="text-xs text-caramel font-semibold">
                            ₹{p.price_min}
                          </span>
                        </div>
                      </Link>
                    ))
                  ) : searchQuery.length > 1 ? (
                    <div className="text-center py-8 text-stone-500 text-sm">
                      No artisan bakes found for &quot;{searchQuery}&quot;.
                    </div>
                  ) : (
                    <div className="py-4 text-xs text-stone-400">
                      Popular: Belgian Chocolate Truffle, Red Velvet, Black Forest, Sundaes
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-stone-200/80 bg-[#FAF7F2]/98 backdrop-blur-xl px-4 py-6 space-y-4 shadow-xl"
            >
              <div className="flex flex-col space-y-3">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso"
                >
                  Home
                </Link>
                <Link
                  href="/collections/cake"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso"
                >
                  Artisan Celebration Cakes
                </Link>
                <Link
                  href="/collections/desserts"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso"
                >
                  Desserts &amp; Bakes
                </Link>
                <Link
                  href="/custom-cake"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-caramel flex items-center gap-2"
                >
                  <Cake className="w-5 h-5" />
                  <span>Custom Cake Designer</span>
                </Link>
                <Link
                  href="/menu"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso flex items-center gap-2"
                >
                  <span>Complete Menu</span>
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso"
                >
                  The 94-Year Story (About)
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-lg font-bold text-espresso"
                >
                  4 Outlets &amp; Contact
                </Link>
              </div>

              {/* Phone quick call in mobile menu */}
              <div className="pt-4 border-t border-stone-200">
                <a
                  href={`tel:${BRAND_INFO.centralOrderPhone}`}
                  className="flex items-center justify-center gap-2 bg-espresso text-white py-3 rounded-full text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-caramel" />
                  <span>Call to Order: {BRAND_INFO.centralOrderPhone}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
