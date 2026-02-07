"use client";

import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, productCount: 0 });

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => {
                if (!data.error) setStats(data);
            });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Revenue Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
                    <div className="p-3 bg-green-100 rounded-full mr-4">
                        <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                        <h3 className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.totalRevenue)}
                        </h3>
                    </div>
                </div>

                {/* Orders Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full mr-4">
                        <ShoppingCart className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                    </div>
                </div>

                {/* Products Card */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full mr-4">
                        <Package className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Total Products</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stats.productCount}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                <p className="text-gray-500">Real-time order feed coming soon...</p>
            </div>
        </div>
    );
}
