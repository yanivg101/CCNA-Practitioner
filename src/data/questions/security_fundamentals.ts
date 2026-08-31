import { CCNAQuestion } from '../../types';

export const securityFundamentalsQuestions: CCNAQuestion[] = [
  {
    id: 'sf_1',
    domain: 'security_fundamentals',
    subtopic: 'Port Security on Switches',
    question: 'מהי הפעולה המוגדרת כברירת מחדל (Default Violation Mode) במתג סיסקו כאשר מופעלת תכונת ה-Port Security ומתגלה חריגת תנועה (למשל, חיבור מחשב לא מוכר עם MAC כפול)?',
    options: [
      'Protect (חסימת חבילות המידע הבלתי מורשות בלבד ללא השבתת הפורט וללא הוספת רישום ליומן).',
      'Restrict (חסימת חבילות המידע הבלתי מורשות, הגדלת מונה החריגות ושליחת הודעת Syslog/SNMP Trap).',
      'Shutdown (השבתה מיידית וסגירה פיזית של הפורט למצב err-disabled, הגדלת מונה החריגות ושליחת התראה).',
      'Disable (ביטול אבטחה בפורט לצורך זרימה חלקה).'
    ],
    correctAnswer: 2,
    explanation: 'מצב ברירת המחדל של Port Security Violation הוא Shutdown. כאשר מעוררת חריגה (Violation), הפורט מושבת באופן פתאומי ומעובר למצב "err-disabled". הנורית הפיזית הופכת לכתומה, נשלחת הודעת Syslog חמורה ונרשמת תקלה. מנהל הרשת נדרש לבצע "shutdown" ואז "no shutdown" בפורט כדי להחזירו לעבודה לאחר פתרון הבעיה.',
    hint: 'זוהי הדרך הקשוחה והבטוחה ביותר לשמור על מבצעי הרשת הפיזיים בארגון במצב השבתה מלא.',
    additionalInfo: 'ישנם שלושה מצבי Port Security Violation: Protect, Restrict ו-Shutdown. רק Restrict ו-Shutdown יוצרים חיווי והודעות Syslog.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11 - Implementing Switch Port Security'
  },
  {
    id: 'sf_2',
    domain: 'security_fundamentals',
    subtopic: 'Access Control Lists (ACL)',
    question: 'מהו ההבדל המהותי ביותר בחוקי הסינון והמיקום בין ACL סטנדרטי (Standard ACL) ל-ACL מורחב (Extended ACL) ברשתות סיסקו?',
    options: [
      'Standard ACL מסנן לפי מקור ויעד ביחד, ומוצב קרוב ליעד. Extended ACL מסנן לפי מקור בלבד ומוצב קרוב למקור.',
      'Standard ACL מסנן לפי כתובת IP מקור בלבד (Source IP) ויש למקם אותו קרוב ככל האפשר ליעד. Extended ACL מסנן לפי IP מקור, IP יעד, פרוטוקול ומספרי פורטים (Ports) ויש למקם אותו קרוב ככל האפשר למקור.',
      'Standard ACL עובד רק בשכבה 2 של מודל OSI, בעוד Extended ACL עובד בשכבה 5.',
      'אין שום הבדל בתפקוד ביניהם חוץ ממספרי המסגרות השונים שמוקצים להם.'
    ],
    correctAnswer: 1,
    explanation: 'Standard ACL בודק אך ורק את כתובת ה-IP של המקור (Source Address), ולכן יש למקם אותו קרוב ככל האפשר ליעד כדי לא לחסום בטעות תנועה לגיטימית לרשתות אחרות בדרך. Extended ACL הוא הרבה יותר ספציפי: הוא מאפשר סינון על פי IP מקור, IP יעד, סוג פרוטוקול (TCP/UDP/ICMP/IP) ומספרי פורטים (כגון 80, 443, 22), ולכן מומלץ למקם אותו קרוב ככל האפשר למקור כדי לחסוך רוחב פס ברשת.',
    hint: 'זכור את חוק האצבע: "Standard close to destination, Extended close to source".',
    additionalInfo: 'טווח המספרים עבור Standard ACL הוא 1-99 ו-1300-1999. עבור Extended ACL טווח המספרים הוא 100-199 ו-2000-2699.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 7 - IPv4 Access Control Lists'
  },
  {
    id: 'sf_3',
    domain: 'security_fundamentals',
    subtopic: 'Access Control Lists (ACL)',
    question: 'מנהל רשת כתב את ה-ACL הבא עבור ממשק נתב, מתוך כוונה לחסום גלישה לשרת אינטרנט ספציפי אך לאשר את כל שאר התעבורה בארגון:\naccess-list 101 deny tcp any host 10.1.1.100 eq 80\nהוא יישם את ה-ACL על הממשק בכיוון inbound. אילו תוצאות תעבורה יתקבלו בפועל?',
    options: [
      'התעבורה לשרת האינטרנט תיחסם, וכל שאר התעבורה לאינטרנט ברשת תעבור בצורה תקינה לחלוטין.',
      'כל התעבורה העוברת דרך הממשק תיחסם לחלוטין עבור כולם, כולל תנועת האינטרנט ותנועת הפינגים המותרת.',
      'ה-ACL לא יעבוד בכלל משום שהשתמשו במספר הלא נכון של הטווח.',
      'הנתב יודיע על שגיאה פיזית במעבד ויכבה את הממשק לעבודה.'
    ],
    correctAnswer: 1,
    explanation: 'בסוף כל רשימת גישה (ACL) בנתבי סיסקו קיים חוק סמוי שלא נרשם פיזית אך פועל תמיד: "implicit deny all" (חסימה מוחלטת לכל מה שלא אושר במפורש קודם לכן). מאחר שמנהל הרשת הגדיר שורת חסימה (Deny) אך לא הוסיף שום שורת אישור (Permit) עבור שאר התעבורה, כל שאר חבילות המידע יידחו וייחסמו על ידי הנתב בשל החוק הסמוי. כדי לפתור זאת יש להוסיף את השורה: "access-list 101 permit ip any any".',
    hint: 'זכור את חוק הברזל הסמוי של סיסקו המבצע השמדה מסננת לכל מה שלא אושר במפורש.',
    additionalInfo: 'זוהי אחת הטעויות הנפוצות ביותר בקרב טכנאי רשתות מתחילים וקריטי לפתרון תרחישי CLI בבחינה.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 8 - Advanced IPv4 ACLs'
  },
  {
    id: 'sf_4',
    domain: 'security_fundamentals',
    subtopic: 'DHCP Snooping',
    question: 'כיצד טכנולוגיית DHCP Snooping מגנה על מתגים Layer 2 מפני התקפות של שרת DHCP עוין או מזויף (Rogue DHCP Server)?',
    options: [
      'על ידי הצפנת כל כתובות ה-IP שמוקצות באופן אלחוטי.',
      'על ידי חלוקת הפורטים במתג לשתי קטגוריות: פורטים אמינים (Trusted Interfaces - הפונים לשרת האמיתי או לנתב הקצה) ופורטים לא אמינים (Untrusted Interfaces - הפונים למשתמשי הקצה). המתג יסנן ויחסום כל הודעת DHCP Offer או DHCP ACK המגיעה מפורט שאינו אמין.',
      'על ידי החלפת פרוטוקול DHCP בפרוטוקול FTP מאובטח יותר.',
      'היא מסמנת את המחשב העוין ומנתקת לו את החשמל הפיזי בחדר השרתים.'
    ],
    correctAnswer: 1,
    explanation: 'מנגנון ה-DHCP Snooping מיושם על מתגים Layer 2 כדי למנוע התקפות MITM (Man-in-the-Middle) באמצעות שרת DHCP מזויף. המערכת מחלקת את פורטי המתג ל-Trusted ו-Untrusted. הודעות תגובה של שרתי DHCP (כמו Offer, ACK ו-NAK) מורשות לחלוף אך ורק דרך פורטים המסומנים כ-Trusted. אם הודעת שרת כזו מגיעה מפורט Untrusted (הפונה למשתמש קצה רגיל), המתג יחסום אותה מיד ויכבה את הפורט.',
    hint: 'Trusted פירושו אמין ומיועד לכיוון שרתי אמת, Untrusted מיועד לפורטים של לקוחות קצה שאינם רשאים לחלק כתובות IP.',
    additionalInfo: 'מנגנון זה גם בונה את טבלת ה-DHCP Snooping Binding Table המקשרת כתובות MAC, כתובות IP, פורטים ורשתות VLAN, והיא מהווה בסיס לפרוטוקול אבטחה נוסף שנקרא DAI.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 13 - DHCP Snooping and DAI'
  },
  {
    id: 'sf_5',
    domain: 'security_fundamentals',
    subtopic: 'Dynamic ARP Inspection (DAI)',
    question: 'כיצד פועל מנגנון ה-Dynamic ARP Inspection (DAI) להגנה על הרשת המקומית מפני התקפות ARP Spoofing ו-ARP Poisoning?',
    options: [
      'הוא דורש מכל מחשב קצה להתחבר לרשת באמצעות תעודת זהות דיגיטלית של אבטחה.',
      'הוא בודק את הודעות ה-ARP העוברות דרך הפורטים ומאמת אותן (התאמה של MAC ל-IP) מול מאגר המידע האמין שנוצר על ידי טבלת ה-DHCP Snooping Binding DB. הודעות לא תואמות נחסמות מיד.',
      'הוא מבטל לחלוטין את מנגנון ה-ARP ברשת ומסב הכל לכתובות סטאטיות המוגדרות במתגים פיזית.',
      'הוא מקטין את טווח השידור של הנתב הראשי לחצי.'
    ],
    correctAnswer: 1,
    explanation: 'מנגנון Dynamic ARP Inspection (DAI) בא להגן מפני התקפות ARP Poisoning בשכבה 2. DAI מאמת את הכתובות המופיעות בהודעות ה-ARP (אימות שה-IP משויך ל-MAC הנכון המדווח) דרך פורטים שאינם אמינים (untrusted). לצורך האימות, DAI נעזר בטבלת ה-DHCP Snooping Binding Database שנוצרה קודם לכן. אם ההודעה אינה תואמת למידע ששמור בטבלה, הודעת ה-ARP נחסמת ונמחקת.',
    hint: 'מנגנון DAI תלוי באופן מוחלט בהפעלתו המוקדמת של מנגנון ה-DHCP Snooping ברשת.',
    additionalInfo: 'מניעת התקפות ARP Spoofing חוסמת את ההאקר מליירט תעבורה המיועדת לשער ברירת המחדל (Default Gateway Spoofing).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 13 - DHCP Snooping and DAI'
  },
  {
    id: 'sf_6',
    domain: 'security_fundamentals',
    subtopic: 'AAA Security Framework',
    question: 'במודל אבטחת המידע AAA, מה מייצג כל אחד מהרכיבים Authentication, Authorization, ו-Accounting בהתאמה?',
    options: [
      'ניהול סיסמאות, פיקוח על עדכונים, איתור תקלות.',
      'הזדהות (אימות מי המשתמש), הרשאות (מה מותר למשתמש לעשות), ורישום/תיעוד (מה המשתמש ביצע בפועל במערכת במהלך פעילותו).',
      'שחזור קבצים, מניעת וירוסים, כתיבת דוחות ליושב ראש.',
      'מניעת גישות, סגירת פורטים, שימוש בהצפנות קווי תקשורת.'
    ],
    correctAnswer: 1,
    explanation: 'המונח AAA מייצג שלוש שכבות אבטחה משלימות: 1) Authentication (אימות) - קובע ומזהה האם המשתמש הוא מי שהוא טוען שהוא (למשל על ידי סיסמה או שם משתמש). 2) Authorization (הרשאה) - קובע אילו פקודות או משאבים מותר למשתמש המזוהה לגשת אליהם (למשל, האם מותר לו להריץ הגדרות config). 3) Accounting (חשבונאות/תיעוד) - רושם ומתעד את כל הפעולות שנוהלו והודפסו על ידי המשתמש לצורך אבטחה ומעקב היסטורי.',
    hint: 'חשוב על כך: 1) מי אתה? 2) מה מותר לך לעשות? 3) מה עשית בפועל במערכת?',
    additionalInfo: 'פרוטוקולי AAA נפוצים המקשרים את המכשירים לשרת מרכזי נקראים TACACS+ (פותח על ידי סיסקו, משתמש ב-TCP 49 ומפריד באופן מלא בין השלבים) ו-RADIUS (תקן פתוח המבוסס על UDP).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 2 - Security Architectures'
  }
];
