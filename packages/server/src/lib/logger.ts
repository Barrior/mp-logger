import pino from 'pino'

import config from '../config'

const logger = pino({
  prettyPrint: {
    translateTime: 'SYS:HH:MM:ss',
    colorize: true,
  },
})

export default config.isProd ? console : logger
