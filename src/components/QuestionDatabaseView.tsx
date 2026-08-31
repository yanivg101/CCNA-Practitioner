import React, { useState } from 'react';
import { useCCNAStore } from '../store/useCCNAStore';
import { CCNAQuestion, DomainID, DifficultyLevel } from '../types';
import { ccnaDomainsList } from '../data/questions';
import { 
  Search, Plus, Filter, ChevronDown, ChevronUp, Check, AlertCircle, Trash2, ArrowLeft, BookOpen, AlertTriangle
} from 'lucide-react';

interface QuestionDatabaseViewProps {
  onBackToDashboard: () => void;
}

export default function QuestionDatabaseView({ onBackToDashboard }: QuestionDatabaseViewProps) {
  const { questions, addCustomQuestion } = useCCNAStore();

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<DomainID | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [expandedQId, setExpandedQId] = useState<string | null>(null);

  // Form State for creating custom questions
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [formDomain, setFormDomain] = useState<DomainID>('network_fundamentals');
  const [formSubtopic, setFormSubtopic] = useState<string>('');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptions, setFormOptions] = useState<string[]>(['', '', '', '']);
  const [formCorrect, setFormCorrect] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formHint, setFormHint] = useState<string>('');
  const [formAdditional, setFormAdditional] = useState<string>('');
  const [formDiff, setFormDiff] = useState<DifficultyLevel>('בינוני');
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);

  // Action methods
  const handleToggleExpand = (id: string) => {
    setExpandedQId(expandedQId === id ? null : id);
  };

  const handleOptionChange = (idx: number, val: string) => {
    const nextOpts = [...formOptions];
    nextOpts[idx] = val;
    setFormOptions(nextOpts);
  };

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic fields validation
    if (!formSubtopic.trim() || !formQuestion.trim() || !formExplanation.trim() || !formHint.trim()) {
      alert('נא למלא את כל השדות החיוניים של השאלה!');
      return;
    }

    if (formOptions.some(opt => !opt.trim())) {
      alert('נא למלא את כל 4 התשובות האפשריות לשאלה!');
      return;
    }

    addCustomQuestion({
      domain: formDomain,
      subtopic: formSubtopic.trim(),
      question: formQuestion.trim(),
      options: formOptions.map(o => o.trim()),
      correctAnswer: formCorrect,
      explanation: formExplanation.trim(),
      hint: formHint.trim(),
      additionalInfo: formAdditional.trim(),
      difficulty: formDiff,
      references: 'שאלה בהתאמה אישית של המשתמש'
    });

    // Reset Form
    setFormSubtopic('');
    setFormQuestion('');
    setFormOptions(['', '', '', '']);
    setFormCorrect(0);
    setFormExplanation('');
    setFormHint('');
    setFormAdditional('');
    setFormDiff('בינוני');
    
    // Show Alert
    setFormSuccessMessage('השאלה האישית נוצרה ונשמרה בהצלחה במאגר! קיבלת 50 נקודות XP.');
    setTimeout(() => {
      setFormSuccessMessage(null);
      setShowAddForm(false);
    }, 4000);
  };

  // Run Search filters
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.subtopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || q.domain === selectedDomain;
    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;

    return matchesSearch && matchesDomain && matchesDiff;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-right" dir="rtl">
      
      {/* Search and Form creator header card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6.5 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white">מאגר השאלות המורחב ({questions.length})</h2>
          <p className="text-xs text-slate-400">חפש, עיין וצור שאלות לימוד משלך כדי להשחיז את אופן פתרון השאלות במבנה ה-CCNA.</p>
        </div>

        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setFormSuccessMessage(null);
          }}
          id="btn-toggle-add-question"
          className="bg-indigo-600 hover:bg-indigo-505 text-white font-black py-3 px-5 rounded-xl transition-all shadow-md text-xs cursor-pointer flex items-center gap-1 shrink-0"
        >
          <Plus className="h-4.5 w-4.5" />
          {showAddForm ? 'סגור טופס הוספה' : 'הוסף שאלה מותאמת'}
        </button>
      </div>

      {/* CUSTOM QUESTION ADD FORM CREATOR */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-md border border-slate-100 dark:border-indigo-500/20 space-y-6 animate-slide-down">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
            <span className="p-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <Plus className="h-5 w-5" />
            </span>
            <h3 className="font-extrabold text-lg text-slate-850 dark:text-white">מחולל שאלת CCNA בהתאמה אישית</h3>
          </div>

          {formSuccessMessage && (
            <div className="bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 p-4 rounded-xl text-xs flex gap-2 animate-bounce">
              <Check className="h-5 w-5 shrink-0" />
              <span>{formSuccessMessage}</span>
            </div>
          )}

          <form onSubmit={handleCreateQuestionSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Domain */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">בחר תחום סילבוס:</label>
                <select
                  value={formDomain}
                  onChange={(e) => setFormDomain(e.target.value as DomainID)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  {ccnaDomainsList.map(dom => (
                    <option key={dom.id} value={dom.id}>{dom.name}</option>
                  ))}
                </select>
              </div>

              {/* Subtopic */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">תת-נושא ספיציפי (למשל: OSPFv2 Neighbors):</label>
                <input
                  type="text"
                  value={formSubtopic}
                  onChange={(e) => setFormSubtopic(e.target.value)}
                  placeholder="למשל: נתבי OSPF"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                  required
                />
              </div>

              {/* Difficulty */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">רמת קושי מוגדרת:</label>
                <select
                  value={formDiff}
                  onChange={(e) => setFormDiff(e.target.value as DifficultyLevel)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="קל">קל (Easy)</option>
                  <option value="בינוני">בינוני (Medium)</option>
                  <option value="קשה">קשה (Hard)</option>
                </select>
              </div>

            </div>

            {/* Question description */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">נוסח השאלה המלא בעברית (מותר להוסיף מושגים באנגלית):</label>
              <textarea
                value={formQuestion}
                onChange={(e) => setFormQuestion(e.target.value)}
                rows={3}
                placeholder="הקלד את נוסח השאלה..."
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
                required
              />
            </div>

            {/* Answers options layout */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">4 תשובות אפשריות (A, B, C, D):</label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((num) => (
                  <div key={num} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 px-2.5 py-1 rounded-lg">
                      {['A', 'B', 'C', 'D'][num]}
                    </span>
                    <input
                      type="text"
                      value={formOptions[num]}
                      onChange={(e) => handleOptionChange(num, e.target.value)}
                      placeholder={`תשובה אפשרית ${['A', 'B', 'C', 'D'][num]}...`}
                      className="w-full bg-transparent focus:outline-none text-xs text-slate-850 dark:text-slate-250 font-medium"
                      required
                    />
                  </div>
                ))}
              </div>
              
              {/* Select correct option index */}
              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-2">
                <label className="block text-xs font-bold text-slate-650 dark:text-slate-400 mb-2">בחר בדיוק איזו תשובה לעיל היא הנכונה:</label>
                <div className="flex gap-4">
                  {[0, 1, 2, 3].map((num) => (
                    <label key={num} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-slate-750 dark:text-slate-300">
                      <input
                        type="radio"
                        name="correct"
                        checked={formCorrect === num}
                        onChange={() => setFormCorrect(num)}
                        className="accent-indigo-600 cursor-pointer h-4 w-4"
                      />
                      תשובה {['A', 'B', 'C', 'D'][num]}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Explanation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">הסבר הפתרון המלא (יוצג כשבודקים או מסיימים בחנים):</label>
                <textarea
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  rows={4}
                  placeholder="רשום את הסבר הפתרון בעברית..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none resize-none leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-3">
                
                {/* Short Hint */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">רמז קצר לשאלה:</label>
                  <input
                    type="text"
                    value={formHint}
                    onChange={(e) => setFormHint(e.target.value)}
                    placeholder="הקלד רמז קצר של סיסקו..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
                    required
                  />
                </div>

                {/* Additional tips card */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-705 dark:text-slate-300">מידע משלים / פקודות CLI (רשות):</label>
                  <textarea
                    value={formAdditional}
                    onChange={(e) => setFormAdditional(e.target.value)}
                    rows={2}
                    placeholder="למשל פקודות תצורה show ip route"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-xl text-xs text-slate-800 dark:text-slate-200 focus:outline-none resize-none font-mono"
                  />
                </div>

              </div>

            </div>

            <button
              type="submit"
              id="btn-submit-custom-question"
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-md text-xs cursor-pointer block text-center"
            >
              שמור שאלה למאגר וצבור 50 XP נקודות
            </button>
          </form>
        </div>
      )}

      {/* FILTER PANEL AND SEARCH */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/50 space-y-4">
        
        {/* Full-text Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חיפוש שאלה במאגר לפי מילות מפתח, פקודות CLI, תת-נושאים או מילים בהסבר..."
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3.5 pr-11 rounded-2xl text-slate-850 dark:text-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <Search className="h-5 w-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
        </div>

        {/* Categories Tags line */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
          
          <button
            onClick={() => setSelectedDomain('all')}
            className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
              selectedDomain === 'all' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 hover:bg-slate-100'
            }`}
          >
            כל התחומים ({questions.length})
          </button>

          {ccnaDomainsList.map((dom) => {
            const count = questions.filter(q => q.domain === dom.id).length;
            return (
              <button
                key={dom.id}
                onClick={() => setSelectedDomain(dom.id)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  selectedDomain === dom.id 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {dom.name} ({count})
              </button>
            );
          })}

        </div>

        {/* Secondary difficulty filtering options */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
          <span className="text-slate-400 font-bold flex items-center gap-1">
            <Filter className="h-4 w-4 text-indigo-400" />
            סנן לפי קושי:
          </span>
          <div className="flex gap-2">
            {['all', 'קל', 'בינוני', 'קשה'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff as any)}
                className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                  selectedDifficulty === diff 
                    ? 'bg-indigo-650 text-white border-transparent' 
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-100 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {diff === 'all' ? 'הכל' : diff}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RENDER QUESTION CATALOG LIST */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQId === q.id;
            const domInfo = ccnaDomainsList.find(d => d.id === q.domain);

            return (
              <div 
                key={q.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-4 hover:border-indigo-500/10 transition-colors"
                id={`cat-question-${q.id}`}
              >
                <div 
                  onClick={() => handleToggleExpand(q.id)}
                  className="flex justify-between items-start gap-4 cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xxs font-bold">
                      <span className="bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded">
                        {domInfo?.name}
                      </span>
                      <span className="text-slate-400">• {q.subtopic}</span>
                      <span className={`px-2 py-0.5 rounded font-black ${
                        q.difficulty === 'קל' ? 'text-green-600 bg-green-500/5' :
                        q.difficulty === 'בינוני' ? 'text-amber-600 bg-amber-500/5' :
                        'text-red-650 bg-red-500/5'
                      }`}>{q.difficulty}</span>
                    </div>

                    <h4 className="font-extrabold text-slate-850 dark:text-white leading-relaxed text-sm pre-wrap">
                      {q.question}
                    </h4>
                  </div>
                  
                  <span className="p-1 text-slate-400 dark:text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </span>
                </div>

                {/* Expanded Drawer Details sheet */}
                {isExpanded && (
                  <div className="border-t border-slate-100 dark:border-slate-700/50 pt-4 space-y-4 animate-slide-down">
                    
                    {/* Visual Choices Deck */}
                    <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-bold text-slate-500 block mb-1">התשובות האפשריות לשאלה:</span>
                      
                      {q.options.map((option, oidx) => {
                        const isCorrect = oidx === q.correctAnswer;
                        return (
                          <div 
                            key={oidx}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                              isCorrect 
                                ? 'bg-green-500/10 border-green-500/20 text-green-800 dark:text-green-300 font-extrabold' 
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800'
                            }`}
                          >
                            <span className="pr-1">{option}</span>
                            {isCorrect && <Check className="h-4.5 w-4.5 text-green-600 shrink-0" />}
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-normal">
                      
                      {/* Detailed explanatory */}
                      <div className="p-4.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2 leading-relaxed">
                        <span className="font-black text-slate-950 dark:text-white block text-[13.5px] md:text-sm">💡 הסבר פתרון CCNA:</span>
                        <p className="normal-case text-slate-850 dark:text-slate-200 text-[13.5px] md:text-[14.5px] leading-relaxed font-medium">{q.explanation}</p>
                      </div>

                      {/* Info side column */}
                      <div className="space-y-3.5">
                        
                        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl space-y-1.5 text-xs md:text-[13px] leading-relaxed text-slate-850 dark:text-slate-200">
                          <span className="font-black text-slate-950 dark:text-white block text-xs md:text-[13.5px] mb-1">💡 פקודות תצורה או טיפים:</span>
                          <p className="normal-case leading-relaxed font-medium">{q.additionalInfo}</p>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl text-xs md:text-[13px] leading-relaxed text-slate-850 dark:text-slate-200">
                          <span className="font-black text-slate-950 dark:text-white block text-xs md:text-[13.5px] mb-1">💡 רמז מסכם:</span>
                          <p className="normal-case leading-relaxed font-medium">{q.hint}</p>
                        </div>

                      </div>

                    </div>

                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-center text-slate-400 text-xs">
            לא נמצאו שאלות התואמות את החיפושים ומסנני הלמידה שלך. נסה לחפש מילות מפתח אחרות.
          </div>
        )}
      </div>

      {/* Back to Dashboard */}
      <button
        onClick={onBackToDashboard}
        className="text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer mr-auto"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" />
        חזרה למסך הראשי
      </button>

    </div>
  );
}
