"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, MapPin, ChevronLeft } from "lucide-react";
import { watches } from "@/data/watches";
import { useCart } from "@/providers/CartProvider";
import toast from "react-hot-toast";

export default function ProductPage() {
    const params = useParams();
    const { addToCart } = useCart();

    // Handle potential standard/array param types safely
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const product = watches.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
                <p className="text-gray-600">We couldn't find the watch you're looking for.</p>
                <Link href="/" className="bg-amazon_yellow px-4 py-2 rounded-md shadow hover:bg-yellow-400">
                    Back to Home
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product);
        toast.success("Added to Cart");
    };

    return (
        <div className="bg-white min-h-screen pb-10">
            {/* Breadcrumb / Back */}
            <div className="bg-gray-100 py-2 px-4 shadow-sm mb-6">
                <Link href="/" className="flex items-center text-xs text-gray-500 hover:text-amazon_blue hover:underline w-fit">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to results
                </Link>
            </div>

            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-9 gap-8">

                {/* Left Column: Image (4 cols on lg) */}
                <div className="lg:col-span-4 flex justify-center">
                    <div className="relative h-[400px] w-full max-w-[400px] lg:h-[500px] lg:max-w-[500px]">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Middle Column: Details (3 cols on lg) */}
                <div className="lg:col-span-3 space-y-4">
                    <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">{product.title}</h1>

                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-500">
                            {Array(5).fill(0).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.round(product.rating.rate) ? "fill-current" : "text-gray-300"}`}
                                />
                            ))}
                        </div>
                        <span className="text-blue-600 hover:underline cursor-pointer text-sm">
                            {product.rating.count} ratings
                        </span>
                    </div>

                    <div className="border-t border-b border-gray-200 py-4 space-y-2">
                        <div className="flex items-start">
                            <span className="text-gray-500 text-sm w-20 pt-1">Price:</span>
                            <div className="flex flex-col">
                                <span className="text-xl text-red-700 font-medium">
                                    -5% <span className="text-3xl text-black">₹{product.price.toLocaleString()}</span>
                                </span>
                                <span className="text-xs text-gray-500">Inclusive of all taxes</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm w-20">Brand:</span>
                            <span className="font-bold text-sm">Brands Hub 49</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-500 text-sm w-20">Category:</span>
                            <span className="capitalize text-sm">{product.category}</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2">About this item</h3>
                        <p className="text-sm text-gray-700 leading-relaxed text-left">
                            {product.description}
                        </p>
                    </div>
                </div>

                {/* Right Column: Buy Box (2 cols on lg) */}
                <div className="lg:col-span-2">
                    <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white space-y-3">
                        <h3 className="text-xl font-bold text-red-700">₹{product.price.toLocaleString()}</h3>

                        <div className="text-sm">
                            <span className="text-blue-600">FREE delivery</span>
                            <span className="font-bold ml-1">Wednesday, Nov 27</span>.
                            <div className="flex items-center text-xs text-gray-500 mt-1 cursor-pointer hover:text-amazon_orange">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>Deliver to India</span>
                            </div>
                        </div>

                        <div className="text-lg text-green-700 font-medium">In Stock</div>

                        <div className="space-y-2 pt-2">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-amazon_yellow border border-yellow-500 rounded-full py-2 shadow-sm hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 active:from-yellow-400 active:to-yellow-500 text-sm"
                            >
                                Add to Cart
                            </button>
                            <button className="w-full bg-amazon_orange border border-yellow-600 rounded-full py-2 shadow-sm hover:bg-orange-500 focus:ring-2 focus:ring-orange-600 text-sm">
                                Buy Now
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 pt-2 space-y-1">
                            <div className="flex">
                                <span className="w-20">Ships from</span>
                                <span>Brands Hub 49</span>
                            </div>
                            <div className="flex">
                                <span className="w-20">Sold by</span>
                                <span className="text-blue-600 hover:underline cursor-pointer">Brands Hub 49 Retail</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
