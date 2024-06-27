import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import { Underline } from './style'
import BackHeader from '../BackHeader'
import FormField from '../../ui/FormField'
import { ValidationUtils } from '../../../utils'
import { areObjectsEqual } from '../../../services/formHelper'
import { stripeBrandsEnum, stripeLogoEnum } from '../../../server/enum/paymentEnum'

import {
  getPaymentMethods,
  getAccountOnboardingLink,
  getBusinessDetails,
  getAccountBalance,
  getCurrentUserData,
  updateCurrentUser
} from '../../../redux/actions'

const Shell = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`

const Container = styled.div`
  display: flex;
  width: 953px;
  justify-content: space-between;
  margin-top: 5px;
  ${props => (props.border ? `border-top: 1px #333 solid` : `border-top: none`)};
`
const LeftOne = styled.div``
const TitleOne = styled.div`
  padding: 14px 0px;
  color: #737373;
  font-size: 24px;
  font-style: sans serif collection;
`
const ButtonOne = styled.button`
  width: 225px;
  height: 45px;
  background: #d9d9d9;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0px;
`
const ButtonSubmit = styled.button`
  width: 225px;
  height: 45px;
  background: #1772eb;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0px;
  :disabled {
    cursor: default;
    opacity: 0.5;
    background: #d8d8d8;
  }
`
const RightOne = styled.div`
  width: 600px;
`
const Align = styled.div`
  width: 285px;
`
const Align2 = styled.div`
  width: 185px;
`
const Rows = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px;
  ${props => (props.fullHeight ? `height: 100%` : ``)};
`
const Item = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  align-items: center;
`
const Span = styled.div`
  padding-left: 5px;
`
const EditButton = styled.div`
  outline: none;
  background: none;
  border: none;
  color: #039be5;
  font-size: 16px;
  cursor: pointer;
`
const SubTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: #121530;
`

const getCardLogoUrl = cardType => {
  const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType)
  return stripeLogoEnum[brand]
}

const DesktopAccount = ({
  stripeAccountId,
  user,
  getPaymentMethods,
  getAccountOnboardingLink,
  getBusinessDetails,
  balance,
  getAccountBalance,
  business,
  paymentMethods = [],
  getCurrentUserData,
  updateCurrentUser
}) => {
  const router = useRouter()

  const initialState = {
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    FirstName: user?.FirstName,
    LastName: user?.LastName,
    AddressLineOne: user?.AddressLineOne,
    AddressLineTwo: user?.AddressLineTwo,
    AddressState: user?.AddressState,
    AddressCity: user?.AddressCity,
    AddressZip: user?.AddressZip,
    businessName: business?.name,
    businessType: business?.type,
    businessPhone: business?.businessPhone,
    taxId: business?.taxId
  }

  const primaryPM = paymentMethods?.find(e => e.isPrimary)

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

  const [editMode, setMode] = useState({
    editName: false,
    editAddress: false,
    editCompany: false
  })

  const [userData, setUserData] = useState({
    ...initialState
  })

  useEffect(() => {
    const fetchData = async () => {
      await getCurrentUserData()
      await getPaymentMethods()
      await getBusinessDetails(undefined)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchBalanceData = async () => {
      getAccountBalance()
    }

    fetchBalanceData()
    // Call getAccountBalance on component load
    // Set up an interval to call getAccountBalance every 5 minutes
    const intervalId = setInterval(() => {
      getAccountBalance()
    }, 300000) // 300000 ms = 5 minutes

    return () => clearInterval(intervalId)
  }, [])

  const enableEditing = (field, value) => {
    setMode({
      ...editMode,
      [field]: value
    })
  }

  const validateString = ({ item, min, max, message }, setErrorMessage) => {
    if (item === '') {
      setErrorMessage('This field is required!')
      return
    }
    const isValid = ValidationUtils._validateString(item, { min, max })
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

  const fetchAccountOnboardingLink = async () => {
    await getAccountOnboardingLink({ url: '/dashboard/account' })
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
    if (item === '') {
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

  const onSubmit = async () => {
    const response = await updateCurrentUser(userData)
    if (response?.status === 200) {
      setMode({
        ...editMode,
        editName: false,
        editAddress: false,
        editCompany: false
      })
      await router.push('/dashboard/account')
    } else {
      setError(response?.data?.message ?? 'Something went wrong')
    }
  }

  return (
    <Shell>
      <BackHeader title="Account" />
      <Container>
        <LeftOne>
          <TitleOne>Membership & Billing</TitleOne>
          <ButtonOne
            data-testid={'view_profile'}
            onClick={() => {
              if (user?.role === 1) {
                router.push(`/freelancers/${user.freelancers?._id}`)
              }
            }}>
            View profile
          </ButtonOne>
        </LeftOne>
        <RightOne>
          <Rows>
            <Item>{userData?.email}</Item>
            <Link href="/change-email">Change email</Link>
          </Rows>
          <Rows>
            <Item>Password: ******</Item>
            <Link href="/change-password">Change password</Link>
          </Rows>
          <Rows>
            <Item>Phone: {userData?.phoneNumber}</Item>
            <Link href="/change-phone">Change number</Link>
          </Rows>
          <Underline color="#333" />
          <Rows>
            <Item>
              <img height={20} src={getCardLogoUrl(primaryPM?.card)} />
              <Span>**** **** **** {primaryPM?.lastFour}</Span>
            </Item>
            <Link href="/manage-payment-method">Manage payment method</Link>
          </Rows>
          <Rows>
            <Item>Your next billing date is </Item>
            <Link href="/billing-details">Billing details</Link>
          </Rows>
          <Rows>
            <Item>Balance</Item>
            <Item>$ {(balance?.available[0]?.amount / 100).toFixed(2).toLocaleString()}</Item>
          </Rows>
          <Rows>
            <Item>{stripeAccountId ? '' : 'Withdraw'}</Item>
            {stripeAccountId ? (
              <Link href="/dashboard/withdrawal/terms">Withdraw Funds</Link>
            ) : (
              <EditButton onClick={() => fetchAccountOnboardingLink()} data-testid="complete_onboarding_button">
                Complete Onboarding
              </EditButton>
            )}
          </Rows>
        </RightOne>
      </Container>
      <Container border>
        <LeftOne>
          <TitleOne>Plan Details</TitleOne>
        </LeftOne>
        <RightOne>
          <Rows fullHeight>
            <Item>{userData?.email}</Item>
            <Link href={'/pick-a-plan'}>Change plan</Link>
          </Rows>
        </RightOne>
      </Container>
      <Container border>
        <LeftOne>
          <TitleOne>Profile</TitleOne>
        </LeftOne>
        <RightOne>
          <Rows>
            <SubTitle>Name</SubTitle>
            <EditButton data-testid="edit_name_button" onClick={() => enableEditing('editName', true)}>
              Edit
            </EditButton>
          </Rows>
          <Rows>
            <Align>
              <FormField
                fieldType="input"
                placeholder="First Name"
                borderRadius="10px"
                name="FirstName"
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
                disabled={!editMode?.editName}
                onChange={e => updateForm('FirstName', e.target.value)}
                value={userData?.FirstName}>
                First Name
              </FormField>
            </Align>
            <Align>
              <FormField
                fieldType="input"
                placeholder="Last Name"
                borderRadius="10px"
                name="LastName"
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
                value={userData?.LastName}
                disabled={!editMode?.editName}>
                Last Name
              </FormField>
            </Align>
          </Rows>
          <Underline color="#333" margin="15px 0px 5px 0px" />
          <Rows>
            <SubTitle>Address</SubTitle>
            <EditButton data-testid="edit_address_button" onClick={() => enableEditing('editAddress', true)}>
              Edit
            </EditButton>
          </Rows>
          <Rows>
            <FormField
              fieldType="input"
              width="100%"
              placeholder="123 address st."
              borderRadius="10px"
              zIndexUnset
              id="AddressLineOne"
              error={addressLineOneError}
              onBlur={() => {
                updateDisabled()
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
              disabled={!editMode?.editAddress}
              onChange={e => updateForm('AddressLineOne', e.target.value)}
              value={userData?.AddressLineOne}>
              Address Line 1
            </FormField>
          </Rows>
          <Rows>
            <FormField
              fieldType="input"
              width="100%"
              placeholder="apt, bldng, etc."
              borderRadius="10px"
              id="AddressLineTwo"
              error={addressLineTwoError}
              onBlur={() => {
                updateDisabled()
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
              disabled={!editMode?.editAddress}
              zIndexUnset>
              Address Line 2
            </FormField>
          </Rows>
          <Rows>
            <Align2>
              <FormField
                fieldType="input"
                width="100%"
                placeholder="Columbus"
                borderRadius="10px"
                id="AddressCity"
                zIndexUnset
                disabled={!editMode?.editAddress}
                error={addressCityError}
                onBlur={() => {
                  updateDisabled()
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
            </Align2>
            <Align2>
              <FormField
                fieldType="input"
                width="100%"
                placeholder="OH"
                borderRadius="10px"
                id="AddressState"
                zIndexUnset
                disabled={!editMode?.editAddress}
                error={addressStateError}
                onBlur={() => {
                  updateDisabled()
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
            </Align2>
            <Align2>
              <FormField
                fieldType="input"
                width="100%"
                placeholder="43220"
                borderRadius="10px"
                zIndexUnset
                id="AddressZip"
                disabled={!editMode?.editAddress}
                error={addressZipError}
                onBlur={() => {
                  updateDisabled()
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
            </Align2>
          </Rows>
          <Underline color="#333" margin="15px 0px 5px 0px" />
          <Rows>
            <SubTitle>Company</SubTitle>
            <EditButton data-testid="edit_company_button" onClick={() => enableEditing('editCompany', true)}>
              {!business ? 'verify business details' : 'Edit'}
            </EditButton>
          </Rows>
          {business && (
            <Rows>
              <FormField
                fieldType="input"
                width="100%"
                placeholder="Unzipped"
                zIndexUnset
                id="businessName"
                disabled={!editMode?.editCompany}
                error={businessNameError}
                onBlur={() => {
                  updateDisabled()
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
            </Rows>
          )}
          {business && (
            <Rows>
              <FormField
                fieldType="input"
                width="100%"
                placeholder="LLC"
                borderRadius="10px"
                id="businessType"
                disabled={!editMode?.editCompany}
                zIndexUnset
                error={businessTypeError}
                onBlur={() => {
                  updateDisabled()
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
            </Rows>
          )}
          {business && (
            <Rows>
              <Align>
                <FormField
                  fieldType="input"
                  disabled={!editMode?.editCompany}
                  width="100%"
                  id="businessPhone"
                  placeholder="1 (833) 366-4285"
                  borderRadius="10px"
                  zIndexUnset
                  error={businessPhoneError}
                  onBlur={() => {
                    updateDisabled()
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
              </Align>
              <Align>
                <FormField
                  fieldType="input"
                  disabled={!editMode?.editCompany}
                  width="100%"
                  placeholder="**-*****42"
                  id="taxId"
                  borderRadius="10px"
                  error={taxIdError}
                  onBlur={() => {
                    updateDisabled()
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
              </Align>
            </Rows>
          )}
        </RightOne>
      </Container>
      {error && (
        <p className="red-text" data-testid="account_error">
          {error}
        </p>
      )}
      <Container border>
        <div></div>
        <Rows>
          <div></div>
          <ButtonSubmit
            data-testid={'submimt_button'}
            disabled={areObjectsEqual(userData, initialState)}
            onClick={onSubmit}>
            Save Settings
          </ButtonSubmit>
        </Rows>
      </Container>
      <Container border></Container>
    </Shell>
  )
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
    user: state.Auth.user,
    paymentMethods: state.Stripe.methods,
    url: state.Stripe?.url,
    business: state.Business.details,
    stripeAccountId: state.Auth.user.stripeAccountId,
    balance: state.Stripe?.balance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
    getAccountOnboardingLink: bindActionCreators(getAccountOnboardingLink, dispatch),
    getBusinessDetails: bindActionCreators(getBusinessDetails, dispatch),
    getAccountBalance: bindActionCreators(getAccountBalance, dispatch),
    getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch),
    updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopAccount)
