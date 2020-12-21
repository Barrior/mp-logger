# 线上小程序实时日志 Debug 平台

项目由 3 个小项目组成，分别为

- `packages/example`: 小程序使用示例。
- `packages/logger`: SDK，在小程序内使用。
- `packages/server`: 平台服务端。

### 使用 · 服务端

首先启动平台服务，进入 `packages/server` 目录。

1. 安装依赖：`npm install`。
1. 启动服务：`npm run start:prod`。

启动成功后便可访问以下地址：

- 平台实时日志面板：http://localhost:3030
- 模拟小程序体验地址：http://localhost:3030/demo.html

详细文档：[packages/server/README.md](packages/server/README.md)

### 使用 · 小程序示例

除了在线体验外，项目还提供了小程序实例 Demo，基于当前流行的小程序框架 Taro，切换至 `packages/example` 目录。

1. 安装依赖：`npm install`。
1. 启动小程序：`npm run dev:weapp`。
1. 将编译成功的 `dist` 目录导入小程序开发者工具即可。

详细文档：[packages/example/README.md](packages/example/README.md)

### 使用 · SDK

部署服务端成功后，需要在小程序内使用提供的 SDK 才能将实时日志打印在平台面板上。

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

详细文档：[packages/logger/README.md](packages/logger/README.md)
