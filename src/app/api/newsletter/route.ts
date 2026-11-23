import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "Subscribed to Lakeview Milk Bar newsletter successfully.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
