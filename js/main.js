 AOS.init({
 	duration: 800,
 	easing: 'slide',
 	once: true
 });

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
	};
	siteCarousel();

	var siteStellar = function() {
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
    arabic: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' } // 新增阿拉伯语配置
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
    arabic: 'ar-SA' // 新增阿拉伯语区域
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
        dateStr = dateStr.replace(/(\d+)\. (\d+)\. (\d+)/, '$1년 $2월 $3일');
        break;
      case 'arabic': // 阿拉伯语数字修正
        dateStr = dateStr.replace(/،/g, ' - '); // 替换阿拉伯语逗号
        break;
    }

    // 星期格式化
    const weekdayStr = now.toLocaleString(locales[lang], { weekday: 'long' });
    
    // 最终组合
    let finalStr = `${dateStr}${config.separator}${weekdayStr}`;
    
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
      en: { names: ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'] },
      zh: { names: ['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座'] },
      ja: { names: ['磨羯', '宝瓶', '双魚', '白羊', '金牛', '双児', '巨蟹', '獅子', '処女', '天秤', '天蝎', '人馬'] },
      ko: { names: ['염소자리', '물병자리', '물고기자리', '양자리', '황소자리', '쌍둥이자리', '게자리', '사자자리', '처녀자리', '천칭자리', '전갈자리', '궁수자리'] },
      fr: { names: ['Capricorne', 'Verseau', 'Poissons', 'Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire'] },
      de: { names: ['Steinbock', 'Wassermann', 'Fische', 'Widder', 'Stier', 'Zwillinge', 'Krebs', 'Löwe', 'Jungfrau', 'Waage', 'Skorpion', 'Schütze'] },
      es: { names: ['Capricornio', 'Acuario', 'Piscis', 'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo', 'Libra', 'Escorpio', 'Sagitario'] },
      ru: { names: ['Козерог', 'Водолей', 'Рыбы', 'Овен', 'Телец', 'Близнецы', 'Рак', 'Лев', 'Дева', 'Весы', 'Скорпион', 'Стрелец'] },
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
    german: 'de',
    spanish: 'es',
    russian: 'ru',
	arabic: 'ar' // 新增映射

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