"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  ShoppingBag,
  Check,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Heart,
  Users,
  Clock,
  ShieldCheck,
  Wand2,
  Filter,
  CheckCircle2,
} from "lucide-react";
import { ALL_PRODUCTS, getProductByHandle } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { CreamBackground } from "@/components/ui/CreamBackground";
import { TiltCard } from "@/components/ui/TiltCard";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { formatPrice } from "@/lib/utils";

const ITEMS_PER_PAGE = 24;

interface CategoryConfig {
  id: string;
  label: string;
  icon: string;
  tagline: string;
  bgGradient: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "all",
    label: "All Archives",
    icon: "✨",
    tagline: "All 204+ Heritage Bakes",
    bgGradient: "from-amber-100/60 to-rose-100/60",
  },
  {
    id: "cake",
    label: "Celebration Cakes",
    icon: "🎂",
    tagline: "Sponges, Buttercream & Milestone Tiers",
    bgGradient: "from-pink-100/60 to-rose-100/60",
  },
  {
    id: "chocolate",
    label: "Chocolate & Truffle",
    icon: "🍫",
    tagline: "55% Callebaut Ganache & Dutch Cocoa",
    bgGradient: "from-amber-100/60 to-yellow-100/60",
  },
  {
    id: "sundae",
    label: "Heritage Sundaes",
    icon: "🍨",
    tagline: "1930 Banana Splits & Hot Cocoa Fudge",
    bgGradient: "from-sky-100/60 to-cyan-100/60",
  },
  {
    id: "cheese",
    label: "Cheesecakes",
    icon: "🧀",
    tagline: "New York Baked & Blueberry Compote",
    bgGradient: "from-amber-100/60 to-orange-100/60",
  },
  {
    id: "fruit",
    label: "Fruit & Floral",
    icon: "🍓",
    tagline: "Fresh Strawberries, Berries & Lychee",
    bgGradient: "from-rose-100/60 to-pink-100/60",
  },
  {
    id: "dessert",
    label: "Bakes & Patisserie",
    icon: "🥐",
    tagline: "Artisan Tarts, Brownies & Tea Cookies",
    bgGradient: "from-emerald-100/60 to-teal-100/60",
  },
];

export default function MenuPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietFilter, setDietFilter] = useState<"all" | "eggless" | "egg">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "alpha">("featured");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [addedId, setAddedId] = useState<string | number | null>(null);

  // Particle Burst System for Quick-Add
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; icon: string }[]
  >([]);

  // Interactive Quick View Modal State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [modalSize, setModalSize] = useState("1 kg");
  const [modalEggless, setModalEggless] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  const filteredProducts = useMemo(() => {
    let prods = ALL_PRODUCTS;

    // Filter by Category
    if (activeCategory !== "all") {
      const cat = activeCategory.toLowerCase();
      prods = prods.filter((p) => {
        const type = (p.product_type || "").toLowerCase();
        const title = p.title.toLowerCase();
        const tags = (p.tags || []).map((t) => t.toLowerCase());

        if (cat === "sundae") {
          return (
            type.includes("sundae") ||
            title.includes("sundae") ||
            title.includes("split") ||
            title.includes("boat") ||
            tags.some((t) => t.includes("sundae"))
          );
        }
        if (cat === "cheese") {
          return (
            type.includes("cheese") ||
            title.includes("cheese") ||
            tags.some((t) => t.includes("cheese"))
          );
        }
        if (cat === "chocolate") {
          return (
            type.includes("chocolate") ||
            title.includes("chocolate") ||
            title.includes("truffle") ||
            title.includes("fudge") ||
            title.includes("dutch") ||
            title.includes("cocoa") ||
            tags.some((t) => t.includes("chocolate") || t.includes("truffle"))
          );
        }
        if (cat === "fruit") {
          return (
            type.includes("fruit") ||
            title.includes("fruit") ||
            title.includes("strawberry") ||
            title.includes("mango") ||
            title.includes("berry") ||
            title.includes("pineapple") ||
            title.includes("orange") ||
            title.includes("kiwi") ||
            title.includes("rosette")
          );
        }
        if (cat === "dessert") {
          return (
            type.includes("dessert") ||
            type.includes("tart") ||
            type.includes("cupcake") ||
            type.includes("pie") ||
            title.includes("tart") ||
            title.includes("pie") ||
            title.includes("cupcake") ||
            title.includes("pastry") ||
            title.includes("cookie") ||
            title.includes("brownie")
          );
        }
        if (cat === "cake") {
          return (
            (type.includes("cake") ||
              title.includes("cake") ||
              tags.some((t) => t.includes("cake"))) &&
            !type.includes("sundae") &&
            !title.includes("sundae")
          );
        }
        return type.includes(cat) || title.includes(cat) || tags.some((t) => t.includes(cat));
      });
    }

    // Filter by Search Query
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      prods = prods.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.product_type || "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }

    // Filter by Dietary Recipe
    if (dietFilter === "eggless") {
      prods = prods.filter(
        (p) => (p.tags || []).includes("Eggless") || !(p.tags || []).includes("Contains Egg")
      );
    } else if (dietFilter === "egg") {
      prods = prods.filter((p) => (p.tags || []).includes("Contains Egg"));
    }

    // Sort Logic
    if (sortBy === "price-asc") {
      prods = [...prods].sort((a, b) => a.price_min - b.price_min);
    } else if (sortBy === "price-desc") {
      prods = [...prods].sort((a, b) => b.price_min - a.price_min);
    } else if (sortBy === "alpha") {
      prods = [...prods].sort((a, b) => a.title.localeCompare(b.title));
    }

    return prods;
  }, [activeCategory, searchQuery, dietFilter, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage: number) => {
    haptics.light();
    setCurrentPage(newPage);
    gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptics.medium();
    sound.playBubblePop();

    // Trigger celebratory particle burst
    const rect = e.currentTarget.getBoundingClientRect();
    const icons = ["✨", "🍰", "💖", "🌸", "🧁", "⭐"];
    const newItems = Array.from({ length: 4 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 40,
      y: rect.top + (Math.random() - 0.5) * 30,
      icon: icons[Math.floor(Math.random() * icons.length)],
    }));
    setParticles((prev) => [...prev.slice(-10), ...newItems]);

    addToCart(product, product.variants[0], 1);
    setIsCartOpen(true);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  const openQuickView = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptics.light();
    sound.playSweetChime();
    setQuickViewProduct(product);
    setModalSize("1 kg");
    setModalEggless(true);
    setModalMessage("");
  };

  const handleModalAddToCart = () => {
    if (!quickViewProduct) return;
    haptics.success();
    sound.playSweetChime();

    addToCart(quickViewProduct, quickViewProduct.variants[0], 1, {
      size: modalSize,
      eggless: modalEggless,
      messageOnCake: modalMessage.trim() || undefined,
    });

    setIsCartOpen(true);
    setQuickViewProduct(null);
  };

  const getServings = (product: Product) => {
    const type = (product.product_type || "").toLowerCase();
    const title = product.title.toLowerCase();
    if (type.includes("sundae") || title.includes("split") || title.includes("boat")) {
      return "Serves 1–2";
    }
    if (type.includes("cake") || title.includes("cake")) {
      return "1 kg · Serves 6–8";
    }
    return "Artisan Serving";
  };

  const getTasteNotes = (product: Product) => {
    const title = product.title.toLowerCase();
    if (title.includes("truffle") || title.includes("belgian") || title.includes("dark")) {
      return { sweetness: "●●●○○", richness: "●●●●●", note: "55% Dark Callebaut Ganache" };
    }
    if (title.includes("rainbow") || title.includes("birthday") || title.includes("vanilla")) {
      return { sweetness: "●●●●○", richness: "●●●○○", note: "Cloud-Soft Vanilla Sponge" };
    }
    if (title.includes("sundae") || title.includes("banana") || title.includes("split")) {
      return { sweetness: "●●●●●", richness: "●●●●○", note: "Boiling Hot Cocoa Fudge" };
    }
    if (title.includes("cheese")) {
      return { sweetness: "●●●○○", richness: "●●●●●", note: "Slow-Baked Cream Cheese" };
    }
    if (title.includes("fruit") || title.includes("berry") || title.includes("strawberry")) {
      return { sweetness: "●●●○○", richness: "●●●○○", note: "Fresh Seasonal Fruit Compote" };
    }
    return { sweetness: "●●●●○", richness: "●●●●○", note: "Pure Dairy Butter Recipe" };
  };

  const getWhatsAppProductUrl = (product: Product) => {
    const msg = `Hello Lakeview Milk Bar! 🎂\n\nI would like to order:\n• *${product.title}*\n• Price: ₹${product.price_min}\n• Serving: ${getServings(product)}\n\nPlease confirm availability and payment details. Thank you!`;
    return `https://wa.me/919663812036?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CreamBackground className="min-h-screen pt-28 sm:pt-36 pb-24 bg-cream-50 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Illustrative Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/15 border border-caramel/30 text-caramel text-xs font-bold uppercase tracking-widest shadow-2xs">
            <span className="text-sm">🧁</span>
            <span>1930 Illustrated Patisserie &amp; Heritage Parlour Menu</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl font-bold text-espresso tracking-tight leading-none">
            Lakeview Illustrated Menu
          </h1>

          <p className="text-stone-600 text-xs sm:text-base leading-relaxed font-sans max-w-2xl mx-auto">
            Discover all 204+ authentic heritage confections handcrafted fresh daily across Bengaluru. Hand-churned sundaes, celebration tiers, Dutch cocoa truffles, and artisan pastries.
          </p>
        </div>

        {/* ==========================================================================
            ILLUSTRATIVE CATEGORY SHOWCASE CARDS (Interactive Category Navigator)
            ========================================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  haptics.light();
                  sound.playBubblePop();
                  setActiveCategory(cat.id);
                }}
                className={`group p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between space-y-2 cursor-pointer ${
                  isActive
                    ? "bg-espresso text-white border-espresso shadow-lg scale-105"
                    : "bg-white/85 hover:bg-white text-espresso border-stone-200/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl transition-transform group-hover:scale-125">
                    {cat.icon}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-amber-300 text-espresso"
                        : "bg-stone-100 text-stone-500 group-hover:bg-amber-100"
                    }`}
                  >
                    {cat.id === "all" ? ALL_PRODUCTS.length : "Select"}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-black text-xs sm:text-sm tracking-wide leading-tight line-clamp-1">
                    {cat.label}
                  </h4>
                  <p
                    className={`text-[10px] line-clamp-1 mt-0.5 font-sans ${
                      isActive ? "text-stone-300" : "text-stone-500"
                    }`}
                  >
                    {cat.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Search, Diet Filter & Sorting Toolbar */}
        <div
          ref={gridTopRef}
          className="glass-panel rounded-3xl p-4 sm:p-6 border border-white/90 shadow-xl bg-white/90 backdrop-blur-md space-y-4"
        >
          {/* Live Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by flavor, chocolate truffle, banana split, cheesecake, fruit, or berry..."
              className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-cream-100/70 border border-stone-200 text-espresso placeholder:text-stone-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-espresso"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Dietary Filters & Sorter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200/60">
            {/* Dietary Recipe Pills */}
            <div className="flex items-center gap-1.5 bg-cream-100 p-1 rounded-full text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  setDietFilter("all");
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all ${
                  dietFilter === "all"
                    ? "bg-white text-espresso shadow-xs"
                    : "text-stone-500 hover:text-espresso"
                }`}
              >
                All Recipes
              </button>
              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  setDietFilter("eggless");
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  dietFilter === "eggless"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-stone-500 hover:text-emerald-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>100% Eggless</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  setDietFilter("egg");
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                  dietFilter === "egg"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-stone-500 hover:text-amber-700"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Traditional Recipe</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-cream-100 text-espresso text-xs font-bold py-2 px-3.5 rounded-full border border-stone-200/80 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Heritage</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="alpha">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Fast Stats */}
        <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-2">
          <span>
            Displaying{" "}
            <strong className="text-espresso font-bold">
              {filteredProducts.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}
              –{Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}
            </strong>{" "}
            of <strong className="text-espresso font-bold">{filteredProducts.length}</strong> confections
          </span>
          <span className="hidden sm:inline">⚡ Handcrafted fresh daily · Express delivery Bengaluru</span>
        </div>

        {/* ==========================================================================
            VISUALLY ILLUSTRATIVE CONFECTIONERY PRODUCT GRID
            ========================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => {
            const taste = getTasteNotes(product);
            const isFav = isInWishlist(product.id);

            return (
              <TiltCard
                key={product.id}
                maxTilt={4}
                className="glass-panel rounded-3xl p-4 border border-white/95 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group bg-white relative overflow-hidden"
              >
                <div className="space-y-3">
                  {/* Image Frame with Cathedral Arched Top & Quick View Trigger */}
                  <div className="relative aspect-square rounded-t-[36px] rounded-b-2xl overflow-hidden bg-stone-100 shadow-inner group/img">
                    <Image
                      src={product.image || "/assets/products/belgian-truffle-cake.jpg"}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Quick View Button on Hover */}
                    <button
                      type="button"
                      onClick={(e) => openQuickView(product, e)}
                      aria-label="Quick View Cake Details"
                      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-amber-200" />
                      <span>Quick View &amp; Inscribe</span>
                    </button>

                    {/* 100% Eggless Pill Top-Left */}
                    <div className="absolute top-3 left-3 z-10 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-stone-200/70">
                        <span className="w-3 h-3 border-2 border-emerald-600 rounded-sm flex items-center justify-center p-[1px] bg-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                        </span>
                        <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-800">
                          100% Eggless
                        </span>
                      </div>
                    </div>

                    {/* Wishlist Button Top-Right */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        haptics.light();
                        toggleWishlist(product);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-md text-espresso hover:text-[#BE185D] shadow-xs transition-transform active:scale-90"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? "fill-[#BE185D] text-[#BE185D]" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Informational Section */}
                  <div className="space-y-1.5 px-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500">
                      <span className="font-semibold uppercase tracking-wider text-caramel truncate max-w-[140px]">
                        {product.product_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-stone-400" />
                        <span>{getServings(product)}</span>
                      </span>
                    </div>

                    <Link href={`/products/${product.handle}`} className="block">
                      <h3 className="font-cursive text-2xl font-bold text-espresso group-hover:text-caramel transition-colors line-clamp-1 leading-tight">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed font-sans">
                      {product.description}
                    </p>

                    {/* Visual Taste Profile Radar Tag */}
                    <div className="bg-amber-50/70 rounded-xl p-2 border border-amber-200/50 flex items-center justify-between text-[10px] font-mono text-stone-600 mt-2">
                      <span className="font-bold text-amber-900 truncate">{taste.note}</span>
                      <span className="text-amber-700 font-bold shrink-0">{taste.richness}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Stations */}
                <div className="pt-3 border-t border-stone-100 space-y-2 mt-3">
                  <div className="flex items-center justify-between px-1">
                    <div>
                      <span className="text-[9px] text-stone-400 block font-mono uppercase">
                        Patron Price
                      </span>
                      <span className="font-sans text-lg font-black text-espresso">
                        ₹{product.price_min.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                        addedId === product.id
                          ? "bg-emerald-600 text-white scale-105"
                          : "bg-espresso hover:bg-caramel text-white"
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added! ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Box</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Direct 1-Tap WhatsApp Button */}
                  <a
                    href={getWhatsAppProductUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptics.light()}
                    className="w-full py-1.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                    <span>WhatsApp Order (+91 9663812036)</span>
                  </a>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200/80 px-2">
            <span className="text-xs font-semibold text-stone-500 font-mono">
              Page {currentPage} of {totalPages} ({filteredProducts.length} items total)
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-espresso text-xs font-bold hover:bg-cream-100 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pNum = i + 1;
                  if (
                    pNum === 1 ||
                    pNum === totalPages ||
                    (pNum >= currentPage - 1 && pNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pNum}
                        onClick={() => handlePageChange(pNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pNum
                            ? "bg-espresso text-white shadow-sm"
                            : "bg-white border border-stone-200 text-stone-700 hover:bg-cream-100"
                        }`}
                      >
                        {pNum}
                      </button>
                    );
                  }
                  if (pNum === currentPage - 2 || pNum === currentPage + 2) {
                    return (
                      <span key={pNum} className="px-1 text-stone-400 text-xs font-mono">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-2 rounded-xl bg-white border border-stone-200 text-espresso text-xs font-bold hover:bg-cream-100 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Empty Fallback */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-4 glass-panel rounded-3xl p-10 max-w-md mx-auto">
            <p className="font-serif text-2xl font-bold text-espresso">
              No confections matched &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-stone-500 text-xs">
              Try searching for &ldquo;chocolate&rdquo;, &ldquo;sundae&rdquo;, &ldquo;rainbow&rdquo;, or &ldquo;split&rdquo;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setDietFilter("all");
              }}
              className="px-6 py-2.5 rounded-full bg-caramel text-espresso font-bold text-xs uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Particle Bursts on Quick Add */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 2.2, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed pointer-events-none text-2xl font-bold select-none z-[10005]"
          style={{ left: p.x, top: p.y }}
        >
          {p.icon}
        </motion.div>
      ))}

      {/* ==========================================================================
          INTERACTIVE QUICK-VIEW & CUSTOMIZATION MODAL
          ========================================================================== */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-[10006] flex items-center justify-center p-4 bg-espresso/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#FFFDF9] text-espresso rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-caramel/30 space-y-5 max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-espresso rounded-full hover:bg-stone-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Header */}
              <div className="flex items-center gap-3.5 border-b border-stone-200/80 pb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
                  <Image
                    src={quickViewProduct.image || "/assets/products/belgian-truffle-cake.jpg"}
                    alt={quickViewProduct.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-caramel">
                    {quickViewProduct.product_type} · Est. 1930
                  </span>
                  <h3 className="font-cursive text-2xl sm:text-3xl font-bold text-espresso line-clamp-1">
                    {quickViewProduct.title}
                  </h3>
                  <span className="font-sans text-lg font-black text-espresso">
                    ₹{quickViewProduct.price_min.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Portion Weight Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Select Size / Portion
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "500g", desc: "Serves 3–4" },
                    { label: "1 kg", desc: "Serves 6–8 (Standard)" },
                    { label: "2 kg", desc: "Serves 12–16 (Party)" },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => {
                        haptics.light();
                        setModalSize(s.label);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        modalSize === s.label
                          ? "border-caramel bg-amber-50 text-espresso font-bold shadow-xs"
                          : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{s.label}</div>
                      <div className="text-[10px] text-stone-400">{s.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Choice */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                  Dietary Preparation
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setModalEggless(true);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                      modalEggless
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 font-bold"
                        : "border-stone-200 bg-white text-stone-600"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                    <span className="text-xs">100% Eggless (Standard)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      haptics.light();
                      setModalEggless(false);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all flex items-center justify-center gap-2 ${
                      !modalEggless
                        ? "border-amber-600 bg-amber-50 text-amber-950 font-bold"
                        : "border-stone-200 bg-white text-stone-600"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <span className="text-xs">With Egg Recipe</span>
                  </button>
                </div>
              </div>

              {/* Hand-Piped Inscription on Cake */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
                    Complimentary Inscription on Cake
                  </label>
                  <span className="text-[10px] text-stone-400">Piped in cursive</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Happy Birthday Shreyam! 💖"
                  value={modalMessage}
                  onChange={(e) => setModalMessage(e.target.value)}
                  maxLength={40}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-caramel text-xs text-espresso bg-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleModalAddToCart}
                  className="w-full py-3.5 rounded-full bg-espresso hover:bg-caramel text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Box &amp; Open Basket ({modalSize})</span>
                </button>

                <a
                  href={getWhatsAppProductUrl(quickViewProduct)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp (+91 9663812036)</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CreamBackground>
  );
}
