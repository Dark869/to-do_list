import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user ? <Navigate to="/" /> : children;
};

export default RedirectIfAuthenticated;
