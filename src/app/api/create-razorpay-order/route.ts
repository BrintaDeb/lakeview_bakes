import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, customer, items } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Check if real Razorpay credentials exist in environment
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret) {
      // Direct call to Razorpay Orders API
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const rzResponse = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // amount in paise
          currency: "INR",
          receipt: `rcpt_${Date.now()}`,
          notes: {
            customer_name: customer?.name || "",
            phone: customer?.phone || "",
          },
        }),
      });

      const rzData = await rzResponse.json();
      return NextResponse.json({
        success: true,
        orderId: rzData.id,
        amount: rzData.amount,
        currency: rzData.currency,
        key: keyId,
      });
    }

    // Development & Test Mode Razorpay Order Generation
    const mockOrderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
    return NextResponse.json({
      success: true,
      orderId: mockOrderId,
      amount: Math.round(amount * 100),
      currency: "INR",
      testMode: true,
      key: "rzp_test_LakeviewDemo1930",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create payment order" },
      { status: 500 }
    );
  }
}
