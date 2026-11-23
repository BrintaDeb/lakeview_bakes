"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { haptics } from "@/lib/haptics";

export const BerniceCollectionBrowser: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [activeTab, setActiveTab] = useState<string>("all");
  const [addedId, setAddedId] = useState<string | number | null>(null);

  const tabs = [
    { id: "all", label: "All Confections" },
    { id: "cake", label: "Celebration Cakes" },
    { id: "sundae", label: "Heritage Sundaes" },
    { id: "dessert", label: "Patisserie & Bakes" },
  ];

  const filtered = ALL_PRODUCTS.filter((p) => {
    if (activeTab === "all") return true;
    const type = (p.product_type || "").toLowerCase();
    const title = p.title.toLowerCase();
    const tags = (p.tags || []).map((t) => t.toLowerCase());

    if (activeTab === "sundae") {
      return (
        type.includes("sundae") ||
        title.includes("sundae") ||
        title.includes("split") ||
        tags.some((t) => t.includes("sundae"))
      );
    }
    if (activeTab === "cake") {
      return type.includes("cake") || title.includes("cake") || tags.some((t) => t.includes("cake"));
    }
    if (activeTab === "dessert") {
      return (
        type.includes("dessert") ||
        type.includes("tart") ||
        type.includes("cupcake") ||
        type.includes("pie") ||
        title.includes("tart") ||
        title.includes("pie") ||
        title.includes("cupcake")
      );
    }
    return type.includes(activeTab) || tags.some((t) => t.includes(activeTab));
  }).slice(0, 12);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptics.medium();
    addToCart(product, product.variants[0], 1);
    setIsCartOpen(true);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  const getServings = (product: Product) => {
    const type = (product.product_type || "").toLowerCase();
    const title = product.title.toLowerCase();
    if (type.includes("sundae") || title.includes("split") || title.includes("sundae")) {
      return "Serves 1–2";
    }
    if (type.includes("cake") || title.includes("cake")) {
      return "1kg · Serves 6–8";
    }
    return "Artisan Portion";
  };

  return (
    <section className="Section Collections_Browser_Section Parallax_Wrapper SectionPadded">
      {/* Category Filter Tabs */}
      <div className="Collection_Browser_Navigation">
        <div className="Collection_Browser_Tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => {
                haptics.light();
                setActiveTab(tab.id);
              }}
              className={`Collection_Browser_Tab_Button ${activeTab === tab.id ? "Selected" : ""}`}
            >
              <span className="Back" style={{ backgroundColor: "var(--pink)" }}></span>
              <span>{tab.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product Grid inside Bernice Browser Layout */}
      <div className="Collection_Browser_Products_Container Open">
        <div className="Collection_Browser_Product_Page Open">
          {filtered.map((product) => (
            <div key={product.id} className="Collection_Browser_Product">
              <div className="Product_Item">
                {/* Product Image */}
                <Link href={`/products/${product.handle}`} className="Product_Item_Image Fluid relative group">
                  <Image
                    src={product.image || "/assets/products/belgian-truffle-cake.jpg"}
                    alt={product.title}
                    width={480}
                    height={480}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div className="Product_Item_Second_Image Fluid">
                    <Image
                      src={product.image || "/assets/products/belgian-truffle-cake.jpg"}
                      alt={product.title}
                      width={480}
                      height={480}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>

                  {/* Dietary Indicator (100% Eggless Pill) */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-stone-200/60">
                      <span className="w-3 h-3 border-2 border-emerald-600 rounded-sm flex items-center justify-center p-[1px] bg-white">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                      </span>
                      <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-800">
                        100% Eggless
                      </span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 z-10 pointer-events-none">
                    <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold text-amber-300">
                      ★ 4.9
                    </span>
                  </div>
                </Link>

                {/* Title & Format */}
                <div className="mt-2.5">
                  <Link href={`/products/${product.handle}`}>
                    <h3 className="Product_Item_Title hover:text-[var(--pink)] transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                      <span className="Format font-semibold">{product.product_type || "Artisan Bake"}</span>
                      <span className="Separator_Dot"></span>
                      <span className="Weight text-stone-500">{getServings(product)}</span>
                    </div>
                  </Link>

                  {/* Description Snippet */}
                  <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="Product_Item_Content mt-2">
                  <div className="Infos">
                    <span className="Price text-lg font-bold font-serif text-stone-900">
                      ₹{product.price_min.toLocaleString("en-IN")}
                      {product.price_max && product.price_max > product.price_min && (
                        <span className="text-xs font-normal text-stone-500 ml-1">
                          – ₹{product.price_max.toLocaleString("en-IN")}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Container */}
                <div className="Product_Item_Submit_Container Quantity_Selector_Button mt-2">
                  <button
                    type="button"
                    onClick={(e) => handleAdd(product, e)}
                    className={`Product_Item_Submit transition-all duration-300 ${
                      addedId === product.id ? "bg-emerald-600 text-white" : ""
                    }`}
                  >
                    {addedId === product.id ? "Added to Box! ✓" : "Add To Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Bottom Links */}
      <div className="Collection_Browser_Bottom">
        <Link href="/menu" className="Cool_Anim Grow">
          View All 203 Lakeview Confections
        </Link>
      </div>
    </section>
  );
};
