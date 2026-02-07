"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
    const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // OTP states
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loginMethod === "email") {
            await signIn("credentials", {
                username: email,
                password: password,
                callbackUrl: "/",
            });
        } else {
            // OTP Login
            await signIn("credentials", {
                mobile: mobile,
                otp: otp,
                callbackUrl: "/",
            });
        }
    };

    const handleSendOtp = async () => {
        if (!mobile || mobile.length < 10) {
            toast.error("Please enter a valid mobile number");
            return;
        }

        setOtpLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setOtpLoading(false);
        setIsOtpSent(true);
        toast.success("OTP Sent! (Use 123456)");
    };

    return (
        <div className="relative flex flex-col items-center min-h-screen bg-gray-50 py-10">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1622434641406-a15812345ad1?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Watch Background"
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay for better contrast if needed */}
            </div>

            {/* Content Wrapper */}
            <div className="z-10 w-full flex flex-col items-center">
                <Link href="/">
                    <div className="mb-6 cursor-pointer flex items-center">
                        <h1 className="text-3xl font-bold font-serif italic tracking-wide text-white drop-shadow-md">
                            Brands Hub 49
                        </h1>
                    </div>
                </Link>

                <div className="w-full max-w-[350px] bg-white border border-gray-300 rounded p-6 shadow-sm">
                    <h1 className="text-3xl font-normal mb-4">Sign in</h1>

                    {/* Method Toggle */}
                    <div className="flex mb-4 text-sm font-medium border-b border-gray-200">
                        <button
                            onClick={() => setLoginMethod("email")}
                            className={`pb-2 pr-4 ${loginMethod === "email" ? "text-black border-b-2 border-amazon_orange" : "text-gray-500 hover:text-black"}`}
                        >
                            Email
                        </button>
                        <button
                            onClick={() => setLoginMethod("mobile")}
                            className={`pb-2 px-4 ${loginMethod === "mobile" ? "text-black border-b-2 border-amazon_orange" : "text-gray-500 hover:text-black"}`}
                        >
                            Mobile Number
                        </button>
                    </div>

                    <form className="flex flex-col space-y-3" onSubmit={handleCredentialsLogin}>

                        {loginMethod === "email" ? (
                            <>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-bold text-sm">Email or mobile phone number</label>
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon_orange/50 focus:border-amazon_orange shadow-[0_0_0_3px_transparent_inset]"
                                    />
                                </div>

                                <div className="flex flex-col space-y-1">
                                    <div className="flex justify-between">
                                        <label className="font-bold text-sm">Password</label>
                                        <a href="#" className="text-xs text-blue-600 hover:text-orange-700 hover:underline">Forgot your password?</a>
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon_orange/50 focus:border-amazon_orange"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-bold text-sm">Mobile number</label>
                                    <div className="flex">
                                        <span className="bg-gray-100 border border-r-0 border-gray-300 p-2 rounded-l-sm text-gray-500 text-sm flex items-center">IN +91</span>
                                        <input
                                            type="tel"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            placeholder="Mobile number"
                                            disabled={isOtpSent}
                                            className="w-full border border-gray-300 p-2 rounded-r-sm focus:outline-none focus:ring-2 focus:ring-amazon_orange/50 focus:border-amazon_orange"
                                        />
                                    </div>
                                </div>

                                {!isOtpSent ? (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={otpLoading}
                                        className="bg-gray-100 border border-gray-300 rounded-sm py-1 shadow-sm hover:bg-gray-200 focus:ring-2 focus:ring-yellow-500 mt-2 text-sm"
                                    >
                                        {otpLoading ? "Sending..." : "Get OTP"}
                                    </button>
                                ) : (
                                    <div className="flex flex-col space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <div className="flex justify-between">
                                            <label className="font-bold text-sm">Enter OTP</label>
                                            <button type="button" onClick={() => setIsOtpSent(false)} className="text-xs text-blue-600 hover:underline">Change Number</button>
                                        </div>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter 6-digit OTP"
                                            maxLength={6}
                                            className="border border-gray-300 p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-amazon_orange/50 focus:border-amazon_orange"
                                        />
                                        <p className="text-[10px] text-green-600 font-bold">OTP Sent to {mobile}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {(!isOtpSent || loginMethod === "email") && loginMethod !== "mobile" && (
                            <button
                                type="submit"
                                className="bg-amazon_yellow border border-yellow-600 rounded-sm py-1 shadow-sm hover:bg-yellow-400 active:bg-yellow-500 bg-gradient-to-b from-yellow-200 to-yellow-400 focus:ring-2 focus:ring-yellow-500 mt-2"
                            >
                                Continue
                            </button>
                        )}

                        {loginMethod === "mobile" && isOtpSent && (
                            <button
                                type="submit"
                                className="bg-amazon_yellow border border-yellow-600 rounded-sm py-1 shadow-sm hover:bg-yellow-400 active:bg-yellow-500 bg-gradient-to-b from-yellow-200 to-yellow-400 focus:ring-2 focus:ring-yellow-500 mt-2"
                            >
                                Verify & Continue
                            </button>
                        )}


                        <p className="text-xs mt-4">
                            By continuing, you agree to Brands Hub 49's <span className="text-blue-600 hover:text-orange-700 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:text-orange-700 hover:underline cursor-pointer">Privacy Notice</span>.
                        </p>

                        <div className="flex items-center text-xs mt-4 group cursor-pointer">
                            <span className="text-gray-500 mr-1">►</span>
                            <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline">Need help?</span>
                        </div>
                    </form>
                </div>


                <div className="w-full max-w-[350px] mt-4 border-t border-gray-200 pt-4">

                    {/* Google Sign In option */}
                    <div className="flex flex-col items-center space-y-2">
                        <p className="text-xs text-gray-500 mb-2">Or sign in with</p>
                        <button
                            onClick={() => signIn("google", { callbackUrl: "/" })}
                            className="w-full border border-gray-300 rounded-sm py-2 shadow-sm bg-white hover:bg-gray-50 text-sm flex items-center justify-center space-x-2"
                        >
                            <Image
                                src="https://authjs.dev/img/providers/google.svg"
                                alt="Google"
                                width={20}
                                height={20}
                            />
                            <span>Sign in with Google</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center space-y-2 text-xs w-full border-t border-gray-200 pt-8 pb-4">
                    <div className="flex space-x-8 text-white drop-shadow-md">
                        <span className="hover:text-orange-300 hover:underline cursor-pointer">Conditions of Use</span>
                        <span className="hover:text-orange-300 hover:underline cursor-pointer">Privacy Notice</span>
                        <span className="hover:text-orange-300 hover:underline cursor-pointer">Help</span>
                    </div>
                    <p className="text-gray-300">© 1996-2026, Brands Hub 49, Inc. or its affiliates</p>
                </div>
            </div>
        </div>
    );
}
