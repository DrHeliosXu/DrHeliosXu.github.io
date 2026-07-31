// 多语言节气名称
const solarTermTranslations = {
chinese: [
    "小寒 ✶",
    "大寒 ✷",
    "立春 ✿",
    "雨水 ⛆",
    "惊蛰 ຊ",
    "春分 ◐",
    "清明 ⚘",
    "谷雨 ⛆",
    "立夏 ☉",
    "小满 𖢺",
    "芒种 𖧷",
    "夏至 ✧",
    "小暑 ✼",
    "大暑 ✼",
    "立秋 🝮",
    "处暑 ෆ",
    "白露 𑃢",
    "秋分 ◑",
    "寒露 ୭",
    "霜降 ত",
    "立冬 ꉙ",
    "小雪 ❅",
    "大雪 ❅",
    "冬至 𑫏"
],


tibetan: [
  "གྲང་ངར་ཆུང་བ།",
  "གྲང་ངར་ཆེ་བ།",
  "དཔྱིད་ཀྱི་མགོ་བརྩམས།",
  "ཆར་ཆུ།",
  "འབུ་སྲིན་གྱི་གཉིད་སད་པ།",
  "དཔྱིད་ཀྱི་མཚན་མཉམ།",
  "འོད་མདངས་དྭངས་མོ།",
  "འབྲུའི་ཆར་ཆུ།",
  "དབྱར་ཁའི་མགོ་བརྩམས།",
  "འབྲུ་རིགས་ཀྱི་ཁེངས་ཚད།",
  "རྨ་ཁའི་ནང་དུ་འབྲུ་རིགས།",
  "དབྱར་ཁའི་ཉི་ལྡེབ།",
  "ཚ་དྲོད་ཉུང་བ།",
  "དྲོད་ཚད་ཆེ་བ།",
  "སྟོན་ཁའི་འགོ་སྟོན",
  "ཚ་བའི་མཇུག",
  "ཆར་ཆུ་དཀར་པོ།",
  "སྟོན་ཁའི་ཉིན་མོ་མཉམ་མོ།",
  "གྲང་མོ་ཆར་ཆུ",
  "འཁྱགས་རོམ་གྱི་མར་འབབ་པ།",
  "དགུན་ཁའི་འགོ་སྟོན",
  "ཁ་བ་ཆུང་བ།",
  "གངས་ཆེན་པོ།",
  "དགུན་ཉི་ལྡེབ།"
  ],


  thai: [
    "หนาวเล็ก ✶",       // 小寒
    "หนาวใหญ่ ✷",       // 大寒
    "เริ่มต้นฤดูใบไม้ผลิ ✿", // 立春
    "น้ำค้างฝน ⛆",       // 雨水
    "แมลงตื่นจากจำศีล ຊ",  // 惊蛰
    "วสันตวิษุวัต ◐",     // 春分
    "ชิงหมิง ⚘",         // 清明
    "ฝนหล่อเลี้ยงต้นกล้า ⛆", // 谷雨
    "เริ่มต้นฤดูร้อน ☉",   // 立夏
    "ธัญญาหารสมบูรณ์ 𖢺", // 小满
    "รวงข้าวเริ่มออกรวง 𖧷", // 芒种
    "ครีษมายัน ✧",       // 夏至
    "ร้อนเล็ก ✼",       // 小暑
    "ร้อนใหญ่ ✼",       // 大暑
    "เริ่มต้นฤดูใบไม้ร่วง 🝮", // 立秋
    "สิ้นสุดความร้อน ෆ",     // 处暑
    "น้ำค้างขาว 𑃢",       // 白露
    "ศารทวิษุวัต ◑",       // 秋分
    "น้ำค้างเย็น ୭",       // 寒露
    "น้ำค้างแข็งลง ত",      // 霜降
    "เริ่มต้นฤดูหนาว ꉙ",    // 立冬
    "หิมะเล็ก ❅",         // 小雪
    "หิมะใหญ่ ❅",         // 大雪
    "เหมายัน 𑫏"          // 冬至
  ],

  vietnamese: [
    "Tiểu hàn ✶", "Đại hàn ✷", "Lập xuân ✿", "Vũ thủy ⛆",
    "Kinh trập ຊ", "Xuân phân ◐", "Thanh minh ⚘", "Cốc vũ ⛆",
    "Lập hạ ☉", "Tiểu mãn 𖢺", "Mang chủng 𖧷", "Hạ chí ✧",
    "Tiểu thử ✼", "Đại thử ✼", "Lập thu 🝮", "Xử thử ෆ",
    "Bạch lộ 𑃢", "Thu phân ◑", "Hàn lộ ୭", "Sương giáng ত",
    "Lập đông ꉙ", "Tiểu tuyết ❅", "Đại tuyết ❅", "Đông chí 𑫏"
  ],

  english: [
    "Severe cold ✶",       // 小寒
    "Deep Freeze ✷",      // 大寒
    "Spring Begins ✿",     // 立春
    "Rain Water ⛆",         // 雨水
    "Insects Awake ຊ",      // 惊蛰
    "Spring Equinox ◐",    // 春分
    "Pure Brightness ⚘",   // 清明
    "Grain Rain ⛆",         // 谷雨
    "Summer Begins ☉",     // 立夏
    "Grain Grows 𖢺",        // 小满
    "Grain Ripens 𖧷",     // 芒种
    "Summer Solstice ✧",   // 夏至
    "Slight Heat ✼",       // 小暑
    "Great Heat ✼",      // 大暑
    "Autumn Begins 🝮",     // 立秋
    "End of Heat ෆ",        // 处暑
    "White Dew 𑃢",        // 白露
    "Autumn Equinox ◑",    // 秋分
    "Cold Dew ୭",          // 寒露
    "Frost Descends ত",     // 霜降
    "Winter Begins ꉙ",     // 立冬
    "Light Snow ❅",       // 小雪
    "Heavy Snow ❅",      // 大雪
    "Winter Solstice 𑫏"    // 冬至
  ],

  german: [
    "Starke Kälte ✶",      // 小寒
    "Eisige Kälte ✷",      // 大寒
    "Frühlingsbeginn ✿",           // 立春
    "Regenwasser ⛆",        // 雨水
    "Erwachen der Insekten ຊ", // 惊蛰
    "Frühlings-Äquinoktium ◐", // 春分
    "Helle Klarheit ⚘",     // 清明
    "Getreideregen ⛆",      // 谷雨
    "Sommerbeginn ☉",       // 立夏
    "Getreidevoll 𖢺",       // 小满
    "Fleißige Ernte 𖧷",     // 芒种
    "Sommersonnenwende ✧",  // 夏至
    "Leichte Hitze ✼",       // 小暑
    "Große Hitze ✼",        // 大暑
    "Herbstbeginn 🝮",       // 立秋
    "Ende der Hitze ෆ",      // 处暑
    "Weiße Tau 𑃢",         // 白露
    "Herbst-Äquinoktium ◑", // 秋分
    "Kalter Tau ୭",          // 寒露
    "Frostfall ত",           // 霜降
    "Winterbeginn ꉙ",       // 立冬
    "Leichter Schnee ❅",     // 小雪
    "Starker Schnee ❅",      // 大雪
    "Wintersonnenwende 𑫏"   // 冬至
  ],


  french: [
    "Froid intense ✶",        // 小寒
    "Grand froid ✷",          // 大寒
    "Printemps ✿",            // 立春
    "Pluie ⛆",                // 雨水
    "Réveil des insectes ຊ",  // 惊蛰
    "Équinoxe de printemps ◐", // 春分
    "Clarté pure ⚘",          // 清明
    "Pluie sur les grains ⛆", // 谷雨
    "Début de l'été ☉",        // 立夏
    "Grains pleins 𖢺",         // 小满
    "Travail aux récoltes 𖧷",  // 芒种
    "Solstice d'été ✧",        // 夏至
    "Chaleur légère ✼",        // 小暑
    "Chaleur intense ✼",       // 大暑
    "Début de l'automne 🝮",    // 立秋
    "Fin de la chaleur ෆ",      // 处暑
    "Rosée blanche 𑃢",        // 白露
    "Équinoxe d'automne ◑",    // 秋分
    "Rosée froide ୭",          // 寒露
    "Descente du gel ত",        // 霜降
    "Début de l'hiver ꉙ",      // 立冬
    "Neige légère ❅",           // 小雪
    "Neige abondante ❅",        // 大雪
    "Solstice d'hiver 𑫏"      // 冬至
  ],
  
  italian: [
    "Freddo intenso ✶",        // 小寒
    "Gelo profondo ✷",         // 大寒
    "Inizio primavera ✿",      // 立春
    "Acqua piovana ⛆",         // 雨水
    "Insetti si risvegliano ຊ", // 惊蛰
    "Equinozio di primavera ◐", // 春分
    "Chiarezza pura ⚘",        // 清明
    "Pioggia sul grano ⛆",      // 谷雨
    "Inizio estate ☉",          // 立夏
    "Grano pieno 𖢺",           // 小满
    "Raccolta attiva 𖧷",       // 芒种
    "Solstizio d'estate ✧",    // 夏至
    "Calore leggero ✼",        // 小暑
    "Calore intenso ✼",        // 大暑
    "Inizio autunno 🝮",        // 立秋
    "Fine del caldo ෆ",         // 处暑
    "Rugiada bianca 𑃢",        // 白露
    "Equinozio d'autunno ◑",    // 秋分
    "Rugiada fredda ୭",        // 寒露
    "Discesa del gelo ত",        // 霜降
    "Inizio inverno ꉙ",        // 立冬
    "Neve leggera ❅",           // 小雪
    "Neve abbondante ❅",        // 大雪
    "Solstizio d'inverno 𑫏"    // 冬至
  ],
  
  spanish: [
    "Frío intenso ✶",          // 小寒
    "Gran frío ✷",             // 大寒
    "Comienzo de primavera ✿", // 立春
    "Agua de lluvia ⛆",        // 雨水
    "Insectos despiertan ຊ",   // 惊蛰
    "Equinoccio de primavera ◐", // 春分
    "Brillo puro ⚘",           // 清明
    "Lluvia de granos ⛆",      // 谷雨
    "Comienzo del verano ☉",    // 立夏
    "Granos llenos 𖢺",         // 小满
    "Cosecha activa 𖧷",         // 芒种
    "Solsticio de verano ✧",    // 夏至
    "Calor ligero ✼",           // 小暑
    "Calor intenso ✼",          // 大暑
    "Comienzo del otoño 🝮",     // 立秋
    "Fin del calor ෆ",          // 处暑
    "Rocío blanco 𑃢",         // 白露
    "Equinoccio de otoño ◑",     // 秋分
    "Rocío frío ୭",             // 寒露
    "Descenso de escarcha ত",    // 霜降
    "Comienzo del invierno ꉙ",  // 立冬
    "Nieve ligera ❅",           // 小雪
    "Nieve intensa ❅",           // 大雪
    "Solsticio de invierno 𑫏"  // 冬至
  ],
  
  russian: [
    "Сильный холод ✶",        // 小寒
    "Глубокий мороз ✷",       // 大寒
    "Начало весны ✿",          // 立春
    "Дождевая вода ⛆",         // 雨水
    "Пробуждение насекомых ຊ", // 惊蛰
    "Весеннее равноденствие ◐", // 春分
    "Чистое сияние ⚘",         // 清明
    "Дождь на зерно ⛆",        // 谷雨
    "Начало лета ☉",           // 立夏
    "Рост зерна 𖢺",           // 小满
    "Занятой сбор 𖧷",          // 芒种
    "Летнее солнцестояние ✧",  // 夏至
    "Небольшая жара ✼",        // 小暑
    "Сильная жара ✼",          // 大暑
    "Начало осени 🝮",          // 立秋
    "Конец жары ෆ",             // 处暑
    "Белая роса 𑃢",           // 白露
    "Осеннее равноденствие ◑",  // 秋分
    "Холодная роса ୭",         // 寒露
    "Наступление заморозков ত", // 霜降
    "Начало зимы ꉙ",           // 立冬
    "Легкий снег ❅",           // 小雪
    "Сильный снег ❅",           // 大雪
    "Зимнее солнцестояние 𑫏"  // 冬至
  ],

  japanese: [
    "小寒 ✶",      // 小寒
    "大寒 ✷",      // 大寒
    "立春 ✿",      // 立春
    "雨水 ⛆",      // 雨水
    "啓蟄 ຊ",      // 惊蛰
    "春分 ◐",      // 春分
    "清明 ⚘",      // 清明
    "穀雨 ⛆",      // 谷雨
    "立夏 ☉",      // 立夏
    "小満 𖢺",     // 小满
    "芒種 𖧷",      // 芒种
    "夏至 ✧",      // 夏至
    "小暑 ✼",      // 小暑
    "大暑 ✼",      // 大暑
    "立秋 🝮",      // 立秋
    "処暑 ෆ",      // 处暑
    "白露 𑃢",      // 白露
    "秋分 ◑",      // 秋分
    "寒露 ୭",      // 寒露
    "霜降 ত",      // 霜降
    "立冬 ꉙ",      // 立冬
    "小雪 ❅",      // 小雪
    "大雪 ❅",      // 大雪
    "冬至 𑫏"       // 冬至
  ],

  korean: [
    "소한절기 ✶",       // 小寒
    "대한절기 ✷",       // 大寒
    "입춘절기 ✿",       // 立春
    "우수절기 ⛆",       // 雨水
    "경칩절기 ຊ",       // 惊蛰
    "춘분절기 ◐",       // 春分
    "청명절기 ⚘",       // 清明
    "곡우절기 ⛆",       // 谷雨
    "입하절기 ☉",       // 立夏
    "소만절기 𖢺",       // 小满
    "망종절기 𖧷",       // 芒种
    "하지절기 ✧",       // 夏至
    "소서절기 ✼",       // 小暑
    "대서절기 ✼",       // 大暑
    "입추절기 🝮",       // 立秋
    "처서절기 ෆ",       // 处暑
    "백로절기 𑃢",       // 白露
    "추분절기 ◑",       // 秋分
    "한로절기 ୭",       // 寒露
    "상강절기 ত",       // 霜降
    "입동절기 ꉙ",       // 立冬
    "소설절기 ❅",       // 小雪
    "대설절기 ❅",       // 大雪
    "동지절기 𑫏"        // 冬至
  ],

arabic: [
  "البرد الصغير ✶",      // 小寒
  "البرد العميق ✷",      // 大寒
  "بداية الربيع ✿",      // 立春
  "ماء المطر ⛆",          // 雨水
  "إيقاظ الحشرات ຊ",      // 惊蛰
  "الاعتدال الربيعي ◐",  // 春分
  "الوضوح النقي ⚘",      // 清明
  "مطر الحبوب ⛆",         // 谷雨
  "بداية الصيف ☉",        // 立夏
  "الحبوب تنمو 𖢺",       // 小满
  "الحبوب جاهزة للحصاد 𖧷", // 芒种
  "الانقلاب الصيفي ✧",    // 夏至
  "الحرارة الصغيرة ✼",    // 小暑
  "الحرارة الكبيرة ✼",    // 大暑
  "بداية الخريف 🝮",       // 立秋
  "نهاية الحرارة ෆ",       // 处暑
  "الندى الأبيض 𑃢",       // 白露
  "الاعتدال الخريفي ◑",    // 秋分
  "الندى البارد ୭",       // 寒露
  "نزول الصقيع ত",         // 霜降
  "بداية الشتاء ꉙ",       // 立冬
  "الثلج الصغير ❅",        // 小雪
  "الثلج الكبير ❅",        // 大雪
  "الانقلاب الشتوي 𑫏"      // 冬至
]
};

function getjq(yyyy, mm, dd) {
    mm = mm - 1;
    const sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
    let solarTerms = "";

    while (solarTerms === "") {
        const tmp1 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        const tmp2 = tmp1.getUTCDate();
        if (tmp2 === dd) solarTerms = mm * 2 + 1;

        const tmp3 = new Date((31556925974.7 * (yyyy - 1900) + sTermInfo[mm * 2] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
        const tmp4 = tmp3.getUTCDate();
        if (tmp4 === dd) solarTerms = mm * 2;

        if (dd > 1) {
            dd -= 1;
        } else {
            mm -= 1;
            if (mm < 0) {
                yyyy -= 1;
                mm = 11;
            }
            dd = 31;
        }
    }
    window.siteDebug("Calculated Solar Term Index:", solarTerms);
    return solarTerms;
}

function displaySolarTerm() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();

    const solarTermIndex = getjq(year, month, date);

    const element = document.querySelector('.jieqi-24');
    if (!element) {
        console.error("Element with class '24jieqi' not found.");
        return;
    }

    const language = element.getAttribute('language');
    const solarTermName = solarTermTranslations[language]?.[solarTermIndex];

    if (solarTermName) {
        element.textContent = solarTermName;
    } else {
        console.error("Failed to get solar term name. Language:", language, "Index:", solarTermIndex);
        element.textContent = "节气未定义";
    }
}

displaySolarTerm();
