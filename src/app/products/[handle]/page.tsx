"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  MapPin,
  CheckCircle2,
  Users,
  AlertCircle,
  MessageCircle,
  Compass,
} from "lucide-react";
import { getProductByHandle, ALL_PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/common/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { TiltCard } from "@/components/ui/TiltCard";
import { CreamBackground } from "@/components/ui/CreamBackground";
import { CakeSlicingGuideModal } from "@/components/ui/CakeSlicingGuideModal";

const SERVING_GUIDE: Record<string, { portions: string; vibe: string }> = {
  "500g": {
    portions: "3 – 4 Portions",
    vibe: "Ideal for couples & intimate midnight celebrations",
  },
  "1 kg": {
    portions: "6 – 8 Portions",
    vibe: "The classic family birthday & dinner party size",
  },
  "2 kg": {
    portions: "12 – 16 Portions",
    vibe: "Great for grand house parties, reunions & office teams",
  },
  "3 kg": {
    portions: "20 – 25 Portions",
    vibe: "Showstopper multi-tier centerpiece for large milestones",
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const handle = (params?.handle as string) || "";

  const product = getProductByHandle(handle) || ALL_PRODUCTS[0];
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState<string>("1 kg");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [cakeMessage, setCakeMessage] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [deliveryResult, setDeliveryResult] = useState<{
    status: "express" | "standard" | "invalid" | null;
    message: string;
    hub?: string;
  }>({ status: null, message: "" });
  const [added, setAdded] = useState(false);
  const [isSlicingGuideOpen, setIsSlicingGuideOpen] = useState(false);

  const generateWhatsAppLink = () => {
    const text = encodeURIComponent(
      `Hello Lakeview Milk Bar! 🎂\n\nI would like to order:\n• *${product.title}*\n• Weight: ${selectedSize}\n• Recipe: ${isEggless ? "100% Eggless" : "Regular Traditional"}\n• Message on Cake: "${cakeMessage || "None"}"\n• Estimated Price: ${formatPrice(calculatePrice())}\n• Bengaluru Pincode: ${pincode || "560001"}\n\nPlease confirm availability and payment link. Thank you!`
    );
    return `https://wa.me/919663812036?text=${text}`;
  };

  const isFavorited = isInWishlist(product.id);

  const calculatePrice = () => {
    let base = product.price_min || 1200;
    if (selectedSize === "500g") base = Math.round(base * 0.6);
    else if (selectedSize === "2 kg") base = Math.round(base * 1.9);
    else if (selectedSize === "3 kg") base = Math.round(base * 2.8);
    return base * quantity;
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^\d{6}$/.test(cleanPin)) {
      setDeliveryResult({
        status: "invalid",
        message: "Please enter a valid 6-digit Indian postal code.",
      });
      return;
    }

    if (cleanPin === "560001" || cleanPin === "560025" || cleanPin === "560052") {
      setDeliveryResult({
        status: "express",
        message: "⚡ 45-Min Express Car Hop Delivery Available!",
        hub: "Dispatched from MG Road Flagship",
      });
    } else if (cleanPin === "560038" || cleanPin === "560008" || cleanPin === "560075") {
      setDeliveryResult({
        status: "express",
        message: "⚡ 45-Min Express Delivery Available!",
        hub: "Dispatched from Indiranagar Parlour",
      });
    } else if (cleanPin === "560043" || cleanPin === "560084" || cleanPin === "560033") {
      setDeliveryResult({
        status: "express",
        message: "⚡ 45-Min Express Delivery Available!",
        hub: "Dispatched from Kalyan Nagar Hub",
      });
    } else if (cleanPin === "560066" || cleanPin === "560048" || cleanPin === "560067") {
      setDeliveryResult({
        status: "express",
        message: "⚡ 50-Min Express Delivery Available!",
        hub: "Dispatched from Whitefield Parlour",
      });
    } else if (cleanPin.startsWith("560")) {
      setDeliveryResult({
        status: "standard",
        message: "🕒 Guaranteed Same-Day Delivery across Bengaluru before 8:00 PM.",
        hub: "Direct Parlour Delivery",
      });
    } else {
      setDeliveryResult({
        status: "standard",
        message: "📦 Standard Courier Delivery available for Dry Bakes & Cookies.",
        hub: "Bengaluru Central Kitchen",
      });
    }
  };

  const handleAddToCart = () => {
    haptics.medium();
    addToCart(product, undefined, quantity, {
      size: selectedSize,
      eggless: isEggless,
      messageOnCake: cakeMessage,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products
  const related = ALL_PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <CreamBackground className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-caramel flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/collections/cake" className="hover:text-caramel capitalize">
            {product.product_type}
          </Link>
          <span>/</span>
          <span className="text-espresso font-semibold truncate max-w-xs font-serif">
            {product.title}
          </span>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: High-Res 3D Tilt Product Showcase */}
          <div className="lg:col-span-6 space-y-4">
            <TiltCard
              maxTilt={4}
              className="relative aspect-square w-full rounded-3xl overflow-hidden glass-card p-3 border border-white/90 shadow-2xl bg-stone-100 group"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Live Piped Cake Inscription Badge if entered */}
                {cakeMessage && (
                  <div className="absolute bottom-4 left-4 right-4 bg-espresso/80 backdrop-blur-md rounded-2xl p-3 border border-amber-300/40 text-center shadow-lg">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                      Live Icing Piping Preview
                    </span>
                    <p className="font-serif italic text-base font-bold text-amber-100 mt-0.5 truncate">
                      &quot;{cakeMessage}&quot;
                    </p>
                  </div>
                )}

                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3.5 py-1 text-xs font-bold rounded-full bg-white/95 backdrop-blur-md text-espresso shadow-md border border-white/70">
                    {isEggless ? "🟢 100% Eggless Recipe" : "🟡 Contains Egg"}
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Serving portion guide pill with interactive slicing guide modal trigger */}
            <div className="glass-panel rounded-2xl p-4 border border-white/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-caramel" />
                <div>
                  <span className="text-xs font-bold text-espresso block">
                    {SERVING_GUIDE[selectedSize]?.portions || "Serves 6–8"}
                  </span>
                  <span className="text-[11px] text-stone-500">
                    {SERVING_GUIDE[selectedSize]?.vibe || "Fresh small-batch bake"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playBubblePop();
                  setIsSlicingGuideOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-caramel/10 hover:bg-caramel text-caramel hover:text-white transition-all text-xs font-bold"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Slicing Guide</span>
              </button>
            </div>
          </div>

          {/* Right Column: Customization, Pincode & Order Actions */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-10 border border-white/90 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-caramel">
                  {product.product_type} • Est. 1930
                </span>
                <button
                  onClick={() => toggleWishlist(product)}
                  data-cursor="Save"
                  className={`p-2 rounded-full border transition-all ${
                    isFavorited
                      ? "bg-[#D51919] text-white border-[#D51919]"
                      : "bg-white text-espresso border-stone-200 hover:text-[#D51919]"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? "fill-current" : ""}`} />
                </button>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso mt-1 tracking-tight">
                {product.title}
              </h1>

              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-black text-caramel">
                  {formatPrice(calculatePrice())}
                </span>
                <span className="text-xs text-stone-500">
                  Taxes Included • Free delivery across Bangalore over ₹999
                </span>
              </div>

              <p className="text-stone-700 text-sm sm:text-base mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size / Weight Selector with portions */}
            <div className="space-y-2 pt-2 border-t border-stone-200/60">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 flex items-center justify-between">
                <span>Select Weight</span>
                <span className="text-caramel font-semibold text-[11px]">
                  {SERVING_GUIDE[selectedSize]?.portions}
                </span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["500g", "1 kg", "2 kg", "3 kg"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      haptics.selection();
                      setSelectedSize(size);
                    }}
                    className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? "bg-espresso text-white border-espresso shadow-md"
                        : "bg-white/70 text-stone-700 border-stone-200 hover:border-caramel"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Preference Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Dietary Recipe
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    setIsEggless(true);
                  }}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    isEggless
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  <span>🟢 100% Eggless Recipe</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`py-3 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    !isEggless
                      ? "bg-amber-800 text-white border-amber-800 shadow-sm"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  <span>🟡 Traditional Recipe</span>
                </button>
              </div>
            </div>

            {/* Custom Inscription on Cake */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 flex items-center justify-between">
                <span>Piped Message on Cake (Free Customization)</span>
                <span className="text-stone-400 font-mono text-[11px]">{cakeMessage.length}/35</span>
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g., Happy 25th Anniversary Mom & Dad!"
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs sm:text-sm"
              />
            </div>

            {/* Bangalore Pincode Delivery Checker */}
            <div className="space-y-2 pt-2 border-t border-stone-200/60">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                Check Bangalore Delivery &amp; Express Slots
              </label>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-caramel absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 560001)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="glass-input w-full pl-10 pr-4 py-2.5 rounded-xl text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-espresso hover:bg-caramel text-white text-xs font-bold transition-all shadow-sm"
                >
                  Check
                </button>
              </form>

              {deliveryResult.status && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium flex items-center justify-between ${
                    deliveryResult.status === "express"
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : deliveryResult.status === "standard"
                      ? "bg-amber-50 text-amber-900 border border-amber-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {deliveryResult.status === "invalid" ? (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                    <span>{deliveryResult.message}</span>
                  </div>
                  {deliveryResult.hub && (
                    <span className="text-[10px] font-mono text-stone-500 hidden sm:inline">
                      {deliveryResult.hub}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Quantity Stepper & Add to Cart */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/90 border border-stone-200 rounded-xl px-3 py-3 shadow-sm">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-500 hover:text-espresso font-bold px-1.5"
                >
                  -
                </button>
                <span className="text-sm font-bold text-espresso w-6 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-500 hover:text-espresso font-bold px-1.5"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                data-cursor="Taste"
                className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md ${
                  added
                    ? "bg-emerald-600 text-white"
                    : "bg-espresso hover:bg-caramel text-white hover:shadow-xl hover:-translate-y-0.5"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Fresh Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Fresh Basket</span>
                  </>
                )}
              </button>
            </div>

            {/* 1-Tap WhatsApp Direct Ordering */}
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="WhatsApp"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-3.5 px-6 rounded-full transition-all shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Order via WhatsApp (1-Tap Direct Hotline)</span>
            </a>

            {/* Verbatim Quality & Damage Policy Guarantees */}
            <div className="pt-4 border-t border-stone-200/60 space-y-2.5 text-xs text-stone-600">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-caramel shrink-0" />
                <span>Next-Day &amp; Express Delivery guaranteed across Bengaluru.</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-caramel shrink-0" />
                <span>4-Hour Damage Window: Report transit damage within 4 hours with photo proof.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-caramel shrink-0" />
                <span>Freshly baked daily with 100% natural butter &amp; family recipes.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Creations */}
        <div className="pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-caramel block">
                Artisan Pairings
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
                You Might Also Adore
              </h2>
            </div>
            <Link
              href="/collections/cake"
              className="text-xs font-bold text-caramel hover:text-espresso"
            >
              Explore Full Menu →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Interactive Cake Slicing Geometry Modal */}
        <CakeSlicingGuideModal
          isOpen={isSlicingGuideOpen}
          onClose={() => setIsSlicingGuideOpen(false)}
          cakeWeight={selectedSize}
          cakeTitle={product.title}
        />
      </div>
    </CreamBackground>
  );
}
