import { CCNAQuestion } from '../../types';

export const networkAccessQuestions: CCNAQuestion[] = [
  {
    id: 'na_1',
    domain: 'network_access',
    subtopic: 'VLAN ו-Trunking',
    question: 'מהו תפקידו המרכזי של פרוטוקול IEEE 802.1Q ברמה 2 של מודל OSI?',
    options: [
      'להוסיף תגית (Tag) של 4 בתים לתוך כותרת ה-Ethernet Frame כדי לזהות את ה-VLAN אליו שייך המידע בעת מעבר בחיבור Trunk.',
      'להצפין את כל התעבורה שעוברת בין שני מתגים בארגון.',
      'למנוע לולאות מיתוג בין מתגים על ידי חסימת פורטים מיותרים באופן זמני.',
      'לאפשר הקצאה אוטומטית של כתובות IP למחשבים חדשים ברשת הגישה.'
    ],
    correctAnswer: 0,
    explanation: 'תקן IEEE 802.1Q הוא פרוטוקול ה-Trunking הסטנדרטי בתעשייה. הוא מבצע VLAN Tagging על ידי הוספת תגית בת 4 בתים (32 סיביות) לתוך ה-Ethernet Frame. התגית כוללת שדה VLAN ID (באורך 12 סיביות) המאפשר לזהות עד 4096 רשתות VLAN שונות בעת העברת המידע דרך קו Trunk בודד המחבר בין מתגים.',
    hint: 'זכור את מושג ה"תיוג" (Tagging) המאפשר למתג המקבל לדעת לאיזה VLAN לייחס את ה-Frame.',
    additionalInfo: 'פורט שמוגדר כ-Access אינו מוסיף את התגית הזו, והפרוטוקול אינו מתייג מסגרות השייכות ל-Native VLAN.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8 - Implementing Ethernet Virtual LANs'
  },
  {
    id: 'na_2',
    domain: 'network_access',
    subtopic: 'Spanning Tree Protocol (STP)',
    question: 'בפרוטוקול Spanning Tree (STP), כיצד נבחר ה-Root Bridge (מתג השורש) ברשת?',
    options: [
      'המתג בעל כתובת ה-IP הציבורית הגבוהה ביותר נבחר אוטומטית.',
      'המתג בעל ה-Bridge ID (BID) הנמוך ביותר נבחר. ה-BID מורכב מעדיפות (Priority) וכתובת ה-MAC של המתג.',
      'המתג שמחובר פיזית למספר הרב ביותר של מחשבים בארגון נבחר.',
      'המתג בעל זמן הפעולה (Uptime) הארוך ביותר נבחר.'
    ],
    correctAnswer: 1,
    explanation: 'בחירת ה-Root Bridge ב-STP מבוססת על ה-Bridge ID (BID) הנמוך ביותר ברשת. ה-BID מורכב מספרת עדיפות (Priority, ברירת המחדל היא 32768) ומכתובת ה-MAC הפיזית של המכשיר. אם העדיפות זהה בכל המתגים, המתג בעל כתובת ה-MAC הנמוכה ביותר מבחינה מספרית ייבחר כמתג השורש.',
    hint: 'ב-STP, הערך הנמוך ביותר הוא תמיד הטוב ביותר והמועדף ביותר (סביב עדיפות וכתובת MAC).',
    additionalInfo: 'ניתן להשפיע באופן ידני על הבחירה על ידי הקטנת עדיפות המתג הרצוי באמצעות הפקודה "spanning-tree vlan <id> priority 4096".',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 9 - Understanding Spanning Tree Protocol'
  },
  {
    id: 'na_3',
    domain: 'network_access',
    subtopic: 'Dynamic Trunking Protocol (DTP)',
    question: 'שני פורטים במתגים שכנים מוגדרים במצבי DTP שונים: פורט א\' מוגדר כ-Dynamic Desirable, ופורט ב\' של המתג השני מוגדר כ-Dynamic Auto. מה יהיה מצב החיבור הסופי ביניהם?',
    options: [
      'החיבור ביניהם יושבת (Error-disabled).',
      'החיבור יפעל במצב Access רגיל בלבד (VLAN 1).',
      'החיבור יצליח לנהל משא ומתן ויוקם קשר Trunk פעיל.',
      'שני הפורטים יתחילו לבצע Routing של תעבורה ללא מיתוג.'
    ],
    correctAnswer: 2,
    explanation: 'פרוטוקול DTP מנהל את המשא ומתן להקמת Trunk. מצב Dynamic Desirable מייצג רצון פעיל ליזום חיבור Trunk, בעוד ש-Dynamic Auto מייצג מצב פסיבי שממתין שהצד השני יתחיל את המשא ומתן. מאחר שצד א\' יוזם וצד ב\' מוכן להגיב לו, השניים יצליחו לנהל משא ומתן מושכל ולהפוך את קו החיבור ביניהם ל-Trunk פעיל.',
    hint: 'Desirable אומר "רוצה ויוזם", Auto אומר "רק מסכים אם יבקשו ממנו".',
    additionalInfo: 'אם שני הצדדים היו מוגדרים כ-Dynamic Auto, החיבור לא היה הופך ל-Trunk לעולם, מכיוון שאף צד לא היה יוזם את הבקשה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8 - Implementing Ethernet Virtual LANs'
  },
  {
    id: 'na_4',
    domain: 'network_access',
    subtopic: 'EtherChannel',
    question: 'ברצונך להגדיר EtherChannel דינמי רב-ערוצי בין שני מתגים של סיסקו באמצעות תקן פתוח (IEEE Standard). באיזה פרוטוקול ומצבים (Modes) עליך להשתמש עבור הפורטים?',
    options: [
      'פרוטוקול PAgP עם המצבים Desirable ו-Auto.',
      'פרוטוקול LACP עם המצבים Active ו-Passive.',
      'פרוטוקול HDLC עם המצבים Active בלבד.',
      'הגדרת מצב ON סטטית ללא פרוטוקול דינמי בכלל.'
    ],
    correctAnswer: 1,
    explanation: 'התקן הבינלאומי הפתוח לניהול דינמי של EtherChannel הוא פרוטוקול LACP (Link Aggregation Control Protocol, תקן IEEE 802.3ad). המצבים שלו הם Active (יוזם משא ומתן פעיל) ו-Passive (מגיב לפניות). פרוטוקול PAgP הוא פרוטוקול קנייני של סיסקו (Cisco Proprietary) ואינו תקן פתוח.',
    hint: 'זכור את האות L ב-LACP כקיצור ל-Link Aggregation והתקן הבינלאמי, לעומת P ב-PAgP שהיא קניינית של סיסקו.',
    additionalInfo: 'כדי שהחיבור יוקם בהצלחה, לפחות צד אחד חייב להיות מוגדר כ-Active. אם שני הצדדים מוגדרים כ-Passive, הם לא ייצרו EtherChannel.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 10 - Implementing EtherChannels'
  },
  {
    id: 'na_5',
    domain: 'network_access',
    subtopic: 'רשתות אלחוטיות (Wireless)',
    question: 'באדריכלות אלחוטית מבוססת בקר אלחוטי ריכוזי (WLC או Wireless LAN Controller), מהו תפקידו הראשי של פרוטוקול CAPWAP?',
    options: [
      'הוא מספק מנגנון הצפנה להגנה על המידע של המשתמשים ברשת Wi-Fi 6.',
      'הוא מאפשר לבקר ה-WLC לנהל, לקבוע הגדרות ולעטוף (Encapsulate) את תעבורת הנתונים והניהול של נקודות הגישה (Lightweight APs) דרך מנהרה ברשת הפיזית Layer 3.',
      'הוא מקצה כתובות IP באופן דינמי למשתמשים האלחוטיים בארגון.',
      'הוא מאפשר חיבור ישיר של טלפונים אלחוטיים ללא אנטנות קליטה פיזיות.'
    ],
    correctAnswer: 1,
    explanation: 'פרוטוקול CAPWAP (Control and Provisioning of Wireless Access Points) משמש בארכיטקטורת Split MAC לקשר ולנהל נקודות גישה רזות (Lightweight APs) מול בקר ה-WLC. CAPWAP מייצר שתי מנהרות (Tunnels) על גבי רשת ה-IP: מנהרת בקרה (Control Port UDP 5246) להגדרות ועדכונים, ומנהרת נתונים (Data Port UDP 5247) להעברת המידע של המשתמשים מהאנטנה ישירות לבקר.',
    hint: 'זהו פרוטוקול מילוט ומנהור המאחד את הניהול הפיזי של נקודות הגישה מול בקר מרכזי.',
    additionalInfo: 'הבנת ה-Port Numbers של CAPWAP (UDP 5246 ו-UDP 5247) נדרשת לעיתים קרובות בכתיבת חוקי אבטחה ב-ACL.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 27 - Understanding Wireless Architectures'
  },
  {
    id: 'na_6',
    domain: 'network_access',
    subtopic: 'אבטחה אלחוטית',
    question: 'איזה שיפור אבטחה משמעותי מציע תקן הוולדציה WPA3 לעומת WPA2 כדי למנוע התקפות לא מקוונות על סיסמאות (Offline Dictionary Attacks Key Recovery)?',
    options: [
      'החלפת הצפנת AES בבלוקים מסוג DES ישנים בלבד.',
      'שימוש בשיטת לחיצת יד משופרת SAE (Simultaneous Authentication of Equals) במקום שיטת ה-Pre-Shared Key (PSK) המקובלת ב-WPA2.',
      'ביטול מלא של הצורך להזין סיסמה כלשהי בגישת משתמשים אורחים.',
      'נעילה אוטומטית של רשת ה-Wi-Fi למשך 24 שעות לאחר 3 ניסיונות התחברות כושלים קבועים.'
    ],
    correctAnswer: 1,
    explanation: 'תקן WPA3 מחליף את מנגנון ה-PSK (Pre-Shared Key) הפגיע של WPA2 במנגנון מתקדם שנקרא SAE (Simultaneous Authentication of Equals או פרוטוקול Dragonfly). מנגנון SAE מונע התקפות כוח גס לא מקוונות (Offline Brute-Force / Dictionary Attacks) הלוכדות את ה-4-way handshake, ומספק "Forward Secrecy" השומר על סודיות מפתחות ההצפנה הקודמים גם אם הסיסמה הכללית נחשפת בעתיד.',
    hint: 'חשוב על השם SAE המייצג שוויון באימות סימולטני ומחליף את PSK.',
    additionalInfo: 'WPA3 הפך לחובה עבור מכשירים התומכים בסטנדרט Wi-Fi 6 ו-Wi-Fi 6E.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 28 - Securing Wireless Networks'
  },
  {
    id: 'na_7',
    domain: 'network_access',
    subtopic: 'Rapid Spanning Tree Protocol (RSTP)',
    question: 'מהו ההבדל המרכזי בזמני ההתכנסות (Convergence) ובמצבי הפורטים של תקן RSTP (802.1w) בהשוואה ל-STP הישן (802.1D)?',
    options: [
      'ל-RSTP לוקח זמן ארוך יותר להתכנס (מעל 50 שניות) כדי לשמור על אמינות משופרת.',
      'RSTP מקטין את מצבי הפורטים לשלושה בלבד (Discarding, Learning, Forwarding) ומאפשר מעבר מהיר כמעט מיידי למצב Forwarding באמצעות מנגנון החלפת הודעות הצעה/הסכמה (Proposal/Agreement).',
      'RSTP מחייב שימוש בכבלי נחושת מיוחדים ואינו תומך כלל בסיבים אופטיים.',
      'RSTP מסיר לחלוטין את מנגנון ה-BPDU ומתבסס רק על כתובות MAC ישירות לניהול הלולאות.'
    ],
    correctAnswer: 1,
    explanation: 'RSTP (IEEE 802.1w) מפשט את מצבי ה-STP הישן מחמישה (Blocking, Listening, Learning, Forwarding, Disabled) לשלושה מצבים בלבד: Discarding, Learning ו-Forwarding. בנוסף לכך, הוא מציע התכנסות של שברירי שניות בזכות מנגנון אקטיבי של לחיצת יד (Proposal/Agreement handshake) בין המתגים ופורטי גיבוי מוגדרים מראש (Alternate / Backup Ports), במקום להסתמך על טיימרים פסיביים ארוכים כפי שהיה ב-STP.',
    hint: 'RSTP נועד להיות מהיר (Rapid), והוא משלב את ה-Blocking וה-Listening של STP למצב אחד כולל שנקרא Discarding.',
    additionalInfo: 'בזכות שינוי זה, זמן ההתכנסות של RSTP יורד מ-30-50 שניות ב-STP קלאסי לפחות מ-2 שניות סך הכל.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 11 - PortFast and BPDU Guard'
  },
  {
    id: 'na_8',
    domain: 'network_access',
    subtopic: 'VLAN ו-Multilayer Switches',
    question: 'מהו ממשק SVI (Switch Virtual Interface) במתג שכבה שלישית (Multilayer Layer 3 Switch)?',
    options: [
      'חיבור פיזי ייעודי לצפייה בתקריות חומרה במנוע המתג.',
      'ממשק תוכנה וירטואלי שמקצים לו כתובת IP עבור רשת VLAN מסוימת, המשמש כשער ברירת המחדל (Default Gateway) לניתוב בין רשתות VLAN שונות במתג.',
      'פרוטוקול שמגבה את כתובות ה-MAC של חומת האש בארגון.',
      'פורט פיזי מהיר שמקשר בין המתג ישירות לבקר ה-DNA Center של סיסקו.'
    ],
    correctAnswer: 1,
    explanation: 'ממשק SVI הוא ממשק וירטואלי (מייצג אותו במכשיר הפקודה "interface vlan <vlan-id>") שנוצר במתג Layer 3 כדי לאפשר לו לבצע ניתוב IP (איי-פי) עבור אותו VLAN. כתובת ה-IP המוגדרת ב-SVI משמשת כשער ברירת המחדל (Default Gateway) עבור המחשבים והשרתים באותו VLAN.',
    hint: 'זהו השילוב בין מיתוג (VLAN) לניתוב (שכבה 3 / כתובת IP) בממשק וירטואלי בתוך המתג.',
    additionalInfo: 'כדי שממשק SVI ייכנס למצב UP/UP מהיר, עליו להכיל לפחות פורט פיזי פעיל אחד המשויך לאותו VLAN.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 17 - Installing and Operating Layer 3 Switches'
  }
];
