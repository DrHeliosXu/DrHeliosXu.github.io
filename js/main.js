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
        dateStr = dateStr.replace(/(\d+)\. (\d+)\. (\d+)\./, '$1년 $2월 $3일');
        break;
      case 'arabic': // 阿拉伯语数字修正
        dateStr = dateStr.replace(/،/g, ' - '); // 替换阿拉伯语逗号
        break;
    }

    // 自定义日期格式
    let dateParts = now.toLocaleDateString(locales[lang], config.date).split(' ');
    if(lang === 'english') dateParts = [dateParts[0], dateParts[1], dateParts[2]]; // 调整英语顺序
    //if(lang === 'german') dateParts[0] = dateParts[0].replace('.', ''); // 去除德语日期点号
	if(lang === 'german') dateParts[1] = dateParts[1].replace('.', ''); // 去除德语日期点号

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
      zh: { names: ['摩羯', '水瓶', '双鱼', '白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手'] },
      ja: { names: ['山羊', '水瓶', '魚座', '牡羊', '牡牛', '双子', '蟹座', '獅子', '乙女', '天秤', '蠍座', '射手'] },
      ko: { names: ['염소자리', '물병자리', '물고기자리', '양자리', '황소자리', '쌍둥이자리', '게자리', '사자자리', '처녀자리', '천칭자리', '전갈자리', '궁수자리'] },
      fr: { names: ['Capricorne', 'Verseau', 'Poissons', 'Bélier', 'Taureau', 'Gémeaux', 'Cancer', 'Lion', 'Vierge', 'Balance', 'Scorpion', 'Sagittaire'] },
	  it: { names: ['Capricorno', 'Acquario', 'Pesci', 'Ariete', 'Toro', 'Gemelli', 'Cancro', 'Leone', 'Vergine', 'Bilancia', 'Scorpione', 'Sagittario'] },  
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
	italian: 'it',
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








document.addEventListener('scroll', function () {
    const simplifiedNavbar = document.getElementById('simplifiedNavbar');
    const scrollThreshold = 100; // 滚动的触发距离

    if (window.scrollY > scrollThreshold) {
        simplifiedNavbar.classList.add('active'); // 添加显示的类
    } else {
        simplifiedNavbar.classList.remove('active'); // 移除显示的类
    }
});




// JavaScript to adjust the width based on the selected option
function adjustWidth(selectElement) {
    const tempSelect = document.createElement('select');
    tempSelect.style.visibility = 'hidden';
    document.body.appendChild(tempSelect);

    const selectedOption = selectElement.options[selectElement.selectedIndex];
    tempSelect.innerHTML = `<option>${selectedOption.text}</option>`;
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

adjustWidth(contentListElement);
adjustWidth(contentList2Element);
adjustWidth(languagesElement);
adjustWidth(languages2Element);
adjustWidth(languages3Element);

contentListElement.addEventListener('change', () => adjustWidth(contentListElement));
contentList2Element.addEventListener('change', () => adjustWidth(contentList2Element));
languagesElement.addEventListener('change', () => adjustWidth(languagesElement));
languages2Element.addEventListener('change', () => adjustWidth(languages2Element));
languages3Element.addEventListener('change', () => adjustWidth(languages3Element));

window.addEventListener('resize', () => {
    adjustWidth(contentListElement);
	 adjustWidth(contentList2Element);
    adjustWidth(languagesElement);
	adjustWidth(languages2Element);
	adjustWidth(languages3Element);
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