import React from 'react'
import styled from 'styled-components'
import BackHeader from '../components/unzipped/BackHeader';
import SubscriptionCard from '../components/unzipped/SubscriptionCard';
import BusinessAddress from '../components/unzipped/businessAddress';
import PaymentMethod from '../components/unzipped/paymentMethod';
import ReceiptCard from '../components/unzipped/ReceiptCard';
import Nav from '../components/unzipped/header';
import Footer from '../components/unzipped/Footer'
import { planEnum } from '../server/enum/planEnum';
import Notification from '../components/unzipped/dashboard/Notification';
import { ValidationUtils } from '../utils'

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSubscriptionForm, createSubscription } from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 953px;
    margin: 30px;
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    width: 953px;
`;

const Left = styled.div`
    display: flex;
    flex-flow: column;
`;

const getSubscriptionName = (plan) => {
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

const Subscribe = ({plans, form, selectedPlan, disabled, user, createSubscription, subscriptionForm, trialLength = 7, planCost, updateSubscriptionForm, token}) => {
    const updatedDate = ValidationUtils.addDaysToDate((new Date(user?.updatedAt) || new Date()), trialLength)
    const month = ValidationUtils.getMonthInText(updatedDate)
    const access = token?.access_token || user.cookie
    const dateCode = `${month} ${new Date(updatedDate).getDate()}, ${new Date(updatedDate).getFullYear()}`
    const updateSubscription = (data) => {
        updateSubscriptionForm({
            ...data
        })
    }

    const submitSubscription = () => {
        createSubscription({
            ...form,
            selectedPlan,
            PaymentMethod: {
                stripeId: form?.card?.id,
                card: form?.card?.card?.brand,
                lastFour: form?.card?.card?.last4,
            }
        }, access)
    }

    return (
        <Container>
            <BackHeader 
                title={`Confirm ${getSubscriptionName(selectedPlan)} Plan`}
                bold
                size="20px"
            />
            <Content>
                <Notification type="blue" noButton>
                    We won’t charge you until your free trial ends on {dateCode}.
                </Notification>
            </Content>
            <Cards>
                <Left>
                    <SubscriptionCard planCost={planCost} subscriptionForm={subscriptionForm} updateSubscription={updateSubscription}/>    
                    <BusinessAddress form={form} planCost={planCost} subscriptionForm={subscriptionForm} updateSubscription={updateSubscription}/>    
                    <PaymentMethod form={form} user={user} planCost={planCost} subscriptionForm={subscriptionForm} updateSubscription={updateSubscription}/>    
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
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state.Auth)
    return {
        selectedPlan: state.Auth.selectedPlan,
        user: state.Auth.user,
        subscriptionForm: state.Auth.subscriptionForm,
        trialLength: state.Auth.trialLength,
        planCost: state.Auth.planCost,
        plans: state.Auth.plans,
        form: state.Auth.subscriptionForm,
        disabled: state.Auth?.disabled
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubscriptionForm: bindActionCreators(updateSubscriptionForm, dispatch),
        createSubscription: bindActionCreators(createSubscription, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);