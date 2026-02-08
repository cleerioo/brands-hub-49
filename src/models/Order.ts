
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    userEmail: string;
    items: any[];
    amount: number;
    currency: string;
    status: string; // pending, paid, shipped, delivered, cancelled
    paymentIntentId?: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    shippingAddress: object;
    paymentMethod: string;
    timestamp: number;
    trackingId?: string;
    courierName?: string;
    trackingHistory?: {
        status: string;
        timestamp: number;
        description: string;
    }[];
}

const OrderSchema = new Schema<IOrder>(
    {
        userEmail: { type: String, required: true },
        items: { type: [Object], required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        status: { type: String, default: "pending" },
        paymentIntentId: { type: String },
        razorpayOrderId: { type: String },
        razorpayPaymentId: { type: String },
        shippingAddress: { type: Object },
        paymentMethod: { type: String },
        timestamp: { type: Number, required: true },
        trackingId: { type: String },
        courierName: { type: String },
        trackingHistory: [
            {
                status: { type: String },
                timestamp: { type: Number },
                description: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
