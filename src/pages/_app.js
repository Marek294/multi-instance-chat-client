import { useEffect } from 'react'
import websocket from '../utils/websocket'
import '../styles/main.scss'

function MyApp ({ Component, pageProps }) {
  useEffect(() => {
    websocket.connect()
    return () => {
      websocket.close()
    }
  })

  return <Component {...pageProps} />
}

export default MyApp
