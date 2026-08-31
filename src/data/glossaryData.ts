import { DomainID } from '../types';

export interface CCNAExamTerm {
  id: string;
  term: string;
  acronym?: string;
  hebrewTranslation: string;
  domain: DomainID;
  category: 'routing' | 'switching' | 'security' | 'automation' | 'fundamentals' | 'services' | 'wireless';
  definition: string;
  examNote: string;
  technicalDetails?: {
    layer?: string;
    protocolNumber?: string | number;
    port?: string | number;
    adMetric?: string;
    rfcOrStandard?: string;
    cliExample?: string;
  };
  relatedTerms: string[];
}

export const CCNA_GLOSSARY_DATABASE: CCNAExamTerm[] = [
  // ==========================================
  // 1. NETWORK FUNDAMENTALS (יסודות רשת)
  // ==========================================
  {
    id: 'osi-model',
    term: 'OSI 7-Layer Model',
    acronym: 'OSI',
    hebrewTranslation: 'מודל שבע השכבות של OSI',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'מודל תיאורטי בן 7 שכבות שפותח ע"י ארגון ISO להבנת תהליך העברת נתונים ברשת: Physical (1), Data Link (2), Network (3), Transport (4), Session (5), Presentation (6), Application (7).',
    examNote: 'זכור את המשפט בעברית לשכבות (מלמעלה למטה): "כל נציג שירות יבדוק נתוני פקס" (Application, Presentation, Session, Transport, Network, Data Link, Physical). יש לדעת בדיוק איזו יחידת מידע (PDU) וציוד פועלים בכל שכבה.',
    technicalDetails: {
      layer: 'Layers 1-7',
      rfcOrStandard: 'ISO/IEC 7498-1',
    },
    relatedTerms: ['TCP/IP Model', 'PDU', 'Encapsulation']
  },
  {
    id: 'tcp-ip-model',
    term: 'TCP/IP Protocol Suite',
    acronym: 'TCP/IP',
    hebrewTranslation: 'מודל פרוטוקולי TCP/IP',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'מודל מעשי בן 4 שכבות שעליו מבוססת רשת האינטרנט המודרנית: Network Access (שכבות 1-2 של OSI), Internet (שכבה 3), Transport (שכבה 4), ו-Application (שכבות 5-7).',
    examNote: 'בבחינת CCNA 200-301 מושווים לעיתים קרובות מודל ה-4 שכבות של TCP/IP והגרסה המעודכנת בת 5 השכבות אל מול מודל 7 השכבות של OSI.',
    technicalDetails: {
      rfcOrStandard: 'RFC 1122',
    },
    relatedTerms: ['OSI 7-Layer Model', 'Encapsulation', 'TCP', 'UDP']
  },
  {
    id: 'encapsulation',
    term: 'Encapsulation & Decapsulation',
    acronym: 'PDU',
    hebrewTranslation: 'כימוס ופירוק נתונים',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'תהליך עטיפת הנתונים בכותרות (Headers) וסיומות (Trailers) בכל שכבה בירידה במודל ה-OSI: Data (שכבות 5-7) -> Segment (שכבה 4) -> Packet (שכבה 3) -> Frame (שכבה 2) -> Bits (שכבה 1).',
    examNote: 'שכבה 2 (Data Link) היא השכבה היחידה שמוסיפה גם Header (כותרת עם MAC) וגם Trailer (סיומת FCS לבדיקת תקינות ושגיאות).',
    technicalDetails: {
      layer: 'Layers 1-4',
      rfcOrStandard: 'IEEE 802.3 / IETF',
    },
    relatedTerms: ['PDU', 'FCS', 'MAC Address', 'IPv4 Header']
  },
  {
    id: 'tcp',
    term: 'Transmission Control Protocol (TCP)',
    acronym: 'TCP',
    hebrewTranslation: 'פרוטוקול בקרת שידור אמין',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'פרוטוקול שכבת התעבורה (Layer 4) אמין ומוכוון חיבור (Connection-Oriented), המבצע לחיצת יד משולשת (SYN, SYN-ACK, ACK), בקרת זרימה (Windowing), ואישור קבלה על כל מקטע.',
    examNote: 'גודל כותרת TCP מינימלי הוא 20 בתים. כותרת TCP כוללת Sequence Number, Acknowledgment Number, Window Size ודגלים (SYN, ACK, FIN, RST, PSH, URG).',
    technicalDetails: {
      layer: 'Layer 4 (Transport)',
      protocolNumber: 6,
      rfcOrStandard: 'RFC 793 / RFC 9293',
    },
    relatedTerms: ['UDP', 'Three-Way Handshake', 'Port Numbers']
  },
  {
    id: 'udp',
    term: 'User Datagram Protocol (UDP)',
    acronym: 'UDP',
    hebrewTranslation: 'פרוטוקול חבילות משתמש מהיר',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'פרוטוקול שכבה 4 פשוט, מהיר ונטול חיבור (Connectionless) מסוג Best-Effort, שאינו מבטיח הגעה, סדר או בקרת זרימה. אידיאלי לשידורי זמן-אמת (VoIP, Video, DNS, DHCP).',
    examNote: 'כותרת UDP קבועה וקצרה מאוד - 8 בתים בלבד (מכילה רק Source Port, Destination Port, Length ו-Checksum).',
    technicalDetails: {
      layer: 'Layer 4 (Transport)',
      protocolNumber: 17,
      rfcOrStandard: 'RFC 768',
    },
    relatedTerms: ['TCP', 'Voice over IP (VoIP)', 'DNS', 'DHCP']
  },
  {
    id: 'mac-address',
    term: 'Media Access Control (MAC) Address',
    acronym: 'MAC',
    hebrewTranslation: 'כתובת פיזית לשכבה 2',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'כתובת חומרה פיזית צרובה באורך 48 ביט (6 בתים) בייצוג הקסדצימלי (למשל 00:1A:2B:3C:4D:5E או 001a.2b3c.4d5e בסיסקו).',
    examNote: '24 הביטים הראשונים מהווים את ה-OUI (Organizationally Unique Identifier) המזהה את יצרן כרטיס הרשת, ו-24 הביטים הנותרים הם מזהה ייחודי של הרכיב (NIC Specific).',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802',
      cliExample: 'show mac address-table'
    },
    relatedTerms: ['OUI', 'ARP', 'Switch MAC Table', 'EUI-64']
  },
  {
    id: 'ipv4-header',
    term: 'IPv4 Packet Header',
    acronym: 'IPv4',
    hebrewTranslation: 'כותרת חבילת IPv4',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'מבנה הכותרת של שכבה 3 בפרוטוקול IPv4. גודל מינימלי 20 בתים. כולל שדות: Version, IHL, DSCP/ECN, Total Length, Identification, Flags, Fragment Offset, TTL, Protocol, Header Checksum, Source IP, Destination IP.',
    examNote: 'שדה ה-TTL (Time to Live) מופחת ב-1 ע"י כל נתב בדרך. כאשר הוא מגיע ל-0, החבילה מושלכת ונשלחת הודעת ICMP Time Exceeded (משמש את traceroute). שדה Protocol מציין את פרוטוקול שכבה 4 (ICMP=1, TCP=6, UDP=17, OSPF=89).',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 791',
    },
    relatedTerms: ['TTL', 'ICMP', 'TCP', 'UDP', 'IPv6 Header']
  },
  {
    id: 'subnet-mask-cidr',
    term: 'Subnet Mask & CIDR Notation',
    acronym: 'CIDR / Mask',
    hebrewTranslation: 'מסכת רשת וסימון קידומת CIDR',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'מסכה בינארית בת 32 ביט המפרידה בין חלק הרשת (Network ID) לחלק המארחים (Host ID) בכתובת IPv4. סימון CIDR מייצג את כמות ביטי ה-1 הרציפים (למשל 255.255.255.0 מסומן כ-/24 ומאפשר 254 מארחים: 2^8 - 2).',
    examNote: 'זכור את מספרי הקסם: /30 נותן 4 כתובות (2 מארחים שימושיים), /29 נותן 8 כתובות (6 מארחים), /28 נותן 16 כתובות (14 מארחים), /27 נותן 32 כתובות (30 מארחים), /26 נותן 64 כתובות (62 מארחים), /25 נותן 128 כתובות (126 מארחים).',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 1519 / RFC 4632',
    },
    relatedTerms: ['Wildcard Mask', 'RFC 1918 Private IP', 'Default Gateway']
  },
  {
    id: 'wildcard-mask',
    term: 'Wildcard Mask',
    acronym: 'Wildcard',
    hebrewTranslation: 'מסכת תווים חופשיים (Wildcard)',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'מסכה הפוכה למסכת ה-Subnet (היפוך ביטים), שבה ביט 0 מסמל "חייב להתאים בדיוק" וביט 1 מסמל "לא אכפת / תו חופשי". משמשת בפקודות OSPF וב-Access Control Lists (ACLs).',
    examNote: 'חישוב מהיר: החסר את מסכת ה-Subnet מ-255.255.255.255. לדוגמה, עבור מסכת /27 (255.255.255.224), ה-Wildcard Mask יהיה 0.0.0.31.',
    technicalDetails: {
      layer: 'Layer 3 Configuration',
      cliExample: 'network 192.168.1.0 0.0.0.255 area 0 \n access-list 1 permit 10.1.1.0 0.0.0.255'
    },
    relatedTerms: ['Subnet Mask & CIDR Notation', 'Access Control List (ACL)', 'OSPF']
  },
  {
    id: 'rfc1918-private-ip',
    term: 'RFC 1918 Private IP Addresses',
    acronym: 'Private IP',
    hebrewTranslation: 'כתובות IPv4 פרטיות (RFC 1918)',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'שלושה טווחים שמורים של כתובות IPv4 שאינן מנותבות באינטרנט הציבורי ומיועדות לשימוש פנימי בלבד: Class A (10.0.0.0/8), Class B (172.16.0.0/12 עד 172.31.255.255), Class C (192.168.0.0/16 עד 192.168.255.255).',
    examNote: 'נתבים ציבוריים באינטרנט משליכים תעבורה המגיעה מכתובות RFC 1918. כדי שמחשבים פנימיים יגלשו באינטרנט נדרש תרגום NAT/PAT.',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 1918',
    },
    relatedTerms: ['NAT & PAT', 'APIPA', 'Default Gateway']
  },
  {
    id: 'apipa',
    term: 'Automatic Private IP Addressing (APIPA)',
    acronym: 'APIPA',
    hebrewTranslation: 'הקצאת כתובת פרטית אוטומטית עצמית',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'כתובת IPv4 שהמחשב מקצה לעצמו אוטומטית כאשר שרת ה-DHCP אינו זמין או אינו מגיב. הטווח השמור הוא 169.254.0.0/16 (למעט הבלוקים הראשון והאחרון).',
    examNote: 'אם מחשב קיבל כתובת 169.254.x.x, זהו רמז ישיר בבחינת CCNA לבעיית תקשורת מול שרת ה-DHCP (למשל הגדרת VLAN שגויה, כבל מנותק, שרת כבוי, או היעדר ip helper-address).',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 3927',
    },
    relatedTerms: ['DHCP & DORA Process', 'DHCP Relay Agent', 'RFC 1918 Private IP']
  },
  {
    id: 'ipv6-addressing',
    term: 'IPv6 Addressing Architecture',
    acronym: 'IPv6',
    hebrewTranslation: 'ארכיטקטורת כתובות IPv6',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'כתובת באורך 128 ביט המחולקת ל-8 מקטעים של 16 ביט (Hextets) בהקסדצימל. אין שידורי Broadcast ב-IPv6 אלא רק Unicast, Multicast, ו-Anycast.',
    examNote: 'כללי קיצור כתובת: (1) השמטת אפסים מובילים בכל הקסטט (00ab -> ab); (2) החלפת רצף רציף של אפסים בסימן "::" פעם אחת בלבד בכל כתובת.',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 4291 / RFC 8200',
    },
    relatedTerms: ['Global Unicast (GUA)', 'Link-Local (LLA)', 'SLAAC', 'EUI-64']
  },
  {
    id: 'ipv6-gua',
    term: 'Global Unicast Address (GUA)',
    acronym: 'GUA',
    hebrewTranslation: 'כתובת IPv6 גלובלית מנותבת',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'כתובת IPv6 ציבורית וייחודית גלובלית הניתנת לניתוב באינטרנט הציבורי. מתחילה בטווח הביטים 001 (בטווח 2000::/3 עד 3fff::/16).',
    examNote: 'בנויה מ-Global Routing Prefix (בדרך כלל /48), Subnet ID (16 ביט, יחד מגיעים ל-/64), ו-Interface ID (64 ביט מזהה המארח).',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 3587 / RFC 4291',
    },
    relatedTerms: ['IPv6 Addressing Architecture', 'Link-Local (LLA)', 'Unique Local (ULA)']
  },
  {
    id: 'ipv6-lla',
    term: 'Link-Local Address (LLA)',
    acronym: 'LLA',
    hebrewTranslation: 'כתובת מקומית לקישור IPv6',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'כתובת IPv6 אוטומטית המשמשת לתקשורת פנימית בתוך אותו מקטע רשת / קישור מקומי בלבד. מתחילה בקידומת fe80::/10 (בפועל fe80:: עד febf::).',
    examNote: 'נתבים אינם מעבירים תעבורה המיועדת לכתובת Link-Local מעבר לקישור המקומי! משמשת לעיתים קרובות ככתובת ה-Next-Hop של פרוטוקולי ניתוב (כגון OSPFv3) וכ-Default Gateway.',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 4291',
      cliExample: 'ipv6 address fe80::1 link-local'
    },
    relatedTerms: ['Global Unicast (GUA)', 'NDP', 'OSPFv3']
  },
  {
    id: 'slaac-eui64',
    term: 'SLAAC & EUI-64',
    acronym: 'SLAAC',
    hebrewTranslation: 'הקצאת כתובת אוטונומית ו-EUI-64',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'SLAAC מאפשר למארח לקבל קידומת /64 מנתב (הודעות RS/RA ב-NDP) וליצור לעצמו Interface ID. שיטת EUI-64 מפצלת את ה-MAC של המארח לחצי (24 ביט), שותלת FFFE באמצע, והופכת את הביט ה-7 (Universal/Local bit).',
    examNote: 'שאלה קלאסית ב-CCNA: בהינתן MAC כגון 0012.3456.789a, ה-EUI-64 יהיה 0212:34ff:fe56:789a (שימו לב שהביט השני הפך מ-0 ל-2).',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      rfcOrStandard: 'RFC 4862 / RFC 4291',
      cliExample: 'ipv6 address 2001:db8:1::/64 eui-64'
    },
    relatedTerms: ['IPv6 Addressing Architecture', 'NDP', 'MAC Address']
  },
  {
    id: 'three-tier-architecture',
    term: 'Three-Tier Hierarchical Model',
    acronym: 'Campus LAN',
    hebrewTranslation: 'מודל היררכי תלת-שכבתי',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'ארכיטקטורת רשת ארגונית קלאסית המחולקת ל-3 שכבות: Access Layer (חיבור מחשבי קצה), Distribution Layer (מדיניות, ניתוב בין VLANs, סינון ACLs), ו-Core Layer (תעבורה מהירה במיוחד ללא סינון).',
    examNote: 'ה-Collapsed Core Architecture מאחדת את שכבת ה-Core וה-Distribution לשכבה פיזית יחידה ברשתות קטנות/בינוניות לחיסכון בעלויות ציוד.',
    technicalDetails: {
      layer: 'Architecture Model',
      rfcOrStandard: 'Cisco Enterprise Architecture',
    },
    relatedTerms: ['Collapsed Core', 'Spine-Leaf Architecture', 'Access Layer']
  },
  {
    id: 'spine-leaf',
    term: 'Spine-Leaf Architecture',
    acronym: 'Clos Network',
    hebrewTranslation: 'טופולוגיית שדרה ועלים (Spine-Leaf)',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'ארכיטקטורת מרכזי נתונים (Data Center) שבה כל מתג Leaf (אליו מחוברים השרתים) מחובר לכל מתג Spine, ואין חיבורים ישירים בין מתגי Leaf בינם לבין עצמם או בין מתגי Spine.',
    examNote: 'מותאמת לתעבורת East-West (בין שרתים באותו מרכז נתונים) עם שיהוי קבוע של 2 Hops בלבד בין כל שרת לשרת.',
    technicalDetails: {
      layer: 'Data Center Architecture',
      rfcOrStandard: 'Clos Architecture / RFC 7938',
    },
    relatedTerms: ['Three-Tier Hierarchical Model', 'Cisco ACI', 'East-West Traffic']
  },
  {
    id: 'poe',
    term: 'Power over Ethernet (PoE)',
    acronym: 'PoE',
    hebrewTranslation: 'אספקת מתח על גבי כבלי רשת אתרנט',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'טכנולוגיה המאפשרת העברת מתח חשמלי יחד עם נתוני רשת על גבי כבלי UTP Twisted-Pair להזנת טלפוני IP, נקודות גישה (AP) ומצלמות אבטחה.',
    examNote: 'תקנים חשובים לבחינה: IEEE 802.3af (PoE - עד 15.4W בפורט), IEEE 802.3at (PoE+ - עד 30W), IEEE 802.3bt (Type 3 60W, Type 4 90W). ציוד מספק נקרא PSE (Power Sourcing Equipment) וציוד מקבל נקרא PD (Powered Device).',
    technicalDetails: {
      layer: 'Layer 1 (Physical)',
      rfcOrStandard: 'IEEE 802.3af / 802.3at / 802.3bt',
      cliExample: 'show power inline'
    },
    relatedTerms: ['Access Layer', 'Wireless Access Point (AP)', 'VoIP']
  },
  {
    id: 'cdp-lldp',
    term: 'CDP & LLDP Discovery Protocols',
    acronym: 'CDP / LLDP',
    hebrewTranslation: 'פרוטוקולי גילוי שכנים בשכבה 2',
    domain: 'network_fundamentals',
    category: 'fundamentals',
    definition: 'פרוטוקולים בשכבה 2 המאפשרים למכשירי רשת לגלות מידע על שכניהם המחוברים ישירות (שם מכשיר, דגם, גרסת תוכנה, ממשק מחובר, יכולות, תמיכת PoE ו-Native VLAN).',
    examNote: 'CDP הוא קנייני של סיסקו (מופעל כברירת מחדל, שולח הודעות כל 60 שניות עם Holdtime של 180 שניות). LLDP (802.1AB) הוא תקן פתוח של ה-IEEE (שולח הודעות כל 30 שניות עם Holdtime של 120 שניות).',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'Cisco Proprietary (CDP) / IEEE 802.1AB (LLDP)',
      cliExample: 'show cdp neighbors detail \n lldp run'
    },
    relatedTerms: ['MAC Address', 'VLAN', 'PoE']
  },

  // ==========================================
  // 2. NETWORK ACCESS (מיתוג ורשתות אלחוטיות)
  // ==========================================
  {
    id: 'vlan',
    term: 'Virtual Local Area Network (VLAN)',
    acronym: 'VLAN',
    hebrewTranslation: 'רשת מקומית וירטואלית',
    domain: 'network_access',
    category: 'switching',
    definition: 'חלוקה לוגית של מתג פיזי לשדות Broadcast מופרדים. מאפשרת בידוד אבטחתי, שיפור ביצועים והפחתת עומסי תעבורה.',
    examNote: 'טווח VLANs רגיל (Normal Range) הוא 1-1005 (נשמר בקובץ vlan.dat). טווח מורחב (Extended Range) הוא 1006-4094 (נשמר ב-running-config). VLAN 1 הוא ברירת המחדל ולא ניתן למחוק או לשנות אותו.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1Q',
      cliExample: 'vlan 10 \n name SALES'
    },
    relatedTerms: ['802.1Q Trunking', 'Native VLAN', 'Inter-VLAN Routing', 'VTP']
  },
  {
    id: 'dot1q',
    term: 'IEEE 802.1Q Trunking Protocol',
    acronym: '802.1Q',
    hebrewTranslation: 'תקן תיוג ערוצי Trunk',
    domain: 'network_access',
    category: 'switching',
    definition: 'הפרוטוקול התקני הבינלאומי להעברת מספר VLANs על גבי קישור פיזי בודד (Trunk). מוסיף תגית באורך 4 בתים (32 ביט) בתוך ה-Ethernet Frame הכוללת שדה VLAN ID באורך 12 ביט (ערכים 0-4095).',
    examNote: 'פרוטוקול ISL הישן של סיסקו עטף את כל ה-Frame (26 בתים כותרת ו-4 בתים סיומת), ואילו 802.1Q משתיל תגית פנימית של 4 בתים בלבד.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1Q',
      cliExample: 'switchport mode trunk \n switchport trunk allowed vlan 10,20'
    },
    relatedTerms: ['VLAN', 'Native VLAN', 'DTP', 'Inter-VLAN Routing']
  },
  {
    id: 'native-vlan',
    term: 'Native VLAN',
    acronym: 'Native VLAN',
    hebrewTranslation: 'VLAN עצמוני בלתי-מתויג ב-Trunk',
    domain: 'network_access',
    category: 'switching',
    definition: 'ה-VLAN המוגדר בקישור Trunk שכל ה-Frames המשויכים אליו מועברים ללא תגית 802.1Q (Untagged). ברירת המחדל היא VLAN 1.',
    examNote: 'התראת "Native VLAN Mismatch" נגרמת כאשר בשני צידי קישור ה-Trunk מוגדרים Native VLANs שונים. מטעמי אבטחה (למניעת התקפת VLAN Hopping), מומלץ לשנות את ה-Native VLAN מ-1 ל-VLAN שאינו בשימוש.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1Q',
      cliExample: 'switchport trunk native vlan 999'
    },
    relatedTerms: ['802.1Q Trunking', 'VLAN', 'VLAN Hopping Attack']
  },
  {
    id: 'dtp',
    term: 'Dynamic Trunking Protocol (DTP)',
    acronym: 'DTP',
    hebrewTranslation: 'פרוטוקול משא-ומתן דינמי ל-Trunk של סיסקו',
    domain: 'network_access',
    category: 'switching',
    definition: 'פרוטוקול קנייני של סיסקו המנהל משא ומתן אוטומטי בין מתגים להגדרת הממשק כ-Trunk או כ-Access.',
    examNote: 'מצבי DTP: (1) Switchport mode trunk (יוזם Trunk); (2) Switchport mode dynamic desirable (יוזם משא ומתן ל-Trunk); (3) Switchport mode dynamic auto (פסיבי, ממתין לצד השני); (4) Switchport nonegotiate (מבטל DTP לחלוטין). זכור: auto + auto = Access (לא נוצר Trunk!).',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'Cisco Proprietary',
      cliExample: 'switchport mode dynamic desirable'
    },
    relatedTerms: ['802.1Q Trunking', 'VLAN', 'VTP']
  },
  {
    id: 'stp',
    term: 'Spanning Tree Protocol (STP / 802.1D)',
    acronym: 'STP',
    hebrewTranslation: 'פרוטוקול עץ פורש למניעת לולאות מיתוג',
    domain: 'network_access',
    category: 'switching',
    definition: 'פרוטוקול שכבה 2 המונע לולאות מיתוג (Layer 2 Switching Loops וסופות Broadcast) בטופולוגיות עם קישורים כפולים ע"י חסימה לוגית ארעית של פורטים מיותרים.',
    examNote: 'מצבי פורט ב-802.1D: Blocking (20s max age) -> Listening (15s forward delay) -> Learning (15s) -> Forwarding. זמן התכנסות כולל: עד 50 שניות.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1D',
      cliExample: 'spanning-tree vlan 10 priority 24576'
    },
    relatedTerms: ['RSTP (802.1w)', 'Root Bridge', 'BPDU', 'PortFast', 'BPDU Guard']
  },
  {
    id: 'rstp',
    term: 'Rapid Spanning Tree Protocol (RSTP / 802.1w)',
    acronym: 'RSTP',
    hebrewTranslation: 'פרוטוקול עץ פורש מהיר',
    domain: 'network_access',
    category: 'switching',
    definition: 'אבולוציה של STP המספקת התכנסות מהירה בשניות בודדות באמצעות מנגנון Proposal/Agreement. מצמצם את מצבי הפורט ל-3 בלבד: Discarding, Learning, Forwarding.',
    examNote: 'תפקידי פורטים חדשים ב-RSTP: Alternate Port (גיבוי מיידי ל-Root Port) ו-Backup Port (גיבוי ל-Designated Port באותו Shared Segment). בסיסקו ברירת המחדל היא PVST+ או Rapid-PVST+ (עץ נפרד לכל VLAN).',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1w',
      cliExample: 'spanning-tree mode rapid-pvst'
    },
    relatedTerms: ['STP (802.1D)', 'Root Bridge', 'PortFast']
  },
  {
    id: 'root-bridge',
    term: 'STP Root Bridge & Bridge ID (BID)',
    acronym: 'BID',
    hebrewTranslation: 'מתג השורש ומזהה הגשר ב-STP',
    domain: 'network_access',
    category: 'switching',
    definition: 'המתג המשמש כמרכז הטופולוגיה הלוגית של STP. נבחר על פי ה-Bridge ID (BID) הנמוך ביותר ברשת.',
    examNote: 'מבנה BID באורך 8 בתים: Bridge Priority (2 בתים, בערכי כפולות של 4096 + VLAN ID) וכתובת ה-MAC של המתג (6 בתים). ברירת המחדל של Priority היא 32768.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.1D / 802.1w',
      cliExample: 'spanning-tree vlan 1 root primary'
    },
    relatedTerms: ['STP (802.1D)', 'RSTP (802.1w)', 'BPDU']
  },
  {
    id: 'portfast-bpduguard',
    term: 'PortFast & BPDU Guard',
    acronym: 'PortFast',
    hebrewTranslation: 'פורט-פאסט והגנת BPDU',
    domain: 'network_access',
    category: 'switching',
    definition: 'PortFast מעביר פורט המחובר למחשב קצה ישירות למצב Forwarding ועוקף את זמני ההמתנה. BPDU Guard מכבה את הפורט (מצב err-disabled) אם נקלטה בו הודעת BPDU של מתג זר.',
    examNote: 'PortFast מוגדר אך ורק על פורטי Access המחוברים למחשבי קצה, שרתים או מדפסות, ולעולם לא על חיבורים בין מתגים!',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'Cisco Feature',
      cliExample: 'spanning-tree portfast \n spanning-tree bpduguard enable'
    },
    relatedTerms: ['STP (802.1D)', 'RSTP (802.1w)', 'Root Guard']
  },
  {
    id: 'etherchannel',
    term: 'EtherChannel / Link Aggregation',
    acronym: 'LAG',
    hebrewTranslation: 'איגוד קישורי אתרנט לוגי',
    domain: 'network_access',
    category: 'switching',
    definition: 'איחוד של עד 8 קישורים פיזיים פעילים (ועד 8 קישורי גיבוי) לקישור לוגי בודד (Port-Channel) להגדלת רוחב הפס, שיתוף עומסים ומניעת חסימות STP.',
    examNote: 'שני הפרוטוקולים: LACP (תקן פתוח 802.3ad - מצבי Active/Passive) ו-PAgP (קנייני של סיסקו - מצבי Desirable/Auto). מצב On יוצר ערוץ ידני ללא משא ומתן. כל הפורטים חייבים להיות באותה מהירות, Duplex, VLAN ו-Trunk mode.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      rfcOrStandard: 'IEEE 802.3ad / 802.3ax',
      cliExample: 'interface range g0/1 - 2 \n channel-group 1 mode active'
    },
    relatedTerms: ['LACP', 'PAgP', 'STP (802.1D)', '802.1Q Trunking']
  },
  {
    id: 'inter-vlan-roas',
    term: 'Inter-VLAN Routing & Router-on-a-Stick (ROAS)',
    acronym: 'ROAS',
    hebrewTranslation: 'ניתוב בין VLANs ו-Router-on-a-Stick',
    domain: 'network_access',
    category: 'switching',
    definition: 'שיטה לניתוב תעבורה בין רשתות VLAN שונות בעזרת נתב חיצוני המחובר למתג בקישור Trunk יחיד. הנתב משתמש בממשקי משנה לוגיים (Sub-interfaces) עם פקודת `encapsulation dot1Q <vlan-id>`.',
    examNote: 'במתגי שכבה 3 (Layer 3 Multilayer Switch) מיושם Inter-VLAN Routing ישירות בחומרה באמצעות SVIs (Switched Virtual Interfaces) ללא צורך בנתב חיצוני.',
    technicalDetails: {
      layer: 'Layer 3 / Layer 2',
      cliExample: 'interface g0/0.10 \n encapsulation dot1Q 10 \n ip address 192.168.10.1 255.255.255.0'
    },
    relatedTerms: ['VLAN', '802.1Q Trunking', 'SVI']
  },
  {
    id: 'svi',
    term: 'Switched Virtual Interface (SVI)',
    acronym: 'SVI',
    hebrewTranslation: 'ממשק וירטואלי ממותג (Interface VLAN)',
    domain: 'network_access',
    category: 'switching',
    definition: 'ממשק לוגי בשכבה 3 המוגדר בתוך מתג (כגון `interface vlan 10`) המשמש כשער ברירת המחדל (Default Gateway) עבור ה-VLAN ומאפשר ניתוב מהיר בחומרה בין VLANs.',
    examNote: 'כדי שממשק SVI יהיה במצב Up/Up, ה-VLAN חייב להיות קיים במסד הנתונים של המתג וחייב להיות לפחות פורט פיזי אחד (Access או Trunk) פעיל (Up) המעביר את ה-VLAN הזה.',
    technicalDetails: {
      layer: 'Layer 3 (Multilayer Switch)',
      cliExample: 'ip routing \n interface vlan 10 \n ip address 192.168.10.1 255.255.255.0 \n no shutdown'
    },
    relatedTerms: ['Inter-VLAN Routing & Router-on-a-Stick (ROAS)', 'VLAN', 'Default Gateway']
  },
  {
    id: 'wlc-capwap',
    term: 'Wireless LAN Controller (WLC) & CAPWAP',
    acronym: 'WLC / CAPWAP',
    hebrewTranslation: 'בקר אלחוטי ופרוטוקול CAPWAP',
    domain: 'network_access',
    category: 'wireless',
    definition: 'בקר מרכזי המנהל נקודות גישה אלחוטיות (Lightweight APs) במודל Split-MAC. פרוטוקול CAPWAP יוצר מנהרות UDP מוצפנות בין ה-AP ל-WLC (Control בפורט 5246, Data בפורט 5247).',
    examNote: 'במודל Split-MAC: ה-AP מבצע פעולות Real-time 802.11 (Beacons, ACKs, הצפנה), בעוד ה-WLC אחראי על ניהול (אימות, Roaming, ערוצי RF, מדיניות אבטחה).',
    technicalDetails: {
      layer: 'Wireless Network Architecture',
      port: 'UDP 5246 (Control) / UDP 5247 (Data)',
      rfcOrStandard: 'RFC 5415 / RFC 5416',
    },
    relatedTerms: ['FlexConnect', 'SSID', 'WPA3', 'Lightweight AP']
  },
  {
    id: 'flexconnect',
    term: 'FlexConnect Mode',
    acronym: 'FlexConnect',
    hebrewTranslation: 'מצב נקודת גישה גמישה לסניפים מרוחקים',
    domain: 'network_access',
    category: 'wireless',
    definition: 'מצב עבודה בנקודות גישה של סיסקו המאפשר ניתוב מקומי של תעבורת הנתונים (Local Switching) ואימות מקומי בסניף מרוחק (Branch Office) גם אם הקישור ל-WLC המרכזי מתנתק.',
    examNote: 'שימושי מאוד בסניפים עם קישור WAN מוגבל כדי למנוע העברת כל תעבורת ה-Wi-Fi הפנימית הלוך ושוב למרכז הרשת.',
    technicalDetails: {
      layer: 'Wireless Network Architecture',
      rfcOrStandard: 'Cisco Feature',
    },
    relatedTerms: ['Wireless LAN Controller (WLC)', 'CAPWAP', 'SSID']
  },

  // ==========================================
  // 3. IP CONNECTIVITY (ניתוב IP ופרוטוקולים)
  // ==========================================
  {
    id: 'administrative-distance',
    term: 'Administrative Distance (AD)',
    acronym: 'AD',
    hebrewTranslation: 'מרחק מנהלי / מדד אמינות מקור ניתוב',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'ערך מספרי בין 0 ל-255 המודד את מידת האמינות של מקור הניתוב. כאשר הנתב לומד על אותו יעד מכמה פרוטוקולים שונים, הוא יכניס לטבלת הניתוב את הנתיב בעל ה-AD הנמוך ביותר.',
    examNote: 'ערכי AD הקריטיים לבחינת CCNA: Connected (0), Static (1), eBGP (20), EIGRP Internal (90), OSPF (110), IS-IS (115), RIP (120), EIGRP External (170), iBGP (200), Unreachable/Untrusted (255).',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      adMetric: 'Connected=0, Static=1, OSPF=110, RIP=120',
      cliExample: 'ip route 10.0.0.0 255.0.0.0 192.168.1.1 120'
    },
    relatedTerms: ['Routing Table', 'Floating Static Route', 'OSPF', 'Longest Prefix Match']
  },
  {
    id: 'longest-prefix-match',
    term: 'Longest Prefix Match (Prefix Length / Routing Logic)',
    acronym: 'LPM',
    hebrewTranslation: 'כלל ההתאמה הארוכה ביותר בטבלת הניתוב',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'העיקרון הבסיסי שעל פיו נתב בוחר לאן לנתב Packet: הנתב תמיד יבחר בנתיב הספציפי ביותר (מסכת הרשת הארוכה ביותר, למשל /28 לפני /24 ולפני /16), ללא קשר ל-AD או ל-Metric.',
    examNote: 'סדר החלטת הניתוב: 1. התאמת קידומת ארוכה ביותר (Longest Prefix); 2. אם יש שוויון באורך הקידומת - ה-AD הנמוך ביותר; 3. אם אותו פרוטוקול - ה-Metric הנמוך ביותר.',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      rfcOrStandard: 'RFC 1812',
    },
    relatedTerms: ['Administrative Distance (AD)', 'Routing Table', 'Default Route']
  },
  {
    id: 'floating-static-route',
    term: 'Floating Static Route',
    acronym: 'Backup Route',
    hebrewTranslation: 'ניתוב סטטי צף / ניתוב גיבוי',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'ניתוב סטטי המוגדר עם Administrative Distance ידני גבוה יותר מזה של פרוטוקול הניתוב הדינמי הראשי (למשל AD של 120 כגיבוי ל-OSPF שערכו 110).',
    examNote: 'הניתוב הסטטי ה"צף" לא יופיע בטבלת הניתוב כל עוד הקישור הראשי ו-OSPF פעילים. הוא "יצוף" וייכנס לטבלת הניתוב רק כאשר הנתיב הראשי ייפול.',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      cliExample: 'ip route 0.0.0.0 0.0.0.0 198.51.100.1 120'
    },
    relatedTerms: ['Administrative Distance (AD)', 'Static Route', 'Default Route', 'OSPF']
  },
  {
    id: 'ospf',
    term: 'Open Shortest Path First (OSPFv2 / OSPFv3)',
    acronym: 'OSPF',
    hebrewTranslation: 'פרוטוקול ניתוב דינמי מבוסס מצב קישור',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'פרוטוקול ניתוב Link-State פתוח (IGP) המשתמש באלגוריתם דייקסטרה (SPF) לחישוב הנתיב הקצר ביותר ללא לולאות. פועל ישירות מעל IP (פרוטוקול מספר 89) ללא TCP/UDP.',
    examNote: 'Metric של OSPF הוא Cost = Reference Bandwidth / Interface Bandwidth (ברירת מחדל של Reference היא 100Mbps). בממשקי Gigabit ו-10G יש לשנות את auto-cost reference-bandwidth ל-1000 או 10000 כדי לקבל עלות מדויקת.',
    technicalDetails: {
      layer: 'Layer 3 (Network)',
      protocolNumber: 89,
      adMetric: 'AD: 110',
      rfcOrStandard: 'RFC 2328 (OSPFv2) / RFC 5340 (OSPFv3)',
      cliExample: 'router ospf 1 \n router-id 1.1.1.1 \n network 10.0.0.0 0.255.255.255 area 0'
    },
    relatedTerms: ['OSPF Router ID', 'OSPF Areas & Area 0', 'DR / BDR', 'LSA', 'LSDB']
  },
  {
    id: 'ospf-router-id',
    term: 'OSPF Router ID (RID)',
    acronym: 'RID',
    hebrewTranslation: 'מזהה נתב ב-OSPF',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'מזהה ייחודי באורך 32 ביט בפורמט כתובת IPv4 המזהה את הנתב בכל הודעות ה-LSA בטופולוגיה.',
    examNote: 'סדר קביעת ה-Router ID: (1) פקודת `router-id x.x.x.x` ידנית; (2) כתובת ה-IPv4 הגבוהה ביותר על גבי ממשק Loopback פעיל; (3) כתובת ה-IPv4 הגבוהה ביותר על גבי ממשק פיזי פעיל (Up/Up).',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      cliExample: 'router ospf 1 \n router-id 1.1.1.1'
    },
    relatedTerms: ['OSPF', 'DR / BDR', 'Loopback Interface']
  },
  {
    id: 'ospf-dr-bdr',
    term: 'OSPF DR & BDR (Designated Router)',
    acronym: 'DR/BDR',
    hebrewTranslation: 'נתב מיועד ונתב מיועד לגיבוי ב-OSPF',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'נתבים הנבחרים ברשתות Multi-Access (כגון Ethernet) כדי לרכז את חילופי ה-LSAs ולמנוע הצפת הודעות (Adjacencies מצטמצמות מ-N*(N-1)/2 ל-2N-3).',
    examNote: 'כל הנתבים הרגילים (DROther) יוצרים שכנות FULL רק עם ה-DR וה-BDR, ושולחים עדכונים לכתובת Multicast 224.0.0.6 (כל ה-DRs). ה-DR שולח עדכונים ל-224.0.0.5 (כל הנתבים). נתב בעל Priority 0 לעולם לא ייבחר כ-DR/BDR.',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      cliExample: 'ip ospf priority 255'
    },
    relatedTerms: ['OSPF', 'OSPF Router ID', 'LSA', 'LSDB']
  },
  {
    id: 'ospf-areas',
    term: 'OSPF Multi-Area & Backbone Area 0',
    acronym: 'Area 0',
    hebrewTranslation: 'אזורי OSPF ואזור השדרה המרכזי',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'חלוקה היררכית של רשת OSPF לאזורים במטרה לצמצם את גודל טבלת ה-LSDB, לחסוך זיכרון ולהגביל את חישובי ה-SPF במקרה של שינויי טופולוגיה.',
    examNote: 'כלל ברזל ב-OSPF: כל אזור שאינו Backbone (Non-Backbone Area) חייב להיות מחובר ישירות פיזית או לוגית לאזור 0 (Backbone Area). נתב המחבר בין אזור רגיל לאזור 0 נקרא ABR (Area Border Router).',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      rfcOrStandard: 'RFC 2328',
    },
    relatedTerms: ['OSPF', 'ABR', 'ASBR', 'LSA']
  },
  {
    id: 'ospf-neighbor-states',
    term: 'OSPF Neighbor States',
    acronym: 'OSPF States',
    hebrewTranslation: 'שלבי התהוות שכנות ב-OSPF',
    domain: 'ip_connectivity',
    category: 'routing',
    definition: 'שבעת השלבים ביצירת יחסי שכנות בין נתבי OSPF: Down -> Init (קבלת Hello ראשון) -> 2-Way (הנתב רואה את ה-RID של עצמו ב-Hello של השני, בחירת DR/BDR) -> ExStart (קביעת Master/Slave ו-Sequence) -> Exchange (החלפת DBDs) -> Loading (בקשת LSAs חסרים ב-LSR) -> Full (סנכרון מלא של ה-LSDB).',
    examNote: 'תנאי חובה ליצירת שכנות OSPF: אותם Hello/Dead Timers, אותו Area ID, אותו Subnet & Mask, אותה סיסמת אימות (Authentication), וערכי Stub Flag תואמים.',
    technicalDetails: {
      layer: 'Layer 3 (Routing)',
      cliExample: 'show ip ospf neighbor'
    },
    relatedTerms: ['OSPF', 'DR / BDR', 'LSDB']
  },

  // ==========================================
  // 4. IP SERVICES (שירותי תשתית ו-IP)
  // ==========================================
  {
    id: 'dhcp-dora',
    term: 'DHCP & DORA Process',
    acronym: 'DHCP',
    hebrewTranslation: 'פרוטוקול הקצאת כתובות דינמי ותהליך DORA',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול שרת-לקוח להקצאה אוטומטית של כתובות IP, מסכות סאבנט, שער ברירת מחדל ושרתי DNS. תהליך ההתקשרות בן 4 השלבים נקרא DORA: Discover (לקוח), Offer (שרת), Request (לקוח), Acknowledge (שרת).',
    examNote: 'שלבי Discover ו-Request נשלחים כ-Broadcast. הודעות DHCP של לקוחות יוצאות מפורט UDP 68 אל פורט UDP 67 בשרת.',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'UDP 67 (Server) / UDP 68 (Client)',
      rfcOrStandard: 'RFC 2131',
      cliExample: 'ip dhcp pool LAN_POOL \n network 192.168.1.0 255.255.255.0 \n default-router 192.168.1.1'
    },
    relatedTerms: ['DHCP Relay Agent', 'DHCP Snooping', 'APIPA', 'DNS']
  },
  {
    id: 'dhcp-relay',
    term: 'DHCP Relay Agent (ip helper-address)',
    acronym: 'Helper Address',
    hebrewTranslation: 'סוכן ממסר DHCP בממשק נתב',
    domain: 'ip_services',
    category: 'services',
    definition: 'הגדרה בממשק נתב הקולטת הודעות Broadcast של DHCP מלקוחות וממירה אותן לחבילות Unicast המנותבות ישירות אל שרת ה-DHCP ברשת אחרת.',
    examNote: 'פקודת `ip helper-address <ip-server>` מוגדרת תמיד על הממשק הפונה אל רשת הלקוחות (Inbound interface). כברירת מחדל היא ממסרת גם פרוטוקולים נוספים: TFTP, DNS, NTP, TACACS ועוד.',
    technicalDetails: {
      layer: 'Layer 3 / Layer 7',
      cliExample: 'interface g0/0 \n ip helper-address 10.1.1.50'
    },
    relatedTerms: ['DHCP & DORA Process', 'Default Gateway', 'Broadcast Domain']
  },
  {
    id: 'dns-records',
    term: 'Domain Name System (DNS) & Record Types',
    acronym: 'DNS',
    hebrewTranslation: 'מערכת שמות מתחם וסוגי רשומות DNS',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול המתרגם שמות מחשבים ואתרים (FQDN) לכתובות IP. משתמש בפורט UDP/TCP 53. סוגי רשומות מרכזיים: A (IPv4), AAAA (IPv6), CNAME (כינוי/Alias), MX (שרתי דואר Mail Exchange), PTR (Reverse DNS מ-IP לשם), NS (Name Server).',
    examNote: 'שאלה שכיחה: זיהוי רשומת IPv6 שהיא AAAA (Quad-A) לעומת רשומת IPv4 שהיא A.',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'UDP / TCP 53',
      rfcOrStandard: 'RFC 1034 / RFC 1035',
    },
    relatedTerms: ['DHCP & DORA Process', 'IPv4 Packet Header', 'IPv6 Addressing Architecture']
  },
  {
    id: 'nat-pat',
    term: 'NAT & PAT (Network / Port Address Translation)',
    acronym: 'NAT / PAT',
    hebrewTranslation: 'תרגום כתובות רשת ותרגום פורטים',
    domain: 'ip_services',
    category: 'services',
    definition: 'מנגנון לתרגום כתובות IP פרטיות (RFC 1918: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) לכתובות ציבוריות מנותבות באינטרנט. PAT (המכונה גם NAT Overload) ממפה אלפי מחשבים לכתובת ציבורית יחידה באמצעות מספרי פורטים.',
    examNote: 'מינוח קריטי בסיסקו: Inside Local (כתובת פרטית של המחשב הפנימי), Inside Global (כתובת ציבורית המייצגת את המחשב כלפי חוץ), Outside Local ו-Outside Global (כתובות היעד החיצוני).',
    technicalDetails: {
      layer: 'Layer 3/4',
      rfcOrStandard: 'RFC 1631 / RFC 3022',
      cliExample: 'ip nat inside source list 1 interface GigabitEthernet0/1 overload'
    },
    relatedTerms: ['Static NAT', 'Dynamic NAT', 'RFC 1918 Private IP']
  },
  {
    id: 'hsrp',
    term: 'Hot Standby Router Protocol (HSRP)',
    acronym: 'HSRP',
    hebrewTranslation: 'פרוטוקול יתירות נתבים של סיסקו (FHRP)',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול קנייני של סיסקו מסוג FHRP המאפשר לשני נתבים פיזיים או יותר לחלוק כתובת IP וירטואלית וכתובת MAC וירטואלית המשמשות כשער ברירת מחדל יתיר (Default Gateway) למחשבי הקצה.',
    examNote: 'נתב בעל ה-Priority הגבוה ביותר (ברירת מחדל 100) נבחר כ-Active והשני כ-Standby. כדי שנתב שחזר לפעול ייקח בחזרה את התפקיד כ-Active, חובה להגדיר עליו `standby <group> preempt`. כתובת MAC וירטואלית ב-HSRPv1 היא 0000.0c07.acXX (כאשר XX הוא מספר הקבוצה).',
    technicalDetails: {
      layer: 'Layer 3 (Gateway Redundancy)',
      port: 'UDP 1985 (HSRPv1) / UDP 2022 (HSRPv2)',
      rfcOrStandard: 'RFC 2281 (Cisco Proprietary)',
      cliExample: 'interface g0/0 \n standby 1 ip 192.168.1.1 \n standby 1 priority 110 \n standby 1 preempt'
    },
    relatedTerms: ['VRRP', 'GLBP', 'Default Gateway']
  },
  {
    id: 'ntp',
    term: 'Network Time Protocol (NTP)',
    acronym: 'NTP',
    hebrewTranslation: 'פרוטוקול סנכרון שעוני רשת',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול לסנכרון מדויק של שעוני מכשירי הרשת (נתבים, מתגים, שרתים). קריטי לחקירת אירועי אבטחה, רישום לוגים ב-Syslog ואימות תעודות דיגיטליות.',
    examNote: 'פועל על גבי UDP פורט 123. משתמש במדרג דיוק הנקרא Stratum (ערכים 0-15; Stratum 0 הוא שעון אטומי/GPS, שרת המחובר אליו ישירות הוא Stratum 1, מכשיר הלומד ממנו הוא Stratum 2. ערך Stratum 16 מסמל שעון לא מסונכרן ולא תקין).',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'UDP 123',
      rfcOrStandard: 'RFC 5905',
      cliExample: 'ntp server 203.0.113.10'
    },
    relatedTerms: ['Syslog', 'SNMP', 'Stratum Level']
  },
  {
    id: 'syslog',
    term: 'Syslog Protocol & Severity Levels',
    acronym: 'Syslog',
    hebrewTranslation: 'פרוטוקול תיעוד לוגים ורמות חומרה',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול להעברת הודעות התראה ולוגים ממכשירי רשת לשרת מרכזי (Syslog Server) או למסך הקונסול. פועל בפורט UDP 514.',
    examNote: 'חובה לשנן בעל פה את 8 רמות החומרה (0-7): 0=Emergency (המערכת אינה שמישה), 1=Alert (נדרשת פעולה מיידית), 2=Critical, 3=Error, 4=Warning, 5=Notification (אירוע תקין חשוב, כגון ממשק שעלה), 6=Informational, 7=Debugging. משפט עזר באנגלית: "Every Awesome Cisco Engineer Will Need Ice Drinks".',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'UDP 514',
      rfcOrStandard: 'RFC 5424',
      cliExample: 'logging host 192.168.1.100 \n logging trap 4'
    },
    relatedTerms: ['NTP', 'SNMP', 'Logging Severity Levels']
  },
  {
    id: 'snmp',
    term: 'Simple Network Management Protocol (SNMP)',
    acronym: 'SNMP',
    hebrewTranslation: 'פרוטוקול ניהול וניטור רשת פשוט',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקול ניטור המאפשר לשרת ניהול (NMS) לתשאל סוכנים (Agents) במכשירי הרשת באמצעות OID ו-MIB, ולקבל התראות יזומות (Traps).',
    examNote: 'גרסאות SNMP: גרסאות v1 ו-v2c אינן מוצפנות ומשתמשות בסיסמה פשוטה (Community String: Read-Only או Read-Write). גרסה SNMPv3 היא היחידה המאובטחת הכוללת אימות והצפנה חזקה (AuthPriv).',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'UDP 161 (Polling) / UDP 162 (Traps)',
      rfcOrStandard: 'RFC 3411 - 3418',
      cliExample: 'snmp-server community PUBLIC ro'
    },
    relatedTerms: ['Syslog', 'NMS', 'MIB', 'SNMPv3']
  },
  {
    id: 'ssh-telnet',
    term: 'SSH (Secure Shell) vs Telnet',
    acronym: 'SSH / Telnet',
    hebrewTranslation: 'גישה ניהולית מאובטחת ב-SSH לעומת Telnet',
    domain: 'ip_services',
    category: 'services',
    definition: 'פרוטוקולים לגישה מרחוק לשורת הפקודה (CLI) של מכשירי רשת. Telnet שולח נתונים וסיסמאות בטקסט גלוי (Cleartext) בפורט TCP 23. SSH מצפין את כל התעבורה בפורט TCP 22.',
    examNote: 'דרישות להגדרת SSH בנתב/מתג סיסקו: (1) הגדרת שם מכשיר ייחודי (`hostname`); (2) הגדרת שם מתחם (`ip domain-name`); (3) יצירת מפתחות הצפנה (`crypto key generate rsa`); (4) יצירת משתמש מקומי (`username`); (5) אכיפת SSH תחת קווי ה-VTY (`transport input ssh`).',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'SSH: TCP 22 / Telnet: TCP 23',
      rfcOrStandard: 'RFC 4253 (SSH)',
      cliExample: 'crypto key generate rsa modulus 2048 \n line vty 0 4 \n transport input ssh \n login local'
    },
    relatedTerms: ['AAA Framework, TACACS+ & RADIUS', 'Port Security']
  },
  {
    id: 'qos',
    term: 'Quality of Service (QoS / DSCP / CoS)',
    acronym: 'QoS',
    hebrewTranslation: 'איכות שירות ותעדוף תעבורה',
    domain: 'ip_services',
    category: 'services',
    definition: 'מערך מנגנונים לזיהוי, סיווג (Classification), תיוג (Marking) ותעדוף (Queuing, Policing, Shaping) של תעבורה רגישה לשיהוי ועיוות (Jitter) כמו Voice ו-Video.',
    examNote: 'תיוג בשכבה 2: CoS (3 ביט בכותרת 802.1Q). תיוג בשכבה 3: DSCP (6 ביטים בשדה ToS/Traffic Class, 64 ערכים אפשריים). ערך DSCP הקריטי לבחינה: Expedited Forwarding (EF = 46 / Binary 101110) המיועד אך ורק לתעבורת קול (Voice Payload).',
    technicalDetails: {
      layer: 'Layer 2 & Layer 3',
      rfcOrStandard: 'RFC 2474 / RFC 2598',
    },
    relatedTerms: ['DSCP', 'CoS', 'Voice over IP (VoIP)', 'Jitter']
  },

  // ==========================================
  // 5. SECURITY FUNDAMENTALS (אבטחת מידע וסייבר)
  // ==========================================
  {
    id: 'acl',
    term: 'Access Control List (Standard vs Extended ACL)',
    acronym: 'ACL',
    hebrewTranslation: 'רשימת בקרת גישה וסינון חבילות',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'סדרת חוקים עוקבים המיושמת על ממשק נתב (Inbound או Outbound) לצורך סינון תעבורה (Permit או Deny) על פי כתובות IP, פרוטוקולים ומספרי פורטים.',
    examNote: 'כללי מיקום מפתח ב-CCNA: Standard ACL (בודק רק כתובת IP מקור, טווחים 1-99 ו-1300-1999) - יש למקם קרוב ככל האפשר ליעד! Extended ACL (בודק מקור, יעד, פרוטוקול ופורט, טווחים 100-199 ו-2000-2699) - יש למקם קרוב ככל האפשר למקור! זכור: בסוף כל ACL קיים חוק בלתי נראה: "Deny Any Any".',
    technicalDetails: {
      layer: 'Layer 3/4 Filtering',
      cliExample: 'access-list 101 permit tcp 192.168.1.0 0.0.0.255 any eq 443 \n interface g0/0 \n ip access-group 101 in'
    },
    relatedTerms: ['Wildcard Mask', 'Port Security', 'Firewall']
  },
  {
    id: 'port-security',
    term: 'Cisco Port Security',
    acronym: 'Port-Security',
    hebrewTranslation: 'אבטחת מבואות במתגי סיסקו',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'מנגנון במתגי Access המגביל את כמות כתובות ה-MAC של מחשבים המורשים להתחבר לפורט יחיד, ומונע התקפות מסוג MAC Flooding.',
    examNote: 'שלושה מצבי ענישה (Violation Modes): 1. Protect (חוסם תעבורה חריגה ללא דיווח); 2. Restrict (חוסם, מעלה מונה שגיאות ושולח הודעת Syslog/SNMP Trap); 3. Shutdown (מצב ברירת המחדל - מכבה את הפורט ומעביר אותו למצב err-disabled). שיטת Sticky שומרת את ה-MACs הנלמדים ישירות ל-running-config.',
    technicalDetails: {
      layer: 'Layer 2 (Data Link)',
      cliExample: 'switchport port-security \n switchport port-security maximum 2 \n switchport port-security mac-address sticky \n switchport port-security violation restrict'
    },
    relatedTerms: ['DHCP Snooping', 'Dynamic ARP Inspection (DAI)', 'MAC Address']
  },
  {
    id: 'dhcp-snooping',
    term: 'DHCP Snooping',
    acronym: 'DHCP Snooping',
    hebrewTranslation: 'מנגנון הגנה מפני שרתי DHCP זדוניים',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'תכונת אבטחה בשכבה 2 המסווגת פורטים במתג ל-Trusted (אליהם מחובר שרת DHCP מורשה) ול-Untrusted (מחוברים למשתמשים). הודעות DHCP Offer / ACK החוזרות מפורט Untrusted נחסמות מיידית.',
    examNote: 'המתג בונה טבלת מעקב (DHCP Snooping Binding Database) המכילה מיפוי של MAC, IP מושכר, Lease time, VLAN ומספר פורט. טבלה זו מהווה את התשתית הקריטית לפעולת DAI ו-IP Source Guard.',
    technicalDetails: {
      layer: 'Layer 2 (Security)',
      cliExample: 'ip dhcp snooping \n ip dhcp snooping vlan 10 \n interface g0/1 \n ip dhcp snooping trust'
    },
    relatedTerms: ['Dynamic ARP Inspection (DAI)', 'IP Source Guard', 'DHCP & DORA Process']
  },
  {
    id: 'dai',
    term: 'Dynamic ARP Inspection (DAI)',
    acronym: 'DAI',
    hebrewTranslation: 'בדיקת ARP דינמית למניעת ARP Poisoning',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'מנגנון אבטחה במתג המגן מפני התקפות מסוג Man-in-the-Middle ו-ARP Spoofing ע"י יירוט ואימות כל חבילות ה-ARP על גבי פורטים Untrusted אל מול טבלת ה-DHCP Snooping Binding Database.',
    examNote: 'דורש הגדרה מקדימה של DHCP Snooping! פורטים המחוברים למתגים או נתבים מוגדרים כ-Trusted (`ip arp inspection trust`), ופורטי משתמשי קצה נשארים Untrusted כברירת מחדל.',
    technicalDetails: {
      layer: 'Layer 2 (Security)',
      cliExample: 'ip arp inspection vlan 10 \n interface g0/1 \n ip arp inspection trust'
    },
    relatedTerms: ['DHCP Snooping', 'ARP Spoofing / Poisoning', 'IP Source Guard']
  },
  {
    id: 'aaa-tacacs-radius',
    term: 'AAA Framework, TACACS+ & RADIUS',
    acronym: 'AAA',
    hebrewTranslation: 'מערך ניהול גישה, אימות והרשאות (AAA)',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'מודל ארגוני לבקרת גישה הכולל Authentication (מי אתה?), Authorization (מה מותר לך לעשות?), ו-Accounting (מה עשית בפועל ומתי?).',
    examNote: 'הבדלים עיקריים בין הפרוטוקולים לבחינה: TACACS+ (פותח ע"י סיסקו, פועל על גבי TCP פורט 49, מפריד לחלוטין את שלושת ה-A, ומצפין את כל תוכן החבילה - אידיאלי לניהול ציוד רשת Device Admin). לעומתו, RADIUS (תקן פתוח IETF, פועל על גבי UDP פורטים 1812/1813, משלב Auth+Auth ומצפין רק את הסיסמה - אידיאלי לרשתות 802.1X ו-VPN).',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      port: 'TACACS+: TCP 49 / RADIUS: UDP 1812, 1813',
      rfcOrStandard: 'RFC 8907 (TACACS+) / RFC 2865 (RADIUS)',
    },
    relatedTerms: ['802.1X', 'WPA3 Enterprise', 'SSH']
  },
  {
    id: 'vpn-ipsec',
    term: 'Virtual Private Network (VPN) & IPsec',
    acronym: 'IPsec VPN',
    hebrewTranslation: 'רשת פרטית וירטואלית ופרוטוקול IPsec',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'חיבור מאובטח ומוצפן מעל גבי רשת בלתי מאובטחת (כמו האינטרנט). IPsec מספק ארבע תכונות ליבה: סודיות (Confidentiality via AES/3DES), שלמות (Integrity via SHA), אימות (Authentication via PSK/RSA), ומניעת שידור חוזר (Anti-Replay).',
    examNote: 'שני פרוטוקולי הליבה של IPsec: ESP (Encapsulating Security Payload - פרוטוקול IP 50, מספק הצפנה ואימות) ו-AH (Authentication Header - פרוטוקול IP 51, מספק אימות ללא הצפנה). IKE משתמש בפורט UDP 500 לניהול מפתחות.',
    technicalDetails: {
      layer: 'Layer 3 (Network Security)',
      protocolNumber: 'ESP: 50 / AH: 51 / IKE: UDP 500',
      rfcOrStandard: 'RFC 4301 / RFC 7296',
    },
    relatedTerms: ['Site-to-Site VPN', 'Remote Access VPN', 'CIA Triad']
  },
  {
    id: 'ngfw-ips',
    term: 'Next-Generation Firewall (NGFW) & IPS',
    acronym: 'NGFW / IPS',
    hebrewTranslation: 'חומת אש מהדור הבא ומערכת מניעת חדירות',
    domain: 'security_fundamentals',
    category: 'security',
    definition: 'חומת אש מתקדמת הפועלת עד שכבה 7 (Application Layer) ומספקת בדיקת עומק של חבילות (Deep Packet Inspection), זיהוי אפליקציות ומשתמשים (User-ID/App-ID), מערכת מניעת חדירות מובנית (IPS), וסינון קישורים (URL Filtering).',
    examNote: 'ההבדל בין IDS ל-IPS: מערכת IDS (Intrusion Detection) פועלת במקביל (Promiscuous mode) ורק מתריעה על איומים; מערכת IPS (Intrusion Prevention) ממוקמת בתווך (In-line) וחוסמת תעבורה זדונית בזמן אמת.',
    technicalDetails: {
      layer: 'Layers 3-7 Security',
    },
    relatedTerms: ['Access Control List (ACL)', 'Stateful Firewall', 'CIA Triad']
  },

  // ==========================================
  // 6. AUTOMATION & PROGRAMMABILITY (אוטומציה ו-SDN)
  // ==========================================
  {
    id: 'sdn-architecture',
    term: 'SDN Architecture & Planes',
    acronym: 'SDN',
    hebrewTranslation: 'ארכיטקטורת רשת מוגדרת תוכנה ומישורי פעולה',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'ארכיטקטורה המפרידה את מישור הבקרה (Control Plane - החלטות ניתוב, OSPF, STP) מהתקני הרשת הפיזיים ומעבירה אותו לבקר תוכנה מרכזי (SDN Controller), בעוד ההתקנים עצמם נשארים עם מישור הנתונים (Data/Data Plane) להעברת פאקטים מהירה בחומרה.',
    examNote: 'שלושת המישורים: Data Plane (העברת ביטים ו-Packets), Control Plane (בניית טבלאות ניתוב ו-MAC), Management Plane (גישה ניהולית SSH, SNMP, HTTP).',
    technicalDetails: {
      layer: 'Network Automation Architecture',
      rfcOrStandard: 'ONF SDN Architecture',
    },
    relatedTerms: ['Northbound API', 'Southbound API', 'Cisco Catalyst Center', 'Cisco SD-WAN']
  },
  {
    id: 'northbound-southbound-apis',
    term: 'Northbound & Southbound APIs',
    acronym: 'SDN APIs',
    hebrewTranslation: 'ממשקי API צפוניים ודרומיים ב-SDN',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'Northbound APIs מקשרים בין בקר ה-SDN ליישומים ותוכנות ניהול עסקיות מלמעלה (מיושם ב-REST APIs). Southbound APIs מקשרים בין בקר ה-SDN להתקני הרשת הפיזיים למטה (כגון NETCONF, RESTCONF, OpenFlow, gRPC).',
    examNote: 'שאלת זיהוי פופולרית ב-CCNA: Northbound מדבר עם Applications דרך REST/JSON, Southbound מדבר עם Switches & Routers דרך NETCONF/OpenFlow.',
    technicalDetails: {
      layer: 'Automation Architecture',
      rfcOrStandard: 'IETF / OpenFlow',
    },
    relatedTerms: ['REST API', 'NETCONF & RESTCONF', 'SDN Architecture']
  },
  {
    id: 'rest-api',
    term: 'REST API & HTTP Verbs',
    acronym: 'REST API',
    hebrewTranslation: 'ממשק תכנות יישומים מבוסס REST ופעולות HTTP',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'ממשק תקשורת נטול-מצב (Stateless) הפועל מעל HTTPS ומאפשר לתכנות וסקריפטים לתקשר עם בקרי רשת באמצעות פעולות CRUD: Create (POST), Read (GET), Update (PUT/PATCH), Delete (DELETE).',
    examNote: 'קודי תגובה (HTTP Status Codes) שחובה להכיר לבחינה: 200 OK (הצלחה), 201 Created (נוצר אובייקט בהצלחה), 400 Bad Request (שגיאת תחביר בבקשה), 401 Unauthorized (חוסר אימות/סיסמה שגויה), 403 Forbidden (אין הרשאה), 404 Not Found (הנתיב לא נמצא), 500 Internal Server Error (שגיאה פנימית בשרת).',
    technicalDetails: {
      layer: 'Layer 7 (Application)',
      rfcOrStandard: 'RFC 7231',
    },
    relatedTerms: ['JSON', 'Northbound API', 'Cisco Catalyst Center']
  },
  {
    id: 'json-serialization',
    term: 'JSON (JavaScript Object Notation)',
    acronym: 'JSON',
    hebrewTranslation: 'פורמט ייצוג נתונים טקסטואלי JSON',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'מבנה נתונים קריא וקל משקל להעברת מידע בין יישומים ובקרי SDN. מבוסס על זוגות של מפתח וערך (Key-Value Pairs) ומערכים (Arrays).',
    examNote: 'כללי תחביר JSON קריטיים לבחינה: אובייקט עטוף בסוגריים מסולסלים `{}`. מערך עטוף בסוגריים מרובעים `[]`. כל מפתח (Key) חייב להיות עטוף במרכאות כפולות `""`. ערכים יכולים להיות מחרוזת, מספר, בוליאני (true/false) או null.',
    technicalDetails: {
      layer: 'Data Serialization',
      rfcOrStandard: 'RFC 8259',
    },
    relatedTerms: ['YAML', 'XML', 'REST API', 'YANG Data Modeling']
  },
  {
    id: 'yaml-xml',
    term: 'YAML & XML Data Formats',
    acronym: 'YAML / XML',
    hebrewTranslation: 'פורמטי ייצוג נתונים YAML ו-XML',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'YAML: פורמט קריא במיוחד מבוסס הזחות (Indentation) ורווחים (ללא טאבים!), הנמצא בשימוש נרחב בכלי Ansible. XML: פורמט מבוסס תגיות פתיחה וסגירה `<tag></tag>` המשמש בפרוטוקול NETCONF.',
    examNote: 'במבחן תתבקש לזהות קטע קוד: אם הוא מבוסס הזחות ומקפים `- item` = YAML; אם הוא מבוסס תגיות `<interface>` = XML; אם הוא מבוסס מסולסלים `{"key": "value"}` = JSON.',
    technicalDetails: {
      layer: 'Data Serialization',
      rfcOrStandard: 'W3C XML / YAML 1.2 Spec',
    },
    relatedTerms: ['JSON', 'Ansible', 'NETCONF & RESTCONF']
  },
  {
    id: 'config-management',
    term: 'Configuration Management Tools (Ansible, Puppet, Chef)',
    acronym: 'DevOps / IAC',
    hebrewTranslation: 'כלי ניהול תצורה ואוטומציה (Ansible, Puppet, Chef)',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'כלים לניהול תצורה ואוטומציה מרכזית של הגדרות ציוד רשת (Infrastructure as Code - IaC).',
    examNote: 'השוואה קריטית ל-CCNA: Ansible: ללא סוכן (Agentless), פועל ב-Push מעל SSH, נכתב ב-Python ומשתמש ב-Playbooks בפורמט YAML. Puppet: מבוסס סוכן (Agent-based) ב-Pull מעל TCP 8140, נכתב ב-Ruby (Manifests). Chef: מבוסס סוכן (Agent-based) ב-Pull מעל TCP 10002, נכתב ב-Ruby (Cookbooks/Recipes).',
    technicalDetails: {
      layer: 'DevOps / Automation Tools',
    },
    relatedTerms: ['YAML', 'REST API', 'Git Version Control']
  },
  {
    id: 'netconf-restconf-yang',
    term: 'NETCONF, RESTCONF & YANG Data Modeling',
    acronym: 'NETCONF/RESTCONF',
    hebrewTranslation: 'פרוטוקולי ניהול רשת מודרניים ומודל נתוני YANG',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'טכנולוגיות מחליפות SNMP ו-CLI: YANG היא שפת מידול הנתונים (Data Modeling Language) המגדירה מה ניתן לקרוא ולהגדיר. NETCONF מתקשר מעל SSH בפורט TCP 830 ומשתמש ב-XML. RESTCONF מתקשר מעל HTTPS בפורט 443 ומשתמש ב-JSON או XML.',
    examNote: 'זכור: YANG אינו פרוטוקול אלא מודל מבנה נתונים! NETCONF ו-RESTCONF הם הפרוטוקולים שמעבירים את המידע הממודל ע"י YANG.',
    technicalDetails: {
      layer: 'Network Management Protocols',
      port: 'NETCONF: TCP 830 / RESTCONF: HTTPS 443',
      rfcOrStandard: 'RFC 6020 (YANG) / RFC 6241 (NETCONF) / RFC 8040 (RESTCONF)',
    },
    relatedTerms: ['YANG Data Modeling', 'XML', 'JSON', 'REST API']
  },
  {
    id: 'cisco-sdwan-architecture',
    term: 'Cisco SD-WAN Architecture (vManage, vSmart, vBond, vEdge)',
    acronym: 'SD-WAN',
    hebrewTranslation: 'ארכיטקטורת רשת מרחבית מוגדרת תוכנה (Cisco SD-WAN)',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'ארכיטקטורת WAN המחלקת את התפקידים ל-4 מישורים עצמאיים: vManage (Management Plane - ממשק משתמש וניהול), vSmart (Control Plane - החלטות ניתוב ומדיניות דרך OMP), vBond (Orchestration Plane - אימות והפעלת נתבים), ו-vEdge/cEdge (Data Plane - העברת תעבורה מוצפנת ב-IPsec על גבי ה-Overlay).',
    examNote: 'חובה לזכור את ההתאמה בין הרכיב למישור: vManage=Management, vSmart=Control, vBond=Orchestration, vEdge=Data.',
    technicalDetails: {
      layer: 'SD-WAN Architecture',
    },
    relatedTerms: ['SDN Architecture', 'Overlay vs Underlay', 'IPsec VPN']
  },
  {
    id: 'overlay-underlay-vxlan',
    term: 'Overlay, Underlay & VXLAN Fabric',
    acronym: 'Fabric / VXLAN',
    hebrewTranslation: 'רשתות Overlay, Underlay ומנהור VXLAN',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'Underlay: הרשת הפיזית הכוללת נתבים, מתגים וכבלי סיבים עם פרוטוקולי ניתוב (כמו IS-IS או OSPF). Overlay: הרשת הלוגית הוירטואלית הנבנית מעל ה-Underlay ומאפשרת העברת שכבה 2 ו-3 בצורה מבודדת באמצעות מנהור VXLAN (Encapsulation עם כותרת UDP פורט 4789).',
    examNote: 'טכנולוגיית הליבה של Cisco Software-Defined Access (SDA) ומרכזי נתונים מודרניים.',
    technicalDetails: {
      layer: 'Network Virtualization',
      port: 'VXLAN: UDP 4789',
      rfcOrStandard: 'RFC 7348 (VXLAN)',
    },
    relatedTerms: ['Cisco Catalyst Center (DNA Center)', 'Spine-Leaf Architecture', 'CAPWAP']
  },
  {
    id: 'git',
    term: 'Git Version Control',
    acronym: 'Git',
    hebrewTranslation: 'מערכת בקרת גרסאות מבוזרת Git',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'מערכת לניהול גרסאות קוד וקובצי תצורה של רשתות. מאפשרת מעקב אחרי שינויים, שחזור גרסאות קודמות ועבודה בצוות.',
    examNote: 'פקודות בסיס ב-Git שמופיעות ב-CCNA: `git init` (יצירת מאגר), `git clone` (שכפול מאגר מרוחק), `git add` (העברה ל-Staging), `git commit -m` (שמירת נקודת זמן), `git push` (העלאה לשרת מרוחק כגון GitHub), `git pull` (משיכת עדכונים), `git branch` ו-`git merge`.',
    technicalDetails: {
      layer: 'Version Control Software',
    },
    relatedTerms: ['Ansible', 'REST API', 'JSON']
  },
  {
    id: 'cisco-catalyst-center',
    term: 'Cisco Catalyst Center (DNA Center)',
    acronym: 'DNA Center',
    hebrewTranslation: 'מרכז הבקרה והניהול של סיסקו לרשתות ארגוניות',
    domain: 'automation_programmability',
    category: 'automation',
    definition: 'בקר SDN ופלטפורמת ניהול תוכנה מרכזית של סיסקו לרשתות קמפוס. מספק 4 פונקציות ליבה: Design (תכנון הרשת), Policy (הגדרת מדיניות ארגונית), Provision (הפצה אוטומטית של הגדרות), ו-Assurance (ניטור מבוסס AI של בריאות הרשת).',
    examNote: 'מהווה את בקר הניהול של Cisco SD-Access (SDA) המשתמש ב-LISP (Control Plane), VXLAN (Data Plane) ו-TrustSec (Policy).',
    technicalDetails: {
      layer: 'Network Controller / SDN Platform',
    },
    relatedTerms: ['SDN Architecture', 'Cisco SD-WAN Architecture (vManage, vSmart, vBond, vEdge)', 'Overlay, Underlay & VXLAN Fabric']
  }
];
