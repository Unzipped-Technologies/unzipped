// import '../styles/fonts.css';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useEffect, useState } from 'react'
import keys from '../config/keys'
import { useRouter } from 'next/router'
import { useSelector, useStore } from 'react-redux'
import { wrapper } from '../redux/store'
import { CookiesProvider } from 'react-cookie'
import { PersistGate } from 'redux-persist/integration/react'
import * as gtag from '../lib/gtag'
import { isProtected } from '../utils/protectedRoutes'

///styles
import '../styles/App.scss'
import 'materialize-css/dist/css/materialize.min.css'
// import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import 'animate.css/animate.min.css'
import Loading from '../components/loading'

function MyApp({ Component, pageProps }) {
  const store = useStore(state => state)
  const isEmailVerified = useSelector(state => state.Auth.isEmailVerified)
  const userData = useSelector(state => state.Auth.user)
  const isLoading = useSelector(state => state.Loading.loading)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!userData?.isAccountDetailCompleted) {
      router.push('/update-account-profile')
    }
  }, [userData])

  useEffect(() => {
    !isEmailVerified && router.push('/verify-email')
  }, [isEmailVerified])

  useEffect(() => {
    const start = () => setLoading(true)
    const end = () =>
      setTimeout(() => {
        setLoading(false)
      }, 500)
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if (isLoading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [isLoading])

  return (
    <PersistGate persistor={store.__persistor} loading={''}>
      <CookiesProvider>
        {loading && <Loading />}
        <Component {...pageProps} />
      </CookiesProvider>
    </PersistGate>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return { pageProps }
}

export default wrapper.withRedux(MyApp)
