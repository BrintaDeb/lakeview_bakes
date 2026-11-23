"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ALL_PRODUCTS } from "@/data/products";

export const BerniceCollectionDisplay: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [addedHandle, setAddedHandle] = useState<string | null>(null);

  const items = [
    {
      handle: "rainbow-birthday-cake",
      title: "Rainbow Birthday Cake",
      format: "Standard Celebration",
      weight: "1kg",
      servings: "Serves 8–10",
      price: "₹1,150",
      rating: "4.9",
      reviews: "420+ reviews",
      badge: "100% Eggless",
      heritage: "Bestseller Since 1993",
      craftNote: "Fluffy vanilla sponge soaked in sweet milk, frosted with silky European buttercream & celebratory rainbow confetti.",
      image1: "/assets/products/2-tier-rainbow-cake.jpg",
      image2: "/assets/products/rainbow-cake.jpg",
      ingredients: [
        { name: "Pure Butter", top: "31%", left: "24%", rotation: "-14deg" },
        { name: "Rainbow Sprinkles", top: "25%", left: "69%", rotation: "20deg" },
      ],
    },
    {
      handle: "belgian-truffle-cake",
      title: "Belgian Chocolate Truffle",
      format: "Rich Truffle",
      weight: "1kg",
      servings: "Serves 8–10",
      price: "₹1,250",
      rating: "5.0",
      reviews: "610+ reviews",
      badge: "100% Eggless",
      heritage: "Chef's Signature Selection",
      craftNote: "55% dark Callebaut ganache poured over moist Dutch cocoa sponge with delicate chocolate pearls.",
      image1: "/assets/products/belgian-truffle-cake.jpg",
      image2: "/assets/products/dutch-truffle-cake.jpg",
      ingredients: [
        { name: "Dark Callebaut", top: "30%", left: "20%", rotation: "-10deg" },
        { name: "Dutch Cocoa", top: "26%", left: "65%", rotation: "16deg" },
        { name: "Silky Ganache", top: "70%", left: "30%", rotation: "8deg" },
      ],
    },
    {
      handle: "classic-banana-split",
      title: "The 1930 Banana Split",
      format: "Twin Boat",
      weight: "Serves 2",
      servings: "2 Generous Servings",
      price: "₹320",
      rating: "4.9",
      reviews: "890+ reviews",
      badge: "Pure Vegetarian",
      heritage: "Original 1930 Formula",
      craftNote: "Whole split caramelised banana with house vanilla, strawberry & chocolate churns smothered in warm fudge.",
      image1: "/assets/products/classic-banana-split.jpg",
      image2: "/assets/products/chocolate-boat-sundae.jpg",
      ingredients: [
        { name: "Vanilla Bean", top: "28%", left: "22%", rotation: "-12deg" },
        { name: "Hot Fudge", top: "24%", left: "64%", rotation: "18deg" },
        { name: "Glacé Cherry", top: "68%", left: "28%", rotation: "-6deg" },
      ],
    },
  ];

  const handleAdd = (handle: string) => {
    const p = ALL_PRODUCTS.find((prod) => prod.handle === handle) || ALL_PRODUCTS[0];
    addToCart(p, p.variants[0], 1);
    setIsCartOpen(true);
    setAddedHandle(handle);
    setTimeout(() => setAddedHandle(null), 2500);
  };

  return (
    <section className="Section Collection_Display_Section Parallax_Wrapper SectionPadded">
      <div className="Collection_Display">
        {items.map((item) => (
          <div key={item.handle} className="Collection_Display_Item">
            <div className="Product_Item">
              {/* Product Image with Dual-Image Swap on Hover & Ingredients */}
              <Link href={`/products/${item.handle}`} className="Product_Item_Image Fluid">
                <Image
                  src={item.image1}
                  alt={item.title}
                  width={480}
                  height={480}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="Product_Item_Second_Image Fluid">
                  <Image
                    src={item.image2}
                    alt={`${item.title} Interior`}
                    width={480}
                    height={480}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Indian Regulatory Vegetarian / Eggless Symbol on Card Image */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-md border border-stone-200/80">
                    <span className="w-3.5 h-3.5 border-2 border-emerald-600 rounded-sm flex items-center justify-center p-[2px] bg-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Heritage Batch Label */}
                <div className="absolute top-4 right-4 z-20 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-300/30">
                    {item.heritage}
                  </span>
                </div>

                {/* Bernice Floating Ingredient Badges */}
                {item.ingredients.map((ing) => (
                  <div
                    key={ing.name}
                    className="Product_Item_Ingredient"
                    style={
                      {
                        "--top": ing.top,
                        "--left": ing.left,
                        "--rotation": ing.rotation,
                      } as React.CSSProperties
                    }
                  >
                    <span>{ing.name}</span>
                  </div>
                ))}
              </Link>

              {/* Title & Format */}
              <div className="mt-3">
                <Link href={`/products/${item.handle}`}>
                  <h3 className="Product_Item_Title hover:text-[var(--pink)] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5">
                    <span className="Format font-semibold">{item.format}</span>
                    <span className="Separator_Dot"></span>
                    <span className="Weight font-medium text-stone-700">{item.weight}</span>
                    <span className="Separator_Dot"></span>
                    <span className="text-stone-500">{item.servings}</span>
                  </div>
                </Link>

                {/* Star Rating */}
                <div className="flex items-center gap-1.5 text-xs text-amber-500 mt-1">
                  <span>★</span>
                  <span className="font-bold text-stone-900">{item.rating}</span>
                  <span className="text-stone-400">({item.reviews})</span>
                </div>

                {/* Craftsmanship Note */}
                <p className="text-xs text-stone-500 line-clamp-2 mt-1.5 leading-relaxed">
                  {item.craftNote}
                </p>
              </div>

              {/* Price & Bernice Submit Container */}
              <div className="Product_Item_Content mt-3">
                <div className="Infos">
                  <span className="Price text-xl font-bold font-serif text-stone-900">
                    {item.price}
                  </span>
                </div>
              </div>

              <div className="Product_Item_Submit_Container Quantity_Selector_Button mt-2">
                <button
                  type="button"
                  onClick={() => handleAdd(item.handle)}
                  className={`Product_Item_Submit transition-all duration-300 ${
                    addedHandle === item.handle ? "bg-emerald-600 text-white" : ""
                  }`}
                >
                  {addedHandle === item.handle ? "Added to Box! ✓" : "Add To Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Background Angled Marquee (Bernice Signature Backdrop) */}
      <div className="Collection_Display_Back">
        <div className="Marquee">
          <div className="Marquee_Content">
            <div>Bestsellers</div>
            <div className="Reversed">Bestsellers</div>
            <div>Bestsellers</div>
            <div className="Reversed">Bestsellers</div>
            <div>Bestsellers</div>
            <div className="Reversed">Bestsellers</div>
            <div>Bestsellers</div>
            <div className="Reversed">Bestsellers</div>
          </div>
        </div>
      </div>
    </section>
  );
};
