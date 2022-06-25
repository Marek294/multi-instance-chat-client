import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { serverHost, serverSecure } = publicRuntimeConfig

const protocol = serverSecure ? 'wss://' : 'ws://'
let socket
const subscribers = {}

// TODO: in callbacks we will store callbacks to sent message.
const callbacks = new Map()

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

const websocket = {
  connect: () => {
    socket = new WebSocket(protocol + serverHost)

    socket.onmessage = event => {
      const { type, payload } = JSON.parse(event.data)

      // Send message to subscribers
      const subscriber = subscribers[type]
      if (subscriber) {
        subscriber.forEach(fn => {
          fn(payload)
        })
      }
    }
  },
  close: () => {
    if (socket) {
      socket.close()
      socket = undefined
    }
  },
  send: (type, payload, { onSuccess, onError, onProgress } = {}) => {
    if (!socket) return
    if (onSuccess || onError || onProgress) {
      // TODO: generate request id and send it to server
    }

    socket.send(JSON.stringify({ type, payload }))
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
