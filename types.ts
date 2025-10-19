import React from 'react';

// Type for Dashboard Modules
export interface Module {
  id: string;
  title: string;
  description: string;
  // Fix: The 'icon' property uses React types which require importing React.
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// FIX: Add missing type definitions for Rule, RuleSection, and Architecture document.
// Type for Operational Rules
export interface Rule {
  id: string;
  title: string;
  content: string;
}

export interface RuleSection {
  id: string;
  title: string;
  rules: Rule[];
}

// Types for Architecture Document
export type ArchitectureContentType = 'heading' | 'subheading' | 'paragraph' | 'code';

export interface ArchitectureContent {
  type: ArchitectureContentType;
  content: string;
  language?: string;
}

export interface ArchitectureSection {
  id: string;
  content: ArchitectureContent[];
}
