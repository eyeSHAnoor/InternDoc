import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

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
                login(username);
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
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
            {/* Loading bar */}
            {loading && (
                <div
                    className="fixed top-0 left-0 h-1 bg-green-500 z-50 transition-all"
                    style={{ width: `${progress}%` }}
                />
            )}

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

                {message && (
                    <p className="text-red-500 text-center mb-4">{message}</p>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <button
                        type="button"
                        className="bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
