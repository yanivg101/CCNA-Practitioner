import { CCNAQuestion } from '../../types';

export const automationProgrammabilityQuestions: CCNAQuestion[] = [
  {
    id: 'ap_1',
    domain: 'automation_programmability',
    subtopic: 'ארכיטקטורת SDN וממשקי API',
    question: 'בארכיטקטורת רשת מבוססת תוכנה (SDN - Software Defined Networking), מהו תפקידו של ממשק ה-Northbound API בהשוואה ל-Southbound API?',
    options: [
      'Northbound API מקשר בין הבקר (Controller) לבין מכשירי התקשורת הפיזיים (כגון מתגים ונתבים), בעוד Southbound API מקשר בין הבקר לאפליקציות הניהול ולמערכות התוכנה העליונות.',
      'Northbound API משמש לתקשורת אלחוטית בלבד ו-Southbound API לתקשורת קווית.',
      'Northbound API מקשר בין בקר ה-SDN לבין אפליקציות ניהול, קוד ותוכניות חיצוניות (של משתמשים או חברות פיתוח), בעוד Southbound API משמש את הבקר כדי לנהל ולהכתיב הגדרות למכשירי הרשת הפיזיים (מתגים ונתבים) תחתיו.',
      'Northbound API מקשר את הנתב לאינטרנט ו-Southbound API מקשר אותו לחומת האש המקומית.'
    ],
    correctAnswer: 2,
    explanation: 'בארכיטקטורת SDN, בקר הרשת (Controller) נמצא במרכז. הממשקים הפונים "למעלה" לכיוון האפליקציות, קודי הפיתוח (Python וכדומה) ומערכות התוכנה הארגוניות נקראים Northbound APIs (לרוב מבוססי REST). הממשקים הפונים "למטה" אל מכשירי הקצה הפיזיים ומכתיבים להם את הגדרות זרימת המידע (Control Plane to Data Plane) נקראים Southbound APIs (באמצעות פרוטוקולים כמו OpenFlow, NETCONF או RESTCONF).',
    hint: 'חשוב על מפה: צפון (North) הוא למעלה לכיוון פיתוח ותוכנה, דרום (South) הוא למטה לכיוון החומרה והמתגים הפיזיים.',
    additionalInfo: 'מבנה זה מאפשר להוציא את ה-Control Plane (שכל הניהול) מכל המכשירים בנפרד ולרכז אותו בתוכנה אחת חכמה ויעילה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16 - Introduction to Controller-Based Networking'
  },
  {
    id: 'ap_2',
    domain: 'automation_programmability',
    subtopic: 'פורמטים של נתונים (JSON)',
    question: 'מהם המאפיינים והתרקודת התחבירית הנכונה לייצוג נתונים וערכים בפורמט JSON המקובל בתעבורת REST APIs?',
    options: [
      'הנתונים נרשמים בתגיות קשיחות עם סוגריים משולשים כגון <term>value</term>.',
      'הנתונים מיוצגים כזוגות של מפתח וערך ("key": value) הנתחמים בתוך סוגריים מסולסלים { }, וערכים מרובים בתוך רשימה/מערך נתחמים בתוך סוגריים מרובעים [ ].',
      'כל קובץ חייב להתחיל בפקודה "FORMAT=JSON" ולהיגמר בנקודה ופסיק.',
      'מותר להשתמש רק במספרים וחל איסור מוחלט על שימוש באותיות באנגלית או סימני פיסוק.'
    ],
    correctAnswer: 1,
    explanation: 'פורמט JSON (JavaScript Object Notation) הוא פורמט פופולרי להעברת נתונים מובנים. התחביר התקני שלו משתמש בזוגות של מפתח וערך: "key": "value". האובייקטים נתחמים בסוגריים מסולסלים `{ }` ומערכים או רשימות של אובייקטים נתחמים בסוגריים מרובעים `[ ]`. כל מפתח מופרד מהערך שלו בנקודתיים `:`, וכל זוג מופרד בפסיק `,`.',
    hint: 'זכור את הסימנים המאפיינים { } עבור אובייקט בודד ו-[ ] עבור רשימה של אובייקטים.',
    additionalInfo: 'דוגמה פשוטה: {"name": "SwitchA", "ports": 24}. פורמט זה קל מאוד לקריאה הן על ידי בני אדם והן על ידי מכונות.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15 - Data Formats (JSON, XML, YAML)'
  },
  {
    id: 'ap_3',
    domain: 'automation_programmability',
    subtopic: 'כלים לניהול קונפיגורציה',
    question: 'איזה הבדל ארכיטקטוני משמעותי קיים בין כלי ניהול הגדרות התצורה Ansible לבין הכלים Chef ו-Puppet בהקשר של הצורך בתוכנות לקוח (Agents)?',
    options: [
      'Puppet אינו דורש סוכנים בכלל ומתבסס רק על חיבורי Bluetooth פיזיים.',
      'Ansible הוא כלי מבוסס Agentless (ללא צורך בהתקנת סוכן לקוח במכשירי הרשת), והוא מתבסס על פרוטוקולי תקשורת סטנדרטיים כמו SSH או NETCONF כדי לדחוף (Push) הגדרות ממכשיר הניהול הראשי.',
      'Chef דורש סוכן לקוח רק במתגים של מותגים שאינם סיסקו ופועל ללא סוכן במתגי סיסקו.',
      'Ansible מחייב התקנת סוכן לקוח כבד מאוד על מעבד ה-IOS של כל נתב ומתג ברשת.'
    ],
    correctAnswer: 1,
    explanation: 'Ansible הוא כלי נהדר לניהול קונפיגורציה המבוסס על "Agentless" (אינו דורש התקנת תוכנת סוכן ייעודית מראש על המכשירים המנוהלים). הוא יוצר קשר ישיר עם המכשיר באמצעות SSH (עבור מכשירי רשת) או WinRM (עבור ווינדוס), ודוחף אליהם קבצים בפורמט צייתני (YML Playbooks). לעומתו, Chef ו-Puppet דורשים בדרך כלל התקנת תוכנת Agent קטנה על כל מכשיר קצה שמדבר מול השרת המרכזי ומושך (Pull) ממנו עדכונים.',
    hint: 'Ansible = Agentless & Push model. הוא עושה שימוש בקבצי YAML קלים בשם Playbooks.',
    additionalInfo: 'עיצוב ה-Agentless של Ansible הופך אותו לפופולרי במיוחד עבור מהנדסי רשתות מכיוון שלא ניתן להתקין סוכנים מותאמים על נתבי סיסקו שבידיהם מערכת הפעלה נעולה (Closed OS).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18 - Configuration Management Tools'
  },
  {
    id: 'ap_4',
    domain: 'automation_programmability',
    subtopic: 'Cisco DNA Center',
    question: 'איזה שירות מרכזי מציע פתרון ה-Cisco DNA Center לתמיכה במהנדסי הרשתות במסגרת פילוסופיית ה-Intent-Based Networking?',
    options: [
      'הוא מספק ממשק פקודות CLI פשוט המכריח הגדרת פקודות ישנות בלבד ומבטל סאבנטינג.',
      'הוא חלק ממפתח אבטחה המאפשר לחסום דפי אינטרנט של חברות פיתוח.',
      'הוא מהווה בקר (Controller) מרכזי חכם המאגד תחת ממשק גרפי אחד ניהול מלא, אוטומציה של פריסת מכשירים פיזיים וניתוח מעמיק ואנליטיקס (Assurance) של ביצועי הרשת וחווית המשתמשים בארגון.',
      'הוא מערכת הפעלה הפועלת רק על כרטיסי הרשת הפנימיים של שרתי חלונות.'
    ],
    correctAnswer: 2,
    explanation: 'בקר ה-Cisco DNA Center (Digital Network Architecture) הוא הלב של המעבר ל-Intent-Based Networking (IBN). הוא מציע ממשק גרפי אחד מרכזי שממנו ניתן לנהל את כל הקונפיגורציה הארגונית, לפרוס מכשירים חדשים באופן אוטומטי (Zero Touch Provisioning), ולבצע ניטור ובקרה מעמיקים (Assurance) הכוללים המלצות לפתרון בעיות ומניעת תקלות מראש ברשת.',
    hint: 'חשוב על בקר על-ארגוני אחד חזק המציע פריסה בקליק (Automation) ובדיקת בריאות הרשת (Assurance).',
    additionalInfo: 'בקר ה-DNA Center מתקשר עם חומרת הרחוב (Underlay) באמצעות פרוטוקולים מודרניים המתווכים על ידי ארגון מבוסס כגון VXLAN ו-LISP בסביבה הקרויה SD-Access.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 17 - Cisco Software-Defined Access (SDA)'
  },
  {
    id: 'ap_5',
    domain: 'automation_programmability',
    subtopic: 'ממשקי API ופרוטוקול REST',
    question: 'בפרוטוקול REST, מהם מזהי הפעולה (HTTP Verbs) הסטנדרטיים המשמשים לביצוע פעולות Create, Read, Update ו-Delete (CRUD) על משאבים בשרת?',
    options: [
      'GET, SEND, DEFINE, REMOVE',
      'POST, GET, PUT/PATCH, DELETE',
      'ADD, SHOW, UPDATE, DROP',
      'PUSH, PULL, MERGE, REMOVE'
    ],
    correctAnswer: 1,
    explanation: 'פרוטוקול REST מתבסס על שיטות הבקשה הסטנדרטיות של HTTP (HTTP Methods) כדי לבצע פעולות CRUD על נתונים: 1) POST משמש ליצירת משאב (Create). 2) GET משמש לקריאת ואחזור נתונים (Read). 3) PUT (החלפה מלאה) או PATCH (עדכון חלקי) משמשים לעדכון נתונים (Update). 4) DELETE משמש למחיקת המשאב (Delete).',
    hint: 'זכור את פרוטוקול של דפי אינטרנט (HTTP/HTTPS) והמילים הנפוצות לביצוע בקשות מידע כגון GET ו-POST.',
    additionalInfo: 'הבנת הקשר בין HTTP Methods לפעולות ה-CRUD קריטי עבור פיתוח פקודות אוטומציה שמקבלות ודוחפות הגדרות לנתבים.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15 - REST APIs and JSON'
  },
  {
    id: 'ap_6',
    domain: 'automation_programmability',
    subtopic: 'ארכיטקטורת SDN וממשקי API',
    question: 'מהו קוד הסטטוס HTTP (HTTP Status Code) המוחזר מהשרת ומעיד על כך שבקשת ה-API שלי הצליחה לחלוטין (Successful/OK)?',
    options: [
      '200 (או 201 עבור יצירת משאב חדש)',
      '404 (Not Found)',
      '500 (Internal Server Error)',
      '403 (Forbidden)'
    ],
    correctAnswer: 0,
    explanation: 'קודי הסטטוס של HTTP מחולקים למשפחות: קודים של 2xx מעידים על הצלחה (Success) - למשל 200 פירושו "OK" ו-201 פירושו "Created" (נוצר משאב חדש). קודים של 4xx מעידים על שגיאת לקוח (Client Error) - למשל 401 מייצג חוסר הרשאות ו-404 פירושו שהמשאב לא נמצא. קודים של 5xx מעידים על שגיאת שרת פנימית (Server Error).',
    hint: 'חשוב על מספרי קוד ההצלחה של דפי האינטרט, לעומת מילים כמו שגיאה 404 המפורסמת.',
    additionalInfo: 'מהנדסי רשתות מבררים קודים אלו בקוד פייתון כדי לדעת האם שליחת חבילת ההגדרות למתג עברה בהצלחה או נכשלה בגלל שגיאה.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15 - REST APIs and JSON'
  }
];
