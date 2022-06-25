import Head from 'next/head'
import Layout from '../components/Layout'
import ChatContainer from '../containers/chat'

export default function Index () {
  return (
    <>
      <Head>
        <title>Multi instance chat</title>
        <meta name="description" content="Multi instance chat client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ChatContainer />
      </Layout>
    </>
  )
}
