// components/UserDetailsCard.tsx
import React, { ReactNode } from 'react';

interface UserDetailsCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    color: string;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({
    title,
    value,
    icon,
    color
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
                </div>

                <div className={`${color} p-3 rounded-lg`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Updated recently</span>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsCard;