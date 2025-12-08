// components/UserHeader.tsx
import React from 'react';

interface UserHeaderProps {
    userName: string;
    userEmail: string;
    userRole: string;
    avatarInitials: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
    userName,
    userEmail,
    userRole,
    avatarInitials
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{avatarInitials}</span>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
                        <div className="flex items-center space-x-3 mt-2">
                            <span className="text-gray-600">{userEmail}</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                {userRole}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Profile</span>
                    </button>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>New Project</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;