import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifySessionToken, sanitizeIndianPhone } from "@/lib/auth-security";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const queryPhone = searchParams.get("phone");

    // 1. Check for cryptographically signed session header or cookie
    const authHeader = req.headers.get("authorization") || "";
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionMatch = cookieHeader.match(/lakeview_session=([^;]+)/);

    // Header takes precedence over cookie
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : sessionMatch
        ? decodeURIComponent(sessionMatch[1]).trim()
        : null;

    if (token) {
      const verification = verifySessionToken(token);
      if (verification.valid && verification.user) {
        const verifiedPhone = verification.user.phone;
        const user = await db.findUserByPhone(verifiedPhone);
        const orders = await db.getOrdersByPhone(verifiedPhone);

        return NextResponse.json({
          authenticated: true,
          user,
          orders,
        });
      } else {
        // If an explicit session token is provided but invalid/forged/expired, reject immediately
        return NextResponse.json({
          authenticated: false,
          error: verification.error || "Invalid session credentials",
          user: null,
          orders: [],
        });
      }
    }

    // 2. Fallback check for query phone ONLY if no token was provided (for initial dev convenience)
    if (queryPhone) {
      const cleanPhone = sanitizeIndianPhone(queryPhone);
      if (cleanPhone) {
        const user = await db.findUserByPhone(cleanPhone);
        const orders = await db.getOrdersByPhone(cleanPhone);

        return NextResponse.json({
          authenticated: !!user,
          user,
          orders,
        });
      }
    }

    return NextResponse.json({
      authenticated: false,
      user: null,
      orders: [],
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to resolve session." },
      { status: 500 }
    );
  }
}
