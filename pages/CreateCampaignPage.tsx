import React, { useState } from 'react';
import { CampaignObjective, Platform, Gender } from '../types';
import { CAMPAIGN_OBJECTIVES, PLATFORMS, GENDERS } from '../constants';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import { useCampaigns } from '../context/CampaignContext';
import { suggestInterests } from '../services/geminiService';

interface CreateCampaignPageProps {
    navigate: (path: string) => void;
}

const CreateCampaignPage: React.FC<CreateCampaignPageProps> = ({ navigate }) => {
    const { addCampaign } = useCampaigns();
    const [name, setName] = useState('');
    const [objective, setObjective] = useState<CampaignObjective>(CampaignObjective.VIEWS);
    const [platform, setPlatform] = useState<Platform>(Platform.INSTAGRAM);
    const [mediaUrl, setMediaUrl] = useState('');
    const [ageRange, setAgeRange] = useState<[number, number]>([18, 65]);
    const [gender, setGender] = useState<Gender>(Gender.ANY);
    const [interests, setInterests] = useState<string[]>([]);
    const [interestInput, setInterestInput] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && interestInput) {
            e.preventDefault();
            if (!interests.includes(interestInput.trim())) {
                setInterests([...interests, interestInput.trim()]);
            }
            setInterestInput('');
        }
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    const handleSuggestInterests = async () => {
        setIsSuggesting(true);
        const suggested = await suggestInterests(objective, platform);
        const newInterests = [...new Set([...interests, ...suggested])];
        setInterests(newInterests);
        setIsSuggesting(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addCampaign({
            name,
            objective,
            platform,
            mediaUrl,
            targeting: {
                ageRange,
                gender,
                interests,
            },
        });
        navigate('#/dashboard');
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Create a New Campaign</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md space-y-8">
                
                {/* Campaign Details */}
                <div className="border-b border-gray-200 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">1. Campaign Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input id="name" label="Campaign Name" value={name} onChange={e => setName(e.target.value)} required />
                        <Select id="objective" label="Objective" value={objective} onChange={e => setObjective(e.target.value as CampaignObjective)}>
                            {CAMPAIGN_OBJECTIVES.map(o => <option key={o} value={o}>{o}</option>)}
                        </Select>
                        <Select id="platform" label="Platform" value={platform} onChange={e => setPlatform(e.target.value as Platform)}>
                            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
                        </Select>
                        <Input id="mediaUrl" label={platform === Platform.BLOG ? "Blog URL" : "Media/Link URL"} type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} required />
                    </div>
                </div>

                {/* Targeting */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">2. Audience Targeting</h3>
                    <p className="text-sm text-gray-500 -mt-2 mb-6">Your campaign will reach as many people as possible within your target audience for free.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range: {ageRange[0]} - {ageRange[1]}</label>
                            <div className="flex items-center space-x-4">
                                <span>13</span>
                                <input type="range" min="13" max="65" value={ageRange[1]} onChange={e => setAgeRange([ageRange[0], parseInt(e.target.value, 10)])} className="w-full" />
                                <span>65+</span>
                            </div>
                        </div>
                        <Select id="gender" label="Gender" value={gender} onChange={e => setGender(e.target.value as Gender)}>
                            {GENDERS.map(g => <option key={g} value={g}>{g}</option>)}
                        </Select>
                        <div className="md:col-span-2">
                             <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                             <div className="flex items-start space-x-2">
                                <div className="flex-grow">
                                    <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md min-h-[42px]">
                                        {interests.map(interest => (
                                            <span key={interest} className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                                                {interest}
                                                <button type="button" onClick={() => handleRemoveInterest(interest)} className="ml-1.5 flex-shrink-0 text-blue-500 hover:text-blue-700 focus:outline-none">
                                                    <svg className="h-3 w-3" stroke="currentColor" fill="none" viewBox="0 0 8 8"><path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" /></svg>
                                                </button>
                                            </span>
                                        ))}
                                         <input
                                            type="text"
                                            value={interestInput}
                                            onChange={e => setInterestInput(e.target.value)}
                                            onKeyDown={handleAddInterest}
                                            placeholder={interests.length === 0 ? "Type an interest and press Enter" : ""}
                                            className="flex-grow outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                                <Button type="button" onClick={handleSuggestInterests} isLoading={isSuggesting} variant="secondary">
                                    <SparklesIcon />
                                    {isSuggesting ? 'Suggesting...' : 'AI Suggest'}
                                </Button>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-8 border-t border-gray-200">
                    <Button type="button" variant="secondary" onClick={() => navigate('#/dashboard')} className="mr-4">Cancel</Button>
                    <Button type="submit">Launch Campaign</Button>
                </div>
            </form>
        </div>
    );
};

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm8 0a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zM5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


export default CreateCampaignPage;