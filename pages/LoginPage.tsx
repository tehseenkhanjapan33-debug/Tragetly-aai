
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

interface LoginPageProps {
    navigate: (path: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        if (email) {
            login(email);
            navigate('#/dashboard');
        }
    };

    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login to Tragetly AI</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#/signup" onClick={(e) => { e.preventDefault(); navigate('#/signup'); }} className="font-medium text-blue-600 hover:text-blue-500">
                        Sign up for free
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
