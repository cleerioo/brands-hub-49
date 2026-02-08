import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const orders = await Order.find({}).sort({ timestamp: -1 });
        return NextResponse.json({ orders });
    } catch (error: any) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
