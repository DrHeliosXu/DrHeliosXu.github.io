// 获取当前日期
const today = new Date();

// 获取年份、月份和日期
const year = today.getFullYear();
const month = today.getMonth() + 1; // 月份从0开始，所以需要加1
const day = today.getDate();

// 格式化为"yyyy年mm月dd日"
const formattedDate = `${year}年${month}月${day}日`;

// 将日期显示到页面中
document.getElementById("currentDate").textContent = formattedDate;

// 获取今天的日期
const today2 = new Date();

// 获取星期几，0表示星期日，1表示星期一，以此类推
const weekdayIndex = today2.getDay();

// 定义星期几的中文名称
const weekdays = ["星期日 ☉", "星期一 ☾", "星期二 ♂", "星期三 ☿", "星期四 ♃", "星期五 ♀", "星期六 ♄"];

// 获取今天星期几的中文名称
const currentWeekday = weekdays[weekdayIndex];

// 将星期几显示到页面中
document.getElementById("currentWeekday").textContent = currentWeekday;

// 获取农历日期
function updateLunarDate() {
  const today = new Date();
  const solarYear = today.getFullYear();
  const solarMonth = today.getMonth() + 1;
  const solarDay = today.getDate();

  console.log("Solar Date:", `${solarYear}-${solarMonth}-${solarDay}`); // 打印阳历日期，检查是否正确

  // 调用 getLunar 方法
  const lunarDate = window.chinese_lunar_calendar.getLunar(solarYear, solarMonth, solarDay);

  console.log("Lunar Date Object:", lunarDate); // 打印农历数据对象，查看结构

  if (lunarDate) {
    const lunarYear = lunarDate.lunarYear; // 农历年份
    const lunarMonth = lunarDate.lunarMonth; // 农历月份
    const lunarDay = lunarDate.lunarDate; // 农历日期

    console.log(`Lunar Year: ${lunarYear}, Lunar Month: ${lunarMonth}, Lunar Day: ${lunarDay}`); // 打印农历信息

    // 获取干支年份
    const lunarYearString = getLunarYearString(solarYear);

    // 获取生肖
    const lunarZodiac = getLunarZodiac(lunarYearString);

    // 农历月份和日期的格式化
    const lunarMonthString = getLunarMonthString(lunarMonth);
    const lunarDayString = getLunarDayString(lunarDay);

    // 更新显示农历日期
    const lunarElement = document.querySelector(".nongli");
    if (lunarElement) {
      lunarElement.textContent = `${lunarYearString}${lunarZodiac}年${lunarMonthString}${lunarDayString}`;
    }
  } else {
    console.error("Failed to get lunar date.");
  }
}

// 获取农历年份的干支表示
function getLunarYearString(year) {
  const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
  const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

  const stemIndex = (year - 4) % 10; // 天干索引
  const branchIndex = (year - 4) % 12; // 地支索引

  return heavenlyStems[stemIndex] + earthlyBranches[branchIndex]; // 返回干支表示
}

// 获取生肖
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

// 获取农历月份的格式
function getLunarMonthString(month) {
  const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
  return lunarMonths[month - 1]; // 从0开始索引
}

// 获取农历日期的格式
function getLunarDayString(day) {
  const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
  return lunarDays[day - 1]; // 从0开始索引
}

// 页面加载时调用
document.addEventListener("DOMContentLoaded", updateLunarDate);