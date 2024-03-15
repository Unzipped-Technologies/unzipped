import React, { useEffect } from 'react'
import styled from 'styled-components'
import { TitleText, DarkText, Absolute, WhiteCard } from './style'
import Link from 'next/link'
import ProgressBar from '../../ui/ProgressBar'
import UpdateUserIcon from '../../icons/updateUser'
import { VerifyUserIcon } from '../../icons'
import { accountVerificationEnum } from '../../../server/enum/accountTypeEnum'
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
  align-items: center;
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
  cursor: pointer;
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
const Panel = ({ userProps, verifyIdentity }) => {
  const { user } = useSelector(state => state.Auth)

  const [isDropzoneVisible, setIsDropzoneVisible] = useState(false)
  const [trackProgress, setTrackProgress] = useState(0)
  const [hasUserInfo, setHasUserInfo] = useState(false)
  const dropzoneRef = useRef(null)

  const completeSetup = () => {
    const firstActionItem = document.querySelector('.verify-identity');
    if (firstActionItem) {
      firstActionItem.click();
      return;
    }
    const secondActionItem = document.querySelector('.update-account-details');
    if (secondActionItem) {
      secondActionItem.click();
      return;
    }
    const thirdActionItem = document.querySelector('.upload-profile-pic');
    if (thirdActionItem) {
      thirdActionItem.click();
      return;
    }
    const fourthActionItem = document.querySelector('.select-a-plan');
    if (fourthActionItem) {
      fourthActionItem.click();
      return;
    }
  };

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
      if (user.isIdentityVerified === accountVerificationEnum.SUCCESS) {
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
      {user.isIdentityVerified !== accountVerificationEnum.SUCCESS && (
        <AccountSetupContainer>
          <VerifyUserIcon />
          <AccountSetup>
            <Text
              className="verify-identity"
              onClick={() => verifyIdentity()}>
              Verify identity
            </Text>
          </AccountSetup>
        </AccountSetupContainer>
      )}
      {!hasUserInfo && (
        <AccountSetupContainer>
          <UpdateUserIcon />
          <AccountSetup>
            <Text
              className="update-account-details"
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
            <Text className="upload-profile-pic" onClick={openDropzone}>Upload a profile picture</Text>
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
              className="select-a-plan"
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
          <CompleteSetupButton onClick={completeSetup}>Complete Setup</CompleteSetupButton>
        </AccountSetup>
      </AccountSetupContainer>

    </Container>
  )
}

export default Panel
