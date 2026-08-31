import React, { useState, useEffect } from 'react';
import { useCCNAStore } from '../store/useCCNAStore';
import { CCNAQuestion, QuizSession, DomainID } from '../types';
import { 
  Zap, HelpCircle, AlertCircle, Award, BookOpen, Clock, 
  ChevronRight, ChevronLeft, Flag, Check, X, RotateCcw, Home, MessageSquare
} from 'lucide-react';

interface QuizRunnerProps {
  initialDomainId: DomainID | 'all' | 'weak';
  onBackToDashboard: () => void;
}

export default function QuizRunner({ initialDomainId, onBackToDashboard }: QuizRunnerProps) {
  const { startQuiz, submitAnswer, toggleFlagQuestion, completeQuiz, questions, history } = useCCNAStore();

  // Screen state
  const [phase, setPhase] = useState<'setup' | 'active' | 'results'>('setup');
  
  // Setup config
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [domainId, setDomainId] = useState<DomainID | 'all' | 'weak'>(initialDomainId);
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(15);
  const [immediateFeedback, setImmediateFeedback] = useState<boolean>(true);

  // Active quiz states
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const session = activeSessionId ? history[activeSessionId] : null;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAdditional, setShowAdditional] = useState<boolean>(false);

  // Results state
  const [quizResult, setQuizResult] = useState<{
    score: number;
    pointsGained: number;
    unlockedBadges: string[];
    correctCount: number;
  } | null>(null);

  // Timer side-effect
  useEffect(() => {
    let timerInterval: any;
    if (phase === 'active' && isTimed && session && secondsLeft > 0) {
      timerInterval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleFinishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [phase, isTimed, secondsLeft, activeSessionId]);

  const handleStart = () => {
    const timeLimitSeconds = timeLimitMinutes * 60;
    const newSession = startQuiz({
      questionCount,
      domainId,
      isTimed,
      timeLimitSeconds
    });

    if (newSession.questions.length === 0) {
      alert('לא נמצאו שאלות זמינות לסינון זה במאגר!');
      return;
    }

    setActiveSessionId(newSession.id);
    setCurrentIndex(0);
    setSelectedOption(null);
    setHasCheckedAnswer(false);
    setShowHint(false);
    setShowAdditional(false);
    setSecondsLeft(timeLimitSeconds);
    setPhase('active');
  };

  const currentQuestion: CCNAQuestion | undefined = session?.questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (!session || !currentQuestion) return;
    if (immediateFeedback && hasCheckedAnswer) return; // Locked once checked
    
    setSelectedOption(index);
    submitAnswer(session.id, currentQuestion.id, index);
  };

  const handleCheckImmediate = () => {
    if (selectedOption === null) return;
    setHasCheckedAnswer(true);
  };

  const handleNext = () => {
    if (!session) return;
    
    if (currentIndex < session.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
      // Load existing answer if any
      const nextQId = session.questions[currentIndex + 1].id;
      const existingAnswer = session.userAnswers[nextQId];
      setSelectedOption(existingAnswer !== undefined ? existingAnswer : null);
      
      setHasCheckedAnswer(existingAnswer !== undefined);
      setShowHint(false);
      setShowAdditional(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      
      const prevQId = session!.questions[currentIndex - 1].id;
      const existingAnswer = session!.userAnswers[prevQId];
      setSelectedOption(existingAnswer !== undefined ? existingAnswer : null);
      
      setHasCheckedAnswer(existingAnswer !== undefined);
      setShowHint(false);
      setShowAdditional(false);
    }
  };

  const handleFinishQuiz = () => {
    if (!session) return;
    
    const results = completeQuiz(session.id);
    
    setQuizResult({
      score: results.score,
      pointsGained: results.pointsGained,
      unlockedBadges: results.unlockedBadges,
      correctCount: results.correctCount
    });
    setPhase('results');
  };

  const handleToggleFlag = () => {
    if (session && currentQuestion) {
      toggleFlagQuestion(session.id, currentQuestion.id);
    }
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Keyboard Shortcuts side-effect
  useEffect(() => {
    if (phase !== 'active' || !currentQuestion || !session) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is focusing an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      // Number keys 1-4 for option selection
      if (['1', '2', '3', '4'].includes(key)) {
        e.preventDefault();
        const idx = parseInt(key, 10) - 1;
        if (idx >= 0 && idx < currentQuestion.options.length) {
          handleSelectOption(idx);
        }
      }
      // a-d / A-D keys for option selection
      else if (['a', 'b', 'c', 'd'].includes(key)) {
        e.preventDefault();
        const idx = ['a', 'b', 'c', 'd'].indexOf(key);
        if (idx >= 0 && idx < currentQuestion.options.length) {
          handleSelectOption(idx);
        }
      }
      // Space or Enter to Check Answer (only if option selected, immediate feedback enabled, and not yet checked)
      else if (e.key === 'Enter' || e.key === ' ') {
        if (selectedOption !== null && !hasCheckedAnswer && immediateFeedback) {
          e.preventDefault();
          handleCheckImmediate();
        }
      }
      // Arrow keys navigation (RTL layout: ArrowLeft = Next, ArrowRight = Prev)
      else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (!immediateFeedback || hasCheckedAnswer) {
          handleNext();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handlePrev();
      }
      // H key toggles Hint
      else if (key === 'h' || e.key === 'י') {
        e.preventDefault();
        setShowHint(prev => !prev);
      }
      // M key toggles explanation / additional CLI
      else if (key === 'm' || e.key === 'צ') {
        e.preventDefault();
        setShowAdditional(prev => !prev);
      }
      // F key toggles Flagging
      else if (key === 'f' || e.key === 'כ') {
        e.preventDefault();
        handleToggleFlag();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, currentIndex, selectedOption, hasCheckedAnswer, session, currentQuestion, immediateFeedback]);

  // UI Setup Phase
  if (phase === 'setup') {
    return (
      <div className="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 dark:border-slate-800/60 animate-fade-in text-right" dir="rtl">
        <h2 className="text-xl font-black text-slate-800 dark:text-white mb-1">מחולל מבחני סימולציה CCNA</h2>
        <p className="text-xxs md:text-xs text-slate-400 mb-3.5 leading-relaxed">הגדר את סוג הסימולציה שתרצה לבצע. כל השאלות נבחרות באופן אקראי על פי הסיווג המועדף עליך.</p>

        <div className="space-y-3.5">
          
          {/* Domain Picker */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">בחר תחום למידה:</label>
            <select 
              value={domainId}
              onChange={(e) => setDomainId(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl text-slate-800 dark:text-slate-200 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer text-xs"
            >
              <option value="all">כל התחומים מעורבבים (מבחן סימולציה מלא)</option>
              <option value="weak">רשימת אזורים חלשים (סינון אוטומטי)</option>
              <option value="network_fundamentals">יסודות הרשת (Network Fundamentals)</option>
              <option value="network_access">גישה לרשת (LAN/WLAN Network Access)</option>
              <option value="ip_connectivity">קישוריות IP וניתוב (IP Connectivity)</option>
              <option value="ip_services">שירותי IP ויישומים (IP Services)</option>
              <option value="security_fundamentals">אבטחת מידע (Security Fundamentals)</option>
              <option value="automation_programmability">אוטומציה ותכנותיות (SDN / Programmability)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            
            {/* Questions number picker */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">מספר שאלות:</label>
              <div className="grid grid-cols-4 gap-1.5">
                {[10, 20, 50].map((num) => (
                  <button
                    key={num}
                    onClick={() => setQuestionCount(num)}
                    type="button"
                    className={`py-2 rounded-lg text-xxs font-bold transition-all cursor-pointer ${
                      questionCount === num 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {num} שאלות
                  </button>
                ))}
                <button
                  onClick={() => setQuestionCount(15)}
                  type="button"
                  className={`py-2 rounded-lg text-xxs font-bold transition-all cursor-pointer ${
                    ![10, 20, 50].includes(questionCount)
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:bg-slate-100'
                  }`}
                >
                  התאמה (15)
                </button>
              </div>
            </div>

            {/* Timed setup */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">הקצבת זמן:</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsTimed(false)}
                  type="button"
                  className={`w-1/2 py-2 rounded-lg text-xxs font-bold border transition-all cursor-pointer ${
                    !isTimed 
                      ? 'bg-indigo-600 text-white border-transparent' 
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  ללא הגבלת זמן
                </button>
                <button
                  onClick={() => setIsTimed(true)}
                  type="button"
                  className={`w-1/2 py-2 rounded-lg text-xxs font-bold border transition-all cursor-pointer ${
                    isTimed 
                      ? 'bg-indigo-600 text-white border-transparent' 
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-slate-100 dark:border-slate-800'
                  }`}
                >
                  הגבלת זמן (סטופר)
                </button>
              </div>
            </div>

          </div>

          {/* Time Picker if Timed */}
          {isTimed && (
            <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 rounded-2xl animate-fade-in">
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">אורך הסטופר (בדקות):</label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  step="5"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="w-full text-indigo-600 accent-indigo-600 cursor-pointer"
                />
                <span className="font-extrabold text-sm min-w-[70px] text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">{timeLimitMinutes} דקות</span>
              </div>
            </div>
          )}

          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">מנגנון בדיקה:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setImmediateFeedback(true)}
                className={`p-4 rounded-2xl border-2 cursor-pointer text-right transition-all ${
                  immediateFeedback 
                    ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-500/5' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${immediateFeedback ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {immediateFeedback && <Check className="h-3 w-3" />}
                  </span>
                  <span className="font-bold text-xs text-slate-800 dark:text-white">למידה מהירה (הסבר מיידי)</span>
                </div>
                <p className="text-xxs text-slate-400 pr-6.5">תשובה נכונה/שגויה והסברים יוצגו מיד לאחר המענה על כל שאלה.</p>
              </div>

              <div 
                onClick={() => setImmediateFeedback(false)}
                className={`p-4 rounded-2xl border-2 cursor-pointer text-right transition-all ${
                  !immediateFeedback 
                    ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-500/5' 
                    : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${!immediateFeedback ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'}`}>
                    {!immediateFeedback && <Check className="h-3 w-3" />}
                  </span>
                  <span className="font-bold text-xs text-slate-800 dark:text-white">סימולציה מלאה (בדיקה בסוף המבחן)</span>
                </div>
                <p className="text-xxs text-slate-400 pr-6.5">מענה חלקי כרגיל, יצירת פוטנציאל סימון, והצינות וההסברים המלאים יוצגו רק בסוף הבחינה.</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex gap-2.5 mt-4">
          <button 
            onClick={handleStart}
            id="btn-quiz-runner-start"
            className="w-full bg-indigo-600 hover:bg-indigo-505 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md text-center cursor-pointer text-xs"
          >
            התחל את הסימולציה
          </button>
          
          <button 
            onClick={onBackToDashboard}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs"
          >
            חזרה ללוח
          </button>
        </div>
      </div>
    );
  }

  // Active quiz screen
  if (phase === 'active' && currentQuestion && session) {
    const isFlaged = session.flaggedQuestions.includes(currentQuestion.id);
    const progressPercent = Math.round(((currentIndex + 1) / session.questions.length) * 100);

    return (
      <div className="max-w-5xl mx-auto space-y-3.5 text-right" dir="rtl">
        
        {/* Top Control Bar Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-3 shadow-xs border border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-3">
          
          {/* Progress indicators wrapper */}
          <div className="flex items-center gap-4">
            <span className="text-xs bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold px-3.5 py-1.5 rounded-full">
              שאלה {currentIndex + 1} מתוך {session.questions.length}
            </span>
            <div className="hidden sm:block w-32 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>

          {/* Flags & Timer Controls */}
          <div className="flex items-center gap-3">
            
            {/* Countdown Clock */}
            {isTimed && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold leading-none ${
                secondsLeft <= 60 
                  ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/20 animate-pulse' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                <Clock className="h-4 w-4" />
                <span>{formatTime(secondsLeft)}</span>
              </div>
            )}

            {/* Flag toggle */}
            <button
              onClick={handleToggleFlag}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isFlaged 
                  ? 'bg-amber-500/15 border-amber-300/40 text-amber-500' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-400 hover:text-slate-600'
              }`}
              title="סמן שאלה זו לסקירה חוזרת (מקש F)"
            >
              <Flag className={`h-4.5 w-4.5 ${isFlaged ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Dynamic Card Question Info */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-3.5 md:p-4 shadow-sm border border-slate-100 dark:border-indigo-950/40 space-y-2.5">
          
          {/* Metadata line */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/50 pb-2.5">
            <span className="text-xxs bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full font-bold text-slate-500 dark:text-slate-400">
              נושא: {currentQuestion.subtopic}
            </span>
            <span className={`text-xxs px-3 py-1.5 rounded-full font-bold outline-transparent ${
              currentQuestion.difficulty === 'קל' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
              currentQuestion.difficulty === 'בינוני' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
              'bg-red-100 text-red-750 dark:bg-red-500/10 dark:text-red-400'
            }`}>
              רמת קושי: {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-[17px] md:text-[19px] font-black text-slate-800 dark:text-white leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Selectable Options Deck */}
          <div className="space-y-1.5 pt-1.5">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              
              // Colors configuration based on mode and choice
              let optionStyle = "border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors";
              let badgeStyle = "bg-slate-100 dark:bg-slate-900 text-slate-500";
              let decorationIcon = null;

              if (isSelected) {
                optionStyle = "border-indigo-600 bg-indigo-50/20 dark:bg-indigo-500/5 font-bold";
                badgeStyle = "bg-indigo-600 text-white";
              }

              if (immediateFeedback && hasCheckedAnswer) {
                const isCorrect = idx === currentQuestion.correctAnswer;
                if (isCorrect) {
                  optionStyle = "border-green-500 bg-green-50/25 dark:bg-green-500/5 font-bold text-green-800 dark:text-green-300";
                  badgeStyle = "bg-green-500 text-white";
                  decorationIcon = <Check className="h-4 w-4 shrink-0" />;
                } else if (isSelected) {
                  optionStyle = "border-red-500 bg-red-50/25 dark:bg-red-500/5 text-red-800 dark:text-red-300";
                  badgeStyle = "bg-red-500 text-white";
                  decorationIcon = <X className="h-4 w-4 shrink-0" />;
                }
              }

              return (
                <div 
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`py-1.5 px-3 md:py-2 md:px-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer text-right text-[13.5px] md:text-[14.5px] leading-snug group ${optionStyle}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`h-5.5 w-5.5 rounded-md flex items-center justify-center font-extrabold text-xs ${badgeStyle} shrink-0`}>
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{option}</span>
                  </div>
                  {decorationIcon}
                </div>
              );
            })}
          </div>

          {/* Prompt checker on immediate feedback mode */}
          {immediateFeedback && selectedOption !== null && !hasCheckedAnswer && (
            <button
              onClick={handleCheckImmediate}
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md text-center text-sm cursor-pointer animate-fade-in"
            >
              בדוק תשובה
            </button>
          )}

          {/* Help hints / additional drawer links */}
          <div className="flex flex-wrap gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-700/50">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                showHint 
                  ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-500/10 dark:border-rose-500/20' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>רמז מסייע של סיסקו</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAdditional(!showAdditional)}
              className={`py-2 px-3.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                showAdditional 
                  ? 'bg-orange-50 border-orange-200 text-orange-600 dark:bg-orange-500/10 dark:border-orange-500/20' 
                  : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>מידע נוסף ופקודות CLI להבנה</span>
            </button>
          </div>

          {/* Hint view drawer */}
          {showHint && (
            <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200/50 dark:border-rose-900/30 p-5 rounded-2xl text-[14px] md:text-[15px] text-rose-950 dark:text-rose-200 leading-relaxed animate-slide-down">
              <span className="font-black block mb-1.5">💡 רמז לפתרון השאלה:</span>
              <p className="font-medium">{currentQuestion.hint}</p>
            </div>
          )}

          {/* Additional text block view drawer */}
          {showAdditional && (
            <div className="bg-orange-50/50 dark:bg-orange-950/10 border border-orange-200/50 dark:border-orange-900/30 p-5 rounded-2xl text-[14px] md:text-[15px] text-orange-950 dark:text-orange-200 leading-relaxed animate-slide-down">
              <span className="font-black block mb-1.5">📘 פקודת CLI / טקסט מנומוני להבנה מהירה:</span>
              <p className="whitespace-pre-line font-mono font-medium">{currentQuestion.additionalInfo}</p>
              {currentQuestion.references && (
                <span className="block mt-3 text-xs opacity-75">הפניה לסמינר רשמי: {currentQuestion.references}</span>
              )}
            </div>
          )}

          {/* Explanation block if checked and incorrect on immediate feedback mode */}
          {immediateFeedback && hasCheckedAnswer && (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 p-5.5 rounded-2xl text-[14.5px] md:text-[15.5px] leading-relaxed animate-fade-in space-y-2.5">
              <span className="font-black text-slate-900 dark:text-white text-[15.5px] md:text-[16.5px] block">💡 הסבר פתרון מעמיק:</span>
              <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        {/* Next / Prev / Finish Controls Container */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700/50 flex items-center justify-between gap-4">
          
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 p-3.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 dark:text-slate-300 transition-colors flex items-center gap-1 cursor-pointer text-xs font-bold"
          >
            <ChevronRight className="h-4 w-4" />
            <span>שאלה הקודמת</span>
          </button>

          {/* Middle context Indicator */}
          <span className="text-xxs font-black text-slate-400">
            {currentIndex + 1} / {session.questions.length}
          </span>

          {currentIndex === session.questions.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              disabled={immediateFeedback && selectedOption === null}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-xs cursor-pointer flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>הגש מבחן וחשב ציון</span>
              <Check className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={immediateFeedback && !hasCheckedAnswer}
              className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md text-xs cursor-pointer flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>לשאלה הבאה</span>
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

        </div>

        {/* Keyboard Shortcuts Quick Guide Banner */}
        <div className="hidden sm:flex bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-xl p-3 items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm">⌨️</span>
            <span className="font-bold">ניווט מהיר במקלדת:</span>
            <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">1-4</kbd> לבחירת תשובה</span>
            <span className="opacity-40">|</span>
            <span>מקשי החיצים <kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">→</kbd> ו-<kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">←</kbd> למעבר בין שאלות</span>
            {immediateFeedback && (
              <>
                <span className="opacity-40">|</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">Enter</kbd> או <kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">Space</kbd> לבדיקה</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span><kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">F</kbd> סימון בדגל</span>
            <span><kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">H</kbd> רמז</span>
            <span><kbd className="px-1 py-0.2 bg-white dark:bg-slate-800 border rounded">M</kbd> פקודות CLI</span>
          </div>
        </div>

      </div>
    );
  }

  // Results display sheet
  if (phase === 'results' && quizResult && session) {
    const isSuccess = quizResult.score >= 80;

    return (
      <div className="max-w-5xl mx-auto space-y-8 text-right animate-fade-in" dir="rtl">
        
        {/* Confetti element or beautiful Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 relative overflow-hidden shadow-md text-center space-y-4">
          
          <span className="text-5xl block animate-bounce">
            {isSuccess ? '🎉🏆' : '📚💪'}
          </span>
          
          <h2 className="text-3xl font-black">
            {isSuccess ? 'כל הכבוד! ציון מצוין!' : 'עבודה יפה! המשך לתרגל'}
          </h2>
          
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            {isSuccess 
              ? `עברת בהצלחה את מבחן הסימולציה עם ציון גבוה למבחן ה-CCNA. המשך כך!`
              : `אימון מעולה. מומלץ לעבור על השאלות השגויות שלמטה ולהתמקד בהסברים.`}
          </p>

          <div className="flex justify-center gap-8 py-4">
            <div>
              <span className={`text-6xl font-black block ${isSuccess ? 'text-green-400' : 'text-amber-400'}`}>
                {quizResult.score}%
              </span>
              <span className="text-xs text-slate-400 font-bold block mt-1">ציון סופי</span>
            </div>

            <div className="border-l border-slate-705/50"></div>

            <div className="text-right flex flex-col justify-center">
              <span className="text-slate-300 text-xs block">נכון: <strong className="text-green-400 text-sm font-extrabold">{quizResult.correctCount} שאלות</strong></span>
              <span className="text-slate-300 text-xs block">שגוי: <strong className="text-red-400 text-sm font-extrabold">{session.questions.length - quizResult.correctCount} שאלות</strong></span>
              <span className="text-slate-300 text-xs block">סה"כ שאלות: <span className="font-extrabold">{session.questions.length}</span></span>
            </div>
          </div>

          <div className="inline-block bg-white/10 border border-white/15 px-4 py-2 rounded-2xl text-xs font-bold text-indigo-200">
            צברת <span className="text-white font-black">{quizResult.pointsGained} XP</span> נקודות לתקציב הלמידה שלך!
          </div>
        </div>

        {/* Unlocked Badges Alerts */}
        {quizResult.unlockedBadges.length > 0 && (
          <div className="bg-indigo-500/10 border border-indigo-400/20 p-5 rounded-3xl text-xs text-indigo-300 flex items-center gap-4 animate-bounce">
            <span className="text-4xl">👑</span>
            <div className="text-right">
              <h4 className="font-extrabold text-sm text-white">הישג חדש נפתח!</h4>
              <p className="text-indigo-200 mt-1">
                פתחת בהצלחה את תג/י הכבוד הבאים: <strong>{quizResult.unlockedBadges.map(b => b === 'first_quiz' ? 'הצעד הראשון' : b === 'perfect_score' ? 'רשת מושלמת' : b === 'quiz_enthusiast' ? 'מהנדס מתמיד' : b === 'points_grandmaster' ? 'מאסטר סאבנט' : 'אינסטלטור רשתות').join(', ')}</strong>. המשך כך!
              </p>
            </div>
          </div>
        )}

        {/* Detailed Question Review Sheet */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">בחינת השאלות והתשובות שבוצעו במבחן</h3>
          
          <div className="space-y-4">
            {session.questions.map((q, qidx) => {
              const userAnswer = session.userAnswers[q.id];
              const isCorrect = userAnswer != null && userAnswer == q.correctAnswer;
              
              return (
                <div 
                  key={q.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700/50 pb-3 text-xs">
                    <span className="font-extrabold text-slate-700 dark:text-slate-200">שאלה {qidx + 1}</span>
                    <span className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 ${
                      isCorrect 
                        ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' 
                        : 'bg-red-100 text-red-750 dark:bg-red-500/10 dark:text-red-400'
                    }`}>
                      {isCorrect ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                      {isCorrect ? 'נכון' : 'שגוי'}
                    </span>
                  </div>

                  <p className="font-bold text-slate-800 dark:text-white leading-relaxed">{q.question}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 block mb-1">התשובה שבחרת:</span>
                      <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                        {userAnswer !== undefined ? q.options[userAnswer] : 'ללא תשובה'}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400 block mb-1">התשובה הנכונה הרשמית:</span>
                      <span className="font-bold text-green-600">{q.options[q.correctAnswer]}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-[14px] md:text-[15px] text-slate-800 dark:text-slate-200 leading-relaxed">
                    <span className="font-black text-slate-900 dark:text-white block mb-1.5">💡 הסבר פתרון מעמיק ל-CCNA:</span>
                    <p className="font-medium leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions links */}
        <div className="flex gap-4">
          <button 
            onClick={onBackToDashboard}
            className="w-1/2 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-md text-center cursor-pointer flex items-center justify-center gap-2"
          >
            <Home className="h-4.5 w-4.5" />
            חזרה למסך הראשי
          </button>
          
          <button 
            onClick={() => {
              setPhase('setup');
              setActiveSessionId(null);
              setQuizResult(null);
            }}
            className="w-1/2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-4 px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-4.5 w-4.5" />
            מבחן חדש בהתאמה אישית
          </button>
        </div>

      </div>
    );
  }

  return null;
}
