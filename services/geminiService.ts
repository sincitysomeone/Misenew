import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const sendAgentPrompt = async (userPrompt: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `You are MiseMentorAgent, the AI core of the Mise restaurant management system. You are speaking to a restaurant manager or owner. Your tone is professional, proactive, and data-driven. You are their indispensable digital partner.

Respond to the user's request concisely. If you need more information, ask for it.

**User's Request:**
"${userPrompt}"

**Your Response (as MiseMentorAgent):**
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error sending agent prompt:", error);
    throw new Error("Failed to communicate with the MiseMentorAgent.");
  }
};

// FIX: Add missing function to get explanation for a rule.
const getExplanationForRule = async (ruleContent: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `You are MiseMentorAgent, an expert in restaurant operations. Explain the following operational rule in simple terms, focusing on its practical importance for staff.

**Rule:**
"${ruleContent}"

**Your Explanation:**
`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting explanation for rule:", error);
    throw new Error("Failed to get explanation from the agent.");
  }
};

// FIX: Add missing function to get architecture summary.
const getArchitectureSummary = async (): Promise<string> => {
  try {
      const ai = getAiClient();
      const prompt = `You are MiseMentorAgent, an AI architect. Provide a high-level summary of the Mise system architecture. Focus on the core components, their interactions, and the overall design philosophy (e.g., modularity, scalability). Keep it concise and accessible to a semi-technical restaurant owner.`;
      
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });

      return response.text;
  } catch (error) {
      console.error("Error getting architecture summary:", error);
      throw new Error("Failed to get architecture summary from the agent.");
  }
};


export { sendAgentPrompt, getExplanationForRule, getArchitectureSummary };
