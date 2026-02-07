"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
    const { data: session } = useSession();
    const { addToCart } = useCart();
    const [wishlist, setWishlist] = useState<any[]>([]);

    useEffect(() => {
        if (session) {
            fetchWishlist();
        }
    }, [session]);

    const fetchWishlist = async () => {
        const res = await fetch("/api/user/wishlist");
        const data = await res.json();
        if (data.wishlist) setWishlist(data.wishlist);
    };

    const removeFromWishlist = async (productId: string) => {
        const res = await fetch("/api/user/wishlist", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId })
        });
        if (res.ok) {
            toast.success("Removed from Wishlist");
            fetchWishlist();
        }
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    if (!session) return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p>Please sign in to view your wishlist.</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto p-5">
                <h1 className="text-3xl font-semibold border-b pb-4 mb-6">My Wishlist</h1>

                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((item) => (
                            <div key={item.id} className="relative flex flex-col m-5 bg-white z-30 p-10 rounded-lg shadow-sm">
                                <p className="absolute top-2 right-2 text-xs italic text-gray-400">{item.category}</p>
                                <Image src={item.image} height={200} width={200} objectFit="contain" alt={item.title} />
                                <h4 className="my-3 font-bold line-clamp-1">{item.title}</h4>
                                <div className="flex mb-5">
                                    {Array(Math.round(item.rating || 5)).fill(0).map((_, i) => (
                                        <span key={i} className="text-yellow-500">★</span>
                                    ))}
                                </div>
                                <p className="text-xs my-2 line-clamp-2">{item.description}</p>
                                <div className="mb-5 font-bold">₹{item.price}</div>

                                <button onClick={() => handleAddToCart(item)} className="mt-auto button">Move to Cart</button>
                                <button onClick={() => removeFromWishlist(item.id)} className="mt-2 text-red-500 text-xs hover:underline text-center w-full">Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
