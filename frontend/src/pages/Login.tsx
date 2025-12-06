import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Login() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";
    const { darkMode, toggleTheme } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setProgress(10);

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 20, 90));
        }, 100);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/token/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
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
                setMessage(data.detail || "Login failed");
            }

        } catch (err) {
            clearInterval(progressInterval);
            setLoading(false);
            setProgress(0);
            setMessage("Network error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative">
            {/* Loading bar */}
            {loading && (
                <div
                    className="fixed top-0 left-0 h-1 bg-gradient-l-to-r from-blue-500 to-purple-600 z-50 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            )}

            <div className="w-full max-w-md">

                <div className="bg-white w-[608px] h-[394px] rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">Welcome</h2>
                    <p className="text-gray-500 text-center mb-12">Great to see you! please enter your account details</p>

                    {message && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 text-center">
                            {message}
                        </div>
                    )}

                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full h-[45px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            />
                        </div>

                        <div>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full h-[45px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-[40px] text-gray-600  bg-green-100  py-1 rounded-md transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>

                        <div className="relative my-1 text-center">
                            <p className="text-md">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/signup")}
                                    className=" font-medium transition-colors hover:underline"
                                >
                                    Sign Up
                                </button>
                            </p>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
}