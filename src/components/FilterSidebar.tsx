"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface FilterProps {
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minRating: number;
    setMinRating: (rating: number) => void;
    sortOrder: string;
    setSortOrder: (sort: string) => void;
}

export default function FilterSidebar({
    categories,
    selectedCategories,
    setSelectedCategories,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder
}: FilterProps) {

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    return (
        <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
            <h2 className="font-bold text-lg mb-4 border-b pb-2">Filters</h2>

            {/* Sort */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-sm">Sort By</h3>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full p-2 border rounded text-sm bg-gray-50 cursor-pointer hover:border-amazon_orange"
                >
                    <option value="featured">Featured</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                    <option value="rating">Avg. Customer Review</option>
                </select>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-sm">Category</h3>
                <div className="space-y-2">
                    {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={category}
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                                className="rounded text-amazon_orange focus:ring-amazon_orange cursor-pointer"
                            />
                            <label htmlFor={category} className="text-sm capitalize cursor-pointer hover:text-amazon_orange">
                                {category}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-sm">Price Range</h3>
                <div className="flex items-center space-x-2 text-sm mb-2">
                    <span>₹{priceRange[0]}</span>
                    <span>-</span>
                    <span>₹{priceRange[1]}+</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-amazon_orange cursor-pointer"
                />
            </div>

            {/* Rating */}
            <div>
                <h3 className="font-semibold mb-2 text-sm">Customer Rating</h3>
                <div className="space-y-1">
                    {[4, 3, 2, 1].map(star => (
                        <div
                            key={star}
                            onClick={() => setMinRating(star)}
                            className={`flex items-center space-x-1 cursor-pointer p-1 rounded ${minRating === star ? 'bg-gray-100 font-bold' : 'hover:bg-gray-50'}`}
                        >
                            <div className="flex text-yellow-500">
                                {Array(5).fill(0).map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < star ? "fill-current" : "text-gray-300"}`} />
                                ))}
                            </div>
                            <span className="text-xs text-gray-600">& Up</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reset Button */}
            <button
                onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 200000]);
                    setMinRating(0);
                    setSortOrder("featured");
                }}
                className="mt-6 w-full text-xs text-blue-600 hover:text-blue-800 hover:underline text-center"
            >
                Clear All Filters
            </button>
        </div>
    );
}
