const languageCountryFlagMap = {
    'us': 'us.svg',
    'ca': 'ca.svg',
    'au': 'au.svg',
    'nz': 'nz.svg',
    'ie': 'ie.svg',
    'za': 'za.svg',
    'in': 'in.svg',
    'sg': 'sg.svg',
    'hk': 'hk.svg'
};

async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

function getCountryNameByCode(countries, code, language = "english") {
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
    const language = "english";
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    // 更新位置和国旗
    updateLocationAndFlag(countryName, countryCode);

    // === 更新语言旗帜 ===
    const languageFlag = document.getElementById("language-flag");
    if (languageFlag) {
        if (languageCountryFlagMap[countryCode]) {
            languageFlag.src = `./images/wflags_svg/${languageCountryFlagMap[countryCode]}`;
            languageFlag.style.display = "inline-block";
        } else {
            languageFlag.style.display = "none";
        }
    }

    // === 计算距离 ===
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