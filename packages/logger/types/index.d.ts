export interface RequestOptions {
  url: string
  data?: string | Record<string, unknown>
  method?: string
  timeout?: number
  header?: {
    [key: string]: unknown
  }
  [key: string]: unknown
}

export interface Setting {
  // 服务地址
  // 格式：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin#Examples
  origin: string

  // 是否向服务端发送日志数据
  sendData?: boolean

  // 数据发送防抖时间
  // 参阅：https://lodash.com/docs/4.17.15#debounce
  debounceTime?: number

  // 网络请求客户端，默认 wx.request
  // 或与 wx.request API 一致的客户端
  // https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html
  requestClient?: (options: RequestOptions) => void

  // 请求客户端参数
  requestOptions?: Partial<RequestOptions>
}

export type LogName = 'debug' | 'log' | 'info' | 'warn' | 'error'

export type LogArgs = unknown[]

export interface ErrorTypeMessage {
  $$e: 1
  msg: string
  stack?: string
}

export type LogMessage = (
  | string
  | number
  | boolean
  | undefined
  | null
  | ErrorTypeMessage
)[]

export interface Log {
  t: number
  l: number
  m: LogMessage
}
