import React, { useEffect } from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard } from './style'
import Link from 'next/link'
import ProgressBar from '../../ui/ProgressBar'
import UpdateUserIcon from '../../icons/updateUser'
// import UserInstallmentPlanIcon from '../../icons/userInstallmentPlan'
import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  width: 100%;
  min-height: 435px;
  max-height: 900px;
  padding: 20px;
  margin-left: 10px;
`

const ProgressBarContainer = styled.div`
    width: 300px;
    displa: flex;
    align-items: center;
    justify-content: center;
    background: #E0E0E0;
    border-radius: 20px;
    padding: 5px;
}`

const ProgressBarFiller = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  display: flex;
  background-color: #ff4081;
  padding: ${({ padding }) => (padding ? padding : '10px')};
  border-radius: 20px;
  text-align: center;
  justify-content: center;
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
  width: 300px;
  height: 40px;
  display: inline-flex;
  padding: 10px 101.826px 11px 80px;
  align-items: flex-start;
  color: #fff;
  font-family: Arial;

  border-radius: 20px;
  background: #ff4081;
`
const Panel = ({ userProps }) => {
  const { user } = useSelector(state => state.Auth)

  const [isDropzoneVisible, setIsDropzoneVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [hasUserInfo, setHasUserInfo] = useState(false)
  const dropzoneRef = useRef(null)

  console.log('user_auth', user)

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

      {/* <TitleText>Set up your account<Absolute top="20px"><DarkText>75%</DarkText></Absolute></TitleText>
            <ProgressBar value={75} width={190} showValue/>
            <DarkText>Some functionality will not be accessable if your
            account is not completed </DarkText>
            <TitleText small>Complete your account setup by:</TitleText>
            <WhiteCard unset background="#d8d8d8">
                {user.map(item => (
                        <WhiteCard onClick={item?.onClick || (() => {})} borderColor="#37DEC5" row half clickable>
                            {item.icon}
                            <DarkText clickable noMargin paddingLeft={item.padding} fontSize="12px">{item.text}</DarkText>
                        </WhiteCard>
                ))}
            </WhiteCard> */}
    </Container>
  )
}

export default Panel
