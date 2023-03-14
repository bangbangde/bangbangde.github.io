---
title: "CSS3 项目样式表文件结构组织"
descripttion: ""
tags: [css3]
categories: [note, css]
created: 2023-03-13-18:50:17
updated: 2023-03-13-18:50:17
draft: false
---
# CSS3 项目样式表文件结构组织

参考 VitePress 的组织方式，样式文件及相关资源都放在 theme-xxx 目录下。

关键在于：
- 合理提取变量到 vars.css
- 自定义 字体 的应用
- 组件使用独立样式文件


```
.
└─ theme-default
   ├─ fonts
   └─ styles
      ├─ components      # 独立组件样式
      │  ├─ comp-a.css
      │  └─ comp-b.css
      ├─ lib-override    # 覆盖某些样式库的样式
      │  └─ sth.css
      ├─ base.css        # 样式重置代码
      ├─ fonts.css       # 定义 font-family
      ├─ utils.css       # 一些通用/工具类样式
      └─ vars.css        # 全站变量
```

### vars.css

比较考验经验的应该是如何合理地设置变量。应足够灵活但要避免滥用。


按照惯例，应使用 `项目前缀-类型前缀-变量名` 的原则来命名变量，有利于使用变量时 IDE 的智能提示。

此外，还应按功能、模块将变量进行分组管理，提高可维护性。

VP 的 vars.css 大致结构如下，可做参考：

```css

/* 
 * Colors Base
 *
 * 基础颜色预设，一般仅被其他颜色变量引用后赋予语义或计算新颜色。
*/
:root {
  --demo-c-white: #ffffff;
}

/*
 * Colors Theme
 *
 * 颜色主题，定义一些供页面使用的颜色变量，不同 主题/模式 会重写部分或全部这里变量。
 * 一般包括 字体色、背景色、边框色等
*/
:root {
  --demo-c-bg: #ffffff;
}

/* 夜晚模式 */
.dark {
  --demo-c-bg: #000000；
}

/* Typography 字体 */
:root {
 --demo-font-family-base: Roboto;
}

/* Shadows 阴影 */
:root {
  --demo-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}

/* 
 * Z-indexes 统一管理 z-index 
 *
 * 如果遇到样式库有滥用的 z-index, 应编写覆盖代码将其调整为正常值
*/
:root {
  --vp-z-index-local-nav: 10;
  --vp-z-index-nav: 20;
  --vp-z-index-layout-top: 30;
  --vp-z-index-backdrop: 40;
  --vp-z-index-sidebar: 50;
  --vp-z-index-footer: 60;
}

/* Icons */
:root {
  --demo-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
  --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
}

```