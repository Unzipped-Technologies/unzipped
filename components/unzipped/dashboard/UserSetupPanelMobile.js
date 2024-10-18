import React from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard, Dismiss } from './style'
import { connect, useDispatch } from 'react-redux'
import UpdateUserIcon from '../../icons/updateUser'
import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'
import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 0px 15px;
`

const ContainerAccount = styled.div`
  display: flex;
  flex-flow: column;
  width: 90%;
  padding: 0px 15px;
  margin-left: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px 0px #0000001a;
  padding: 25px 0px;
`

const ProgressBarContainer = styled.div`
    width: 100%;
    displa: flex;
    align-items: center;
    justify-content: center;
    background: #E0E0E0;
    border-radius: 20px;
    padding: 0px;
}`

const ProgressBarFiller = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  display: flex;
  background-color: #ff4081;
  padding: 0px;
  border-radius: 20px;
  text-align: center;
  justify-content: center;
  margin: 3px;
`

const AccountSetupContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`

const AccountSetup = styled.div`
  width: 100%;
  display: flex;
`

const Text = styled.p`
  font-family: Arial;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${({ color }) => (color ? color : '#000')};
  margin:  4px;
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '40px')};
`

const CompleteSetupButton = styled.button`
  border: 0;
  width: 100%;
  height: 40px;
  display: inline-flex;
  padding: 11px 100px 11px 138px;
  align-items: center;
  color: #fff;
  font-family: Arial;

  border-radius: 20px;
  background: #ff4081;
`
const Panel = ({ success, passwordChanged, calenderSuccess }) => {
  const { user } = useSelector(state => state.Auth)

  const [isDropzoneVisible, setIsDropzoneVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [hasUserInfo, setHasUserInfo] = useState(false)
  const dropzoneRef = useRef(null)
  const dispatch = useDispatch()

  const hideAlert = () => {
    success && hideSuccessAlert()
    passwordChanged && hidePasswordAlert()
  }

  const hideCalenderSuccessAlert = () => {
    dispatch({
      type: 'HIDE_CALENDER_SUCCESS_NOTIFICATION',
      payload: null
    })
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
    success && hideSuccessAlert()
    passwordChanged && hidePasswordAlert()
    calenderSuccess && hideCalenderSuccessAlert()
  }, 5000)

  useEffect(() => {
    if (user?.role != '0' && user?.FirstName && user?.AddressCity) {
      setHasUserInfo(true)
    } else {
      setHasUserInfo(false)
    }
  }, [user])

  useEffect(() => {
    if (user && trackProgress < 100) {
      let incrementalProgress = 0

      if (user?.role != 0 && user?.FirstName && user?.AddressCity) {
        incrementalProgress += 25
      }
      if (user?.profileImage) {
        incrementalProgress += 25
      }
      if (user?.plan > 0) {
        incrementalProgress += 25
      }

      setTrackProgress(trackProgress + incrementalProgress)
    }
  }, [user])

  const openDropzone = () => {
    dropzoneRef.current && dropzoneRef.current.open()
  }

  const closeDropzone = () => {
    setIsDropzoneVisible(false)
  }

  const handleDrop = acceptedFiles => {
    closeDropzone()
  }

  const router = useRouter()
  return (
    <ContainerAccount data-testid="user_profile_panel_mobile">
      <Container>
        {(success || passwordChanged) && (
          <WhiteCard
            data-testid="password_change_notification"
            row
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            {success && <DarkText noMargin>You have successfully applied for project!</DarkText>}{' '}
            {passwordChanged && <DarkText noMargin>Password changed successfully!</DarkText>}
            <Absolute width="100%" onClick={hideAlert}>
              <Dismiss
                style={{
                  paddingTop: '20px',
                  paddingLeft: '250px',
                  textAlign: 'right'
                }}>
                Dismiss
              </Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {calenderSuccess === true && (
          <WhiteCard
            data-testid="calender_success_notification"
            row
            style={{
              borderRadius: '4px',
              border: '1px solid #8EDE64',
              background: 'rgba(142, 222, 100, 0.10)'
            }}>
            <DarkText noMargin>You have successfully setup the calendar!</DarkText>
            <Absolute>
              <Dismiss onClick={hideCalenderSuccessAlert} padding="20px 0px 0px 200px" margin="20px 0px 20px 20px">
                Dismiss
              </Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        {calenderSuccess === false && (
          <WhiteCard
            data-testid="calender_fail_notification"
            row
            style={{
              borderRadius: '4px',
              border: '1px solid #DE4E4E',
              background: '#FCEDED'
            }}>
            <DarkText noMargin>Failed to set up your calendar. Please try again later!</DarkText>
            <Absolute>
              <Dismiss onClick={hideCalenderSuccessAlert} padding="20px 0px 0px 200px" margin="20px 0px 20px 20px">
                Dismiss
              </Dismiss>
            </Absolute>
          </WhiteCard>
        )}
        <TitleText size={18}>Set up your account</TitleText>
        <ProgressBarContainer>
          <ProgressBarFiller percentage={trackProgress}>
            <Text size={18} color="#FFF" lineHeight={'30px'}>
              {trackProgress}%
            </Text>
          </ProgressBarFiller>
        </ProgressBarContainer>
        {!hasUserInfo && (
          <AccountSetupContainer>
            <UpdateUserIcon />
            <AccountSetup>
              <Text
                onClick={() => {
                  router.push('/signup')
                }}>
                Update account details
              </Text>
            </AccountSetup>
          </AccountSetupContainer>
        )}

        {!user?.profileImage && (
          <AccountSetupContainer>
            <img
              style={{ borderRadius: '100%' }}
              width="30"
              height="30"
              src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png"
              alt="installment plan"
            />

            <AccountSetup>
              <Text onClick={openDropzone}>Upload a profile picture</Text>
            </AccountSetup>
            <Dropzone ref={dropzoneRef} onDrop={handleDrop} noClick={true}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone" {...getRootProps()} data-testid="dropzone">
                  <input {...getInputProps()} />
                </div>
              )}
            </Dropzone>
          </AccountSetupContainer>
        )}

        {user?.plan == 0 && (
          <AccountSetupContainer>
            <img width="30" height="30" src="/img/InstallmentPlan.png" alt="installment plan" />
            <AccountSetup>
              <Text
                onClick={() => {
                  router.push('/pick-a-plan')
                }}>
                Select a plan for your account
              </Text>
            </AccountSetup>
          </AccountSetupContainer>
        )}

        <AccountSetupContainer>
          <AccountSetup>
            <CompleteSetupButton>Complete Setup</CompleteSetupButton>
          </AccountSetup>
        </AccountSetupContainer>
      </Container>
    </ContainerAccount>
  )
}

const mapStateToProps = state => {
  return {
    calenderSuccess: state?.Auth?.calendarSuccess,
    success: state?.ProjectApplications?.success,
    passwordChanged: state?.Auth?.passwordChanged
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
