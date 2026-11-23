import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  verifySecureOtp,
  sanitizeIndianPhone,
  sanitizeCustomerName,
  createSessionToken,
} from "@/lib/auth-security";
import { UserProfile } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, otp, name } = body;

    const cleanPhone = sanitizeIndianPhone(phone);
    if (!cleanPhone) {
      return NextResponse.json(
        { error: "Invalid Indian mobile phone number format." },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== "string") {
      return NextResponse.json(
        { error: "Please provide the verification code." },
        { status: 400 }
      );
    }

    // Cryptographic verification with salted hash and brute-force tracking
    const verification = verifySecureOtp(cleanPhone, otp);

    if (!verification.success) {
      return NextResponse.json(
        {
          error: verification.error,
          attemptsLeft: verification.attemptsLeft,
        },
        { status: 401 }
      );
    }

    // Verification passed — retrieve or provision patron profile
    let user = await db.findUserByPhone(cleanPhone);
    const safeName = sanitizeCustomerName(name);

    if (!user) {
      user = {
        id: `usr_${Date.now()}_${cleanPhone.slice(-4)}`,
        name: safeName !== "Patron" ? safeName : `Patron ${cleanPhone.slice(-4)}`,
        phone: cleanPhone,
        createdAt: Date.now(),
        memberSince: new Date().toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
        addresses: [
          {
            id: "addr-default",
            label: "Home",
            address: "Bengaluru, Karnataka",
            pincode: "560001",
            isDefault: true,
          },
        ],
        savedVehicles: [
          {
            id: "veh-default",
            makeModel: "Personal Car",
            plateNumber: "KA 01 MG 1930",
          },
        ],
      };
      await db.saveUser(user);
    } else if (name && user.name.startsWith("Patron ")) {
      user.name = safeName;
      await db.saveUser(user);
    }

    // Retrieve verified order history
    const orders = await db.getOrdersByPhone(cleanPhone);

    // Generate cryptographic HMAC-SHA256 session token
    const sessionToken = createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      user,
      orders,
      sessionToken,
      message: "Identity verified. Secure session established.",
    });

    // Set secure HTTP-only signed session cookie
    const isHttps = process.env.NODE_ENV === "production" && process.env.VERCEL_URL !== undefined;
    response.cookies.set("lakeview_session", sessionToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: isHttps,
    });

    // Set public identifier cookie for client convenience
    response.cookies.set("lakeview_user_phone", cleanPhone, {
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Authentication verification error." },
      { status: 500 }
    );
  }
}
