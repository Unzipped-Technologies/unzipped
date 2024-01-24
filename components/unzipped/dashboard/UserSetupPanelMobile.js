import React from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard, Dismiss } from './style'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
import ProgressBar from '../../ui/ProgressBar'
import UpdateUserIcon from '../../icons/updateUser'
// import UserInstallmentPlanIcon from '../../icons/userInstallmentPlan'
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

// const Container = styled.div`
//     position: relative;
//     display: flex;
//     flex-flow: column;
//     border: 1px solid #D9D9D9;
//     width: 100%;
//     min-height: 435px;
//     max-height: 900px;
//     padding: 20px;
//     margin-left: 10px;
// `;

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
  padding: ${({ padding }) => (padding ? padding : '0px')};
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

const AccountIcon = styled.div`
  width: 25px;
  display: flex;
`

const Text = styled.p`
  font-family: Arial;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  color: ${({ color }) => (color ? color : '#000')};
  margin: ${({ margin }) => (margin ? margin : '0')};
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
const Panel = ({ user: userProps, success }) => {
  const { user } = useSelector(state => state.Auth)

  const [isDropzoneVisible, setIsDropzoneVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [hasUserInfo, setHasUserInfo] = useState(false)
  const dropzoneRef = useRef(null)
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

  useEffect(() => {
    if (user.role != '0' && user.FirstName && user.AddressCity) {
      setHasUserInfo(true)
    } else {
      setHasUserInfo(false)
    }
  }),
    [user]

  useEffect(() => {
    if (user && trackProgress < 100) {
      let incrementalProgress = 0

      if (user.role != 0 && user.FirstName && user.AddressCity) {
        incrementalProgress += 25
      }
      if (user.profileImage) {
        incrementalProgress += 25
      }
      if (user.plan > 0) {
        incrementalProgress += 25
      }

      setTrackProgress(trackProgress + incrementalProgress)
    }
  }, [user])

  const openDropzone = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open()
    }
  }

  const closeDropzone = () => {
    setIsDropzoneVisible(false)
  }

  const handleDrop = acceptedFiles => {
    console.log(acceptedFiles)
    closeDropzone()
  }

  const router = useRouter()
  return (
    <Container>
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
            width="100%"
            onClick={() => {
              hideSuccessAlert()
            }}>
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
      <TitleText size={18}>Set up your account</TitleText>
      <ProgressBarContainer>
        <ProgressBarFiller percentage={trackProgress} padding={'0px'}>
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
              <div className="dropzone" {...getRootProps()}>
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
      {/* <div style={{ backgroundColor: "#D9D9D9" }} className='px-2 pt-2 pb-4'>
                <div className='d-flex justify-content-between'>
                    <TitleText>Set up your account</TitleText>
                    <DarkText textAlignLast='end'>75%</DarkText>
                </div>
                <ProgressBar value={75} width={75} showValue />
                <DarkText color='#000000'>Some functionality will not be accessable if your
                    account is not completed </DarkText>
                <TitleText marginTop="40px" small>Complete your account setup by:</TitleText>
                <WhiteCard unset background="#d8d8d8" style={{ border: "1px solid #CD4949" }} >
                    {user.slice(1).map(item => (
                        <WhiteCard onClick={item?.onClick || (() => { })} borderColor="#37DEC5" row half clickable style={{ display: "flex", alignItems: "center", border: "1px solid #37DEC5", padding: "17px", borderRadius: "8px", minHeight: "70px", margin: "15px 10px" }}>
                            {item.icon}
                            <DarkText clickable noMargin paddingLeft={item.padding} fontSize="12px">{item.text}</DarkText>
                        </WhiteCard>
                    ))}
                </WhiteCard>
            </div> */}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    success: state?.ProjectApplications?.success
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
