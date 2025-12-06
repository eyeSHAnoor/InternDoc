import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
    const { logout } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold px-4 py-2 rounded mb-6">Welcome to the Dashboard</h2>
            <button onClick={logout} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">Logout</button>
        </div>
    );
}
