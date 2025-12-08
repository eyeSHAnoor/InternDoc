import React from 'react';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import UserList from '../components/UserList';
import LineChartCard from '../components/LineChartCard';
import TopAdminCard from '../components/TopAdminCard';

interface User {
    name: string;
    company?: string;
    role?: string;
    color?: string;
    iconColor?: string
    listing?: string
}

const Dashboard: React.FC = () => {
    // Dummy data
    const userData: number[] = [200, 350, 398, 150, 180, 230, 300];
    const userLabels: string[] = ['12 Aug', '13 Aug', '14 Aug', '15 Aug', '16 Aug', '17 Aug', '18 Aug'];
    const revenueData: number[] = [20, 25, 30, 28, 35, 40];
    const revenueLabels: string[] = ['12 Jan', '13 Jan', '14 Jan', '15 Jan', '16 Jan', '17 Jan'];
    const topUsers: User[] = [
        { name: 'Rose Meadows', company: 'Company name', listing: "Listing #2404", color: 'bg-green-50', iconColor: '#85BA49' },
        { name: 'Madden Esparza', company: 'Company name', listing: "Listing #2404", color: 'bg-blue-50', iconColor: '#3B82F6' },
        { name: 'Edison Norman', company: 'Company name', listing: "Listing #2404", color: 'bg-yellow-50', iconColor: '#FACC15' },
        { name: 'Terrance Conner', company: 'Company name', listing: "Listing #2404", color: 'bg-red-50', iconColor: '#EF4444' },
    ];


    const topAdmins: User[] = [
        { name: 'Carl Meadows', role: 'Admin' },
    ];

    return (
        <div className="p-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
                <button className="bg-green hover:bg-green-600 text-gray-700 text-sm px-4 py-2 rounded-lg transition-colors duration-200 font-medium self-start sm:self-center">
                    + Add Revenue
                </button>
            </div>

            {/* Top Row: Ready card + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
                {/* Ready to get started card */}
                <div className="bg-white shadow rounded p-4 sm:p-6 flex flex-col justify-between lg:col-span-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <img src="/dashboard/ready-illustration.png" alt="Ready" className="w-[216px] h-[189px] self-center sm:self-start" />
                        <div className="text-center sm:text-left">
                            <h2 className="font-semibold text-lg">Ready to get started?</h2>
                            <p className="text-gray-500 text-sm mt-1">Take advantage of our platform and start onboarding affiliates today!</p>
                        </div>
                    </div>
                </div>

                {/* Small Stat Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4 lg:col-span-2">
                    <StatCard
                        title="€500.000"
                        subtitle="Yearly Earnings"
                        change="+20%"
                        iconType="money"

                    />
                    <StatCard
                        title="€800.000"
                        subtitle="Revenue"
                        change="+33%"
                        iconType="revenue"
                    />
                    <StatCard
                        title="52"
                        subtitle="Closed Offers"
                        change="+20%"
                        iconType="closed"
                    />
                    <StatCard
                        title="125"
                        subtitle="Total Affiliates"
                        change="+20%"
                        iconType="affiliates"

                    />
                </div>
            </div>

            {/* Charts */}
            <div className="flex flex-col">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <ChartCard
                        title="User Overview"
                        timeframe="This Week"
                        data={userData}
                        maxValue={400}
                        labels={userLabels}

                    />
                    <LineChartCard
                        title="Revenue Overview"
                        timeframe="This Year"
                        data={revenueData}
                        labels={revenueLabels}
                        currency="€"

                    />
                </div>

                {/* Right Column: Lists */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6">
                    <UserList title="Top 5 Users" users={topUsers} type="users" />
                    <UserList title="Top 5 Fake Sellers" users={topUsers} type="users" />
                    {/* <UserList title="Top Admin" users={topAdmins} type="admins" /> */}
                    <TopAdminCard
                        name="Carl Meadows"
                        noticesReviewed={23353}
                        avatarUrl="/dashboard/topAdmin.png" // optional
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;