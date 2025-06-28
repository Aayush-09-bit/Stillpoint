export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  streak: number;
  lastStreakUpdate?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    fontFamily: 'inter' | 'playfair' | 'crimson' | 'lora' | 'merriweather';
    inkColor: 'sage' | 'lavender' | 'warm' | 'ocean' | 'sunset' | 'forest';
    fontSize: 'small' | 'medium' | 'large';
  };
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string;
  content: string;
  mood: MoodType;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  keywords: string[];
  createdAt: string;
  updatedAt: string;
}

export type MoodType = 'joyful' | 'content' | 'peaceful' | 'neutral' | 'melancholy' | 'anxious' | 'frustrated' | 'excited';

export interface MoodOption {
  type: MoodType;
  emoji: string;
  label: string;
  color: string;
  description: string;
}

export interface MoodAnalysis {
  mood: MoodType;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  keywords: string[];
  confidence: number;
}

export type ViewType = 'home' | 'calendar' | 'analytics' | 'settings';