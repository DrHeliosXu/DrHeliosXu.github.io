// 俄语主要国家的 language-flag
const languageCountryFlagMap = {
    'ru': 'ru.svg', // 俄罗斯
    'by': 'by.svg', // 白俄罗斯
    // 'kz': 'kz.svg', // 哈萨克斯坦
    // 'kg': 'kg.svg', // 吉尔吉斯斯坦
    // 'tj': 'tj.svg', // 塔吉克斯坦
    // 'uz': 'uz.svg', // 乌兹别克斯坦
    // 'md': 'md.svg', // 摩尔多瓦
    // 'ua': 'ua.svg', // 乌克兰
};

// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称
function getCountryNameByCode(countries, code, language = "russian") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "Земля";
}

// 更新位置和通用国旗
function updateLocationAndFlag(countryName, countryCode) {
    const locationElements = document.querySelectorAll('.location');
    const flagElements = document.querySelectorAll('.country-flag');

    locationElements.forEach(location => {
        location.textContent = countryName;
    });

    flagElements.forEach(flag => {
        flag.src = `./images/wflags/${countryCode}.png`;
        flag.alt = countryName;
    });
}

// 计算距离（公里）
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

const yourLocation = {
    lat: 48.1487175, // Munich latitude
    lon: 11.5658895, // Munich longitude
};

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
    const language = "russian";
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    // 更新位置和通用国旗
    updateLocationAndFlag(countryName, countryCode);

    // === 更新俄语 language-flag ===
    const languageFlag = document.getElementById("language-flag");
    if (languageFlag) {
        if (languageCountryFlagMap[countryCode]) {
            languageFlag.src = `./images/wflags_svg/${languageCountryFlagMap[countryCode]}`;
            languageFlag.alt = countryName;
            languageFlag.style.display = "inline-block";
            // 其他特殊国家可在此处理高度/宽度，这里默认 15x24
            languageFlag.style.height = '15px';
            languageFlag.style.width = '24px';
        } else {
            languageFlag.style.display = "none";
        }
        languageFlag.onerror = () => { languageFlag.style.display = 'none'; };
    }

    // === 距离计算 ===
    const loc = data.loc ? data.loc.split(",") : null;
    if (loc?.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            let displayDistance;
            if (distanceKm >= 1) {
                displayDistance = `${Math.round(distanceKm)} км`;
            } else if (distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} м`;
            } else {
                displayDistance = "♾️ км";
            }
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = displayDistance);
        } else {
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ км");
        }
    } else {
        document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ км");
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);