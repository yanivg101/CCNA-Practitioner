import { create } from 'zustand';
import { CCNAState, CCNAQuestion, QuizSession, FlashcardProgress, DomainID } from '../types';
import { allCCNAPrepQuestions } from '../data/questions';

// Load initial state from LocalStorage safely
const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Storage error:", e);
  }
};

const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn("Storage removal blocked or disabled:", e);
  }
};

interface CCNAStoreActions {
  addCustomQuestion: (q: Omit<CCNAQuestion, 'id'>) => void;
  startQuiz: (config: {
    questionCount: number;
    domainId: DomainID | 'all' | 'weak';
    isTimed: boolean;
    timeLimitSeconds: number;
  }) => QuizSession;
  submitAnswer: (sessionId: string, questionId: string, answerIndex: number) => void;
  toggleFlagQuestion: (sessionId: string, questionId: string) => void;
  completeQuiz: (sessionId: string) => { score: number; pointsGained: number; unlockedBadges: string[]; correctCount: number };
  rateFlashcard: (questionId: string, rating: 'קל' | 'בינוני' | 'קשה' | 'שכחתי') => void;
  addPoints: (amount: number) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
  updateStreak: () => void;
  getWeakDomains: () => { domainId: DomainID; successRate: number; wrongCount: number; totalCount: number }[];
}

export type CCNAStore = CCNAState & CCNAStoreActions;

export const useCCNAStore = create<CCNAStore>((set, get) => {
  // Initialize state
  const initialCustomQuestions = getLocalStorage<CCNAQuestion[]>('ccna_custom_questions', []);
  const initialHistory = getLocalStorage<Record<string, QuizSession>>('ccna_quiz_history', {});
  const initialFlashcards = getLocalStorage<Record<string, FlashcardProgress>>('ccna_flashcards', {});
  const initialStreak = getLocalStorage<number>('ccna_streak', 0);
  const initialLastActiveDate = getLocalStorage<string | null>('ccna_last_active_date', null);
  const initialPoints = getLocalStorage<number>('ccna_points', 0);
  const initialTheme = getLocalStorage<'light' | 'dark'>('ccna_theme', 'light');

  return {
    questions: [...allCCNAPrepQuestions, ...initialCustomQuestions],
    customQuestions: initialCustomQuestions,
    history: initialHistory,
    flashcards: initialFlashcards,
    streak: initialStreak,
    lastActiveDate: initialLastActiveDate,
    points: initialPoints,
    theme: initialTheme,

    addCustomQuestion: (q) => {
      const newQuestion: CCNAQuestion = {
        ...q,
        id: `custom_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      };
      
      const updatedCustom = [...get().customQuestions, newQuestion];
      const updatedAll = [...allCCNAPrepQuestions, ...updatedCustom];
      
      setLocalStorage('ccna_custom_questions', updatedCustom);
      set({ 
        customQuestions: updatedCustom,
        questions: updatedAll,
        points: get().points + 50 // Reward 50 pts for creating a study question!
      });
      setLocalStorage('ccna_points', get().points);
    },

    startQuiz: (config) => {
      const { questions, history } = get();
      
      // Determine which questions to pull from
      let candidates: CCNAQuestion[] = [];
      
      if (config.domainId === 'all') {
        candidates = [...questions];
      } else if (config.domainId === 'weak') {
        // Collect weak domains (success rate < 75% or domains with most errors)
        const weakDomains = get().getWeakDomains();
        const weakIds = weakDomains.map(d => d.domainId);
        
        candidates = questions.filter(q => weakIds.includes(q.domain));
        // If not enough questions in weak categories, fallback to all questions
        if (candidates.length < 5) {
          candidates = [...questions];
        }
      } else {
        candidates = questions.filter(q => q.domain === config.domainId);
      }
      
      // Shuffle candidates list
      const shuffled = [...candidates].sort(() => 0.5 - Math.random());
      
      // Pick questionCount
      const selected = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));
      
      const sessionId = `session_${Date.now()}`;
      const session: QuizSession = {
        id: sessionId,
        questions: selected,
        userAnswers: {},
        flaggedQuestions: [],
        startedAt: Date.now(),
        completedAt: null,
        timeLimit: config.isTimed ? config.timeLimitSeconds : null,
        secondsLeft: config.isTimed ? config.timeLimitSeconds : null
      };

      const updatedHistory = { ...history, [sessionId]: session };
      set({ history: updatedHistory });
      setLocalStorage('ccna_quiz_history', updatedHistory);
      
      return session;
    },

    submitAnswer: (sessionId, questionId, answerIndex) => {
      const { history } = get();
      const session = history[sessionId];
      if (!session || session.completedAt) return;

      const updatedSession = {
        ...session,
        userAnswers: {
          ...session.userAnswers,
          [questionId]: answerIndex
        }
      };

      const updatedHistory = { ...history, [sessionId]: updatedSession };
      set({ history: updatedHistory });
      setLocalStorage('ccna_quiz_history', updatedHistory);
    },

    toggleFlagQuestion: (sessionId, questionId) => {
      const { history } = get();
      const session = history[sessionId];
      if (!session) return;

      const flagList = [...session.flaggedQuestions];
      const index = flagList.indexOf(questionId);
      if (index > -1) {
        flagList.splice(index, 1);
      } else {
        flagList.push(questionId);
      }

      const updatedSession = { ...session, flaggedQuestions: flagList };
      const updatedHistory = { ...history, [sessionId]: updatedSession };
      set({ history: updatedHistory });
      setLocalStorage('ccna_quiz_history', updatedHistory);
    },

    completeQuiz: (sessionId) => {
      const { history, points } = get();
      const session = history[sessionId];
      if (!session || session.completedAt) return { score: 0, pointsGained: 0, unlockedBadges: [], correctCount: 0 };

      // Calculate score
      let correctCount = 0;
      session.questions.forEach((q) => {
        const userAnswer = session.userAnswers[q.id];
        if (userAnswer != null && userAnswer == q.correctAnswer) {
          correctCount++;
        }
      });

      const totalQs = session.questions.length;
      const scorePercentage = totalQs > 0 ? Math.round((correctCount / totalQs) * 100) : 0;

      // Calculate gamified points
      // 15 points per correct answer, 50 points bonus for scoring above 80%
      const ptsForCorrect = correctCount * 15;
      const bonusPts = scorePercentage >= 80 ? 50 : 0;
      const totalGained = ptsForCorrect + bonusPts;

      const updatedSession: QuizSession = {
        ...session,
        completedAt: Date.now(),
        score: scorePercentage
      };

      const updatedHistory = { ...history, [sessionId]: updatedSession };
      const newPoints = points + totalGained;
      
      set({ 
        history: updatedHistory,
        points: newPoints
      });

      setLocalStorage('ccna_quiz_history', updatedHistory);
      setLocalStorage('ccna_points', newPoints);

      // Check Badges & Streaks
      get().updateStreak();
      
      // Evaluate unlocked badges based on rules
      const unlockedBadges: string[] = [];
      const currentBadges = getLocalStorage<string[]>('ccna_unlocked_badges', []);
      
      const completedSessions = Object.values(updatedHistory).filter(s => s.completedAt !== null);
      
      // 1. First Quiz Completed
      if (completedSessions.length >= 1 && !currentBadges.includes('first_quiz')) {
        unlockedBadges.push('first_quiz');
      }
      // 2. Score 100% on a Quiz
      if (scorePercentage === 100 && totalQs >= 10 && !currentBadges.includes('perfect_score')) {
        unlockedBadges.push('perfect_score');
      }
      // 3. Completed 5 Quizzes
      if (completedSessions.length >= 5 && !currentBadges.includes('quiz_enthusiast')) {
        unlockedBadges.push('quiz_enthusiast');
      }
      // 4. Accumulate 1000 points
      if (newPoints >= 1000 && !currentBadges.includes('points_grandmaster')) {
        unlockedBadges.push('points_grandmaster');
      }
      // 5. Streak of 3 days
      if (get().streak >= 3 && !currentBadges.includes('streak_3day')) {
        unlockedBadges.push('streak_3day');
      }

      if (unlockedBadges.length > 0) {
        const consolidatedBadges = Array.from(new Set([...currentBadges, ...unlockedBadges]));
        setLocalStorage('ccna_unlocked_badges', consolidatedBadges);
      }

      return {
        score: scorePercentage,
        pointsGained: totalGained,
        unlockedBadges,
        correctCount
      };
    },

    updateStreak: () => {
      const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
      const lastActive = get().lastActiveDate;
      let currentStreak = get().streak;

      if (!lastActive) {
        // First active day
        currentStreak = 1;
      } else {
        const lastDate = new Date(lastActive);
        const todayDate = new Date(todayStr);
        const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          // Successive day, increment streak
          currentStreak += 1;
        } else if (diffDays > 1) {
          // Broke streak, reset back to 1
          currentStreak = 1;
        }
        // If diffDays is 0, it means the user already practiced today, streak remains same
      }

      set({
        streak: currentStreak,
        lastActiveDate: todayStr
      });
      setLocalStorage('ccna_streak', currentStreak);
      setLocalStorage('ccna_last_active_date', todayStr);
    },

    rateFlashcard: (questionId, rating) => {
      const { flashcards, points } = get();
      const card = flashcards[questionId] || {
        questionId,
        intervalDays: 1,
        repetitions: 0,
        easeFactor: 2.5,
        nextReviewTimestamp: Date.now()
      };

      // SuperMemo-2 (SM-2) Spaced Repetition Logic
      let { intervalDays, repetitions, easeFactor } = card;

      // Grade mappings (0 to 5)
      // rating values: 'קל' -> 5, 'בינוני' -> 4, 'קשה' -> 3, 'שכחתי' -> 1
      let grade = 3;
      if (rating === 'קל') grade = 5;
      if (rating === 'בינוני') grade = 4;
      if (rating === 'קשה') grade = 3;
      if (rating === 'שכחתי') grade = 1;

      // Calculate easeFactor adjustment
      easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
      if (easeFactor < 1.3) easeFactor = 1.3;

      if (grade >= 3) {
        if (repetitions === 0) {
          intervalDays = 1;
        } else if (repetitions === 1) {
          intervalDays = 6;
        } else {
          intervalDays = Math.ceil(intervalDays * easeFactor);
        }
        repetitions += 1;
      } else {
        repetitions = 0;
        intervalDays = 1;
      }

      const nextReviewTimestamp = Date.now() + intervalDays * 24 * 60 * 60 * 1000;

      const updatedCard: FlashcardProgress = {
        questionId,
        intervalDays,
        repetitions,
        easeFactor,
        nextReviewTimestamp,
        lastRating: rating
      };

      const updatedFlashcards = {
        ...flashcards,
        [questionId]: updatedCard
      };

      // +5 points for reviewing flashcards!
      const updatedPoints = points + 5;

      set({ 
        flashcards: updatedFlashcards,
        points: updatedPoints
      });
      setLocalStorage('ccna_flashcards', updatedFlashcards);
      setLocalStorage('ccna_points', updatedPoints);
    },

    addPoints: (amount) => {
      const newPoints = get().points + amount;
      set({ points: newPoints });
      setLocalStorage('ccna_points', newPoints);
    },

    toggleTheme: () => {
      const newTheme = get().theme === 'light' ? 'dark' : 'light';
      set({ theme: newTheme });
      setLocalStorage('ccna_theme', newTheme);
    },

    resetProgress: () => {
      removeLocalStorage('ccna_quiz_history');
      removeLocalStorage('ccna_flashcards');
      removeLocalStorage('ccna_custom_questions');
      removeLocalStorage('ccna_streak');
      removeLocalStorage('ccna_last_active_date');
      removeLocalStorage('ccna_points');
      removeLocalStorage('ccna_unlocked_badges');

      set({
        customQuestions: [],
        questions: allCCNAPrepQuestions,
        history: {},
        flashcards: {},
        streak: 0,
        lastActiveDate: null,
        points: 0
      });
    },

    getWeakDomains: () => {
      const { history, questions } = get();
      const sessions = Object.values(history).filter(s => s.completedAt !== null);
      
      // Initialize stats per domain
      const stats: Record<DomainID, { correct: number; total: number }> = {
        network_fundamentals: { correct: 0, total: 0 },
        network_access: { correct: 0, total: 0 },
        ip_connectivity: { correct: 0, total: 0 },
        ip_services: { correct: 0, total: 0 },
        security_fundamentals: { correct: 0, total: 0 },
        automation_programmability: { correct: 0, total: 0 }
      };

      // Accumulate answers
      sessions.forEach(session => {
        session.questions.forEach(q => {
          const answer = session.userAnswers[q.id];
          if (answer !== undefined) {
             stats[q.domain].total += 1;
             if (answer === q.correctAnswer) {
               stats[q.domain].correct += 1;
             }
          }
        });
      });

      // Filter and map to result list sorted by worst performance first
      const domainIds: DomainID[] = [
        'network_fundamentals',
        'network_access',
        'ip_connectivity',
        'ip_services',
        'security_fundamentals',
        'automation_programmability'
      ];

      return domainIds.map(id => {
        const item = stats[id];
        const successRate = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 100; // default 100% if unpracticed
        const wrongCount = item.total - item.correct;
        
        return {
          domainId: id,
          successRate,
          wrongCount,
          totalCount: item.total
        };
      }).sort((a, b) => a.successRate - b.successRate); // Worst first
    }
  };
});
