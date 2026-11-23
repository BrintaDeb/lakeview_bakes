"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { TiltCard } from "@/components/ui/TiltCard";
import { haptics } from "@/lib/haptics";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const [selectedSize, setSelectedSize] = useState<string>("1 kg");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    haptics.medium();
    addToCart(product, undefined, 1, { size: selectedSize, eggless: isEggless });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <TiltCard
      maxTilt={5}
      className="glass-card rounded-2xl overflow-hidden flex flex-col group relative border border-white/60 shadow-md hover:shadow-2xl transition-shadow"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        <Link href={`/products/${product.handle}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Dietary / Bestseller Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/90 backdrop-blur-md text-espresso shadow-sm border border-white/40">
            {isEggless ? "🟢 100% Eggless" : "🟡 Contains Egg"}
          </span>
        </div>

        {/* Action Overlays (Wishlist + Quickview) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFavorited
                ? "bg-[#D51919] text-white"
                : "bg-white/80 hover:bg-white text-espresso hover:text-[#D51919]"
            }`}
            aria-label="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
          </button>

          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-espresso hover:text-caramel backdrop-blur-md transition-all shadow-sm opacity-0 group-hover:opacity-100 duration-200"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-caramel">
            {product.product_type}
          </span>
          <Link href={`/products/${product.handle}`}>
            <h3 className="font-serif text-lg font-bold text-espresso hover:text-caramel transition-colors line-clamp-1 mt-0.5">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Customization Selectors (Size & Eggless) */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Weight:</span>
            <div className="flex gap-1.5">
              {["500g", "1 kg", "2 kg"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                    selectedSize === size
                      ? "bg-espresso text-white"
                      : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-500 font-medium">Dietary:</span>
            <button
              type="button"
              onClick={() => setIsEggless(!isEggless)}
              className="text-[11px] font-semibold text-espresso/80 hover:text-caramel underline decoration-dotted"
            >
              {isEggless ? "Eggless (Default)" : "Contains Egg"}
            </button>
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <div>
            <span className="text-xs text-stone-400 block font-medium">Price</span>
            <span className="text-base sm:text-lg font-bold text-espresso">
              {formatPrice(
                selectedSize === "500g"
                  ? Math.round(product.price_min * 0.6)
                  : selectedSize === "2 kg"
                  ? Math.round(product.price_min * 1.9)
                  : product.price_min
              )}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
              addedAnimation
                ? "bg-emerald-600 text-white"
                : "bg-caramel hover:bg-caramel-hover text-white hover:shadow-md"
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </TiltCard>
  );
};
