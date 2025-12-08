// components/UsersTable.tsx - Using the reusable Table component
import React, { useState } from 'react';
import Table, { TableColumn } from './Table';

interface User {
    name: string;
    email: string;
    avatar: string;
}

interface Project {
    id: string;
    user: User;
    projectName: string;
    projectRevenue: string;
    status: string;
    statusColor: string;
}

const UsersTable: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const projects: Project[] = [
        { id: '1', user: { name: 'Philip Gouse', email: 'philip@example.com', avatar: '/users/user1.png' }, projectName: 'Project Alpha', projectRevenue: '€ 200', status: 'In Negotiation', statusColor: 'bg-purple-100 text-purple-800 border-purple-200' },
        { id: '2', user: { name: 'Anna Smith', email: 'anna@example.com', avatar: '/users/user2.png' }, projectName: 'Project Beta', projectRevenue: '€ 350', status: 'In Negotiation', statusColor: 'bg-purple-100 text-purple-800 border-purple-200' },
        { id: '3', user: { name: 'John Doe', email: 'john@example.com', avatar: '/users/user3.png' }, projectName: 'Project Gamma', projectRevenue: '€ 500', status: 'Closed - Won', statusColor: 'bg-green-100 text-green-800 border-green-200' },
        { id: '4', user: { name: 'Mary Jane', email: 'mary@example.com', avatar: '/users/user4.png' }, projectName: 'Project Delta', projectRevenue: '€ 150', status: 'Closed - Lost', statusColor: 'bg-red-100 text-red-800 border-red-200' },
        // { id: '5', user: { name: 'David Brown', email: 'david@example.com', avatar: '/users/user1.png' }, projectName: 'Project Epsilon', projectRevenue: '€ 700', status: 'Closed - Won', statusColor: 'bg-green-100 text-green-800 border-green-200' },
    ];

    const filteredProjects = projects.filter(
        (project) =>
            project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns: TableColumn[] = [
        {
            key: 'user',
            label: 'User',
            render: (_, row: Project) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        <img
                            className="h-10 w-10 object-cover"
                            src={row.user.avatar}
                            alt={row.user.name}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.user.name)}&background=3b82f6&color=fff`;
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{row.user.name}</div>
                        <div className="text-sm text-gray-500">{row.user.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'projectName',
            label: 'Project Name',
        },
        {
            key: 'projectRevenue',
            label: 'Project Revenue',
        },
        {
            key: 'status',
            label: 'Status',
            render: (_, row: Project) => (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${row.statusColor}`}>
                    {row.status}
                </span>
            ),
        },
    ];

    const dropdownActions = [
        {
            label: 'View Details',
            onClick: (row: Project) => console.log('View', row),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            label: 'Edit',
            onClick: (row: Project) => console.log('Edit', row),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            label: 'Delete',
            onClick: (row: Project) => console.log('Delete', row),
            className: 'text-red-600 hover:bg-red-50',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
        },
    ];

    return (
        <Table
            data={filteredProjects}
            columns={columns}
            title="Users"
            searchPlaceholder="Search by name, email, or project..."
            addButtonText="+ Add New User"
            onAddClick={() => console.log('Add new user')}
            onSearch={setSearchQuery}
            emptyStateMessage="No users found matching your search."
            dropdownActions={dropdownActions}
        />
    );
};

export default UsersTable;