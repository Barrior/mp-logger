import defaultConfig from './default'

const env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isAutotest: process.env.NODE_ENV === 'autotest',
}

const config = {
  ...defaultConfig,
  ...env,
}

// support pm2 multi instance with socket.io
// https://github.com/Unitech/pm2/issues/1510
config.port += parseInt(process.env.NODE_APP_INSTANCE || 0)

export default config
