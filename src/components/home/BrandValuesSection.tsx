"use client";

import React from "react";
import Image from "next/image";
import { BRAND_VALUES } from "@/data/brand";
import { TiltCard } from "@/components/ui/TiltCard";

export const BrandValuesSection: React.FC = () => {
  return (
    <section className="py-20 bg-cream-50 relative border-y border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {BRAND_VALUES.map((val) => (
            <TiltCard
              key={val.title}
              maxTilt={8}
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center space-y-3 border border-white/80 group shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src={val.icon}
                  alt={val.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <h3 className="font-serif text-sm sm:text-base font-bold text-espresso group-hover:text-caramel transition-colors">
                  {val.title}
                </h3>
                {val.description && (
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                    {val.description}
                  </p>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
