import { GoogleGenAI } from "@google/genai";
import fs from "fs";

// Check if API key is set
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === "___Google_Gemini_API_Key___" || apiKey.includes("Google_Gemini_API_Key")) {
    console.warn("⚠️  WARNING: Gemini API key is not set or is using placeholder value!");
    console.warn("Please set GEMINI_API_KEY in your .env file with your actual API key from https://aistudio.google.com/api-keys");
}

const ai = apiKey && !apiKey.includes("Google_Gemini_API_Key") 
    ? new GoogleGenAI({apiKey}) 
    : null;

export const analyzeImage = async (filePath: string)=>{
    try {
        // Check if API key is configured
        if (!ai) {
            throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.");
        }

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
        }

        // Read file as base64
        const base64ImageFile = fs.readFileSync(filePath, {
            encoding: "base64",
        });

        // Determine MIME type from file extension
        const ext = filePath.toLowerCase().split('.').pop();
        let mimeType = "image/jpeg"; // default
        if (ext === 'png') mimeType = "image/png";
        else if (ext === 'gif') mimeType = "image/gif";
        else if (ext === 'webp') mimeType = "image/webp";

        const contents = [
            {
                inlineData: {
                    mimeType: mimeType,
                    data: base64ImageFile,
                },
            },
            { text: "Extract the food name and estimated calories from this image in a JSON object." },
        ];

        const config = {
            responseMimeType: "application/json",
            responseJsonSchema: {
                type: "object",
                properties: {
                    name: {type: "string" },
                    calories: { type: "number" },
                }
            }
        };

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: contents,
            config
        });

        // Parse and return the result
        const result = JSON.parse(response.text);
        
        // Validate result
        if (!result.name || typeof result.calories !== 'number') {
            throw new Error("Invalid response from AI: missing name or calories");
        }

        return result;

    } catch (error: any) {
        console.error("Gemini API Error:", error);
        
        // Provide helpful error messages
        if (error.message?.includes("API key")) {
            throw new Error("Gemini API key is not configured. Please set GEMINI_API_KEY in your .env file.");
        }
        if (error.message?.includes("quota") || error.message?.includes("429")) {
            throw new Error("Gemini API quota exceeded. Please check your API usage.");
        }
        if (error.message?.includes("401") || error.message?.includes("unauthorized")) {
            throw new Error("Invalid Gemini API key. Please check your GEMINI_API_KEY in .env file.");
        }
        
        throw new Error(`Image analysis failed: ${error.message || String(error)}`);
    }
}