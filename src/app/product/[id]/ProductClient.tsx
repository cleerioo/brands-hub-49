"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Star, MapPin, ChevronLeft } from "lucide-react";
import toast from "react-hot-toast";
import { Product, useCart } from "@/providers/CartProvider";
import * as gtag from "@/lib/gtag";
import { useRouter } from "next/navigation";

interface ProductClientProps {
    product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
    const router = useRouter();
    const { addToCart } = useCart();
    const [pincode, setPincode] = useState("");
    const [isChecking, setIsChecking] = useState(false);
    const [serviceability, setServiceability] = useState<{ available: boolean; message: string } | null>(null);

    const handleCheckPincode = () => {
        setIsChecking(true);
        setServiceability(null);

        // Mock API Call simulation
        setTimeout(() => {
            const isValid = pincode.length === 6 && ["11", "56", "40", "60", "70", "38"].includes(pincode.substring(0, 2)); // Mock valid prefixes

            // For demo purposes, we'll make most pincodes valid unless they start with 99
            const isDeliverable = !pincode.startsWith("99");

            if (isDeliverable) {
                const deliveryDate = new Date();
                deliveryDate.setDate(deliveryDate.getDate() + 4);
                setServiceability({
                    available: true,
                    message: `✅ Deliverable by ${deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}`
                });
            } else {
                setServiceability({
                    available: false,
                    message: "❌ Not serviceable at this location."
                });
            }
            setIsChecking(false);
        }, 1000);
    };

    const handleAddToCart = () => {
        addToCart(product);
        gtag.event({
            action: "add_to_cart",
            category: "ecommerce",
            label: product.title,
            value: product.price,
        });
        toast.success("Added to Cart");
    };

    const handleBuyNow = () => {
        addToCart(product);
        gtag.event({
            action: "begin_checkout",
            category: "ecommerce",
            label: product.title,
            value: product.price,
        });
        toast.success("Proceeding to Checkout");
        router.push("/checkout");
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
                                <span className="text-gray-700 font-medium">Select Delivery Location</span>
                            </div>
                        </div>

                        {/* Pincode Check */}
                        <div className="py-2">
                            <div className="flex mt-2 space-x-2">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    maxLength={6}
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                                    className="w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:ring-2 focus:ring-amazon_orange outline-none"
                                />
                                <button
                                    onClick={handleCheckPincode}
                                    disabled={pincode.length !== 6 || isChecking}
                                    className="text-sm text-amazon_blue font-medium hover:text-orange-600 disabled:text-gray-400"
                                >
                                    {isChecking ? "Checking..." : "Apply"}
                                </button>
                            </div>
                            {serviceability && (
                                <div className={`text-xs mt-1 ${serviceability.available ? "text-green-700" : "text-red-600"}`}>
                                    {serviceability.message}
                                </div>
                            )}
                        </div>

                        <div className="text-lg text-green-700 font-medium">In Stock</div>

                        <div className="space-y-2 pt-2">
                            <button
                                onClick={handleAddToCart}
                                className="w-full bg-amazon_yellow border border-yellow-500 rounded-full py-2 shadow-sm hover:bg-yellow-400 focus:ring-2 focus:ring-yellow-500 active:from-yellow-400 active:to-yellow-500 text-sm"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-amazon_orange border border-yellow-600 rounded-full py-2 shadow-sm hover:bg-orange-500 focus:ring-2 focus:ring-orange-600 text-sm"
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="text-xs text-gray-500 pt-2 space-y-1">
                            <div className="flex">
                                <span className="w-20">Ships from</span>
                                <span className="text-gray-900">Brands Hub 49</span>
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
