# Lakeview Milk Bar — Heritage Bakery & E-Commerce Platform 🎂

> **Baking is our Love Language Since 1930**  
> Bengaluru's iconic heritage dessert parlour & bespoke bakery platform, built with Next.js 15, Tailwind CSS, Framer Motion, and Razorpay.

---

## ✨ Features

- **Iconic Visual Experience:** High-craft typography (`Apfel Grotezk`, `Cormorant Garamond`), responsive interactive arch marquees, dynamic ingredient hover reveals, and celebratory particle systems.
- **Bespoke Cake Studio:** Customizable celebration cakes with weights (0.5 kg to 2 kg), 100% Eggless switches, artisan cursive piped inscriptions with live previews, and express scheduling.
- **Midnight Drive-In Car-Hop:** Dedicated pickup workflow for MG Road Flagship, Indiranagar, Koramangala, and Jayanagar with vehicle make/model & plate number tracking.
- **Razorpay Payment Gateway:** Integrated Razorpay checkout with server-side cryptographic HMAC-SHA256 signature verification and WhatsApp concierge ordering alternative.
- **Live Order Tracking (`/track/[orderId]`):** Real-time 1-second countdown ticker with dynamic 5-stage progress (Order Received → Baking & Hand-Icing → Quality Pack → Express Dispatch → Delivered).
- **High-Security Patron Portal (`/account`):** Dynamic 6-digit cryptographic OTP generation, anti-brute force attempt tracking, 30s rate-limiting cooldown, and tamper-proof HMAC-SHA256 signed session cookies.
- **Interactive 3D Cake Builder (`/custom-cake`):** Multi-tier customization with flavor radar dials and instant price computation.
- **Interactive Slicing Geometry Guide:** Geometric radial and grid portioning guides with guest count sliders.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Styling:** Tailwind CSS, PostCSS, Lucide Icons, Canvas Confetti
- **Animations:** Framer Motion, GSAP, CSS Curves
- **Payments:** Razorpay Checkout SDK & REST API
- **Persistence:** Local JSON Database (`src/data/db/`) ready for MongoDB / MySQL migration

---

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
npm run build
npm start
```

---

## 🍰 License
© 1930–2026 Lakeview Milk Bar. All rights reserved.
