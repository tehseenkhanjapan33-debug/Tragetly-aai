
import React from 'react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

interface HeaderProps {
    navigate: (path: string) => void;
}

const Header: React.FC<HeaderProps> = ({ navigate }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('#/');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(user ? '#/dashboard' : '#/')}>
                        <h1 className="text-2xl font-bold text-blue-600">Tragetly AI</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <>
                                <span className="hidden sm:block text-sm text-gray-600">Welcome, {user.email}</span>
                                <Button onClick={handleLogout} variant="secondary">Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate('#/login')} variant="secondary">Login</Button>
                                <Button onClick={() => navigate('#/signup')} variant="primary">Sign Up</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
