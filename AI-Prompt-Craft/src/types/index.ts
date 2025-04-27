export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
}

export interface Metric {
  id: string;
  name: string;
  value: string | number;
  type: 'text' | 'number' | 'select';
  options?: string[];
}

export interface GeneratedPrompt {
  text: string;
  metrics: Metric[];
}

export interface Session {
  id: string;
  goal: string;
  selectedCategory: string;
  selectedSubcategory: string;
  generatedPrompt: GeneratedPrompt | null;
  output: string;
  feedback: string;
  timestamp: number;
  model: string;
  isFavorite?: boolean;
}

export type FeedbackType = 'positive' | 'negative' | 'neutral';