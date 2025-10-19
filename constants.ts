
import { RuleSection } from './types';

export const PROJECT_RULES: RuleSection[] = [
  {
    id: 'strategy',
    title: '1. Strategy & Communication',
    rules: [
      {
        id: '1.1',
        title: 'Investor-Ready Tone',
        content: 'All strategic documents must be framed for an investor audience, adopting the narrative from the official Pitch Deck.',
      },
      {
        id: '1.2',
        title: 'Honesty & Feedback',
        content: 'Provide direct, honest feedback on all ideas, assessing value against the established v2.3 blueprint.',
      },
      {
        id: '1.3',
        title: 'Code-First Principle',
        content: 'Respond to technical prompts with code first, followed by clear explanations.',
      },
    ],
  },
  {
    id: 'architecture',
    title: '2. Architecture & Development',
    rules: [
      {
        id: '2.1',
        title: 'Core Architecture',
        content: 'The framework is built on a proactive MiseMentorAgent back-end and a native iOS front-end.',
      },
      {
        id: '2.2',
        title: 'Front-End Pattern',
        content: 'The native iOS app must be built using the "Manager" pattern for its core logic and the "CardBackKit" UI paradigm for its interface.',
      },
      {
        id: '2.3',
        title: 'Modularity & Communication',
        content: 'All back-end modules must serve as toolsets for the MiseMentorAgent. All front-end communication between managers must use the EventBus.',
      },
      {
        id: '2.4',
        title: 'Native iOS First',
        content: 'The primary development focus is a high-performance native iOS application (Swift/SwiftUI).',
      },
      {
        id: '2.5',
        title: 'Performance',
        content: 'Front-end components must be lazy-loaded to ensure a fast, responsive user experience.',
      },
      {
        id: '2.6',
        title: 'Testing',
        content: 'Front-end development must utilize Jest and Storybook (or their native iOS equivalents) for robust testing.',
      },
    ],
  },
  {
    id: 'documentation',
    title: '3. Documentation, IP, & Legal',
    rules: [
      {
        id: '3.1',
        title: 'Auto-Documentation (DocUpdateAgent)',
        content: 'Every substantive change triggers a full documentation run, generating Markdown, PDF, and HTML formats.',
      },
      {
        id: '3.2',
        title: 'IP Classification & Protection',
        content: 'All new logic is classified as a trade secret. All team members must formally acknowledge the TradeSecrets_Protection.docx before gaining access, managed via LegalFlow.',
      },
      {
        id: '3.3',
        title: 'Per-Module ROI Reports',
        content: 'A dedicated ROI report must be generated and maintained for each core module.',
      },
      {
        id: '3.4',
        title: 'Version Control',
        content: 'All changelogs must include a "Rationale" section explaining why a change was made.',
      },
      {
        id: '3.5',
        title: 'Feature Feedback',
        content: 'All new features must be accompanied by a "Feedback Framework Report."',
      },
    ],
  },
  {
    id: 'commercialization',
    title: '4. Modules & Commercialization',
    rules: [
      {
        id: '4.1',
        title: 'Module Naming',
        content: 'Official names are CertiFlow (onboarding) and PrepFlow (general prep).',
      },
      {
        id: '4.2',
        title: 'Billing',
        content: 'All monetization logic (Stripe integration, in-app purchases) is encapsulated within SettingsFlow.',
      },
      {
        id: '4.3',
        title: 'Feature Flagging',
        content: 'All new, high-impact features must be deployed via the FeatureFlagService for controlled rollouts.',
      },
    ],
  },
];
