"use client";

import React from "react";
import Image from "next/image";

export const BerniceArchesMarquee: React.FC = () => {
  const images = [
    { src: "/assets/products/belgian-truffle-cake.jpg", rand: "0.2" },
    { src: "/assets/products/2-tier-rainbow-cake.jpg", rand: "0.8" },
    { src: "/assets/products/classic-banana-split.jpg", rand: "0.4" },
    { icon: "/assets/decorative/cake_full.svg" },
    { src: "/assets/products/strawberry-special-sundae.jpg", rand: "0.6" },
    { src: "/assets/products/abstract-sail-and-macaron-cake.jpg", rand: "0.3" },
    { src: "/assets/products/chocolate-boat-sundae.jpg", rand: "0.5" },
    { icon: "/assets/decorative/cookie_full.svg" },
    { src: "/assets/products/fresh-fruit-gateau-cake.jpg", rand: "0.7" },
    { src: "/assets/products/black-forest-royal-cake.jpg", rand: "0.2" },
  ];

  // Duplicate for seamless infinite loop
  const allCards = [...images, ...images];

  return (
    <section className="Section Arches_Display_Section Parallax_Wrapper SectionPadded">
      <div className="Arches_Display_Heading Centered Parallax_Front" data-p-displace="-50%">
        <h2 className="SectionTitle Cool_Text_Anim Lines">
          The best things in life are sweet
        </h2>
      </div>

      <div className="Arches_Display_Container">
        <div className="Arches_Display_Inner Cool_Anim Fade Multiple">
          {allCards.map((item, idx) => {
            if ("icon" in item && item.icon) {
              return (
                <div key={`icon-${idx}`} className="Arches_Display_Icon">
                  <Image
                    src={item.icon}
                    alt="Bakery Icon"
                    width={120}
                    height={120}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
              );
            }

            return (
              <div
                key={`win-${idx}`}
                className="Window_Image Instant"
                style={{ "--random": item.rand || "0.5" } as React.CSSProperties}
              >
                <div className="Window_Image_Limit">
                  <div className="Window_Image_Container Fluid">
                    <Image
                      src={item.src || "/assets/products/belgian-truffle-cake.jpg"}
                      alt="Lakeview Confectionery Arch"
                      fill
                      sizes="30vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
