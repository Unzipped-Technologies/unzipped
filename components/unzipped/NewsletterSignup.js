import React, {useState} from 'react';
import styled from 'styled-components'
import FormField from '../ui/FormField'
import Button from '../ui/Button'
import Image from '../ui/Image'
import { connect } from "react-redux";
import { signUpForNewsletter } from "../../redux/actions";
import { bindActionCreators, Dispatch } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import {ValidationUtils} from '../../utils'
import Notification from '../animation/notifications';

const Container = styled.div`
    padding: 40px;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    align-items: bottom;
    justify-content: center;
    width: 780px;
`;

const Center = styled.div`
    display: grid;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const News = ({email, signUpForNewsletter, loading}) => {
    const [form, setForm] = useState({email: ''});
    const [alert, setAlert] = useState('');
    const [notifications, setNotifications] = useState('');

    const updateEmail = (e) => {
        setForm({email: e.target.value})
    }

    const validateEmail = () => {
        const error = !ValidationUtils._emailValidation(form.email)
        if (!error) {
            setAlert('Please enter a valid email address');
        } else {
            setAlert('');
        }
        return error;
    }

    const submitEmail = () => {
        const error = validateEmail()
        if (!error) {
            return;
        } else {
            signUpForNewsletter(form)
            setForm({email: ''});
            setNotifications('Sign up successful')
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          submitEmail();
        }
    };
    return (
        <Container>
            <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png" alt="dinosaur" height="94px" width="94px" radius='15px'/>
            <Center>
                <FormField validate={validateEmail} error={alert} onKeyDown={handleKeyDown} value={form.email} placeholder="Email" fieldType="input" fontSize={'18px'} bottom="0px" onChange={updateEmail}>
                    UNZIPPED NEWSLETTER
                </FormField>
            </Center>
            <Button onClick={submitEmail} noBorder radius='15px' margin="auto 0px 0px 0px">{loading ? <CircularProgress /> : 'SUBSCRIBE'}</Button>
            <Notification error={notifications} />
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        email: state.Auth.email,
        loading: state.Auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      signUpForNewsletter: bindActionCreators(signUpForNewsletter, dispatch),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(News);