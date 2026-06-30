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
    let playAttemptId = 0;
    let transitionId = 0;
    let activeVideo = video;
    let standbyVideo = video.cloneNode(false);
    let hasStarted = false;

    standbyVideo.removeAttribute('id');
    standbyVideo.setAttribute('aria-hidden', 'true');
    standbyVideo.classList.remove('is-active');
    video.classList.add('is-active');
    video.parentNode.insertBefore(standbyVideo, video.nextSibling);

    updateActions(copy, language);
    updateStatLabels(language);

    const prepareAutoplay = function (targetVideo) {
      targetVideo.muted = true;
      targetVideo.defaultMuted = true;
      targetVideo.autoplay = true;
      targetVideo.playsInline = true;
      targetVideo.setAttribute('muted', '');
      targetVideo.setAttribute('autoplay', '');
      targetVideo.setAttribute('playsinline', '');
      targetVideo.setAttribute('webkit-playsinline', '');
      targetVideo.setAttribute('preload', 'auto');
      targetVideo.removeAttribute('controls');
    };

    const clearSlideTimer = function () {
      if (!slideTimer) return;
      window.clearTimeout(slideTimer);
      slideTimer = null;
    };

    const requestPlayback = function (targetVideo) {
      const player = targetVideo || activeVideo;
      if (!player || document.hidden) return Promise.resolve();
      prepareAutoplay(player);
      const playPromise = player.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        return playPromise.catch(function () {
          // 移动端省电模式或浏览器策略可能仍会拦截自动播放。
          // 后续 canplay / visibilitychange / 首次触摸会再次尝试。
        });
      }
      return Promise.resolve();
    };

    const retryPlayback = function () {
      const attemptId = ++playAttemptId;
      requestPlayback();
      [120, 420, 900].forEach(function (delay) {
        window.setTimeout(function () {
          if (attemptId === playAttemptId && activeVideo.paused) requestPlayback(activeVideo);
        }, delay);
      });
    };

    const setVideoSource = function (targetVideo, slide) {
      prepareAutoplay(targetVideo);
      targetVideo.style.setProperty('--mobile-video-position', slide.mobilePosition || '50% center');
      targetVideo.setAttribute('data-slide-src', slide.src);
      if (targetVideo.getAttribute('src') !== slide.src) {
        targetVideo.src = slide.src;
        targetVideo.load();
      }
    };

    const waitForVideoReady = function (targetVideo) {
      if (targetVideo.readyState >= 3) return Promise.resolve();

      return new Promise(function (resolve) {
        let resolved = false;
        const finish = function () {
          if (resolved) return;
          resolved = true;
          targetVideo.removeEventListener('canplay', finish);
          targetVideo.removeEventListener('loadeddata', finish);
          resolve();
        };

        targetVideo.addEventListener('canplay', finish, { once: true });
        targetVideo.addEventListener('loadeddata', finish, { once: true });
        window.setTimeout(finish, 900);
      });
    };

    const waitForPaintedFrame = function (targetVideo) {
      return requestPlayback(targetVideo).then(function () {
        if (targetVideo.readyState >= 3 && !targetVideo.paused && targetVideo.currentTime > 0.04) {
          return;
        }

        return new Promise(function (resolve) {
          let resolved = false;
          const finish = function () {
            if (resolved) return;
            resolved = true;
            targetVideo.removeEventListener('playing', finish);
            targetVideo.removeEventListener('timeupdate', finish);
            targetVideo.removeEventListener('loadeddata', finish);
            resolve();
          };

          targetVideo.addEventListener('playing', finish, { once: true });
          targetVideo.addEventListener('timeupdate', finish, { once: true });
          targetVideo.addEventListener('loadeddata', finish, { once: true });

          if (typeof targetVideo.requestVideoFrameCallback === 'function') {
            targetVideo.requestVideoFrameCallback(finish);
          }

          window.setTimeout(finish, 800);
        });
      });
    };

    const preloadNextVideo = function () {
      const nextSlide = slides[(current + 1) % slides.length];
      setVideoSource(standbyVideo, nextSlide);
    };

    const swapVideos = function (nextVideo) {
      const previousVideo = activeVideo;
      activeVideo = nextVideo;
      standbyVideo = previousVideo;

      activeVideo.style.zIndex = '1';
      standbyVideo.style.zIndex = '0';
      activeVideo.classList.add('is-active');

      window.setTimeout(function () {
        if (standbyVideo !== activeVideo) {
          standbyVideo.classList.remove('is-active');
          standbyVideo.pause();
          standbyVideo.currentTime = 0;
          activeVideo.style.zIndex = '';
          standbyVideo.style.zIndex = '';
          preloadNextVideo();
        }
      }, 460);
    };

    const advanceSlide = function () {
      clearSlideTimer();
      current = (current + 1) % slides.length;
      playCurrent();
    };

    const playCurrent = function () {
      const slide = slides[current];
      const currentTransitionId = ++transitionId;
      clearSlideTimer();
      const nextVideo = hasStarted ? standbyVideo : activeVideo;
      hasStarted = true;

      setVideoSource(nextVideo, slide);
      waitForVideoReady(nextVideo).then(function () {
        if (currentTransitionId !== transitionId) return Promise.reject();
        return waitForPaintedFrame(nextVideo);
      }).then(function () {
        if (currentTransitionId !== transitionId) return;
        updateCopy(copy, slide, language);
        if (nextVideo !== activeVideo) swapVideos(nextVideo);
        retryPlayback();
        preloadNextVideo();
        slideTimer = window.setTimeout(advanceSlide, HERO_VIDEO_DURATION_MS);
      }).catch(function () {
        // 后续切换已经接管当前播放流程。
      });
    };

    [video, standbyVideo].forEach(function (player) {
      player.addEventListener('loadedmetadata', function () {
        if (player === activeVideo) requestPlayback(player);
      });
      player.addEventListener('canplay', function () {
        if (player === activeVideo) requestPlayback(player);
      });
      player.addEventListener('ended', advanceSlide);
      player.addEventListener('error', advanceSlide);
    });


    document.addEventListener('visibilitychange', function () {
      if (!document.hidden && activeVideo.paused) retryPlayback();
    });

    window.addEventListener('pageshow', function () {
      if (activeVideo.paused) retryPlayback();
    });

    ['touchstart', 'pointerdown'].forEach(function (eventName) {
      window.addEventListener(eventName, function () {
        if (activeVideo.paused) requestPlayback(activeVideo);
      }, { once: true, passive: true });
    });

    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
    prepareAutoplay(video);
    prepareAutoplay(standbyVideo);
    playCurrent();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoHero);
  } else {
    initVideoHero();
  }
})();
