
import { GoogleGenAI } from "@google/genai";
import { CampaignObjective, Platform } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const suggestInterests = async (objective: CampaignObjective, platform: Platform): Promise<string[]> => {
    if (!API_KEY) {
        // Fallback if API key is not available
        return ["Fashion", "Travel", "Food", "Technology", "Sports", "Music"];
    }

    const prompt = `
        Given a marketing campaign with the objective '${objective}' on the platform '${platform}', 
        suggest 8 relevant targeting interests.
        Return the interests as a single comma-separated string, without any other text or explanation.
        Example: Interest One, Interest Two, Interest Three
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const text = response.text;
        if (text) {
            return text.split(',').map(interest => interest.trim()).filter(Boolean);
        }
        return [];
    } catch (error) {
        console.error("Error fetching interests from Gemini API:", error);
        // Provide fallback interests on API error
        return ["Marketing", "Business", "E-commerce", "Social Media", "Startups"];
    }
};
