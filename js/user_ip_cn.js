async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
}

function getCountryNameByCode(countries, code, language = "english") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "地球";
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
    const countries = await fetchCountries();
    const response = await fetch("https://ipinfo.io/json?token=228a7bb192c4fc");
    const data = await response.json();
    const countryCode = data.country.toLowerCase();
    const language = "chinese"; // 更改为您想要显示的语言
    const countryName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

    // 更新位置和国旗
    updateLocationAndFlag(countryName, countryCode);

    const loc = data.loc ? data.loc.split(",") : null;

    if (loc && loc.length === 2) {
        const userLat = parseFloat(loc[0]);
        const userLon = parseFloat(loc[1]);

        // Check if lat/lon are valid numbers
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            let displayDistance;

            if (distanceKm >= 1) {
                displayDistance = `${Math.round(distanceKm)} km`;
            } else if (distanceKm < 1 && distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} m`;
            } else {
                displayDistance = "♾️ km"; // In case of an invalid distance
            }

            // 更新距离信息
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = displayDistance;
            });

            // 输出经纬度到CSS变量
            document.documentElement.style.setProperty('--user-latitude', userLat);
            document.documentElement.style.setProperty('--user-longitude', userLon);


        } else {
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = "♾️ km";
            });
        }
    } else {
        const distanceElements = document.querySelectorAll('.distance-info');
        distanceElements.forEach(distanceElement => {
            distanceElement.innerText = "♾️ km";
        });
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);