import React from 'react';
import Button from '../components/Button';
import { useCampaigns } from '../context/CampaignContext';
import { Campaign, CampaignStatus, Platform } from '../types';
import { CAMPAIGN_OBJECTIVES } from '../constants';

interface DashboardPageProps {
    navigate: (path: string) => void;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="bg-blue-100 rounded-full p-3">{icon}</div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const PlatformIcon: React.FC<{ platform: Platform }> = ({ platform }) => {
    const iconClasses = "h-6 w-6";
    switch(platform) {
        case Platform.INSTAGRAM: return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07m0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>;
        case Platform.FACEBOOK: return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>;
        case Platform.TIKTOK: return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.05-4.84-.95-6.43-2.88-1.59-1.93-2.2-4.35-1.72-6.73.25-1.19.83-2.31 1.66-3.23.67-.74 1.44-1.38 2.3-1.88.87-.5 1.82-.86 2.79-1.09.08-2.84-.01-5.69.02-8.53.01-1.3.56-2.58 1.58-3.53 1.05-.99 2.44-1.5 3.83-1.49z"/></svg>;
        case Platform.YOUTUBE: return <svg xmlns="http://www.w3.org/2000/svg" className={iconClasses} viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>;
        case Platform.BLOG: return <svg xmlns="http://www.w3.org/2000/svg" className={`${iconClasses} text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
    }
};

const StatusBadge: React.FC<{ status: CampaignStatus }> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium";
    const statusClasses = {
        [CampaignStatus.ACTIVE]: 'bg-green-100 text-green-800',
        [CampaignStatus.PENDING]: 'bg-yellow-100 text-yellow-800 animate-pulse',
        [CampaignStatus.COMPLETED]: 'bg-gray-100 text-gray-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}


const CampaignRow: React.FC<{ campaign: Campaign }> = ({ campaign }) => {
    return (
        <tr className="bg-white hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <div className="flex items-center space-x-3">
                    <PlatformIcon platform={campaign.platform} />
                    <span>{campaign.name}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{campaign.objective}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <StatusBadge status={campaign.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{campaign.performance.views.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{campaign.performance.engagements.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{campaign.performance.follows.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(campaign.createdAt).toLocaleDateString()}</td>
        </tr>
    );
}

const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
    const { campaigns, loading } = useCampaigns();

    const totalViews = campaigns.reduce((sum, c) => sum + c.performance.views, 0);
    const totalEngagements = campaigns.reduce((sum, c) => sum + c.performance.engagements, 0);
    const totalFollows = campaigns.reduce((sum, c) => sum + c.performance.follows, 0);

    return (
        <div className="container mx-auto max-w-7xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Campaign Dashboard</h2>
                <Button onClick={() => navigate('#/create-campaign')}>
                    Create New Campaign
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Views" value={totalViews.toLocaleString()} icon={<EyeIcon />} />
                <StatCard title="Total Engagements" value={totalEngagements.toLocaleString()} icon={<UsersIcon />} />
                <StatCard title="Total Follows" value={totalFollows.toLocaleString()} icon={<UserPlusIcon />} />
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Objective</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Engagements</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Follows</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">Loading campaigns...</td></tr>
                            ) : campaigns.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-8 text-gray-500">No campaigns yet. Create one to get started!</td></tr>
                            ) : (
                                campaigns.map(campaign => <CampaignRow key={campaign.id} campaign={campaign} />)
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197M15 10a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const UserPlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>;

export default DashboardPage;