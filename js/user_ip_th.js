// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/world.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称
function getCountryNameByCode(countries, code, language = "th") {
    const country = countries.find((country) => country.alpha2 === code);  // 使用 alpha2 匹配
    return country ? country[language] || country.english : "โลก";  // 如果指定语言不存在，返回英语名称，默认值为 "지구"
}

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

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
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
    const language = "th";
    // 确保 getCountryNameByCode 函数已经定义
    function getCountryNameByCode(countries, countryCode, language) {
        const country = countries.find(country => country.alpha2 === countryCode);
        return country ? country[language] : null;
    }
    const countryName = getCountryNameByCode(countries, countryCode, language);

    // 更新位置和国旗
    updateLocationAndFlag(countryName, countryCode);

    const loc = data.loc ? data.loc.split(",") : null;

    if (loc && loc.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            let displayDistance;
            if (distanceKm >= 1) {
                displayDistance = `${Math.round(distanceKm)} กิโลเมตร`;
            } else if (distanceKm < 1 && distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} เมตร`;
            } else {
                displayDistance = "♾️ กิโลเมตร";
            }
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = displayDistance;
            });
        } else {
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = "♾️ กิโลเมตร";
            });
        }
    } else {
        const distanceElements = document.querySelectorAll('.distance-info');
        distanceElements.forEach(distanceElement => {
            distanceElement.innerText = "♾️ กิโลเมตร";
        });
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);