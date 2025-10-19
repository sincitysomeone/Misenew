
import { GoogleGenAI } from "@google/genai";

const getExplanationForRule = async (ruleContent: string): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `You are an expert project manager and tech lead. Your task is to explain a project rule in simple, clear terms for a new team member. Focus on the 'why' behind the rule and its practical implications.

    **Project Rule to Explain:**
    "${ruleContent}"

    **Your Explanation:**
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating explanation:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};

export { getExplanationForRule };
