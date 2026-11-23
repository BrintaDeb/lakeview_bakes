"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles, History, ArrowLeftRight } from "lucide-react";

interface VintageSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const VintageSlider: React.FC<VintageSliderProps> = ({
  beforeImage = "/assets/banners/quote-desktop.png",
  afterImage = "/assets/banners/banner-hero-desktop.png",
  beforeLabel = "1930 Ulsoor Lake Origin",
  afterLabel = "2024 Modern Bengaluru Flagship",
  className = "",
}) => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage (0 to 100)
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current || e.buttons === 1) {
      handleMove(e.clientX);
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={() => {
        isDragging.current = true;
      }}
      onMouseUp={() => {
        isDragging.current = false;
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      data-cursor="Slide"
      className={`relative select-none overflow-hidden rounded-3xl aspect-[16/8] sm:aspect-[16/7] glass-panel p-2.5 border border-white/90 shadow-2xl cursor-ew-resize group ${className}`}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-stone-900">
        {/* Right / Modern Image (2024) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={afterLabel}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
            {afterLabel}
          </div>
        </div>

        {/* Left / Vintage Image (1930) with Clip Path */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
        >
          <div className="relative w-full h-full filter sepia-[0.35] contrast-[1.05]">
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-amber-950/20 mix-blend-color" />
            <div className="absolute top-4 left-4 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full text-amber-200 text-[10px] font-bold tracking-widest uppercase">
              {beforeLabel}
            </div>
          </div>
        </div>

        {/* Golden Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-200 via-caramel to-amber-400 pointer-events-none shadow-xl"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Drag Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-espresso border-2 border-amber-300 text-amber-200 flex items-center justify-center shadow-2xl transition-transform duration-150 group-hover:scale-110">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom Helper Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-1 rounded-full text-[10px] text-white/80 pointer-events-none font-medium flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-300" />
          <span>Drag left or right to reveal 94-year heritage transformation</span>
        </div>
      </div>
    </div>
  );
};
