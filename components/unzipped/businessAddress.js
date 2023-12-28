import React, { useEffect, useState } from 'react'
import { DarkText, TitleText, WhiteCard, Absolute } from './dashboard/style'
import styled from 'styled-components'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import Image from '../ui/Image'
import { CircularProgress } from '@material-ui/core'
import useWindowSize from '../ui/hooks/useWindowSize'

const InputLabel = styled.label`
  color: #333;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 12.25px; /* 102.083% */
  letter-spacing: 0.2px;
  text-transform: capitalize;
`

const Container = styled.div`
  @media screen and (max-width: 680px) {
    width: 100%;
    margin: 5px;
  }
`

const ButtonContainer = styled.div`
  margin: 15px 0px 0px 70%;
`

const Span = styled.div`
  width: 200px;
`

const BusinessAddress = ({ form, planCost, subscriptionForm, updateSubscription, onClick, loading }) => {
  const initialAddress = {
    country: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: ''
  }
  const [isBusinessAddress, setIsBusinessAddress] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()
  const [businessAddress, setBusinessAddress] = useState(initialAddress)

  const businessAddressUpdate = () => {
    onClick && onClick(businessAddress)
    setIsBusinessAddress(false)
    setIsUpdated(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 750)
    setBusinessAddress(initialAddress)
  }

  useEffect(() => {
    if (width <= 600) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  const disableButton = () => {
    return !Object.values(businessAddress).every(value => value.trim() !== '')
  }

  return (
    <Container>
      {isBusinessAddress ? (
        <WhiteCard noMargin>
          <TitleText size="16px">Business Address</TitleText>
          <DarkText fontSize="12px" lineHeight="9.75px" lighter>
            Used on customer order confirmations and your Unzipped bill.
          </DarkText>
          <FormField
            zIndexUnset
            color="#333"
            fieldType="input"
            fontSize="13px"
            fontWeight="400"
            lineHeight="12.25px"
            width={isSmallWindow ? '100%' : '90%'}
            margin={isSmallWindow ? '0px' : '0px 0px 0px 10%'}
            onChange={e =>
              setBusinessAddress(prevAddress => ({
                ...prevAddress,
                country: e.target.value
              }))
            }
            value={form?.BusinessAddressLineCountry}>
            COUNTRY/REGION
          </FormField>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '20px',
              width: width <= 600 ? '100%' : '90%',
              marginRight: '5%',
              marginLeft: '5%'
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: width <= 600 ? '44%' : '46%' }}>
              <InputLabel>First Name</InputLabel>
              <input
                type="text"
                style={{
                  borderRadius: '4px',
                  border: '2px solid #d8d8d8',
                  background: 'transparent',
                  marginTop: '5px',
                  paddingLeft: '10px'
                }}
                onChange={e =>
                  setBusinessAddress(prevAddress => ({
                    ...prevAddress,
                    firstName: e.target.value
                  }))
                }
                value={form?.BusinessFirstName}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: width <= 600 ? '44%' : '46%',
                marginRight: '15px'
              }}>
              <InputLabel>Last Name</InputLabel>
              <input
                type="text"
                style={{
                  borderRadius: '4px',
                  border: '2px solid #d8d8d8',
                  background: 'transparent',
                  marginTop: '5px',
                  paddingLeft: '10px'
                }}
                onChange={e =>
                  setBusinessAddress(prevAddress => ({
                    ...prevAddress,
                    lastName: e.target.value
                  }))
                }
                value={form?.BusinessLastName}
              />
            </div>{' '}
          </div>
          <FormField
            zIndexUnset
            fieldType="input"
            margin={isSmallWindow ? '15px 0px 0px 0px' : '15px 0px 0px 10%'}
            fontSize="13px"
            noMargin
            width={width <= 600 ? '100%' : '90%'}
            onChange={e =>
              setBusinessAddress(prevAddress => ({
                ...prevAddress,
                address: e.target.value
              }))
            }
            value={form?.BusinessAddressLineOne}>
            ADDRESS
          </FormField>
          <FormField
            zIndexUnset
            fieldType="input"
            margin={isSmallWindow ? '15px 0px 0px 0px' : '15px 0px 0px 10%'}
            fontSize="13px"
            noMargin
            width={width <= 600 ? '100%' : '90%'}
            onChange={e =>
              setBusinessAddress(prevAddress => ({
                ...prevAddress,
                apartment: e.target.value
              }))
            }
            value={form?.BusinessAddressLineTwo}>
            APPARTMENT, SUITE, ETC.
          </FormField>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '20px',
              width: width <= 600 ? '100%' : '90%',
              marginRight: '5%',
              marginLeft: '5%'
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: width <= 600 ? '44%' : '46%' }}>
              <InputLabel>CITY</InputLabel>
              <input
                type="text"
                style={{
                  borderRadius: '4px',
                  border: '2px solid #d8d8d8',
                  background: 'transparent',
                  marginTop: '5px',
                  paddingLeft: '10px'
                }}
                onChange={e =>
                  setBusinessAddress(prevAddress => ({
                    ...prevAddress,
                    city: e.target.value
                  }))
                }
                value={form?.BusinessAddressCity}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: width <= 600 ? '44%' : '46%',
                marginRight: '15px'
              }}>
              <InputLabel>STATE</InputLabel>
              <input
                type="text"
                style={{
                  borderRadius: '4px',
                  border: '2px solid #d8d8d8',
                  background: 'transparent',
                  marginTop: '5px',
                  paddingLeft: '10px'
                }}
                onChange={e =>
                  setBusinessAddress(prevAddress => ({
                    ...prevAddress,
                    state: e.target.value
                  }))
                }
                value={form?.BusinessAddressState}
              />
            </div>{' '}
          </div>
          <FormField
            zIndexUnset
            fieldType="input"
            margin={isSmallWindow ? '15px 0px 0px 0px' : '15px 0px 0px 10%'}
            fontSize="13px"
            noMargin
            width={width <= 600 ? '50%' : '44%'}
            onChange={e =>
              setBusinessAddress(prevAddress => ({
                ...prevAddress,
                zipCode: e.target.value
              }))
            }
            value={form?.BusinessAddressZip}>
            ZIP CODE
          </FormField>
          <ButtonContainer>
            <Button noBorder onClick={businessAddressUpdate} disabled={disableButton()}>
              {loading ? (
                <Span>
                  <CircularProgress size={18} />
                </Span>
              ) : (
                'SAVE ADDRESS'
              )}
            </Button>
          </ButtonContainer>
        </WhiteCard>
      ) : (
        <WhiteCard
          onClick={() => {
            setIsUpdated(false)
            setIsBusinessAddress(true)
          }}>
          <TitleText size="22px">Business address</TitleText>
          <Absolute top={!isLoading ? '12px' : '18px'}>
            {isUpdated && isLoading && <CircularProgress size={24} />}
            {isUpdated && !isLoading && (
              <Image
                src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1671323871/verifiedCheck_w902qa.png"
                alt="success"
                height="34px"
                width="34px"
              />
            )}
            {!isUpdated && (
              <Button type="outlineInverse" small onClick={() => setIsBusinessAddress(true)}>
                Add
              </Button>
            )}
          </Absolute>
        </WhiteCard>
      )}
    </Container>
  )
}

export default BusinessAddress
