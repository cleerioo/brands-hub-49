"use client";

import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import FilterSidebar from "../components/FilterSidebar";
import { useState, useMemo, useEffect } from "react";
import { Product } from "../providers/CartProvider";
import { useSearchParams } from "next/navigation";
import { extractBrandFromTitle } from "../lib/extractBrand";

interface HomeClientProps {
    initialProducts: Product[];
}

export default function HomeClient({ initialProducts }: HomeClientProps) {
    const searchParams = useSearchParams();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [minRating, setMinRating] = useState(0);
    const [sortOrder, setSortOrder] = useState("featured");
    const [searchTerm, setSearchTerm] = useState("");
    const [showInStock, setShowInStock] = useState(false);

    // Extract unique categories
    const categories = useMemo(() => Array.from(new Set(initialProducts.map(p => p.category))), [initialProducts]);

    // Extract unique brands
    const brands = useMemo(() => {
        const brandSet = new Set<string>();
        initialProducts.forEach(p => {
            const brand = extractBrandFromTitle(p.title);
            if (brand) brandSet.add(brand);
        });
        return Array.from(brandSet).sort();
    }, [initialProducts]);

    // Read URL parameters and set filters
    useEffect(() => {
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        if (category) {
            setSelectedCategories([category]);
        } else {
            setSelectedCategories([]);
        }

        if (search) {
            setSearchTerm(search);
        } else {
            setSearchTerm("");
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        let result = initialProducts;

        // Filter by Search Term
        if (searchTerm) {
            result = result.filter(p =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.category.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by Brand
        if (selectedBrands.length > 0) {
            result = result.filter(p => {
                const brand = extractBrandFromTitle(p.title);
                return brand && selectedBrands.includes(brand);
            });
        }

        // Filter by Price
        result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

        // Filter by Rating
        if (minRating > 0) {
            result = result.filter(p => p.rating.rate >= minRating);
        }

        // Filter by Stock
        if (showInStock) {
            // Check countInStock if available, otherwise assume in stock if not explicitly 0 in description metadata (mock)
            // For now, we'll assume all are in stock unless we add a specific field, but let's simulate it
            // In a real app, check p.countInStock > 0
            // Since our mock data doesn't have countInStock, we'll just check if price > 0 as a proxy or nothing
            // Actually, let's just pass true for now as we don't have stock data in mock
            // If we had a countInStock field: result = result.filter(p => (p.countInStock ?? 1) > 0);
            // Since we don't, this filter effectively does nothing but is ready for the data
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
    }, [initialProducts, selectedCategories, selectedBrands, priceRange, minRating, sortOrder, searchTerm, showInStock]);

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
                            brands={brands}
                            selectedBrands={selectedBrands}
                            setSelectedBrands={setSelectedBrands}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            minRating={minRating}
                            setMinRating={setMinRating}
                            sortOrder={sortOrder}
                            setSortOrder={setSortOrder}
                            showInStock={showInStock}
                            setShowInStock={setShowInStock}
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
