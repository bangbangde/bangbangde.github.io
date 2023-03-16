---
title: 使用 ASKII 字符绘制文件结构图
descripttion: ""
tags: [askii]
categories: [others]
created: 2023-03-13-19:14:54
updated: 2023-03-13-19:14:54
draft: false
---
# 手写目录结构图

## 示例
```
.
├─ dir
│  ├─ text.txt
│  └─ index.html
├─ base.css
├─ base.css
└─ fonts.css
```

## 结构字符

`.` `├─` `│` `└─`

::: info
为方便描述，本文将上述字符组合称为“结构字符”。
:::

## 手写技巧

```
<!-- 先把结构字符全部复制过来，后续可以从这里复制 -->
.
├─
│
└─
```
```
<!-- 展开子目录, 从上到下把最深的都绘制出来 -->
.
├─ dir
│  ├─ subDir
│  │  ├─── ssubDir
│  │  │    └─ end
│  │  └─end
│  └─ end
├─ end
└─ end
```

::: info
linux 下可以安装 `tree` 命令生成目录结构图

[在线树形目录小工具](https://devtool.tech/tree)
:::

