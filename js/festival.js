
// Define a function to calculate the Easter date
function calculateEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return { year, month, day };
}

// Generate Easter greeting based on the calculated date
const year = new Date().getFullYear();
const easter = calculateEasterDate(year);
const easterStartDate = `${easter.month.toString().padStart(2, '0')}-${easter.day.toString().padStart(2, '0')}`;
const easterEndDate = `${easter.month.toString().padStart(2, '0')}-${(easter.day + 7).toString().padStart(2, '0')}`; // Easter week

const now = new Date();
const currentYear = now.getFullYear();
const yearInEurope = currentYear - 2014;

// 定义节日字典
const festivals = {
  solar: [
    {
      start: "01-01",
      end: "01-05",
      greetings: {
        en: "Happy New Year!",
        cn: "新年快乐！",
        ja: "新年おめでとうございます！",
        ko: "새해 복 많이 받으세요!",
        th: "สวัสดีปีใหม่!",
        de: "Frohes neues Jahr!",
        es: "¡Feliz Año Nuevo!",
        fr: "Bonne année!",
        it: "Buon anno!",
        ru: "С Новым годом!",
        ar: "عام سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/New_Year's_Day",
        cn: "https://zh.wikipedia.org/wiki/元旦",
        ja: "https://ja.wikipedia.org/wiki/元日",
        ko: "https://ko.wikipedia.org/wiki/새해",
        th: "https://th.wikipedia.org/wiki/วันขึ้นปีใหม่",
        de: "https://de.wikipedia.org/wiki/Neujahr",
        es: "https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo",
        fr: "https://fr.wikipedia.org/wiki/Jour_de_l%27An",
        it: "https://it.wikipedia.org/wiki/Capodanno",
        ru: "https://ru.wikipedia.org/wiki/Новый_год",
        ar: "https://ar.wikipedia.org/wiki/عيد_رأس_السنة"
      }
    },
    {
  start: "01-06",
  end: "01-06",
  greetings: {
    en: "Happy Epiphany!",
    cn: "三王节快乐！",
    ja: "エピファニーおめでとう！",
    ko: "주현절 축하해요!",
    es: "¡Feliz Día de los Reyes!",
    fr: "Bonne fête des Rois !",
    it: "Buona Epifania!",
    de: "Frohen Dreikönigstag!",
    ru: "С Днём трёх волхвов!",
    ar: "عيد الغطاس سعيد!",
    th: "สุขสันต์วันสามกษัตริย์!"
  },
  wiki: {
    en: "https://en.wikipedia.org/wiki/Epiphany_(holiday)",
    cn: "https://zh.wikipedia.org/wiki/主显节",
    ja: "https://ja.wikipedia.org/wiki/公現祭",
    ko: "https://ko.wikipedia.org/wiki/주현절",
    es: "https://es.wikipedia.org/wiki/Epifanía",
    fr: "https://fr.wikipedia.org/wiki/Fête_de_l'Épiphanie",
    it: "https://it.wikipedia.org/wiki/Epifania",
    de: "https://de.wikipedia.org/wiki/Dreikönigstag",
    ru: "https://ru.wikipedia.org/wiki/Богоявление",
    ar: "https://ar.wikipedia.org/wiki/عيد_الغطاس",
    th: "https://th.wikipedia.org/wiki/วันสามกษัตริย์"
  }
},

    {
  start: "02-14",
  end: "02-14",
  greetings: {
    en: "Happy Valentine's Day!",
    cn: "情人节快乐！",
    ja: "バレンタインデーおめでとう！",
    ko: "행복한 발렌타인데이 보내세요!",
    th: "สุขสันต์วันวาเลนไทน์!",
    de: "Fröhlichen Valentinstag!",
    es: "¡Feliz Día de San Valentín!",
    fr: "Bonne Saint-Valentin!",
    it: "Buon San Valentino!",
    ru: "С Днем святого Валентина!",
    ar: "عيد حب سعيد!"
  },
  wiki: {
    en: "https://en.wikipedia.org/wiki/Valentine's_Day",
    cn: "https://zh.wikipedia.org/wiki/情人节",
    ja: "https://ja.wikipedia.org/wiki/バレンタインデー",
    ko: "https://ko.wikipedia.org/wiki/밸런타인데이",
    th: "https://th.wikipedia.org/wiki/วันวาเลนไทน์",
    de: "https://de.wikipedia.org/wiki/Valentinstag",
    es: "https://es.wikipedia.org/wiki/Día_de_San_Valentín",
    fr: "https://fr.wikipedia.org/wiki/Saint-Valentin",
    it: "https://it.wikipedia.org/wiki/San_Valentino",
    ru: "https://ru.wikipedia.org/wiki/День_святого_Валентина",
    ar: "https://ar.wikipedia.org/wiki/عيد_الحب"
  }
},

{
      start: easterStartDate,
      end: easterEndDate,
      greetings: {
        en: "Happy Easter",
        cn: "复活节快乐",
        ja: "復活祭おめでとうございます",
        ko: "부활절 축하합니다",
        de: "Frohe Ostern",
        es: "¡Feliz Pascua!",
        fr: "Joyeuses Pâques",
        it: "Buona Pasqua",
        ru: "С Пасхой",
        ar: "عيد فصح سعيد"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Easter",
        cn: "https://zh.wikipedia.org/wiki/复活节",
        ja: "https://ja.wikipedia.org/wiki/復活祭",
        ko: "https://ko.wikipedia.org/wiki/부활절",
        de: "https://de.wikipedia.org/wiki/Ostern",
        es: "https://es.wikipedia.org/wiki/Pascua",
        fr: "https://fr.wikipedia.org/wiki/Pâques",
        it: "https://it.wikipedia.org/wiki/Pasqua",
        ru: "https://ru.wikipedia.org/wiki/Пасха",
        ar: "https://ar.wikipedia.org/wiki/عيد_الفصح"
      }
      },

{
  start: "05-17",
  end: "05-17",
  greetings: {
    en: "World Rainbow Day 🏳️‍🌈",
    cn: "世界彩虹日 🏳️‍🌈",
    ja: "世界レインボーデー 🏳️‍🌈",
    ko: "세계 레인보우 데이 🏳️‍🌈",
    th: "วันสายรุ้งโลก 🏳️‍🌈",
    de: "Welt-Regenbogentag 🏳️‍🌈",
    es: "¡Día Mundial del Arcoíris 🏳️‍🌈",
    fr: "Journée mondiale de l’arc-en-ciel  🏳️‍🌈",
    it: "Giornata mondiale dell’arcobaleno 🏳️‍🌈",
    ru: "Всемирный день радуги 🏳️‍🌈",
    ar: "يوم قوس قزح العالمي 🏳️‍🌈"
  },
  wiki: {
    en: "https://en.wikipedia.org/wiki/International_Day_Against_Homophobia,_Transphobia_and_Biphobia",
    cn: "https://zh.wikipedia.org/wiki/国际不再恐同日",
    ja: "https://ja.wikipedia.org/wiki/国際反ホモフォビア・トランスフォビア・バイフォビアの日",
    ko: "https://ko.wikipedia.org/wiki/국제_성소수자혐오_반대의_날",
    th: "https://th.wikipedia.org/wiki/วันสากลต่อต้านการหวาดกลัวคนรักเพศเดียวกัน",
    de: "https://de.wikipedia.org/wiki/Internationaler_Tag_gegen_Homophobie,_Transphobie_und_Biphobie",
    es: "https://es.wikipedia.org/wiki/Día_Internacional_contra_la_Homofobia,_Transfobia_y_Bifobia",
    fr: "https://fr.wikipedia.org/wiki/Journée_internationale_contre_l%27homophobie,_la_transphobie_et_la_biphobie",
    it: "https://it.wikipedia.org/wiki/Giornata_internazionale_contro_omofobia,_transfobia_e_bifobia",
    ru: "https://ru.wikipedia.org/wiki/Международный_день_борьбы_с_гомофобией,_трансфобией_и_бифобией",
    ar: "https://ar.wikipedia.org/wiki/اليوم_الدولي_لمناهضة_رهاب_المثلية_والتحول_والازدواجية"
  }
},

{
  start: "08-27",
  end: "08-27",
  greetings: {
    en: `The ${yearInEurope} years in Europe `,
    cn: `留欧${yearInEurope}年纪念 `,
    ja: `ヨーロッパ滞在${yearInEurope}周年記念 `,
    ko: `유럽 거주 ${yearInEurope}주년 기념 `,
    es: `Celebrando ${yearInEurope} años viviendo en Europa `,
    fr: `Célébration des ${yearInEurope} ans passés en Europe `,
    it: `Celebrazione di ${yearInEurope} anni in Europa `,
    de: `Feier von ${yearInEurope} Jahren in Europa `,
    ru: `Отмечаем ${yearInEurope} лет проживания в Европе `,
    ar: `الاحتفال بمرور ${yearInEurope} سنة في أوروبا `,
    th: `เฉลิมฉลอง ${yearInEurope} ปีแห่งการอยู่ในยุโรป `
  },
  wiki: {
    en: "",
    cn: "",
    ja: "",
    ko: "",
    es: "",
    fr: "",
    it: "",
    de: "",
    ru: "",
    ar: "",
    th: ""
  }
},


    {
      start: "10-31",
      end: "11-01",
      greetings: {
        en: "Happy Halloween!",
        cn: "万圣节快乐！",
        ja: "ハッピーハロウィン！",
        ko: "해피 할로윈!",
        th: "สุขสันต์วันฮาโลวีน!",
        de: "Fröhliches Halloween!",
        es: "¡Feliz Halloween!",
        fr: "Joyeux Halloween!",
        it: "Buon Halloween!",
        ru: "Счастливого Хэллоуина!",
        ar: "عيد هالوين سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Halloween",
        cn: "https://zh.wikipedia.org/wiki/万圣节",
        ja: "https://ja.wikipedia.org/wiki/ハロウィン",
        ko: "https://ko.wikipedia.org/wiki/할로윈",
        th: "https://th.wikipedia.org/wiki/วันฮาโลวีน",
        de: "https://de.wikipedia.org/wiki/Halloween",
        es: "https://es.wikipedia.org/wiki/Halloween",
        fr: "https://fr.wikipedia.org/wiki/Halloween",
        it: "https://it.wikipedia.org/wiki/Halloween",
        ru: "https://ru.wikipedia.org/wiki/Хэллоуин",
        ar: "https://ar.wikipedia.org/wiki/هالووين"
      }
    },
    {
      start: "12-24",
      end: "12-26",
      greetings: {
        en: "Merry Christmas!",
        cn: "圣诞快乐！",
        ja: "メリークリスマス！",
        ko: "메리 크리스마스!",
        de: "Frohe Weihnachten!",
        es: "¡Feliz Navidad!",
        fr: "Joyeux Noël!",
        it: "Buon Natale!",
        ru: "С Рождеством!",
        ar: "عيد ميلاد سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Christmas",
        cn: "https://zh.wikipedia.org/wiki/圣诞节",
        ja: "https://ja.wikipedia.org/wiki/クリスマス",
        ko: "https://ko.wikipedia.org/wiki/크리스마스",
        de: "https://de.wikipedia.org/wiki/Weihnachten",
        es: "https://es.wikipedia.org/wiki/Navidad",
        fr: "https://fr.wikipedia.org/wiki/Noël",
        it: "https://it.wikipedia.org/wiki/Natale",
        ru: "https://ru.wikipedia.org/wiki/Рождество",
        ar: "https://ar.wikipedia.org/wiki/عيد_الميلاد"
      }
    },
    {
      start: "05-01",
      end: "05-03",
      greetings: {
        en: "Happy Labour Day!",
        cn: "劳动节快乐！",
        ja: "メーデーおめでとうございます！",
        ko: "노동절 축하합니다!",
        de: "Frohen Tag der Arbeit!",
        es: "¡Feliz Día del Trabajo!",
        fr: "Joyeuse fête du travail!",
        it: "Buona Festa del Lavoro!",
        ru: "С Днём труда!",
        ar: "عيد عمال سعيد!"
      },
      wiki: { /* 劳动节各语言链接 */ }
    },
    {
      start: "05-04",
      end: "05-04",
      greetings: {
        en: "Happy Chinese Youth Day!",
        cn: "五四青年节快乐！",
        ja: "五四青年の日おめでとうございます！",
        ko: "5.4 중국 청년의 날 축하합니다!",
        de: "Frohen Chinesischen Jugendtag!",
        es: "¡Feliz Día de la Juventud China!",
        fr: "Joyeuse Journée de la Jeunesse Chinoise !",
        it: "Buona Giornata della Gioventù Cinese!",
        ru: "С Праздником китайской молодежи!",
        ar: "عيد الشباب الصيني السعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/May_Fourth_Movement",
        cn: "https://zh.wikipedia.org/wiki/五四运动",
        ja: "https://ja.wikipedia.org/wiki/五四運動",
        ko: "https://ko.wikipedia.org/wiki/5.4_운동",
        de: "https://de.wikipedia.org/wiki/Bewegung_vom_4._Mai",
        es: "https://es.wikipedia.org/wiki/Movimiento_del_4_de_mayo",
        fr: "https://fr.wikipedia.org/wiki/Mouvement_du_4_mai",
        it: "https://it.wikipedia.org/wiki/Movimento_del_4_maggio",
        ru: "https://ru.wikipedia.org/wiki/Цинхай_восстание",
        ar: "https://ar.wikipedia.org/wiki/حركة_الخامس_من_مايو"
      }
    }
  ],
  /////////農曆節日///////////////////
  lunar: [
    {
      start: "01-01",
      end: "01-14",
      greetings: {
        en: "Happy Chinese New Year!",
        cn: "春节快乐！",
        ja: "旧正月おめでとうございます！",
        ko: "새해 복 많이 받으세요!",
        de: "Frohes Chinesisches Neujahr!",
        es: "¡Feliz Año Nuevo Chino!",
        fr: "Bonne année chinoise!",
        it: "Buon anno cinese!",
        ru: "Счастливого Китайского Нового года!",
        ar: "سنة صينية سعيدة!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Chinese_New_Year",
        cn: "https://zh.wikipedia.org/wiki/春节",
        ja: "https://ja.wikipedia.org/wiki/春節",
        ko: "https://ko.wikipedia.org/wiki/설날",
            de: "https://de.wikipedia.org/wiki/Chinesisches_Neujahr",
            es: "https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo_Chino",
            fr: "https://fr.wikipedia.org/wiki/Nouvel_An_chinois",
            it: "https://it.wikipedia.org/wiki/Capodanno_cinese",
            ru: "https://ru.wikipedia.org/wiki/Китайский_Новый_год",
            ar: "https://ar.wikipedia.org/wiki/عيد_رأس_السنة_الصينية"
      }
    },
       {
  start: "01-15",
  end: "01-15",
  greetings: {
    en: "Happy Lantern Festival!",
    cn: "元宵节快乐！",
    ja: "元宵節おめでとう！",
    ko: "행복한 정월 대보름 보내세요!",
    th: "สุขสันต์เทศกาลโคมไฟ!",
    de: "Fröhliches Laternenfest!",
    es: "¡Feliz Festival de los Faroles!",
    fr: "Joyeuse Fête des Lanternes!",
    it: "Buona Festa delle Lanterne!",
    ru: "Счастливого праздника фонарей!",
    ar: "عيد الفوانيس سعيد!"
  },
  wiki: {
    en: "https://en.wikipedia.org/wiki/Lantern_Festival",
    cn: "https://zh.wikipedia.org/wiki/元宵节",
    ja: "https://ja.wikipedia.org/wiki/元宵節",
    ko: "https://ko.wikipedia.org/wiki/정월대보름",
    th: "https://th.wikipedia.org/wiki/เทศกาลโคมไฟ",
    de: "https://de.wikipedia.org/wiki/Laternenfest",
    es: "https://es.wikipedia.org/wiki/Festival_de_las_linternas",
    fr: "https://fr.wikipedia.org/wiki/Fête_des_lanternes",
    it: "https://it.wikipedia.org/wiki/Festa_delle_lanterne",
    ru: "https://ru.wikipedia.org/wiki/Праздник_фонарей",
    ar: "https://ar.wikipedia.org/wiki/عيد_الفوانيس"
  }
},
{
  start: "03-14",
  end: "03-14",
  greetings: {
    en: `Today is my birthday!`,
    cn: `今天是我的生日！`,
    ja: `今日は私の誕生日です！`,
    ko: `오늘은 내 생일이에요!`,
    es: `¡Hoy es mi cumpleaños!`,
    fr: `Aujourd'hui, c'est mon anniversaire !`,
    it: `Oggi è il mio compleanno!`,
    de: `Heute ist mein Geburtstag!`,
    ru: `Сегодня мой день рождения!`,
    ar: `اليوم عيد ميلادي!`,
    th: `วันนี้วันเกิดของฉัน!`
  },
  wiki: {
    en: "",
    cn: "",
    ja: "",
    ko: "",
    es: "",
    fr: "",
    it: "",
    de: "",
    ru: "",
    ar: "",
    th: ""
  }
},
    {
      start: "05-05",
      end: "05-08",
      greetings: {
        en: "Happy Dragon Boat Festival!",
        cn: "端午节安康！",
        ja: "端午の節句おめでとうございます！",
        ko: "행복한 단오절 되세요!",
        de: "Frohes Drachenbootfest!",
        es: "¡Feliz Festival de los Barcos Dragón!",
        fr: "Joyeux festival des bateaux-dragons !",
        it: "Buona Festa delle Barche Drago!",
        ru: "Счастливого Праздника лодок-драконов!",
        ar: "عيد قوارب التنين سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Dragon_Boat_Festival",
        cn: "https://zh.wikipedia.org/wiki/端午节",
        ja: "https://ja.wikipedia.org/wiki/端午",
        ko: "https://ko.wikipedia.org/wiki/단오",
        de: "https://de.wikipedia.org/wiki/Drachenbootfest",
        es: "https://es.wikipedia.org/wiki/Festival_de_las_lanchas_dragón",
        fr: "https://fr.wikipedia.org/wiki/Fête_des_bateaux-dragons",
        it: "https://it.wikipedia.org/wiki/Festa_delle_barche_drago",
        ru: "https://ru.wikipedia.org/wiki/Фестиваль_драконьих_лодок",
        ar: "https://ar.wikipedia.org/wiki/عيد_قوارب_التنين"
      }
    },
    {
      start: "08-14",
      end: "08-16",
      greetings: {
        en: "Happy Mid-Autumn Festival!",
        cn: "中秋节快乐！",
        ja: "中秋節おめでとうございます！",
        ko: "행복한 추석 보내세요!",
        de: "Frohes Mittherbstfest!",
        es: "¡Feliz Festival del Medio Otoño!",
        fr: "Joyeux festival de la mi-automne !",
        it: "Buona Festa di Metà Autunno!",
        ru: "Счастливого Праздника середины осени!",
        ar: "عيد منتصف الخريف سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Mid-Autumn_Festival",
        cn: "https://zh.wikipedia.org/wiki/中秋节",
        ja: "https://ja.wikipedia.org/wiki/中秋",
        ko: "https://ko.wikipedia.org/wiki/추석",
        de: "https://de.wikipedia.org/wiki/Mondfest",
        es: "https://es.wikipedia.org/wiki/Festival_de_Medio_Otoño",
        fr: "https://fr.wikipedia.org/wiki/Festival_de_la_mi-automne",
        it: "https://it.wikipedia.org/wiki/Festa_di_metà_autunno",
        ru: "https://ru.wikipedia.org/wiki/Праздник_середины_осени",
        ar: "https://ar.wikipedia.org/wiki/عيد_منتصف_الخريف"
      }
    },
{
  start: "07-07",
  end: "07-07",
  greetings: {
    en: "Happy Chinese Valentine's Festival!",
    cn: "七夕节快乐！",
    ja: "中国のバレンタインデーおめでとうございます！",
    ko: "행복한 중국 발렌타인데이를 보내세요!",
    th: "สุขสันต์วันวาเลนไทน์ของจีน!",
    de: "Fröhliches chinesisches Valentinsfest!",
    es: "¡Feliz Día de San Valentín chino!",
    fr: "Joyeuse Fête chinoise des amoureux!",
    it: "Buona Festa di San Valentino cinese!",
    ru: "Счастливого китайского Дня святого Валентина!",
    ar: "عيد الحب الصيني السعيد!"
  },
  wiki: {
    en: "https://en.wikipedia.org/wiki/Qixi_Festival",
    cn: "https://zh.wikipedia.org/wiki/七夕",
    ja: "https://ja.wikipedia.org/wiki/七夕",
    ko: "https://ko.wikipedia.org/wiki/칠석",
    th: "https://th.wikipedia.org/wiki/เทศกาลชีซี",
    de: "https://de.wikipedia.org/wiki/Qixi-Fest",
    es: "https://es.wikipedia.org/wiki/Festival_Qixi",
    fr: "https://fr.wikipedia.org/wiki/Qixi_(Fête_des_amoureux)",
    it: "https://it.wikipedia.org/wiki/Qixi",
    ru: "https://ru.wikipedia.org/wiki/Фестиваль_Циси",
    ar: "https://ar.wikipedia.org/wiki/عيد_تشيشي"
  }
},
    //测试专用
    {
      start: "05-10",
      end: "05-15",
      greetings: {
        en: "Happy Testing Festival!",
        cn: "测试节快乐！",
        ja: "测试節おめでとうございます！",
        ko: "测试한 추석 보내세요!",
        de: "Frohes Testingsfest!",
        es: "¡Feliz Festival del Testing!",
        fr: "Joyeux festival de la Testing !",
        it: "Buona Festa di Testing!",
        ru: "Счастливого Праздника середины осени!",
        ar: "عيد منتصف الخريف سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Mid-Autumn_Festival",
        cn: "https://zh.wikipedia.org/wiki/中秋节",
        ja: "https://ja.wikipedia.org/wiki/中秋",
        ko: "https://ko.wikipedia.org/wiki/추석",
        de: "https://de.wikipedia.org/wiki/Mondfest",
        es: "https://es.wikipedia.org/wiki/Festival_de_Medio_Otoño",
        fr: "https://fr.wikipedia.org/wiki/Festival_de_la_mi-automne",
        it: "https://it.wikipedia.org/wiki/Festa_di_metà_autunno",
        ru: "https://ru.wikipedia.org/wiki/Праздник_середины_осени",
        ar: "https://ar.wikipedia.org/wiki/عيد_منتصف_الخريف"
      }
    }
    // 添加更多农历节日...
  ]
};


// 获取当前语言
function getLanguage() {
  const langSelect = document.getElementById("languages");
  if (langSelect) {
    const value = langSelect.value; // 例如 "en.html"
    return value.split(".")[0]; // 返回 "en"
  }
  return "en"; // 默认英文
}

// 检查日期是否在区间内
function isDateInRange(date, start, end) {
  const current = new Date(`2000-${date}`);
  const startDate = new Date(`2000-${start}`);
  const endDate = new Date(`2000-${end}`);
  return current >= startDate && current <= endDate;
}

// 获取当前公历日期
function getSolarKey() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

// 获取农历日期
function getLunarKey() {
  const today = new Date();
  const solarYear = today.getFullYear();
  const solarMonth = today.getMonth() + 1;
  const solarDay = today.getDate();

  console.log("Solar Date:", `${solarYear}-${solarMonth}-${solarDay}`);

  // 检查 window.chinese_lunar_calendar 是否存在
  if (!window.chinese_lunar_calendar || !window.chinese_lunar_calendar.getLunar) {
    console.error("Chinese Lunar Calendar library is not loaded correctly.");
    return null;
  }

  // 调用 getLunar 方法
  const lunarDate = window.chinese_lunar_calendar.getLunar(solarYear, solarMonth, solarDay);

  console.log("Lunar Date:", lunarDate);

  // 提取农历月份和日期
  const lunarMonth = String(lunarDate.lunarMonth).padStart(2, "0");
  const lunarDay = String(lunarDate.lunarDate).padStart(2, "0");

  return `${lunarMonth}-${lunarDay}`;
}

// 更新祝福信息
function updateGreeting() {
  const lang = getLanguage();
  const solarKey = getSolarKey();
  const lunarKey = getLunarKey();
  const festivalItems = document.querySelectorAll(".festival-item");

  console.log("Language:", lang);
  console.log("Solar Key:", solarKey);
  console.log("Lunar Key:", lunarKey);

  // 检查节日
  let solarFestival = null;
  let lunarFestival = null;

  // 查找公历节日
  festivals.solar.forEach(f => {
    if (isDateInRange(solarKey, f.start, f.end)) {
      solarFestival = f;
    }
  });

  // 查找农历节日
  festivals.lunar.forEach(f => {
    if (isDateInRange(lunarKey, f.start, f.end)) {
      lunarFestival = f;
    }
  });

  console.log("Solar Festival:", solarFestival);
  console.log("Lunar Festival:", lunarFestival);


  // 根据语言优先级选择节日
  let festival = null;
  if (lang === "zh") {
    // 中文网页，优先显示农历节日
    festival = lunarFestival || solarFestival;
  } else {
    // 非中文网页，优先显示公历节日
    festival = solarFestival || lunarFestival;
  }

  console.log("Selected Festival:", festival);

  // 更新所有节日祝福元素
  if (festival) {
    const greetingText = festival.greetings[lang] || festival.greetings.en;
    const greetingHref = festival.wiki[lang] || festival.wiki.en;

    festivalItems.forEach(festivalItem => {
      const messageElement = festivalItem.querySelector(".dynamic-greeting");
      if (messageElement) {
        // 在祝福语前面添加 :: 和 5 个空格
        messageElement.innerHTML = `::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${greetingText}`;
        messageElement.href = greetingHref;
      }
      festivalItem.style.display = ""; // 显示元素
    });
  } else {
    festivalItems.forEach(festivalItem => {
      festivalItem.style.display = "none"; // 隐藏元素
    });
  }
}

// 监听语言切换
const langSelect = document.getElementById("languages");
if (langSelect) {
  langSelect.addEventListener("change", updateGreeting);
}

// 页面加载完成后更新
document.addEventListener("DOMContentLoaded", updateGreeting);