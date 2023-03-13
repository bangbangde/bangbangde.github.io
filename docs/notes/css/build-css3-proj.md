---
title: "常规 CSS3 样式表组织结构"
descripttion: ""
tags: [css3]
categories: [note]
created: 2023-03-13-18:50:17
updated: 2023-03-13-18:50:17
draft: false
---
# 常规 CSS3 样式表组织结构

宜以主题组织样式表及相关资源：

```
.
└─ theme-default
   ├─ fonts
   └─ styles
      ├─ components
      │  ├─ comp-a.css
      │  └─ comp-b.css
      ├─ lib-override
      │  └─ element.css
      ├─ base.css
      ├─ fonts.css
      ├─ utils.css
      └─ vars.css
```

### base.css

样式重置代码


### fonts.css

使用 @font-face 自定义 font-family

### utils

一些通用样式

### vars.css

定义全站使用的变量

不同区块、组件的变量分开写，并详细注释。变量应使用统一的项目、组件、区块的前缀。


如：
```css

/* 基础颜色 */
:root {
  --demo-c-white: #ffffff;
  --demo-c-black: #000000;
}

/*
  语义化的颜色变量
  不同的主题、模式会覆写这些变量
*/
:root {
  --demo-c-bg: #ffffff;
}

/**
  夜晚模式下覆写语义颜色变量
*/
.dark {
  --demo-c-bg: #000000；
}

/* 其他的各方面的变量： */

/* Typography 字体 */
:root {

}
```