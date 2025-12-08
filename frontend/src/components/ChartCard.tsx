import React from 'react';
import StatCard from './StatCard';

interface ChartCardProps {
    title: string;
    timeframe: string;
    data: number[];
    maxValue: number;
    labels: string[];
    currency?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
    title,
    timeframe,
    data,
    maxValue,
    labels,
    currency = '$'
}) => {
    const maxHeight = 160;


    const calculateStats = () => {
        const averageValue = data.reduce((a, b) => a + b, 0) / data.length;
        const latestValue = data[data.length - 1] || 0;
        const previousValue = data[data.length - 2] || data[0] || 1;
        const growthPercentage = ((latestValue - previousValue) / previousValue) * 100;

        return {
            earnings: { value: 200.00, growth: 85, currency: '$' },
            usersClients: { value: 3, growth: 0, unit: '%' },
            closedOffers: { value: 2, growth: 25, currency: '$' }
        };
    };

    const stats = calculateStats();

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-xs font-medium mt-1 text-gray-500">+25% compared to last 30 days</p>
                </div>
                <div className="text-right text-sm text-gray-500 font-medium">{timeframe}</div>
            </div>

            {/* Chart Container */}
            <div className="relative mb-6 overflow-x-auto">
                {/* Y-axis labels and grid lines */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2">
                    {[400, 300, 200, 100, 0].map((value) => (
                        <div key={value} className="flex items-center">
                            <div className="text-xs text-gray-400 w-8 text-right mr-2">{value}</div>
                            <div className="w-full h-px bg-gray-100"></div>
                        </div>
                    ))}
                </div>

                {/* Chart bars */}
                <div className="ml-12 flex items-end md:space-x-9 sm:space-x-5 h-full min-w-max">
                    {data.map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-shrink-0 group relative">
                            <div
                                className="w-4 bg-purple-300 hover:bg-purple-700 rounded-t-lg transition-all duration-300 group-hover:opacity-80"
                                style={{ height: `${(value / maxValue) * maxHeight}px` }}
                            >
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 hidden group-hover:block">
                                    <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                        {labels[index]}: {value}
                                    </div>
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                                </div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 font-medium text-center">
                                {labels[index].split(' ')[0]}
                            </div>
                            <div className="text-xs text-gray-400 text-center">
                                {labels[index].split(' ')[1]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatCard
                    title={stats.earnings.currency + stats.earnings.value.toFixed(2)}
                    subtitle="Yearly Earnings"
                    change={`+${stats.earnings.growth}%`}
                    iconType="money"
                />
                <StatCard
                    title={stats.closedOffers.currency + stats.closedOffers.value}
                    subtitle="Closed Offers"
                    change={`+${stats.closedOffers.growth}%`}
                    iconType="closed"
                />
            </div>
        </div>
    );


};

export default ChartCard;
