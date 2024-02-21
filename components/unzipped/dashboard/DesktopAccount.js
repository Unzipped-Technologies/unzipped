import React, { useEffect, useState } from 'react'
import BackHeader from '../BackHeader';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPaymentMethods, getBusinessDetails } from '../../../redux/actions';
import { stripeBrandsEnum, stripeLogoEnum } from '../../../server/enum/paymentEnum'
import {
    Underline
} from './style'
import { areObjectsEqual } from '../../../services/formHelper'
import FormField from '../../ui/FormField'
import { ValidationUtils } from '../../../utils'

const Shell = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Container = styled.div`
    display: flex;
    width: 953px;
    justify-content: space-between;
    margin-top: 5px;
    ${(props) => (props.border ? `border-top: 1px #333 solid` : `border-top: none`)};
`;
const LeftOne = styled.div``;
const TitleOne = styled.div`
    padding: 14px 0px;
    color: #737373;
    font-size: 24px;
    font-style: sans serif collection;
`;
const ButtonOne = styled.button`
    width: 225px;
    height: 45px;
    background: #D9D9D9;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
`;
const ButtonSubmit = styled.button`
    width: 225px;
    height: 45px;
    background: #1772EB;
    color: #fff;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
    :disabled {
        cursor: default;
        opacity: 0.5;
        background: #D8D8D8;
    }
`;
const RightOne = styled.div`
    width: 600px;
`;
const Align = styled.div`
    width: 285px;
`;
const Align2 = styled.div`
    width: 185px;
`;
const Rows = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    ${(props) => (props.fullHeight ? `height: 100%` : ``)};
`;
const Item = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    align-items: center;
`;
const Link = styled.a`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const Span = styled.div`
    padding-left: 5px;
`;
const EditButton = styled.div`
    outline: none;
    background: none;
    border: none;
    color: #039be5;
    font-size: 16px;
    cursor: pointer;
`;
const SubTitle = styled.div`
    font-weight: 600;
    font-size: 24px;
    color: #121530;
`;

const getCardLogoUrl = (cardType) => {
    const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType);
    return stripeLogoEnum[brand];
};

const DesktopAccount = ({email, phone, user, getPaymentMethods, getBusinessDetails, business, token, paymentMethods = []}) => {
    const primaryPM = paymentMethods.find(e => e.isPrimary)
    const [editName, setEditName] = useState(false)
    const [editAddress, setEditAddress] = useState(false)
    const [editCompany, setEditCompany] = useState(false)
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
    const initialState = {
        firstName: user?.FirstName,
        lastName: user?.LastName,
        addressLineOne: user?.AddressLineOne,
        addressLineTwo: user?.AddressLineTwo,
        addressState: user?.AddressState,
        addressCity: user?.AddressCity,
        addressZip: user?.AddressZip,
        businessName: business?.name,
        businessType: business?.type,
        businessPhone: business?.businessPhone,
        taxId: business?.taxId,
    }
    const [userData, setUserData] = useState({
        ...initialState
    })

    const updateForm = (type, data) => {
        setUserData({
            ...userData,
            [type]: data
        })
    }

    const validateString = ({item, min, max, message}, setError) => {
        if (item === '') {
            setError("This field is required!")
            return;
        }
        const isValid = ValidationUtils._validateString(item, {min, max})
        if (isValid) {
            setError('')
        } else {
            setError(message)
        }
    }

    const validateEin = ({item, message}, setError) => {
        if (item === '') {
            setError("This field is required!")
            return;
        }
        const isValid = ValidationUtils._validateEIN(item)
        if (isValid) {
            setError('')
        } else {
            setError(message)
        }
    }

    useEffect(() => {
        getPaymentMethods(token)
        getBusinessDetails(undefined, token)
    }, [])
    
    const updateDisabled = () => {
        const isDirty = areObjectsEqual(userData, initialState)
        if (isDirty) {
            setEditName(false)
            setEditAddress(false)
            setEditCompany(false)
        }
    }

    return (
        <Shell>
            <BackHeader 
                title="Account"
            />
            <Container>
                <LeftOne>
                    <TitleOne>Membership & Billing</TitleOne>
                    <ButtonOne>Cancel Membership</ButtonOne>
                </LeftOne>
                <RightOne>
                    <Rows>
                        <Item>{email}</Item>
                        <Link href="/change-email">Change email</Link>
                    </Rows>
                    <Rows>
                        <Item>Password: ******</Item>
                        <Link href="/change-password">Change password</Link>
                    </Rows>
                    <Rows>
                        <Item>Phone: {phone}</Item>
                        <Link href="/change-phone">Change number</Link>
                    </Rows>
                    <Underline color="#333"/>
                    <Rows>
                        <Item>
                            <img height={20} src={getCardLogoUrl(primaryPM?.card)} />
                            <Span>**** **** **** {primaryPM?.lastFour}</Span>
                        </Item>
                        <Link href='/manage-payment-method'>Manage payment method</Link>
                    </Rows>
                    <Rows>
                        <Item>Your next billing date is {phone}</Item>
                        <Link href='/billing-details'>Billing details</Link>
                    </Rows>
                </RightOne>
            </Container>
            <Container border>
                <LeftOne>
                    <TitleOne>Plan Details</TitleOne>
                </LeftOne>
                <RightOne>
                    <Rows fullHeight>
                        <Item>{email}</Item>
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
                        <EditButton onClick={() => setEditName(true)}>Edit</EditButton>
                    </Rows>
                    <Rows>
                        <Align>
                        <FormField
                            fieldType="input"
                            placeholder="First Name"
                            borderRadius="10px"
                            name="firstName"
                            width="100%"
                            zIndexUnset
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.firstName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter a valid first name!"
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
                                        item: userData?.firstName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter a valid first name!"
                                    }, 
                                    setFirstNameError
                                )
                            }}
                            disabled={!editName}
                            onChange={e => updateForm('firstName', e.target.value)}
                            value={userData?.firstName}
                        >First Name</FormField>
                        </Align>
                        <Align>
                        <FormField
                            fieldType="input"
                            placeholder="Last Name"
                            borderRadius="10px"
                            name="lastName"
                            width="100%"
                            zIndexUnset
                            error={lastNameError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.lastName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter a valid last name!"
                                    }, 
                                    setLastNameError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.lastName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter a valid last name!"
                                    }, 
                                    setLastNameError
                                )
                            }}
                            onChange={e => updateForm('lastName', e.target.value)}
                            value={userData?.lastName}
                            disabled={!editName}
                        >Last Name</FormField>
                        </Align>
                    </Rows>
                    <Underline color="#333" margin="15px 0px 5px 0px" />
                    <Rows>
                        <SubTitle>Address</SubTitle>
                        <EditButton onClick={() => setEditAddress(true)}>Edit</EditButton>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="123 address st."
                            borderRadius="10px"
                            zIndexUnset
                            error={addressLineOneError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.addressLineOne, 
                                        min: 1, 
                                        max: 32,
                                        message: "Please enter a valid address!"
                                    }, 
                                    setAddressLineOneError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.addressLineOne, 
                                        min: 1, 
                                        max: 32,
                                        message: "Please enter a valid address!"
                                    }, 
                                    setAddressLineOneError
                                )
                            }}
                            disabled={!editAddress}
                            onChange={e => updateForm('addressLineOne', e.target.value)}
                            value={userData?.addressLineOne}
                        >Address Line 1</FormField>
                    </Rows>
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="apt, bldng, etc."
                            borderRadius="10px"
                            error={addressLineTwoError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.addressLineTwo, 
                                        min: 1, 
                                        max: 32,
                                        message: "Please enter a valid address!"
                                    }, 
                                    setAddressLineTwoError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.addressLineTwo, 
                                        min: 1, 
                                        max: 32,
                                        message: "Please enter a valid address!"
                                    }, 
                                    setAddressLineTwoError
                                )
                            }}
                            onChange={e => updateForm('addressLineTwo', e.target.value)}
                            value={userData?.addressLineTwo}
                            disabled={!editAddress}
                            zIndexUnset
                        >Address Line 2</FormField>
                    </Rows>
                    <Rows>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="Columbus"
                            borderRadius="10px"
                            zIndexUnset
                            disabled={!editAddress}
                            error={addressCityError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.addressCity, 
                                        min: 1, 
                                        max: 40,
                                        message: "Please enter a valid city!"
                                    }, 
                                    setAddressCityError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.addressCity, 
                                        min: 1, 
                                        max: 40,
                                        message: "Please enter a valid city!"
                                    }, 
                                    setAddressCityError
                                )
                            }}
                            onChange={e => updateForm('addressCity', e.target.value)}
                            value={userData?.addressCity}
                        >City</FormField>
                        </Align2>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="OH"
                            borderRadius="10px"
                            zIndexUnset
                            disabled={!editAddress}
                            error={addressStateError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.addressState, 
                                        min: 1, 
                                        max: 30,
                                        message: "Please enter a valid state!"
                                    }, 
                                    setAddressStateError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.addressState, 
                                        min: 1, 
                                        max: 30,
                                        message: "Please enter a valid state!"
                                    }, 
                                    setAddressStateError
                                )
                            }}
                            onChange={e => updateForm('addressState', e.target.value)}
                            value={userData?.addressState}
                        >State</FormField>
                        </Align2>
                        <Align2>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="43220"
                            borderRadius="10px"
                            zIndexUnset
                            disabled={!editAddress}
                            error={addressZipError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.addressZip, 
                                        min: 1, 
                                        max: 6,
                                        message: "Please enter a valid zip!"
                                    }, 
                                    setAddressZipError
                                )
                            }}
                            validate={() => {
                                validateString(
                                    { 
                                        item: userData?.addressZip, 
                                        min: 1, 
                                        max: 6,
                                        message: "Please enter a valid zip!"
                                    }, 
                                    setAddressZipError
                                )
                            }}
                            onChange={e => updateForm('addressZip', e.target.value)}
                            value={userData?.addressZip}
                        >Zip Code</FormField>
                        </Align2>
                    </Rows>
                    <Underline color="#333" margin="15px 0px 5px 0px" />
                    <Rows>
                        <SubTitle>Company</SubTitle>
                        <EditButton onClick={() => setEditCompany(true)}>{!business ? 'verify business details' : 'Edit'}</EditButton>
                    </Rows>
                    {business && (
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="Unzipped"
                            zIndexUnset
                            disabled={!editCompany}
                            error={businessNameError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.businessName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter a valid name!"
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
                                        message: "Please enter a valid name!"
                                    }, 
                                    setBusinessNameError
                                )
                            }}
                            borderRadius="10px"
                            onChange={e => updateForm('businessName', e.target.value)}
                            value={userData?.businessName}
                        >Business Name</FormField>
                    </Rows>
                    )}
                    {business && (
                    <Rows>
                        <FormField
                            fieldType="input"
                            width="100%"
                            placeholder="LLC"
                            borderRadius="10px"
                            disabled={!editCompany}
                            zIndexUnset
                            error={businessTypeError}
                            onBlur={() => {
                                updateDisabled()
                                validateString(
                                    { 
                                        item: userData?.businessName, 
                                        min: 1, 
                                        max: 45,
                                        message: "Please enter business type (LLC, C-corp, etc.)!"
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
                                        message: "Please enter business type (LLC, C-corp, etc.)!"
                                    }, 
                                    setBusinessTypeError
                                )
                            }}
                            onChange={e => updateForm('businessType', e.target.value)}
                            value={userData?.businessType}
                        >Business Type</FormField>
                    </Rows>
                    )}
                    {business && (
                    <Rows>
                        <Align>
                            <FormField
                                fieldType="input"
                                disabled={!editCompany}
                                width="100%"
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
                                            message: "Please enter a valid phone number!"
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
                                            message: "Please enter a valid phone number!"
                                        }, 
                                        setBusinessPhoneError
                                    )
                                }}
                                onChange={e => updateForm('businessPhone', e.target.value)}
                                value={userData?.businessPhone}
                            >Phone Number</FormField>
                        </Align>
                        <Align>
                            <FormField
                                fieldType="input"
                                disabled={!editCompany}
                                width="100%"
                                placeholder="**-*****42"
                                borderRadius="10px"
                                error={taxIdError}
                                onBlur={() => {
                                    updateDisabled()
                                    updateForm('taxId', ValidationUtils._formatToEIN(userData?.taxId))
                                    validateEin(
                                        { 
                                            item: ValidationUtils._formatToEIN(userData?.taxId), 
                                            message: "Please enter a valid EIN!"
                                        }, 
                                        setTaxIdError
                                    )
                                }}
                                validate={() => {
                                    validateEin(
                                        { 
                                            item: userData?.taxId, 
                                            message: "Please enter a valid EIN!"
                                        }, 
                                        setTaxIdError
                                    )
                                }}
                                onChange={e => updateForm('taxId', e.target.value)}
                                value={userData?.taxId}
                                zIndexUnset
                            >Tax EIN or Social security Number</FormField>
                        </Align>
                    </Rows>
                    )}
                </RightOne>
            </Container>
            <Container border>
                <div></div>
                <Rows>
                    <div></div>
                    <ButtonSubmit disabled={areObjectsEqual(userData, initialState)}>Save Settings</ButtonSubmit>
                </Rows>
            </Container>
            <Container border></Container>
        </Shell>
    )
}

const mapStateToProps = state => {
    return {
      token: state.Auth.token,
      email: state.Auth.email,
      phone: state.Auth.user.phoneNumber,
      user: state.Auth.user,
      paymentMethods: state.Stripe.methods,
      business: state.Business.details,
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
      getBusinessDetails: bindActionCreators(getBusinessDetails, dispatch),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DesktopAccount)