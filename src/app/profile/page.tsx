"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import React from 'react';
import Header from "../../components/Header";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [addresses, setAddresses] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        isDefault: false
    });

    useEffect(() => {
        if (session) {
            fetchAddresses();
        }
    }, [session]);

    const fetchAddresses = async () => {
        const res = await fetch("/api/user/address");
        const data = await res.json();
        if (data.addresses) setAddresses(data.addresses);
    };

    const handleAddAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/user/address", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            toast.success("Address Added!");
            setShowForm(false);
            fetchAddresses();
            setFormData({ fullName: "", street: "", city: "", postalCode: "", country: "", isDefault: false });
        } else {
            toast.error("Failed to add address");
        }
    };

    const handleDeleteAddress = async (id: string) => {
        const res = await fetch("/api/user/address", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addressId: id })
        });
        if (res.ok) {
            toast.success("Address Removed");
            fetchAddresses();
        }
    };

    if (!session) return (
        <div>
            <Header />
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p>Please sign in to view your profile.</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className="max-w-screen-lg mx-auto p-5">
                <h1 className="text-3xl font-semibold border-b pb-4 mb-6">Your Profile</h1>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* User Info */}
                    <div className="w-full md:w-1/3 bg-white p-5 rounded-lg shadow-sm h-fit">
                        <div className="flex flex-col items-center">
                            <Image
                                src={session.user?.image || "https://links.papareact.com/f90"}
                                width={100}
                                height={100}
                                className="rounded-full mb-4"
                                alt="Profile"
                            />
                            <h2 className="text-xl font-bold">{session.user?.name}</h2>
                            <p className="text-gray-500">{session.user?.email}</p>
                            <span className="bg-amazon_blue text-white text-xs px-2 py-1 rounded mt-2">Prime Member</span>
                        </div>
                    </div>

                    {/* Address Book */}
                    <div className="w-full md:w-2/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-semibold">Your Addresses</h2>
                            <button
                                onClick={() => setShowForm(!showForm)}
                                className="bg-amazon_yellow text-sm font-semibold py-2 px-4 rounded shadow-sm hover:bg-amazon_orange transition"
                            >
                                {showForm ? "Cancel" : "Add New Address"}
                            </button>
                        </div>

                        {showForm && (
                            <form onSubmit={handleAddAddress} className="bg-white p-5 rounded-lg shadow-sm mb-6 space-y-3">
                                <input type="text" placeholder="Full Name" required className="w-full p-2 border rounded"
                                    value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                <input type="text" placeholder="Street Address" required className="w-full p-2 border rounded"
                                    value={formData.street} onChange={e => setFormData({ ...formData, street: e.target.value })} />
                                <div className="flex space-x-2">
                                    <input type="text" placeholder="City" required className="w-1/2 p-2 border rounded"
                                        value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                                    <input type="text" placeholder="Postal Code" required className="w-1/2 p-2 border rounded"
                                        value={formData.postalCode} onChange={e => setFormData({ ...formData, postalCode: e.target.value })} />
                                </div>
                                <input type="text" placeholder="Country" required className="w-full p-2 border rounded"
                                    value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />

                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="default" checked={formData.isDefault}
                                        onChange={e => setFormData({ ...formData, isDefault: e.target.checked })} />
                                    <label htmlFor="default">Set as default address</label>
                                </div>

                                <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold hover:bg-yellow-500">
                                    Save Address
                                </button>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {addresses.map((addr, i) => (
                                <div key={i} className="bg-white p-4 rounded-lg shadow-sm border relative hover:shadow-md transition">
                                    {addr.isDefault && <span className="absolute top-2 right-2 text-xs text-green-600 font-bold border border-green-600 px-1 rounded">Default</span>}
                                    <p className="font-bold">{addr.fullName}</p>
                                    <p className="text-sm text-gray-600">{addr.street}</p>
                                    <p className="text-sm text-gray-600">{addr.city}, {addr.postalCode}</p>
                                    <p className="text-sm text-gray-600">{addr.country}</p>
                                    <button onClick={() => handleDeleteAddress(addr._id)} className="text-red-500 text-xs mt-3 hover:underline">Remove</button>
                                </div>
                            ))}
                            {addresses.length === 0 && !showForm && (
                                <p className="text-gray-500">No addresses saved yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
