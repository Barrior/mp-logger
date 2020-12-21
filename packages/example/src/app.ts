import './app.scss'

import logger from '@mp-logger/logger'
import { Setting } from '@mp-logger/logger/types'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'

class App extends Component<{ children: React.ReactNode }> {
  onLaunch() {
    logger.initSetting({
      origin: 'http://localhost:3030',
      sendData: true,
      debounceTime: 200,
      requestClient: Taro.request as Setting['requestClient'],
      requestOptions: {
        timeout: 3000,
      },
    })
  }

  componentDidMount() {
    logger.log('[App Component]: componentDidMount')
  }

  componentDidShow() {
    logger.log('[App Component]: componentDidShow')
  }

  componentDidHide() {
    logger.log('[App Component]: componentDidHide')
  }

  componentDidCatchError() {
    logger.log('[App Component]: componentDidCatchError')
  }

  render() {
    return this.props.children
  }
}

export default App
