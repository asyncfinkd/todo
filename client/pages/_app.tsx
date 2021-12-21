import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { isServer } from '../lib/is-server'
import { PageComponent } from '../types/pages/_app'
import 'nprogress/nprogress.css'
import { Toaster } from 'react-hot-toast'
import { ApplicationContext } from 'context/application'
import { useEffect, useState } from 'react'
import { __TOKEN__MOCKS__ } from 'mocks/app/token'
import { refreshToken } from 'api'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.settings.showSpinner = false

  const [access_token, setAccess_Token] = useState(__TOKEN__MOCKS__)

  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null
  }

  useEffect(() => {
    refreshToken()
  })
  return (
    <>
      <ApplicationContext.Provider value={{ access_token, setAccess_Token }}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Component {...pageProps} />
      </ApplicationContext.Provider>
    </>
  )
}

export default MyApp
