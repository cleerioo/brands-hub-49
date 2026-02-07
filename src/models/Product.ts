import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    countInStock: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
    {
        title: { type: String, required: true },
        price: { type: Number, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        rating: {
            rate: { type: Number, default: 0 },
            count: { type: Number, default: 0 },
        },
        countInStock: { type: Number, required: true, default: 20 },
    },
    { timestamps: true }
);

const Product: Model<IProduct> =
    mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
