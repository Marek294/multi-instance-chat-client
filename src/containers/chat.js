import React, { useState } from 'react'
import { useRouter } from 'next/router'
import ChatForm from '../components/Forms/ChatForm'
import ChatMessages from '../components/ChatMessages'

export default function ChatContainer () {
  const router = useRouter()
  const [messages, setMessages] = useState([])

  let { username } = router.query
  if (username) username = username.toLowerCase()

  const sendMessage = ({ message }, { resetForm }) => {
    const newMessages = [...messages]
    newMessages.push(message)
    setMessages(newMessages)
    resetForm()
  }

  return (
    <div className="container">
      <h1 className="title">
          Hello <span>{username}</span>
      </h1>

      <ChatMessages messages={messages} />
      <ChatForm onSubmit={sendMessage} initialValues={{ message: '' }} />

      <style jsx>{`
        .container {
          padding: 0 2rem;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .title span {
          color: #0070f3;
          text-decoration: none;
        }

        .form {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%);
        }
      `}</style>
    </div>
  )
}
