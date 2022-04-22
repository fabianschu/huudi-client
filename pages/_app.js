import Web3ContextProvider from '../context/Web3Context'
import Head from 'next/head'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <Web3ContextProvider>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Component {...pageProps} />
    </Web3ContextProvider>
  )
}

export default MyApp
