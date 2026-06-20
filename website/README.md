# Dr. Helios Xu Website Template System

这是从原始多语言静态 HTML 站点拆分出来的第一版静态模板系统。

核心原则：

- 页面结构来自 `src/templates/` 和 `src/components/`
- 文案来自 `src/i18n/*.json`
- 图片、视频、logo、地图来自 `public/data/assets-registry.json`
- 论文、新闻、项目、专利、指标、访客数据来自 `public/data/*.json`
- 构建结果输出到 `dist/<language>/`

常用命令：

```bash
npm run validate:i18n
npm run validate:assets
npm run build
npm run dev
```

新增语言：

1. 复制 `src/i18n/cn.json`
2. 改名为新语言代码，例如 `pt.json`
3. 只翻译 value，不改 key
4. 在 `public/data/languages.json` 中加入语言元数据
5. 执行 `npm run validate:i18n && npm run build`
