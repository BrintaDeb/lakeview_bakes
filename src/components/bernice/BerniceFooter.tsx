"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export const BerniceFooter: React.FC = () => {
  return (
    <footer className="Section SectionPadded">
      <div className="Footer_Top">
        <div className="Footer_Infos">
          <Link href="/" className="inline-block mb-4 group">
            <div className="relative h-13 w-52">
              <Image
                src="/assets/logo/lakeview-logo.svg"
                alt="Lakeview Milk Bar"
                width={200}
                height={55}
                className="h-12 w-auto object-contain filter brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>
          <p>
            Kannan Bldg, 89 MG Road
            <br />
            Bengaluru, KA 560001
          </p>
          <a href="mailto:support@lakeviewmilkbar.in">support@lakeviewmilkbar.in</a>
          <a href="tel:+919663812036">+91 9663812036</a>

          <div className="Footer_Socials" style={{ marginTop: "1rem" }}>
            <a
              className="Menu_Drawer_Instagram_Link Grow_Anim"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>

        <div className="Footer_Menu">
          <ul>
            <li>
              <Link className="Grow_Anim" href="/collections/cakes">
                Cakes
              </Link>
            </li>
            <li>
              <Link className="Grow_Anim" href="/collections/sundaes">
                Sundaes
              </Link>
            </li>
            <li>
              <Link className="Grow_Anim" href="/collections/desserts">
                Bakes
              </Link>
            </li>
            <li>
              <Link className="Grow_Anim" href="/menu">
                Full Menu
              </Link>
            </li>
          </ul>
        </div>

        <div className="Footer_Menu">
          <ul>
            <li>
              <Link className="Grow_Anim" href="/about">
                About (1930)
              </Link>
            </li>
            <li>
              <Link className="Grow_Anim" href="/custom-cake">
                3D Cake Builder
              </Link>
            </li>
            <li>
              <Link className="Grow_Anim" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="Footer_Newsletter">
          <h3>Join Our Newsletter</h3>
          <p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>
            Receive exclusive seasonal specials and midnight ice cream drops.
          </p>
        </div>
      </div>

      <div
        className="Footer_Bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid var(--blue)",
          paddingTop: "2rem",
          marginTop: "3rem",
          fontFamily: "var(--title-font)",
          textTransform: "uppercase",
          fontSize: "1rem",
        }}
      >
        <div>© {new Date().getFullYear()} Lakeview Milk Bar · Bengaluru</div>
        <div>Ulsoor Lake 1930 · MG Road 1970</div>
      </div>
    </footer>
  );
};
