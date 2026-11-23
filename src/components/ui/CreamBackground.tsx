"use client";

import React from "react";
import { motion } from "framer-motion";

export const CreamBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Ambient Confectionery Glow Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.08, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-caramel/15 via-rose-pastel/15 to-transparent blur-3xl opacity-70"
        />

        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -20, 0],
            scale: [1, 0.92, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-32 w-[32rem] h-[32rem] rounded-full bg-gradient-to-bl from-amber-200/20 via-cream-100/40 to-transparent blur-3xl opacity-60"
        />

        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, -25, 35, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-rose-pastel/10 via-caramel/10 to-transparent blur-3xl opacity-50"
        />

        {/* Floating Fine Sugar & Cocoa Dust Particles */}
        <div className="absolute inset-0 opacity-40 mix-blend-multiply">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sugar-dust" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="8" cy="12" r="1" fill="#C59B27" opacity="0.3" />
                <circle cx="34" cy="45" r="1.2" fill="#D97706" opacity="0.25" />
                <circle cx="52" cy="18" r="0.8" fill="#F43F5E" opacity="0.2" />
                <circle cx="22" cy="38" r="0.9" fill="#78350F" opacity="0.15" />
                <circle cx="48" cy="52" r="1.1" fill="#C59B27" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sugar-dust)" />
          </svg>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CreamWaveDivider: React.FC<{ flip?: boolean; className?: string }> = ({
  flip = false,
  className = "",
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${
        flip ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-10 sm:h-16 text-cream-50"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32L48,42.7C96,53,192,75,288,80C384,85,480,75,576,58.7C672,43,768,21,864,21.3C960,21,1056,43,1152,58.7C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
};
