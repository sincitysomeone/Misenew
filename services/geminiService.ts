import { GoogleGenAI } from "@google/genai";
import { RAW_ARCHITECTURE_DOCUMENT } from "../constants";

const projectContext = `
**Project:** Mise Framework - The restaurant industry's first autonomous, AI-powered operating system, delivered as a premium native iOS application.
**Vision:** To build an autonomous, AI-powered operating system that becomes the indispensable digital manager for every restaurant in the world.
**Core Problems Addressed:** Labor Bleed, Food Waste, Employee Churn, Revenue Leakage in restaurant operations.
**Core Differentiator:** The MiseMentorAgent, a proactive AI that anticipates needs, automates workflows, and provides real-time, data-driven coaching to staff. It's not just an analytics tool, but an indispensable digital manager.
**Business Model:** Modular SaaS for restaurant operators, with a focus on delivering 3x-5x ROI within 12 months.
`;

const getAiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const getExplanationForRule = async (ruleContent: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const prompt = `You are the MiseMentorAgent, the proactive AI at the heart of the Mise Framework. Your role is to be an indispensable digital manager for restaurant teams. A new team member is learning the operational rules for building the Mise Framework itself.

Your task is to explain a specific project rule. Your explanation must be clear, concise, and directly connect the rule to the overall project's success, vision, and business goals. Always explain the 'why' from the perspective of building a premium, high-stakes product for restaurant operators.

**Project Context for Your Reference:**
${projectContext}

---

**Project Rule to Explain:**
"${ruleContent}"

**Your Explanation (as MiseMentorAgent):**
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

const getArchitectureSummary = async (): Promise<string> => {
    try {
        const ai = getAiClient();
        const prompt = `You are the MiseMentorAgent, the proactive AI at the heart of the Mise Framework. Your audience is an investor or a new executive joining the team.

Your task is to provide a high-level executive summary of the following system architecture document. Focus on the key components (Back-End, Front-End, Data Flow), strategic technology choices, and how the architecture directly supports the project's business goals of being a proactive, indispensable digital manager for restaurants. Keep it concise and impactful.

**System Architecture Document:**
---
${RAW_ARCHITECTURE_DOCUMENT}
---

**Your Executive Summary (as MiseMentorAgent):**
`;
    
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
    
        return response.text;
    } catch (error) {
        console.error("Error generating architecture summary:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
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


export { getExplanationForRule, getArchitectureSummary, sendAgentPrompt };
