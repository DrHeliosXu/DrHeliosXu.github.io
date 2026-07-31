/*
 * 从 Unicode CLDR 的行政区数据生成页脚地点回退词典。
 * 下载源文件：/private/tmp/cldr-subdivision-containment.json 与 /private/tmp/cldr-subdivisions-*.xml
 * 仅保留本站支持的七个大面积国家及其全部一级行政区。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectRoot = path.resolve(__dirname, '..');
const temporaryDirectory = '/private/tmp';
const countries = ['CN', 'DE', 'JP', 'US', 'CA', 'AU', 'RU'];
const locales = {
	'ZH-CN': 'zh',
	'ZH-TW': 'zh_Hant',
	EN: 'en',
	DE: 'de',
	FR: 'fr',
	IT: 'it',
	ES: 'es',
	JA: 'ja',
	KO: 'ko',
	TH: 'th',
	VI: 'vi',
	RU: 'ru',
	AR: 'ar'
};

const decodeXml = (value) => String(value || '')
	.replace(/&amp;/g, '&')
	.replace(/&quot;/g, '"')
	.replace(/&apos;/g, "'")
	.replace(/&lt;/g, '<')
	.replace(/&gt;/g, '>');

const tongWenSandbox = {};
const tongWenSource = fs.readFileSync(path.join(projectRoot, 'js', 'bookmarklet_tw.js'), 'utf8');
vm.runInNewContext(
	tongWenSource.slice(0, tongWenSource.lastIndexOf('function convert_trad')),
	tongWenSandbox
);
const simplifiedToTraditional = tongWenSandbox.TongWen.s_2_t || {};

const toTraditionalChinese = (value) => Array.from(String(value || ''))
	.map((character) => simplifiedToTraditional[character] || character)
	.join('');

const parseSubdivisions = (locale) => {
	const xml = fs.readFileSync(path.join(temporaryDirectory, `cldr-subdivisions-${locale}.xml`), 'utf8');
	const entries = {};
	const pattern = /<subdivision\s+type="([^"]+)"[^>]*>([\s\S]*?)<\/subdivision>/g;
	let match;
	while ((match = pattern.exec(xml))) entries[match[1].toLowerCase()] = decodeXml(match[2].trim());
	return entries;
};

const shortenChinese = (value, traditional) => {
	let result = String(value || '');
	if (traditional) {
		return result
			.replace(/維吾爾自治區|壯族自治區|回族自治區|自治區|特別行政區/g, '')
			.replace(/邊疆區|共和國|聯邦直轄市|省|州|市|縣|县$/g, '')
			.trim();
	}
	return result
		.replace(/维吾尔自治区|壮族自治区|回族自治区|自治区|特别行政区/g, '')
		.replace(/边疆区|共和国|联邦直辖市|省|州|市|县|縣$/g, '')
		.trim();
};

const shortenRegionalName = (value, language) => {
	let result = String(value || '').trim();
	if (!result) return result;

	if (language === 'EN') return result
		.replace(/^(State|Province|Republic) of\s+/i, '')
		.replace(/\s+(Autonomous Region|Autonomous Okrug|Federal City|Prefecture|Province|State|Territory|District|Krai|Oblast|Republic)$/i, '')
		.replace(/\s+(Hui|Uygur|Zhuang)$/i, '')
		.trim();
	if (language === 'DE') return result
		.replace(/^(Freistaat|Republik|Land|Präfektur)\s+/i, '')
		.replace(/\s+(Oblast|Region|Krai|Autonomer Kreis|Präfektur)$/i, '')
		.trim();
	if (language === 'FR') return result
		.replace(/^(Province|État|République|Préfecture|Territoire)\s+(de |du |des )?/i, '')
		.replace(/\s+(autonome|territoire|province|région)$/i, '')
		.trim();
	if (language === 'IT') return result
		.replace(/^(Provincia|Regione|Stato|Repubblica|Prefettura|Territorio)\s+(di |del |della )?/i, '')
		.replace(/\s+(autonoma|autonomo|provincia|regione)$/i, '')
		.trim();
	if (language === 'ES') return result
		.replace(/^(Provincia|Estado|República|Prefectura|Territorio)\s+(de |del |de la )?/i, '')
		.replace(/\s+(autónoma|autónomo|provincia|estado|territorio)$/i, '')
		.trim();
	if (language === 'JA') return result
		.replace(/(回族自治区|維吾爾自治区|チワン族自治区|自治区|自治州|自由州|共和国|特別自治市|特別自治道|[都道府県州])$/u, '')
		.trim();
	if (language === 'KO') return result
		.replace(/(특별자치도|특별자치시|특별시|광역시|자치구|자치도|자치시|\s+(후이족|위구르족|좡족)?\s*자치구|\s+공화국|도|시|주|현)$/u, '')
		.trim();
	if (language === 'TH') return result.replace(/^(เขตปกครองตนเอง|สาธารณรัฐ|รัฐ|จังหวัด)\s*/u, '').trim();
	if (language === 'VI') return result.replace(/^(Tỉnh|Thành phố|Lãnh thổ|Cộng hòa)\s+/iu, '').trim();
	if (language === 'RU') return result
		.replace(/^(Республика|Край|Область|Автономный округ)\s+/iu, '')
		.replace(/(?:-Хуэйский|-Уйгурский|-Чжуанский)?\s+автономный район$/iu, '')
		.replace(/\s+(край|область|республика|автономный округ)$/iu, '')
		.trim();
	if (language === 'AR') return result.replace(/^(ولاية|إقليم|جمهورية|مقاطعة)\s+/u, '').trim();
	return result;
};

const englishAlias = (value) => String(value || '')
	.replace(/^(State|Province|Republic) of\s+/i, '')
	.replace(/\s+(Autonomous Region|Autonomous Okrug|Federal City|Prefecture|Province|State|Territory|District|Krai|Oblast|Republic)$/i, '')
	.replace(/\s+(Hui|Uygur|Zhuang)$/i, '')
	.trim();

const containment = JSON.parse(fs.readFileSync(path.join(temporaryDirectory, 'cldr-subdivision-containment.json'), 'utf8'))
	.supplemental.subdivisionContainment;
const translations = Object.fromEntries(Object.entries(locales).map(([key, locale]) => [key, parseSubdivisions(locale)]));
const output = {};

for (const country of countries) {
	const codes = (containment[country]._contains || []).map((code) => String(code).toLowerCase());
	output[country] = {};
	for (const code of codes) {
		const englishName = translations.EN[code] || code.toUpperCase();
		const names = { aliases: [] };
		for (const [target, source] of Object.entries(translations)) {
			let value = source[code] || englishName;
			if (target === 'ZH-CN') value = shortenChinese(value, false);
			if (target === 'ZH-TW') {
				const traditionalValue = translations['ZH-CN'][code] || value;
				value = shortenChinese(toTraditionalChinese(traditionalValue), true);
			}
			value = shortenRegionalName(value, target);
			names[target] = value;
		}
		const aliases = new Set([
			code.slice(2).toUpperCase(),
			englishName,
			englishAlias(englishName),
			names.DE,
			names.EN
		]);
		names.aliases = [...aliases].filter((alias) => alias && alias !== englishName);
		output[country][englishName] = names;
	}
}

fs.writeFileSync(
	path.join(projectRoot, 'js', 'region_name.json'),
	`${JSON.stringify(output, null, 2)}\n`,
	'utf8'
);
console.log(`Generated ${Object.values(output).reduce((total, regions) => total + Object.keys(regions).length, 0)} regional entries.`);
