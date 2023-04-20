/**
 * 适用于 content script 与 注入 js 间通信
 */

import CONST from "./constant";

export default class Connect {

  id = 'unknown';
  timeout = 1500;
  messageType = CONST.messageType;
  handlers = new Set();
  handlersWaitingResp = new Map();

  constructor(params = {}) {
    this.id = params.id || 'unknown';
    this.timeout = params.timeout || 1500;
    window.addEventListener('message', this._messageListener);
  }

  send(payload, cb, timeout = this.timeout) {
    let timeId = null;
    const requestId = Math.random();
    const expectResponse = !!cb;

    window.postMessage(
      {
        type : this.messageType,
        expectResponse,
        requestId,
        from: this.id,
        payload
      },
      "*"
    );

    if (cb) {
      handlersWaitingResponse.set(requestId, res => {
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

  _messageListener(ev) {
    const {type, payload, responseTo} = ev.data || {};

    if (
      ev.source !== window ||
      type !== this.messageType 
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
    })
  }

  destroy() {
    window.removeEventListener('message', this._messageListener);
  }
}

export const actions = {
  HANDLE_GITHUB_OAUTH_TOKEN: 'HANDLE_GITHUB_OAUTH_TOKEN'
}