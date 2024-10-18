import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import FormField from '../../ui/FormField'

import { ValidationUtils } from '../../../utils'
import { areObjectsEqual } from '../../../services/formHelper'

import IconComponent from '../../ui/icons/IconComponent'
import { logoutUser, getCurrentUserData,updateCurrentUser } from '../../../redux/actions'
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

const Button = styled.button`
  width: 100%;
  height: 45px;
  background: #1772eb;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0px 0px 0px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`

const MobileAccount = ({ logoutUser, user, balance, getCurrentUserData, business, updateCurrentUser }) => {
  const initialState = {
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    FirstName: user?.FirstName ?? '',
    LastName: user?.LastName ?? '',
    AddressLineOne: user?.AddressLineOne,
    AddressLineTwo: user?.AddressLineTwo,
    AddressState: user?.AddressState ?? '',
    AddressCity: user?.AddressCity,
    AddressZip: user?.AddressZip,
    businessName: business?.name,
    businessType: business?.type,
    businessPhone: business?.businessPhone,
    taxId: business?.taxId
  }

  const router = useRouter()

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [addressLineOneError, setAddressLineOneError] = useState('')
  const [addressLineTwoError, setAddressLineTwoError] = useState('')
  const [addressStateError, setAddressStateError] = useState('')
  const [addressCityError, setAddressCityError] = useState('')
  const [addressZipError, setAddressZipError] = useState('')
  const [businessNameError, setBusinessNameError] = useState('')
  const [businessTypeError, setBusinessTypeError] = useState('')
  const [businessPhoneError, setBusinessPhoneError] = useState('')
  const [taxIdError, setTaxIdError] = useState('')
  const [error, setError] = useState('')
    const [isProfileModal, setIsProfileModal] = useState(false);

  const [showSettings, setShowSettings] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [userData, setUserData] = useState({
    ...initialState
  })
  const [editMode, setMode] = useState({
    editName: false,
    editAddress: false,
    editCompany: false
  })

  useEffect(() => {
    const initialState = {
      email: user?.email,
      phoneNumber: user?.phoneNumber,
      FirstName: user?.FirstName ?? '',
      LastName: user?.LastName ?? '',
      AddressLineOne: user?.AddressLineOne,
      AddressLineTwo: user?.AddressLineTwo,
      AddressState: user?.AddressState ?? '',
      AddressCity: user?.AddressCity,
      AddressZip: user?.AddressZip,
      businessName: business?.name,
      businessType: business?.type,
      businessPhone: business?.businessPhone,
      taxId: business?.taxId
    }
    setUserData({ ...initialState })
    return () => {}
  }, [user, business])

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
  const validateString = ({ item, min, max, message }, setErrorMessage) => {
    if (item === '') {
      setErrorMessage('This field is required!')
      return
    }
  }

  const updateDisabled = () => {
    const isDirty = areObjectsEqual(userData, initialState)
    if (isDirty) {
      setMode({
        ...editMode,
        editName: false,
        editAddress: false,
        editCompany: false
      })
    }
  }

  const validateEin = ({ item, message }, setErrorMessage) => {
    if (userData?.taxId === '') {
      setErrorMessage('This field is required!')
      return
    }
    const isValid = ValidationUtils._validateEIN(item)
    if (isValid) {
      setErrorMessage('')
    } else {
      setErrorMessage(message)
    }
  }
  const updateForm = (type, data) => {
    setUserData({
      ...userData,
      [type]: data
    })
  }

  const onSubmit = async () => {
    const response = await updateCurrentUser(userData)

    if (response?.status === 200) {
      setShowInfo(false)
    } else {
      setError(response?.data?.msg)
    }
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
            className="d-flex align-items-center justify-content-between mb-4 py-1"
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
          <div id="show_info_container" className="ml-5 mr-5">
            <div
              className="d-flex align-items-center justify-content-between"
              onClick={() => {
                setShowInfo(!showInfo)
              }}>
              <div className="d-flex align-items-center ">
                <IconComponent name="settings" width="14" height="14" viewBox="0 0 14 14" fill="black" />
                <P margin="0" padding="0 0 0 12px" fontSize="20px">
                  Personal Info
                </P>
              </div>
              {!showInfo ? (
                <IconComponent name="rightArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
              ) : (
                <span style={{ marginRight: '5px' }}>
                  <IconComponent name="downArrow" width="9" height="14" viewBox="0 0 6 9" fill="black" />
                </span>
              )}
            </div>
            {showInfo && (
              <div
                style={{
                  margin: '5px 0px 0px 20px'
                }}>
                <FormField
                  fieldType="input"
                  placeholder="First Name"
                  borderRadius="10px"
                  name="FirstName"
                  id="FirstName"
                  width="100%"
                  zIndexUnset
                  validate={() => {
                    validateString(
                      {
                        item: userData?.FirstName,
                        min: 1,
                        max: 45,
                        message: 'Please enter a valid first name!'
                      },
                      setFirstNameError
                    )
                  }}
                  requiredError="Please enter a value between 1 and 40 characters!"
                  error={firstNameError}
                  onBlur={() => {
                    updateDisabled()
                    validateString(
                      {
                        item: userData?.FirstName,
                        min: 1,
                        max: 45,
                        message: 'Please enter a valid first name!'
                      },
                      setFirstNameError
                    )
                  }}
                  onChange={e => updateForm('FirstName', e.target.value)}
                  value={userData?.FirstName}>
                  First Name
                </FormField>
                <FormField
                  fieldType="input"
                  placeholder="Last Name"
                  borderRadius="10px"
                  name="LastName"
                  id="LastName"
                  width="100%"
                  zIndexUnset
                  error={lastNameError}
                  onBlur={() => {
                    updateDisabled()
                    validateString(
                      {
                        item: userData?.LastName,
                        min: 1,
                        max: 45,
                        message: 'Please enter a valid last name!'
                      },
                      setLastNameError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.LastName,
                        min: 1,
                        max: 45,
                        message: 'Please enter a valid last name!'
                      },
                      setLastNameError
                    )
                  }}
                  onChange={e => updateForm('LastName', e.target.value)}
                  value={userData?.LastName}>
                  Last Name
                </FormField>
                <FormField
                  fieldType="input"
                  width="100%"
                  placeholder="123 address st."
                  borderRadius="10px"
                  zIndexUnset
                  id="AddressLineOne"
                  error={addressLineOneError}
                  onBlur={() => {
                    validateString(
                      {
                        item: userData?.AddressLineOne,
                        min: 1,
                        max: 32,
                        message: 'Please enter a valid address!'
                      },
                      setAddressLineOneError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.AddressLineOne,
                        min: 1,
                        max: 32,
                        message: 'Please enter a valid address!'
                      },
                      setAddressLineOneError
                    )
                  }}
                  onChange={e => updateForm('AddressLineOne', e.target.value)}
                  value={userData?.AddressLineOne}>
                  Address Line 1
                </FormField>
                <FormField
                  fieldType="input"
                  width="100%"
                  placeholder="apt, bldng, etc."
                  borderRadius="10px"
                  id="AddressLineTwo"
                  error={addressLineTwoError}
                  onBlur={() => {
                    validateString(
                      {
                        item: userData?.AddressLineTwo,
                        min: 1,
                        max: 32,
                        message: 'Please enter a valid address!'
                      },
                      setAddressLineTwoError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.AddressLineTwo,
                        min: 1,
                        max: 32,
                        message: 'Please enter a valid address!'
                      },
                      setAddressLineTwoError
                    )
                  }}
                  onChange={e => updateForm('AddressLineTwo', e.target.value)}
                  value={userData?.AddressLineTwo}
                  zIndexUnset>
                  Address Line 2
                </FormField>
                <FormField
                  fieldType="input"
                  width="100%"
                  placeholder="Columbus"
                  borderRadius="10px"
                  id="AddressCity"
                  zIndexUnset
                  error={addressCityError}
                  onBlur={() => {
                    validateString(
                      {
                        item: userData?.AddressCity,
                        min: 1,
                        max: 40,
                        message: 'Please enter a valid city!'
                      },
                      setAddressCityError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.AddressCity,
                        min: 1,
                        max: 40,
                        message: 'Please enter a valid city!'
                      },
                      setAddressCityError
                    )
                  }}
                  onChange={e => updateForm('AddressCity', e.target.value)}
                  value={userData?.AddressCity}>
                  City
                </FormField>
                <FormField
                  fieldType="input"
                  width="100%"
                  placeholder="OH"
                  borderRadius="10px"
                  id="AddressState"
                  zIndexUnset
                  error={addressStateError}
                  onBlur={() => {
                    validateString(
                      {
                        item: userData?.AddressState,
                        min: 1,
                        max: 30,
                        message: 'Please enter a valid state!'
                      },
                      setAddressStateError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.AddressState,
                        min: 1,
                        max: 30,
                        message: 'Please enter a valid state!'
                      },
                      setAddressStateError
                    )
                  }}
                  onChange={e => updateForm('AddressState', e.target.value)}
                  value={userData?.AddressState}>
                  State
                </FormField>
                <FormField
                  fieldType="input"
                  width="100%"
                  placeholder="43220"
                  borderRadius="10px"
                  zIndexUnset
                  id="AddressZip"
                  error={addressZipError}
                  onBlur={() => {
                    validateString(
                      {
                        item: userData?.AddressZip,
                        min: 1,
                        max: 6,
                        message: 'Please enter a valid zip!'
                      },
                      setAddressZipError
                    )
                  }}
                  validate={() => {
                    validateString(
                      {
                        item: userData?.AddressZip,
                        min: 1,
                        max: 6,
                        message: 'Please enter a valid zip!'
                      },
                      setAddressZipError
                    )
                  }}
                  onChange={e => updateForm('AddressZip', e.target.value)}
                  value={userData?.AddressZip}>
                  Zip Code
                </FormField>
                {business && (
                  <div>
                    <FormField
                      fieldType="input"
                      width="100%"
                      placeholder="Unzipped"
                      zIndexUnset
                      id="businessName"
                      error={businessNameError}
                      onBlur={() => {
                        validateString(
                          {
                            item: userData?.businessName,
                            min: 1,
                            max: 45,
                            message: 'Please enter a valid name!'
                          },
                          setBusinessNameError
                        )
                      }}
                      validate={() => {
                        validateString(
                          {
                            item: userData?.businessName,
                            min: 1,
                            max: 45,
                            message: 'Please enter a valid name!'
                          },
                          setBusinessNameError
                        )
                      }}
                      borderRadius="10px"
                      onChange={e => updateForm('businessName', e.target.value)}
                      value={userData?.businessName}>
                      Business Name
                    </FormField>
                    <FormField
                      fieldType="input"
                      width="100%"
                      placeholder="LLC"
                      borderRadius="10px"
                      id="businessType"
                      zIndexUnset
                      error={businessTypeError}
                      onBlur={() => {
                        validateString(
                          {
                            item: userData?.businessName,
                            min: 1,
                            max: 45,
                            message: 'Please enter business type (LLC, C-corp, etc.)!'
                          },
                          setBusinessTypeError
                        )
                      }}
                      validate={() => {
                        validateString(
                          {
                            item: userData?.businessName,
                            min: 1,
                            max: 45,
                            message: 'Please enter business type (LLC, C-corp, etc.)!'
                          },
                          setBusinessTypeError
                        )
                      }}
                      onChange={e => updateForm('businessType', e.target.value)}
                      value={userData?.businessType}>
                      Business Type
                    </FormField>
                    <FormField
                      fieldType="input"
                      width="100%"
                      id="businessPhone"
                      placeholder="1 (833) 366-4285"
                      borderRadius="10px"
                      zIndexUnset
                      error={businessPhoneError}
                      onBlur={() => {
                        validateString(
                          {
                            item: userData?.businessPhone,
                            min: 1,
                            max: 24,
                            message: 'Please enter a valid phone number!'
                          },
                          setBusinessPhoneError
                        )
                      }}
                      validate={() => {
                        validateString(
                          {
                            item: userData?.businessPhone,
                            min: 1,
                            max: 24,
                            message: 'Please enter a valid phone number!'
                          },
                          setBusinessPhoneError
                        )
                      }}
                      onChange={e => updateForm('businessPhone', e.target.value)}
                      value={userData?.businessPhone}>
                      Phone Number
                    </FormField>
                    <FormField
                      fieldType="input"
                      width="100%"
                      placeholder="**-*****42"
                      id="taxId"
                      borderRadius="10px"
                      error={taxIdError}
                      onBlur={() => {
                        updateForm('taxId', ValidationUtils._formatToEIN(userData?.taxId))
                        validateEin(
                          {
                            item: ValidationUtils._formatToEIN(userData?.taxId),
                            message: 'Please enter a valid EIN!'
                          },
                          setTaxIdError
                        )
                      }}
                      validate={() => {
                        validateEin(
                          {
                            item: userData?.taxId,
                            message: 'Please enter a valid EIN!'
                          },
                          setTaxIdError
                        )
                      }}
                      onChange={e => updateForm('taxId', e.target.value)}
                      value={userData?.taxId}
                      zIndexUnset>
                      Tax EIN or Social security Number
                    </FormField>
                    {error && (
                      <p className="red-text" data-testid="account_error">
                        {error}
                      </p>
                    )}
                    <Button onClick={onSubmit}>Save Settings</Button>
                  </div>
                )}
              </div>
            )}
          </div>
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
    balance: state.Stripe?.balance,
    business: state.Business.details
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch),
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch),
    updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileAccount)
export { P } // Exporting P for testing purposes
