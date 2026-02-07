
import { NextRequest, NextResponse } from "next/server";
import { watches } from "@/data/watches";

export async function GET(req: NextRequest) {
    try {
        // Return static watch data instead of querying MongoDB
        return NextResponse.json({ products: watches });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
