"use client";

import Link from "next/link";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-amazon_blue-light text-white text-sm">
            {/* Back to Top */}
            <div
                onClick={scrollToTop}
                className="bg-amazon_blue-lighter py-4 text-center cursor-pointer hover:bg-opacity-90 transition-colors"
            >
                <p>Back to top</p>
            </div>

            {/* Links Section */}
            <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <h5 className="font-bold text-base">Get to Know Us</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">About BrandHub49</li>
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Contact Us</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-base">Customer Service</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">Your Account</li>
                        <li className="hover:underline cursor-pointer">
                            <Link href="/orders">Your Orders</Link>
                        </li>
                        <li className="hover:underline cursor-pointer">Shipping & Returns</li>
                        <li className="hover:underline cursor-pointer">Help Center</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-base">Shop</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">
                            <Link href="/?category=luxury">Luxury Watches</Link>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <Link href="/?category=smart">Smart Watches</Link>
                        </li>
                        <li className="hover:underline cursor-pointer">
                            <Link href="/?category=sport">Sport Watches</Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-amazon_blue border-t border-gray-600 py-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Legal Links */}
                    <div className="flex space-x-6 text-xs text-gray-300">
                        <Link href="/terms" className="hover:underline">Terms of Service</Link>
                        <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                    </div>
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} BrandHub49. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
