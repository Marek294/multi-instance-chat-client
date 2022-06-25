import Head from 'next/head'
import Layout from '../components/Layout'
import IndexContainer from '../containers/index'

export default function Index () {
  return (
    <>
      <Head>
        <title>Multi instance chat</title>
        <meta name="description" content="Multi instance chat client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <IndexContainer />
      </Layout>
    </>
  )
}
