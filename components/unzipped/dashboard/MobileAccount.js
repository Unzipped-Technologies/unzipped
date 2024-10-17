import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import IconComponent from '../../ui/icons/IconComponent'
import { logoutUser, getCurrentUserData } from '../../../redux/actions'
import UpdateProfileModal from '../UpdateProfileModal'

const P = styled.p`
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '')};
  color: ${({ color }) => (color ? color : 'black')};
  background: ${({ background }) => (background ? background : 'none')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  text-align: ${({ align }) => (align ? align : '')};
  border-bottom: ${({ borderBottom }) => (borderBottom ? borderBottom : '')};
  right: ${({ right }) => (right ? right : '')};
  white-space: pre-line;
  word-wrap: break-word;
`

const Container = styled.div`
  margin: 0px 0px 75px 0px;
  display: flex;
  flex-flow: column;
  justify-content: center;
`

const Like = styled.div`
  justify-content: right;
  display: flex;
  align-items: center;
`

const MobileAccount = ({ logoutUser, user, balance, getCurrentUserData }) => {
  const router = useRouter()

  const [showSettings, setShowSettings] = useState(false)
  const [isProfileModal, setIsProfileModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCurrentUserData()
      } catch (error) {}
    }

    fetchData()
  }, [])

  const linkPush = link => {
    router.push(link)
  }

  const signOut = async () => {
    await logoutUser()
    linkPush('/login')
  }

  const handleOpenProfileModal = () => {
    setIsProfileModal(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModal(false)
  }

  return (
    <div className="mb-10">
      <P margin="0" padding="0 0 0 15px" fontSize="20px" fontWeight={500}>
        Account
      </P>
      <hr />
      <Container>
        <div className="d-flex px-3 pb-4 pt-3 mb-6 justify-content-between">
          <div className="d-flex">
            <img
              src={user.profileImage}
              height={54}
              width={54}
              className="border rounded"
              data-testid="user_profile_image"
            />
            <div className="mx-2">
              <P margin="0" padding="0 0 3px 0" fontWeight="500" fontSize="17px">
              {user?.FirstName + ' ' + user?.LastName}
              </P>
              <P margin="0" padding="0 0 5px 0" fontSize="16px">
                {user?.freelancers?.category || 'N/A'}
              </P>
            </div>
          </div>
          <div
            onClick={() => {
              if (user?.role === 1) {
                linkPush(`/freelancers/${user.freelancers?._id}`)
              } else {
                linkPush(`/client/${user._id}`)
              }
            }}>
            <P margin="0" padding="0 0 5px 0" color="#1E70E0" fontSize="18px">
              View Profile
            </P>
            <Like className="d-flex align-items-baseline">
              <IconComponent name="thumbUp" width="14" height="14" viewBox="0 0 14 14" fill="#0057FF" />
              <P margin="0" padding="0 0px 0px 5px" id="likes_total">
                {' '}
                {user.likeTotal || 0}
              </P>
            </Like>
          </div>
        </div>
        <div
          onClick={() => linkPush('/billing-details')}
          className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <IconComponent name="membership" width="14" height="14" viewBox="0 0 14 14" fill="black" />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Membership
            </P>
          </div>
          <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
        </div>
        <div className="mb-4 px-3  py-1">
          <div
            data-testid="show_setting_container"
            className="d-flex align-items-center justify-content-between"
            onClick={() => {
              setShowSettings(!showSettings)
            }}>
            <div className="d-flex align-items-center ">
              <IconComponent name="settings" width="14" height="14" viewBox="0 0 14 14" fill="black" />
              <P margin="0" padding="0 0 0 12px" fontSize="20px">
                Settings
              </P>
            </div>
            {!showSettings ? (
              <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
            ) : (
              <span style={{ marginRight: '5px' }}>
                <IconComponent name="downArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
              </span>
            )}
          </div>
          {showSettings && (
            <>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <P fontSize="16px" margin="5px 10px 0px 20px" style={{ width: '60%' }}>
                  {user?.email}
                </P>
                <Link href="/change-email">Change email</Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <P fontSize="16px" margin="5px 0px 0px 20px" data-testid="phone_number">
                  {user?.phoneNumber ?? '-'}
                </P>
                <Link href="/change-phone">Change Phone</Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <P fontSize="16px" margin="5px 0px 0px 20px">
                  Password *****
                </P>
                <Link href="/change-password">Update Password</Link>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <P fontSize="16px" margin="0px 0px 0px 20px">
                  Profile
                </P>
                <P style={{fontSize:"15px",color:"#0095dd"}} onClick={() => {
                  handleOpenProfileModal()
                }}>
                  Update</P>
              </div>
            </>
          )}
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <img src="/img/balance.png" height={15} width={14} />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Balance
            </P>
          </div>
          <P margin="0" padding="0 0 0 12px" fontSize="20px">
            ${' '}
            {(balance?.available[0]?.amount / 100).toFixed(2).toLocaleString() == 'NaN'
              ? '0.00'
              : (balance?.available[0]?.amount / 100).toFixed(2).toLocaleString()}{' '}
            USD
          </P>
        </div>
        <div
          onClick={() => linkPush('/dashboard/withdrawal/terms')}
          className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <img src="/img/withdraw.png" height={18} width={16} />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Withdraw funds
            </P>
          </div>
          <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
        </div>
        <div
          onClick={() => linkPush('/billing-details')}
          className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <IconComponent name="transactionHistory" width="14" height="16" viewBox="0 0 14 16" fill="black" />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Transaction history
            </P>
          </div>
          <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
        </div>
        <hr />
        <div
          onClick={() => linkPush('/dashboard/inbox')}
          className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <IconComponent name="support" width="16" height="16" viewBox="0 0 16 16" fill="black" />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Support
            </P>
          </div>
          <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4 px-3  py-1">
          <div className="d-flex align-items-center">
            <img src="/img/terms.png" height={16} width={16} />
            <P margin="0" padding="0 0 0 12px" fontSize="20px">
              Terms and conditions
            </P>
          </div>
          <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
        </div>
        <div className="d-flex align-items-center  mb-3 px-3 py-1" onClick={signOut} data-testid="logout_user_element">
          <IconComponent name="logOut" width="18" height="16" viewBox="0 0 18 16" fill="black" />
          <P margin="0" padding="0 0 0 12px" fontSize="20px">
            Logout
          </P>
        </div>
      </Container>

      {isProfileModal && (<UpdateProfileModal
        open={isProfileModal}
        onHide={() => {
          handleCloseProfileModal()
        }} />)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
    balance: state.Stripe?.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch),
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccount)
export { P } // Exporting P for testing purposes
