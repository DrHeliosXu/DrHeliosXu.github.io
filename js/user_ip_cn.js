/**
 * 用户地理位置和节日祝福系统
 * 功能包括：地理位置检测、距离计算、节日祝福、时间显示等
 * 作者：Dr. Hong Xu
 * 版本：2.0
 */

// ==================== 配置数据 ====================

/**
 * 中国省份映射表
 * 包含省份名称和宣传口号
 */
const cnProvincesMap = {
    "Beijing": { name: "北京", slogan: "北境长城, 京华盛世! " },
    "Tianjin": { name: "天津", slogan: "天天乐道, 津津有味! " },
    "Hebei": { name: "河北", slogan: "这么近, 那么美, 周末到河北! " },
    "Shanxi": { name: "山西", slogan: "华夏古文明, 山西好风光! " },
    "Inner Mongolia": { name: "内蒙古", slogan: "祖国正北方, 亮丽内蒙古! " },
    "Liaoning": { name: "辽宁", slogan: "山海有情, 天辽地宁! " },
    "Jilin": { name: "吉林", slogan: "白山松水, 吉祥吉林! " },
    "Heilongjiang": { name: "黑龙江", slogan: "北国好风光, 尽在黑龙江! " },
    "Shanghai": { name: "上海", slogan: "上善若水, 海纳百川! " },
    "Jiangsu": { name: "江苏", slogan: "水韵江苏, 风华天下! " },
    "Zhejiang": { name: "浙江", slogan: "诗画江南, 活力浙江! " },
    "Anhui": { name: "安徽", slogan: "美好安徽, 迎客天下! " },
    "Fujian": { name: "福建", slogan: "福来福往, 自由自在! " },
    "Jiangxi": { name: "江西", slogan: "江西风景独好! " },
    "Shandong": { name: "山东", slogan: "好客山东, 文景盛地! " },
    "Henan": { name: "河南", slogan: "中原沃土, 风华河南! " },
    "Hubei": { name: "湖北", slogan: "知音湖北, 遇见无处不在! " },
    "Hunan": { name: "湖南", slogan: "三湘四水, 相约湖南! " },
    "Guangdong": { name: "广东", slogan: "粤见山海, 不负热爱! " },
    "Guangxi": { name: "广西", slogan: "秀甲天下, 壮美广西! " },
    "Hainan": { name: "海南", slogan: "阳光海南, 度假天堂! " },
    "Chongqing": { name: "重庆", slogan: "雄奇山水, 新韵重庆! " },
    "Sichuan": { name: "四川", slogan: "锦绣天府, 安逸四川! " },
    "Guizhou": { name: "贵州", slogan: "走遍大地神州, 醉美多彩贵州! " },
    "Yunnan": { name: "云南", slogan: "彩云之南, 世界花园! " },
    "Shaanxi": { name: "陕西", slogan: "山水人文, 大美陕西! " },
    "Gansu": { name: "甘肃", slogan: "交响丝路, 如意甘肃! " },
    "Qinghai": { name: "青海", slogan: "大美青海, 欢迎天下! " },
    "Ningxia": { name: "宁夏", slogan: "塞上江南, 晴彩宁夏! " },
    "Xinjiang": { name: "新疆", slogan: "新疆是个好地方! " },
    "Tibet": { name: "西藏", slogan: "世界屋脊, 神奇西藏! " },
    "Hong Kong": { name: "香港", slogan: "东方之珠, 香江盛港! " },
    "Macao": { name: "澳门", slogan: "濠江风情, 魅力澳门! " },
    "Taiwan": { name: "台湾", slogan: "让世界看见台湾! " }
};

/**
 * 我的位置坐标（慕尼黑）
 */
const yourLocation = {
    lat: 48.1487175, // Munich latitude
    lon: 11.5658895, // Munich longitude
};
  
// ==================== 工具函数 ====================

/**
 * 获取国家数据
 * @returns {Promise<Array>} 国家数据数组
 */
async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

/**
 * 获取城市映射数据
 * @returns {Promise<Array>} 城市映射数据
 */
async function fetchCityMap() {
    const response = await fetch('/js/city_name.json');
    return response.json();
}

/**
 * 根据国家代码获取国家名称
 * @param {Array} countries - 国家数据数组
 * @param {string} code - 国家代码
 * @param {string} language - 语言类型，默认为 "english"
 * @returns {string} 国家名称
 */
function getCountryNameByCode(countries, code, language = "english") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "地球";
}

/**
 * 更新位置和国旗显示
 * @param {string} name - 位置名称
 * @param {string} code - 国家代码
 */
function updateLocationAndFlag(name, code) {
    const locationElements = document.querySelectorAll('.location');
    const flagElements = document.querySelectorAll('.country-flag');

    locationElements.forEach(location => location.textContent = name);
    flagElements.forEach(flag => {
        flag.src = `./images/wflags/${code}.png`;
        flag.alt = name;
    });
}

/**
 * 更新省份信息显示
 * @param {string} region - 省份代码
 */
function updateProvinceInfo(region) {
    if (cnProvincesMap[region]) {
        const provinceName = cnProvincesMap[region].name;
        const provinceSlogan = cnProvincesMap[region].slogan;

        const locationElements = document.querySelectorAll('.location');
        locationElements.forEach(location => location.textContent = provinceName);

        let sloganElements = document.querySelectorAll('.province-slogan');
        if (sloganElements.length === 0) {
            locationElements.forEach(location => {
                const span = document.createElement('span');
                span.className = 'province-slogan';
                span.textContent = provinceSlogan;
                location.insertAdjacentElement('afterend', span);
            });
        } else {
            sloganElements.forEach(span => span.textContent = provinceSlogan);
        }
    }
}

/**
 * 计算两点间的距离（使用Haversine公式）
 * @param {number} lat1 - 第一个点的纬度
 * @param {number} lon1 - 第一个点的经度
 * @param {number} lat2 - 第二个点的纬度
 * @param {number} lon2 - 第二个点的经度
 * @returns {number} 距离（公里）
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（公里）
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * 标准化城市名称，去除大小写、重音、多余空格
 * @param {string} name - 原始城市名称
 * @returns {string} 标准化后的城市名称
 */
function normalizeCityName(name) {
    if (!name) return "";
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}
  
// ==================== 缓存管理 ====================

/**
 * 获取缓存的用户设备信息
 * @returns {Object|null} 缓存的设备信息，如果不存在则返回null
 */
function getCachedUserInfo() {
    try {
        const cache = JSON.parse(localStorage.getItem('user_device_info'));
        return cache;
    } catch (e) {
        return null;
    }
}

/**
 * 检查是否为强制刷新
 * @returns {boolean} 是否为强制刷新
 */
function isHardReload() {
    if (window.performance) {
        if (performance.getEntriesByType) {
            const navs = performance.getEntriesByType('navigation');
            if (navs && navs.length > 0 && navs[0].type === 'reload') {
                return true;
            }
        } else if (performance.navigation) {
            return performance.navigation.type === 1;
        }
    }
    return false;
}

/**
 * 获取地理位置信息（优先使用缓存）
 * @returns {Promise<Object>} 地理位置信息
 */
async function getGeoInfo() {
    const cache = getCachedUserInfo();
    const isHard = isHardReload();
    
    // 优先读取缓存，除非强制刷新或缓存过期
    if (!isHard && cache && cache.geoInfo && cache.geoTimestamp && 
        (Date.now() - cache.geoTimestamp < 3600 * 1000)) {
        return cache.geoInfo;
    }
    
    // 缓存无效或过期，重新请求
    const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
    return await response.json();
}

// ==================== 地理位置显示 ====================

/**
 * 显示国家信息和距离
 * 主要功能：获取用户位置，显示位置名称，计算距离
 */
async function displayCountryInfoAndDistance() {
    try {
        // 获取数据
        const [countries, cityMapList, geoData] = await Promise.all([
            fetchCountries(),
            fetchCityMap(),
            getGeoInfo()
        ]);
        
        const cityMap = cityMapList[0]; // 假设 city_name.json 是 [{...}] 结构
        const countryCode = geoData.country.toLowerCase();
        let displayName = "";

        // 优先匹配城市中文名
        if (geoData.city) {
            const normalizedCity = normalizeCityName(geoData.city);
            for (const key in cityMap) {
                if (normalizeCityName(key) === normalizedCity && cityMap[key]["ZH-CN"]) {
                    displayName = cityMap[key]["ZH-CN"];
                    break;
                }
            }
        }

        // 城市未匹配，回退到省份或国家
        if (!displayName) {
            const language = "chinese";
            displayName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

            const chinaRegionCodes = ["CN", "HK", "MO", "TW"];
            if (chinaRegionCodes.includes(countryCode.toUpperCase()) && geoData.region) {
                if (cnProvincesMap[geoData.region]) {
                    displayName = cnProvincesMap[geoData.region].name;
                }
            }
        }

        // 更新显示
        updateLocationAndFlag(displayName, countryCode);
        if (cnProvincesMap[geoData.region]) {
            updateProvinceInfo(geoData.region);
        }

        // 计算并显示距离
        updateDistanceDisplay(geoData);
        
    } catch (error) {
        console.error('地理位置显示失败:', error);
    }
}

/**
 * 更新距离显示
 * @param {Object} geoData - 地理位置数据
 */
function updateDistanceDisplay(geoData) {
    const loc = geoData.loc ? geoData.loc.split(",") : null;
    const distanceElements = document.querySelectorAll('.distance-info');
    
    if (loc && loc.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);
        
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            const displayDistance = distanceKm >= 1 ? 
                `${Math.round(distanceKm)} 公里` : 
                `${Math.round(distanceKm * 1000)} 米`;
            
            distanceElements.forEach(el => el.innerText = displayDistance);

            // 设置CSS变量供其他功能使用
            document.documentElement.style.setProperty('--user-latitude', userLat);
            document.documentElement.style.setProperty('--user-longitude', userLon);
        } else {
            distanceElements.forEach(el => el.innerText = "♾️ 公里");
        }
    } else {
        distanceElements.forEach(el => el.innerText = "♾️ 公里");
    }
}

// 页面加载时执行地理位置显示
document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);




// ==================== 时间显示系统 ====================

/**
 * 获取缓存的时区信息
 * @returns {string} 时区字符串
 */
function getCachedTimeZone() {
    const cache = getCachedUserInfo();
    if (cache && cache.languageInfo && cache.languageInfo.timeZone) {
        return cache.languageInfo.timeZone;
    }
    return localStorage.getItem('userTimeZone') || Intl.DateTimeFormat().resolvedOptions().timeZone;
}

/**
 * 时区别名映射表
 * 将常见的时区别名映射到标准的IANA时区标识符
 */
const timezoneAliases = {
    'Asia/Beijing': 'Asia/Shanghai',
    'Asia/Chongqing': 'Asia/Shanghai',
    'Asia/Harbin': 'Asia/Shanghai',
    'Asia/Kashgar': 'Asia/Urumqi',
    'Asia/Urumqi': 'Asia/Urumqi',
    'Asia/Hong_Kong': 'Asia/Hong_Kong',
    'Asia/Macau': 'Asia/Macau',
    'Asia/Taipei': 'Asia/Taipei'
};

/**
 * 格式化时间显示
 * @param {Date} date - 要格式化的日期对象
 * @param {string} timezone - 时区
 * @param {string} locale - 语言环境
 * @param {boolean} isTime - 是否为时间格式（true）还是日期格式（false）
 * @returns {string} 格式化后的时间字符串
 */
function formatDateTime(date, timezone, locale, isTime = true) {
    let displayDate = date;
    
    // 处理时区别名
    const actualTimezone = timezoneAliases[timezone] || timezone;
    
    // 处理GMT偏移时区
    if (/^GMT[+-]\d+$/.test(actualTimezone)) {
        const offset = parseInt(actualTimezone.replace('GMT', ''));
        displayDate = new Date(date.getTime() + offset * 3600 * 1000 - date.getTimezoneOffset() * 60000);
    }

    const options = isTime ? {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: /^GMT[+-]\d+$/.test(actualTimezone) ? undefined : actualTimezone
    } : {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timeZone: /^GMT[+-]\d+$/.test(actualTimezone) ? undefined : actualTimezone
    };

    return new Intl.DateTimeFormat(locale, options).format(displayDate);
}

/**
 * 更新时间和日期显示
 */
function updateTimeDate() {
    const now = new Date();

    // 更新时间显示
    const timeElements = document.querySelectorAll('.digitalTime');
    
    timeElements.forEach((el, index) => {
        let tz = el.getAttribute('timezone');
        const locale = el.getAttribute('locale') || 'en-US';

        if (!tz) {
            tz = getCachedTimeZone(); // 使用缓存的时区
        } else if (tz === 'LocalCache') {
            tz = getCachedTimeZone();
        }

        // 处理时区别名
        const actualTimezone = timezoneAliases[tz] || tz;
        const formattedTime = formatDateTime(now, actualTimezone, locale, true);
        el.textContent = formattedTime;
    });

    // 更新日期显示
    document.querySelectorAll('.digitalDate').forEach(el => {
        let tz = el.getAttribute('timezone');
        const locale = el.getAttribute('locale') || 'en-US';

        if (!tz) {
            tz = getCachedTimeZone();
        } else if (tz === 'LocalCache') {
            tz = getCachedTimeZone();
        }

        // 处理时区别名
        const actualTimezone = timezoneAliases[tz] || tz;
        el.textContent = formatDateTime(now, actualTimezone, locale, false);
    });
}

// 时间更新将在统一的初始化函数中启动





// ==================== 节日系统 ====================

/**
 * 计算复活节日期（使用高斯算法）
 * @param {number} year - 年份
 * @returns {Object} 包含年、月、日的对象
 */
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

/**
 * 获取当前年份和留欧年数
 */
const currentYear = new Date().getFullYear();
const yearInEurope = currentYear - 2014;

/**
 * 加载节日数据
 * @returns {Promise<Object>} 节日数据对象
 */
async function loadFestivals() {
    try {
        const response = await fetch('js/festival_wishes.json');
        if (!response.ok) {
            throw new Error('Failed to load festivals data');
        }
        const data = await response.json();
        
        // 处理动态年份数据
        data.solar.forEach(festival => {
            if (festival.greetings && festival.greetings.en && festival.greetings.en.includes('years in Europe')) {
                // 更新所有语言的动态年份
                Object.keys(festival.greetings).forEach(lang => {
                    if (festival.greetings[lang] && festival.greetings[lang].includes('years in Europe')) {
                        festival.greetings[lang] = festival.greetings[lang].replace(/\d+/, yearInEurope);
                    }
                });
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


/**
 * 获取当前语言设置
 * @returns {string} 语言代码
 */
function getLanguage() {
    const langSelect = document.getElementById("languages");
    if (langSelect) {
        const value = langSelect.value; // 例如 "en.html"
        return value.split(".")[0]; // 返回 "en"
    }
    return "en"; // 默认英文
}

/**
 * 检查日期是否在指定区间内
 * @param {string} date - 要检查的日期 (MM-DD格式)
 * @param {string} start - 开始日期 (MM-DD格式)
 * @param {string} end - 结束日期 (MM-DD格式)
 * @returns {boolean} 是否在区间内
 */
function isDateInRange(date, start, end) {
    const current = new Date(`2000-${date}`);
    const startDate = new Date(`2000-${start}`);
    const endDate = new Date(`2000-${end}`);
    return current >= startDate && current <= endDate;
}

/**
 * 获取当前公历日期键值
 * @returns {string} 日期键值 (MM-DD格式)
 */
function getSolarKey() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${month}-${day}`;
}

/**
 * 获取当前农历日期键值
 * @returns {string|null} 农历日期键值 (MM-DD格式)，如果获取失败返回null
 */
function getLunarKey() {
    const today = new Date();
    const solarYear = today.getFullYear();
    const solarMonth = today.getMonth() + 1;
    const solarDay = today.getDate();

    // 检查农历库是否加载
    if (!window.chinese_lunar_calendar || !window.chinese_lunar_calendar.getLunar) {
        return null;
    }

    try {
        // 调用农历转换方法
        const lunarDate = window.chinese_lunar_calendar.getLunar(solarYear, solarMonth, solarDay);

        // 提取农历月份和日期
        const lunarMonth = String(lunarDate.lunarMonth).padStart(2, "0");
        const lunarDay = String(lunarDate.lunarDate).padStart(2, "0");

        return `${lunarMonth}-${lunarDay}`;
    } catch (error) {
        return null;
    }
}

/**
 * 更新节日祝福信息
 */
function updateGreeting() {
    const lang = getLanguage();
    const solarKey = getSolarKey();
    const lunarKey = getLunarKey();
    const festivalItems = document.querySelectorAll(".festival-item");

    // 检查节日数据是否加载
    if (!window.festivals) {
        return;
    }

    // 查找节日
    let solarFestival = null;
    let lunarFestival = null;

    // 查找公历节日
    if (window.festivals.solar) {
        window.festivals.solar.forEach(f => {
            if (isDateInRange(solarKey, f.start, f.end)) {
                solarFestival = f;
            }
        });
    }

    // 查找农历节日
    if (window.festivals.lunar && lunarKey) {
        window.festivals.lunar.forEach(f => {
            if (isDateInRange(lunarKey, f.start, f.end)) {
                lunarFestival = f;
            }
        });
    }

    // 根据语言优先级选择节日
    let festival = null;
    if (lang === "zh" || lang === "cn") {
        // 中文网页，优先显示农历节日
        festival = lunarFestival || solarFestival;
    } else {
        // 非中文网页，优先显示公历节日
        festival = solarFestival || lunarFestival;
    }

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

/**
 * 更新日期和祝福显示功能
 * 用于cn-projects.html等页面的日期和节日祝福显示
 */
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
    let fullLunarDateStr = '';
    if (window.chinese_lunar_calendar && window.chinese_lunar_calendar.getLunar) {
        try {
            const lunarDate = window.chinese_lunar_calendar.getLunar(year, parseInt(month), parseInt(day));
            const lunarMonth = String(lunarDate.lunarMonth).padStart(2, '0');
            const lunarDay = String(lunarDate.lunarDate).padStart(2, '0');
            lunarKey = `${lunarMonth}-${lunarDay}`;
            
            // 获取完整的农历日期（包含年份和生肖）
            const lunarMonthString = getLunarMonthString(lunarDate.lunarMonth);
            const lunarDayString = getLunarDayString(lunarDate.lunarDate);
            const lunarYearString = getLunarYearString(year);
            const lunarZodiac = getLunarZodiac(lunarYearString);
            fullLunarDateStr = `${lunarYearString}${lunarZodiac}年${lunarMonthString}${lunarDayString}`;
        } catch (e) {
            // 农历日期获取失败，静默处理
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
        festivalGreetingEl.innerHTML = festival.greetings.cn;
    } else {
        // 显示时钟
        festivalGreetingEl.innerHTML = `
            <text><a href="//24timezones.com/Zurich/time" style="text-decoration: none" class="clock24"
                id="tz24-1658714807-c1268-eyJob3VydHlwZSI6IjEyIiwic2hvd2RhdGUiOiIwIiwic2hvd3NlY29uZHMiOiIxIiwic2hvd3RpbWV6b25lIjoiMCIsInR5cGUiOiJkIiwibGFuZyI6ImVuIn0="
                title="timezone - Zurich" target="_blank" rel="nofollow">西欧时间 [CET]</a></text>
            <script type="text/javascript" src="//w.24timezones.com/l.js" async></script>
        `;
        festivalGreetingEl.style.display = 'block';
    }
    
    // 更新日期显示
    let dateStr = `${year}年${month}月${day}日`;
    if (isLunarFestival && fullLunarDateStr) {
        // 农历节日只显示农历日期
        dateStr = fullLunarDateStr;
    }
    currentDateEl.textContent = dateStr;
}

// ==================== 农历日期格式化 ====================

/**
 * 获取农历月份的格式
 * @param {number} month - 农历月份 (1-12)
 * @returns {string} 农历月份字符串
 */
function getLunarMonthString(month) {
    const lunarMonths = ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    return lunarMonths[month - 1];
}

/**
 * 获取农历日期的格式
 * @param {number} day - 农历日期 (1-30)
 * @returns {string} 农历日期字符串
 */
function getLunarDayString(day) {
    const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
    return lunarDays[day - 1];
}

/**
 * 获取农历年份的干支表示
 * @param {number} year - 公历年份
 * @returns {string} 干支表示
 */
function getLunarYearString(year) {
    const heavenlyStems = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
    const earthlyBranches = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    const stemIndex = (year - 4) % 10; // 天干索引
    const branchIndex = (year - 4) % 12; // 地支索引

    return heavenlyStems[stemIndex] + earthlyBranches[branchIndex]; // 返回干支表示
}

/**
 * 获取生肖
 * @param {string} lunarYearString - 干支年份字符串
 * @returns {string} 生肖
 */
function getLunarZodiac(lunarYearString) {
    const zodiac = {
        "子": "鼠", "丑": "牛", "寅": "虎", "卯": "兔", "辰": "龙", "巳": "蛇",
        "午": "马", "未": "羊", "申": "猴", "酉": "鸡", "戌": "狗", "亥": "猪"
    };

    // 从干支表示中提取地支并返回生肖
    const branch = lunarYearString.charAt(1); // 获取地支
    return zodiac[branch] || "";
}

// ==================== 初始化系统 ====================

/**
 * 页面加载完成后初始化所有功能
 */
document.addEventListener("DOMContentLoaded", async function() {
    try {
        // 启动时间更新
        updateTimeDate(); // 立即执行一次
        setInterval(updateTimeDate, 1000); // 每秒更新
        
        // 先加载节日数据
        await loadFestivals();
        
        // 等待农历库加载完成
        setTimeout(function() {
            updateGreeting();
            updateDateAndWish();
        }, 1000);
    } catch (error) {
        console.error('系统初始化失败:', error);
    }
});


