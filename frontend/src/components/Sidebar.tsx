import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import GridIcon from '../assets/icons/GridIcon';
import Product from '../assets/icons/Product';
import User from '../assets/icons/User';
import Admin from '../assets/icons/Admin';

interface SidebarProps {
    sidebarOpen: boolean;
}

interface NavItem {
    icon: React.ReactElement<{ active?: boolean }>;
    label: string;
    path: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
    const location = useLocation();

    const navItems: NavItem[] = [
        { icon: <GridIcon />, label: 'Dashboard', path: '/dashboard' },
        { icon: <Product />, label: 'Products', path: '/products' },
        { icon: <User />, label: 'Users', path: '/users' },
        { icon: <Admin />, label: 'Admins', path: '/admins' },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 ${sidebarOpen ? 'w-[250px]' : 'w-0 overflow-hidden'
                }`}
        >
            <div className="p-6">
                <h1 className="text-2xl font-bold">Intern Docs</h1>
            </div>

            <nav className="px-4">
                <h2 className="text-xs font-semibold uppercase mb-3 px-3">Menu</h2>
                <ul className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <li key={item.label}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-green-50 text-green-600' : 'hover:bg-green-100'
                                        }`}
                                >
                                    <span className="mr-3 text-lg">
                                        {React.cloneElement(item.icon, { active: isActive })}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
