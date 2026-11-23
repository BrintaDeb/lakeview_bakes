import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Caveat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModal } from "@/components/auth/AuthModal";
import { CartDrawer } from "@/components/common/CartDrawer";
import { StickyOrderBar } from "@/components/common/StickyOrderBar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { WhatsAppQuickOrder } from "@/components/common/WhatsAppQuickOrder";
import { BerniceNavbar } from "@/components/bernice/BerniceNavbar";
import { BerniceFooter } from "@/components/bernice/BerniceFooter";
import { CrumbCanvas } from "@/components/bernice/CrumbCanvas";
import { MobileAppTabBar } from "@/components/mobile/MobileAppTabBar";
import { RouteTypographyWrapper } from "@/components/layout/RouteTypographyWrapper";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cursive = Caveat({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#112229",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Lakeview Milk Bar — Baking is our Love Language Since 1930",
  description:
    "Bengaluru's iconic heritage dessert parlour & bakery. Handcrafted celebration cakes, legendary sundaes, fresh bakes, and midnight drive-in service across MG Road, Indiranagar, Kalyan Nagar, and Whitefield.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Lakeview Milk Bar",
  },
  formatDetection: {
    telephone: true,
  },
  keywords: [
    "Lakeview Milk Bar",
    "Bangalore Cakes",
    "MG Road Ice Cream",
    "Custom Cakes Bangalore",
    "Eggless Cakes Bengaluru",
    "Banana Split Sundae",
    "Bakery Bengaluru",
  ],
  icons: {
    icon: "/assets/logo/favicon.png",
    shortcut: "/assets/logo/favicon.png",
    apple: "/assets/logo/favicon.png",
  },
  openGraph: {
    title: "Lakeview Milk Bar — Baking is our Love Language Since 1930",
    description: "Handcrafted cakes, legendary sundaes, and fresh bakes in Bengaluru since 1930.",
    url: "https://lakeviewmilkbar.in",
    siteName: "Lakeview Milk Bar",
    images: [
      {
        url: "/assets/banners/banner-hero-desktop.png",
        width: 1800,
        height: 800,
        alt: "Lakeview Milk Bar",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${cursive.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-caramel/20 selection:text-espresso">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <CustomCursor />
              <CrumbCanvas />
              <BerniceNavbar />
              <main className="flex-1 pb-16 md:pb-0">
                <RouteTypographyWrapper>{children}</RouteTypographyWrapper>
              </main>
              <BerniceFooter />
              <CartDrawer />
              <StickyOrderBar />
              <WhatsAppQuickOrder />
              <AuthModal />
              <MobileAppTabBar />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
