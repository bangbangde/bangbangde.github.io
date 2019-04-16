---
layout: post
title: Chrome 扩展
---

* 名为 `manifest.json` 的 manifest 文件是必须的，浏览器从这个文件获取扩展程序的相关信息，如扩展的文件路径和请求的权限等。

* 扩展程序的文件支持 相对路径 和 绝对路径 访问：`chrome-extension://<extensionID>/<pathToFile>`。在代码中可以使用 `chrome.runtime.getURL()` 获取 extensionID。

### 一个扩展程序通常包括以下几个部分：
  * Manifest
  * Background Script
    
    背景页是扩展程序的事件处理器，通常在这里监听一些浏览器的事件。脚本加载后便进入休眠状态，直到监听的某个浏览器事件发生。在执行完相关逻辑后便会被卸载再次进入休眠状态。
  
  * UI Elements
    * [browser action](https://developer.chrome.com/extensions/browserAction)
      
      browser action 代表用户对扩展程序可以进行的一些操作，表现为工具栏上的图标以及提示信息、角标和弹出页面。
      
    * [page action](https://developer.chrome.com/extensions/pageAction)
      
      page action 代表的是用户可以对 **当前页面** 可以进行的一些操作。表现形式和 browser action 类似：
      图标、提示、弹出页面，不同的是 page action 不支持角标，但是可以使图标变灰。
      
      ps:注意选择使用 browser action 还是 page action ，如果希望用户始终可以和扩展程序交互，请使用 browser action。
      
    * [context menus](https://developer.chrome.com/apps/contextMenus)
      
      向chrome的上下文菜单添加菜单项。
    * [omnibox](https://developer.chrome.com/extensions/omnibox)
      
      当用户在地址栏输入时与用户交互、提供建议选项等
  * Content Script
  
    脚本在当前页面的上下文中执行，可以访问页面 DOM 。
  * Options Pages
  
    扩展程序配置页面，提供配置项供用户使用来自定义扩展。
  
### APIs
除了可以调用常规web页面的api，扩展程序还可以调用浏览器提供的 扩展专用接口 [extension-specific APIs](https://developer.chrome.com/extensions/api_index)。

