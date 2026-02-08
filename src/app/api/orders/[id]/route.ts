import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function GET(
    request: NextRequest,
    // Fix: params is a Promise in newer Next.js versions
    props: { params: Promise<{ id: string }> }
) {
    const params = await props.params;
    try {
        await connectDB();

        // Optional: Check session for security
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const id = params.id;

        // Find order by _id or razorpayOrderId
        const order = await Order.findOne({
            $or: [{ _id: id }, { razorpayOrderId: id }]
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order);

    } catch (error) {
        console.error("Error fetching order:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
