import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import connectDB from "../../../../lib/db";
import Order from "../../../../models/Order";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            dbOrderId,
        } = await req.json();

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Update Order in DB
            const order = await Order.findByIdAndUpdate(
                dbOrderId,
                {
                    status: "paid",
                    razorpayPaymentId: razorpay_payment_id,
                },
                { new: true }
            );

            return NextResponse.json({
                message: "success",
                orderId: razorpay_order_id,
                paymentId: razorpay_payment_id,
            });
        } else {
            return NextResponse.json(
                { message: "fail", error: "Invalid Signature" },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error("Error verifying Razorpay payment:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
