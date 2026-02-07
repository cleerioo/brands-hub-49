"use client";

import { CheckCircle } from "lucide-react";
import Link from "next/link";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SuccessPage() {
    const { data: session } = useSession();
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (session && !emailSent) {
            // Fetch latest order to send email
            // In a production app, we would pass the session_id from Stripe here to be precise
            fetch('/api/admin/orders') // Re-using admin endpoint for simplicity to get latest order for this user
                .then(res => res.json())
                .then(data => {
                    if (data.orders && data.orders.length > 0) {
                        const latestOrder = data.orders[0]; // Assuming sorted by date desc
                        if (latestOrder.userEmail === session.user?.email) {
                            sendConfirmationEmail(latestOrder);
                        }
                    }
                });
        }
    }, [session, emailSent]);

    const sendConfirmationEmail = async (order: any) => {
        setEmailSent(true);
        try {
            await fetch('/api/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: order._id,
                    email: order.userEmail,
                    items: order.items,
                    amount: order.amount
                })
            });
            console.log("Email trigger sent");
        } catch (error) {
            console.error("Failed to send email", error);
        }
    };

    return (
        <div className="bg-gray-100 h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto">
                <div className="flex flex-col p-10 bg-white shadow-sm mt-5">
                    <div className="flex items-center space-x-2 mb-5">
                        <CheckCircle className="text-green-500 h-10 w-10" />
                        <h1 className="text-3xl">Thank you, your order has been confirmed!</h1>
                    </div>
                    <p>
                        Thank you for shopping with us. We've sent a confirmation email to <strong>{session?.user?.email}</strong>.
                    </p>
                    <Link href="/orders">
                        <button className="w-full mt-8 bg-amazon_yellow font-medium mb-10 py-2 rounded-md shadow-sm border border-yellow-500 hover:bg-amazon_orange">
                            Go to my orders
                        </button>
                    </Link>
                </div>
            </main>
        </div>
    );
}
