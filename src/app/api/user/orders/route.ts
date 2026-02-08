import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const orders = await Order.find({ userEmail: session.user.email })
            .sort({ timestamp: -1 });

        return NextResponse.json(orders);

    } catch (error) {
        console.error("Error fetching user orders:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
