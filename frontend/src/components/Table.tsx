import React, { useState } from 'react';

export interface TableColumn {
    key: string;
    label: string;
    render?: (value: any, row: any) => React.ReactNode;
    className?: string;
    hideOnMobile?: boolean;
    priority?: number; // 1 = highest priority (always shown), 5 = lowest (hidden on mobile)
}

export interface TableProps {
    data: any[];
    columns: TableColumn[];
    title: string;
    searchPlaceholder?: string;
    addButtonText?: string;
    onAddClick?: () => void;
    onSearch?: (query: string) => void;
    emptyStateMessage?: string;
    dropdownActions?: {
        label: string;
        onClick: (row: any) => void;
        icon?: React.ReactNode;
        className?: string;
    }[];
    mobileCardView?: boolean; // Optional mobile card view
}

const Table: React.FC<TableProps> = ({
    data,
    columns,
    title,
    searchPlaceholder = "Search...",
    addButtonText = "+ Add New",
    onAddClick,
    onSearch,
    emptyStateMessage = "No data found.",
    dropdownActions = [],
    mobileCardView = true, // Default to card view on mobile
}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    const toggleDropdown = (id: string) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (openDropdownId && !(event.target as Element).closest('.dropdown-container')) {
                setOpenDropdownId(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [openDropdownId]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    // Determine which columns to show on mobile
    const getMobileColumns = () => {
        // If columns have priority, show higher priority ones on mobile
        const hasPriority = columns.some(col => col.priority);
        if (hasPriority) {
            return columns.filter(col => col.priority && col.priority <= 3);
        }
        // Otherwise show first 2-3 columns on mobile
        return columns.slice(0, 3);
    };

    const mobileColumns = getMobileColumns();

    return (
        <div className="max-w-7xl mx-auto px-3 sm:px-4">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:items-center">
                    {/* Search Bar - Mobile full width, Desktop partial width */}
                    <div className="relative w-full sm:hidden">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder={searchPlaceholder}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>

                    {onAddClick && (
                        <button
                            onClick={onAddClick}
                            className="bg-green hover:bg-green-600 text-gray-700 text-sm px-4 py-2 rounded-lg transition-colors duration-200 font-medium whitespace-nowrap"
                        >
                            {addButtonText}
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Card View */}
            {mobileCardView && (
                <div className="block md:hidden space-y-4">
                    {data.map((row, index) => (
                        <div key={row.id || index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            <div className="space-y-3">
                                {mobileColumns.map((column) => (
                                    <div key={`mobile-${row.id || index}-${column.key}`} className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-500 uppercase mb-1">
                                            {column.label}
                                        </span>
                                        <div className="text-sm">
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </div>
                                    </div>
                                ))}

                                {/* Hidden columns summary */}
                                {columns.length > mobileColumns.length && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-500">
                                            +{columns.length - mobileColumns.length} more fields
                                        </span>
                                    </div>
                                )}

                                {/* Actions for mobile */}
                                {dropdownActions.length > 0 && (
                                    <div className="pt-3 border-t border-gray-100">
                                        <div className="flex space-x-2">
                                            {dropdownActions.slice(0, 2).map((action, actionIndex) => (
                                                <button
                                                    key={`mobile-action-${actionIndex}`}
                                                    onClick={() => action.onClick(row)}
                                                    className={`px-3 py-1.5 text-xs rounded-md flex items-center gap-1 ${action.className?.includes('text-red') ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-700'}`}
                                                >
                                                    {action.icon && React.cloneElement(action.icon as React.ReactElement, { className: 'w-3 h-3' })}
                                                    {action.label}
                                                </button>
                                            ))}
                                            {dropdownActions.length > 2 && (
                                                <div className="relative dropdown-container">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleDropdown(`mobile-${row.id || index}`);
                                                        }}
                                                        className="px-3 py-1.5 text-xs bg-gray-50 text-gray-700 rounded-md flex items-center gap-1"
                                                    >
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                        More
                                                    </button>
                                                    {openDropdownId === `mobile-${row.id || index}` && (
                                                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                                            {dropdownActions.slice(2).map((action, actionIndex) => (
                                                                <button
                                                                    key={`mobile-dropdown-${actionIndex}`}
                                                                    onClick={() => action.onClick(row)}
                                                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 flex items-center gap-2 ${action.className || 'text-gray-700'}`}
                                                                >
                                                                    {action.icon && React.cloneElement(action.icon as React.ReactElement, { className: 'w-3 h-3' })}
                                                                    {action.label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {data.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2">{emptyStateMessage}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Desktop Table View */}
            <div className="p-2 px-8 hidden md:block bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="my-4 relative w-1/3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key}
                                        className={`px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''} ${column.hideOnMobile ? 'hidden lg:table-cell' : ''}`}
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                {dropdownActions.length > 0 && (
                                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {data.map((row, index) => (
                                <tr
                                    key={row.id || index}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {columns.map((column, colIndex) => (
                                        <td
                                            key={`${row.id || index}-${column.key}`}
                                            className={`
                                               px-4 lg:px-6 py-4 text-sm
                                               ${column.hideOnMobile ? 'hidden lg:table-cell' : ''}
                                               border-r border-gray-200
                                             `}
                                        >
                                            {column.render ? column.render(row[column.key], row) : row[column.key]}
                                        </td>
                                    ))}

                                    {/* Actions / Three-dot menu aligned to right */}
                                    {dropdownActions.length > 0 && (
                                        <td className="px-4 lg:px-0 py-4 text-sm font-medium text-right relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleDropdown(row.id || index.toString());
                                                }}
                                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 5v.01M12 12v.01M12 19v.01"
                                                    />
                                                </svg>
                                            </button>

                                            {openDropdownId === (row.id || index.toString()) && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                                                    {dropdownActions.map((action, actionIndex) => (
                                                        <button
                                                            key={actionIndex}
                                                            onClick={() => action.onClick(row)}
                                                            className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 flex items-center gap-2 ${action.className || 'text-gray-700'}`}
                                                        >
                                                            {action.icon}
                                                            {action.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>



                    </table>
                    {data.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            <svg className="w-12 h-12 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2">{emptyStateMessage}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Table;