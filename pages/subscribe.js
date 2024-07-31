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
  paymentMethods
}) => {
  const isPrimaryPayment = paymentMethods.find(item => item.isPrimary && parseInt(item.paymentType, 10) === 0)
  const updatedDate = ValidationUtils.addDaysToDate(
    user?.updatedAt ? new Date(user?.updatedAt) : new Date(),
    trialLength
  )
  const [isSelected, setIsSelected] = useState(false)
  const month = ValidationUtils.getMonthInText(updatedDate)
  const access = token?.access_token || user.cookie
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
      access
    )
  }

  useEffect(() => {
    getPaymentMethods(token)
  }, [])

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
          <BusinessAddress
            form={form}
            planCost={planCost}
            subscriptionForm={subscriptionForm}
            updateSubscription={updateSubscription}
          />
          <AddressCard
            onClick={() => setIsSelected('address')}
            title={`Business Address`}
            isSelected={isSelected === 'address'}
            image="/img/Unzipped-Primary-Logo.png"
            badge="Address">
            Business Address
          </AddressCard>
          {isPrimaryPayment ? (
            <FormCard
              badge="Primary"
              image={getCardLogoUrl(isPrimaryPayment?.card)}
              onClick={() => setIsSelected('payment')}
              title={`${isPrimaryPayment?.card?.toUpperCase()} **** **** ${isPrimaryPayment?.lastFour}`}
              isSelected={isSelected === 'payment'}>
              <PaymentMethod address={isPrimaryPayment?.address} />
            </FormCard>
          ) : (
            <PaymentCreate
              form={form}
              user={user}
              planCost={planCost}
              subscriptionForm={subscriptionForm}
              updateSubscription={updateSubscription}
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
    paymentMethods: state.Stripe.methods
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
