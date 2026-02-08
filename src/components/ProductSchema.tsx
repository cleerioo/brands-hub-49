import { Product } from "@/providers/CartProvider";

interface ProductSchemaProps {
    product: Product;
}

export default function ProductSchema({ product }: ProductSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.title,
        "image": [product.image],
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Brands Hub 49" // Ideally extract brand from title like we did for filters
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock",
            "url": `https://brands-hub49.vercel.app/product/${product.id}`
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": product.rating.rate,
            "reviewCount": product.rating.count
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
