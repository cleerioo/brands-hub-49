import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const adminEmail = "admin@brandshub.com";
        // Check if user exists
        const existingUser = await User.findOne({ email: adminEmail });

        if (existingUser) {
            return NextResponse.json({ message: "Admin user already exists" });
        }

        // Create Admin
        const adminUser = await User.create({
            name: "Admin User",
            email: adminEmail,
            role: "admin",
            image: "https://ui-avatars.com/api/?name=Admin+User",
            addresses: [],
            wishlist: []
        });

        return NextResponse.json({ message: "Admin user created successfully", user: adminUser });
    } catch (error: any) {
        console.error("Error creating admin:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
