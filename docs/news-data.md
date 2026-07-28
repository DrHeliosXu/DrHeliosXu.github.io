# 新闻数据维护

新闻仅维护在 `data/news.json`；页面通过 `node scripts/build-news.js <语言代码>` 构建。

每条新闻按事件而非按语言存放：

```json
{
  "id": "news-2026-03-23-fr-1",
  "yearId": "year-2026-1",
  "date": "2026-03-23",
  "country": "fr",
  "flag": "images/wflags/fr.png",
  "city": {
    "id": "paris",
    "names": { "cn": "巴黎", "en": "Paris", "de": "Paris" }
  },
  "media": [],
  "translations": {
    "cn": {
      "visible": true,
      "dateLabel": "2026年03月23日",
      "title": "国际能源署 IEA 能源数据统计研讨会",
      "topic": "Energy Data Statistics Workshop",
      "venue": "线上",
      "organizer": "IEA"
    }
  }
}
```

- `date` 是唯一用于排序及未来事件隐藏的 ISO 日期。
- `country` 用于右上角国家筛选，保持两位小写国家代码。
- `flag` 使用波浪形页脚/时间线旗帜路径，不在页面中硬编码。
- `city.names` 从 `js/city_name.json` 导入；词典没有翻译时回退英文名称。
- `venue` 只写具体会场或“线上”，不重复城市或国家。
- 每种语言用 `translations.<locale>.visible` 独立控制是否在该语言页面显示。
- `visible: true` 的未来事件仍会由前端根据 `date` 自动隐藏，到日期当天才显示。
- `media` 可保存 2 至 3 张新闻配图；目前页面保留占位，不会强制渲染。

新增或修改新闻后，执行：

```bash
node scripts/validate-news.js
node scripts/build-news.js cn
```

对应语言的数据完成后，再构建相应页面，例如：

```bash
node scripts/build-news.js en
```
