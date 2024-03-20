import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import styled from 'styled-components'
import Nav from '../../../components/unzipped/header'
import BackHeader from '../../../components/unzipped/BackHeader';
import Notification from '../../../components/unzipped/dashboard/Notification';
import WithdrawalMethodsTable from '../../../components/unzipped/Withdrawal/PaymentOptionTable'
import WithdrawalCard from '../../../components/unzipped/Withdrawal/WithdrawalDetailBox'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux'
import { parseCookies } from "../../../services/cookieHelper";
import FormCard from '../../../components/FormCard';
import PaymentMethod from '../../../components/StripeForm/bank';
import { bindActionCreators } from 'redux'
import {
    retrieveExternalBankAccounts,
    getAccountOnboardingLink,
    getAccountBalance,
    withdrawAccountFundsToExternalBank,
} from '../../../redux/actions';

const Container = styled.div`
    display: flex;
    flex-flow: column;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 953px;
    margin: 20px;
    @media(max-width: 974px) {
        width: 95%;
        margin: 15px 0px 0px 0px;
    }
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr;
    width: 100%;
    justify-items: flex-end;
    padding: 0px 25px;
    @media(max-width: 975px) {
        display: flex;
        flex-flow: column;
        flex-direction: column-reverse;
        gap: 20px;
    }
`;

const Left = styled.div`
    display: flex;
    flex-flow: column;
    margin: 0px 15px
`;

const Withdrawal = ({
    token, 
    retrieveExternalBankAccounts, 
    getAccountOnboardingLink,
    withdrawAccountFundsToExternalBank,
    getAccountBalance,
    bank = [], 
    url,
    balance = 0,
}) => {
    const [windowSize, setWindowsize] = useState('126px');
    const [selectedMembership, setSelectedMembership] = useState(false);
    const [initialUrl] = useState(url?.url);
    const router = useRouter()
    const isPrimaryBank = false;

    const handleResize = () => {
        let windowSize = (window.innerWidth <= 600) ? '85px' : '76px'
        setWindowsize(windowSize);
    };

    const getLinkAndRedirect = () => {
        getAccountOnboardingLink(token, {url: '/dashboard/withdrawal'})
    }

    const submitWithdraw = (amount) => {
        if (amount) {
            withdrawAccountFundsToExternalBank(token, {
                amount: amount * 100,
                currency: 'USD'
            })
            router.push('/dashboard/account')
        }
    }

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        retrieveExternalBankAccounts(token)
        // Call getAccountBalance on component load
        getAccountBalance(token);
        // Set up an interval to call getAccountBalance every 5 minutes
        const intervalId = setInterval(() => {
            getAccountBalance(token);
        }, 300000); // 300000 ms = 5 minutes
    
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        if (url && url?.url && url?.url !== initialUrl) {
            router.push(url?.url);
        }
    }, [url, router]);

    return (
        <React.Fragment>
            <Nav token={token} marginBottom={windowSize}/>
            <Container>
                <BackHeader 
                    title={`Express withdrawal`}
                    bold
                    size="20px"
                />
                <Content>
                    <Notification type="blue" noButton smallMargin>
                        To comply with applicable regulatory requirements, we are required to collect physical address information 
                        for individuals and businesses. Non-permitted address type may result in delayed or rejected withdrawal request.
                    </Notification>
                </Content>
                <Cards>
                    <Left>
                        <WithdrawalCard balance={balance} onSubmit={submitWithdraw} isBank={bank.length}/>
                        <FormCard
                            badge={isPrimaryBank ? "Primary" : ""}
                            first={true}
                            image={'https://res.cloudinary.com/dghsmwkfq/image/upload/v1708747678/Icon_internet-banking_-online-bank_-bank_-university_sjhicv.png'}
                            onClick={() => getLinkAndRedirect()}
                            title={`${bank.length && bank[0].bank_name.toUpperCase()} **** **** ${bank.length && bank[0].last4}`}
                            isSelected={selectedMembership === `bank`}
                        >
                            <PaymentMethod/>
                        </FormCard>
                    </Left>
                    <WithdrawalMethodsTable />
                </Cards>
            </Container>
        </React.Fragment>
    )
}

Withdrawal.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    return {
        token: token && token,
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        bank: state.Stripe?.bank,
        url: state.Stripe?.url,
        balance: state.Stripe?.balance
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        retrieveExternalBankAccounts: bindActionCreators(retrieveExternalBankAccounts, dispatch),
        getAccountOnboardingLink: bindActionCreators(getAccountOnboardingLink, dispatch),
        getAccountBalance: bindActionCreators(getAccountBalance, dispatch),
        withdrawAccountFundsToExternalBank: bindActionCreators(withdrawAccountFundsToExternalBank, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);