/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DomainID = 
  | 'network_fundamentals'
  | 'network_access'
  | 'ip_connectivity'
  | 'ip_services'
  | 'security_fundamentals'
  | 'automation_programmability';

export interface CCNADomain {
  id: DomainID;
  name: string;      // Hebrew name
  nameEn: string;    // English name
  weight: number;    // Weight percentage in exam (e.g. 20)
  color: string;     // Tailwind color class
}

export type DifficultyLevel = 'קל' | 'בינוני' | 'קשה';

export interface CCNAQuestion {
  id: string;
  domain: DomainID;
  subtopic: string; // Subtopic in Hebrew (e.g. "נתבי OSPF", "מודל OSI")
  question: string; // The question text in Hebrew
  options: string[]; // 4 multiple choice options in Hebrew/English
  correctAnswer: number; // Index 0-3
  explanation: string; // Detailed study explanation in Hebrew
  hint: string; // A short helpful hint
  additionalInfo: string; // Mnemonic, CLI commands, or tables
  difficulty: DifficultyLevel;
  references?: string; // Book, RFC, or official exam part
}

export interface QuizSession {
  id: string;
  questions: CCNAQuestion[];
  userAnswers: Record<string, number>; // questionId -> selectedOptionIndex
  flaggedQuestions: string[]; // list of question ids that are flagged for review
  startedAt: number;
  completedAt: number | null;
  timeLimit: number | null; // in seconds, null if untimed
  secondsLeft: number | null;
  score?: number; // percentage
}

export interface UserStats {
  streak: number;
  lastActivityDate: string | null; // "YYYY-MM-DD"
  badges: string[]; // list of unlocked badge IDs
  weakAreas: {
    domainId: DomainID;
    percentage: number;
    wrongCount: number;
    totalCount: number;
  }[];
  answeredQuestions: Record<string, {
    correct: boolean;
    timestamp: number;
    selectedOption: number;
  }[]>; // Stores performance history for each questionId
}

export interface FlashcardProgress {
  questionId: string;
  intervalDays: number; // Days until next review
  repetitions: number; // Number of consecutive correct reviews
  easeFactor: number; // SM-2 Easiness Factor (default 2.5)
  nextReviewTimestamp: number; // When to review next
  lastRating?: 'קל' | 'בינוני' | 'קשה' | 'שכחתי';
}

export interface GlossaryTerm {
  term: string; // English
  hebrewTranslation: string; // Hebrew translation / meaning
  definition: string; // Brief definition in Hebrew
  domain: DomainID;
}

export interface CCNAState {
  questions: CCNAQuestion[];
  customQuestions: CCNAQuestion[];
  history: Record<string, QuizSession>; // sessionId -> Session content
  flashcards: Record<string, FlashcardProgress>; // questionId -> Flashcard state
  streak: number;
  lastActiveDate: string | null; // YYYY-MM-DD
  points: number; // gamification currency
  theme: 'light' | 'dark';
}
