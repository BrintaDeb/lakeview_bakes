"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, UtensilsCrossed, Cake, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { haptics } from "@/lib/haptics";

interface MobileAppTabBarProps {
  onOpenWhatsApp?: () => void;
}

export const MobileAppTabBar: React.FC<MobileAppTabBarProps> = ({ onOpenWhatsApp }) => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();

  const handleTabClick = () => {
    haptics.light();
  };

  const handleWhatsAppClick = () => {
    haptics.medium();
    if (onOpenWhatsApp) {
      onOpenWhatsApp();
    } else {
      const event = new CustomEvent("open-whatsapp-order-wizard");
      window.dispatchEvent(event);
    }
  };

  const handleCartClick = () => {
    haptics.medium();
    setIsCartOpen(true);
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/collections/cakes", label: "Cakes", icon: Cake },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] pointer-events-none">
      {/* Background Container with iOS/Android safe area padding */}
      <nav
        aria-label="Mobile Navigation Bar"
        className="pointer-events-auto bg-[#FAF7F2]/95 backdrop-blur-2xl border-t border-stone-200/80 shadow-[0_-8px_30px_rgba(17,34,41,0.08)] px-2 pt-2 pb-safe"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {/* Main Navigation Links */}
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleTabClick}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-90 ${
                  isActive ? "text-caramel font-bold" : "text-stone-500 hover:text-espresso"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-caramel rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className="text-[10px] tracking-tight mt-1 font-sans">{item.label}</span>
              </Link>
            );
          })}

          {/* Central Hero Button: WhatsApp Order System */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            aria-label="Open WhatsApp Order System"
            className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-[#1EBE5D] hover:text-[#128C7E] active:scale-90 transition-transform"
          >
            <div className="relative">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-[#25D366]/15">
                <MessageCircle className="w-5 h-5 fill-[#25D366] text-[#25D366]" />
              </div>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping" />
            </div>
            <span className="text-[10px] font-bold text-[#128C7E] tracking-tight mt-1 font-sans">
              Order WA
            </span>
          </button>

          {/* Cart / Basket Button */}
          <button
            type="button"
            onClick={handleCartClick}
            aria-label="Open Shopping Basket"
            className="relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl text-stone-600 active:scale-90 transition-transform"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-caramel text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs animate-scale">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight mt-1 font-sans">Basket</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
