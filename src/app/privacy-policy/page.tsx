import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-caramel">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel">
            Official Store Policy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso">
            Privacy Policy
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-stone-700 text-sm leading-relaxed">
          <p>
            This Privacy Policy describes how Lakeview Milk Bar manages personal information and respects privacy.
            This policy may be amended from time to time.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Gathering Of Personal Data
          </h2>
          <p>
            As a site visitor, you can participate in many activities without giving any Personal Data. Some of the information
            we ask you for is designated as mandatory, and some are voluntary, depending on the activity. You can only participate
            in a specific activity if you give the necessary information. However, when you sign up to use Lakeview Milk Bar and
            place orders as a customer, we may collect your contact information, such as your name, phone number, address, and
            email address, as well as profile information, such as your password, information about your purchases, and information about you.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Use of Information
          </h2>
          <p>
            We use the personal information collected to process your bakery orders, verify payments through secure gateways like Razorpay,
            coordinate door-to-door delivery with dispatch partners, send order status alerts via SMS/WhatsApp, and communicate product
            updates when you opt-in. We do not sell or rent customer data to third-party brokers.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Security & Contact
          </h2>
          <p>
            All checkout and payment transactions are processed through encrypted 256-bit SSL connections. For queries regarding our
            compliance with Consumer Protection (E-Commerce) Rules and Information Technology Rules, reach out directly to{" "}
            <a href={`mailto:${BRAND_INFO.officialEmail}`} className="text-caramel font-bold underline">
              {BRAND_INFO.officialEmail}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
