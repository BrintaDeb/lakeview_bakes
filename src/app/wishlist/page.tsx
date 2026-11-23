"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/common/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-black text-espresso">
            Your Wishlist ({wishlist.length})
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Artisanal treats and celebration cakes saved for your upcoming gatherings.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 text-center space-y-4 max-w-md mx-auto">
            <Heart className="w-12 h-12 text-stone-300 mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-espresso">No saved creations yet</h2>
            <p className="text-xs text-stone-500">
              Browse our handcrafted cakes and tap the heart icon to save your favorites.
            </p>
            <Link
              href="/collections/cake"
              className="inline-flex items-center gap-2 bg-caramel text-white text-xs font-bold px-6 py-3 rounded-full"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
