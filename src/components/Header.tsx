"use client";

import {
    Menu,
    Search,
    ShoppingCart,
    MapPin
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../providers/CartProvider";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const { items } = useCart();

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.push(`/?search=${encodeURIComponent(searchTerm)}`);
        } else {
            router.push("/");
        }
    };

    return (
        <header>
            {/* Top Nav */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                {/* Logo */}
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0 pt-1 px-4">
                    <Link href="/">
                        <h1 className="text-2xl font-bold text-white tracking-wider cursor-pointer font-serif italic">
                            Brands Hub 49
                        </h1>
                    </Link>
                </div>

                {/* Location - Hidden on small screens */}
                <div className="hidden sm:flex items-center text-white text-xs hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer mx-2">
                    <div className="text-white pt-3 pr-1">
                        <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-gray-300">Deliver to</p>
                        <p className="font-bold text-white text-sm">India</p>
                    </div>
                </div>

                {/* Search Bar - Greenish Theme */}
                <form onSubmit={handleSearch} className="flex items-center h-10 rounded-md flex-grow bg-amazon_yellow hover:bg-amazon_orange cursor-pointer transition-colors duration-200 mx-2 max-w-2xl">
                    {/* Category Dropdown (Fake) */}
                    <select className="hidden sm:block h-full bg-gray-100 text-black text-xs px-2 border-r border-gray-300 rounded-l-md outline-none w-auto max-w-[80px]">
                        <option>All</option>
                        <option>Luxury</option>
                        <option>Smart</option>
                        <option>Sport</option>
                    </select>

                    <input
                        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md sm:rounded-l-none focus:outline-none px-2 sm:px-4 text-sm text-black bg-white"
                        type="text"
                        placeholder="Search watches..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="h-full p-2 bg-amazon_yellow hover:bg-amazon_orange rounded-r-md flex items-center justify-center transition-colors duration-200">
                        <Search className="h-6 w-6 text-black" />
                    </button>
                </form>

                {/* Right Nav */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    {/* Account */}
                    <div onClick={() => !session ? signIn() : router.push('/profile')} className="link cursor-pointer hover:underline">
                        <p className="text-xs text-gray-100">
                            {session ? `Hello, ${session.user?.name}` : "Hello, sign in"}
                        </p>
                        <p className="font-extrabold md:text-sm text-white">Account & Lists</p>
                    </div>

                    {/* Orders */}
                    <Link href="/orders" className="link cursor-pointer hover:underline">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </Link>

                    {/* Cart */}
                    <Link href="/checkout">
                        <div className="relative link flex items-center cursor-pointer hover:underline">
                            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazon_orange text-center rounded-full text-black font-bold">
                                {items.length}
                            </span>
                            <ShoppingCart className="h-10 w-10" />
                            <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                                Cart
                            </p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <Link href="/" className="link flex items-center font-bold cursor-pointer hover:underline">
                    <Menu className="h-6 w-6 mr-1" />
                    All
                </Link>
                <Link href="/?category=luxury" className="link cursor-pointer hover:underline">Luxury Watches</Link>
                <Link href="/?category=smart" className="link cursor-pointer hover:underline">Smart Watches</Link>
                <Link href="/?category=sport" className="link cursor-pointer hover:underline">Sport Series</Link>
                <Link href="/" className="link cursor-pointer hover:underline">New Arrivals</Link>
                <p className="link cursor-pointer hover:underline hidden lg:inline-flex">Sell</p>
            </div>
        </header>
    );
}

export default Header;
