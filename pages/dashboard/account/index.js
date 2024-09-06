import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import Nav from '../../../components/unzipped/header'
import Footer from '../../../components/unzipped/Footer'
import MobileAccount from '../../../components/unzipped/dashboard/MobileAccount'
import DesktopAccount from '../../../components/unzipped/dashboard/DesktopAccount'
import MobileFreelancerFooter from '../../../components/unzipped/MobileFreelancerFooter'

const MobileDisplayBox = styled.div`
  position: relative;
  @media (min-width: 680px) {
    display: none;
  }
`

const DesktopDisplayBox = styled.div`
  position: relative;
  @media (max-width: 681px) {
    display: none;
  }
`

const Account = () => {
  const [marginBottom, setMarginBottom] = useState('0px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setMarginBottom('87px')
      } else {
        setMarginBottom('128px')
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
    <React.Fragment>
      <Nav isSubMenu marginBottom={marginBottom} />
      {window.innerWidth >= 680 ? (
        <DesktopDisplayBox id="desktop_account">
          <DesktopAccount />
          <Footer />
        </DesktopDisplayBox>
      ) : (
        <MobileDisplayBox id="mobile_account">
          <MobileAccount />
          <MobileFreelancerFooter defaultSelected="Account" />
        </MobileDisplayBox>
      )}
    </React.Fragment>
  )
}

export default Account
