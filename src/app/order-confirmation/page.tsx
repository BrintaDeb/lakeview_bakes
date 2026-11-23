"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Phone,
  Cake,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatPrice } from "@/lib/utils";
import { BRAND_INFO } from "@/data/brand";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || `ORD-${Date.now()}`;

  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C68B59", "#2D3594", "#D4AF37", "#FCEEE9"],
      });
    } catch (e) {
      // fallback
    }

    try {
      const savedOrders = JSON.parse(localStorage.getItem("lakeview_orders") || "[]");
      const found = savedOrders.find((o: any) => o.id === orderId);
      if (found) {
        setOrder(found);
      }
    } catch (e) {
      console.error(e);
    }
  }, [orderId]);

  return (
    <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-white/90 shadow-2xl space-y-5">
      <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-scale">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
          Payment Verified & Order Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-espresso">
          Thank You for Celebrating with Lakeview!
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto pt-1">
          Your order <strong className="text-espresso font-mono">{orderId}</strong> has been
          received by our master bakers. We are preparing your fresh treats right now.
        </p>
      </div>

      {/* Stepper Status */}
      <div className="pt-6 pb-2 border-t border-b border-stone-200/60">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          <div className="space-y-1 text-emerald-700 font-bold">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto text-xs">
              ✓
            </div>
            <span>Order Placed</span>
          </div>
          <div className="space-y-1 text-espresso font-semibold">
            <div className="w-7 h-7 rounded-full bg-caramel text-white flex items-center justify-center mx-auto text-xs animate-pulse">
              2
            </div>
            <span>Baking</span>
          </div>
          <div className="space-y-1 text-stone-400 font-medium">
            <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto text-xs">
              3
            </div>
            <span>Quality Pack</span>
          </div>
          <div className="space-y-1 text-stone-400 font-medium">
            <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-600 flex items-center justify-center mx-auto text-xs">
              4
            </div>
            <span>Delivered</span>
          </div>
        </div>
      </div>

      {/* Order Details Preview */}
      {order && (
        <div className="text-left space-y-3 pt-2 text-xs text-stone-600 bg-white/60 p-5 rounded-2xl border border-stone-200">
          {order.isDriveIn && (
            <div className="bg-amber-100/80 border border-amber-300 rounded-xl p-3.5 space-y-1 mb-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <span>🚗</span>
                <span>Midnight Drive-In Car-Hop Active</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Pickup Parlour: <strong>{order.pickupOutletName || "MG Road Flagship"}</strong><br />
                Vehicle: <strong>{order.vehicleMakeModel}</strong> • Plate: <strong className="font-mono">{order.vehiclePlateNumber}</strong><br />
                Arrival Window: <strong>{order.deliveryTimeSlot}</strong>
              </p>
              <p className="text-[10px] text-stone-500 pt-1">
                When you arrive outside, turn on hazard lights or ring <strong>9663812036</strong>. Our attendant will bring your boxed treats to your window.
              </p>
            </div>
          )}

          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="font-semibold text-espresso">
              {order.isDriveIn ? "Pickup Parlour:" : "Delivery To:"}
            </span>
            <span className="text-right max-w-xs">{order.address}</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="font-semibold text-espresso">Scheduled Window:</span>
            <span>{order.deliveryDate} ({order.deliveryTimeSlot})</span>
          </div>
          <div className="flex justify-between border-b border-stone-200 pb-2">
            <span className="font-semibold text-espresso">Total Amount Paid:</span>
            <span className="font-serif text-base font-black text-caramel">{formatPrice(order.total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-espresso">Payment Method:</span>
            <span className="text-emerald-700 font-bold">Razorpay (Verified Signature)</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`/track/${orderId}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95"
        >
          <Clock className="w-4 h-4 text-amber-300" />
          <span>Live ETA Countdown &amp; Tracking</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/account"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-cream-100 text-espresso text-xs font-bold px-7 py-3.5 rounded-full transition-all border border-stone-300 shadow-sm"
        >
          <span>Patron Account</span>
        </Link>

        <Link
          href="/menu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel hover:bg-white text-stone-600 text-xs font-bold px-6 py-3.5 rounded-full transition-all border border-stone-300"
        >
          <span>Explore Menu</span>
        </Link>
      </div>

      <div className="pt-2 text-[11px] text-stone-500">
        Need urgent assistance? Call our Central Delivery Line:{" "}
        <a href={`tel:${BRAND_INFO.centralOrderPhone}`} className="text-lakeview-blue font-bold">
          {BRAND_INFO.centralOrderPhone}
        </a>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="py-16 bg-cream-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Suspense
          fallback={
            <div className="glass-panel rounded-3xl p-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-caramel border-t-transparent animate-spin mx-auto" />
              <p className="text-sm font-semibold text-espresso">Loading your order confirmation...</p>
            </div>
          }
        >
          <OrderConfirmationContent />
        </Suspense>
      </div>
    </div>
  );
}
