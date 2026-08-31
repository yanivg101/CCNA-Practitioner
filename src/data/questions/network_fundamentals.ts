import { CCNAQuestion } from '../../types';

export const networkFundamentalsQuestions: CCNAQuestion[] = [
  {
    id: 'nf_1',
    domain: 'network_fundamentals',
    subtopic: 'מודל OSI ו-TCP/IP',
    question: 'באיזו שכבה של מודל OSI פועל פרוטוקול ה-IP כדי לבצע ניתוב (Routing) של חבילות מידע ברשת?',
    options: [
      'שכבת ה-Data Link (שכבה 2)',
      'שכבת ה-Network (שכבה 3)',
      'שכבת ה-Transport (שכבה 4)',
      'שכבת ה-Physical (שכבה 1)'
    ],
    correctAnswer: 1,
    explanation: 'פרוטוקול ה-IP (Internet Protocol) פועל בשכבת הרשת (Network Layer, שכבה 3) של מודל OSI. תפקידה של שכבה זו הוא ניתוב חבילות מידע (Packets) מקצה לקצה על בסיס כתובות IP לוגיות.',
    hint: 'חשוב על כתובות לוגיות ומציאת המסלול הטוב ביותר ברשת.',
    additionalInfo: 'רכיב הרשת המרכזי הפועל בשכבה זו הוא הנתב (Router). יחידת המידע בשכבה 3 נקראת Packet.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 1 - Introduction to TCP/IP Networking'
  },
  {
    id: 'nf_2',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv4 וסאבנטינג',
    question: 'בהינתן כתובת ה-IP 192.168.10.45 עם מסכת רשת 255.255.255.224 (/27), מהי כתובת הרשת (Network ID) אליה משתייך המארח?',
    options: [
      '192.168.10.0',
      '192.168.10.16',
      '192.168.10.32',
      '192.168.10.40'
    ],
    correctAnswer: 2,
    explanation: 'מסכת רשת של .224 (בייצוג CIDR של /27) משמעותה גודל בלוקים ברשת (Subnet block size) של 32 כתובות (256 פחות 224). טווחי הרשתות יהיו כפולות של 32: הרשת הראשונה היא 192.168.10.0, השנייה היא 192.168.10.32, השלישית היא 192.168.10.64. הכתובת 192.168.10.45 נמצאת בטווח שבין 32 ל-63, ולכן היא שייכת לתת-רשת 192.168.10.32.',
    hint: 'חשב את גודל הבלוק (Magic Number) על ידי הפחתת הערך האוקטט האחרון של המסכה מ-256.',
    additionalInfo: 'כתובת ה-Broadcast של תת-רשת זו תהיה 192.168.10.63, וטווח הכתובות השמיש הוא 192.168.10.33 עד 192.168.10.62.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 12 - Subnetting IPv4'
  },
  {
    id: 'nf_3',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'איזו מהאפשרויות הבאות מייצגת את הקיצור הנכון והקצר ביותר של כתובת ה-IPv6 הבאה: 2001:0db8:0000:0000:0008:0800:200c:417a?',
    options: [
      '2001:db8::8:800:200c:417a',
      '2001:db8:0:0:8:8:200c:417a',
      '2001:db8::8:08:200c:417a',
      '2001:0db8::8:800:200c:417a'
    ],
    correctAnswer: 0,
    explanation: 'חוקי קיצור IPv6 מאפשרים: 1) להוריד אפסים מובילים מכל אוקטט (למשל 0db8 הופך ל-db8, ו-0008 הופך ל-8, אך 0800 נשאר 800 כיוון שהאפסים המובילים בלבד מושמטים). 2) להחליף רצפים רצופים של אוקטטים המכילים אפסים בלבד בסימן "::" פעם אחת בלבד בכתובת. לכן, שני המקטעים של 0000:0000 מתקצרים ל-"::". התוצאה היא 2001:db8::8:800:200c:417a.',
    hint: 'השמט אפסים מובילים וזכור שאסור להשמיט אפסים שנמצאים בסוף מקטע (כמו ב-0800 שהופך ל-800, לא ל-8).',
    additionalInfo: 'השימוש ב-"::" מותר פעם אחת בלבד בכתובת על מנת למנוע עמימות עבור הנתב בעת שחזור הכתובת.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22 - IPv6 Address Representation'
  },
  {
    id: 'nf_4',
    domain: 'network_fundamentals',
    subtopic: 'רכיבי תשתית וכבלים',
    question: 'מתי מומלץ להשתמש בסיב אופטי מסוג Single-mode (SMF) בהשוואה לסיב Multi-mode (MMF)?',
    options: [
      'כאשר נדרש פתרון זול ופשוט יותר להתקנות פנים-מבניות קצרות.',
      'כאשר נדרש לחבר רכיבים במרחק קצר מאוד של פחות מ-10 מטרים באותו ארון תקשורת.',
      'כאשר נדרש להעביר נתונים למרחקים ארוכים מאוד (קילומטרים רבים) באמצעות קרן לייזר יחידה.',
      'רק כאשר רוצים לחבר ישירות קו טלפון אנלוגי ישן אל נתב דיגיטלי.'
    ],
    correctAnswer: 2,
    explanation: 'סיב Single-mode (SMF) משתמש בליבה צרה מאוד ובמקור אור מסוג לייזר המשדר קרן אור אחת ישירה. תכנון זה מונע את תופעת הפיזור המודאלי (Modal Dispersion) ומאפשר העברת מידע למרחקים ארוכים במיוחד (עד עשרות קילומטרים) במהירויות גבוהות מאוד. סיב Multi-mode (MMF) משתמש בנורות LED ובליבה עבה יותר ומתאים יותר למרחקים קצרים ומקומיים.',
    hint: 'חשוב על לייזר מרוכז לעומת מספר קרני אור המתפזרות בתוך ליבה רחבה.',
    additionalInfo: 'לסיבי SMF יש עלות ציוד גבוהה יותר (משדרים/מקלטים מבוססי לייזר) אך הפסד האנרגיה בסיב נמוך בהרבה.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2 - Analyzing Ethernet LANs'
  },
  {
    id: 'nf_5',
    domain: 'network_fundamentals',
    subtopic: 'טופולוגיות רשת',
    question: 'איזה יתרון מרכזי קיים בארכיטקטורת רשת מסוג 2-Tier (הידועה גם כ-Collapsed Core) לעומת תקן 3-Tier קלאסי?',
    options: [
      'היא מוסיפה שכבת אבטחה ייעודית בלתי חדירה בין השרתים לענן.',
      'היא מאחדת את שכבת ה-Core ושכבת ה-Distribution לשכבה פיזית או לוגית אחת, המפחיתה עלויות ומתאימה לארגונים בינוניים וקטנים.',
      'היא מסירה לחלוטין את הצורך במתגים (Switches) ומאפשרת שימוש בנתבים בלבד.',
      'היא מאפשרת חיבור מהיר יותר לאינטרנט הבינלאומי ללא שימוש בספקיות תקשורת.'
    ],
    correctAnswer: 1,
    explanation: 'בטופולוגיית Collapsed Core (נקראת גם דו-שכבתית/2-Tier), שכבות ה-Core (הליבה) וה-Distribution (הפצה) של המודל הארכיטקטוני התלת-שכבתי של סיסקו מאוחדות לשכבה אחת. דבר זה מקטין משמעותית את כמות החומרה הנדרשת, מוריד את עלות הרכישה והתחזוקה, ומפשט את קונפיגורציית הניתוב והמיתוג בארגונים בינוניים שאינם צריכים ליבה נפרדת עצומה.',
    hint: 'Collapsed פירושו קריסה או שילוב של שתי שכבות עליונות לאחת.',
    additionalInfo: 'בשכבת 3-Tier ישנן שלוש שכבות נפרדות: Access (גישה), Distribution (הפצה / אכיפת מדיניות וניתוב), ו-Core (העברה סופר-מהירה בין אזורים).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13 - LAN Architecture'
  },
  {
    id: 'nf_6',
    domain: 'network_fundamentals',
    subtopic: 'פרוטוקול UDP ו-TCP',
    question: 'איזה מהמאפיינים הבאים נכון לגבי פרוטוקול UDP בהשוואה לפרוטוקול TCP?',
    options: [
      'הוא כולל מנגנון בקרת זרימה (Flow Control) דינמי המונע הצפת המקבל.',
      'הוא פרוטוקול מוכוון חיבור (Connection-Oriented) המבצע לחיצת יד משולשת (Three-way handshake).',
      'הוא בעל תקורה נמוכה במיוחד (Header קטן של 8 בתים) ואינו מבצע אימות קבלה או סידור מחדש של חבילות.',
      'הוא מבטיח העברת נתונים אמינה ב-100% ללא אובדן מנות ברשת.'
    ],
    correctAnswer: 2,
    explanation: 'פרוטוקול UDP (User Datagram Protocol) הוא פרוטוקול דל-תקורה ללא חיבור מוקדם (Connectionless). גודל הכותרת שלו הוא 8 בתים בלבד (לעומת מינימום 20 בתים ב-TCP). הוא אינו עוקב אחר הגעת חבילות, אינו מאמת אותן ואינו מסדר אותן מחדש. תפקידו הוא מהירות מקסימלית ותקורה נמוכה, מה שטוב לשידורי וידאו, קול בזמן אמת, DNS, ועוד.',
    hint: 'UDP מתמקד במהירות במחיר של אמינות (Best-Effort).',
    additionalInfo: 'שיטה זו מקטינה עיכובים (Latency) משום שאין צורך להמתין לאישורים (ACKs) ואין שליחה מחדש (Retransmissions).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 5 - Analyzing Transport Layer Protocols'
  },
  {
    id: 'nf_7',
    domain: 'network_fundamentals',
    subtopic: 'מודל שכבות',
    question: 'מהו השם הנכון של יחידת המידע (PDU או Protocol Data Unit) בשכבות 4, 3 ו-2 של מודל OSI בהתאמה?',
    options: [
      'Segment, Packet, Frame',
      'Packet, Frame, Segment',
      'Frame, Segment, Packet',
      'Bit, Byte, Packet'
    ],
    correctAnswer: 0,
    explanation: 'המפגש בין הפרוטוקולים בכל שכבה מייצר PDU בעל שם ייעודי: בשכבה 4 (Transport) יחידת המידע נקראת Segment (או Datagram ב-UDP). בשכבה 3 (Network) היא נקראת Packet. בשכבה 2 (Data Link) היא נקראת Frame. בשכבה 1 (Physical) המידע מיוצג בתור Bits.',
    hint: 'זכור את ראשי התיבות של השלבים מלמעלה למטה: Data, Segment, Packet, Frame, Bits.',
    additionalInfo: 'שמות אלו קריטיים להבנה של פקודות דיאגנוסטיקה כגון "show interface" או ניתוח תעבורה בעזרת Wireshark.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 1 - Introduction to TCP/IP Networking'
  },
  {
    id: 'nf_8',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'מהו התחילית (Prefix) המאפיינת את הכתובות מסוג Link-Local ב-IPv6 שבהן מחשבים משתמשים לתקשורת פנימית באותו מתחם שידור ללא נתב?',
    options: [
      'fe80::/10',
      'fc00::/7',
      '2001::/3',
      'ff00::/8'
    ],
    correctAnswer: 0,
    explanation: 'כתובות Link-Local ב-IPv6 משמשות לתקשורת בתוך אותו קישור פיזי (Link / Broadcast domain). הן תמיד מתחילות בטווח fe80::/10, מה שאומר ש-10 הביטים הראשונים תמיד יהיו "1111 1110 10" (הביטים השלישי והרביעי באוקטט השלישי קובעים את fe8, e, 9, or a, אך בפועל סיסקו ומערכות ההפעלה מייצרות אותן כ-fe80::).',
    hint: 'מייצג כתובת עצמית מקומית, דומה לטווח APIPA של IPv4 (169.254.x.x).',
    additionalInfo: 'כתובת Link-Local נוצרת אוטומטית על כל ממשק IPv6 פעיל באמצעות חישוב EUI-64 או מספר אקראי.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 24 - IPv6 Routing Configuration'
  },
  {
    id: 'nf_9',
    domain: 'network_fundamentals',
    subtopic: 'רשתות אלחוטיות',
    question: 'איזה ערוץ אלחוטי בתדר 2.4 GHz אינו סובל מחפיפה (Non-overlapping) עם ערוצים אחרים באותה סביבה במדינות מערביות?',
    options: [
      'ערוצים 1, 6, ו-11',
      'ערוצים 1, 2, ו-3',
      'ערוצים 5, 10, ו-15',
      'ערוצים 2, 7, ו-12'
    ],
    correctAnswer: 0,
    explanation: 'בתדר 2.4 GHz, שבו רוחב כל ערוץ הוא 20 או 22 MHz, ישנו מרחק תדרים קצר בין ערוץ לערוץ. הערוצים היחידים שאינם מתנגשים או חופפים זה לזה פיזית בתדרים שלהם הם 1, 6 ו-11. פריסת נקודות גישה (Access Points) שכנות צריכה להתבסס רק על ערוצים אלו כדי למנוע הפרעות רשת קשות (Co-channel IP interference).',
    hint: 'הפרש של 5 ערוצים בין ערוץ לערוץ.',
    additionalInfo: 'בתדר 5 GHz לעומת זאת יש עשרות ערוצים שאינם חופפים כלל, מה שמפחית התנגשויות תדרים פנימיות.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 26 - Wireless Networks'
  },
  {
    id: 'nf_10',
    domain: 'network_fundamentals',
    subtopic: 'רכיבי זיכרון של נתבים',
    question: 'היכן נשמר קובץ הגדרות הסטארט-אפ של נתב סיסקו (startup-config) השומר על ההגדרות גם לאחר כיבוי מוחלט של החשמל?',
    options: [
      'בזיכרון ה-RAM',
      'בזיכרון ה-NVRAM',
      'בזיכרון ה-Flash',
      'בזיכרון ה-ROM'
    ],
    correctAnswer: 1,
    explanation: 'קובץ ה-startup-config של מערכת IOS של סיסקו נשמר בזיכרון ה-NVRAM (Non-Volatile RAM). זהו זיכרון מהיר שאינו מחיק בחוסר חשמל, וממנו הנתב טוען את הקונפיגורציה אל תוך ה-RAM הפעיל (running-config) בזמן הדלקה.',
    hint: 'ראשי התיבות מייצגים זיכרון בעל גישה אקראית שאינו מתנדף/אינו מחיק.',
    additionalInfo: 'מחיקת ה-startup-config מתבצעת באמצעות הפקודה "erase startup-config" והדבר דורש אתחול כדי לאפס את המכשיר.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 10 - Basic Router CLI'
  }
];
