"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Cake,
  Calendar,
  Clock,
  Sparkles,
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { CakeStackVisualizer } from "@/components/ui/CakeStackVisualizer";
import { CreamBackground } from "@/components/ui/CreamBackground";
import { TiltCard } from "@/components/ui/TiltCard";

export default function CustomCakePage() {
  const router = useRouter();
  const { addToCart } = useCart();

  const [occasion, setOccasion] = useState<string>("Birthday");
  const [flavor, setFlavor] = useState<string>("Belgian Chocolate Truffle");
  const [size, setSize] = useState<string>("1.5 kg");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [messageOnCake, setMessageOnCake] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("Afternoon (12:00 PM – 4:00 PM)");
  const [specialInstructions, setSpecialInstructions] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCustomPrice = () => {
    let base = 1500;
    if (size === "1 kg") base = 1350;
    else if (size === "1.5 kg") base = 1950;
    else if (size === "2 kg") base = 2600;
    else if (size === "3 kg") base = 3800;
    else if (size === "5 kg+") base = 6200;

    if (flavor.includes("Truffle") || flavor.includes("Nutella")) base += 200;
    return base;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryDate) {
      setError("Please select your preferred celebration delivery date.");
      return;
    }
    setError(null);

    const customProduct = {
      id: `custom-cake-${Date.now()}`,
      handle: "custom-cake",
      title: `Bespoke ${occasion} Cake (${flavor})`,
      product_type: "Custom Designer Cake",
      image: previewImage || "/assets/promotions/category-cakes.png",
      description: `Bespoke handcrafted cake for ${occasion}. Flavor: ${flavor}. Size: ${size}. ${isEggless ? "100% Eggless." : "Traditional recipe."} Special instructions: ${specialInstructions || "None"}.`,
      options: [],
      variants: [
        {
          id: `var-${Date.now()}`,
          title: `${size} / ${isEggless ? "Eggless" : "Regular"}`,
          price: calculateCustomPrice(),
          available: true,
        },
      ],
      price_min: calculateCustomPrice(),
      price_max: calculateCustomPrice(),
    };

    addToCart(customProduct as any, customProduct.variants[0], 1, {
      size,
      eggless: isEggless,
      messageOnCake: `${messageOnCake} (Delivery: ${deliveryDate} | Slot: ${timeSlot})`,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      router.push("/checkout");
    }, 1500);
  };

  return (
    <CreamBackground className="pt-28 sm:pt-36 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 text-caramel text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Pâtissier Configurator</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso tracking-tight">
            Order Your Custom Celebration Cake
          </h1>
          <p className="text-stone-600 text-sm max-w-xl mx-auto leading-relaxed">
            Every celebration deserves an iconic centerpiece. Tell us your design vision, flavours, and party size — our master bakers will handcraft it with love.
          </p>
        </div>

        {/* Live Interactive Cake Stack Visualizer Preview */}
        <div className="max-w-md mx-auto">
          <CakeStackVisualizer
            flavor={flavor}
            tier={size.includes("3") || size.includes("5") ? "Double Tier" : "Single Tier"}
            shape={occasion === "Anniversary" ? "Heart Cut" : "Round"}
            eggless={isEggless}
            message={messageOnCake}
          />
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/80 shadow-2xl space-y-8">
          {error && (
            <div className="p-4 rounded-xl bg-rose-soft text-[#D51919] border border-rose-muted/40 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Occasion */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-espresso text-white text-[10px] flex items-center justify-center font-bold">1</span>
              <span>Select Celebration Occasion</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {["Birthday", "Anniversary", "Baby Shower", "Wedding", "Corporate", "Milestone"].map(
                (item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOccasion(item)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                      occasion === item
                        ? "bg-espresso text-white border-espresso shadow-sm"
                        : "bg-white/70 text-stone-700 border-stone-200 hover:border-caramel"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Step 2: Flavor Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-espresso text-white text-[10px] flex items-center justify-center font-bold">2</span>
              <span>Choose Signature Artisanal Flavour</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                { title: "Belgian Chocolate Truffle", tag: "Bestseller" },
                { title: "Classic Black Forest", tag: "Heritage" },
                { title: "Red Velvet Cream Cheese", tag: "Popular" },
                { title: "Fresh Fruit Vanilla Garden", tag: "Seasonal" },
                { title: "Nutella Lotus Biscoff", tag: "Gourmet" },
                { title: "Butterscotch Crunch", tag: "Classic" },
              ].map((flv) => (
                <button
                  key={flv.title}
                  type="button"
                  onClick={() => setFlavor(flv.title)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    flavor === flv.title
                      ? "bg-caramel text-white border-caramel shadow-md"
                      : "bg-white/70 text-espresso border-stone-200 hover:bg-white"
                  }`}
                >
                  <span className="text-xs font-bold">{flv.title}</span>
                  <span className={`text-[10px] mt-1 font-semibold ${flavor === flv.title ? "text-amber-200" : "text-caramel"}`}>
                    {flv.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Size & Dietary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-stone-200/60">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                3. Size / Weight Required
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["1 kg", "1.5 kg", "2 kg", "3 kg", "5 kg+"].map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSize(sz)}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      size === sz
                        ? "bg-espresso text-white border-espresso shadow-sm"
                        : "bg-white/70 text-stone-700 border-stone-200 hover:border-caramel"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                4. Dietary Recipe
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsEggless(true)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    isEggless
                      ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  🟢 100% Eggless
                </button>
                <button
                  type="button"
                  onClick={() => setIsEggless(false)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    !isEggless
                      ? "bg-amber-800 text-white border-amber-800 shadow-sm"
                      : "bg-white/70 text-stone-700 border-stone-200"
                  }`}
                >
                  🟡 Traditional Recipe
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Inscription & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-stone-200/60">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                5. Inscription on Cake (Max 35 Characters)
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy 25th Anniversary Mom & Dad!"
                value={messageOnCake}
                onChange={(e) => setMessageOnCake(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                6. Celebration Delivery Date *
              </label>
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs font-semibold"
                required
              />
            </div>
          </div>

          {/* Step 5: Time Slot & Design Reference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                7. Preferred Delivery Time Slot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="glass-input w-full px-4 py-3 rounded-xl text-xs font-semibold"
              >
                <option>Morning (9:00 AM – 12:00 PM)</option>
                <option>Afternoon (12:00 PM – 4:00 PM)</option>
                <option>Evening (4:00 PM – 8:00 PM)</option>
                <option>Late Night (8:00 PM – 11:30 PM)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
                8. Upload Reference Design (Optional)
              </label>
              <label className="glass-input w-full px-4 py-2.5 rounded-xl text-xs flex items-center justify-between cursor-pointer hover:bg-white transition-colors">
                <span className="text-stone-500 truncate">
                  {previewImage ? "Design image uploaded" : "Choose inspiration photo..."}
                </span>
                <Upload className="w-4 h-4 text-caramel shrink-0 ml-2" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Image Preview if uploaded */}
          {previewImage && (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-stone-100 max-w-sm">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={previewImage}
                  alt="Reference preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-espresso">Reference Image Attached</p>
                <p className="text-[10px] text-stone-500">Our cake decorator will review this design</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="text-stone-400 hover:text-red-500 text-xs px-2"
              >
                Remove
              </button>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-espresso/90 block">
              9. Special Design Instructions or Theme Details
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about color palettes, floral accents, number toppers, or specific allergy requests..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="glass-input w-full p-4 rounded-xl text-xs resize-none"
            />
          </div>

          {/* Pricing & Submit CTA */}
          <div className="pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs text-stone-400 block font-medium">Estimated Price</span>
              <span className="text-3xl font-serif font-black text-espresso">
                {formatPrice(calculateCustomPrice())}
              </span>
              <p className="text-[10px] text-stone-500 mt-0.5">Includes custom design, inscription & cake board</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-espresso hover:bg-caramel text-white py-4 px-10 rounded-full font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Configured! Proceeding to Checkout...</span>
                </>
              ) : (
                <>
                  <Cake className="w-5 h-5" />
                  <span>Order Custom Cake Now</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct WhatsApp order confirmation dispatch after payment.</span>
          </div>
        </form>
      </div>
    </CreamBackground>
  );
}
