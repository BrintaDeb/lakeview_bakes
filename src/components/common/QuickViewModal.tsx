"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, ShoppingBag, Check, ShieldCheck, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>("1 kg");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [cakeMessage, setCakeMessage] = useState<string>("");
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const calculateCurrentPrice = () => {
    if (selectedSize === "500g") return Math.round(product.price_min * 0.6);
    if (selectedSize === "2 kg") return Math.round(product.price_min * 1.9);
    return product.price_min;
  };

  const handleAddToCart = () => {
    addToCart(product, undefined, 1, {
      size: selectedSize,
      eggless: isEggless,
      messageOnCake: cakeMessage,
    });
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative glass-panel rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-white/80 animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-espresso hover:bg-stone-100 transition-all z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 backdrop-blur-md text-espresso shadow-sm">
                {isEggless ? "🟢 100% Eggless" : "🟡 Contains Egg"}
              </span>
            </div>
          </div>

          {/* Details & Controls */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-caramel">
                {product.product_type}
              </span>
              <h2 className="font-serif text-2xl font-bold text-espresso mt-1">
                {product.title}
              </h2>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Select Cake Size
              </label>
              <div className="flex gap-2">
                {["500g", "1 kg", "2 kg"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      selectedSize === size
                        ? "bg-espresso text-white border-espresso shadow-sm"
                        : "bg-white/70 text-stone-700 border-stone-200 hover:border-caramel"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Dietary Preference
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    isEggless
                      ? "bg-emerald-800 text-white border-emerald-800"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  🟢 100% Eggless
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    !isEggless
                      ? "bg-amber-800 text-white border-amber-800"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  🟡 Regular Recipe
                </button>
              </div>
            </div>

            {/* Inscription on Cake */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Message on Cake (Optional)
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy Birthday Maya!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="glass-input w-full px-3.5 py-2 text-xs rounded-xl"
              />
            </div>

            {/* Price & Action */}
            <div className="pt-2 flex items-center justify-between gap-4 border-t border-stone-200">
              <div>
                <span className="text-xs text-stone-400 block font-medium">Price</span>
                <span className="text-2xl font-serif font-bold text-espresso">
                  {formatPrice(calculateCurrentPrice())}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-1">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-all ${
                    isFavorited
                      ? "bg-[#D51919] text-white border-[#D51919]"
                      : "bg-white text-espresso border-stone-200 hover:text-[#D51919]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`} />
                </button>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm transition-all shadow-md ${
                    addedAnimation
                      ? "bg-emerald-600 text-white"
                      : "bg-caramel hover:bg-caramel-hover text-white hover:shadow-lg"
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Basket!</span>
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

            <div className="text-center pt-1">
              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 text-xs font-semibold text-espresso/70 hover:text-caramel underline decoration-dotted"
              >
                <span>View Full Product Page & Delivery Timings</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
