if (window.AOS) {
	AOS.init({
		duration: 800,
		easing: 'slide',
		once: true
	});
}

jQuery(document).ready(function($) {

	"use strict";


  // loader
  var loader = function() {
    setTimeout(function() { 
      if($('#loader').length > 0) {
        $('#loader').removeClass('show');
      }
    }, 1);
  };
  loader();

	

	var siteMenuClone = function() {

		$('.js-clone-nav').each(function() {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function() {
			
			var counter = 0;
      $('.site-mobile-menu .has-children').each(function(){
        var $this = $(this);
        
        $this.prepend('<span class="arrow-collapse collapsed">');

        $this.find('.arrow-collapse').attr({
          'data-toggle' : 'collapse',
          'data-target' : '#collapseItem' + counter,
        });

        $this.find('> ul').attr({
          'class' : 'collapse',
          'id' : 'collapseItem' + counter,
        });

        counter++;

      });

    }, 1000);

		$('body').on('click', '.arrow-collapse', function(e) {
      var $this = $(this);
      if ( $this.closest('li').find('.collapse').hasClass('show') ) {
        $this.removeClass('active');
      } else {
        $this.addClass('active');
      }
      e.preventDefault();  
      
    });

		$(window).resize(function() {
			var $this = $(this),
				w = $this.width();

			if ( w > 768 ) {
				if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function(e) {
			var $this = $(this);
			e.preventDefault();

			if ( $('body').hasClass('offcanvas-menu') ) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		}) 

		// click outisde offcanvas
		$(document).mouseup(function(e) {
	    var container = $(".site-mobile-menu");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	      if ( $('body').hasClass('offcanvas-menu') ) {
					$('body').removeClass('offcanvas-menu');
				}
	    }
		});
	}; 
	siteMenuClone();


	var sitePlusMinus = function() {
		$('.js-btn-minus').on('click', function(e){
			e.preventDefault();
			if ( $(this).closest('.input-group').find('.form-control').val() != 0  ) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function(e){
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	};
	// siteSliderRange();


	
	var siteCarousel = function () {
		if ( typeof $.fn.owlCarousel !== 'function' ) {
			return;
		}

		if ( $('.hero-slide').length > 0 ) {
			$('.hero-slide').owlCarousel({
				items: 1,
				loop: true,
				margin: 0,
				autoplay: true,
				nav: true,
				dots: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
				smartSpeed: 1000
			});
		}

		if ( $('.owl-slide-3').length > 0 ) {
			$('.owl-slide-3').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 30,
				autoplay: true,
				smartSpeed: 500,
				nav: true,
				dots: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
				responsive:{
					600:{
						items: 2
					},
					1000:{
						items: 2
					},
					1200:{
						items: 3
					}
				}
			});
		}

		if ( $('.owl-slide').length > 0 ) {
			$('.owl-slide').owlCarousel({
		    center: false,
		    items: 2,
		    loop: true,
				stagePadding: 0,
		    margin: 30,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        },
	        1200:{
	        	
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        }
		    }
			});
		}


		if ( $('.nonloop-block-14').length > 0 ) {
			$('.nonloop-block-14').owlCarousel({
		    center: false,
		    items: 1,
		    loop: true,
				stagePadding: 0,
		    margin: 0,
		    autoplay: true,
		    nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
		    responsive:{
	        600:{
	        	margin: 20,
	        	nav: true,
	          items: 2
	        },
	        1000:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: true,
	          items: 2
	        },
	        1200:{
	        	margin: 30,
	        	stagePadding: 0,
	        	nav: true,
	          items: 3
	        }
		    }
			});
		}

		if ( $('.slide-one-item').length > 0 ) {
			$('.slide-one-item').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 0,
				autoplay: true,
				pauseOnHover: false,
				nav: true,
				navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
			});
		}
	};
	siteCarousel();

	var siteStellar = function() {
		if ( typeof $.fn.stellar !== 'function' ) {
			return;
		}

		$(window).stellar({
	    responsive: false,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	siteStellar();

	var siteCountDown = function() {
		if ( $('#date-countdown').length === 0 || typeof $.fn.countdown !== 'function' ) {
			return;
		}

		$('#date-countdown').countdown('2020/10/10', function(event) {
		  var $this = $(this).html(event.strftime(''
		    + '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
		    + '<span class="countdown-block"><span class="label">%d</span> days </span>'
		    + '<span class="countdown-block"><span class="label">%H</span> hr </span>'
		    + '<span class="countdown-block"><span class="label">%M</span> min </span>'
		    + '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});
				
	};
	siteCountDown();

	var siteDatePicker = function() {

		if ( $('.datepicker').length > 0 ) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function() {
		$(".js-sticky-header").sticky({topSpacing:0});
	};
	siteSticky();

	// navigation
  var OnePageNavigation = function() {
    var navToggler = $('.site-menu-toggle');
   	$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function(e) {
      e.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        'scrollTop': $(hash).offset().top
      }, 600, 'easeInOutCirc', function(){
        window.location.hash = hash;
      });

    });
  };
//   OnePageNavigation();

  var siteScroll = function() {

  	

  	$(window).scroll(function() {

  		var st = $(this).scrollTop();

  		if (st > 100) {
  			$('.js-sticky-header').addClass('shrink');
  		} else {
  			$('.js-sticky-header').removeClass('shrink');
  		}

  	}) 

  };
	siteScroll();
	

	$(function () {
		// $("#bgndVideo").YTPlayer();
	});

});

////////////////

(function() {
  const formatMap = {
    english: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    chinese: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, separator: ' - ' },
    german: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    french: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    italian: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    spanish: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    russian: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    japanese: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, separator: ' - ' },
    korean: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, separator: ' - ' },
    arabic: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    thai_gregorian: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' }, // 公历
    thai_buddhist: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },  // 佛历
    vietnamese: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' }
  };

  const locales = {
    english: 'en-GB',
    chinese: 'zh-CN',
    german: 'de-DE',
    french: 'fr-FR',
    italian: 'it-IT',
    spanish: 'es-ES',
    russian: 'ru-RU',
    japanese: 'ja-JP',
    korean: 'ko-KR',
    arabic: 'ar-SA',
    thai_gregorian: 'th-TH',
    thai_buddhist: 'th-TH-u-ca-buddhist', // 使用泰国佛教历
    vietnamese: 'vi-VN'
  };

  const weekdayIcons = {
	0: "☉", // Sunday - Sun
	1: "☾", // Monday - Moon
	2: "♂", // Tuesday - Mars
	3: "☿", // Wednesday - Mercury
	4: "♃", // Thursday - Jupiter
	5: "♀", // Friday - Venus
	6: "♄"  // Saturday - Saturn
  };

  
  document.querySelectorAll('[class*="currentDateInLang"]').forEach(span => {
    const lang = span.getAttribute('language');
    const now = new Date();
    const config = formatMap[lang];

    // RTL排版支持
    if(lang === 'arabic') {
      span.style.direction = 'rtl';
      span.style.fontFamily = "'Noto Sans Arabic', sans-serif";
    }

    // 日期格式化
    let dateStr = now.toLocaleDateString(locales[lang], config.date);

    // 特殊语言调整
    switch(lang) {
      case 'chinese':
        dateStr = dateStr.replace(/(\d+)年(\d+)月(\d+)日/, '$1年$2月$3日');
        break;
      case 'japanese':
        dateStr = dateStr.replace(/(\d+)\/(\d+)\/(\d+)/, '$1年$2月$3日');
        break;
      case 'korean':
        dateStr = dateStr.replace(/(\d+)\. (\d+)\. (\d+)\./, '$1년 $2월 $3일');
        break;
      case 'arabic':
        dateStr = dateStr.replace(/،/g, ' - '); // 替换阿拉伯语逗号
        break;
      case 'thai_gregorian': 
        const buddhistYear = now.getFullYear() + 543;
          dateStr = dateStr.replace(/\d{4}/, `พ.ศ. ${buddhistYear}`); // 使用模板字符串插入变量
        break;
    }

    // 自定义日期格式
    let dateParts = now.toLocaleDateString(locales[lang], config.date).split(' ');
    if(lang === 'english') dateParts = [dateParts[0], dateParts[1], dateParts[2]];
    if(lang === 'german') dateParts[1] = dateParts[1].replace('.', ''); 

	const weekdayStr = now.toLocaleString(locales[lang], { weekday: 'long' });

	// 获取对应符号
	const weekdayIcon = weekdayIcons[now.getDay()];

    // 最终组合
    let finalStr = `${dateStr}${config.separator}${weekdayStr} ${weekdayIcon}`;

    // 西班牙语优化
    if(lang === 'spanish') {
      finalStr = finalStr.replace(' de ', ' ');
    }

    span.innerHTML = lang === 'arabic' ? 
      `<span style="unicode-bidi: embed">${finalStr}</span>` : 
      finalStr;
  });
})();

// 所有页面的品牌标志统一返回无语言入口，由入口页再依据浏览器语言决定跳转。
(function () {
	const setLogoGatewayLinks = function () {
		document.querySelectorAll('a.site-logo').forEach(function (logo) {
			logo.setAttribute('href', 'index.html');
		});
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', setLogoGatewayLinks);
	} else {
		setLogoGatewayLinks();
	}
})();

// 页脚访客信息只展示 IP 所在国家，避免旧脚本将城市或省份写入欢迎语。
(function () {
	const cacheKey = 'user_device_info';
	const cacheDuration = 10 * 60 * 1000;
	const entryGeoRefreshKey = 'entry_geo_refresh_requested_at';
	const entryGeoRefreshWindow = 60 * 1000;
	const defaultHomeLocation = { latitude: 50.117, longitude: 8.683, timeZone: 'Europe/Berlin' };
	const pageLocaleMap = {
		cn: 'zh-Hans',
		en: 'en',
		de: 'de',
		fr: 'fr',
		it: 'it',
		es: 'es',
		jp: 'ja',
		kr: 'ko',
		th: 'th',
		vi: 'vi',
		ru: 'ru',
		ar: 'ar'
	};
	const distanceUnitMap = {
		cn: '公里',
		jp: 'km',
		kr: 'km',
		th: 'กิโลเมตร',
		vi: 'km',
		ru: 'км',
		ar: 'كم'
	};
	const distanceMeterUnitMap = {
		cn: '米',
		jp: 'm',
		kr: 'm',
		th: 'เมตร',
		vi: 'm',
		ru: 'м',
		ar: 'م'
	};

	const currentLanguage = function () {
		const page = window.location.pathname.split('/').pop() || '';
		const matched = page.match(/^(cn|en|de|fr|it|es|jp|kr|th|vi|ru|ar)(?:-|\.)/i);
		return matched ? matched[1].toLowerCase() : 'en';
	};

	const hasPendingEntryGeoRefresh = function () {
		try {
			const timestamp = Number(sessionStorage.getItem(entryGeoRefreshKey));
			return Number.isFinite(timestamp) && Date.now() - timestamp < entryGeoRefreshWindow;
		} catch (error) {
			return false;
		}
	};

	const clearPendingEntryGeoRefresh = function () {
		try { sessionStorage.removeItem(entryGeoRefreshKey); } catch (error) {}
	};

	const readCachedGeo = function () {
		try {
			if (hasPendingEntryGeoRefresh()) return null;
			const cached = JSON.parse(localStorage.getItem(cacheKey));
			if (cached && cached.geoInfo && cached.geoTimestamp && Date.now() - cached.geoTimestamp < cacheDuration) {
				return cached.geoInfo;
			}
		} catch (error) {}
		return null;
	};

	const getGeo = async function () {
		const cached = readCachedGeo();
		if (cached && cached.country && cached.loc) return cached;
		let geo;
		try {
			const response = await fetch('https://ipinfo.io/json?token=228a7bb192c4fc');
			if (!response.ok) throw new Error('无法获取访客位置');
			geo = await response.json();
		} catch (error) {
			if (cached) return cached;
			throw error;
		}
		try {
			const existing = JSON.parse(localStorage.getItem(cacheKey)) || {};
			existing.geoInfo = geo;
			existing.geoTimestamp = Date.now();
			localStorage.setItem(cacheKey, JSON.stringify(existing));
			clearPendingEntryGeoRefresh();
		} catch (error) {}
		return geo;
	};

	const countryName = function (countryCode, language) {
		try {
			return new Intl.DisplayNames([pageLocaleMap[language] || 'en'], { type: 'region' }).of(countryCode);
		} catch (error) {
			return countryCode;
		}
	};

	const calculateDistance = function (latitude, longitude) {
		const configuredLocation = window.siteInfoData && window.siteInfoData.home_location;
		const homeLocation = configuredLocation
			&& Number.isFinite(configuredLocation.latitude)
			&& Number.isFinite(configuredLocation.longitude)
			? configuredLocation
			: defaultHomeLocation;
		const radians = function (value) { return value * Math.PI / 180; };
		const earthRadiusKm = 6371;
		const latitudeDelta = radians(latitude - homeLocation.latitude);
		const longitudeDelta = radians(longitude - homeLocation.longitude);
		const value = Math.sin(latitudeDelta / 2) ** 2
			+ Math.cos(radians(homeLocation.latitude)) * Math.cos(radians(latitude)) * Math.sin(longitudeDelta / 2) ** 2;
		return earthRadiusKm * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
	};

	const formatDistance = function (distance, language) {
		const locale = pageLocaleMap[language] || 'en';
		if (distance > 0 && distance < 1) {
			const meters = Math.round(distance * 1000);
			const unit = distanceMeterUnitMap[language] || 'm';
			return ' ' + new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(meters) + unit;
		}

		const unit = distanceUnitMap[language] || 'km';
		return ' ' + new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(distance) + ' ' + unit;
	};

	const getHomeLocation = function () {
		const configuredLocation = window.siteInfoData && window.siteInfoData.home_location;
		return configuredLocation
			&& Number.isFinite(configuredLocation.latitude)
			&& Number.isFinite(configuredLocation.longitude)
			? configuredLocation
			: defaultHomeLocation;
	};

	const localeForLanguage = function (language) {
		return {
			cn: 'zh-CN', en: 'en-US', de: 'de-DE', fr: 'fr-FR', it: 'it-IT', es: 'es-ES',
			jp: 'ja-JP', kr: 'ko-KR', th: 'th-TH', vi: 'vi-VN', ru: 'ru-RU', ar: 'ar-SA'
		}[language] || 'en-US';
	};

	const formatTime = function (timeZone, language) {
		// 使用固定的英文时钟标记，保证所有语言页面均明确显示 AM/PM。
		return new Intl.DateTimeFormat('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			// 页脚统一使用 12 小时制，明确显示 AM/PM。
			hour12: true,
			timeZone: timeZone
		}).format(new Date());
	};

	const getUtcOffset = function (timeZone) {
		try {
			const offset = new Intl.DateTimeFormat('en-US', {
				timeZone: timeZone,
				timeZoneName: 'longOffset'
			}).formatToParts(new Date()).find(function (item) { return item.type === 'timeZoneName'; });
			const value = offset && offset.value;
			if (!value || value === 'GMT') return 'UTC+0';
			const matched = value.match(/(?:GMT|UTC)([+-])(\d{1,2})(?::?(\d{2}))?/);
			if (!matched) return value.replace('GMT', 'UTC');
			return 'UTC' + matched[1] + String(Number(matched[2])) + (matched[3] && matched[3] !== '00' ? ':' + matched[3] : '');
		} catch (error) {
			return 'UTC';
		}
	};

	// 页脚地点温度：按经纬度缓存 20 分钟，时钟仍由 IANA 时区独立计算。
	const footerTemperatureCacheDuration = 20 * 60 * 1000;
	const footerTemperatureRequests = {};
	const footerTemperatureKey = function (latitude, longitude) {
		return 'footer_temperature_' + Number(latitude).toFixed(3) + '_' + Number(longitude).toFixed(3);
	};
	const cachedFooterTemperature = function (latitude, longitude) {
		if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
		try {
			const coordinates = Number(latitude).toFixed(3) + '_' + Number(longitude).toFixed(3);
			const cacheKeys = [footerTemperatureKey(latitude, longitude), 'footer_weather_' + coordinates];
			for (const key of cacheKeys) {
				const cached = JSON.parse(localStorage.getItem(key));
				if (cached && Number.isFinite(Number(cached.temperature)) && Date.now() - cached.timestamp < footerTemperatureCacheDuration) {
					return Number(cached.temperature);
				}
			}
		} catch (error) {}
		return null;
	};
	const loadFooterTemperature = function (latitude, longitude) {
		if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return Promise.resolve(null);
		const cached = cachedFooterTemperature(latitude, longitude);
		if (cached !== null) return Promise.resolve(cached);
		const key = footerTemperatureKey(latitude, longitude);
		if (footerTemperatureRequests[key]) return footerTemperatureRequests[key];

		const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
		const timeout = controller ? window.setTimeout(function () { controller.abort(); }, 5000) : null;
		const endpoint = 'https://api.open-meteo.com/v1/forecast?latitude=' + encodeURIComponent(latitude)
			+ '&longitude=' + encodeURIComponent(longitude) + '&current=temperature_2m';
		footerTemperatureRequests[key] = fetch(endpoint, controller ? { signal: controller.signal } : undefined)
			.then(function (response) {
				if (!response.ok) throw new Error('Weather request failed');
				return response.json();
			})
			.then(function (response) {
				const temperature = Number(response && response.current && response.current.temperature_2m);
				if (!Number.isFinite(temperature)) return null;
				try {
					localStorage.setItem(key, JSON.stringify({ temperature: temperature, timestamp: Date.now() }));
				} catch (error) {}
				return temperature;
			})
			.catch(function () { return null; })
			.finally(function () {
				if (timeout) window.clearTimeout(timeout);
				delete footerTemperatureRequests[key];
			});
		return footerTemperatureRequests[key];
	};
	const formatFooterTemperature = function (temperature) {
		return Number.isFinite(temperature) ? Math.round(temperature) + '°C' : '--°C';
	};

	const updateCalendarDate = function () {
		const locale = pageLocaleMap[currentLanguage()] || 'en';
		const now = new Date();
		const dateElement = document.getElementById('currentDate');
		const weekdayElement = document.getElementById('currentWeekday');
		if (dateElement) dateElement.textContent = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric' }).format(now);
		if (weekdayElement) weekdayElement.textContent = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(now);
	};

	const footerTimeSelector = '.site-section.subscribe .clock24, .subscribe .clock24, .site-section.subscribe .digitalTime, .subscribe .digitalTime, .site-section.subscribe .footer-time, .subscribe .footer-time';
	const footerTimeElements = function () {
		const elements = [];
		document.querySelectorAll(footerTimeSelector).forEach(function (element) {
			if (elements.includes(element)) return;
			if (element.classList.contains('digitalTime')) {
				const separator = element.previousSibling;
				if (separator && separator.nodeType === Node.TEXT_NODE && separator.textContent.trim() === '-') separator.remove();
				const oldLabel = element.previousElementSibling;
				if (oldLabel && oldLabel.tagName === 'SPAN' && !oldLabel.className) oldLabel.remove();
			}
			if (!element.classList.contains('footer-time')) {
				const replacement = document.createElement('span');
				replacement.className = 'footer-time';
				element.replaceWith(replacement);
				element = replacement;
			}
			elements.push(element);
		});
		return elements.slice(0, 2);
	};

	const normalizePlaceName = function (value) {
		return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
	};

	let cityNameDictionary = null;
	const loadCityNameDictionary = function () {
		if (cityNameDictionary) return Promise.resolve(cityNameDictionary);
		return fetch('js/city_name.json?v=20260715-i18n-complete')
			.then(function (response) { return response.ok ? response.json() : {}; })
			.then(function (items) {
				cityNameDictionary = Array.isArray(items) ? (items[0] || {}) : (items || {});
				return cityNameDictionary;
			})
			.catch(function () { cityNameDictionary = {}; return cityNameDictionary; });
	};

	const chineseRegions = {
		'beijing': '北京', 'tianjin': '天津', 'hebei': '河北', 'shanxi': '山西', 'inner mongolia': '内蒙古',
		'liaoning': '辽宁', 'jilin': '吉林', 'heilongjiang': '黑龙江', 'shanghai': '上海', 'jiangsu': '江苏',
		'zhejiang': '浙江', 'anhui': '安徽', 'fujian': '福建', 'jiangxi': '江西', 'shandong': '山东',
		'henan': '河南', 'hubei': '湖北', 'hunan': '湖南', 'guangdong': '广东', 'guangxi': '广西',
		'hainan': '海南', 'chongqing': '重庆', 'sichuan': '四川', 'guizhou': '贵州', 'yunnan': '云南',
		'shaanxi': '陕西', 'gansu': '甘肃', 'qinghai': '青海', 'ningxia': '宁夏', 'xinjiang': '新疆',
		'tibet': '西藏', 'hong kong': '香港', 'macao': '澳门', 'taiwan': '台湾'
	};

	const localisedDictionaryCity = function (city, language) {
		if (!cityNameDictionary) return '';
		const matchedKey = Object.keys(cityNameDictionary).find(function (key) {
			return normalizePlaceName(key) === normalizePlaceName(city);
		});
		if (!matchedKey) return '';
		const names = cityNameDictionary[matchedKey] || {};
		const keys = { cn: ['ZH-CN', 'ZH-TW'], jp: ['JA'], kr: ['KO'], en: ['EN'], de: ['DE'], fr: ['FR'], it: ['IT'], es: ['ES'], ru: ['RU'], ar: ['AR'], th: ['TH'], vi: ['VI'] }[language] || [];
		return keys.map(function (key) { return names[key]; }).find(Boolean) || '';
	};

	const visitorPlaceName = function (geo, language) {
		const countryCode = String(geo.country || '').toUpperCase();
		const dictionaryName = localisedDictionaryCity(geo.city, language);
		if (dictionaryName) return { place: dictionaryName };
		// 词典缺少翻译时保留 IP 服务返回的英文城市名，不再退化为“当地”。
		if (geo.city) return { place: geo.city };
		if (language === 'cn' && countryCode === 'CN') {
			const region = chineseRegions[normalizePlaceName(geo.region)];
			if (region) return { place: region };
		}
		return { place: countryCode ? countryName(countryCode, language) : ({ cn: '当地', en: 'Local' }[language] || 'Local'), isFallback: true };
	};

	const addFooterTimePart = function (parent, className, text) {
		const part = document.createElement('span');
		part.className = className;
		part.textContent = text;
		parent.appendChild(part);
	};

	const renderFooterTime = function (element, details, language) {
		element.className = 'footer-time footer-time--compact';
		element.replaceChildren();
		addFooterTimePart(element, 'footer-time-place', details.place);
		// 其余内容保持在同一个 flex 子项中，避免浏览器吞掉相邻子项边界的空格。
		addFooterTimePart(element, 'footer-time-details', ' [' + formatFooterTemperature(details.temperature) + '] - ' + formatTime(details.timeZone, language));
	};

	const updateFooterClocks = function (geo) {
		const language = currentLanguage();
		const configuredHome = getHomeLocation();
		const homeTimeZone = configuredHome.timeZone || defaultHomeLocation.timeZone;
		const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const ipTimeZone = geo && geo.timezone;
		// 访客地点来自 IP，因此时钟也优先使用同一条 IP 数据的 IANA 时区。
		// 浏览器时区仅在 IP 服务没有返回时作为兜底。
		const visitorTimeZone = ipTimeZone || browserTimeZone || homeTimeZone;
		const ownerPlace = configuredHome.localizedNames && configuredHome.localizedNames[language] || configuredHome.name || 'Frankfurt';
		const visitorPlace = visitorPlaceName(geo || {}, language).place;
		const ownerLatitude = Number(configuredHome.latitude);
		const ownerLongitude = Number(configuredHome.longitude);
		const visitorCoordinates = String(geo && geo.loc || '').split(',').map(Number);
		const visitorLatitude = visitorCoordinates[0];
		const visitorLongitude = visitorCoordinates[1];
		const ownerTemperature = cachedFooterTemperature(ownerLatitude, ownerLongitude);
		const visitorTemperature = cachedFooterTemperature(visitorLatitude, visitorLongitude);
		const elements = footerTimeElements();
		if (elements[0]) renderFooterTime(elements[0], { place: ownerPlace, timeZone: homeTimeZone, temperature: ownerTemperature }, language);
		if (elements[1]) renderFooterTime(elements[1], { place: visitorPlace, timeZone: visitorTimeZone, temperature: visitorTemperature }, language);

		if (ownerTemperature === null && Number.isFinite(ownerLatitude) && Number.isFinite(ownerLongitude)) {
			loadFooterTemperature(ownerLatitude, ownerLongitude).then(function (temperature) {
				if (temperature !== null) updateFooterClocks(activeVisitorGeo);
			});
		}
		if (visitorTemperature === null && Number.isFinite(visitorLatitude) && Number.isFinite(visitorLongitude)) {
			loadFooterTemperature(visitorLatitude, visitorLongitude).then(function (temperature) {
				if (temperature !== null) updateFooterClocks(activeVisitorGeo);
			});
		}
	};

	const updateVisitorFooter = function (geo) {
		const countryCode = String(geo && geo.country || '').trim().toLowerCase();
		if (!countryCode) return;
		// 将同一份 IP 定位数据提供给页脚天气模块，避免用本站所在地天气替代访客天气。
		window.siteVisitorGeo = Object.assign({}, geo);
		const language = currentLanguage();
		const name = countryName(countryCode.toUpperCase(), language);
		document.querySelectorAll('.footer-visitor-flag').forEach(function (flag) {
			flag.src = `./images/wflags/${countryCode}.png`;
			flag.alt = name;
			flag.onerror = function () {
				this.onerror = null;
				this.src = './images/wflags/de.png';
				this.alt = 'Germany';
			};
		});
		let distance = null;
		const coordinates = String(geo.loc || '').split(',').map(Number);
		if (coordinates.length === 2 && coordinates.every(Number.isFinite)) {
			distance = calculateDistance(coordinates[0], coordinates[1]);
		}

		document.querySelectorAll('.province-slogan').forEach(function (element) {
			element.textContent = '';
		});
		document.querySelectorAll('.location').forEach(function (location) {
			location.textContent = name;
		});
		document.querySelectorAll('.copyright').forEach(function (footer) {
			footer.querySelectorAll('[data-ip-flag], .country-flag, img[src*="images/wflags/"]').forEach(function (flag) {
				flag.remove();
			});
			const location = footer.querySelector('.location');
			if (!location) return;
			const distanceElement = footer.querySelector('.distance-info');
			if (distanceElement && distance !== null) {
				distanceElement.textContent = formatDistance(distance, language);
			} else if (distanceElement) {
				distanceElement.textContent = ' —';
			}
		});
		updateFooterClocks(geo);
		document.dispatchEvent(new CustomEvent('site:visitor-geo', {
			detail: { geo: window.siteVisitorGeo }
		}));
	};

	let activeVisitorGeo = {};
	// 不等待图片、视频等资源完成，避免旧的静态时钟标签在页脚短暂闪现。
	document.addEventListener('DOMContentLoaded', function () {
		document.querySelectorAll('.copyright [data-ip-flag], .copyright .country-flag, .copyright img[src*="images/wflags/"]').forEach(function (flag) {
			flag.remove();
		});
		updateCalendarDate();
		updateFooterClocks(activeVisitorGeo);
		window.setInterval(function () { updateFooterClocks(activeVisitorGeo); }, 1000);
		getGeo().then(function (geo) {
			activeVisitorGeo = geo;
			updateVisitorFooter(geo);
			// 城市词典是可选的增强数据；加载完成后以本地化城市名刷新一次。
			loadCityNameDictionary().then(function () { updateFooterClocks(activeVisitorGeo); });
		}).catch(function () {});
	});
})();

///////////////////

(function() {
  // 星座配置体系
  const zodiacConfig = {
    formats: {
      en: { names: ['Capricorn ♑︎', 'Aquarius ♒︎', 'Pisces ♓︎', 'Aries ♈︎', 'Taurus ♉︎', 'Gemini ♊︎', 'Cancer ♋︎', 'Leo ♌︎', 'Virgo ♍︎', 'Libra ♎︎', 'Scorpio ♏︎', 'Sagittarius ♐︎'] },
	  tb: { names: ['གླང་ཆེན་ ♑︎', 'ཆུ་སྲིན་ ♒︎', 'ཉ་མོ། ♓︎', 'གླང་ཆེན་ ♈︎', 'བོང་བུ། ♉︎', 'གྷེ་མི་ནི་ ♊︎', 'སྐྲན་ནད། ♋︎', 'ལིའོ་ ♌︎', 'བུ་མོ་ ♍︎', 'ལི་བཱར་ ♎︎', 'སྐར་མ ♏︎', 'དཀྱིལ་འཁོར་ ♐︎'] },
th: { names: ['ราศีมกร ♑︎', 'ราศีกุมภ์ ♒︎', 'ราศีมีน ♓︎', 'ราศีเมษ ♈︎', 'ราศีพฤษภ ♉︎', 'ราศีเมถุน ♊︎', 'ราศีกรกฎ ♋︎', 'ราศีสิงห์ ♌︎', 'ราศีกันย์ ♍︎', 'ราศีตุล ♎︎', 'ราศีพิจิก ♏︎', 'ราศีธนู ♐︎'] },
vi: { names: ['Ma Kết ♑︎', 'Bảo Bình ♒︎', 'Song Ngư ♓︎', 'Bạch Dương ♈︎', 'Kim Ngưu ♉︎', 'Song Tử ♊︎', 'Cự Giải ♋︎', 'Sư Tử ♌︎', 'Xử Nữ ♍︎', 'Thiên Bình ♎︎', 'Bọ Cạp ♏︎', 'Nhân Mã ♐︎'] },
zh: { names: ['摩羯 ♑︎', '水瓶 ♒︎', '双鱼 ♓︎', '白羊 ♈︎', '金牛 ♉︎', '双子 ♊︎', '巨蟹 ♋︎', '狮子 ♌︎', '处女 ♍︎', '天秤 ♎︎', '天蝎 ♏︎', '射手 ♐︎'] },
ja: { names: ['山羊 ♑︎', '水瓶 ♒︎', '魚座 ♓︎', '牡羊 ♈︎', '牡牛 ♉︎', '双子 ♊︎', '蟹座 ♋︎', '獅子 ♌︎', '乙女 ♍︎', '天秤 ♎︎', '蠍座 ♏︎', '射手 ♐︎'] },
ko: { names: ['염소자리 ♑︎', '물병자리 ♒︎', '물고기자리 ♓︎', '양자리 ♈︎', '황소자리 ♉︎', '쌍둥이자리 ♊︎', '게자리 ♋︎', '사자자리 ♌︎', '처녀자리 ♍︎', '천칭자리 ♎︎', '전갈자리 ♏︎', '궁수자리 ♐︎'] },
fr: { names: ['Capricorne ♑︎', 'Verseau ♒︎', 'Poissons ♓︎', 'Bélier ♈︎', 'Taureau ♉︎', 'Gémeaux ♊︎', 'Cancer ♋︎', 'Lion ♌︎', 'Vierge ♍︎', 'Balance ♎︎', 'Scorpion ♏︎', 'Sagittaire ♐︎'] },
it: { names: ['Capricorno ♑︎', 'Acquario ♒︎', 'Pesci ♓︎', 'Ariete ♈︎', 'Toro ♉︎', 'Gemelli ♊︎', 'Cancro ♋︎', 'Leone ♌︎', 'Vergine ♍︎', 'Bilancia ♎︎', 'Scorpione ♏︎', 'Sagittario ♐︎'] },
de: { names: ['Steinbock ♑︎', 'Wassermann ♒︎', 'Fische ♓︎', 'Widder ♈︎', 'Stier ♉︎', 'Zwillinge ♊︎', 'Krebs ♋︎', 'Löwe ♌︎', 'Jungfrau ♍︎', 'Waage ♎︎', 'Skorpion ♏︎', 'Schütze ♐︎'] },
es: { names: ['Capricornio ♑︎', 'Acuario ♒︎', 'Piscis ♓︎', 'Aries ♈︎', 'Tauro ♉︎', 'Géminis ♊︎', 'Cáncer ♋︎', 'Leo ♌︎', 'Virgo ♍︎', 'Libra ♎︎', 'Escorpio ♏︎', 'Sagitario ♐︎'] },
ru: { names: ['Козерог ♑︎', 'Водолей ♒︎', 'Рыбы ♓︎', 'Овен ♈︎', 'Телец ♉︎', 'Близнецы ♊︎', 'Рак ♋︎', 'Лев ♌︎', 'Дева ♍︎', 'Весы ♎︎', 'Скорпион ♏︎', 'Стрелец ♐︎'] },
      ar: { names: ['الجدي', 'الدلو', 'الحوت', 'الحمل', 'الثور', 'الجوزاء', 'السرطان', 'الأسد', 'العذراء', 'الميزان', 'العقرب', 'القوس'] } // 新增阿拉伯语
    },
    dateRanges: [
      { month: 12, start: 22 }, { month: 1, end: 19 },   // 摩羯座
      { month: 1, start: 20 }, { month: 2, end: 18 },    // 水瓶座
      { month: 2, start: 19 }, { month: 3, end: 20 },    // 双鱼座
      { month: 3, start: 21 }, { month: 4, end: 19 },    // 白羊座
      { month: 4, start: 20 }, { month: 5, end: 20 },    // 金牛座
      { month: 5, start: 21 }, { month: 6, end: 20 },    // 双子座
      { month: 6, start: 21 }, { month: 7, end: 22 },    // 巨蟹座
      { month: 7, start: 23 }, { month: 8, end: 22 },    // 狮子座
      { month: 8, start: 23 }, { month: 9, end: 22 },    // 处女座
      { month: 9, start: 23 }, { month: 10, end: 22 },   // 天秤座
      { month: 10, start: 23 }, { month: 11, end: 21 },  // 天蝎座
      { month: 11, start: 22 }, { month: 12, end: 21 }   // 射手座
    ]
  };

  // 语言映射表
  const langCodes = {
    english: 'en',
    chinese: 'zh',
    japanese: 'ja',
    korean: 'ko',
    french: 'fr',
	italian: 'it',
    german: 'de',
    spanish: 'es',
    russian: 'ru',
	thai: 'th',
	vietnamese: 'vi',
	arabic: 'ar', // 新增映射
	tibetan: 'tb' // 新增映射
  };

  // 星座计算引擎
  const getZodiacIndex = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    for (let i = 0; i < zodiacConfig.dateRanges.length; i += 2) {
      const startRule = zodiacConfig.dateRanges[i];
      const endRule = zodiacConfig.dateRanges[i + 1];
      
      if (
        (month === startRule.month && day >= startRule.start) ||
        (month === endRule.month && day <= endRule.end)
      ) {
        return i / 2; // 每两个规则对应一个星座
      }
    }
    return 11; // 处理跨年摩羯座
  };

  // 增强渲染逻辑
  document.querySelectorAll('[class*="currentZodiacInLang"]').forEach(element => {
    const lang = element.getAttribute('language');
    const now = new Date();
    const zodiacIndex = getZodiacIndex(now);
    
    const langKey = langCodes[lang];
    let zodiacName = zodiacConfig.formats[langKey].names[zodiacIndex];

    // 阿拉伯语特殊处理
    if (lang === 'arabic') {
      element.style.direction = 'rtl';
      element.style.fontFamily = "'Noto Sans Arabic', sans-serif"; // 推荐字体
      zodiacName = `برج ${zodiacName}`; // 添加星座前缀（برج = 星座）
      element.innerHTML = `<span style="unicode-bidi: embed">${zodiacName}</span>`;
    } else {
      element.textContent = zodiacName;
    }
  });
})();








document.addEventListener('scroll', function () {
    const simplifiedNavbar = document.getElementById('simplifiedNavbar');
    if (!simplifiedNavbar) return;
    const scrollThreshold = 100; // 滚动的触发距离

    if (window.scrollY > scrollThreshold) {
        simplifiedNavbar.classList.add('active'); // 添加显示的类
        document.body.classList.add('mobile-nav-active');
    } else {
        simplifiedNavbar.classList.remove('active'); // 移除显示的类
        document.body.classList.remove('mobile-nav-active');
    }
});




// JavaScript to adjust the width based on the selected option
function adjustWidth(selectElement) {
    if (!selectElement) return;
    const tempSelect = document.createElement('select');
    tempSelect.style.visibility = 'hidden';
    document.body.appendChild(tempSelect);

    const selectedOption = selectElement.options[selectElement.selectedIndex];
    tempSelect.innerHTML = `<option>${selectedOption ? selectedOption.text : ''}</option>`;
    tempSelect.style.width = 'auto';
    const maxWidth = tempSelect.clientWidth;

    selectElement.style.width = `${maxWidth + 8}px`; // Add some padding
    document.body.removeChild(tempSelect);
}

const contentListElement = document.getElementById('content-list');
const contentList2Element = document.getElementById('content-list-2');
const languagesElement = document.getElementById('languages');
const languages2Element = document.getElementById('languages-2');
const languages3Element = document.getElementById('languages-3');
const languages4Element = document.getElementById('languages-4');

const fontSelector = document.getElementById('fontSelector');

adjustWidth(contentListElement);
adjustWidth(contentList2Element);
adjustWidth(languagesElement);
adjustWidth(languages2Element);
adjustWidth(languages3Element);
adjustWidth(languages4Element);
adjustWidth(fontSelector);

if (contentListElement) contentListElement.addEventListener('change', () => adjustWidth(contentListElement));
if (contentList2Element) contentList2Element.addEventListener('change', () => adjustWidth(contentList2Element));
if (languagesElement) languagesElement.addEventListener('change', () => adjustWidth(languagesElement));
if (languages2Element) languages2Element.addEventListener('change', () => adjustWidth(languages2Element));
if (languages3Element) languages3Element.addEventListener('change', () => adjustWidth(languages3Element));
if (languages4Element) languages4Element.addEventListener('change', () => adjustWidth(languages4Element));
if (fontSelector) fontSelector.addEventListener('change', () => adjustWidth(fontSelector));

window.addEventListener('resize', () => {
    adjustWidth(contentListElement);
	adjustWidth(contentList2Element);
    adjustWidth(languagesElement);
	adjustWidth(languages2Element);
	adjustWidth(languages3Element);
	adjustWidth(languages4Element);
	adjustWidth(fontSelector);
});


document.addEventListener('DOMContentLoaded', function() {
	var logo = document.getElementById('scroll-logo'); // 确保 logo 元素存在
	if (!logo) {
	  console.error('Logo element not found!'); // 如果找不到元素，输出错误信息
	  return;
	}

	window.addEventListener('scroll', function() {
	  window.siteDebug('Scroll position:', window.scrollY); // 调试输出
	  if (window.scrollY > 250) { // 设置滚动距离为100px
		logo.style.visibility = 'visible'; // 使用 visibility 属性
		logo.style.opacity = '1'; // 确保 logo 可见
	  } else {
		logo.style.visibility = 'hidden'; // 隐藏 logo
		logo.style.opacity = '0'; // 确保 logo 不可见
	  }
	});
  });


(function () {
	let officialLanguages = ['cn', 'en', 'es', 'fr', 'ru', 'ar'];
	let supportedExtraLanguages = ['de', 'it', 'jp', 'kr', 'th', 'vi'];
	let supportedLanguages = officialLanguages.concat(supportedExtraLanguages);

	let languageMeta = {
		cn: { label: '中文', sourceFlag: 'cn', countries: ['cn', 'sg', 'my', 'hk', 'mo', 'tw'] },
		en: { label: 'English', sourceFlag: 'gb', countries: ['gb', 'us', 'ca', 'au', 'nz', 'ie', 'za', 'in', 'sg', 'hk'] },
		es: { label: 'Español', sourceFlag: 'es', countries: ['es', 'mx', 'ar', 'bo', 'cl', 'co', 'cr', 'cu', 'do', 'ec', 'gt', 'hn', 'ni', 'pa', 'pe', 'py', 'sv', 'uy', 've'] },
		fr: { label: 'Français', sourceFlag: 'fr', countries: ['fr', 'be', 'mc', 'ca', 'ch', 'lu'] },
		ru: { label: 'Русский', sourceFlag: 'ru', countries: ['ru', 'by', 'kz', 'kg', 'tj'] },
		ar: { label: 'اللغة العربية', sourceFlag: 'Arab_League', countries: ['dz', 'bh', 'km', 'dj', 'eg', 'iq', 'jo', 'kw', 'lb', 'ly', 'mr', 'ma', 'om', 'ps', 'qa', 'sa', 'so', 'sd', 'sy', 'tn', 'ae', 'ye'] },
		de: { label: 'Deutsch', sourceFlag: 'de', countries: ['de', 'at', 'ch', 'li', 'lu'] },
		it: { label: 'Italiano', sourceFlag: 'it', countries: ['it', 'ch', 'sm', 'va'] },
		jp: { label: '日本語', sourceFlag: 'jp', countries: ['jp'] },
		kr: { label: '한국어', sourceFlag: 'kr', countries: ['kr'] },
		th: { label: 'ไทย', sourceFlag: 'th', countries: ['th'] },
		vi: { label: 'Tiếng Việt', sourceFlag: 'vn', countries: ['vn'] }
	};

	let countryLanguageAdditions = {
		de: ['de'],
		at: ['de'],
		li: ['de'],
		ch: ['de', 'fr', 'it'],
		lu: ['de', 'fr'],
		sg: ['en', 'cn'],
		hk: ['cn', 'en'],
		vn: ['vi']
	};
	let countryRegionLanguageAdditions = {};

	let languageSortGroups = ['cjk', 'regional', 'latin', 'cyrillic', 'complex'];

	const chineseVariantValues = {
		simplified: 'javascript:runJianTiJavaScript();',
		traditional: 'javascript:runFanTiJavaScript();'
	};

	let flagRules = {
		cn: {
			simplified: { mode: 'source-plus-listed-visitor', sourceFlag: 'cn', appendVisitorFor: ['sg', 'my'] },
			traditional: { mode: 'traditional-chinese', regionalFlags: ['hk', 'tw', 'mo'], chinaFlags: ['cn', 'hk', 'mo'], defaultFlags: ['hk', 'mo'] }
		},
		ar: { mode: 'replace-source-with-visitor', appendVisitorFlag: false }
	};
	let fallbackLanguage = 'en';

	const applyLanguageSelectionConfig = function (config) {
		if (!config || typeof config !== 'object') return;
		if (Array.isArray(config.coreLanguages)) officialLanguages = config.coreLanguages;
		if (config.languages && typeof config.languages === 'object') {
			languageMeta = Object.fromEntries(Object.entries(config.languages).map(function ([language, meta]) {
				return [language, Object.assign({}, meta, {
					label: meta.nativeName || meta.label || language,
					countries: meta.spokenCountries || meta.countries || []
				})];
			}));
		}
		supportedExtraLanguages = Object.keys(languageMeta).filter(function (language) {
			return !officialLanguages.includes(language);
		});
		supportedLanguages = Object.keys(languageMeta);
		if (config.regionalLanguageExpansion && typeof config.regionalLanguageExpansion === 'object') countryLanguageAdditions = config.regionalLanguageExpansion;
		if (config.regionalLanguageExpansionByRegion && typeof config.regionalLanguageExpansionByRegion === 'object') countryRegionLanguageAdditions = config.regionalLanguageExpansionByRegion;
		if (Array.isArray(config.sortGroups)) languageSortGroups = config.sortGroups;
		if (config.flagRules && typeof config.flagRules === 'object') flagRules = config.flagRules;
		if (typeof config.fallbackLanguage === 'string') fallbackLanguage = config.fallbackLanguage;
	};

	const loadLanguageSelectionConfig = function () {
		return fetch('js/language-selection.json?v=20260715-vn-flag')
			.then(function (response) {
				if (!response.ok) throw new Error('语言选择配置加载失败');
				return response.json();
			})
			.then(applyLanguageSelectionConfig)
			.catch(function (error) {
				console.warn('语言选择配置不可用，使用内置规则。', error);
			});
	};

	const pageParts = function () {
		const fileName = (window.location.pathname.split('/').pop() || 'en.html').replace(/\.html$/i, '');
		if (fileName === 'zh') {
			return { language: 'cn', suffix: '', pageType: 'home' };
		}
		const match = fileName.match(/^([a-z]{2})(-.+)?$/i);
		if (!match || !supportedLanguages.includes(match[1])) {
			return { language: fallbackLanguage, suffix: '', pageType: 'home' };
		}
		const suffix = match[2] || '';
		return { language: match[1], suffix: suffix, pageType: suffix ? suffix.slice(1) : 'home' };
	};

	const pageUrlFor = function (language, pageType, suffix) {
		const meta = languageMeta[language];
		return meta && meta.pages && meta.pages[pageType] ? meta.pages[pageType] : `${language}${suffix || ''}.html`;
	};

	const isLanguageAvailableForPage = function (language, pageType) {
		const meta = languageMeta[language];
		return Boolean(meta && meta.enabled !== false && (!meta.pages || meta.pages[pageType]));
	};

	const displayGroupIndex = function (group) {
		if (Array.isArray(languageSortGroups)) {
			const index = languageSortGroups.indexOf(group);
			return index === -1 ? languageSortGroups.length : index;
		}
		return 0;
	};

	const desiredLanguagesFor = function (pageType, currentLanguage, extraLanguages) {
		const candidates = officialLanguages.concat(extraLanguages || [], [currentLanguage]);
		return candidates
			.filter(function (language, index, list) {
				return list.indexOf(language) === index && isLanguageAvailableForPage(language, pageType);
			})
			.sort(function (left, right) {
				const leftMeta = languageMeta[left] || {};
				const rightMeta = languageMeta[right] || {};
				const groupDifference = displayGroupIndex(leftMeta.displayGroup) - displayGroupIndex(rightMeta.displayGroup);
				if (groupDifference) return groupDifference;
				return (leftMeta.displayOrder || 999) - (rightMeta.displayOrder || 999) || leftMeta.label.localeCompare(rightMeta.label);
			});
	};

	const browserLanguage = function () {
		const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
		for (const browserLocale of browserLanguages) {
			const locale = String(browserLocale || '').toLowerCase();
			if (locale.indexOf('zh') === 0) return 'cn';
			if (locale.indexOf('ja') === 0) return 'jp';
			if (locale.indexOf('ko') === 0) return 'kr';
			if (locale.indexOf('th') === 0) return 'th';
			if (locale.indexOf('vi') === 0) return 'vi';
			if (locale.indexOf('de') === 0) return 'de';
			if (locale.indexOf('it') === 0) return 'it';
			if (locale.indexOf('es') === 0) return 'es';
			if (locale.indexOf('fr') === 0) return 'fr';
			if (locale.indexOf('ru') === 0) return 'ru';
			if (locale.indexOf('ar') === 0) return 'ar';
			if (locale.indexOf('en') === 0) return 'en';
		}
		return 'en';
	};

	const languagesFromGeo = function (geo) {
		const code = geoCountryCode(geo);
		if (!code) return [];
		const languages = (countryLanguageAdditions[code] || []).slice();
		const region = String(geo && geo.region || '').trim().toLowerCase();
		const regionalLanguages = countryRegionLanguageAdditions[code] && countryRegionLanguageAdditions[code][region];
		(regionalLanguages || []).forEach(function (language) {
			if (!languages.includes(language)) languages.push(language);
		});
		return languages.filter(function (language) { return supportedLanguages.includes(language); });
	};

	const buildPageUrl = function (language, suffix) {
		return pageUrlFor(language, suffix ? suffix.slice(1) : 'home', suffix);
	};

	const isLanguageNavigationSelect = function (select) {
		if (!select || select.name !== 'languages') return false;
		return Array.from(select.options).some(function (option) {
			return /\.html(?:$|[#?])/.test(option.value) || option.value.indexOf('runFanTiJavaScript') !== -1;
		});
	};

	const getLanguageSelects = function () {
		return Array.from(document.querySelectorAll('select[name="languages"]')).filter(isLanguageNavigationSelect);
	};

	const sameLanguageList = function (left, right) {
		const leftList = left || [];
		const rightList = right || [];
		if (leftList.length !== rightList.length) return false;
		return leftList.every(function (item, index) {
			return item === rightList[index];
		});
	};

	const flagPath = function (flagCode) {
		if (flagCode === 'Arab_League') return './images/wflags_svg/Arab_League.svg';
		return `./images/wflags_svg/${flagCode}.svg`;
	};

	const setFlagImage = function (img, flagCode, label) {
		img.src = flagPath(flagCode);
		img.alt = label || flagCode;
		img.className = 'desktop-language-flag';
		img.style.display = 'inline-block';
		img.onerror = function () {
			img.style.display = 'none';
		};
	};

	const ensureFlagContainer = function (select) {
		const parent = select.parentElement;
		if (!parent) return null;
		const group = select.closest('span, .ml-auto, .language-selector') || parent;

		let container = parent.querySelector('[data-dynamic-language-flags]');
		if (!container) {
			container = document.createElement('span');
			container.setAttribute('data-dynamic-language-flags', 'true');
			container.className = 'desktop-language-flags';
			parent.insertBefore(container, select);
		}

		Array.from(group.childNodes).forEach(function (node) {
			if (node === container || node === select) return;
			if (node.nodeType === Node.ELEMENT_NODE && node.querySelector && node.querySelector('img')) {
				node.style.display = 'none';
			}
			if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '/') {
				node.textContent = '';
			}
		});

		group.querySelectorAll('.cn-switch-cn, .cn-switch-tw').forEach(function (switchLink) {
			switchLink.style.display = 'none';
		});

		group.querySelectorAll('img[src*="wflags_svg"], img[id="language-flag"]').forEach(function (img) {
			if (container.contains(img)) return;
			const wrapper = img.closest('a, span');
			if (wrapper && wrapper !== group && !wrapper.contains(select)) {
				wrapper.style.display = 'none';
			} else {
				img.style.display = 'none';
			}
		});

		return container;
	};

	const currentChineseVariant = function () {
		try {
			return localStorage.getItem('langMode') === '繁体' ? 'traditional' : 'simplified';
		} catch (error) {
			return 'simplified';
		}
	};

	const setChineseVariant = function (variant) {
		try {
			localStorage.setItem('langMode', variant === 'traditional' ? '繁体' : '简体');
		} catch (error) {}

		if (variant === 'traditional' && typeof window.runFanTiJavaScript === 'function') {
			window.runFanTiJavaScript();
		}
		if (variant === 'simplified' && typeof window.runJianTiJavaScript === 'function') {
			window.runJianTiJavaScript();
		}
		if (typeof window.updateSelectBox === 'function') window.updateSelectBox();
		if (typeof window.updateLogo === 'function') window.updateLogo();
		if (typeof window.updateChineseLanguageFlags === 'function') window.updateChineseLanguageFlags();
	};

	const addChineseVariantOptions = function (select, currentLanguage, suffix) {
		const simplifiedOption = document.createElement('option');
		simplifiedOption.value = buildPageUrl('cn', suffix);
		simplifiedOption.textContent = '简体中文';
		simplifiedOption.dataset.language = 'cn';
		if (currentLanguage === 'cn' && currentChineseVariant() === 'simplified') simplifiedOption.selected = true;
		select.appendChild(simplifiedOption);

		const traditionalOption = document.createElement('option');
		traditionalOption.value = chineseVariantValues.traditional;
		traditionalOption.textContent = '繁体中文';
		traditionalOption.dataset.language = 'cn';
		if (currentLanguage === 'cn' && currentChineseVariant() === 'traditional') traditionalOption.selected = true;
		select.appendChild(traditionalOption);
	};

	const renderLanguageOptions = function (select, currentLanguage, pageType, suffix, extraLanguages) {
		const visibleLanguages = desiredLanguagesFor(pageType, currentLanguage, extraLanguages);
		select.onchange = null;
		select.removeAttribute('onchange');
		select.innerHTML = '';
		visibleLanguages.forEach(function (itemLanguage) {
			if (itemLanguage === 'cn' && currentLanguage === 'cn') {
				addChineseVariantOptions(select, currentLanguage, suffix);
				return;
			}
			const option = document.createElement('option');
			option.value = pageUrlFor(itemLanguage, pageType, suffix);
			option.textContent = itemLanguage === 'cn' && currentLanguage !== 'cn'
				? '中文 (简繁)'
				: languageMeta[itemLanguage].label;
			option.dataset.language = itemLanguage;
			if (itemLanguage === currentLanguage) option.selected = true;
			select.appendChild(option);
		});
		select.addEventListener('change', function () {
			try {
				const selectedOption = select.options[select.selectedIndex];
				localStorage.setItem('preferredLanguage', selectedOption.dataset.language || (currentLanguage === 'cn' ? 'cn' : fallbackLanguage));
			} catch (error) {}
			const selectedValue = select.options[select.selectedIndex].value;
			if (selectedValue === chineseVariantValues.traditional) {
				setChineseVariant('traditional');
				return;
			}
			if (currentLanguage === 'cn' && selectedValue === buildPageUrl('cn', suffix)) {
				setChineseVariant('simplified');
				return;
			}
			window.location.href = selectedValue;
		});
		if (typeof adjustWidth === 'function') adjustWidth(select);
	};

	const chineseFlagCodes = function (visitorCountry) {
		const country = String(visitorCountry || '').toLowerCase();
		const chineseRules = flagRules.cn || {};
		if (currentChineseVariant() === 'traditional') {
			const rule = chineseRules.traditional || {};
			if ((rule.regionalFlags || []).includes(country)) return [country];
			if (country === 'cn') return rule.chinaFlags || ['cn', 'hk', 'mo'];
			return rule.defaultFlags || ['hk', 'mo'];
		}
		const rule = chineseRules.simplified || {};
		const sourceFlag = rule.sourceFlag || 'cn';
		return (rule.appendVisitorFor || []).includes(country) ? [sourceFlag, country] : [sourceFlag];
	};

	const languageFlagCodes = function (language, visitorCountry) {
		if (language === 'cn') return chineseFlagCodes(visitorCountry);
		const meta = languageMeta[language] || languageMeta.en;
		const rule = flagRules[language] || { mode: 'source-plus-language-visitor', appendVisitorFlag: true };
		const country = String(visitorCountry || '').toLowerCase();
		if (rule.mode === 'replace-source-with-visitor') {
			return country && meta.countries && meta.countries.includes(country) ? [country] : [meta.sourceFlag];
		}
		if (rule.appendVisitorFlag && country && country !== meta.sourceFlag && meta.countries && meta.countries.includes(country)) {
			return [meta.sourceFlag, country];
		}
		return [meta.sourceFlag];
	};

	const renderLanguageFlags = function (language, visitorCountry) {
		const meta = languageMeta[language] || languageMeta.en;
		const flagCodes = languageFlagCodes(language, visitorCountry);
		const flagLabel = language === 'cn' && currentChineseVariant() === 'traditional' ? '繁体中文' : meta.label;

		getLanguageSelects().forEach(function (select) {
			const container = ensureFlagContainer(select);
			if (!container) return;
			container.innerHTML = '';
			flagCodes.forEach(function (flagCode) {
				const img = document.createElement('img');
				setFlagImage(img, flagCode, flagLabel);
				container.appendChild(img);
			});
		});
	};

	const geoCountryCode = function (geo) {
		return String(geo && (geo.country || geo.countryCode || geo.country_code) || '').trim().toLowerCase();
	};

	const readCachedGeo = function (allowStale) {
		try {
			const refreshRequestedAt = Number(sessionStorage.getItem('entry_geo_refresh_requested_at'));
			const mustRefresh = Number.isFinite(refreshRequestedAt) && Date.now() - refreshRequestedAt < 60 * 1000;
			if (!allowStale && mustRefresh) return null;
			const cache = JSON.parse(localStorage.getItem('user_device_info'));
			if (cache && cache.geoInfo && geoCountryCode(cache.geoInfo) && (
				allowStale || (cache.geoTimestamp && Date.now() - cache.geoTimestamp < 10 * 60 * 1000)
			)) {
				return cache.geoInfo;
			}
		} catch (error) {}
		return null;
	};

	const fetchGeo = async function () {
		const cached = readCachedGeo();
		if (cached) return cached;
		const response = await fetch('https://ipinfo.io/json?token=228a7bb192c4fc');
		const data = await response.json();
		try {
			const cache = JSON.parse(localStorage.getItem('user_device_info')) || {};
			cache.geoInfo = data;
			cache.geoTimestamp = Date.now();
			localStorage.setItem('user_device_info', JSON.stringify(cache));
		} catch (error) {}
		try { sessionStorage.removeItem('entry_geo_refresh_requested_at'); } catch (error) {}
		return data;
	};

	window.updateChineseLanguageFlags = function () {
		const parts = pageParts();
		if (parts.language !== 'cn') return;
		const geo = readCachedGeo(true);
		renderLanguageFlags('cn', geoCountryCode(geo));
	};

	const applyLanguageNav = function (currentLanguage, pageType, suffix, extraLanguages, visitorCountry) {
		const selects = getLanguageSelects();
		if (!selects.length) return;
		const normalizedExtraLanguages = (extraLanguages || []).filter(function (language, index, list) {
			return supportedLanguages.includes(language) && list.indexOf(language) === index;
		});
		const navSignature = [currentLanguage, pageType, suffix || '', normalizedExtraLanguages.join(','), String(visitorCountry || '').toLowerCase()].join('|');
		if (applyLanguageNav.lastSignature === navSignature) return;
		applyLanguageNav.lastSignature = navSignature;

		selects.forEach(function (select) {
			renderLanguageOptions(select, currentLanguage, pageType, suffix, normalizedExtraLanguages);
		});
		renderLanguageFlags(currentLanguage, visitorCountry);
	};

	const initLanguageNav = function () {
		const selects = getLanguageSelects();
		if (!selects.length) return;

		const parts = pageParts();
		// 即使国家缓存已超过刷新周期，也先用它同步渲染菜单；网络刷新只负责更新后续状态。
		const cachedGeo = readCachedGeo(true);
		let currentCountryLanguages = languagesFromGeo(cachedGeo);
		applyLanguageNav(parts.language, parts.pageType, parts.suffix, currentCountryLanguages, geoCountryCode(cachedGeo));

		fetchGeo()
			.then(function (geo) {
				const countryLanguages = languagesFromGeo(geo);
				currentCountryLanguages = countryLanguages;
				applyLanguageNav(parts.language, parts.pageType, parts.suffix, countryLanguages, geoCountryCode(geo));
			})
			.catch(function () {
				applyLanguageNav(parts.language, parts.pageType, parts.suffix, currentCountryLanguages, geoCountryCode(cachedGeo));
			});

		let scrollTimer = null;
		window.addEventListener('scroll', function () {
			if (scrollTimer) window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(function () {
				const cachedGeo = readCachedGeo(true);
				const countryLanguages = languagesFromGeo(cachedGeo);
				if (!sameLanguageList(countryLanguages, currentCountryLanguages)) {
					currentCountryLanguages = countryLanguages;
					applyLanguageNav(parts.language, parts.pageType, parts.suffix, countryLanguages, geoCountryCode(cachedGeo));
				}
			}, 120);
		}, { passive: true });
	};

	const bootLanguageNav = function () {
		loadLanguageSelectionConfig().finally(initLanguageNav);
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bootLanguageNav);
	} else {
		bootLanguageNav();
	}
})();
