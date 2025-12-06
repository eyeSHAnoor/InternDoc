import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = { username: string; email?: string } | null;

type AuthContextType = {
    user: User;
    login: (username: string, email: string, accessToken: string, refreshToken: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    // Restore auth state from localStorage and fetch current user
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            fetch("http://127.0.0.1:8000/api/current_user/", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch user");
                    return res.json();
                })
                .then(data => setUser({ username: data.username, email: data.email }))
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = (username: string, email: string, accessToken: string, refreshToken: string) => {
        setUser({ username, email });
        localStorage.setItem("username", username);
        if (email) localStorage.setItem("email", email);
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
