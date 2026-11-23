import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Order } from "@/types";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (phone) {
      const orders = await db.getOrdersByPhone(phone);
      return NextResponse.json({ success: true, orders });
    }

    const allOrders = await db.getOrders();
    return NextResponse.json({ success: true, orders: allOrders });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to retrieve orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, total, subtotal, deliveryFee, discount, isDriveIn, driveInDetails } = body;

    const now = Date.now();
    const orderId = body.orderId || `ORD-LAKEVIEW-${now.toString(36).toUpperCase()}`;

    // Estimated delivery / ready time:
    // Drive-in: 25 minutes from placement
    // Doorstep delivery: 45 minutes from placement
    const prepMinutes = isDriveIn ? 25 : 45;
    const estimatedDeliveryTime = now + prepMinutes * 60 * 1000;

    const cleanPhone = (customer?.phone || "").replace(/\D/g, "").slice(-10);

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      createdAt: now,
      estimatedDeliveryTime,
      customerName: customer?.name || "Customer",
      email: customer?.email || "",
      phone: cleanPhone,
      address: isDriveIn
        ? `Midnight Drive-In @ ${driveInDetails?.outletName || "MG Road Flagship"}`
        : `${customer?.address || "Bengaluru"}, PIN: ${customer?.postalCode || "560001"}`,
      city: customer?.city || "Bengaluru",
      postalCode: customer?.postalCode || "560001",
      items: items || [],
      subtotal: subtotal || total || 0,
      deliveryFee: deliveryFee || 0,
      discount: discount || 0,
      total: total || 0,
      paymentMethod: body.paymentMethod || "Razorpay (Online Payment)",
      paymentStatus: "paid",
      orderStatus: "Order Received",
      deliveryDate: customer?.deliveryDate || new Date().toISOString().split("T")[0],
      deliveryTimeSlot: isDriveIn
        ? driveInDetails?.timeSlot || "Tonight Midnight"
        : customer?.deliverySlot || "Afternoon (12:00 PM – 4:00 PM)",
      notes: customer?.orderNotes || customer?.deliveryInstructions || "",
      isDriveIn: Boolean(isDriveIn),
      vehicleMakeModel: driveInDetails?.vehicleModel || "",
      vehiclePlateNumber: driveInDetails?.vehiclePlate || "",
      pickupOutletId: driveInDetails?.outletId || "mg-road",
      pickupOutletName: driveInDetails?.outletName || "MG Road Flagship",
    };

    const saved = await db.saveOrder(newOrder);

    // Auto-update user profile if exists
    if (cleanPhone) {
      let user = await db.findUserByPhone(cleanPhone);
      if (!user) {
        user = {
          id: `usr_${now}_${cleanPhone.slice(-4)}`,
          name: customer?.name || `Patron ${cleanPhone.slice(-4)}`,
          phone: cleanPhone,
          email: customer?.email,
          createdAt: now,
          memberSince: new Date().toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          }),
        };
        await db.saveUser(user);
      }
    }

    return NextResponse.json({
      success: true,
      order: saved,
      orderId: saved.id,
      estimatedMinutes: prepMinutes,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
