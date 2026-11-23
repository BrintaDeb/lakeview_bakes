"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal, deliveryFee, total, totalItems } = useCart();

  return (
    <div className="pt-28 sm:pt-36 pb-16 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-espresso">
              Shopping Basket ({totalItems})
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Review your artisanal cakes and confectionery before checkout.
            </p>
          </div>
          <Link
            href="/collections/cake"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-espresso hover:text-caramel transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="glass-panel rounded-3xl p-16 text-center space-y-5 max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-caramel">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-espresso">
              Your Basket is Currently Empty
            </h2>
            <p className="text-sm text-stone-500">
              Explore our freshly baked artisanal cakes, cheesecakes, and heritage bakes.
            </p>
            <Link
              href="/collections/cake"
              className="inline-flex items-center gap-2 bg-caramel hover:bg-caramel-hover text-white text-xs font-bold px-8 py-3.5 rounded-full shadow-md"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 border border-white/80 shadow-sm flex flex-col sm:flex-row gap-5 items-center justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-espresso">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                        <span className="font-medium bg-stone-100 px-2 py-0.5 rounded">
                          {item.size || "1 kg"}
                        </span>
                        <span>•</span>
                        <span className={item.eggless ? "text-emerald-700 font-semibold" : "text-amber-700 font-semibold"}>
                          {item.eggless ? "100% Eggless" : "With Egg"}
                        </span>
                      </div>
                      {item.messageOnCake && (
                        <p className="text-xs text-caramel italic mt-1 truncate max-w-xs">
                          &quot;{item.messageOnCake}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                    <div className="flex items-center gap-2 bg-white/80 border border-stone-200 rounded-lg px-2.5 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-stone-500 hover:text-espresso p-0.5"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-espresso w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-stone-500 hover:text-espresso p-0.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-base font-serif font-black text-espresso min-w-[80px] text-right">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-[#D51919] p-1.5 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-xl space-y-6">
              <h2 className="font-serif text-xl font-bold text-espresso">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-espresso">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(deliveryFee)}</span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-xs text-caramel">
                    Add ₹{1500 - subtotal} more to qualify for Free Delivery across Bengaluru!
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold text-espresso pt-4 border-t border-stone-200">
                  <span>Estimated Total</span>
                  <span className="font-serif text-2xl text-caramel">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white py-4 rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-xl"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-stone-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Encrypted & Verified Razorpay Payment</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
