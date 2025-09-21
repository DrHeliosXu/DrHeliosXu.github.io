// ------------------- 配置数据 -------------------
const cnProvincesMap = {
    "Beijing": { name: "北京", slogan: "北境长城, 京华盛世! " },
    "Tianjin": { name: "天津", slogan: "天天乐道, 津津有味! " },
    "Hebei": { name: "河北", slogan: "这么近, 那么美, 周末到河北! " },
    "Shanxi": { name: "山西", slogan: "华夏古文明, 山西好风光! " },
    "Inner Mongolia": { name: "内蒙古", slogan: "祖国正北方, 亮丽内蒙古! " },
    "Liaoning": { name: "辽宁", slogan: "山海有情, 天辽地宁! " },
    "Jilin": { name: "吉林", slogan: "白山松水, 吉祥吉林! " },
    "Heilongjiang": { name: "黑龙江", slogan: "北国好风光, 尽在黑龙江! " },
    "Shanghai": { name: "上海", slogan: "上善若水, 海纳百川! " },
    "Jiangsu": { name: "江苏", slogan: "水韵江苏, 风华天下! " },
    "Zhejiang": { name: "浙江", slogan: "诗画江南, 活力浙江! " },
    "Anhui": { name: "安徽", slogan: "美好安徽, 迎客天下! " },
    "Fujian": { name: "福建", slogan: "福来福往, 自由自在! " },
    "Jiangxi": { name: "江西", slogan: "江西风景独好! " },
    "Shandong": { name: "山东", slogan: "好客山东, 文景盛地! " },
    "Henan": { name: "河南", slogan: "中原沃土, 风华河南! " },
    "Hubei": { name: "湖北", slogan: "知音湖北, 遇见无处不在! " },
    "Hunan": { name: "湖南", slogan: "三湘四水, 相约湖南! " },
    "Guangdong": { name: "广东", slogan: "粤见山海, 不负热爱! " },
    "Guangxi": { name: "广西", slogan: "秀甲天下, 壮美广西! " },
    "Hainan": { name: "海南", slogan: "阳光海南, 度假天堂! " },
    "Chongqing": { name: "重庆", slogan: "雄奇山水, 新韵重庆! " },
    "Sichuan": { name: "四川", slogan: "锦绣天府, 安逸四川! " },
    "Guizhou": { name: "贵州", slogan: "走遍大地神州, 醉美多彩贵州! " },
    "Yunnan": { name: "云南", slogan: "彩云之南, 世界花园! " },
    "Shaanxi": { name: "陕西", slogan: "山水人文, 大美陕西! " },
    "Gansu": { name: "甘肃", slogan: "交响丝路, 如意甘肃! " },
    "Qinghai": { name: "青海", slogan: "大美青海, 欢迎天下! " },
    "Ningxia": { name: "宁夏", slogan: "塞上江南, 晴彩宁夏! " },
    "Xinjiang": { name: "新疆", slogan: "新疆是个好地方! " },
    "Tibet": { name: "西藏", slogan: "世界屋脊, 神奇西藏! " },
    "Hong Kong": { name: "香港", slogan: "东方之珠, 香江盛港! " },
    "Macao": { name: "澳门", slogan: "濠江风情, 魅力澳门! " },
    "Taiwan": { name: "台湾", slogan: "让世界看见台湾! " }
  };
  
  const yourLocation = {
    lat: 48.1487175, // Munich latitude
    lon: 11.5658895, // Munich longitude
  };
  
  // ------------------- 工具函数 -------------------
  async function fetchCountries() {
    const response = await fetch("/js/countries.json");
    return response.json();
  }
  
  async function fetchCityMap() {
    const response = await fetch('/js/city_name.json');
    return response.json();
  }
  
  function getCountryNameByCode(countries, code, language = "english") {
    const country = countries.find((country) => country.abbr === code);
    return country ? country[language] || country.english : "地球";
  }
  
  function updateLocationAndFlag(name, code) {
    const locationElements = document.querySelectorAll('.location');
    const flagElements = document.querySelectorAll('.country-flag');
  
    locationElements.forEach(location => location.textContent = name);
    flagElements.forEach(flag => {
      flag.src = `./images/wflags/${code}.png`;
      flag.alt = name;
    });
  }
  
  function updateProvinceInfo(region) {
    if (cnProvincesMap[region]) {
      const provinceName = cnProvincesMap[region].name;
      const provinceSlogan = cnProvincesMap[region].slogan;
  
      const locationElements = document.querySelectorAll('.location');
      locationElements.forEach(location => location.textContent = provinceName);
  
      let sloganElements = document.querySelectorAll('.province-slogan');
      if (sloganElements.length === 0) {
        locationElements.forEach(location => {
          const span = document.createElement('span');
          span.className = 'province-slogan';
          span.textContent = provinceSlogan;
          location.insertAdjacentElement('afterend', span);
        });
      } else {
        sloganElements.forEach(span => span.textContent = provinceSlogan);
      }
    }
  }
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  // 标准化城市名，去大小写、重音、空格
  function normalizeCityName(name) {
    if (!name) return "";
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }
  
  // ------------------- 主逻辑 -------------------
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
    const countries = await fetchCountries();
    const cityMapList = await fetchCityMap();
    const cityMap = cityMapList[0]; // 假设 city_name.json 是 [{...}] 结构

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
    const countryCode = data.country.toLowerCase();

    let displayName = "";

    // ---- 城市中文名优先 ----
    if (data.city) {
      const normalizedCity = normalizeCityName(data.city);
      for (const key in cityMap) {
        if (normalizeCityName(key) === normalizedCity && cityMap[key]["ZH-CN"]) {
          displayName = cityMap[key]["ZH-CN"];
          break;
        }
      }
    }

    // ---- 城市未匹配，回退到省份或国家 ----
    if (!displayName) {
      const language = "chinese";
      displayName = getCountryNameByCode(countries, countryCode.toUpperCase(), language);

      const chinaRegionCodes = ["CN", "HK", "MO", "TW"];
      if (chinaRegionCodes.includes(countryCode.toUpperCase()) && data.region) {
        if (cnProvincesMap[data.region]) {
          displayName = cnProvincesMap[data.region].name;
        }
      }
    }

    // ---- 更新显示 ----
    updateLocationAndFlag(displayName, countryCode);
    if (cnProvincesMap[data.region]) updateProvinceInfo(data.region);

    // ---- 距离计算 ----
    const loc = data.loc ? data.loc.split(",") : null;
    const distanceElements = document.querySelectorAll('.distance-info');
    if (loc && loc.length === 2) {
      const userLat = parseFloat(loc[0]);
      const userLon = parseFloat(loc[1]);
      if (!isNaN(userLat) && !isNaN(userLon)) {
        const distanceKm = calculateDistance(yourLocation.lat, yourLocation.lon, userLat, userLon);
        const displayDistance = distanceKm >= 1 ? `${Math.round(distanceKm)} 公里` :
                                distanceKm > 0 ? `${Math.round(distanceKm * 1000)} 米` : "♾️ 公里";
        distanceElements.forEach(el => el.innerText = displayDistance);

        document.documentElement.style.setProperty('--user-latitude', userLat);
        document.documentElement.style.setProperty('--user-longitude', userLon);
      } else {
        distanceElements.forEach(el => el.innerText = "♾️ 公里");
      }
    } else {
      distanceElements.forEach(el => el.innerText = "♾️ 公里");
    }
  }
  
  document.addEventListener("DOMContentLoaded", displayCountryInfoAndDistance);