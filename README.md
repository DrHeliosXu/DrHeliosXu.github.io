# DrHeliosXu.github.io

## 站点维护

在项目根目录执行：

```bash
npm run maintain
npm run validate:site
npm run test:smoke
```

- `maintain`：统一清理未使用资源引用、插入调试开关，并生成 canonical 与 hreflang 标签。
- `validate:site`：校验本地链接与资源、canonical/hreflang、标题、描述和 `lang` 属性。
- `test:smoke`：使用 Playwright 对桌面 Chromium 与移动 WebKit 执行核心页面冒烟测试。

生产环境默认不输出自定义调试日志。临时调试可在 URL 后追加 `?debug=1`，或在浏览器控制台执行：

```js
localStorage.setItem('site-debug', '1');
```
