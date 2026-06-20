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
    thai_buddhist: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' }  // 佛历
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
    thai_buddhist: 'th-TH-u-ca-buddhist' // 使用泰国佛教历
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

///////////////////

(function() {
  // 星座配置体系
  const zodiacConfig = {
    formats: {
      en: { names: ['Capricorn ♑︎', 'Aquarius ♒︎', 'Pisces ♓︎', 'Aries ♈︎', 'Taurus ♉︎', 'Gemini ♊︎', 'Cancer ♋︎', 'Leo ♌︎', 'Virgo ♍︎', 'Libra ♎︎', 'Scorpio ♏︎', 'Sagittarius ♐︎'] },
	  tb: { names: ['གླང་ཆེན་ ♑︎', 'ཆུ་སྲིན་ ♒︎', 'ཉ་མོ། ♓︎', 'གླང་ཆེན་ ♈︎', 'བོང་བུ། ♉︎', 'གྷེ་མི་ནི་ ♊︎', 'སྐྲན་ནད། ♋︎', 'ལིའོ་ ♌︎', 'བུ་མོ་ ♍︎', 'ལི་བཱར་ ♎︎', 'སྐར་མ ♏︎', 'དཀྱིལ་འཁོར་ ♐︎'] },
th: { names: ['ราศีมกร ♑︎', 'ราศีกุมภ์ ♒︎', 'ราศีมีน ♓︎', 'ราศีเมษ ♈︎', 'ราศีพฤษภ ♉︎', 'ราศีเมถุน ♊︎', 'ราศีกรกฎ ♋︎', 'ราศีสิงห์ ♌︎', 'ราศีกันย์ ♍︎', 'ราศีตุล ♎︎', 'ราศีพิจิก ♏︎', 'ราศีธนู ♐︎'] },
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
	  console.log('Scroll position:', window.scrollY); // 调试输出
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
	const officialLanguages = ['cn', 'en', 'es', 'fr', 'ru', 'ar'];
	const supportedExtraLanguages = ['de', 'it', 'jp', 'kr', 'th'];
	const supportedLanguages = officialLanguages.concat(supportedExtraLanguages);

	const languageMeta = {
		cn: { label: '中文', sourceFlag: 'cn', countries: ['cn', 'hk', 'mo', 'tw'] },
		en: { label: 'English', sourceFlag: 'gb', countries: ['gb', 'us', 'ca', 'au', 'nz', 'ie', 'za', 'in', 'sg', 'hk'] },
		es: { label: 'Español', sourceFlag: 'es', countries: ['es', 'mx', 'ar', 'bo', 'cl', 'co', 'cr', 'cu', 'do', 'ec', 'gt', 'hn', 'ni', 'pa', 'pe', 'py', 'sv', 'uy', 've'] },
		fr: { label: 'Français', sourceFlag: 'fr', countries: ['fr', 'be', 'mc', 'ca'] },
		ru: { label: 'Русский', sourceFlag: 'ru', countries: ['ru', 'by', 'kz', 'kg', 'tj'] },
		ar: { label: 'اللغة العربية', sourceFlag: 'Arab_League', countries: ['dz', 'bh', 'km', 'dj', 'eg', 'iq', 'jo', 'kw', 'lb', 'ly', 'mr', 'ma', 'om', 'ps', 'qa', 'sa', 'so', 'sd', 'sy', 'tn', 'ae', 'ye'] },
		de: { label: 'Deutsch', sourceFlag: 'de', countries: ['de', 'at', 'ch', 'li', 'lu'] },
		it: { label: 'Italiano', sourceFlag: 'it', countries: ['it', 'ch', 'sm', 'va'] },
		jp: { label: '日本語', sourceFlag: 'jp', countries: ['jp'] },
		kr: { label: '한국어', sourceFlag: 'kr', countries: ['kr'] },
		th: { label: 'ไทย', sourceFlag: 'th', countries: ['th'] }
	};

	const countryLanguageAdditions = {
		ch: ['de', 'fr', 'it'],
		lu: ['de', 'fr'],
		sg: ['en', 'cn'],
		hk: ['cn', 'en']
	};

	const languageSortGroups = {
		eastAsia: ['cn', 'jp', 'kr', 'th'],
		western: ['de', 'en', 'es', 'fr', 'it', 'ru'],
		last: ['ar']
	};

	const chineseVariantValues = {
		simplified: 'javascript:runJianTiJavaScript();',
		traditional: 'javascript:runFanTiJavaScript();'
	};

	const pageParts = function () {
		const fileName = (window.location.pathname.split('/').pop() || 'en.html').replace(/\.html$/i, '');
		if (fileName === 'zh') {
			return { language: 'cn', suffix: '' };
		}
		const match = fileName.match(/^([a-z]{2})(-.+)?$/i);
		if (!match || !supportedLanguages.includes(match[1])) {
			return { language: 'en', suffix: '' };
		}
		return { language: match[1], suffix: match[2] || '' };
	};

	const desiredLanguagesFor = function (language, currentLanguage, extraLanguages) {
		let languages = officialLanguages.includes(language) ? officialLanguages.slice() : officialLanguages.slice().concat(language);
		if (supportedLanguages.includes(currentLanguage) && !languages.includes(currentLanguage)) {
			languages.push(currentLanguage);
		}
		(extraLanguages || []).forEach(function (extraLanguage) {
			if (supportedLanguages.includes(extraLanguage) && !languages.includes(extraLanguage)) {
				languages.push(extraLanguage);
			}
		});
		languages = languages.filter(function (item, index) {
			return supportedLanguages.includes(item) && languages.indexOf(item) === index;
		});

		const eastAsianLanguages = languageSortGroups.eastAsia.filter(function (item) {
			return languages.includes(item);
		});
		const lastLanguages = languageSortGroups.last.filter(function (item) {
			return languages.includes(item);
		});
		const westernLanguages = languageSortGroups.western.filter(function (item) {
			return languages.includes(item);
		});
		const otherLanguages = languages
			.filter(function (item) {
				return !eastAsianLanguages.includes(item) && !westernLanguages.includes(item) && !lastLanguages.includes(item);
			});

		return eastAsianLanguages.concat(westernLanguages, otherLanguages, lastLanguages);
	};

	const browserLanguage = function () {
		const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
		for (const browserLocale of browserLanguages) {
			const locale = String(browserLocale || '').toLowerCase();
			if (locale.indexOf('zh') === 0) return 'cn';
			if (locale.indexOf('ja') === 0) return 'jp';
			if (locale.indexOf('ko') === 0) return 'kr';
			if (locale.indexOf('th') === 0) return 'th';
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

	const languagesFromCountry = function (countryCode) {
		const code = String(countryCode || '').toLowerCase();
		if (!code) return [];
		const languages = [];
		supportedLanguages.forEach(function (language) {
			if (languageMeta[language].countries.includes(code)) {
				languages.push(language);
			}
		});
		(countryLanguageAdditions[code] || []).forEach(function (language) {
			if (!languages.includes(language)) languages.push(language);
		});
		return languages;
	};

	const buildPageUrl = function (language, suffix) {
		return `${language}${suffix || ''}.html`;
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
	};

	const addChineseVariantOptions = function (select, currentLanguage, suffix) {
		const simplifiedOption = document.createElement('option');
		simplifiedOption.value = buildPageUrl('cn', suffix);
		simplifiedOption.textContent = '简体中文';
		if (currentLanguage === 'cn' && currentChineseVariant() === 'simplified') simplifiedOption.selected = true;
		select.appendChild(simplifiedOption);

		const traditionalOption = document.createElement('option');
		traditionalOption.value = chineseVariantValues.traditional;
		traditionalOption.textContent = '繁体中文';
		if (currentLanguage === 'cn' && currentChineseVariant() === 'traditional') traditionalOption.selected = true;
		select.appendChild(traditionalOption);
	};

	const renderLanguageOptions = function (select, menuLanguage, currentLanguage, suffix, extraLanguages) {
		const visibleLanguages = desiredLanguagesFor(menuLanguage, currentLanguage, extraLanguages);
		select.onchange = null;
		select.removeAttribute('onchange');
		select.innerHTML = '';
		visibleLanguages.forEach(function (itemLanguage) {
			if (itemLanguage === 'cn' && currentLanguage === 'cn') {
				addChineseVariantOptions(select, currentLanguage, suffix);
				return;
			}
			const option = document.createElement('option');
			option.value = buildPageUrl(itemLanguage, suffix);
			option.textContent = languageMeta[itemLanguage].label;
			if (itemLanguage === currentLanguage) option.selected = true;
			select.appendChild(option);
		});
		select.addEventListener('change', function () {
			try {
				sessionStorage.setItem('manual_language_choice', '1');
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

	const renderLanguageFlags = function (language) {
		const meta = languageMeta[language] || languageMeta.en;

		getLanguageSelects().forEach(function (select) {
			const container = ensureFlagContainer(select);
			if (!container) return;
			container.innerHTML = '';
			const img = document.createElement('img');
			setFlagImage(img, meta.sourceFlag, meta.label);
			container.appendChild(img);
		});
	};

	const readCachedGeo = function () {
		try {
			const cache = JSON.parse(localStorage.getItem('user_device_info'));
			if (cache && cache.geoInfo && cache.geoTimestamp && Date.now() - cache.geoTimestamp < 3600 * 1000) {
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
		return data;
	};

	const maybeRedirectToBrowserLanguage = function (language, suffix) {
		const targetUrl = buildPageUrl(language, suffix);
		const currentFile = window.location.pathname.split('/').pop() || '';
		let manualChoice = false;
		try {
			manualChoice = sessionStorage.getItem('manual_language_choice') === '1';
		} catch (error) {}
		if (manualChoice || currentFile === targetUrl) return false;

		const redirectKey = `browser_language_redirect:${suffix || 'home'}`;
		try {
			if (sessionStorage.getItem(redirectKey) === language) return false;
			sessionStorage.setItem(redirectKey, language);
		} catch (error) {}

		window.location.replace(targetUrl);
		return true;
	};

	const applyLanguageNav = function (menuLanguage, currentLanguage, suffix, extraLanguages) {
		const selects = getLanguageSelects();
		if (!selects.length) return;
		const normalizedExtraLanguages = (extraLanguages || []).filter(function (language, index, list) {
			return supportedLanguages.includes(language) && list.indexOf(language) === index;
		});
		const navSignature = [menuLanguage, currentLanguage, suffix || '', normalizedExtraLanguages.join(',')].join('|');
		if (applyLanguageNav.lastSignature === navSignature) return;
		applyLanguageNav.lastSignature = navSignature;

		selects.forEach(function (select) {
			renderLanguageOptions(select, menuLanguage, currentLanguage, suffix, normalizedExtraLanguages);
		});
		renderLanguageFlags(currentLanguage);
	};

	const initLanguageNav = function () {
		const selects = getLanguageSelects();
		if (!selects.length) return;

		const parts = pageParts();
		const preferredLanguage = browserLanguage();
		const cachedGeo = readCachedGeo();
		let currentCountryLanguages = languagesFromCountry(cachedGeo && cachedGeo.country);
		applyLanguageNav(preferredLanguage, parts.language, parts.suffix, currentCountryLanguages);

		fetchGeo()
			.then(function (geo) {
				const countryLanguages = languagesFromCountry(geo && geo.country);
				if (!sameLanguageList(countryLanguages, currentCountryLanguages)) {
					currentCountryLanguages = countryLanguages;
					applyLanguageNav(preferredLanguage, parts.language, parts.suffix, countryLanguages);
				}
				maybeRedirectToBrowserLanguage(preferredLanguage, parts.suffix);
			})
			.catch(function () {
				applyLanguageNav(preferredLanguage, parts.language, parts.suffix, currentCountryLanguages);
				maybeRedirectToBrowserLanguage(preferredLanguage, parts.suffix);
			});

		let scrollTimer = null;
		window.addEventListener('scroll', function () {
			if (scrollTimer) window.clearTimeout(scrollTimer);
			scrollTimer = window.setTimeout(function () {
				const cachedGeo = readCachedGeo();
				const countryLanguages = languagesFromCountry(cachedGeo && cachedGeo.country);
				if (!sameLanguageList(countryLanguages, currentCountryLanguages)) {
					currentCountryLanguages = countryLanguages;
					applyLanguageNav(preferredLanguage, parts.language, parts.suffix, countryLanguages);
				}
			}, 120);
		}, { passive: true });
	};

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initLanguageNav);
	} else {
		initLanguageNav();
	}
})();
