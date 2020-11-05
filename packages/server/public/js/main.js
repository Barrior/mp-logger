const socket = window.io({
  transports: ['websocket'],
})

const LEVEL_MAP = {
  0: {
    type: 'debug',
    color: '#333',
  },
  1: {
    type: 'log',
    color: '#333',
  },
  2: {
    type: 'info',
    color: 'blue',
  },
  3: {
    type: 'warn',
    color: 'yellow',
  },
  4: {
    type: 'error',
    color: 'red',
  },
}

socket.on('connect', function () {
  console.info('socket is connected, id: ', socket.id)
})

socket.on('disconnect', function () {
  console.warn('socket has been disconnected!')
})

socket.on('message', function (data) {
  data.forEach(function (item) {
    try {
      const level = LEVEL_MAP[item.l]
      const time = window.dayjs(item.t).format('HH:mm:ss')
      const messages = [`[${time}]`]

      item.m.forEach(function (msg) {
        if (msg && msg.$$e) {
          // 错误信息打印错误栈
          messages.push(msg.stack || msg.msg)
        } else {
          messages.push(msg)
        }
      })

      console[level.type].apply(console, messages)
    } catch (e) {
      console.warn('数据格式错误：', e)
    }
  })
})

const vConsole = new window.VConsole({
  defaultPlugins: [],
  onReady() {
    vConsole.show()
  },
})
