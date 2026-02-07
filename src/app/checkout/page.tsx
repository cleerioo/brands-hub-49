"use client";

import Image from "next/image";
import { useCart } from "../../providers/CartProvider";
import Header from "../../components/Header";
import { Star } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

function CheckoutItem({ item }: { item: any }) {
    const { removeFromCart } = useCart();

    return (
        <div className="grid grid-cols-5 border-b pb-4 mb-4">
            <Image src={item.image} height={200} width={200} objectFit="contain" alt={item.title} className="col-span-1 h-32 w-32 object-contain" />

            <div className="col-span-3 mx-5">
                <p className="font-medium">{item.title}</p>
                <div className="flex">
                    {Array(Math.round(item.rating?.rate || 0))
                        .fill(0)
                        .map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-amazon_yellow fill-current" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3 text-gray-500">{item.description}</p>
                <div className="font-bold">
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(item.price)}
                </div>
                {item.hasPrime && (
                    <div className="flex items-center space-x-2">
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>

            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button onClick={() => removeFromCart(item.id)} className="bg-amazon_yellow border border-yellow-500 rounded-sm py-2 px-4 shadow-sm hover:bg-amazon_orange active:from-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium text-xs">Remove from Cart</button>
            </div>
        </div>
    );
}

function Checkout() {
    const { items, total, clearCart } = useCart();
    const { data: session } = useSession();
    const router = useRouter();
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);

    useEffect(() => {
        if (session) {
            fetch("/api/user/address")
                .then(res => res.json())
                .then(data => {
                    if (data.addresses) setSavedAddresses(data.addresses);
                });
        }
    }, [session]);

    const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const addressId = e.target.value;
        if (addressId === "new") {
            setShippingAddress({ fullName: "", address: "", city: "", postalCode: "", country: "" });
        } else {
            const selected = savedAddresses.find((addr: any) => addr._id === addressId);
            if (selected) {
                setShippingAddress({
                    fullName: selected.fullName,
                    address: selected.street,
                    city: selected.city,
                    postalCode: selected.postalCode,
                    country: selected.country
                });
            }
        }
    };


    const [shippingAddress, setShippingAddress] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        country: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("card");

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const handlePlaceOrder = async () => {
        if (!session) {
            toast.error("Please sign in to place an order");
            return;
        }

        // Validate Address only if using COD or other manual methods, 
        // but for Stripe, address is collected on Stripe page (optional).
        // Let's keep manual validation for address consistency for now.
        const { fullName, address, city, postalCode, country } = shippingAddress;
        if (!fullName || !address || !city || !postalCode || !country) {
            toast.error("Please fill in all shipping details");
            return;
        }

        if (paymentMethod === "card") {
            try {
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

                const response = await fetch("/api/create-checkout-session", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        items: items,
                        email: session.user?.email,
                    }),
                });

                const checkoutSession = await response.json();

                // Save Local Order as 'Pending' or similar? 
                // For now, let's rely on webhook or success page logic. 
                // But since we don't have webhooks set up, the 'success' page won't verify backend.
                // We'll persist order locally as 'Processing' to show immediate feedback?
                // Actually, let's stick to standard flow: Redirect to Stripe.

                const result = await (stripe as any)?.redirectToCheckout({
                    sessionId: checkoutSession.id,
                });

                if (result?.error) {
                    toast.error(result.error.message || "Something went wrong");
                }
            } catch (err) {
                console.error(err);
                toast.error("Stripe Checkout Failed");
            }
        } else {
            // Existing Logic for COD/Manual
            const newOrder = {
                id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                userEmail: session.user?.email,
                amount: total,
                amountShipping: 0, // Mock shipping
                items: items,
                timestamp: Date.now(),
                images: items.map(item => item.image),
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod
            };

            // Save to LocalStorage
            const existingOrders = JSON.parse(localStorage.getItem("amazon-clone-orders") || "[]");
            existingOrders.push(newOrder);
            localStorage.setItem("amazon-clone-orders", JSON.stringify(existingOrders));

            // Clear Cart and Redirect
            clearCart();
            toast.success("Order Placed Successfully!");
            router.push("/orders");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <Toaster />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                {/* Left Section */}
                <div className="flex-grow m-5 shadow-sm">

                    {/* Shipping Address Form */}
                    {items.length > 0 && (
                        <div className="flex flex-col p-5 space-y-4 bg-white mb-5 border-b">
                            <h2 className="text-xl border-b pb-2 font-bold">Shipping Address</h2>

                            {savedAddresses.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select a Saved Address</label>
                                    <select
                                        onChange={handleSelectAddress}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-amazon_yellow focus:border-amazon_yellow"
                                    >
                                        <option value="new">Enter a new address</option>
                                        {savedAddresses.map((addr: any) => (
                                            <option key={addr._id} value={addr._id}>
                                                {addr.fullName} - {addr.street}, {addr.city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={shippingAddress.fullName}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address Line 1"
                                    value={shippingAddress.address}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={shippingAddress.city}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Zip / Postal Code"
                                    value={shippingAddress.postalCode}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Country"
                                    value={shippingAddress.country}
                                    onChange={handleAddressChange}
                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                            </div>
                        </div>
                    )}

                    {/* Payment Method UI */}
                    {items.length > 0 && (
                        <div className="flex flex-col p-5 space-y-4 bg-white mb-5 border-b">
                            <h2 className="text-xl border-b pb-2 font-bold">Payment Method</h2>
                            <div className="flex flex-col space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input type="radio" id="card" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="card" className="text-sm">Credit/Debit Card</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="radio" id="upi" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="upi" className="text-sm">UPI / Net Banking</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="radio" id="cod" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <label htmlFor="cod" className="text-sm">Cash on Delivery</label>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0 ? "Your Amazon Cart is empty." : "Shopping Cart"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutItem key={`${item.id}-${i}`} item={item} />
                        ))}
                    </div>
                </div>

                {/* Right Section */}
                {items.length > 0 && (
                    <div className="flex flex-col bg-white p-10 shadow-md">
                        <h2 className="whitespace-nowrap">
                            Subtotal ({items.length} items):
                            <span className="font-bold ml-1">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(total)}
                            </span>
                        </h2>

                        <button
                            onClick={handlePlaceOrder}
                            role="link"
                            className={`bg-amazon_yellow border border-yellow-500 rounded-sm py-2 px-4 shadow-sm hover:bg-amazon_orange active:from-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-medium mt-2  ${!session ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                            {!session ? "Sign in to Checkout" : "Place Order"}
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Checkout;
