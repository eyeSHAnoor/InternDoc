import React, { useState, useRef, useEffect } from 'react';
import { FiMenu, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { darkMode, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-[72px] sticky top-0 z-20  border-b border-gray-200 bg-white  w-full transition-colors">
            <div className="px-6 py-1 flex items-center justify-between">

                {/* Hamburger Button */}
                <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100 transition">
                    <FiMenu size={22} className="" />
                </button>

                {/* Right Section */}
                <div className="flex items-center space-x-4">

                    {/* Avatar Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="flex items-center text-left space-x-2 focus:outline-none"
                        >
                            <div className="px-4 py-2 border-b border-gray-200">
                                <p className=" font-semibold">{user?.username}</p>
                                {user?.email && <p className="text-sm">{user.email}</p>}
                            </div>
                            <FiChevronDown className={` transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                                {/* Light/Dark Mode Toggle */}
                                <button
                                    onClick={toggleTheme}
                                    className="w-full flex items-center px-4 py-2 hover:bg-gray-500  transition "
                                >
                                    {darkMode ? "Light Mode " : "Dark Mode "}
                                    {darkMode ? <FiSun className="ml-2" /> : <FiMoon className="ml-2" />}
                                </button>

                                <button
                                    onClick={logout}
                                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
