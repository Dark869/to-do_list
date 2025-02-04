import { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '../utils/Api/auth.api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await verifyToken();
                setUser(data);
            } catch {
                setUser(null);
            }
        };
        checkAuth();
    }, []);

    const logout = async () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};