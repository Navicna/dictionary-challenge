export interface Data {
  word: string;
  results: Result[];
  syllables: Syllables;
  pronunciation: Pronunciation;
  frequency: number;
}

export interface Result {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  typeOf: string[];
  hasTypes?: string[];
  derivation?: string[];
  examples?: string[];
}

export interface Syllables {
  count: number;
  list: string[];
}

export interface Pronunciation {
  all: string;
}
