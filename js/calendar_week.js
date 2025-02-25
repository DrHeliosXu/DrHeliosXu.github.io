// Real functional code in main.js, modifiy there does not work

(function() {
  const formatMap = {
    english: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    chinese: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, weekday: { weekday: 'short' }, separator: ' - ' },
    german: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    french: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    italian: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    spanish: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    russian: { date: { day: 'numeric', month: 'long', year: 'numeric' }, separator: ' - ' },
    japanese: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, separator: ' - ' },
    korean: { date: { year: 'numeric', month: 'numeric', day: 'numeric' }, separator: ' - ' }
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
    korean: 'ko-KR'
  };

  document.querySelectorAll('[class*="currentDateInLang"]').forEach(span => {
    const lang = span.getAttribute('language');
    const now = new Date();
    const config = formatMap[lang];
    
    // 自定义日期格式
    let dateParts = now.toLocaleDateString(locales[lang], config.date).split(' ');
    if(lang === 'english') dateParts = [dateParts[0], dateParts[1], dateParts[2]]; // 调整英语顺序
    if(lang === 'german') dateParts[0] = dateParts[0].replace('.', ''); // 去除德语日期点号
    
    const dateStr = lang === 'chinese' ? 
      `${dateParts[0]}年${dateParts[1]}月${dateParts[2]}日` :
      dateParts.join(' ');

    // 星期格式化
    const weekdayStr = now.toLocaleString(locales[lang], { weekday: 'long' });
    
    // 特殊语言处理
    let finalStr = `${dateStr}${config.separator}${weekdayStr}`;
    if(lang === 'spanish') finalStr = finalStr.replace(' de ', ' '); // 优化西班牙语格式
    if(lang === 'japanese') finalStr = finalStr.replace(' ', '年').replace(' ', '月') + '日';

    span.innerHTML = finalStr;
  });
})();