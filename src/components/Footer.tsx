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
            <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h5 className="font-bold text-base">Get to Know Us</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">Careers</li>
                        <li className="hover:underline cursor-pointer">Blog</li>
                        <li className="hover:underline cursor-pointer">About Amazon Clone</li>
                        <li className="hover:underline cursor-pointer">Investor Relations</li>
                        <li className="hover:underline cursor-pointer">Amazon Devices</li>
                        <li className="hover:underline cursor-pointer">Amazon Science</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-base">Make Money with Us</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">Sell products on Amazon</li>
                        <li className="hover:underline cursor-pointer">Sell on Amazon Business</li>
                        <li className="hover:underline cursor-pointer">Sell apps on Amazon</li>
                        <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                        <li className="hover:underline cursor-pointer">Advertise Your Products</li>
                        <li className="hover:underline cursor-pointer">Self-Publish with Us</li>
                        <li className="hover:underline cursor-pointer">Host an Amazon Hub</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-base">Amazon Payment Products</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">Amazon Business Card</li>
                        <li className="hover:underline cursor-pointer">Shop with Points</li>
                        <li className="hover:underline cursor-pointer">Reload Your Balance</li>
                        <li className="hover:underline cursor-pointer">Amazon Currency Converter</li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h5 className="font-bold text-base">Let Us Help You</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li className="hover:underline cursor-pointer">Amazon and COVID-19</li>
                        <li className="hover:underline cursor-pointer">Your Account</li>
                        <li className="hover:underline cursor-pointer">Your Orders</li>
                        <li className="hover:underline cursor-pointer">Shipping Rates & Policies</li>
                        <li className="hover:underline cursor-pointer">Returns & Replacements</li>
                        <li className="hover:underline cursor-pointer">Manage Your Content and Devices</li>
                        <li className="hover:underline cursor-pointer">Amazon Assistant</li>
                        <li className="hover:underline cursor-pointer">Help</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-amazon_blue border-t border-gray-600 py-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {/* Legal Links */}
                    <div className="flex space-x-6 text-xs text-gray-300">
                        <Link href="/terms" className="hover:underline">Conditions of Use</Link>
                        <Link href="/privacy" className="hover:underline">Privacy Notice</Link>
                        <Link href="#" className="hover:underline">Consumer Health Data Privacy Disclosure</Link>
                        <Link href="#" className="hover:underline">Your Ads Privacy Choices</Link>
                    </div>
                    <p className="text-xs text-gray-400">
                        © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
