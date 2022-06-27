import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { serverHost, serverSecure, dev } = publicRuntimeConfig

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
// The WebSocket protocol defines Ping and Pong frames that can be used for keep-alive, heart-beats, network status probing, latency instrumentation, and so forth. These are not currently exposed in the API.
// QUESTION: Should client detect broken connections too?

// TODO: volatile - client buffer events while reconnecting

const open = () => {
  if (socket) return

  socket = new WebSocket(protocol + serverHost)

  socket.onmessage = event => {
    try {
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
    } catch (e) {
      console.error(e)
    }
  }

  socket.onopen = function (e) {
    if (dev) console.log('Socket is opened.')
  }

  socket.onclose = function (e) {
    if (dev) console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason)
    socket = undefined

    // Reconnect
    setTimeout(open, 1000)
  }

  socket.onerror = function (err) {
    if (dev) console.error('Socket encountered error: ', err.message, 'Closing socket')
    close()
  }
}

const close = () => {
  if (!socket) return
  socket.close()
}

const send = (type, payload, { onSuccess, onError, onProgress, timeout = 30e3 } = {}) => {
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
}

const subscribe = (type, fn) => {
  if (!subscribers[type]) {
    subscribers[type] = []
  }

  subscribers[type].push(fn)

  return () => {
    subscribers[type] = subscribers[type].filter(subFn => fn !== subFn)
  }
}

const websocket = {
  open,
  close,
  send,
  subscribe
}

export default websocket
