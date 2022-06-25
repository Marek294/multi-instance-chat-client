import EnterChatForm from '../components/Forms/EnterChatForm'

export default function IndexContainer () {
  const onSubmit = values => {
    console.log(values)
  }

  return (
    <div className="container">
      <h1 className="title">
          Welcome to<br /><span>Multi Instance Chat</span>
      </h1>

      <div className="form">
        <EnterChatForm onSubmit={onSubmit} initialValues={{ username: '' }} />
      </div>
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
