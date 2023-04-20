import Connect from "./scripts/connect";

const conn = new Connect();
const request = async data => await chrome.runtime.sendMessage(data);

function installHooks() {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = chrome.runtime.getURL("resources/scripts/installHooks.js");
  const anchorNode = document.getElementsByTagName('script')[0];
  anchorNode.parentNode.insertBefore(script, anchorNode);
}

function handleMessage(ev) {
  console.log('[content script] on message:', ev);
}

conn.addHandler(handleMessage);
installHooks();