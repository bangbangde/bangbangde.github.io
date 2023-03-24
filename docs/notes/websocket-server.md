---
title: "简单实现一个 websocket server"
descripttion: ""
tags: [websocket, nodejs, net]
categories: [others]
created: "2023-03-23 13:43:53"
updated: "2023-03-23 13:43:53"
draft: true
---
::: warning
This is a draft.
:::

# 简单实现一个 websocket server

::: tip 参考
[rfc6455](https://datatracker.ietf.org/doc/rfc6455/?include_text=1)

[MDN guide](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers)
:::

## websocket 协议
websocket 和 http 协议一样，都是基于 TCP 连接建立的应用层协议，最大不同之处在于 ws 是长连接，握手完成后保持 tcp 连接，双方都可以主动发送消息。

实现一个最小 ws server，
需要实现下述逻辑：

1. 握手
2. 数据解析

### 握手
WS 的握手逻辑很简单，由 ws client 发起一个 `http get` 请求到 ws server`

```
GET /chat HTTP/1.1
Host: example.com:8000
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13
```

其中 `Connection` 和 `Upgrade` 表明这是一个请求将 http 协议升级为 websocket 协议的请求。

`Sec-WebSocket-Key` 是此次握手的密钥，需要在响应中按照一定的规则转换编码后返回，供 wss client 校验。

作为 ws server 的最小实现，这里只要识别出下述这 3 个消息头，就进入握手逻辑

```
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
```

响应如下：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
```

::: info
`Sec-WebSocket-Accept` 生成方法：
1. 将请求头 `Sec-WebSocket-Key` 的值与 Magic String `258EAFA5-E914-47DA-95CA-C5AB0DC85B11` 拼接起来
2. 计算其 SHA-1 hash 值
3. 再将该 hash 值进行 base64 编码
:::

ws client 收到响应并校验通过则判定为握手成功。（TODO:// 服务端似乎发了响应之后就认为握手成功了？）

后续消息不再使用 HTTP 协议，升级为 websocket。

### 数据解析

ws 每次发送的数据称作一个帧（Frame），格式如下：

```
Frame format:

      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-------+-+-------------+-------------------------------+
     |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
     |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
     |N|V|V|V|       |S|             |   (if payload len==126/127)   |
     | |1|2|3|       |K|             |                               |
     +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
     |     Extended payload length continued, if payload len == 127  |
     + - - - - - - - - - - - - - - - +-------------------------------+
     |                               |Masking-key, if MASK set to 1  |
     +-------------------------------+-------------------------------+
     | Masking-key (continued)       |          Payload Data         |
     +-------------------------------- - - - - - - - - - - - - - - - +
     :                     Payload Data continued ...                :
     + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
     |                     Payload Data continued ...                |
     +---------------------------------------------------------------+
```

第一个字节（0-7位）包括：

- FIN (0): 表明该 frame 是否是一系列数据中的最后一帧（过大的数据会切割为多个 frame 发送）
- RSV1,RSV2,RSV3 (1-3): 扩展用可以忽略
- opcode (4-7): 指示如何处理 Payload Data，不同值的含义如下：
  - ``

## 使用 nodejs 实现一个 ws 最小 server

```js
import crypto from "node:crypto";
import { Socket } from "node:dgram";
import net from "node:net";
import { join } from "node:path";
import { EventEmitter } from "node:stream";
import { buffer } from "stream/consumers";

interface WSSOptions {
  port?: number // default 8567
  debug?: boolean
}

export interface Message {
  from: 'client'|'server',
  msg: Buffer,
  time: number,
  isString: boolean
}

export interface Connection extends EventEmitter {
  id: string
  connectedAt: number
  status: string
  remoteAddress: string | undefined
  messages: Array<Message>
  frameCache: {
    isString: boolean,
    data: Buffer
  } | null
  send: (data: Buffer, isString: boolean) => void
}

// declare module ws {
//   class WebSocketServer extends EventEmitter {
//     on(event: 'connection', listener: (conn:Connection) => void): this;
//   }
// }

//////////////////////
// helper functions //
//////////////////////

function getSecWebsocketKey(data: string){
  const lines = data.split('\r\n');
  let key = "";
  lines.some(text => {
    if (text.startsWith('Sec-WebSocket-Key')) {
      key = text.split(':')[1].trim();
      return true;
    }
  })
  return key;
}

function getSecWebSocketAccept(key: string) {
  const MAGIC_STRING = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  return crypto.createHash('sha1')
  .update(key + MAGIC_STRING)
  .digest('base64');
}

const unmask = (buffer: Buffer, mask: Buffer) => {
  const length = buffer.length;
  for (var i = 0; i < length; i++) {
      buffer[i] ^= mask[i & 3];
  }
}

function genSocketId() {
  const date = new Date();
  return String(date.getDate()).padStart(2, "0")
    + String(date.getMinutes()).padStart(2, "0")
    + String(date.getSeconds()).padStart(2, "0")
    + Math.random().toString(32).substring(2);
}

function checkUpgrade(data: Buffer) {
  const dataString = data.toString();
  return dataString.includes('Upgrade: websocket');
}

function sendMessage(socket: net.Socket, data: Buffer, isString = true) {
  // 向客户端回复一条消息（需要编码成合法的数据帧）
  var responsePayloadLength = data.length;
  var responseFrame;

  if (responsePayloadLength < 126) {
    responseFrame = Buffer.alloc(responsePayloadLength + 2); 
    responseFrame[1] |= responsePayloadLength;
    data.copy(responseFrame, 2);
  } else {
    // 未处理数据大于 64位 长度的情况
    responseFrame = Buffer.alloc(responsePayloadLength + 4); 
    responseFrame[1] |= 126;
    responseFrame.writeUInt16BE(responsePayloadLength, 2);
    data.copy(responseFrame, 4);
  }
  
  responseFrame[0] |= parseInt(isString ? "10000001": "10000010", 2); 
  
  socket.write(responseFrame); 
}

/**
 * 简易专用 websocket 服务
 */
export class WebSocketServer extends EventEmitter {

  on(event: 'connection', listener: (conn:Connection) => void): this;
  on(event: string, listener: (...args: any[]) => void) {
    super.on(event, listener);
    return this;
  }

  protected options: WSSOptions;
  protected server: net.Server;

  // private socketsMap: WeakMap<net.Socket, string> = new WeakMap();
  private wsConnections: Map<string, Connection> = new Map();

  constructor(options: WSSOptions) {
    super();
    const port = options.port = options.port || 8567;
    this.options = options;
    this.server = this.createServer();
    if (options.debug) {
      this.server.on('listening', () => console.log(`\n;;;\n[tcp server]:on listening]\n;;;`));
      this.server.on('connection', () => console.log(`\n;;;\n[tcp server]:on connection]\n;;;`));
      this.server.on('error', (err) => console.log(`\n;;;\n[tcp server]:on error]\n;;;`, err));
      this.server.on('close', () => console.log(`\n;;;\n[tcp server]:on close]\n;;;`));
      this.server.on('drop', () => console.log(`\n;;;\n[tcp server]:on drop]\n;;;`));
    }
    this.server.listen(port);
  }

  private createServer() {
    return net.createServer(
      this.handleConnect.bind(this)
    );
  }

  private handleConnect(connection: net.Socket) {
    console.log('tcp connected!');

    const id = genSocketId();

    if (this.options.debug) {
      const eventNames = [ 'connect', 'ready', 'data', 'timeout', 'end', 'error', 'close' ];
      eventNames.forEach(e => {
        connection.on(e, (...args) => {
          console.log(`\n;;;\n[debug:socket[new]:on ${e}]\n;;;`, ...args);
        })
      })
    }

    connection.on('data', this.handleSourceData.bind(this, id, connection));
  }

  /**
   * 处理原始消息
   */
  private handleSourceData(id: string, socket: net.Socket, data: Buffer) {

    if (!!this.wsConnections.get(id)) {
      const connInfo = this.wsConnections.get(id);
      connInfo && this.handleWebsocketMessage(connInfo, socket, data);
      return;
    }

    if (checkUpgrade(data)) {
      this.handleUpgrade(socket, data);
      const send = sendMessage.bind(null, socket);
      const connInfo: Connection = new (class extends EventEmitter {
        constructor() {
          super();

          Object.assign(this, {
            id,
            status: 'connect',
            connectedAt: Date.now(),
            remoteAddress: socket.remoteAddress,
            messages: [],
            frameCache: null,
            send
          });
        }
      }) as Connection;

      this.wsConnections.set(id, connInfo);

      [ 'connect', 'ready', 'data', 'timeout', 'end', 'error', 'close' ].forEach(e => {
        socket.on(e, (...args) => {
          connInfo.status = e;
        })
      });

      this.emit('connection', connInfo);
      return;
    }

    socket.write(Buffer.from(
      [
        'HTTP/1.1 400 Bad Request',
        '\r\n'
      ].join('\r\n')
    ));
    socket.end();
  }

  /**
   * 最简化握手逻辑
   */
  handleUpgrade(socket: net.Socket, data: Buffer) {
    const dataString = data.toString();
    const key = getSecWebsocketKey(dataString);
    const secWebSocketAccept = getSecWebSocketAccept(key);
    let res = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      `Sec-WebSocket-Accept: ${secWebSocketAccept}`,
      'Connection: Upgrade',
      '\r\n'
    ].join('\r\n');
    socket.write(res);
  }

  handleWebsocketMessage(conn: Connection, socket: net.Socket, buffer: Buffer) {
    let fin = (buffer[0] & 0b10000000) === 0b10000000; // 是否是最后一帧
    let opcode = buffer[0] & 0b00001111; // 操作码 0x0表示接上一帧 0x1表示文本，0x2表示二进制
    let mask = (buffer[1] & 0b10000000) === 0b10000000; // 是否有掩码
    let payloadLength = buffer[1] & 0b01111111; // 负载长度
    let maskKey: Buffer;
    let payloadData: Buffer;

    if (!mask) {
      // 如果客户端发送的消息没有掩码则关闭连接
      console.log('非法的数据帧', Array.from(buffer).map(v => v.toString(2)),join(' '));
      socket.end();
      return;
    }

    if (opcode === 0x8) {
      // 如果操作码是0x8，表示关闭连接请求
      console.log('客户端请求关闭连接');
      socket.end();
      return;
    }

    if (payloadLength === 126) {
      payloadLength = Number('0b' + Array.from(Uint8Array.prototype.slice.call(buffer, 2, 4)).map(v => v.toString(2)).join(''));
      maskKey = Uint8Array.prototype.slice.call(buffer, 4, 8) as Buffer;
      payloadData = Uint8Array.prototype.slice.call(buffer, 8) as Buffer;
    } else if (payloadLength === 127) {
      payloadLength = Number('0b' + Array.from(Uint8Array.prototype.slice.call(buffer, 2, 10)).map(v => v.toString(2)).join());
      maskKey = Uint8Array.prototype.slice.call(buffer, 10, 14) as Buffer;
      payloadData = Uint8Array.prototype.slice.call(buffer, 14) as Buffer;
    } else {
      maskKey = Uint8Array.prototype.slice.call(buffer, 2, 6) as Buffer;
      payloadData = Uint8Array.prototype.slice.call(buffer, 6) as Buffer;
    }

    var decodedData = Buffer.alloc(payloadLength);
    for (var i = 0; i < payloadLength; i++) {
      decodedData[i] = payloadData[i] ^ maskKey[i % 4];
    }

    if (opcode === 1 || opcode === 2) {
      if (fin) {
        conn.messages.push({
          from: 'client',
          time: Date.now(),
          msg: decodedData,
          isString: opcode === 1
        });
      } else {
        conn.frameCache = {
          isString: opcode === 1,
          data: decodedData
        };
      }
    } else if(opcode === 0) {
      if (conn.frameCache) {
        conn.frameCache.data = Buffer.concat([
          conn.frameCache.data,
          decodedData
        ]);
      } else {
        console.error('unexpected frame droped');
        return;
      }
      if (fin) {
        conn.messages.push({
          from: 'client',
          time: Date.now(),
          isString: conn.frameCache.isString,
          msg: conn.frameCache.data
        })
      }
    }

    if (fin) {
      const message = conn.messages[conn.messages.length - 1];
      conn.emit('message', message);
    }
  }

  sendMessageTo(id: string, data: Buffer, isString = true) {
    const conn = this.wsConnections.get(id);
    if (conn == null) {
      throw new Error('the id (' + id + ') was not found.');
    }
    if (['end', 'close'].includes(conn.status)) {
      throw new Error('the socket (' + id + ') was closed.');
    }
    conn.send(data, isString);
  }

  sendMessageToAll(data: Buffer, isString = true) {
    this.wsConnections.forEach(conn => conn.send(data, isString));
  }
}
```