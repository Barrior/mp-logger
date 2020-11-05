# 线上小程序实时日志 Debug 平台

项目由 3 个小项目组成，分别为

- `packages/example`: 小程序使用示例。
- `packages/logger`: SDK，在小程序内使用。
- `packages/server`: 平台服务端。

项目采用 monorepo 结构，基于 [lerna](https://github.com/lerna/lerna) + [yarn workspace](https://classic.yarnpkg.com/en/docs/cli/workspaces) 构建。

项目统一负责：
- 代码风格 -- 使用 `prettier` + `eslint`
- 编程语言 -- 使用 `typescript`，子项目应继承根目录的 `tsconfig.json`
- 版本发布 -- 使用 `lerna` + `conventional-changelog` 生成版本日志，并发布到 NPM
- 测试库 -- 使用 `jest`

子项目自行负责：
- 测试 -- 独立编写测试
- 文档说明 -- 独立 `README.md`

## 首次运行

1. 安装依赖

    ```bash
    yarn
    ```

2. 链接各子项目
    ```bash
    npx lerna bootstrap
    ```

3. 查看 `packages/` 下各子项目的 `README.md` 文件进行配置

## 子项目开发

### 添加新依赖

```bash
yarn workspace [package] add [dependency]
```

比如：

```bash
yarn workspace @mp-logger/server add socket.io
```

命令行有点长，故添加了简写方式：

```bash
yarn server add socket.io
```

### 更新版本

```bash
npx lerna version
```

### 发布版本

```bash
yarn lerna:publish
```

## SDK 开发

实时编译，并硬链接编译成功的文件到 `packages/server/public/js/sdk.min.js`

```bash
yarn logger run dev
```

## 服务端开发

```bash
yarn server run dev
```

## 小程序示例开发

```bash
yarn example run dev:weapp
```
