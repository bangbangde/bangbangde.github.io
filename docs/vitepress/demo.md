# vitepress markdown cheatsheet

## 链接
站内链接和外链都会被预处理

### 站内链接
```md
[回到首页](/index.md) <!-- 绝对路径（注意根目录是 config.srcDir  ） -->
[回到首页](../index.md) <!-- 相对路径 -->
[支持html后缀](/index.html)
[省略后缀](/index)
[省略index](/)
[页内锚点跳转](#测试锚点)
[他页锚点跳转](/#heading)
```
> 注意看，以 `/` 结尾表示省略 index，否则表示省略后缀。

-[回到首页](/index.md) <!-- 绝对路径（注意根目录是 config.srcDir  ） --> 
-[回到首页](../index.md) <!-- 相对路径 --> 
-[支持html后缀](/index.html) 
-[省略后缀](/index) 
-[省略index](/) 
-[页内锚点跳转](#测试锚点) 
-[他页锚点跳转](/#heading)

### 外链
```md
[baidu](https://baidu.com)
```
[baidu](https://baidu.com)

> 默认在新页面打开

## Front matter
```md
---
title: 未命名
lang: zh
---
```

## 表格
```md
| A | B | C |
| - |:-:| - |
| a | b | c |
```
| A | B | C |
| - |:-:| - |
| a | b | c |

## Emoji
```md
:100:
:tada:
```
:100:
:tada:

> [全部 emoji](./emoji.md)

## 目录 
Table of Contents
```md
[[toc]]
```
[[toc]]

## 自定义容器
```md
     类型
      ⬇️ 
::: info
this is an info box with default title
:::
         标题
          ⬇️
::: info Attention
this is an info box with title "Attention"
:::
```

标题默认是大写的类型

支持的类型有：
- info
- tip
- warning
- danger
- details

::: info
this is an info box with default title
:::
::: info Attention
this is an info box with title "Attention"
:::
::: tip
tip
:::
::: warning
warning
:::
::: danger
danger
:::
::: details
details
:::

::: raw
Wraps in a <div class="vp-raw">搞不懂</div>
:::

## 测试锚点
[点击返回](#站内链接)
