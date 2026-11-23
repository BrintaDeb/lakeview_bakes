import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";

export default function TermsConditionsPage() {
  return (
    <div className="py-12 bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-caramel">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel">
            Legal Terms of Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-espresso">
            Terms & Conditions
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-6 text-stone-700 text-sm leading-relaxed">
          <p>
            By using this website, the user unconditionally agrees to these terms and conditions.
            Lakeview Milk Bar operates and maintains this website for personal shopping, product discovery, and celebration catering services.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Breach of Terms & Conditions
          </h2>
          <p>
            Without prejudice to our other rights under these terms and conditions, if you breach these terms and conditions in any way,
            or we reasonably suspect that you have breached these terms and conditions in any way, we may send you one or more formal warnings;
            temporarily suspend your access to our website; permanently prohibit you from accessing our website; block computers using your IP
            address from accessing our website; and/or take such other action as we reasonably deem appropriate.
          </p>

          <h2 className="font-serif text-xl font-bold text-espresso pt-2 border-b border-stone-200 pb-2">
            Variation & Communications
          </h2>
          <p>
            We may revise these terms and conditions from time to time. You hereby agree to receive communications via SMS, calls, and e-mails
            from Us relating to the Services provided. You can unsubscribe or opt-out from marketing communications anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
