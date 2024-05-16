import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getVerifyIdentityUrl } from '../../../redux/actions'
import router from 'next/router'
import Notification from './Notification'
import Panel from './UserSetupPanel'
import { useDispatch } from 'react-redux'

import { DarkText, Absolute, WhiteCard, Dismiss } from './style'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const Container = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 40px 10%;
`

const Notifications = styled.div`
  padding: 0px 10px;
`

const NotificationsPanel = ({ notifications, user, success, getVerifyIdentityUrl, url, token, passwordChanged }) => {
  const dispatch = useDispatch()
  const [initialUrl] = useState(url)

  const hideAlert = () => {
    if (success) hideSuccessAlert()
    if (passwordChanged) hidePasswordAlert()
  }

  const hideSuccessAlert = () => {
    dispatch({
      type: 'HIDE_SUCCESS_NOTIFICATION',
      payload: null
    })
  }
  const hidePasswordAlert = () => {
    dispatch({
      type: 'HIDE_AUTH_NOTIFICATION',
      payload: null
    })
  }
  setTimeout(() => {
    if (success || passwordChanged) {
      hideSuccessAlert()
      hidePasswordAlert()
    }
  }, 5000)

  const verifyIdentity = () => {
    getVerifyIdentityUrl(token)
  }

  useEffect(() => {
    if (url && url !== initialUrl) {
      window.open(url, '_blank')
    }
  }, [url, router])

  return (
    <Container>
      <Notifications>
        {(success || passwordChanged) && (
          <WhiteCard
            row
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            {success ? (
              <DarkText noMargin>You have successfully applied for project!</DarkText>
            ) : passwordChanged ? (
              <DarkText noMargin>Password changed successfully!</DarkText>
            ) : (
              ''
            )}
            <Absolute
              onClick={() => {
                hideAlert()
              }}>
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
      {token && (<Panel user={user} verifyIdentity={verifyIdentity} />)}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    success: state?.ProjectApplications?.success,
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
