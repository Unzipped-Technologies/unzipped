import React, { useEffect, useState } from 'react'
import Nav from '../../../components/unzipped/header'
import Notification from '../../../components/unzipped/Withdrawal/Notification'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { parseCookies } from '../../../services/cookieHelper'

const Terms = ({ token }) => {
  const router = useRouter()
  const [windowSize, setWindowsize] = useState('126px')

  const handleResize = () => {
    let windowSize = window.innerWidth <= 680 ? '85px' : '76px'
    setWindowsize(windowSize)
  }

  const SubmitTerms = () => {
    // TODO: add submit terms logic
    router.push('/dashboard/withdrawal')
  }

  useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div data-testid="withdraw_terms">
      <Nav token={token} marginBottom={windowSize} />
      <Notification onSubmit={SubmitTerms} />
    </div>
  )
}

Terms.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token
  }
}

export default connect(mapStateToProps)(Terms)
