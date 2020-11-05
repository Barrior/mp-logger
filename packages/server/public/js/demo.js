const logger = window.mpLogger

logger.initSetting({
  origin: location.origin,
  sendData: true,
  debounceTime: 200,
  requestClient: function (options) {
    options.type = options.method
    options.headers = options.header
    options.data = JSON.stringify(options.data)
    window.$.ajax(options)
  },
})

const errors = [
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
]

document.querySelector('.btn-info').addEventListener('click', function () {
  logger.info('消息提醒：这是一条用户基础消息', {
    username: 'Barrior',
    uid: Math.floor(Math.random() * 100),
  })
})

document.querySelector('.btn-warn').addEventListener('click', function () {
  logger.warn('警告提醒： ⚠️ 这是一条警告消息')
})

document.querySelector('.btn-danger').addEventListener('click', function () {
  try {
    const index = Math.floor(Math.random() * errors.length)
    throw new errors[index]('点击了一个错误')
  } catch (e) {
    logger.error('错误提醒：', e)
  }
})
