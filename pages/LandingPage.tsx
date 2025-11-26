import React from 'react';
import Button from '../components/Button';

interface LandingPageProps {
    navigate: (path: string) => void;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const StepCard: React.FC<{ number: number; title: string; description: string; icon: React.ReactNode }> = ({ number, title, description, icon }) => (
    <div className="relative p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-gray-50">
            {number}
        </div>
        <div className="mt-8">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-blue-100 rounded-full">
                {icon}
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-base text-gray-500">{description}</p>
        </div>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
    return (
        <div className="container mx-auto max-w-7xl">
            <div className="text-center py-16 sm:py-24">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block">Launch Your Campaigns for</span>
                    <span className="block text-blue-600">Free with AI</span>
                </h2>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    Tragetly AI helps you create, launch, and track high-performance campaigns effortlessly. Enjoy unlimited reach to your target audience with no payments or hidden fees.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                    <Button onClick={() => navigate('#/signup')} className="text-lg px-8 py-3">
                        Create Campaign Now
                    </Button>
                </div>
            </div>

            <div className="relative py-12">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 border-dashed"></div>
                </div>
                <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
                    <StepCard
                        number={1}
                        title="Create"
                        description="Easily set up your campaign with specific objectives and AI-powered targeting suggestions."
                        icon={<PencilIcon />}
                    />
                    <StepCard
                        number={2}
                        title="Launch"
                        description="Your campaign goes live instantly. Our system automatically finds the right audience for you."
                        icon={<RocketLaunchIcon />}
                    />
                    <StepCard
                        number={3}
                        title="Track"
                        description="Monitor real-time performance on your dashboard and see your results grow."
                        icon={<ChartBarIcon />}
                    />
                </div>
            </div>
        </div>
    );
};

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const RocketLaunchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ChartBarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);


export default LandingPage;