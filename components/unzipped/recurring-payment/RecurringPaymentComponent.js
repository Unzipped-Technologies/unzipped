import React, { useEffect } from 'react'

import {
  RecurringWrapper,
  Container,
  ContentContainer,
  PaymentDetailContainer,
  ContainerBox,
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
} from './styled'
import BusinessAddress from '../businessAddress'
import HireDivider from '../hire/hire-divider/hireDivider'
import PaymentMethod from '../paymentMethod'
import RecurringPaymentResponsive from './RecurringPaymentResponsive'
import Notification from '../dashboard/Notification'
import EmployeeCard from '../EmployeeCard'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  getPaymentMethods,
  deletePaymentMethods,
  getActiveContractsForUser,
  getUnpaidInvoices,
  createContract,
  getBusinessById,
  updateBusiness,
  createPaymentMethod
} from '../../../redux/actions'
import { Error } from '../hire/hire'
const Content = styled.div`
  width: 953px;
  margin: 30px;
`

const RecurringPaymentComponent = ({
  token,
  activeContracts,
  plans,
  plan,
  user,
  contractError,
  paymentDate,
  getActiveContractsForUser,
  getUnpaidInvoices,
  unpaidInvoices,
  contractForm,
  createContract,
  getBusinessById,
  selectedBusiness,
  updateBusiness,
  createPaymentMethod
}) => {
  useEffect(() => {
    const fetchData = async () => {
      await getActiveContractsForUser()
      await getUnpaidInvoices(token)

      contractForm?.businessId && (await getBusinessById(contractForm?.businessId))
    }

    fetchData()
  }, [])

  const onSubmit = () => {
    createContract(contractForm)
  }

  const onSubmitPaymentMethod = async payload => {
    await createPaymentMethod(payload, token)
  }

  const updateBusinessAddress = async data => {
    const response = await updateBusiness(data)
    return response
  }

  return (
    <RecurringWrapper>
      <Container>
        <HireDivider title="Confirm Recurring Payment" />
        <Content>
          <Notification type="blue" noButton paddingLeft="20px">
            You will be charged weekly on tuesday at 11:59 PM for all agreed upon hours worked.
          </Notification>
        </Content>
        <ContentContainer>
          <div style={{ width: '725px', display: 'flex', gap: '20px', flexDirection: 'column' }}>
            <ContainerBox>
              <EmployeeCard
                paymentDate={paymentDate}
                contracts={activeContracts}
                plan={plans[plan]}
                unpaidInvoices={unpaidInvoices}
              />
            </ContainerBox>
            <BusinessAddress
              style={{ width: '100%', marginTop: 20 }}
              selectedBusiness={selectedBusiness}
              onClick={updateBusinessAddress}
            />
            <PaymentMethod user={user} selectedBusiness={selectedBusiness} onClick={onSubmitPaymentMethod} />
          </div>
          <PaymentDetailContainer>
            <DetailsContainer>
              <PaymentDetailHeading>Recurring Payment</PaymentDetailHeading>
              <TextStyledSubHeader>**You will still get a chance to review invoices each week</TextStyledSubHeader>
              <PaymentHeaderDescription>
                You will be charged up to $6,100 USD at 11:59 PM for hours invoiced from previous week.
              </PaymentHeaderDescription>
              <PaymentDivider />
              <SpanText>Payment Details</SpanText>
              <PaymentParagraphText>1.Each week employees will create an invoice of hours worked </PaymentParagraphText>
              <PaymentParagraphText>2.You will have a chance to approve the invoice</PaymentParagraphText>
              <PaymentParagraphText>
                3.Each week on tuesday, payment will be charged to your account in full
              </PaymentParagraphText>
              <PaymentDivider />
            </DetailsContainer>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5
              }}>
              <div>
                <BillingTextStyled>SUBTOTAL</BillingTextStyled>
              </div>
              <div>
                <span>$0.00</span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5
              }}>
              <div>
                <span>HIRING FEE</span>
              </div>
              <div>
                <span style={{ color: '#37DEC5' }}>-$0.00</span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5
              }}>
              <div>
                <BillingTextStyled>BILLED NOW</BillingTextStyled>
              </div>
              <div>
                <span>$0.00</span>
              </div>
            </div>
            <div style={{ marginTop: '10px' }}>
              <UpdatePaymentButton onClick={onSubmit}>update payment terms</UpdatePaymentButton>
              {contractError && <Error>{contractError}</Error>}
            </div>
            <PaymentDetailNote>
              <ConfirmationText>
                You need to confirm your billing cycle, add a business address, and add a payment method before you can
                start this plan.
              </ConfirmationText>
            </PaymentDetailNote>
          </PaymentDetailContainer>
        </ContentContainer>
      </Container>
      {window.innerWidth <= 680 && (
        <ResponsiveContainer>
          <RecurringPaymentResponsive onClick={onSubmit} />
        </ResponsiveContainer>
      )}
    </RecurringWrapper>
  )
}

const mapStateToProps = state => {
  return {
    token: state.Auth.token,
    user: state.Auth.user,
    error: state.Auth.error,
    contractError: state.Contracts.error,
    paymentMethods: state.Stripe.methods,
    activeContracts: state.Contracts.activeContracts,
    plan: state.Auth.user.plan,
    plans: state.Auth.plans,
    paymentDate: state.Auth.user.subscriptionDate,
    unpaidInvoices: state.Invoices.unpaidInvoices,
    contractForm: state.Contracts.contractForm,
    selectedBusiness: state.Business.selectedBusiness
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
    deletePaymentMethods: bindActionCreators(deletePaymentMethods, dispatch),
    getUnpaidInvoices: bindActionCreators(getUnpaidInvoices, dispatch),
    getActiveContractsForUser: bindActionCreators(getActiveContractsForUser, dispatch),
    createContract: bindActionCreators(createContract, dispatch),
    getBusinessById: bindActionCreators(getBusinessById, dispatch),
    updateBusiness: bindActionCreators(updateBusiness, dispatch),
    createPaymentMethod: bindActionCreators(createPaymentMethod, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecurringPaymentComponent)
