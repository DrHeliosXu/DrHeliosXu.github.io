# 静态模板系统重构报告

生成时间：2026-06-20T01:57:25.840Z

## 1. 迁移概览

- 原始页面数量：57
- 新模板数量：7
- 新组件数量：7
- CSS 文件数量：6
- JS 文件数量：12
- JSON 数据文件数量：10
- i18n 语言数量：11
- 已提取文本字段数量：84
- 已提取图片/视频注册项数量：21
- 输出页面数量：66

## 2. 已完成内容

- 已备份根目录 HTML 到 `archive/original-html-20260620-014225/`。
- 已创建独立 `website/` 模板系统，不覆盖现有站点。
- 已建立 `src/templates/` 页面模板：home、about、research、projects、news、video。
- 已建立公共组件：Header、Navigation、LanguageSwitcher、Hero、Metrics、Footer、PaperCard、ProjectCard、NewsCard。
- 已建立 `src/i18n/*.json`，当前包含 cn、en、de、fr、it、es、ja、ko、ru、ar、th。
- 已建立 `public/data/*.json`，包括 assets-registry、metrics、papers、projects、news、patents、videos、social-links、visitor-stats、languages。
- 已建立外部 CSS 分层：variables、global、layout、components、pages、responsive。
- 已建立外部 JS 模块：main、language-switcher、visitor-stats、i18n、assets、router、components/*、pages/*。
- 已实现 `validate-i18n.js`，构建前检查所有语言 key 完全一致。
- 已实现 `validate-assets.js`，构建前检查 registry 中的资源路径存在。
- 已实现 `build-pages.js`，同一套模板生成 `dist/<language>/` 页面。
- 已实现 `fetch-visitor-stats.js`，抓取失败时保留旧数据，不中断构建。

## 3. 验证结果

- `node scripts/validate-i18n.js` 通过。
- `node scripts/validate-assets.js` 通过。
- `node scripts/build-pages.js` 通过。
- 已生成 `website/dist/cn/index.html`、`about.html`、`research.html`、`projects.html`、`news.html`、`video.html`。
- 已生成 11 种语言，共 66 个 HTML 页面。
- 抽查 `dist/cn/index.html`：无 `<style>`、无 `style=`、无 `javascript:` URL，只保留外部 `type=module` JS 引用。

## 4. 已发现但未完全处理的问题

- 原站有 57 个根目录 HTML，内容量非常大。本次已建立可运行模板系统并迁移核心首页、研究、新闻、项目、论文、专利、页脚、访客统计数据，但部分长篇 about 多语种正文、历史注释块、旧页面特有模块仍需继续拆成结构化 JSON。
- 当前部分非中文 i18n value 使用第一版可维护翻译或英文兜底，后续需要人工审校。
- 当前视觉已按现有首页视频 Hero、深蓝指标条、深蓝页脚方向复刻，但尚未逐像素对齐所有旧语言页面。
- 原站存在大量历史内联脚本和样式；新系统已隔离到外部文件，但旧根目录 HTML 尚未替换。
- FlagCounter 抓取脚本受网络和第三方页面结构影响，失败时会保留旧 JSON 数据。

## 5. 后续维护方式

- 修改导航、按钮、标题、页脚文案：编辑 `website/src/i18n/<lang>.json`。
- 新增语言：复制 `cn.json`，翻译 value，在 `public/data/languages.json` 注册语言。
- 修改论文：编辑 `website/public/data/papers.json`。
- 修改新闻：编辑 `website/public/data/news.json`。
- 修改项目：编辑 `website/public/data/projects.json`。
- 修改指标：编辑 `website/public/data/metrics.json`。
- 修改图片、视频、logo：编辑 `website/public/data/assets-registry.json`，资源放入 `website/public/assets/`。
- 更新访客统计：运行 `npm run fetch:visitors`。
- 构建站点：进入 `website/` 后运行 `npm run build` 或直接运行 `node scripts/build-pages.js`。

## 6. 建议的下一步

1. 继续把旧 `*-about.html` 中的长文本拆成 `i18n.about.sections[]`。
2. 继续把所有论文、新闻、项目从旧 HTML 完整抽到 JSON。
3. 用 Playwright 对比旧 `cn.html` 与新 `website/dist/cn/index.html` 的桌面和移动截图。
4. 确认新系统完全覆盖旧页面后，再考虑将 `website/dist` 接入 GitHub Pages 发布流程。
