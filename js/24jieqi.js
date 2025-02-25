// 多语言节气名称
const solarTermTranslations = {
chinese: [
    "小寒",
    "大寒",
    "立春",
    "雨水",
    "惊蛰",
    "春分",
    "清明",
    "谷雨",
    "立夏",
    "小满",
    "芒种",
    "夏至",
    "小暑",
    "大暑",
    "立秋",
    "处暑",
    "白露",
    "秋分",
    "寒露",
    "霜降",
    "立冬",
    "小雪",
    "大雪",
    "冬至"
],
    english: ["Minor Cold", "Major Cold", "Beginning of Spring", "Rain Water", "Awakening of Insects", "Spring Equinox", "Pure Brightness", "Grain Rain", "Beginning of Summer", "Grain Full", "Grain in Ear", "Summer Solstice", "Minor Heat", "Major Heat", "Beginning of Autumn", "End of Heat", "White Dew", "Autumn Equinox", "Cold Dew", "Frost Descent", "Beginning of Winter", "Minor Snow", "Major Snow", "Winter Solstice"],
    german: ["Kleine Kälte", "Große Kälte", "Frühlingsbeginn", "Regenwasser", "Erwachen der Insekten", "Frühlings-Tagundnachtgleiche", "Klare Helligkeit", "Getreideregen", "Sommerbeginn", "Kleine Ernte", "Getreide in Ähren", "Sommersonnenwende", "Kleine Hitze", "Große Hitze", "Herbstbeginn", "Ende der Hitze", "Weiße Taube", "Herbst-Tagundnachtgleiche", "Kalter Tau", "Frosteinbruch", "Winterbeginn", "Kleiner Schnee", "Großer Schnee", "Wintersonnenwende"],
    french: ["Petit Froid", "Grand Froid", "Début du Printemps", "Eau de Pluie", "Réveil des Insectes", "Équinoxe de Printemps", "Clarté Pure", "Pluie des Grains", "Début de l'Été", "Petite Récolte", "Épi en Formation", "Solstice d'Été", "Petite Chaleur", "Grande Chaleur", "Début de l'Automne", "Fin de la Chaleur", "Rosée Blanche", "Équinoxe d'Automne", "Rosée Froide", "Descente du Givre", "Début de l'Hiver", "Petite Neige", "Grande Neige", "Solstice d'Hiver"],
    italian: ["Piccolo Freddo", "Grande Freddo", "Inizio Primavera", "Acqua di Pioggia", "Risveglio degli Insetti", "Equinozio di Primavera", "Chiarezza Pura", "Pioggia di Grano", "Inizio Estate", "Grano Pieno", "Grano in Spiga", "Solstizio d'Estate", "Piccolo Caldo", "Grande Caldo", "Inizio Autunno", "Fine del Caldo", "Rugiada Bianca", "Equinozio d'Autunno", "Rugiada Fredda", "Discesa del Gelo", "Inizio Inverno", "Piccola Neve", "Grande Neve", "Solstizio d'Inverno"],
    spanish: ["Pequeño Frío", "Gran Frío", "Inicio de la Primavera", "Agua de Lluvia", "Despertar de los Insectos", "Equinoccio de Primavera", "Claridad Pura", "Lluvia de Granos", "Inicio del Verano", "Grano Lleno", "Grano en Espiga", "Solsticio de Verano", "Pequeño Calor", "Gran Calor", "Inicio del Otoño", "Fin del Calor", "Rocío Blanco", "Equinoccio de Otoño", "Rocío Frío", "Descenso de Escarcha", "Inicio del Invierno", "Pequeña Nieve", "Gran Nieve", "Solsticio de Invierno"],
    russian: ["Малые холода", "Большие холода", "Начало весны", "Дождевая вода", "Пробуждение насекомых", "Весеннее равноденствие", "Чистая ясность", "Дождь из зерен", "Начало лета", "Полное зерно", "Зерно в колосе", "Летнее солнцестояние", "Малая жара", "Большая жара", "Начало осени", "Конец жары", "Белая роса", "Осеннее равноденствие", "Холодная роса", "Спуск инея", "Начало зимы", "Малый снег", "Большой снег", "Зимнее солнцестояние"],
    japanese: ["小寒 梅に息吹く筆先", "大寒 かまど祭で年待つ", "立春 残雪紅梅に溶け", "雨水 軒氷玉の音", "啓蟄 雷鳴り万物醒む", "春分 昼夜等分の時", "清明 細雨杏塚濡らす", "穀雨 新茶焙煎香り", "立夏 槐蔭虫鳴き隠す", "小満 麦芒太陽刺す", "芒種 蛙声稲豊穣", "夏至 昼長蝉初鳴き", "小暑 蛍流れ星紡ぐ", "大暑 蝉沈み蓮立つ", "立秋 梧桐葉寒虫告ぐ", "処暑 蓮池残紅散る", "白露 葭月露凝る", "秋分 蟹肥え菊酒盃", "寒露 楓燃え雁列飛ぶ", "霜降 葉紅く秋深し", "立冬 寒気骨に滲む", "小雪 天地白む初雪", "大雪 雪舞い天地覆う", "冬至 九の数日延ぶ"],
    korean: ["소한", "대한", "입춘", "우수", "경칩", "춘분", "청명", "곡우", "입하", "소만", "망종", "하지", "소서", "대서", "입추", "처서", "백로", "추분", "한로", "상강", "입동", "소설", "대설", "동지"],
    arabic: ["البرد الصغير", "البرد الكبير", "بداية الربيع", "ماء المطر", "إيقاظ الحشرات", "الاعتدال الربيعي", "الوضوح النقي", "مطر الحبوب", "بداية الصيف", "امتلاء الحبوب", "الحبوب في الأذن", "الانقلاب الصيفي", "الحرارة الصغيرة", "الحرارة الكبيرة", "بداية الخريف", "نهاية الحرارة", "الندى الأبيض", "الاعتدال الخريفي", "الندى البارد", "نزول الصقيع", "بداية الشتاء", "الثلج الصغير", "الثلج الكبير", "الانقلاب الشتوي"]
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
    console.log("Calculated Solar Term Index:", solarTerms);
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