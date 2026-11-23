"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Sparkles,
  Send,
  Car,
  Cake,
  Clock,
  ShoppingBag,
  Check,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  CreditCard,
  User,
  Phone,
  Gift,
  Flame,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { haptics } from "@/lib/haptics";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { OUTLETS } from "@/data/brand";

const POPULAR_ITEMS = [
  "Belgian Chocolate Truffle Cake",
  "Classic 1930 Banana Split Sundae",
  "The 2-Tier Rainbow Birthday Cake",
  "Black Forest Royal Cake",
  "Strawberry Special Sundae",
  "Signature Chocolate Boat Sundae",
  "New York Baked Cheesecake",
  "Fresh Fruit Gateau Cake",
];

const CELEBRATION_ADDONS = [
  { id: "candles", label: "Gold Sparkle Candles (Set of 12)", price: 99 },
  { id: "knife", label: "Artisan Cake Knife & Server", price: 149 },
  { id: "topper", label: "Celebration Glitter Topper", price: 199 },
  { id: "fudge", label: "Extra Jar of 1970 Hot Cocoa Fudge", price: 220 },
];

export const WhatsAppQuickOrder: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const { cart, subtotal, total } = useCart();

  // Step 1: Items & Recipe
  const [orderCategory, setOrderCategory] = useState("Celebration Cake");
  const [selectedItemName, setSelectedItemName] = useState("Belgian Chocolate Truffle Cake");
  const [customItemText, setCustomItemText] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("1 kg (Serves 6–8)");
  const [isEggless, setIsEggless] = useState<boolean>(true);
  const [cakeMessage, setCakeMessage] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [useCartItems, setUseCartItems] = useState<boolean>(false);

  // Step 2: Delivery & Schedule
  const [deliveryMode, setDeliveryMode] = useState<"drive-in" | "doorstep">("drive-in");
  const [pickupOutlet, setPickupOutlet] = useState("MG Road Flagship (89 MG Road)");
  const [vehicleMakeModel, setVehicleMakeModel] = useState("");
  const [vehiclePlateNumber, setVehiclePlateNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pincode, setPincode] = useState("560001");
  const [orderDate, setOrderDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [timeSlot, setTimeSlot] = useState("Tonight Midnight (11:30 PM – 1:00 AM)");

  // Step 3: Contact & Payment
  const [customerName, setCustomerName] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [paymentPreference, setPaymentPreference] = useState("UPI (GPay / PhonePe / Paytm)");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const phoneNumber = "919663812036";

  // Listen to mobile bottom bar custom trigger
  useEffect(() => {
    const handleOpenWizard = () => {
      haptics.medium();
      setIsOpen(true);
    };
    window.addEventListener("open-whatsapp-order-wizard", handleOpenWizard);
    return () => window.removeEventListener("open-whatsapp-order-wizard", handleOpenWizard);
  }, []);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleAddon = (id: string) => {
    haptics.light();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const buildWhatsAppMessage = () => {
    let itemsBlock = "";

    if (useCartItems && cart.length > 0) {
      itemsBlock = cart
        .map(
          (item, i) =>
            `  ${i + 1}. *${item.title}* (${item.size || "1 kg"}, ${
              item.eggless ? "100% Eggless" : "Regular"
            }) x ${item.quantity} — ${formatPrice(item.price * item.quantity)}`
        )
        .join("\n");
      itemsBlock += `\n  *Cart Subtotal:* ${formatPrice(subtotal)}`;
    } else {
      const itemName = customItemText.trim() || selectedItemName;
      itemsBlock = `  • *Item:* ${itemName}\n  • *Category:* ${orderCategory}\n  • *Weight / Portion:* ${selectedWeight}\n  • *Recipe:* ${
        isEggless ? "🟢 100% Eggless (Vegetarian)" : "🟡 Traditional Recipe (Contains Egg)"
      }`;
    }

    const addonsText =
      selectedAddons.length > 0
        ? selectedAddons
            .map((id) => {
              const a = CELEBRATION_ADDONS.find((x) => x.id === id);
              return a ? `${a.label} (+₹${a.price})` : id;
            })
            .join(", ")
        : "None";

    let dispatchBlock = "";
    if (deliveryMode === "drive-in") {
      dispatchBlock = `🚗 *SERVICE: MIDNIGHT DRIVE-IN CAR-HOP*\n  • *Pickup Parlour:* ${pickupOutlet}\n  • *Vehicle:* ${
        vehicleMakeModel || "Not specified"
      } (${vehiclePlateNumber || "Plate N/A"})\n  • *Arrival Date:* ${orderDate}\n  • *Time Window:* ${timeSlot}`;
    } else {
      dispatchBlock = `🛵 *SERVICE: BENGALURU DOORSTEP DELIVERY*\n  • *Address:* ${
        deliveryAddress || "Bengaluru"
      }\n  • *PIN Code:* ${pincode || "560001"}\n  • *Delivery Date:* ${orderDate}\n  • *Time Slot:* ${timeSlot}`;
    }

    const message = `🎂 *LAKEVIEW MILK BAR — OFFICIAL WHATSAPP ORDER* 🎂
───────────────────────────────────
👤 *CUSTOMER INFORMATION*
• *Name:* ${customerName || "Customer"}
• *Primary Phone:* ${primaryPhone || "Not specified"}
• *Alternate Phone:* ${altPhone || "None"}

📦 *ORDER SPECIFICATIONS*
${itemsBlock}
• *Message Piped on Cake:* ${cakeMessage ? `"${cakeMessage}"` : "None"}
• *Celebration Add-Ons:* ${addonsText}

${dispatchBlock}

💳 *PAYMENT PREFERENCE*
• *Mode:* ${paymentPreference}

📝 *SPECIAL KITCHEN INSTRUCTIONS*
• ${specialInstructions || "None"}
───────────────────────────────────
📍 *Lakeview Milk Bar Hotline:* +91 9663812036
🏛️ *Serving Bengaluru with Love Since 1930*`;

    return message;
  };

  const handleLaunchWhatsApp = () => {
    haptics.success();
    const finalMsg = buildWhatsAppMessage();
    const encoded = encodeURIComponent(finalMsg);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Trigger (Desktop & Tablet) */}
      <div className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 hidden md:block">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            haptics.medium();
            setIsOpen(true);
          }}
          data-cursor="WhatsApp"
          className="flex items-center gap-2.5 bg-[#25D366] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-white/90 hover:bg-[#1EBE5D] transition-colors"
          aria-label="WhatsApp Order Wizard"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping" />
          </div>
          <span className="text-xs font-bold font-sans tracking-wide">
            {cart.length > 0 ? `WhatsApp Order (${cart.length})` : "WhatsApp Order"}
          </span>
        </motion.button>
      </div>

      {/* Full-Screen Native-App-Like Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10003] flex items-end sm:items-center justify-center sm:p-4 bg-espresso/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative w-full sm:max-w-xl bg-[#FAF7F2] rounded-t-[32px] sm:rounded-3xl shadow-2xl border border-white/90 flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
            >
              {/* Native App Top Bar */}
              <div className="p-4 sm:p-5 border-b border-stone-200/80 bg-white/80 backdrop-blur-md flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                    <MessageCircle className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-espresso leading-none">
                      Lakeview WhatsApp Hotline
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-700 block mt-0.5">
                      ● Direct to Master Pastry Chefs • +91 9663812036
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    haptics.light();
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-full text-stone-400 hover:text-espresso bg-cream-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Stepper Tabs */}
              <div className="grid grid-cols-3 bg-cream-100/70 border-b border-stone-200/60 text-xs font-bold text-center shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    setStep(1);
                  }}
                  className={`py-2.5 transition-all flex items-center justify-center gap-1.5 ${
                    step === 1
                      ? "text-caramel border-b-2 border-caramel bg-white"
                      : "text-stone-400"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-caramel/20 text-caramel text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <span>Items</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    setStep(2);
                  }}
                  className={`py-2.5 transition-all flex items-center justify-center gap-1.5 ${
                    step === 2
                      ? "text-caramel border-b-2 border-caramel bg-white"
                      : "text-stone-400"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-caramel/20 text-caramel text-[10px] flex items-center justify-center">
                    2
                  </span>
                  <span>Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    haptics.selection();
                    setStep(3);
                  }}
                  className={`py-2.5 transition-all flex items-center justify-center gap-1.5 ${
                    step === 3
                      ? "text-caramel border-b-2 border-caramel bg-white"
                      : "text-stone-400"
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-caramel/20 text-caramel text-[10px] flex items-center justify-center">
                    3
                  </span>
                  <span>Review &amp; Send</span>
                </button>
              </div>

              {/* Step Content Scroll Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                {/* ── STEP 1: WHAT WOULD YOU LIKE TO ORDER? ── */}
                {step === 1 && (
                  <div className="space-y-4">
                    {/* Cart Import Option if Cart is Not Empty */}
                    {cart.length > 0 && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-xs font-bold text-emerald-950 block">
                            You have {cart.length} item(s) in your basket
                          </span>
                          <span className="text-[11px] text-emerald-800">
                            Subtotal: {formatPrice(subtotal)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            haptics.light();
                            setUseCartItems(!useCartItems);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            useCartItems
                              ? "bg-emerald-600 text-white"
                              : "bg-white text-emerald-800 border border-emerald-300"
                          }`}
                        >
                          {useCartItems ? "✓ Cart Items Synced" : "Sync Basket"}
                        </button>
                      </div>
                    )}

                    {!useCartItems && (
                      <>
                        {/* 1. Category */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            1. Select Confectionery Category
                          </label>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              "Celebration Cake",
                              "Heritage Sundae",
                              "Pastry & Bakes",
                              "Cheesecake",
                              "3D Custom Cake",
                            ].map((cat) => (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => {
                                  haptics.selection();
                                  setOrderCategory(cat);
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                                  orderCategory === cat
                                    ? "bg-espresso text-white shadow-xs"
                                    : "bg-white text-stone-600 border border-stone-200"
                                }`}
                              >
                                {cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Popular Preset or Custom Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            2. Choose Item or Describe Cravings
                          </label>
                          <select
                            value={selectedItemName}
                            onChange={(e) => {
                              haptics.selection();
                              setSelectedItemName(e.target.value);
                            }}
                            className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold text-espresso"
                          >
                            {POPULAR_ITEMS.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>

                          <input
                            type="text"
                            placeholder="Or type custom flavor / request..."
                            value={customItemText}
                            onChange={(e) => setCustomItemText(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200"
                          />
                        </div>

                        {/* 3. Weight / Portion */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            3. Select Weight / Portion
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              "500g (3–4 Servings)",
                              "1 kg (6–8 Servings)",
                              "2 kg (12–16 Servings)",
                              "3 kg (20+ Servings)",
                            ].map((wt) => (
                              <button
                                key={wt}
                                type="button"
                                onClick={() => {
                                  haptics.selection();
                                  setSelectedWeight(wt);
                                }}
                                className={`p-2 rounded-xl text-xs font-bold border transition-all text-center ${
                                  selectedWeight === wt
                                    ? "bg-espresso text-white border-espresso"
                                    : "bg-white text-stone-700 border-stone-200"
                                }`}
                              >
                                {wt.split(" ")[0]} {wt.split(" ")[1]}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 4. Dietary Recipe */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            4. Dietary Recipe
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                haptics.selection();
                                setIsEggless(true);
                              }}
                              className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                                isEggless
                                  ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                                  : "bg-white text-stone-700 border-stone-200"
                              }`}
                            >
                              <span>🟢 100% Eggless</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                haptics.selection();
                                setIsEggless(false);
                              }}
                              className={`p-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                                !isEggless
                                  ? "bg-amber-700 text-white border-amber-700 shadow-xs"
                                  : "bg-white text-stone-700 border-stone-200"
                              }`}
                            >
                              <span>🟡 Traditional (Egg)</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}

                    {/* 5. Piped Message on Cake */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        5. Custom Icing Message Piped on Cake (Free)
                      </label>
                      <input
                        type="text"
                        maxLength={40}
                        placeholder="e.g. Happy 25th Birthday Rhea! 💖"
                        value={cakeMessage}
                        onChange={(e) => setCakeMessage(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200"
                      />
                    </div>

                    {/* 6. Celebration Add-Ons */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        6. Celebration Add-Ons
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {CELEBRATION_ADDONS.map((addon) => {
                          const isSelected = selectedAddons.includes(addon.id);
                          return (
                            <button
                              key={addon.id}
                              type="button"
                              onClick={() => toggleAddon(addon.id)}
                              className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? "bg-caramel/10 border-caramel text-espresso font-bold"
                                  : "bg-white border-stone-200 text-stone-600"
                              }`}
                            >
                              <span className="truncate pr-1 text-[11px]">{addon.label}</span>
                              <span className="font-mono text-caramel shrink-0">
                                +₹{addon.price}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: DELIVERY & TIMING ── */}
                {step === 2 && (
                  <div className="space-y-4">
                    {/* Mode Toggle */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Service Method
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            haptics.selection();
                            setDeliveryMode("drive-in");
                          }}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                            deliveryMode === "drive-in"
                              ? "bg-espresso text-white border-espresso shadow-md"
                              : "bg-white text-stone-700 border-stone-200"
                          }`}
                        >
                          <Car className="w-5 h-5 text-amber-300" />
                          <span>Midnight Drive-In Car Hop</span>
                          <span className="text-[10px] text-amber-300/90 font-mono">
                            FREE Pickup
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            haptics.selection();
                            setDeliveryMode("doorstep");
                          }}
                          className={`p-3 rounded-2xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                            deliveryMode === "doorstep"
                              ? "bg-espresso text-white border-espresso shadow-md"
                              : "bg-white text-stone-700 border-stone-200"
                          }`}
                        >
                          <MapPin className="w-5 h-5 text-caramel" />
                          <span>Bengaluru Doorstep</span>
                          <span className="text-[10px] text-stone-400 font-mono">
                            City-Wide Delivery
                          </span>
                        </button>
                      </div>
                    </div>

                    {deliveryMode === "drive-in" ? (
                      <div className="space-y-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            Select Pickup Parlour
                          </label>
                          <select
                            value={pickupOutlet}
                            onChange={(e) => setPickupOutlet(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                          >
                            <option>MG Road Flagship (89 MG Road)</option>
                            <option>Indiranagar Parlour (100ft Road)</option>
                            <option>Kalyan Nagar Hub (CMR Road)</option>
                            <option>Whitefield Parlour (ITPB Main Road)</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700 block">
                              Vehicle Make &amp; Color
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Silver Honda City"
                              value={vehicleMakeModel}
                              onChange={(e) => setVehicleMakeModel(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-stone-700 block">
                              Number Plate
                            </label>
                            <input
                              type="text"
                              placeholder="KA 01 MG 1930"
                              value={vehiclePlateNumber}
                              onChange={(e) => setVehiclePlateNumber(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200 uppercase font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 p-4 rounded-2xl bg-stone-100 border border-stone-200">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            Complete Delivery Address
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Flat/House No, Apartment name, Street, Landmark..."
                            value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                            className="w-full p-2.5 rounded-xl text-xs bg-white border border-stone-200 resize-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                            Bengaluru PIN Code (6 Digits)
                          </label>
                          <input
                            type="text"
                            maxLength={6}
                            placeholder="560001"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200 font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {/* Schedule Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                          Delivery / Pickup Date
                        </label>
                        <input
                          type="date"
                          value={orderDate}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setOrderDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                          Preferred Arrival Window
                        </label>
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                        >
                          <option>Tonight Late Night (9:30 PM – 11:30 PM)</option>
                          <option>Tonight Midnight (11:30 PM – 1:00 AM)</option>
                          <option>Tomorrow Morning (9:00 AM – 12:00 PM)</option>
                          <option>Tomorrow Afternoon (12:00 PM – 4:00 PM)</option>
                          <option>Tomorrow Evening (4:00 PM – 8:00 PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 3: CONTACT & PAYMENT REVIEW ── */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rahul Sharma"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                          Primary Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 9876543210"
                          value={primaryPhone}
                          onChange={(e) => setPrimaryPhone(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Alternate Number (For Delivery / Gate Security)
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9663812036"
                        value={altPhone}
                        onChange={(e) => setAltPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200"
                      />
                    </div>

                    {/* Payment Mode */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Payment Preference
                      </label>
                      <select
                        value={paymentPreference}
                        onChange={(e) => setPaymentPreference(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl text-xs bg-white border border-stone-200 font-semibold"
                      >
                        <option>UPI (GPay / PhonePe / Paytm / QR Code)</option>
                        <option>Cash on Delivery (COD) / UPI on Delivery</option>
                        <option>Online Payment Link (Cards &amp; Netbanking)</option>
                      </select>
                    </div>

                    {/* Special Instructions */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                        Special Notes or Dietary Allergies
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Less sweet, extra chocolate syrup, call upon arrival"
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-stone-200"
                      />
                    </div>

                    {/* Live Preview Box */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Message Preview for Hotline
                      </span>
                      <pre className="text-[10px] text-stone-600 font-mono whitespace-pre-wrap max-h-28 overflow-y-auto bg-stone-50 p-2 rounded-lg leading-relaxed">
                        {buildWhatsAppMessage()}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Fixed Action Bar */}
              <div className="p-4 border-t border-stone-200/80 bg-white/95 backdrop-blur-md flex items-center justify-between gap-3 shrink-0 pb-safe">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      haptics.selection();
                      setStep((prev) => (prev - 1) as any);
                    }}
                    className="px-4 py-2.5 rounded-full bg-cream-100 text-espresso text-xs font-bold flex items-center gap-1 active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div className="text-[11px] text-stone-500 font-medium">
                    Step 1 of 3: Specifications
                  </div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      haptics.selection();
                      setStep((prev) => (prev + 1) as any);
                    }}
                    className="px-6 py-2.5 rounded-full bg-espresso text-white text-xs font-bold flex items-center gap-1 shadow-md hover:bg-caramel active:scale-95 transition-all"
                  >
                    <span>Next: {step === 1 ? "Delivery Details" : "Contact & Send"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLaunchWhatsApp}
                    className="flex-1 py-3 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Order to WhatsApp Hotline (+91 9663812036)</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
