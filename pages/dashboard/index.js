import React, { useContext } from 'react'
import Nav from '../../components/unzipped/header'
import Image from '../../components/ui/Image'
import Icon from '../../components/ui/Icon'
import NotificationsPanel from '../../components/unzipped/dashboard/NotificationsPanel'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { resetRegisterForm } from '../../redux/actions'
import { parseCookies } from '../../services/cookieHelper'
import styled from 'styled-components'
import MobileFreelancerFooter from '../../components/unzipped/MobileFreelancerFooter'
import Panel from '../../components/unzipped/dashboard/UserSetupPanelMobile'
import Notification from '../../components/unzipped/dashboard/MobileNotification'
import Footer from '../../components/unzipped/Footer'
import AvailabilitySchedule from '../../components/unzipped/AvailabilitySchedule'
import useModal from '../../components/ui/hooks/useModals'
const Notifications = styled.div`
  padding: 0px 15px;
`

const MobileDisplayBox = styled.div`
  position: relative;
  @media (min-width: 680px) {
    display: none;
  }
`

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

const Dashboard = ({ resetRegisterForm }) => {
  const router = useRouter()
  const { isModalOpen, openModal, closeModal } = useModal()

  const notifications = [
    { type: 'plan' },
    { type: 'github' },
    { type: 'browse' },
    {
      type: 'dismiss',
      text: 'You haven’t set up your calendar yet. Set it up now so clients can schedule interviews with you.',
      onClick: () => {
        // Replace 'YourModalComponent' with the actual component you want to show as a modal
        openModal()
        console.log('clicked')
      }
    },
    { type: 'dismiss', text: 'Update types of professionals you are seeking for your business' },
    {
      type: 'blue',
      text: 'Update types of professionals you are seeking for your business'
    },

    { type: 'createBusiness' },
    { type: 'faq' },
    { type: 'updateBusiness' },
    { type: 'freeTrial' },
    { type: 'explore' }
  ]

  const user = [
    {
      text: 'Update account details',
      icon: <Icon name="alertRed" />,
      padding: true,
      onClick: () => {
        resetRegisterForm()
        router.push('/signup')
      }
    },
    {
      text: 'Upload a profile picture',
      icon: (
        <Image
          radius="50%"
          width="34px"
          src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png"
        />
      ),
      padding: true
    },
    {
      text: 'Select a plan for your account',
      icon: <></>,
      padding: false,
      onClick: () => router.push('/pick-a-plan')
    }
  ]
  return (
    <React.Fragment>
      <Nav isSubMenu />
      <DesktopBox>
        <AvailabilitySchedule isModalOpen={isModalOpen} closeModal={closeModal} />
        <NotificationsPanel notifications={notifications} user={user} />
      </DesktopBox>
      <MobileBox>
        <div>
          <Panel user={user} />
          <Notifications>
            {notifications.map(item => (
              <Notification type={item.type}>{item.text}</Notification>
            ))}
          </Notifications>
        </div>
        {/* <MobileDisplayBox>
                    <MobileFreelancerFooter defaultSelected="Dashboard" />
                </MobileDisplayBox> */}
      </MobileBox>
      <Footer />
    </React.Fragment>
  )
}

Dashboard.getInitialProps = async ({ req }) => {
  const token = parseCookies(req)
  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    businesses: state.Business?.businesses,
    loading: state.Business?.loading,
    role: state.Auth.user.role
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetRegisterForm: bindActionCreators(resetRegisterForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
