// 阿拉伯语主要国家的 language-flag
const languageCountryFlagMap = {
    'dz': 'dz.svg', // 阿尔及利亚
    'bh': 'bh.svg', // 巴林
    'km': 'km.svg', // 科摩罗
    'dj': 'dj.svg', // 吉布提
    'eg': 'eg.svg', // 埃及
    'iq': 'iq.svg', // 伊拉克
    'jo': 'jo.svg', // 约旦
    'kw': 'kw.svg', // 科威特
    'lb': 'lb.svg', // 黎巴嫩
    'ly': 'ly.svg', // 利比亚
    'mr': 'mr.svg', // 毛里塔尼亚
    'ma': 'ma.svg', // 摩洛哥
    'om': 'om.svg', // 阿曼
    'ps': 'ps.svg', // 巴勒斯坦
    'qa': 'qa.svg', // 卡塔尔
    'sa': 'sa.svg', // 沙特阿拉伯
    'so': 'so.svg', // 索马里
    'sd': 'sd.svg', // 苏丹
    'sy': 'sy.svg', // 叙利亚
    'tn': 'tn.svg', // 突尼斯
    'ae': 'ae.svg', // 阿联酋
    'ye': 'ye.svg', // 也门
};

// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/world.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称
function getCountryNameByCode(countries, code, language = "ar") {
    const country = countries.find((country) => country.alpha2 === code);
    return country ? country[language] || country.english : "أرض";
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
    lat: 48.1487175,
    lon: 11.5658895,
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
    const language = "ar";
    const countryName = getCountryNameByCode(countries, countryCode, language);

    // 更新位置和通用国旗
    updateLocationAndFlag(countryName, countryCode);

    // === 更新阿拉伯语 language-flag ===
    const languageFlag = document.getElementById("language-flag");
    if (languageFlag) {
        if (languageCountryFlagMap[countryCode]) {
            languageFlag.src = `./images/wflags_svg/${languageCountryFlagMap[countryCode]}`;
            languageFlag.alt = countryName;
            languageFlag.style.display = "inline-block";
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
                displayDistance = `${Math.round(distanceKm)} كيلومتر`;
            } else if (distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} متر`;
            } else {
                displayDistance = "♾️ كيلومتر";
            }
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = displayDistance);
        } else {
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ كيلومتر");
        }
    } else {
        document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ كيلومتر");
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);