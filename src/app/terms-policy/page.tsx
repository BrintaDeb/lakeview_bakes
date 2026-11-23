import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";

export default function TermsPolicyPage() {
  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-caramel">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel">
            Legal Terms & Policy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso">
            Terms & Policy
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-stone-700 text-sm leading-relaxed">
          <p>
            By using this site the user has unconditionally accepted the terms and conditions of use as given hereunder and/or elsewhere on the site.
          </p>

          <p>
            &quot;Lakeview Milk Bar&quot; owns this website. Without the written consent of Lakeview Milk Bar, no part of this website,
            or any other website owned, operated, controlled, or licenced by Lakeview Milk Bar and/or its associates or sister concerns,
            may be copied, reproduced, republished, transmitted, downloaded, uploaded, or used in any other way, whether for commercial
            purposes or otherwise. The Company and/or its associates, sister concerns, or affiliates&apos; copyright and other intellectual
            rights are violated when this requirement is broken, and the Government of India may take legal action in accordance with the law.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Delivery Attempts & Handmade Disclaimers
          </h2>
          <p>
            There would only be one delivery attempt per cake. The customer will still be charged for the order if the delivery is not made
            during that attempt for the following reasons: wrong or inadequate address, receiver not at home, address found locked, or refusal
            to accept. Such items would not be eligible for refunds.
          </p>
          <p>
            The product&apos;s weight, size, colour, and other details are simply approximations that are listed in the product photographs.
            We primarily sell handmade goods. So, there can be a natural difference between the products&apos; photographs and their actual
            finished products. Due to circumstances or demands outside of its control, Lakeview Milk Bar reserves the right to offer a comparable
            or alternative product.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Feedback & Queries
          </h2>
          <p>
            The user should contact us by email at{" "}
            <a href={`mailto:${BRAND_INFO.officialEmail}`} className="text-caramel font-bold underline">
              {BRAND_INFO.officialEmail}
            </a>{" "}
            if he has any concerns, uncertainties, or confusion about any of the terms and conditions stated above.
          </p>
        </div>
      </div>
    </div>
  );
}
