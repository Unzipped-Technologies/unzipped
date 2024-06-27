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
  const isMobile = window.innerWidth >= 680 ? false : true

  const [isPaymentForm, setIsPaymentForm] = useState(false)
  const [isUpdated, setIsUpdated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const { width } = useWindowSize()

  const PaymentFormUpdate = () => {
    onClick && onClick()
    setIsPaymentForm(false)
    setIsUpdated(true)
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
      const name = `${document.getElementById('inputFirstName').value} ${
        document.getElementById('inputLastName').value
      }`
      const line1 = document.getElementById('inputAddress').value
      const line2 = document.getElementById('inputAppartment').value
      const city = document.getElementById('inputCity').value
      const state = document.getElementById('inputState').value
      const postal_code = document.getElementById('inputZip').value
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardNumberElement)

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
        setIsError(error?.message)
        setIsLoading(false)
        setIsPaymentForm(true)
      } else {
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
            <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
              Payment Method
            </TitleText>
            <DarkText>Your subscription will be paid using your primary payment method.</DarkText>
            <form onSubmit={handleSubmit} style={{ padding: isSmallWindow ? '20px' : '0px' }}>
              {isError && <DarkText error>{isError}</DarkText>}
              <FormLabel>CARD NUMBER</FormLabel>
              <FormWrapper>
                <CardNumberElement
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
                </div>
                <div style={{ width: '100%' }}>
                  <FormLabel>CVC</FormLabel>

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
                width={isSmallWindow ? '100%' : '95%'}
                border="1px solid #000000"
                style={{ height: '29px' }}
                onChange={e =>
                  updateSubscription({
                    paymentMethod: { ...form?.paymentMethod, BillingAddressLineCountry: e.target.value }
                  })
                }
                value={form?.paymentMethod?.BillingAddressLineCountry}>
                COUNTRY/REGION
              </FormField>
              <Grid2 margin="0px 0px 20px 0px" block>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  fontSize="12px"
                  border="1px solid #000000"
                  placeholder={'FIRST NAME'}
                  required
                  style={{ height: '29px' }}
                  width={isSmallWindow ? '100%' : '90%'}
                  id="inputFirstName"
                  onChange={e =>
                    updateSubscription({
                      paymentMethod: { ...form?.paymentMethod, BillingFirstName: e.target.value }
                    })
                  }
                  value={form?.paymentMethod?.BillingFirstName}>
                  <FormLabel>FIRST NAME</FormLabel>
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'LAST NAME'}
                  fontSize="12px"
                  required
                  width={isSmallWindow ? '100%' : '90%'}
                  id="inputLastName"
                  style={{ height: '29px' }}
                  border="1px solid #000000"
                  onChange={e =>
                    updateSubscription({ paymentMethod: { ...form?.paymentMethod, BillingLastName: e.target.value } })
                  }
                  value={form?.paymentMethod?.BillingLastName}>
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
                id="inputAddress"
                style={{ height: '29px' }}
                border="1px solid #000000"
                onChange={e =>
                  updateSubscription({
                    paymentMethod: { ...form?.paymentMethod, BillingAddressLineOne: e.target.value }
                  })
                }
                value={form?.paymentMethod?.BillingAddressLineOne}>
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
                id="inputAppartment"
                border="1px solid #000000"
                onChange={e =>
                  updateSubscription({
                    paymentMethod: { ...form?.paymentMethod, BillingAddressLineTwo: e.target.value }
                  })
                }
                value={form?.paymentMethod?.BillingAddressLineTwo}>
                APPARTMENT, SUITE, ETC.
              </FormField>
              <Grid3 margin="0px" block>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'CITY'}
                  fontSize="12px"
                  required
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  width={isSmallWindow ? '100%' : '90%'}
                  id="inputCity"
                  onChange={e =>
                    updateSubscription({
                      paymentMethod: { ...form?.paymentMethod, BillingAddressCity: e.target.value }
                    })
                  }
                  value={form?.paymentMethod?.BillingAddressCity}>
                  CITY
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'STATE'}
                  fontSize="12px"
                  width={isSmallWindow ? '100%' : '90%'}
                  required
                  id="inputState"
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  onChange={e =>
                    updateSubscription({
                      paymentMethod: { ...form?.paymentMethod, BillingAddressState: e.target.value }
                    })
                  }
                  value={form?.paymentMethod?.BillingAddressState}>
                  STATE
                </FormField>
                <FormField
                  fieldType="input"
                  margin="10px 0px 0px 0px"
                  placeholder={'ZIP CODE'}
                  fontSize="12px"
                  required
                  width={isSmallWindow ? '100%' : '70%'}
                  id="inputZip"
                  border="1px solid #000000"
                  style={{ height: '29px' }}
                  onChange={e =>
                    updateSubscription({
                      paymentMethod: { ...form?.paymentMethod, BillingAddressZip: e.target.value }
                    })
                  }
                  value={form?.paymentMethod?.BillingAddressZip}>
                  ZIP CODE
                </FormField>
              </Grid3>
              <ButtonContainer>
                <Button submit noBorder>
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
          <TitleText size="22px" paddingTop={isMobile ? '10px' : '0px'} paddingLeft={isMobile ? '10px' : '0px'}>
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
