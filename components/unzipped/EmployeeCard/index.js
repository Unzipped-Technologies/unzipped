import React from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils'

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  border: solid 1px #333;
  border-radius: 5px;
`

const LeftBox = styled.div``
const RightBox = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0px;
  position: absolute;
  right: 10px;
  top: 10px;
`

const LeftTwo = styled.div``
const RightTwo = styled.div``

const Table = styled.div`
  padding: 20px 5px;
  margin-top: 20px;
`

const RowTitleFixed = styled.div`
  text-align: left;
  min-width: 130px;
  font-weight: 600;
`

const RowTitle = styled.div`
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  min-width: 130px;
  font-weight: 600;
  @media (max-width: 600px) {
    text-align: left;
    min-width: 116px;
    font-weight: 600;
  }
  @media (max-width: 495px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '90px' : '116px')};
  }
  @media (max-width: 442px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '0px' : '116px')};
    width: ${({ smallMobile }) => (smallMobile ? '75px' : '116px')};
  }
  @media (max-width: 400px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '0px' : '101px')};
    width: ${({ smallMobile }) => (smallMobile ? '75px' : '100px')};
  }
`

const RowItem = styled.div`
  text-align: ${({ left }) => (left ? 'left' : 'center')};
  min-width: 130px;
  @media (max-width: 600px) {
    text-align: left;
    min-width: 116px;
  }
  @media (max-width: 495px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '90px' : '116px')};
  }
  @media (max-width: 442px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '0px' : '116px')};
    width: ${({ smallMobile }) => (smallMobile ? '75px' : '116px')};
  }
  @media (max-width: 400px) {
    min-width: ${({ smallMobile }) => (smallMobile ? '0px' : '101px')};
    width: ${({ smallMobile }) => (smallMobile ? '75px' : '100px')};
  }
`
const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px 15px;
`
const SubTitle = styled.div`
  font-size: 16px;
  padding: 0px 15px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 450px;
  padding: ${({ padding }) => (padding ? padding : '4px 0px')};
  @media (max-width: 600px) {
    max-width: 100%;
  }
`

const RightTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  line-height: 18px;
`
const CostPanel = styled.div`
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 18px;
  }
`

const SubText = styled.div`
  font-size: 12px;
  text-align: center;
  @media (max-width: 550px) {
    font-size: 10px;
  }
`

const ClearMobile = styled.span`
  width: 100%;
  @media (max-width: 600px) {
    display: none;
  }
`

const EmployeeCard = ({ contracts = [], paymentDate, plan, unpaidInvoices = [] }) => {
  const calcTotalPotentialCost = () => {
    let total = 0
    contracts?.forEach(item => {
      if (item.hourlyRate && item.hoursLimit) {
        total += item.hourlyRate * item.hoursLimit
      }
    })
    return total
  }

  const getNextBillingDate = dateStartedSubscription => {
    // Parse the date the subscription started
    const startDate = new Date(dateStartedSubscription)
    const billingDay = startDate.getDate()

    // Get the current date
    const currentDate = new Date()

    // Determine if the billing day for the current month has passed or is today
    let nextBillingDate
    if (currentDate.getDate() >= billingDay) {
      // If today is past the billing day, or is the billing day, move to next month
      if (currentDate.getMonth() === 11) {
        // December
        nextBillingDate = new Date(currentDate.getFullYear() + 1, 0, billingDay)
      } else {
        nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, billingDay)
      }
    } else {
      // If today is before the billing day, keep the current month
      nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), billingDay)
    }

    // Format the date as "MonthName Day, Year"
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return nextBillingDate.toLocaleDateString('en-US', options)
  }

  const calcAmtOwed = data => {
    let amount = 0
    unpaidInvoices?.forEach(item => {
      if (item.freelancerId === data.freelancerId._id) {
        amount += item.hourlyRate * item.hoursWorked
      }
    })
    return amount
  }

  return (
    <Container data-testid="employee_card" id="employee_card">
      <LeftBox>
        <Title>Amount Due</Title>
        <SubTitle>Current Employees</SubTitle>
        <Table>
          <Row>
            <RowTitle>Name</RowTitle>
            <RowTitle smallMobile>Rate</RowTitle>
            <RowTitle smallMobile>
              Hour Limit <ClearMobile>/ week</ClearMobile>
            </RowTitle>
            <RowTitle>Current Balance</RowTitle>
          </Row>
          {contracts &&
            contracts?.length > 0 &&
            contracts.map((item, index) => {
              return (
                <Row key={index} id={'contract_' + item?._id}>
                  <RowItem id="name">{ValidationUtils._toUpper(item?.freelancerId?.userId?.FullName)}</RowItem>
                  <RowItem id="rate" smallMobile>
                    $ {item?.hourlyRate}.00
                  </RowItem>
                  <RowItem id="hours_limit" smallMobile>
                    {item?.hoursLimit}
                  </RowItem>
                  <RowItem id="total_amount">$ {calcAmtOwed(item).toLocaleString()}.00</RowItem>
                </Row>
              )
            })}
        </Table>
        <Row padding="15px 10px 25px 20px">
          <LeftTwo>
            <RowTitle left>Plan</RowTitle>
            {plan ? (
              <div>
                <RowItem left id="plan_name">
                  {plan.name.toUpperCase()}
                </RowItem>
                <RowItem left id="plan_cost">
                  ${plan.cost}.00/month
                </RowItem>
              </div>
            ) : (
              <RowItem left id="no_plan">
                Not Subscribed
              </RowItem>
            )}
          </LeftTwo>
          <RightTwo id="next_billing_date">
            <RowTitleFixed>Next Billing Date</RowTitleFixed>
            {paymentDate ? <RowItem left>{getNextBillingDate(paymentDate)}</RowItem> : <RowItem left>-</RowItem>}
          </RightTwo>
        </Row>
      </LeftBox>
      <RightBox id="charged_amount">
        <RightTitle>
          You will be charged <br /> up to
        </RightTitle>
        <CostPanel>$ {calcTotalPotentialCost().toLocaleString()}.00 USD</CostPanel>
        <SubText>Note: There is a 5% payment fee</SubText>
      </RightBox>
    </Container>
  )
}

export default EmployeeCard
