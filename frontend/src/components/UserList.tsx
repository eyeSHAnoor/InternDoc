// components/UserList.tsx
import React from 'react';
import { TopsUser } from '../assets/icons/TopUser';
interface User {
    name: string;
    company?: string;
    role?: string;
    color?: string;
    iconColor?: string;
    listing?: string
}

interface UserListProps {
    title: string;
    users: User[];
    type?: 'users' | 'admins';
}

const UserList: React.FC<UserListProps> = ({ title, users, type = 'users' }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold ">{title}</h3>
                <p className="text-xs font-semibold ">View All</p>
            </div>
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3> */}
            <div className="space-y-4">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                        {/* Left side: icon + name + company */}
                        <div className="flex items-center">
                            <div
                                className={`h-10 w-10 rounded-xl mr-3 flex items-center justify-center ${user.color || "bg-gray-200"}`}
                            >
                                <TopsUser className="w-5 h-5 text-white" color={user.iconColor} />
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-900">{user.name}</h4>
                                {user.company && <p className="text-sm text-gray-500">{user.company}</p>}
                            </div>
                        </div>

                        {/* Right side: listing */}
                        {user.listing && (
                            <p className="text-xs text-gray-500">{user.listing}</p>
                        )}

                        {/* Admin role */}
                        {type === 'admins' && user.role && (
                            <span className="ml-4 text-sm font-medium text-blue-600">{user.role}</span>
                        )}
                    </div>

                ))}
            </div>
            {type === 'admins' && (
                <button className="w-full mt-6 py-2.5 text-blue-600 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                    View Details
                </button>
            )}
        </div>
    );
};

export default UserList;