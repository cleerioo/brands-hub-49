"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface FilterProps {
    categories: string[];
    selectedCategories: string[];
    setSelectedCategories: (categories: string[]) => void;
    brands: string[];
    selectedBrands: string[];
    setSelectedBrands: (brands: string[]) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minRating: number;
    setMinRating: (rating: number) => void;
    sortOrder: string;
    setSortOrder: (sort: string) => void;
    showInStock: boolean;
    setShowInStock: (show: boolean) => void;
}

export default function FilterSidebar({
    categories,
    selectedCategories,
    setSelectedCategories,
    brands,
    selectedBrands,
    setSelectedBrands,
    priceRange,
    setPriceRange,
    minRating,
    setMinRating,
    sortOrder,
    setSortOrder,
    showInStock,
    setShowInStock
}: FilterProps) {
    const [showAllBrands, setShowAllBrands] = useState(false);
    const displayedBrands = showAllBrands ? brands : brands.slice(0, 8);

    const handleCategoryChange = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleBrandChange = (brand: string) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
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

            {/* Brands */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-sm">Brand</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                    {displayedBrands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`brand-${brand}`}
                                checked={selectedBrands.includes(brand)}
                                onChange={() => handleBrandChange(brand)}
                                className="rounded text-amazon_orange focus:ring-amazon_orange cursor-pointer"
                            />
                            <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer hover:text-amazon_orange">
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
                {brands.length > 8 && (
                    <button
                        onClick={() => setShowAllBrands(!showAllBrands)}
                        className="text-xs text-blue-600 hover:text-blue-800 hover:underline mt-2"
                    >
                        {showAllBrands ? 'Show Less' : `Show All (${brands.length})`}
                    </button>
                )}
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2 text-sm">Price Range</h3>
                <div className="flex items-center space-x-2 mb-3">
                    <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full p-2 border rounded text-sm"
                        min="0"
                        max={priceRange[1]}
                    />
                    <span className="text-gray-500">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 200000])}
                        className="w-full p-2 border rounded text-sm"
                        min={priceRange[0]}
                    />
                </div>
                <input
                    type="range"
                    min="0"
                    max="200000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-amazon_orange cursor-pointer"
                />
            </div>

            {/* Stock Availability */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Availability</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showInStock}
                            onChange={(e) => setShowInStock(e.target.checked)}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amazon_orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amazon_orange"></div>
                    </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Show in-stock items only</p>
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
                    setSelectedBrands([]);
                    setPriceRange([0, 200000]);
                    setMinRating(0);
                    setSortOrder("featured");
                    setShowInStock(false);
                }}
                className="mt-6 w-full text-xs text-blue-600 hover:text-blue-800 hover:underline text-center"
            >
                Clear All Filters
            </button>
        </div>
    );
}
