
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

// 节日数据加载函数
async function loadFestivals() {
  try {
    const response = await fetch('js/festival_wishes.json');
    if (!response.ok) {
      throw new Error('Failed to load festivals data');
    }
    const data = await response.json();
    
    // 处理动态年份数据
    const currentYear = new Date().getFullYear();
    const yearInEurope = currentYear - 2014;
    
    // 更新动态年份数据
    data.solar.forEach(festival => {
      if (festival.greetings && festival.greetings.en && festival.greetings.en.includes('years in Europe')) {
        festival.greetings.en = festival.greetings.en.replace(/\d+/, yearInEurope);
        festival.greetings.cn = festival.greetings.cn.replace(/\d+/, yearInEurope);
        festival.greetings.ja = festival.greetings.ja.replace(/\d+/, yearInEurope);
        festival.greetings.ko = festival.greetings.ko.replace(/\d+/, yearInEurope);
        festival.greetings.es = festival.greetings.es.replace(/\d+/, yearInEurope);
        festival.greetings.fr = festival.greetings.fr.replace(/\d+/, yearInEurope);
        festival.greetings.it = festival.greetings.it.replace(/\d+/, yearInEurope);
        festival.greetings.de = festival.greetings.de.replace(/\d+/, yearInEurope);
        festival.greetings.ru = festival.greetings.ru.replace(/\d+/, yearInEurope);
        festival.greetings.ar = festival.greetings.ar.replace(/\d+/, yearInEurope);
        festival.greetings.th = festival.greetings.th.replace(/\d+/, yearInEurope);
      }
    });
    
    // 添加复活节数据
    const easter = calculateEasterDate(currentYear);
    const easterStartDate = `${easter.month.toString().padStart(2, '0')}-${easter.day.toString().padStart(2, '0')}`;
    const easterEndDate = `${easter.month.toString().padStart(2, '0')}-${(easter.day + 7).toString().padStart(2, '0')}`;
    
    data.solar.push({
      start: easterStartDate,
      end: easterEndDate,
      greetings: {
        en: "Happy Easter",
        ko: "부활절 축하합니다",
        de: "Frohe Ostern",
        es: "¡Feliz Pascua!",
        fr: "Joyeuses Pâques",
        it: "Buona Pasqua",
        ru: "С Пасхой"
      },
      wiki: {
        en: "https://en.wikipedia.org/wiki/Easter",
        ko: "https://ko.wikipedia.org/wiki/부활절",
        de: "https://de.wikipedia.org/wiki/Ostern",
        es: "https://es.wikipedia.org/wiki/Pascua",
        fr: "https://fr.wikipedia.org/wiki/Pâques",
        it: "https://it.wikipedia.org/wiki/Pasqua",
        ru: "https://ru.wikipedia.org/wiki/Пасха"
      }
    });
    
    window.festivals = data;
    return data;
  } catch (error) {
    console.error('Error loading festivals:', error);
    // 返回空数据作为后备
    window.festivals = { solar: [], lunar: [] };
    return { solar: [], lunar: [] };
  }
}


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

// 更新日期和祝福显示功能
function updateDateAndWish() {
  const festivalGreetingEl = document.getElementById('festival-greeting');
  const currentDateEl = document.getElementById('current-date');
  
  if (!festivalGreetingEl || !currentDateEl) return;
  
  // 获取当前日期
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const solarKey = `${month}-${day}`;
  
  // 获取农历日期
  let lunarKey = null;
  let lunarDateStr = '';
  let fullLunarDateStr = '';
  if (window.chinese_lunar_calendar && window.chinese_lunar_calendar.getLunar) {
    try {
      const lunarDate = window.chinese_lunar_calendar.getLunar(year, parseInt(month), parseInt(day));
      const lunarMonth = String(lunarDate.lunarMonth).padStart(2, '0');
      const lunarDay = String(lunarDate.lunarDate).padStart(2, '0');
      lunarKey = `${lunarMonth}-${lunarDay}`;
      
      // 使用 nongli.js 的方法格式化农历日期
      const lunarMonthString = getLunarMonthString(lunarDate.lunarMonth);
      const lunarDayString = getLunarDayString(lunarDate.lunarDate);
      lunarDateStr = `｜ ${lunarMonthString}${lunarDayString}`;
      
      // 获取完整的农历日期（包含年份和生肖）
      const lunarYearString = getLunarYearString(year);
      const lunarZodiac = getLunarZodiac(lunarYearString);
      fullLunarDateStr = `${lunarYearString}${lunarZodiac}年${lunarMonthString}${lunarDayString}`;
    } catch (e) {
      console.log('农历日期获取失败:', e);
    }
  }
  
  // 检查节日
  let festival = null;
  let isLunarFestival = false;
  
  // 查找公历节日
  if (window.festivals && window.festivals.solar) {
    for (const f of window.festivals.solar) {
      if (isDateInRange(solarKey, f.start, f.end)) {
        festival = f;
        break;
      }
    }
  }
  
  // 查找农历节日
  if (!festival && lunarKey && window.festivals && window.festivals.lunar) {
    for (const f of window.festivals.lunar) {
      if (isDateInRange(lunarKey, f.start, f.end)) {
        festival = f;
        isLunarFestival = true;
        break;
      }
    }
  }
  
  // 更新节日祝福语
  if (festival && festival.greetings && festival.greetings.cn) {
    festivalGreetingEl.textContent = festival.greetings.cn;
    festivalGreetingEl.style.display = 'block';
    // 清除时钟内容
    festivalGreetingEl.innerHTML = festival.greetings.cn;
  } 
  
  // 更新日期显示
  let dateStr = `${year}年${month}月${day}日`;
  if (isLunarFestival && fullLunarDateStr) {
    // 农历节日只显示农历日期
    dateStr = fullLunarDateStr;
  }
  currentDateEl.textContent = dateStr;
}

// 获取农历月份的格式（从 nongli.js 复制）
function getLunarMonthString(month) {
  const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  return lunarMonths[month - 1];
}

// 获取农历日期的格式（从 nongli.js 复制）
function getLunarDayString(day) {
  const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  return lunarDays[day - 1];
}

// 获取农历年份的干支表示（从 nongli.js 复制）
function getLunarYearString(year) {
  const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  const stemIndex = (year - 4) % 10; // 天干索引
  const branchIndex = (year - 4) % 12; // 地支索引

  return heavenlyStems[stemIndex] + earthlyBranches[branchIndex]; // 返回干支表示
}

// 获取生肖（从 nongli.js 复制）
function getLunarZodiac(lunarYearString) {
  const zodiac = {
    "子": "鼠",
    "丑": "牛",
    "寅": "虎",
    "卯": "兔",
    "辰": "龙",
    "巳": "蛇",
    "午": "马",
    "未": "羊",
    "申": "猴",
    "酉": "鸡",
    "戌": "狗",
    "亥": "猪"
  };

  // 从干支表示中提取地支并返回生肖
  const branch = lunarYearString.charAt(1); // 获取地支
  return zodiac[branch] || "";
}

// 页面加载完成后更新
document.addEventListener("DOMContentLoaded", async function() {
  // 先加载节日数据
  await loadFestivals();
  
  // 等待农历库加载完成
  setTimeout(function() {
    updateGreeting();
    updateDateAndWish();
  }, 1000);
});


