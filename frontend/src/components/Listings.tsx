// components/Listings.tsx
import React from 'react';

interface Listing {
    id: number;
}

const Listings: React.FC = () => {
    const listings: Listing[] = [
        { id: 2464 },
        { id: 6345 },
        { id: 8915 },
        { id: 8945 },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Listings</h3>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    View all
                </button>
            </div>
            <div className="space-y-3">
                {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <span className="font-medium text-gray-900">Listing #{listing.id}</span>
                        <button className="text-gray-400 hover:text-gray-600">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listings;