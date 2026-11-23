"use client";

import React, { useEffect, useRef } from "react";

interface CrumbParticle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  sizeFactor: number;
}

export const CrumbCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let crumbs: CrumbParticle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ffa7ee", "#147c98", "#ffdaed", "#f8f8f2", "#c68b59"];

    const createCrumbs = (x: number, y: number, count = 5) => {
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        crumbs.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          radius: size / 2,
          color,
          alpha: 1,
          speedX: (Math.random() - 0.5) * 6,
          speedY: -(Math.random() * 5 + 2),
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          sizeFactor: Math.random() * 0.5 + 0.8,
        });
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      createCrumbs(e.clientX, e.clientY, 8);
    };

    const handleInteractiveHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("button") ||
          target.closest("a") ||
          target.closest(".interactive-crumb"))
      ) {
        if (Math.random() > 0.6) {
          createCrumbs(e.clientX, e.clientY, 3);
        }
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handleInteractiveHover);

    const gravity = 0.25;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = crumbs.length - 1; i >= 0; i--) {
        const c = crumbs[i];
        c.x += c.speedX;
        c.y += c.speedY;
        c.speedY += gravity;
        c.rotation += c.rotationSpeed;
        c.alpha -= 0.015;

        if (c.alpha <= 0 || c.y > canvas.height + 20) {
          crumbs.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);
        ctx.scale(c.radius * c.alpha, c.radius * c.alpha);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = Math.max(0, c.alpha);

        // Sweet organic crumb pebble shape
        ctx.beginPath();
        ctx.moveTo(-1, -0.6);
        ctx.quadraticCurveTo(-0.6, -1.2, 0.8, -0.6);
        ctx.quadraticCurveTo(1.4, -0.2, 0.7, 0.6);
        ctx.quadraticCurveTo(0.3, 1.0, -1, 0.7);
        ctx.quadraticCurveTo(-1.3, 0.5, -1, -0.6);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handleInteractiveHover);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
};
