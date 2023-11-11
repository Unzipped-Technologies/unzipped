import React from 'react';
import styled from 'styled-components';
import {
    ConfirmAmountButton,
    ConfirmAmountText,
    PaymentDetailHeading,
    PaymentParagraphText,
    PaymentHeaderDescription,
    TextStyledSubHeader,
    UpdatePaymentButton,
    PaymentDetailNote,
    DetailsContainer,
    SpanText,
    BillingTextStyled,
    PaymentDivider,
    ConfirmationText,
    PaymentDetailContainer
} from './styled';
import InfoIcon from '../../ui/icons/InfoIcon';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import BusinessAddress from '../businessAddress';
import PaymentMethod from '../paymentMethod';
import BackIcon from '../../ui/icons/back';


const NotificationResp = styled.div`
    width: 100%;
    @media screen and (min-width: 600px) {
        display: none;
    }
`;

const NotificationContainer = styled.div`
    padding: 15px;
    border-radius: 5px;
    border: 0.5px solid #0029FF;
    background: #F8FAFF;
    display: flex;
    flex-direction: column;    
    margin-top: 10px;

`;
const NotificationText = styled.p`
    color: #000;
    font-family: Roboto;
    font-size: ${({ fontSize }) => fontSize ? fontSize : '12px'};
    font-style: normal;
    font-weight: ${({ fontWeight }) => fontWeight ? fontWeight : '300'};
    line-height: 19.5px;
    letter-spacing: 0.15px;
    text-transform: ${({ textTransform }) => textTransform ? textTransform : 'none'};
    width: ${({ width }) => width ? width : '100%'};
    text-align: ${({ textAlign }) => textAlign ? textAlign : 'left'};
    margin-left: ${({ marginLeft }) => marginLeft ? marginLeft : '0'};
`;

const PaymentDetails = styled.div`
    display: flex;
    flex-direction: column;
    width: 242px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 1px solid #37DEC5;
    padding: 20px;
    justify-content: center;
    align-items: center;
`;


const TableRowStyled = styled(TableRow)`
    border-bottom: none !important;
`;

const TableCellStyled = styled(TableCell)`
    border-bottom: none !important;
    color: #333;
    text-align: left;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24.5px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    padding-left: 3px;
    @media screen and (max-width: 600px) {
        font-size: 12px;
    }
`;

const UpdatePaymentButtonContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    padding: 5px;
`
const RecurringPaymentSmHeader = styled.div`
    display: flex; 
    flex-direction: row;
    width: 100%; 
    background: #FFF;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); 
    padding: 10px;
`;
const RecurringPaymentResponsive = () => {
    const currentEmployeeData = [
        {
            name: 'Bob Barker',
            rate: '$100.00',
            hoursLimit: 20,
            currentBalance: 2000,
        },
        {
            name: 'Joe Maynard',
            rate: '$140.00',
            hoursLimit: 30,
            currentBalance: 300,
        },
    ]
    return (
        <NotificationResp >
            <RecurringPaymentSmHeader>
                <BackIcon color='#000' />
                <NotificationText fontSize="16px" fontWeight="500" width="100%" marginLeft="20px">
                    Confirm Recurring Payment
                </NotificationText>
            </RecurringPaymentSmHeader>
            <NotificationContainer style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }}>
                <div style={{ marginBottom: '15px' }}> <InfoIcon /></div>
                <NotificationText >
                    You will be charged weekly on tuesday at 11:59 PM for all agreed upon hours worked.
                </NotificationText>
            </NotificationContainer>
            <div style={{ marginTop: 30 }}>
                <NotificationText fontSize="18px" fontWeight="500" width="101px">
                    Amount Due
                </NotificationText>
            </div>

            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
                <PaymentDetails>
                    <div>
                        <NotificationText
                            fontSize="12px"
                            fontWeight="500"
                            textTransform="uppercase"
                            width="136px"
                            textAlign="center"
                        >
                            You will be charged upto
                        </NotificationText>
                    </div>
                    <div>
                        <NotificationText
                            fontSize="20px"
                            fontWeight="500"
                            textTransform="uppercase"
                            width="138px"
                            textAlign="center"
                        >
                            $6100.00 USD
                        </NotificationText>
                    </div>
                    <div>
                        <NotificationText
                            fontSize="10px"
                            textTransform="uppercase"
                        >
                            Note: There is a 5% payment fee
                        </NotificationText>
                    </div>
                </PaymentDetails>
            </div>

            <div>
                <Table>
                    <TableHead>
                        <TableRowStyled>
                            <TableCellStyled>NAME</TableCellStyled>
                            <TableCellStyled>RATE</TableCellStyled>
                            <TableCellStyled>Hour LIMIT / WEEKLY</TableCellStyled>
                        </TableRowStyled>
                    </TableHead>
                    <TableBody>
                        {currentEmployeeData && currentEmployeeData.map((item, index) => (
                            <TableRowStyled style={{ borderBottom: 'none' }}>
                                <TableCellStyled>{item.name}</TableCellStyled>
                                <TableCellStyled>{item.rate}</TableCellStyled>
                                <TableCellStyled>{item.hoursLimit}</TableCellStyled>
                            </TableRowStyled>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '15px' }}>
                <ConfirmAmountButton>
                    <ConfirmAmountText>Confirm Amount</ConfirmAmountText>
                </ConfirmAmountButton>
            </div>

            <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
                <BusinessAddress
                    form={null}
                    loading={false} onClick={(e) => { console.log(e) }}
                    planCost={'212'}
                    subscriptionForm={{}}
                    updateSubscription={null}
                    key={null}
                />
                <PaymentMethod
                    form={null}
                    user={null}
                    planCost={'1212'}
                    subscriptionForm={{}}
                    updateSubscription={null} />
            </div>

            <PaymentDetailContainer>
                <DetailsContainer>
                    <PaymentDetailHeading>Recurring Payment</PaymentDetailHeading>
                    <TextStyledSubHeader>**You will still get a chance to review invoices each week</TextStyledSubHeader>
                    <PaymentHeaderDescription>You will be charged up to $6,100 USD at 11:59 PM for hours invoiced from previous week.</PaymentHeaderDescription>
                    <PaymentDivider />
                    <SpanText>Payment Details</SpanText>
                    <PaymentParagraphText>1.Each week employees will create an invoice of hours worked </PaymentParagraphText>
                    <PaymentParagraphText>2.You will have a chance to approve the invoice</PaymentParagraphText>
                    <PaymentParagraphText>3.Each week on tuesday, payment will be charged to your account in full</PaymentParagraphText>
                    <PaymentDivider />
                </DetailsContainer>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
                    <div><BillingTextStyled>SUBTOTAL</BillingTextStyled></div>
                    <div><span>$0.00</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
                    <div><span>HIRING FEE</span></div>
                    <div><span style={{ color: '#37DEC5' }}>-$0.00</span></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', paddingLeft: 10, paddingRight: 10, paddingTop: 5 }}>
                    <div><BillingTextStyled>BILLED NOW</BillingTextStyled></div>
                    <div><span>$0.00</span></div>
                </div>
                <UpdatePaymentButtonContainer>
                    <UpdatePaymentButton>update payment terms</UpdatePaymentButton>
                </UpdatePaymentButtonContainer>
                <PaymentDetailNote>
                    <ConfirmationText>
                        You need to confirm your billing cycle, add
                        a business address, and add a payment
                        method before you can start this plan.
                    </ConfirmationText>
                </PaymentDetailNote>
            </PaymentDetailContainer>

        </NotificationResp >
    )
}

export default RecurringPaymentResponsive;