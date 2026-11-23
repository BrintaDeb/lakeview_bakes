import React from "react";
import { BerniceHero } from "@/components/bernice/BerniceHero";
import { BerniceTitleText } from "@/components/bernice/BerniceTitleText";
import { BerniceCollectionDisplay } from "@/components/bernice/BerniceCollectionDisplay";
import { BerniceCollectionBrowser } from "@/components/bernice/BerniceCollectionBrowser";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (A Baking Love Affair + Floating Bite-Mask CTA) */}
      <BerniceHero />

      {/* 2. Title Text Section (Good food should both comfort and nourish the soul) */}
      <BerniceTitleText />

      {/* 3. Collection Display Section (3 Arch Cards + Hover Ingredients + Angled Bestsellers Marquee) */}
      <BerniceCollectionDisplay />

      {/* 4. Collections Browser Section (Filter Tabs + Confectionery Grid + Quick Add) */}
      <BerniceCollectionBrowser />
    </>
  );
}


