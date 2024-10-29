import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import 'simplebar/dist/simplebar.min.css'
import { loadStripe } from '@stripe/stripe-js'
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
import { updateSubscriptionForm } from '../../redux/Auth/actions'
import { useDispatch } from 'react-redux';

import Button from '../ui/Button'
import FormField from '../ui/FormField'
import useWindowSize from '../ui/hooks/useWindowSize'
import { DarkText, Grid2 } from '../unzipped/dashboard/style'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

const Container = styled.div`
  margin: 0px 10px 0px 0px;
`

const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 10px 0px;
    justify-content: flex-end;x;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    align-items: flex-end;
    justify-content: space-between;
`

const AddressForm = styled.div`
  display: flex;
  flex-flow: column;
  gap: 15px;
`

const Span = styled.div`
  width: 200px;
`

const AddressBox = styled.div`
  width: 275px;
`
const TitleItem = styled.div`
  font-weight: 600;
`

const Item = styled.div`
  padding: 2px 10px 2px 0px;
`

const Grid3 = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
`

const FormItemWrapper = styled.div`
  margin-right: 13px;
  ${({ width }) => width}
`

const FormLabel = styled.label`
  margin-bottom: 0px;
  color: #333;
  font-size: 16px;
  width: 100%;
  ${({ right, left }) => (right ? 'padding-left: 15px;' : left ? 'padding-right: 15px' : '')};
`

const FormWrapper = styled.div`
  width: 100%;
  height: 49px;
  align-items: center;
  padding: 15px;
  margin-bottom: 5px;
  border: 2px solid #d8d8d8;
  border-radius: 4px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin-top: 15px;
`

const ButtonTwo = styled.button`
  border: none;
  padding: 10px;
  outline: none;
  background: transparent;
  color: #1772eb;
`

const PaymentMethod = props => {
  const stripe = loadStripe(
    // `${process.env.STRIPE_PUBLISHABLE_KEY}`
    'pk_test_51N8neBKbRhZhJxMgyOpWY0pyTFdJ9rb9mIIgjor3IaCfRwU5IGCP00Q9aWH629MCbML22vJg7AVOE3Etm9vk4lUs00cMojHSRC'
  )
  return (
    <Elements stripe={stripe}>
      <PaymentForm {...props} />
    </Elements>
  )
}

const PaymentForm = ({ form, user, updateSubscription, onClick, loading, address }) => {
  const [isUpdated, setIsUpdated] = useState(false)
  const [isError, setIsError] = useState(null)
  const stripe = useStripe()
  const userInfo = useSelector(state => state.Auth?.user);
  const token = useSelector(state => state.Auth.token);
  const elements = useElements()
  const dispatch = useDispatch();

  const [openAddress, setOpenAddress] = useState(false)
  const [isSmallWindow, setIsSmallWindow] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    name: '',
    lineOne: address?.lineOne || '',
    lineTwo: address?.lineTwo || '',
    city: address?.city || '',
    state: address?.state || '',
    zip: address?.zip || '',
    country: address?.country || ''
  })
  const { width } = useWindowSize()

  const updateForm = (type, data) => {
    setCardDetails({
      ...cardDetails,
      [type]: data
    })
  }

  const validateAddressDetails = (details) => {
    for (const [key, value] of Object.entries(details)) {
      if (!value) {
        return { valid: false, field: key };
      }
    }
    return { valid: true };
  };

  const PaymentFormUpdate = () => {
    onClick && onClick()
    setIsUpdated(true)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) return;

    try {
      const stripeFlag = validateAddressDetails(cardDetails);
      if (!stripeFlag.valid) {
        console.log('All fields are required', stripeFlag);
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);


      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardDetails.name,
          email: userInfo?.email,
          address: {
            line1: cardDetails.lineOne,
            line2: cardDetails.lineTwo,
            city: cardDetails.city,
            state: cardDetails.state,
            postal_code: cardDetails.zip,
            country: cardDetails.country,
          }
        }
      });

      if (error) {
        setIsError(error.message);
        return;
      }

      const body = JSON.stringify({
        paymentMethod: {
          ...form?.paymentMethod,
          card: paymentMethod
        },
        userId: userInfo?._id,
        token
      });


      dispatch(updateSubscriptionForm(body));
      PaymentFormUpdate();

    } catch (e) {
      console.error('Error on handle__submit__form:', e.message);
    }
  };

  useEffect(() => {
    if (width <= 680) {
      setIsSmallWindow(true)
    } else {
      setIsSmallWindow(false)
    }
  }, [width])

  return (
    <Container>
      <Form onSubmit={handleSubmit} data-testid="payment_form">
        {isError && <DarkText error>{isError}</DarkText>}
        <FormField
          fieldType="input"
          margin
          fontSize="16px"
          noMargin
          zIndexUnset
          width="100%"
          id="name"
          onChange={e => updateForm('name', e.target.value)}
          value={cardDetails.name}>
          Name on card
        </FormField>
        <FormLabel>
          CARD NUMBER
          <FormWrapper>
            <CardNumberElement
              data-testid="card_number"
              onBlur={() => setIsError(null)}
              options={{
                style: {
                  fontSize: '16px',
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
        </FormLabel>
        <Grid2 margin="0px" block>
          <FormLabel left>
            EXPIRES
            <FormWrapper>
              <CardExpiryElement
                data-testid="expires"
                options={{
                  style: {
                    fontSize: '16px',
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
          </FormLabel>
          <FormLabel right>
            CVC
            <FormWrapper>
              <CardCvcElement
                data-testid="cvc"
                options={{
                  style: {
                    fontSize: '16px',
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
          </FormLabel>
        </Grid2>
        {(!address || openAddress) && (
          <AddressForm>
            <FormField
              fieldType="input"
              margin
              fontSize="16px"
              noMargin
              width="100%"
              zIndexUnset
              id="addressLineOne"
              onChange={e => updateForm('lineOne', e.target.value)}
              value={cardDetails.lineOne}>
              Address Line One
            </FormField>
            <FormField
              fieldType="input"
              margin
              fontSize="16px"
              noMargin
              width="100%"
              zIndexUnset
              id="addressLineTwo"
              onChange={e => updateForm('lineTwo', e.target.value)}
              value={cardDetails.lineTwo}>
              Address Line Two
            </FormField>
            <Grid3>
              <FormItemWrapper width="40%">
                <FormField
                  fieldType="input"
                  margin
                  fontSize="16px"
                  noMargin
                  width="100%"
                  id="city"
                  zIndexUnset
                  onChange={e => updateForm('city', e.target.value)}
                  value={cardDetails.city}>
                  City
                </FormField>
              </FormItemWrapper>
              <FormItemWrapper width="30%">
                <FormField
                  fieldType="input"
                  margin
                  fontSize="16px"
                  noMargin
                  width="100%"
                  id="state"
                  zIndexUnset
                  onChange={e => updateForm('state', e.target.value)}
                  value={cardDetails.state}>
                  State
                </FormField>
              </FormItemWrapper>
              <FormItemWrapper width="25%">
                <FormField
                  fieldType="input"
                  margin
                  fontSize="16px"
                  noMargin
                  width="70%"
                  id="zipCode"
                  zIndexUnset
                  onChange={e => updateForm('zip', e.target.value)}
                  value={cardDetails.zip}>
                  Zip Code
                </FormField>
              </FormItemWrapper>
            </Grid3>
            <FormField
              fieldType="input"
              margin
              fontSize="16px"
              noMargin
              width="100%"
              id="country"
              zIndexUnset
              onChange={e => updateForm('country', e.target.value)}
              value={cardDetails.country}>
              Country
            </FormField>
          </AddressForm>
        )}
        <ButtonContainer>
          {address ? (
            <AddressBox data-testid="billing_address">
              <TitleItem>Billing Address</TitleItem>
              <Item>{address?.lineOne}</Item>
              <Item>{address?.lineTwo}</Item>
              <Grid3>
                <Item>{address?.city}</Item>
                <Item>{address?.state}</Item>
                <Item>{address?.zip}</Item>
              </Grid3>
              <Item>{address?.country}</Item>
            </AddressBox>
          ) : (
            <AddressBox />
          )}
          {address ? <ButtonTwo onClick={() => setOpenAddress(true)}>update billing address</ButtonTwo> : <div></div>}
          <Button type="button" onClick={(e) => handleSubmit(e)} noBorder>
            {loading ? (
              <Span data-testid="loading_spinner">
                <CircularProgress size={18} />
              </Span>
            ) : (
              'SAVE'
            )}
          </Button>
        </ButtonContainer>
      </Form>
    </Container>
  )
}
export default PaymentMethod
