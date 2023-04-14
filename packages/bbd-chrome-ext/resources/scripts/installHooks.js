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
  oauthBygithub() {
    _postMessage({
      message: 'oauthBygithub'
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

  console.log('hooks message:', payload);
});

window['CHROME_EXT'] = {
  ...ext
}

console.log('CHROME_EXT injected');