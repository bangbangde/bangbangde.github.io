---
title: ''
description: ''
tags: [overview]
categories: [vitepress]
created: '2023-3-12 1:48:29'
updated: '2023-3-12 1:48:29'
---
# VitePress 使用记录

### - 修改 project root 为 `/`

将构建脚本修改如下，即将根目录作为 project root。

```json
{
  "dev": "vitepress dev",
  "build": "vitepress build",
  "preview": "vitepress preview"
}
```

### - 修改 source root 为 `/docs`

新建 `.vitepress/config.js` 内容如下：

```js
export default {
  srcDir: 'docs'
}
```
