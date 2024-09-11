import React, { useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Nav from '../../components/unzipped/header'
import Footer from '../../components/unzipped/Footer'
import UserSetupPanelMobile from '../../components/unzipped/dashboard/UserSetupPanelMobile'
import MobileNotification from '../../components/unzipped/dashboard/MobileNotification'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import NotificationsPanel from '../../components/unzipped/dashboard/NotificationsPanel'
import { getCurrentUserData } from '../../redux/actions'
import { useRouter } from 'next/router'
import { parseCookies } from '../../services/cookieHelper'

const DesktopBox = styled.div`
  @media (max-width: 680px) {
    display: none;
  }
`

const MobileBox = styled.div`
  @media (min-width: 680px) {
    display: none;
  }
`

const Notifications = styled.div`
  padding: 0px 15px;
`

const notifications = [
  { type: 'plan' },
  { type: 'github' },
  { type: 'paymentMethod' },
  { type: 'browse' },
  {
    type: 'meetingCalender',
    text: 'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.'
  },
  { type: 'dismiss', text: 'Update types of professionals you are seeking for your business' },

  { type: 'createBusiness' },
  { type: 'faq' },
  { type: 'updateBusiness' },
  { type: 'freeTrial' },
  { type: 'explore' }
]

const Dashboard = ({ getCurrentUserData, userData, isAuthenticated }) => {
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    async function fetchData() {
      await getCurrentUserData()
    }
    fetchData()
  }, [])

  return (
    <React.Fragment>
      <Nav isSubMenu marginBottom={window.innerWidth >= 680 ? '120px' : '100px'} />
      <DesktopBox>
        <NotificationsPanel notifications={notifications} />
        <Footer />
      </DesktopBox>
      <MobileBox>
        <div data-testid="mobile_notification_panel">
          <UserSetupPanelMobile />
          <Notifications>
            {notifications.map((item, index) => (
              <MobileNotification type={item.type} key={`${index}_mobile`} user={userData}>
                {item.text}
              </MobileNotification>
            ))}
          </Notifications>
        </div>
        <MobileFreelancerFooter defaultSelected="Dashboard" />
      </MobileBox>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    userData: state.Auth?.user,
    isAuthenticated: state.Auth?.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
