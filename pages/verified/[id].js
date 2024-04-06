import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import { emailConfirmation } from '../../redux/actions';
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

export const verified = ({ loading, token, emailConfirmation, error, userMailConfirmation }) => {
    const router = useRouter();
    const [notification, setNotification] = useState();
    const { id } = router.query;
    useEffect(() => {
        if(id) emailConfirmation(id)
    }, [id])

    useMemo(() => {
        if (userMailConfirmation && !loading) {
            setNotification('Redirecting you account created successfully.')
        }
    }, [userMailConfirmation])

    useEffect(() => {
        if (userMailConfirmation) router.push('/dashboard');
    }, [userMailConfirmation])

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
        userMailConfirmation: state.Auth.userMailConfirmation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        emailConfirmation: bindActionCreators(emailConfirmation, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(verified);