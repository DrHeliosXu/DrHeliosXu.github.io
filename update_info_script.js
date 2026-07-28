// updateInfo.js

// 固定的个人信息，包含默认的 citation
const data = {
    "age": new Date().getFullYear() - 1993,
    "web_update_year": 2026,
    "web_update_month": "07",
    "web_update_day": 1,
    "born_year": 1993,
    "year_of_experience": 8,
    "no_of_papers": 15,
    "google_scholar_citation": 539,  // 默认值
    "h_index": 11,
    "no_of_journals_for_review": 10,
    "no_of_reviews": 55,
    "no_of_patents": 3,
    "no_of_patents_in_review": 2,
    "no_of_patents_sum": 5,
    "patent_citation": 18,
    "no_of_grants": 6,
    "no_of_books": 0,
    "student_guidance_count": 3,
    "phd_thesis_views": 2200,
    "phd_thesis_downloads": 660,
    "zhihu_followers": 13891,
    "linkedin_followers": 1900,
    "xiaohongshu_followers": 3200,
    "visited_countries": 41,
    "home_location": {
        "name": "Frankfurt am Main",
        "country": "DE",
        "latitude": 50.117,
        "longitude": 8.683,
        "timeZone": "Europe/Berlin",
        "localizedNames": {
            "cn": "法兰克福",
            "en": "Frankfurt",
            "de": "Frankfurt",
            "fr": "Francfort",
            "it": "Francoforte",
            "es": "Fráncfort",
            "jp": "フランクフルト",
            "kr": "프랑크푸르트",
            "th": "แฟรงก์เฟิร์ต",
            "vi": "Frankfurt",
            "ru": "Франкфурт",
            "ar": "فرانكفورت"
        }
    },
    // 使用所在地坐标请求实时天气，并在浏览器本地缓存 20 分钟。
    "weather_api_enabled": true,

  };

window.siteInfoData = data;

// 页脚天气不再依赖第三方图片横幅。使用所在地坐标请求轻量数据，并短暂缓存以避免每页重复请求。
function initFooterWeather() {
    const widgets = Array.from(document.querySelectorAll('#weather'));
    if (!widgets.length) return;

    const location = data.home_location;
    const cacheKey = 'footer_weather_' + location.latitude + '_' + location.longitude;
    const cacheDuration = 20 * 60 * 1000;
    const weatherIconDirectory = 'images/amcharts_weather_icons_1.0.0/animated/';

    // Open-Meteo WMO 代码映射到项目中已下载的动画天气 SVG。
    function iconForWeatherCode(code, isDay) {
        const daytime = Number(isDay) !== 0;
        if (code === 0) return daytime ? 'day.svg' : 'night.svg';
        if (code === 1) return daytime ? 'cloudy-day-1.svg' : 'cloudy-night-1.svg';
        if (code === 2) return daytime ? 'cloudy-day-2.svg' : 'cloudy-night-2.svg';
        if ([3, 45, 48].includes(code)) return 'cloudy.svg';
        if ([51, 53, 55, 56, 57].includes(code)) return 'rainy-1.svg';
        if ([61, 63, 66, 80].includes(code)) return 'rainy-3.svg';
        if ([65, 67, 81, 82].includes(code)) return 'rainy-5.svg';
        if ([71, 73, 77, 85].includes(code)) return 'snowy-3.svg';
        if ([75, 86].includes(code)) return 'snowy-5.svg';
        if ([95, 96, 99].includes(code)) return 'thunder.svg';
        return daytime ? 'day.svg' : 'night.svg';
    }

    function renderWeather(weather) {
        const icon = weatherIconDirectory + iconForWeatherCode(Number(weather && weather.weatherCode), weather && weather.isDay);
        widgets.forEach(function (widget) {
            widget.className = 'footer-weather';
            widget.href = 'https://open-meteo.com/';
            widget.setAttribute('aria-label', 'Frankfurt weather');
            widget.innerHTML = '<img class="footer-weather__icon" src="' + icon + '" alt="" aria-hidden="true">';
        });
    }

    function readCachedWeather() {
        try {
            const cached = JSON.parse(localStorage.getItem(cacheKey));
            if (cached && Date.now() - cached.timestamp < cacheDuration) return cached;
        } catch (error) {}
        return null;
    }

    const cachedWeather = readCachedWeather();
    renderWeather(cachedWeather);

    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = controller ? window.setTimeout(function () { controller.abort(); }, 5000) : null;
    if (data.weather_api_enabled !== true) return;

    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(location.latitude)
        + '&longitude=' + encodeURIComponent(location.longitude)
        + '&current=temperature_2m,weather_code,is_day&timezone=' + encodeURIComponent(location.timeZone);

    fetch(url, controller ? { signal: controller.signal } : undefined)
        .then(function (response) {
            if (!response.ok) throw new Error('Weather request failed');
            return response.json();
        })
        .then(function (response) {
            const current = response.current || {};
            const weather = {
                temperature: current.temperature_2m,
                weatherCode: current.weather_code,
                isDay: current.is_day,
                timestamp: Date.now()
            };
            localStorage.setItem(cacheKey, JSON.stringify(weather));
            renderWeather(weather);
        })
        .catch(function () {
            // 网络不可用时保留缓存或占位温度，不影响页脚其他内容。
        })
        .finally(function () {
            if (timeout) window.clearTimeout(timeout);
        });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooterWeather, { once: true });
} else {
    initFooterWeather();
}



// 更新指定类名的 <span> 内容的函数
function updateContent() {
    for (const key in data) {
        const elements = document.getElementsByClassName(key);
        for (const element of elements) {
            element.innerText = data[key]; // 更新每个元素
        }
    }
}

// 调用更新函数
updateContent();


// block save as, copy, and developer tools 
window.onload = function () {
  // Disable right-click context menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // Disable text selection
  document.addEventListener('selectstart', function (e) {
    e.preventDefault();
  });

  // Disable drag and drop
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // Disable common keyboard shortcuts
  document.addEventListener('keydown', function (e) {
    // Block F12
    if (e.keyCode === 123) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+I (DevTools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
      e.preventDefault();
    }
    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
      e.preventDefault();
    }
    // Block Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
      e.preventDefault();
    }
    // Block Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
      e.preventDefault();
    }
    // Block Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
      e.preventDefault();
    }
    // Block Ctrl+C (Copy)
    if (e.ctrlKey && e.keyCode === 67) {
      e.preventDefault();
    }
    // Block Ctrl+X (Cut)
    if (e.ctrlKey && e.keyCode === 88) {
      e.preventDefault();
    }
    // Block Ctrl+V (Paste)
    if (e.ctrlKey && e.keyCode === 86) {
      e.preventDefault();
    }
    // Block Ctrl+A (Select All)
    if (e.ctrlKey && e.keyCode === 65) {
      e.preventDefault();
    }
    // Block Shift+F10 (Context Menu)
    if (e.shiftKey && e.keyCode === 121) {
      e.preventDefault();
    }
  });
}
