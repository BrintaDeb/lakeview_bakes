import { Product } from "@/types";
import rawProducts from "./products.json";

const LAKEVIEW_HERITAGE_SUNDAES: Product[] = [
  {
    id: 9901,
    handle: "classic-banana-split",
    title: "The 1930 Banana Split Sundae",
    original_url: "https://lakeviewmilkbar.in/products/classic-banana-split",
    product_type: "Heritage Sundae",
    tags: ["sundae", "Heritage Sundaes", "Split", "favourites", "1930 Original", "Eggless", "Vegetarian"],
    image: "/assets/products/classic-banana-split.jpg",
    description: "Lakeview's iconic 1930 recipe: fresh whole banana split layered with house-churned vanilla, strawberry & chocolate ice cream scoops, drenched in boiling hot dark fudge, toasted cashews, fresh whipped dairy cream, and ruby glacé cherries.",
    options: [
      { name: "Portion", values: ["Standard Twin Boat", "Double Grande Boat"] },
      { name: "Dietary", values: ["100% Vegetarian"] },
    ],
    variants: [
      { id: 99011, title: "Standard Twin Boat", price: 320, available: true, options: ["Standard Twin Boat"] },
      { id: 99012, title: "Double Grande Boat", price: 480, available: true, options: ["Double Grande Boat"] },
    ],
    price_min: 320,
    price_max: 480,
  },
  {
    id: 9902,
    handle: "strawberry-special-sundae",
    title: "Heritage Strawberry Special Sundae",
    original_url: "https://lakeviewmilkbar.in/products/strawberry-special-sundae",
    product_type: "Heritage Sundae",
    tags: ["sundae", "Heritage Sundaes", "Strawberry", "favourites", "Seasonal", "Eggless", "Vegetarian"],
    image: "/assets/products/strawberry-special-sundae.jpg",
    description: "Mahabaleshwar handpicked strawberry compote layered with farm-fresh double strawberry ice cream churns, sweet waffle crisps, and rich homemade strawberry reduction.",
    options: [
      { name: "Portion", values: ["Single Tall Glass", "Double Tall Glass"] },
      { name: "Dietary", values: ["100% Vegetarian"] },
    ],
    variants: [
      { id: 99021, title: "Single Tall Glass", price: 290, available: true, options: ["Single Tall Glass"] },
      { id: 99022, title: "Double Tall Glass", price: 420, available: true, options: ["Double Tall Glass"] },
    ],
    price_min: 290,
    price_max: 420,
  },
  {
    id: 9903,
    handle: "chocolate-boat-sundae",
    title: "Signature Chocolate Boat Sundae",
    original_url: "https://lakeviewmilkbar.in/products/chocolate-boat-sundae",
    product_type: "Heritage Sundae",
    tags: ["sundae", "Heritage Sundaes", "Chocolate", "favourites", "Bestseller", "Eggless", "Vegetarian"],
    image: "/assets/products/chocolate-boat-sundae.jpg",
    description: "Twin scoops of rich Dutch dark chocolate and chocolate chip ice cream served in Lakeview's signature glass boat, flooded with bubbling hot cocoa fudge and toasted almond slivers.",
    options: [
      { name: "Portion", values: ["Twin Boat", "Triple Deluxe Boat"] },
      { name: "Dietary", values: ["100% Vegetarian"] },
    ],
    variants: [
      { id: 99031, title: "Twin Boat", price: 340, available: true, options: ["Twin Boat"] },
      { id: 99032, title: "Triple Deluxe Boat", price: 490, available: true, options: ["Triple Deluxe Boat"] },
    ],
    price_min: 340,
    price_max: 490,
  },
];

const parsedBaseProducts: Product[] = (rawProducts as any[]).map((p) => ({
  id: p.id,
  handle: p.handle,
  title: p.title,
  original_url: p.original_url,
  product_type: p.product_type || "Artisanal Cake",
  tags: p.tags || ["Cake", "Bakery"],
  image: p.image || "/assets/logo/lakeview-logo.png",
  original_cdn_image: p.original_cdn_image,
  description: p.description || `Freshly baked ${p.title} crafted with rich artisanal ingredients at Lakeview Milk Bar.`,
  options: p.options || [
    { name: "Size", values: ["500g", "1 kg", "2 kg"] },
    { name: "Select", values: ["Egg", "Eggless"] },
  ],
  variants: (p.variants || []).map((v: any) => ({
    id: v.id,
    title: v.title,
    price: typeof v.price === "number" ? v.price : parseFloat(v.price) || 1200,
    available: v.available !== undefined ? v.available : true,
    options: v.options || [],
  })),
  price_min: typeof p.price_min === "number" ? p.price_min : 1200,
  price_max: typeof p.price_max === "number" ? p.price_max : 2400,
}));

export const ALL_PRODUCTS: Product[] = [...parsedBaseProducts, ...LAKEVIEW_HERITAGE_SUNDAES];

const HANDLE_ALIASES: Record<string, string> = {
  "rainbow-birthday-cake": "rainbow-cake",
  "belgian-truffle-cake": "chocolate-truffle",
  "dutch-truffle-cake": "dutch-chocolate-cake",
  "black-forest-royal-cake": "black-forest-cake",
  "fresh-fruit-gateau-cake": "fresh-fruit-cake",
};

export function getProductByHandle(handle: string): Product | undefined {
  if (!handle) return undefined;
  const h = handle.toLowerCase();
  const direct = ALL_PRODUCTS.find((p) => p.handle.toLowerCase() === h);
  if (direct) return direct;
  const alias = HANDLE_ALIASES[h];
  if (alias) {
    return ALL_PRODUCTS.find((p) => p.handle.toLowerCase() === alias.toLowerCase());
  }
  return undefined;
}

export function getRecommendedProducts(): Product[] {
  const recommendedHandles = [
    "classic-banana-split",
    "chocolate-truffle",
    "rainbow-cake",
    "pink-mouse-baby-shower-cake-1",
    "little-princess-theme-cake",
    "whinnie-the-pooh-cake",
    "pink-ombre-rosette-cake",
    "classic-vanilla-cake",
    "rich-chocolate-cake",
    "black-forest-cake",
  ];
  return ALL_PRODUCTS.filter((p) => recommendedHandles.includes(p.handle)).slice(0, 6);
}

export function getProductsByType(type: string): Product[] {
  const t = type.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.product_type.toLowerCase().includes(t) ||
      p.title.toLowerCase().includes(t) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(t))
  );
}
