import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = { username: string } | null;

type AuthContextType = {
    user: User;
    login: (username: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [loading, setLoading] = useState(true);

    // Restore auth state from localStorage
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const username = localStorage.getItem("username");

        if (token && username) {
            setUser({ username });
        }
        setLoading(false);
    }, []);

    const login = (username: string) => {
        setUser({ username });
        localStorage.setItem("username", username);
        localStorage.setItem("access_token", "dummy-token"); // Replace with real token
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("username");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}
