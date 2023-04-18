
async function post2service(payload) {
  return await chrome.runtime.sendMessage(payload);
}

window.addEventListener('message', ev => {
  console.log('content script get message:', ev);
  if (ev.source !== window) return;
  if (ev.data?.type !== 'CODEBUFF_EXT_W') return;
  const payload = ev.data.payload;
  post2service(payload);
});

const script = document.createElement('script');
script.src = chrome.runtime.getURL("resources/scripts/installHooks.js");
const anchorNode = document.getElementsByTagName('script')[0];
anchorNode.parentNode.insertBefore(script, anchorNode);