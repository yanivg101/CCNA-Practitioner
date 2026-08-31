import React, { useState } from 'react';
import { useCCNAStore } from '../store/useCCNAStore';
import { 
  Calculator, Zap, Target, CheckCircle, AlertCircle, RefreshCw, HelpCircle, ArrowLeft, Award
} from 'lucide-react';

interface SubnettingCalculatorProps {
  onBackToDashboard: () => void;
}

export default function SubnettingCalculator({ onBackToDashboard }: SubnettingCalculatorProps) {
  const { addPoints } = useCCNAStore();

  // Mode: 'calculator' or 'game'
  const [activeTab, setActiveTab] = useState<'calculator' | 'game'>('calculator');

  // Calculator states
  const [ipInput, setIpInput] = useState<string>('192.168.1.50');
  const [cidrInput, setCidrInput] = useState<number>(24);
  const [calcResult, setCalcResult] = useState<any>(null);

  // Game states
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'answered'>('idle');
  const [gameQuestion, setGameQuestion] = useState<{
    prompt: string;
    correctAnswer: string;
    explanation: string;
  } | null>(null);
  const [userGameAnswer, setUserGameAnswer] = useState<string>('');
  const [isGameCorrect, setIsGameCorrect] = useState<boolean>(false);

  // Binary help calculation for IPv4
  const handleCalculateIp = () => {
    // Validate IP format
    const ipReg = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
    const match = ipInput.trim().match(ipReg);
    if (!match) {
      alert('נא להזין כתובת IPv4 תקינה (למשל: 192.168.1.1)');
      return;
    }

    const octets = match.slice(1, 5).map(Number);
    if (octets.some(o => o > 255)) {
      alert('ערכי האוקטטים בכתובת IP חייבים להיות בין 0 ל-255');
      return;
    }

    const ipNum = (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3];
    
    // Construct subnet mask
    const maskNum = cidrInput === 0 ? 0 : (~0 << (32 - cidrInput));
    
    const networkNum = ipNum & maskNum;
    const broadcastNum = networkNum | ~maskNum;

    const netOctets = [
      (networkNum >>> 24) & 255,
      (networkNum >>> 16) & 255,
      (networkNum >>> 8) & 255,
      networkNum & 255
    ];

    const broadOctets = [
      (broadcastNum >>> 24) & 255,
      (broadcastNum >>> 16) & 255,
      (broadcastNum >>> 8) & 255,
      broadcastNum & 255
    ];

    const maskOctets = [
      (maskNum >>> 24) & 255,
      (maskNum >>> 16) & 255,
      (maskNum >>> 8) & 255,
      maskNum & 255
    ];

    // Usable ranges
    const firstUsable = [...netOctets];
    if (cidrInput < 31) firstUsable[3] += 1;

    const lastUsable = [...broadOctets];
    if (cidrInput < 31) lastUsable[3] -= 1;

    const totalHosts = cidrInput >= 31 ? 0 : Math.pow(2, 32 - cidrInput) - 2;

    const toBinaryString = (num: number) => {
      let str = (num >>> 0).toString(2);
      while (str.length < 32) str = '0' + str;
      return `${str.slice(0, 8)}.${str.slice(8, 16)}.${str.slice(16, 24)}.${str.slice(24, 32)}`;
    };

    setCalcResult({
      network: netOctets.join('.'),
      broadcast: broadOctets.join('.'),
      mask: maskOctets.join('.'),
      firstUsable: firstUsable.join('.'),
      lastUsable: lastUsable.join('.'),
      hostsCount: totalHosts,
      ipBinary: toBinaryString(ipNum),
      maskBinary: toBinaryString(maskNum),
      networkBinary: toBinaryString(networkNum)
    });
  };

  // Generate dynamic Subnet Game Question
  const generateGameQuestion = () => {
    const types = ['network_id', 'broadcast_id', 'hosts_count', 'subnet_mask'];
    const chosenType = types[Math.floor(Math.random() * types.length)];

    const classC_prefix = '192.168.1.';
    const randomHostVal = Math.floor(Math.random() * 254) + 1;
    const randomIP = `192.168.1.${randomHostVal}`;
    const maskChoices = [25, 26, 27, 28, 29, 30];
    const cidr = maskChoices[Math.floor(Math.random() * maskChoices.length)];

    // Calculate answers
    const block = Math.pow(2, 32 - cidr);
    const subnetIdx = Math.floor(randomHostVal / block);
    const netID = subnetIdx * block;
    const broadID = netID + block - 1;
    const usableHosts = block - 2;

    const ddmMaskMap: Record<number, string> = {
      25: '255.255.255.128',
      26: '255.255.255.192',
      27: '255.255.255.224',
      28: '255.255.255.240',
      29: '255.255.255.248',
      30: '255.255.255.252'
    };

    let prompt = '';
    let correctAnswer = '';
    let explanation = '';

    switch (chosenType) {
      case 'network_id':
        prompt = `מהי כתובת הרשת (Network ID) של המארח ${randomIP} /${cidr}?`;
        correctAnswer = `192.168.1.${netID}`;
        explanation = `גודל בלוק הכתובות עבור /${cidr} הוא ${block} כתובות. תת-הרשת של ${randomHostVal} מתחילה בכפולה הקרובה ביותר מלמטה של גודל הבלוק (${block} * ${subnetIdx}), שזה ${netID}. לכן התשובה היא 192.168.1.${netID}.`;
        break;
      case 'broadcast_id':
        prompt = `מהי כתובת ה-Broadcast של המארח ${randomIP} /${cidr}?`;
        correctAnswer = `192.168.1.${broadID}`;
        explanation = `גודל הבלוק ל-/${cidr} הוא ${block}. תת-הרשת מתחילה ב-${netID} ומסתיימת בכתובת אחת לפני הרשת הבאה, שזוהי כתובת ה-Broadcast: ${netID} + ${block} - 1 = ${broadID}. לכן התשובה היא 192.168.1.${broadID}.`;
        break;
      case 'hosts_count':
        prompt = `כמה כתובות מארחים שמישות (Usable Host IPs) קיימות בתת-רשת בעלת מסכת /${cidr}?`;
        correctAnswer = `${usableHosts}`;
        explanation = `עבור מסכה של /${cidr}, נותרו ${32 - cidr} ביטים למארחים. גודל הבלוק הפיזי הוא 2 בחזקת ${32 - cidr} = ${block}. אנו מפחיתים את 2 הכתובות המיוחדות (רשת ושידור), ומקבלים ${block} - 2 = ${usableHosts} כתובות שמישות.`;
        break;
      case 'subnet_mask':
        prompt = `מהי הייצוג העשרוני (Dotted Decimal) של מסכת /${cidr}?`;
        correctAnswer = ddmMaskMap[cidr];
        explanation = `במסכת /${cidr} ישנם ${cidr} ביטים של 1. האוקטט האחרון מכיל ${cidr - 24} ביטים של 1, השקולים לערך עשרוני של ${ddmMaskMap[cidr].split('.')[3]}. לכן המסכה השלמה היא ${ddmMaskMap[cidr]}.`;
        break;
    }

    setGameQuestion({ prompt, correctAnswer, explanation });
    setUserGameAnswer('');
    setGameState('playing');
  };

  const handleGameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gameQuestion) return;

    const isCorrect = userGameAnswer.trim() === gameQuestion.correctAnswer;
    setIsGameCorrect(isCorrect);
    setGameState('answered');

    if (isCorrect) {
      addPoints(25); // Add 25 points for correct math!
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-right animate-fade-in" dir="rtl">
      
      {/* Tab Select Panel */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6.5 shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white">חישוב ותרגול סאבנט (Subnetting)</h2>
          <p className="text-xs text-slate-400">חיוני ביותר למעבר הבחינות של סיסקו (CCNA 200-301) עם שאלות חישוב במילישניות.</p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => {
              setActiveTab('calculator');
              setCalcResult(null);
            }}
            id="tab-subnet-calculator"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'calculator' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Calculator className="h-4 w-4 inline-block ml-1.5 shrink-0" />
            מחשבון סאבנטינג
          </button>
          
          <button
            onClick={() => {
              setActiveTab('game');
              setGameState('idle');
            }}
            id="tab-subnet-game"
            className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'game' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'
            }`}
          >
            <Target className="h-4 w-4 inline-block ml-1.5 shrink-0" />
            משחק מהירות סאבנט
          </button>
        </div>
      </div>

      {/* CALCULATOR INTERFACE */}
      {activeTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/50 space-y-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">ניתוח כתובת IP וחלוקת תת-רשתות</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">כתובת ה-IP המארחת (IPv4):</label>
                <input
                  type="text"
                  value={ipInput}
                  onChange={(e) => setIpInput(e.target.value)}
                  placeholder="למשל: 192.168.1.1"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">מסכת CIDR (מוצגת כעץ סלאש):</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="32"
                    value={cidrInput}
                    onChange={(e) => setCidrInput(Number(e.target.value))}
                    className="w-full text-indigo-600 accent-indigo-600 cursor-pointer"
                  />
                  <span className="font-extrabold text-sm min-w-[65px] text-center text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
                    /{cidrInput}
                  </span>
                </div>
              </div>

            </div>

            <button
              onClick={handleCalculateIp}
              id="btn-run-subnet-calc"
              className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-md text-sm cursor-pointer"
            >
              חשב ונתח פרטי תת-רשת
            </button>
          </div>

          {/* CALCULATOR RESULTS CARD */}
          {calcResult && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/50 space-y-6 animate-slide-down">
              <h3 className="text-base font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3">נתוני חישוב מפורטים עבור {ipInput}/{cidrInput}</h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-bold">כתובת הרשת (Network IP):</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm font-mono">{calcResult.network}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-bold">כתובת השידור (Broadcast):</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-black text-sm font-mono">{calcResult.broadcast}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-bold">מסכת תת-רשת עשרונית:</span>
                  <span className="text-slate-700 dark:text-slate-200 font-black text-sm font-mono">{calcResult.mask}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 col-span-2">
                  <span className="text-slate-400 block mb-1 font-bold">טווח כתובות שמישות למארחים (Host Range):</span>
                  <span className="text-green-600 dark:text-green-400 font-black text-sm font-mono">{calcResult.firstUsable} — {calcResult.lastUsable}</span>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400 block mb-1 font-bold">סה"כ מארחים שמישים (Hosts):</span>
                  <span className="text-slate-800 dark:text-white font-black text-sm font-mono">{calcResult.hostsCount.toLocaleString()} מארחים</span>
                </div>

              </div>

              {/* BINARY REPRESENTATION EDUCATIONAL VIEW */}
              <div className="p-5.5 bg-slate-900 text-indigo-300 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                <span className="text-xxs text-white font-bold block bg-white/10 px-2 py-1 rounded inline-block mb-1">מבט בינארי של נהלי הניתוב (Cisco Binary Classroom):</span>
                
                <div className="space-y-2">
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span>IP Address: </span>
                    <span className="text-white font-extrabold">{calcResult.ipBinary}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span>Subnet Mask:</span>
                    <span className="text-amber-400 font-extrabold">{calcResult.maskBinary}</span>
                  </div>
                  <div className="border-t border-slate-800 my-1"></div>
                  <div className="flex flex-col sm:flex-row justify-between gap-1">
                    <span>Network ID:  </span>
                    <span className="text-green-400 font-extrabold">{calcResult.networkBinary}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GAME INTERFACE */}
      {activeTab === 'game' && (
        <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-md border border-slate-100 dark:border-slate-700/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
            <span className="p-2.5 bg-amber-500/15 text-amber-500 rounded-xl">
              <Zap className="h-5 w-5 fill-current" />
            </span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white">משחק מהירות סאבנט (Subnet Challenge)</h3>
              <p className="text-xs text-slate-400">פתור במהירות את השאלה המוגרלת וזכה ב-<strong>+25 XP</strong> בכל פעם!</p>
            </div>
          </div>

          {gameState === 'idle' && (
            <div className="py-8 text-center space-y-4">
              <span className="text-5xl block animate-pulse">⏰🎯</span>
              <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">הגרל שאלה אקראית מעולם חישוב תת-הרשתות, חשב את התשובה והזן אותה במלואה.</p>
              <button 
                onClick={generateGameQuestion}
                id="btn-subnet-game-start"
                className="bg-indigo-600 hover:bg-indigo-505 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-md cursor-pointer text-xs"
              >
                הגרל שאלה ראשונה
              </button>
            </div>
          )}

          {gameState === 'playing' && gameQuestion && (
            <form onSubmit={handleGameSubmit} className="space-y-6 animate-fade-in">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl text-center">
                <span className="text-xxs font-bold text-indigo-500 block mb-1">השאלה שלך:</span>
                <p className="text-lg font-black text-slate-800 dark:text-white leading-normal">{gameQuestion.prompt}</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">הקלד את התשובה שלך (בדיוק מלא):</label>
                <input
                  type="text"
                  value={userGameAnswer}
                  onChange={(e) => setUserGameAnswer(e.target.value)}
                  placeholder="למשל: 192.168.1.128 או 14"
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-705 p-3.5 rounded-2xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center font-mono font-bold"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  id="btn-subnet-game-response-submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-550 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-md text-xs cursor-pointer"
                >
                  בדוק תשובה
                </button>
                <button
                  type="button"
                  onClick={generateGameQuestion}
                  className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 text-slate-500 p-3.5 rounded-xl border border-slate-200"
                  title="הגרל שאלה אחרת"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {gameState === 'answered' && gameQuestion && (
            <div className="space-y-6 animate-slide-down">
              
              <div className={`p-6 rounded-2xl text-center space-y-2 border ${
                isGameCorrect 
                  ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400'
              }`}>
                <span className="text-4xl block">{isGameCorrect ? '🎉🏆' : '❌💡'}</span>
                <h4 className="font-extrabold text-lg">{isGameCorrect ? 'תשובה נכונה מעולה!' : 'אופס... התשובה שגויה'}</h4>
                <p className="text-xs">
                  {isGameCorrect 
                    ? 'כל הכבוד! חישבת את הסאבנט נכון לגמרי. זכית ב-+25 XP נקודות.' 
                    : `לא נורא, ככה לומדים סאבנטינג ורשתות.`}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">התשובה שרשמת:</span>
                  <span className={`font-mono font-black ${isGameCorrect ? 'text-green-600' : 'text-red-500'}`}>{userGameAnswer}</span>
                </div>
                
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-1">התשובה הנכונה הרשמית:</span>
                  <span className="font-mono font-black text-green-600">{gameQuestion.correctAnswer}</span>
                </div>
              </div>

              {/* Step-by-step Math Explanation */}
              <div className="p-5.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[14px] md:text-[15px] text-slate-850 dark:text-slate-200 leading-relaxed">
                <span className="font-black text-slate-900 dark:text-white block mb-1.5">💡 הסבר החישוב של סיסקו (Step-by-Step):</span>
                <p className="font-medium">{gameQuestion.explanation}</p>
              </div>

              <button
                onClick={generateGameQuestion}
                id="btn-subnet-game-next"
                className="w-full bg-indigo-600 hover:bg-indigo-505 text-white font-black py-3.5 px-6 rounded-2xl transition-all shadow-md text-xs cursor-pointer flex items-center justify-center gap-1"
              >
                הגרל שאלה הבאה
                <RefreshCw className="h-4 w-4 shrink-0" />
              </button>

            </div>
          )}
        </div>
      )}

      {/* Back link */}
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
