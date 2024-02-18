import React from 'react'
import styled from 'styled-components'
import { ValidationUtils } from '../../../utils';

const Container = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    border: solid 1px #333;
    border-radius: 5px;
`;

const LeftBox = styled.div``;
const RightBox = styled.div`
    display: flex;
    flex-flow: column;
    gap: 0px;
    position: absolute;
    right: 10px;
    top: 10px;
`;

const LeftTwo = styled.div``;
const RightTwo = styled.div``;

const Table = styled.div`
    padding: 20px 5px;
    margin-top: 20px;
`;

const RowTitle = styled.div`
    text-align: ${({left}) => left ? 'left' : 'center'};
    min-width: 130px;
    font-weight: 600;
`;

const RowItem = styled.div`
    text-align: ${({left}) => left ? 'left' : 'center'};
    min-width: 130px;
`;
const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
    padding: 10px 15px;
`;
const SubTitle = styled.div`
    font-size: 16px;
    padding: 0px 15px;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    max-width: 450px;
    padding: ${({padding}) => padding ? padding : '4px 0px'};
`;

const RightTitle = styled.div`
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    line-height: 18px;
`;
const CostPanel = styled.div`
    font-size: 22px;
    font-weight: 600;
    text-align: center;
`;
const SubText = styled.div`
    font-size: 12px;
    text-align: center;
`;

const EmployeeCard = ({contracts = [], paymentDate, plan, unpaidInvoices = []}) => {

    const calcTotalPotentialCost = () => {
        let total = 0
        contracts.forEach(item => {
            if (item.hourlyRate && item.hoursLimit) {
                total += item.hourlyRate * item.hoursLimit
            }
        })
        return total
    }

    const getNextBillingDate = (dateStartedSubscription) => {
        // Parse the date the subscription started
        const startDate = new Date(dateStartedSubscription);
        const billingDay = startDate.getDate();
    
        // Get the current date
        const currentDate = new Date();
        
        // Determine if the billing day for the current month has passed or is today
        let nextBillingDate;
        if (currentDate.getDate() >= billingDay) {
            // If today is past the billing day, or is the billing day, move to next month
            if (currentDate.getMonth() === 11) { // December
                nextBillingDate = new Date(currentDate.getFullYear() + 1, 0, billingDay);
            } else {
                nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, billingDay);
            }
        } else {
            // If today is before the billing day, keep the current month
            nextBillingDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), billingDay);
        }
    
        // Format the date as "MonthName Day, Year"
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return nextBillingDate.toLocaleDateString('en-US', options);
    }

    const calcAmtOwed = (data) => {
        let amount = 0
        console.log(data)
        console.log(unpaidInvoices)
        unpaidInvoices.forEach(item => {
            if (item.freelancerId === data.freelancerId._id) {
                amount += item.hourlyRate * item.hoursWorked
            }
        })
        return amount
    }

    return (
        <Container>
            <LeftBox>
                <Title>Amount Due</Title>
                <SubTitle>Current Employees</SubTitle>
                <Table>
                    <Row>
                        <RowTitle>Name</RowTitle>
                        <RowTitle>Rate</RowTitle>
                        <RowTitle>Hour Limit / week</RowTitle>
                        <RowTitle>Current Balance</RowTitle>
                    </Row>
                    {contracts.map((item, index) => {
                        return (
                            <Row key={index}>
                                <RowItem>{ValidationUtils._toUpper(item?.freelancerId?.userId?.FullName)}</RowItem>
                                <RowItem>$ {item.hourlyRate}.00</RowItem>
                                <RowItem>{item.hoursLimit}</RowItem>
                                <RowItem>$ {calcAmtOwed(item).toLocaleString()}.00</RowItem>
                            </Row>
                        )
                    })}
                </Table>                 
                <Row padding="15px 10px 25px 20px">
                    <LeftTwo>
                        <RowTitle left>Plan</RowTitle>
                        {plan ? (
                            <div>
                                <RowItem left>{plan.name.toUpperCase()}</RowItem>
                                <RowItem left>${plan.cost}.00/month</RowItem>
                            </div>
                        ) : (
                            <RowItem left>Not Subscribed</RowItem>
                        )}
                    </LeftTwo>
                    <RightTwo>
                        <RowTitle left>Next Billing Date</RowTitle>
                    {paymentDate ? (
                        <RowItem left>{getNextBillingDate(paymentDate)}</RowItem>
                    ) : (
                        <RowItem left>N/A</RowItem>
                    )}
                    </RightTwo>
                </Row>
            </LeftBox>
            <RightBox>
                <RightTitle>You will be charged <br/> up to</RightTitle>
                <CostPanel>$ {calcTotalPotentialCost().toLocaleString()}.00 USD</CostPanel>
                <SubText>Note: There is a 5% payment fee</SubText>
            </RightBox>
        </Container>
    )
}

export default EmployeeCard