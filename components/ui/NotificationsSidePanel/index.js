import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import NotificationCard from '../NotificationCard'
import Icon from '../Icon'
import Title from '../Title'

const NotificationsSidePanelContainer = styled.aside`
  z-index: 5;
  border: 2px solid ${props => props.theme.tint3};
  background: #fff;
  box-shadow: 0px 4px 12px ${props => props.theme.tint2};
  border-radius: 4px;
  position: fixed;
  width: 494px;
  height: 100vh;
  right: ${({ $visible }) => ($visible ? '0' : '-506px')}; // -width - boxShadowWidth
  top: 0;
  display: flex;
  flex-wrap: wrap;
  padding: 60px 20px 0;
  transition: right 0.2s;
  @media (max-width: ${({ theme }) => theme.phoneWidth}px) {
    width: 100vw;
    right: ${({ $visible }) => ($visible ? '0' : 'calc(-100vw - 12px)')}; // -width - boxShadowWidth
  }
`

const NotificationsHeader = styled(Title)`
  font-weight: bold;
  font-size: ${props => props.theme.fontSizeM};
  line-height: ${props => props.theme.baseLineHeight};
  letter-spacing: 0.04rem;
  color: ${props => props.theme.textSecondary};
  margin: 0 20px 20px 0;
  display: inline-flex;
  text-transform: uppercase;
`

const DismissAll = styled.button`
  color: ${props => props.theme.secondary};
  font-weight: bold;
  font-size: ${props => props.theme.baseFontSize};
  line-height: ${props => props.theme.baseLineHeight};
  display: inline-flex;
  border: none;
  background-color: #fff;
  cursor: pointer;
  ${({ hidden }) => hidden && 'display: none;'};
`

const CloseBtnIcon = styled(Icon)`
  position: absolute;
  right: 20px;
  cursor: pointer;
`

const NotificationCardContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  flex-flow: column nowrap;
  row-gap: 10px;
  width: 100%;
  height: calc(100% - 90px);
  overflow-y: scroll;
`

/**
 * Side panel that contains notification cards
 */
const NotificationsSidePanel = ({ notifications, setToggleMenu, visible, dismissAlert, dismissAllAlerts }) => {
  const haveNotifications = notifications && notifications.length
  return (
    <NotificationsSidePanelContainer data-testid="notifications-side-panel" $visible={visible}>
      <NotificationsHeader>notifications</NotificationsHeader>
      <DismissAll onClick={dismissAllAlerts} hidden={!haveNotifications} data-testid="dismiss-all">
        Dismiss All
      </DismissAll>
      <CloseBtnIcon name="closeBtn" onClick={setToggleMenu} data-testid="close-btn" />
      {haveNotifications && (
        <NotificationCardContainer>
          {notifications.map(card => (
            <NotificationCard
              key={card.id}
              card={card}
              dismissAlert={dismissAlert}
              notificationText={card.notification.htmlMessage}
              dateTime={card.dateTime}
              data-id={`notification-card-${card.id}`}
            />
          ))}
        </NotificationCardContainer>
      )}
    </NotificationsSidePanelContainer>
  )
}

NotificationsSidePanel.propTypes = {
  /** Current visiblity state of the sidebar */
  visible: PropTypes.bool,
  /** Function called onClick to toggle the NotificationsSidePanel */
  setToggleMenu: PropTypes.func.isRequired,
  /** Notifications in side panel */
  notifications: PropTypes.array
}

NotificationsSidePanel.defaultProps = {
  visible: true,
  notifications: []
}

export default NotificationsSidePanel
