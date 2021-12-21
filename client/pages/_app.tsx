import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { isServer } from '../lib/is-server'
import { PageComponent } from '../types/pages/_app'
import 'nprogress/nprogress.css'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from 'store'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  NProgress.settings.showSpinner = false

  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null
  }

  const store = configureStore({
    reducer: {
      user: UserReducer,
    },
  })
  return (
    <>
      <Provider store={store}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
