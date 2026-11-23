"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  Compass,
  Sparkles,
  Info,
  CheckCircle2,
  Maximize2,
  Scissors,
} from "lucide-react";
import { sound } from "@/lib/sound";

interface CakeSlicingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  cakeWeight?: string;
  cakeTitle?: string;
}

export const CakeSlicingGuideModal: React.FC<CakeSlicingGuideModalProps> = ({
  isOpen,
  onClose,
  cakeWeight = "1 kg",
  cakeTitle = "Lakeview Celebration Cake",
}) => {
  const [guests, setGuests] = useState<number>(10);
  const [cutMode, setCutMode] = useState<"wedges" | "grid" | "concentric">("wedges");

  if (!isOpen) return null;

  // Weight parsing
  const weightGrams =
    cakeWeight.includes("500g")
      ? 500
      : cakeWeight.includes("2 kg")
      ? 2000
      : cakeWeight.includes("3 kg")
      ? 3000
      : 1000;

  const gramsPerPortion = Math.round(weightGrams / guests);
  const anglePerWedge = (360 / guests).toFixed(1);

  // Generate radial wedge lines for SVG
  const center = 140;
  const radius = 110;

  const wedgeLines = Array.from({ length: guests }).map((_, i) => {
    const angleRad = (i * (360 / guests) * Math.PI) / 180;
    const x2 = center + radius * Math.cos(angleRad);
    const y2 = center + radius * Math.sin(angleRad);
    return { x1: center, y1: center, x2, y2 };
  });

  // Generate grid cuts for SVG
  const gridDivisions = Math.ceil(Math.sqrt(guests));
  const gridStep = (radius * 2) / (gridDivisions + 1);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4 bg-espresso/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/90 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playBubblePop();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-cream-100 hover:bg-stone-200 text-espresso transition-colors z-20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center max-w-md mx-auto space-y-1 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-caramel/10 text-caramel text-xs font-bold uppercase tracking-widest">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Slicing Geometry</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-espresso">
              Portion &amp; Cake Cutting Guide
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Visual geometric slicing guide for <strong className="text-espresso">{cakeTitle}</strong> ({cakeWeight}).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Interactive SVG Cake Visualizer (6 cols) */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="relative w-72 h-72 rounded-full glass-card p-4 border border-white/80 shadow-inner flex items-center justify-center">
                <svg width="280" height="280" viewBox="0 0 280 280" className="w-full h-full">
                  <defs>
                    <radialGradient id="cakeGrad" cx="45%" cy="45%" r="60%">
                      <stop offset="0%" stopColor="#FFF2DE" />
                      <stop offset="70%" stopColor="#E8CA9D" />
                      <stop offset="100%" stopColor="#C68B59" />
                    </radialGradient>
                    <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFE0B2" />
                      <stop offset="100%" stopColor="#D89255" />
                    </radialGradient>
                  </defs>

                  {/* Outer Cake Round */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="url(#cakeGrad)"
                    stroke="#8B5A2B"
                    strokeWidth="3"
                    className="shadow-xl"
                  />

                  {/* Piped Perimeter Rosettes */}
                  {Array.from({ length: 16 }).map((_, i) => {
                    const a = (i * (360 / 16) * Math.PI) / 180;
                    const rx = center + (radius - 8) * Math.cos(a);
                    const ry = center + (radius - 8) * Math.sin(a);
                    return (
                      <circle
                        key={i}
                        cx={rx}
                        cy={ry}
                        r="6"
                        fill="#FFF8DC"
                        stroke="#D2B48C"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {/* CUTTING LINES: Mode 1 - Traditional Wedges */}
                  {cutMode === "wedges" && (
                    <g>
                      {wedgeLines.map((line, idx) => (
                        <line
                          key={idx}
                          x1={line.x1}
                          y1={line.y1}
                          x2={line.x2}
                          y2={line.y2}
                          stroke="#2D1A10"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                          strokeLinecap="round"
                        />
                      ))}
                      <circle cx={center} cy={center} r="7" fill="#C68B59" />
                    </g>
                  )}

                  {/* CUTTING LINES: Mode 2 - Event Catering Grid */}
                  {cutMode === "grid" && (
                    <g>
                      {/* Horizontal Grid lines */}
                      {Array.from({ length: gridDivisions }).map((_, i) => {
                        const y = center - radius + (i + 1) * gridStep;
                        const halfW = Math.sqrt(Math.max(0, radius * radius - Math.pow(y - center, 2)));
                        return (
                          <line
                            key={`h-${i}`}
                            x1={center - halfW}
                            y1={y}
                            x2={center + halfW}
                            y2={y}
                            stroke="#2D1A10"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                          />
                        );
                      })}
                      {/* Vertical Grid lines */}
                      {Array.from({ length: gridDivisions }).map((_, i) => {
                        const x = center - radius + (i + 1) * gridStep;
                        const halfH = Math.sqrt(Math.max(0, radius * radius - Math.pow(x - center, 2)));
                        return (
                          <line
                            key={`v-${i}`}
                            x1={x}
                            y1={center - halfH}
                            x2={x}
                            y2={center + halfH}
                            stroke="#2D1A10"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                          />
                        );
                      })}
                    </g>
                  )}

                  {/* CUTTING LINES: Mode 3 - Concentric Circles */}
                  {cutMode === "concentric" && (
                    <g>
                      {/* Inner Circle */}
                      <circle
                        cx={center}
                        cy={center}
                        r={radius * 0.52}
                        fill="none"
                        stroke="#2D1A10"
                        strokeWidth="3"
                        strokeDasharray="5 3"
                      />
                      {/* Outer Radial Cuts */}
                      {Array.from({ length: Math.ceil(guests * 0.65) }).map((_, i) => {
                        const count = Math.ceil(guests * 0.65);
                        const a = (i * (360 / count) * Math.PI) / 180;
                        const x1 = center + radius * 0.52 * Math.cos(a);
                        const y1 = center + radius * 0.52 * Math.sin(a);
                        const x2 = center + radius * Math.cos(a);
                        const y2 = center + radius * Math.sin(a);
                        return (
                          <line
                            key={`o-${i}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#2D1A10"
                            strokeWidth="2.5"
                            strokeDasharray="4 2"
                          />
                        );
                      })}
                      {/* Inner Ring radial cuts */}
                      {Array.from({ length: Math.floor(guests * 0.35) }).map((_, i) => {
                        const count = Math.floor(guests * 0.35);
                        const a = (i * (360 / count) * Math.PI) / 180;
                        const x2 = center + radius * 0.52 * Math.cos(a);
                        const y2 = center + radius * 0.52 * Math.sin(a);
                        return (
                          <line
                            key={`i-${i}`}
                            x1={center}
                            y1={center}
                            x2={x2}
                            y2={y2}
                            stroke="#2D1A10"
                            strokeWidth="2"
                            strokeDasharray="3 2"
                          />
                        );
                      })}
                    </g>
                  )}
                </svg>
              </div>

              {/* Dynamic Slicing Metrics Pill */}
              <div className="mt-3 flex items-center justify-center gap-4 text-xs font-mono">
                <span className="bg-cream-100 text-espresso px-3 py-1 rounded-full border border-stone-200">
                  ≈ <strong>{gramsPerPortion}g</strong> / slice
                </span>
                {cutMode === "wedges" && (
                  <span className="bg-cream-100 text-espresso px-3 py-1 rounded-full border border-stone-200">
                    📐 <strong>{anglePerWedge}°</strong> angle
                  </span>
                )}
              </div>
            </div>

            {/* Right: Controls & Pro Pastry Chef Tips (6 cols) */}
            <div className="md:col-span-6 space-y-5">
              {/* Slicing Style Toggles */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-espresso/80 block">
                  Select Slicing Geometry
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCutMode("wedges");
                      sound.playBubblePop();
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      cutMode === "wedges"
                        ? "bg-espresso text-white border-espresso shadow-md"
                        : "glass-card text-stone-700 hover:bg-white"
                    }`}
                  >
                    🍰 Wedges
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCutMode("grid");
                      sound.playBubblePop();
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      cutMode === "grid"
                        ? "bg-espresso text-white border-espresso shadow-md"
                        : "glass-card text-stone-700 hover:bg-white"
                    }`}
                  >
                    ▦ Banquet Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCutMode("concentric");
                      sound.playBubblePop();
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center ${
                      cutMode === "concentric"
                        ? "bg-espresso text-white border-espresso shadow-md"
                        : "glass-card text-stone-700 hover:bg-white"
                    }`}
                  >
                    🎯 Concentric
                  </button>
                </div>
              </div>

              {/* Guest Count Slider */}
              <div className="space-y-2 bg-white/80 rounded-2xl p-4 border border-stone-200/60 shadow-xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-espresso">Number of Guests</span>
                  <span className="font-mono text-base font-bold text-caramel">
                    {guests} Servings
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="28"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full accent-caramel cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                  <span>Intimate (4)</span>
                  <span>Dinner Party (12)</span>
                  <span>Grand Gathering (28)</span>
                </div>
              </div>

              {/* Master Baker Pro Slicing Advice */}
              <div className="glass-card rounded-2xl p-4 border border-caramel/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-espresso">
                  <Sparkles className="w-3.5 h-3.5 text-caramel" />
                  <span>Master Baker&apos;s Razor-Sharp Slicing Rules</span>
                </div>
                <ul className="text-[11px] text-stone-600 space-y-1.5 list-disc list-inside">
                  <li>
                    <strong className="text-espresso">Warm Clean Knife:</strong> Dip your non-serrated blade into tall hot water for 10 seconds and dry with a cloth before each slice.
                  </li>
                  <li>
                    <strong className="text-espresso">Chilled First Cut:</strong> Slice directly from the refrigerator for razor-sharp ganache edges, then rest 10 mins before serving.
                  </li>
                  <li>
                    <strong className="text-espresso">Flat Lifter:</strong> Slide the cake lifter completely flat under the cardboard base to prevent crumb collapse.
                  </li>
                </ul>
              </div>

              {/* Done button */}
              <button
                type="button"
                onClick={() => {
                  sound.playBubblePop();
                  onClose();
                }}
                className="w-full bg-caramel hover:bg-espresso text-white font-bold text-xs py-3 rounded-2xl transition-all shadow-md"
              >
                Apply Portion Guide
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
