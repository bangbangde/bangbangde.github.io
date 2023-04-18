/**
 * 发送消息 content script 可接收到
 */
function _postMessage(payload){
  window.postMessage(
    {
      type : "CODEBUFF_EXT_W",
      payload
    },
    "*"
  );
}

function installtHooks () {
  const hooks = {
    updateLocation(url) {
      this.updateLocation.href = url;
    }
  }
  
  window.addEventListener('message', ev => {
    if (ev.source !== window) return;
    if (ev.data?.type !== 'CODEBUFF_EXT_E') return;
  
    const payload = ev.data.payload;
  
    console.log('got content script message:', payload);
  
    if (hooks[payload.message]) {
      hooks[payload.message](payload.data);
    }
  });
}

function injectService() {
  const ext = {
    handleGithubOauth(objStr) {
      console.log('handleGithubOauth', objStr);
      _postMessage({
        message: 'handleGithubOauth',
        data: JSON.parse(objStr)
      })
    }
  }
  
  window['CB_EXT'] = {
    ...ext
  }
}

console.log('CHROME_EXT injected');
if (location.href.startsWith('https://next.codebuff.tech/api/oauth')) {
  _postMessage({
    message: 'handleGithubOauth',
    data: OAUTH_TOKEN
  });
  setTimeout(() => {
    window.close();
  }, 1000);
} else {
  installtHooks();
  injectService();
}