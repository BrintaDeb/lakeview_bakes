import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await db.getOrderById(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const now = Date.now();
    const createdAt = order.createdAt || now;
    const estTime = order.estimatedDeliveryTime || createdAt + (order.isDriveIn ? 25 : 45) * 60 * 1000;

    const remainingMs = Math.max(0, estTime - now);
    const remainingMinutes = Math.ceil(remainingMs / 60000);
    const elapsedMinutes = Math.floor((now - createdAt) / 60000);

    // Dynamic auto-advancing status simulation based on elapsed time:
    let liveStatus = order.orderStatus;
    if (order.orderStatus !== "Delivered") {
      if (elapsedMinutes >= (order.isDriveIn ? 25 : 45)) {
        liveStatus = "Delivered";
      } else if (elapsedMinutes >= (order.isDriveIn ? 18 : 30)) {
        liveStatus = "Out for Delivery";
      } else if (elapsedMinutes >= (order.isDriveIn ? 10 : 15)) {
        liveStatus = "Quality Packed";
      } else if (elapsedMinutes >= 4) {
        liveStatus = "Baking in Progress";
      } else {
        liveStatus = "Order Received";
      }
    }

    return NextResponse.json({
      success: true,
      order: {
        ...order,
        orderStatus: liveStatus,
      },
      tracking: {
        remainingMinutes,
        remainingSeconds: Math.floor(remainingMs / 1000),
        elapsedMinutes,
        totalDurationMinutes: order.isDriveIn ? 25 : 45,
        liveStatus,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to load order tracking" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    const updated = await db.updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to update status" },
      { status: 500 }
    );
  }
}
