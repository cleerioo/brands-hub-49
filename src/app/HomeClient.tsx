"use client";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import FilterSidebar from "../components/FilterSidebar";
import { useState, useMemo } from "react";
import { Product } from "../providers/CartProvider";

interface HomeClientProps {
    initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState("featured");

    // Extract unique categories
    const categories = useMemo(() => Array.from(new Set(initialProducts.map(p => p.category))), [initialProducts]);

    const filteredProducts = useMemo(() => {
        let result = initialProducts;

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Filter by Rating
        if (minRating > 0) {
            result = result.filter(p => p.rating.rate >= minRating);
        }

        // Sort
        if (sortOrder === "price_low") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "price_high") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "rating") {
            result.sort((a, b) => b.rating.rate - a.rating.rate);
        }

        return result;
    }, [initialProducts, selectedCategories, priceRange, minRating, sortOrder]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />

            <main className="max-w-screen-2xl mx-auto">
                <Banner />

                <div className="flex flex-col md:flex-row p-5 gap-5">
                    {/* Sidebar - Desktop */}
                    <div className="hidden md:block">
                        <FilterSidebar
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            minRating={minRating}
                            setMinRating={setMinRating}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                        />
                    </div>

                    {/* Mobile Filter Toggle (Optional/TODO) */}
                    {/* For now, filters are desktop only or could be stacked */}

                    <div className="flex-grow">
                        {filteredProducts.length > 0 ? (
                            <ProductFeed products={filteredProducts} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg">
                                <h2 className="text-2xl font-bold text-gray-600">No results found</h2>
                                <p className="text-gray-500">Try adjusting your filters.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
