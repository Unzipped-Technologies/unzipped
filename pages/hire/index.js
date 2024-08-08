import React, { useState, useEffect } from 'react'
import Nav from '../../components/unzipped/header'
import Head from 'next/head'
import HireComp from '../../components/unzipped/hire/hire'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { parseCookies } from '../../services/cookieHelper'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`
const NavContainer = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`
const HirePage = ({ token }) => {
  const [marginBottom, setMarginBottom] = useState('0px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setMarginBottom('72px')
      } else {
        setMarginBottom('97px')
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize)

    // Initial call to set the marginBottom based on the current window width
    handleResize()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Container>
      <NavContainer>
        <Nav marginBottom={marginBottom} token={token} />
      </NavContainer>
      <Head>
        <title>Hire | Freelancer</title>
      </Head>
      <HireComp />
    </Container>
  )
}

HirePage.getInitialProps = async ({ req, res }) => {
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

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HirePage)
