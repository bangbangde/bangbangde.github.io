const script = document.createElement('script');
script.src = chrome.runtime.getURL("resources/scripts/installHooks.js");
const anchorNode = document.getElementsByTagName('script')[0];
anchorNode.parentNode.insertBefore(script, anchorNode);