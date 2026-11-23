import { Collection } from "@/types";
import rawCollectionsData from "./collections.json";

export const ALL_COLLECTIONS: Collection[] = (rawCollectionsData.collections as any[]).map((c) => ({
  id: c.id,
  title: c.title,
  handle: c.handle,
  description: c.description || `Explore Lakeview's hand-crafted selection of ${c.title.toLowerCase()}.`,
  image: c.image ? { src: `/assets/promotions/collection-${c.handle}.jpg`, alt: c.title } : undefined,
  products_count: c.products_count || 10,
}));

export const FEATURED_COLLECTIONS = [
  {
    title: "Cakes",
    handle: "cake",
    image: "/assets/promotions/category-cakes.png",
    description: "Iconic artisan celebration cakes baked fresh to order.",
  },
  {
    title: "Desserts",
    handle: "desserts",
    image: "/assets/promotions/category-dessert.png",
    description: "Gourmet pastries, sundaes, tarts, and signature jar bakes.",
  },
  {
    title: "Bakery",
    handle: "bakery",
    image: "/assets/promotions/category-bakery.png",
    description: "Freshly baked artisan breads, puffs, rolls, and cookies.",
  },
];

export function getCollectionByHandle(handle: string): Collection | undefined {
  return ALL_COLLECTIONS.find((c) => c.handle.toLowerCase() === handle.toLowerCase());
}
