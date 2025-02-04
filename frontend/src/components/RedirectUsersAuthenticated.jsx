import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/" /> : children;
};

export default RedirectIfAuthenticated;