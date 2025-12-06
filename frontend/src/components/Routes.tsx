import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = { children: ReactNode };

export function PublicRoute({ children }: Props) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // Redirect logged-in users to dashboard
    if (isAuthenticated) return <Navigate to="/dashboard" replace />;

    return <>{children}</>;
}

export const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div>Loading...</div>;

    // Redirect unauthenticated users to login
    if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;

    return <>{children}</>;
};
