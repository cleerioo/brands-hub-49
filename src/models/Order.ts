
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
    userEmail: string;
    items: any[];
    amount: number;
    status: string; // pending, paid, shipped, delivered, cancelled
    paymentIntentId?: string;
    shippingAddress: object;
    paymentMethod: string;
    timestamp: number;
}

const OrderSchema = new Schema<IOrder>(
    {
        userEmail: { type: String, required: true },
        items: { type: [Object], required: true },
        amount: { type: Number, required: true },
        status: { type: String, default: "pending" },
        paymentIntentId: { type: String },
        shippingAddress: { type: Object },
        paymentMethod: { type: String },
        timestamp: { type: Number, required: true },
    },
    { timestamps: true }
);

const Order: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
