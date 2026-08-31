import { CCNAQuestion } from '../../types';

export const additionalCCNAQuestions: CCNAQuestion[] = [
  // Network Fundamentals (Domain 1)
  {
    id: 'nf_extra_1',
    domain: 'network_fundamentals',
    subtopic: 'סאבנטינג וכתובות',
    question: 'איזה אחוז מהכתובות בתת-רשת בעלת מסכת רשת של /29 (255.255.255.248) שמישות בפועל לשימוש עבור מארחים (Hosts)?',
    options: [
      '75% (6 מתוך 8 כתובות)',
      '100% (כל 8 הכתובות)',
      '25% (2 מתוך 8 כתובות)',
      '50% (4 מתוך 8 כתובות)'
    ],
    correctAnswer: 0,
    explanation: 'במסכת /29 ישנם 3 ביטים המוקצים למארחים (32 פחות 29). מספר הכתובות הכללי הוא 2 בחזקת 3, שזה 8 כתובות סך הכל. שתי כתובות נשמרות תמיד (כתובת הרשת וכתובת ה-Broadcast של תת-הרשת). לכן, מספר הכתובות השמישות הוא 8 - 2 = 6 כתובות. האחוז השמיש הוא 6 מתוך 8, שזה 75%.',
    hint: 'חשב את גודל הבלוק (8) והורד את 2 הכתובות השמורות הרגילות.',
    additionalInfo: 'מסכות של /29 פופולריות מאוד לחיבורי נקודה-לנקודה רב-מכשירתיים או פריסות שרתים קטנות.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13'
  },
  {
    id: 'nf_extra_2',
    domain: 'network_fundamentals',
    subtopic: 'רכיבי תקשורת',
    question: 'מהו ההבדל התפקודי הראשי בין מתחם התנגשות (Collision Domain) לבין מתחם שידור (Broadcast Domain)?',
    options: [
      'מתחם התנגשות מאפשר תקשורת של מספר מכשירים בו-זמנית ללא רעש, בזמן שמתחם שידור תמיד חוסם תנועה.',
      'מתחם התנגשות נקבע על ידי נתבים, בעוד מתחם שידור נקבע על ידי כרטיסי רשת בלבד.',
      'מתחם התנגשות כולל מכשירים שבהם תיתכן התנגשות אותות פיזיים (כפי שקורה ב-Hub או חיבור Half-Duplex), בעוד מתחם שידור מוגדר כגבולות הרשת שבהם הודעת Broadcast Layer 2 מופצת לכולם (ונתבים חוסמים אותה).',
      'שניהם מייצגים בדיוק את אותו הרעיון ואין ביניהם הבדל כיום.'
    ],
    correctAnswer: 2,
    explanation: 'מתחם התנגשות שבו אותות חשמליים עלולים להיתקל זה בזה מוגבל לכל פורט פיזי בודד במתג (Switch) מודרני הפועל ב-Full-Duplex. לעומת זאת, מתחם שידור (Broadcast Domain) מוגדר על פי גבולות ה-VLAN או החיבור הפיזי שביניהם הודעות Broadcast מגיעות לכולם. נתבים (Layer 3) תוחמים וחוסמים הודעות שידור, בעוד מתגים (Layer 2) מעבירים הודעות אלו לכל הפורטים.',
    hint: 'מתג (Switch) יוצר מתחם התנגשות נפרד בכל פורט, אך רשת VLAN אחת מהווה מתחם שידור בודד.',
    additionalInfo: 'מניעת התנגשויות נעשית היום אוטומטית הודות לפעולה ב-Full Duplex במתגים במקום שימוש ברכזות (Hubs).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 6'
  },
  {
    id: 'nf_extra_3',
    domain: 'network_fundamentals',
    subtopic: 'מודל שכבות TCP',
    question: 'כיצד פועל מנגנון ה-Sliding Window בפרוטוקול TCP בשכבת ה-Transport?',
    options: [
      'הוא קובע מהו גודל התגית שתוצמד לכל קובץ ברשת.',
      'הוא מנגנון לבקרת זרימה המאפשר לשולח לקבוע דינמית את כמות המידע (בבתים) שמותר לו לשלוח לפני שהוא נדרש להמתין לאישור קבלה (ACK) מהצד השני.',
      'הוא מצפין את שיחות הווידאו בזמן שהמשתמש מזיז את חלונות המסך.',
      'הוא גורם למתג להפחית את מהירות הפורט ל-10 Mbps.'
    ],
    correctAnswer: 1,
    explanation: 'מנגנון ה-Window Size/Sliding Window ב-TCP אחראי לבקרת זרימה (Flow Control) ומניעת הצפת המקבל. המקבל מדווח לשולח כמה בתים הוא מסוגל לאחסן בזיכרון החוצץ שלו (Rx Buffer). השולח מתאים את גודל החלון ושולח רק את כמות המידע הזו לפני המתנה ל-Acknowledgement (ACK). הגודל משתנה דינמית על סמך איכות הקו ועומס הרשת.',
    hint: 'חלון הזרימה מונע אובדן מנות על ידי ויסות המהירות בין המחשבים במקטע התעבורה.',
    additionalInfo: 'מנגנון זה מאפשר לנצל את רוחב הפס ביעילות מבלי להכריח אישור על כל Frame בודד בנפרד (שיוצר עיכוב).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 5'
  },
  {
    id: 'nf_extra_4',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'איזו כתובת IPv6 מייצגת את כתובת ה-Multicast המיועדת לפנות לכל הנתבים (All Routers Multicast Group) באותו מתחם מקומי?',
    options: [
      'ff02::1',
      'ff02::2',
      'ff01::3',
      '::1'
    ],
    correctAnswer: 1,
    explanation: 'כתובות Multicast ב-IPv6 מתחילות תמיד ב-ff00::/8. הכתובת ff02::1 פונה לכל המארחים (All Nodes) בקישור הנוכחי, בעוד הכתובת ff02::2 פונה בדיוק לכל הנתבים (All Routers) המחוברים באותו הקישור המקומי.',
    hint: 'המספר 1 מסמל את כולם (Nodes), בעוד המספר 2 מייצג קבוצת נתבים (Routers).',
    additionalInfo: 'כתובת "::1" היא כתובת ה-Loopback העצמית של IPv6 (המקבילה ל-127.0.0.1 ב-IPv4).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22'
  },
  {
    id: 'nf_extra_5',
    domain: 'network_fundamentals',
    subtopic: 'טופולוגיות רשת',
    question: 'מהו ההבדל המרכזי בין שימוש בסיב אופטי מסוג Single-Mode ל-Multi-Mode מבחינת מקור האור וקוטר הליבה?',
    options: [
      'ל-Single-mode יש ליבה עבה יותר והוא משתמש בנורת LED.',
      'ל-Single-mode יש ליבה דקה מאוד (כ-9 מיקרון) והוא משתמש בלייזר (Laser), בעוד ל-Multi-mode יש ליבה עבה יותר (50-62.5 מיקרון) והוא משתמש בנורת LED.',
      'ל-Multi-mode יש סיבים ממתכת נחושת מיוחדת.',
      'אין הבדל במבנה הסיב, אלא רק בצבע הכבל החיצוני המותקן בארון.'
    ],
    correctAnswer: 1,
    explanation: 'סיבי Single-Mode Fiber (SMF) כוללים ליבה זעירה של כ-9 מיקרון ומבוססים על קרן לייזר מרוכזת אחת שעוברת ישר ללא החזרות רבות. דבר זה מאפשר לו להעביר מידע למרחקים ארוכים של עד 40 קילומטר. סיבי Multi-Mode Fiber (MMF) משתמשים בליבה רחבה של 50-62.5 מיקרון ובאור LED מבוזר המוחזר מדפנות הליבה, מה שמגביל את הטווח שלו למרחקים של מאות מטרים ספורים.',
    hint: 'Single פירושו קרן יחידה וממוקדת במיוחד של קרן אור לייזר יקרה.',
    additionalInfo: 'לסיבי Multi-mode יש משדרים זולים משמעותית ולכן הם הבחירה המושלמת בתוך דאטה-סנטרים מודרניים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },

  // Network Access (Domain 2)
  {
    id: 'na_extra_1',
    domain: 'network_access',
    subtopic: 'VLAN ו-Trunking',
    question: 'מה קורה בארגון כאשר קיים חוסר התאמה (Mismatch) בהגדרות ה-Native VLAN בין שני קצוות של קו Trunk המקשר בין שני מתגים?',
    options: [
      'הקו נסגר פיזית מיד והנוריות הופכות לאדומות קבועות.',
      'תיווצר זליגת תעבורה ופגיעה באבטחה, נורות ה-STP והמתגים יציגו שגיאות עקביות (Native VLAN Mismatch), והודעות לא מתויגות (Untagged) עלולות להגיע ל-VLAN הלא נכון בצד השני.',
      'כל המחשבים ברשת יקבלו כתובת IP חדשה משרת ה-DHCP.',
      'שירות האינטרנט ישתנה אוטומטית לחיבור גיבוי ללא השפעה.'
    ],
    correctAnswer: 1,
    explanation: 'Native VLAN הוא ה-VLAN שעל גבי קו ה-Trunk שתעבורתו נשלחת ללא תיוג (Untagged Frame). אם מתג א\' מוגדר עם Native VLAN 10 ומתג ב\' מוגדר עם Native VLAN 20, מסגרות לא מתויגות מ-VLAN 10 ייכנסו למתג ב\' ויחשבו כשייכות ל-VLAN 20. תופעה זו גורמת לערבוב תעבורה, זליגת מידע, לולאות STP אפשריות, והתראות Syslog קבועות מה-IOS.',
    hint: 'ה-Native VLAN חייב להיות זהה בשני קצוות חיבור ה-Trunk.',
    additionalInfo: 'סיסקו ממליצה לשנות את ה-Native VLAN מברירת המחדל (VLAN 1) ל-VLAN לא בשימוש, ולחסום אותו להעברת מידע למניעת התקפות Double Tagging.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8'
  },
  {
    id: 'na_extra_2',
    domain: 'network_access',
    subtopic: 'Spanning Tree Protocol (STP)',
    question: 'איזה שילוב של פקודות אבטחה בפורט מתג מספק חיבור מיידי לקצה הארגוני ומגן מפני חיבור של מתג זר לא מורשה?',
    options: [
      'Static NAT בשילוב HSRP',
      'PortFast בשילוב BPDU Guard',
      'LACP בשילוב DTP Auto',
      'dynamic arp inspection בלבד'
    ],
    correctAnswer: 1,
    explanation: 'תכונת PortFast מעבירה פורט גישה (Access Port) המחובר למחשב קצה באופן מיידי למצב Forwarding (דילוג על שלבי Listening ו-Learning שלוקחים 30 שניות). תכונת BPDU Guard מונעת התחברות מתגים לא מאושרים לפורט זה על ידי כיבוי מיידי שלו (err-disabled) ברגע שהיא מזהה קבלת הודעת BPDU (הנשלחת רק על ידי מתגים הפועלים ב-STP).',
    hint: 'מצד אחד רוצים מהירות התחברות (Fast), ומצד שני מחסומים מפני מתגים אחרים המדברים ב-BPDU.',
    additionalInfo: 'שילוב זה חיוני עבור פורטי קצה המיועדים למשתמשים (Edge Ports) כדי לשמור על ברירות הרשת ויציבות ה-Root Bridge.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 11'
  },
  {
    id: 'na_extra_3',
    domain: 'network_access',
    subtopic: 'מודל VLAN',
    question: 'מהו טווח ה-VLANs התקין והרגיל (Normal Range) בנתבי ומתגי סיסקו אשר נשמר בקובץ ה-vlan.dat המקומי?',
    options: [
      '1 עד 1005',
      '1006 עד 4094',
      '1 עד 4096',
      '0 עד 255'
    ],
    correctAnswer: 0,
    explanation: 'רשתות VLAN מחולקות לשני טווחים: הטווח הנורמלי (Normal Range) הוא בין 1 ל-1005 והגדרותיו נשמרות בקובץ ה-vlan.dat המקומי בזיכרון ה-Flash. הטווח המורחב (Extended Range) הוא בין 1006 ל-4094 והגדרותיו נשמרות ישירות בתוך קובץ ה-running-config (קובץ ה-startup-config של המכשיר).',
    hint: 'הטווח הנמוך והישן שמרכז את רשתות ה-VTEP הראשונות מסתיים ב-1005 והיה בשימוש בפרוטוקול VTPv1.',
    additionalInfo: 'מזהה VLAN 0 ו-VLAN 4095 שמורים לשימוש פנימי ואינם שמישים לתיוג משתמשים.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8'
  },
  {
    id: 'na_extra_4',
    domain: 'network_access',
    subtopic: 'רשתות אלחוטיות (Wireless)',
    question: 'מה קורה בארכיטקטורת רשת אלחוטית מסוג Split-MAC במונחים של חלוקת העבודה בין נקודת הגישה (Lightweight AP) לבקר האלחוטי (WLC)?',
    options: [
      'נקודת הגישה מבצעת את כל הניתוב והאבטחה והבקר לא פועל.',
      'משימות זמן-אמת של שכבה 1 ו-2 האלחוטית (כגון שידור האות, הצפנה/פענוח חומרה, וקבלת אישורי מסגרות) מבוצעות בנקודת הגישה (LAP), בעוד משימות ניהול ותיאום רחבות (כגון אימות משתמשים, ניהול תדרים RRM ועבודה מול רשת ה-LAN) מבוצעות בבקר (WLC).',
      'הסוכן האלחוטי מקשר את המחשב לשרת SQL חיצוני קבוע.',
      'ההתקנה מחייבת שימוש במערכת פקודות CLI נפרדת על האנטנות.'
    ],
    correctAnswer: 1,
    explanation: 'בארכיטקטורת Split-MAC, חלוקת התפקידים מעוצבת ליעילות מרבית: נקודת הגישה הרזה (Lightweight AP) מטפלת בדברים המחייבים תגובה פיזית מיידית (Real-time Beaconing, Frame Handshaking, MAC Layer Encryption, 802.11 physical operations). בקר ה-WLC מנהל את הנושאים הלוגיים המרכזיים שאינם בזמן אמת צפוף (System Config, Security policy, Active associations, Dynamic Frequency management).',
    hint: 'חשוב על "פיצול" (Split) שבו הפיזיקה והשידור הישיר קרובים לאנטנה, וההחלטות והניהול מתרכזים במיקום הראשי.',
    additionalInfo: 'קונספט זה ייחודי לרשתות ארגוניות גדולות ומקטין דרמטית את עלות התחזוקה של נקודות הגישה בבניינים.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 27'
  },

  // IP Connectivity (Domain 3)
  {
    id: 'ic_extra_1',
    domain: 'ip_connectivity',
    subtopic: 'נתיבי ניתוב סטאטיים',
    question: 'מהו ההבדל המרכזי בין "Recursive Static Route" לבין "Directly Attached Static Route" בהגדרות נתבי סיסקו?',
    options: [
      'Recursive מיועד לרשתות אינטרנט ציבוריות ו-Directly פנימי בלבד.',
      'Recursive Static Route מפנה את נתיב היציאה אך ורק לכתובת ה-IP של ה-Next-Hop (מה שמאלץ את הנתב לבצע פעמיים חיפוש בטבלת הניתוב כדי למצוא את הממשק הפיזי), בעוד Directly Attached מפנה ישירות לממשק היציאה המקומי (כמו GigabitEthernet0/1).',
      'Directly Attached אינו רשום בטבלת הניתוב כלל ואינו פעיל.',
      'אין כל הבדל ונתבי סיסקו אינם תומכים בשיטה רקורסיבית יותר.'
    ],
    correctAnswer: 1,
    explanation: 'Recursive Static Route מוגדר רק עם כתובת IP של הנתב הבא ("ip route 10.0.0.0 255.0.0.0 192.168.1.1"). כדי לשלוח את החבילה, הנתב חייב לבצע חיפוש ראשון עבור רשת היעד, למצוא שהשער הוא 192.168.1.1, ואז לבצע חיפוש שני (רקורסיבי) כדי לגלות איזה פורט פיזי מוביל אל 192.168.1.1. ב-Directly Attached, אנו מגדירים את ממשק היציאה ישירות ("ip route 10.0.0.0 255.0.0.0 GigabitEthernet0/0"), והנתב יודע מיד לאן להשליך את המידע ללא חיפוש כפול.',
    hint: 'רקורסיה אומרת חזרה או תהליך דו-שלבי למציאת כתובת ה-IP הבאה.',
    additionalInfo: 'הגדרת Directly Attached על גבי רשת מסוג Multi-access (כגון אתרנט) עלולה לגרום לבעיות ועומס ARP כיוון שהנתב יניח שכל יעדי הרשת מחוברים אליו ישירות פיזית. מומלץ להשתמש בנתיב המציין את שניהם (Fully Specified).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'ic_extra_2',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'ברצונך להפעיל OSPF על ממשק מסוים בנתב שכתובתו היא 192.168.12.33 עם מסכה /27. באיזו פקודת "network" עם מסכת Wildcard נכונה עליך להשתמש תחת הגדרות הנתב?',
    options: [
      'network 192.168.12.32 0.0.0.31 area 0',
      'network 192.168.12.0 0.0.0.255 area 0',
      'network 192.168.12.32 0.0.0.224 area 0',
      'network 192.168.12.33 255.255.255.224 area 0'
    ],
    correctAnswer: 0,
    explanation: 'כתובת ה-IP 192.168.12.33 עם מסכת /27 שייכת לרשת 192.168.12.32. מסכת Wildcard היא ההופכי הבינארי של מסכת תת-הרשת (255.255.255.255 פחות מסכת הרשת). עבור /27 המסכת היא 255.255.255.224. נבצע את החיסור: 255.255.255.255 פחות 255.255.255.224 ייתן לנו 0.0.0.31. לכן הפקודה המדויקת היא "network 192.168.12.32 0.0.0.31 area 0".',
    hint: 'הפחת כל אוקטט של מסכת תת הרשת (255.255.255.224) מהמספר 255 כדי למצוא את ה-Wildcard mask.',
    additionalInfo: 'לחלופין בסיסקו, ניתן גם להפעיל OSPF ישירות בתוך הממשק המקומי בעזרת הפקודה "ip ospf <process> area <id>" ללא צורך בחישובי רשתות.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_3',
    domain: 'ip_connectivity',
    subtopic: 'שלבי שכנות OSPF',
    question: 'באיזה שלב של יצירת יחסי שכנות OSPF (OSPF Neighbor States) שני נתבים מחליטים מי מהם יתפקד כ-Master ומי כ-Slave בתהליך החלפת המידע, ובוחרים את מספר הרצף (Sequence number)?',
    options: [
      'שלב Init state',
      'שלב 2-Way state',
      'שלב ExStart state',
      'שלב Full state'
    ],
    correctAnswer: 2,
    explanation: 'במהלך שלב ExStart (Extending Start), שני הנתבים השכנים מתכוננים להחלפת רשימת המידע שלהם (DBDs). בשלב זה הם קובעים יחסי Master/Slave על בסיס ה-Router ID הגבוה ביותר, ומסכמים על סינכרון Sequence Numbers התחלתי של החלפת הודעות.',
    hint: 'חפש את המילה שמזכירה התחלה של ייצוא והחלפת קבצים (Ex-Start) לפני החלפה עצמה (Exchange).',
    additionalInfo: 'קבלת הבנה של שלבי השכנות של OSPF (Down -> Init -> 2-Way -> ExStart -> Exchange -> Loading -> Full) הכרחית לפתרון סיווגי שגיאות בבחינה.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 19'
  },

  // IP Services (Domain 4)
  {
    id: 'is_extra_1',
    domain: 'ip_services',
    subtopic: 'NAT הגדרות ומושגים',
    question: 'במונחי תרגום כתובות (NAT) של סיסקו, מה מייצגת ההגדרה "Inside Global Address"?',
    options: [
      'הכתובת המקומית הפרטית שהוקצתה למארח ברשת הפנימית שלו.',
      'הכתובת הציבורית והחוקית המייצגת את המארח הפנימי של הרשת כלפי העולם החיצוני (האינטרנט) כפי שהיא נראית על ידי מחשבים חיצוניים.',
      'כתובת ה-IP של שרתי הגוגל העולמיים.',
      'כתובת ה-IP שמקבל לקוח מבית קפה בחיבור אלחוטי.'
    ],
    correctAnswer: 1,
    explanation: 'הגדרות NAT בסיסקו הן: 1) Inside Local - הכתובת הפרטית של המחשב הפנימי. 2) Inside Global - הכתובת הציבורית שמשמשת את המחשב לצאת לאינטרנט דרך הנתב. 3) Outside Local - הכתובת של היעד החיצוני כפי שהוא נראה ברשת הפנימית. 4) Outside Global - הכתובת הציבורית האמיתית שהוקצתה ליעד החיצוני באינטרנט.',
    hint: 'Inside אומר מישהו מהרשת שלנו, Global אומר הכתובת הציבורית שבה הוא מיוצג בעולם הגלובלי (הציבורי).',
    additionalInfo: 'הבנת ההבדלים בין ארבעת מונחים אלו הכרחית למענה על שאלות תרשים NAT בבחינה.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 5'
  },
  {
    id: 'is_extra_2',
    domain: 'ip_services',
    subtopic: 'שירות DNS',
    question: 'מהו סוג רשומת ה-DNS (DNS Record) המשמשת למיפוי שם מתחם (Domain Name) לכתובת IPv6 חדשה ומודרנית?',
    options: [
      'רשומת A',
      'רשומת CNAME',
      'רשומת AAAA (Quad-A)',
      'רשומת MX'
    ],
    correctAnswer: 2,
    explanation: 'רשומת A משמשת למיפוי שם כתובת (כמו www.google.com) לכתובת IPv4 באורך 32 סיביות. רשומת AAAA (Quad-A) משמשת למיפוי שם כתובת לכתובת IPv6 באורך 128 סיביות. רשומת CNAME משמשת ליצירת כינוי (Alias) לרשומה קיימת, ורשומת MX משמשת לשרתי דואר ודפדפנים.',
    hint: 'IPv6 ארוכה פי 4 מ-IPv4, לכן השתמש באות A ארבע פעמים (Quad-A).',
    additionalInfo: 'DNS פועל מעל שכבת ה-Transport בעיקר באמצעות פרוטוקול UDP בפורט 53.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 3'
  },

  // Security Fundamentals (Domain 5)
  {
    id: 'sf_extra_1',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת מכשירים',
    question: 'איזו פקודה ב-Cisco IOS מצפינה את כל סיסמאות הטקסט הפשוט (Cleartext Passwords) המופיעות בקובץ ה-running-config של הנתב, כדי למנוע צפייה בהן על ידי אנשים שעומדים ליד המסך?',
    options: [
      'enable secret',
      'service password-encryption',
      'crypto key generate rsa',
      'username admin privilege 15'
    ],
    correctAnswer: 1,
    explanation: 'הפקודה "service password-encryption" היא הגדרה גלובלית ב-IOS המצפינה באופן אוטומטי את כל סיסמאות הטקסט הפשוט המופיעות בקונפיגורציה (למשל סיסמאות line console, line vty או enable password). היא משתמשת באלגוריתם מיושן וחלש יחסית (Vigenere cipher או Type 7), אך מצוינת למניעת צפייה אקראית במסך על ידי עוברי אורח (Shoulder-surfing).',
    hint: 'מנשק שירות (Service) שמצפין את כל ה-Passwords בקונפיגורציה הכללית.',
    additionalInfo: 'חזק בהרבה להשתמש בפקודה "enable secret" המשתמשת בהצפנת MD5/SHA מתקדמת (Type 5/Type 8/9).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 9'
  },
  {
    id: 'sf_extra_2',
    domain: 'security_fundamentals',
    subtopic: 'חיבור מאובטח (SSH)',
    question: 'מהם הדרישות המקדימות (Prerequisites) ההכרחיות שיש להגדיר על נתב סיסקו לפני שניתן להריץ את הפקודה "crypto key generate rsa" להפעלת פרוטוקול SSH?',
    options: [
      'חיבור סיב אופטי ושרת DNS בלבד.',
      'הגדרת שם מכשיר ייחודי (Hostname) שונה מברירת המחדל, והגדרת שם מתחם לרשת (IP Domain-Name).',
      'הגדרת פרוטוקול OSPF ו-NTP.',
      'מחיקת קובץ ה-startup-config והפעלת הנתב מחדש.'
    ],
    correctAnswer: 1,
    explanation: 'יצירת מפתחות ההצפנה הדיגיטליים עבור SSH באמצעות הפקודה "crypto key generate rsa" מחייבת את הנתב להחזיק בשם מכשיר (Hostname) מוגדר, ובשם דומיין רשת (IP Domain-Name). הסיבה לכך היא שהנתב משתמש בשילוב של השניים (שם מלא FQDN, כגון RouterA.cisco.com) כחלק מהאלגוריתם והמזהה של ייצור מפתח ה-RSA המאובטח.',
    hint: 'הנתב חייב לדעת מי הוא (שם) ולאיזה מתחם (Domain) הוא משתייך כדי לצייר מפתח הצפנה.',
    additionalInfo: 'לאחר יצירת המפתח, יש לאפשר גישת SSH תחת "line vty 0 4" באמצעות הפקודה "transport input ssh".',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 9'
  },

  // Automation & Programmability (Domain 6)
  {
    id: 'ap_extra_1',
    domain: 'automation_programmability',
    subtopic: 'פורמטים של נתונים (YAML)',
    question: 'כיצד מיוצגים נתונים ורשימות בפורמט YAML המקובל בשימוש עם כלי אוטומציה כמו Ansible?',
    options: [
      'באמצעות סוגריים מסולסלים בלבד ולוגו של סיסקו.',
      'באמצעות שימוש בהזחות מוגדרות של רווחים (Indentation) למבנה העץ ההיררכי, סימן קו מפריד (- / Hyphen) עבור פריטים ברשימה, ועל ידי זוגות של מפתח: ערך (ללא גרשיים חובה ברוב המקרים).',
      'באמצעות תגיות פתיחה וסגירה הדומות לשפת HTML.',
      'באמצעות כתיבת קוד בינארי של אפסים ואחדים עם פקודות בשפת C.'
    ],
    correctAnswer: 1,
    explanation: 'פורמט YAML (YAML Ain\'t Markup Language) מיועד להיות קריא במיוחד עבור בני אדם. התחביר שלו אינו משתמש בסימני פיסוק מסובכים: ההיררכיה נקבעת באופן קפדני על ידי הזחה של רווחים (Indentation, אסור להשתמש ב-Tabs). זוגות של מפתח-ערך מופרדים על ידי נקודתיים ורווח (key: value), ופריטים ברשימה מיוצגים בעזרת מקף ורווח (- item). קבצי YAML לרוב מתחילים בשלושה מקפים (---).',
    hint: 'זכור את השימוש הקפדני ברווחים (הזחה) והמקף המייצג קבוצה של פריטים.',
    additionalInfo: 'פורמט זה מהווה את עמוד התווך של הגדרות Ansible Playbooks ומערכות Kubernetes.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15'
  },
  {
    id: 'ap_extra_2',
    domain: 'automation_programmability',
    subtopic: 'ארכיטקטורת רשת מתקדמת',
    question: 'במונחי Software-Defined Access (SDA) של סיסקו, מה מייצג ההבדל בין הרשת הפיזית (Underlay Network) לבין הרשת הלוגית הוירטואלית (Overlay Network)?',
    options: [
      'ה-Underlay הוא חיבור לאינטרנט וה-Overlay היא הצפנת הנתבים בלבד.',
      'ה-Underlay Network היא התשתית הפיזית הכוללת את המכשירים, הכבלים, והניתוב הבסיסי (כדי להבטיח חיבור IP בין המכשירים). ה-Overlay Network היא רשת וירטואלית ולוגית הנבנית מעליהם (באמצעות مנהור כגון VXLAN) כדי לשנע את חבילות המשתמשים ולממש את מדיניות האוטומציה ללא תלות ישירה בחומרה.',
      'ה-Overlay היא התקנה אלחוטית וה-Underlay היא הרכיב הפיזי של קו החשמל בארגון.',
      'אין הבדל ביניהם ויש להגדיר אותם תחת אותו תהליך IOS.'
    ],
    correctAnswer: 1,
    explanation: 'במערכות SDN מודרניות כגון SD-Access או SD-WAN, אנו מחלקים את הרשת לשני מרכיבים: 1) Underlay - החומרה הפיזית והכבלים שמריצים פרוטוקול ניתוב בסיסי (כגון IS-IS או OSPF) שכל מטרתו היא לוודא שיש קשר IP רציף בין כל צומת תקשורת. 2) Overlay - רשת לוגית מדומה שעובדת בתוך מנהרות (Tunnels, לרוב VXLAN) מעל ה-Underlay ומאפשרת ליצור הפרדות, אבטחה, ו-VLANs וירטואליים מנוהלי תוכנה מכל מקום לכל מקום.',
    hint: 'Underlay פירושו מה שנמצא "מתחת" (הפיזיקה והניתוב הבסיסי), Overlay הוא מה ש"מורכב מלמעלה" (הוירטואליזציה).',
    additionalInfo: 'זהו היסוד המרכזי של עולם הוירטואליזציה של הרשתות (Network Virtualization) המונח ביותר בבחינת CCNA 200-301.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 17'
  },
  // --- BATCH 1: Network Fundamentals & Network Access ---
  {
    id: 'nf_extra_6',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv4 פרטיות',
    question: 'אילו מבין טווחי הכתובות הבאים מוגדרים תחת תקן RFC 1918 ככתובות פנימיות/פרטיות (Private IP Addresses) שאינן מנותבות באינטרנט הציבורי?',
    options: [
      '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16',
      '100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16',
      '11.0.0.0/8, 172.32.0.0/12, 192.168.1.0/24',
      '224.0.0.0/4, 240.0.0.0/4, 255.255.255.255/32'
    ],
    correctAnswer: 0,
    explanation: 'תקן RFC 1918 מגדיר שלושה טווחי כתובות לשימוש פרטי בתוך רשתות LAN: Class A: 10.0.0.0/8 (10.0.0.0 עד 10.255.255.255), Class B: 172.16.0.0/12 (172.16.0.0 עד 172.31.255.255), Class C: 192.168.0.0/16 (192.168.0.0 עד 192.168.255.255). כתובות אלו מיועדות לחסוך בכתובות IPv4 ציבוריות ומחייבות שימוש ב-NAT כדי לפנות לאינטרנט.',
    hint: 'זכור את המספרים המתחילים ב-10, ב-172.16 וב-192.168.',
    additionalInfo: 'כל כתובת אחרת שאינה בטווחים אלה (כמו 11.0.0.1 או 172.32.1.1) נחשבת לכתובת ציבורית (Public Address) המנותבת באינטרנט.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 12'
  },
  {
    id: 'nf_extra_7',
    domain: 'network_fundamentals',
    subtopic: 'מושגי ניתוב בסיסיים',
    question: 'בעת תצורת נתיב סטטי, מהו ההבדל המעשי בין הגדרת כתובת Next-Hop IP לבין הגדרת Outgoing Interface מקומי?',
    options: [
      'כתובת Next-Hop גורמת לנתב לבצע חיפוש רקורסיבי בטבלה, בעוד הגדרת Outgoing Interface מניחה שהרשת מחוברת ישירות (Directly Connected) ויוצרת הודעות ARP עבור כל מארח ברשת היעד.',
      'Outgoing Interface מיועד אך ורק לרשתות IPv6, בעוד Next-Hop מיועד לרשתות IPv4 בלבד.',
      'אין שום הבדל מעשי ושתי השיטות מבצעות בדיוק אותה כמות של עבודת מעבד.',
      'שימוש ב-Next-Hop דורש הפעלה של פרוטוקול OSPF באופן מיידי בממשק.'
    ],
    correctAnswer: 0,
    explanation: 'כשמגדירים נתיב סטטי עם Next-Hop בלבד, הנתב חייב לבצע חיפוש רקורסיבי (Recursive Lookup) כדי לברר מאיזה ממשק לשלוח את החבילה. כשמגדירים Outgoing Interface, הנתב רואה את הרשת כאילו היא מחוברת ישירות אליו, בקצוות משותפים בעלי טכנולוגיית Multi-access (כמו Ethernet), הוא ישלח הודעת ARP לכל כתובת יעד באותה רשת, דבר שעלול למלא את טבלת ה-ARP (נקרא ARP Flux).',
    hint: 'רקורסיה דורשת מהנתב לעשות עבודה כפולה בטבלה, בעוד ממשק יציאה ברשת אתרנט עלול לגרום להודעות ARP רבות.',
    additionalInfo: 'ההגדרה המומלצת ביותר בחיבורי אתרנט היא שילוב של השניים (Fully Specified Static Route): ציון ממשק היציאה וכתובת ה-Next-Hop ביחד.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'nf_extra_8',
    domain: 'network_fundamentals',
    subtopic: 'טופולוגיות מרכז נתונים',
    question: 'מהו המבנה הארכיטקטוני הטיפוסי של טופולוגיית Spine-Leaf (הידועה כטופולוגיית Clos) בדאטה סנטר, וכיצד היא שונה מטופולוגיית 3-Tier קלאסית?',
    options: [
      'כל מתג Leaf מחובר לכל מתגי ה-Spine, אך אין חיבורים ישירים בין מתגי Leaf לבין עצמם או בין מתגי Spine לבין עצמם. דבר זה מייצר השהיה קבועה וצפויה בין כל שני שרתים.',
      'מתגי Spine מחוברים זה לזה בטבעת, ומתגי Leaf מחוברים רק למשתמשי הקצה ללא קשר לליבה.',
      'היא מבוססת על חיבור של כל המתגים במבנה משולש אחיד ללא חלוקה לשכבות.',
      'היא מיועדת להפריד את הדאטה סנטר לרשתות דחוסות המונעות שימוש בכתובות IP.'
    ],
    correctAnswer: 0,
    explanation: 'טופולוגיית Spine-Leaf מעוצבת כדי לתמוך בתעבורה משמעותית מצד-לצד (East-West Traffic) המאפיינת דאטה סנטרים מודרניים (שרת המדבר עם שרת אחר). במבנה זה, כל מתג Leaf (אליו מחוברים השרתים) מקושר לכל מתג Spine (מרכז הליבה המהיר), אך אין חיבורים אופקיים בין Leaf ל-Leaf או Spine ל-Spine. ארכיטקטורה זו מבטלת את הצורך ב-STP (מכיוון שהכל מנותב בשכבה 3) ומבטיחה שבין כל שני שרתים ברשת יש בדיוק מרחק של שני מתגים (Two-hop distance).',
    hint: 'מתגים שרוצים לקשר שרתים נקראים עלים (Leafs), והעמוד השדרה המרכזי המחבר אותם נקרא Spine.',
    additionalInfo: 'שיטה זו מחליפה את ה-3-Tier הקלאסי (Access, Distribution, Core) שתוכנן לתעבורת North-South (משתמשים היוצאים לאינטרנט או לשרת מרכזי).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 14'
  },
  {
    id: 'nf_extra_9',
    domain: 'network_fundamentals',
    subtopic: 'טכנולוגיות WAN',
    question: 'איזה שירות מבין שירותי ה-WAN הבאים מספק רשת Ethernet קווית ארגונית מבוססת מיתוג תוויות מרובות (Multipoint/VPLS) המקשרת מספר סניפים מרוחקים כאילו היו מחוברים לאותו מתג מקומי?',
    options: [
      'Metro Ethernet (VPLS / E-LAN)',
      'T1 / E1 Leased Lines',
      'DSL (Digital Subscriber Line)',
      'Frame Relay'
    ],
    correctAnswer: 0,
    explanation: 'שרותי Metro Ethernet מספקים קישוריות אתרנט על גבי רשת ספק התקשורת. שירות ה-E-LAN (או VPLS - Virtual Private LAN Service) מדמה מתג אתרנט וירטואלי ענק של ספק השירות, המאפשר למספר סניפים של הארגון להתקשר ביניהם בשכבה 2 ישירות, בעוד שירות E-Line (נקודה לנ Brody) מדמה כבל קו בודד המקשר בין שני סניפים בלבד.',
    hint: 'חפש את שם השירות המיישר קשר עם קווי אתרנט עירוניים וארגוניים מורחבים.',
    additionalInfo: 'Metro Ethernet מקטין את עומס הניהול של מהנדסי הרשתות מכיוון שאין צורך להגדיר קונפיגורציית WAN מסובכת (כמו פעם ב-Serial Links).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 14'
  },
  {
    id: 'nf_extra_10',
    domain: 'network_fundamentals',
    subtopic: 'טופולוגיות רשת',
    question: 'מהו היתרון הראשי והחיסרון הראשי של בניית טופולוגיית רשת במבנה Full Mesh (סריג מלא) לעומת טופולוגיית Star (כוכב)?',
    options: [
      'היתרון הוא שרידות מקסימלית (Redundancy) מכיוון שכל מכשיר מחובר לכל מכשיר אחר ישירות; החסרון הוא עלות גבוהה ומורכבות קישוריות פיזית עצומה (ריבוי כבלים ופורטים).',
      'היתרון הוא מהירות חיבור אלחוטית גדולה יותר, והחיסרון הוא חוסר אפשרות להפעיל IPv6.',
      'היתרון הוא חיסכון משמעותי בכבלים, והחיסרון הוא שבמידה והנתב המרכזי קורס כל הרשת נופלת.',
      'אין הבדל מעשי בעלויות או בשרידות וכיום משתמשים רק ב-Star.'
    ],
    correctAnswer: 0,
    explanation: 'בטופולוגיית Full Mesh, לכל צומת יש חיבור פיזי ישיר לכל שאר הצמתים ברשת. השיקול המרכזי בהקמתה הוא שרידות: אם קו אחד או מכשיר אחד קורס, תמיד ישנם נתיבים חלופיים רבים. הנוסחה לחישוב מספר הקישורים הדרושים היא n*(n-1)/2. לכן, עבור 10 מכשירים יידרשו 45 קישורים פיזיים, מה שהופך את המבנה ליקר מאוד, קשה ליישום פיזי ומסובך לתחזוקה בהשוואה לטופולוגיית כוכב פשוטה (Star layout) המתרכזת סביב מתג פיזי מרכזי.',
    hint: 'חשוב על הנוסחה הריבועית של חיבור כל נקודה לכל נקודה אחרת (סריג שלם מול נקודה מרכזית אחת).',
    additionalInfo: 'מסיבות אלו, רשתות Full Mesh מיושמות לרוב רק בליבת הרשת (Core) או בחיבורי WAN של סניפים קריטיים במיוחד, בעוד רשתות הגישה תמיד מבוססות על כוכב מורחב (Extended Star).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13'
  },
  {
    id: 'nf_extra_11',
    domain: 'network_fundamentals',
    subtopic: 'רכיבי תקשורת וכבלים',
    question: 'מתי נדרש להשתמש בכבל מוצלב (Crossover Cable) בהשוואה לכבל ישר (Straight-Through Cable) ברשת אתרנט שבה מנגנון ה-Auto-MDIX מבוטל?',
    options: [
      'לחיבור בין מכשירים הפועלים באותה שכבה לוגית (כמו Switch ל-Switch, או Router ל-Router/PC המשתמשים באותם פינים לשידור וקליטה).',
      'לחיבור בין מתג (Switch) לשרת (Server) בלבד.',
      'רק בחיבור של נתב אלחוטי ישירות לקיר הטלפון.',
      'רק לצורך ביצוע קונפיגורציה בחיבור כחול מסוג Console לנתב.'
    ],
    correctAnswer: 0,
    explanation: 'כבל אתרנט רגיל מחזיק בפינים ייעודיים לשידור (Tx, פינים 1 ו-2) וקליטה (Rx, פינים 3 ו-6). מכשירים כמו מתגים ורכזות (שכבה 2) משדרים על 3 ו-6 וקולטים על 1 ו-2. מחשבים ונתבים (ומדפסות) משדרים על 1 ו-2 וקולטים על 3 ו-6. כאשר מחברים שני מכשירים מאותו סוג (למשל נתב לנתב, או מתג למתג), הפינים לשידור ולקליטה מתנגשים, ולכן אנו צריכים כבל מוצלב (Crossover) המצליב פיזית את הגידים בתוך הראשים של הכבל.',
    hint: 'מאותה שכבת פעילות? הצלב! שכבות שונות (Switch ל-PC)? כבל ישר.',
    additionalInfo: 'כיום, רוב מכשירי הרשת תומכים בתכונת Auto-MDIX המזהה את סוג החיבור ומחליפה לוגית את מצב הפינים באופן אוטומטי, אך הבנת הכלל התיאורטי מחייבת בבחינה.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },
  {
    id: 'nf_extra_12',
    domain: 'network_fundamentals',
    subtopic: 'סיבים אופטיים',
    question: 'מהו ההבדל הטכני המרכזי בין חריצי הרחבה פיזיים מסוג SFP לעומת SFP+ במקלטי-משדר (Transceivers) המורכבים על גבי מתגים ונתבים של סיסקו?',
    options: [
      'חריצי SFP תומכים במהירויות של עד 1 Gbps, בעוד SFP+ תומך במהירויות גבוהות יותר של 10 Gbps (בעל תאימות לאחור הנדסית).',
      'SFP+ הוא פתרון המיועד אך ורק לכבלי נחושת ולא לסיבים אופטיים.',
      'SFP תומך ב-100 Gbps וSFP+ תומך ב-1 Gbps בלבד.',
      'SFP+ מיועד לחיבורי מאווררים וספקים מוגברים בלבד במתג החרוץ.'
    ],
    correctAnswer: 0,
    explanation: 'רכיבי SFP (Small Form-factor Pluggable) הם מקלטי-משדר נשלפים המאפשרים למתגים להתחבר לסוגי סיבים ופינים שונים. תקן SFP המקורי פותח לתעבורה של עד 1 Gbps. תקן SFP+ פותח מאוחר יותר בעל מידות פיזיות זהות אך משתמש ברכיבי אלקטרוניקה משופרים התומכים במהירויות של 10 Gbps. רוב מתגי סיסקו בעלי פורטים של SFP+ מאפשרים להכניס לתוכם רכיבי SFP ישנים המגבילים את מהירות הקישור ל-1 Gbps.',
    hint: 'סימן הפלוס (+) מסמל תמיד מהירות גדולה יותר (10 Gbps לעומת 1 Gbps).',
    additionalInfo: 'קיימים גם תקנים מהירים עוד יותר כגון QSFP (Quad SFP) התומכים במהירויות של 40 Gbps ו-100 Gbps באמצעות שילוב מרובה של ערוצי שידור.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },
  {
    id: 'nf_extra_13',
    domain: 'network_fundamentals',
    subtopic: 'פרוטוקולי שכבת ה-Transport',
    question: 'במהלך תהליך יצירת חיבור מסוג TCP (שלוש שלבי ה-Three-Way Handshake), אילו דגלים (Flags) מודלקים בכותרת ה-Segment בכל אחד משלושת השלבים בהתאמה?',
    options: [
      'שלב 1: SYN | שלב 2: SYN + ACK | שלב 3: ACK',
      'שלב 1: SYN | שלב 2: ACK | שלב 3: FIN',
      'שלב 1: RST | שלב 2: SYN + RST | שלב 3: ACK',
      'שלב 1: PSH | שלב 2: PSH + ACK | שלב 3: URG'
    ],
    correctAnswer: 0,
    explanation: 'מנגנון ה-Three-Way Handshake של TCP מתבצע כך: 1) השולח יוזם קשר ומדליק את דגל הסינכרון SYN (Synchronize). 2) המקבל מאשר את קבלת הבקשה ושולח בחזרה דגל אישור משולב עם בקשת סינכרון שלו SYN-ACK (Synchronize-Acknowledgment). 3) השולח מאשר את בקשת הסינכרון של המקבל ושולח דגל ACK (Acknowledgment) סופי. לאחר שלושת שלבים אלה, החיבור מוגדר במצב Established והנתונים יכולים להתחיל לעבור.',
    hint: 'סינכרון (SYN), סינכרון ואישור (SYN-ACK), ואישור סופי (ACK).',
    additionalInfo: 'הבנת תהליך זה קריטית להבנת חוקי אבטחה ב-ACL (למשל מניעת כניסת מנות חדשות מבחוץ באמצעות פילטר "established" הבודק את דגל ה-ACK).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 5'
  },
  {
    id: 'nf_extra_14',
    domain: 'network_fundamentals',
    subtopic: 'כותרת Ethernet Frame',
    question: 'מהו תפקידו ומקומו של שדה ה-Frame Check Sequence (FCS) הממוקם בכותרת מסגרת האתרנט (Ethernet Trailer)?',
    options: [
      'הוא נמצא בסוף ה-Frame ומשמש לזיהוי שגיאות שידור במידע באמצעות חישוב מתמטי מסוג CRC (Cyclic Redundancy Check). המקבל משווה את החישוב שלו, ואם יש חוסר התאמה המסגרת פשוט נזרקת.',
      'הוא נמצא בתחילת ה-Frame ומשמש להצפין את כתובות ה-MAC.',
      'הוא שדה המגדיר לנתב לאיזו כתובת IPv4 לנתב את המידע ברשת.',
      'הוא מנגנון המאפשר למתג לגלות האם קיימת לולאת מיתוג STP.'
    ],
    correctAnswer: 0,
    explanation: 'שדה ה-FCS הוא שדה באורך 4 בתים (32 סיביות) הממוקם בסיום (Trailer) של ה-Ethernet Frame. השולח מבצע חישוב מתמטי מסוג CRC על כל ה-Frame ורושם את התוצאה ב-FCS. המקבל מבצע בדיוק את אותו חישוב על ה-Frame שקיבל. אם שתי התוצאות זהות, המידע עבר תקין. אם יש חוסר התאמה, זה מעיד על שיבוש בחומרה או רעש חשמלי בכבל, והמסגרת נזרקת מיידית ללא שליחה מחדש על ידי שכבה 2 (TCP, אם פועל בשכבה 4, יטפל בשליחה מחדש מאוחר יותר).',
    hint: 'בודק שגיאות בסוף קו התקשורת הפיזי של שכבה 2.',
    additionalInfo: 'שגיאות אלו מופיעות תחת הפלט "input errors" או "CRC errors" כשמריצים את הפקודה "show interfaces" במתג.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },
  {
    id: 'nf_extra_15',
    domain: 'network_fundamentals',
    subtopic: 'מתגים לעומת רכזות',
    question: 'כיצד מתג (Switch) מנהל למידת כתובות MAC ומנווט את תנועת המסגרות ברשת הגישה, בהשוואה לפעולתו הפיזית של רכזת (Hub)?',
    options: [
      'רכזת משדרת את האות הפיזי לכל הפורטים (Flood), בעוד מתג בונה טבלת MAC Address Table על סמך כתובות המקור (Source MAC) של המסגרות הנכנסות, ומנתב מסגרות ידועות אך ורק לפורט היעד הספציפי (Unicast).',
      'מתג תמיד משדר הודעות Flood לכל הפורטים ואינו יודע לזכור כתובות.',
      'רכזת מבוססת על כתובות IP ומתג מבוסס על מיתוג תוויות בלבד.',
      'מתג מבצע את כל הפעולות בשכבה 3 של מודל ה-OSI ומבטל את השימוש ב-MAC.'
    ],
    correctAnswer: 0,
    explanation: 'רכזת (Hub) פועלת בשכבה 1 של מודל OSI: היא אינה קוראת את המידע אלא משכפלת עיוורת את האות החשמלי לכל הפורטים האחרים, דבר שמייצר מתחם התנגשות (Collision Domain) יחיד. מתג (Switch) פועל בשכבה 2: הוא בוחן את כתובת ה-MAC של השולח (Source MAC) ומוסיף אותה לטבלת ה-MAC שלו לצד פורט הכניסה. כאשר מגיעה מסגרת המיועדת למכשיר מסוים, המתג בודק את כתובת היעד (Destination MAC), ואם הוא מכיר אותה בטבלה, הוא משנע אותה ישירות אל הפורט המתאים בלבד, ובכך ממנע התנגשויות ומשפר פלאים את אבטחת המידע ורוחב הפס.',
    hint: 'רכזת היא טיפשה ומשדרת לכולם; מתג לומד את כתובת המקור ושולח במדויק ליעד.',
    additionalInfo: 'אם כתובת ה-MAC המיועדת אינה מופיעה בטבלת המתג, הוא יבצע תהליך הקרוי Unicast Flooding (שליחת המסגרת לכל הפורטים באותו VLAN פרט לפורט ממנו נכנסה) עד שילמד את מיקומה.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 6'
  },
  {
    id: 'nf_extra_16',
    domain: 'network_fundamentals',
    subtopic: 'מושגי רשת כלליים',
    question: 'מהי המשמעות של הערך MTU (Maximum Transmission Unit) בהקשר של כרטיסי רשת וחיבורים מקומיים, ומהו גודל ברירת המחדל שלו ברשתות אתרנט סטנדרטיות?',
    options: [
      'זהו הגודל המקסימלי (בבתים) של חבילת מידע בשכבה 3 (IP Packet) שניתן להעמיד ולהעביר על גבי הממשק הפיזי מבלי לבצע פרגמנטציה. ברירת המחדל היא 1500 בתים.',
      'זהו קצב העברת הנתונים הגבוה ביותר של הממשק, בדרך כלל 1000 Mbps.',
      'זהו מספרו של הזמן הלוגי המוגדר למנות TCP להמתין לאישור.',
      'זהו גודל כרטיס הזיכרון החיצוני המותקן בבסיס המעבד.'
    ],
    correctAnswer: 0,
    explanation: 'ה-MTU מגדיר את גודל חבילת שכבה 3 (IP Packet) המקסימלי שניתן להעביר על הממשק הפיזי ללא צורך בחיתוך/פרגמנטציה של חבילת המידע (IP Fragmentation). ברשתות אתרנט רגילות, ה-MTU המקסימלי הוא 1500 בתים. אם נוסיף ל-1500 הבתים הללו את כותרת שכבה 2 (Ethernet Header ו-Trailer בגודל 18 בתים) נקבל Frame פיזי כולל של 1518 בתים.',
    hint: 'זכור את המספר 1500 כגבול התקני להצפת מנות IP ברשת LAN רגילה.',
    additionalInfo: 'קיימות רשתות מיוחדות (כמו בדאטה-סנטר או מערכות אחסון SAN) התומכות ב-Jumbo Frames עם MTU של עד 9000 בתים כדי לחסוך בתקורה של עיבוד חבילות רבות על גבי המעבדים במערכות התקשורת.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 5'
  },
  {
    id: 'nf_extra_17',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'מהו התחילית (Prefix) המאפיינת את כתובות ה-Global Unicast Addresses (GUA) ב-IPv6 הניתנות לניתוב ציבורי באינטרנט הכללי?',
    options: [
      '2000::/3',
      'fe80::/10',
      'fc00::/7',
      'ff00::/8'
    ],
    correctAnswer: 0,
    explanation: 'כתובות מסוג GUA ב-IPv6 הן כתובות ציבוריות המקבילות לכתובות הציבוריות של IPv4. התקן הנוכחי מוגדר על ידי ה-IANA עם התחילית 2000::/3. המשמעות היא ששלושת הביטים הראשונים חייבים להיות "001". הדבר מעמיד את הטווח הציבורי המוכר החל מכתובות המתחילות בספרה 2 או 3 (2000:: עד 3fff:ffff:ffff:ffff:ffff:ffff:ffff:ffff).',
    hint: 'כתובות אינטרנט ציבוריות ב-IPv6 מתחילות תמיד בספרות 2 או 3.',
    additionalInfo: 'מזהה תת שרשת (Subnet ID) בכתובות אלו ממוקם בדוגמה טיפוסית בביטים 49 עד 64 (מקטע רביעי של הכתובת).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22'
  },
  {
    id: 'nf_extra_18',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'מהי התחילית (Prefix) המשמשת עבור כתובות מסוג Unique Local Addresses (ULA) ב-IPv6 המיועדות לתרגול ועבודה פנימית מאובטחת בארגונים (המקבילה לכתובות RFC 1918 ב-IPv4)?',
    options: [
      'fc00::/7',
      'fe80::/10',
      '2001::/32',
      'ff02::/16'
    ],
    correctAnswer: 0,
    explanation: 'כתובות Unique Local (ULA) ב-IPv6 פותחו כדי להחליף את השימוש בכתובות פרטיות עבור ארגונים שרוצים לקיים רשת פנימית עצומה ללא ניתוב לאינטרנט החיצוני וללא חשש התנגשות כתובות בין חברות במקרה של מיזוג ארגונים. התחילית הרשמית שלהן היא fc00::/7 (בפועל הביט השמיני מוגדר כ-1 לציון ייצור אקראי מקומי, ולכן רוב הכתובות תכלס מתחילות ב-fd00::/8).',
    hint: 'מיוצגות על ידי האותיות f, c או f, d ב-IPv6.',
    additionalInfo: 'כתובות אלו אינן מנותבות באינטרנט הציבורי, ונתבי לוחצים עליהן חוקי מניעת שינוע (Drop) כברירת מחדל.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22'
  },
  {
    id: 'na_extra_5',
    domain: 'network_access',
    subtopic: 'Inter-VLAN Routing',
    question: 'כיצד פועלת שיטת הניתוב הבין-רשתי Router-on-a-Stick (RoaS) לחיבור רשתות VLAN מרובות בארגון באמצעות ממשק פיזי יחיד של נתב?',
    options: [
      'הנתב משתמש בממשק פיזי יחיד המחולק למספר ממשקים לוגיים הקרויים Subinterfaces. כל ממשק לוגי מקושר ל-VLAN ID ספציפי באמצעות הגדרת תיוג 802.1Q (Encapsulation 802.1q <vlan_id>) ומתפקד כשער ברירת המחדל של אותו VLAN.',
      'הנתב דורש חיבור כבלים פיזיים נפרדים ופורטים יקרים עבור כל VLAN במתג ללא חלוקה לתוכנה.',
      'הנתב מעביר את כל התעבורה באמצעות מנגנון DTP אלחוטי ישירות אל בקר ה-WLC.',
      'מנגנון זה פועל על בסיס מיתוג תוויות בשכבה 3 והוא מחליף את מנגנון ה-STP.'
    ],
    correctAnswer: 0,
    explanation: 'בשיטת Router-on-a-Stick, אנו מחברים כבל אתרנט יחיד בין פורט Trunk במתג לבין פורט פיזי בנתב (למשל Gig0/0). בנתב, אנו לא מגדירים כתובת IP על הפורט הפיזי הראשי, אלא יוצרים תת-ממשקים לוגיים (למשל Gig0/0.10, Gig0/0.20) באמצעות הפקודה "interface gigabitEthernet 0/0.10". בתוך כל תת-ממשק אנו מקלידים את הפקודה "encapsulation dot1Q 10" המורה לנתב לפרק ולתייג תעבורה השייכת ל-VLAN 10, ומקצים לו כתובת IP מתאימה המשמשת כ-Default Gateway של אותו תת-רשת.',
    hint: 'מקל יחיד (Stick) בדמות ממשק פיזי אחד המפוצל למספר ממשקים וירטואליים מנוקדים.',
    additionalInfo: 'בארגונים מודרניים פתרון זה מוחלף לרוב בשימוש במתג שכבה 3 (Layer 3 Switch) המבצע מיתוג בין-רשתי מהיר בחומרה באמצעות ממשקי SVI (Switched Virtual Interfaces).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8'
  },
  {
    id: 'na_extra_6',
    domain: 'network_access',
    subtopic: 'Voice VLAN',
    question: 'כיצד מתג של סיסקו מארגן את שני סוגי התעבורה השונים (Data ו-Voice) על גבי פורט בודד שמחובר אליו טלפון IP ארגוני המשרשר מחשב קצה אחריו?',
    options: [
      'הפורט מוגדר תחת שתי פקודות: "switchport access vlan <id>" לתעבורת הנתונים של המחשב ללא תגית, ו"switchport voice vlan <id>" לתעבורת הטלפון המתויגת בתקן 802.1Q המועברת בתיעדוף קול.',
      'המתג מחייב הקמת קשר Trunk רגיל המכביד על כרטיס הרשת של ה-PC.',
      'מתגי סיסקו אינם תומכים בשידור שני סוגי VLAN בפורט בודד ויש להריץ שני כבלים שונים מהקיר.',
      'תעבורת הקול עוברת הצפנה אלחוטית והמחשב מנוטרל זמנית בזמן שיחה.'
    ],
    correctAnswer: 0,
    explanation: 'טלפוני IP ארגוניים מתפקדים כמתגי 3-פורטים פנימיים קטנים המשרשרים את המחשב אחריהם כדי לחסוך בנקודות רשת בקיר. כדי להפריד את תעבורת המחשב (העלולה להיות עמוסה בווידאו או הורדות) מתעבורת הקול (הקריטית והרגישה לעיכובים), אנו מגדירים על פורט המתג Voice VLAN ו-Access VLAN. תעבורת המחשב נשלחת מהטלפון למתג ללא קוד תיוג (Untagged Frame) ומשויכת ל-Access VLAN, בעוד תעבורת הקול מתויגת מהטלפון עצמו עם תגית 802.1Q (Tagged Frame) המכילה את ה-Voice VLAN ID ומאפשרת למתג לתעדף את המנות (QoS).',
    hint: 'הגדרת פורט גישה משולב אחד השולח נתונים (Access) ותעבורת קול (Voice) בצורה נפרדת ולוגית בתגית.',
    additionalInfo: 'הפקודה המוגדרת היא למשל: "switchport access vlan 10" ו-"switchport voice vlan 150".',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 8'
  },
  {
    id: 'na_extra_7',
    domain: 'network_access',
    subtopic: 'Spanning Tree Protocol (STP)',
    question: 'בפרוטוקול STP הקלאסי (IEEE 802.1D), מהם חמשת מצבי הפורטים (Port States) המוגדרים לשמירה מפני לולאות, ומהו המעבר ביניהם?',
    options: [
      'Blocking, Listening, Learning, Forwarding, Disabled',
      'Discarding, Learning, Forwarding, Blocking, Enabled',
      'Listening, Learning, Routing, Switching, Shuting',
      'Init, Up, Exchange, Down, Full'
    ],
    correctAnswer: 0,
    explanation: 'כדי למנוע לולאות בהדלקה או שינוי טופולוגיה, פורט STP עובר סדרת מצבים: 1) Blocking - חסימת תנועת משתמשים, קריאת הודעות BPDU בלבד. 2) Listening - המתנה ללמידה וייצוב (אין תעבורת נתונים, אין למידת כתובות MAC, שליחה וקבלה של BPDU בלבד). 3) Learning - למידת כתובות MAC והוספתן לטבלה (אין עדיין העברת מסגרות נתונים). 4) Forwarding - עבודה מלאה (העברת נתונים ולמידות MAC פעילות). 5) Disabled - פורט כבוי מנהלתית (Shutdown). המעבר מ-Blocking ל-Forwarding לוקח כ-30 שניות (15 שניות ב-Listening ו-15 שניות ב-Learning).',
    hint: 'זכור את ראשי התיבות: B.L.L.F.D (חוסם, מאזין, לומד, מעביר, מנוטרל).',
    additionalInfo: 'בפרוטוקול RSTP המודרני (802.1w), אוחדו המצבים Blocking, Listening ו-Disabled למצב לוגי יחיד ומהיר בשם Discarding State.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 9'
  },
  {
    id: 'na_extra_8',
    domain: 'network_access',
    subtopic: 'Rapid Spanning Tree Protocol (RSTP)',
    question: 'אילו תפקידי פורטים (Port Roles) נוספו בפרוטוקול RSTP (IEEE 802.1w) כדי לאפשר יתירות מהירה ומעבר מיידי למצב העברה במידה והקישור הראשי נופל?',
    options: [
      'Alternate Port ו-Backup Port',
      'Designated Port ו-Root Port',
      'Master Port ו-Slave Port',
      'Active Port ו-Passive Port'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול RSTP שומר על תפקודים קיימים כמו Root Port (הפורט הקרוב ביותר ל-Root Bridge) ו-Designated Port (הפורט שמשלח קדימה את ה-BPDU במקטע). הוא מוסיף להם תפקידי גיבוי חיוניים להתכנסות מהירה: 1) Alternate Port - פורט המהווה גיבוי ישיר ל-Root Port. אם ה-Root Port נשבר פיזית, ה-Alternate Port הופך מיידית ל-Root החדש ומדלג על שלבי ההמתנה הישנים. 2) Backup Port - פורט המהווה גיבוי ל-Designated Port (בעיקר כשמשתמשים ברכזת Shared segment).',
    hint: 'זהו פורט חלופי (Alternate) הממתין ללא דיליי לשנייה שבה הפורט הראשי ייכשל.',
    additionalInfo: 'קיומו של Alternate Port ברשת מאפשר ל-RSTP להגיע להתכנסות (Convergence) בתוך מילי-שניות בודדות במקום 30-50 שניות ב-STP הישן.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 9'
  },
  {
    id: 'na_extra_9',
    domain: 'network_access',
    subtopic: 'מיתוג רשת מקומית',
    question: 'מהו זמן ההתיישנות ברירת המחדל (MAC Address Table Aging Time) שבו מתג סיסקו מוחק כתובת MAC של משתמש מהטבלה שלו במידה והמחשב שלו לא שלח שום פריים נתונים חדש?',
    options: [
      '300 שניות (5 דקות)',
      '60 שניות (דקה אחת)',
      '1800 שניות (חצי שעה)',
      '30 שניות'
    ],
    correctAnswer: 0,
    explanation: 'כדי למנוע מטבלת ה-MAC (הקרויה גם זיכרון CAM) להתמלא במכשירים שכבר נותקו או עברו מיקום פיזי, מתגים משתמשים בטיימר aging time. אם לא התקבל פריים מאותה כתובת מקור במשך 300 שניות (5 דקות), הרשומה נמחקת אוטומטית. כל פריים חדש שמגיע מאתחל את השעון מחדש ל-300.',
    hint: '5 דקות הן בדיוק 300 שניות במערכת המיתוג של סיסקו.',
    additionalInfo: 'ניתן לשנות את זמן ההתיישנות באמצעות הפקודה "mac address-table aging-time <seconds>". הגדרת ערך 0 תבטל את ההתיישנות לחלוטין (לא מומלץ!).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 6'
  },
  {
    id: 'na_extra_10',
    domain: 'network_access',
    subtopic: 'פרוטוקולי FHRP',
    question: 'בפרוטוקול HSRP (Cisco Proprietary hot standby), מהו תפקידו ועיצובו של ה-Virtual MAC Address אליו מחשבי הקצה פונים בארגון?',
    options: [
      'זהו כתובת פיזית קבועה שנצרבת במפעל עבור כל מארז נתב.',
      'זהו כתובת MAC מדומה (הנוצרת אוטומטית כגון 0000.0c07.acXX ב-HSRPv1) המשותפת ומנוהלת על ידי קבוצת הנתבים. היא תמיד משויכת לנתב המתפקד כ-Active ומבטיחה שהלקוחות לא יצטרכו לבצע שינויי ARP כאשר הנתב הראשי קורס והשני מחליף אותו באותו רגע.',
      'A כתובת מיוחדת המשמשת את שירות ה-DHCP להקצאת כתובות בלבד.',
      'זהו ה-MAC של בקר ה-WLC שנועד לשרש את כל האנטנות.'
    ],
    correctAnswer: 1,
    explanation: 'על מנת לספק יתירות שער ברירת מחדל (Default Gateway redundancy), פרוטוקול HSRP מקצה כתובת IP וירטואלית וכתובת MAC וירטואלית. כתובת ה-MAC הווירטואלית ב-HSRPv1 היא בעלת המבנה הקבוע 0000.0c07.acXX (כאשר XX הוא מספר קבוצת ה-HSRP בייצוג הקסדצימלי). כאשר הנתב הפעיל (Active Router) נכשל, נתב הגיבוי (Standby Router) משתלט על כתובת ה-IP הווירטואלית וגם על ה-MAC הווירטואלי, ובכך נמנע הצורך לעדכן את טבלאות ה-ARP של מחשבי הקצה ברשת (מעבר שקוף ללא ניתוק).',
    hint: 'ה-MAC הווירטואלי משתלט על פורט הגיבוי באופן שקוף לחלוטין עבור המשתמשים.',
    additionalInfo: 'ב-HSRPv2, השתנה טווח ה-MAC הווירטואלי למבנה 0000.0c9f.fXXX על מנת לתמוך ביותר קבוצות פעילות (עד 4096 קבוצות).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 4'
  },
  {
    id: 'na_extra_11',
    domain: 'network_access',
    subtopic: 'בקרים אלחוטיים (WLC)',
    question: 'בבקר אלחוטי ארגוני של סיסקו (WLC), מהו תפקידו הראשי של ה-Virtual Interface בהשוואה ל-Management Interface?',
    options: [
      'ה-Management Interface משמש לניהול מנהלתי, תקשורת CAPWAP מול נקודות הגישה, ואימותים. ה-Virtual Interface משמש בעיקר לתמוך בנושאי ניידות לקוחות (Mobility), ניהול DHCP Relay, ונוכחות דף אינטרנט של ה-Captive Portal עבור חיבורי אורחים (Guest WiFi).',
      'ה-Virtual Interface הוא השער הפיזי המחבר את המתג ישירות לאינטרנט החיצוני ברגל שכבה 3.',
      'ה-Management Interface הוא אלחוטי בלבד וה-Virtual הוא קווי בלבד.',
      'אין תפקוד כזה בבקרים ורושמים רק ממשק Management בודד.'
    ],
    correctAnswer: 0,
    explanation: 'נתבי ובקרי WLC משתמשים במספר ממשקים מבוססי תוכנה: 1) Management Interface (חובה) - משמש לתקשורת פנימית, גישת ניהול (HTTP/SSH) ודיבור CAPWAP עם נקודות הגישה הפיזיות. 2) Virtual Interface (חובה) - משמש לניהול מנות DHCP (מפנה לקליינטים כתובת IP פיקטיבית כגון 1.1.1.1 לשחק כ-DHCP server), ומציג את הדף הגרפי ללחיצת "אשר תנאים" (Captive Web Portal) עבור משתמשי אורח WiFi. 3) Dynamic Interfaces (אופציונלי) - מקשרים את בקבוצת שמות ה-SSID אל ה-VLANs הפיזיים השונים ברשת האתרה.',
    hint: 'ממשק ה-Virtual עוזר למשימות ניידות פנימיות ורושם כתובות לקוחות מדומומות להרצת דפי עמודי אורח.',
    additionalInfo: 'כתובת ה-Virtual Interface נבחרת לרוב בטווח לא מנותב כמו 192.0.2.1 או 1.1.1.1 על מנת למנוע התנגשויות ניתוב עם הרשת הפנימית האמיתית.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 27'
  },
  {
    id: 'na_extra_12',
    domain: 'network_access',
    subtopic: 'ארכיטקטורת אלחוט',
    question: 'מהו ההבדל המרכזי במצב העבודה והתפקוד האינטלקטואלי בין נקודת גישה עצמאית (Autonomous AP) לבין נקודת גישה רזה (Lightweight AP)?',
    options: [
      'Autonomous AP מכילה באופן עצמאי את קובץ ההגדרות, סיסמאות ה-SSID ומדיניות האבטחה ומחייבת הגדרה ידנית נפרדת לכל מכשיר, בעוד Lightweight AP (LAP) מקבלת את כל הקונפיגורציה, הגדרות התעבורה והאבטחה שלה באופן ריכוזי מה-WLC (בקר האלחוט).',
      'Lightweight AP פועלת ללא זרם חשמל ומסתמכת על גלי רדיו חיצוניים.',
      'Autonomous AP מיועדת רק לחיבורי לייזר אופטיים ואסור לחבר אליה כבלי אתרנט.',
      'אין הבדל ביניהן, אלא רק בתוצרת הפורטים והחריצים הפיזיים.'
    ],
    correctAnswer: 0,
    explanation: 'נקודת גישה עצמאית (Autonomous AP) היא יחידה חכמה מלאה המבוססת על מערכת הפעלה פנימית של סיסקו (Cisco IOS) ועובדת לבד - היא דורשת ניהול ידני נפרד של כל SSID, קונפיגורציית ACL, ונושאי אבטחה (קשה לתחזק מאות נקודות כאלה). נקודת גישה רזה (Lightweight AP) היא "טיפשה" - אין לה קובץ הגדרות מקומי, אלא היא יוצרת חיבור CAPWAP מול מכשיר הניהול הראשי (WLC) וטוענת ממנו את כל המדיניות, מה שמאפשר לנהל אלפי אנטנות בארגון בשינוי הגדרה אחד בלבד.',
    hint: 'השם Autonomous אומר אוטונומי ועומד בפני עצמו, Lightweight פירושו קל משקל וצריך משקל מרכזי תומך (WLC).',
    additionalInfo: 'Lightweight APs משתמשות בארכיטקטורת Split MAC לחלוקת התפקידים מול הבקר.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 27'
  },
  {
    id: 'na_extra_13',
    domain: 'network_access',
    subtopic: 'רשתות אלחוטיות (WLAN)',
    question: 'באיזה סוג של מסגרת (Frame Type) משתמשות נקודות גישה אלחוטיות על מנת לפרסם באופן קבוע (בדרך כלל כל 100 מילי-שניות) את קיומן, שם הרשת (SSID) ורשימת של קצבי השידור הנתמכים שלהן לסביבה?',
    options: [
      'Beacon Frame (מסגרת משואה)',
      'Association Request Frame',
      'Probe ACK Frame',
      'Data Router Frame'
    ],
    correctAnswer: 0,
    explanation: 'בתקן האלחוט 802.11, נקודות גישה (APs) שולחות פריים מיוחד הנקרא Beacon Frame (בד"כ 10 פעמים בשנייה). מסגרת זו שייכת למשפחת ה-Management Frames ומכריזה על נוכחות האנטנה, השם של רשת ה-WiFi (ה-SSID), מצבי ההצפנה והתקנים הנתמכים. מחשבי וטלפוני קצה מאזינים להודעות ה-Beacon כדי להציג למשתמש את רשימת הרשתות הזמינות להתחברות.',
    hint: 'חשוב על משואה (Beacon) המפיצה אור מסביב לכל כיוון כדי לאותת שהיא קיימת.',
    additionalInfo: 'ניתן לבטל את שליחת ה-Beacon בהגדרות ה-WLC (המכונה SSID Broadcast Disable) לצרכי אבטחה קלושים, מה שיכריח משתמשים להקליד ידנית את שם הרשת כדי להתחבר.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 26'
  },
  {
    id: 'na_extra_14',
    domain: 'network_access',
    subtopic: 'רכיבי תקשורת וכבלים',
    question: 'מהו ההבדל הטכנולוגי בהספק המתקבל (Wattage) בין תקן PoE קלאסי (IEEE 802.3af) לבין תקן PoE+ המשופר (IEEE 802.3at) המופעל מממשק מתג התקשורת?',
    options: [
      'תקן PoE מספק עד 15.4W בפורט, בעוד תקן PoE+ (PoE Plus) מספק כמות כפולה של עד 30W בפורט, ומאפשר להזין טלפוני וידאו ואנטנות חזקות.',
      'תקן PoE+ פועל אך ורק מעל סיב אופטי חד-מצבי ללא שימוש זרם חשמלי.',
      'PoE מספק 220 וולט ומסכן את בריאות המשתמשים ברשת.',
      'אין הבדל בכמות ההספק אלא רק בסוגי התקעים המורכבים בקצה.'
    ],
    correctAnswer: 0,
    explanation: 'טכנולוגיית Power over Ethernet (PoE) מאפשרת למתג תקשורת (Power Sourcing Equipment - PSE) לשלוח זרם חשמלי לצד נתונים על גבי אותם גידי כבל המוחשת (UTP) לטובת מכשירים שאין לידם שקע חשמל (Powered Devices - PDs). תקן 802.3af (PoE) הישן סיפק עד 15.4 ואט בכל פורט (בפועל המכשיר מקבל כ-12.95 ואט עקב הפסדי הולכה בכבל). תקן 802.3at (PoE+) הגדיל את ההספק לעד 30 ואט (מכשיר מקבל בפועל כ-25.5 ואט), מה שחיוני למכשירים מתקדמים כמו מצלמות אבטחה מסתובבות (PTZ) ונקודות גישה אלחוטיות מהירות של 802.11ac/ax.',
    hint: 'לפלוס (+) יש תמיד הספק חשמלי מורחב וגבוה יותר (עד 30 ואט לעומת 15.4 ואט).',
    additionalInfo: 'כיום קיים גם תקן PoE++ (IEEE 802.3bt) המסוגל לספק עד 60 או 90 ואט עבור שרתים זעירים, מערכות תאורה חכמות, ומסכים גדולים.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },
  {
    id: 'na_extra_15',
    domain: 'network_access',
    subtopic: 'פרוטוקולי גילוי רשת',
    question: 'מהם ההבדלים הראשיים ותדירות שליחת ההודעות (Default Timers) בין פרוטוקול CDP הקנייני של סיסקו לפרוטוקול LLDP התעשייתי הפתוח?',
    options: [
      'CDP נשלח כל 60 שניות (Holdtime 180), בעוד LLDP (שהוא תקן פתוח IEEE 802.1AB) נשלח כברירת מחדל כל 30 שניות (Holdtime 120).',
      'LLDP נשלח רק פעם אחת ביום, ואין לו שעון Holdtime.',
      'CDP דורש רכישת רישיון מיוחד ועובד רק על ניתוב OSPF.',
      'שניהם נשלחים בדיוק כל 5 שניות ומתקשרים בצורה מוצפנת.'
    ],
    correctAnswer: 0,
    explanation: 'שני הפרוטוקולים משמשים לגלות מכשירים שכנים המחוברים ישירות ברשת (כמו לדעת איזה פורט במתג מחובר ישירות לנתב מסוים). CDP (Cisco Discovery Protocol) הוא קנייני של סיסקו ופועל ברירת מחדל כל 60 שניות עם זמן שמירה (Holdtime) של 180 שניות. LLDP (Link Layer Discovery Protocol) הוא תקן פתוח שמתקשר בין מכשירים של יצרנים שונים, ומשודר ברירת מחדל כל 30 שניות עם Holdtime של 120 שניות.',
    hint: 'CDP משדר לאט יותר (60 שניות), לעומת התקן הפתוח LLDP שמהיר פי 2 (30 שניות).',
    additionalInfo: 'הפקודות בסיסקו הן "show cdp neighbors" ו-"show lldp neighbors". במידת הצורך באבטחה, מומלץ לכבות אותם בפורטי קצה של משתמשים באמצעות הפקודה "no cdp enable".',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 11'
  },
  {
    id: 'na_extra_16',
    domain: 'network_access',
    subtopic: 'VLAN ו-Trunking אבטחה',
    question: 'איזו המלצת אבטחה קריטית של סיסקו מיועדת למנוע סיכונים של "VLAN Hopping" או התקפות "Double Tagging" בחיבורי Trunk?',
    options: [
      'להגדיר את ה-Native VLAN למספרו של VLAN שמיש ופעיל מאוד עבור משתמשי הקצה בארגון.',
      'לשלוח את כל התעבורה ללא הגדרת Trunk בכלל.',
      'להחליף את ה-Native VLAN מברירת המחדל (VLAN 1) למספר ייחודי שאינו בשימוש המשתמשים (כגון VLAN 999), לכבות את תכולת ה-DTP בפורטים (nonegotiate), ולתייג את תעבורת ה-Native VLAN במידת האפשר.',
      'לשנות את כתובות ה-IP של כל המחשבים ל-IPv6.'
    ],
    correctAnswer: 2,
    explanation: 'התקפת Double Tagging מתרחשת כאשר תוקף המחובר לפורט Access ב-VLAN 1 (שהוא ה-Native VLAN של ה-Trunk כברירת מחדל) שולח פריים המכיל שתי תגיות 802.1Q. המתג הראשון מקלף את התגית הראשונה (מכיוון שהיא שייכת ל-Native VLAN) ומעביר את הפריים ללא התגית הזו דרך ה-Trunk. המתג השני מקבל את הפריים, רואה את התגית השנייה ומשלח אותו ל-VLAN היעד (למשל VLAN 20, רשת הנהלת החשבונות). כדי למנוע זאת, יש להחליף את ה-Native VLAN לערך לא בשימוש, לכבות משא ומתן אוטומטי של DTP שעלול להקים Trunk זדוני, ולהכריח תיוג Native VLAN באמצעות הפקודה הגלובלית "vlan dot1q tag native".',
    hint: 'אל תשתמש בברירת המחדל VLAN 1 בשביל ה-Native VLAN, ושנה לערוץ מבודד ללא משתמשים.',
    additionalInfo: 'מניעת VLAN Hopping נמנה בין נושאי האבטחה החשובים של סיסקו לגישת ההתחברות הראשונית ברשת מתגים.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11'
  },
  // --- BATCH 2: IP Connectivity & IP Services ---
  {
    id: 'ic_extra_4',
    domain: 'ip_connectivity',
    subtopic: 'חישובי תת-רשת (Subnetting)',
    question: 'כמה כתובות IPv4 שמישות עבור מארחים (Host Addresses) ניתן להקצות בתוך תת-רשת בעלת מסכת רשת של /30 (למשל 10.1.1.0/30)?',
    options: [
      '2 כתובות שמישות',
      '4 כתובות שמישות',
      '6 כתובות שמישות',
      '30 כתובות שמישות'
    ],
    correctAnswer: 0,
    explanation: 'מסכה של /30 משאירה 2 ביטים עבור כתובות מארחים (32 פחות 30). מספר הכתובות הכולל הוא 2 בחזקת 2, שזה 4 כתובות. מתוכן יש להפחית 2 כתובות מיוחדות: כתובת הרשת עצמה (Host bits כולם 0) וכתובת השידור (Broadcast, Host bits כולם 1). לכן נשארות בדיוק 2 כתובות שמישות עבור כרטיסי הרשת, מה שהופך את המסכה הזו למתאימה במיוחד עבור קישורים נקודה-לנקודה (Point-to-Point Links) המקשרים ישירות בין שני נתבים.',
    hint: '2 בחזקת 2 פחות 2.',
    additionalInfo: 'בקישורים ממשקים מודרניים של סיסקו ניתן לפעמים להגדיר גם מסכת /31 המגדירה 2 כתובות ללא חיסור רשת ושידור (תקן RFC 3021), אך בחינה תמיד תתייחס ל-/30 כברירת מחדל עם 2 כתובות שמישות.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13'
  },
  {
    id: 'ic_extra_5',
    domain: 'ip_connectivity',
    subtopic: 'חישובי תת-רשת (Subnetting)',
    question: 'אם הוקצה לארגון טווח הכתובות 192.168.1.0/24 והתבקשת לחלק אותו לתת-רשתות זהות בעלות מסכת /28, כמה תת-רשתות ייקבעו בסך הכל, וכמה כתובות מארח שמישות יהיו בכל אחת מהן בהתאמה?',
    options: [
      '16 תת-רשתות, עם 14 כתובות שמישות בכל אחת מהן.',
      '8 תת-רשתות, עם 30 כתובות שמישות בכל אחת מהן.',
      '4 תת-רשתות, עם 62 כתובות שמישות בכל אחת מהן.',
      '32 תת-רשתות, עם 6 כתובות שמישות בכל אחת מהן.'
    ],
    correctAnswer: 0,
    explanation: 'מסכת הבסיס היא /24 והמסכה המבוקשת היא /28. לקחנו בהשאלה 4 ביטים מהמארח לטובת הרשת (28 פחות 24). מספר תת-הרשתות החדשות שנוצרו הוא 2 בחזקת 4, השווה ל-16. מספר הביטים שנותרו למארחים בכל רשת הוא 4 (32 פחות 28). מספר הכתובות השמישות בכל אחת מהן הוא 2 בחזקת 4 פחות 2, שזה השווה ל-14 כתובות מארחים לקליינטים.',
    hint: 'השאלה של 4 ביטים מייצרת 16 שילובי רשת, ומשאירה 4 ביטים למארחים (2 בחזקת 4 פחות 2).',
    additionalInfo: 'טווח הכתובות של תת-הרשת הראשונה יהיה 192.168.1.0 עד 192.168.1.15, כאשר הכתובות השמישות הן מ-1.1 עד 1.14.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13'
  },
  {
    id: 'ic_extra_6',
    domain: 'ip_connectivity',
    subtopic: 'חישובי תת-רשת (Subnetting)',
    question: 'עבור רשת בעלת מסכת תת-רשת של /23 (למשל 172.16.2.0/23), כמה כתובות IP שמישות ניתן להקצות למארחים בתוך הרשת?',
    options: [
      '510 כתובות שמישות',
      '254 כתובות שמישות',
      '1022 כתובות שמישות',
      '512 כתובות שמישות'
    ],
    correctAnswer: 0,
    explanation: 'מסכה של /23 משאירה 9 ביטים עבור המארחים (32 פחות 23). מספר הכתובות הכולל הוא 2 בחזקת 9, השווה ל-512 כתובות. מתוכן אנו מפחיתים 2 עבור כתובת הרשת וכתובת ה-Broadcast הכללית, ומשאירים בדיוק 510 כתובות שמישות עבור שרתי ומחשבי הקיר בארגון.',
    hint: '2 בחזקת 9 פחות 2 = 512 פחות 2.',
    additionalInfo: 'מסכת /23 משתרעת על פני שתי רשתות /24 שלמות (Supernetting). בדוגמה זו, הרשת מכילה את כל הכתובות שבין 172.16.2.0 ל-172.16.3.255.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 13'
  },
  {
    id: 'ic_extra_7',
    domain: 'ip_connectivity',
    subtopic: 'Administrative Distance (AD)',
    question: 'סדר את מקורות הניתוב הבאים מהעדיף ביותר (הערך הנמוך ביותר) לפחות עדיף (הערך הגבוה ביותר) על פי ערכי ה-Administrative Distance (AD) של סיסקו:',
    options: [
      'Connected (0) -> Static (1) -> EIGRP (90) -> OSPF (110) -> RIP (120)',
      'Static (1) -> Connected (0) -> OSPF (110) -> RIP (120) -> EIGRP (90)',
      'Connected (0) -> RIP (120) -> OSPF (110) -> EIGRP (90) -> Static (1)',
      'OSPF (110) -> EIGRP (90) -> RIP (120) -> Static (1) -> Connected (0)'
    ],
    correctAnswer: 0,
    explanation: 'ה-Administrative Distance הוא מנגנון הבחירה של נתבי סיסקו בין מספר מקורות מידע שונים (פרוטוקולים שונים) המציעים נתיב לאותו יעד מדוייק. ככל שערך ה-AD נמוך יותר, מקור המידע נחשב אמין ועדיף יותר ויורכב בטבלת הניתוב. ערכי הברירת מחדל הם: Directly Connected = 0, Static Route = 1, EIGRP summary = 5, External BGP = 20, Internal EIGRP = 90, OSPF = 110, IS-IS = 115, RIP = 120, External EIGRP = 170, Internal BGP = 200.',
    hint: 'החיבור הישיר (Connected) הוא תמיד האמין ביותר (0), ואחריו נתיב סטטי ידני (1). OSPF עדיף על RIP המיושן.',
    additionalInfo: 'הבנת ערכים אלה הכרחית לפענוח פלטים של טבלאות ניתוב (show ip route) בבחינת ה-CCNA.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 16'
  },
  {
    id: 'ic_extra_8',
    domain: 'ip_connectivity',
    subtopic: 'טבלת הניתוב ותהליך הניתוב',
    question: 'כאשר נתב מקבל חבילת מידע ומחפש התאמה בטבלת הניתוב (Routing Table), מהו חוק תעדוף הצעדים המדויק למיפוי ויציאת החבילה אל היעד?',
    options: [
      'שלב 1: התאמה הארוכה ביותר (Longest Match / Most Specific Prefix) | שלב 2: ה-AD הנמוך ביותר | שלב 3: ה-Metric הנמוך ביותר (בו זמנית באותו פרוטוקול).',
      'הנתב תמיד בוחר בנתיב הסטטי ללא קשר למסכה.',
      'הנתב מעביר את החבילה לפי ה-MAC Address הקרוב ביותר בטבלה בלבד.',
      'הנתב משלח את המנות באופן אקראי כדי לבצע חלוקת עומסים עיוורת.'
    ],
    correctAnswer: 0,
    explanation: 'חוק הניתוב הראשי והבלתי מעורער הוא Longest Prefix Match: הנתב בודק איזו רשומה בטבלת הניתוב מחזיקה במסכה הגדולה ביותר (הכי ספציפית ליעד) ובוחר בה (למשל נתיב של /28 עדיף על נתיב של /24, גם אם ל-/24 יש AD טוב יותר!). אם יש שתי רשומות המציעות את אותו אורך מסכה מדויק, הנתב משווה את ה-Administrative Distance (AD) ובוחר בפרוטוקול האמין ביותר. אם שתיהן הגיעו מאותו פרוטוקול (AD זהה), הנתב משווה את ה-Metric ובוחר בערך הנמוך ביותר.',
    hint: 'המסכה הספציפית ביותר (הארוכה ביותר בביטים של תומכי 1) תמיד מנצחת ראשונה את כולם.',
    additionalInfo: 'במצב שבו יש התאמה מלאה בכל הפרמטרים (אורך מסכה, AD ו-Metric זהים), רוב פרוטוקולי הניתוב יבצעו ECMP (Equal-Cost Multi-Pathing) ויחלקו עומסים בין שני הנתיבים.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'ic_extra_9',
    domain: 'ip_connectivity',
    subtopic: 'ניתוב סטטי',
    question: 'כיצד מגדירים נתיב סטטי צף (Floating Static Route) בנתבי סיסקו, ומהו השימוש המרכזי שלו במערך התקשורת?',
    options: [
      'הגדרת נתיב סטטי עם ערך Administrative Distance (AD) ידני שהוא גבוה יותר מערך ה-AD של פרוטוקול הניתוב הראשי (למשל מוגדר כ-125 כדי לגבות OSPF ש-AD שלו הוא 110). נתיב זה ייכנס לפעולה בטבלה רק במידה והפרוטוקול הראשי ייכשל והנתיב שלו ייעלם.',
      'זהו נתיב שמשתקף באוויר באמצעות פרוטוקול WiFi מיוחד.',
      'זהו נתיב שמיועד להגדיר חיבורים עם כתובת IP משתנה מהספק.',
      'נתיב שאינו דורש Next-Hop אלא פועל באמצעות הודעות ICMP בלבד.'
    ],
    correctAnswer: 0,
    explanation: 'נתיב סטטי צף (Floating Static Route) משמש כקישור גיבוי (Backup Link). כברירת מחדל, לנתיב סטטי יש AD של 1, מה שהופך אותו לעדיף על כל פרוטוקול ניתוב דינמי. כדי "להציף" אותו ולגרום לו לחכות ברקע מבלי להפריע לניתוב הדינמי הראשי, אנו מוסיפים בסיום פקודת ה-"ip route" ערך AD מותאם (למשל: "ip route 10.0.0.0 255.0.0.0 192.168.1.1 125"). מכיוון ש-125 גבוה מה-AD של OSPF (שהוא 110), הנתב ישתמש ב-OSPF. אם קישור ה-OSPF ייפול, הנתיב הסטטי הגיבויי ייחשף וייכנס מיידית לטבלה.',
    hint: 'הוסף מספר גבוה בסוף הפקודה כדי לדחוף את הנתיב למטה, שיצוף למעלה רק כשהראשי יטבע.',
    additionalInfo: 'דוגמה לפקודת הגדרה: "ip route 172.16.1.0 255.255.255.0 10.1.1.2 130" - המספר 130 מייצג את ה-AD המותאם.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 16'
  },
  {
    id: 'ic_extra_10',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'מדוע מחלקים רשת OSPF גדולה למספר אזורים (Multi-Area OSPF), ואיזה תפקיד מיוחד שמור לאזור המכונה "Area 0"?',
    options: [
      'כדי להקטין את גודל קובצי ה-LSDB בכל נתב, לחסוך במשאבי מעבד וזיכרון, ולמנוע מכל שינוי קטן בטופולוגיה להריץ את אלגוריתם ה-SPF בכל הרשת. Area 0 מתפקד כאזור הליבה המרכזי (Backbone Area) שכל שאר האזורים חייבים להתחבר אליו פיזית או לוגית.',
      'כדי לאפשר לנתבים לדבר בפרוטוקול RIP במקביל ללא צורך בהמרת כתובות.',
      'מפני ש-OSPF אינו מסוגל לנתב יותר מ-10 נתבים בתוך אזור בודד.',
      'אזור 0 מיועד אך ורק למנוע כניסה של כתובות IPv6 לרשת הליבה.'
    ],
    correctAnswer: 0,
    explanation: 'ברשת OSPF בעלת אזור יחיד (Single-Area), כל הנתבים מחזיקים בבסיס נתונים לוגי זהה (LSDB) וכל שינוי (כמו ממשק שנכבה) מאלץ את כולם להפעיל מחדש את אלגוריתם ה-Dijkstra (SPF) המכביד על המעבד. חלוקה לאזורים (Multi-Area OSPF) תוחמת את הודעות ה-LSDB בתוך האזור ומאפשרת לבצע סיכומי נתיבים בגבולות האזור. חובה שכל האזורים האחרים יהיו מחוברים ישירות לאזור הליבה הראשי - Area 0 (הנקרא Backbone), המרכז והמנתב את התעבורה הבין-אזורית.',
    hint: 'אזור 0 הוא עמוד השדרה (Backbone) המחבר את כולם יחדיו; חלוקה לאזורים מונעת שיטפונות של שינויי טופולוגיה.',
    additionalInfo: 'נתב המקשר בין אזור רגיל לאזור 0 קרוי ABR (Area Border Router) והוא זה שמייצר את הודעות ה-LSA מסוג Type 3 (Summary LSA).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 19'
  },
  {
    id: 'ic_extra_11',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'אילו מבין הערכים הבאים חייבים להתאים באופן הדדי ומדויק בין שני נתבי סיסקו שכנים על מנת שהם יצליחו להקים יחסי שכנות OSPF (OSPF Neighbor Adjacency)?',
    options: [
      'הגדרות ה-Hello Timer ו-Dead Timer, מספר האזור (Area ID), מסכת הרשת (Subnet Mask במערכות Ethernet מקושרות), והגדרות האימות (Authentication) והודעת ה-MTU.',
      'שם המכשיר (Hostname) והגרסה של מערכת ההפעלה Cisco IOS.',
      'ה-Router ID שלהם חייב להיות זהה.',
      'סוג כבל הרשת הפיזי המחבר ביניהם (חייב להיות סיב אופטי בלבד).'
    ],
    correctAnswer: 0,
    explanation: 'כדי ששני נתבים יהיו שכנים (Adjacency), הודעות ה-Hello שלהם המוחלפות בשכבת ה-Link Local חייבות להסכים על פרמטרים עיקריים תואמים: 1) Hello ו-Dead Intervals (ברירת מחדל ב-Ethernet היא 10 ו-40 שניות). 2) Area ID - שניהם משתייכים לאותו אזור באותו מקטע. 3) מסכת רשת תואמת (Subnet/Mask). 4) Authentication password במידה והופעל אבטחה. 5) MTU תואם בשלב ה-Exchange ימנע תקיעה. אם יש חוסר התאמה באחד מאלה, יחסי השכנות לא יוקמו.',
    hint: 'טיימרים, חוקי אזור ומסכות תת רשת חייבים להיות מתואמים כמו תהליך לחיצת יד.',
    additionalInfo: 'חוסר התאמה בטיימרים (Hello/Dead Mismatch) הוא אחד הגורמים הנפוצים ביותר לשגיאות OSPF בבחינה שמוביל למצב "Neighbor state" שתקוע ב-Down or Init.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_12',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'במהלך בחירת הנתב הראשי (DR - Designated Router) ונתב הגיבוי (BDR) ברשת OSPF מבוססת Multi-access (כגון Ethernet), מהם קריטריוני הבחירה וסדר העדיפויות שלהם?',
    options: [
      'שלב 1: עדיפות הממשק הגבוהה ביותר (OSPF Interface Priority, ברירת מחדל היא 1) | שלב 2: ה-Router ID הגבוה ביותר (הנקבע על פי כתובת ה-Loopback הפעילה הגבוהה ביותר, ואם אין - ה-IP הפיזי הפעיל הגבוה ביותר).',
      'הנתב עם מספר הפורטים הפיזיים הרבים ביותר נבחר אוטומטית ל-DR.',
      'הבחירה מתבצעת בצורה אקראית לחלוטין בכל 60 שניות כדי לחסוך משאבים.',
      'הנתב שהוגדר עליו ה-Administrative Distance (AD) הנמוך ביותר מנצח.'
    ],
    correctAnswer: 0,
    explanation: 'ברשתות המשותפות (Multi-access), OSPF בוחר DR ו-BDR כדי למנוע יחסים מרובים של (n*(n-1)/2 Connection floods) בין כל הנתבים. תהליך הבחירה עובד כך: הנתב עם ה-Interface Priority הגבוה ביותר נבחר ל-DR (ניתן להגדיר ידנית מ-0 עד 255. ערך 0 מבטל את האפשרות של הנתב להיבחר). אם יש שוויון, הנתב בעל ה-Router ID (RID) הגבוה ביותר נבחר. ה-RID נקבע על פי פקודת "router-id" ידנית, אם לא הוגדר - ה-IP של ממשק ה-Loopback הפעיל הגבוה ביותר, ואם אין - ה-IP הפיזי הראשי הפעיל הגבוה ביותר במערכת.',
    hint: 'קודם כל Priority (ראשוניות עדיפות הפורט), ולאחר מכן ה-Router ID המשמש כמזהה ייחודי של הנתב.',
    additionalInfo: 'תהליך בחירת DR/BDR הוא Non-preemptive. כלומר, אם נתב חדש וחזק יותר מחובר לרשת לאחר שכבר נבחרו DR ו-BDR, הוא לא יחליף אותם עד שתהליך ה-OSPF יופעל מחדש (clear ip ospf process).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_13',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'כיצד תהליך העבודה של OSPF משתנה כאשר הממשק מוגדר תחת סוג רשת נקודה-לנקודה (OSPF Point-to-Point Network Type)?',
    options: [
      'בחיבור Point-to-Point אין צורך בבחירת נתבי DR ו-BDR, והנתבים יוצרים שכנות מלאה (Full Adjacency) ישירות ביניהם ללא דחיית הודעות.',
      'בקישור כזה מבוטל ה-Area 0 והנתב עובר לעבוד ב-RIP.',
      'חיבור כזה מגביל את מהירות הפורט ל-10 Mbps בלבד.',
      'הנתבים מחייבים שימוש בכתובת IPv6 בלבד ללא תגית.'
    ],
    correctAnswer: 0,
    explanation: 'כאשר OSPF מופעל על גבי ממשקים המוגדרים כ-Point-to-Point (כגון חיבורי Serial או ממשקי כבל אתרנט שהוגדרו ידנית עם "ip ospf network point-to-point"), הנתבים מבינים שיש רק שני מכשירים על הקו ואין אפשרות למכשירי קצה נוספים להצטרף. מסיבה זו, הפרוטוקול מדלג על שלב בחירת ה-DR/BDR המיותר, מה שמאיץ פלאים את זמן ההתכנסות (Convergence) של המערכת.',
    hint: 'בחיבור ישיר בין שני נתבים בלבד (נקודה לנקודה), אין שום צורך לבחור נציגים או מנהלי רשת (DR/BDR).',
    additionalInfo: 'זהו שיפור ביצועים מומלץ עבור סביבות וירטואליות או חיבורי DMVPN ו-Tunnels.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_14',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'בעת תצורת OSPF, מהי ההשפעה המדויקת של הפעלת הפקודה "passive-interface <interface_name>" בתוך תפריט הגדרות הפרוטוקול?',
    options: [
      'הנתב מפסיק לשלוח ולקבל הודעות Hello בממשק זה, ולכן לא ייקבעו יחסי שכנות OSPF דרכו; עם זאת, טווח רשת ה-IP של ממשק זה עדיין ימשיך להיות מפורסם (Advertised) לשאר הנתבים ברשת.',
      'הממשק נכבה פיזית לחלוטין (Shutdown).',
      'הממשק מופעל מחדש ומשמש להגדרת SSH מאובטח בלבד.',
      'הממשק הופך לעבוד במצב שכבה 2 בלבד ואינו מקבל IPv4.'
    ],
    correctAnswer: 0,
    explanation: 'הפקודה "passive-interface" היא הגדרת אופטימיזציה ואבטחה מצוינת. כאשר הנתב מוגדר כ-Passive בממשק מסוים (למשל פורט המחובר ל-VLAN של משתמשי הקצה), הוא מפסיק לשדר משם הודעות Hello (מה שמונע ממשתמשים זדוניים להקים שכנות OSPF פיראטית ולשבש את הניתוב) וחוסך רוחב פס. אך מכיוון שהרשת עצמה הוגדרה ב-OSPF, הנתב ממשיך לפרסם את קיומה לשאר הנתבים ברשת הליבה.',
    hint: 'פאסיבי פירושו שאינו יוזם או מאזין לשיחות OSPF בממשק, אך עדיין מדווח לאחרים שהוא מחזיק את הרשת הזו אצלו ברקע.',
    additionalInfo: 'בפיוס נפוץ להגדיר "passive-interface default" המכבה OSPF בכל הממשקים, ואז להפעיל ספציפית ממשקי ליבה באמצעות "no passive-interface <interface>".',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_15',
    domain: 'ip_connectivity',
    subtopic: 'נתיבי ברירת מחדל (Default Route)',
    question: 'מהו הייצוג והייעוד המדויק של נתיב ברירת המחדל (Gateway of Last Resort) בגרסת IPv4 בטבלת הניתוב של סיסקו?',
    options: [
      'S* 0.0.0.0/0 [1/0] via <ip_address> | הוא משמש כנתיב הצלה אחרון לחבילות מידע שכתובת היעד שלהן אינה מופיעה באף אחת מהרשומות האחרות בטבלת הניתוב.',
      'S* 255.255.255.255/32 via 127.0.0.1 | משמש לשליחת שידורים מקומיים.',
      'O 224.0.0.5/32 | משמש לניהול מנות ה-Active של HSRP.',
      'C 192.168.1.0/24 | מיועד לסימון רשתות המחוברות למחשב המשתמש.'
    ],
    correctAnswer: 0,
    explanation: 'נתיב ברירת מחדל (Default Route) מיוצג במטריצה של 0.0.0.0 עם מסכת רשת של 0.0.0.0 (או 0.0.0.0/0). האות S מסמלת שהנתיב מוגדר ידנית (Static Route), והכוכב (*) מסמן שמדובר בבחירת Candidate default. נתיב זה משמש את הנתב בכל פעם שאין לו התאמה ספציפית לרגל היעד בטבלת הניתוב שלו - אז הוא ישלח את המנה לנתיב ברירת המחדל (לרוב החוצה לכיוון נתב ה-ISP של ספק האינטרנט).',
    hint: 'אפסים בכתובת ומסכה (0.0.0.0/0) מסמלים "כל רשת שהיא באשר תהיה".',
    additionalInfo: 'בנתבי סיסקו, הפקודה להפצת נתיב ברירת מחדל בתוך OSPF היא "default-information originate" תחת הגדרות ה-OSPF, בתנאי שלנתב עצמו כבר יש נתיב כזה.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'ic_extra_16',
    domain: 'ip_connectivity',
    subtopic: 'טבלת הניתוב ותהליך הניתוב',
    question: 'בפלט פקודת הצגת טבלת הניתוב "show ip route" בסיסקו, מה מייצג קוד המיוצג באות "O" לעומת קוד המיוצג באות "C"?',
    options: [
      'האות "O" מייצגת נתיב שנלמד דינמית דרך פרוטוקול OSPF, בעוד האות "C" מייצגת רשת שמחוברת פיזית וישירות לממשק של הנתב (Directly Connected).',
      'האות "O" מייצגת נתיב מוצפן (Obfuscated) והאות "C" מייצגת קשר כבל מוצלב (Crossover).',
      'האות "O" היא רשת זמנית בלבד וה-C היא רשת קבועה בקונפיגורציה.',
      'שתי האותיות מסמלות אותן פעולות וניתן להשתמש בהן לסירוגין.'
    ],
    correctAnswer: 0,
    explanation: 'בטבלת הניתוב של Cisco IOS קיימים מזהי אותיות (Source Codes) המציינים כיצד נוצר הנתיב: C = Connected (רשת המחוברת ישירות לממשק לוגי או פיזי), L = Local (כתובת ה-IP המדויקת של הממשק עצמו עם מסכת /32), S = Static (נתיב ידני שהוגדר על ידי מנהל הרשת), R = RIP, D = EIGRP (מכיוון שהאות E שמורה ל-Exterior Gateway Protocol, נבחרה האות D על שם אלגוריתם DUAL), O = OSPF.',
    hint: 'הקשר של O הוא OSPF (קל מאוד לזכור), וה-C הוא Connected (מחובר ישירות).',
    additionalInfo: 'קודים נוספים חשובים בבחינה הם: i = IS-IS, B = BGP, וסימן פלוס או אותיות משולבות כגון IA מסמלות OSPF inter area.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'ic_extra_17',
    domain: 'ip_connectivity',
    subtopic: 'טבלת הניתוב ותהליך הניתוב',
    question: 'מהו נתיב מארח (Host Route) בטבלת הניתוב של סיסקו, וכיצד הוא מיוצג במסכת הכתובת בגרסאות IPv4 ו-IPv6 בהתאמה?',
    options: [
      'זהו נתיב המפנה לכתובת IP בודדת וספציפית ומיוצג על ידי מסכת /32 ב-IPv4 ו-/128 ב-IPv6.',
      'זהו נתיב שיוצר תקשורת רק עם מחשבי קצה מורשים ומיוצג על ידי /24.',
      'זהו ה-Default Gateway של הארגון המיוצג על ידי 0.0.0.0/0.',
      'הגדרה שפועלת רק מעל קירובי Layer 2 של מתגים וירטואליים.'
    ],
    correctAnswer: 0,
    explanation: 'נתיב מארח (Host Route) הוא נתיב המייצג מכשיר יחיד ומוגדר ברשת (ולא קבוצת רשתות). בגלל שמדובר בכתובת ספציפית אחת, המסכה שלו דורשת שימוש בכל הביטים הקיימים: ב-IPv4 זו תהיה מסכה של 255.255.255.255 (המיוצגת כ-/32), וב-IPv6 זו תהיה מסכה של /128. נתיבים אלו נוצרים אוטומטית כ-Local (L) כאשר מגדירים IP בממשקי הנתב, או שניתן לכתוב אותם ידנית כדי לנתב תנועה של שרת מסוים בלבד נתיב חלופי.',
    hint: 'מארח יחיד דורש מסכה מקסימלית שתופסת את כל הביטים: 32 ב-IPv4 או 128 ב-IPv6.',
    additionalInfo: 'נתיבי Host Route תמיד ינצחו בכל הליך ניתוב עקב חוק ההתאמה הארוכה ביותר (Longest Match).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 15'
  },
  {
    id: 'ic_extra_18',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF',
    question: 'מהו ההבדל הארכיטקטוני המרכזי בין גרסת OSPFv2 לגרסת OSPFv3 במערכות תקשורת?',
    options: [
      'OSPFv2 פותח עבור רשתות IPv4, בעוד OSPFv3 פותח ותומך באופן ילידי בניתוב רשתות IPv6.',
      'OSPFv3 מיועד אך ורק לחיבור פקסים ומערכות מיושנות.',
      'OSPFv2 עובד מעל שכבה 4 של TCP וOSPFv3 עובד מעל UDP בלבד.',
      'אין הבדל ביניהם ושניהם פותחו באותה שנה עם אותם חוקי LSA בדיוק.'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול OSPFv2 מיועד לניתוב חבילות IPv4 בלבד. כדי לתמוך ב-IPv6 פותח פרוטוקול OSPFv3 (תקן RFC 5340). ב-OSPFv3, הניתוב מבוסס על קישורים (Links) ולא על תתי-רשתות (Subnets), ומרבית ההודעות מועברות על גבי כתובות Link-Local IPv6 (כמו fe80::). תת-גרסה מודרנית של OSPFv3 תומכת כיום גם בכתובות IPv4 וגם ב-IPv6 באמצעות תכונת Address Families.',
    hint: 'זכור: גרסה 2 מיועדת לעולם ה-IPv4 המקורי, גרסה 3 מביאה איתה את בשורת ה-IPv6.',
    additionalInfo: 'ב-OSPFv3, הנתב עדיין משתמש ב-Router ID בעל פורמט עיצובי של כתובת IPv4 באורך 32 סיביות (למשל 1.1.1.1) לצורך תאימות לאחור, וזהו ערך שיש להגדיר ידנית אם בנתב מופעל IPv6 בלבד.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22'
  },
  {
    id: 'is_extra_3',
    domain: 'ip_services',
    subtopic: 'שירות NTP',
    question: 'בשירות סנכרון שעוני הרשת (NTP), מה מייצגת דרגת ה-Stratum המצורפת למידע המכשירים?',
    options: [
      'זהו ערך מספרי (מ-0 עד 15) המציין את מרחק המכשיר ממקור הזמן הפיזי המדויק ביותר (כגון שעון אטומי או GPS). ככל שמספר ה-Stratum נמוך יותר, השעון נחשב ליותר מדויק ואמין.',
      'זהו דרגת אבטחה של הצפנת סיסמאות הנתבים.',
      'זהו מספר הפורט של שרת ה-NTP המשודר ברשת.',
      'זהו כמות הימים שנותרו לקובץ הרישיון של המכשיר.'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול NTP (Network Time Protocol) פועל בצורה היררכית לתיאום זמנים מדויק ברשת המונע תקלות רישום (Logs). דרגת הדיוק נקראת Stratum: Stratum 0 הוא מקור הזמן עצמו (כגון שעון אטומי פיזי, שעון צזיום או לוויין GPS. מכשירים אלו אינם מחוברים ישירות לרשת). Stratum 1 מחזיק במכשיר תקשורת המחובר ישירות לשעון ה-Stratum 0. Stratum 2 מחזיק בשרת שמסנכרן את עצמו מול שרת Stratum 1, וכך הלאה. המספר המקסימלי התקין הוא 15. ערך Stratum של 16 מייצג מכשיר שלא מסונכרן בכלל (Unsynchronized).',
    hint: 'Stratum הוא מדד המרחק ממקור הזמן: ככל שהמספר קרוב ל-1, הזמן אמין ומדויק יותר.',
    additionalInfo: 'NTP פועל מעל שכבת ה-Transport באמצעות פרוטוקול UDP בפורט 123.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 3'
  },
  {
    id: 'is_extra_4',
    domain: 'ip_services',
    subtopic: 'שרתי DHCP ו-Relay',
    question: 'כיצד מסייעת פקודת הנתב "ip helper-address <ip_address>" למחשבי קצה לקבל כתובת IP כאשר שרת ה-DHCP של הארגון ממוקם בתת-רשת מרוחקת ומעבר לנתבים הפיזיים?',
    options: [
      'היא הופכת את הנתב ל-DHCP Relay Agent המאזין להודעות ה-DHCP Broadcast של הלקוחות, ממיר אותן להודעות Unicast ממוקדות, ומשלח אותן ישירות אל כתובת שרת ה-DHCP המרוחק.',
      'היא מוחקת את הצורך בשרת DHCP ומייצרת כתובות אקראיות מקומיות.',
      'היא מאפשרת העברת כתובות IP אלחוטיות בלבד ללא שימוש בכבלי תקשורת.',
      'היא מפעילה את פרוטוקול ה-DNS ומקשרת אוקטט של שרת הדומיין.'
    ],
    correctAnswer: 0,
    explanation: 'כרטיס רשת שמבקש כתובת IP משתמש בהודעת שידור (DHCP Discover - Broadcast) שחוסמת אותה שכבת הנתבים (נתב אינו מעביר הודעות Broadcast כברירת מחדל). כדי לפתור זאת, אנו נכנסים לממשק המקומי של הנתב המשמש כשער ברירת המחדל של המשתמשים ומגדירים "ip helper-address 10.10.10.5" (כתובת שרת ה-DHCP). הנתב הופך למתווך (DHCP Relay Agent): הוא מפרק את ה-Broadcast, הופך אותו ל-Unicast הממוען אל השרת 10.10.10.5, ושולח אותו דרך טבלת הניתוב הרגילה.',
    hint: "עוזר הכתובת (Helper) משמש כרץ שליח הלוקח הודעת צעקה ציבורית והופך אותה למכתב רשמי ישירות לשרת השירות.",
    additionalInfo: 'כאשר השרת מחזיר תשובה (DHCP Offer), הנתב מחזיר אותה למקטע הלקוחות המקומי ככתובת המיועדת להקצאה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 3'
  },
  {
    id: 'is_extra_5',
    domain: 'ip_services',
    subtopic: 'שירות SNMP',
    question: 'מהו ההבדל הביטחוני הקריטי בין גרסת SNMPv2c לגרסת SNMPv3 המשמשת לניטור וניהול רשתות תקשורת?',
    options: [
      'SNMPv2c מסתמכת על סיסמת טקסט פשוט חלשה המכונה Community String המועברת באופן חשוף ברשת, בעוד SNMPv3 מציעה אבטחה מקיפה הכוללת הצפנת נתונים (Privacy/Encryption כגון AES) ואימות משתמשים (Authentication כגון SHA/MD5).',
      'SNMPv3 פועלת על בסיס חיבור הנתבים ישירות לרשת האינטרנט ללא חומת אש.',
      'SNMPv2c מיועדת לרשתות אלחוטיות בלבד וv3 מיועדת לקווים סיביים.',
      'אין הבדל ממשי אלא בכמות הפורטים הפיזיים הנתמכים בבקר הראשי.'
    ],
    correctAnswer: 0,
    explanation: 'שירות SNMP (Simple Network Management Protocol) מאפשר לתחנת ניהול (NMS) לקרוא נתונים ולנטר מכשירי רשת. גרסאות SNMPv1 ו-SNMPv2c אינן מאובטחות: הן משתמשות בסיסמה קבועה בשם Community String המועברת ברשת כטקסט פשוט וניתנת לחטיפה קלה (Sniffing). SNMPv3 שכתב את נושא האבטחה ומגדיר שלושה מודלים: 1) noAuthNoPriv - ללא אימות וללא הצפנה. 2) authNoPriv - יש אימות חזק, אין הצפנה. 3) authPriv (מומלץ) - קיום אימות (Authentication) והצפנת המידע (Privacy) באופן מלא המונע ציתות לנתונים.',
    hint: 'גרסה 3 היא היחידה שמביאה הגנה אמיתית, אימות והצפנה (AES/SHA) לתנועת בקרי הניהול.',
    additionalInfo: 'SNMP משתמש כברירת מחדל בפורט UDP 161 (עבור קריאה/כתיבה) ובפורט UDP 162 (עבור קבלת הודעות התראה מסוג Traps/Informs).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6'
  },
  {
    id: 'is_extra_6',
    domain: 'ip_services',
    subtopic: 'שירות SNMP',
    question: 'מהו ההבדל המעשי במערך הודעות SNMP בין הודעה המוגדרת כ-Trap לבין הודעה המוגדרת כ-Inform?',
    options: [
      'הודעת Trap מעבירה הודעה לא מבוקרת (Unacknowledged) ללא אישור קבלה מתחנת הניהול, בעוד הודעת Inform מחייבת את תחנת הניהול להחזיר הודעת אישור קבלה (Acknowledgment). במידה והאישור לא מגיע, מכשיר הרשת ישלח את ה-Inform מחדש.',
      'הודעת Trap מוחקת את קובץ ה-Running Configuration של השרת.',
      'הודעות Trap משודרות אל הלקוחות והודעות Inform משודרות רק לנתב הליבה.',
      'אין הבדל תכנותי ושתי ההודעות משתמשות בפרוטוקול TCP.'
    ],
    correctAnswer: 0,
    explanation: 'שירות הניטור כולל שני סוגי הודעות מיוזמות-מכשיר (Agent-initiated events): הודעת Trap היא הודעה פשוטה מבוססת UDP - כאשר רכיב נכשל (למשל ספק כח נשרף) הנתב שולח הודעה ל-NMS וממשיך בעבודה מבלי לוודא שההודעה אכן הגיעה. הודעת Inform (שהתווספה ב-SNMPv2) היא הודעה אמינה - המכשיר שומר עליה בזיכרון עד לקבלת אישור מה-NMS. היא צורכת יותר משאבי רשת ומעבד בנתב, אך מבטיחה שהתרעות קריטיות לא ייאבדו בדרך.',
    hint: 'הודעות Inform הן הודעות Trap חכמות המבקשות בחזרה קבלת אישור רשמי.',
    additionalInfo: 'חוסר קבלת אישור חוזר של Inform יוביל לשליחה חוזרת (Retries) עד להגעה לתקרת סף שנקבעה מראש.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6'
  },
  {
    id: 'is_extra_7',
    domain: 'ip_services',
    subtopic: 'הודעות רישום (Syslog)',
    question: 'באיזה סוג של דרגת חומרה (Syslog Severity Level Number) מסווגת שגיאה קריטית של מערכת ההפעלה המיוצגת כמספר 3 (למשל מונח %LINK-3-UPDOWN)?',
    options: [
      'דרגת Error (שגיאה)',
      'דרגת Emergency (חירום מקסימלי, דרגה 0)',
      'דרגת Debugging (ניקוי שגיאות, דרגה 7)',
      'דרגת Warning (אזהרה פשוטה, דרגה 4)'
    ],
    correctAnswer: 0,
    explanation: 'מערכת סיסקו מחלקת את כל אירועי הרישום (Syslog Messages) ל-8 דרגות חומרה קבועות המיוצגות במספרים 0 עד 7: 0 = Emergency, 1 = Alert, 2 = Critical, 3 = Error, 4 = Warning, 5 = Notification, 6 = Informational, 7 = Debugging. (ניתן לזכור עם המנמוניקה: "Every Awesome Cisco Engineer Will Need Some Drugs/Ice"). דרגה 3 מייצגת מקרה מסוג Error שמשמעו תקלה תפעולית חמורה כגון ממשק רשת שירד לפתע או בעיית חומרה זמנית.',
    hint: 'המספר 3 הוא בדיוק דרגת ה-Error (שגיאות הפעלה המשבשות את הקישור).',
    additionalInfo: 'כשמגדירים לשרת syslog לשמור הודעות בדרגה מסוימת (למשל Level 4 - Warning), השרת ישמור את כל ההודעות מדרגה 4 ומטה (0, 1, 2, 3 וכמובן 4).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6'
  },
  {
    id: 'is_extra_8',
    domain: 'ip_services',
    subtopic: 'הודעות רישום (Syslog)',
    question: 'איזה שדה בפורמט הודעת ה-Syslog של סיסקו מסמן את הרכיב או תת-המערכת התוכנתית שיצרה את ההודעה (למשל האותיות SYS, OSPF, SEC או LINEPROTO)?',
    options: [
      'שדה ה-Facility (מתקן / תת-מערכת)',
      'שדה ה-Severity (חומרת המקרה)',
      'שדה ה-Mnemonic (קיצור תמציתי של המקרה)',
      'שדה ה-Timestamp (רישום שעה)'
    ],
    correctAnswer: 0,
    explanation: 'פורמט הודעת Syslog בסיסקו מורכב כך: %FACILITY-SEVERITY-MNEMONIC: Description. שדה ה-Facility מייצג את מחלקת החומרה או פרוטוקול התוכנה ב-IOS שהפיקו את ההתראה (למשל LINK מעיד על כבלי וממשקי תקשורת, OSPF על פרוטוקול הניתוב, ו-SEC על ענייני אבטחת מידע ואישורי כניסה).',
    hint: 'זהו השם של הרכיב או המערכת המופיע מיד לאחר סימן האחוז (%) בהודעה.',
    additionalInfo: 'רישום של הודעת syslog לדוגמה: "%LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up" - כאן ה-Facility הוא LINEPROTO, וה-Severity הוא 5 (Notification).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6'
  },
  {
    id: 'is_extra_9',
    domain: 'ip_services',
    subtopic: 'שרתי DHCP ו-Relay',
    question: 'סדר את ארבעת שלבי שינוע ההודעות בתהליך קבלת כתובת IP אוטומטית (DHCP DORA Process) לפי סדר התרחשותם הרשמי מההתחלה לסיום:',
    options: [
      'Discover (Client) -> Offer (Server) -> Request (Client) -> Acknowledgment (Server)',
      'Offer (Server) -> Discover (Client) -> Acknowledgment (Server) -> Request (Client)',
      'Discover (Client) -> Request (Client) -> Offer (Server) -> Acknowledgment (Server)',
      'Request (Client) -> Offer (Server) -> Discover (Client) -> Acknowledgment (Server)'
    ],
    correctAnswer: 0,
    explanation: 'תהליך קבלת הכתובת פועל כך: 1) Discover (מבוסס Broadcast מהלקוח) - המחשב מחפש שרתי DHCP ברשת. 2) Offer (מבוסס Unicast/Broadcast מהשרת) - השרת מציע הצעה של כתובת IP זמינה. 3) Request (Broadcast מהלקוח) - הלקוח מאשר שהוא בוחר בהצעה זו ומבקש לשריין אותה רשמית. 4) Acknowledgment (שרת) - השרת רושם את הכתובת בטבלת השריינים ומחזיר אישור סופי וקבוע המכיל גם את ה-Lease Time והגדרות ה-Gateway וה-DNS.',
    hint: 'זכור את השם המפורסם: DORA (D-Discover, O-Offer, R-Request, A-Acknowledgment).',
    additionalInfo: 'קיומו של DHCP Snooping מאפשר למתגים לאשר הודעות "Offer" ו-"Acknowledgment" רק מפורטים המוגדרים כ-Trusted Ports המחוברים לשרת ה-DHCP האמיתי.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 3'
  },
  {
    id: 'is_extra_10',
    domain: 'ip_services',
    subtopic: 'NAT הגדרות ומושגים',
    question: 'מהי המשמעות המעשית של תצורת תרגום כתובות הידועה כ-NAT Overload או PAT (Port Address Translation) בארגונים?',
    options: [
      'היא מאפשרת למאות מחשבים בעלי כתובות IP פרטיות פנימיות לחלוק כתובת IP ציבורית אחת בודדת (או בריכת כתובות קטנה), על ידי הקצאת מספר פורט מקור (Source Port Number) ייחודי בשכבה 4 עבור החיבור של כל מחשב.',
      'היא משמשת אך ורק להאיץ את רוחב הפס של הממשקים.',
      'היא מעבירה את כל הנתבים לפעול אך ורק דרך מערכת הלוויין ללא כרטיסים.',
      'היא מיועדת להצפין את כל הודעות ה-Syslog של מתגי הליבה.'
    ],
    correctAnswer: 0,
    explanation: 'מכיוון שכתובות IPv4 נמצאות במחסור תמידי, רוב הארגונים אינם משתמשים ב-Static NAT (מיפוי אחד לאחד של כתובת פרטית מול ציבורית). הם משתמשים ב-PAT (Port Address Translation) הידוע ב-Cisco IOS כ-NAT Overload. במנגנון זה, הנתב לוקח את המנות הפנימיות, משנה את כתובת המקור ל-IP הציבורי הבודד שברשותו, ורושם בטבלת ה-NAT שלו את מספר הפורט הייחודי (שכבה 4) עבור כל שיחה, וכך הוא יודע להחזיר את מנות המידע המדויקות למחשב הנכון ברשת הפנימית.',
    hint: 'העמסת פורטים (Port address) המאפשרת למכשירים רבים להשתמש באותו ה-IP הציבורי בו-זמנית.',
    additionalInfo: 'הפקודה להגדרה כוללת את מילת המפתח בסופה: "ip nat inside source list 1 interface GigabitEthernet0/0 overload".',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 5'
  },
  {
    id: 'is_extra_11',
    domain: 'ip_services',
    subtopic: 'פרוטוקולי FHRP',
    question: 'בפרוטוקול HSRP, כיצד נקבע מי יהיה הנתב הפעיל (Active Router) המעביר בפועל את תנועת הלקוחות, ומי יהיה נתב הגיבוי (Standby Router)?',
    options: [
      'הנתב בעל ערך ה-Priority הגבוה ביותר בקבוצה מוגדר כ-Active (ברירת המחדל היא 100). במידה ויש שוויון ב-Priority, הנתב בעל כתובת ה-IP האמיתית הגבוהה ביותר באותו ממשק מנצח.',
      'נתב הגיבוי נבחר על פי משקל המעבד הפנוי שלו בכל שנייה.',
      'הלקוחות עצמם בוחרים את הנתב באופן אקראי על סמך פרוטוקול RIPv2.',
      'הנתב שהתחבר ראשון פיזית לרשת האינטרנט ללא חומת אש.'
    ],
    correctAnswer: 0,
    explanation: 'HSRP (Hot Standby Router Protocol) קובע את הנתבים על בסיס Priority (עדיפות). הערך הדיפולטיבי הוא 100 (ניתן להגדיר מ-0 עד 255). נתב עם העדיפות הגבוהה ביותר הופך ל-Active. במידת שיוויון, ה-IP הגבוה ביותר בממשק המשותף משמש כשובר שיוויון. הפרוטוקול אינו מעביר תעבורה לנתב החדש באופן אוטומטי אם הראשי הקיים כבר פעיל (Non-preemptive), אלא אם כן נגדיר ידנית את תכונת ה-Preemption ("standby <group> preempt").',
    hint: 'עדיפות (Priority) היא המדד הראשי, ובמידת שיוויון - כתובת ה-IP הפיזית הגבוהה ביותר בממשק חותמת את הבחירה.',
    additionalInfo: 'HSRP משתמש בכתובת המולטיקאסט 224.0.0.2 ב-v1 (UDP port 1985) או ב-224.0.0.102 ב-v2 לצורך שליחת הודעות Hello (בכל 3 שניות כברירת מחדל).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 4'
  },
  {
    id: 'is_extra_12',
    domain: 'ip_services',
    subtopic: 'איכות שירות (QoS)',
    question: 'מהו ההבדל המהותי בתפעול ובארכיטקטורה היסודית של מודל ה-IntServ (Integrated Services) לעומת מודל ה-DiffServ (Differentiated Services) בניהול איכות שירות ברשת?',
    options: [
      'IntServ מבוסס על שריון משאבים קשיח מקצה לקצה מראש עבור כל שיחה (באמצעות פרוטוקול RSVP), דבר שמגביל את יכולת הגדילה (Scalability). DiffServ מבוסס על סיווג לוגי משמר של כל מנה בנפרד (Hop-by-Hop classification and marking) ומאפשר פתרון גמיש וגדיל בהרבה.',
      'IntServ מיועד לעבודה על גבי סיבים אופטיים בלבד, וDiffServ מיועד לרדיו אלחוטי בלבד.',
      'DiffServ מבטל לחלוטין את הצורך ברוחב פס מוגדר בנתב ופועל ללא פיקוח.',
      'אין הבדל ביניהם ויצרנים ממליצים להפעיל את שניהם בו זמנית.'
    ],
    correctAnswer: 0,
    explanation: 'בעולם ה-QoS קיימים שני מודלים מרכזיים להעברת תיעדוף: 1) IntServ - שומר מראש רוחב פס קבוע לכל אורך הדרך (כמו רכבת פרטית המזמינה את עצמה למסלול). הוא אינו גדל טוב (Not Scalable) מכיוון שכל נתב בדרך צריך לשמור ולעקוב אחר המצב של מאות אלפי שיחות. 2) DiffServ (השולט ברשתות כיום) - אינו משריין דבר מראש. הנתבים מסווגים ומסמנים כל מנה נפרדת (למשל בכותרת ה-IP באמצעות שדה DSCP). כך, כל נתב שמקבל את המנה מחליט באיזה תור (Queue) לשים אותה על סמך הסימון בלבד, ללא צורך לשמור בזיכרון את מצב שיבת השיחה.',
    hint: 'שריון קבוע (Int-Serv, אינטגרטיבי) מול הבחנה דינמית וגמישה בכל צומת בנפרד (Diff-Serv, דיפרנציאלי).',
    additionalInfo: 'DiffServ משתמש בשדה ה-ToS (Type of Service) של IPv4 המכיל 8 ביטים, מתוכם 6 ביטים עבור DSCP הנותן 64 סיווגי תיעדוף שונים.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 13'
  },
  // --- BATCH 3: Security Fundamentals & Automation and Programmability ---
  {
    id: 'sec_extra_2',
    domain: 'security_fundamentals',
    subtopic: 'אבטחה אלחוטית',
    question: 'מהו השיפור האבטחתי המרכזי והפרוטוקול המיושם בתקן WPA3 בהשוואה ל-WPA2 בגרסה הביתית (WPA-Personal)?',
    options: [
      'שימוש בפרוטוקול לחיצת יד של שילוב שוויוני בו-זמני (SAE - Simultaneous Authentication of Equals) המחליף את פרוטוקול ה-WPA2 Pre-Shared Key (PSK), ובכך מונע לחלוטין התקפות מילון לא מקוונות (Offline Dictionary Attacks).',
      'ביטול מלא של הצפנת הנתונים לצורך הגברת קצבי הגלישה.',
      'חובה להקליד את הקוד הפיזי של כרטיס ה-WLC בכל משתמש.',
      'תמיכה רק בתדרי 2.4 GHz ללא הצפנה.'
    ],
    correctAnswer: 0,
    explanation: 'תקן WPA3 משפר פלאים את אבטחת רשתות ה-Wi-Fi. הגרסה הביתית (WPA3-Personal) נפטרת משיטת ה-PSK הפגיעה לטובת חידוש מבוסס פרוטוקול SAE (הידוע גם כחלוקת מפתחות Dragonfly). מנגנון SAE מציע אימות חסין קדימה (Forward Secrecy), המבטיח שגם אם תוקף הצליח להאזין ולתעד את תעבורת הלחיצה הדו-צדדית באוויר, הוא אינו יכול לפענח אותה באמצעות תוכנות כוח גס (Brute force/Dictionary) מחוץ לאתר, והקשר המפתח מוצפן באופן דינמי לכל מכשיר בנפרד.',
    hint: 'Dragonfly משווה מפתחות סימולטנית (SAE) ומחסן אותנו מפני שיטות תפיסת מפתח פומביות ברשתות WPA2.',
    additionalInfo: 'בגרסה הארגונית (WPA3-Enterprise), נעשה שימוש בהצפנה חזקה של 192 ביטים התואמת לדרישות האבטחה הגבוהות ביותר של גופי ממשל.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 28'
  },
  {
    id: 'sec_extra_3',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת מתגים (Layer 2)',
    question: 'איזה מנגנון אבטחה מופעל במתגים על מנת לחקור ולבלום התקפות של הרעלת ARP (ARP Spoofing / Man-In-The-Middle), ועל איזה מקור נתונים מבוססת החלטתו?',
    options: [
      'Dynamic ARP Inspection (DAI) - הפרוטוקול בודק את מנות ה-ARP העוברות בפורטים לא מורשים (Untrusted Ports) ומאמת אותן מול טבלת הקישורים המהימנה שנוצרה על ידי DHCP Snooping.',
      'מנגנון Port Security הנועל את מספר ה-MAC Address של השכנים בטבלה.',
      'פרוטוקול STP המכבה את חיבורי ה-Trunks הבעייתיים.',
      'חומת האש הפנימית של הנתב החוסמת הודעות ICMP של הלקוחות.'
    ],
    correctAnswer: 0,
    explanation: 'הרעלת ARP (ARP Spoofing) היא התקפה שבה מחשב עוין משייך את MAC הכתובת שלו לכתובת ה-IP של שער ברירת המחדל, וכך מסיט את כל התנועה אליו. כדי למנוע זאת, מפעילים במתג DAI (Dynamic ARP Inspection). מנגנון DAI בודק כל הודעת ARP Reply המגיעה מפורטים שאינם מסומנים כ-Trusted. הוא משווה את שילוב ה-IP וה-MAC שבמנה מול בסיס הנתונים האמין שנוצר בזמן אמת על ידי DHCP Snooping (הידוע כ-DHCP Snooping Binding Table). אם יש אי-התאמה, מתג התקשורת זורק את מנת ה-ARP ומדווח על התראה ביטחונית.',
    hint: 'DAI עוקב אחר ה-ARP, אך הוא עיוור לחלוטין ללא העזרה הבו זמנית של בסיס הנתונים של DHCP Snooping.',
    additionalInfo: 'פורטים המחוברים למתגים אחרים או לשרתים מוגדרים כ-Trusted DAI ports, בעוד פורטי משתמשי קצה מוגדרים כ-Untrusted.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11'
  },
  {
    id: 'sec_extra_4',
    domain: 'security_fundamentals',
    subtopic: 'Port Security',
    question: 'מהן ההשפעות השונות של מצבי התגובה (Violation Modes) של Port Security במתגי סיסקו: Protect, Restrict ו-Shutdown, בעת גילוי MAC Address שאינו מורשה?',
    options: [
      'Protect: משליך את התעבורה הלא מורשת בשקט; Restrict: משליך את התעבורה, רושם התראה ב-Syslog ומעלה את מונה ה-Violoations; Shutdown (ברירת המחדל): מכבה את הפורט ומעביר אותו למצב המוגדר כ-err-disable.',
      'Protect: מכבה את המתג לחלוטין; Restrict: מוריד את קצב הפורט ל-10Kbps; Shutdown: מוחק את ה-VLAN.',
      'שלושת המצבים מכבים את הפורט מיידית באותה דרגתיות בדיוק.',
      'אין הבדל אמיתי במתגים תעשייתיים וכולם תלויים ב-DHCP.'
    ],
    correctAnswer: 0,
    explanation: 'מנגנון Port Security מתמודד עם כניסת כתובות זרות בשלוש דרכים: 1) Protect - משליך את המנות הלא מורשות ללא התרעה (הפורט נשאר פעיל). 2) Restrict - משליך את המנות הלא מורשות ומייצר הודעה רשמית ל-Syslog/SNMP, ומקפיץ את מונה השגיאות (הפורט נשאר פעיל). 3) Shutdown (דיפולטיבי) - משליך את המנות, מכבה פיזית את הקישור ללד אדום (מצב err-disable), רושם לוגים ומחייב הקלדה של shut ואז no shut כדי להחזיר את הממשק לפעולה.',
    hint: 'רק Shutdown מביא את הפורט למצב סגור ומכובה פיזית (err-disable), השאר משאירים אותו חי אך מסננים מנות.',
    additionalInfo: 'שחרור אוטומטי של פורט שנכבה על ידי Shutdown אפשרי באמצעות הפקודה הגלובלית "errdisable recovery cause psecure-violation".',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11'
  },
  {
    id: 'sec_extra_5',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת מידע בארגונים',
    question: 'באימות רב-שלבי (MFA - Multi-factor Authentication), מהם שלושת סוגי הגורמים (Authentication Factors) הרשמיים המשמשים לאמת את זהותו של העובד?',
    options: [
      'משהו שאתה יודע (כגון סיסמה), משהו שיש לך (כגון טוקן פיזי/נייד), ומשהו שאתה מייצג פיזית (כגון טביעת אצבע או זיהוי פנים).',
      'המייל של העובד, מספר הטלפון שלו, וכתובת מגוריו הרשומה במערכת.',
      'דגם המחשב, גרסת ה-Windows והחיבור לכבל הרשת שלו.',
      'המחלקה הארגונית, השנה בה התקבל לעבודה, ותמונת הפרופיל שלו.'
    ],
    correctAnswer: 0,
    explanation: 'אבטחת MFA דורשת שילוב של שניים או יותר גורמים ממשפחות שונות כדי למנוע חדירה מהאקרים שגנבו סיסמאות. שלוש המשפחות הקלאסיות הן: 1) Something you know - ידע (סיסמה, קוד PIN). 2) Something you have - בעלות (טלפון לקבלת SMS, כרטיס חכם, התקן USB מיוחד). 3) Something you are - ישות ביומטרית (טביעת אצבע, סריקת רשתית, קול, פנים). גורם נוסף מודרני הוא מיקום פיזי או שעות עבודה.',
    hint: 'ידע (סיסמה), החזקה (טוקן חכם במכשיר), וגוף פיזי ביומטרי (אצבע או פנים).',
    additionalInfo: 'שימוש בשתי סיסמאות שונות אינו נחשב ל-MFA, מכיוון שהן שייכות לאותו גורם אימות יחיד (משהו שאתה יודע).',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15'
  },
  {
    id: 'sec_extra_6',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת עיצוב ומשמעת',
    question: 'מה המשמעות של מודל האבטחה והשירותים המסומן על ידי המונח AAA (Authentication, Authorization, Accounting) ברשתות סיסקו?',
    options: [
      'Authentication: מי העובד (אימות זהות); Authorization: מה מותר לו לעשות (הרשאות); Accounting: מעקב ורישום פעולותיו במערכת.',
      'זהו סוג סוללה זעירה המותקנת בתוך הנתבים לצורך גיבוי השעון הפנימי.',
      'Authentication: מחיקת סיסמאות; Authorization: הגדרת כתובת IP; Accounting: הגדרת שידורי OSPF.',
      'קיצור של שלוש חברות אבטחת מידע אמריקאיות המפקחות על ה-CCNA.'
    ],
    correctAnswer: 0,
    explanation: 'ארכיטקטורת AAA יוצרת מערך קבוע לבקרת גישה למכשירים: 1) Authentication - בודק את שם המשתמש והסיסמה מול רשימה מקומית או שרת מרכזי. 2) Authorization - לאחר חיבורו, קובע אילו פקודות מותר לו להריץ (למשל מונע גישה ל-"configure terminal"). 3) Accounting - רושם הכל ללוגים: מתי נכנס, מתי יצא, ואילו הגדרות הוא שינה בפועל (עוזר לחקירת תקלות ושמירה על אמון).',
    hint: 'מי אתה? (אימות), מה מותר לך? (הרשאה), ומה עשית בפועל? (רישום ומעקב).',
    additionalInfo: 'בסיסקו מפעילים את ה-AAA עם פקודת הראשית "aaa new-model" במצב הגדרות גלובלי.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15'
  },
  {
    id: 'sec_extra_7',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת עיצוב ומשמעת',
    question: 'מהם ההבדלים הטכנולוגיים והפרוטוקוליים המרכזיים בין פרוטוקול TACACS+ לפרוטוקול RADIUS ביישומי שרתי AAA?',
    options: [
      'TACACS+ מבוסס על TCP (פורט 49), מפריד לחלוטין את פעולות האימות וההרשאה ומצפין את כל גוף המנה; RADIUS מבוסס על UDP (פורטים 1812/1813), משלב אימות והרשאה יחד, ומצפין אך ורק את שדה הסיסמה.',
      'TACACS+ הוא תקן פתוח של האו"ם ו-RADIUS שייך בלעדית לממשלת ארה"ב.',
      'RADIUS מיועד לחיבור קווי בלבד וv4-TACACS תומך רק ברדיו אלחוטי.',
      'שני הפרוטוקולים נשענים על תקן IPsec ואינם מערבים פורטי שכבה 4.'
    ],
    correctAnswer: 0,
    explanation: 'ההבדלים בין השניים גדולים: TACACS+ הוא קנייני של קומת סיסקו (Cisco-developed): 1) משתמש ב-TCP המציע אמינות חיבור גבוהה; 2) מפריד את שלבי ה-AAA כך שניתן לשלוח אישור למשתמש מול שרת אחד והרשאתו מול שרת אחר; 3) אבטחתי יותר כי הוא מצפין את כל פריים התקשורת. RADIUS הוא תקן תעשייתי פתוח: 1) משתמש ב-UDP המהיר; 2) משלב אימות והרשאה יחד (מייעל קצבים); 3) מצפין רק את ה-Password, בעוד שמות המשתמש ושאר השדות מועברים בטקסט גלוי ברשת.',
    hint: 'TACACS משתמש ב-TCP המאובטח ומצפין את הכל (שמיכות הגנה מלאה), בעוד RADIUS של ה-UDP מצפין אך ורק סיסמה.',
    additionalInfo: 'שאלות השוואה בין RADIUS ל-TACACS+ מופיעות בתדירות גבוהה בבחינת ה-CCNA.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15'
  },
  {
    id: 'sec_extra_8',
    domain: 'security_fundamentals',
    subtopic: 'רשימות בקרת גישה (ACL)',
    question: 'מהו ה-Wildcard Mask הנכון והמתאים שיש לרשום בפקודת ACL על מנת למפות במדויק אך ורק את קבוצת הכתובות שנמצאת בטווח של תת-הרשת 192.168.10.0/26?',
    options: [
      '0.0.0.63',
      '0.0.0.255',
      '255.255.255.192',
      '0.0.0.127'
    ],
    correctAnswer: 0,
    explanation: 'מסכת Wildcard היא הפוכה ללוגיקה של מסכת רשת. ביט 0 מסמל "חייב להיות תואם לכתובת המקור", וביט 1 מסמל "לא משנה מה הערך (Don\'t care)". כדי למצוא Wildcard Mask של תת-רשת, אנו מחסירים את מסכת הרשת הרגילה של הטווח מברירת מחדל של 255.255.255.255. מסכת רשת של /26 היא 255.255.255.192. החיסור הוא: 255.255.255.255 פחות 255.255.255.192, התוצאה היא 0.0.0.63.',
    hint: 'הפחת את אוקטט הרשת האחרון מהמספר 255: לענייננו 255 פחות 192 שווה ל-63.',
    additionalInfo: 'ב-ACL, המילה "host" מחליפה את הצורך ב-Wildcard מלא ומקבילה לרישום 0.0.0.0, בעוד המילה "any" מקבילת ערך ל-255.255.255.255.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 2'
  },
  {
    id: 'sec_extra_9',
    domain: 'security_fundamentals',
    subtopic: 'רשימות בקרת גישה (ACL)',
    question: 'מהם ההבדלים הראשיים בקטגוריות, טווחי המספרים המזהים, והמיקום המומלץ ברשת בין Standard Access List לבין Extended Access List בסיסקו?',
    options: [
      'Standard ACL (מספרים 1-99) בודק רק כתובת IP מקור, ויש למקם אותו קרוב ככל האפשר ליעד. Extended ACL (מספרים 100-199) בודק מקור, יעד, פורט ופרוטוקול, ויש למקם אותו קרוב ככל האפשר למקור.',
      'Standard ACL עובד רק מעל IPv6 ו-Extended פועל רק ב-DHCP.',
      'אין הבדלים בניהם פרט למספר השורות המותרות להשחלה.',
      'Standard מגן על נתבי OSPF בלבד, ו-Extended מיועד לחיבורי WLC.'
    ],
    correctAnswer: 0,
    explanation: 'רשימות גישה (ACL) משמשות לזרוק או לאפשר חבילות מידע. Standard ACL (טווחים 1-99 ו-1300-1999) מסנן נתונים אך ורק לפי כתובת ה-IP של המקור (Source IP Address). מכיוון שהוא אינו יודע לאן החבילה מיועדת, יש למקם אותו קרוב ככל האפשר ליעד כדי לא לחסום בטעות תנועה לגיטימית למקומות אחרים. Extended ACL (טווחים 100-199 ו-2000-2699) הוא חכם בהרבה ומסנן על בסיס Source IP, Destination IP, Protocol (TCP/UDP/ICMP), ומספרי פורטים (כמו Port 80, 443). מכיוון שהוא מסנן בצורה מדויקת, עדיף למקם אותו קרוב ככל האפשר למקור כדי לחסוך רוחב פס ברשת הליבה.',
    hint: 'הבסיסי (Standard) עושה בדיקה קלה וממוקם קרוב ליעד, המורחב (Extended) עושה בדיקה מקיפה וממוקם קרוב למקור ליד המשתמש.',
    additionalInfo: 'בסוף כל רשימת ACL באשר היא קיים חוק סודי סמוי המכונה Implicit Deny Any. כלומר, מנה שלא התאימה ספציפית לאף שורת חוק מוגדרת - תיזרק אוטומטית.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 2'
  },
  {
    id: 'sec_extra_10',
    domain: 'security_fundamentals',
    subtopic: 'חיבורים וירטואליים (VPN)',
    question: 'מהו ההבדל המרכזי והתפקודי ברשתות ארגוניות בין חיבור מסוג Site-to-Site VPN לבין חיבור מסוג Remote Access VPN?',
    options: [
      'Site-to-Site VPN מקשר באופן קבוע ומאובטח בין שני סניפים פיזיים של החברה על ידי הצפנת תווך האינטרנט באמצעות Gateway-to-Gateway. Remote Access VPN מאפשר לעובד המחובר מהבית להתקשר זמנית לרשת הארגונית באמצעות תוכנת לקוח ייעודית (Client-to-Gateway).',
      'Site-to-Site VPN עובד ללא צורך בספק אינטרנט חיצוני ועל גבי קישורי לוויין.',
      'Remote Access VPN משמש אך ורק לעדכון גרסאות ה-IOS של מתגי הליבה.',
      'שניהם מבצעים בדיוק את אותה עבודה ללא שימושי מפתחות הצפנה אבטחתיים.'
    ],
    correctAnswer: 0,
    explanation: 'רשתות VPN מייצרות מעבר מוצפן מאובטח על גבי האינטרנט הפומבי (נא להכיר): 1) Site-to-Site VPN - הנתבים בשני הקצוות יוצרים "מנהרה" (Tunnel) קבועה. המחשבים בשני הסניפים אינם מודעים לקיום ה-VPN, והתקשורת ביניהם מוצפנת באופן אוטומטי במעבר בנתבי הקצה. 2) Remote Access VPN - מיועד למשתמשי קצה בודדים (כמו עובדים מהבית ברכבת). העובד מפעיל אפליקציה מיוחדת (כמו Cisco AnyConnect), מקליד פרטי אימות ויוצר מנהרה זמנית מוצפנת מול חומת האש הארגונית.',
    hint: 'אתר-לאתר (Site-to-Site) מחבר בניינים קבועים; גישה מרוחקת (Remote Access) מחברת משתמש נייד בודד.',
    additionalInfo: 'פרוטוקול IPsec הוא טכנולוגיית הליבה לאבטחת נתונים בחיבורי Site-to-Site VPN, בעוד Remote Access נוטה להשתמש לרוב ב-SSL/TLS המפשט את התהליך.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 12'
  },
  {
    id: 'sec_extra_11',
    domain: 'security_fundamentals',
    subtopic: 'חיבורים וירטואליים (VPN)',
    question: 'בפרוטוקול האבטחה IPsec, מהו תפקידו המוגדר של ה-ESP (Encapsulating Security Payload) בהשוואה ל-AH (Authentication Header)?',
    options: [
      'ה-ESP מספק את ההצפנה המלאה של תוכן המקלדת ונתוני המשתמש (Confidentiality) לצד אימות המנה; בעוד ה-AH בודק רק את אמינות ושלמות המנה ואינו מציע הצפנת נתונים כלל.',
      'ה-ESP משועבד רק להגדיר כתובות IPv6.',
      'ה-AH משמש בפועל להרחיב את טבלת ה-MAC במתגים השכנים.',
      'שני הרכיבים עושים תפקיד זהה ואינם עובדים מעל נתבים.'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול הקישור IPsec מורכב משתי אפשרויות אבטחה ראשיות ברמת המנהרה: 1) AH (Authentication Header) - נותן שלמות נתונים ואימות מקור (מבטיח שהשולח אמיתי ושלא נגעו במנה בדרך) אך אינו מקודד או מצפין אותם, ולכן המידע חשוף לציתות. 2) ESP (Encapsulating Security Payload) - כמעט תמיד נמצא בשימוש כיום כי הוא מספק מקצה לקצה גם אימות (Authentication) וגם הצפנה מלאה וחזקה (Confidentiality) עבור כל תוכן הנתונים במנה העוברת ברשת.',
    hint: 'חשוב על ה-Encapsulation של ESP כסוג של קפסולה סגורה ומוצפנת לחלוטין.',
    additionalInfo: 'IPsec משתמש בהחלפת מפתחות מסוג Diffie-Hellman לצורך יצירת מפתח הצפנה סימטרי ודינמי מוסכם בין הצדדים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 12'
  },
  {
    id: 'sec_extra_12',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת מתגים (Layer 2)',
    question: 'כיצד תורם מנגנון DHCP Snooping לחסימת שרתי DHCP פיראטיים (Rogue DHCP) המחוברים לרשת הארגונית על ידי משתמשים?',
    options: [
      'הוא מגדיר את כל פורטי משתמשי הקצה כ-Untrusted Ports; במידה ומתקבלת הודעת תשובה המיועדת להקצות כתובות (כגון DHCP Offer או DHCP ACK) מפורט כזה, המתג חוסם ומשליך אותה מיידית.',
      'הוא משפר את קצב הזרמת האינטרנט עבור שרתי DHCP.',
      'הוא מוחק את כל כתובות ה-IP של הלקוחות כדי לאלץ אותם להשתמש ב-IPv6 בלבד.',
      'הוא מכבה את כל המתג פיזית לצרכי אזהרה כללית.'
    ],
    correctAnswer: 0,
    explanation: 'לקוח זדוני יכול לחבר שרת DHCP פיראטי לרשת כדי לחלק כתובות IP שגויות למכשירי הקצה, וכך להגדיר את עצמו כ-Default Gateway ולגלות את כל הסיסמאות שלהם (Man-In-The-Middle). מתג המפעיל DHCP Snooping מחלק את הפורטים ל-Trusted (פורטים המחוברים לשרת ה-DHCP הרשמי או ל-Upstream switch) ול-Untrusted (פורטי המשתמשים). המתג מסנן ומגביל הודעות המגיעות מפורטים לא מהימנים: אם פריים מסוג Offer או ACK (הודעות שמגיעות משרתי DHCP) ינסו להיכנס מפורט Untrusted, המתג יקטע ויחסום אותן לחלוטין.',
    hint: 'שרת ה-DHCP האמיתי מחובר לפורט Trusted, בעוד הפורטים של המשתמשים מבודדים כ-Untrusted ונסגלים להודעות שליחה בלבד.',
    additionalInfo: 'DHCP Snooping תומך גם במניעת התקפות של התרוקנות מאגר (DHCP Starvation Attack) על ידי השוואת ה-MAC הפיזי של מנת ה-DHCP מול ה-MAC של פריים שכבה 2.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11'
  },
  {
    id: 'sec_extra_13',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת עיצוב ומשמעת',
    question: 'מהו ההבדל התפקודי הראשי בין חומת אש מסורתית (Traditional Layer 3/4 Firewall) לבין חומת אש מהדור הבא (NGFW - Next-Generation Firewall)?',
    options: [
      'חומת אש מסורתית מסננת מנות אך ורק לפי כתובות IP, פורטים ומשחק פרוטוקולים (L3/L4); NGFW מציעה בנוסף סינון חכם מבוסס אפליקציות (Application Visibility & Control), מערכות מניעת חדירות מובנות (IPS/IDS), ניתוח תוכנות זדוניות וסיווג לקוחות.',
      'NGFW עובדת אך ורק בעזרת בינה מלאכותית ואינה תומכת במעבר כבלי אתרנט פיזיים.',
      'Traditional Firewall היא חומרה ו-NGFW היא תוכנה ללא מגע יד אדם.',
      'אין כל הבדל וכל החברות משלבות את שתיהן באותו מקטע בדיוק.'
    ],
    correctAnswer: 0,
    explanation: 'חומת אש מסורתית מסירה או חוסמת מנות לפי כותרות שכבה 3 ו-4 (IP ופורט בלבד, למשל חוסמת פורט 80). אלא שכיום רוב התוכנות והמשחקים עובדים מעבר לפורט 443 המאובטח (HTTPS), וחומת אש מסורתית לא יכולה להבחין ביניהן. חומת אש מהדור הבא (NGFW - Next-Generation Firewall) מבצעת בדיקה עמוקה של תוכן המנות (Deep Packet Inspection), יודעת לזהות את האפליקציה המדויקת הפועלת בפועל (כמו להבדיל בין סתם גלישה באינטרנט לבין שיחת וידאו ב-Teams), ומכילה גם שירותי אנטי-וירוס ברשת, סינון עמוק ומניעת חדירות (IPS).',
    hint: 'הדור הבא (Next-Gen) מביא איתו את היכולת להסתכל עמוק פנימה אל תוך התוכן של הודעות האפליקציה (L7) ולא רק על הפורטים הפיזיים.',
    additionalInfo: 'חלק מפתרונות ה-NGFW של סיסקו מיוצגים תחת משפחת ה-Cisco Firepower.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'ap_extra_3',
    domain: 'automation_programmability',
    subtopic: 'פורמטים של נתונים (JSON, XML, YAML)',
    question: 'על פי כללי התחביר (Syntax) הנוקשים של פורמט ייצוג הנתונים JSON, אילו מבין ההצהרות הבאות היא הנכונה והמדויקת ביותר?',
    options: [
      'מפתחות (Keys) חייבים תמיד להיות מחרוזות המוקפות במירכאות כפולות בלבד, פסיקים משמשים להפריד בין איברים בתוך אובייקטים, וקיומו של פסיק נגרר (Trailing Comma) בסוף הרשימה הוא אסור ושגוי.',
      'ניתן להשתמש בסוגריים מרובעים בלבד ללא סוגריים מסולסלים כלל.',
      'הזחה (Indentation) דורשת שימוש בתווים מיוחדים בלבד ואינה תומכת במספרים.',
      'כל המפתחות חייבים להיות רשומים באותיות גדולות (Caps Lock) ונפרדים ברווחים.'
    ],
    correctAnswer: 0,
    explanation: 'JSON (JavaScript Object Notation) הוא פורמט פופולרי ונפוץ להחלפת נתונים בין שרתים ואפליקציות. הכללים שלו ברורים ונוקשים: 1) מפתחות וערכי טקסט חייבים להיות מוקפים במירכאות כפולות בלבד (מירכאות בודדות יעוררו שגיאות קריטיות). 2) פסיקים מפרידים בין אלמנטים ברשימה או באובייקט, אך אסור להשאיר פסיק נגרר (Trailing Comma) בערך האחרון של המקטע. 3) סוגריים מסולסלים {} מסמלים אובייקט (Object), וסוגריים מרובעים [] מסמלים מערך (Array).',
    hint: 'זכור: מירכאות כפולות למפתחות חובה, ופסיק נגרר בסוף בסיום לא עובר חלק את הבדיקה.',
    additionalInfo: 'פורמט JSON קל מאוד לקריאה ולכתיבה על ידי מחשבים ומהווה את הסטנדרט דה-פקטו עבור REST APIs.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18'
  },
  {
    id: 'ap_extra_4',
    domain: 'automation_programmability',
    subtopic: 'פורמטים של נתונים (JSON, XML, YAML)',
    question: 'כיצד מיוצג מבנה של אובייקט מבוסס נתונים בפורמט XML בהשוואה לפורמטים האחרים?',
    options: [
      'הוא משתמש בתגיות פתיחה וסגירה מותאמות אישית הדומות ל-HTML (למשל <router><hostname>R1</hostname></router>), ומחייב סגירה מדויקת לכל תת-תגית שנפתחה.',
      'הוא אינו מאפשר היסטוריה פנימית ומשתמש בנקודות ופסיקים בלבד.',
      'הוא נסמך על הזחות (Tabs או רווחים) כדי לקבוע את ההיררכיה ללא תגיות כלל.',
      'אין לו שימושים בעולם התקשורת מכיוון שהוא מיוצר עבור דפי אינטרנט ישנים בלבד.'
    ],
    correctAnswer: 0,
    explanation: 'XML (eXtensible Markup Language) הוא פורמט נתונים ותיק המשמש בתקני ניהול רשת רבים (כגון פרוטוקול NETCONF המנהיר נתבים). לתחביר יש דמיון רב ל-HTML: כל פיסת מידע מוגנת ומקופסת בתוך תג פותח ותג סוגר מתאים בעל קו לוכסן (למשל `<vlan><id>10</id></vlan>`). XML הוא מפורט למדי (Verbose) ומיועד להיות גם קריא לאדם וגם קריא למכונה.',
    hint: 'תבנית המבוססת על תגיות משולשות המזכירות את האינטרנט וייצוג קודי HTML.',
    additionalInfo: 'XML הוא הפורמט הראשי והיחיד העובר בתוך פרוטוקול NETCONF, בעוד RESTCONF המודרני תומך הן ב-XML והן ב-JSON.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18'
  },
  {
    id: 'ap_extra_5',
    domain: 'automation_programmability',
    subtopic: 'פורמטים של נתונים (JSON, XML, YAML)',
    question: 'איזו הכרח עיצובית ותחבירית קיימת בשימוש בפורמט קבצי ה-YAML לצורך בניית קובצי הגדרות (כגון ספרי הדרכה של Ansible)?',
    options: [
      'YAML מסתמך באופן מוחלט וקריטי על הזחות פיזיות משוננות (Indentation המבוססת על רווחים מדויקים) כדי לקבוע את היררכיית בסיסי הנתונים, ואסור בתכלית האיסור להשתמש בתווי Tab.',
      'YAML מחייב כתיבת סוגריים מרובעים בסיום כל שורה פעילה.',
      'הוא עושה שימוש אך ורק בתגיות משולשות כמו קובצי HTML מיושנים.',
      'כל קובץ YAML חייב להיפתח במסר "HELLO" במצב גלובלי.'
    ],
    correctAnswer: 0,
    explanation: 'YAML (YAML Ain\'t Markup Language) נבחר כפורמט הגדרות פופולרי מאוד לכלי אוטומציה כגון קובצי Playbooks של Ansible, בעיקר בשל קירובו המעולה לעין האנושית ומיעוט סימני הפיסוק המציקים שלו. אלא שהמינוס שלו הוא נוקשות ההזחות: ההיררכיה והקינון של הפרמטרים נקבעים לפי מספר הרווחים המדויק בתחילת השורה. שימוש במקש Tab לצורך הזחה מהווה שבירת תחביר מיידית שתפסול את הרצת הקובץ.',
    hint: 'הזחה נקייה בעזרת רווחים בלבד, ללא סוגרים מיותרים וללא שימוש במקש ה-Tab המובנה.',
    additionalInfo: 'קבצי YAML נפתחים לרוב בשלושה מקפים רצופים (---) המציינים את תחילת המסמך, ומסתיימים בשלוש נקודות (...) בגרסאות הרשמיות.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18'
  },
  {
    id: 'ap_extra_6',
    domain: 'automation_programmability',
    subtopic: 'ממשקי REST APIs',
    question: 'התאם בין ארבעת מתודות ה-HTTP המרכזיות ביישומי REST APIs לפעולת ה-CRUD (Create, Read, Update, Delete) שהן מבצעות במכשיר היעד:',
    options: [
      'POST = Create | GET = Read | PUT/PATCH = Update | DELETE = Delete',
      'GET = Create | POST = Read | DELETE = Update | PUT = Delete',
      'PUT = Create | GET = Read | DELETE = Update | POST = Delete',
      'POST = Create | DELETE = Read | GET = Update | PATCH = Delete'
    ],
    correctAnswer: 0,
    explanation: 'ממשקי REST APIs פועלים מעל הקישור היציב והמאובטח של פרוטוקול HTTP לצורך ניהול והגדרת מכשירים ושרתים. המיפויי הקבוע והרשמי הוא: 1) POST - מייצר (Create) משאב חדש. 2) GET - קורא ושולף (Read) נתונים קיימים. 3) PUT (מחליף מערך שלם) או PATCH (מתקן שדות ספציפיים בלבד) - מעדכן (Update) קונפיגורציות קיימות. 4) DELETE - מוחק ומסיר (Delete) משאבים.',
    hint: 'GET תמיד קורא, POST תמיד מייצר מוצר חדש, DELETE מוחק, ו-PUT/PATCH משמש לעדכונים.',
    additionalInfo: 'הודעות תשובה מהשרת כוללות קוד סטטוס HTTP כגון 200/201 להצלחה, Resource Created, וקודים של שגיאות כגון 400 לבעיית תחביר או 404 לחוסר מציאת התוכן.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 19'
  },
  {
    id: 'ap_extra_7',
    domain: 'automation_programmability',
    subtopic: 'בקרי רשת ו-SDN',
    question: 'איזה פתרון ורכיב בקרה מרכזי של סיסקו משמש עבור ניהול, הגדרה ואוטומציה לדור הבא של רשתות קווי הארגון (Enterprise Networks)?',
    options: [
      'Cisco DNA Center (הקרוי כיום Catalyst Center)',
      'Cisco APIC-EM (שהושבת והוחלף עבור יישומים ארגוניים)',
      'בקר ה-vSmart המבוסס על אבטחת SD-WAN בלבד',
      'תוכנת הנתב הקלאסית Cisco IOS-XE בצומת הקצוות'
    ],
    correctAnswer: 0,
    explanation: 'Cisco Catalyst Center (לשעבר Cisco DNA Center - Digital Network Architecture) הוא הלב של האוטומציה הארגונית מבוססת התוכנה (SDN - Software Defined Networking). הבקר מספק פאנל ריכוזי בודד של ממשק גרפי (Single Pane of Glass) שממנו מנהלים את כל המתגים, הנתבים וה-WLC בארגון. הוא מפשט את העבודה באמצעות תהליכי תכנון (Design), הגדרת מדיניות (Policy), ביצוע אוטומטי (Provision), ואשור ופענוח בעיות ברשת (Assurance).',
    hint: 'DNA Center - המרכז המשפיע על המטריצה הגנטית של אוטומציית רכיבי סיסקו.',
    additionalInfo: 'Cisco Catalyst Center משתמש במתודולוגיית Intent-Based Networking (IBN), שבה מנהל הרשת מגדיר רק את "התוצאה הרצויה" והבקר מתרגם זאת אוטומטית לקוד קונפיגורציה הנשלח לכלל המכשירים בקצה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'ap_extra_8',
    domain: 'automation_programmability',
    subtopic: 'בקרי רשת ו-SDN',
    question: 'מהו תפקידו הראשי של ה-Overlay Layer בארכיטקטורת SD-Access הארגונית של סיסקו, ואיזה סוג של פרוטוקול אנקפסולציה מיושם בו בפועל?',
    options: [
      'הוא יוצר את מנהרות התעבורה הווירטואליות הלוגיות המקשרות בין משתמשי הקצה מעל גבי ה-Underlay הפיזי, ומיישם זאת בעזרת פרוטוקול האנקפסולציה VXLAN (Virtual Extensible LAN).',
      'הוא דואג לחבר את כבלי החשמל הפיזיים של המתגים בלבד.',
      'הוא יוצר הגבלה מוחלטת לחיבורי IPv4 ומאלץ שימוש ב-RIPv2 בלבד.',
      'מנגנון שמיועד לעדכן את קובצי ה-Boot בנתבים הפיזיים דרך TFTP.'
    ],
    correctAnswer: 0,
    explanation: 'במערכות SD-Access, אנו מפרידים את הרשת לשתי שכבות עיקריות: 1) Underlay - מתגי התקשורת, כבלי הסיב האופטי והניתובים הבסיסיים (לרוב מעל פרוטוקול IS-IS) שכל מטרתם היא להבטיח חיבור וניתוב זר בין הכתובות הפיזיות של הרכיבים. 2) Overlay - רשת לוגית וירטואלית הנבנית מעל ה-Underlay ומאפשרת ליצור "מנהרות" גמישות. SD-Access משתמש ב-VXLAN כאנקפסולציה המאפשרת להעביר תעבורת Layer 2 גמישה מעל גבי רשת הניתוב של שכבה 3.',
    hint: 'זכור: שכבה עליונה לוגית (Overlay) מרחפת מעל השכבה הפיזית הבסיסית (Underlay) ומשתמשת במנהרות VXLAN מיוחדות.',
    additionalInfo: 'הבקר המרכז את החלקים הללו הוא ה-Catalyst Center, ופרוטוקול השליטה המשמש למיפוי מיקומי המארחים ברשת הוא LISP.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 17'
  },
  {
    id: 'ap_extra_9',
    domain: 'automation_programmability',
    subtopic: 'בקרי רשת ו-SDN',
    question: 'פתרון ה-Cisco SD-WAN מחלק את תפקידו לארבעה מישורי בקרה שונים (Planes). התאם בצורה מדויקת בין רכיב המערכת הווירטואלי למישור התפעולי הראשי שלו:',
    options: [
      'vManage = Management Plane (ניהול) | vSmart = Control Plane (בקרה) | vBond = Orchestration Plane (תזמור) | vEdge/cEdge = Data Plane (נתונים)',
      'vSmart = Management Plane | vManage = Control Plane | vBond = Data Plane | vEdge = Orchestration Plane',
      'vBond = Management Plane | vEdge = Control Plane | vSmart = Orchestration Plane | vManage = Data Plane',
      'כל הארבעה רכיבים מבצעים משימות זהות לחלוטין בתוך ה-Control Plane בלבד.'
    ],
    correctAnswer: 0,
    explanation: 'ארכיטקטורת SD-WAN (Software-Defined WAN) פותרת את בעיות קישורי הסניפים המרוחקים ללא צורך בהגדרה מסורבלת של נתב בנפרד, ומחלקת את התפקידים בצורה ברורה: 1) vManage (Management Plane) - מספק ממשק אינטרנט גרפי להגדרת המדיניות וניהול הקבצים. 2) vSmart (Control Plane) - מחליט על נתיבי הניתוב, מפיץ מפתחות אבטחה וחוקי זרימה (המוח של הרשת). 3) vBond (Orchestration Plane) - מלווה את הליך ההצטרפות של נתב חדש לרשת, מסייע במעקף חלוקת ערוצים (NAT Traversal) ומקשר בינו לשרתי הניהול. 4) vEdge / cEdge (Data Plane) - המכשירים הפיזיים או הווירטואליים הנמצאים בסניפים ומעבירים בפועל את תעבורת המשתמשים מוצפנת באינטרנט.',
    hint: 'vManage מנהל (גרפי), vSmart שולט בחוכמה (בקרה), vBond הוא המדביק והתזמורת, ו-vEdge/cEdge משמש כנתב קצה המעביר נתונים.',
    additionalInfo: 'פקטור אבטחה חשוב ב-SD-WAN הוא יצירה אוטומטית מלאה של רשת מנהרות IPsec (VPN Overlay) ללא מעורבות מנהל הרשת.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'ap_extra_10',
    domain: 'automation_programmability',
    subtopic: 'כלי ניהול קונפיגורציות (Ansible, Puppet, Chef)',
    question: 'איזה מהכלים הבאים לניהול תצורות ואמצעי אוטומציה מוגדר כ-Agentless (אינו מחייב התקנת תוכנת סוכן במכשירי הקצה) ופועל במתודולוגיית דחיפת הגדרות (Push Model)?',
    options: [
      'Ansible',
      'Puppet',
      'Chef',
      'Cisco IOS Terminal'
    ],
    correctAnswer: 0,
    explanation: 'כלי קונפיגורציה עוזרים לנהל הגדרות של מאות שרתים ונתבים ביעילות: Ansible פותח על ידי חברת Red Hat ונודע בכך שהוא Agentless - אין שום צורך להתקין תוכנת רקע מיוחדת בתוך מערכות ההפעלה של הנתבים, אלא הוא מתחבר אליהם ישירות מרחוק בעזרת פרוטוקולי תקשורת קיימים (כגון SSH לנתבים או WinRM לשרתים). הוא פועל במודל Push: מנהל הרשת מריץ את קובץ ה-Playbook בשרת המרכזי והוא דוחף ומחיל את השינויים מיד על כל המכשירים המוגדרים בקבוצה.',
    hint: 'הכלי היחיד שאינו דורש להתקין Agent על המכשיר ודוחף פקודות בצורה של ספרי הדרכה מקומיים (Playbooks) מבוססי YAML.',
    additionalInfo: 'לעומתו, הכלים Puppet ו-Chef מעוררים שימוש בתוכנת לקוח מובנית (Agent-based) בכל מכשיר ופועלים במתודולוגיית "משיכה" (Pull Model) שבה הלקוחות מאזינים ומורידים קבצים באופן עצמאי מהשרת.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 20'
  },
  {
    id: 'ap_extra_11',
    domain: 'automation_programmability',
    subtopic: 'ממשקי REST APIs',
    question: 'מהו ההבדל המושגי בין ממשק API המסווג כ-Northbound API לבין ממשק המסווג כ-Southbound API בתוך ארכיטקטורת רשת SDN?',
    options: [
      'Northbound API מעביר בקשות מהבקר הראשי מעלה אל אפליקציות, שירותים ומתכנתים; Southbound API מעביר הנחיות מהבקר מטה אל מכשירי הרשת הפיזיים (נתבים, מתגים).',
      'Northbound API עובד רק ברדיו אלחוטי ו-Southbound עובד דרך כבלים סיביים.',
      'ממשקים אלה מזהים את מיקומם של המכשירים על פי מצפן כדור הארץ בלבד.',
      'Southbound תומך בחומרי חומרה של סיסקו בלבד ללא שרתי ענן.'
    ],
    correctAnswer: 0,
    explanation: 'במערכות SDN, בקר הרשת המרכזי ניצב באמצע בין מנהל המערכת לבין הרשת האמיתית: 1) Northbound API (ממשקי צפון) - פונים אל גזרת הניהול העליונה. דרכם יכולים מפתחים או תוכנות חיצוניות לדבר עם הבקר (לרוב באמצעות REST APIs וקבלת JSON) כדי לקבל מידע על מצב הרשת או לטעון חוקים. 2) Southbound API (ממשקי דרום) - פונים למטה אל חומרת הקרקע הפיזית. דרכם שולח הבקר את פקודות ההגדרה והזרמת הנתונים אל הנתבים והמתגים (בעזרת פרוטוקולים דוגמת NETCONF, RESTCONF, OpenFlow או SNMP).',
    hint: 'חשוב על תלת שכבתית: למעלה נמצאות האפליקציות, באמצע הבקר הראשי, ולמטה כבלי הרשת והמכשירים פיזית.',
    additionalInfo: 'קיומו של Southbound API גמיש מאפשר לבקר ראשי לנהל מכשירים של חברות ויצרנים תעשייתיים שונים ללא הגבלת חומרה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'ap_extra_12',
    domain: 'automation_programmability',
    subtopic: 'פרוטוקולי NETCONF ו-RESTCONF',
    question: 'מהם ההבדלים הראשיים במערך פרוטוקולי התקשורת המשמשים להעברת נתונים וסוגי הפורמטים בין NETCONF ל-RESTCONF?',
    options: [
      'NETCONF פועל מעל SSH (פורט TCP 830) ותומך בלעדית בפורמט XML; בעוד RESTCONF פועל מעל HTTP/S (פורטים TCP 80/443) ותומך הן בפורמט XML והן ב-JSON.',
      'RESTCONF הוא פרוטוקול קבוע שאינו תומך כלל באפשרות של עדכוני הגדרות.',
      'NETCONF הוא קנייני של חברת סיסקו בלבד ואינו נתמך במכשירים אחרים.',
      'שניהם נשענים על פרוטוקול UDP הישן לניהול התנועה.'
    ],
    correctAnswer: 0,
    explanation: 'שני הפרוטוקולים נבנו על מנת להחליף את ממשק הפקודות המסורבל והפרימיטיבי של ה-CLI (Command Line Screen) ולהציע ניהול מובנה מבוסס מודל נתונים קבוע (YANG Model): 1) NETCONF (תקן RFC 6241) משתמש בחיבור SSH מאובטח תחת פורט ייעודי 830, ומעביר את כל החוקים ותשובות התגובה שלו כקבצי XML שלמים ומורכבים. 2) RESTCONF (תקן RFC 8040) הוא סוג של חלופה "קלה" המבוססת על חוקי ה-REST של האינטרנט, המאפשרת למתכנתים לשלוח ספציפית בקשות HTTP (כגון GET/POST) תחת פורט 443 המאבטח של הענן ולקבל בתגובה קבצי XML או קבצי JSON פשוטים לפי בחירתם.',
    hint: 'ל-NET-CONF יש חיבור SSH (פורט 830) וקריאה קשיחה של XML בלבד, בעוד REST-CONF מביא איתו את קלות ה-HTTP הגמיש הדו-כיווני עם XML או JSON.',
    additionalInfo: 'מודל הנתונים העומד בלב הבסיס של שני הפרוטוקולים נקרא YANG (Yet Another Next Generation) ומייצג את המבנה הלוגי וסיווג הפרמטרים במכשיר.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 19'
  },
  {
    id: 'ap_extra_13',
    domain: 'automation_programmability',
    subtopic: 'פרוטוקולי NETCONF ו-RESTCONF',
    question: 'בפרוטוקול RESTCONF, באיזה מבנה דטבייסים לוגי (Datastores) תומכים מודלי ה-YANG על מנת לייצג כתובת משאב עבור הגדרות עריכה (Running Config) לעומת הגדרות מצב לקריאה בלבד (Operational Data)?',
    options: [
      'ממשק ה-config (משאבי הגדרות המייצגים את המצב שניתן לעריכה וכתיבה) וממשק ה-state (מייצג משאבים לקריאה בלבד כגון נתונים פיזיים, מוני חבילות, ומצבי טמפרטורה במכשיר).',
      'לקבצים אלה אין מבנה לוגי וכולם מאוחסנים תחת קובץ TXT יחיד.',
      'נתוני המערכת עוברים דרך מערכת ה-VTEP הווירטואלית.',
      'שימוש בסקציות ה-DR וה-BDR של המקטע המקומי.'
    ],
    correctAnswer: 0,
    explanation: 'במדריך המבני של מודלי התאמה של YANG, הנתונים הסטטיסטיים של המכשירים וההגדרות מחולקים לשני סוגים יסודיים: 1) config - הגדרות הניתנות לשינוי מצוות הניהול (כמו לשנות שם מארח או להגדיר IP). 2) state (לעיתים קרויות Operational data) - נתונים דינמיים לקריאה-בלבד (Read-only) המיוצרים על ידי המכשיר כתוצאה מההרצה (למשל: כמה זמן הממשק פועל - Up-time, אחוז מוני השגיאות, מספר הלקוחות המחוברים בפועל, וסטטוס זרם חשמלי).',
    hint: 'הגדרות שניתן לשנות (Config) לעומת מדדים מהימנים לתצוגה וקריאה בלבד על המצב הפיזי של הממשקים (State).',
    additionalInfo: 'בקישור RESTCONF, מקור הנתונים משולב בתוך כתובת ה-URI (למשל: /restconf/data/ietf-interfaces:interfaces/interface=<name>).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 19'
  },
  {
    id: 'ap_extra_14',
    domain: 'automation_programmability',
    subtopic: 'ממשקי REST APIs',
    question: 'איזה כותרת (HTTP Header) מתווספת לבקשת REST API על מנת להעביר את מפתח האימות הזמני (API Token / Bearer Token) עבור גישה מאובטחת לשרת ללא שליחה של שם המשתמש והסיסמה בכל קריאה?',
    options: [
      'Authorization: Bearer <token_value>',
      'Content-Type: application/json',
      'Authentication-Key: plain_text',
      'Host-Origin: secure_network'
    ],
    correctAnswer: 0,
    explanation: 'כשעובדים עם בקרי רשת חיצוניים, לא בטוח לשלוח את שם המשתמש והסיסמה של מנהל הרשת בכל קריאה וקריאה של מנוע האוטומציה (פעולה שמגבירה סיכוני גניבה). במקום זאת, תהליך העבודה הנכון הוא לשלוח תחילה בקשת אירוח יחידה עם הסיסמה, לקבל בחזרה קוד אישור זמני (Token), ומנקודה זו ולמשך זמן תפוגתו, להחליק את ה-Token הזה בכל הבקשות הבאות בתוך כותרת ה-Authorization המוגדרת.',
    hint: 'כותרת האישורים הסטנדרטית (Authorization) הנושאת עימה את סוד הגישה (Bearer Token).',
    additionalInfo: 'אי העברת כותרת תקינה או פקיעת תוקף ה-Token יניבו שגיאת HTTP מסדרת 401 (Unauthorized) מצד שרתי הבקרה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 19'
  },
  {
    id: 'ap_extra_15',
    domain: 'automation_programmability',
    subtopic: 'בקרי רשת ו-SDN',
    question: 'מדוע מגדירים את הנתבים והמתגים המסורתיים כבעלי ארכיטקטורה מבוזרת (Decentralized Control Plane) בהשוואה לארכיטקטורת רשת מבוססת בקר (Centralized SDN Control Plane)?',
    options: [
      'ברשתות מסורתיות, כל מכשיר מקבל באופן עצמאי את החלטות הניתוב והבקרה שלו ומריץ לבדו את פרוטוקולי הניתוב (OSPF/STP) באופן מבוזר; ברשתות SDN, החלטות השיפוט והבקרה של ה-Control Plane מרוכזות לחלוטין בבקר התוכנה המרכזי.',
      'מכיוון שמתגים מסורתיים מחייבים חיבור לפרוטוקול RIP בלבד.',
      'מפני שלא ניתן להזרים תעבורת אינטרנט על גבי קווים מבוזרים.',
      'אין הבדל ביניהם ושניהם מנוהלים על ידי קבוצת פקודות זהה של ה-ACL.'
    ],
    correctAnswer: 0,
    explanation: 'מכשירי רשת מחלקים את עבודתם ל-3 מישורים (Planes): 1) Data Plane (מישור הנתונים) - עבודה קשה ומהירה: העברת חבילות המידע בפועל מפורט אחד לפורט יעד אחר בהתאם לחוקים הקיימים. 2) Control Plane (מישור הבקרה) - המוח של הרשת החושב ומייצר את חוקי העבודה (הטבלאות של הניתוב ו-MAC מבוססות OSPF, STP). ברשת מסורתית, מישור זה נמצא בתוך הנתב ועובד באופן חופשי ומבוזר מול שכניו. ברשת SDN, אנו "עוקרים" את ההחלטות השכליות של ה-Control Plane מהנתבים והמתגים ומעבירים אותן לניהולו של בקר תוכנה ראשי וריכוזי השולט על כולם. 3) Management Plane (מישור הניהול) - ממשקי הניהול גישת מנהלים ישירות (SSH, Telnet, HTTP).',
    hint: 'בכלי מסורתי, המוח הניהולי מחולק ומפושט בכל נתב בפני עצמו (מבוזר), בבקר SDN המוח מרוכז במקום אחד מרכזי בלבד.',
    additionalInfo: 'מכשירי הקצה ברשת SDN (מתגים ונתבי קצה) הופכים למעשה למכשירי שליחה פשוטים ויעילים למטרות ה-Data Plane בלבד, בעוד הבקר מתכנת אותם מרחוק.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'nf_extra_6_b',
    domain: 'network_fundamentals',
    subtopic: 'פרוטוקול UDP לעומת TCP',
    question: 'מהו ההסבר המדויק ביותר לכך שפרוטוקול UDP נבחר כפרוטוקול התעבורה (Transport) לשידורי מולטימדיה רציפים כגון VoIP, על אף היותו בלתי-אמין (Unreliable)?',
    options: [
      'מכיוון ש-UDP מכפיל את רוחב הפס הזמין לשיחה על ידי דחיסת נתונים מובנית.',
      'מפני של-UDP יש תקורה (Overhead) מינימלית של 8 בתים בלבד בכותרת, והוא אינו מבצע שידור חוזר של חבילות שאבדו או מנגנוני לחיצת יד, דבר המונע השהיות (Jitter & Latency) שנגרמות משידור חוזר ב-TCP.',
      'היות ו-UDP מחייב את המשתמש להקליד סיסמה מאובטחת לפני תחילת השיחה.',
      'מכיוון שרק UDP מאפשר חלוקת תת-רשתות לרכיבים וירטואליים.'
    ],
    correctAnswer: 1,
    explanation: 'ביישומי זמן-אמת כמו VoIP (קול על גבי רשת) ווידאו, השהיה של חבילות מידע היא קריטית בהרבה מאשר אובדן מזערי של מנות. TCP מציג תקורה גדולה (20 בתים), ומחייב שידור חוזר של חבילות שאבדו (Retransmission) ומבצע בקרת עומסים המשפיעה על קצב ההעברה. UDP מציג רק 8 בתי תקורה ומשגר את המידע ללא חיבור מוקדם (Connectionless), מה שמבטיח פעולה מהירה ונטולת השהיות של שידור חוזר.',
    hint: 'זמן-אמת דורש מינימום תקורה ואפס זמן המתנה לשידור חוזר של מידע ישן.',
    additionalInfo: 'מזעור גודל ה-Header הפיזי של UDP מסמן יתרון עצום ביציבות זרימת הנתונים ברשת WAN.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 5'
  },
  {
    id: 'nf_extra_7_b',
    domain: 'network_fundamentals',
    subtopic: 'רכיבי רשת וכבלי תקשורת',
    question: 'כיצד משפיע Duplex Mismatch (חוסר התאמה במצב הדו-כיווניות) בין שני כרטיסי רשת המחוברים ביניהם ישירות?',
    options: [
      'החיבור הפיזי ייכבה לחלוטין ולא יזוהה זרם חשמלי בכבל (Down/Down).',
      'תקשורת בסיסית ומועטה תעבור, אך ביצועי הרשת ירדו בצורה קיצונית בשל אחוזי התנגשויות (Collisions) גבוהים, שגיאות Late Collisions, והודעות שגיאה של FCS (Frame Check Sequence) בצד ה-Half-Duplex.',
      'שני כרטיסי הרשת ישתנו אוטומטית למצב Wireless ללא בעיות.',
      'הנתב הקרוב ביותר יבצע הפעלה מחדש (Reboot) אוטומטית שניה אחרי זיהוי הבעיה.'
    ],
    correctAnswer: 1,
    explanation: 'כאשר קצה אחד מוגדר כ-Full-Duplex (משדר וקולט בו-זמנית ללא חשש) והקצה השני מוגדר כ-Half-Duplex (רשאי לשדר רק כשאף אחד אחר לא משדר), נוצר ייצוג שגוי. צד ה-Full-Duplex ישדר מתי שירצה, בעוד צד ה-Half-Duplex יפרש זאת כהתנגשויות (Collisions) בעודו משדר, יזרוק את המסגרת ויגרום לשגיאות FCS גבוהות ו-Late Collisions, מה שקורע את יעילות רוחב הפס.',
    hint: 'התקשורת חצי-פועלת אך מלאת שגיאות הנגרמות עקב התנגשויות לא מתוזמנות.',
    additionalInfo: 'מנגנון Auto-Negotiation מיועד למנוע בדיוק שגיאות אלו על ידי הסכמה אוטומטית על הפרמטר הגבוה ביותר הנתמך בשני הצדדים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 2'
  },
  {
    id: 'na_extra_16_b',
    domain: 'network_access',
    subtopic: 'פרוטוקול EtherChannel',
    question: 'מהו ההבדל המרכזי בין שני מצבי הפעולה LACP: "Active" לעומת "Passive"?',
    options: [
      'מצב Active שולח הודעות LACP בצורה דינמית כדי ליזום משא ומתן להקמת ה-Channel, בעוד מצב Passive רק ממתין לקבלת הודעות LACP ואינו יוזם משא ומתן בעצמו.',
      'מצב Active מאפשר להעביר זרם PoE גבוה יותר למשתמשים, בעוד Passive סוגר את הפורטים.',
      'מצב Passive מונע מעבר של הודעות Trunking בקווים המשורשרים.',
      'מצב Active מיועד רק לסיבים אופטיים ואילו Passive לכבלי נחושת UTP.'
    ],
    correctAnswer: 0,
    explanation: 'LACP (Link Aggregation Control Protocol - IEEE 802.3ad) הוא פרוטוקול פתוח לאיחוד קווים פיזיים לערוץ לוגי אחד. מצב Active יוזם את שליחת הודעות ה-LACP ומנסה באופן פעיל להקים את החיבור הצרור. מצב Passive מגיב בלבד - אם הקצה השני הוא Passive גם כן, לא תישלח אף הודעה והערוץ הלוגי לא יוקם. על כן, לפחות צד אחד חייב להיות מוגדר כ-Active (או שניהם Active).',
    hint: 'יוזם פעיל לעומת משיב סביל הממתין שיפנו אליו.',
    additionalInfo: 'עבור פרוטוקול PAgP הקנייני של סיסקו, שני המצבים המקבילים זוכים לשמות "Desirable" (מקביל ל-Active) ו-"Auto" (מקביל ל-Passive).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 10'
  },
  {
    id: 'nf_extra_8_b',
    domain: 'network_fundamentals',
    subtopic: 'כתובות IPv6',
    question: 'מהו הקידומת (Prefix) המשמשת עבור כתובות Solicited-Node Multicast בפרוטוקול IPv6?',
    options: [
      'FF02::1:FF00:0/104',
      'FE80::/10',
      'FF01::/16',
      'FD00::/8'
    ],
    correctAnswer: 0,
    explanation: 'כתובות Solicited-Node Multicast ב-IPv6 משתמשות תמיד בקידומת FF02:0:0:0:0:1:FF00::/104, אשר נרשמת בקיצור בתור FF02::1:FF00:0/104. כתובת זו נוצרת אוטומטית על ידי שימוש ב-24 הביטים האחרונים של כתובת ה-IPv6 של המארח (Unicast/Link-Local) ומיועדת לצמצם את זיהוי השכנים (Neighbor Discovery) לתווח מצומצם במקום שליחת Broadcast.',
    hint: 'כתובת זו מתחילה ב-FF02 ומסתיימת במבנה קבוע הכולל את הערך FF00.',
    additionalInfo: 'פרוטוקול NDP (Neighbor Discovery Protocol) עושה שימוש נרחב בכתובת זו על מנת להחליף את פונקציות ה-ARP של עולם ה-IPv4.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 22'
  },
  {
    id: 'na_extra_17',
    domain: 'network_access',
    subtopic: 'Spanning Tree Protocol (STP)',
    question: 'כיצד מורכב מזהה הגשר (Bridge ID) בפרוטוקול PVST+ של סיסקו?',
    options: [
      'הוא מורכב מ-32 ביטים של עדיפות (Priority) ו-32 ביטים של כתובת IP.',
      'מערכת עדיפות בת 2 בתים (המורכבת מ-4 ביטים לעדיפות הגשר ו-12 ביטים למזהה המערכת המיועד עבור ה-VLAN ID) וכתובת ה-MAC בת 6 הבתים של המתג.',
      'מזהה המיוצר מכתובות ה-IPv6 של שני הנתבים המובילים ברשת.',
      'מזהה המורכב ממספר הערוצים הפיזיים המוגדרים בפרוטוקול LACP.'
    ],
    correctAnswer: 1,
    explanation: 'בגרסאות PVST+ של STP, מזהה הגשר (Bridge ID) הותאם לתמיכה ברשתות VLAN מרובות. ה-Bridge Priority בן 16 הביטים פוצל: 4 ביטים משמשים לעדיפות מוגדרת המשתנה בקפיצות של 4096 (Bridge Priority), המדדים הנוספים של 12 הביטים נקראים Extended System ID ומשמשים לזיהוי מספר ה-VLAN, ו-48 הביטים הבאים מוקדשים לכתובת ה-MAC הפיזית הבלעדית של המתג.',
    hint: 'ה-ID משלב את עדיפות המתג הבסיסית (Priority), את מזהה ה-VLAN, ולבסוף את כתובת ה-MAC שלו.',
    additionalInfo: 'ערך ה-Priority ברירת המחדל הוא 32768. אם VLAN הוא 10, ה-ID הבסיסי לעדיפות יהיה 32778.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 11'
  },
  {
    id: 'na_extra_18',
    domain: 'network_access',
    subtopic: 'ארכיטקטורת רשת אלחוטית (WLAN)',
    question: 'על פי ארכיטקטורת ה-Split-MAC בניהול בקר מרכזי (WLC), אילו תפקודים מבוצעים ישירות על ה-Lightweight Access Point (LAP)?',
    options: [
      'ניהול משתמשים מאובטחים, סינון קבצים, והנפקת פוליסות QoS.',
      'הודעות Beacons ופקודות Probe Response בזמן אמת, אישורי קבלת הודעות (Frame ACKs), הצפנת המקטע האלחוטי ושליחת מדדים.',
      'תרגום NAT ובקשת כתובת השרת ממובילי ה-DNS.',
      'אין לה תפקידים פנימיים והיא משמשת כמתג Layer 3 בלבד.'
    ],
    correctAnswer: 1,
    explanation: 'בארכיטקטורת Split-MAC, תפקידי ה-MAC מחולקים בין ה-WLC לבין ה-LAP השולח דרך תעלת CAPWAP. המשימות השייכות לפורמט הפיזי והזמן האמת (Real-time 802.11) כגון משלוח Beacons, מענה Probe, הצפנת המקטע האלחוטי ברמה הפיזית ומנגנון ה-acknowledgements של שכבת ה-MAC מנוהלים עצמאית על ה-LAP. משימות הניהול הכבדות כמו שיוך משתמשים (Associations), אימות (Authentication) וסנכרון תדרים של הבקר קורות ב-WLC.',
    hint: 'משימות ה-WiFi הפיזיות והמענה המהיר צריכים להיעשות ישירות על המכשיר האלחוטי, בעוד השכל הניהולי מרוחק.',
    additionalInfo: 'קווים אלו מתואמים על גבי תעלת CAPWAP (תעלת בקרה מבוססת UDP 5246 ותעלת נתונים מבוססת DHCP/UDP 5247).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 27'
  },
  {
    id: 'ic_extra_7_b',
    domain: 'ip_connectivity',
    subtopic: 'התכנסות OSPF',
    question: 'מתי מגיעים שני נתבים המריצים OSPF במקטע ישיר לרמה של "Full Neighbor State"?',
    options: [
      'ברגע שהם מתחים את תווך ה-Trunk.',
      'כאשר הם מסיימים להחליף את כל הודעות ה-DBD ומשלימים את סנכרון בסיסי הנתונים של מצב הקישור (LSDB) שלהם באופן מלא.',
      'לאחר הגדרת כתובת Static Route קבועה המקשרת ביניהם.',
      'מיד לאחר משלוח הודעת ה-Hello הראשונה ברשת.'
    ],
    correctAnswer: 1,
    explanation: 'הקמת שכנות OSPF עוברת מספר שלבים: Down, Init, 2-Way (שלב שבו נבחרים DR/BDR ברשת מרובת-גישה), ExStart, Exchange, Loading (החלפת הודעות LSR ו-LSU), ולבסוף FULL. מצב FULL מעיד כי שני הצדדים ביצעו סנכרון מוחלט של מסדי המידע (Link-State Database - LSDB) והנתונים זהים לחלוטין.',
    hint: 'סנכרון מלא של הידע והטופולוגיה ברמת הרשת הלוגית.',
    additionalInfo: 'ברשתות Multi-access, נתבים רגילים (DROTHERs) מגיעים למצב FULL רק מול ה-DR וה-BDR, בעוד מול שאר הנתבים השכנות נעצרת במצב 2-Way.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'ic_extra_8_b',
    domain: 'ip_connectivity',
    subtopic: 'תהליך בחירת נתיבים (Routing Decision)',
    question: 'אם לנתב קיימים שלושה נתיבים שונים המיועדים לאותו מחשב יעד ברשת, מהי הדירקטיבה והקריטריון הראשון שהוא יבחן על מנת לקבוע איזה נתיב יבחר בפועל להזרמת המידע?',
    options: [
      'העדיפות המוגדרת למערכת ה-Administrative Distance (AD).',
      'אורך התאמת הקידומת הגבוה ביותר (Longest Prefix Match - CIDR/Subnet Length).',
      'המטריקה הטובה ביותר שחושבה ע"י פרוטוקול הניתוב OSPF.',
      'רוחב הפס הפיזי הקיים בממשק היציאה.'
    ],
    correctAnswer: 1,
    explanation: 'הקריטריון הראשון והמוחלט עבור נתבים בקבלת החלטת ניתוב הוא התאמת הקידומת הארוכה ביותר (Longest Prefix Match). למשל: נתיב של /28 תמיד ינצח נתיב של /24 עבור יעד ספציפי, ללא קשר ל-AD או למטריקה. רק כאשר קיים שוויון מוחלט במספר הביטים של שיעור המסילה, הנתב יעבור להשוות את ה-Administrative Distance (AD) של הפרוטוקולים.',
    hint: 'הנתב מחפש את הנתיב הספציפי והמדויק ביותר (זה שיש לו את מסכת הרשת הארוכה ביותר).',
    additionalInfo: 'אם יש התאמה מלאה של אותה מסכת רשת דרך מקורות שונים, משווים AD. אם גם AD שווה (למשל שני נתיבים דרך OSPF), המטריקה תקבע.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 14'
  },
  {
    id: 'ic_extra_9_b',
    domain: 'ip_connectivity',
    subtopic: 'קביעת ה-Router ID ב-OSPF',
    question: 'מהו סדר העדיפויות שעל פיו בוחר נתב סיסקו את מזהה הנתב (Router ID) שלו לשימוש בפרוטוקול OSPF?',
    options: [
      '1. מספר ה-IP של הפורט הפיזי הנמוך ביותר. 2. ה-MAC הכללי של המכשיר. 3. העלות המטרית.',
      '1. המזהה שהוגדר ידנית ע"י מנהל הרשת (router-id command). 2. הכתובת הגבוהה ביותר מבין ממשקי ה-Loopback הווירטואליים הפעילים. 3. הכתובת הגבוהה ביותר מבין ממשקי הרשת הפיזיים הפעילים.',
      '1. המזהה האוטומטי שמתקבל מהבקר הראשי. 2. קידומת ה-IPv6 הלוקאלית. 3. מזהה ה-VLAN.',
      'המזהה נקבע אקראית בכל הפעלה מחדש של הנתב.'
    ],
    correctAnswer: 1,
    explanation: 'OSPF מזהה כל נתב בעזרת ערך 32-ביט הנקרא Router ID. סדר הבחירה הוא: ראשית, אם קיים ערך מוגדר מפורשות תחת פקודת הניתוב router-id, זהו המרכיב הראשי. שנית, אם לא הוגדר כזה, הנתב לוקח את ה-IPv4 הגבוה ביותר מבין ממשקי ה-Loopback. שלישית, ללא Loopback, הנתב ייקח את ה-IPv4 הגבוה ביותר מבין הממשקים הפיזיים הפעילים בעת עליית התהליך.',
    hint: 'ידני תמיד מנצח, ואז ממשק לופבק (Loopback) ורק לבסוף ממשק פיזי פשוט.',
    additionalInfo: 'שינוי ה-Router ID מאוחר יותר מחייב שימוש בפקודה "clear ip ospf process" על מנת לאתחל את בחירתו מחדש.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 19'
  },
  {
    id: 'is_extra_7_b',
    domain: 'ip_services',
    subtopic: 'פרוטוקול NTP ומערך Stratum',
    question: 'מה מסמלת רמת ה-Stratum בפרוטוקול NTP (Network Time Protocol)?',
    options: [
      'את רמת האבטחה וההצפנה של מחזור השעון ברשת.',
      'המרחק ההיררכי של שרת הזמן הנוכחי משעון הייחוס הראשוני והמדויק ביותר (כגון שעון אטומי או GPS, המוגדר כ-Stratum 0).',
      'את מספר הנכסים (Hosts) המחוברים בו זמנית ורשאים לשאוב הגדרות זמן.',
      'את מהירות החיבור של שרת הניתוב של סיסקו.'
    ],
    correctAnswer: 1,
    explanation: 'מערך ה-Stratum מציג את הדיוק והמרחק ההיררכי של שרת NTP משעון הייחוס האטומי/לווייני המקומי (Stratum 0). שרת שמחובר ישירות לשעון המדויק מוגדר כ-Stratum 1. שרתי זמן ששואבים נתונים ממנו מקבלים רמת Stratum 2 וכך הלאה עד לרמת 15 (רמה 16 מסמלת חוסר סנכרון לחלוטין).',
    hint: 'ככל שערך ה-Stratum נמוך יותר, כך מקור הזמן קרוב יותר לשעון הראשי המקורי והוא נחשב למדוייק ואמין יותר.',
    additionalInfo: 'נתבי סיסקו יכולים לפעול כלקוחות NTP וכשרתי NTP עבור הרשת הארגונית בו-זמנית.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 10'
  },
  {
    id: 'is_extra_8_b',
    domain: 'ip_services',
    subtopic: 'הודעות רישום מערכת (Syslog)',
    question: 'איזה ערך חומרה ורמת חומרה (Severity Level) משויכת להודעות Syslog מסוג "Error" בנתבי סיסקו?',
    options: [
      'רמת חומרה level 7 (Debug)',
      'רמת חומרה level 3 (Error)',
      'רמת חומרה level 0 (Emergency)',
      'רמת חומרה level 5 (Notification)'
    ],
    correctAnswer: 1,
    explanation: 'פרוטוקול Syslog בנתבי סיסקו מחלק את ההודעות ל-8 דרגות חומרה משלימות, מ-0 ועד 7: 0 - Emergency (המערכת אינה שמישה), 1 - Alert (פעולה דחופה נדרשת), 2 - Critical (קריטי), 3 - Error (שגיאה), 4 - Warning (אזהרה), 5 - Notice (הודעה נורמלית אך מהותית), 6 - Informational (מידע), 7 - Debug (ניתוח ועזרים).',
    hint: 'המדדים הולכים מ-0 (הכי חמור) ל-7 (רק בדיקה). שגיאה (Error) נמצאת ברמה 3.',
    additionalInfo: 'ניתן לזכור את הרמות באמצעות הביטוי המפורסם: "Every Awesome Cisco Engineer Will Need Icecream Daily" המקביל לראשי התיבות של שמות הרמות.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 11'
  },
  {
    id: 'is_extra_9_b',
    domain: 'ip_services',
    subtopic: 'סיוע DHCP (DHCP Relay Agent)',
    question: 'איזו פקודת Cisco IOS יש להגדיר על ממשק המבואה (Interface) של נתב סיסקו המשמש כשער ברירת המחדל (Default Gateway) של המחשבים על מנת לנתב בקשות שידור DHCP (DHCP Discovery Broadcast) אל שרת DHCP הנמצא בתת-רשת אחרת?',
    options: [
      'ip dsf-helper service',
      'ip helper-address <DHCP_server_IP>',
      'service dhcp relay-enable',
      'ip dhcp pool local_network'
    ],
    correctAnswer: 1,
    explanation: 'מחשבי קצה משדרים הודעת DHCP Discover כהודעת Broadcast מקומית (Layer 2). כיוון שנתבים אינם מעבירים הודעות Broadcast אל מחוץ לתת-הרשת (הם תוחמים את ה-Broadcast), הבקשה תיעצר. באמצעות הפקודה "ip helper-address" על הממשק הפיזי או ה-SVI המקומי של הנתב, הנתב לוקח את הודעת ה-Broadcast הזו, הופך אותה ל-Unicast ומפנה אותה ישירות אל כתובת ה-IP המוגדרת של שרת ה-DHCP המרוחק (תוך ציון ה-IP שלו כזה שהגיע ממנו על מנת שהשרת יבין מאיזה תת-رשת לחלק כתובת).',
    hint: 'עוזר רשת המסוגל להמיר שידורי Broadcast ל-Unicast לקראת שרת מרוחק.',
    additionalInfo: 'פקודה זו שימושית מאוד לא רק עבור DHCP (פורט 67 ו-68) אלא גם לעוד פרוטוקולי זיהוי מבוססי UDP המועברים בפורמט זה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 10'
  },
  {
    id: 'sf_extra_7',
    domain: 'security_fundamentals',
    subtopic: 'ארכיטקטורת AAA',
    question: 'מהו תפקידו הבלעדי של הנדבך השני "Authorization" (הרשאה) במסגרת הגדרת ה-AAA (Authentication, Authorization, Accounting) ברשת?',
    options: [
      'ווידוא זהות המשתמש באמצעות שם וסיסמה או תעודה דינמית.',
      'קביעת סוגי הפעולות, הגישות והפקודות הספציפיות שמותר ליוזר שכבר זוהה ואומת לבצע במכשירים.',
      'מעקב, איסוף ורישום של הפעולות שבוצעו ומשך זמן החיבור לצורך בקרה וביקורת.',
      'הצפנת תנועת המידע של שיחות המשתמשים ברכזת.'
    ],
    correctAnswer: 1,
    explanation: 'רכיב ה-AAA מורכב משלושה נושאים: 1) Authentication - זיהוי ואיתור המשתמש (מי אתה?), 2) Authorization - הרשאות וקביעת גבולות פעולה (מה מותר לך לעשות ולאילו פקודות/משאבים יש לך אישור גישה), 3) Accounting - בקרה ותיעוד פעולות (מה עשית בפועל וכמה זמן וכסף זה דרש).',
    hint: 'ניהול ההרשאות הפנימיות לביצוע משימות לאחר שזיהינו את הבן-אדם.',
    additionalInfo: 'ניתן ליישם AAA באופן מקומי (Local databases) או בעזרת שרתי בקרה חיצוניים המשתמשים בפרוטוקולי TACACS+ או RADIUS.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 4'
  },
  {
    id: 'sf_extra_8',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת WiFi (WPA3)',
    question: 'איזה מנגנון אימות והחלפת מפתחות יסודי הוצג ב-WPA3 על מנת להחליף את שיטת ה-Pre-Shared Key (PSK) והלחיצה המרובעת של WPA2?',
    options: [
      'AES-CCMP בלבד ללא הצפנת תנועה.',
      'SAE - Simultaneous Authentication of Equals (הידוע כמנגנון Dragonfly Handshake המחסן מפני התקפות מילון מקוונות ואופליין).',
      'פרוטוקול WEP המשתמש במפתחות סטטיים ארוכים.',
      'מנגנון IPSec VPN המונה ערוצי גיבוי קבועים.'
    ],
    correctAnswer: 1,
    explanation: 'WPA3 משפר את אבטחת הרשת הביתית/הארגונית על ידי הצגת SAE (Simultaneous Authentication of Equals). מנגנון זה מגן על הרשת מפני התקפות ניחוש סיסמאות פסיביות ומניעת שליפת המזהים מהאוויר לפענוח אופליין (Offline Dictionary attacks), אפילו כאשר הסיסמה פשוטה יחסית.',
    hint: 'שכבות של אימות והשוואה שוות בו זמנית (המכונה גם לחיצת יד שפירית - Dragonfly).',
    additionalInfo: 'סעיף זה פותר גם את מבוכת תעבורת ה-WiFi הציבורית הלא מוצפנת בעזרת הרחבה הנקראת Enhanced Open.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 28'
  },
  {
    id: 'sf_extra_9',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת יציאות מתג (Port Security)',
    question: 'מהו מצב הטיפול בפרצות כברירת מחדל (Default Violation Mode) כאשר מגדירים Port Security על פורט גישה של מתג סיסקו?',
    options: [
      'Protect - חסימת מכשיר זר ללא דיווח כלל.',
      'Shutdown - סגירת היציאה באופן פיזי והשמתה בסטטוס err-disabled, משלוחSyslog, והעלאת מונה ההתרעות.',
      'Restrict - מניעת מעבר החבילות, אך הפורט נשאר פעיל ונשלחת התרעת אזהרה SNMP.',
      'Bypass - התעלמות מהגדרת האבטחה וחסימה זמנית.'
    ],
    correctAnswer: 1,
    explanation: 'מצבי ההפרה (Violation Modes) של Port Security הם: Shutdown (ברירת מחדל - מכבה את הפורט ומכניס ל-err-disabled, מודיע ללוגים ומעלה מונה חומרה), Restrict (משליך חבילות של כתובות MAC זרות אך הפורט פעיל עבור מותרים, שולח לוגים/SNMP ומעלה מונה), ו-Protect (משליך חבילות בשקט ללא שום מונה או דיווח).',
    hint: 'ברירת המחדל הקשוחה ביותר של סיסקו שמכבה את הפורט לחלוטין.',
    additionalInfo: 'מנהל רשת נדרש לבצע "shutdown" ואז "no shutdown" על מנת להחזיר את הפורט לפעילות.',
    difficulty: 'קל',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 5'
  },
  {
    id: 'sf_extra_10',
    domain: 'security_fundamentals',
    subtopic: 'פרוטוקול אבטחת מידה VPN (IPsec)',
    question: 'איזה רכיב ופרוטוקול בתוך ארכיטקטורת ה-IPsec VPN אחראי על הצפנת המטענים ומתן סודיות (Confidentiality & Encryption) לתעבורה הארגונית מקצה לקצה?',
    options: [
      'AH - Authentication Header',
      'ESP - Encapsulating Security Payload',
      'fhrp protocols',
      'STP Spanning Tree'
    ],
    correctAnswer: 1,
    explanation: 'בתוך פרוטווקול IPsec, שני פרוטוקולים מרכזיים משמשים לאריזת המידע: 1) AH - מספק אימות, שלמות והגנה מפני שיחזור אך אינו מספק הצפנה כלל! (של שדות המטענים). 2) ESP (Encapsulating Security Payload - IP protocol 50) מספק גם אימות ושלמות וחשוב מכל - הצפנה קשוחה של כל הנתונים, המבטיחה סודיות מוחלטת.',
    hint: 'הפרוטוקול שעוטף את המידע ומציע סודיות והצפנה במעטפת אחת.',
    additionalInfo: 'ההתקנה הארגונית משתמשת כמעט תמיד ב-ESP במצב Tunnel Mode על מנת לשגר נתונים מוצפנים דרך האינטרנט.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 8'
  },
  {
    id: 'ap_extra_16',
    domain: 'automation_programmability',
    subtopic: 'חוקי תחביר JSON',
    question: 'איזה מהמקטעים הבאים מהווה מבנה JSON תקין ומדויק על פי הגדרות ה-Syntax הרשמיות?',
    options: [
      '{ interface: "Gig1", status: "up" }',
      '{ "interface": "Gig1", "status": "up", "vlans": [10, 20] }',
      '[ "interface" = "Gig1" ; "status" = "up" ]',
      '{"interface"; "Gig1", status; "up"}'
    ],
    correctAnswer: 1,
    explanation: 'חוקי JSON (JavaScript Object Notation) הם קפדניים ביותר: 1) כל המפתחות (Keys) והערכים מסוג מחרוזת (Strings) חייבים להיות מוקפים במרכאות כפולות בלבד (" ולא \'). 2) שימוש בנקודתיים (:) להפרדה בין מפתח לערך. 3) פסיקים משמשים בין שדות שונים. 4) סוגריים מסולסלים {} לעטיפת אובייקט, סוגריים מרובעים [] לרשימה/מערך.',
    hint: 'שים לב לשימוש במרכאות כפולות מסביב לשמות המפתחות והערכים בשפות האוטומציה.',
    additionalInfo: 'הודעות שגיאה רבות של API נובעות מבעיות של חוסר במרכאות כפולות סביב המפתחות הלוגיים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 15'
  },
  {
    id: 'ap_extra_17',
    domain: 'automation_programmability',
    subtopic: 'ממשקי בקר רשת (APIs)',
    question: 'מהו ההבדל המהותי בפעולת הבקר (SDN Controller) בין ממשק Northbound API לבין ממשק Southbound API?',
    options: [
      'Northbound API מנהל את אספקת החשמל לרכזת, בעוד Southbound API שולח איפולסים אלחוטיים.',
      'Northbound APIs פונים כלפי מעלה ומאפשרים לתוכנות, ממשקי יישומים, וסקריפטים להתממשק עם הבקר ולשלוח אליו פקודות; Southbound APIs פונים כלפי מטה ומשמשים את הבקר כדי לתכנת ולנהל ישירות את מכשירי הרשת הפיזיים (נתבים ומתגים) באמצעות פרוטוקולים כמו OpenFlow או NETCONF.',
      'שניהם מבצעים בדיוק את אותה עבודה מול המשתמש וכבר אינם מנוצלים כיום מרחוק.',
      'Southbound API מיועד רק לקריאת ה-MAC במתגי החברה.'
    ],
    correctAnswer: 1,
    explanation: 'בבקר רשת SDN: 1) Southbound APIs - ממשקים שהבקר מנצל על מנת לדבר "כלפי מטה" עם הנתבים והמתגים כדי להגדיר אותם (למשל: OpenFlow, NETCONF, RESTCONF, SNMP). 2) Northbound APIs - ממשקים שהבקר חושף "כלפי מעלה" על מנת שלוחות עבודה, כללי תצורה או יישומי ניהול ארגוניים יוכלו לדבר עם הבקר ולקבל כוח ללא צורך לדעת איך בנוי מתג ומתג פיזי.',
    hint: 'למעלה אל התוכנה והאוטומציה, למטה אל רכיבי החומרה הפיזיים והגדרתם.',
    additionalInfo: 'ממשקי Northbound מבוססים כמעט תמיד על REST APIs ופרוטוקול HTTP לצורך גמישות מרבית.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 16'
  },
  {
    id: 'ap_extra_18',
    domain: 'automation_programmability',
    subtopic: 'ניהול תצורה אוטומטי (Ansible)',
    question: 'מהו המאפיין הייחודי של כלי האוטומציה Ansible המבדיל אותו מכלים כמו Puppet ו-Chef מבחינת הצורך בסוכנים (Agents)?',
    options: [
      'הוא מחייב התקנת סוכן תוכנה מבוסס Java על כל נתב ומתג.',
      'הוא כלי מסוג Agentless (אינו מחייב התקנת סוכן תוכנה על מכשיר היעד), ומבצע את כל הגדרות העבודה מרחוק על גבי פרוטוקול SSH (או ממשקי API).',
      'הוא מיועד רק לניהול שרתי Windows פנימיים ונתבים ללא חיבור לאינטרנט.',
      'שהוא עובד עם קבצי קונפיגורציה בפורמט HTML ישן.'
    ],
    correctAnswer: 1,
    explanation: 'Ansible הוא כלי Agentless פופולרי שכבש את עולם ה-DevOps והאוטומציה של Cisco. מנוע הניהול (Control Node) אינו דורש סוכן ייעודי (Agent) שירוץ ברקע המכשירים המנוהלים. במקום זאת, הוא יוצר קשר ישיר, שולח את הפקודות ב-SSH, ומבצע אתחול מהיר של סקריפט התצורה באמצעות קבצי YAML קריאים (הנקראים Playbooks).',
    hint: 'אין צורך להתקין אף קליינט או תוכנה זרה על גבי הנתב המנוהל (פועל ללא סוכן).',
    additionalInfo: 'Puppet ו-Chef פועלים בעיקרון בארכיטקטורת Pull מבוססת סוכן המותקן במכשירי הקצה.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18'
  },
  {
    id: 'nf_extra_9_b',
    domain: 'network_fundamentals',
    subtopic: 'וירטואליזציה (Virtualization)',
    question: 'מהו ההבדל המהותי בפעולת ה-Hypervisor בין Type 1 (Bare-Metal) לבין Type 2 (Hosted)?',
    options: [
      'Type 1 מנוהל אך ורק מענן חיצוני ו-Type 2 הוא חומרה בלבד.',
      'Type 1 (Bare-metal) מותקן ישירות על גבי החומרה הפיזית ללא צורך במערכת הפעלה מארחת; בעוד Type 2 (Hosted) מורץ כאפליקציה בתוך מערכת הפעלה קיימת ומנצל את משאביה.',
      'אין הבדל ביניהם ושניהם פותחו במיוחד עבור סאבנטינג מהיר ברמת המכשיר.',
      'Type 2 פועל ללא חיבור לחשמל בעזרת סוללת גיבוי מיוחדת.'
    ],
    correctAnswer: 1,
    explanation: 'הייפרוויזר (Hypervisor-מנהל המכונות הווירטואליות) מחולק לשניים: Type 1 מותקן ישירות על החומרה "החשופה" (ESXi, Hyper-V בארגונים), מה שמאפשר מהירות ויעילות קיצונית. Type 2 מותקן כתוכנה מעל מערכת הפעלה קיימת כמו Windows/macOS (כגון VirtualBox, VMware Workstation) ומיועד למפתחים במחשבים אישיים.',
    hint: 'ישירות על הברזלים (Bare-metal) לעומת תוכנה המתארחת מעל מערכת הפעלה קיימת (Hosted).',
    additionalInfo: 'מערכות דאטה-סנטר ארגוניות מבוססות ב-99% מהמקרים על Type 1 Hypervisors לצורך ביצועים מקסימליים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 25'
  },
  {
    id: 'na_extra_19',
    domain: 'network_access',
    subtopic: 'פעולת המתג (Switching Process)',
    question: 'באילו תנאים יבצע מתג (Switch Layer 2) את פעולת ה-Flooding (הזרמת Frame מכל הפורטים השייכים לאותו VLAN חוץ מהפורט שממנו נכנס ה-Frame)?',
    options: [
      'רק כאשר פורט היעד נחסם פיזית על ידי תוכנת ה-STP.',
      'כאשר כתובת היעד ב-Frame היא כתובת Broadcast (FF:FF:FF:FF:FF:FF), או כתובת Multicast, או כתובת Unicast שאינה קיימת כלל בטבלת ה-MAC (Unknown Unicast Frame).',
      'ברגע שמחשב הקצה מתחיל להריץ בקשות DHCP Relaying ברשת.',
      'כאשר המתג מזהה שימוש במסכת רשת גדולה מ-/24.'
    ],
    correctAnswer: 1,
    explanation: 'פעולת Flooding מבוצעת על ידי המתג בשלושה מקרים: 1) Broadcast Frames (הודעות לכולם), 2) Multicast Frames (הודעות לקבוצה), 3) Unknown Unicast Frames - הודעה המופנית לכתובת פיזית ספציפית, אך זוהי כתובת שהמתג עדיין לא למד את מיקומה (לא קיימת רשומה בטבלת ה-MAC שלו). המתג מציף את החבילה כיוון שאין לו דרך לדעת היכן היעד נמצא.',
    hint: 'מטרת ההצפה היא להבטיח שהמידע יגיע ליעדו גם אם איננו יודעים כרגע היכן הוא מחובר.',
    additionalInfo: 'קבלת המענה מצד המחשב המבוקש תאפשר למתג ללמוד מיד את ה-Port שלו ולהכניסו לטבלת ה-MAC, כך שההודעות הבאות יישלחו אליו ישירות (Unicast Filtered).',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 6'
  },
  {
    id: 'ic_extra_10_b',
    domain: 'ip_connectivity',
    subtopic: 'Floating Static Route',
    question: 'מהי כתובת ניתוב סטטית צפה (Floating Static Route), וכיצד מגדירים אותה במערכת Cisco IOS?',
    options: [
      'היא כתובת שמישת NAT המשתנה אוטומטית בכל עשר דקות.',
      'היא נתיב סטטי המשמש כגיבוי בעל Administrative Distance (AD) גבוה יותר מאשר ה-AD של הניתוב הדינמי הראשי (למשל, הגדרת נתיב סטטי עם AD 120 לגיבוי OSPF בעל AD 110).',
      'היא מסכת רשת וירטואלית עבור קבוצות ה-WLC.',
      'היא פקודה מבוססת DNS המיועדת להצפנת הנתבים קצה.'
    ],
    correctAnswer: 1,
    explanation: 'Floating Static Route הוא נתיב סטטי המוגדר לצרכי גיבוי (Back-up). כותבים את הפקודה ip route 0.0.0.0 0.0.0.0 <Next-Hop> ובסופה מוסיפים מספר לקביעת ה-AD (למשל: 120). כיוון שברירת המחדל של OSPF היא 110, הנתב לא ישתמש בנתיב הסטטי המגובה הזה אלא אם OSPF יתרסק ויפול, אז ה-AD של 110 יעלם והנתיב של 120 "יצוף" וייכנס לטבלת הניתוב לפעילות מיידית.',
    hint: 'נתיב הסטטי הופך לסביל וממתין שיפנו אליו רק כשהנתיב המרכזי נופל, הודות להגדלת מרחק ה-AD שלו.',
    additionalInfo: 'זו דרך נפוצה ופשוטה מאוד לגבות קווי תקשורת יקרים ללא מנגנון OSPF או פרוטוקולים מורכבים בקווי משתמש זולים.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 16'
  },
  {
    id: 'is_extra_10_b',
    domain: 'ip_services',
    subtopic: 'פרוטוקול SNMP',
    question: 'מהו תפקידה של הודעת SNMP "Trap" בפרוטוקול ניהול רשתות (Simple Network Management Protocol)?',
    options: [
      'זהו קובץ התקנה חיוני עבור מתגי ה-Layer 2.',
      'הודעה בלתי-צפויה ויוצאת דופן הנשלחת מהסוכן (Agent) במכשיר המנוהל אל שרת הניהול הראשי (NMS) על מנת לדווח על אירוע קריטי או תקלה באופן מיידי, ללא המתנה לפניות מצד השרת.',
      'פקודת נעילה של כרטיסי הרשת במקרה של הצפת Broadcast.',
      'מנגנון לחישוב המטריקות של פרוטוקולי הניתוב OSPF.'
    ],
    correctAnswer: 1,
    explanation: 'במערך ה-SNMP, רוב הפעילות מבוססת על בדיקות שגרתיות של השרת הראשי (NMS) מול המכשירים (Polling). עם זאת, כשקורה מקרה דחוף (כמו קצר במתג, ספק כוח שקרס, פורט קבוע שירד או טמפרטורה גבוהה), המתג אינו מחכה לפולינג. הוא שולח הודעת SNMP Trap מהירה המדווחת לשרת הניהול על הבעיה בשבריר שנייה.',
    hint: 'דיווח חירום מיידי שנשלח מלמטה למעלה בעת זיהוי תקלות חומרה.',
    additionalInfo: 'הודעות Trap נשלחות דרך פרוטוקול UDP בפורט 162, בהשוואה לבדיקות polling רגילות המבוצעות בפורט UDP 161.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 12'
  },
  {
    id: 'sf_extra_11',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת IP (Dynamic ARP Inspection)',
    question: 'על איזה בסיס נתונים (Database) מסתמך מנגנון Dynamic ARP Inspection (DAI) על מנת לאמת את כתובות ה-IP וה-MAC הפיזיות של החבילות ולמנוע התקפות ARP Poisoning?',
    options: [
      'על טבלת ה-VLAN הווירטואלית במכשיר.',
      'על טבלת הרישומים (Bindings) של מנגנון ה-DHCP Snooping המציגה הצלבה של MAC, IP ויציאה פיזית.',
      'על מסדי הנתונים של פרוטוקול הניתוב OSPF (LSDB).',
      'על פי עדיפויות ה-Bridge ID של פרוטוקול Spanning Tree.'
    ],
    correctAnswer: 1,
    explanation: 'Dynamic ARP Inspection (DAI) הוא מנגנון אבטחה בשכבה 2 המונע התקפות Man-in-the-Middle המבוססות על זיוף ARP (ARP Spoofing/Poisoning). כאשר מכשיר שולח מענה ARP, המתג בודק את טבלת הקישורים שיוצרה על ידי ה-DHCP Snooping - אבטחה המאשרת אילו כתובות IP שייכות פיזית לכל MAC ובאיזה פורט. חבילות שיוצאות עם נתונים סותרים או לא קיימים מושלכות מיידית מהרשת.',
    hint: 'מנגנון ה-DAI משתמש בטבלת היציבות המופקת על ידי הבדיקה השכנה של חבילת כתובות ה-DH Snooping.',
    additionalInfo: 'ניתן לשלב גם הגדרת ARP ACLs ידנית עבור שרתים או התקנים בעלי כתובות IP סטטיות קבועות שאינם פועלים מול DHCP.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 6'
  },
  {
    id: 'ap_extra_19',
    domain: 'automation_programmability',
    subtopic: 'כלי ניהול קונפיגורציה (Puppet vs Chef)',
    question: 'מהו ההסדר הארכיטקטוני הראשי המאפיין את כלי ניהול התצורה Puppet לעומת Chef מבחינת קוד השימוש הגלובלי?',
    options: [
      'שניהם אינם תומכים בכלל בכתיבה ב-Ruby ופועלים על גבי שורות פקודה של ה-CLI בלבד.',
      'Puppet מבוסס על שפה ייעודית הצהרתית (Declarative Domain-Specific Language - DSL) שבה מתארים "מה המצב הרצוי שיהיה", בעוד Chef משתמש בגישה פרוגרסיבית תהליכית (Imperative/Procedural) המבוססת על שפת Ruby, שבה מפרטים במדויק "איך לבנות את הצעדים" באמצעות רשומות המכונות Cookbooks ו-Recipes.',
      'Puppet דורש חיבור סיב אופטי בלעדי לתפקוד השרת.',
      'אין קשר ביניהם ושניהם פותחו על ידי מהנדסי מערכות נבחרים של חברת Cisco.'
    ],
    correctAnswer: 1,
    explanation: 'בעולם תוכנות ניהול התצורה (Configuration Management): Puppet מפרט רעיונות בתוכניות המגדירות את "מצב היעד הסופי" (Declarative-הצהרתי), ומנוע הניהול מחליט לבד איך להגיע אליו. לעומת זאת, Chef פועל בשיטה פרוצדורלית תהליכית (Procedural/Imperative) ובשפת Ruby חיה, שבה מנהל הרשת מתאר קוד שלם של צעד אחר צעד (Recipe) המועבר בתוך ספרים (Cookbooks) על מנת להגיע לתוצאה המקצועית.',
    hint: 'הצהרה על מה המצב הרצוי (Declarative ב-Puppet) לעומת מתכון מבוסס קוד חצי-אימפרטיבי המציין כיצד להגיע לשם (Imperative ב-Chef).',
    additionalInfo: 'שני הכלים משתמשים בדרך כלל בסכנות של סוכנים (Agents) המותקנים במכונות היעד ומבצעים משיכת קונפיגורציה מעת לעת (Pull model).',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 18'
  },
  {
    id: 'ipc_extra_20',
    domain: 'ip_connectivity',
    subtopic: 'פרוטוקול OSPF וחישוב Cost',
    question: 'כיצד מחושב ערך ה-Cost של ממשק פיזי בפרוטוקול הניתוב OSPF, וכיצד ניתן לשנות ערך זה בצורה ידנית?',
    options: [
      'מחושב לפי נוסחת 10^8 חלקי רוחב הפס של הממשק ב-bps (Reference Bandwidth / Interface Bandwidth). ניתן לשנות אותו ידנית באמצעות הפקודה ip ospf cost בממשק או על ידי שינוי רוחב הפס הייחוס (auto-cost reference-bandwidth).',
      'מחושב לפי כמות הדילוגים (Hop Count) של חבילת המידע. ניתן לשנות אותו רק על ידי שינוי ה-IP של הנתב.',
      'הוא קבוע ועומד תמיד על ערך של 1 עבור כל ממשק פיזי, ולא ניתן לשנות אותו כלל.',
      'מחושב על ידי הכפלת מהירות הפורט במספר ה-VLAN השייך אליו, באמצעות הפקודה switchport cost.'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול הניתוב OSPF משתמש במטריקה הנקראת Cost (עלות). ברירת המחדל לחישוב היא חלוקה של רוחב פס ייחוס (Reference Bandwidth של 100 Mbps או 10^8 bps) ברוחב הפס הפיזי הנוכחי של הממשק. לדוגמה, עבור Fast Ethernet (100 Mbps) ה-Cost הוא 1, ועבור Fast Ethernet ומעלה (כמו Gigabit Ethernet ו-10G) הוא נשאר 1 אלא אם כן משנים את ה-Reference Bandwidth באמצעות הפקודה "auto-cost reference-bandwidth". כמו כן, ניתן לקבוע ידנית את ה-Cost של ממשק ספציפי באמצעות הפקודה "ip ospf cost <value>" תחת תצורת הממשק.',
    hint: 'הנוסחה מבוססת על Reference Bandwidth חלקי מהירות הממשק בפועל.',
    additionalInfo: 'במערכות מודרניות מומלץ לשנות את ה-Reference Bandwidth ל-100000 (שמתאים ל-100 Gbps) כדי להבטיח הבדל משמעותי במטריקה בין ממשקי 1G, 10G ו-40G.',
    difficulty: 'קשה',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 20'
  },
  {
    id: 'na_extra_12',
    domain: 'network_access',
    subtopic: 'פורט-צ׳אנל ו-LACP',
    question: 'איזה שילוב של מצבי תצורה (Modes) יגרום למנגנון EtherChannel מבוסס LACP (IEEE 802.3ad) ליצור חיבור פעיל ותקין בין שני מתגים שונים?',
    options: [
      'מצב Active בצד אחד ומצב Passive בצד השני, או מצב Active בשני הצדדים של הקישור.',
      'מצב Auto בצד אחד ומצב Desirable בצד השני.',
      'מצב Passive בשני הצדדים של הקישור.',
      'מצב On בצד אחד ומצב Active בצד השני.'
    ],
    correctAnswer: 0,
    explanation: 'פרוטוקול LACP (Link Aggregation Control Protocol) מאפשר איחוד של מספר קישורים פיזיים לערוץ לוגי אחד (EtherChannel). הפרוטוקול מציע שני מצבים פעילים במשא ומתן: Active (יוזם משא ומתן באופן אקטיבי) ו-Passive (ממתין לקבלת בקשה מבלי ליזום). על מנת שהערוץ יתכנס ויוקם בהצלחה, לפחות אחד מהצדדים חייב להיות במצב Active. אם שני הצדדים במצב Passive, לא יתבצע משא ומתן והפורט-צ׳אנל לא יוקם. המצבים Auto ו-Desirable שייכים לפרוטוקול PAgP הקנייני של סיסקו, ומצב On אינו מריץ פרוטוקול משא ומתן דינמי כלל.',
    hint: 'לפחות צד אחד חייב להיות במצב יוזם (Active) כדי שהמשא ומתן יתחיל.',
    additionalInfo: 'קישור במצב On מכריח את הממשק לפעול כפורט-צ׳אנל ללא שליחת הודעות בקרה של LACP או PAgP, מה שעלול ליצור לולאות אם הצד השני לא מוגדר באותו אופן.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 1, Chapter 10'
  },
  {
    id: 'sf_extra_12',
    domain: 'security_fundamentals',
    subtopic: 'אבטחת רשתות אלחוטיות (WPA3)',
    question: 'מהו שיפור האבטחה המרכזי במנגנון WPA3 עבור רשתות אלחוטיות אישיות (WPA3-Personal) המונע התקפות של פענוח לא מקוון (Offline Dictionary Attacks)?',
    options: [
      'החלפת לחיצת היד הארבע-שלבית (4-Way Handshake) במנגנון אימות חזק מבוסס SAE (Simultaneous Authentication of Equals).',
      'שימוש בהצפנת WEP ישנה עם מפתח באורך 2048 סיביות.',
      'ביטול מוחלט של האפשרות להגדיר סיסמאות סטטיות במכשירים ומעבר לשרתי RADIUS בלבד.',
      'שימוש במנגנון WPS המאפשר חיבור מיידי על ידי לחיצה על כפתור פיזי בנתב.'
    ],
    correctAnswer: 0,
    explanation: 'בתקן WPA2-Personal, תוקף יכול להאזין ללחיצת היד הארבע-שלבית (4-Way Handshake) של הלקוח מול ה-AP, ללכוד אותה ולבצע התקפת מילון לא מקוונת (Offline Dictionary Attack) כדי לפענח את הסיסמה (Pre-Shared Key). תקן WPA3 פותר בעיה זו על ידי החלפת מנגנון זה בפרוטוקול SAE (Simultaneous Authentication of Equals) המבוסס על שיטת Diffie-Hellman קריפטוגרפית. SAE מחייב אינטראקציה חיה עם ה-AP עבור כל ניסיון ניחוש סיסמה, ובכך מונע לחלוטין התקפות מילון לא מקוונות על חבילות מידע שנלכדו באוויר.',
    hint: 'הפרוטוקול החדש מחליף את ה-PSK הישן בלחיצת יד מבוססת שוויון סימולטני.',
    additionalInfo: 'שיפור נוסף ב-WPA3 הוא הצפנת נתונים פרטנית (Forward Secrecy), המבטיחה שגם אם מפתח הרשת נחשף בעתיד, לא ניתן יהיה לפענח תעבורה היסטורית שהוקלטה בעבר.',
    difficulty: 'בינוני',
    references: 'Cisco CCNA Cert Guide Vol 2, Chapter 9'
  }
];




