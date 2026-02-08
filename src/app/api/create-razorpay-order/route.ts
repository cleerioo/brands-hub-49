import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import connectDB from "../../../lib/db";
import Order from "../../../models/Order";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { amount, currency = "INR", items, email, shippingAddress } = await req.json();

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Razorpay keys are missing" },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: Math.round(amount * 100), // amount in lowest denomination (paise)
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Create Pending Order in DB
        const newOrder = await Order.create({
            userEmail: email,
            items: items,
            amount: amount,
            currency: currency,
            status: "pending",
            razorpayOrderId: razorpayOrder.id,
            shippingAddress: shippingAddress,
            paymentMethod: "razorpay",
            timestamp: Date.now(),
        });

        return NextResponse.json({
            id: razorpayOrder.id,
            currency: razorpayOrder.currency,
            amount: razorpayOrder.amount,
            dbOrderId: newOrder._id, // Send back DB ID for verification later
        });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
