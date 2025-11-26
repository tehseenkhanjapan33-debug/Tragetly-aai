
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import Header from './components/Header';
import { CampaignProvider } from './context/CampaignContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CampaignProvider>
                <Main />
            </CampaignProvider>
        </AuthProvider>
    );
};

const Main: React.FC = () => {
    const { user, loading } = useAuth();
    const [route, setRoute] = useState(window.location.hash || '#/');

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash || '#/');
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const navigate = (path: string) => {
        window.location.hash = path;
    };
    
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    let content;
    if (user) {
        switch (route) {
            case '#/dashboard':
                content = <DashboardPage navigate={navigate} />;
                break;
            case '#/create-campaign':
                content = <CreateCampaignPage navigate={navigate} />;
                break;
            default:
                content = <DashboardPage navigate={navigate} />;
        }
    } else {
        switch (route) {
            case '#/login':
                content = <LoginPage navigate={navigate} />;
                break;
            case '#/signup':
                content = <SignupPage navigate={navigate} />;
                break;
            default:
                content = <LandingPage navigate={navigate} />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header navigate={navigate} />
            <main className="p-4 sm:p-6 lg:p-8">
                {content}
            </main>
        </div>
    );
};

export default App;
