import React, { useState, useEffect } from 'react'
import { DarkText, TitleText, WhiteCard, Absolute, Grid2, Grid3 } from './dashboard/style'
import styled from 'styled-components'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import Image from '../ui/Image'
import { CircularProgress } from '@material-ui/core'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useWindowSize from '../ui/hooks/useWindowSize'

const Container = styled.div`
  margin: 0px 0px 0px 0px;
`

const ButtonContainer = styled.div`
  width: ${({ width }) => (width ? width : '90%')};
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

const FormLabel = styled.label`
  font-weight: 400;
  font-size: 12px;
  line-height: 24.5px;
  gap: 10px;
  color: #333333;
`

const FormWrapper = styled.div`
  width: ${({ form }) => (form ? '80%' : '90%')};
  height: 29px;
  align-items: center;
  padding: 5px 15px 15px 15px;
  margin-bottom: 5px;
  border: 1px solid #000000;
  border-radius: 4px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const PaymentMethod = ({ user, onClick, loading, selectedBusiness }) => {
  const stripe = loadStripe(
    // `${process.env.STRIPE_PUBLISHABLE_KEY}`
    'pk_test_51M4xI7HVpfsarZmBjdvRszIxG3sAlt3nG0ewT8GKm3nveinFofkmwQPwsw50xvuJMIMZ6yFnhuCDg5hSsynmKdxw00ZGY72yog'
  )
  return (
    <Elements stripe={stripe}>
      <PaymentForm user={user} onClick={onClick} loading={loading} selectedBusiness={selectedBusiness} />
    </Elements>
  )
}

const PaymentForm = ({ user, onClick, loading, selectedBusiness }) => {
  const isMobile = window.innerWidth >= 680 ? false : true

  const [isPaymentForm, setIsPaymentForm] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    addressLineOne: '',
    addressLineTwo: '',
    country: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const updateField = (field, value) => {
    setData({ ...data, [field]: value })
  }

  const handleSubmit = async event => {
    // Block native form submission.

    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }
    try {
      const name = `${data.firstName} ${data.lastName}`
      const line1 = data.addressLineOne
      const line2 = data.addressLineTwo
      const city = data.city
      const state = data.state
      const postal_code = data.zipCode
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardNumberElement)

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
          email: user?.email,
          address: {
            line1,
            line2,
            city,
            state,
            postal_code
          }
        }
      })
      setIsLoading(true)
      if (error) {
        setIsError(error?.message)
        setIsLoading(false)
        setIsPaymentForm(true)
      } else {
        await onClick({
          paymentMethod,
          businessId: selectedBusiness?._id,
          userId: user?._id,
          address: data
        })
        const event = new CustomEvent('paymentMethodCreated', { detail: result })
        window.dispatchEvent(event)
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
        setIsPaymentForm(false)
        setIsUpdated(true)
      }
    } catch (e) {
      setTimeout(() => {
        setIsLoading(false)
        setIsUpdated(false)
        setIsPaymentForm(true)
      }, 1000)
    }
  }

  useEffect(() => {
    if (width <= 680) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  return (
    <Container data-testid="payment_method_form" id="payment_method_form">
      {isPaymentForm ? (
        <WhiteCard overflow="hidden" height={!isError ? '725px' : '775px'}>
          <SimpleBar style={{ maxHeight: (!isError && !isSmallWindow) ? '725px' : 'auto',width: '100%'}}>
            <TitleText size={isMobile ? "16px" : "22px"} paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '20px' : '0px'} 
              marginTop={isMobile ? '10px' : '0px'}>
              Payment Method
            </TitleText>
            <DarkText marginLeft = {isMobile ? '20px' : '0px'} marginRight = {isMobile ? '10px' : '0px'} fontSize={isMobile ? "13px" : "16px"} >
              Your subscription will be paid using your primary payment method.</DarkText>
            <form onSubmit={handleSubmit} style={{ padding: isSmallWindow ? '20px' : '0px' }}>
              {isError && <DarkText error>{isError}</DarkText>}
              <FormLabel>CARD NUMBER</FormLabel>
              <FormWrapper>
                <CardNumberElement
                  data-testid="card-number"
                  name="card-number"
                  id="card-number"
                  onBlur={() => setIsError(null)}
                  options={{
                    style: {
                      base: {
                        height: '29px'
                      },
                      fontSize: '16px',
                      height: '29px',
                      width: '100%',
                      float: 'left',
                      '::placeholder': {
                        color: 'lightgrey'
                      },
                      invalid: {
                        color: '#9e2146'
                      }
                    }
                  }}
                />
              </FormWrapper>
              <Grid2 margin="0px" block>
                <div style={{ width: '100%' }}>
                  <FormLabel>EXPIRES</FormLabel>
                  <FormWrapper form="true">
                    <CardExpiryElement
                      data-testid="card-expiry"
                      options={{
                        style: {
                          fontSize: '16px',
                          width: `${isSmallWindow ? '100%' : '90%'}`,
                          float: 'left',
                          '::placeholder': {
                            color: 'lightgrey'
                          },
                          invalid: {
                            color: '#9e2146'
                          }
                        }
                      }}
                    />
                  </FormWrapper>
                </div>
                <div style={{ width: '100%' }}>
                  <FormLabel>CVC</FormLabel>

                  <FormWrapper form="true">
                    <CardCvcElement
                      data-testid="card-cvc"
                      options={{
                        style: {
                          fontSize: '16px',
                          width: `${isSmallWindow ? '100%' : '90%'}`,
                          float: 'left',
                          '::placeholder': {
                            color: 'lightgrey'
                          },
                          invalid: {
                            color: '#9e2146'
                          }
                        }
                      }}
                    />
                  </FormWrapper>
                </div>
              </Grid2>

              <FormField
                fieldType="input"
                margin="10px 0px 0px 0px"
                placeholder={'COUNTRY/REGION'}
                fontSize="12px"
                required
                id="country"
                width={isSmallWindow ? '100%' : '95%'}
                border="1px solid #000000"
                style={{ height: '29px' }}
                onChange={e => updateField('country', e.target.value)}
                value={data.country}>
                COUNTRY/REGION
              </FormField>
              <Grid2 margin="0px 0px 10px 0px" block>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  fontSize="12px"
                  border="1px solid #000000"
                  placeholder={'FIRST NAME'}
                  required
                  style={{ height: '29px' }}
                  width={isSmallWindow ? '100%' : '90%'}
                  id="firstName"
                  onChange={e => updateField('firstName', e.target.value)}
                  value={data.firstName}>
                  <FormLabel>FIRST NAME</FormLabel>
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'LAST NAME'}
                  fontSize="12px"
                  required
                  width={isSmallWindow ? '100%' : '90%'}
                  id="lastName"
                  style={{ height: '29px' }}
                  border="1px solid #000000"
                  onChange={e => updateField('lastName', e.target.value)}
                  value={data.lastName}>
                  LAST NAME
                </FormField>
              </Grid2>
              <FormField
                fieldType="input"
                margin="10px 0px 0px 0px"
                placeholder={'ADDRESS'}
                fontSize="12px"
                required
                width={isSmallWindow ? '100%' : '95%'}
                id="addressLineOne"
                style={{ height: '29px' }}
                border="1px solid #000000"
                onChange={e => updateField('addressLineOne', e.target.value)}
                value={data.addressLineOne}>
                ADDRESS
              </FormField>
              <FormField
                fieldType="input"
                margin="10px 0px 0px 0px"
                placeholder={'APPARTMENT, SUITE, ETC'}
                fontSize="12px"
                required
                style={{ height: '29px' }}
                width={isSmallWindow ? '100%' : '95%'}
                id="addressLineTwo"
                border="1px solid #000000"
                onChange={e => updateField('addressLineTwo', e.target.value)}
                value={data.addressLineTwo}>
                APPARTMENT, SUITE, ETC.
              </FormField>         
              <Grid3 margin="0px" block grid="181px 181px 181px">
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'CITY'}
                  fontSize="12px"
                  required
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  width={isSmallWindow ? '100%' : '90%'}
                  id="city"
                  onChange={e => updateField('city', e.target.value)}
                  value={data.city}>
                  CITY
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'STATE'}
                  fontSize="12px"
                  width={isSmallWindow ? '100%' : '90%'}
                  required
                  id="state"
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  onChange={e => updateField('state', e.target.value)}
                  value={data.state}>
                  STATE
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'ZIP CODE'}
                  fontSize="12px"
                  required
                  width={isSmallWindow ? '100%' : '90%'}
                  id="zipCode"
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  onChange={e => updateField('zipCode', e.target.value)}
                  value={data.zipCode}>
                  ZIP CODE
                </FormField>
              </Grid3>
              <ButtonContainer width={isSmallWindow ? "100%" : "90%"}>
                <Button submit noBorder>
                  {loading ? (
                    <Span data-testid="loading_spinner" id="loading_spinner">
                      <CircularProgress size={18} />
                    </Span>
                  ) : (
                    'SAVE PAYMENT'
                  )}
                </Button>
              </ButtonContainer>
            </form>
          </SimpleBar>
        </WhiteCard>
      ) : (
        <WhiteCard
          onClick={() => {
            setIsUpdated(false)
            setIsPaymentForm(true)
          }}>
          <TitleText size={isMobile ? "18px" : "22px"} paddingTop={isMobile ? '15px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
            Payment Method
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
              <Button
                type="outlineInverse"
                id="add_payment_button"
                small
                onClick={() => {
                  setIsPaymentForm(true)
                }}>
                Add
              </Button>
            )}
          </Absolute>
        </WhiteCard>
      )}
    </Container>
  )
}

export default PaymentMethod
