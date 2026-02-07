"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useSession } from "next-auth/react";
import Order from "../../components/Order";

function Orders() {
    const { data: session } = useSession();
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        if (session) {
            // Fetch orders from LocalStorage
            const storedOrders = JSON.parse(localStorage.getItem("amazon-clone-orders") || "[]");
            // Filter by current user email
            const userOrders = storedOrders.filter((order: any) => order.userEmail === session.user?.email);
            // Sort by date desc
            setOrders(userOrders.sort((a: any, b: any) => b.timestamp - a.timestamp));
        } else {
            setOrders([]);
        }
    }, [session]);

    return (
        <div>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>

                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <Order
                            key={order.id}
                            id={order.id}
                            amount={order.amount}
                            amountShipping={order.amountShipping}
                            items={order.items}
                            timestamp={order.timestamp}
                            images={order.images}
                            shippingAddress={order.shippingAddress}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Orders;
