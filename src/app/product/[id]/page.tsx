import { watches } from "@/data/watches";
import Link from "next/link";
import ProductClient from "./ProductClient";
import ProductSchema from "@/components/ProductSchema";
import { Metadata } from "next";

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = watches.find((p) => p.id === Number(params.id));

    if (!product) {
        return {
            title: "Product Not Found | Brands Hub 49",
            description: "We couldn't find the watch you're looking for.",
        };
    }

    return {
        title: `${product.title} | Brands Hub 49`,
        description: product.description.substring(0, 160), // SEO friendly truncation
        openGraph: {
            title: `${product.title} | Brands Hub 49`,
            description: product.description,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 600,
                    alt: product.title,
                },
            ],
            type: "website", // product.item type can be complex, general website/article is safe
        },
        twitter: {
            card: "summary_large_image",
            title: product.title,
            description: product.description,
            images: [product.image],
        },
    };
}

export default function ProductPage({ params }: Props) {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const product = watches.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                <p className="text-gray-600">We couldn't find the watch you're looking for.</p>
                <Link
                    href="/"
                    className="bg-amazon_yellow px-4 py-2 rounded-md shadow hover:bg-yellow-400"
                >
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <>
            <ProductSchema product={product} />
            <ProductClient product={product} />
        </>
    );
}
