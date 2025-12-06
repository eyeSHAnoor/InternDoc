// components/UserList.tsx
import React from 'react';

interface User {
    name: string;
    company?: string;
    role?: string;
}

interface UserListProps {
    title: string;
    users: User[];
    type?: 'users' | 'admins';
}

const UserList: React.FC<UserListProps> = ({ title, users, type = 'users' }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <div className="space-y-4">
                {users.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded-full mr-3"></div>
                            <div>
                                <h4 className="font-medium text-gray-900">{user.name}</h4>
                                {user.company && <p className="text-sm text-gray-500">{user.company}</p>}
                            </div>
                        </div>
                        {type === 'admins' && user.role && (
                            <span className="text-sm font-medium text-blue-600">{user.role}</span>
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