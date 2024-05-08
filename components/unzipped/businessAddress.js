import React, { useEffect, useState } from 'react'
import { DarkText, TitleText, WhiteCard, Absolute, Grid2, Grid3 } from './dashboard/style'
import styled from 'styled-components'
import { paymentFrequencyEnum } from '../../server/enum/planEnum'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import Image from '../ui/Image'
import { CircularProgress } from '@material-ui/core'
import useWindowSize from '../ui/hooks/useWindowSize'

const Container = styled.div`
  margin: 0px 0px 0px 0px;
`

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px 0px;
  justify-content: flex-end;
`

const Blue = styled.span`
  color: #37dec5;
  font-size: 13px;
`

const Span = styled.div`
  width: 200px;
`

const BusinessAddress = ({ form, planCost, subscriptionForm, updateSubscription, onClick, loading }) => {
  const isMobile = window.innerWidth >= 680 ? false : true

  const [isBusinessAddress, setIsBusinessAddress] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  const businessAddressUpdate = () => {
    onClick && onClick()
    setIsBusinessAddress(false)
    setIsUpdated(true)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 750)
  }

  useEffect(() => {
    if (width <= 600) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  return (
    <Container>
      {isBusinessAddress ? (
        <WhiteCard height="650px" padding="0px">
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '20px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Business Address
          </TitleText>
          <DarkText>Used on customer order confirmations and your Unzipped bill.</DarkText>
          <form style={{ padding: '20px' }}>
            <FormField
              fieldType="input"
              fontSize="12px"
              margin="10px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'COUNTRY/REGION'}
              onChange={e => updateSubscription({ BusinessAddressLineCountry: e.target.value })}
              value={form?.BusinessAddressLineCountry}>
              COUNTRY/REGION
            </FormField>
            <Grid2 margin="0px 20px 10px 0px" block>
              <FormField
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '80%'}
                placeholder={'First Name'}
                onChange={e => updateSubscription({ BusinessFirstName: e.target.value })}
                value={form?.BusinessFirstName}>
                FIRST NAME
              </FormField>
              <FormField
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '80%'}
                placeholder={'Last Name'}
                onChange={e => updateSubscription({ BusinessLastName: e.target.value })}
                value={form?.BusinessLastName}>
                LAST NAME
              </FormField>
            </Grid2>
            <FormField
              fieldType="input"
              fontSize="12px"
              margin="0px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Address'}
              onChange={e => updateSubscription({ BusinessAddressLineOne: e.target.value })}
              value={form?.BusinessAddressLineOne}>
              ADDRESS
            </FormField>
            <FormField
              fieldType="input"
              fontSize="12px"
              margin="10px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Appartment, suite, etc.'}
              onChange={e => updateSubscription({ BusinessAddressLineTwo: e.target.value })}
              value={form?.BusinessAddressLineTwo}>
              APPARTMENT, SUITE, ETC.
            </FormField>
            <Grid3 margin="0px 10px 10px 0px" block>
              <FormField
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '70%'}
                placeholder={'City'}
                onChange={e => updateSubscription({ BusinessAddressCity: e.target.value })}
                value={form?.BusinessAddressCity}>
                CITY
              </FormField>
              <FormField
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                width={isSmallWindow ? '100%' : '70%'}
                placeholder={'State'}
                onChange={e => updateSubscription({ BusinessAddressState: e.target.value })}
                value={form?.BusinessAddressState}>
                STATE
              </FormField>
              <FormField
                fieldType="input"
                fontSize="12px"
                margin="10px 0px 0px 0px"
                style={{ height: '29px' }}
                border="1px solid #000000"
                placeholder={'Zip Code'}
                width={isSmallWindow ? '100%' : '65%'}
                onChange={e => updateSubscription({ BusinessAddressZip: e.target.value })}
                value={form?.BusinessAddressZip}>
                ZIP CODE
              </FormField>
            </Grid3>
            <FormField
              fieldType="input"
              fontSize="12px"
              margin="0px 0px 0px 0px"
              style={{ height: '29px' }}
              border="1px solid #000000"
              width={isSmallWindow ? '100%' : '90%'}
              placeholder={'Phone'}
              onChange={e => updateSubscription({ BusinessAddressPhone: e.target.value })}
              value={form?.BusinessAddressPhone}>
              PHONE
            </FormField>
            <ButtonContainer>
              <Button noBorder onClick={businessAddressUpdate}>
                {loading ? (
                  <Span>
                    <CircularProgress size={18} />
                  </Span>
                ) : (
                  'SAVE ADDRESS'
                )}
              </Button>
            </ButtonContainer>
          </form>
        </WhiteCard>
      ) : (
        <WhiteCard
          onClick={() => {
            setIsUpdated(false)
            setIsBusinessAddress(true)
          }}>
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Business address
          </TitleText>
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
