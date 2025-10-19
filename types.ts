
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
