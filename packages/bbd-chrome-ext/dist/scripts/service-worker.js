chrome.runtime.onInstalled.addListener(async () => {

  // 处理 action 点击事件
  chrome.action.onClicked.addListener((tab) => {
    console.log('current tab url:' + tab.url);

    // 新建或跳转到打开 codebuff 的 tab 页
    chrome.tabs.query({
      active: false,
      currentWindow: true,
      url: '*://*.codebuff.tech/*'
    }).then(tabs => {
      if (!tabs) throw new Error();
      const tab = tabs[0];
      chrome.tabs.update(tab.id, {
        active: true
      });
    }).catch(err => {
      chrome.tabs.create({
        url: 'https://codebuff.tech'
      });
    });
  });
 
  // 给 codebuff tab 页 绑定 popup
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log('tabs.onUpdated', changeInfo);
    if (tab.url.startsWith('https://codebuff.tech')) {
      console.log('setPopup');
      chrome.action.setPopup({
        popup: "popup/index.html",
        tabId
      });
    }
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request);
  }
);
