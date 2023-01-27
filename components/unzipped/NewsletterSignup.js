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
    .mobile {
        display: none;
    }
    @media(max-width: 767px) {
        grid-template-columns: 1fr 3fr;
        width: 558px;
        position: relative;
        button:nth-child(4) {
            margin-top: 20px !important;
            position: absolute;
            bottom: -20px;
            left: 40px;
            width: 440px;
        }
    }
    @media(max-width: 525px) {
        width: 90vw;
        button:nth-child(4) {
            width: 70vw;
            left: 7.5vw;
        }
        .desktop {
            display: none;
        }
        .mobile {
            display: block;
            margin: 20px 20px 0px 0px;
        }
    }
    @media(max-width: 463px) {
        padding: 10px;
        margin-top: 30px;
        button:nth-child(4) {
            bottom: -50px;
            width: 75vw;
            left: 5vw;
        }
    }
    @media(max-width: 395px) {
        padding: 5px;
        button:nth-child(4) {
            bottom: -60px;
            width: 80vw;
            left: 2.5vw;
        }
    }
    @media(max-width: 376px) {
        padding: 0px;
        button:nth-child(4) {
            bottom: -60px;
            width: 80vw;
            left: 2vw;
        }
        .mobile {
            margin: 20px 10px 0px 0px;
        }
    }
    @media(max-width: 350px) {
        grid-template-columns: 1fr;
        margin-left: 20px;
        button:nth-child(4) {
            bottom: -55px;
            width: 90%;
            left: 0px;
        }
        .mobile {
            display: none;
        }
    }
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
        setAlert('');
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
            <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png" name="desktop" alt="dinosaur" height="94px" width="94px" radius='15px'/>
            <Image src="https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png" name="mobile" alt="dinosaur" height="70px" width="70px" radius='15px'/>
            <Center>
                <FormField width="90%" validate={validateEmail} error={alert} onKeyDown={handleKeyDown} value={form.email} placeholder="Email" fieldType="input" fontSize={'18px'} bottom="0px" onChange={updateEmail}>
                    UNZIPPED NEWSLETTER
                </FormField>
            </Center>
            <Button onClick={submitEmail} noBorder radius='15px' margin={alert ? "auto 0px 20px 0px" : "auto 0px 0px 0px"} type="default">{loading ? <CircularProgress /> : 'SUBSCRIBE'}</Button>
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