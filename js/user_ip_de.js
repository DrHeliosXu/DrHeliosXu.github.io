const languageCountryFlagMap = {
    'at': 'at.svg',
    'ch': 'ch.svg',
    'li': 'li.svg',
    'lu': 'lu.svg'
};

async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

function getCountryNameByCode(countries, code, language = "germen") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "the Earth";
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

function updateLanguageFlag(countryCode) {
    const languageFlag = document.getElementById("language-flag");
    if (!languageFlag) return; // 如果页面没有这个元素就直接退出

    // 默认显示 UN 图标
    languageFlag.src = "./images/wflags_svg/un.svg";
    languageFlag.style.display = "inline-block";

    // 检查是否在映射表中
    if (languageCountryFlagMap.hasOwnProperty(countryCode)) {
        const newSrc = `./images/wflags_svg/${countryCode}.svg`;
        languageFlag.src = newSrc;

        // 如果加载失败就隐藏
        languageFlag.onerror = () => {
            languageFlag.style.display = "none";
        };
    } else {
        // 不在映射表中直接隐藏
        languageFlag.style.display = "none";
    }
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
    const countries = await fetchCountries();
    const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
    const data = await response.json();
    const countryCode = data.country.toLowerCase();
    const language = "germen"; 
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    updateLocationAndFlag(countryName, countryCode);

    // === 新增：更新 language-flag 显示 ===
    const languageFlag = document.getElementById("language-flag");
    if (languageFlag) {
        if (languageCountryFlagMap[countryCode]) {
            languageFlag.src = `./images/wflags_svg/${countryCode}.svg`;

            if (countryCode === "ch") {
                // 如果是瑞士，去掉宽度限制，只保留高度
                languageFlag.style.height = "15px";
                languageFlag.style.removeProperty("width");
            } else {
                // 其他国家正常设置
                languageFlag.style.height = "15px";
                languageFlag.style.width = "24px";
            }
            languageFlag.style.display = "inline-block";
        } else {
            // 找不到对应 flag 就隐藏
            languageFlag.style.display = "none";
        }
    }

    const loc = data.loc ? data.loc.split(",") : null;
    if (loc && loc.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            let displayDistance;
            if (distanceKm >= 1) {
                displayDistance = `${Math.round(distanceKm)} km`;
            } else if (distanceKm < 1 && distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} m`;
            } else {
                displayDistance = "♾️ km";
            }
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = displayDistance);
        }
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);