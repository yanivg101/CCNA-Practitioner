import { CCNAQuestion } from '../../types';

export const ipServicesQuestions: CCNAQuestion[] = [
  {
    id: 'is_1',
    domain: 'ip_services',
    subtopic: 'NAT ו-PAT (Port Address Translation)',
    question: 'מהו ההבדל המרכזי בין שימוש ב-NAT סטטי (Static NAT) לבין שימוש ב-PAT (NAT Overload) בארגונים?',
    options: [
      'Static NAT משתמש בספורט כגיבוי, בעוד PAT מצפין את האריזה.',
      'Static NAT מבצע מיפוי קבוע של אחד-לאחד (un-to-one) בין כתובת פרטית לכתובת ציבורית אחת, בעוד PAT מאפשר למספר רב של כתובות פרטיות לחלוק כתובת ציבורית אחת (או מספר קטן שלהן) על ידי שימוש במספרי פורטים (Source Ports) שונים.',
      'Static NAT מיועד לרשתות אלחוטיות בלבד ו-PAT פועל רק על גבי סיבים אופטיים.',
      'PAT פותר בעיות בשכבה 2 של מודל OSI ו-Static NAT פועל בשכבה 4.'
    ],
    correctAnswer: 1,
    explanation: 'Static NAT מעניק כתובת ציבורית ייעודית מול כל כתובת פנימית פרטית (אחד לאחד). הוא משמש בעיקר לשרתים פנימיים שצריכים להיות נגישים מבחוץ. לעומת זאת, PAT (Port Address Translation או NAT Overload) ממפה אלפי כתובות פרטיות פנימיות למקור חיצוני בודד על ידי תיוג מזהי הפורט של תעבורת ה-TCP/UDP של כל שיחה, מה שחוסך כתובות IPv4 יקרות ערך.',
    hint: 'חשוב על "Overload" כמטען נוסף על כתובת ציבורית יחידה באמצעות מספרי פורט (Ports).',
    additionalInfo: 'PAT הוא הלב של גלישת האינטרנט הביתית והארגונית כיום, המשמש כמעט בכל נתב קצה אינטרנטי.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 5 - Implementing IPv4 NAT'
  },
  {
    id: 'is_2',
    domain: 'ip_services',
    subtopic: 'שירות DHCP',
    question: 'איזו פקודה ב-Cisco IOS יש להגדיר על ממשק נתב (router interface) המקבל בקשות DHCP ממחשבי קצה, על מנת להעביר (Relay) את בקשות ה-Broadcast של הלקוחות כבקשות Unicast אל שרת DHCP מרכזי הנמצא בסגמנט/רשת אחרת?',
    options: [
      'ip dhcp pool',
      'ip helper-address <ip-address>',
      'ip forward-protocol',
      'dhcp relay enable'
    ],
    correctAnswer: 1,
    explanation: 'מכיוון שחבילות הדיסקברי של DHCP (DHCP Discover) נשלחות ב-Broadcast, נתבים אינם מעבירים אותן כברירת מחדל לרשתות אחרות. פקודת ה-"ip helper-address <ip-address>" מוגדרת תחת ממשק ה-Gateway הפונה לרשת הקצה. פקודה זו מורה לנתב להאזין לבקשות ה-DHCP (בפורט UDP 67) ולהסב אותן מחבילות Broadcast לחבילות Unicast ממוקדות לכיוון כתובת ה-IP הציבורית של שרת ה-DHCP המרכזי.',
    hint: 'הנתב עוזר (Helper) ללקוח למצוא שרת DHCP ברשת מרוחקת.',
    additionalInfo: 'מעבר ל-DHCP, פקודת ה-Helper Address מעבירה כברירת מחדל עוד 7 שירותי UDP לפרוטוקול כגון DNS, TFTP, ו-NTP.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 18 - Implementing DHCPv4'
  },
  {
    id: 'is_3',
    domain: 'ip_services',
    subtopic: 'First Hop Redundancy Protocol (FHRP) - HSRP',
    question: 'בפרוטוקול גיבוי השער הראשי HSRP (Hot Standby Router Protocol) של סיסקו, מה קורה לנתב המוגדר עם עדיפות (Priority) גבוהה יותר ופקודת "preempt", כאשר נתב ה-Active הנוכחי קורס וחוזר לתפקוד מלא?',
    options: [
      'הוא יישאר במצב Standby כיוון שאסור לבצע חטיפה של תפקיד ה-Active לאחר ההפעלה.',
      'הנתב בעל העדיפות הגבוהה יותר יתפוס מחדש (Preempt) ובאופן אקטיבי את הנהגת ה-Active בזכות פקודת ה-preempt המאפשרת לו להחליף את הנתב הפחות עדיף.',
      'כל המחשבים ברשת יפסיקו לשלוח מידע עד שמנהל הרשת יפתור את הנתק פיזית.',
      'שני הנתבים יתאחדו לנתב פיזי אחד באמצעות כבל חומרה.'
    ],
    correctAnswer: 1,
    explanation: 'פקודת "preempt" ב-HSRP מאפשרת לנתב בעל עדיפות (Priority) גבוהה יותר לתפוס מחדש את תפקיד ה-Active Router אם הוא הופך לפעיל באיחור (למשל לאחר אתחול או תקלה שתוקנה). ללא פקודה זו, הנתב שכרגע מחזיק בתפקיד ה-Active יישאר פעיל, גם אם הנתב השני הוא בעל עדיפות גבוהה יותר ואיבד זמנית את הקשר.',
    hint: 'Preempt פירושו בלועזית השתלטות מחדש או דחיקה בריאה על בסיס עדיפות של מנהיג ישן שמחלים.',
    additionalInfo: 'עדיפות ברירת המחדל ב-HSRP היא 100. ערכים גבוהים שואפים למצב Active.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6 - First Hop Redundancy Protocols'
  },
  {
    id: 'is_4',
    domain: 'ip_services',
    subtopic: 'Network Time Protocol (NTP)',
    question: 'מה מייצג מושג ה-Stratum בפרוטוקול סנכרון הזמן NTP ואיזה ערך מספק את רמת הדיוק וקירבה הגבוהה ביותר לשעון אטומי מקור?',
    options: [
      'רמת אבטחה של השעון, כאשר Stratum 15 הוא המאובטח ביותר.',
      'המרחק הלוגי (מספר הדילוגים / Hops) ממקור הזמן האטומי המדויק. הציון הדיוק המגזר הגבוה ביותר הוא Stratum 0 ו-Stratum 1.',
      'סוג כבל הרשת המחובר לשעון האנלוגי.',
      'זמן השיהוי הכולל במילישניות של הנתון בדרך.'
    ],
    correctAnswer: 1,
    explanation: 'בפרוטוקול NTP, רמת ה-Stratum מצביעה על המרחק ההיררכי ממקור הזמן הראשי (Reference clock כגון שעון אטומי או GPS). שעון הייחוס המדויק פיזית עצמו נקרא Stratum 0. שרת NTP המחובר ישירות אליו נקרא Stratum 1. שרתי NTP המסתנכרנים משרת Stratum 1 נקראים Stratum 2, וכך הלאה. ככל שערך ה-Stratum נמוך יותר, השעון נחשב ליותר מדויק ואמין ברשת.',
    hint: 'Stratum מייצג "שכבה" היררכית. מספר קטן של שכבות פירושו קרבה מקסימלית למקור.',
    additionalInfo: 'ערך Stratum המקסימלי השמיש ב-NTP הוא 15. ערך של 16 מייצג מכשיר שאינו מסונכרן כלל (Unsynchronized).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 3 - IP Services NTP'
  },
  {
    id: 'is_5',
    domain: 'ip_services',
    subtopic: 'SNMP (Simple Network Management Protocol)',
    question: 'איזו גרסת SNMP מציעה שיפור חיוני של אבטחה באמצעות הצפנת מידע (Data Encryption), אימות שולח (Authentication), ובדיקת שלמות המידע (Integrity Check)?',
    options: [
      'SNMPv1',
      'SNMPv2c',
      'SNMPv3',
      'SNMPv4'
    ],
    correctAnswer: 2,
    explanation: 'SNMPv3 מוסיפה תכונות קריטיות של אבטחה שאינן קיימות בגרסאות הקודמות (SNMPv1 ו-SNMPv2c שהעבירו סיסמאות community-string בטקסט פשוט - Cleartext). SNMPv3 תומכת בשימושים של הצפנת המנות (Privacy - HMAC-DES/AES) ואימות משתמש של ממש (Authentication - MD5/SHA) להבטחת שלמות וסודיות נתוני ניהול הרשת.',
    hint: 'הגרסה השלישית והמודרנית של הפרוטוקול שנכנסה לשימוש נרחב כתוצאה מדרישות אבטחת מידע קפדניות.',
    additionalInfo: 'היא מתבססת על מודל USM (User-based Security Model) המקשר משתמשים לקבוצות תחת חוקים נוקשים.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 4 - IP Services SNMP'
  },
  {
    id: 'is_6',
    domain: 'ip_services',
    subtopic: 'Syslog',
    question: 'מהי רמת החומרה (Severity level) של הודעת ה-Syslog המצביעה על תקלה חמורה מסוג "Error" בה נתקלת מערכת המכשיר?',
    options: [
      'רמה 0 (Emergency)',
      'רמה 3 (Error)',
      'רמה 5 (Notification)',
      'רמה 7 (Debugging)'
    ],
    correctAnswer: 1,
    explanation: 'הודעות Syslog מבוססות על שמונה רמות חומרה (0-7): 0 - Emergency, 1 - Alert, 2 - Critical, 3 - Error, 4 - Warning, 5 - Notification, 6 - Informational, 7 - Debugging. הודעה ברמת Error משויכת ישירות לספרת החומרה 3.',
    hint: 'זכור את המשפט "Every Alarmed Critic Extremely Warns New Intelligent Developers" כדי לזכור את הסדר מ-0 עד 7.',
    additionalInfo: 'ידע על דרגות חומרה אלו קריטי להבנת רמות הסינון שאנו מגדירים תחת הפקודה "logging trap <level>".',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 4 - IP Services Syslog'
  }
];
