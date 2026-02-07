"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (status === "loading") return;

        if (!session || session.user.role !== "admin") {
            router.push("/");
        } else {
            setIsAuthorized(true);
        }
    }, [session, status, router]);

    if (status === "loading" || !isAuthorized) {
        return <div className="flex h-screen items-center justify-center">Loading Admin Panel...</div>;
    }

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white hidden md:block flex-shrink-0">
                <div className="p-4 border-b border-slate-800">
                    <h1 className="text-xl font-bold text-amazon_orange">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/orders" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition">
                        <ShoppingBag className="h-5 w-5" />
                        <span>Orders</span>
                    </Link>

                    {/* Products Management: Placeholder since we use mock data primarily right now */}
                    <div className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition w-full text-left opacity-50 cursor-not-allowed">
                        <Package className="h-5 w-5" />
                        <span>Products (Soon)</span>
                    </div>

                    <div className="border-t border-slate-800 mt-4 pt-4">
                        <Link href="/" className="flex items-center space-x-3 p-3 rounded hover:bg-slate-800 transition text-gray-400 hover:text-white">
                            <Home className="h-5 w-5" />
                            <span>Back to Store</span>
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}
