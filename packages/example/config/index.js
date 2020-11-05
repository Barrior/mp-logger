const path = require('path')
const { mergeWith, isArray } = require('lodash')

const config = {
  projectName: 'Example',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [path.join(__dirname, './createSitemap.js')],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          // 设定转换尺寸上限
          limit: 1024,
        },
      },
      cssModules: {
        // 默认为 false，如需使用 css modules 功能，则设为 true
        enable: true,
        config: {
          // 转换模式，取值为 global/module
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        // 默认为 false，如需使用 css modules 功能，则设为 true
        enable: true,
        config: {
          // 转换模式，取值为 global/module
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
}

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

module.exports = function () {
  const dynamicConfig =
    process.env.NODE_ENV === 'development'
      ? require('./dev')
      : require('./prod')

  return mergeWith(config, dynamicConfig, customizer)
}
