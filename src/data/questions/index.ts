import { CCNAQuestion } from '../../types';
import { networkFundamentalsQuestions } from './network_fundamentals';
import { networkAccessQuestions } from './network_access';
import { ipConnectivityQuestions } from './ip_connectivity';
import { ipServicesQuestions } from './ip_services';
import { securityFundamentalsQuestions } from './security_fundamentals';
import { automationProgrammabilityQuestions } from './automation_programmability';
import { additionalCCNAQuestions } from './additional';
import { generateExtraQuestions } from './generator';

const staticQuestions: CCNAQuestion[] = [
  ...networkFundamentalsQuestions,
  ...networkAccessQuestions,
  ...ipConnectivityQuestions,
  ...ipServicesQuestions,
  ...securityFundamentalsQuestions,
  ...automationProgrammabilityQuestions,
  ...additionalCCNAQuestions
];

// Dynamically generate exactly the remaining questions to hit the 1000 target
const TARGET_TOTAL_QUESTIONS = 1000;
const neededCount = Math.max(0, TARGET_TOTAL_QUESTIONS - staticQuestions.length);
const generatedExtra = generateExtraQuestions(neededCount);

export const allCCNAPrepQuestions: CCNAQuestion[] = [
  ...staticQuestions,
  ...generatedExtra
];

export const ccnaDomainsList = [
  {
    id: 'network_fundamentals',
    name: 'יסודות הרשת',
    nameEn: 'Network Fundamentals',
    weight: 20,
    color: 'from-blue-500 to-indigo-600',
    iconName: 'Network'
  },
  {
    id: 'network_access',
    name: 'גישה לרשת (LAN/WLAN)',
    nameEn: 'Network Access',
    weight: 20,
    color: 'from-green-500 to-emerald-600',
    iconName: 'Cable'
  },
  {
    id: 'ip_connectivity',
    name: 'קישוריות IP וניתוב',
    nameEn: 'IP Connectivity',
    weight: 25,
    color: 'from-orange-500 to-amber-600',
    iconName: 'Route'
  },
  {
    id: 'ip_services',
    name: 'שירותי IP ויישומים',
    nameEn: 'IP Services',
    weight: 10,
    color: 'from-purple-500 to-violet-600',
    iconName: 'Layers'
  },
  {
    id: 'security_fundamentals',
    name: 'אבטחת מידע',
    nameEn: 'Security Fundamentals',
    weight: 15,
    color: 'from-red-500 to-rose-600',
    iconName: 'ShieldAlert'
  },
  {
    id: 'automation_programmability',
    name: 'אוטומציה ותכנותיות (SDN)',
    nameEn: 'Automation and Programmability',
    weight: 10,
    color: 'from-cyan-500 to-teal-600',
    iconName: 'Cpu'
  }
] as const;

export const ccnaQuickGlossary = [
  { term: 'OSPF', hebrewTranslation: 'פרוטוקול ניתוב דינמי מבוסס מצב-קישור', definition: 'Open Shortest Path First - פרוטוקול ניתוב פנימי פופולרי המחשב את המסלול הקצר ביותר באמצעות אלגוריתם דייקסטרה (Dijkstra) ומטריקת עלות (Cost).', domain: 'ip_connectivity' },
  { term: 'VLAN', hebrewTranslation: 'רשת מקומית וירטואלית', definition: 'Virtual Local Area Network - שיטה המאפשרת לחלק מתג פיזי יחיד למספר רשתות לוגיות נפרדות בשכבה 2, ליצירת מתחמי שידור שונים ושיפור האבטחה.', domain: 'network_access' },
  { term: 'NAT', hebrewTranslation: 'תרגום כתובות רשת', definition: 'Network Address Translation - שיטה לתרגום כתובות IP פרטיות (Private) לכתובות ציבוריות (Public) כדי לאפשר גלישה באינטרנט וחיסכון בכתובות IPv4.', domain: 'ip_services' },
  { term: 'PAT', hebrewTranslation: 'תרגום כתובות באמצעות פורטים', definition: 'Port Address Translation (NAT Overload) - הרחבה של NAT המאפשרת למאות מחשבים בעלי כתובות פנימיות שונות לצאת לאינטרנט דרך כתובת ציבורית אחת, בעזרת הפרדה של מספרי Source Port של הפרוטוקול.', domain: 'ip_services' },
  { term: 'STP', hebrewTranslation: 'פרוטוקול עץ פורס', definition: 'Spanning Tree Protocol (IEEE 802.1D) - פרוטוקול למניעת לולאות מיתוג (Switching Loops) ברמת שכבה 2 על ידי חסימת פורטים מסוימים עד לצורך בהפעלתם כגיבוי.', domain: 'network_access' },
  { term: 'RSTP', hebrewTranslation: 'פרוטוקול עץ פורס מהיר', definition: 'Rapid Spanning Tree Protocol (IEEE 802.1w) - גרסה משופרת ומהירה משמעותית של STP המאפשרת התכנסות יחסי מיתוג בשברירי שניות במקום 30-50 שניות.', domain: 'network_access' },
  { term: 'DHCP Snooping', hebrewTranslation: 'מעקב ופיקוח DHCP בפורטים', definition: 'מנגנון אבטחה בשכבה 2 המונע משרתי DHCP מזויפים (Rogue Servers) לחלק כתובות IP זרות למשתמשי הרשת, באמצעות סווג פורטים אמינים ולא-אמינים במתג.', domain: 'security_fundamentals' },
  { term: 'DAI', hebrewTranslation: 'בדיקת ARP דינמית', definition: 'Dynamic ARP Inspection - מנגנון אבטחה המשתמש בטבלת DHCP Snooping על מנת לאמת הודעות ARP ולמנוע הינדוס מחדש של כתובות MAC או התקפות ARP Poisoning.', domain: 'security_fundamentals' },
  { term: 'SDN', hebrewTranslation: 'רשתות מבוססות תוכנה', definition: 'Software-Defined Networking - גישה המפרידה בין ה-Control Plane (שכל הניהול) ל-Data Plane (העברת המידע פיזית) באמצעות העברתו לבקר מרכזי (Controller).', domain: 'automation_programmability' },
  { term: 'Ansible', hebrewTranslation: 'כלי ניהול קונפיגורציה אוטומטי', definition: 'מנוע אוטומציה וניהול תצורה פופולרי הפועל בשיטת Agentless (ללא צורך בסוכן קליינט) על גבי פרוטוקול SSH, בעזרת קבצי הגדרות YAML הקרויים Playbooks.', domain: 'automation_programmability' },
  { term: 'Subnet Mask', hebrewTranslation: 'מסכת רשת בתת-חלוקה', definition: 'ערך בעל 32 סיביות המגדיר אילו חלקים מכתובת ה-IP משוייכים לרשת (Network ID) ואילו משוייכים למארחים (Host ID).', domain: 'network_fundamentals' },
  { term: 'HSRP', hebrewTranslation: 'פרוטוקול נתב גיבוי חם', definition: 'Hot Standby Router Protocol - פרוטוקול קנייני של סיסקו השייך למשפחת FHRP, המאפשר לשני נתבים פיזיים לפעול כנתב וירטואלי אחד המהווה שער מחדל (Default Gateway) מגובה ללקוחות.', domain: 'ip_services' },
  { term: 'ALU/CPU', hebrewTranslation: 'יחידת עיבוד נתב', definition: 'רכיב עיבוד הנתב המריץ את מערכת ההפעלה Cisco IOS ומבצע ניתובים.', domain: 'network_fundamentals' },
  { term: 'WLC', hebrewTranslation: 'בקר רשת אלחוטית', definition: 'Wireless LAN Controller - מכשיר מרכזי המשמש לניהול, קונפיגורציה ואבטחה של עשרות או מאות Lightweight Access Points (LAPs) בארגון.', domain: 'network_access' },
  { term: 'ACL', hebrewTranslation: 'רשימת בקרת גישה', definition: 'Access Control List - סדרת חוקים המוגדרת על נתבים או מתגים המאפשרת לסנן או לחסום תעבורה על בסיס כתובות IP, פורטים, פרוטוקולים וכדומה.', domain: 'security_fundamentals' }
] as const;
