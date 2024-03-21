import React from 'react'
import Nav from '../../components/unzipped/header';
import Head from 'next/head';
import WithdrawalComponent from '../../components/unzipped/express-withdrawal/WithdrawalComponent';
import styled from 'styled-components';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateSubscriptionForm } from '../../redux/Auth/actions';


const Container = styled.div`
    display: flex;
    flex-flow: column;
    // margin-top: 6rem;
    justify-content: center;
`;

const Withdrawal = ({ user, token, form }) => {
    const dispatch = useDispatch();
    const updateSubscription = (data) => {
        dispatch(updateSubscriptionForm({
            ...data
        }))
    }
    return (
        <>
            <Head>
                <title>Withdrawal</title>
            </Head>
            <Nav />
            <Container>
                <WithdrawalComponent user={user} token={token} form={form} updateSubscription={updateSubscription} />
            </Container>
        </>
    )
}
const mapStateToProps = state => {
    return {
        user: state.Auth.user,
        token: state.Auth.token,
        form: state.Auth.subscriptionForm,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateSubscriptionForm: bindActionCreators(updateSubscriptionForm, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Withdrawal);
