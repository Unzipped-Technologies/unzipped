import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { parseCookies } from "../services/cookieHelper";
import styled from 'styled-components'
import {getPaymentMethods, deletePaymentMethods} from '../redux/actions';
import BackHeader from '../components/unzipped/BackHeader';
import Nav from '../components/unzipped/header';

const Container = styled.div``;

const BillingDetails = ({token}) => {
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

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Manage Payment | Unzipped</title>
            <meta name="Manage Payment | Unzipped" content="Manage Payment"/>
            </Head>
            <Nav token={token} marginBottom={marginBottom} />
            <Container>
                <BackHeader 
                    title="Billing Details"
                />
            </Container>
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
    return {
        token: state.Auth.token,
        error: state.Auth.error,
        paymentMethods: state.Stripe.methods,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPaymentMethods: bindActionCreators(getPaymentMethods, dispatch),
        deletePaymentMethods: bindActionCreators(deletePaymentMethods, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BillingDetails);