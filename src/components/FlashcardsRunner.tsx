import React, { useState } from 'react';
import { useCCNAStore } from '../store/useCCNAStore';
import { CCNAQuestion } from '../types';
import { 
  Zap, HelpCircle, ArrowLeft, RotateCcw, Award, CheckCircle2, Bookmark, Flame, Info, X
} from 'lucide-react';

interface FlashcardsRunnerProps {
  onBackToDashboard: () => void;
}

export default function FlashcardsRunner({ onBackToDashboard }: FlashcardsRunnerProps) {
  const { questions, flashcards, rateFlashcard } = useCCNAStore();

  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const [studyMode, setStudyMode] = useState<'due' | 'unlimited'>('due');
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Generate study lists
  // Due cards
  const now = Date.now();
  const dueQuestions = questions.filter(q => {
    const progress = flashcards[q.id];
    if (!progress) return true; // Unopened cards are due!
    return progress.nextReviewTimestamp <= now;
  });

  const activeQuestionsList = studyMode === 'due' ? dueQuestions : questions;
  const currentQuestion: CCNAQuestion | undefined = activeQuestionsList[sessionIndex];

  const handleRate = (rating: 'קל' | 'בינוני' | 'קשה' | 'שכחתי') => {
    if (!currentQuestion) return;

    rateFlashcard(currentQuestion.id, rating);
    setIsFlipped(false);
    
    // Move to next card, or wrap up
    if (sessionIndex < activeQuestionsList.length - 1) {
      setSessionIndex(sessionIndex + 1);
    } else {
      setSessionIndex(activeQuestionsList.length); // complete
    }
  };

  const handleResetDeck = () => {
    setSessionIndex(0);
    setIsFlipped(false);
  };

  React.useEffect(() => {
    if (!currentQuestion) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in inputs (just in case)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const key = e.key.toLowerCase();

      if (!isFlipped) {
        // Space, Enter, or Up/Down arrows to flip
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsFlipped(true);
        }
      } else {
        // 1-4 ratings
        if (['1', '2', '3', '4'].includes(key)) {
          e.preventDefault();
          const ratings: ('שכחתי' | 'קשה' | 'בינוני' | 'קל')[] = ['שכחתי', 'קשה', 'בינוני', 'קל'];
          handleRate(ratings[parseInt(key, 10) - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, isFlipped]);

  return (
    <div className="max-w-5xl mx-auto space-y-4 text-right animate-fade-in" dir="rtl">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-4.5 shadow-xs border border-slate-100 dark:border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="bg-indigo-50 dark:bg-indigo-500/10 p-2.5 rounded-xl shrink-0 text-indigo-600 dark:text-indigo-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-800 dark:text-white leading-tight">כרטיסיות שינון מבוססות מרווחים (SM-2)</h2>
              <button
                onClick={() => setShowInfoModal(true)}
                className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg text-xs font-bold border border-indigo-200/30 transition-all cursor-pointer shadow-2xs"
                title="איך עובדת שיטת השינון המרווח?"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>הסבר על השיטה</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">האלגוריתם מציג שאלות שוב בדיוק בשניה שאתה עומד לשכוח אותן.</p>
          </div>
        </div>

        {/* Toggle Mode Deck */}
        <div className="flex bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 rounded-xl shrink-0">
          <button
            onClick={() => {
              setStudyMode('due');
              setSessionIndex(0);
              setIsFlipped(false);
            }}
            id="btn-flashcards-mode-due"
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studyMode === 'due' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            כרטיסיות לסקירה היום ({dueQuestions.length})
          </button>
          
          <button
            onClick={() => {
              setStudyMode('unlimited');
              setSessionIndex(0);
              setIsFlipped(false);
            }}
            id="btn-flashcards-mode-unlimited"
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              studyMode === 'unlimited' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
            }`}
          >
            אימון חופשי ({questions.length})
          </button>
        </div>
      </div>

      {/* Main Study Deck Card */}
      {currentQuestion ? (
        <div className="space-y-4">
          
          <div className="text-center text-xs font-extrabold text-slate-400">
            כרטיסיה {sessionIndex + 1} מתוך {activeQuestionsList.length}
          </div>

          {/* 3D Flappable Card Wrapper */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            id="flashcard-3d-box"
            className={`w-full min-h-[340px] md:min-h-[380px] bg-white dark:bg-slate-800 rounded-2xl border shadow-sm transition-all transform hover:scale-[1.005] cursor-pointer flex flex-col justify-between p-6 md:p-8 relative overflow-hidden ${
              isFlipped 
                ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/5 dark:bg-indigo-950/5' 
                : 'border-slate-200/80 dark:border-slate-800/80'
            }`}
          >
            
            {/* Design accents */}
            <div className="absolute top-5 left-5 text-xs bg-slate-100 dark:bg-slate-900 px-3.5 py-1.5 rounded-full text-slate-500 dark:text-slate-400 font-mono font-bold uppercase border border-slate-200/50 dark:border-slate-800">
              {currentQuestion.domain.replace('_', ' ')}
            </div>

            <div className="absolute top-5 right-5 text-xs font-extrabold text-indigo-500">
              {isFlipped ? 'גב הכרטיסיה - פתרון' : 'חזית הכרטיסיה - שאלה'}
            </div>

            {/* Flashcard Content Text */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                /* FRONT content */
                <div className="space-y-2.5 animate-fade-in text-center">
                  <span className="text-3xl block">❓</span>
                  <h3 className="text-[18px] md:text-[20px] font-black text-slate-850 dark:text-white leading-snug max-w-2xl mx-auto">
                    {currentQuestion.question}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 font-extrabold pt-1.5">לחץ בכל מקום כדי לחשוף את התשובה וההסברים</p>
                </div>
              ) : (
                /* BACK content */
                <div className="space-y-3.5 animate-fade-in text-center">
                  <span className="text-3xl block">💡</span>
                  <div className="space-y-0.5">
                    <span className="text-xs font-extrabold text-indigo-400 block">תשובת מפתח ה-CCNA:</span>
                    <h4 className="text-[16px] md:text-[18px] font-black text-green-600 dark:text-green-400 leading-snug max-w-2xl mx-auto">
                      {currentQuestion.options[currentQuestion.correctAnswer]}
                    </h4>
                  </div>

                  <div className="border-t border-slate-200 dark:border-slate-700/65 pt-2.5 text-[14.5px] md:text-[15.5px] max-w-2xl mx-auto text-slate-800 dark:text-slate-200 leading-relaxed text-right space-y-1.5">
                    <span className="font-black text-slate-900 dark:text-white block text-sm md:text-base">הסבר מקיף של מנהל רשת:</span>
                    <p className="normal-case leading-relaxed font-medium">{currentQuestion.explanation}</p>
                    {currentQuestion.additionalInfo && (
                      <p className="text-xs md:text-[13px] text-amber-900 dark:text-amber-300 bg-amber-500/5 p-3 rounded-xl border border-amber-550/20 mt-2 font-mono whitespace-pre-line text-left" dir="ltr">{currentQuestion.additionalInfo}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer Hint bar */}
            {!isFlipped && (
              <div className="text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2.5 rounded-xl flex items-center justify-center gap-1.5 max-w-xs mx-auto animate-pulse">
                <Bookmark className="h-4 w-4 text-indigo-500" />
                <span>טיפ: {currentQuestion.subtopic}</span>
              </div>
            )}
          </div>

          {/* SM-2 Rating Controls - Visible only when flipped! */}
          {isFlipped ? (
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/50 space-y-4 animate-slide-up">
              <h4 className="text-sm font-bold text-slate-800 dark:text-white text-center">כמה טוב זכרת את שאלת המפתח הזו?</h4>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <button
                  type="button"
                  onClick={() => handleRate('שכחתי')}
                  className="bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/15 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 p-4.5 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center gap-1.5 group relative"
                >
                  <span className="text-2xl">🔴</span>
                  <span className="font-bold text-xs">שכחתי לגמרי</span>
                  <span className="text-xxs opacity-65">חזרה מחר (1ד)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRate('קשה')}
                  className="bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/15 border border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 p-4.5 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center gap-1.5 group relative"
                >
                  <span className="text-2xl">🟡</span>
                  <span className="font-bold text-xs">קשה לשינון</span>
                  <span className="text-xxs opacity-65">מרווח מקורב</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRate('בינוני')}
                  className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:hover:bg-blue-500/15 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 p-4.5 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center gap-1.5 group relative"
                >
                  <span className="text-2xl">🔵</span>
                  <span className="font-bold text-xs">זכרתי בינוני</span>
                  <span className="text-xxs opacity-65">הגדלת מרווח</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRate('קל')}
                  className="bg-green-50 hover:bg-green-100 dark:bg-green-500/10 dark:hover:bg-green-500/15 border border-green-200 dark:border-green-500/20 text-green-600 dark:text-green-400 p-4.5 rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center gap-1.5 group relative"
                >
                  <span className="text-2xl">🟢</span>
                  <span className="font-bold text-xs">קל מאוד</span>
                  <span className="text-xxs opacity-65">הכפלת מרווחים</span>
                </button>

              </div>
            </div>
          ) : (
            <div className="text-center text-xs text-slate-400 leading-normal">
              בחר את התשובה בלב, לחץ על הכרטיסיה כדי לבדוק את עצמך, וסווג את האופן שתחשוב לנכון.
            </div>
          )}

          {/* Keyboard Shortcuts Quick Guide Banner - Always Visible when card is active */}
          <div className="hidden sm:flex bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/60 rounded-xl p-2.5 items-center justify-center gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
            <span>⌨️</span>
            {!isFlipped ? (
              <>
                <span className="font-bold text-slate-650 dark:text-slate-350">מקשי קיצור מהירים:</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">Space</kbd> או <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">Enter</kbd> כדי לחשוף את התשובה וההסברים</span>
              </>
            ) : (
              <>
                <span className="font-bold text-slate-650 dark:text-slate-350">מקשי דירוג מהירים:</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">1</kbd> לשכחתי</span>
                <span className="opacity-45">|</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">2</kbd> לקשה</span>
                <span className="opacity-45">|</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">3</kbd> לבינוני</span>
                <span className="opacity-45">|</span>
                <span>הקש <kbd className="px-1 py-0.2 bg-white dark:bg-slate-850 border rounded font-mono">4</kbd> לקל מאוד</span>
              </>
            )}
          </div>

        </div>
      ) : (
        /* DECK COMPLETE SHEET */
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-md border border-slate-100 dark:border-slate-700/50 text-center space-y-6 animate-fade-in">
          <span className="text-5xl block animate-bounce">🦖🎉</span>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">סיימת את כל כרטיסיות הסקירה!</h2>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
            {studyMode === 'due' 
              ? 'תותח רשתות! עברת בהצלחה על כל הכרטיסיות שנקבעו להיום. המוח שלך קיבע את הנתונים לעומק.'
              : 'מצוין! סיימת הרצה מלאה של כל קטלוג שאלות ה-CCNA התאורטיות.'}
          </p>

          <div className="flex justify-center gap-4 max-w-xs mx-auto pt-4">
            <button
              onClick={handleResetDeck}
              className="w-1/2 bg-indigo-600 hover:bg-indigo-505 text-white font-bold py-3.5 px-5 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1 text-xs"
            >
              <RotateCcw className="h-4 w-4" />
              התחל סיבוב חדש
            </button>
            <button
              onClick={onBackToDashboard}
              className="w-1/2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3.5 px-5 rounded-xl transition-all cursor-pointer text-xs"
            >
              חזרה ללוח
            </button>
          </div>
        </div>
      )}

      {/* Bottom bar back */}
      {currentQuestion && (
        <button
          onClick={onBackToDashboard}
          className="text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer mr-auto animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          ביטול וחזרה למסך הראשי
        </button>
      )}

      {/* Explanation Modal Dialog */}
      {showInfoModal && (
        <div 
          className="fixed inset-0 bg-slate-400/10 dark:bg-slate-950/75 backdrop-blur-[2.5px] flex items-center justify-center z-50 p-4 overflow-y-auto animate-fade-in" 
          dir="rtl"
          onClick={() => setShowInfoModal(false)}
        >
          <div 
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-2xl w-full rounded-2xl overflow-hidden my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 px-5 py-4 shrink-0">
              <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
                <span>🧠</span>
                <span>כיצד עובדת שיטת השינון המרווח (Spaced Repetition)?</span>
              </h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 text-xs md:text-sm leading-relaxed text-slate-600 dark:text-slate-300 overflow-y-auto">
              
              <div>
                <h4 className="font-extrabold text-slate-800 dark:text-white mb-0.5">💡 מהו הרעיון המרכזי?</h4>
                <p className="text-slate-650 dark:text-slate-350 text-[12.5px] leading-relaxed">
                  שינון במרווחים (Spaced Repetition) הוא עיקרון קוגניטיבי מוכח שנועד להילחם ב"עקומת השכחה" של המוח האנושי.
                  במקום לשנן את אותו מידע שוב ושוב באותו יום ללא תועלת, האלגוריתם מרווח את החזרות ומציג לך את שאלות המפתח 
                  <strong> בדיוק ברגע שבו אתה עומד לשכוח אותן</strong>. כתוצאה מכך, המידע מחלחל מהזיכרון לטווח קצר אל הזיכרון לטווח ארוך ביעילות מקסימלית ובמינימום מאמץ.
                </p>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-800 dark:text-white mb-1.5">📊 מה עומד מאחורי ארבעת מקשי הדירוג?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  
                  <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/10 dark:border-red-500/20 p-2.5 rounded-xl space-y-0.5">
                    <span className="font-bold text-red-600 dark:text-red-400 block text-[11.5px]">🔴 שכחתי לגמרי (מקש 1)</span>
                    <p className="text-[10.5px] leading-normal text-slate-500 dark:text-slate-400">
                      לא זכרת את התשובה כלל. האלגוריתם מאפס את מרווח הזמן ל-1 יום, כדי שהכרטיסייה תופיע שוב בסבב הבא ותקובע מחדש בראש.
                    </p>
                  </div>

                  <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/20 p-2.5 rounded-xl space-y-0.5">
                    <span className="font-bold text-amber-650 dark:text-amber-400 block text-[11.5px]">🟡 קשה לשינון (מקש 2)</span>
                    <p className="text-[10.5px] leading-normal text-slate-500 dark:text-slate-400">
                      הצלחת להיזכר אבל רק לאחר מאמץ קוגניטיבי רב. האלגוריתם שומר על מרווח חזרה קצר יחסית ומפחית את מדד הקלות של השאלה.
                    </p>
                  </div>

                  <div className="bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 dark:border-blue-500/20 p-2.5 rounded-xl space-y-0.5">
                    <span className="font-bold text-blue-650 dark:text-blue-400 block text-[11.5px]">🔵 זכרתי בינוני (מקש 3)</span>
                    <p className="text-[10.5px] leading-normal text-slate-500 dark:text-slate-400">
                      זכרת את התשובה הנכונה לאחר השתהות קלה או קושי ממוצע. מרווח החזרה הבא יוגדל במידה מתונה, והשאלה תתוזמן לעוד מספר ימים.
                    </p>
                  </div>

                  <div className="bg-green-500/5 dark:bg-green-500/10 border border-green-500/10 dark:border-green-500/20 p-2.5 rounded-xl space-y-0.5">
                    <span className="font-bold text-green-650 dark:text-green-400 block text-[11.5px]">🟢 קל מאוד (מקש 4)</span>
                    <p className="text-[10.5px] leading-normal text-slate-500 dark:text-slate-400">
                      שלפת את התשובה מיד וללא כל היסוס. האלגוריתם יכפיל משמעותית את המרווח הבא כדי שלא תבזבז עליה זמן יקר.
                    </p>
                  </div>

                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/50 space-y-1 text-[11px] text-indigo-950 dark:text-indigo-200">
                <span className="font-extrabold text-indigo-900 dark:text-indigo-300 block">🚀 למה זה קריטי עבור בחינת ה-CCNA 200-301?</span>
                <p className="leading-relaxed">
                  חומר הבחינה של סיסקו כולל מאות פרטים יבשים, פקודות CLI ספציפיות, ערכי AD של פרוטוקולים (OSPF=110, EIGRP=90), מספרי פורטים (HTTPS=443, SSH=22), ומנגנונים מורכבים. שימוש יומי בכרטיסיות מבטיח שכל הפרטים הקריטיים הללו יישמרו טריים בזיכרון המיידי שלך לקראת יום המבחן!
                </p>
              </div>

            </div>

            {/* Footer Close button */}
            <div className="flex justify-end p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setShowInfoModal(false)}
                className="bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 px-5 rounded-xl transition-all shadow-md cursor-pointer text-xs"
              >
                סגור והמשך ללמוד
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
