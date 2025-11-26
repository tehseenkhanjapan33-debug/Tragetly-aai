
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string) => void;
    signup: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('tragetly-user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (email: string) => {
        const newUser: User = { id: Date.now().toString(), email };
        localStorage.setItem('tragetly-user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const signup = (email: string) => {
        // In a real app, this would involve API calls, email verification, etc.
        const newUser: User = { id: Date.now().toString(), email };
        localStorage.setItem('tragetly-user', JSON.stringify(newUser));
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('tragetly-user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
