import styled from 'styled-components'
import Nav from '../../components/unzipped/header'
import Head from 'next/head'
import RecurringPaymentComponent from '../../components/unzipped/recurring-payment/RecurringPaymentComponent'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
`
const RemoveNavBar = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`
const RecurringPaymentPage = () => {
  return (
    <>
      <Head>
        <title>Recurring Payment</title>
      </Head>
      <RemoveNavBar>
        <Nav />
      </RemoveNavBar>
      <Container>
        <RecurringPaymentComponent />
      </Container>
    </>
  )
}

export default RecurringPaymentPage
