---
title: "Q&A"
descripttion: "Q&A"
tags: ['Q&A']
categories: ['Q&A']
created: "2023-03-14 23:44:23"
updated: "2023-03-14 23:44:23"
draft: true
---
# Q&A

<!--
## [category] describe the question in short
::: details

:::

::: details Unanswered
:::
-->
## [web] http请求可以携带哪些cookie
::: details
搞清楚 domain、path、secure、samesite、priority 等 cookie 属性，是如何影响 http 请求是否携带该 cookie 的。
:::

::: details Unanswered
:::

## [general] Extensions 101 是什么意思
::: details
chrome extension docs 有一个章节叫做 "[Extensions 101](https://developer.chrome.com/docs/extensions/mv3/getstarted/extensions-101/)"，这个标题是什么意思？

:::

::: details Answered
在教育领域，“101” 一词常用于描述提供某一学科基础知识的介绍性课程。

PS：”创造101“ 和此有无关系不得而知。
:::

## [browser cache] 改变 query string 可以使静态文件缓存失效吗？
::: details
在浏览器中，给静态文件地址增加 query string 可以其缓存失效吗？
:::

::: details Answered
更改查询字符串不会使静态文件缓存失效。查询字符串是URL的一部分，它不会影响URL的缓存。
:::

## [CSS] 为什么设置高度100%不起作用？

::: details
上级元素均没有设置 height，但有一级设置了:

```
min-heignt: 100vh;
display: flex;
flex-direction: column;
```

其子元素及后代元素想要高度 100%，只能将其父元素都设置为 垂直方向的 flex 布局 并设置 `flex: 1 0 auto;`

为什么 `height: 100%;` 不生效呢？
:::

::: details Unanswered

:::