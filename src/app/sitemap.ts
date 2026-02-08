import { watches } from "@/data/watches";

export default function sitemap() {
    const baseUrl = "https://brands-hub49.vercel.app";

    // Static routes
    const routes = [
        "",
        "/checkout",
        "/signin",
        "/orders",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString(),
    }));

    // Dynamic product routes
    const productRoutes = watches.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date().toISOString(),
    }));

    return [...routes, ...productRoutes];
}
