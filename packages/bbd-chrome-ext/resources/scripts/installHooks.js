const _postMessage = payload => {
  window.postMessage(
    {
      type : "CODEBUFF_EXT_W",
      payload
    },
    "*"
  );
}

const ext = {
  handleGithubOauth(objStr) {
    console.log('handleGithubOauth', objStr);
    _postMessage({
      message: 'handleGithubOauth',
      data: JSON.parse(objStr)
    })
  }
}

const hooks = {
  updateLocation(url) {
    this.updateLocation.href = url;
  }
}

window.addEventListener('message', ev => {
  if (ev.source !== window) return;
  if (ev.data?.type !== 'CODEBUFF_EXT_E') return;

  const payload = ev.data.payload;

  console.log('content script message:', payload);

  if (hooks[payload.message]) {
    hooks[payload.message](payload.data);
  }
});

window['CB_EXT'] = {
  ...ext
}

console.log('CHROME_EXT injected');