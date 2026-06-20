(function () {
  const HERO_VIDEO_DURATION_MS = 5000;

  const slides = [
    {
      src: 'video/hero_video/hero_video.mp4',
      titleKey: 'renewable',
      mobilePosition: '66.666% center',
    },
    {
      src: 'video/hero_video/hero_video_2.mp4',
      titleKey: 'system',
      mobilePosition: '75% center',
    },
    {
      src: 'video/hero_video/hero_video_3.mp4',
      titleKey: 'policy',
      mobilePosition: '50% center',
    },
  ];

  const labels = {
    cn: {
      renewable: ['能源研究员', '新能源 • 新材料 • 碳中和'],
      system: ['系统工程师', '燃料电池 • 动力系统 • 运行策略'],
      policy: ['政策分析师', '能源转型 • 气候战略 • 关键矿物'],
    },
    zh: {
      renewable: ['能源研究员', '新能源 • 新材料 • 碳中和'],
      system: ['系统工程师', '燃料电池 • 动力系统 • 运行策略'],
      policy: ['政策分析师', '能源转型 • 气候战略 • 关键矿物'],
    },
    en: {
      renewable: ['Energy Researcher', 'Renewable Energy • New Materials • Carbon Neutrality'],
      system: ['Systems Engineer', 'Fuel Cells • Power Systems • Operating Strategies'],
      policy: ['Policy Analyst', 'Energy Transition • Climate Strategy • Critical Minerals'],
    },
    de: {
      renewable: ['Energiewendeforscher', 'Neue Energie • Neue Materialien • Klimaneutralität'],
      system: ['Systemingenieur', 'Brennstoffzellen • Antriebssysteme • Betriebsstrategien'],
      policy: ['Politikanalyst', 'Energiewende • Klimastrategie • Kritische Rohstoffe'],
    },
    fr: {
      renewable: ['Chercheur en énergies', 'Nouvelles énergies • Nouveaux matériaux • Neutralité carbone'],
      system: ['Ingénieur systèmes', 'Piles à combustible • Systèmes de puissance • Stratégies opérationnelles'],
      policy: ['Analyste des politiques', 'Transition énergétique • Stratégie climatique • Minéraux critiques'],
    },
    it: {
      renewable: ['Ricercatore energie', 'Nuove energie • Nuovi materiali • Neutralità carbonica'],
      system: ['Ingegnere di sistemi', 'Celle a combustibile • Sistemi di potenza • Strategie operative'],
      policy: ['Analista politico', 'Transizione energetica • Strategia climatica • Minerali critici'],
    },
    es: {
      renewable: ['Investigador de energías', 'Nuevas energías • Nuevos materiales • Neutralidad de carbono'],
      system: ['Ingeniero de sistemas', 'Pilas de combustible • Sistemas de potencia • Estrategias operativas'],
      policy: ['Analista de políticas', 'Transición energética • Estrategia climática • Minerales críticos'],
    },
    ru: {
      renewable: ['Исследователь новой энергетики', 'Новая энергетика • Новые материалы • Углеродная нейтральность'],
      system: ['Системный инженер', 'Топливные элементы • Энергосистемы • Операционные стратегии'],
      policy: ['Политический аналитик', 'Энергетический переход • Климатическая стратегия • Критические минералы'],
    },
    jp: {
      renewable: ['エネルギー研究者', '新エネルギー • 新材料 • カーボンニュートラル'],
      system: ['システムエンジニア', '燃料電池 • パワーシステム • 運用戦略'],
      policy: ['政策アナリスト', 'エネルギー転換 • 気候戦略 • 重要鉱物'],
    },
    kr: {
      renewable: ['신에너지 연구자', '신에너지 • 신소재 • 탄소중립'],
      system: ['시스템 엔지니어', '연료전지 • 동력 시스템 • 운영 전략'],
      policy: ['정책 분석가', '에너지 전환 • 기후 전략 • 핵심 광물'],
    },
    th: {
      renewable: ['นักวิจัยพลังงานใหม่', 'พลังงานใหม่ • วัสดุใหม่ • ความเป็นกลางทางคาร์บอน'],
      system: ['วิศวกรระบบ', 'เซลล์เชื้อเพลิง • ระบบกำลัง • กลยุทธ์การเดินระบบ'],
      policy: ['นักวิเคราะห์นโยบาย', 'การเปลี่ยนผ่านพลังงาน • กลยุทธ์ภูมิอากาศ • แร่ธาตุสำคัญ'],
    },
    ar: {
      renewable: ['باحث في الطاقة الجديدة', 'الطاقة الجديدة • المواد الجديدة • الحياد الكربوني'],
      system: ['مهندس أنظمة', 'خلايا الوقود • أنظمة القدرة • استراتيجيات التشغيل'],
      policy: ['محلل سياسات', 'تحول الطاقة • استراتيجية المناخ • المعادن الحرجة'],
    },
  };

  const actions = {
    cn: {
      research: '研发成果',
      contact: '联系方式',
      researchHref: 'cn-research.html',
    },
    zh: {
      research: '研发成果',
      contact: '联系方式',
      researchHref: 'cn-research.html',
    },
    en: {
      research: 'View Research',
      contact: 'Contact Me',
      researchHref: 'en-research.html',
    },
    de: {
      research: 'Forschung ansehen',
      contact: 'Kontakt',
      researchHref: 'de-research.html',
    },
    fr: {
      research: 'Voir la recherche',
      contact: 'Contact',
      researchHref: 'fr-research.html',
    },
    it: {
      research: 'Vedi ricerca',
      contact: 'Contatto',
      researchHref: 'it-research.html',
    },
    es: {
      research: 'Ver investigación',
      contact: 'Contacto',
      researchHref: 'es-research.html',
    },
    ru: {
      research: 'Смотреть исследования',
      contact: 'Контакты',
      researchHref: 'ru-research.html',
    },
    jp: {
      research: '研究を見る',
      contact: 'お問い合わせ',
      researchHref: 'jp-research.html',
    },
    kr: {
      research: '연구 보기',
      contact: '연락처',
      researchHref: 'kr-research.html',
    },
    th: {
      research: 'ดูผลงานวิจัย',
      contact: 'ติดต่อ',
      researchHref: 'th-research.html',
    },
    ar: {
      research: 'عرض الأبحاث',
      contact: 'تواصل معي',
      researchHref: 'ar-research.html',
    },
  };

  const statLabels = {
    cn: {
      papers: '篇论文',
      citations: '次引用',
      patents: '项专利',
      reviews: '次审稿',
      students: '位指导学生',
      grants: '项科研资助',
      downloads: '次博士论文下载',
      countries: '个国家旅行',
    },
    zh: {
      papers: '篇论文',
      citations: '次引用',
      patents: '项专利',
      reviews: '次审稿',
      students: '位指导学生',
      grants: '项科研资助',
      downloads: '次博士论文下载',
      countries: '个国家旅行',
    },
    en: {
      papers: 'papers',
      citations: 'citations',
      patents: 'patents',
      reviews: 'peer reviews',
      students: 'students mentored',
      grants: 'research grants',
      downloads: 'PhD thesis downloads',
      countries: 'countries visited',
    },
    de: {
      papers: 'Publikationen',
      citations: 'Zitationen',
      patents: 'Patente',
      reviews: 'Gutachten',
      students: 'betreute Studierende',
      grants: 'Forschungsförderungen',
      downloads: 'Dissertation-Downloads',
      countries: 'bereiste Länder',
    },
    fr: {
      papers: 'publications',
      citations: 'citations',
      patents: 'brevets',
      reviews: 'évaluations',
      students: 'étudiants encadrés',
      grants: 'financements de recherche',
      downloads: 'téléchargements de thèse',
      countries: 'pays visités',
    },
    it: {
      papers: 'pubblicazioni',
      citations: 'citazioni',
      patents: 'brevetti',
      reviews: 'revisioni',
      students: 'studenti seguiti',
      grants: 'finanziamenti di ricerca',
      downloads: 'download tesi di dottorato',
      countries: 'paesi visitati',
    },
    es: {
      papers: 'publicaciones',
      citations: 'citas',
      patents: 'patentes',
      reviews: 'revisiones',
      students: 'estudiantes guiados',
      grants: 'fondos de investigación',
      downloads: 'descargas de tesis doctoral',
      countries: 'países visitados',
    },
    ru: {
      papers: 'публикаций',
      citations: 'цитирований',
      patents: 'патентов',
      reviews: 'рецензий',
      students: 'студентов под руководством',
      grants: 'исследовательских грантов',
      downloads: 'скачиваний диссертации',
      countries: 'посещённых стран',
    },
    jp: {
      papers: '論文',
      citations: '引用',
      patents: '特許',
      reviews: '査読',
      students: '指導学生',
      grants: '研究助成',
      downloads: '博士論文DL',
      countries: '訪問国',
    },
    kr: {
      papers: '논문',
      citations: '인용',
      patents: '특허',
      reviews: '심사',
      students: '지도 학생',
      grants: '연구 지원',
      downloads: '박사논문 다운로드',
      countries: '방문 국가',
    },
    th: {
      papers: 'บทความ',
      citations: 'การอ้างอิง',
      patents: 'สิทธิบัตร',
      reviews: 'การทบทวน',
      students: 'นักศึกษาที่แนะนำ',
      grants: 'ทุนวิจัย',
      downloads: 'ดาวน์โหลดวิทยานิพนธ์',
      countries: 'ประเทศที่เดินทาง',
    },
    ar: {
      papers: 'أوراق بحثية',
      citations: 'استشهادات',
      patents: 'براءات اختراع',
      reviews: 'مراجعات علمية',
      students: 'طلاب مُوجّهون',
      grants: 'منح بحثية',
      downloads: 'تنزيلات الأطروحة',
      countries: 'دول تمت زيارتها',
    },
  };

  const getLanguage = function () {
    const fileName = window.location.pathname.split('/').pop().replace('.html', '');
    return labels[fileName] ? fileName : 'en';
  };

  const updateNavState = function () {
    document.body.classList.toggle('video-nav-solid', window.scrollY > 250);
  };

  const updateCopy = function (copyElement, slide, language) {
    const titleElement = copyElement.querySelector('.video-hero__title');
    const subtitleElement = copyElement.querySelector('.video-hero__subtitle');
    const text = labels[language][slide.titleKey] || labels.en[slide.titleKey];

    copyElement.classList.remove('is-active');
    window.setTimeout(function () {
      titleElement.textContent = text[0];
      subtitleElement.textContent = text[1];
      window.requestAnimationFrame(function () {
        copyElement.classList.add('is-active');
      });
    }, 120);
  };

  const updateActions = function (copyElement, language) {
    const actionText = actions[language] || actions.en;
    const researchLink = copyElement.querySelector('.video-hero__button--primary');
    const contactLink = copyElement.querySelector('.video-hero__button--secondary');

    if (researchLink) {
      researchLink.textContent = actionText.research;
      researchLink.href = actionText.researchHref;
    }

    if (contactLink) {
      contactLink.textContent = actionText.contact;
      contactLink.href = 'mailto:h.xu@tum.de';
    }
  };

  const updateStatLabels = function (language) {
    const labels = statLabels[language] || statLabels.en;
    document.querySelectorAll('.hero-stat').forEach(function (item) {
      const label = item.querySelector('.hero-stat__label');
      const key = item.getAttribute('data-stat-key');
      if (label && labels[key]) label.textContent = labels[key];
    });
  };

  const initVideoHero = function () {
    const video = document.getElementById('hero-video');
    const copy = document.getElementById('hero-video-copy');
    if (!video || !copy || slides.length === 0) return;

    const language = getLanguage();
    let current = 0;
    let slideTimer = null;

    updateActions(copy, language);
    updateStatLabels(language);

    const clearSlideTimer = function () {
      if (!slideTimer) return;
      window.clearTimeout(slideTimer);
      slideTimer = null;
    };

    const advanceSlide = function () {
      clearSlideTimer();
      current = (current + 1) % slides.length;
      playCurrent();
    };

    const playCurrent = function () {
      const slide = slides[current];
      clearSlideTimer();
      video.src = slide.src;
      video.style.setProperty('--mobile-video-position', slide.mobilePosition || '50% center');
      updateCopy(copy, slide, language);
      video.load();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(function () {});
      }
      slideTimer = window.setTimeout(advanceSlide, HERO_VIDEO_DURATION_MS);
    };

    video.addEventListener('ended', advanceSlide);

    video.addEventListener('error', advanceSlide);

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    playCurrent();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoHero);
  } else {
    initVideoHero();
  }
})();
