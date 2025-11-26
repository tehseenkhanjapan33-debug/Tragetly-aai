import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { Campaign, CampaignStatus } from '../types';
import { useAuth } from './AuthContext';

interface CampaignContextType {
    campaigns: Campaign[];
    loading: boolean;
    addCampaign: (campaign: Omit<Campaign, 'id' | 'status' | 'performance' | 'createdAt'>) => void;
    getCampaigns: () => Campaign[];
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

const initialCampaigns: Campaign[] = [
    // Sample data
];

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const getCampaigns = useCallback(() => {
        if (!user) return [];
        try {
            const storedCampaigns = localStorage.getItem(`tragetly-campaigns-${user.id}`);
            return storedCampaigns ? JSON.parse(storedCampaigns) : initialCampaigns;
        } catch (error) {
            console.error("Failed to parse campaigns from localStorage", error);
            return initialCampaigns;
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            setCampaigns(getCampaigns());
        } else {
            setCampaigns([]);
        }
        setLoading(false);
    }, [user, getCampaigns]);
    
    useEffect(() => {
        if (!user) return;

        const interval = setInterval(() => {
            let changed = false;
            const updatedCampaigns = campaigns.map(c => {
                if (c.status === CampaignStatus.PENDING && Math.random() > 0.7) {
                    changed = true;
                    return { ...c, status: CampaignStatus.ACTIVE };
                }
                if (c.status === CampaignStatus.ACTIVE) {
                    changed = true;
                    const performance = {
                        ...c.performance,
                        views: c.performance.views + Math.floor(Math.random() * 500),
                        engagements: c.performance.engagements + Math.floor(Math.random() * 50),
                        follows: c.performance.follows + Math.floor(Math.random() * 25),
                        blogClicks: c.performance.blogClicks + Math.floor(Math.random() * 100),
                    };
                    const status = performance.views > 50000 ? CampaignStatus.COMPLETED : c.status;
                    return { ...c, performance, status };
                }
                return c;
            });
            
            if (changed) {
                setCampaigns(updatedCampaigns);
                localStorage.setItem(`tragetly-campaigns-${user.id}`, JSON.stringify(updatedCampaigns));
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [campaigns, user]);

    const addCampaign = (campaignData: Omit<Campaign, 'id' | 'status' | 'performance' | 'createdAt'>) => {
        if (!user) return;
        const newCampaign: Campaign = {
            ...campaignData,
            id: Date.now().toString(),
            status: CampaignStatus.PENDING,
            performance: { views: 0, engagements: 0, leads: 0, sales: 0, follows: 0, blogClicks: 0 },
            createdAt: new Date().toISOString(),
        };
        const updatedCampaigns = [...campaigns, newCampaign];
        setCampaigns(updatedCampaigns);
        localStorage.setItem(`tragetly-campaigns-${user.id}`, JSON.stringify(updatedCampaigns));
    };

    return (
        <CampaignContext.Provider value={{ campaigns, loading, addCampaign, getCampaigns }}>
            {children}
        </CampaignContext.Provider>
    );
};

export const useCampaigns = (): CampaignContextType => {
    const context = useContext(CampaignContext);
    if (context === undefined) {
        throw new Error('useCampaigns must be used within a CampaignProvider');
    }
    return context;
};