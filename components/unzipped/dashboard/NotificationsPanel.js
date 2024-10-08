import React, { useState, useEffect } from 'react'
import router from 'next/router'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import Panel from './UserSetupPanel'
import Notification from './Notification'
import { getVerifyIdentityUrl } from '../../../redux/actions'
import { DarkText, Absolute, WhiteCard, Dismiss } from './style'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 40px 10%;
`

const Notifications = styled.div`
  padding: 0px 10px;
`

const NotificationsPanel = ({
  notifications,
  user,
  success,
  getVerifyIdentityUrl,
  url,
  token,
  passwordChanged,
  calenderSuccess
}) => {
  const dispatch = useDispatch()
  const [initialUrl] = useState(url)

  useEffect(() => {
    if (url && url !== initialUrl) {
      window.open(url, '_blank')
    }
  }, [url, router])

  setTimeout(() => {
    success && hideSuccessAlert()
    passwordChanged && hidePasswordAlert()
    calenderSuccess && hideCalenderSuccessAlert()
  }, 5000)

  const hideAlert = () => {
    success && hideSuccessAlert()
    passwordChanged && hidePasswordAlert()
  }

  const hideSuccessAlert = () => {
    dispatch({
      type: 'HIDE_SUCCESS_NOTIFICATION',
      payload: null
    })
  }
  const hideCalenderSuccessAlert = () => {
    dispatch({
      type: 'HIDE_CALENDER_SUCCESS_NOTIFICATION',
      payload: null
    })
  }
  const hidePasswordAlert = () => {
    dispatch({
      type: 'HIDE_AUTH_NOTIFICATION',
      payload: null
    })
  }

  const verifyIdentity = () => {
    getVerifyIdentityUrl(user?._id)
  }

  return (
    <Container data-testid="desktop_notification_panel">
      <Notifications>
        {(success || passwordChanged) && (
          <WhiteCard
            row
            data-testid="password_change_notification"
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            {success && <DarkText noMargin>You have successfully applied for project!</DarkText>}
            {passwordChanged && <DarkText noMargin>Password changed successfully!</DarkText>}
            <Absolute onClick={hideAlert}>
              <Dismiss data-testid="dismiss_password_notification">Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {calenderSuccess && (
          <WhiteCard
            row
            data-testid="calender_success_notification"
            id="calender_success_notification"
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            <DarkText noMargin>You have successfully setup the calendar!</DarkText>

            <Absolute
              onClick={() => {
                hideCalenderSuccessAlert()
              }}>
              <Dismiss>Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {calenderSuccess === false && (
          <WhiteCard
            row
            data-testid="calender_fail_notification"
            style={{
              borderRadius: '4px',
              border: '1px solid #DE4E4E',
              background: '#FCEDED'
            }}>
            <DarkText noMargin>Failed to set up your calendar. Please try again later!</DarkText>

            <Absolute onClick={hideCalenderSuccessAlert}>
              <Dismiss>Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {notifications.map((item, index) => (
          <Notification type={item.type} key={`${index}_deskktop`} user={user}>
            {item.text}
          </Notification>
        ))}
      </Notifications>
      {token && <Panel user={user} verifyIdentity={verifyIdentity} />}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    success: state?.ProjectApplications?.success,
    calenderSuccess: state?.Auth?.calendarSuccess,
    passwordChanged: state?.Auth?.passwordChanged,
    token: state.Auth.token,
    user: state.Auth?.user,
    url: state?.Auth?.verifyUrl
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getVerifyIdentityUrl: bindActionCreators(getVerifyIdentityUrl, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPanel)
