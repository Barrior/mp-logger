# `@mp-logger/logger`

> 线上小程序实时日志 Debug 平台 SDK

1、安装

- 通过 NPM: `npm install @mp-logger/logger`
- 通过 CDN: https://unpkg.com/browse/@mp-logger/logger/lib/index.min.js

2、使用

```javascript
import logger from '@mp-logger/logger'

// 初始化配置，一次即可
logger.initSetting({
  origin: 'http://localhost:3030',
  sendData: NODE_ENV === 'development' ? false : true,
})

or:

App({
  onLaunch (options) {
    // 初始化配置，一次即可，通过运行环境及手动配置小程序附带参数 logDebug（推荐）
    logger.initSetting({
      origin: 'http://localhost:3030',
      sendData: !!(NODE_ENV === 'production' && options.query.logDebug),
    })
  }
})
```

```javascript
import logger from '@mp-logger/logger'

// 在任意位置调用，与 console 参数一致
logger.debug('调试')

logger.log('消息')

logger.info('消息')

logger.warn('警告')

logger.error('错误')
```

### initSetting 配置参数

- `origin`: `string`, 必填，服务器地址，`协议 + IP + 端口`，格式：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#Examples
- `sendData`: `boolean`, 可选，是否向服务端发送日志数据，本地开发可设置为 `false`。
- `debounceTime`: `number`, 可选，发送日志数据请求的防抖时间，默认 `100`，毫秒计。
- `requestClient`: `function`, 可选，网络请求客户端，默认为微信 `request`，或提供与微信 `request` [API](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html) 一致的客户端。
- `requestOptions`: `object`, 可选，客户端请求参数。
