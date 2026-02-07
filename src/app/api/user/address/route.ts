
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { fullName, street, city, postalCode, country, isDefault } = await req.json();

        await connectDB();
        const user = await User.findOne({ email: session.user?.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // If setting as default, unset other defaults
        if (isDefault && user.addresses) {
            user.addresses.forEach((addr: any) => addr.isDefault = false);
        }

        user.addresses = user.addresses || [];
        user.addresses.push({ fullName, street, city, postalCode, country, isDefault });
        await user.save();

        return NextResponse.json({ message: "Address added successfully", addresses: user.addresses });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add address" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        const user = await User.findOne({ email: session.user?.email });

        return NextResponse.json({ addresses: user?.addresses || [] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch addresses" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { addressId } = await req.json();

        await connectDB();
        const user = await User.findOne({ email: session.user?.email });

        if (user && user.addresses) {
            user.addresses = user.addresses.filter((addr: any) => addr._id.toString() !== addressId);
            await user.save();
        }

        return NextResponse.json({ message: "Address removed", addresses: user?.addresses });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete address" }, { status: 500 });
    }
}
