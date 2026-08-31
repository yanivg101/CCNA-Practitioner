import { CCNAQuestion, DomainID, DifficultyLevel } from '../../types';

// Deterministic Pseudo-Random Number Generator using a simple sine-wave seed
class SeededRandom {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  next(): number {
    const x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

// Helper to convert IP to number
function ipToNum(ip: string): number {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
}

// Helper to convert number to IP
function numToIp(num: number): string {
  return [
    (num >>> 24) & 255,
    (num >>> 16) & 255,
    (num >>> 8) & 255,
    num & 255
  ].join('.');
}

// Helper to perform a robust, mathematically uniform Fisher-Yates shuffle using the seeded generator
function shuffleOptions(optionsList: string[], correctItem: string, rng: SeededRandom): { shuffled: string[], correctIdx: number } {
  const arr = [...optionsList];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = rng.nextInt(0, i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  const correctIdx = arr.indexOf(correctItem);
  return { shuffled: arr, correctIdx };
}

export function generateExtraQuestions(count: number): CCNAQuestion[] {
  const rng = new SeededRandom(20260625);
  const questions: CCNAQuestion[] = [];

  // 1. GENERATE SUBNETTING QUESTIONS (network_fundamentals)
  const subnettingCount = Math.floor(count * 0.25);
  for (let i = 0; i < subnettingCount; i++) {
    const classType = rng.pick(['A', 'B', 'C']);
    let ipOctets = [192, 168, 1, 10];
    let cidr = 24;

    if (classType === 'C') {
      ipOctets = [rng.nextInt(192, 223), rng.nextInt(0, 255), rng.nextInt(0, 255), rng.nextInt(1, 254)];
      cidr = rng.nextInt(24, 30);
    } else if (classType === 'B') {
      ipOctets = [rng.nextInt(128, 191), rng.nextInt(0, 255), rng.nextInt(1, 254), rng.nextInt(1, 254)];
      cidr = rng.nextInt(16, 23);
    } else {
      ipOctets = [rng.nextInt(10, 126), rng.nextInt(0, 255), rng.nextInt(1, 254), rng.nextInt(1, 254)];
      cidr = rng.nextInt(8, 15);
    }

    const ipStr = ipOctets.join('.');
    const ipNum = ipToNum(ipStr);
    
    // Calculate subnet math
    const maskNum = (~0 << (32 - cidr)) >>> 0;
    const netNum = (ipNum & maskNum) >>> 0;
    const size = Math.pow(2, 32 - cidr);
    const broadNum = (netNum + size - 1) >>> 0;
    const firstUsable = (netNum + 1) >>> 0;
    const lastUsable = (broadNum - 1) >>> 0;
    const usableHosts = size - 2;

    const netIp = numToIp(netNum);
    const broadIp = numToIp(broadNum);
    const firstIp = numToIp(firstUsable);
    const lastIp = numToIp(lastUsable);
    const maskIp = numToIp(maskNum);

    const questionType = rng.nextInt(1, 6);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'סאבנטינג וחישוב כתובות';

    switch (questionType) {
      case 1: // What is the Network ID?
        questionText = `נתון המארח (Host) בעל כתובת ה-IP הבאה: ${ipStr}/${cidr}. מהי כתובת הרשת (Network ID) אליה הוא שייך?`;
        correctStr = netIp;
        rawOptions = [
          netIp,
          broadIp,
          numToIp((netNum + size) >>> 0),
          numToIp((netNum - size) >>> 0)
        ];
        explanationText = `כדי למצוא את כתובת הרשת של ${ipStr}/${cidr}, נמיר את מסיכת הרשת לעשרונית: ${maskIp}. ביצוע פעולת AND לוגית בין הכתובת למסכה נותן לנו בדיוק את ה-Network ID שהוא ${netIp}. גודל הבלוק (Subnet Block Size) הוא ${size} כתובות.`;
        hintText = `כתובת הרשת היא תמיד הכתובת הראשונה בבלוק (החלק המארח בבינארית מאופס לחלוטין).`;
        break;

      case 2: // What is the Broadcast Address?
        questionText = `עבור הכתובת ${ipStr}/${cidr}, מהי כתובת השידור (Broadcast Address) של תת-הרשת (Subnet)?`;
        correctStr = broadIp;
        rawOptions = [
          broadIp,
          netIp,
          lastIp,
          numToIp((broadNum + 1) >>> 0)
        ];
        explanationText = `כתובת ה-Broadcast היא הכתובת האחרונה בטווח הכתובות של תת-הרשת. עם מסיכת רשת של /${cidr} (${maskIp}), גודל הבלוק הוא ${size} כתובות. תת-הרשת מתחילה ב-${netIp} ומסתיימת בכתובת השידור ${broadIp} (כל ביטים של המארח דולקים ל-1 בינארית).`;
        hintText = `כתובת ה-Broadcast היא הכתובת האחרונה בטווח הבלוק, אחת פחות מתת-הרשת הבאה.`;
        break;

      case 3: // What is the first usable IP?
        questionText = `מהי כתובת ה-IP השמישה הראשונה (First Usable Host IP) בתת-הרשת של ${ipStr}/${cidr}?`;
        correctStr = firstIp;
        rawOptions = [
          firstIp,
          netIp,
          numToIp((firstUsable + 1) >>> 0),
          lastIp
        ];
        explanationText = `כתובת ה-IP השמישה הראשונה למארח היא תמיד כתובת הרשת פלוס 1. מכיוון שכתובת הרשת היא ${netIp}, הכתובת הראשונה שניתן להגדיר למחשב או לממשק נתב היא ${firstIp}.`;
        hintText = `מוסיפים 1 לכתובת הרשת של תת-הרשת.`;
        break;

      case 4: // What is the last usable IP?
        questionText = `מהי כתובת ה-IP השמישה האחרונה (Last Usable Host IP) בתת-הרשת של ${ipStr}/${cidr}?`;
        correctStr = lastIp;
        rawOptions = [
          lastIp,
          broadIp,
          numToIp((lastUsable - 1) >>> 0),
          netIp
        ];
        explanationText = `כתובת ה-IP השמישה האחרונה היא אחת פחות מכתובת ה-Broadcast. מכיוון שכתובת ה-Broadcast היא ${broadIp}, הכתובת השמישה האחרונה למארח היא ${lastIp}.`;
        hintText = `מפחיתים 1 מכתובת ה-Broadcast.`;
        break;

      case 5: // Number of usable hosts
        questionText = `כמה כתובות מארח שמישות (Usable Host Addresses) קיימות בתת-רשת בעלת מסיכת רשת של /${cidr}?`;
        correctStr = String(usableHosts);
        rawOptions = [
          correctStr,
          String(size),
          String(usableHosts + 2),
          String(Math.max(2, usableHosts - 10))
        ];
        explanationText = `מספר הכתובות השמישות מחושב לפי הנוסחה: 2 בחזקת (32 פחות CIDR) פחות 2. עבור /${cidr}, מספר הכתובות הכולל בבלוק הוא ${size} (כולל כתובת הרשת וכתובת ה-Broadcast שאינן ניתנות להגדרה למארח), ולכן מספר המארחים השמישים הוא ${usableHosts}.`;
        hintText = `השתמש בנוסחה: 2^(32 - CIDR) - 2.`;
        break;

      default: // Subnet mask conversion
        questionText = `כיצד מיוצגת מסיכת הרשת /${cidr} בפורמט עשרוני נקודתי (Dotted Decimal Mask)?`;
        correctStr = maskIp;
        rawOptions = [
          maskIp,
          numToIp((~0 << (32 - (cidr === 30 ? 29 : cidr + 1))) >>> 0),
          numToIp((~0 << (32 - (cidr === 16 ? 17 : cidr - 1))) >>> 0),
          '255.255.255.255'
        ];
        explanationText = `מסיכת רשת בייצוג CIDR /${cidr} אומרת שיש ${cidr} ביטים דולקים (1) משמאל לימין מתוך 32 ביטים. ייצוג זה שקול בדיוק ל-${maskIp} בפורמט עשרוני נקודתי.`;
        hintText = `חשב את הערך הבינארי של 8 ביטים בכל אוקטטה: 128, 192, 224, 240, 248, 252, 254, 255.`;
        break;
    }

    // Securely shuffle using Fisher-Yates with SeededRandom to guarantee perfect option distribution
    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_sub_${i}`,
      domain: 'network_fundamentals',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `מסיכת CIDR: /${cidr}\nמסיכת רשת עשרונית: ${maskIp}\nגודל בלוק: ${size} כתובות\nסה"כ מארחים שמישים: ${usableHosts}`,
      difficulty: cidr >= 28 ? 'בינוני' : 'קל',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 1, Chapter 12'
    });
  }

  // 2. GENERATE ROUTING PATH & ADMIN DISTANCE QUESTIONS (ip_connectivity)
  const connectivityCount = Math.floor(count * 0.20);
  for (let i = 0; i < connectivityCount; i++) {
    const destIp = `10.${rng.nextInt(1, 20)}.${rng.nextInt(1, 50)}.100`;
    
    // Choose routing scenario
    const scenarioType = rng.nextInt(1, 3);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'טבלאות ניתוב ומרחק מנהלי (AD)';

    if (scenarioType === 1) {
      // Longest Prefix Match always wins
      questionText = `נתב מקבל חבילת מידע (Packet) המיועדת לכתובת היעד ${destIp}. בטבלת הניתוב של הנתב קיימים ארבעת הנתיבים הבאים. לאיזה נתיב יפנה הנתב את החבילה?`;
      
      const ipParts = destIp.split('.');
      const net8 = `${ipParts[0]}.0.0.0/8`;
      const net16 = `${ipParts[0]}.${ipParts[1]}.0.0/16`;
      const net24 = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.0/24`;
      const netDefault = '0.0.0.0/0';

      const optCorrect = `נתיב OSPF עבור ${net24} (AD=110)`;
      const optStatic = `נתיב סטטי (Static) עבור ${net8} (AD=1)`;
      const optEigrp = `נתיב EIGRP עבור ${net16} (AD=90)`;
      const optDefault = `נתיב ברירת מחדל עבור ${netDefault} (AD=1)`;

      correctStr = optCorrect;
      rawOptions = [optCorrect, optStatic, optEigrp, optDefault];

      explanationText = `זהו עיקרון בסיסי וחשוב ביותר ב-CCNA: חוק ה-Longest Prefix Match (ההתאמה הארוכה ביותר של מסיכת תת-הרשת) קודם לכל דבר אחר בנתב, כולל המרחק המנהלי (Administrative Distance)! למרות שנתיב סטטי מציע AD נמוך ואמין יותר (1), הנתיב הנלמד מ-OSPF הוא בעל המסיכה הספציפית והמפורטת ביותר (/24) המכסה את הכתובת המבוקשת, ולכן הנתב יעדיף נתיב זה.`;
      hintText = `בניתוב IP, תמיד הכתובת הספציפית ביותר (בעלת מסיכת ה-CIDR הגבוהה ביותר) מנצחת ראשונה, ללא קשר ל-AD.`;
    } else if (scenarioType === 2) {
      // AD tie breaker when prefixes are equal
      const ipParts = destIp.split('.');
      const targetNet = `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.0/24`;

      questionText = `נתב מקבל חבילת מידע המיועדת לכתובת ${destIp}. בטבלת הניתוב מופיעים מספר נתיבים שונים עבור אותה רשת בדיוק (${targetNet}). איזה נתיב יותקן בטבלת הניתוב וישמש בפועל לניתוב החבילה?`;
      
      const optStatic = `נתיב סטטי (Static Route) עם AD של 1`;
      const optEigrp = `נתיב EIGRP עם AD של 90`;
      const optOspf = `נתיב OSPF עם AD של 110`;
      const optRip = `נתיב RIP עם AD של 120`;

      correctStr = optStatic;
      rawOptions = [optStatic, optEigrp, optOspf, optRip];

      explanationText = `כאשר קיים שוויון מלא באורך מסיכת הרשת (Prefix Length), הנתב משתמש בפרמטר Administrative Distance (AD - מרחק מנהלי) כדי לקבוע איזה מקור ניתוב הוא האמין ביותר. ה-AD הנמוך ביותר מנצח ומוכנס לטבלת הניתוב (RIB). לניתוב סטטי יש AD ברירת מחדל של 1, שהוא אמין משמעותית מ-EIGRP (90), OSPF (110) או RIP (120).`;
      hintText = `חפש את ה-AD הנמוך ביותר. ערך AD מייצג את רמת האמינות הכללית של מקור הניתוב.`;
    } else {
      // Administrative Distance memorization
      const protocol = rng.pick([
        { name: 'OSPF פנימי', ad: 110 },
        { name: 'EIGRP פנימי', ad: 90 },
        { name: 'RIP', ad: 120 },
        { name: 'eBGP', ad: 20 },
        { name: 'ניתוב סטטי (Static Route)', ad: 1 },
        { name: 'ממשק מחובר ישירות (Connected)', ad: 0 }
      ]);

      questionText = `מהו ערך ברירת המחדל של המרחק המנהלי (Administrative Distance) עבור פרוטוקול או סוג ניתוב מסוג: ${protocol.name}?`;
      
      const correctAdStr = `ערך AD קבוע של ${protocol.ad} המגדיר את רמת האמינות הרשמית שלו בנתבי סיסקו.`;
      const wrongAd1Str = `ערך AD קבוע של ${protocol.ad === 110 ? 90 : 110} המגדיר את רמת האמינות הרשמית שלו בנתבי סיסקו.`;
      const wrongAd2Str = `ערך AD קבוע של ${protocol.ad === 120 ? 100 : 120} המגדיר את רמת האמינות הרשמית שלו בנתבי סיסקו.`;
      const wrongAd3Str = `ערך AD קבוע של ${protocol.ad === 1 ? 5 : 15} המגדיר את רמת האמינות הרשמית שלו בנתבי סיסקו.`;

      correctStr = correctAdStr;
      rawOptions = [correctAdStr, wrongAd1Str, wrongAd2Str, wrongAd3Str];

      explanationText = `המרחק המנהלי (AD) הוא מדד האמינות של מקור המידע לניתוב בנתבי Cisco. ערכי ה-AD הרשמיים כוללים: Connected=0, Static=1, eBGP=20, EIGRP=90, OSPF=110, RIP=120, External EIGRP=170, iBGP=200. עבור ${protocol.name}, ה-AD הרשמי הוא בדיוק ${protocol.ad}.`;
      hintText = `ערך AD נמוך יותר מציין אמינות גבוהה יותר בעיני הנתב. לדוגמה, OSPF=110 ו-EIGRP=90.`;
    }

    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_conn_${i}`,
      domain: 'ip_connectivity',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `טבלת AD של סיסקו:\n• Connected: 0\n• Static: 1\n• eBGP: 20\n• EIGRP: 90\n• OSPF: 110\n• RIP: 120`,
      difficulty: 'בינוני',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 1, Chapter 15'
    });
  }

  // 3. GENERATE NETWORK ACCESS & VLAN QUESTIONS (network_access)
  const accessCount = Math.floor(count * 0.18);
  for (let i = 0; i < accessCount; i++) {
    const vlanId = rng.nextInt(2, 4094);
    const scenarioType = rng.nextInt(1, 3);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'VLANs, Trunks ו-STP';

    if (scenarioType === 1) {
      questionText = `מתג (Switch) מקבל חבילת מידע השייכת ל-VLAN ${vlanId} על גבי פורט Trunk. איזה מנגנון משמש לסימון ושיוך החבילה ל-VLAN הנכון בקישור ה-Trunk?`;
      
      const optDot1q = `מנגנון תיוג IEEE 802.1Q המכניס תגית של 4 בתים (Bytes) לכותרת הפריים המקורית ומחשב מחדש את ה-FCS.`;
      const optIsl = `מנגנון ISL (Inter-Switch Link) המבצע אנקפסולציה מלאה על ידי הוספת כותרת של 26 בתים וסיומת של 4 בתים לפריים.`;
      const optVtp = `פרוטוקול VTP (VLAN Trunking Protocol) המפיץ ומסנכרן את בסיס הנתונים של ה-VLANs בין מתגים בשכבה 2.`;
      const optStp = `פרוטוקול STP (Spanning Tree Protocol) המשתמש בהודעות BPDU לחישוב נתיבים חלופיים ומניעת לולאות פיזיות ברשת.`;

      correctStr = optDot1q;
      rawOptions = [optDot1q, optIsl, optVtp, optStp];

      explanationText = `בתקן התעשייה IEEE 802.1Q, מתג מוסיף תגית (Tag) של 4 בתים (32 ביט) בתוך כותרת ה-Ethernet פריים (בין ה-Source MAC ל-Type). תגית זו מכילה את ה-VLAN ID (שגודלו 12 ביט ומאפשר עד 4096 VLANs). מכיוון שהפריים משתנה, המתג מחשב מחדש את ערך ה-FCS (Frame Check Sequence) בסוף הפריים.`;
      hintText = `זהו תקן ה-Trunking הפופולרי, הסטנדרטי והנפוץ ביותר בעולם הרשתות כיום.`;
    } else if (scenarioType === 2) {
      questionText = `במפרט הרשת מוגדר Native VLAN כמספר ${vlanId}. מה קורה לפריימים השייכים ל-Native VLAN כאשר הם מועברים על גבי קישור 802.1Q Trunk?`;
      
      const optCorrect = `הפריימים מועברים ללא תיוג (Untagged) על גבי ה-Trunk, והמתג המקבל משייך אותם אוטומטית ל-Native VLAN המקומי שלו.`;
      const optTagged = `הפריימים מתויגים עם תגית מיוחדת של VLAN ${vlanId} על מנת להבטיח זיהוי ובידוד אבטחה מלא לאורך כל הקישור.`;
      const optDropped = `הפריימים נזרקים (Dropped) מיידית על ידי מתג היעד או הנתב במטרה למנוע התקפות מסוג VLAN Hopping.`;
      const optEncrypted = `הפריימים מוצפנים בצורה מאובטחת באמצעות מנגנון IPsec VPN מובנה השומר על סודיות הנתונים בין המתגים.`;

      correctStr = optCorrect;
      rawOptions = [optCorrect, optTagged, optDropped, optEncrypted];

      explanationText = `כברירת מחדל בתקן 802.1Q, פריימים השייכים ל-Native VLAN מועברים דרך ה-Trunk ללא תגית (Untagged). המתג בצד המקבל משייך כל פריים נטול תגית ל-Native VLAN המוגדר אצלו בממשק. לכן, חיוני שתהיה התאמה מלאה בהגדרת ה-Native VLAN בשני צידי הקישור, אחרת עלולה להתרחש זליגת מידע לא רצויה בין VLANs שונים (Native VLAN Mismatch).`;
      hintText = `המאפיין המרכזי והייחודי של ה-Native VLAN הוא חוסר הצורך שלו בתיוג מעל ה-Trunk.`;
    } else {
      questionText = `איזה מצב של פורט (Port State) בפרוטוקול STP (Spanning Tree) מאפשר קבלה ושליחה של נתוני משתמש (User Data) וגם למידה של כתובות MAC?`;
      
      const optForwarding = `מצב Forwarding (העברה) - הפורט מעביר פריימים של משתמשים, לומד כתובות MAC ומעבד הודעות BPDU כרגיל.`;
      const optListening = `מצב Listening (האזנה) - הפורט שולח ומקבל הודעות BPDU כדי לקבוע את הטופולוגיה, אך אינו לומד MAC ואינו מעביר מידע.`;
      const optLearning = `מצב Learning (למידה) - הפורט מאזין לרשת ומעדכן את טבלת ה-MAC שלו, אך אינו מעביר פריימים של משתמשי קצה.`;
      const optBlocking = `מצב Blocking (חסימה) - הפורט אינו מעביר מידע או לומד כתובות MAC, אלא רק מאזין להודעות BPDU נכנסות כדי לזהות שינויים.`;

      correctStr = optForwarding;
      rawOptions = [optForwarding, optListening, optLearning, optBlocking];

      explanationText = `בפרוטוקול STP, רק פורט שנמצא במצב Forwarding מעביר תעבורת נתונים רגילה של משתמשים (User Data). במצב Learning, הפורט לומד כתובות MAC ומעדכן את טבלת ה-MAC שלו אך עדיין אינו מעביר פריימים. במצבים Blocking ו-Listening, אין למידת MAC ואין העברת מידע של משתמשים כלל.`;
      hintText = `זהו המצב הסופי, הפעיל והתקין של פורטים במתג שאינם חסומים על ידי מנגנון ה-STP.`;
    }

    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_acc_${i}`,
      domain: 'network_access',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `מצבי פורט ב-STP:\n1. Blocking - חסום, מקבל BPDU בלבד\n2. Listening - מאזין, לא לומד MAC\n3. Learning - לומד MAC, לא מעביר מידע\n4. Forwarding - פעיל לחלוטין (לומד ומעביר)`,
      difficulty: 'בינוני',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 1, Chapter 9'
    });
  }

  // 4. GENERATE IP SERVICES QUESTIONS (ip_services)
  const servicesCount = Math.floor(count * 0.12);
  for (let i = 0; i < servicesCount; i++) {
    const scenarioType = rng.nextInt(1, 3);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'שירותי רשת (DHCP, NAT, NTP, HSRP)';

    if (scenarioType === 1) {
      questionText = `בפרוטוקול DHCP, מהו סדר ההודעות המדויק (DHCP Message Exchange) המתרחש בעת חיבור לקוח חדש וקבלת כתובת IP?`;
      
      const optDora = `Discover (Broadcast), Offer (Unicast/Broadcast), Request (Broadcast), Acknowledge (Unicast/Broadcast)`;
      const optArp = `Request (Broadcast), Reply (Unicast), Discover (Broadcast), Acknowledge (Unicast) לצורך בירור כתובות פיזיות`;
      const optSyn = `SYN (Synchronize), SYN-ACK (Acknowledge), ACK (Acknowledge), FIN (Finish) ליצירת וסגירת קשר`;
      const optNtp = `Solicit (Multicast), Advertise (Unicast), Request (Unicast), Reply (Unicast) לשיוך כתובות IPv6`;

      correctStr = optDora;
      rawOptions = [optDora, optArp, optSyn, optNtp];

      explanationText = `תהליך הקצאת הכתובת הדינמית ב-DHCP מכונה ראשי תיבות DORA:\n1. Discover - הלקוח שולח הודעת Broadcast כדי למצוא שרת DHCP פנוי ברשת.\n2. Offer - השרת מציע כתובת IP ומחזיר אותה ללקוח.\n3. Request - הלקוח מבקש רשמית להשתמש בכתובת שהוצעה לו.\n4. Acknowledge - השרת מאשר את הבקשה ורושם את הכתובת על שם המחשב.`;
      hintText = `חשוב לזכור את ראשי התיבות המפורסמים DORA המייצגים את ארבעת שלבי לחיצת היד.`;
    } else if (scenarioType === 2) {
      questionText = `במנגנון NAT, כיצד מוגדרת כתובת ה-IP הציבורית (Public IP) המייצגת את מארחי הרשת הפנימית כלפי העולם החיצוני באינטרנט?`;
      
      const optInsideGlobal = `Inside Global - הכתובת הציבורית (Public IP) המייצגת את המארח הפנימי בפני הרשת החיצונית או האינטרנט.`;
      const optInsideLocal = `Inside Local - כתובת ה-IP הפרטית (Private IP) המשויכת למארח הפנימי בתוך הרשת המקומית (LAN).`;
      const optOutsideLocal = `Outside Local - כתובת ה-IP של מארח חיצוני כפי שהיא מוצגת ומזוהה על ידי המארחים ברשת הפנימית.`;
      const optOutsideGlobal = `Outside Global - כתובת ה-IP הציבורית האמיתית המשויכת למארח החיצוני ברשת האינטרנט הכללית.`;

      correctStr = optInsideGlobal;
      rawOptions = [optInsideGlobal, optInsideLocal, optOutsideLocal, optOutsideGlobal];

      explanationText = `במינוח ה-NAT הרשמי של סיסקו:\n• Inside Local: כתובת ה-IP הפרטית של המארח בתוך הרשת המקומית.\n• Inside Global: הכתובת הציבורית (המתורגמת) שאיתה המארח יוצא החוצה ומזוהה באינטרנט.\n• Outside Local: הכתובת של שרת היעד החיצוני כפי שהיא נראית ומיוצגת ברשת הפנימית.\n• Outside Global: הכתובת הציבורית האמיתית והמקורית של שרת היעד באינטרנט.`;
      hintText = `המארח ממוקם בפנים (Inside) אך מוצג בכתובת גלובלית (Global) כלפי העולם החיצוני.`;
    } else {
      questionText = `פרוטוקול HSRP (Hot Standby Router Protocol) משמש לאספקת שער ברירת מחדל (Default Gateway) מגובה ברשת. איזה תפקיד מקבל הנתב שמגבה את הנתב הפעיל (Active Router)?`;
      
      const optStandby = `נתב Standby - מאזין להודעות Hello ונכנס לפעילות אקטיבית במידה והנתב הפעיל חווה תקלה או קריסה.`;
      const optBackup = `נתב Backup - מגבה את נתב ה-Master בפרוטוקולים מקבילים אך אינו משתמש בסטטוס Standby ייעודי ב-HSRP.`;
      const optMaster = `נתב Master - הנתב הראשי שמנתב את חבילות המידע בפועל בקבוצות יתירות שאינן מבוססות HSRP של סיסקו.`;
      const optSlave = `נתב Secondary - משמש כנתיב משני פסיבי הממתין להוראת ניתוב ידנית של מנהל הרשת ללא מנגנון Hello דינמי.`;

      correctStr = optStandby;
      rawOptions = [optStandby, optBackup, optMaster, optSlave];

      explanationText = `פרוטוקול HSRP מגדיר שני תפקידים מרכזיים לנתבים הפיזיים המשתתפים בקבוצה הווירטואלית: הנתב הפעיל (Active Router) שמנתב בפועל את תעבורת המשתמשים, ונתב הגיבוי (Standby Router) שמאזין להודעות Hello של הנתב הפעיל ומחליף אותו בצורה שקופה לחלוטין אם הוא קורס. (בפרוטוקול VRRP המונחים הם Master ו-Backup).`;
      hintText = `שם הפרוטוקול עצמו רומז לתפקיד הגיבוי ומכיל את המילה Standby (מצב כוננות).`;
    }

    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_srv_${i}`,
      domain: 'ip_services',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `מונחי NAT קריטיים:\n- Inside Local: פרטי פנימי\n- Inside Global: ציבורי חיצוני המייצג את המארח הפנימי\n- Outside Global: ציבורי חיצוני של היעד\n- Outside Local: יעד כפי שנראה מבפנים`,
      difficulty: 'קל',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 2, Chapter 6'
    });
  }

  // 5. GENERATE SECURITY FUNDAMENTALS QUESTIONS (security_fundamentals)
  const securityCount = Math.floor(count * 0.15);
  for (let i = 0; i < securityCount; i++) {
    const scenarioType = rng.nextInt(1, 3);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'עקרונות אבטחת מידע';

    if (scenarioType === 1) {
      questionText = `איזה מנגנון אבטחה ברמת שכבה 2 (Layer 2) מגן מפני התקפות בהן מחשב זדוני מנסה להתחזות לשרת DHCP ולחלק כתובות IP מזויפות ברשת?`;
      
      const optDhcpSnooping = `DHCP Snooping - מסווג פורטים ל-Trusted ו-Untrusted וחוסם הודעות Offer/ACK מפורטים לא אמינים.`;
      const optDai = `Dynamic ARP Inspection (DAI) - בודק את אמינות הודעות ה-ARP על בסיס טבלת הקישורים של DHCP Snooping.`;
      const optPortSecurity = `Port Security - מגביל את כמות כתובות ה-MAC המורשות להתחבר לפורט פיזי בודד וחוסם חריגות.`;
      const optBpduGuard = `BPDU Guard - משבית באופן מיידי (Err-disable) פורט המוגדר כ-PortFast אם התקבלה בו הודעת BPDU.`;

      correctStr = optDhcpSnooping;
      rawOptions = [optDhcpSnooping, optDai, optPortSecurity, optBpduGuard];

      explanationText = `מנגנון DHCP Snooping מסווג את כל פורטי המתג לשני סוגים: Trusted (אמין - מחובר לשרת DHCP אמיתי או לפורט Trunk) ו-Untrusted (לא אמין - מחובר למשתמשי קצה). המתג מסנן וישליך מיידית כל הודעת DHCP Offer או DHCP ACK המגיעה מפורט שמוגדר כ-Untrusted, ובכך מונע משרת DHCP פיראטי לחלק כתובות שגויות ברשת.`;
      hintText = `המונח מגיע מהמילה "להאזין" או "לרגל" (Snooping) אחר חבילות DHCP העוברות במתג.`;
    } else if (scenarioType === 2) {
      questionText = `איזו פקודת CLI של סיסקו מגבילה פורט במתג לקבלת כתובות MAC דינמיות ולשמור אותן קבועה בקונפיגורציה (Running Configuration) מבלי שיימחקו באתחול הבא?`;
      
      const optSticky = `switchport port-security mac-address sticky - לומד את ה-MAC דינמית ושומר אותו כקבוע בקונפיגורציה הריצה.`;
      const optMax = `switchport port-security maximum 1 - מגדיר שרק כתובת MAC אחת יכולה להיות פעילה ומורשית בפורט זה בו-זמנית.`;
      const optViolate = `switchport port-security violation restrict - זורק חבילות חורגות ומעלה מונה חריגות (Counter) ללא השבתת הפורט.`;
      const optStatic = `switchport port-security mac-address static - מאפשר הזנה ידנית בלבד של כתובת ה-MAC המורשית עבור הפורט המאובטח.`;

      correctStr = optSticky;
      rawOptions = [optSticky, optMax, optViolate, optStatic];

      explanationText = `הפקודה "switchport port-security mac-address sticky" מאפשרת למתג ללמוד בצורה דינמית את כתובת ה-MAC של המכשיר הראשון שמתחבר לפורט, ולהוסיף אותה אוטומטית לקובץ ההגדרות (Running Configuration) ככתובת קבועה. במידה ומבצעים שמירה (write memory), ההגדרות יישמרו גם לאחר כיבוי והפעלה מחדש של המתג.`;
      hintText = `חפש פקודה המשתמשת במילה "דביק" (Sticky) באנגלית, המסמלת את היצמדות הכתובת לפורט.`;
    } else {
      questionText = `מהו ההבדל המרכזי בין רשימת גישה סטנדרטית (Standard ACL) לבין רשימת גישה מורחבת (Extended ACL) במערכת ההפעלה Cisco IOS?`;
      
      const optCorrect = `Standard ACL מסננת תעבורה על בסיס כתובת מקור (Source IP) בלבד, בעוד Extended ACL מסננת על בסיס כתובות מקור ויעד, סוג פרוטוקול ומספרי פורטים של שכבה 4.`;
      const optDiff = `Standard ACL מיועדת אך ורק לניתוב חבילות מידע מסוג IPv4 בעוד Extended ACL מיועדת אך ורק לסינון וחסימת חבילות מידע מסוג IPv6.`;
      const optApply = `Standard ACL ניתנת להחלה אך ורק בכיוון יציאה (Outbound) של ממשק הנתב, בעוד Extended ACL מוגבלת לסינון תעבורה נכנסת (Inbound) בלבד.`;
      const optCost = `Standard ACL מבוצעת ברמת החומרה על ידי מעבדי ASIC מהירים, בעוד Extended ACL מבוצעת ברמת התוכנה של ה-CPU ומאטה את הניתוב ברשת.`;

      correctStr = optCorrect;
      rawOptions = [optCorrect, optDiff, optApply, optCost];

      explanationText = `רשימות גישה סטנדרטיות (Standard ACLs, מספרים 1-99 ו-1300-1999) מוגבלות לסינון ובדיקה של כתובת ה-IP של המקור בלבד. רשימות גישה מורחבות (Extended ACLs, מספרים 100-199 ו-2000-2699) גמישות בהרבה ומאפשרות סינון מעמיק על בסיס פרוטוקול (TCP, UDP, ICMP), כתובת מקור, כתובת יעד, ומספרי פורטים של שכבה 4 (כגון פורט 80 ל-HTTP או פורט 443 ל-HTTPS).`;
      hintText = `Standard היא פשוטה ומסתכלת רק על ה-Source, בעוד Extended מסוגלת להסתכל על ה-Destination ועל הפורט הלוגי.`;
    }

    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_sec_${i}`,
      domain: 'security_fundamentals',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `מנגנוני אבטחה בשכבה 2:\n• DHCP Snooping: מניעת שרת DHCP מזויף\n• DAI (Dynamic ARP Inspection): מניעת ARP Poisoning\n• IP Source Guard: מניעת IP Spoofing\n• Port Security: אבטחת כניסות פיזיות`,
      difficulty: 'קשה',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 2, Chapter 5'
    });
  }

  // 6. GENERATE AUTOMATION & PROGRAMMABILITY QUESTIONS (automation_programmability)
  const remainingCount = count - questions.length;
  for (let i = 0; i < remainingCount; i++) {
    const scenarioType = rng.nextInt(1, 3);
    let questionText = '';
    let rawOptions: string[] = [];
    let correctStr = '';
    let explanationText = '';
    let hintText = '';
    let subtopic = 'אוטומציה, SDN ותכנותיות רשת';

    if (scenarioType === 1) {
      questionText = `מהו פורמט ייצוג הנתונים הנפוץ ביותר ב-REST APIs העושה שימוש בסוגריים מסולסלים {}, סוגריים מרובעים [] וזוגות של מפתח וערך המופרדים בנקודתיים?`;
      
      const optJson = `JSON (JavaScript Object Notation) - פורמט טקסטואלי מובנה המשתמש בזוגות מפתח-ערך, סוגריים מסולסלים ומערכים בסוגריים מרובעים.`;
      const optYaml = `YAML (YAML Ain't Markup Language) - פורמט המבוסס על הזחות שורות ורווחים (Indentation) ללא צורך בסוגריים מיוחדים.`;
      const optXml = `XML (eXtensible Markup Language) - פורמט המשתמש בתגיות פתוחות וסגורות הדומות ל-HTML כדי להגדיר היררכיית נתונים.`;
      const optHtml = `HTML (HyperText Markup Language) - שפת סימון המיועדת להצגת דפי אינטרנט בדפדפן ואינה משמשת להעברת נתונים ב-REST APIs.`;

      correctStr = optJson;
      rawOptions = [optJson, optYaml, optXml, optHtml];

      explanationText = `פורמט JSON נמצא בשימוש נרחב מאוד באוטומציית רשתות ובפרוטוקולי REST APIs. הוא מבוסס על סוגריים מסולסלים להגדרת אובייקטים { "key": "value" } וסוגריים מרובעים להגדרת מערכים []. YAML משתמש בהזחות (Indentation) ללא סוגריים, ו-XML משתמש בתגיות פתיחה וסגירה בדומה ל-HTML.`;
      hintText = `זהו הפורמט הנפוץ ביותר ב-REST APIs המשתמש במירכאות כפולות לכל מפתח וערך ובסוגריים מסולסלים.`;
    } else if (scenarioType === 2) {
      questionText = `מערכת הניהול המרכזית Cisco DNA Center (כיום Catalyst Center) משתמשת בשני סוגי ממשקים (APIs) לתקשורת. כיצד מוגדר ה-API המשמש את הבקר לקבלת פקודות ממנהל הרשת או מאפליקציות חיצוניות?`;
      
      const optNorthbound = `Northbound API (REST API) - מאפשר אינטגרציה ותקשורת בין הבקר לבין אפליקציות ניהול חיצוניות, מערכות סקריפטים ומפתחים.`;
      const optSouthbound = `Southbound API (NETCONF/SSH) - משמש לתקשורת ובקרה ישירה מהבקר כלפי מטה אל מתגים, נתבים וציוד הקצה הפיזי ברשת.`;
      const optEastbound = `Eastbound API - ממשק ייעודי המיועד לסנכרון נתונים ותיאום קונפיגורציה בין מספר בקרים שונים הפועלים באשכול (Cluster).`;
      const optWestbound = `Westbound API - ממשק אבטחה המיועד להעברת נתונים מוצפנים לשרתי בקרה וניטור חיצוניים לצורך זיהוי אנומליות ואירועים.`;

      correctStr = optNorthbound;
      rawOptions = [optNorthbound, optSouthbound, optEastbound, optWestbound];

      explanationText = `באדריכלות SDN ובקרי רשת:\n• Northbound APIs: ממשקים הפונים "צפונה" (לכיוון האפליקציות והניהול), מבוססים בדרך כלל על REST API ומאפשרים כתיבת סקריפטים וניהול הבקר בצורה תכנותית.\n• Southbound APIs: ממשקים הפונים "דרומה" (לכיוון ציוד הקצה הפיזי כגון מתגים ונתבים) וכוללים פרוטוקולים כמו NETCONF, RESTCONF, SNMP, או SSH לצורך קונפיגורציה ישירה.`;
      hintText = `חשוב על כיוון הממשק העולה למעלה (צפון) לכיוון מנהלי הרשת והאפליקציות של החברה.`;
    } else {
      questionText = `איזה כלי לניהול תצורה (Configuration Management) פועל ללא סוכן (Agentless) על גבי פרוטוקול SSH רגיל, ומשתמש בקבצי הגדרה בפורמט YAML הנקראים Playbooks?`;
      
      const optAnsible = `Ansible - כלי Agentless לניהול תצורה המשתמש ב-SSH לתקשורת, בקבצי הגדרות YAML (Playbooks) ובמודל Push לפריסת שינויים.`;
      const optPuppet = `Puppet - כלי מבוסס סוכן (Agent-based) המשתמש בשפה ייעודית (Manifests) ובמודל Pull כדי למשוך הגדרות משרת מרכזי (Master).`;
      const optChef = `Chef - כלי מבוסס סוכן המשתמש ב-Ruby (קבצי Recipes ו-Cookbooks) ובמודל Pull שבו השרתים פונים לשרת המרכזי לקבלת תצורה.`;
      const optSaltstack = `SaltStack - כלי מבוסס סוכן מהיר המשתמש בפרוטוקול ZeroMQ להעברת הודעות ובמודל Master-Minion לתקשורת עם הציוד.`;

      correctStr = optAnsible;
      rawOptions = [optAnsible, optPuppet, optChef, optSaltstack];

      explanationText = `כלי ניהול התצורה Ansible הוא Agentless (אינו מצריך התקנת תוכנת סוכן בציוד הקצה). הוא משתמש ב-SSH סטנדרטי כדי להתחבר לנתבים ומתגים ולבצע פקודות. קבצי הגדרת המערכת שלו נכתבים בפורמט YAML ומכונים Playbooks. (כלי Chef ו-Puppet דורשים התקנת סוכן ייעודי ופועלים בעיקר במודל Pull).`;
      hintText = `זהו כלי פופולרי ביותר באוטומציית רשתות, ללא סוכן, המבוסס על ספרי משחק (Playbooks).`;
    }

    const { shuffled, correctIdx } = shuffleOptions(rawOptions, correctStr, rng);

    questions.push({
      id: `gen_auto_${i}`,
      domain: 'automation_programmability',
      subtopic,
      question: questionText,
      options: shuffled,
      correctAnswer: correctIdx,
      explanation: explanationText,
      hint: hintText,
      additionalInfo: `השוואת כלי אוטומציה:\n• Ansible: ללא סוכן, מבוסס SSH, פורמט YAML (Playbooks), שיטת Push\n• Puppet: עם סוכן, מבוסס Ruby (Manifests), שיטת Pull\n• Chef: עם סוכן, מבוסס Ruby (Recipes/Cookbooks), שיטת Pull`,
      difficulty: 'בינוני',
      references: 'Cisco CCNA 200-301 Official Cert Guide Vol 2, Chapter 16'
    });
  }

  return questions;
}
