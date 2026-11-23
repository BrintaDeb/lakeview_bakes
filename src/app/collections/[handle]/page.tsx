"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Filter, SlidersHorizontal, ArrowLeft, Cake, Sparkles, Check } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { ALL_PRODUCTS } from "@/data/products";
import { ALL_COLLECTIONS, getCollectionByHandle } from "@/data/collections";
import { Product } from "@/types";
import { CreamBackground } from "@/components/ui/CreamBackground";
import { TiltCard } from "@/components/ui/TiltCard";

const COLLECTION_BANNERS: Record<string, string> = {
  cake: "/assets/promotions/collection-cake.webp",
  chocolate: "/assets/promotions/collection-chocolate.webp",
  "cheese-cake": "/assets/promotions/collection-cheese-cake.jpg",
  birthday: "/assets/promotions/collection-birthday.jpg",
  anniversary: "/assets/promotions/collection-anniversary.jpg",
  "baby-shower": "/assets/promotions/collection-baby-shower.jpg",
  bakery: "/assets/promotions/collection-bakery.jpg",
  breads: "/assets/promotions/collection-breads.jpg",
  brownies: "/assets/promotions/collection-brownies.jpg",
  cupcakes: "/assets/promotions/collection-cupcakes.jpg",
  desserts: "/assets/promotions/collection-desserts.jpg",
  favourites: "/assets/promotions/collection-favourites.webp",
  floral: "/assets/promotions/collection-floral.jpg",
  "kids-birthday": "/assets/promotions/collection-kids-birthday.jpg",
  patisserie: "/assets/promotions/collection-patisserie.jpg",
  "pound-cake": "/assets/promotions/collection-pound-cake.jpg",
  artisanal: "/assets/promotions/collection-artisanal.jpg",
  celebrations: "/assets/promotions/collection-celebrations.jpg",
  animal: "/assets/promotions/collection-animal.jpg",
  "cakes-by-flavour": "/assets/promotions/collection-cakes-by-flavour.webp",
};

export default function CollectionPage() {
  const params = useParams();
  const handle = (params?.handle as string) || "cake";
  const normalizedHandle = handle === "cakes" ? "cake" : handle;

  const collection = getCollectionByHandle(normalizedHandle) || {
    id: 999,
    title:
      handle.toLowerCase() === "cakes" || handle.toLowerCase() === "cake"
        ? "Celebration Cakes"
        : handle.toLowerCase() === "sundaes" || handle.toLowerCase() === "sundae"
        ? "Heritage Sundaes"
        : handle.toLowerCase() === "desserts" || handle.toLowerCase() === "bakes"
        ? "Artisanal Bakes & Desserts"
        : handle.replace("-", " ").toUpperCase(),
    handle,
    description:
      handle.toLowerCase().includes("sundae")
        ? "Lakeview's iconic 1930 ice cream sundaes churned fresh with Belgian chocolate fudge and toasted cashews."
        : "Explore Lakeview Milk Bar’s artisanal creations baked fresh daily since 1930.",
  };

  const bannerImg =
    COLLECTION_BANNERS[normalizedHandle] ||
    COLLECTION_BANNERS[handle] ||
    "/assets/banners/banner-hero-desktop.png";

  const [dietFilter, setDietFilter] = useState<"all" | "eggless" | "egg">("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter products by collection, search and diet
  const filteredProducts = useMemo(() => {
    let prods = ALL_PRODUCTS;

    if (handle !== "all" && handle !== "frontpage") {
      const h = handle.toLowerCase();
      const isCake = h.startsWith("cake");
      const isSundae = h.startsWith("sundae") || h === "ice-cream";
      const isDessert = h.startsWith("dessert") || h.startsWith("bake") || h === "pastry";

      prods = prods.filter((p) => {
        const type = (p.product_type || "").toLowerCase();
        const title = p.title.toLowerCase();
        const tags = (p.tags || []).map((t) => t.toLowerCase());

        if (isCake) {
          return type.includes("cake") || title.includes("cake") || tags.some((t) => t.includes("cake"));
        }
        if (isSundae) {
          return (
            type.includes("sundae") ||
            title.includes("sundae") ||
            title.includes("split") ||
            tags.some((t) => t.includes("sundae"))
          );
        }
        if (isDessert) {
          return (
            type.includes("dessert") ||
            type.includes("tart") ||
            type.includes("cupcake") ||
            type.includes("pie") ||
            type.includes("bread") ||
            type.includes("cookie") ||
            type.includes("bakery") ||
            title.includes("tart") ||
            title.includes("pie") ||
            title.includes("cupcake")
          );
        }
        return (
          type.includes(h) ||
          title.includes(h) ||
          tags.some((t) => t.includes(h)) ||
          p.handle.toLowerCase().includes(h)
        );
      });
    }

    if (prods.length === 0) {
      prods = ALL_PRODUCTS.slice(0, 24);
    }

    if (dietFilter === "eggless") {
      prods = prods.filter(
        (p) => (p.tags || []).includes("Eggless") || !(p.tags || []).includes("Contains Egg")
      );
    } else if (dietFilter === "egg") {
      prods = prods.filter((p) => (p.tags || []).includes("Contains Egg"));
    }

    if (sortBy === "price-asc") {
      prods = [...prods].sort((a, b) => a.price_min - b.price_min);
    } else if (sortBy === "price-desc") {
      prods = [...prods].sort((a, b) => b.price_min - a.price_min);
    }

    return prods;
  }, [handle, dietFilter, sortBy]);

  return (
    <CreamBackground className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-caramel flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-espresso font-semibold capitalize font-serif">{collection.title}</span>
        </div>

        {/* High-Res Original Header Banner */}
        <TiltCard maxTilt={3} className="relative rounded-3xl overflow-hidden glass-card p-2 sm:p-3 border border-white/90 shadow-2xl">
          <div className="relative aspect-[16/6] w-full rounded-2xl overflow-hidden bg-stone-900 group">
            <Image
              src={bannerImg}
              alt={collection.title}
              fill
              priority
              className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent opacity-90" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 text-white space-y-2 max-w-2xl">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 block">
                Artisanal Confectionery Collection
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                {collection.title}
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 line-clamp-2 max-w-xl leading-relaxed">
                {collection.description}
              </p>
              <div className="pt-2 flex items-center gap-3 text-[11px] text-amber-200">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full font-bold">
                  {filteredProducts.length} Creations Available
                </span>
                <span>•</span>
                <span>Small-Batch Baking Daily</span>
              </div>
            </div>
          </div>
        </TiltCard>

        {/* Quick Collection Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { label: "All Celebration Cakes", handle: "cake" },
            { label: "Belgian Chocolate", handle: "chocolate" },
            { label: "Cheesecakes", handle: "cheese-cake" },
            { label: "Birthday", handle: "birthday" },
            { label: "Anniversary", handle: "anniversary" },
            { label: "Cupcakes", handle: "cupcakes" },
            { label: "Brownies", handle: "brownies" },
            { label: "Patisserie", handle: "patisserie" },
            { label: "Bakery & Breads", handle: "bakery" },
          ].map((col) => (
            <Link
              key={col.handle}
              href={`/collections/${col.handle}`}
              className={`px-4 py-2 text-xs rounded-full font-bold whitespace-nowrap transition-all shadow-sm ${
                handle === col.handle
                  ? "bg-espresso text-white shadow-md scale-105"
                  : "glass-card text-stone-700 hover:text-espresso hover:bg-white"
              }`}
            >
              {col.label}
            </Link>
          ))}
        </div>

        {/* Toolbar (Filters & Sort) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/80 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Dietary:</span>
            </span>
            <div className="flex gap-1.5">
              {[
                { id: "all", label: "All" },
                { id: "eggless", label: "🟢 100% Eggless" },
                { id: "egg", label: "🟡 With Egg" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setDietFilter(filter.id as any)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    dietFilter === filter.id
                      ? "bg-caramel text-white shadow-sm"
                      : "bg-white/70 text-stone-600 hover:bg-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-input px-3 py-2 text-xs font-semibold rounded-xl text-espresso"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </CreamBackground>
  );
}
