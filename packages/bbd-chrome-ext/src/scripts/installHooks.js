import Connect, { actions } from "../../scripts/lib/connect";

const conn = new Connect({
  id: 'injected script',
  timeout: 1500
});

if (location.href.startsWith('https://next.codebuff.tech/api/oauth')) {
  // 如果是 oauth 回调页则将拿到的 token 发送给 content script。
  conn.send({
    action: 'handleGithubOauth',
    params: OAUTH_TOKEN
  });
  setTimeout(() => {
    window.close();
  }, 1000);
} else {
  conn.addHandler(ev => {
    const {payload} = ev;
    console.log('on message:', ev);
  });

  conn.request('hello').then(res => {
    crossOriginIsolated.log('codebuff hooks installed', res);
  }).catch(err => {
    console.error('超时未响应');
  })
}
