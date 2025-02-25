
// 定义节日字典
const festivals = {
  solar: [
      {
      start: "02-24",
      end: "02-24",
      greetings: {
        en: "Happy Testing Year!",
        cn: "新年测试快乐！",
        ja: "新年测试おめでとうございます！",
        ko: "새해测试 복 많이 받으세요!",
        de: "Frohes Testing neues Jahr!",
        es: "¡Feliz Testing Año Nuevo!",
        fr: "Bonne Testing année!",
        it: "Buon Testing anno!",
        ru: "С Testing Новым годом!",
        ar: "عام سعيد!"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/New_Year's_Day",
        cn: "https://zh.wikipedia.org/wiki/元旦",
        ja: "https://ja.wikipedia.org/wiki/元日",
        ko: "https://ko.wikipedia.org/wiki/새해",
        de: "https://de.wikipedia.org/wiki/Neujahr",
        es: "https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo",
        fr: "https://fr.wikipedia.org/wiki/Jour_de_l%27An",
        it: "https://it.wikipedia.org/wiki/Capodanno",
        ru: "https://ru.wikipedia.org/wiki/Новый_год",
        ar: "https://ar.wikipedia.org/wiki/عيد_رأس_السنة"
      }
    },
    {
      start: "01-01",
      end: "01-01",
      greetings: {
        en: "Happy New Year!",
        cn: "新年快乐！",
        ja: "新年おめでとうございます！",
        ko: "새해 복 많이 받으세요!",
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
        de: "https://de.wikipedia.org/wiki/Neujahr",
        es: "https://es.wikipedia.org/wiki/A%C3%B1o_Nuevo",
        fr: "https://fr.wikipedia.org/wiki/Jour_de_l%27An",
        it: "https://it.wikipedia.org/wiki/Capodanno",
        ru: "https://ru.wikipedia.org/wiki/Новый_год",
        ar: "https://ar.wikipedia.org/wiki/عيد_رأس_السنة"
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
    },
    {
      start: "10-01",
      end: "10-07",
      greetings: {
        en: "Happy National Day!",
        cn: "国庆节快乐！",
        ja: "中華人民共和国建国記念日おめでとうございます！",
        ko: "중국 국경일 축하합니다!",
        de: "Froher Nationalfeiertag!",
        es: "¡Feliz Día Nacional de China!",
        fr: "Joyeuse fête nationale chinoise!",
        it: "Buona festa nazionale cinese!",
        ru: "С Днём Китая!",
        ar: "عيد وطني سعيد للصين!"
      },
      wiki: { /* 国庆节各语言链接 */ }
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
  "start": "01-15",
  "end": "01-15",
  "greetings": {
    "en": "Happy Lantern Festival!",
    "zh": "元宵节快乐！",
    "ja": "元宵節おめでとうございます！",
    "ko": "행복한 정월 대보름 되세요!",
    "de": "Frohes Laternenfest!",
    "es": "¡Feliz Festival de los Faroles!",
    "fr": "Bonne fête des lanternes!",
    "it": "Buona Festa delle Lanterne!",
    "ru": "Счастливого Праздника фонарей!",
    "ar": "عيد الفوانيس سعيد!"
  },
  "wiki": {
    "en": "https://en.wikipedia.org/wiki/Lantern_Festival",
    "zh": "https://zh.wikipedia.org/wiki/元宵节",
    "ja": "https://ja.wikipedia.org/wiki/元宵節",
    "ko": "https://ko.wikipedia.org/wiki/정월대보름",
    "de": "https://de.wikipedia.org/wiki/Laternenfest",
    "es": "https://es.wikipedia.org/wiki/Festival_de_los_Faroles",
    "fr": "https://fr.wikipedia.org/wiki/Fête_des_lanternes",
    "it": "https://it.wikipedia.org/wiki/Festa_delle_lanterne",
    "ru": "https://ru.wikipedia.org/wiki/Фестиваль_фонарей",
    "ar": "https://ar.wikipedia.org/wiki/مهرجان_الفوانيس"
  }
},
    {
      start: "03-12",
      end: "03-16",
      greetings: {
        en: "Happy Birthday!",
        cn: "祝我生日快乐！",
        ja: "旧正月おめでとうございます！",
        ko: "새해 복 많이 받으세요!",
        de: "Frohes Mondneujahr!",
        es: "¡Feliz Año Nuevo Lunar!",
        fr: "Bonne année lunaire!",
        it: "Buon anno lunare!",
        ru: "С новым лунным годом!",
        ar: "عام قمري سعيد!"
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
      start: "08-15",
      end: "08-18",
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