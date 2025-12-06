import React from 'react';
import { FiHome, FiPackage, FiUsers, FiUserCheck } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
    sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
    const location = useLocation();

    const navItems = [
        { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
        { icon: <FiPackage />, label: 'Products', path: '/products' },
        { icon: <FiUsers />, label: 'Users', path: '/users' },
        { icon: <FiUserCheck />, label: 'Admins', path: '/admins' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 
                        ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold">Intern Docs</h1>
            </div>

            <nav className="px-4">
                <h2 className="text-xs font-semibold uppercase mb-3 px-3">Menu</h2>
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.path}
                                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${location.pathname === item.path
                                        ? "bg-green-50 text-green-600"
                                        : "hover:bg-green-100"
                                    }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
