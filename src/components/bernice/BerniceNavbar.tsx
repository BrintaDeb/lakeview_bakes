"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ALL_PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import Image from "next/image";
import { haptics } from "@/lib/haptics";

export const BerniceNavbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const { user, setIsAuthModalOpen } = useAuth();

  const [filled, setFilled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setFilled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen && !isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const results = ALL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.product_type || "").toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      ).slice(0, 8);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/account", label: user ? "My Orders" : "Sign In" },
    { href: "/contact", label: "Contact" },
  ];

  const headerClass = `header-wrapper ${filled ? "Filled" : ""} ${isSearchOpen ? "FilledSearch" : ""}`;

  return (
    <>
      <header id="section-header" className={headerClass}>
        {/* Site Logo (Original Authentic Lakeview Logo SVG) */}
        <Link href="/" className="site_logo flex items-center group" style={{ width: 190, height: 52, position: "relative" }}>
          <div
            className={`Logo_Dark Contain_Fluid ${filled ? "Shown" : ""}`}
            style={{ width: 190, height: 48, display: "flex", alignItems: "center" }}
          >
            <Image
              src="/assets/logo/lakeview-logo.svg"
              alt="Lakeview Milk Bar Logo"
              width={190}
              height={50}
              className="object-contain w-auto h-11 transition-transform group-hover:scale-105"
              priority
            />
          </div>
          <div
            className={`Logo_Light Contain_Fluid ${!filled ? "Shown" : ""}`}
            style={{ width: 190, height: 48, display: "flex", alignItems: "center" }}
          >
            <Image
              src="/assets/logo/lakeview-logo.svg"
              alt="Lakeview Milk Bar Logo"
              width={190}
              height={50}
              className="object-contain w-auto h-11 transition-transform group-hover:scale-105 filter brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              priority
            />
          </div>
        </Link>

        {/* Navigation & Menu */}
        <nav>
          <ul className="main-menu">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="Grow_Anim"
                  href={link.href}
                  style={pathname === link.href ? { color: "var(--pink)" } : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="main-menu_right">
            {/* Patron Account / Sign In Icon */}
            {user ? (
              <Link
                href="/account"
                className="menu_icon"
                title={`Patron Account (${user.name})`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: "var(--pink)",
                  color: "var(--dark)",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  textDecoration: "none",
                  border: "2px solid currentColor",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => {
                  haptics.light();
                  setIsAuthModalOpen(true);
                }}
                className="menu_icon"
                aria-label="Patron Sign In"
                title="Sign In with Phone"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              >
                <svg className="Icon Icon-account" role="presentation" viewBox="0 0 20 20" style={{ width: 17, height: 17 }}>
                  <path
                    d="M10 0a5 5 0 100 10 5 5 0 000-10zm0 12c-5.33 0-8 2.67-8 8h16c0-5.33-2.67-8-8-8z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            )}

            {/* Cart Icon SVG (Exact Bernice Path) */}
            <button
              className="menu_icon cart"
              onClick={() => {
                haptics.medium();
                setIsCartOpen(true);
              }}
              aria-label="Open cart"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <svg className="Icon Icon-cart" role="presentation" viewBox="0 0 17 20">
                <path
                  d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
                  fill="currentColor"
                />
              </svg>
              <span
                className={`Header_CartDot ${totalItems > 0 ? "is-visible" : ""}`}
                style={
                  {
                    "--item-count": totalItems,
                    display: totalItems > 0 ? "flex" : "none",
                  } as React.CSSProperties
                }
              />
            </button>

            {/* Search Icon SVG (Exact Bernice Path) */}
            <button
              className="menu_icon search"
              onClick={() => {
                haptics.light();
                setIsSearchOpen(!isSearchOpen);
              }}
              aria-label="Toggle search"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <svg className="Icon Icon-search" role="presentation" viewBox="0 0 18 17">
                <g
                  transform="translate(1 1)"
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="square"
                >
                  <path d="M16 16l-5.0752-5.0752" />
                  <circle cx="6.4" cy="6.4" r="6.4" />
                </g>
              </svg>
            </button>

            {/* Mobile Burger Icon SVG (Exact Bernice Path) */}
            <button
              className="menu_icon burger"
              onClick={() => {
                haptics.light();
                setIsMobileMenuOpen(true);
              }}
              aria-label="Open mobile menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              <svg className="Icon Icon-nav" role="presentation" viewBox="0 0 20 20">
                <path d="M0 4h20v2H0zm0 5h20v2H0zm0 5h20v2H0z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Bernice Search Popup Drawer */}
      {isSearchOpen && (
        <>
          <div
            onClick={() => setIsSearchOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(17,34,41,0.6)",
              backdropFilter: "blur(6px)",
              zIndex: 10001,
            }}
          />
          <div
            className="Search_Popup animate-in slide-in-from-top duration-300"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              maxHeight: "85vh",
              overflowY: "auto",
              zIndex: 10002,
              backgroundColor: "var(--beige)",
              padding: "100px 4vw 40px",
              boxShadow: "0 10px 40px rgba(17,34,41,0.25)",
              borderBottom: "2px solid var(--blue)",
            }}
          >
            <div style={{ maxWidth: 800, margin: "0 auto", position: "relative" }}>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, bakes, and confections..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  borderBottom: "2px solid var(--blue)",
                  fontFamily: "var(--title-font)",
                  fontSize: "2.5rem",
                  textTransform: "uppercase",
                  color: "var(--dark)",
                  outline: "none",
                  paddingBottom: "10px",
                }}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "10px",
                  background: "none",
                  border: "none",
                  fontFamily: "var(--title-font)",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "var(--dark)",
                }}
              >
                ✕
              </button>

              {searchResults.length > 0 && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "30px",
                  }}
                >
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.handle}`}
                      onClick={() => setIsSearchOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        textDecoration: "none",
                        padding: "8px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.6)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: "1rem",
                          overflow: "hidden",
                          position: "relative",
                          flexShrink: 0,
                        }}
                      >
                        <Image
                          src={item.image || "/assets/products/belgian-truffle-cake.jpg"}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <h4
                          style={{
                            fontFamily: "var(--title-font)",
                            fontSize: "1rem",
                            textTransform: "uppercase",
                            color: "var(--dark)",
                            margin: 0,
                          }}
                        >
                          {item.title}
                        </h4>
                        <span
                          style={{
                            fontFamily: "var(--text-font)",
                            fontSize: "0.9rem",
                            color: "var(--blue)",
                            fontWeight: 600,
                          }}
                        >
                          ₹{item.price_min}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10003,
            backgroundColor: "var(--dark)",
            color: "var(--beige)",
            padding: "40px 6vw",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ display: "inline-block" }}
            >
              <Image
                src="/assets/logo/lakeview-logo.svg"
                alt="Lakeview Milk Bar Logo"
                width={170}
                height={46}
                className="h-10 w-auto object-contain filter brightness-0 invert"
                priority
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "var(--beige)",
                fontSize: "2rem",
                cursor: "pointer",
                padding: "8px",
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px 0" }}>
            {navLinks.map((link) => (
              <li key={link.href} style={{ marginBottom: "16px" }}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    fontFamily: "var(--title-font)",
                    fontSize: "2rem",
                    textTransform: "uppercase",
                    color: pathname === link.href ? "var(--pink)" : "var(--beige)",
                    textDecoration: "none",
                    display: "block",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "auto",
              paddingTop: "20px",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              fontSize: "0.9rem",
              opacity: 0.85,
            }}
          >
            <a href="tel:+919663812036" style={{ color: "var(--beige)", textDecoration: "none" }}>
              📞 +91 9663812036 (MG Road Hotline)
            </a>
            <span>📍 Kannan Bldg, 89 MG Road, Bengaluru</span>
          </div>
        </div>
      )}
    </>
  );
};
