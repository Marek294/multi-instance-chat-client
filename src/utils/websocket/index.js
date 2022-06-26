import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { serverHost, serverSecure } = publicRuntimeConfig

const protocol = serverSecure ? 'wss://' : 'ws://'
let socket
const subscribers = {}
const callbacks = {}

const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

const guid = () => {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

// TODO: heartbeat
// TODO: reconnection
// TODO: volatile - client buffer events while reconnecting

const websocket = {
  connect: () => {
    socket = new WebSocket(protocol + serverHost)

    socket.onmessage = event => {
      const { requestId, type, payload } = JSON.parse(event.data)

      // Send message to subscribers if exists
      const subscriber = subscribers[type]
      if (subscriber) {
        subscriber.forEach(fn => {
          fn(payload)
        })
      }

      // Send callback if there is requestId
      if (requestId && callbacks[requestId]) {
        const { onSuccess, onError, onProgress, timeoutTimer } = callbacks[requestId]
        if (type === 'request-success') {
          if (onSuccess) onSuccess(payload)
          if (timeoutTimer) clearTimeout(timeoutTimer)
          delete callbacks[requestId]
        }
        if (type === 'request-error') {
          if (onError) onError(payload)
          if (timeoutTimer) clearTimeout(timeoutTimer)
          delete callbacks[requestId]
        }
        if (type === 'request-progress') {
          if (onProgress) onProgress(payload)
        }
      }
    }
  },
  close: () => {
    if (socket) {
      socket.close()
      socket = undefined
    }
  },
  send: (type, payload, { onSuccess, onError, onProgress, timeout = 30e3 } = {}) => {
    let requestId
    if (!socket) return

    if (onSuccess || onError || onProgress) {
      requestId = guid()

      const timeoutTimer = setTimeout(() => {
        if (onError) onError(new Error('Request timeout'))
        delete callbacks[requestId]
      }, timeout)

      callbacks[requestId] = {
        onSuccess,
        onError,
        onProgress,
        timeoutTimer
      }
    }

    socket.send(JSON.stringify({ requestId, type, payload }))
  },
  subscribe: (type, fn) => {
    if (!subscribers[type]) {
      subscribers[type] = []
    }

    subscribers[type].push(fn)

    return () => {
      subscribers[type] = subscribers[type].filter(subFn => fn !== subFn)
    }
  }
}

export default websocket