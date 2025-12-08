import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Signup() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errors, setErrors] = useState<{
        email?: string;
        phoneNumber?: string;
    }>({});
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    // Email validation regex
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Phone number validation regex (supports various formats)
    const validatePhoneNumber = (phone: string): boolean => {
        // Supports formats like:
        // +1234567890
        // (123) 456-7890
        // 123-456-7890
        // 123.456.7890
        // 1234567890
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneRegex.test(phone);
    };

    // Format phone number to consistent format (optional)
    const formatPhoneNumber = (phone: string): string => {
        // Remove all non-numeric characters
        const cleaned = phone.replace(/\D/g, '');

        // Format as +1 (XXX) XXX-XXXX for US numbers
        if (cleaned.length === 10) {
            return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
        } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        }

        // Return original if doesn't match common formats
        return phone;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate email
        if (!validateEmail(email)) {
            setErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(phoneNumber)) {
            setErrors(prev => ({ ...prev, phoneNumber: "Please enter a valid phone number" }));
            return;
        }

        setLoading(true);
        setProgress(10);

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 20, 90));
        }, 100);

        try {
            const formattedPhone = formatPhoneNumber(phoneNumber);

            const res = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    password,
                    email,
                    phone_number: formattedPhone, // Updated field name
                    date_of_birth: dateOfBirth   // Updated field name
                }),
            });

            const data = await res.json();
            clearInterval(progressInterval);
            setProgress(100);

            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 300);

            if (res.ok) {
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);

                // fetch current user info after login
                const userRes = await fetch("http://127.0.0.1:8000/api/current_user/", {
                    headers: { Authorization: `Bearer ${data.access}` }
                });
                const userData = await userRes.json();

                login(userData.username, userData.email, data.access, data.refresh);
                navigate(from, { replace: true });
            } else {
                // Handle backend validation errors
                if (data.email) {
                    setErrors(prev => ({ ...prev, email: data.email[0] }));
                }
                if (data.phone_number) {
                    setErrors(prev => ({ ...prev, phoneNumber: data.phone_number[0] }));
                }
                setMessage(data.detail || "Registration failed");
            }
        } catch (err) {
            clearInterval(progressInterval);
            setLoading(false);
            setProgress(0);
            setMessage("Network error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {loading && (
                <div
                    className="fixed top-0 left-0 h-1 bg-gradient-l-to-r from-blue-500 to-purple-600 z-50 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            )}

            <div className="w-full max-w-md">
                <div className="bg-white w-[608px] h-[601px] rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Sign Up!</h2>
                    <p className="text-gray-500 text-center mb-8">
                        Register to our service to be able to invite client
                    </p>

                    {message && !errors.email && !errors.phoneNumber && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
                            {message}
                        </div>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-[544px] h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`w-full h-[45px] px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number (e.g., 123-456-7890)"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className={`w-full h-[45px] px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-400 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                                    }`}
                            />
                            {errors.phoneNumber && (
                                <p className="text-red-500 text-sm mt-1 ml-1">{errors.phoneNumber}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                required
                                className="w-full h-[45px] px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-[45px] text-gray-600 bg-green py-1 rounded-md transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2 hover:bg-green-200"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing up...
                                </span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        <p className="text-md text-center mt-4">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                className="font-medium transition-colors hover:underline"
                            >
                                Login
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}