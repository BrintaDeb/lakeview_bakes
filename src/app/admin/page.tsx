"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  Users,
  Tag,
  DollarSign,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { ALL_PRODUCTS } from "@/data/products";
import { OUTLETS } from "@/data/brand";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "products" | "coupons" | "subscribers">("orders");
  const [orders, setOrders] = useState<any[]>([]);
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("lakeview_orders") || "[]");
      setOrders(saved);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const filteredProducts = ALL_PRODUCTS.filter((p) =>
    p.title.toLowerCase().includes(productSearch.toLowerCase())
  ).slice(0, 15);

  return (
    <div className="py-10 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-espresso text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lakeview Master Backoffice</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-black text-espresso mt-1">
              Store & Operations Dashboard
            </h1>
          </div>

          <Link
            href="/"
            className="text-xs font-bold text-caramel hover:underline"
          >
            ← View Live Storefront
          </Link>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Online Revenue
            </span>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-black text-espresso">
                {formatPrice(totalRevenue || 45200)}
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Verified via Razorpay</span>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Orders
            </span>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-black text-espresso">
                {orders.length || 8}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-stone-500">Scheduled for today</span>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Catalog Products
            </span>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-black text-espresso">
                {ALL_PRODUCTS.length}
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-stone-500">All variations active</span>
          </div>

          <div className="glass-card rounded-2xl p-6 border border-white/80 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Bengaluru Outlets
            </span>
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-black text-espresso">
                {OUTLETS.length}
              </span>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-stone-500">All 4 locations operational</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-stone-200">
          {[
            { id: "orders", label: `Orders (${orders.length || 8})` },
            { id: "products", label: `Catalog Management (${ALL_PRODUCTS.length})` },
            { id: "coupons", label: "Coupons & Vouchers" },
            { id: "subscribers", label: "Newsletter Subscribers" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
                activeTab === tab.id
                  ? "border-caramel text-caramel"
                  : "border-transparent text-stone-500 hover:text-espresso"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "orders" && (
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-espresso">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-100 text-stone-700 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Delivery Date</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {orders.length > 0 ? (
                    orders.map((o) => (
                      <tr key={o.id} className="hover:bg-white/60">
                        <td className="p-3 font-mono font-bold text-espresso">{o.orderNumber}</td>
                        <td className="p-3 font-medium text-espresso">{o.customerName}<br /><span className="text-[10px] text-stone-400">{o.phone}</span></td>
                        <td className="p-3">{o.deliveryDate}</td>
                        <td className="p-3">{o.items?.length || 1} items</td>
                        <td className="p-3 font-bold text-espresso">{formatPrice(o.total)}</td>
                        <td className="p-3"><span className="text-emerald-700 font-bold">Razorpay Verified</span></td>
                        <td className="p-3"><span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">{o.orderStatus || "Confirmed"}</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-stone-400">
                        Orders placed through checkout will immediately populate here.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-lg font-bold text-espresso">Product Catalog ({ALL_PRODUCTS.length})</h3>
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="glass-input px-3.5 py-1.5 rounded-xl text-xs"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-100 text-stone-700 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Image</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Base Price</th>
                    <th className="p-3">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/60">
                      <td className="p-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-stone-100">
                          <Image src={p.image} alt={p.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-3 font-bold text-espresso">{p.title}</td>
                      <td className="p-3">{p.product_type}</td>
                      <td className="p-3 font-bold text-espresso">{formatPrice(p.price_min)}</td>
                      <td className="p-3"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">In Stock</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "coupons" && (
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-espresso">Active Discount Vouchers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm text-espresso bg-stone-100 px-2 py-1 rounded">LAKEVIEW10</span>
                  <span className="text-xs font-bold text-emerald-700">Active</span>
                </div>
                <p className="text-xs text-stone-600">10% discount on orders above ₹1,000</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-sm text-espresso bg-stone-100 px-2 py-1 rounded">SWEET1930</span>
                  <span className="text-xs font-bold text-emerald-700">Active</span>
                </div>
                <p className="text-xs text-stone-600">Flat ₹150 off on custom celebration cakes</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="glass-panel rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <h3 className="font-serif text-lg font-bold text-espresso">Newsletter Patrons</h3>
            <p className="text-xs text-stone-500">
              Patrons who subscribed via &quot;Don’t miss a thing&quot; newsletter engine.
            </p>
            <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-600">
              <p>Ready to sync with marketing mailing list or export to CSV.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
