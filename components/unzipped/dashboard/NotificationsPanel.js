import React from 'react'
import styled from 'styled-components'
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

const NotificationsPanel = ({ notifications, user, success }) => {
  const dispatch = useDispatch()

  const hideSuccessAlert = () => {
    dispatch({
      type: 'HIDE_SUCCESS_NOTIFICATION',
      payload: null
    })
  }
  setTimeout(() => {
    if (success) {
      hideSuccessAlert()
    }
  }, 5000)

  return (
    <Container>
      <Notifications>
        {success && (
          <WhiteCard
            row
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            <DarkText noMargin>You have successfully applied for project!</DarkText>
            <Absolute
              onClick={() => {
                hideSuccessAlert()
              }}>
              <Dismiss>Dismiss</Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {notifications.map((item, index) => (
          <Notification type={item.type} key={`${index}_deskktop`}>
            {item.text}
          </Notification>
        ))}
      </Notifications>
      <Panel user={user} />
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    success: state.ProjectApplications.success
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsPanel)
