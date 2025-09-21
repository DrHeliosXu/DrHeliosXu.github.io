// 筛选显示意大利语相关国家的 language-flag
const languageCountryFlagMap = {
    'it': 'it.svg', // 意大利
    'ch': 'ch.svg', // 瑞士意大利语区
    'sm': 'sm.svg', // 圣马力诺
    'va': 'va.svg'  // 梵蒂冈
};

// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/world.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称
function getCountryNameByCode(countries, code, language = "it") {
    const country = countries.find((country) => country.alpha2 === code);
    return country ? country[language] || country.english : "la terra";
}

// 更新位置和国旗（保留 .country-flag，同时新增 #language-flag）
function updateLocationAndFlag(countryName, countryCode) {
    // 更新位置
    const locationElements = document.querySelectorAll('.location');
    locationElements.forEach(location => {
        location.textContent = countryName;
    });

    // 原有 .country-flag 功能
    const flagElements = document.querySelectorAll('.country-flag');
    flagElements.forEach(flag => {
        flag.src = `./images/wflags/${countryCode}.png`;
        flag.alt = countryName;
    });

    // 新增 #language-flag 功能
    const langFlag = document.getElementById('language-flag');
    const defaultLangFlag = './images/wflags_svg/un.svg';
    if (langFlag) {
        if (languageCountryFlagMap[countryCode]) {
            langFlag.src = `./images/wflags_svg/${languageCountryFlagMap[countryCode]}`;
            langFlag.style.display = 'inline-block';
            langFlag.alt = countryName;

            // 瑞士特殊处理：只设置高度，不限制宽度
            if (countryCode === 'ch') {
                langFlag.style.height = '15px';
                langFlag.style.width = 'auto';
            } else {
                langFlag.style.height = '15px';
                langFlag.style.width = '24px';
            }

        } else {
            langFlag.src = defaultLangFlag;
            langFlag.style.display = 'none';
            langFlag.alt = countryName;
        }

        langFlag.onerror = () => { langFlag.style.display = 'none'; };
    }
}

// 距离计算函数和 displayCountryInfoAndDistance 保持不变
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

const yourLocation = { lat: 48.1487175, lon: 11.5658895 };

async function displayCountryInfoAndDistance() {
    // 判断是否为强制刷新（hard reload）
    let isHardReload = false;
    if (window.performance) {
        if (performance.getEntriesByType) {
            const navs = performance.getEntriesByType('navigation');
            if (navs && navs.length > 0 && navs[0].type === 'reload') {
                isHardReload = true;
            }
        } else if (performance.navigation) {
            isHardReload = performance.navigation.type === 1;
        }
    }
    // 优先读取缓存，除非强制刷新
    let data = null;
    try {
        const cache = JSON.parse(localStorage.getItem('user_device_info'));
        if (!isHardReload && cache && cache.geoInfo && cache.geoTimestamp && (Date.now() - cache.geoTimestamp < 3600 * 1000)) {
            data = cache.geoInfo;
        }
    } catch {}
    if (!data) {
        // 缓存无效或过期，或强制刷新，重新请求
        const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
        data = await response.json();
    }
    const countries = await fetchCountries();
    const countryCode = data.country.toLowerCase();
    const language = "it";
    const countryName = getCountryNameByCode(countries, countryCode, language);

    updateLocationAndFlag(countryName, countryCode);

    const loc = data.loc ? data.loc.split(",") : null;
    let displayDistance = "♾️ km";

    if (loc && loc.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            if (distanceKm >= 1) displayDistance = `${Math.round(distanceKm)} km`;
            else if (distanceKm > 0) displayDistance = `${Math.round(distanceKm * 1000)} m`;
        }
    }

    document.querySelectorAll('.distance-info').forEach(el => el.innerText = displayDistance);
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);