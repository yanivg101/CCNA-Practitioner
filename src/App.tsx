import React, { useState, useEffect } from 'react';
import { useCCNAStore } from './store/useCCNAStore';
import { DomainID } from './types';
import Dashboard from './components/Dashboard';
import QuizRunner from './components/QuizRunner';
import FlashcardsRunner from './components/FlashcardsRunner';
import SubnettingCalculator from './components/SubnettingCalculator';
import QuestionDatabaseView from './components/QuestionDatabaseView';
import GlossaryView from './components/GlossaryView';

import { 
  Network, Sun, Moon, Zap, Award, Flame, BookOpen, Calculator, Database, HelpCircle, GraduationCap, CheckCircle, Home
} from 'lucide-react';

export default function App() {
  const { points, streak, theme, toggleTheme } = useCCNAStore();

  const [currentView, setCurrentView] = useState<'dashboard' | 'quiz' | 'flashcards' | 'subnetting' | 'database' | 'glossary'>('dashboard');
  const [selectedQuizDomain, setSelectedQuizDomain] = useState<DomainID | 'all' | 'weak'>('all');

  // Derive stats
  const level = Math.floor(points / 250) + 1;
  const isDarkMode = theme === 'dark';

  // Sync Tailwind Dark Mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const handleStartQuizFromDashboard = (domainId: DomainID | 'all' | 'weak') => {
    setSelectedQuizDomain(domainId);
    setCurrentView('quiz');
  };

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onStartQuiz={handleStartQuizFromDashboard} onNavigate={setCurrentView} />;
      case 'quiz':
        return (
          <QuizRunner 
            initialDomainId={selectedQuizDomain} 
            onBackToDashboard={() => setCurrentView('dashboard')} 
          />
        );
      case 'flashcards':
        return <FlashcardsRunner onBackToDashboard={() => setCurrentView('dashboard')} />;
      case 'subnetting':
        return <SubnettingCalculator onBackToDashboard={() => setCurrentView('dashboard')} />;
      case 'database':
        return <QuestionDatabaseView onBackToDashboard={() => setCurrentView('dashboard')} />;
      case 'glossary':
        return <GlossaryView onBackToDashboard={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onStartQuiz={handleStartQuizFromDashboard} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300" dir="rtl">
      
      {/* GLOW DECORATIONS FOR BEAUTIFUL SLATE VIBES */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* RIGHT SIDEBAR ON DESKTOP / TOP HEADER ON MOBILE */}
        <aside className="w-full lg:w-64 bg-slate-100 dark:bg-slate-950 border-b lg:border-b-0 lg:border-l border-slate-200 dark:border-slate-800/85 sticky top-0 lg:h-screen z-40 flex flex-col justify-between shrink-0 transition-all duration-300">
          
          <div className="p-4 flex flex-col gap-6" dir="rtl">
            {/* Logo & Core Title */}
            <div 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-3 cursor-pointer select-none pb-4 lg:border-b lg:border-slate-100 dark:lg:border-slate-800/60"
            >
              <div className="p-2 bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white rounded-xl shadow-indigo-500/20 shadow-md">
                <Network className="h-5.5 w-5.5" />
              </div>
              <div className="text-right">
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">CCNA Pro</h1>
                <span className="text-xxs lg:text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">הכנה למבחן 200-301</span>
              </div>
            </div>

            {/* Navigation links - Vertical inside Sidebar */}
            <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <Home className="h-[17px] w-[17px] shrink-0" />
                <span>ראשי</span>
              </button>
              <button
                onClick={() => handleStartQuizFromDashboard('all')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'quiz' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <Zap className="h-[17px] w-[17px] shrink-0" />
                <span>תרגול סימולציה</span>
              </button>
              <button
                onClick={() => setCurrentView('flashcards')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'flashcards' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <BookOpen className="h-[17px] w-[17px] shrink-0" />
                <span>שינון כרטיסיות</span>
              </button>
              <button
                onClick={() => setCurrentView('subnetting')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'subnetting' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <Calculator className="h-[17px] w-[17px] shrink-0" />
                <span>סאבנטינג ורשתות</span>
              </button>
              <button
                onClick={() => setCurrentView('database')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'database' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <Database className="h-[17px] w-[17px] shrink-0" />
                <span>מאגר השאלות</span>
              </button>
              <button
                onClick={() => setCurrentView('glossary')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs lg:text-[13.5px] font-bold transition-all cursor-pointer whitespace-nowrap ${currentView === 'glossary' ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
              >
                <HelpCircle className="h-[17px] w-[17px] shrink-0" />
                <span>מילון מונחי סיסקו</span>
              </button>
            </nav>
          </div>

          {/* Bottom Sidebar area: User Stats and Dark mode */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-3.5" dir="rtl">
            
            {/* Stats display */}
            <div className="grid grid-cols-2 gap-2 text-xxs lg:text-xs font-extrabold">
              {/* XP */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/60 p-2 rounded-xl flex flex-col items-center gap-0.5 justify-center text-center shadow-3xs" title="סך הכל נקודות XP שצברת">
                <Award className="h-4.5 w-4.5 text-amber-500" />
                <span className="text-slate-800 dark:text-slate-200 mt-0.5 font-bold">{points.toLocaleString()} XP</span>
              </div>
              {/* Streak */}
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/60 p-2 rounded-xl flex flex-col items-center gap-0.5 justify-center text-center shadow-3xs" title="רצף הימים הפעיל שלך">
                <Flame className="h-4.5 w-4.5 text-orange-500" />
                <span className="text-slate-800 dark:text-slate-200 mt-0.5 font-bold">{streak} ימים</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800/60 p-2 rounded-xl shadow-3xs">
              <div className="flex items-center gap-1 text-xxs lg:text-xs font-extrabold text-indigo-650 dark:text-indigo-400">
                <GraduationCap className="h-4 w-4" />
                <span>רמה {level}</span>
              </div>
              
              <button
                onClick={toggleTheme}
                className="p-1.5 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 rounded-lg transition-all cursor-pointer"
                title={isDarkMode ? 'מעבר למצב יום' : 'מעבר למצב לילה'}
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

          </div>
        </aside>

        {/* COMPACT STAGE & VIEW CONTAINER */}
        <div className="flex-1 lg:max-h-screen lg:overflow-y-auto">
          
          <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            <div className="animate-fade-in">
              {renderActiveView()}
            </div>
          </main>

          <footer className="py-6 border-t border-slate-200/40 dark:border-slate-800/50 text-center text-[10px] md:text-[10.5px] text-slate-400 dark:text-slate-500 space-y-1" dir="rtl">
            <p className="flex items-center justify-center gap-1 font-extrabold text-slate-500 dark:text-slate-400">
              <CheckCircle className="h-3 w-3 text-green-500 shrink-0" />
              CCNA Pro - אפליקציית PWA מוכנה לשימוש ללא אינטרנט (אופליין)
            </p>
            <p className="opacity-75">מבוסס רשמית על סילבוס הבחינה CCNA 200-301 Cisco Certification. כל הזכויות שמורות ליניב גרשוני.</p>
          </footer>

        </div>

      </div>

    </div>
  );
}
