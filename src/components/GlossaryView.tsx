import React, { useState, useMemo, useEffect } from 'react';
import { CCNA_GLOSSARY_DATABASE, CCNAExamTerm } from '../data/glossaryData';
import { DomainID } from '../types';
import { 
  Search, Star, Bookmark, BookOpen, Layers, 
  Terminal, ArrowLeft, ArrowUpDown, X, Copy, Check, Filter, 
  ExternalLink, Hash, Radio, Shield, Cpu, RefreshCw, Sparkles,
  ChevronDown, ChevronUp, Share2, HelpCircle
} from 'lucide-react';

interface GlossaryViewProps {
  onBackToDashboard: () => void;
  onNavigateToDatabaseWithSearch?: (query: string) => void;
}

export default function GlossaryView({ onBackToDashboard }: GlossaryViewProps) {
  // State
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDomain, setSelectedDomain] = useState<DomainID | 'all' | 'favorites'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLetter, setSelectedLetter] = useState<string>('all');
  const [expandedTermId, setExpandedTermId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'alpha-asc' | 'alpha-desc' | 'domain'>('alpha-asc');
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  
  // Local storage for bookmarked terms
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ccna_glossary_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ccna_glossary_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCopyDefinition = (term: CCNAExamTerm, e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `${term.term} (${term.hebrewTranslation})\nהגדרה: ${term.definition}\nדגש לבחינת CCNA: ${term.examNote}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedTermId(term.id);
    setTimeout(() => {
      setCopiedTermId(null);
    }, 2000);
  };

  // Domain labels & metadata
  const domainConfig: Record<DomainID, { label: string; short: string; colorClass: string; icon: any }> = {
    network_fundamentals: {
      label: 'יסודות רשת',
      short: 'Fundamentals',
      colorClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
      icon: Layers
    },
    network_access: {
      label: 'גישה לרשת ומיתוג',
      short: 'Access & LAN',
      colorClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
      icon: Radio
    },
    ip_connectivity: {
      label: 'קישוריות וניתוב IP',
      short: 'Routing',
      colorClass: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800/60',
      icon: BookOpen
    },
    ip_services: {
      label: 'שירותי IP ותשתית',
      short: 'Services',
      colorClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
      icon: RefreshCw
    },
    security_fundamentals: {
      label: 'אבטחת מידע וסייבר',
      short: 'Security',
      colorClass: 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
      icon: Shield
    },
    automation_programmability: {
      label: 'אוטומציה ו-SDN',
      short: 'Automation',
      colorClass: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
      icon: Cpu
    }
  };

  // Extract available first letters
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    CCNA_GLOSSARY_DATABASE.forEach(item => {
      const firstChar = item.term.trim().charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return Array.from(letters).sort();
  }, []);

  // Filtered & Sorted terms
  const filteredTerms = useMemo(() => {
    return CCNA_GLOSSARY_DATABASE.filter(item => {
      // 1. Search filter
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = !query || (
        item.term.toLowerCase().includes(query) ||
        (item.acronym && item.acronym.toLowerCase().includes(query)) ||
        item.hebrewTranslation.toLowerCase().includes(query) ||
        item.definition.toLowerCase().includes(query) ||
        item.examNote.toLowerCase().includes(query) ||
        (item.technicalDetails?.port && String(item.technicalDetails.port).includes(query)) ||
        (item.technicalDetails?.layer && item.technicalDetails.layer.toLowerCase().includes(query)) ||
        (item.technicalDetails?.cliExample && item.technicalDetails.cliExample.toLowerCase().includes(query)) ||
        item.relatedTerms.some(t => t.toLowerCase().includes(query))
      );

      // 2. Domain / Favorites filter
      let matchesDomain = true;
      if (selectedDomain === 'favorites') {
        matchesDomain = bookmarkedIds.includes(item.id);
      } else if (selectedDomain !== 'all') {
        matchesDomain = item.domain === selectedDomain;
      }

      // 3. Category filter
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;

      // 4. First Letter filter
      let matchesLetter = true;
      if (selectedLetter !== 'all') {
        matchesLetter = item.term.trim().toUpperCase().startsWith(selectedLetter);
      }

      return matchesSearch && matchesDomain && matchesCategory && matchesLetter;
    }).sort((a, b) => {
      if (sortBy === 'alpha-asc') {
        return a.term.localeCompare(b.term);
      } else if (sortBy === 'alpha-desc') {
        return b.term.localeCompare(a.term);
      } else {
        // Sort by domain
        return a.domain.localeCompare(b.domain) || a.term.localeCompare(b.term);
      }
    });
  }, [searchTerm, selectedDomain, selectedCategory, selectedLetter, sortBy, bookmarkedIds]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDomain('all');
    setSelectedCategory('all');
    setSelectedLetter('all');
  };

  const handleRelatedTermClick = (relatedTerm: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchTerm(relatedTerm);
    setSelectedDomain('all');
    setSelectedLetter('all');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5 text-right font-sans animate-fade-in" dir="rtl">
      
      {/* 1. TOP HEADER & INTRO BANNER */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-5 md:p-6 shadow-md border border-indigo-800/40 relative overflow-hidden">
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-3xs bg-indigo-500/30 border border-indigo-400/40 px-2.5 py-0.5 rounded-full font-extrabold text-indigo-200 uppercase tracking-wider">
                Cisco CCNA 200-301
              </span>
              <span className="text-3xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                אופליין מקומי 100%
              </span>
            </div>
            
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-400 shrink-0" />
              מילון המונחים המקיף של סיסקו
            </h2>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              מאגר מונחי רשתות רשמי, הגדרות מדויקות, תרגום אנגלי/עברי ודגשים קריטיים לבחינה. חפש לפי מונח, ראשי תיבות, פקודות CLI או מספרי פורט.
            </p>
          </div>

          {/* Quick Counter Box */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shrink-0">
            <div className="text-center px-2 border-l border-white/10">
              <span className="block text-xl font-black text-indigo-300">{CCNA_GLOSSARY_DATABASE.length}</span>
              <span className="text-4xs text-slate-300 font-bold uppercase">מונחים במאגר</span>
            </div>
            <div className="text-center px-2">
              <span className="block text-xl font-black text-amber-300">{bookmarkedIds.length}</span>
              <span className="text-4xs text-slate-300 font-bold uppercase">במועדפים</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-4 md:p-5 shadow-xs border border-slate-100 dark:border-slate-800/80 space-y-3.5">
        
        {/* Full-text Search bar */}
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="חיפוש מונח... (לדוגמה: OSPF, VLAN, NAT, 53, administrative distance, /24, BSSID)"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 p-3 pr-10 pl-10 rounded-xl text-slate-900 dark:text-slate-100 text-xs md:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <Search className="h-4.5 w-4.5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
          
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute left-3.5 top-3.5 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full cursor-pointer"
              title="נקה חיפוש"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Domain Filter Buttons */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-2xs font-extrabold text-slate-500 dark:text-slate-400">
            <span>סינון לפי תחום בבחינה:</span>
            {selectedDomain === 'favorites' && (
              <span className="text-amber-500 font-bold">מציג רק מונחים שסימנת במועדפים</span>
            )}
          </div>
          
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedDomain('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDomain === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
              }`}
            >
              הכל ({CCNA_GLOSSARY_DATABASE.length})
            </button>

            <button
              onClick={() => setSelectedDomain('favorites')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedDomain === 'favorites'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-900/60 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${selectedDomain === 'favorites' ? 'fill-current' : ''}`} />
              <span>מועדפים ({bookmarkedIds.length})</span>
            </button>

            {(Object.keys(domainConfig) as DomainID[]).map(dId => {
              const config = domainConfig[dId];
              const countInDomain = CCNA_GLOSSARY_DATABASE.filter(i => i.domain === dId).length;
              return (
                <button
                  key={dId}
                  onClick={() => setSelectedDomain(dId)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDomain === dId
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {config.label} ({countInDomain})
                </button>
              );
            })}
          </div>
        </div>

        {/* Alphabet Jump Bar & Sort Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/70">
          
          {/* Alphabet letters jump */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-3xs text-slate-400 font-extrabold shrink-0 ml-1">אות ראשונה:</span>
            <button
              onClick={() => setSelectedLetter('all')}
              className={`px-2 py-0.5 rounded text-3xs font-extrabold cursor-pointer shrink-0 ${
                selectedLetter === 'all'
                  ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              הכל
            </button>
            {availableLetters.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-1.5 py-0.5 rounded text-3xs font-black cursor-pointer font-mono shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs shrink-0">
            <span className="text-slate-400 text-3xs font-extrabold flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              מיון:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 py-1 px-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="alpha-asc">שם המונח (A-Z)</option>
              <option value="alpha-desc">שם המונח (Z-A)</option>
              <option value="domain">לפי נושאי הבחינה</option>
            </select>
          </div>

        </div>

      </div>

      {/* 3. ACTIVE FILTERS & STATS BAR */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span className="font-bold">
          נמצאו <strong className="text-indigo-600 dark:text-indigo-400 font-extrabold">{filteredTerms.length}</strong> מונחים תואמים
          {searchTerm && ` עבור "${searchTerm}"`}
        </span>

        {(searchTerm || selectedDomain !== 'all' || selectedLetter !== 'all') && (
          <button
            onClick={handleClearFilters}
            className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="h-3 w-3" />
            איפוס כל הסינונים
          </button>
        )}
      </div>

      {/* 4. TERMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredTerms.length > 0 ? (
          filteredTerms.map(term => {
            const isExpanded = expandedTermId === term.id;
            const isBookmarked = bookmarkedIds.includes(term.id);
            const isCopied = copiedTermId === term.id;
            const dConfig = domainConfig[term.domain];

            return (
              <div
                key={term.id}
                onClick={() => setExpandedTermId(isExpanded ? null : term.id)}
                className={`bg-white dark:bg-slate-800/90 rounded-2xl p-4.5 border transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-xs ${
                  isExpanded
                    ? 'border-indigo-500 ring-2 ring-indigo-500/10 dark:ring-indigo-500/20'
                    : 'border-slate-150 dark:border-slate-800/80 hover:border-indigo-300 dark:hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar: Domain Badge & Action Buttons */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-3xs font-extrabold px-2.5 py-0.5 rounded-full border ${dConfig.colorClass}`}>
                      {dConfig.label}
                    </span>

                    <div className="flex items-center gap-1">
                      {/* Copy button */}
                      <button
                        onClick={(e) => handleCopyDefinition(term, e)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isCopied 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800' 
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title="העתק הגדרה ודגש ללוח"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>

                      {/* Bookmark Star */}
                      <button
                        onClick={(e) => toggleBookmark(term.id, e)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isBookmarked 
                            ? 'bg-amber-50 text-amber-500 border-amber-200 dark:bg-amber-950/40 dark:border-amber-800' 
                            : 'text-slate-300 hover:text-amber-500 border-transparent hover:bg-slate-100 dark:hover:bg-slate-700'
                        }`}
                        title={isBookmarked ? 'הסר ממועדפים' : 'שמור במועדפים ללמידה'}
                      >
                        <Star className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Term Heading & English Name */}
                  <div className="mt-2">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white font-mono tracking-tight select-none">
                        {term.term}
                      </h3>
                      {term.acronym && (
                        <span className="text-3xs font-mono font-black text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded shrink-0">
                          {term.acronym}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-0.5 select-none">
                      {term.hebrewTranslation}
                    </p>
                  </div>

                  {/* Definition Body */}
                  <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed mt-2.5 select-none">
                    {term.definition}
                  </p>
                </div>

                {/* Technical Badges preview */}
                {term.technicalDetails && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 text-3xs font-mono">
                    {term.technicalDetails.layer && (
                      <span className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                        {term.technicalDetails.layer}
                      </span>
                    )}
                    {term.technicalDetails.port && (
                      <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
                        Port: {term.technicalDetails.port}
                      </span>
                    )}
                    {term.technicalDetails.adMetric && (
                      <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50">
                        {term.technicalDetails.adMetric}
                      </span>
                    )}
                    {term.technicalDetails.protocolNumber && (
                      <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded border border-purple-200 dark:border-purple-900/50">
                        Protocol #{term.technicalDetails.protocolNumber}
                      </span>
                    )}
                  </div>
                )}

                {/* EXPANDED SECTION WITH EXAM TIP, CLI COMMANDS & RELATED TERMS */}
                {isExpanded ? (
                  <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60 animate-fade-in text-xs">
                    
                    {/* Exam Note Box */}
                    <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-slate-800 dark:text-amber-200 space-y-1">
                      <div className="flex items-center gap-1.5 font-black text-amber-800 dark:text-amber-300 text-2xs">
                        <Bookmark className="h-3.5 w-3.5 fill-current text-amber-600 shrink-0" />
                        <span>דגש קריטי לבחינת CCNA 200-301:</span>
                      </div>
                      <p className="text-xs leading-relaxed">{term.examNote}</p>
                    </div>

                    {/* CLI Example if exists */}
                    {term.technicalDetails?.cliExample && (
                      <div className="space-y-1">
                        <span className="text-3xs font-extrabold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Terminal className="h-3 w-3" />
                          דוגמת פקודות Cisco IOS:
                        </span>
                        <pre className="bg-slate-900 text-emerald-400 p-2.5 rounded-xl text-3xs font-mono overflow-x-auto whitespace-pre leading-normal border border-slate-800" dir="ltr">
                          {term.technicalDetails.cliExample}
                        </pre>
                      </div>
                    )}

                    {/* Related Terms clickable tags */}
                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-3xs font-extrabold text-slate-500 dark:text-slate-400">
                          מונחים קשורים לעיון:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map(related => (
                            <button
                              key={related}
                              onClick={(e) => handleRelatedTermClick(related, e)}
                              className="text-3xs bg-slate-100 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
                            >
                              {related}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-center pt-1">
                      <span className="text-3xs text-slate-400 font-bold">לחץ לסגירת הפירוט</span>
                    </div>

                  </div>
                ) : (
                  <div className="flex items-center justify-between text-3xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
                      <Bookmark className="h-3 w-3" />
                      הצג דגש לבחינה ופקודות CLI
                    </span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </div>
                )}

              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 p-8 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-3">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-full w-12 h-12 mx-auto flex items-center justify-center text-slate-400">
              <Search className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">לא נמצאו מונחים מתאימים</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                לא נמצא מונח התואם לחיפוש שלך. נסה להשתמש בראשי תיבות כלליים כמו OSPF, VLAN, NAT, STP, ACL, או לחץ על איפוס החיפוש.
              </p>
            </div>
            <button
              onClick={handleClearFilters}
              className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-700 transition-all cursor-pointer shadow-xs"
            >
              הצג את כל המונחים
            </button>
          </div>
        )}
      </div>

      {/* 5. FOOTER & RETURN BUTTON */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
        <button
          onClick={onBackToDashboard}
          className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/80 font-bold text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          חזרה למסך הראשי
        </button>

        <span className="text-3xs text-slate-400">
          מבוסס רשמית על תוכנית הלימודים של Cisco CCNA 200-301
        </span>
      </div>

    </div>
  );
}
