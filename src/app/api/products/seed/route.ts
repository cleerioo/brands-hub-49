
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { watches } from "@/data/watches";

export async function GET() {
    try {
        await connectDB();

        // Clear existing products (optional, be careful in production!)
        await Product.deleteMany({});

        // Add countInStock to watches
        const productsWithStock = watches.map(watch => ({
            ...watch,
            countInStock: Math.floor(Math.random() * 50) + 1 // Random stock between 1-50
        }));

        await Product.insertMany(productsWithStock);

        return NextResponse.json({ message: "Seed successful", count: productsWithStock.length });
    } catch (error) {
        return NextResponse.json({ error: "Seed failed", details: error }, { status: 500 });
    }
}
