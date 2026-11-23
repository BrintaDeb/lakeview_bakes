"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  MessageCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { haptics } from "@/lib/haptics";

const CELEBRATION_ADDONS = [
  {
    id: "addon-candles",
    title: "Gold Sparkle Candles (Set of 12)",
    price: 99,
    image: "/assets/promotions/category-dessert.png",
    type: "Party Accessory",
  },
  {
    id: "addon-knife",
    title: "Artisan Cake Knife & Server Set",
    price: 149,
    image: "/assets/promotions/collection-artisanal.jpg",
    type: "Serving Set",
  },
  {
    id: "addon-topper",
    title: "Sparkling Celebration Topper",
    price: 199,
    image: "/assets/promotions/collection-celebrations.jpg",
    type: "Topper",
  },
  {
    id: "addon-card",
    title: "Calligraphy Greeting Card",
    price: 49,
    image: "/assets/banners/quote-desktop.png",
    type: "Card",
  },
];

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    addToCart,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliverySlot, setDeliverySlot] = useState("Afternoon (1:00 PM – 5:00 PM)");

  React.useEffect(() => {
    if (!isCartOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 999;
  const progress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const getWhatsAppCartUrl = () => {
    const itemsList = cart
      .map(
        (item, i) =>
          `${i + 1}. *${item.title}* (${item.size || "1 kg"}, ${item.eggless ? "Eggless" : "Regular"}) x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const message = `🎂 *Lakeview Milk Bar — New Order Request* 🎂\n\nHello Lakeview! I would like to place an order directly via WhatsApp:\n\n${itemsList}\n\n----------------------------\n*Subtotal:* ${formatPrice(subtotal)}\n*Delivery:* ${deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}\n*Total:* ${formatPrice(total)}\n----------------------------\n\nPlease confirm availability and send your UPI / payment details. Thank you!`;

    return `https://wa.me/919663812036?text=${encodeURIComponent(message)}`;
  };

  const handleAddAddon = (addon: (typeof CELEBRATION_ADDONS)[0]) => {
    haptics.medium();
    const addonProduct = {
      id: addon.id,
      handle: addon.id,
      title: addon.title,
      product_type: addon.type,
      image: addon.image,
      description: addon.title,
      options: [],
      variants: [
        {
          id: `var-${addon.id}`,
          title: "Standard",
          price: addon.price,
          available: true,
        },
      ],
      price_min: addon.price,
      price_max: addon.price,
    };
    addToCart(addonProduct as any, addonProduct.variants[0], 1);
  };

  return (
    <div className="fixed inset-0 z-[10001] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-espresso/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel flex flex-col shadow-2xl border-l border-white/60 animate-in slide-in-from-right duration-300 bg-white/95 backdrop-blur-2xl">
          {/* Header */}
          <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-caramel" />
              <h2 className="font-serif text-xl font-bold text-espresso">
                Your Fresh Basket
              </h2>
              <span className="text-xs bg-stone-100 text-espresso font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-stone-400 hover:text-espresso rounded-full hover:bg-stone-100 transition-all"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Dynamic Progress Meter */}
          <div className="px-6 py-3 bg-cream-50 border-b border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-stone-600">
                {subtotal >= freeDeliveryThreshold
                  ? "🎉 Free Priority Delivery Unlocked!"
                  : `Add ₹${freeDeliveryThreshold - subtotal} more for Free Delivery`}
              </span>
              <span className="font-mono text-[10px] text-caramel font-bold">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-caramel transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mx-auto text-caramel">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-espresso">
                  Your basket is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Treat yourself to Bangalore’s most iconic sundaes, celebration cakes, and fresh bakes.
                </p>
                <Link
                  href="/collections/cake"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-sm"
                >
                  <span>Explore Bestselling Cakes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card p-3.5 rounded-2xl flex gap-3.5 border border-white/80 shadow-sm"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-sm font-bold text-espresso truncate">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-[#D51919] p-0.5 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                          <span className="bg-stone-100 px-1.5 py-0.5 rounded font-medium">
                            {item.size || "1 kg"}
                          </span>
                          <span>•</span>
                          <span
                            className={
                              item.eggless
                                ? "text-emerald-700 font-medium"
                                : "text-amber-700 font-medium"
                            }
                          >
                            {item.eggless ? "🟢 Eggless" : "🟡 Traditional"}
                          </span>
                        </div>
                        {item.messageOnCake && (
                          <p className="text-[10px] text-caramel italic truncate mt-0.5 font-serif">
                            &quot;{item.messageOnCake}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 bg-white/90 border border-stone-200 rounded-lg px-2 py-0.5">
                          <button
                            onClick={() => {
                              haptics.selection();
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="text-stone-500 hover:text-espresso p-0.5 font-bold"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-espresso w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              haptics.selection();
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className="text-stone-500 hover:text-espresso p-0.5 font-bold"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-espresso font-serif">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Celebration Add-Ons Cross-Sell Carousel */}
                <div className="pt-4 border-t border-stone-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-caramel flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" />
                      <span>Party Add-Ons &amp; Accessories</span>
                    </span>
                  </div>

                  <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                    {CELEBRATION_ADDONS.map((addon) => (
                      <div
                        key={addon.id}
                        className="shrink-0 w-36 glass-card p-2.5 rounded-xl border border-white/80 flex flex-col justify-between space-y-1.5"
                      >
                        <span className="text-[11px] font-bold text-espresso line-clamp-1">
                          {addon.title}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-caramel">
                            ₹{addon.price}
                          </span>
                          <button
                            onClick={() => handleAddAddon(addon)}
                            className="text-[10px] font-bold bg-espresso hover:bg-caramel text-white px-2 py-1 rounded-full transition-all"
                          >
                            + Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200/60 bg-white/60 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Bangalore Delivery</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <strong className="text-emerald-700">FREE</strong>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>
                <div className="bg-amber-100/60 border border-amber-200/80 rounded-xl p-2.5 flex items-center justify-between text-[11px] text-amber-950">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <span>🚗</span>
                    <span>Midnight Drive-In Car-Hop Available</span>
                  </span>
                  <span className="font-bold text-amber-800">Free Pickup</span>
                </div>

                <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-caramel font-serif text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md hover:shadow-xl"
                >
                  <span>Proceed to Razorpay Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getWhatsAppCartUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Order via WhatsApp (+91 9663812036)</span>
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>UPI, GPay, Cards, Netbanking • 100% Encrypted</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
