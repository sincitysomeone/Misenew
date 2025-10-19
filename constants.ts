import { Module, RuleSection, ArchitectureSection } from './types';
import CaterFlowIcon from './components/icons/CaterFlowIcon';
import TeamFlowIcon from './components/icons/TeamFlowIcon';
import InventoryFlowIcon from './components/icons/InventoryFlowIcon';
import OnboardingIcon from './components/icons/OnboardingIcon';
import BillingIcon from './components/icons/BillingIcon';

export const MODULES: Module[] = [
  {
    id: 'caterflow',
    title: 'CaterFlow',
    description: 'Manage catering orders, generate quotes, and track event profitability in real-time.',
    icon: CaterFlowIcon,
  },
  {
    id: 'teamflow',
    title: 'TeamFlow',
    description: 'Optimize labor scheduling, monitor staff performance, and reduce overtime costs.',
    icon: TeamFlowIcon,
  },
  {
    id: 'inventoryflow',
    title: 'InventoryFlow',
    description: 'Track stock levels, reduce waste with smart ordering, and manage suppliers.',
    icon: InventoryFlowIcon,
  },
  {
    id: 'certiflow',
    title: 'CertiFlow',
    description: 'Streamline employee onboarding, track certifications, and manage training schedules.',
    icon: OnboardingIcon,
  },
  {
    id: 'settingsflow',
    title: 'SettingsFlow & Billing',
    description: 'Manage subscriptions, view billing history, and configure payment options.',
    icon: BillingIcon,
  },
    {
    id: 'prepflow',
    title: 'Prep & OpsFlow',
    description: 'Standardize recipes, generate prep lists, and ensure operational consistency.',
    icon: TeamFlowIcon, // Using a placeholder, ideally a unique icon
  },
];

// FIX: Add missing constants for project rules and architecture document.
export const PROJECT_RULES: RuleSection[] = [
  {
    id: 'food_safety',
    title: 'Food Safety & Handling',
    rules: [
      { id: 'FS-01', title: 'Hand Washing', content: 'All staff must wash hands with soap and water for at least 20 seconds before starting work, after handling raw meat, and after using the restroom.' },
      { id: 'FS-02', title: 'Temperature Control', content: 'Cold foods must be held at or below 41°F (5°C). Hot foods must be held at or above 135°F (57°C).' },
      { id: 'FS-03', title: 'Cross-Contamination', content: 'Use separate cutting boards, utensils, and containers for raw and ready-to-eat foods to prevent cross-contamination.' },
    ],
  },
  {
    id: 'customer_service',
    title: 'Customer Service Standards',
    rules: [
      { id: 'CS-01', title: 'Greeting', content: 'Greet every guest with a smile and a warm welcome within 30 seconds of their arrival.' },
      { id: 'CS-02', title: 'Order Accuracy', content: 'Repeat the customer\'s order back to them to confirm accuracy before submitting it to the kitchen.' },
    ],
  },
];

export const SYSTEM_ARCHITECTURE_DOCUMENT: ArchitectureSection[] = [
  {
    id: 'overview',
    content: [
      { type: 'heading', content: '1. System Overview' },
      { type: 'paragraph', content: 'The Mise platform is a cloud-native, microservices-based architecture designed for scalability and reliability. It leverages a modern tech stack to provide real-time data processing and a seamless user experience for restaurant managers.' },
    ],
  },
  {
    id: 'frontend',
    content: [
      { type: 'heading', content: '2. Frontend Architecture' },
      { type: 'subheading', content: '2.1. Technology Stack' },
      { type: 'paragraph', content: 'The dashboard is a Single Page Application (SPA) built with React and TypeScript, utilizing TailwindCSS for styling.' },
      {
        type: 'code',
        language: 'json',
        content: `
{
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0",
    "@google/genai": "latest"
  }
}
        `.trim(),
      },
    ],
  },
  {
    id: 'backend',
    content: [
        { type: 'heading', content: '3. Backend Services (Microservices)' },
        { type: 'paragraph', content: 'The backend is composed of several independent microservices, each responsible for a specific domain (e.g., Orders, Inventory, Staff). They communicate via a combination of synchronous REST APIs and an asynchronous message bus for event-driven workflows.' },
        { type: 'subheading', content: '3.1. MiseMentorAgent Core' },
        { type: 'paragraph', content: 'The AI core, MiseMentorAgent, is a dedicated service that integrates with the Google Gemini API. It provides intelligent insights, responds to manager queries, and powers features like rule explanations and summaries.' },
    ]
  }
];
