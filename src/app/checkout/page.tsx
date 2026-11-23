"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Car,
  Truck,
  MapPin,
  Clock,
  Sparkles,
  MessageCircle,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { OUTLETS } from "@/data/brand";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";

// Dynamic Razorpay Script Loader
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, deliveryFee, total, clearCart } = useCart();
  const { user, refreshOrders } = useAuth();

  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "drive-in">("delivery");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    address: "",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "",
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    deliverySlot: "Afternoon (12:00 PM – 4:00 PM)",
    deliveryInstructions: "",
    orderNotes: "",
  });

  const [driveInData, setDriveInData] = useState({
    outletId: "mg-road",
    vehicleModel: "",
    vehiclePlate: "",
    timeSlot: "Tonight (9:00 PM – 10:30 PM)",
  });

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Pre-load Razorpay script on mount
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    haptics.light();
    const code = couponCode.trim().toUpperCase();
    if (code === "LAKEVIEW10") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage("✓ 10% Heritage discount applied successfully!");
      sound.playSparkle();
    } else if (code === "SWEET1930") {
      const discount = Math.round(subtotal * 0.1);
      setAppliedDiscount(discount);
      setCouponMessage("✓ 10% Secret Patron voucher applied!");
      sound.playSparkle();
    } else {
      setCouponMessage("Invalid discount code. Try SWEET1930 or LAKEVIEW10");
    }
  };

  // When drive-in is selected, delivery fee is waived (0)
  const effectiveDeliveryFee = deliveryMode === "drive-in" ? 0 : deliveryFee;
  const finalPayable = Math.max(0, subtotal + effectiveDeliveryFee - appliedDiscount);

  const selectedOutletObj = OUTLETS.find((o) => o.id === driveInData.outletId) || OUTLETS[0];

  const handleWhatsAppCheckout = () => {
    haptics.medium();
    sound.playSparkle();

    const itemsList = cart
      .map(
        (item, i) =>
          `${i + 1}. *${item.title}* (${item.size || "1 kg"}, ${item.eggless ? "Eggless" : "Regular"}) x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n");

    const deliveryText =
      deliveryMode === "drive-in"
        ? `🚗 *Midnight Drive-In Car Hop @ ${selectedOutletObj.name}*\n• Vehicle: ${driveInData.vehicleModel || "To be confirmed"} (${driveInData.vehiclePlate || "N/A"})\n• Time: ${driveInData.timeSlot}`
        : `📍 *Doorstep Delivery*\n• Address: ${formData.address || "Bengaluru"}, ${formData.postalCode}\n• Slot: ${formData.deliveryDate} (${formData.deliverySlot})\n• Notes: ${formData.deliveryInstructions || "None"}`;

    const message = `🎂 *Lakeview Milk Bar — WhatsApp Order Checkout* 🎂\n\nHello Lakeview! I am submitting my order details:\n\n• Name: ${formData.name || "Customer"}\n• Phone: ${formData.phone || "Not specified"}\n• Email: ${formData.email || "N/A"}\n\n*Delivery Method:* \n${deliveryText}\n\n*Items Ordered:*\n${itemsList}\n\n----------------------------\n*Subtotal:* ${formatPrice(subtotal)}\n*Delivery Fee:* ${effectiveDeliveryFee === 0 ? "FREE" : formatPrice(effectiveDeliveryFee)}\n*Discount:* ${appliedDiscount > 0 ? `-${formatPrice(appliedDiscount)}` : "None"}\n*Final Amount:* ${formatPrice(finalPayable)}\n----------------------------\n\nPlease confirm my order and share the UPI QR / payment link. Thank you!`;

    window.open(`https://wa.me/919663812036?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Finalize Order and Save to DB & LocalStorage
  const finalizeOrder = async (
    orderId: string,
    paymentId: string,
    signature: string
  ) => {
    try {
      // 1. Verify Payment on Server
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature,
          orderDetails: {
            orderId,
            customer: formData,
            items: cart,
            total: finalPayable,
            subtotal,
            deliveryFee: effectiveDeliveryFee,
            discount: appliedDiscount,
            isDriveIn: deliveryMode === "drive-in",
            driveInDetails: deliveryMode === "drive-in" ? driveInData : null,
          },
        }),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.success) {
        sound.playSweetChime();
        haptics.success();

        // 2. Save order to LocalStorage for Account view
        const savedOrders = JSON.parse(localStorage.getItem("lakeview_orders") || "[]");
        savedOrders.unshift({
          id: orderId,
          orderNumber: orderId,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          address:
            deliveryMode === "drive-in"
              ? `Drive-In Car Hop @ ${selectedOutletObj.name}`
              : `${formData.address}, ${formData.city} - ${formData.postalCode}`,
          city: formData.city,
          postalCode: deliveryMode === "drive-in" ? "560001" : formData.postalCode,
          items: cart,
          subtotal,
          deliveryFee: effectiveDeliveryFee,
          discount: appliedDiscount,
          total: finalPayable,
          paymentMethod: "Razorpay (UPI / Cards / Netbanking)",
          paymentStatus: "paid",
          orderStatus: "Order Received",
          deliveryDate: formData.deliveryDate,
          deliveryTimeSlot:
            deliveryMode === "drive-in" ? driveInData.timeSlot : formData.deliverySlot,
          notes: formData.orderNotes,
          isDriveIn: deliveryMode === "drive-in",
          vehicleMakeModel: driveInData.vehicleModel,
          vehiclePlateNumber: driveInData.vehiclePlate,
          pickupOutletId: selectedOutletObj.id,
          pickupOutletName: selectedOutletObj.name,
        });
        localStorage.setItem("lakeview_orders", JSON.stringify(savedOrders));

        // 3. Persist Order to Backend Database API
        try {
          await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId,
              customer: formData,
              items: cart,
              total: finalPayable,
              subtotal,
              deliveryFee: effectiveDeliveryFee,
              discount: appliedDiscount,
              isDriveIn: deliveryMode === "drive-in",
              driveInDetails:
                deliveryMode === "drive-in"
                  ? {
                      ...driveInData,
                      outletName: selectedOutletObj.name,
                    }
                  : null,
              paymentMethod: "Razorpay (Online Payment)",
            }),
          });
          refreshOrders();
        } catch (dbErr) {
          console.error("Database sync error:", dbErr);
        }

        // 4. Clear cart & redirect to live order tracker
        clearCart();
        router.push(`/track/${orderId}`);
      } else {
        setPaymentError("Payment verification failed. Please check credentials or retry.");
        setIsProcessing(false);
      }
    } catch (err: any) {
      setPaymentError(err.message || "An error occurred while verifying your payment.");
      setIsProcessing(false);
    }
  };

  const handleProceedPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError(null);

    if (!formData.name.trim() || !formData.phone.trim()) {
      setPaymentError("Please provide your name and contact mobile number.");
      return;
    }

    if (deliveryMode === "delivery") {
      if (!formData.address.trim() || !formData.postalCode.trim()) {
        setPaymentError("Please fill in your delivery address and Bengaluru PIN code.");
        return;
      }
    } else {
      if (!driveInData.vehicleModel.trim() || !driveInData.vehiclePlate.trim()) {
        setPaymentError("Please provide your Vehicle Make/Model and Number Plate for car-hop service.");
        return;
      }
    }

    setIsProcessing(true);
    haptics.medium();

    try {
      // 1. Create order on backend Razorpay API
      const res = await fetch("/api/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalPayable,
          customer: {
            ...formData,
            deliveryMode,
            driveIn: deliveryMode === "drive-in" ? driveInData : null,
          },
          items: cart,
        }),
      });

      const orderData = await res.json();
      const orderId = orderData.orderId || `ORD-LAKEVIEW-${Date.now()}`;

      // 2. Load and launch Razorpay Checkout Modal
      const scriptLoaded = await loadRazorpayScript();

      if (scriptLoaded && typeof (window as any).Razorpay !== "undefined") {
        const options = {
          key: orderData.key || "rzp_test_LakeviewDemo1930",
          amount: orderData.amount || Math.round(finalPayable * 100),
          currency: orderData.currency || "INR",
          name: "Lakeview Milk Bar",
          description: `Bengaluru Heritage Bakes · Order #${orderId}`,
          image: "/assets/logo/favicon.png",
          order_id:
            orderData.orderId && orderData.orderId.startsWith("order_")
              ? orderData.orderId
              : undefined,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.phone,
          },
          notes: {
            address: formData.address,
            deliveryMode,
            deliveryDate: formData.deliveryDate,
          },
          theme: {
            color: "#147c98",
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
            },
          },
          handler: async function (response: any) {
            await finalizeOrder(
              orderId,
              response.razorpay_payment_id || `pay_${Date.now()}`,
              response.razorpay_signature || "verified_signature"
            );
          },
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.on("payment.failed", function (response: any) {
          setIsProcessing(false);
          setPaymentError(
            response.error?.description || "Payment failed. Please retry or choose WhatsApp checkout."
          );
        });
        rzp.open();
      } else {
        // Graceful sandbox fallback if script is blocked by browser ad-blocker
        await finalizeOrder(
          orderId,
          `pay_test_${Date.now()}`,
          "verified_signature"
        );
      }
    } catch (err: any) {
      setPaymentError(err.message || "An error occurred during payment processing.");
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 sm:pt-40 pb-20 bg-cream-50 min-h-screen text-center px-4">
        <div className="max-w-md mx-auto glass-panel p-8 sm:p-10 rounded-3xl space-y-5 border border-stone-200/80 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-caramel/15 text-caramel flex items-center justify-center mx-auto text-2xl">
            🛍️
          </div>
          <h2 className="font-serif text-2xl font-bold text-espresso">Your basket is empty</h2>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed font-sans">
            Explore our artisanal cakes, bakes, and heritage sundaes to place an order.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-espresso hover:bg-caramel text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Complete Menu</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-36 pb-36 sm:pb-24 bg-cream-50 min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/cart" className="hover:text-caramel flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Basket</span>
          </Link>
          <span>/</span>
          <span className="text-espresso font-semibold">Secure Checkout</span>
        </div>

        {/* Header & Delivery Method Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-4xl font-black text-espresso tracking-tight">
              Checkout &amp; Payment
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-sans mt-0.5">
              Encrypted Razorpay Gateway · Official Lakeview Milk Bar Bengaluru
            </p>
          </div>

          {/* Delivery Mode Toggle Pill (Mobile & Desktop Responsive) */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl sm:rounded-full glass-card border border-stone-200/90 shadow-sm w-full md:w-auto">
            <button
              type="button"
              onClick={() => {
                setDeliveryMode("delivery");
                sound.playBubblePop();
                haptics.light();
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl sm:rounded-full text-xs font-bold transition-all ${
                deliveryMode === "delivery"
                  ? "bg-espresso text-white shadow-md"
                  : "text-stone-600 hover:text-espresso"
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Doorstep Delivery</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setDeliveryMode("drive-in");
                sound.playBubblePop();
                haptics.light();
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl sm:rounded-full text-xs font-bold transition-all ${
                deliveryMode === "drive-in"
                  ? "bg-espresso text-white shadow-md"
                  : "text-stone-600 hover:text-espresso"
              }`}
            >
              <Car className="w-3.5 h-3.5 text-amber-300" />
              <span>Car-Hop Drive-In</span>
            </button>
          </div>
        </div>

        {paymentError && (
          <div className="p-4 rounded-2xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{paymentError}</span>
            </div>
            <button
              type="button"
              onClick={() => setPaymentError(null)}
              className="text-stone-400 hover:text-espresso text-xs font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        <form
          onSubmit={handleProceedPayment}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* LEFT COLUMN: CONTACT & DISPATCH ADDRESS DETAILS */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-5 sm:p-8 md:p-10 border border-white/90 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-stone-200/60 pb-3">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-espresso">
                {deliveryMode === "drive-in"
                  ? "1. Drive-In Pickup & Vehicle Details"
                  : "1. Doorstep Delivery & Contact Details"}
              </h2>
              {deliveryMode === "drive-in" && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  🚗 Zero Delivery Fee
                </span>
              )}
            </div>

            {/* Common Contact Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                  Mobile Number (For OTP / Delivery) *
                </label>
                <input
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="e.g. 9663812036"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Email Address (For Invoice &amp; Digital Slip) *
              </label>
              <input
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white"
              />
            </div>

            {/* BRANCH A: DRIVE-IN CAR-HOP FORM */}
            {deliveryMode === "drive-in" ? (
              <div className="space-y-5 pt-3 border-t border-stone-200/60">
                {/* Protocol Info Banner */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <Sparkles className="w-4 h-4 text-caramel" />
                    <span>Lakeview Midnight Car-Hop Protocol</span>
                  </div>
                  <p className="text-[11px] text-amber-950/80 leading-relaxed font-sans">
                    Pull up outside your chosen parlour and flash your hazard lights, or call our
                    counter at <strong>9663812036</strong>. Our attendant will bring your chilled,
                    boxed cake and sundae directly to your car window!
                  </p>
                </div>

                {/* Outlet Picker */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                    Select Pickup Parlour *
                  </label>
                  <select
                    value={driveInData.outletId}
                    onChange={(e) => setDriveInData({ ...driveInData, outletId: e.target.value })}
                    className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                  >
                    {OUTLETS.map((outlet) => (
                      <option key={outlet.id} value={outlet.id}>
                        {outlet.name} — {outlet.address.split(",")[0]}
                      </option>
                    ))}
                  </select>
                  <span className="text-[10px] text-stone-500 block pt-0.5">
                    📍 {selectedOutletObj.address}
                  </span>
                </div>

                {/* Vehicle Make/Model & Plate Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Vehicle Make &amp; Color *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Silver Honda City / White Thar"
                      value={driveInData.vehicleModel}
                      onChange={(e) =>
                        setDriveInData({ ...driveInData, vehicleModel: e.target.value })
                      }
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Vehicle Registration Plate *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. KA 01 MG 1930"
                      value={driveInData.vehiclePlate}
                      onChange={(e) =>
                        setDriveInData({ ...driveInData, vehiclePlate: e.target.value })
                      }
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white uppercase font-mono"
                    />
                  </div>
                </div>

                {/* Arriving Time Window */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Estimated Arrival Window *
                    </label>
                    <select
                      value={driveInData.timeSlot}
                      onChange={(e) =>
                        setDriveInData({ ...driveInData, timeSlot: e.target.value })
                      }
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                    >
                      <option>Evening (7:00 PM – 8:30 PM)</option>
                      <option>Night (8:30 PM – 10:00 PM)</option>
                      <option>Late Night Drive-In (10:00 PM – 11:30 PM)</option>
                      <option>Midnight Drive-In (11:30 PM – 1:00 AM)</option>
                      <option>Tomorrow Daytime (12:00 PM – 4:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              /* BRANCH B: STANDARD DOORSTEP DELIVERY */
              <div className="space-y-5 pt-3 border-t border-stone-200/60">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                    Complete Delivery Address (House/Flat No, Landmark, Area) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    autoComplete="street-address"
                    placeholder="e.g., Flat 402, Prestige Palms, 100ft Road, Indiranagar"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="glass-input w-full p-3.5 rounded-xl text-xs sm:text-sm text-espresso bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      readOnly
                      className="glass-input w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-stone-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      readOnly
                      className="glass-input w-full px-3 py-2.5 rounded-xl text-xs font-semibold bg-stone-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      autoComplete="postal-code"
                      placeholder="560001"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="glass-input w-full px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-200/60">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Preferred Delivery Date *
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.deliveryDate}
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                      Delivery Time Window
                    </label>
                    <select
                      value={formData.deliverySlot}
                      onChange={(e) => setFormData({ ...formData, deliverySlot: e.target.value })}
                      className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold bg-white"
                    >
                      <option>Morning (9:00 AM – 12:00 PM)</option>
                      <option>Afternoon (12:00 PM – 4:00 PM)</option>
                      <option>Evening (4:00 PM – 8:00 PM)</option>
                      <option>Late Night (8:00 PM – 11:30 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                    Special Delivery Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Leave with security guard, call upon arrival"
                    value={formData.deliveryInstructions}
                    onChange={(e) =>
                      setFormData({ ...formData, deliveryInstructions: e.target.value })
                    }
                    className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm text-espresso bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: ORDER REVIEW, COUPON & RAZORPAY TRIGGER */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-5 sm:p-7 md:p-8 border border-white/90 shadow-xl space-y-6">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-espresso border-b border-stone-200/60 pb-3 flex items-center justify-between">
                <span>2. Order Summary</span>
                <span className="text-xs font-sans text-stone-500 font-semibold">
                  {cart.length} item{cart.length > 1 ? "s" : ""}
                </span>
              </h2>

              {/* Items Preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-stone-100 border border-stone-200/60">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-espresso truncate">{item.title}</h4>
                      <p className="text-[11px] text-stone-500">
                        {item.size} • {item.eggless ? "Eggless" : "Regular"} (x{item.quantity})
                      </p>
                    </div>
                    <span className="font-bold text-espresso">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div className="space-y-1 pt-2 border-t border-stone-200/60">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (SWEET1930)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="glass-input flex-1 px-3 py-2.5 rounded-xl text-xs uppercase font-mono bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-espresso text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-caramel transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className="text-[11px] font-medium text-caramel pt-1">{couponMessage}</p>
                )}
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-espresso">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>
                    {deliveryMode === "drive-in"
                      ? "Midnight Drive-In Car Hop"
                      : "Bengaluru Delivery"}
                  </span>
                  <span className="font-semibold text-espresso">
                    {effectiveDeliveryFee === 0 ? "FREE" : formatPrice(effectiveDeliveryFee)}
                  </span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount Applied</span>
                    <span>-{formatPrice(appliedDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-serif font-black text-espresso pt-3 border-t border-stone-200">
                  <span>Total Amount</span>
                  <span className="text-caramel text-xl font-sans font-bold">{formatPrice(finalPayable)}</span>
                </div>
              </div>

              {/* Secure Payment Trigger Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#147c98] hover:bg-[#0f6278] text-white font-bold text-xs uppercase tracking-wider py-4 rounded-full transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>
                    {isProcessing
                      ? "Opening Razorpay Gateway..."
                      : `Pay ${formatPrice(finalPayable)} with Razorpay`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Or Confirm &amp; Pay via WhatsApp (+91 9663812036)</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-stone-500 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                  <span>•</span>
                  <span>UPI, Cards, GPay, NetBanking</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* MOBILE STICKY BOTTOM CHECKOUT ACTION BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-white/95 backdrop-blur-xl border-t border-stone-200 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
            Final Total
          </span>
          <span className="font-bold text-base text-espresso font-sans">
            {formatPrice(finalPayable)}
          </span>
        </div>

        <button
          onClick={handleProceedPayment}
          disabled={isProcessing}
          className="flex-1 py-3 px-4 rounded-full bg-[#147c98] hover:bg-[#0f6278] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md disabled:opacity-50 active:scale-95"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>
            {isProcessing ? "Processing..." : "Pay with Razorpay"}
          </span>
        </button>
      </div>
    </div>
  );
}
