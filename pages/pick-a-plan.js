import React from 'react'
import styled from 'styled-components'
import BackHeader from '../components/unzipped/BackHeader';
import PlanCard from '../components/unzipped/PlanCard';
import Nav from '../components/unzipped/header';
import Footer from '../components/unzipped/Footer'
import { planEnum } from '../server/enum/planEnum';
import { ValidationUtils } from '../utils'

//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectAPlan } from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";
import { useRouter } from 'next/router';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
`;

const Plans = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    margin: 50px 10%;
`;

const getPlanCost = (id) => {
    switch (id) {
        case planEnum.BASIC:
            return 29
        case planEnum.STANDARD:
            return 79
        case planEnum.ADVANCED:
            return 299
    }
}

const plans = [
    {
        id: planEnum.BASIC,
        name: 'Basic Unzipped',
        description: 'Everything you need to create your business and begin collaborating with professionals ',
        cost: getPlanCost(planEnum.BASIC),
        features: [
            {
                icon: 'breifcase',
                text: 'Create up to 1 business'
            },
            {
                icon: 'user',
                text: 'Hire Unlimited professionals to work on your project'
            },
            {
                icon: 'github',
                text: 'Create and manage your unzipped repo'
            },
            {
                icon: 'checkMenu',
                text: 'Plan and monitor effort remaining'
            },
        ]
    },
    {
        id: planEnum.STANDARD,
        name: 'Unzipped',
        description: 'Level up your business with profit sharing and advanced collaboration',
        cost: getPlanCost(planEnum.STANDARD),
        features: [
            {
                icon: 'breifcase',
                text: 'Create up to 3 businesses'
            },
            {
                icon: 'user',
                text: 'Hire Unlimited professionals to work on your project'
            },
            {
                icon: 'cartAlt',
                text: 'Offer ownership and profit sharing'
            },
            {
                icon: 'github',
                text: 'Create and manage your unzipped repo'
            },
            {
                icon: 'checkMenu',
                text: 'Plan and monitor effort remaining'
            },
        ]
    },
    {
        id: planEnum.ADVANCED,
        name: 'Advanced Unzipped',
        description: 'Everything you need to create your business and begin collaborating with professionals ',
        cost: getPlanCost(planEnum.ADVANCED),
        features: [
            {
                icon: 'breifcase',
                text: 'Create unlimited businesses'
            },
            {
                icon: 'user',
                text: 'Hire Unlimited professionals to work on your project'
            },
            {
                icon: 'cartAlt',
                text: 'Offer ownership and profit sharing'
            },
            {
                icon: 'github',
                text: 'Create and manage your unzipped repo'
            },
            {
                icon: 'checkMenu',
                text: 'Plan and monitor effort remaining'
            },
            {
                icon: 'chatBubble',
                text: 'Dedicated support staff member'
            },
            {
                icon: 'phoneAlt',
                text: 'Advanced promotion options'
            },
        ]
    },
]

const Plan = ({user, selectedPlan, selectAPlan, trialLength = 7, planCost}) => {
    const router = useRouter()
    const updatedDate = ValidationUtils.addDaysToDate((user?.updatedAt || new Date()), trialLength)
    const month = ValidationUtils.getMonthInText(updatedDate)

    const selectPlan = (id) => {
        selectAPlan({
            selectedPlan: id,
            planCost: getPlanCost(id)
        })
        router.push('/subscribe')
    }

    return (
        <Container>
            <Nav />
            <BackHeader 
                title="Pick a plan"
                sub={`Cancel before ${month} ${new Date(updatedDate).getDate()} and you won’t be charged.`}
            />
            <Plans>
                {plans.map((item, key) => (
                    <PlanCard key={key} data={item} onClick={selectPlan} planCost={planCost}/>
                ))}
            </Plans>
            <Footer />
        </Container>
    )
}

Plan.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state.Auth)
    return {
        user: state.Auth.user,
        selectedPlan: state.Auth.selectedPlan,
        trialLength: state.Auth.trialLength,
        planCost: state.Auth.planCost,
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        selectAPlan: bindActionCreators(selectAPlan, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);