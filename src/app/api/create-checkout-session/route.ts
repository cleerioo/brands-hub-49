import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
        throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
    }
    return new Stripe(secretKey);
};

export async function POST(req: NextRequest) {
    try {
        const { items, email } = await req.json();

        const transformedItems = items.map((item: any) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                    images: [item.image],
                    description: item.description,
                },
                unit_amount: item.price * 100, // Stripe expects amount in lowest denomination (paise for INR)
            },
            quantity: 1, // Assuming quantity 1 for now as cart doesn't track quantity per item yet
        }));

        const stripe = getStripe();
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["IN", "US", "CA", "GB"],
            },
            line_items: transformedItems,
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/success`,
            cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
            metadata: {
                email,
                images: JSON.stringify(items.map((item: any) => item.image)),
            },
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
