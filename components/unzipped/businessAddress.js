import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

import Image from '../ui/Image'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import useWindowSize from '../ui/hooks/useWindowSize'
import { DarkText, TitleText, WhiteCard, Absolute, Grid2, Grid3, TEXT } from './dashboard/style'
import { useDispatch } from 'react-redux';
import { createBusinessAddress } from '../../redux/Auth/actions';
import { useSelector } from 'react-redux';

const Container = styled.div`
  margin: 0px 0px 0px 0px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
`

const Span = styled.div`
  width: 200px;
`

const BusinessAddress = ({ selectedBusiness = null, onClick }) => {
  const { width } = useWindowSize()
  const isMobile = window.innerWidth > 680 ? false : true
  const dispatch = useDispatch()
  const userId = useSelector(state => state.Auth?.user?._id);
  const token = useSelector(state => state.Auth?.token);
  const [isBusinessAddress, setIsBusinessAddress] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const [error, setError] = useState('')
  const [address, setBusinessAddress] = useState({
    businessAddressLineOne: '',
    businessAddressLineTwo: '',
    businessCountry: '',
    businessFirstName: '',
    businessLastName: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
  })

  useEffect(() => {
    if (selectedBusiness?._id) {
      setBusinessAddress(prevState => ({
        ...prevState,
        businessAddressLineOne: selectedBusiness?.businessAddressLineOne ?? '',
        businessAddressLineTwo: selectedBusiness?.businessAddressLineTwo ?? '',
        businessCountry: selectedBusiness?.businessCountry ?? '',
        businessFirstName: selectedBusiness?.businessFirstName ?? '',
        businessLastName: selectedBusiness?.businessLastName ?? '',
        businessCity: selectedBusiness?.businessCity ?? '',
        businessState: selectedBusiness?.businessState ?? '',
        businessZip: selectedBusiness?.businessZip ?? '',
        businessPhone: selectedBusiness?.businessPhone ?? ''
      }))
    }
  }, [selectedBusiness])

  useEffect(() => {
    if (width <= 680) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  const updateField = (field, value) => {
    setBusinessAddress({ ...address, [field]: value })
  }
  const businessAddressUpdate = async () => {
    setIsLoading(true)

    try {
      const response = await dispatch(createBusinessAddress(userId, address, token));

      if (response && response.status === 200) {
        setIsBusinessAddress(false);
        setIsUpdated(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        console.warn("Unexpected Response Format:", response);
        setError(response?.data?.msg ?? 'Something went wrong!');
      }
    } catch (error) {
      console.error("Error in businessAddressUpdate:", error);
      setError("An unexpected error occurred.");
    }
  }

  return (
    <Container>
      {isBusinessAddress ? (
        <WhiteCard height="650px" padding="0px" data-testid="business_address" id="business_address">
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '20px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Business Address
          </TitleText>
          <DarkText>Used on customer order confirmations and your Unzipped bill.</DarkText>

          <form style={{ padding: '20px' }}>
            {error && (
              <TEXT textColor="red" textAlign="left">
                {error}
              </TEXT>
            )}
            <FormField
              fieldType="input"
              id="businessCountry"
              fontSize="12px"
              margin="0px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'COUNTRY/REGION'}
              onChange={e => updateField('businessCountry', e.target.value)}
              value={address.businessCountry}>
              COUNTRY/REGION
            </FormField>

            <Grid2 margin="0px 20px 10px 0px" block>
              <FormField
                fieldType="input"
                id="businessFirstName"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '80%'}
                placeholder={'First Name'}
                onChange={e => updateField('businessFirstName', e.target.value)}
                value={address.businessFirstName}>
                FIRST NAME
              </FormField>
              <FormField
                fieldType="input"
                fontSize="12px"
                id="businessLastName"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '80%'}
                placeholder={'Last Name'}
                onChange={e => updateField('businessLastName', e.target.value)}
                value={address.businessLastName}>
                LAST NAME
              </FormField>
            </Grid2>
            <FormField
              fieldType="input"
              id="businessAddressLineOne"
              fontSize="12px"
              margin="0px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Address'}
              onChange={e => updateField('businessAddressLineOne', e.target.value)}
              value={address.businessAddressLineOne}>
              ADDRESS
            </FormField>
            <FormField
              id="businessAddressLineTwo"
              fieldType="input"
              fontSize="12px"
              margin="10px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Appartment, suite, etc.'}
              onChange={e => updateField('businessAddressLineTwo', e.target.value)}
              value={address.businessAddressLineTwo}>
              APPARTMENT, SUITE, ETC.
            </FormField>
            <Grid3 margin="0px 10px 10px 0px" block>
              <FormField
                id="businessCity"
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '70%'}
                placeholder={'City'}
                onChange={e => updateField('businessCity', e.target.value)}
                value={address.businessCity}>
                CITY
              </FormField>
              <FormField
                id="businessState"
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '70%'}
                placeholder={'State'}
                onChange={e => updateField('businessState', e.target.value)}
                value={address.businessState}>
                STATE
              </FormField>
              <FormField
                id="businessZip"
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                placeholder={'Zip Code'}
                width={isSmallWindow ? '100%' : '65%'}
                onChange={e => updateField('businessZip', e.target.value)}
                value={address.businessZip}>
                ZIP CODE
              </FormField>
            </Grid3>
            <FormField
              id="businessPhone"
              fieldType="input"
              fontSize="12px"
              margin="0px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Phone'}
              onChange={e => updateField('businessPhone', e.target.value)}
              value={address.businessPhone}>
              PHONE
            </FormField>
            <ButtonContainer>
              <Button noBorder onClick={businessAddressUpdate}>
                SAVE ADDRESS
              </Button>
            </ButtonContainer>
          </form>
        </WhiteCard>
      ) : (
        <WhiteCard
          onClick={() => {
            setIsBusinessAddress(true)
          }}>
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Business address
          </TitleText>
          <Absolute top={!isLoading ? '12px' : '18px'}>
            {isLoading && <CircularProgress data-testid="loading_spinner" id="loading_spinner" size={24} />}

            {isUpdated && !isLoading && (
              <Image
                src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png"
                alt="success"
                height="34px"
                width="34px"
                id="adress_done_image"
              />
            )}

            {!isUpdated && !isLoading && (
              <Button
                id="address_update_button"
                disabled={isLoading}
                type="outlineInverse"
                small
                onClick={() => setIsBusinessAddress(true)}>
                {selectedBusiness?._id ? 'Update' : 'Add'}
              </Button>
            )}
          </Absolute>
        </WhiteCard>
      )}
    </Container>
  )
}

export default BusinessAddress
