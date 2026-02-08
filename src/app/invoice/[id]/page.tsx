"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface OrderItem {
    id: number;
    title: string;
    price: number;
    quantity: number; // Assuming quantity is 1 for now if not structured
    image: string;
}

interface OrderData {
    _id: string;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    status: string;
    items: OrderItem[];
    shippingAddress: {
        fullName: string;
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    createdAt: string;
}

export default function InvoicePage() {
    const params = useParams();
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch order details
        // In a real app, you might want a specific API for this or reuse an existing one.
        // For now, we'll try to fetch from a hypothetic API or just mock it if we can't find one readily.
        // Waiting for the user to implement a single order fetch API might be too much, 
        // so I will fetch all orders and find the one. Ideally we should have /api/orders/[id].

        // Actually, let's use the verify API or similar if exists. 
        // Or better, let's just use the /api/orders endpoint and filter. 
        // NOTE: This is not efficient for production but sufficient for this demo.

        const fetchOrder = async () => {
            try {
                // Use the new single order endpoint
                const res = await fetch(`/api/orders/${params.id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch order");
                }

                const data = await res.json();
                setOrder(data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [params.id]);

    if (loading) return <div className="p-10 text-center">Loading Invoice...</div>;
    if (!order) return <div className="p-10 text-center text-red-600">Order not found.</div>;

    const TAX_RATE = 0.18; // 18% GST default
    const baseAmount = order.amount / (1 + TAX_RATE);
    const taxAmount = order.amount - baseAmount;

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 min-h-screen text-gray-800 font-sans">
            {/* Header */}
            <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">TAX INVOICE</h1>
                    <p className="text-sm text-gray-500 mt-1">Original for Recipient</p>
                    <div className="mt-4 text-sm">
                        <p className="font-bold">Sold By:</p>
                        <p>Brands Hub 49 Retail Pvt Ltd.</p>
                        <p>123 Fashion Street, Indiranagar</p>
                        <p>Bangalore, Karnataka - 560038</p>
                        <p>GSTIN: <span className="font-mono font-bold">29ABCDE1234F1Z5</span></p>
                    </div>
                </div>
                <div className="text-right">
                    {/* Placeholder Logo */}
                    <div className="text-xl font-bold text-amazon_blue mb-2">Brands Hub 49</div>
                    <div className="text-sm space-y-1">
                        <p><span className="font-bold">Invoice #:</span> INV-{order._id.slice(-6).toUpperCase()}</p>
                        <p><span className="font-bold">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
                        <p><span className="font-bold">Order ID:</span> {order.razorpayOrderId}</p>
                    </div>
                </div>
            </div>

            {/* Bill To */}
            <div className="mb-8">
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Bill To:</h3>
                <div className="text-sm">
                    <p className="font-bold text-gray-900">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.street}</p>
                    <p>{order.shippingAddress.city} - {order.shippingAddress.postalCode}</p>
                    <p>{order.shippingAddress.country}</p>
                </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left border-collapse mb-8">
                <thead>
                    <tr className="border-b-2 border-gray-300 text-sm">
                        <th className="py-2">Description</th>
                        <th className="py-2 text-center">Qty</th>
                        <th className="py-2 text-right">Unit Price</th>
                        <th className="py-2 text-right">Tax (18%)</th>
                        <th className="py-2 text-right">Total</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {order.items.map((item, idx) => {
                        // Assuming item structure. If amount includes tax, we back calculate.
                        const itemTotal = Number(item.price || order.amount); // Fallback if item.price missing
                        const itemBase = itemTotal / 1.18;
                        const itemTax = itemTotal - itemBase;

                        return (
                            <tr key={idx} className="border-b border-gray-100">
                                <td className="py-3">
                                    <p className="font-medium text-gray-900">{item.title || "Product"}</p>
                                    <p className="text-xs text-gray-500">HSN: 9102</p>
                                </td>
                                <td className="py-3 text-center">1</td>
                                <td className="py-3 text-right">₹{itemBase.toFixed(2)}</td>
                                <td className="py-3 text-right">₹{itemTax.toFixed(2)}</td>
                                <td className="py-3 text-right font-medium">₹{itemTotal.toFixed(2)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end border-t border-gray-200 pt-4">
                <div className="w-1/2 max-w-xs space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Taxable Amount:</span>
                        <span>₹{baseAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Total Tax (GST):</span>
                        <span>₹{taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-2 text-lg font-bold text-gray-900">
                        <span>Grand Total:</span>
                        <span>₹{order.amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-12 text-center border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">Thank you for shopping with Brands Hub 49!</p>
                <p className="text-xs text-gray-400 mt-1">This is a highly-secure computer generated invoice.</p>
                <button
                    onClick={() => window.print()}
                    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 print:hidden"
                >
                    Print / Download PDF
                </button>
            </div>

            <style jsx global>{`
                @media print {
                    .print\\:hidden {
                        display: none;
                    }
                    body {
                        background: white;
                    }
                    .max-w-3xl {
                        max-w-none;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
