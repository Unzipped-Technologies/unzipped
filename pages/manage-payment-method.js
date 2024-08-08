import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import {getPaymentMethods, deletePaymentMethods} from '../redux/actions';
import Nav from '../components/unzipped/header';
import { parseCookies } from "../services/cookieHelper";
import styled from 'styled-components';
import BackHeader from '../components/unzipped/BackHeader';
import { stripeBrandsEnum, stripeLogoEnum } from '../server/enum/paymentEnum'
import FormCard from '../components/FormCard';
import PaymentMethod from '../components/StripeForm';

const Shell = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
`;

const Container = styled.div`
    display: flex;
    width: 953px;
    justify-content: space-between;
    margin-top: 5px;
    ${(props) => (props.border ? `border-top: 1px #333 solid` : `border-top: none`)};
`;
const LeftOne = styled.div``;

const RightOne = styled.div`
    width: 600px;
`;

const Rows = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 0px;
    ${(props) => (props.fullHeight ? `height: 100%` : ``)};
`;

const TitleOne = styled.div`
    padding: 14px 0px;
    color: #737373;
    font-size: 24px;
    font-style: sans serif collection;
`;
const ButtonOne = styled.button`
    width: 225px;
    height: 45px;
    background: #D9D9D9;
    outline: none;
    border: none;
    font-size: 16px;
    font-weight: 600;
    margin: 5px 0px;
`;

const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 5px;
    margin-bottom: 10px;
`;

const AddPaymentButton = styled.button`
    outline: none;
    border: none;
    background: transparent;
    font-size: 18px;
    border-radius: 8px;
    padding: 12px;
`;

const Reset = ({ token, paymentMethods, getPaymentMethods, deletePaymentMethods }) => {
    const [marginBottom, setMarginBottom] = useState('0px');
    const [selectedMembership, setSelectedMembership] = useState(false)
    const router = useRouter()

    const linkPush = (link) => {
        router.push(link)
    }

    useEffect(() => {
        getPaymentMethods(token)
    }, [])

    useEffect(() => {
        if(!token) router.push('/login')
    }, [])

    const getCardLogoUrl = (cardType) => {
        const brand = Object.keys(stripeBrandsEnum).find(key => stripeBrandsEnum[key] === cardType);
        return stripeLogoEnum[brand];
    };


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
            <Shell>
                <BackHeader 
                    title="Account"
                />
                <Container>
                    <LeftOne>
                        <TitleOne>Membership</TitleOne>
                        <ButtonOne>Cancel Membership</ButtonOne>
                    </LeftOne>
                    <RightOne>
                        {paymentMethods.filter(e => parseInt(e.paymentType, 10) === 0).sort((a, b) => {
                            return (b.isPrimary === true) - (a.isPrimary === true);
                        }).map((item, index) => {
                            const isPrimary = item.isPrimary
                            return (
                                <FormCard
                                    key={index}
                                    badge={isPrimary ? "Primary" : ""}
                                    first={index === 0}
                                    image={getCardLogoUrl(item.card)}
                                    onClick={() => setSelectedMembership('primary-' + index)}
                                    title={`${item.card.toUpperCase()} **** **** ${item.lastFour}`}
                                    isSelected={selectedMembership === `primary-${index}`}
                                >
                                    <PaymentMethod address={item?.address}/>
                                </FormCard>
                            )
                        })}
                        <Center>
                            {selectedMembership === "primary" ? (
                            <FormCard
                                isSelected={true}
                                title="Create a new subscription payment method."
                            >
                                <PaymentMethod />
                            </FormCard>
                            ) : (
                                <AddPaymentButton onClick={() => setSelectedMembership("primary")}>+ Add Payment</AddPaymentButton>
                            )}
                        </Center>
                    </RightOne>
                </Container>
                <Container border>
                    <LeftOne>
                        <TitleOne>Project Payment</TitleOne>
                    </LeftOne>
                    <RightOne>
                        {paymentMethods.filter(e => parseInt(e.paymentType, 10) === 1).sort((a, b) => {
                            return (b.isPrimary === true) - (a.isPrimary === true);
                        }).map((item, index) => {
                            const isPrimary = item.isPrimary
                            return (
                                <FormCard
                                    key={index}
                                    badge={isPrimary ? "Primary" : ""}
                                    first={index === 0}
                                    image={getCardLogoUrl(item.card)}
                                    onClick={() => setSelectedMembership('payroll-' + index)}
                                    title={`${item.card?.toUpperCase()} **** **** ${item.lastFour}`}
                                    isSelected={selectedMembership === `payroll-${index}`}
                                >
                                    <PaymentMethod address={item?.address}/>
                                </FormCard>
                            )
                        })}
                        <Center>
                            {selectedMembership === 'payroll' ? (
                                <FormCard
                                    isSelected={true}
                                    title="Create a new subscription payment method."
                                >
                                    <PaymentMethod />
                                </FormCard>
                            ) : (
                                <AddPaymentButton onClick={() => setSelectedMembership('payroll')}>+ Add Payment</AddPaymentButton>
                            )}
                        </Center>
                    </RightOne>
                </Container>
            </Shell>
        </React.Fragment>
    )
}

Reset.getInitialProps = async ({ req, res }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Reset);