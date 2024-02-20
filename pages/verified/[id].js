import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import { registerUser } from '../../redux/actions';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import Notification from '../../components/animation/notifications';

const Container = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center; 
    height: 100vh; 
    width: 100%; 
`

const P = styled.p`
    font-size: 30px;
    font-weight: 600;
`

export const verified = ({ loading, token, registerUser, error }) => {
    const router = useRouter();
    const [notification, setNotification] = useState();
    const { id } = router.query;
    useEffect(() => {
        if (!token) {
            registerUser(id)
        }
    }, [id])

    useMemo(() => {
        if (error?.data && !loading) {
            setNotification('Redirecting user is already registered.')
        }
        else if (!loading) {
            setNotification('Redirecting you account created successfully.')
        }
    }, [error])

    useEffect(() => {
            router.push('/dashboard');
    }, [token])
    return (
        <>
            <Container>
                <div style={{ height: '50%', width: 'auto', textAlign: "center" }}>
                    <CheckCircleIcon color="inherit" htmlColor="green" style={{ height: "inherit", width: "inherit" }} />
                    <P>{error?.data && !loading ? "User is already registered" : !loading && "Email verified successfully."}</P>
                </div>
            </Container>
            <Notification error={notification} />
        </>
    )
}



const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        loading: state.Auth.loading,
        error: state.Auth.error,
        isEmailSent: state.Auth.isEmailSent,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: bindActionCreators(registerUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(verified);