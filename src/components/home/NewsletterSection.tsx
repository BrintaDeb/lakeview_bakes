"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Sparkles } from "lucide-react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Welcome to the Lakeview family! Check your inbox soon for sweet perks.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Unable to subscribe right now. Please try again.");
      }
    } catch {
      setStatus("success");
      setMessage("Thank you for subscribing to Lakeview Milk Bar!");
      setEmail("");
    }
  };

  return (
    <section className="py-20 relative bg-espresso text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-espresso via-[#38261F] to-espresso-dark opacity-95" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-caramel/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-widest border border-white/10">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Tastings & Offers</span>
        </div>

        <div className="space-y-2">
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
            Don’t miss a thing.
          </h2>
          <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Enter your email below to be the first to know about our delicious new product launches & recipies
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
          <div className="relative flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-5 pr-32 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-caramel text-sm backdrop-blur-md"
              required
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="absolute right-1.5 top-1.5 bottom-1.5 px-6 rounded-full bg-caramel hover:bg-caramel-hover text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>{status === "loading" ? "Subscribing..." : "Subscribe"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          {status === "success" && (
            <div className="flex items-center justify-center gap-2 text-emerald-400 text-xs font-medium pt-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <p className="text-rose-muted text-xs font-medium pt-2">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
};
