import React, { useState, ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex">
            {/* SIDEBAR */}
            <Sidebar sidebarOpen={sidebarOpen} />

            {/* RIGHT CONTENT AREA */}
            <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}>
                <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
};

export default Layout;
