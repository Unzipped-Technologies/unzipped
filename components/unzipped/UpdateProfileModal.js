import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { TitleText, DIV } from '../../components/unzipped/dashboard/style'
import { Button, FormField, Modal, Text } from '../ui'
import {
    getCurrentUserData, updateCurrentUser, getBusinessDetails,
    updateBusinessDetails, getVerifyIdentityUrl
} from '../../redux/actions'
import { IoMdLock } from "react-icons/io";
import { useRouter } from 'next/router'
import { accountVerificationEnum } from '../../server/enum/accountTypeEnum'

const UpdateProfileModal = ({ open, onHide, user, updateCurrentUser, business, updateBusinessDetails, getVerifyIdentityUrl }) => {

    const router = useRouter()
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')
    const initialState = {
        email: user?.email,
        phoneNumber: user?.phoneNumber,
        FirstName: user?.FirstName,
        LastName: user?.LastName,
        AddressLineOne: user?.AddressLineOne,
        AddressLineTwo: user?.AddressLineTwo,
        AddressState: user?.AddressState ?? '',
        AddressCity: user?.AddressCity,
        AddressZip: user?.AddressZip,
        AddressLineCountry: user?.AddressLineCountry,
        businessName: business?.name,
    }

    const [userData, setUserData] = useState({
        ...initialState
    })

    const updateForm = (type, data) => {

        setIsEdit(true)
        setError(" ")
        setUserData({
            ...userData,
            [type]: data
        })

    }

    const onSubmit = async () => {

        if (userData?.AddressLineCountry !== user?.AddressLineCountry && user?.isIdentityVerified !== accountVerificationEnum.SUCCESS) {
            setError("Please verify your identity")
            setIsEdit(false)
            return ;

        }
        await updateBusinessDetails({ 'name': userData?.businessName })
        const response = await updateCurrentUser(userData)
        if (response?.status === 200) {
            onHide()
            await router.push('/dashboard/account')
        } else {
            setError(response?.data?.message ?? 'Something went wrong')
        }
      
    }

    const verifyIdentity = () => {
        if (user?.isIdentityVerified !== accountVerificationEnum.SUCCESS) {
            getVerifyIdentityUrl(user._id);
        }
    }

    return (
        <>
            {open && window.innerWidth < 680 && (
                <Modal
                    onHide={onHide}
                    background="#D9D9D9 "
                    width="900px"
                    height="73%"
                    margin="70px 10px 70px 10px"
                    hasHiddenIcon={false}
                >
                    <div style={{ marginTop: '15px', marginRight: '20px', display: "flex ", flexDirection: "column" }}>
                        <TitleText size="18px" color="#222222" marginBottom="0px" >
                            Profile Details
                        </TitleText>
                        <hr />
                        <div >
                            <TitleText size="16px" color="#222222">
                                Name
                            </TitleText>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>

                                <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="First Name"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.FirstName}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('FirstName', e.target.value)}
                                    >
                                        First Name
                                    </FormField>
                                </DIV>

                                <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Last Name"
                                        fontSize="14px"
                                        width="100%"
                                        margin="7px 0px 20px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.LastName}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('LastName', e.target.value)}
                                    >
                                        Last Name
                                    </FormField>
                                </DIV>

                            </div>

                        </div>
                        <hr />
                        <div style={{ marginTop: '10px' }}>
                            <TitleText size="16px" color="#222222">
                                Address
                            </TitleText>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                                <DIV display="flex" margin="5px 0px 28px 0px" alignItems="center" gap="5px">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Address Line 1"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressLineOne}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressLineOne', e.target.value)}
                                    >
                                        Address
                                    </FormField>
                                </DIV>
                                <DIV display="flex" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Address Line 2"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressLineTwo}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressLineTwo', e.target.value)}
                                    >

                                    </FormField>
                                </DIV>

                                <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="City"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressCity}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressCity', e.target.value)}
                                    >
                                        City/Town
                                    </FormField>
                                </DIV>
                                <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        type="number"
                                        placeholder="Zip Code"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressZip}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressZip', e.target.value)}
                                    >
                                        Zip / Postal Code
                                    </FormField>
                                </DIV>

                                <DIV display="flex" margin="5px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Zip Code"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressState}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressState', e.target.value)}
                                    >
                                        State/Region
                                    </FormField>
                                </DIV>


                                <DIV display="block" margin="5px 0px 15px 0px" alignItems="center" position="relative">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Country"
                                        fontSize="14px"
                                        width="99%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.AddressLineCountry}
                                        maxLength="30"
                                        min={0}
                                        onChange={e => updateForm('AddressLineCountry', e.target.value)}>
                                        Country


                                    </FormField>
                                    
                                    

                                    <p style={{ textAlign: "justify", marginTop: '30px', fontSize: '15px', padding: '10px', marginBottom: '0px' }}>
                                        In order to change your country, we require you to <br />
                                        <span
                                            style={{ fontSize: '15px', color: '#0095dd', margin: '0px', cursor: 'pointer' }}
                                            className="verify-identity"
                                            onClick={verifyIdentity}
                                        >
                                            Verify your Identity.
                                        </span>
                                        This is so we can verify your address details. The country will be automatically updated once the process is complete.
                                    </p>

                                </DIV>

                                <DIV display="flex" margin="0px 0px 15px 0px" alignItems="center">
                                    <FormField
                                        zIndexUnset
                                        fieldType="input"
                                        placeholder="Company"
                                        id="businessName"
                                        fontSize="14px"
                                        width="100%"
                                        margin="6px 0px 10px 10px"
                                        height="30px  !important"
                                        borderRadius="4px"
                                        border="1px solid #A5A0A0"
                                        value={userData?.businessName}
                                        maxLength="30"
                                        min={0}
                                        onChange={(e) => {
                                            updateForm('businessName', e.target.value);
                                        }}
                                    >
                                        Company
                                    </FormField>
                                </DIV>

                            </div>

                        </div>

                        {error && (
                            <p style={{ color: 'red', padding: '10px' }}>
                                {error}
                            </p>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', gap: '10px' }}>

                            <Button width="90px" buttonHeight="25px" padding="14px" borderRadius="5px" type="outlineInverse"
                                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"

                                colors={{
                                    text: '#1976D2',
                                    background: 'white',
                                    border: '1px',
                                    wideBorder: '#1976D2'
                                }}
                                onClick={() => {
                                    onHide()
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={!isEdit}
                                width="90px" 
                                buttonHeight="25px" 
                                padding="14px" 
                                borderRadius="5px" 
                                type="outlineInverse" 
                                fontSize="15px"
                                boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
                                colors={{
                                    text: '#FFF',
                                    background: '#1976D2',
                                    border: '1px',
                                    wideBorder: '#1976D2'
                                }}
                                onClick={onSubmit}>
                                Update
                            </Button>

                        </div>

                    </div>
                </Modal>
            )}
        </>
    )
}

const mapStateToProps = state => {
    return {
        token: state.Auth.token,
        user: state.Auth.user,
        business: state.Business.details,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentUserData: bindActionCreators(getCurrentUserData, dispatch),
        updateCurrentUser: bindActionCreators(updateCurrentUser, dispatch),
        getBusinessDetails: bindActionCreators(getBusinessDetails, dispatch),
        updateBusinessDetails: bindActionCreators(updateBusinessDetails, dispatch),
        getVerifyIdentityUrl: bindActionCreators(getVerifyIdentityUrl, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileModal)
