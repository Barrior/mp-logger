import logger from '@mp-logger/logger'
import { Text, View } from '@tarojs/components'
import React, { Component } from 'react'

import styles from './index.module.scss'

export default class Index extends Component {
  componentDidMount() {
    logger.info('[HOME_PAGE]: componentDidMount')
  }

  componentWillUnmount() {
    logger.info('[HOME_PAGE]: componentWillUnmount')
  }

  componentDidShow() {
    logger.info('[HOME_PAGE]: componentDidShow')
  }

  componentDidHide() {
    logger.info('[HOME_PAGE]: componentDidHide')
  }

  onInfo = (): void => {
    logger.info('消息提醒：这是一条信息')
  }

  onWarn = (): void => {
    logger.warn('警告提醒', { success: false, message: '用户未找到' })
  }

  onError = (): void => {
    const errors = [
      Error,
      EvalError,
      RangeError,
      ReferenceError,
      SyntaxError,
      TypeError,
      URIError,
    ]
    const index = Math.floor(Math.random() * errors.length)
    logger.error('错误提醒：', new errors[index]('这是一个错误'))
  }

  render() {
    return (
      <View>
        <Text className={styles.text}>点击下面按钮，日志平台实时输出</Text>
        <View className="btn-info" onClick={this.onInfo}>
          信息信息
        </View>
        <View className="btn-warn" onClick={this.onWarn}>
          警告信息
        </View>
        <View className="btn-danger" onClick={this.onError}>
          错误信息
        </View>
      </View>
    )
  }
}
