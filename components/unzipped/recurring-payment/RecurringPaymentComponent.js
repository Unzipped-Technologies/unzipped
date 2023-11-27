import {
    RecurringWrapper,
    Container,
    NotificationContainer,
    NotificationContainerText,
    ContentContainer,
    PaymentContainer,
    PaymentDetailContainer,
    ChargeText,
    AmountTextStyled,
    AmountTextNote,
    AmountDueTextHeading,
    TableText,
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
    ResponsiveContainer
} from './styled';
import InfoIcon from '../../ui/icons/InfoIcon';
import BusinessAddress from '../businessAddress';
import HireDivider from '../hire/hire-divider/hireDivider';
import PaymentDataTable from './PaymentDataTable';
import PaymentMethod from '../paymentMethod';
import RecurringPaymentResponsive from './RecurringPaymentResponsive';
const RecurringPaymentComponent = () => {
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
        <RecurringWrapper>
            <Container >
                <HireDivider title="Confirm Recurring Payment" />
                <NotificationContainer>
                    <NotificationContainerText>
                        <InfoIcon />
                        You will be charged weekly on tuesday at 11:59 PM for all agreed upon hours worked.
                    </NotificationContainerText>
                </NotificationContainer>
                <ContentContainer>
                    <div style={{ width: '725px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
                        <PaymentContainer>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <AmountDueTextHeading> Amount Due </AmountDueTextHeading>
                                </div>
                                <div>
                                    <ChargeText>you will be charged upto</ChargeText>
                                    <AmountTextStyled>$6,100.00 USD</AmountTextStyled>
                                    <AmountTextNote>note: there is a 5% payment fee</AmountTextNote>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div>
                                    <TableText>Current Employee</TableText>
                                </div>
                                <div>
                                    <PaymentDataTable currentEmployeeData={currentEmployeeData} />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '156px' }}>
                                    <ConfirmAmountButton>
                                        <ConfirmAmountText>Confirm Amount</ConfirmAmountText>
                                    </ConfirmAmountButton>
                                </div>
                            </div>
                        </PaymentContainer>
                        <BusinessAddress
                            style={{ width: '100%', marginTop: 20 }}
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
                        <div style={{ marginTop: '10px' }}>
                            <UpdatePaymentButton>update payment terms</UpdatePaymentButton>
                        </div>
                        <PaymentDetailNote>
                            <ConfirmationText>
                                You need to confirm your billing cycle, add
                                a business address, and add a payment
                                method before you can start this plan.
                            </ConfirmationText>
                        </PaymentDetailNote>
                    </PaymentDetailContainer>

                </ContentContainer>

            </Container>
            <ResponsiveContainer>
                <RecurringPaymentResponsive />
            </ResponsiveContainer>
        </RecurringWrapper>

    )
}

export default RecurringPaymentComponent;