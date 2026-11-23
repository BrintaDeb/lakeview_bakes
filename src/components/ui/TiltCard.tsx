"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
  id?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
  scale = 1.02,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
    }
  }, []);

  // Spring physics for buttery-smooth non-jerky tilt
  const springConfig = { damping: 22, stiffness: 280, mass: 0.4 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scaleVal = useSpring(1, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPct = x / rect.width - 0.5; // -0.5 to 0.5
      const yPct = y / rect.height - 0.5;

      rotateX.set(-yPct * maxTilt * 2);
      rotateY.set(xPct * maxTilt * 2);
      scaleVal.set(scale);

      setGlarePos({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
      });
    },
    [isTouch, maxTilt, scale, rotateX, rotateY, scaleVal]
  );

  const handleMouseEnter = () => {
    if (!isTouch) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scaleVal.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isTouch ? 0 : rotateX,
        rotateY: isTouch ? 0 : rotateY,
        scale: isTouch ? 1 : scaleVal,
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform transform-gpu ${className}`}
    >
      {children}

      {/* Dynamic Specular Light Glare (Desktop only) */}
      {glare && !isTouch && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.38 : 0,
            background: `radial-gradient(circle 340px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.9), rgba(251, 191, 36, 0.2), transparent 70%)`,
          }}
        />
      )}
    </motion.div>
  );
};
