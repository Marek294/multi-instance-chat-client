import { useEffect, useRef } from 'react'

export default function ChatMessages ({ messages }) {
  const messagesRef = useRef()

  useEffect(() => {
    if (messagesRef) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="chat_messages" ref={messagesRef}
    >
      {messages.map((m, i) => (
        <p key={i} className="chat_messages__message" >{m}</p>
      ))}
      <style jsx>{`
        .chat_messages {
          height: 500px;
          overflow: scroll;
        }

        .chat_messages__message {

        }
      `}</style>
    </div>
  )
}
