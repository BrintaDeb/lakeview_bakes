"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Clock,
  CheckCircle2,
  Car,
  Truck,
  MapPin,
  Phone,
  MessageCircle,
  Package,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { haptics } from "@/lib/haptics";

const STAGES = [
  { key: "Order Received", label: "Order Received", desc: "Kitchen received your custom order & message" },
  { key: "Baking in Progress", label: "Baking & Hand-Icing", desc: "Cake sponge baked & fresh buttercream piped" },
  { key: "Quality Packed", label: "Quality Pack & Chilled", desc: "Boxed in golden ribbon & chilled for dispatch" },
  { key: "Out for Delivery", label: "Express Dispatch / Car-Hop", desc: "Rider on the way / Ready at Car-Hop window" },
  { key: "Delivered", label: "Delivered & Celebrated", desc: "Order delivered. Sweet memories unlocked!" },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = (params?.orderId as string) || "";
  const { addToCart, setIsCartOpen } = useCart();

  const [order, setOrder] = useState<Order | null>(null);
  const [tracking, setTracking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  const fetchTracking = async () => {
    if (!orderId) return;
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
        setTracking(data.tracking);
        setSecondsLeft(data.tracking?.remainingSeconds || 0);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTracking();
    const interval = setInterval(fetchTracking, 15000); // Poll tracking every 15s
    return () => clearInterval(interval);
  }, [orderId]);

  // Client-side live 1-second countdown ticker
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const ticker = setInterval(() => {
      setSecondsLeft((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(ticker);
  }, [secondsLeft]);

  const formatCountdown = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours.toString().padStart(2, "0")}h : ${mins
      .toString()
      .padStart(2, "0")}m : ${secs.toString().padStart(2, "0")}s`;
  };

  const currentStageIndex = STAGES.findIndex(
    (s) => s.key === (order?.orderStatus || "Order Received")
  );

  const handleReorder = () => {
    if (!order?.items) return;
    haptics.medium();
    order.items.forEach((item) => {
      const dummyProd: any = {
        id: item.productId || item.id,
        handle: String(item.productId || item.id),
        title: item.title,
        product_type: "Confectionery",
        image: item.image,
        description: item.title,
        options: [],
        variants: [{ id: item.variantId || "var-1", title: item.variantTitle || "Standard", price: item.price, available: true }],
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

  if (loading) {
    return (
      <div className="pt-36 pb-20 bg-cream-50 min-h-screen text-center">
        <div className="max-w-md mx-auto glass-panel p-12 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-caramel border-t-transparent animate-spin mx-auto" />
          <h2 className="font-serif text-xl font-bold text-espresso">Locating Your Order...</h2>
          <p className="text-xs text-stone-500 font-mono">{orderId}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="pt-36 pb-20 bg-cream-50 min-h-screen text-center">
        <div className="max-w-md mx-auto glass-panel p-10 rounded-3xl space-y-4">
          <Package className="w-12 h-12 text-stone-300 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-espresso">Order Not Found</h2>
          <p className="text-xs text-stone-500">
            We couldn&apos;t find an active order with reference <strong>{orderId}</strong>.
          </p>
          <Link
            href="/account"
            className="inline-block bg-caramel text-white text-xs font-bold px-6 py-3 rounded-full"
          >
            Check Account Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Card with Real-Time Countdown */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/90 shadow-xl space-y-6 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/15 text-caramel text-xs font-bold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Live Kitchen Telemetry</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl font-black text-espresso">
                Order Tracking: {order.orderNumber}
              </h1>
              <p className="text-xs text-stone-500 font-mono mt-0.5">
                Placed on {order.date} • Patron: {order.customerName}
              </p>
            </div>

            {/* Live Countdown Display Box */}
            <div className="p-4 rounded-2xl bg-espresso text-cream-100 text-center shadow-lg sm:min-w-[220px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 block">
                {order.orderStatus === "Delivered" ? "Order Completed" : "Estimated Arrival in"}
              </span>
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-200 tracking-tight mt-0.5">
                {order.orderStatus === "Delivered" ? "00:00:00" : formatCountdown(secondsLeft)}
              </div>
              <span className="text-[10px] text-stone-300 block pt-0.5 font-medium">
                {order.isDriveIn ? "🚗 Car-Hop Window Ready" : "🛵 Priority Doorstep Dispatch"}
              </span>
            </div>
          </div>

          {/* 5-Stage Visual Progression Stepper */}
          <div className="py-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {STAGES.map((stg, i) => {
                const isCompleted = i <= currentStageIndex;
                const isCurrent = i === currentStageIndex;

                return (
                  <div
                    key={stg.key}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isCurrent
                        ? "bg-caramel/10 border-caramel shadow-sm"
                        : isCompleted
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-stone-50/70 border-stone-200/60 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isCurrent
                            ? "bg-caramel text-white animate-pulse"
                            : "bg-stone-200 text-stone-500"
                        }`}
                      >
                        {isCompleted && !isCurrent ? "✓" : i + 1}
                      </div>
                      <span className="text-xs font-bold text-espresso truncate">
                        {stg.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-stone-500 leading-tight">
                      {stg.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Direct Actions: Call Parlour & WhatsApp Hotline */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200/80">
            <div className="flex items-center gap-3">
              <a
                href="tel:+919663812036"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-espresso text-xs font-bold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-caramel" />
                <span>Call Kitchen (+91 9663812036)</span>
              </a>

              <a
                href={`https://wa.me/919663812036?text=Hello%20Lakeview!%20I%20am%20inquiring%20about%20my%20live%20order%20*${order.orderNumber}*`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] text-xs font-bold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Live Chat</span>
              </a>
            </div>

            <button
              onClick={handleReorder}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-espresso hover:bg-caramel text-white text-xs font-bold transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reorder This Exact Basket</span>
            </button>
          </div>
        </div>

        {/* Two-Column Details Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Items in Order */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-md space-y-4">
            <h2 className="font-serif text-xl font-bold text-espresso border-b border-stone-200/60 pb-3">
              Items Ordered ({order.items.length})
            </h2>

            <div className="space-y-3">
              {order.items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/70 border border-stone-100 shadow-xs"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                    <Image src={it.image} alt={it.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-espresso truncate">
                      {it.title}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      {it.size || "1 kg"} • {it.eggless ? "🟢 Eggless" : "🟡 Traditional"} (x{it.quantity})
                    </p>
                    {it.messageOnCake && (
                      <p className="text-[10px] text-caramel italic truncate mt-0.5">
                        Piped: &quot;{it.messageOnCake}&quot;
                      </p>
                    )}
                  </div>

                  <span className="font-serif text-sm font-bold text-espresso">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="pt-3 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-espresso">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{order.deliveryFee === 0 ? "FREE" : formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-espresso pt-2 border-t border-stone-200 font-serif">
                <span>Total Amount Paid</span>
                <span className="text-caramel text-xl">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch & Pickup Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/80 shadow-md space-y-4">
              <h2 className="font-serif text-xl font-bold text-espresso border-b border-stone-200/60 pb-3">
                {order.isDriveIn ? "🚗 Car-Hop Pickup Details" : "🛵 Doorstep Delivery Details"}
              </h2>

              <div className="space-y-3 text-xs text-stone-600">
                {order.isDriveIn ? (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                      Parlour Bay
                    </span>
                    <p className="font-bold text-espresso text-sm">
                      {order.pickupOutletName || "MG Road Flagship"}
                    </p>
                    <p className="text-[11px] text-stone-600">
                      Vehicle: <strong>{order.vehicleMakeModel || "Customer Car"}</strong> • Plate: <strong className="font-mono">{order.vehiclePlateNumber || "N/A"}</strong>
                    </p>
                    <p className="text-[10px] text-amber-900/80 pt-1">
                      Pull up outside the parlour and flash hazard lights or call 9663812036. Our attendant will deliver boxed treats to your window.
                    </p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-stone-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                      Delivery Address
                    </span>
                    <p className="font-bold text-espresso">{order.address}</p>
                    <p className="text-[11px] text-stone-500">PIN Code: {order.postalCode}</p>
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-white border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Customer Contact
                  </span>
                  <p className="font-bold text-espresso">{order.customerName}</p>
                  <p className="font-mono text-[11px] text-stone-600">+91 {order.phone}</p>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-stone-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Payment Status
                  </span>
                  <p className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Paid via {order.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <Link
                href="/account"
                className="w-full inline-flex items-center justify-center gap-2 bg-espresso hover:bg-caramel text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                <span>View All Orders in Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
