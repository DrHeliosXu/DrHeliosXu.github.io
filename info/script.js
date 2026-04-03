const COLOR_TONES = {
  europe: {
    labels: { en: "Europe", zh: "欧洲", fr: "Europe", de: "Europa" },
    swatch: "linear-gradient(to bottom right, #f3f9a6 0%, #cbc634 100%)",
  },
  asia: {
    labels: { en: "Asia", zh: "亚洲", fr: "Asie", de: "Asien" },
    swatch: "linear-gradient(to bottom right, #58ac30 0%, #a7df62 100%)",
  },
  americas: {
    labels: { en: "Americas", zh: "美洲", fr: "Amériques", de: "Amerika" },
    swatch: "linear-gradient(to bottom right, #37cfdc 0%, #5a88e5 100%)",
  },
  middleeast: {
    labels: { en: "Middle East", zh: "中东", fr: "Moyen-Orient", de: "Nahost" },
    swatch: "linear-gradient(to bottom right, #ff616d 0%, #ffc171 100%)",
  },
  reset: {
    labels: { en: "Reset Layout", zh: "重置布局", fr: "Réinitialiser", de: "Layout zurücksetzen" },
    swatch: "linear-gradient(to bottom right, #7f8e98 0%, #aab5bd 100%)",
  },
};

const ELEMENTS = {
  De: { symbol: "De", tone: "europe", names: { en: "Germany", zh: "德国", fr: "Allemagne", de: "Deutschland" }, descriptions: { en: "Germany", zh: "德国", fr: "Allemagne", de: "Deutschland" } },
  Ch: { symbol: "Ch", tone: "europe", names: { en: "Switz.", zh: "瑞士", fr: "Suisse", de: "Schweiz" }, descriptions: { en: "Switzerland", zh: "瑞士", fr: "Suisse", de: "Schweiz" } },
  Es: { symbol: "Es", tone: "europe", names: { en: "Spain", zh: "西班牙", fr: "Espagne", de: "Spanien" }, descriptions: { en: "Spain", zh: "西班牙", fr: "Espagne", de: "Spanien" } },
  It: { symbol: "It", tone: "europe", names: { en: "Italy", zh: "意大利", fr: "Italie", de: "Italien" }, descriptions: { en: "Italy", zh: "意大利", fr: "Italie", de: "Italien" } },
  Si: { symbol: "Si", tone: "europe", names: { en: "Slovenia", zh: "斯洛文尼亚", fr: "Slovénie", de: "Slowenien" }, descriptions: { en: "Slovenia", zh: "斯洛文尼亚", fr: "Slovénie", de: "Slowenien" } },
  Hr: { symbol: "Hr", tone: "europe", names: { en: "Croatia", zh: "克罗地亚", fr: "Croatie", de: "Kroatien" }, descriptions: { en: "Croatia", zh: "克罗地亚", fr: "Croatie", de: "Kroatien" } },
  Ba: { symbol: "Ba", tone: "europe", names: { en: "Bosnia", zh: "波黑", fr: "Bosnie", de: "Bosnien" }, descriptions: { en: "Bosnia and Herzegovina", zh: "波黑", fr: "Bosnie-Herzégovine", de: "Bosnien und Herzegowina" } },
  Rs: { symbol: "Rs", tone: "europe", names: { en: "Serbia", zh: "塞尔维亚", fr: "Serbie", de: "Serbien" }, descriptions: { en: "Serbia", zh: "塞尔维亚", fr: "Serbie", de: "Serbien" } },
  En: { symbol: "En", tone: "europe", names: { en: "England", zh: "英格兰", fr: "Angleterre", de: "England" }, descriptions: { en: "England", zh: "英格兰", fr: "Angleterre", de: "England" } },
  Sc: { symbol: "Sc", tone: "europe", names: { en: "Scotland", zh: "苏格兰", fr: "Écosse", de: "Schottland" }, descriptions: { en: "Scotland", zh: "苏格兰", fr: "Écosse", de: "Schottland" } },
  Wa: { symbol: "Wa", tone: "europe", names: { en: "Wales", zh: "威尔士", fr: "Pays de Galles", de: "Wales" }, descriptions: { en: "Wales", zh: "威尔士", fr: "Pays de Galles", de: "Wales" } },
  Ie: { symbol: "Ie", tone: "europe", names: { en: "Ireland", zh: "爱尔兰", fr: "Irlande", de: "Irland" }, descriptions: { en: "Ireland", zh: "爱尔兰", fr: "Irlande", de: "Irland" } },
  Gi: { symbol: "Gi", tone: "europe", names: { en: "Gibraltar", zh: "直布罗陀", fr: "Gibraltar", de: "Gibraltar" }, descriptions: { en: "Gibraltar", zh: "直布罗陀", fr: "Gibraltar", de: "Gibraltar" } },
  Gr: { symbol: "Gr", tone: "europe", names: { en: "Greece", zh: "希腊", fr: "Grèce", de: "Griechenland" }, descriptions: { en: "Greece", zh: "希腊", fr: "Grèce", de: "Griechenland" } },
  Fr: { symbol: "Fr", tone: "europe", names: { en: "France", zh: "法国", fr: "France", de: "Frankreich" }, descriptions: { en: "France", zh: "法国", fr: "France", de: "Frankreich" } },
  Is: { symbol: "Is", tone: "europe", names: { en: "Iceland", zh: "冰岛", fr: "Islande", de: "Island" }, descriptions: { en: "Iceland", zh: "冰岛", fr: "Islande", de: "Island" } },
  No: { symbol: "No", tone: "europe", names: { en: "Norway", zh: "挪威", fr: "Norvège", de: "Norwegen" }, descriptions: { en: "Norway", zh: "挪威", fr: "Norvège", de: "Norwegen" } },
  Se: { symbol: "Se", tone: "europe", names: { en: "Sweden", zh: "瑞典", fr: "Suède", de: "Schweden" }, descriptions: { en: "Sweden", zh: "瑞典", fr: "Suède", de: "Schweden" } },
  Fi: { symbol: "Fi", tone: "europe", names: { en: "Finland", zh: "芬兰", fr: "Finlande", de: "Finnland" }, descriptions: { en: "Finland", zh: "芬兰", fr: "Finlande", de: "Finnland" } },
  Dk: { symbol: "Dk", tone: "europe", names: { en: "Denmark", zh: "丹麦", fr: "Danemark", de: "Dänemark" }, descriptions: { en: "Denmark", zh: "丹麦", fr: "Danemark", de: "Dänemark" } },
  Nl: { symbol: "Nl", tone: "europe", names: { en: "Netherl.", zh: "荷兰", fr: "Pays-Bas", de: "Niederl." }, descriptions: { en: "Netherlands", zh: "荷兰", fr: "Pays-Bas", de: "Niederlande" } },
  Pl: { symbol: "Pl", tone: "europe", names: { en: "Poland", zh: "波兰", fr: "Pologne", de: "Polen" }, descriptions: { en: "Poland", zh: "波兰", fr: "Pologne", de: "Polen" } },
  Ee: { symbol: "Ee", tone: "europe", names: { en: "Estonia", zh: "爱沙尼亚", fr: "Estonie", de: "Estland" }, descriptions: { en: "Estonia", zh: "爱沙尼亚", fr: "Estonie", de: "Estland" } },
  Li: { symbol: "Li", tone: "europe", names: { en: "Liecht.", zh: "列支敦士登", fr: "Liecht.", de: "Liechten." }, descriptions: { en: "Liechtenstein", zh: "列支敦士登", fr: "Liechtenstein", de: "Liechtenstein" } },
  Ru: { symbol: "Ru", tone: "europe", names: { en: "Russia", zh: "俄罗斯", fr: "Russie", de: "Russland" }, descriptions: { en: "Russia", zh: "俄罗斯", fr: "Russie", de: "Russland" } },
  At: { symbol: "At", tone: "europe", names: { en: "Austria", zh: "奥地利", fr: "Autriche", de: "Österreich" }, descriptions: { en: "Austria", zh: "奥地利", fr: "Autriche", de: "Österreich" } },
  Cz: { symbol: "Cz", tone: "europe", names: { en: "Czechia", zh: "捷克", fr: "Tchéquie", de: "Tschechien" }, descriptions: { en: "Czech Republic", zh: "捷克", fr: "République tchèque", de: "Tschechien" } },
  Hu: { symbol: "Hu", tone: "europe", names: { en: "Hungary", zh: "匈牙利", fr: "Hongrie", de: "Ungarn" }, descriptions: { en: "Hungary", zh: "匈牙利", fr: "Hongrie", de: "Ungarn" } },
  Be: { symbol: "Be", tone: "europe", names: { en: "Belgium", zh: "比利时", fr: "Belgique", de: "Belgien" }, descriptions: { en: "Belgium", zh: "比利时", fr: "Belgique", de: "Belgien" } },
  Lu: { symbol: "Lu", tone: "europe", names: { en: "Luxemb.", zh: "卢森堡", fr: "Luxemb.", de: "Luxemb." }, descriptions: { en: "Luxembourg", zh: "卢森堡", fr: "Luxembourg", de: "Luxemburg" } },
  Jp: { symbol: "Jp", tone: "asia", names: { en: "Japan", zh: "日本", fr: "Japon", de: "Japan" }, descriptions: { en: "Japan", zh: "日本", fr: "Japon", de: "Japan" } },
  Cn: { symbol: "Cn", tone: "asia", names: { en: "China", zh: "中国大陆", fr: "Chine", de: "China" }, descriptions: { en: "China", zh: "中国", fr: "Chine", de: "China" } },
  Hk: { symbol: "Hk", tone: "asia", names: { en: "HK-SAR CN", zh: "中国香港", fr: "HK-RAS CN", de: "HK-SAR CN" }, descriptions: { en: "Hong Kong (China)", zh: "中国香港", fr: "Hong Kong (Chine)", de: "Hongkong (China)" } },
  Tw: { symbol: "Tw", tone: "asia", names: { en: "Taiwan CN", zh: "中国台湾", fr: "Taïwan CN", de: "Taiwan CN" }, descriptions: { en: "Taiwan (China)", zh: "中国台湾", fr: "Taïwan (Chine)", de: "Taiwan (China)" } },
  Th: { symbol: "Th", tone: "asia", names: { en: "Thailand", zh: "泰国", fr: "Thaïlande", de: "Thailand" }, descriptions: { en: "Thailand", zh: "泰国", fr: "Thaïlande", de: "Thailand" } },
  Ca: { symbol: "Ca", tone: "americas", names: { en: "Canada", zh: "加拿大", fr: "Canada", de: "Kanada" }, descriptions: { en: "Canada", zh: "加拿大", fr: "Canada", de: "Kanada" } },
  Us: { symbol: "Us", tone: "americas", names: { en: "USA", zh: "美国", fr: "USA", de: "USA" }, descriptions: { en: "United States", zh: "美国", fr: "États-Unis", de: "Vereinigte Staaten" } },
  Ae: { symbol: "Ae", tone: "middleeast", names: { en: "UAE", zh: "阿联酋", fr: "EAU", de: "VAE" }, descriptions: { en: "United Arab Emirates", zh: "阿联酋", fr: "Émirats arabes unis", de: "Vereinigte Arabische Emirate" } },
  Sa: { symbol: "Sa", tone: "middleeast", names: { en: "Saudi", zh: "沙特", fr: "Arabie saoud.", de: "Saudi-Arab." }, descriptions: { en: "Saudi Arabia", zh: "沙特阿拉伯", fr: "Arabie saoudite", de: "Saudi-Arabien" } },
  Tr: { symbol: "Tr", tone: "middleeast", names: { en: "Turkey", zh: "土耳其", fr: "Turquie", de: "Türkei" }, descriptions: { en: "Turkey", zh: "土耳其", fr: "Turquie", de: "Türkei" } },
};

const FAMOUS_FACTS = {
  Us: { en: "Global superpower with Silicon Valley swagger, Wall Street energy, and legendary national parks", zh: "硅谷的锋芒、华尔街的节奏，再加上国家公园级别的辽阔" },
  Ca: { en: "A country of wilderness, waterfalls, and that easygoing multicultural warmth", zh: "荒野、瀑布和一种很舒服的多元感混在一起" },
  Hk: { en: "Skyline drama, harbour lights, finance tempo, and dim sum at full speed", zh: "维港天际线、金融节奏和点心文化，全都很有冲击力" },
  Cn: { en: "Civilisation at full scale, from ancient walls to unforgettable food cultures", zh: "从古老文明到地方风味，尺度和层次都很惊人" },
  Is: { en: "A land where volcanoes, glaciers, and waterfalls keep stealing the scene", zh: "火山、冰川、瀑布轮番上场，像一部自然大片" },
  No: { en: "Fjords, northern light, and coastlines that look unreal even in photos", zh: "峡湾、极光和海岸线，美得像把滤镜开满" },
  Dk: { en: "Clean design, bikes everywhere, and Copenhagen in perfect balance", zh: "设计感、骑行感和哥本哈根的松弛感特别统一" },
  Se: { en: "Scandinavian cool with islands, design, and a very polished urban feel", zh: "群岛、设计和一种很克制的北欧高级感" },
  De: { en: "Engineering confidence, beer halls, old towns, and serious substance", zh: "工程实力、老城气质和一种很扎实的秩序感" },
  Pl: { en: "Historic depth, resilient spirit, and cities that feel more alive than expected", zh: "历史层次很深，城市又比想象中更有活力" },
  Fi: { en: "Lakes, saunas, quiet beauty, and a northern calm that stays with you", zh: "千湖、桑拿和一种安静到会留下来的北方气质" },
  Ru: { en: "Immense scale, literary gravity, and cultural capitals built for grandeur", zh: "辽阔、厚重、还有一种写在文学里的大国气场" },
  Jp: { en: "Precision, ritual, anime, ramen, shrines, and cities that never lose focus", zh: "精致、秩序、动漫、美食和城市里那种专注感" },
  Tw: { en: "Night markets, mountain air, and a dense blend of food and cultural memory", zh: "夜市、美食、山海之间，还有很浓的文化延续感" },
  Ie: { en: "Green landscapes, pub music, and warmth that feels immediate", zh: "绿色原野、酒吧音乐和一见面就能感受到的热情" },
  Sc: { en: "Whisky, castles, and highlands that look born for legends", zh: "威士忌、城堡和高地风光，天生就很传奇" },
  Nl: { en: "Canals, bikes, tulips, and cities shaped by water and precision", zh: "运河、自行车、郁金香，一切都被水和秩序塑过形" },
  Be: { en: "Chocolate, beer, waffles, and squares that feel made for lingering", zh: "巧克力、啤酒、华夫饼，还有让人想停下来的广场" },
  Ch: { en: "Alpine precision with trains, watches, chocolate, and unreal scenery", zh: "阿尔卑斯的精确美学，钟表、列车和风景都很能打" },
  At: { en: "Imperial elegance, alpine calm, and classical music in the background", zh: "帝国气质、阿尔卑斯风光，耳边仿佛一直有古典乐" },
  Rs: { en: "Balkan energy, river-city rhythm, and nightlife with real force", zh: "巴尔干的劲儿、河城节奏和很能打的夜生活" },
  Ee: { en: "Medieval Tallinn with a quietly futuristic digital identity", zh: "中世纪塔林外表之下，是很前卫的数字国家气质" },
  Tr: { en: "A true bridge between continents, with domes, bazaars, and skyline drama", zh: "真正横跨欧亚的地方，清真寺穹顶和市集气息很抓人" },
  Th: { en: "Tropical ease, street food heat, temple gold, and a holiday mood", zh: "热带感、街头香气、金色寺庙，一到就很有度假氛围" },
  Wa: { en: "Wild coastlines, Celtic echoes, and castles that own the landscape", zh: "海岸线很野，凯尔特气息很强，城堡也特别压得住场" },
  En: { en: "London, theatre, football, royalty, and a deep habit of influence", zh: "伦敦、戏剧、足球、王室，还有一种长期影响世界的惯性" },
  Fr: { en: "Paris glow, art, fashion, wine, and a cuisine that never stays modest", zh: "巴黎的光、艺术、时尚和葡萄酒，总带着一种不藏锋芒的自信" },
  Lu: { en: "Tiny in scale, polished in feel, and quietly powerful in finance", zh: "体量很小，质感很精，金融存在感却一点不弱" },
  Cz: { en: "Prague romance, beer confidence, and Central Europe at its most photogenic", zh: "布拉格很浪漫，啤酒很有底气，中欧气质也特别上镜" },
  Hr: { en: "Adriatic blues, stone towns, island routes, and pure summer energy", zh: "亚得里亚海的蓝、石头古城和跳岛感，特别适合夏天" },
  Hu: { en: "Budapest lights, thermal baths, and food with serious comfort", zh: "布达佩斯夜景、温泉浴场，还有很能安慰人的中欧美食" },
  Ba: { en: "Mountain drama, Ottoman traces, and bridges that carry memory", zh: "山地感很强，奥斯曼痕迹很深，连桥都有故事" },
  Ae: { en: "Desert luxury, aviation power, and skylines built to impress", zh: "沙漠里的奢华、航空枢纽的效率和刻意做大的天际线" },
  Sa: { en: "Arabian scale, desert horizons, and the gravity of holy cities", zh: "阿拉伯腹地的尺度、沙漠地平线，还有圣城带来的重量感" },
  Gi: { en: "A giant rock, military history, and sea views with strategic drama", zh: "一块巨岩、一段军事历史，加上很有戏剧性的海景" },
  Li: { en: "A tiny principality with alpine polish and discreet wealth", zh: "袖珍、公国、阿尔卑斯和一种很安静的富裕感" },
  Si: { en: "Lake Bled calm, caves below, and a green meeting point of regions", zh: "布莱德湖很静，地下溶洞很深，整片国土都很绿" },
  It: { en: "Rome, pasta, ruins, fashion, and beauty with almost unfair density", zh: "罗马、意面、废墟、时尚，好东西密度高得有点不讲理" },
  Gr: { en: "Ancient stories, island sunsets, and that iconic Aegean blue-white contrast", zh: "古文明、海岛日落，还有爱琴海标志性的蓝白配色" },
};

const PAGE_COPY = {
  en: {
    title: "The World is Round, I Wanna Wander Around",
    subtitle: "A personal travel periodic table",
  },
  zh: {
    title: "世界这么大，我想去看看",
    subtitle: "我的旅行足迹元素表",
  },
  fr: {
    title: "Le monde est rond, je m'en vais à l'abandon",
    subtitle: "Mon tableau périodique des voyages",
  },
  de: {
    title: "Die Welt ist rund, ich streife umher als Vagabund",
    subtitle: "Mein Reise-Periodensystem",
  },
};

const countryCodeMap = {
  Us: "us",
  Ca: "ca",
  Hk: "hk",
  Cn: "cn",
  Is: "is",
  No: "no",
  Dk: "dk",
  Se: "se",
  De: "de",
  Pl: "pl",
  Fi: "fi",
  Ru: "ru",
  Jp: "jp",
  Tw: "cn",
  Ie: "ie",
  Sc: "gb-sct",
  Nl: "nl",
  Be: "be",
  Ch: "ch",
  At: "at",
  Rs: "rs",
  Ee: "ee",
  Tr: "tr",
  Th: "th",
  Wa: "gb-wls",
  En: "gb-eng",
  Fr: "fr",
  Lu: "lu",
  Cz: "cz",
  Hr: "hr",
  Hu: "hu",
  Ba: "ba",
  Ae: "ae",
  Sa: "sa",
  Gi: "gi",
  Es: "es",
  Li: "li",
  Si: "si",
  It: "it",
  Gr: "gr",
};

const INITIAL_DESKTOP_MATRIX = [
  ["Us", "Ca", null, null, null, null, null, null, "Hk", "Cn"],
  ["Is", "No", "Dk", "Se", "De", "Pl", "Fi", "Ru", "Jp", "Tw"],
  ["Ie", "Sc", "Nl", "Be", "Ch", "At", "Rs", "Ee", "Tr", "Th"],
  ["Wa", "En", "Fr", "Lu", "Cz", "Hr", "Hu", "Ba", "Ae", "Sa"],
  [null, null, "Gi", "Es", "Li", "Si", "It", "Gr", null, null],
];

let desktopMatrix = INITIAL_DESKTOP_MATRIX.map((row) => [...row]);
let activeToneFilter = null;
let draggedSymbol = null;
let draggedFrom = null;
let pulseSymbols = new Set();
let activeHoverSymbol = null;
let autoPopEnabled = true;
let autoPopTimer = null;
let autoPopResumeTimer = null;
let pulseClearTimer = null;
let currentLanguage = "en";

const desktopGrid = document.getElementById("desktop-grid");
const mobileGrid = document.getElementById("mobile-grid");
const legend = document.getElementById("legend");
const hoverPanel = document.getElementById("hover-panel");
const languageSelect = document.getElementById("language-select");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");

desktopGrid.addEventListener("mouseleave", () => {
  clearHoverState();
});

["mousemove", "pointerdown", "keydown", "touchstart"].forEach((eventName) => {
  document.addEventListener(eventName, handleUserActivity, { passive: true });
});

languageSelect.addEventListener("change", (event) => {
  currentLanguage = event.target.value;
  renderAll();
  if (activeHoverSymbol) {
    const nextCard = desktopGrid.querySelector(`.periodic-card[data-symbol="${activeHoverSymbol}"]`);
    if (nextCard) {
      updateHoverPanel(nextCard, activeHoverSymbol);
    }
  }
});

function createCard(item, options = {}) {
  const { symbol = item.symbol, draggable = false, interactiveHover = false } = options;
  const tagName = item.url ? "a" : "article";
  const card = document.createElement(tagName);
  card.className = "periodic-card";
  card.dataset.tone = item.tone;
  card.dataset.symbol = symbol;

  if (item.url) {
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noreferrer";
  }

  card.innerHTML = `
    <div class="periodic-card__inner">
      <div>
        <div class="periodic-card__symbol">${item.symbol}</div>
        <div class="periodic-card__name">${getLocalizedName(item)}</div>
      </div>
      <div class="periodic-card__meta">${item.description}</div>
    </div>
  `;

  if (item.url) {
    card.classList.add("periodic-card--link");
  }

  const nameNode = card.querySelector(".periodic-card__name");
  if (nameNode) {
    const localizedName = getLocalizedName(item);
    const nameLength = localizedName.length;
    if (nameLength >= 10) {
      nameNode.classList.add("periodic-card__name--long");
    } else if (nameLength >= 8) {
      nameNode.classList.add("periodic-card__name--medium");
    }
  }

  if (draggable) {
    card.draggable = true;
    card.classList.add("periodic-card--draggable");
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);
  }

  if (interactiveHover) {
    card.addEventListener("mouseenter", (event) => handleCardHoverEnter(event, symbol));
    card.addEventListener("mouseleave", handleCardHoverLeave);
  }

  if (pulseSymbols.has(symbol)) {
    card.classList.add("is-popping");
  }

  if (activeToneFilter && item.tone !== activeToneFilter) {
    card.classList.add("is-muted");
  }

  if (activeHoverSymbol && activeHoverSymbol !== symbol) {
    card.classList.add("is-dimmed");
  }

  return card;
}

function createSpacer(isMuted = false) {
  const spacer = document.createElement("div");
  spacer.className = "periodic-spacer";
  if (activeToneFilter || isMuted) {
    spacer.classList.add("is-muted");
  }
  spacer.setAttribute("aria-hidden", "true");
  return spacer;
}

function createSlot(rowIndex, columnIndex, symbol) {
  const slot = document.createElement("div");
  slot.className = "periodic-slot";
  slot.dataset.row = String(rowIndex);
  slot.dataset.col = String(columnIndex);

  slot.addEventListener("dragover", handleDragOver);
  slot.addEventListener("dragenter", handleDragEnter);
  slot.addEventListener("dragleave", handleDragLeave);
  slot.addEventListener("drop", handleDrop);

  if (!symbol) {
    slot.appendChild(createSpacer());
    return slot;
  }

  const item = ELEMENTS[symbol];
  if (!item) {
    slot.appendChild(createSpacer(true));
    return slot;
  }

  slot.appendChild(createCard(item, { symbol, draggable: true, interactiveHover: true }));
  return slot;
}

function clearContainer(node) {
  node.innerHTML = "";
}

function getGridDimensions() {
  return {
    rows: desktopMatrix.length,
    columns: Math.max(...desktopMatrix.map((row) => row.length)),
  };
}

function renderDesktop() {
  const { rows, columns } = getGridDimensions();
  clearContainer(desktopGrid);

  desktopGrid.style.gridTemplateColumns = `repeat(${columns}, var(--desktop-cell))`;
  desktopGrid.style.gridTemplateRows = `repeat(${rows}, var(--desktop-cell))`;

  desktopMatrix.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      desktopGrid.appendChild(createSlot(rowIndex, columnIndex, symbol));
    });
  });
}

function renderMobile() {
  clearContainer(mobileGrid);
  desktopMatrix.flat()
    .filter(Boolean)
    .forEach((symbol) => {
      const item = ELEMENTS[symbol];
      if (item) {
        mobileGrid.appendChild(createCard(item, { symbol, draggable: false }));
      }
    });
}

function renderLegend() {
  clearContainer(legend);

  Object.entries(COLOR_TONES).forEach(([toneKey, tone]) => {
    const item = document.createElement("div");
    item.className = "legend__item";
    item.dataset.tone = toneKey;
    item.role = "button";
    item.tabIndex = 0;
    if (activeToneFilter === toneKey) {
      item.classList.add("is-active");
    }
    item.innerHTML = `
      <span class="legend__swatch" style="background:${tone.swatch};"></span>
      <span class="legend__label">${tone.labels[currentLanguage] || tone.labels.en}</span>
    `;
    item.addEventListener("click", () => {
      if (toneKey === "reset") {
        resetLayout();
        return;
      }
      toggleToneFilter(toneKey);
    });
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (toneKey === "reset") {
          resetLayout();
          return;
        }
        toggleToneFilter(toneKey);
      }
    });
    legend.appendChild(item);
  });

  const directions = document.createElement("div");
  directions.className = "legend__directions";
  directions.innerHTML = `
    <span class="legend__direction">${getDirectionLabel("horizontal")}</span>
    <span class="legend__direction">${getDirectionLabel("vertical")}</span>
  `;
  legend.appendChild(directions);
}

function toggleToneFilter(toneKey) {
  pauseAutoPop();
  scheduleAutoPopResume();
  activeToneFilter = activeToneFilter === toneKey ? null : toneKey;
  renderAll();
}

function resetLayout() {
  pauseAutoPop();
  scheduleAutoPopResume();
  desktopMatrix = INITIAL_DESKTOP_MATRIX.map((row) => [...row]);
  activeToneFilter = null;
  activeHoverSymbol = null;
  hoverPanel.classList.remove("is-visible");
  pulseSymbols = new Set();
  renderAll();
}

function renderAll() {
  renderPageCopy();
  renderDesktop();
  renderMobile();
  renderLegend();
}

function handleDragStart(event) {
  const card = event.currentTarget;
  clearHoverState({ skipResume: true, skipRender: true });
  draggedSymbol = card.dataset.symbol;
  draggedFrom = findSymbolPosition(draggedSymbol);
  card.classList.add("is-dragging");
  document.body.classList.add("is-sorting");
  pauseAutoPop();
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedSymbol);
}

function handleDragEnd(event) {
  event.currentTarget.classList.remove("is-dragging");
  document.body.classList.remove("is-sorting");
  clearDropTargets();
  draggedSymbol = null;
  draggedFrom = null;
  scheduleAutoPopResume();
}

function handleDragOver(event) {
  if (!draggedSymbol) {
    return;
  }
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
}

function handleDragEnter(event) {
  if (!draggedSymbol) {
    return;
  }
  const slot = event.currentTarget;
  slot.classList.add("is-drop-target");
}

function handleDragLeave(event) {
  const slot = event.currentTarget;
  if (!slot.contains(event.relatedTarget)) {
    slot.classList.remove("is-drop-target");
  }
}

function handleDrop(event) {
  event.preventDefault();
  const slot = event.currentTarget;
  clearDropTargets();

  if (!draggedSymbol || !draggedFrom) {
    return;
  }

  const toRow = Number(slot.dataset.row);
  const toCol = Number(slot.dataset.col);

  if (draggedFrom.row === toRow && draggedFrom.col === toCol) {
    return;
  }

  const targetSymbol = desktopMatrix[toRow][toCol];
  desktopMatrix[draggedFrom.row][draggedFrom.col] = targetSymbol || null;
  desktopMatrix[toRow][toCol] = draggedSymbol;

  pulseSymbols = new Set([draggedSymbol]);
  if (targetSymbol) {
    pulseSymbols.add(targetSymbol);
  }

  renderAll();
}

function handleCardHoverEnter(event, symbol) {
  activeHoverSymbol = symbol;
  pauseAutoPop();
  applyHoverState();
  updateHoverPanel(event.currentTarget, symbol);
}

function handleCardHoverLeave() {
  clearHoverState();
}

function updateHoverPanel(card, symbol) {
  const item = ELEMENTS[symbol];
  if (!item) {
    hoverPanel.classList.remove("is-visible");
    return;
  }

  hoverPanel.innerHTML = `
    <div class="hover-panel-content">
      <img class="hover-panel-flag${symbol === "Ch" ? " hover-panel-flag--swiss" : ""}" src="${getCountryFlagUrl(symbol)}" alt="${item.symbol} flag" />
      <span class="hover-panel-text">${getLocalizedFullName(item)}：${getLocalizedDescription(item)}</span>
    </div>
  `;
  hoverPanel.classList.add("is-visible");
}

function clearHoverState(options = {}) {
  const { skipResume = false, skipRender = false } = options;
  if (!activeHoverSymbol) {
    hoverPanel.classList.remove("is-visible");
    if (!skipResume) {
      scheduleAutoPopResume();
    }
    return;
  }

  activeHoverSymbol = null;
  hoverPanel.classList.remove("is-visible");
  if (!skipRender) {
    applyHoverState();
  }
  if (!skipResume) {
    scheduleAutoPopResume();
  }
}

function handleUserActivity() {
  if (activeHoverSymbol || draggedSymbol) {
    return;
  }
  pauseAutoPop();
  scheduleAutoPopResume();
}

function applyHoverState() {
  const cards = desktopGrid.querySelectorAll(".periodic-card");
  const spacers = desktopGrid.querySelectorAll(".periodic-spacer");

  cards.forEach((card) => {
    const shouldDim = Boolean(activeHoverSymbol) && card.dataset.symbol !== activeHoverSymbol;
    card.classList.toggle("is-dimmed", shouldDim);
  });

  spacers.forEach((spacer) => {
    spacer.classList.toggle("is-muted", Boolean(activeHoverSymbol));
  });
}

function pauseAutoPop() {
  autoPopEnabled = false;
  if (autoPopTimer) {
    window.clearInterval(autoPopTimer);
    autoPopTimer = null;
  }
  if (autoPopResumeTimer) {
    window.clearTimeout(autoPopResumeTimer);
    autoPopResumeTimer = null;
  }
  if (pulseClearTimer) {
    window.clearTimeout(pulseClearTimer);
    pulseClearTimer = null;
  }
  pulseSymbols.clear();
}

function scheduleAutoPopResume() {
  if (draggedSymbol || activeHoverSymbol) {
    return;
  }
  if (autoPopResumeTimer) {
    window.clearTimeout(autoPopResumeTimer);
  }
  autoPopResumeTimer = window.setTimeout(() => {
    startAutoPop();
  }, 10000);
}

function startAutoPop() {
  if (autoPopTimer) {
    window.clearInterval(autoPopTimer);
  }
  autoPopEnabled = true;
  autoPopTimer = window.setInterval(() => {
    if (!autoPopEnabled || activeHoverSymbol || draggedSymbol) {
      return;
    }
    const symbols = desktopMatrix.flat().filter(Boolean);
    if (!symbols.length) {
      return;
    }
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    pulseSymbols = new Set([randomSymbol]);
    renderDesktop();
    const activeCard = desktopGrid.querySelector(`.periodic-card[data-symbol="${randomSymbol}"]`);
    if (activeCard) {
      updateHoverPanel(activeCard, randomSymbol);
    }
    if (pulseClearTimer) {
      window.clearTimeout(pulseClearTimer);
    }
    pulseClearTimer = window.setTimeout(() => {
      const currentCard = desktopGrid.querySelector(`.periodic-card[data-symbol="${randomSymbol}"]`);
      if (currentCard) {
        currentCard.classList.remove("is-popping");
      }
      if (!activeHoverSymbol) {
        hoverPanel.classList.remove("is-visible");
      }
      pulseSymbols.clear();
      pulseClearTimer = null;
    }, 900);
  }, 2000);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getLocalizedName(item) {
  return item.names[currentLanguage] || item.names.en;
}

function getLocalizedDescription(item) {
  const fact = FAMOUS_FACTS[item.symbol];
  if (fact) {
    return stripTrailingPunctuation(fact[currentLanguage] || fact.en);
  }
  return stripTrailingPunctuation(item.descriptions[currentLanguage] || item.descriptions.en);
}

function getLocalizedFullName(item) {
  return item.descriptions[currentLanguage] || item.descriptions.en;
}

function getDirectionLabel(direction) {
  const labels = {
    horizontal: {
      en: "→  Horizontal: West to East",
      zh: "→  横向：自西向东",
      fr: "→  Horizontal : d'ouest en est",
      de: "→  Horizontal: von West nach Ost",
    },
    vertical: {
      en: "↓  Vertical: North to South",
      zh: "↓  纵向：由北向南",
      fr: "↓  Vertical : du nord au sud",
      de: "↓  Vertikal: von Nord nach Süd",
    },
  };
  return labels[direction][currentLanguage] || labels[direction].en;
}

function stripTrailingPunctuation(text) {
  return text.replace(/[。．.!！?？]+$/u, "");
}

function renderPageCopy() {
  const copy = PAGE_COPY[currentLanguage] || PAGE_COPY.en;
  pageTitle.textContent = copy.title;
  pageSubtitle.textContent = copy.subtitle;
  document.body.dataset.language = currentLanguage;
}

function getCountryFlagUrl(symbol) {
  const code = countryCodeMap[symbol] || "xx";
  return `https://flagpedia.net/data/flags/w80/${code}.webp`;
}

function clearDropTargets() {
  desktopGrid.querySelectorAll(".is-drop-target").forEach((slot) => {
    slot.classList.remove("is-drop-target");
  });
}

function findSymbolPosition(symbol) {
  for (let row = 0; row < desktopMatrix.length; row += 1) {
    for (let col = 0; col < desktopMatrix[row].length; col += 1) {
      if (desktopMatrix[row][col] === symbol) {
        return { row, col };
      }
    }
  }
  return null;
}

renderAll();
startAutoPop();
