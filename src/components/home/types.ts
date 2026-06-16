export type SearchResult = {
  id: number;
  word: string;
  meaning: string;
  example?: string | null;
  language: string;
};

export type WordOfDay = {
  word: string;
  meaning: string;
  example?: string | null;
  language: string;
};

export type AnimatedLanguage = {
  name: string;
  color: string;
};

export type RecentWord = {
  word: string;
  meaning: string;
  language: string;
};