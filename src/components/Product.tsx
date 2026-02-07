"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Star, Heart } from "lucide-react";
import Link from "next/link";
import { useCart } from "../providers/CartProvider";
import toast from "react-hot-toast";

interface Props {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: number;
    ratingCount?: number;
    countInStock?: number;
}

function Product({ id, title, price, description, category, image, rating = 4, ratingCount = 100, countInStock = 20 }: Props) {
    const { addToCart } = useCart();
    const { data: session } = useSession();
    const [hasPrime, setHasPrime] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        setHasPrime(Math.random() < 0.5);
        if (session) {
            checkWishlist();
        }
    }, [session]);

    const checkWishlist = async () => {
        // Optimization: In a real app, fetch all wishlist IDs at once in parent
        const res = await fetch("/api/user/wishlist");
        const data = await res.json();
        if (data.wishlist) {
            setIsWishlisted(data.wishlist.some((item: any) => item.id === id.toString()));
        }
    };

    const toggleWishlist = async () => {
        if (!session) {
            toast.error("Please sign in to modify wishlist");
            return;
        }

        if (isWishlisted) {
            setIsWishlisted(false);
            await fetch("/api/user/wishlist", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: id })
            });
            toast.success("Removed from Wishlist");
        } else {
            setIsWishlisted(true);
            const product = { id, title, price, description, category, image, rating };
            await fetch("/api/user/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product })
            });
            toast.success("Added to Wishlist");
        }
    };

    const addItemToCart = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating: { rate: rating, count: ratingCount },
            hasPrime,
        };

        addToCart(product);
        toast.success(`${title} added to basket`, {
            position: "bottom-center",
            duration: 2000,
        });
    };

    const buyNow = () => {
        addItemToCart();
        // In a real app, router.push("/checkout") would happen here
        toast.custom((t) => (
            <div className="bg-green-500 text-white p-4 rounded shadow-lg">
                🚀 Proceeding to Buy Now for {title}
            </div>
        ));
    };

    return (
        <div className="relative flex flex-col m-5 bg-white z-30 p-4 shadow-md hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden border border-gray-100 group">
            {/* Top Category (Italic) */}
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>

            {/* Wishlist Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist();
                }}
                className="absolute top-2 left-2 z-50 p-1 rounded-full bg-white/80 hover:bg-white shadow-sm"
            >
                <Heart
                    className={`h-6 w-6 transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                />
            </button>

            {/* Out of Stock Overlay */}
            {countInStock === 0 && (
                <div className="absolute top-0 right-0 p-2 bg-red-500 text-white text-xs font-bold rounded-bl-lg z-50">
                    Out of Stock
                </div>
            )}

            {/* Image Link */}
            <Link href={`/product/${id}`} className="cursor-pointer">
                <div className={`h-[200px] w-[200px] mx-auto relative group ${countInStock === 0 ? 'opacity-50 grayscale' : ''}`}>
                    <Image src={image} height={200} width={200} style={{ objectFit: "contain" }} alt="" className="group-hover:scale-105 transition-transform duration-200" />
                    {/* Badge */}
                    {category === "luxury watches" && (
                        <span className="absolute bottom-0 right-0 text-[10px] text-gray-400 border border-gray-300 px-1 rounded-sm bg-white/80">Luxury</span>
                    )}
                </div>
            </Link>

            {/* Title Link */}
            <Link href={`/product/${id}`} className="cursor-pointer hover:text-amazon_orange hover:underline">
                <h4 className="my-3 font-medium line-clamp-2 leading-snug">{title}</h4>
            </Link>

            {/* Rating */}
            <div className="flex items-center my-2">
                <div className="flex text-yellow-500">
                    {Array(5).fill(0).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-current" : "text-gray-300"}`} />
                    ))}
                </div>
                <span className="text-xs text-gray-400 ml-2">({ratingCount} reviews)</span>
            </div>

            <p className="text-sm my-2 line-clamp-2 text-gray-500 font-light min-h-[40px]">{description}</p>

            <div className="mt-2 mb-4 font-bold text-2xl text-gray-800">
                {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(price)}
            </div>

            {hasPrime && (
                <div className="flex items-center space-x-2 -mt-2 mb-4">
                    <span className="bg-[#00A8E1] text-white text-[10px] px-2 py-0.5 rounded font-bold">PRIME</span>
                    <p className="text-xs text-gray-500">Fast Delivery</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="mt-auto flex flex-col space-y-2">
                <button
                    onClick={addItemToCart}
                    disabled={countInStock === 0}
                    className={`w-full border rounded-sm py-2 px-4 shadow-sm focus:outline-none focus:ring-2 font-medium cursor-pointer text-sm transition-colors ${countInStock === 0
                        ? 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
                        : 'bg-amazon_yellow border-yellow-500 hover:bg-amazon_orange active:from-yellow-400 focus:ring-yellow-500'
                        }`}
                >
                    {countInStock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <button
                    onClick={buyNow}
                    disabled={countInStock === 0}
                    className={`w-full border rounded-sm py-2 px-4 shadow-sm focus:outline-none focus:ring-2 font-medium cursor-pointer text-sm font-bold text-white transition-all transform active:scale-95 ${countInStock === 0
                        ? 'hidden'
                        : 'bg-amazon_orange border-green-600 hover:from-green-400 hover:to-green-500 focus:ring-green-500'
                        }`}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}

export default Product;
