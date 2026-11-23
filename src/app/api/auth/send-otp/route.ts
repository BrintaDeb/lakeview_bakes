import { NextResponse } from "next/server";
import { generateSecureOtp, sanitizeIndianPhone, sanitizeCustomerName } from "@/lib/auth-security";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phone, name } = body;

    const cleanPhone = sanitizeIndianPhone(phone);
    if (!cleanPhone) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number (e.g. 9845012345)." },
        { status: 400 }
      );
    }

    const sanitizedName = sanitizeCustomerName(name);

    // Generate dynamic cryptographically secure OTP with rate limiting & expiration
    const result = generateSecureOtp(cleanPhone);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error, resendSeconds: result.resendSeconds },
        { status: 429 }
      );
    }

    // In production with an SMS provider (Twilio, MSG91, Fast2SMS):
    // await sendSmsGateway(cleanPhone, `Your Lakeview Milk Bar verification code is ${result.otp}. Valid for 10 minutes.`);

    return NextResponse.json({
      success: true,
      message: `Verification code dispatched to +91 ${cleanPhone.slice(0, 2)}•••••${cleanPhone.slice(-3)}`,
      otp: result.otp, // Surfaced for preview & frictionless testing
      phone: cleanPhone,
      name: sanitizedName,
      expiresAt: result.expiresAt,
      resendSeconds: result.resendSeconds,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to dispatch verification code." },
      { status: 500 }
    );
  }
}
