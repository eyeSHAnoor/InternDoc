// ProductsPage.tsx
import React, { useState } from "react";

interface Product {
    id: number;
    title: string;
    link: string;
    image: string;
    status: "Removed" | "Reminder Sent";
}

const products: Product[] = [
    { id: 1, title: "Product A", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod1.png", status: "Removed" },
    { id: 2, title: "Product B", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod2.png", status: "Removed" },
    { id: 3, title: "Product C", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod3.png", status: "Reminder Sent" },
    { id: 4, title: "Product D", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod4.png", status: "Removed" },
    { id: 5, title: "Product E", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod5.png", status: "Removed" },
    { id: 6, title: "Product F", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod6.png", status: "Removed" },
    { id: 6, title: "Product F", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod7.png", status: "Removed" },
    { id: 6, title: "Product F", link: "https://yourproducturlgoeshere1122.com", image: "/products/prod8.png", status: "Removed" },
];

const StatusBadge: React.FC<{ status: Product["status"] }> = ({ status }) => {
    const color = status === "Removed" ? "bg-red-100 text-red-500" : "bg-yellow-100 text-yellow-500";
    return <span className={`px-2 py-1 rounded text-xs font-semibold ${color}`}>{status}</span>;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <div className="border rounded-xl shadow-xs p-4 flex flex-col justify-between shadow-sm h-full">
        <img
            src={product.image}
            alt={product.title}
            className="w-full h-32 sm:h-36 md:h-64 object-cover rounded-xl"
        />
        <div className="mt-3">
            <h3 className="font-semibold text-sm sm:text-base">{product.title}</h3>
            <a
                href={product.link}
                className="text-xs sm:text-sm text-gray-400 truncate block hover:text-gray-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
                {product.link}
            </a>
            <div className="mt-2">
                {/* <StatusBadge status={product.status} /> */}
            </div>
            <div className="flex flex-wrap justify-between gap-5 mt-3">
                <button className="bg-black text-white px-2 py-1.5 text-xs sm:text-sm rounded hover:bg-gray-800 transition-colors flex-1 min-w-[80px]">
                    Source
                </button>
                <button className="bg-green-100 text-green-600 px-2 py-1.5 text-xs sm:text-sm rounded hover:bg-green-200 transition-colors flex-1 min-w-[80px]">
                    View Details
                </button>
            </div>
        </div>
    </div>
);

const ProductListItem: React.FC<{ product: Product }> = ({ product }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-3 px-2 sm:px-0 gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <img
                src={product.image}
                alt={product.title}
                className="w-16 h-16 object-cover rounded self-start sm:self-center"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base truncate">{product.title}</h3>
                <a
                    href={product.link}
                    className="text-xs sm:text-sm text-gray-400 truncate block hover:text-gray-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {product.link}
                </a>
            </div>
            <div className="self-start sm:self-center">
                <StatusBadge status={product.status} />
            </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3 self-start sm:self-center">
            <button className="bg-black text-white px-3 py-2 text-xs sm:text-sm rounded hover:bg-gray-800 transition-colors flex-1 sm:flex-none min-w-[80px]">
                Source
            </button>
            <button className="bg-green-100 text-green-600 px-3 py-2 text-xs sm:text-sm rounded hover:bg-green-200 transition-colors flex-1 sm:flex-none min-w-[80px]">
                View Details
            </button>
        </div>
    </div>
);

const Products: React.FC = () => {
    const [view, setView] = useState<"grid" | "list">("list");

    return (
        <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Products</h2>
                <div className="flex gap-2 self-start sm:self-center">
                    <button
                        className={`px-3 py-1.5 text-xs sm:text-sm rounded transition-colors ${view === "grid" ? "bg-green text-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => setView("grid")}
                    >
                        Grid View
                    </button>
                    <button
                        className={`px-3 py-1.5 text-xs sm:text-sm rounded transition-colors ${view === "list" ? "bg-green text-gray-700" : "bg-gray-100 hover:bg-gray-200"}`}
                        onClick={() => setView("list")}
                    >
                        List View
                    </button>
                </div>
            </div>
            {view === "grid" ? (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col divide-y divide-gray-200">
                    {products.map((product) => (
                        <ProductListItem key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Products;