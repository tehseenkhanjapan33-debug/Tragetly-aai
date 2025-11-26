
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';

interface SignupPageProps {
    navigate: (path: string) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState(false);
    const { signup } = useAuth();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send a verification email.
        // Here we just simulate it.
        if (email) {
            setVerified(true);
        }
    };
    
    const handleLogin = () => {
        signup(email);
        navigate('#/dashboard');
    }

    if (verified) {
        return (
            <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Check your inbox!</h2>
                    <p className="text-gray-600 mb-6">We've sent a verification link to <span className="font-semibold">{email}</span>. Please click it to continue. (This is a simulation).</p>
                    <Button onClick={handleLogin} className="w-full">
                        Continue to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create your free account</h2>
                <form onSubmit={handleSignup} className="space-y-6">
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
                        Sign Up with Email
                    </Button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <a href="#/login" onClick={(e) => { e.preventDefault(); navigate('#/login'); }} className="font-medium text-blue-600 hover:text-blue-500">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
