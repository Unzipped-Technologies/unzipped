import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { bindActionCreators } from 'redux'

import { ValidationUtils } from '../utils'
import { selectAPlan } from '../redux/actions'
import Nav from '../components/unzipped/header'
import Footer from '../components/unzipped/Footer'
import { planEnum } from '../server/enum/planEnum'
import PlanCard from '../components/unzipped/PlanCard'
import { parseCookies } from '../services/cookieHelper'
import BackHeader from '../components/unzipped/BackHeader'
import { Button } from '../components/ui'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  justify-content: center;
`

const Plans = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  margin: 50px 10%;
  @media (max-width: 680px) {
    margin-top: 10px;
    grid-template-columns: 1fr;
  }
`

const Plan = ({ plans = [], user, selectAPlan, trialLength = 7, planCost }) => {
  const router = useRouter()
  const updatedDate = ValidationUtils.addDaysToDate(user?.updatedAt || new Date(), trialLength)
  const month = ValidationUtils.getMonthInText(updatedDate)
  const [marginBottom, setMarginBottom] = useState('0px')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 680) {
        setMarginBottom('72px')
      } else {
        setMarginBottom('77px')
      }
    }

    // Add an event listener for window resize
    window.addEventListener('resize', handleResize)

    // Initial call to set the marginBottom based on the current window width
    handleResize()

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getPlanCost = id => {
    switch (id) {
      case planEnum.BASIC:
        return 29
      case planEnum.STANDARD:
        return 79
      case planEnum.ADVANCED:
        return 299
    }
  }

  const selectPlan = async id => {
    await selectAPlan({
      selectedPlan: id,
      planCost: getPlanCost(id)
    })

    router.push('/subscribe')
  }

  return (
    <Container data-testid="pick_plan">
      <Nav marginBottom={marginBottom} />
      <BackHeader
        title="Pick a plan"
        sub={`Cancel before ${month} ${new Date(updatedDate).getDate()} and you won’t be charged.`}
      />

      <Plans>
        {plans?.map((item, key) => (
          <PlanCard key={key} data={item} selectPlan={selectPlan} planCost={planCost} />
        ))}
      </Plans>
      <Footer />
    </Container>
  )
}

Plan.getInitialProps = async ({ req, res }) => {
  const token = parseCookies(req)

  return {
    token: token && token
  }
}

const mapStateToProps = state => {
  return {
    user: state.Auth.user,
    trialLength: state.Auth.trialLength,
    planCost: state.Auth.planCost,
    plans: state.Auth.plans
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectAPlan: bindActionCreators(selectAPlan, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan)
