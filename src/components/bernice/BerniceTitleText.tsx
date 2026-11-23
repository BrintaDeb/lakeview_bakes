"use client";

import React from "react";
import Image from "next/image";

export const BerniceTitleText: React.FC = () => {
  return (
    <section className="Section Title_Text_Section Parallax_Wrapper SectionPadded">
      <div className="Title_Text_Heading">
        <h2 className="SectionTitle Cool_Text_Anim Lines">
          Good food should both comfort and nourish the soul.
        </h2>
      </div>

      <div className="Title_Text_Content Cool_Anim Fade">
        <p>
          We are centrally located on MG Road and across Bengaluru&apos;s iconic neighbourhoods. Stop by for coffee, catch up with friends, or take home our legendary celebration cakes and sundaes. Baked fresh daily since 1930 with pure butter and timeless love.
        </p>
      </div>

      <div
        className="Parallax_Front Absolute_Img Contain_Fluid"
        data-p-displace="-50%"
        style={{
          width: 160,
          height: 160,
          position: "absolute",
          top: "60%",
          left: "8%",
          zIndex: 1,
        }}
      >
        <Image
          src="/assets/decorative/cake.svg"
          alt="Vintage Bakery Line Art"
          width={160}
          height={160}
          style={{ objectFit: "contain" }}
        />
      </div>
    </section>
  );
};
