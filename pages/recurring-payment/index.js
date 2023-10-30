import styled from 'styled-components';
import Nav from '../../components/unzipped/header';
import Head from 'next/head';
import RecurringPaymentComponent from '../../components/unzipped/recurring-payment/RecurringPaymentComponent';
import HireDivider from '../../components/unzipped/hire/hire-divider/hireDivider';
import BusinessAddress from '../../components/unzipped/businessAddress';


const Container = styled.div`
    display: flex;
    flex-flow: column;
    margin-top: 6rem;
    justify-content: center;
`;

const RecurringPaymentPage = () => {
    return (
        <>
            <Head>
                <title>Recurring Payment</title>
            </Head>
            <Nav />
            <Container>
                {/* <HireDivider title="Confirm Recurring Payment" /> */}
                <RecurringPaymentComponent />
            </Container>
        </>
    )
}

export default RecurringPaymentPage;