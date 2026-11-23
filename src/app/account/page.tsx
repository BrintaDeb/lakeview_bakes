"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User,
  Package,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Phone,
  Car,
  RotateCcw,
  Sparkles,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { haptics } from "@/lib/haptics";

export default function AccountPage() {
  const { user, orders, logout, setIsAuthModalOpen } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  const handleReorder = (order: any) => {
    if (!order?.items) return;
    haptics.medium();
    order.items.forEach((item: any) => {
      const dummyProd: any = {
        id: item.productId || item.id,
        handle: String(item.productId || item.id),
        title: item.title,
        product_type: "Confectionery",
        image: item.image,
        description: item.title,
        options: [],
        variants: [
          {
            id: item.variantId || "var-1",
            title: item.variantTitle || "Standard",
            price: item.price,
            available: true,
          },
        ],
        price_min: item.price,
        price_max: item.price,
      };
      addToCart(dummyProd, dummyProd.variants[0], item.quantity, {
        size: item.size,
        eggless: item.eggless,
        messageOnCake: item.messageOnCake,
      });
    });
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/15 text-caramel text-xs font-bold uppercase tracking-widest mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lakeview Patron Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso">
              {user ? `Welcome, ${user.name}` : "Patron Account & History"}
            </h1>
            <p className="text-sm text-stone-600 mt-1">
              Live order tracking, previous cake archives, and car-hop preferences since 1930.
            </p>
          </div>

          {user ? (
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 text-xs font-bold transition-colors shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out (+91 {user.phone})</span>
            </button>
          ) : (
            <button
              onClick={() => {
                haptics.light();
                setIsAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Sign In with Phone</span>
            </button>
          )}
        </div>

        {/* NOT SIGNED IN BANNER / CARD */}
        {!user && (
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 border border-white/90 shadow-xl bg-white/90">
            <div className="w-16 h-16 rounded-full bg-caramel/15 text-caramel flex items-center justify-center mx-auto shadow-inner">
              <Phone className="w-8 h-8" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
              Sign In to View Your Cake Orders
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Enter your mobile number to view live minute-by-minute tracking, your complete order history, and saved car-hop vehicle profiles.
            </p>

            <button
              type="button"
              onClick={() => {
                haptics.medium();
                setIsAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              <span>Sign In with Mobile OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Instant 4-digit verification code • No password needed</span>
            </div>
          </div>
        )}

        {/* SIGNED IN PATRON DASHBOARD */}
        {user && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Patron Card */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 sm:p-8 border border-white/90 shadow-md space-y-6 bg-white/90">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-caramel text-white flex items-center justify-center font-serif text-2xl font-black shadow-md">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-espresso">{user.name}</h3>
                  <span className="text-xs text-stone-500 font-mono block">
                    +91 {user.phone}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded-full inline-block mt-1">
                    Verified Patron
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200/60 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Member Since</span>
                  <span className="font-bold text-espresso">{user.memberSince || "2026"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Primary Location</span>
                  <span className="font-bold text-espresso">Bengaluru, KA</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">Total Celebration Orders</span>
                  <span className="font-bold text-caramel text-sm">{orders.length}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/menu"
                  className="w-full inline-flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  <span>Explore Menu &amp; Order</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Orders List & Tracking */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-espresso">
                  Your Orders ({orders.length})
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  Live Database Synced
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="glass-panel rounded-3xl p-12 text-center space-y-3 bg-white/90">
                  <Package className="w-12 h-12 text-stone-300 mx-auto" />
                  <h3 className="font-serif text-lg font-bold text-espresso">
                    No orders linked to +91 {user.phone}
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Ready to taste Bengaluru&apos;s most iconic sundaes, celebration cakes, and fresh bakes?
                  </p>
                  <Link
                    href="/menu"
                    className="inline-block bg-caramel text-white text-xs font-bold px-6 py-2.5 rounded-full mt-2"
                  >
                    Start an Order
                  </Link>
                </div>
              ) : (
                orders.map((ord) => {
                  const isDelivered = ord.orderStatus === "Delivered";

                  return (
                    <div
                      key={ord.id}
                      className="glass-card rounded-3xl p-6 border border-white/90 shadow-md space-y-4 bg-white"
                    >
                      {/* Top Order Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-espresso">
                              {ord.orderNumber}
                            </span>
                            {ord.isDriveIn && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                                🚗 Car-Hop
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-stone-400">
                            Placed on {ord.date} • {ord.deliveryTimeSlot}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${isDelivered
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-900 animate-pulse"
                              }`}
                          >
                            ● {ord.orderStatus || "Order Received"}
                          </span>

                          <span className="font-serif text-lg font-black text-caramel">
                            {formatPrice(ord.total)}
                          </span>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="space-y-2">
                        {ord.items.map((it) => (
                          <div key={it.id} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-espresso">{it.title}</span>
                              <span className="text-stone-400">({it.size || "1 kg"})</span>
                              <span className="text-[10px] text-emerald-700 font-semibold">
                                {it.eggless ? "🟢 Eggless" : "🟡 Traditional"}
                              </span>
                              <span className="text-stone-500 font-mono">x{it.quantity}</span>
                            </div>
                            <span className="font-mono font-semibold text-stone-600">
                              {formatPrice(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Destination / Parlour Details */}
                      <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span>
                            {ord.isDriveIn
                              ? `Pickup: ${ord.pickupOutletName || "MG Road Flagship"}`
                              : `Deliver to: ${ord.address}`}
                          </span>
                        </div>

                        {/* Action Buttons: Live Track & Reorder */}
                        <div className="flex items-center gap-2 pt-1 sm:pt-0">
                          <Link
                            href={`/track/${ord.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-caramel/15 hover:bg-caramel text-caramel hover:text-white transition-all text-xs font-bold"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Live Tracking</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>

                          <button
                            onClick={() => handleReorder(ord)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-espresso text-xs font-bold transition-colors"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Reorder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
