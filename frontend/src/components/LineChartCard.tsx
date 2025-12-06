import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartCardProps {
    title: string;
    timeframe: string;
    data: number[];
    labels: string[];
    currency?: string;
}

const LineChartCard: React.FC<ChartCardProps> = ({ title, timeframe, data, labels, currency = '' }) => {
    const generateSecondDataset = (baseData: number[]) => baseData.map((v, i) => Math.max(0, v * 0.65 + Math.sin(i * 0.8) * (v * 0.3) + Math.random() * 20 - 10));
    const thirdData = data.map((v, i) => Math.max(0, v * 0.5 + (i * i * 2 - i * 10) + (i > labels.length / 2 ? v * 0.1 : 0) + Math.random() * 15));


    const chartData = {
        labels,
        datasets: [
            { label: 'Revenue', data, borderColor: 'rgba(34,197,94,1)', backgroundColor: 'rgba(34,197,94,0.1)', borderWidth: 3, tension: 0.3, fill: false, pointRadius: 0, pointHoverRadius: 6, pointBackgroundColor: 'rgba(34,197,94,1)', pointBorderColor: '#fff', pointBorderWidth: 2, cubicInterpolationMode: 'monotone' as const },
            { label: 'Profit', data: thirdData, borderColor: 'rgba(59,130,246,1)', backgroundColor: 'rgba(59,130,246,0.1)', borderWidth: 2, tension: 0.5, fill: { target: 'origin', above: 'rgba(59,130,246,0.05)' }, pointRadius: 4, pointHoverRadius: 7, pointBackgroundColor: 'rgba(59,130,246,1)', pointBorderColor: '#fff', pointBorderWidth: 2, pointStyle: 'triangle' as const, cubicInterpolationMode: 'monotone' as const }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' as const, intersect: false, callbacks: { label: (ctx: any) => `${ctx.dataset.label}: ${currency}${ctx.parsed.y.toLocaleString()}` } }
        },
        interaction: { intersect: false, mode: 'nearest' as const },
        scales: {
            x: { grid: { display: true, color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b7280', font: { size: 11 } } },
            y: { beginAtZero: true, grid: { display: true, color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6b7280', font: { size: 11 }, callback: (v: any) => currency + v.toLocaleString(), stepSize: 10 } }
        },
        elements: { line: { tension: 0.3 } }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2 sm:gap-0">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <p className="text-xs font-medium mt-1 text-gray-500">+25% compared to last 30 days</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">{timeframe}</span>
            </div>
            <div className="w-full h-64 sm:h-80 relative overflow-x-auto">
                <Line data={chartData} options={options} />
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4">
                <div className="flex items-center gap-2"><span className="w-5 h-2 rounded-full bg-green-500"></span><span className="text-sm">Revenue</span></div>
                <div className="flex items-center gap-2"><span className="w-5 h-2 rounded-full bg-blue-500"></span><span className="text-sm">Profit</span></div>
            </div>
        </div>
    );


};

export default LineChartCard;
