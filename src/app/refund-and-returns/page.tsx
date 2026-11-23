import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, AlertTriangle, ShieldCheck, Mail } from "lucide-react";
import { BRAND_INFO } from "@/data/brand";

export default function RefundAndReturnsPage() {
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
            Return & Refund Policy
          </h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/80 shadow-xl space-y-8 text-stone-700 text-sm leading-relaxed">
          {/* Returns Section */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-espresso border-b border-stone-200 pb-2">
              Returns
            </h2>
            <p>
              We take stringent measures to ensure that the items delivered to you are in perfect condition.
              However, there is a possibility that the item may be damaged during transit or a wrong item is delivered;
              in that case, it has to be reported <strong>within 4 hours of delivery</strong>. Don&apos;t worry, you can
              write to us at <a href={`mailto:${BRAND_INFO.officialEmail}`} className="text-caramel font-bold underline">{BRAND_INFO.officialEmail}</a> or
              WhatsApp us, and we will handle it.
            </p>
          </section>

          {/* Refunds / Cancellations */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-espresso border-b border-stone-200 pb-2">
              Refunds & Cancellations
            </h2>
            <p>
              Lakeview Milk Bar reserves the exclusive right to refuse or cancel any transaction/order for a customer
              if the product is listed at an incorrect price or unavailable. In such events, if the payments have been
              processed by Lakeview Milk Bar, the amount will be refunded via the same original payment mode, and the user
              will be notified of the same with a reasonable mode of communication.
            </p>
            <p>
              Please understand that the orders are processed in time slots, and we accept cancellation requests.
              The refund processing concerns the status of your order and requires a case-by-case evaluation.
              Consider the conditions stated below:
            </p>
          </section>

          {/* Custom Cakes Rules */}
          <div className="p-6 rounded-2xl bg-white/70 border border-stone-200 space-y-3">
            <h3 className="font-serif text-lg font-bold text-espresso">
              Custom Cakes / Products Cancellation Matrix:
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
              <li><strong>Order Placed:</strong> Full Refund if requested within 4 hours</li>
              <li><strong>Once the Preparation Starts:</strong> 20% will be refunded</li>
              <li><strong>Order Prepared:</strong> No Refund</li>
              <li><strong>Ready for Pickup (Order Packed for Delivery):</strong> No Refund</li>
              <li><strong>Out for Delivery:</strong> No Refund</li>
              <li><strong>Day of Delivery:</strong> No Cancellation permitted on the day of delivery</li>
            </ul>
          </div>

          {/* Regular Cakes Rules */}
          <div className="p-6 rounded-2xl bg-white/70 border border-stone-200 space-y-3">
            <h3 className="font-serif text-lg font-bold text-espresso">
              Regular Cakes / Products:
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
              <li><strong>Order Placed:</strong> No Cancellation, No Refund</li>
              <li><strong>Ready for Pickup (Order Packed for Delivery):</strong> No refund</li>
              <li><strong>Out for Delivery:</strong> No refund</li>
            </ul>
          </div>

          {/* Exceptions */}
          <section className="space-y-3">
            <h3 className="font-serif text-lg font-bold text-espresso">
              We Do Not Guarantee A Refund For Cases Where:
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-600 list-disc list-inside">
              <li>Cakes are delivered to an incorrect address provided by the sender.</li>
              <li>Unsuccessful deliveries that arise from the recipient not being present at the time of delivery at the address provided by the sender or the recipient refusing to accept the delivery.</li>
              <li>We do not guarantee a refund if the good quality product delivered is caused damage by the improper handling of the product by the customer.</li>
            </ul>
            <p className="text-xs pt-2">
              Once approved, the refund amount will be transferred to your original payment channel in <strong>5-7 working days</strong>. Our decision on refunds shall be at our sole discretion and shall be final and binding.
            </p>
          </section>

          {/* Questions */}
          <div className="pt-4 border-t border-stone-200 flex items-center gap-3 text-xs">
            <Mail className="w-4 h-4 text-caramel" />
            <span>
              Feel free to contact us at <a href={`mailto:${BRAND_INFO.officialEmail}`} className="font-bold text-espresso">{BRAND_INFO.officialEmail}</a> for any further queries on our refund policy.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
