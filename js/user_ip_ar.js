// 获取国家数据
async function fetchCountries() {
    const response = await fetch("/js/world.json");
    return response.json();
}

// 根据国家代码和语言获取国家名称
function getCountryNameByCode(countries, code, language = "ar") {
    const country = countries.find((country) => country.alpha2 === code);  // 使用 alpha2 匹配
    return country ? country[language] || country.english : "أرض";  // 如果指定语言不存在，返回英语名称，默认值为 "지구"
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
    const countryCode = data.country.toLowerCase();  // 这里不需要使用 toLowerCase()，假设返回的国家代码是大写
    const language = "ar"; // 更改为您想要显示的语言

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

        // Check if lat/lon are valid numbers
        if (!isNaN(userLat) && !isNaN(userLon)) {
            const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
            let displayDistance;

            if (distanceKm >= 1) {
                displayDistance = `${Math.round(distanceKm)} كيلومتر`;
            } else if (distanceKm < 1 && distanceKm > 0) {
                displayDistance = `${Math.round(distanceKm * 1000)} متر`;
            } else {
                displayDistance = "♾️ كيلومتر"; // In case of an invalid distance
            }

            // 更新距离信息
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = displayDistance;
            });
        } else {
            const distanceElements = document.querySelectorAll('.distance-info');
            distanceElements.forEach(distanceElement => {
                distanceElement.innerText = "♾️ كيلومتر";
            });
        }
    } else {
        const distanceElements = document.querySelectorAll('.distance-info');
        distanceElements.forEach(distanceElement => {
            distanceElement.innerText = "♾️ كيلومتر";
        });
    }
}

document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);