
export enum CampaignObjective {
    VIEWS = "Views",
    SHARES = "Shares",
    COMMENTS = "Comments",
    DOWNLOADS = "Downloads",
    LEADS = "Leads",
    SALES = "Sales",
    FOLLOWS = "Follows",
    BLOG_PROMOTION = "Blog Promotion",
}

export enum Platform {
    INSTAGRAM = "Instagram",
    FACEBOOK = "Facebook",
    TIKTOK = "TikTok",
    YOUTUBE = "YouTube",
    BLOG = "Blog URL",
}

export enum Gender {
    ANY = "Any",
    MALE = "Male",
    FEMALE = "Female",
    NON_BINARY = "Non-binary",
}

export enum CampaignStatus {
    PENDING = "Pending",
    ACTIVE = "Active",
    COMPLETED = "Completed",
}

export interface Targeting {
    ageRange: [number, number];
    gender: Gender;
    interests: string[];
}

export interface Performance {
    views: number;
    engagements: number;
    leads: number;
    sales: number;
    follows: number;
    blogClicks: number;
}

export interface Campaign {
    id: string;
    name: string;
    objective: CampaignObjective;
    platform: Platform;
    mediaUrl: string;
    targeting: Targeting;
    status: CampaignStatus;
    performance: Performance;
    createdAt: string;
}

export interface User {
    id: string;
    email: string;
}
