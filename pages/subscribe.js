import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import BackHeader from '../components/unzipped/BackHeader'
import SubscriptionCard from '../components/unzipped/SubscriptionCard'
import BusinessAddress from '../components/unzipped/businessAddress'
import PaymentCreate from '../components/unzipped/paymentMethod'
import ReceiptCard from '../components/unzipped/ReceiptCard'
import { planEnum } from '../server/enum/planEnum'
import { ValidationUtils } from '../utils'
import FormCard from '../components/FormCard'
import PaymentMethod from '../components/StripeForm'
import { stripeBrandsEnum, stripeLogoEnum } from '../server/enum/paymentEnum'
import AddressCard from '../components/AddressCard'
import Notification from '../components/unzipped/dashboard/MobileNotification'
import { getAllCards } from '../redux/Auth/actions';
import { getBusinessAddress } from '../redux/Auth/actions';
import { useDispatch } from 'react-redux';
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateSubscriptionForm, createSubscription, getPaymentMethods } from '../redux/actions'
import { parseCookies } from '../services/cookieHelper'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Content = styled.div`
  width: 67%;
  margin: 0px auto;
  margin: 30px;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0px;
  }
`

const Cards = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 953px;
  @media screen and (max-width: 600px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`

const Left = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0px 15px;
  @media screen and (max-width: 600px) {
    margin: 5px;
  }
`

const getSubscriptionName = plan => {
  switch (plan) {
    case planEnum.BASIC:
      return 'Basic Unzipped'
    case planEnum.STANDARD:
      return 'Standard Unzipped'
    case planEnum.ADVANCED:
      return 'Advanced Unzipped'
    default:
      return 'Selected'
  }
}

const Subscribe = ({
  plans,
  form,
  selectedPlan,
  disabled,
  user,
  createSubscription,
  subscriptionForm,
  trialLength = 7,
  planCost,
  updateSubscriptionForm,
  token,
  getPaymentMethods,
  paymentMethods,
  businessAddress,
  updateBusiness
}) => {
  const primaryPayment = Array.isArray(paymentMethods)
    ? paymentMethods.find(item => item.isPrimary)
    : paymentMethods.isPrimary ? paymentMethods : null;

  const updatedDate = ValidationUtils.addDaysToDate(
    user?.updatedAt ? new Date(user?.updatedAt) : new Date(),
    trialLength
  )
  const [isSelected, setIsSelected] = useState(false)
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const month = ValidationUtils.getMonthInText(updatedDate)
  const dispatch = useDispatch()
  const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`
  const updateSubscription = data => {
    updateSubscriptionForm({
      ...data
    })
  }
  const getCardLogoUrl = cardType => {
    const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType)

    return stripeLogoEnum[brand]
  }

  const submitSubscription = () => {
    createSubscription(
      {
        ...form,
        selectedPlan,
        PaymentMethod: {
          stripeId: form?.card?.id,
          card: form?.card?.card?.brand,
          lastFour: form?.card?.card?.last4
        }
      },
      token

    )
  }

  useEffect(() => {
    if (user?._id) {
      dispatch(getBusinessAddress(user._id, token));
    }
  }, [user, dispatch]);

  useEffect(() => {
    console.log("Payment Methods:", paymentMethods);
  }, [paymentMethods]);


  useEffect(() => {
    console.log("primary Methods:", primaryPayment);
  }, [primaryPayment]);



  useEffect(() => {
    if (user?._id) {
      dispatch(getAllCards(user?._id));
    }
  }, [user?._id]);

  const updateBusinessAddress = async data => {}

  return (
    <Container data-testid="subscribe_page">
      <BackHeader title={`Confirm ${getSubscriptionName(selectedPlan)} Plan`} bold size="20px" />
      <Content>
        <Notification type="blue" noButton>
          We won’t charge you until your free trial ends on {dateCode}.
        </Notification>
      </Content>
      <Cards>
        <Left>
          <SubscriptionCard
            planCost={planCost}
            subscriptionForm={subscriptionForm}
            updateSubscription={updateSubscription}
          />

          {businessAddress ? (
            <AddressCard
              onClick={() => setIsSelected('address')}
              title={`Business Address`}
              isSelected={isSelected === 'address'}
              image="/img/Unzipped-Primary-Logo.png"
              badge="Address">
              <BusinessAddress
                selectedBusiness={businessAddress}
                form={form}
                planCost={planCost}
                subscriptionForm={subscriptionForm}
                updateSubscription={updateSubscription}
                user={user}
              />
            </AddressCard>
          ) : (
            <BusinessAddress
              selectedBusiness={businessAddress}
              form={form}
              planCost={planCost}
              subscriptionForm={subscriptionForm}
              updateSubscription={updateSubscription}
              user={user}
            />
          )}


          {primaryPayment ? (
            <FormCard
              badge="Primary"
              image={getCardLogoUrl(primaryPayment?.paymentMethod?.card?.brand || 'unknown')}
              onClick={() => setIsSelected('primary')}
              title={`${primaryPayment?.paymentMethod?.card?.brand?.toUpperCase() || 'UNKNOWN'} **** **** ${primaryPayment?.paymentMethod?.card?.last4 || '****'}`}
              isSelected={isSelected === 'primary'}
            >
              <PaymentMethod address={primaryPayment?.paymentMethod?.billing_details?.address} />
            </FormCard>
          ) : (
            <PaymentCreate
              form={form}
              user={user}
              planCost={planCost}
              subscriptionForm={subscriptionForm}
              onClick={data => {
                const paymentMethod = {
                  BillingAddressLineOne: data.address.addressLineOne,
                  BillingAddressLineTwo: data.address.addressLineTwo,
                  BillingAddressLineCountry: data.address.country,
                  BillingFirstName: data.address.firstName,
                  BillingLastName: data.address.lastName,
                  BillingAddressCity: data.address.city,
                  BillingAddressState: data.address.state,
                  BillingAddressZip: data.address.zipCode,
                  card: data?.paymentMethod
                }
                updateSubscription({ paymentMethod: paymentMethod })
              }}
            />
          )}
        </Left>

        <ReceiptCard
          planCost={planCost}
          subscriptionForm={subscriptionForm}
          subscriptionName={getSubscriptionName(selectedPlan)}
          selectedPlan={selectedPlan}
          updateSubscription={updateSubscription}
          dateCode={dateCode}
          plans={plans}
          disabled={disabled}
          submitSubscription={submitSubscription}
        />
      </Cards>
    </Container>
  )
}

Subscribe.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
    selectedPlan: state.Auth.selectedPlan,
    user: state.Auth.user,
    subscriptionForm: state.Auth.subscriptionForm,
    trialLength: state.Auth.trialLength,
    planCost: state.Auth.planCost,
    plans: state.Auth.plans,
    form: state.Auth.subscriptionForm,
    disabled: state.Auth?.disabled,
    businessAddress: state.Auth.subscriptionForm.businessAddress,
    paymentMethods: state.Auth.subscriptionForm.paymentMethod || [],
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateSubscriptionForm: bindActionCreators(updateSubscriptionForm, dispatch),
    createSubscription: bindActionCreators(createSubscription, dispatch),
    getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe)
