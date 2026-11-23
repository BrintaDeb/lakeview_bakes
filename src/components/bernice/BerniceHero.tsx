"use client";

import React, { useRef, useState } from "react";

export const BerniceHero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="Section Hero_Section Dark_Section">
      <div className="Hero_Wrapper Parallax_Wrapper">
        {/* Background Cinematic Cake & Pastry Video */}
        <div className="Hero_Back_Img Parallax_Back_Hero Fluid">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/banners/banner-hero-desktop.png"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.68,
              filter: "brightness(0.92) contrast(1.04)",
              zIndex: 0,
            }}
          >
            <source src="/videos/hero-cake-pastry.mp4" type="video/mp4" />
          </video>

          {/* Atmospheric Dark Ink Scrim Overlay for Typographic Contrast */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(17,34,41,0.85) 0%, rgba(17,34,41,0.45) 50%, rgba(17,34,41,0.65) 100%)",
              zIndex: 1,
            }}
          />
        </div>

        {/* Hero Content with Bernice Typographic Layout */}
        <div className="Hero_Content Parallax_Hero_Front" style={{ position: "relative", zIndex: 2 }}>
          <div className="Hero_Heading_wrapper">
            <h1 className="Hero_Heading Cool_Text_Anim Words">
              A Baking Love Affair
            </h1>

            {/* Bernice Floating Pink Circle "Indulge" CTA with Bite-Mask */}
            <div className="Hero_Float Parallax_Hero_Front">
              <div className="Cool_Anim Fade Grow">
                <a
                  href="#hero-anchor"
                  className="Hero_Float_Inner"
                  data-content="Indulge"
                  title="Indulge in Lakeview confections"
                >
                  Indulge
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div id="hero-anchor" style={{ position: "relative", top: -80 }}></div>
    </section>
  );
};
