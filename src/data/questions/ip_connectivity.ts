import { CCNAQuestion } from '../../types';

export const ipConnectivityQuestions: CCNAQuestion[] = [
  {
    id: 'ic_1',
    domain: 'ip_connectivity',
    subtopic: 'כללי בחירת נתיבים בניתוב',
    question: 'אם לנתב יש ארבעה נתיבים שונים בטבלת הניתוב עבור אותה חבילת מידע יעד, כיצד הוא יחליט באיזה נתיב (Route) להשתמש בפועל להעברת המידע?',
    options: [
      'הוא יבחר בנתיב עם ה-Administrative Distance (AD) הנמוך ביותר.',
      'הוא יבחר בנתיב בעל התאמת התחילית הארוכה ביותר (Longest Prefix Match) - מסיכת רשת הארוכה והמדויקת ביותר.',
      'הוא יבחר בנתיב בעל המטריקה (Metric) הנמוכה ביותר ללא קשר למסכה.',
      'הוא יבצע שליחה מקבילה לכל ארבעת הנתיבים כדי להבטיח את הגעת החבילה המהירה ביותר.'
    ],
    correctAnswer: 1,
    explanation: 'הקריטריון הראשון והעליון שקובע כיצד נתב בוחר נתיב בטבלת הניתוב הוא "התאמת התחילית הארוכה ביותר" (Longest Prefix Match). הנתב מחפש את התשובה הספציפית והמדויקת ביותר עבור כתובת היעד (למשל, /28 עדיפה על /24 ועדיפה על /16). רק כאשר יש התאמות בעלות אורך תחילית זהה לחלוטין, הנתב יבחר בין פרוטוקולים על בסיס AD, ואם גם ה-AD זהה (אותו פרוטוקול) הוא יבחר על פי Metric.',
    hint: 'חשוב על כך שהדיוק והספציפיות בכתובת תמיד קודמים לפרוטוקול או לעלות הניתוב.',
    additionalInfo: 'זהו אחד מחוקי הברזל הבסיסיים ביותר של מדע הניתוב ברשתות IP וקריטי עבור פתרון תקלות בבחינת CCNA.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15 - Operating Cisco Routers'
  },
  {
    id: 'ic_2',
    domain: 'ip_connectivity',
    subtopic: 'Administrative Distance (AD)',
    question: 'מהו ה-Administrative Distance ברירת המחדל (Default AD) עבור הפרוטוקולים הבאים: נתיב מחובר ישירות (Directly Connected), נתיב סטטי (Static Route) ופרוטוקול OSPF בהתאמה?',
    options: [
      '0, 1, 110',
      '1, 0, 90',
      '0, 10, 120',
      '1, 5, 110'
    ],
    correctAnswer: 0,
    explanation: 'ה-Administrative Distance (AD) קובע את מידת האמינות של המקור שממנו מגיע המידע הניתוב. לחיבור שמחובר ישירות פיזית (Directly Connected) יש את האמינות הגבוהה ביותר ולכן ה-AD שלו הוא 0. לנתיב סטטי (Static Route) שהוגדר ידנית על ידי מנהל הרשת יש AD של 1. עבור נתיבים שנלמדו באמצעות פרוטוקול OSPF הדינמי, ה-AD ברירת המחדל הוא 110.',
    hint: 'זכור כי AD נמוך יותר מעיד על פרוטוקול אמין יותר, וכי קפיצה אחת פיזית למכשיר (Connected) היא המוערכת ביותר.',
    additionalInfo: 'ערכי AD פופולריים נוספים: EIGRP (Internal) = 90, RIP = 120, External BGP = 20.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 16 - Understanding IPv4 Routing'
  },
  {
    id: 'ic_3',
    domain: 'ip_connectivity',
    subtopic: 'Floating Static Route',
    question: 'ברצונך להגדיר נתיב סטטי צף (Floating Static Route) שישמש כגיבוי בלבד לנתיב OSPF קיים ויכנס לפעולה רק אם ערוץ ה-OSPF הראשי נופל. כיצד תצליח לבצע זאת ב-Cisco IOS CLI?',
    options: [
      'על ידי הגדרת נתיב סטטי חדש עם Administrative Distance (AD) גבוה יותר מ-110 (למשל 120).',
      'על ידי הגדרת הפקודה "ip route" עם מטריקת קפיצות (Metric hop count) מועדפת של 1.',
      'על ידי הגדרת ה-Administrative Distance של הנתיב הסטטי ל-0.',
      'על ידי הטמעת תרגום NAT על קו ה-OSPF ישירות אל מעבד הנתב.'
    ],
    correctAnswer: 0,
    explanation: 'כדי ליצור נתיב סטטי צף (Floating Static Route), מגדירים נתיב סטטי ידנית דרך CLI ומוסיפים בסוף פקודת ה-"ip route" ערך AD מותאם הגבוה יותר מה-AD של פרוטוקול הניתוב הראשי. OSPF פועל עם AD 110, ולכן אם נגדיר נתיב סטטי עם AD של 120, הנתב יעדיף תמיד את OSPF. ברגע שמסלול ה-OSPF ייכשל ויימחק מטבלת הניתוב, הנתיב הסטטי הגיבוי ה"צף" עם ה-AD 120 יוכנס אוטומטית לטבלה.',
    hint: 'כדי שהנתיב הסטטי "יצוף" וימתין, הוא חייב להיות פחות מועדף (בעל AD גבוה יותר) מהנתיב הדינמי הקיים.',
    additionalInfo: 'דוגמה לפקודה: "ip route 10.0.0.0 255.0.0.0 192.168.1.1 120" שבה המספר 120 בסוף הוא ה-AD המשונה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 16 - Understanding IPv4 Routing'
  },
  {
    id: 'ic_4',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'כיצד נתבי OSPF מחליטים על קביעת ה-Router ID (RID) הלוגי שלהם אם מנהל הרשת לא הגדיר אותו ידנית בעזרת הפקודה "router-id"?',
    options: [
      'הנתב לוקח את כתובת ה-IP השמישה הגבוהה ביותר מבין ממשקי ה-Loopback הוירטואליים. אם אין ממשקי Loopback, הוא לוקח את כתובת ה-IP השמישה הגבוהה ביותר מבין הממשקים הפיזיים הפעילים.',
      'הנתב משתמש בכתובת ה-MAC הגבוהה ביותר על פורט ה-Consoles.',
      'הנתב פונה לבקשת בחירתו אל שרת ה-WLC האלחוטי בארגון.',
      'הנתב בוחר מספר אקראי לחלוטין בין 1 ל-254.'
    ],
    correctAnswer: 0,
    explanation: 'אם ה-Router ID (RID) אינו מוגדר ידנית ב-OSPF, תהליך הבחירה האוטומטי מתבצע כך: 1) הנתב בוחר את כתובת ה-IP הפעילה הגבוהה ביותר מבין ממשקי ה-Loopback הקיימים (מכיוון שהם וירטואליים ויציבים ואל נופלים לעולם). 2) אם אין ממשק Loopback המוגדר בנתב, הוא בוחר את כתובת ה-IP השמישה הגבוהה ביותר מבין כל הממשקים הפיזיים הפעילים שלו.',
    hint: 'מנשק Loopback תמיד עדיף על מנשק פיזי בגלל היציבות שלו בקביעת זהות הנתב.',
    additionalInfo: 'הגדרת ה-Router ID באופן ידני מונעת שינויים בלתי צפויים בזהות הנתב לאחר אתחול או החלפת קווים והיא נחשבת כ-Best Practice.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20 - Implementing OSPFv2'
  },
  {
    id: 'ic_5',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'למה משמשת הפקודה "passive-interface" תחת הגדרות פרוטוקול OSPF בנתב סיסקו?',
    options: [
      'היא מכבה לחלוטין את הפורט הפיזי כדי למנוע כניסת האקרים לרשת.',
      'היא מונעת מהנתב לשלוח הודעות OSPF Hello (ולכן מונעת יצירת קשרי שכנות) דרך הממשק המוגדר, אך עדיין כוללת ומשדרת את רשת הממשק הזה במסגרת עדכוני הניתוב לשותפויות האחרות.',
      'היא גורמת לנתב להאזין בלבד ולפעול במצב פסיבי ללא בניית טבלה משלו.',
      'היא הופכת את המטריקה של אותו חיבור לאינסוף (Infinity).'
    ],
    correctAnswer: 1,
    explanation: 'שימוש ב-"passive-interface" משתיק את משלוח הודעות ה-Hello של OSPF מהממשק הספציפי. דבר זה מונע בזבוז רוחב פס על תקשורת ניתוב לא נחוצה לכיוון מחשבי קצה, ומונע התחברות של נתבים זרים המאיימים על אבטחת הרשת. הרשת שמוגדרת על גבי הפורט הזה עדיין מוכרזת (Advertised) לנתבי OSPF האחרים שמחוברים דרך ממשקים רגילים.',
    hint: 'פורט פסיבי מפסיק לשלוח Hello Packets, אך הרשת שלו עדיין שותפה בעדכוני הניתוב לרשתות האחרות במבנה ה-OSPF.',
    additionalInfo: 'נפוץ ביותר לשימוש בכיוון רשתות משתמשי קצה (LAN Access Networks) שבהן אין נתבים אחרים שצריכים לדבר OSPF.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20 - Implementing OSPFv2'
  },
  {
    id: 'ic_6',
    domain: 'ip_connectivity',
    subtopic: 'עלויות ומטריקות OSPF',
    question: 'כיצד מחושבת עלות (Cost) של ממשק ב-OSPF ומהי נוסחת ברירת המחדל המשמשת לכך?',
    options: [
      'העלות שווה באופן פשוט לכמות הקפיצות (Hops) אל היעד.',
      'העלות מחושבת כ-10 בחזקת 8 חלקי רוחב הפס של הממשק (10^8 / Bandwidth).',
      'העלות נקבעת על פי אורך הסיב האופטי במטרים.',
      'העלות קבועה ותמיד שווה ל-10 עבור כל הממשקים ללא קשר למהירותם.'
    ],
    correctAnswer:1,
    explanation: 'המטריקה ב-OSPF מבוססת על עלות (Cost). כברירת מחדל, הנוסחה לקביעת עלות ממשק היא: Reference Bandwidth / Bandwidth of interface, כאשר קבוע הרפרנס הוא 100 Mbps (מוצג כ-10^8). במצב זה, פורט Fast Ethernet (מהירות 100 Mbps) יקבל עלות של 1 (100M/100M).',
    hint: 'Reference Bandwidth הוא כלי החישוב השקול ל-100 מיליון ביטים לשנייה.',
    additionalInfo: 'מכיוון שחומרה מודרנית משתמשת ב-Gigabit Ethernet (1 Gbps) ומעלה, מומלץ לשנות את ערך הרפרנס בעזרת הפקודה "auto-cost reference-bandwidth" כדי למנוע מצב בו לשניהם תהיה עלות זהה של 1.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 21 - OSPF Tuning'
  }
];
