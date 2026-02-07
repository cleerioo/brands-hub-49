"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-hot-toast"; // Assuming we might want toast, but I'll stick to console/simple alert if not installed. Let's install react-hot-toast later. For now just standard state.

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    hasPrime?: boolean;
    countInStock?: number;
}

interface CartContextType {
    items: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([]);

    // Load Cart from LocalStorage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("amazon-clone-cart");
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, []);

    // Save Cart to LocalStorage whenever items change
    useEffect(() => {
        if (items.length > 0) {
            localStorage.setItem("amazon-clone-cart", JSON.stringify(items));
        }
    }, [items]);

    const addToCart = (product: Product) => {
        setItems((prev) => [...prev, product]);
        toast.success("Added to Cart");
    };

    const removeFromCart = (id: number) => {
        const index = items.findIndex((item) => item.id === id);
        if (index >= 0) {
            const newItems = [...items];
            newItems.splice(index, 1);
            setItems(newItems);
            if (newItems.length === 0) {
                localStorage.removeItem("amazon-clone-cart");
            }
        }
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem("amazon-clone-cart");
    };

    const total = items.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
