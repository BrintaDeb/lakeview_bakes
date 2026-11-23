"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<{
    text: string | null;
    isHovered: boolean;
    isClicked: boolean;
  }>({
    text: null,
    isHovered: false,
    isClicked: false,
  });

  const springConfig = { damping: 28, stiffness: 420, mass: 0.2 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const dotConfig = { damping: 40, stiffness: 1000 };
  const dotX = useSpring(-100, dotConfig);
  const dotY = useSpring(-100, dotConfig);

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest("[data-cursor]") as HTMLElement | null;
      const clickableTarget = target.closest("button, a, input, select, textarea, [role='button']");

      if (cursorTarget) {
        setCursorState((prev) => ({
          ...prev,
          text: cursorTarget.getAttribute("data-cursor") || "View",
          isHovered: true,
        }));
      } else if (clickableTarget) {
        setCursorState((prev) => ({
          ...prev,
          text: null,
          isHovered: true,
        }));
      } else {
        setCursorState((prev) => ({
          ...prev,
          text: null,
          isHovered: false,
        }));
      }
    };

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicked: true }));
    };

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicked: false }));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, dotX, dotY]);

  if (!mounted || isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer Glow Ring / Capsule Pill */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState.isClicked ? 0.85 : cursorState.isHovered ? 1.4 : 1,
          width: cursorState.text ? 76 : cursorState.isHovered ? 48 : 28,
          height: cursorState.text ? 32 : cursorState.isHovered ? 48 : 28,
          borderRadius: cursorState.text ? "9999px" : "50%",
          borderColor: cursorState.isHovered ? "rgba(217, 119, 6, 0.7)" : "rgba(197, 155, 39, 0.4)",
          backgroundColor: cursorState.isHovered
            ? "rgba(254, 243, 199, 0.45)"
            : "rgba(255, 255, 255, 0.15)",
          backdropFilter: cursorState.isHovered ? "blur(4px)" : "blur(1px)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="fixed top-0 left-0 border border-caramel/50 flex items-center justify-center shadow-lg"
      >
        {cursorState.text && (
          <span className="text-[10px] font-bold uppercase tracking-wider text-espresso">
            {cursorState.text}
          </span>
        )}
      </motion.div>

      {/* Central Honey Pip */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorState.isHovered ? 0 : 1,
          opacity: cursorState.isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-caramel shadow-sm"
      />
    </div>
  );
};
