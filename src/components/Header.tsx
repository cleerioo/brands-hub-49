"use client";

import {
    Menu,
    Search,
    ShoppingCart,
    MapPin,
    User,
    Package
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
            {/* Mobile-First Design */}
            <div className="bg-amazon_blue">
                {/* Row 1: Logo + Account + Orders + Cart (Mobile & Desktop) */}
                <div className="flex items-center justify-between p-3 sm:p-2">
                    {/* Logo */}
                    <Link href="/">
                        <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wider cursor-pointer font-serif italic">
                            Brands Hub 49
                        </h1>
                    </Link>

                    {/* Desktop: Location, Search, Account, Orders, Cart */}
                    <div className="hidden sm:flex items-center gap-3 flex-grow ml-4">
                        {/* Location */}
                        <div className="flex items-center text-white text-xs hover:outline hover:outline-1 hover:outline-white p-2 cursor-pointer">
                            <MapPin className="h-5 w-5 mr-1" />
                            <div>
                                <p className="text-gray-300">Deliver to</p>
                                <p className="font-bold text-white text-sm">India</p>
                            </div>
                        </div>

                        {/* Search Bar - Desktop */}
                        <form onSubmit={handleSearch} className="flex items-center h-10 rounded-md flex-grow max-w-2xl bg-amazon_yellow hover:bg-amazon_orange transition-colors duration-200">
                            <select className="h-full bg-gray-100 text-black text-xs px-2 border-r border-gray-300 rounded-l-md outline-none w-auto max-w-[80px]">
                                <option>All</option>
                                <option>Luxury</option>
                                <option>Smart</option>
                                <option>Sport</option>
                            </select>
                            <input
                                className="p-2 h-full flex-grow rounded-l-none focus:outline-none px-4 text-sm text-black bg-white"
                                type="text"
                                placeholder="Search for watches..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button type="submit" className="h-full px-3 bg-amazon_yellow hover:bg-amazon_orange rounded-r-md flex items-center justify-center transition-colors duration-200">
                                <Search className="h-6 w-6 text-black" />
                            </button>
                        </form>

                        {/* Account */}
                        <div onClick={() => !session ? signIn() : router.push('/profile')} className="text-white text-xs cursor-pointer hover:underline whitespace-nowrap">
                            <p className="text-gray-100">{session ? `Hello, ${session.user?.name?.split(' ')[0]}` : "Hello, sign in"}</p>
                            <p className="font-extrabold text-sm">Account & Lists</p>
                        </div>

                        {/* Orders */}
                        <Link href="/orders" className="text-white text-xs cursor-pointer hover:underline whitespace-nowrap">
                            <p>Returns</p>
                            <p className="font-extrabold text-sm">& Orders</p>
                        </Link>

                        {/* Cart */}
                        <Link href="/checkout">
                            <div className="relative flex items-center cursor-pointer hover:underline text-white">
                                <span className="absolute -top-1 -right-1 h-5 w-5 bg-amazon_orange text-center rounded-full text-black font-bold text-xs flex items-center justify-center">
                                    {items.length}
                                </span>
                                <ShoppingCart className="h-10 w-10" />
                                <p className="hidden lg:inline font-extrabold text-sm ml-2 mt-2">Cart</p>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile: Account + Orders + Cart */}
                    <div className="sm:hidden flex items-center gap-3">
                        {/* Account Icon */}
                        <div onClick={() => !session ? signIn() : router.push('/profile')} className="flex flex-col items-center cursor-pointer text-white">
                            <User className="h-6 w-6" />
                            <span className="text-xs mt-0.5">{session ? session.user?.name?.split(' ')[0] : "Sign in"}</span>
                        </div>

                        {/* Orders Icon */}
                        <Link href="/orders" className="flex flex-col items-center cursor-pointer text-white">
                            <Package className="h-6 w-6" />
                            <span className="text-xs mt-0.5">Orders</span>
                        </Link>

                        {/* Cart Icon */}
                        <Link href="/checkout" className="flex flex-col items-center cursor-pointer text-white relative">
                            <div className="relative">
                                <span className="absolute -top-2 -right-2 h-5 w-5 bg-amazon_orange text-center rounded-full text-black font-bold text-xs flex items-center justify-center">
                                    {items.length}
                                </span>
                                <ShoppingCart className="h-6 w-6" />
                            </div>
                            <span className="text-xs mt-0.5">Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Row 2: Search Bar (Mobile Only) */}
                <div className="sm:hidden px-3 pb-3">
                    <form onSubmit={handleSearch} className="flex items-center h-12 rounded-lg bg-white shadow-md">
                        <input
                            className="p-3 h-full flex-grow rounded-l-lg focus:outline-none text-base text-black bg-white"
                            type="text"
                            placeholder="Search for watches..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="h-full px-4 bg-amazon_yellow hover:bg-amazon_orange rounded-r-lg flex items-center justify-center transition-colors duration-200">
                            <Search className="h-6 w-6 text-black" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Nav - Category Links */}
            <div className="flex items-center space-x-3 p-2 pl-4 bg-amazon_blue-light text-white text-sm overflow-x-auto">
                <Link href="/" className="link flex items-center font-bold cursor-pointer hover:underline whitespace-nowrap">
                    <Menu className="h-6 w-6 mr-1" />
                    All
                </Link>
                <Link href="/?category=luxury" className="link cursor-pointer hover:underline whitespace-nowrap">Luxury Watches</Link>
                <Link href="/?category=smart" className="link cursor-pointer hover:underline whitespace-nowrap">Smart Watches</Link>
                <Link href="/?category=sport" className="link cursor-pointer hover:underline whitespace-nowrap">Sport Series</Link>
                <Link href="/" className="link cursor-pointer hover:underline whitespace-nowrap">New Arrivals</Link>
                <p className="link cursor-pointer hover:underline hidden lg:inline-flex whitespace-nowrap">Sell</p>
            </div>
        </header>
    );
}

export default Header;
