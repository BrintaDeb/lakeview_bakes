"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/common/ProductCard";
import { QuickViewModal } from "@/components/common/QuickViewModal";
import { getRecommendedProducts } from "@/data/products";
import { Product } from "@/types";

export const RecommendedSection: React.FC = () => {
  const recommendedProducts = getRecommendedProducts();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <section className="py-16 sm:py-20 bg-cream-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-caramel mb-2">
              <Sparkles className="w-3.5 h-3.5 text-caramel" />
              <span>Chef’s Signature Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-espresso tracking-tight">
              Recommended For You
            </h2>
            <p className="text-stone-600 text-sm mt-1 max-w-lg">
              Bengaluru’s favorite handcrafted celebration cakes, baked fresh with pure butter, rich dairy, and signature family recipes.
            </p>
          </div>

          <Link
            href="/collections/cake"
            className="inline-flex items-center gap-2 text-sm font-bold text-espresso hover:text-caramel transition-colors group"
          >
            <span>View All 200+ Creations</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
