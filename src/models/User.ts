
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    image?: string;
    role: string;
    addresses?: {
        fullName: string;
        street: string;
        city: string;
        postalCode: string;
        country: string;
        isDefault?: boolean;
    }[];
    wishlist?: any[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        image: { type: String },
        role: { type: String, default: "user" },
        addresses: [
            {
                fullName: { type: String, required: true },
                street: { type: String, required: true },
                city: { type: String, required: true },
                postalCode: { type: String, required: true },
                country: { type: String, required: true },
                isDefault: { type: Boolean, default: false },
            },
        ],
        wishlist: [
            {
                id: { type: String, required: true },
                title: { type: String, required: true },
                price: { type: Number, required: true },
                description: { type: String },
                category: { type: String },
                image: { type: String },
                rating: { type: Number },
            }
        ]
    },
    { timestamps: true }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
