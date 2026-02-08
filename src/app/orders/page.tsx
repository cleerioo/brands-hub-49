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
            const fetchOrders = async () => {
                try {
                    const res = await fetch("/api/user/orders");
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error("Error fetching orders:", error);
                }
            };

            fetchOrders();
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
                            status={order.status}
                            trackingId={order.trackingId}
                            courierName={order.courierName}
                            shippingAddress={order.shippingAddress}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Orders;
