const MESSAGE_TYPE = "CB_EXT";

/**
 * 适用于 content script 与 注入 js 间通信
 */

function messageListener(ev) {
  const {type, from, payload, responseTo} = ev.data || {};

  if (
    ev.source !== window ||
    type !== this.messageType ||
    from === this.id
  ) return;

  // 处理 request 响应
  if (responseTo) {
    const handler = this.handlersWaitingResp.get(responseTo);
    if (handler) {
      this.handlersWaitingResp.delete(responseTo);
      handler(payload);
    }
    return;
  }

  // 其他消息分发给 handlers
  this.handlers.forEach(fn => {
    fn(ev.data);
  });
}

class Connect {

  id = Math.random().toString(32).substring(2);
  timeout = 1500;
  messageType = MESSAGE_TYPE;
  handlers = new Set();
  handlersWaitingResp = new Map();

  constructor(params = {}) { 
    if (params.id) this.id = params.id;
    if (params.timeout) this.timeout = params.timeout;

    this._messageListener = messageListener.bind(this);
    window.addEventListener('message', this._messageListener);
  }

  send(payload, cb, { responseTo, timeout = this.timeout}) {
    let timeId = null;
    const requestId = Math.random();
    const expectResponse = !!cb;

    window.postMessage(
      {
        type : this.messageType,
        expectResponse,
        requestId,
        responseTo,
        from: this.id,
        payload
      },
      "*"
    );

    if (cb) {
      this.handlersWaitingResp.set(requestId, res => {
        clearTimeout(timeId);
        cb(null, res);
      });

      timeId = setTimeout(() => {
        cb(new Error('timeout:' + timeout), null);
      }, timeout);
    }
  }

  request(payload, timeout = this.timeout) {
    return new Promise((resolve, reject) => {
      this.send(payload, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }, timeout);
    })
  }

  addHandler(fn) {
    this.handlers.add(fn);
  }

  removeHandler() {
    this.handlers.delete(fn);
  }

  destroy() {
    window.removeEventListener('message', this._messageListener);
  }
}

const conn = new Connect();

function installHooks() {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = chrome.runtime.getURL("scripts/installHooks.js");
  const anchorNode = document.getElementsByTagName('script')[0];
  anchorNode.parentNode.insertBefore(script, anchorNode);
}

function handleMessage(ev) {
  console.log('[content script] on message:', ev);
  if (ev.payload === 'hello') {
    conn.send('hello', null, {responseTo: ev.requestId});
  }
}

conn.addHandler(handleMessage);
installHooks();
