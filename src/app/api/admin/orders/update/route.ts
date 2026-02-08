import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import connectDB from "../../../../../lib/db";
import Order from "../../../../../models/Order";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // Security check: Ensure user is admin
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { orderId, status, trackingId, courierName, description } = await req.json();

        if (!orderId || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const updateData: any = { status };

        if (trackingId) updateData.trackingId = trackingId;
        if (courierName) updateData.courierName = courierName;

        // Push to tracking history
        const newHistoryItem = {
            status,
            timestamp: Date.now(),
            description: description || `Order status updated to ${status}`,
        };

        const order = await Order.findByIdAndUpdate(
            orderId,
            {
                $set: updateData,
                $push: { trackingHistory: newHistoryItem }
            },
            { new: true }
        );

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
