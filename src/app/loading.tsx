export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-amazon_orange border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-500 font-medium animate-pulse">Loading Brands Hub 49...</p>
            </div>
        </div>
    );
}
