import React from 'react'
import styled from 'styled-components'
import BackHeader from '../components/unzipped/BackHeader';
import SubscriptionCard from '../components/unzipped/SubscriptionCard';
import Nav from '../components/unzipped/header';
import Footer from '../components/unzipped/Footer'
import { planEnum } from '../server/enum/planEnum';
import Notification from '../components/unzipped/dashboard/Notification';
import { ValidationUtils } from '../utils'

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSubscriptionForm } from '../redux/actions';
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

const Subscribe = ({selectedPlan, user, subscriptionForm, trialLength = 7, planCost, updateSubscriptionForm}) => {
    const updatedDate = ValidationUtils.addDaysToDate((new Date(user?.updatedAt) || new Date()), trialLength)
    const month = ValidationUtils.getMonthInText(updatedDate)

    const updateSubscription = (data) => {
        updateSubscriptionForm({
            ...data
        })
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
                    We won’t charge you until your free trial ends on {month} {new Date(updatedDate).getDate()}, {new Date(updatedDate).getFullYear()}.
                </Notification>
            </Content>
            <Cards>
                <SubscriptionCard planCost={planCost} subscriptionForm={subscriptionForm} updateSubscription={updateSubscription}/>
                <SubscriptionCard />
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
        planCost: state.Auth.planCost
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubscriptionForm: bindActionCreators(updateSubscriptionForm, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);