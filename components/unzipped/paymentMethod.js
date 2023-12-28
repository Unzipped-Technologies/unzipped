import React, { useState, useEffect } from 'react'
import { DarkText, TitleText, WhiteCard, Absolute, Grid2, Grid3 } from './dashboard/style'
import styled from 'styled-components'
import StripeForm from './stripeForm'
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
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useWindowSize from '../ui/hooks/useWindowSize'

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin: 0px 10px 0px 0px;
`

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

const FormLabel = styled.label`
  font-weight: 400;
  font-size: 13px;
  gap: 10px;
  color: #333 !important;
  font-weight: 400;
  line-height: lineHeight= '12.25px';
  font-family: arial;
  display: inline-block;
  margin-bottom: 10px;
  gap: 10px;
  svg {
    height: 16px;
    margin-left: 10px;
    vertical-align: middle;
  }
`

const FormWrapper = styled.div`
  width: ${({ form }) => (form ? '98%' : '100%')};
  height: 49px;
  align-items: center;
  padding: 15px;
  margin-bottom: 5px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const PaymentMethod = ({ changeFocus, planCost, form, user, updateSubscription, onClick, loading }) => {
  const stripe = loadStripe(
    // `${process.env.STRIPE_PUBLISHABLE_KEY}`
    'pk_test_51M4xI7HVpfsarZmBjdvRszIxG3sAlt3nG0ewT8GKm3nveinFofkmwQPwsw50xvuJMIMZ6yFnhuCDg5hSsynmKdxw00ZGY72yog'
  )
  return (
    <Elements stripe={stripe}>
      <PaymentForm
        changeFocus={changeFocus}
        planCost={planCost}
        form={form}
        user={user}
        updateSubscription={updateSubscription}
        onClick={onClick}
        loading={loading}
      />
    </Elements>
  )
}

const PaymentForm = ({ planCost, form, user, updateSubscription, onClick, loading }) => {
  const initialState = {
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipcode: ''
  }
  const [isPaymentForm, setIsPaymentForm] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const [paymentData, setPaymentData] = useState(initialState)

  const stripe = useStripe()
  const elements = useElements()
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  const PaymentFormUpdate = () => {
    onClick && onClick()
    setIsPaymentForm(false)
    setIsUpdated(true)
  }

  const disableButton = () => {
    return !Object.values(paymentData).every(value => value.trim() !== '')
  }

  console.log('paymentData', paymentData)
  const handleSubmit = async event => {
    console.log('paymentData', paymentData)
    // Block native form submission.
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }
    try {
      const name = `${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`
      const line1 = document.getElementById('address').value
      const line2 = document.getElementById('appartment').value
      const city = document.getElementById('city').value
      const state = document.getElementById('state').value
      const postal_code = document.getElementById('zip').value
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardNumberElement)
      console.log('cardElement', cardElement)

      // Use your card Element with other Stripe.js APIs
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
      PaymentFormUpdate()
      if (error) {
        console.log('[error]', error)
        setIsError(error?.message)
        setIsLoading(false)
        setIsPaymentForm(true)
      } else {
        console.log('[PaymentMethod]', paymentMethod)
        updateSubscription({
          paymentMethod: {
            ...form?.paymentMethod,
            card: {
              ...paymentMethod
            }
          }
        })
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    } catch (e) {
      console.log(e)
      setTimeout(() => {
        setIsLoading(false)
        setIsUpdated(false)
        setIsPaymentForm(true)
      }, 1000)
    }
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
      {isPaymentForm ? (
        <WhiteCard overflow="hidden" height={!isError ? '725px' : '775px'}>
          <SimpleBar style={{ maxHeight: !isError ? 725 : 775, width: '100%' }}>
            <TitleText size="22px">Payment Method</TitleText>
            <DarkText>Your subscription will be paid using your primary payment method.</DarkText>
            <form onSubmit={handleSubmit}>
              {isError && <DarkText error>{isError}</DarkText>}
              <FormLabel>CARD NUMBER</FormLabel>
              <FormWrapper>
                <CardNumberElement
                  onBlur={() => setIsError(null)}
                  options={{
                    style: {
                      fontSize: '16px',
                      width: '100%',
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
              <div style={{ flexDirection: 'row', marginTop: '15px' }}>
                <FormLabel>EXPIRES</FormLabel>
                <FormLabel style={{ paddingLeft: '3px' }}>CVC</FormLabel>
              </div>
              <Grid2 margin="0px 0px 0px 0px" block>
                <FormWrapper form>
                  <CardExpiryElement
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

                <FormWrapper form>
                  <CardCvcElement
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
                    onChange={e => console.log('e', e)}
                  />
                </FormWrapper>
              </Grid2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  width: width <= 600 ? '100%' : '90%',
                  marginRight: '5%'
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: width <= 600 ? '44%' : '46%' }}>
                  <InputLabel>First Name</InputLabel>
                  <input
                    id="firstName"
                    type="text"
                    style={{
                      borderRadius: '4px',
                      border: '2px solid #d8d8d8',
                      background: 'transparent',
                      marginTop: '5px',
                      paddingLeft: '10px'
                    }}
                    onChange={e =>
                      setPaymentData(prevAddress => ({
                        ...prevAddress,
                        firstName: e.target.value
                      }))
                    }
                    value={form?.paymentMethod?.BillingFirstName}
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
                    id="lastName"
                    type="text"
                    style={{
                      borderRadius: '4px',
                      border: '2px solid #d8d8d8',
                      background: 'transparent',
                      marginTop: '5px',
                      paddingLeft: '10px'
                    }}
                    onChange={e =>
                      setPaymentData(prevAddress => ({
                        ...prevAddress,
                        lastName: e.target.value
                      }))
                    }
                    value={form?.paymentMethod?.BillingLastName}
                  />
                </div>{' '}
              </div>
              <FormField
                id="address"
                fieldType="input"
                margin="15px 0px 0px 0px"
                fontSize="14px"
                noMargin
                required
                width={isSmallWindow ? '100%' : '100%'}
                onChange={e =>
                  setPaymentData(prevAddress => ({
                    ...prevAddress,
                    address: e.target.value
                  }))
                }
                value={form?.paymentMethod?.BillingAddressLineOne}>
                ADDRESS
              </FormField>
              <FormField
                id="appartment"
                fieldType="input"
                margin="15px 0px 0px 0px"
                fontSize="14px"
                noMargin
                required
                width={isSmallWindow ? '100%' : '100%'}
                onChange={e =>
                  setPaymentData(prevAddress => ({
                    ...prevAddress,
                    apartment: e.target.value
                  }))
                }
                value={form?.paymentMethod?.BillingAddressLineTwo}>
                APPARTMENT, SUITE, ETC.
              </FormField>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: '20px',
                  width: width <= 600 ? '100%' : '90%',
                  marginRight: '5%'
                }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: width <= 600 ? '44%' : '46%' }}>
                  <InputLabel>CITY</InputLabel>
                  <input
                    id="city"
                    type="text"
                    style={{
                      borderRadius: '4px',
                      border: '2px solid #d8d8d8',
                      background: 'transparent',
                      marginTop: '5px',
                      paddingLeft: '10px'
                    }}
                    onChange={e =>
                      setPaymentData(prevAddress => ({
                        ...prevAddress,
                        city: e.target.value
                      }))
                    }
                    value={form?.paymentMethod?.BillingAddressCity}
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
                    id="state"
                    type="text"
                    style={{
                      borderRadius: '4px',
                      border: '2px solid #d8d8d8',
                      background: 'transparent',
                      marginTop: '5px',
                      paddingLeft: '10px'
                    }}
                    onChange={e =>
                      setPaymentData(prevAddress => ({
                        ...prevAddress,
                        state: e.target.value
                      }))
                    }
                    value={form?.paymentMethod?.BillingAddressState}
                  />
                </div>{' '}
              </div>

              <FormField
                id="zip"
                fieldType="input"
                margin="15px 0px 0px 0px"
                fontSize="14px"
                noMargin
                required
                width={isSmallWindow ? '50%' : '44%'}
                onChange={e =>
                  setPaymentData(prevAddress => ({
                    ...prevAddress,
                    zipcode: e.target.value
                  }))
                }
                value={form?.paymentMethod?.BillingAddressZip}>
                ZIP CODE
              </FormField>
              <ButtonContainer>
                <Button submit noBorder disabled={disableButton()}>
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
          </SimpleBar>
        </WhiteCard>
      ) : (
        <WhiteCard
          onClick={() => {
            setIsUpdated(false)
            setIsPaymentForm(true)
          }}>
          <TitleText size="22px">Payment Method</TitleText>
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
              <Button type="outlineInverse" small onClick={() => setIsPaymentForm(true)}>
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
