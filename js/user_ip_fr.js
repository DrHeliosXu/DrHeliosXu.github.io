// 法语主要国家的 language-flag
const languageCountryFlagMap = {
    'be': 'be.svg', // 比利时
    'ch': 'ch.svg', // 瑞士
    'lu': 'lu.svg', // 卢森堡
    'ca': 'ca.svg', // 加拿大法语区
};

// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称（法语处理冠词）
function getCountryNameByCode(countries, code, language = "french") {
    const country = countries.find((country) => country.abbr === code);
    const frenchName = country ? country[language] || country.english : "la terre";

    if (frenchName === "la terre") {
        return frenchName;
    }

    if (frenchName.startsWith("le ")) {
        return frenchName.replace("le ", "du ");
    }

    if (frenchName.startsWith("les ")) {
        return frenchName.replace("les ", "des ");
    }

    const firstLetter = frenchName.charAt(0).toUpperCase();
    if (["A", "E", "I", "O", "U"].includes(firstLetter)) {
        return `de l'${frenchName}`;
    }

    return `de ${frenchName}`;
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
    const countries = await fetchCountries();
    const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
    const data = await response.json();
    const countryCode = data.country.toLowerCase();
    const language = "french";
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    // 更新位置和通用国旗
    updateLocationAndFlag(countryName, countryCode);

    // === 更新法语 language-flag ===
    const languageFlag = document.getElementById("language-flag");
    if (languageFlag) {
        if (languageCountryFlagMap[countryCode]) {
            languageFlag.src = `./images/wflags_svg/${languageCountryFlagMap[countryCode]}`;
            languageFlag.alt = countryName;
            languageFlag.style.display = "inline-block";

            // 瑞士特殊处理：只限制高度，不限制宽度
            if (countryCode === 'ch') {
                languageFlag.style.height = '15px';
                languageFlag.style.width = 'auto';
            } else {
                languageFlag.style.height = '15px';
                languageFlag.style.width = '24px';
            }

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
                displayDistance = `${Math.round(distanceKm)} km`;
            } else if (distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} m`;
            } else {
                displayDistance = "♾️ km";
            }
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = displayDistance);
        } else {
            document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ km");
        }
    } else {
        document.querySelectorAll('.distance-info').forEach(d => d.innerText = "♾️ km");
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);