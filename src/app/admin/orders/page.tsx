"use client";

import { useEffect, useState } from "react";
import Header from "../../../components/Header";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [statusUpdate, setStatusUpdate] = useState({
        status: "",
        courierName: "",
        trackingId: ""
    });

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch("/api/admin/orders")
            .then((res) => res.json())
            .then((data) => {
                if (data.orders) {
                    setOrders(data.orders);
                }
                setLoading(false);
            });
    };

    const handleUpdateStatus = async () => {
        if (!selectedOrder) return;

        try {
            const res = await fetch("/api/admin/orders/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: selectedOrder._id,
                    ...statusUpdate
                })
            });

            if (res.ok) {
                // Refresh orders
                fetchOrders();
                setSelectedOrder(null);
                alert("Order status updated successfully!");
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating status");
        }
    };

    const openUpdateModal = (order: any) => {
        setSelectedOrder(order);
        setStatusUpdate({
            status: order.status,
            courierName: order.courierName || "",
            trackingId: order.trackingId || ""
        });
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="max-w-screen-xl mx-auto p-10">
                <h1 className="text-3xl border-b mb-5 pb-1 border-yellow-500">Admin Dashboard - Orders</h1>

                {loading ? (
                    <p>Loading orders...</p>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="relative border rounded-md bg-white p-5 shadow-sm">
                                <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
                                    <div>
                                        <p className="font-bold text-xs">ORDER PLACED</p>
                                        <p>{new Date(order.timestamp).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs">TOTAL</p>
                                        <p>
                                            {new Intl.NumberFormat("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            }).format(order.amount)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="font-bold text-xs">STATUS</p>
                                        <p className={`font-bold uppercase ${order.status === 'paid' ? 'text-green-600' : 'text-orange-500'}`}>
                                            {order.status}
                                        </p>
                                    </div>
                                    <div className="flex-1 text-right text-blue-500 truncate text-xs whitespace-nowrap">
                                        ORDER # {order.razorpayOrderId || order._id}
                                    </div>
                                </div>

                                <div className="p-5 sm:p-10">
                                    <div className="flex space-x-6 overflow-x-auto">
                                        {order.items.map((item: any, i: number) => (
                                            <img
                                                key={i}
                                                src={item.image}
                                                alt=""
                                                className="h-20 object-contain sm:h-32"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            onClick={() => openUpdateModal(order)}
                                            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-semibold py-2 px-4 rounded inline-flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                            <span>Update Status</span>
                                        </button>
                                        <button
                                            onClick={() => window.open(`/invoice/${order._id}`, '_blank')}
                                            className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
                                        >
                                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                                            <span>Download Invoice</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Update Status Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full">
                            <h2 className="text-xl font-bold mb-4">Update Order Status</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={statusUpdate.status}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="paid">Paid</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Courier Name (Optional)</label>
                                    <input
                                        type="text"
                                        value={statusUpdate.courierName}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, courierName: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="e.g. DTDC, BlueDart"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tracking ID (Optional)</label>
                                    <input
                                        type="text"
                                        value={statusUpdate.trackingId}
                                        onChange={(e) => setStatusUpdate({ ...statusUpdate, trackingId: e.target.value })}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                        placeholder="e.g. 123456789"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateStatus}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
