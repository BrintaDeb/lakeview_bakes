import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "lakeviewmilkbar.in",
      },
      {
        protocol: "https",
        hostname: "lakeview-nh.myshopify.com",
      },
    ],
  },
};

export default nextConfig;
