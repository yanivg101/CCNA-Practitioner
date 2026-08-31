import React, { useState } from 'react';
import { useCCNAStore } from '../store/useCCNAStore';
import { DomainID } from '../types';
import { ccnaDomainsList } from '../data/questions';
import { 
  Zap, Award, Flame, BookOpen, Calculator, Database, BookMarked, HelpCircle, 
  RotateCcw, ShieldAlert, BadgeInfo, CheckCircle2, ChevronLeft, Target, AlertTriangle, CheckCircle
} from 'lucide-react';

interface DashboardProps {
  onStartQuiz: (domainId: DomainID | 'all' | 'weak') => void;
  onNavigate: (view: 'dashboard' | 'quiz' | 'flashcards' | 'subnetting' | 'database' | 'glossary') => void;
}

export default function Dashboard({ onStartQuiz, onNavigate }: DashboardProps) {
  const { points, streak, questions, flashcards, history, getWeakDomains, resetProgress } = useCCNAStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  // Derived stats
  const level = Math.floor(points / 250) + 1;
  const xpNeededForNextLevel = 250 - (points % 250);
  const percentToNextLevel = Math.round(((points % 250) / 250) * 100);

  // Circular progress data
  const answeredCount = Object.keys(flashcards).length;
  const totalQuestions = questions.length;
  const overallProgressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Weak domains calculated dynamically
  const weakDomains = getWeakDomains();
  const topWeakDomains = weakDomains.filter(d => d.totalCount > 0 && d.successRate < 80).slice(0, 3);

  // Complete history sessions counting
  const completedHistorySessions = Object.values(history).filter(s => s.completedAt !== null);

  const getDayGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 5) return 'לילה טוב, זמן מצוין לתרגול שקט! 🦉';
    if (hours < 12) return 'בוקר טוב, נתחיל ללמוד? ☀️';
    if (hours < 18) return 'צהריים טובים, זמן פנטסטי ל-CCNA! ⚡';
    return 'ערב טוב, לילה שקט לתרגול מוצלח! 🌙';
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    resetProgress();
    setShowResetConfirm(false);
    setShowResetSuccess(true);
    setTimeout(() => {
      setShowResetSuccess(false);
    }, 4000);
  };

  return (
    <div className="space-y-3.5 text-right font-sans" dir="rtl">
      
      {/* 1. HERO GREETING PANEL - SPACED TIGHTLY */}
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/80 dark:from-indigo-950 dark:via-slate-900 dark:to-indigo-950 text-slate-900 dark:text-white rounded-2xl p-4 md:p-5 relative overflow-hidden shadow-sm border border-indigo-100 dark:border-slate-800/50">
        
        {/* Decorative subtle glows */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center relative z-10">
          
          <div className="flex-1 md:w-[700px] md:max-w-[700px] md:h-[183px] flex flex-col justify-between py-1 text-right">
            <div className="space-y-1.5">
              <span className="text-3xs bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 px-2.5 py-1 rounded-full font-bold text-indigo-700 dark:text-indigo-300 inline-block uppercase tracking-wide">
                סימולטור הלמידה הרשמי ל-CCNA 200-301
              </span>
              
              <h2 className="text-lg md:text-[22px] font-black leading-tight text-slate-900 dark:text-white select-none md:w-[700px] md:max-w-[700px]">
                {getDayGreeting()}
              </h2>
              
              <p className="text-2xs md:text-[13px] text-slate-700 dark:text-slate-100 font-medium leading-relaxed md:w-[700px] md:max-w-[700px]">
                אפליקציית ההכנה המתקדמת ביותר לעולם הרשתות של סיסקו בעברית. כאן תמצא <strong className="text-indigo-700 dark:text-indigo-300">{totalQuestions} שאלות</strong> מדויקות, תרגול סאבנט אינטראקטיבי, כרטיסיות שינון, ומילון מונחים מלא.
              </p>
            </div>

            {/* XP Progress Bar towards Next Level */}
            <div className="pt-2 max-w-xs space-y-1">
              <div className="flex justify-between text-3xs font-extrabold text-slate-600 dark:text-slate-300">
                <span>רמה {level}</span>
                <span>עד לרמה הבאה: {xpNeededForNextLevel} XP</span>
                <span>רמה {level + 1}</span>
              </div>
              
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden border border-slate-300/40 dark:border-white/5">
                <div 
                  className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${percentToNextLevel}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Premium Glassmorphism Box for Rocket Stats - Purposeful contrast and background distinction */}
          <div className="w-[183px] h-[183px] bg-indigo-500/5 dark:bg-slate-950/70 border border-indigo-200 dark:border-indigo-500/30 backdrop-blur-md rounded-xl flex flex-col items-center justify-center p-4 gap-2.5 shadow-inner shrink-0 text-center">
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-3xl animate-bounce leading-none">🚀</span>
              <div>
                <span className="text-4xs font-black tracking-wider text-indigo-700 dark:text-indigo-300 block uppercase font-mono">CCNA READY</span>
                <span className="text-xs text-slate-550 dark:text-slate-400 block font-bold leading-none mt-1">התקדמות כללית</span>
              </div>
            </div>
            <div className="mt-1">
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-300">{overallProgressPercent}%</div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STATS OVERVIEW BENTO GRID - COMPACT ROW BASED LAYOUTS AS REQUESTED */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        
        {/* Score Card */}
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/65 shadow-xs flex flex-col justify-between gap-1 transition-colors">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-amber-500/10 text-amber-500 rounded-lg inline-block shrink-0">
              <Award className="h-4.5 w-4.5" />
            </span>
            <span className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 font-extrabold truncate">נקודות זכות (Score)</span>
          </div>
          <strong className="text-[13.5px] md:text-[15px] text-slate-900 dark:text-white font-black pr-6">{points.toLocaleString()} XP</strong>
        </div>

        {/* Streak Card */}
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/65 shadow-xs flex flex-col justify-between gap-1 transition-colors">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-orange-500/10 text-orange-500 rounded-lg inline-block shrink-0">
              <Flame className="h-4.5 w-4.5 fill-current animate-pulse" />
            </span>
            <span className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 font-extrabold truncate">רצף למידה רציף</span>
          </div>
          <strong className="text-[13.5px] md:text-[15px] text-slate-900 dark:text-white font-black pr-6">{streak} ימים רצופים</strong>
        </div>

        {/* Completed Simulations Card */}
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/65 shadow-xs flex flex-col justify-between gap-1 transition-colors">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-indigo-500/10 text-indigo-500 rounded-lg inline-block shrink-0">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </span>
            <span className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 font-extrabold truncate">סימולציות שהושלמו</span>
          </div>
          <strong className="text-[13.5px] md:text-[15px] text-slate-900 dark:text-white font-black pr-6">{completedHistorySessions.length} מבחנים</strong>
        </div>

        {/* Offline Pool Questions Card */}
        <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/65 shadow-xs flex flex-col justify-between gap-1 transition-colors">
          <div className="flex items-center gap-1.5">
            <span className="p-1 bg-teal-500/10 text-teal-500 rounded-lg inline-block shrink-0">
              <Database className="h-4.5 w-4.5" />
            </span>
            <span className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 font-extrabold truncate">שאלות במאגר</span>
          </div>
          <strong className="text-[13.5px] md:text-[15px] text-slate-900 dark:text-white font-black pr-6">{totalQuestions} שאלות</strong>
        </div>

      </div>

      {/* 3. DYNAMIC WEAK REGIONS TRACKER SHEET - ICON & TITLE IN ONE ROW + DATA AND ACTION BELOW */}
      {topWeakDomains.length > 0 && (
        <div className="bg-red-50/30 dark:bg-red-950/10 border border-red-200 dark:border-red-900/30 p-4 md:p-5 rounded-2xl space-y-3 shadow-xs">
          <div className="flex items-center gap-2 border-b border-red-100 dark:border-red-900/20 pb-2">
            <ShieldAlert className="h-5.5 w-5.5 text-red-600 dark:text-red-400 shrink-0" />
            <div>
              <h3 className="font-extrabold text-sm md:text-base text-[#9f0c0e] dark:text-red-400 leading-none">אזורי תרגול חלשים שזוהו אוטומטית</h3>
              <p className="text-xs text-slate-650 dark:text-slate-350 mt-1">פתרת פחות מ-80% נכון בקטגוריות הללו. מומלץ לחזק אותן מיידית.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {topWeakDomains.map((dom) => {
              const domDetails = ccnaDomainsList.find(d => d.id === dom.domainId);
              return (
                <div 
                  key={dom.domainId}
                  className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-red-100 dark:border-slate-800/80 flex flex-col justify-between gap-2.5 shadow-xs transition-transform hover:translate-y-[-1px]"
                >
                  <div className="space-y-2">
                    {/* Icon and title arranged on ONE LINE as highly requested */}
                    <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                      <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                      <span className="text-xs md:text-[13px] font-extrabold truncate block flex-1 select-none text-slate-900 dark:text-slate-100">{domDetails?.name}</span>
                    </div>
                    
                    {/* Data spread below in a separate line */}
                    <div className="flex justify-between items-center text-xs pt-1.5 border-t border-slate-100 dark:border-slate-850">
                      <span className="font-extrabold text-slate-600 dark:text-slate-400">שיעור דיוק:</span>
                      <strong className="text-red-600 dark:text-red-400 font-extrabold">{dom.successRate}%</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => onStartQuiz(dom.domainId)}
                    className="w-full bg-red-650 hover:bg-red-700 text-white dark:bg-red-500/15 dark:hover:bg-red-500/25 dark:text-red-300 font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                  >
                    חזק תחום זה
                    <ChevronLeft className="h-3.5 w-3.5 shrink-0" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. MAIN CORE FEATURES NAVIGATION MENU */}
      <div className="space-y-2">
        <h3 className="text-xs font-black text-slate-800 dark:text-white select-none">בחר מסלול למידה ותרגול</h3>
        
        {/* Core learning cards - compact padding to avoid unnecessary scrolling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          
          {/* Main Quiz Launcher */}
          <div className="bg-white dark:bg-slate-800 p-4.5 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-2xs flex flex-col justify-between gap-3.5">
            <div className="space-y-1.5">
              <span className="p-1.5 px-2 bg-indigo-600/10 text-indigo-600 dark:text-indigo-450 rounded-lg inline-block">
                <Target className="h-5 w-5" />
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm">מחולל מבחנים וסימולציות</h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">בחן את עצמך בסימולציות מותאמות אישית. הגדר זמן, בחר תחום וצבור XP.</p>
            </div>
            
            <button
              onClick={() => onStartQuiz('all')}
              id="dashboard-launch-quiz"
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              התחל סימולציה חדשה
              <ChevronLeft className="h-4 w-4 shrink-0" />
            </button>
          </div>

          {/* Spaced repetition flashcards */}
          <div className="bg-white dark:bg-slate-800 p-4.5 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-2xs flex flex-col justify-between gap-3.5">
            <div className="space-y-1.5">
              <span className="p-1.5 px-2 bg-teal-500/10 text-teal-500 dark:text-teal-450 rounded-lg inline-block">
                <BookOpen className="h-5 w-5" />
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm">כרטיסיות שינון מרווחי זמן</h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">חיזוק זיכרון מהיר המבוסס על אלגוריתם SM-2 המדעי לשאלות המכשילות ביותר.</p>
            </div>
            
            <button
              onClick={() => onNavigate('flashcards')}
              id="dashboard-launch-flashcards"
              className="w-full bg-teal-600 dark:bg-teal-600 hover:bg-teal-555 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              תרגל כרטיסיות
              <ChevronLeft className="h-4 w-4 shrink-0" />
            </button>
          </div>

          {/* Subnetting Calculator Game */}
          <div className="bg-white dark:bg-slate-800 p-4.5 rounded-xl border border-slate-100 dark:border-slate-800/80 shadow-2xs flex flex-col justify-between gap-3.5">
            <div className="space-y-1.5">
              <span className="p-1.5 px-2 bg-amber-500/10 text-amber-550 rounded-lg inline-block">
                <Calculator className="h-5 w-5" />
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs md:text-sm">אימון סאבנטינג ומהירות רשת</h4>
              <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed">תרגול CIDR מהיר וחישוב כתובות רשת ומארחים לחיזוק שרירי הסאבנטינג לבחינה.</p>
            </div>
            
            <button
              onClick={() => onNavigate('subnetting')}
              id="dashboard-launch-subnetting"
              className="w-full bg-amber-600 hover:bg-amber-550 dark:hover:bg-amber-500 text-white font-bold py-2 px-3 rounded-lg text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              לחישוב ותרגול מהיר
              <ChevronLeft className="h-4 w-4 shrink-0" />
            </button>
          </div>

        </div>

        {/* Secondary directory elements - highly compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-0.5">
          
          <div 
            onClick={() => onNavigate('database')}
            className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center justify-between gap-2 transition-all shadow-3xs"
            id="btn-cat-database"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-blue-500/10 text-blue-500 rounded-lg shrink-0">
                <Database className="h-4 w-4" />
              </span>
              <div className="text-right">
                <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white">מאגר השאלות והתשובות</h4>
                <p className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 leading-relaxed mt-0.5">חיפוש, סינון והוספת שאלות אישיות למאגר השאלות המלא.</p>
              </div>
            </div>
            <ChevronLeft className="h-4 w-4 text-slate-500 shrink-0" />
          </div>

          <div 
            onClick={() => onNavigate('glossary')}
            className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer flex items-center justify-between gap-2 transition-all shadow-3xs"
            id="btn-cat-glossary"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-rose-500/10 text-rose-550 rounded-lg shrink-0">
                <BookMarked className="h-4 w-4" />
              </span>
              <div className="text-right">
                <h4 className="font-extrabold text-xs md:text-sm text-slate-900 dark:text-white">מילון המונחים הרשמי של סיסקו</h4>
                <p className="text-xxs md:text-xs text-slate-600 dark:text-slate-350 leading-relaxed mt-0.5">תרגום אנגלי/עברי של מושגים קריטיים וקיצורי דרך של CCNA.</p>
              </div>
            </div>
            <ChevronLeft className="h-4 w-4 text-slate-500 shrink-0" />
          </div>

        </div>

      </div>

      {/* 5. RESET DATA BUTTON BOX */}
      <div className="pt-3 border-t border-slate-200/50 dark:border-slate-850/80 flex justify-between items-center text-xs text-slate-550 dark:text-slate-400 select-none">
        <span>גרסת אפליקציה: 1.0.8 • מוכן לשימוש 100% אקטיבי</span>
        <button
          onClick={handleResetClick}
          className="text-red-600 hover:text-white hover:bg-red-600 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-500 border border-red-200 dark:border-red-900 bg-red-50/40 dark:bg-transparent px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCcw className="h-4 w-4 shrink-0" />
          אתחל את נתוני הלמידה שלי
        </button>
      </div>

      {/* 6. CUSTOM STATE-BASED MODAL CONFIRMATION DIALOG (IFRAME COMPATIBLE) */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-[99999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-red-500 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-right animate-fade-in" dir="rtl">
            <div className="flex items-center gap-2.5 text-red-600 dark:text-red-400 pb-2 border-b border-red-100 dark:border-red-950">
              <span className="p-2 bg-red-500/10 rounded-xl shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-base font-black">אזהרה: איפוס נתוני למידה</h3>
                <p className="text-3xs text-slate-400 leading-none">התקדמות הלמידה שלך בסכנת מחיקה</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">
              האם אתה בטוח לחלוטין שברצונך למחוק לגמרי את כל הישגי הלמידה שצברת? <br />
              <span className="text-red-600 dark:text-red-400 font-extrabold block mt-2 p-3 bg-red-500/5 rounded-xl border border-red-200 dark:border-red-950">
                פעולה זו תאפס לצמיתות את ניקוד ה-XP, רצף ימי הלמידה, כרטיסיות השינון והיסטוריית המבחנים שביצעת. פעולה זו אינה ניתנת לביטול!
              </span>
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleConfirmReset}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer transition-all shadow-md active:scale-95"
              >
                כן, למחוק הכל
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl text-xs cursor-pointer transition-all active:scale-95"
              >
                בטל
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. CUSTOM AUTO-DISMISS SUCCESS BANNER */}
      {showResetSuccess && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 bg-emerald-600 text-white p-3 rounded-xl shadow-xl z-50 flex items-center gap-2.5 animate-fade-in max-w-sm" dir="rtl">
          <div className="p-1 bg-white/20 rounded-lg shrink-0">
            <CheckCircle className="h-4.5 w-4.5 animate-pulse text-white" />
          </div>
          <div>
            <h4 className="font-extrabold text-3xs md:text-2xs">נתוני הלמידה אופסו בהצלחה</h4>
            <p className="text-4xs opacity-90">ההיסטוריה, נקודות ה-XP ורצף הלמידה נמחקו בהצלחה מהמכשיר.</p>
          </div>
        </div>
      )}

    </div>
  );
}
