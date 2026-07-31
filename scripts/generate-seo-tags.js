#!/usr/bin/env node

/** 为所有公开语言页面维护 canonical、hreflang、description 与有效 lang 属性。 */
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const site = 'https://dr.h-xu.com';
const languages = {
  cn: { hreflang: 'zh-CN', lang: 'zh-CN' },
  en: { hreflang: 'en', lang: 'en' },
  de: { hreflang: 'de', lang: 'de' },
  es: { hreflang: 'es', lang: 'es' },
  fr: { hreflang: 'fr', lang: 'fr' },
  it: { hreflang: 'it', lang: 'it' },
  jp: { hreflang: 'ja', lang: 'ja' },
  kr: { hreflang: 'ko', lang: 'ko' },
  ru: { hreflang: 'ru', lang: 'ru' },
  th: { hreflang: 'th', lang: 'th' },
  ar: { hreflang: 'ar', lang: 'ar', dir: 'rtl' },
  vi: { hreflang: 'vi', lang: 'vi' }
};
const pages = ['home', 'about', 'research', 'projects', 'news'];
const descriptions = {
  cn: ['徐泓的个人学术网站，聚焦可再生能源、氢能、燃料电池、能源系统与能源政策。', '徐泓的个人简介、教育经历、学术活动与联系方式。', '徐泓的研究领域、论文、专利与学术成果。', '徐泓参与的科研、工程与国际合作项目。', '徐泓的学术活动、演讲、会议与新闻动态。'],
  en: ['Academic website of Dr. Hong Xu, focused on renewable energy, hydrogen, fuel cells, energy systems and policy.', 'Biography, education, academic activities and contact details for Dr. Hong Xu.', 'Research fields, publications, patents and academic outcomes of Dr. Hong Xu.', 'Research, engineering and international collaboration projects involving Dr. Hong Xu.', 'Academic activities, talks, conferences and news from Dr. Hong Xu.'],
  de: ['Akademische Website von Dr. Hong Xu zu erneuerbaren Energien, Wasserstoff, Brennstoffzellen, Energiesystemen und Energiepolitik.', 'Biografie, Ausbildung, akademische Aktivitäten und Kontaktdaten von Dr. Hong Xu.', 'Forschungsgebiete, Publikationen, Patente und wissenschaftliche Ergebnisse von Dr. Hong Xu.', 'Forschungs-, Ingenieur- und internationale Kooperationsprojekte von Dr. Hong Xu.', 'Akademische Aktivitäten, Vorträge, Konferenzen und Nachrichten von Dr. Hong Xu.'],
  es: ['Sitio académico del Dr. Hong Xu sobre energías renovables, hidrógeno, pilas de combustible, sistemas energéticos y política energética.', 'Biografía, formación, actividades académicas y contacto del Dr. Hong Xu.', 'Áreas de investigación, publicaciones, patentes y resultados académicos del Dr. Hong Xu.', 'Proyectos de investigación, ingeniería y colaboración internacional del Dr. Hong Xu.', 'Actividades académicas, conferencias y noticias del Dr. Hong Xu.'],
  fr: ['Site académique du Dr Hong Xu consacré aux énergies renouvelables, à l’hydrogène, aux piles à combustible, aux systèmes énergétiques et aux politiques énergétiques.', 'Biographie, formation, activités académiques et coordonnées du Dr Hong Xu.', 'Domaines de recherche, publications, brevets et résultats académiques du Dr Hong Xu.', 'Projets de recherche, d’ingénierie et de coopération internationale du Dr Hong Xu.', 'Activités académiques, conférences et actualités du Dr Hong Xu.'],
  it: ['Sito accademico del Dr. Hong Xu dedicato a energie rinnovabili, idrogeno, celle a combustibile, sistemi energetici e politiche energetiche.', 'Biografia, formazione, attività accademiche e contatti del Dr. Hong Xu.', 'Aree di ricerca, pubblicazioni, brevetti e risultati accademici del Dr. Hong Xu.', 'Progetti di ricerca, ingegneria e collaborazione internazionale del Dr. Hong Xu.', 'Attività accademiche, conferenze e notizie del Dr. Hong Xu.'],
  jp: ['再生可能エネルギー、水素、燃料電池、エネルギーシステム、エネルギー政策を研究する徐泓博士の学術サイト。', '徐泓博士の経歴、学歴、学術活動、連絡先。', '徐泓博士の研究分野、論文、特許、研究成果。', '徐泓博士が参加した研究、工学、国際協力プロジェクト。', '徐泓博士の学術活動、講演、会議、ニュース。'],
  kr: ['재생에너지, 수소, 연료전지, 에너지 시스템 및 에너지 정책을 연구하는 쉬훙 박사의 학술 웹사이트입니다.', '쉬훙 박사의 약력, 학력, 학술 활동 및 연락처입니다.', '쉬훙 박사의 연구 분야, 논문, 특허 및 연구 성과입니다.', '쉬훙 박사의 연구, 공학 및 국제 협력 프로젝트입니다.', '쉬훙 박사의 학술 활동, 강연, 학회 및 소식입니다.'],
  ru: ['Академический сайт доктора Хун Сюя: возобновляемая энергетика, водород, топливные элементы, энергетические системы и политика.', 'Биография, образование, академическая деятельность и контакты доктора Хун Сюя.', 'Научные направления, публикации, патенты и результаты доктора Хун Сюя.', 'Исследовательские, инженерные и международные проекты доктора Хун Сюя.', 'Академические мероприятия, выступления, конференции и новости доктора Хун Сюя.'],
  th: ['เว็บไซต์วิชาการของ ดร. Hong Xu ด้านพลังงานหมุนเวียน ไฮโดรเจน เซลล์เชื้อเพลิง ระบบพลังงาน และนโยบายพลังงาน', 'ประวัติ การศึกษา กิจกรรมทางวิชาการ และข้อมูลติดต่อของ ดร. Hong Xu', 'สาขาวิจัย ผลงานตีพิมพ์ สิทธิบัตร และผลงานวิชาการของ ดร. Hong Xu', 'โครงการวิจัย วิศวกรรม และความร่วมมือนานาชาติของ ดร. Hong Xu', 'กิจกรรมทางวิชาการ การบรรยาย การประชุม และข่าวสารของ ดร. Hong Xu'],
  ar: ['الموقع الأكاديمي للدكتور هونغ شو في الطاقة المتجددة والهيدروجين وخلايا الوقود وأنظمة وسياسات الطاقة.', 'السيرة الذاتية والتعليم والأنشطة الأكاديمية ووسائل التواصل للدكتور هونغ شو.', 'مجالات البحث والمنشورات وبراءات الاختراع والنتائج الأكاديمية للدكتور هونغ شو.', 'مشاريع البحث والهندسة والتعاون الدولي للدكتور هونغ شو.', 'الأنشطة الأكاديمية والمحاضرات والمؤتمرات وأخبار الدكتور هونغ شو.'],
  vi: ['Trang web học thuật của Tiến sĩ Từ Hoằng về năng lượng tái tạo, hydro, pin nhiên liệu, hệ thống và chính sách năng lượng.', 'Tiểu sử, học vấn, hoạt động học thuật và thông tin liên hệ của Tiến sĩ Từ Hoằng.', 'Lĩnh vực nghiên cứu, công bố, bằng sáng chế và thành tựu học thuật của Tiến sĩ Từ Hoằng.', 'Các dự án nghiên cứu, kỹ thuật và hợp tác quốc tế của Tiến sĩ Từ Hoằng.', 'Hoạt động học thuật, bài giảng, hội nghị và tin tức của Tiến sĩ Từ Hoằng.']
};

function fileName(locale, page) {
  return page === 'home' ? `${locale}.html` : `${locale}-${page}.html`;
}

function replaceManagedSeo(html, tags) {
  html = html.replace(/\s*<!-- seo:managed:start -->[\s\S]*?<!-- seo:managed:end -->\s*/i, '\n');
  return html.replace(/<\/head>/i, `${tags}\n</head>`);
}

function write(file, content) {
  if (fs.readFileSync(file, 'utf8') !== content) fs.writeFileSync(file, content);
}

for (const [locale, language] of Object.entries(languages)) {
  for (const [pageIndex, page] of pages.entries()) {
    const name = fileName(locale, page);
    const file = path.join(root, name);
    if (!fs.existsSync(file)) continue;

    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(/<html\b[^>]*>/i, `<html lang="${language.lang}"${language.dir ? ` dir="${language.dir}"` : ''}>`);
    const canonical = `${site}/${name}`;
    const alternates = Object.entries(languages)
      .filter(([otherLocale]) => fs.existsSync(path.join(root, fileName(otherLocale, page))))
      .map(([otherLocale, other]) => `  <link rel="alternate" hreflang="${other.hreflang}" href="${site}/${fileName(otherLocale, page)}">`)
      .join('\n');
    const tags = `\n  <!-- seo:managed:start -->\n  <meta name="description" content="${descriptions[locale][pageIndex]}">\n  <link rel="canonical" href="${canonical}">\n${alternates}\n  <link rel="alternate" hreflang="x-default" href="${site}/${fileName('en', page)}">\n  <!-- seo:managed:end -->`;
    html = replaceManagedSeo(html, tags);
    write(file, html);
  }
}

// 保留旧中文入口的独立 canonical，避免它缺少基础 SEO 标签；它不参与
// 规范语言页的 hreflang 集合，避免与 cn.html 形成重复的中文映射。
const legacyChinese = path.join(root, 'zh.html');
if (fs.existsSync(legacyChinese)) {
  let html = fs.readFileSync(legacyChinese, 'utf8');
  html = html.replace(/<html\b[^>]*>/i, '<html lang="zh-CN">');
  const tags = `\n  <!-- seo:managed:start -->\n  <meta name="description" content="徐泓的个人学术网站，聚焦可再生能源、氢能、燃料电池、能源系统与能源政策。">\n  <link rel="canonical" href="${site}/zh.html">\n  <!-- seo:managed:end -->`;
  html = replaceManagedSeo(html, tags);
  write(legacyChinese, html);
}

const entry = path.join(root, 'index.html');
if (fs.existsSync(entry)) {
  let html = fs.readFileSync(entry, 'utf8');
  html = html.replace(/<html\b[^>]*>/i, '<html lang="en">');
  const tags = `\n  <!-- seo:managed:start -->\n  <meta name="description" content="Multilingual entry page for the academic website of Dr. Hong Xu.">\n  <link rel="canonical" href="${site}/">\n${Object.entries(languages).map(([locale, language]) => `  <link rel="alternate" hreflang="${language.hreflang}" href="${site}/${fileName(locale, 'home')}">`).join('\n')}\n  <link rel="alternate" hreflang="x-default" href="${site}/index.html">\n  <!-- seo:managed:end -->`;
  html = replaceManagedSeo(html, tags);
  write(entry, html);
}
