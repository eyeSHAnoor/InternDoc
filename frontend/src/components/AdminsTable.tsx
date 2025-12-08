// components/AdminsTable.tsx - Using the reusable Table component
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
    status: 'Active' | 'Disabled';
    statusColor: string;
    type: 'Remote' | 'In Person';
}

interface Admin {
    name: string;
    email: string;
    avatar: string;
    totalEarnings: number;
    projects: Project[];
}

const AdminsTable: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const projects: Project[] = [
        { id: '1', user: { name: 'Philip Gouse', email: 'philip@example.com', avatar: '/user.jpg' }, projectName: 'Project Alpha', projectRevenue: '200', status: 'Active', statusColor: 'bg-green-100 text-green-800 border-green-200', type: 'Remote' },
        { id: '2', user: { name: 'Philip Godzilla', email: 'godzilla@example.com', avatar: '/user.jpg' }, projectName: 'Project Beta', projectRevenue: '350', status: 'Disabled', statusColor: 'bg-red-100 text-red-800 border-red-200', type: 'In Person' },
        { id: '3', user: { name: 'Anna Smith', email: 'anna@example.com', avatar: '/user.jpg' }, projectName: 'Project Gamma', projectRevenue: '500', status: 'Active', statusColor: 'bg-green-100 text-green-800 border-green-200', type: 'Remote' },
        { id: '4', user: { name: 'John Doe', email: 'john@example.com', avatar: '/user.jpg' }, projectName: 'Project Delta', projectRevenue: '150', status: 'Disabled', statusColor: 'bg-red-100 text-red-800 border-red-200', type: 'In Person' },
        { id: '5', user: { name: 'Dol Marcus', email: 'marcus@example.com', avatar: '/user.jpg' }, projectName: 'Project Epsilon', projectRevenue: '700', status: 'Disabled', statusColor: 'bg-red-100 text-red-800 border-red-200', type: 'Remote' },
    ];

    // Aggregate projects by user
    const admins: Admin[] = Object.values(
        projects.reduce((acc: Record<string, Admin>, project) => {
            const key = project.user.email;
            if (!acc[key]) {
                acc[key] = {
                    ...project.user,
                    totalEarnings: 0,
                    projects: []
                };
            }
            acc[key].totalEarnings += Number(project.projectRevenue);
            acc[key].projects.push(project);
            return acc;
        }, {})
    );

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Flatten the data for the table
    const tableData = filteredAdmins.flatMap(admin =>
        admin.projects.map(project => ({
            id: `${admin.email}-${project.id}`,
            admin: admin,
            project: project,
        }))
    );

    const columns: TableColumn[] = [
        {
            key: 'admin',
            label: 'Admin',
            render: (_, row) => (
                <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                        <img
                            className="h-10 w-10 object-cover"
                            src={row.admin.avatar}
                            alt={row.admin.name}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(row.admin.name)}&background=3b82f6&color=fff`;
                            }}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{row.admin.name}</div>
                        <div className="text-sm text-gray-500">{row.admin.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'project',
            label: 'Project Name',
            render: (project: Project) => project.projectName,
        },
        {
            key: 'project',
            label: 'Project Revenue',
            render: (project: Project) => `€ ${project.projectRevenue}`,
        },
        {
            key: 'project',
            label: 'Status',
            render: (project: Project) => (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.statusColor}`}>
                    {project.status}
                </span>
            ),
        },
        {
            key: 'project',
            label: 'Type',
            render: (project: Project) => (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${project.type === 'Remote'
                        ? 'bg-purple-100 text-purple-800 border border-purple-200'
                        : 'bg-green-100 text-green-800 border-green-200'
                    }`}>
                    {project.type}
                </span>
            ),
        },
    ];

    const dropdownActions = [
        {
            label: 'View Details',
            onClick: (row: any) => console.log('View', row.admin),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            label: 'Edit Admin',
            onClick: (row: any) => console.log('Edit', row.admin),
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
        },
        {
            label: 'Delete Admin',
            onClick: (row: any) => console.log('Delete', row.admin),
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
            data={tableData}
            columns={columns}
            title="Admins"
            searchPlaceholder="Search by admin name or email..."
            addButtonText="+ Add New Admin"
            onAddClick={() => console.log('Add new admin')}
            onSearch={setSearchQuery}
            emptyStateMessage="No admins found matching your search."
            dropdownActions={dropdownActions}
        />
    );
};

export default AdminsTable;