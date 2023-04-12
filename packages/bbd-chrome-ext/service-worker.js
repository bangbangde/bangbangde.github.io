function nav2codebuff() {
  location.href="https://codebuff.tech"
}

chrome.runtime.onInstalled.addListener(async () => {
  chrome.action.onClicked.addListener((tab) => {
    console.log('current tab url:' + tab.url);

    if (tab.url.startsWith('chrome://newtab/')) {
        chrome.tabs.update({
          url: 'https://codebuff.tech'
        })
    }
    if (
      tab.url.includes('codebuff.tech') ||
      tab.url.startsWith('chrome://')
    ) {
      return;
    }
    
    chrome.tabs.create({
      url: 'https://codebuff.tech'
    });
  });
 
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes('codebuff.tech')) {
      console.log('setPopup')
      chrome.action.setPopup({
        popup: "popup/index.html",
        tabId
      });
    }
  });
});