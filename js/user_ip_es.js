// 西班牙语主要国家的 language-flag
const languageCountryFlagMap = {
    'mx': 'mx.svg',
    'ar': 'ar.svg',
    'co': 'co.svg',
    'cl': 'cl.svg',
    'pe': 'pe.svg',
    'uy': 'uy.svg',
    've': 've.svg',
    'ec': 'ec.svg',
    'bo': 'bo.svg',
    'py': 'py.svg',
    'do': 'do.svg',
    'cr': 'cr.svg',
    'pa': 'pa.svg',
    'gt': 'gt.svg',
    'hn': 'hn.svg',
    'sv': 'sv.svg',
    'ni': 'ni.svg'
};

async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

function getCountryNameByCode(countries, code, language = "spanish") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "la tierra";
}

// 更新位置和国旗（保留 .country-flag 功能，同时新增 #language-flag）
function updateLocationAndFlag(countryName, countryCode) {
    // 原有位置更新
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
        } else {
            langFlag.src = defaultLangFlag;
            langFlag.style.display = 'none';
        }
        langFlag.alt = countryName;
        langFlag.onerror = () => { langFlag.style.display = 'none'; };
    }
}

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
    const countries = await fetchCountries();
    const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
    const data = await response.json();
    const countryCode = data.country.toLowerCase();
    const language = "spanish";
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    // 更新位置和国旗
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