---
title: "/cheatsheets/typescript"
descripttion: ""
tags: []
categories: []
created: "2023-03-15 13:23:18"
updated: "2023-03-15 13:23:18"
draft: true
---
::: warning
This is a draft.
:::

# /cheatsheets/typescript

## 初始化项目

### 安装 ts
```bash
npm install typescript --save-dev
```

### 新建 tsconfig.json

```json [tsconfig.json]
{
  "compilerOptions": {
    "outDir": "./built",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

或使用命令生成
```
npx tsc --init
```

### 安装相关类型

比如 node 环境以及 dom 环境
```
npm i -D \
  @types/node \
  @types/jsdom
```