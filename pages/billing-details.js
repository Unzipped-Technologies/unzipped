import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { parseCookies } from "../services/cookieHelper";
import styled from 'styled-components'
import {getPaymentMethods, deletePaymentMethods, getActiveContractsForUser, getUnpaidInvoices} from '../redux/actions';
import BackHeader from '../components/unzipped/BackHeader';
import Nav from '../components/unzipped/header';
import EmployeeCard from '../components/unzipped/EmployeeCard';
import PaymentDetailsTable from '../components/unzipped/PaymentDetailsTable'
import Footer from '../components/unzipped/Footer';

const invoices = [
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'visa',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    },
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'mastercard',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    },
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'discover',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    },
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'visa',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    },
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'mastercard',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    },
    {
      date: "1/24/24",
      description: "Bob Barker",
      cardLastFour: "2264",
      card: 'visa',
      payPeriod: "1/14/2024 - 2/21/2024",
      subtotal: "$22.99 (+tax & fees)",
      total: "$24.71"
    }
  ];  

const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: flex;
    flex-flow: column;
    gap: 15px;
    margin: 15px 0px;
    width: 953px;
    @media (max-width: 1000px) {
        width: 95%;
    }
    @media (max-width: 600px) {
        margin-top: 25px;
    }
`;

const SubContainer = styled.div`
    text-align: left;
    width: 953px;
    @media (max-width: 1000px) {
        width: 95%;
    }
`;

const Table = styled.div`
    width: 953px;
    margin: 30px 0px 50px 0px;
    @media (max-width: 1000px) {
        width: 95%;
    }
    @media(max-width: 550px) {
        margin: 10px 0px 25px 0px;
    }
`;

const HideMobile = styled.div`
    @media(max-width: 600px) {
        display: none;
    }
`;

const BillingDetails = ({
    token, 
    activeContracts, 
    plans, 
    plan, 
    paymentDate,
    getActiveContractsForUser, 
    getUnpaidInvoices,
    unpaidInvoices,
}) => {
    const [marginBottom, setMarginBottom] = useState('0px');

    useEffect(()=>{
        const handleResize = () => {
            if (window.innerWidth < 680) {
                setMarginBottom('72px');
            } else {
                setMarginBottom('77px');
            }
        };

        // Add an event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial call to set the marginBottom based on the current window width
        handleResize();

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    useEffect(() => {
        getActiveContractsForUser(token)
        getUnpaidInvoices(token)
    }, [])

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Manage Payment | Unzipped</title>
            <meta name="Manage Payment | Unzipped" content="Manage Payment"/>
            </Head>
            <HideMobile><Nav token={token} marginBottom={marginBottom} /></HideMobile>
            <Container>
                <BackHeader 
                    title="Billing Details"
                />
                <Content>
                    <EmployeeCard 
                        paymentDate={paymentDate} 
                        contracts={activeContracts?.data} 
                        plan={plans[plan]}
                        unpaidInvoices={unpaidInvoices}
                    />
                </Content>
                <SubContainer>Employee fees are billed at 12 AM each week on monday morning for any approved invoices</SubContainer>
                <Table>
                    <PaymentDetailsTable 
                        invoices={invoices}
                    />
                </Table>
            </Container>
            <Footer />
        </React.Fragment>
    )
}

BillingDetails.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    console.log(state)
    return {
        token: state.Auth.token,
        error: state.Auth.error,
        paymentMethods: state.Stripe.methods,
        activeContracts: state.Contracts.activeContracts,
        plan: state.Auth.user.plan,
        plans: state.Auth.plans,
        paymentDate: state.Auth.user.subscriptionDate,
        unpaidInvoices: state.Invoices.unpaidInvoices,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
        deletePaymentMethods: bindActionCreators(deletePaymentMethods, dispatch),
        getUnpaidInvoices: bindActionCreators(getUnpaidInvoices, dispatch),
        getActiveContractsForUser: bindActionCreators(getActiveContractsForUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetails);