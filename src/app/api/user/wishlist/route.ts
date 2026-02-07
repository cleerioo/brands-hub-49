
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

        const { product } = await req.json();

        await connectDB();
        const user = await User.findOne({ email: session.user?.email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        user.wishlist = user.wishlist || [];
        // Check if item already exists
        const exists = user.wishlist.find((item: any) => item.id === product.id);

        if (!exists) {
            user.wishlist.push(product);
            await user.save();
        }

        return NextResponse.json({ message: "Added to Wishlist", wishlist: user.wishlist });
    } catch (error) {
        return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
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

        return NextResponse.json({ wishlist: user?.wishlist || [] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { productId } = await req.json();

        await connectDB();
        const user = await User.findOne({ email: session.user?.email });

        if (user && user.wishlist) {
            user.wishlist = user.wishlist.filter((item: any) => item.id !== productId);
            await user.save();
        }

        return NextResponse.json({ message: "Removed from Wishlist", wishlist: user?.wishlist });
    } catch (error) {
        return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
    }
}
