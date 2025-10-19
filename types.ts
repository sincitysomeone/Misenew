export interface Rule {
  id: string;
  title: string;
  content: string;
}

export interface RuleSection {
  id:string;
  title: string;
  rules: Rule[];
}

export type ArchitectureContentType = 'heading' | 'subheading' | 'paragraph' | 'code';

export interface ArchitectureContent {
  type: ArchitectureContentType;
  content: string;
  language?: 'python' | 'swift';
}

export interface ArchitectureSection {
  id: string;
  content: ArchitectureContent[];
}
