"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, Order } from "@/types";
import { haptics } from "@/lib/haptics";

interface AuthContextType {
  user: UserProfile | null;
  orders: Order[];
  isLoading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  sendOtp: (
    phone: string,
    name?: string
  ) => Promise<{ success: boolean; otp?: string; resendSeconds?: number; error?: string }>;
  verifyOtp: (
    phone: string,
    otp: string,
    name?: string
  ) => Promise<{ success: boolean; error?: string; attemptsLeft?: number }>;
  refreshOrders: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Restore authenticated session from server cookie or stored credentials
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedPhone = localStorage.getItem("lakeview_user_phone");
        const url = storedPhone
          ? `/api/auth/me?phone=${encodeURIComponent(storedPhone)}`
          : "/api/auth/me";

        const res = await fetch(url);
        const data = await res.json();

        if (data.user) {
          setUser(data.user);
          setOrders(data.orders || []);
          localStorage.setItem("lakeview_user", JSON.stringify(data.user));
          localStorage.setItem("lakeview_user_phone", data.user.phone);
        } else {
          const storedUser = localStorage.getItem("lakeview_user");
          if (storedUser) {
            try {
              setUser(JSON.parse(storedUser));
            } catch {}
          }
        }
      } catch (e) {
        console.error("Session restore error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const sendOtp = async (phone: string, name?: string) => {
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Failed to dispatch verification code.",
          resendSeconds: data.resendSeconds,
        };
      }

      return {
        success: true,
        otp: data.otp,
        resendSeconds: data.resendSeconds || 30,
      };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const verifyOtp = async (phone: string, otp: string, name?: string) => {
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp, name }),
      });
      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.error || "Verification failed.",
          attemptsLeft: data.attemptsLeft,
        };
      }

      setUser(data.user);
      setOrders(data.orders || []);
      localStorage.setItem("lakeview_user", JSON.stringify(data.user));
      localStorage.setItem("lakeview_user_phone", data.user.phone);
      if (data.sessionToken) {
        localStorage.setItem("lakeview_session_token", data.sessionToken);
      }

      setIsAuthModalOpen(false);
      haptics.success();
      return { success: true };
    } catch (err: any) {
      haptics.warning();
      return { success: false, error: err.message };
    }
  };

  const refreshOrders = async () => {
    if (!user?.phone) return;
    try {
      const res = await fetch(`/api/orders?phone=${encodeURIComponent(user.phone)}`);
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (e) {
      console.error("Failed to refresh orders:", e);
    }
  };

  const logout = async () => {
    haptics.light();
    setUser(null);
    setOrders([]);
    localStorage.removeItem("lakeview_user");
    localStorage.removeItem("lakeview_user_phone");
    localStorage.removeItem("lakeview_session_token");

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        orders,
        isLoading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        sendOtp,
        verifyOtp,
        refreshOrders,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
