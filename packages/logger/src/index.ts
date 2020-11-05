import isError from 'lodash/isError'
import { ValuesType } from 'utility-types'

import {
  Log,
  LogArgs,
  LogMessage,
  LogName,
  RequestOptions,
  Setting,
} from '../types'
import debounce from './debounce'

enum LogLevel {
  debug,
  log,
  info,
  warn,
  error,
}

class Logger {
  static defaultSetting = {
    origin: 'http://localhost',
    sendData: false,
    debounceTime: 100,
    requestClient: typeof wx !== 'undefined' && wx.request,
    requestOptions: {},
  }

  private setting: Required<Setting> = Logger.defaultSetting

  private logs: Log[] = []

  private apiAddress = '/cgi/logs'

  private sendDataDebounced?: () => void

  /**
   * 初始化 SDK 配置
   * @param setting 配置项
   */
  initSetting(setting: Setting) {
    this.setting = {
      ...Logger.defaultSetting,
      ...setting,
    }

    if (!this.setting.requestClient) {
      throw new Error('缺少 HTTP 客户端，请添加 request 参数')
    }

    // 一定时间一起发送日志数据，减少 HTTP 请求
    this.sendDataDebounced = debounce(this.sendData, this.setting.debounceTime)
  }

  /**
   * 向服务平台发送数据
   */
  private sendData() {
    const options: RequestOptions = {
      timeout: 10000,
      ...this.setting.requestOptions,
      url: this.setting.origin + this.apiAddress,
      method: 'POST',
      data: {
        // 浅复制一份日志数据，防止丢失
        d: [...this.logs],
      },
    }

    ;(options.header ??= {})['content-type'] = 'application/json'

    // 发送请求
    this.setting.requestClient(options)

    // 清空日志容器
    this.logs.length = 0
  }

  /**
   * 处理日志数据，一致化成接口格式
   * @param level 日志级别
   * @param args 日志数据
   */
  private handleLog(level: number, args: LogArgs) {
    // 配置不向服务端发送数据
    if (!this.setting.sendData) {
      console[LogLevel[level] as LogName](...args)
      return
    }

    const message: LogMessage = []

    args.forEach((item) => {
      if (isError(item)) {
        message.push({
          $$e: 1,
          msg: item.message,
          stack: item.stack,
        })
      } else {
        message.push(item as ValuesType<LogMessage>)
      }
    })

    // 收集日志
    this.logs.push({
      t: Date.now(),
      l: level,
      m: message,
    })

    this.sendDataDebounced?.()
  }

  debug(...args: LogArgs) {
    this.handleLog(LogLevel.debug, args)
  }

  log(...args: LogArgs) {
    this.handleLog(LogLevel.log, args)
  }

  info(...args: LogArgs) {
    this.handleLog(LogLevel.info, args)
  }

  warn(...args: LogArgs) {
    this.handleLog(LogLevel.warn, args)
  }

  error(...args: LogArgs) {
    this.handleLog(LogLevel.error, args)
  }
}

export default new Logger()
