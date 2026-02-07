import Link from "next/link";
import Header from "../components/Header";

export default function NotFound() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex flex-col items-center justify-center text-center p-10 space-y-6">
                <h1 className="text-9xl font-bold text-gray-300">404</h1>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                    <p className="text-gray-600 max-w-md">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>
                <Link href="/">
                    <button className="bg-amazon_yellow border border-yellow-500 rounded-md px-6 py-3 shadow-sm hover:bg-amazon_orange transition-colors font-medium">
                        Back to Home
                    </button>
                </Link>
            </main>
        </div>
    );
}
