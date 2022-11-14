import React, {useState, useEffect} from 'react';
import { Input, Form, Button } from 'reactstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../animation/notifications';
import {connect, useDispatch} from 'react-redux';
import {mailingList} from '../../../redux/actions';

const SectionSix = ({loading, msg}) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [focus, setFocus] = useState(false);
    const [notifications, setNotifications] = useState('');
    const dispatch = useDispatch();

    const handleFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleLastNameChange = (e) => {
        const { name, value } = e.target;
        setLastName(value);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handleFirstNameChange = (e) => {
        const { name, value } = e.target;
        setFirstName(value);
    };

    const submitForm = (e) => {
        e.preventDefault();
        let data = {
            email,
            firstName,
            lastName
        }
        dispatch(mailingList(data));
    }

    useEffect(() => {
        if (msg.message) {
            setNotifications(msg.message);
        }
        if (msg.message === "success") {
            setEmail('');
            setFirstName('');
            setLastName('');
        }
        setTimeout(() => {  
            setNotifications(''); 
        }, 4000);
        
    }, [msg])

    return (
        <React.Fragment>
            <div className="container-six">
                <div className="content-six">
                    <h4 className="six-title">The Unzipped Newsletter</h4>
                    <p className="six-content">Sign up with your email address to receive news, rewards, program updates and follow the Unzipped Revolution.</p>
                    <div className="email-signup-form">
                        <Form className="form-mobile" onSubmit={(e) => submitForm(e)}>
                            <Input
                                type="name"
                                placeholder="First Name"
                                className="input-boxes"
                                value={firstName}
                                label='first name'
                                onChange={handleFirstNameChange}
                                onFocus={handleFocus}
                                required
                            />
                            <Input
                                type="name"
                                placeholder="Last Name"
                                className="input-boxes"
                                value={lastName}
                                label='last name'
                                onChange={handleLastNameChange}
                                onFocus={handleFocus}
                                required
                            />
                            <Input
                                type="name"
                                placeholder="Email Address"
                                className="input-boxes"
                                value={email}
                                onChange={handleEmailChange}
                                onFocus={handleFocus}
                                label='email'
                                required
                            />
                            <button className="input-button" type="submit">
                                {loading ? <CircularProgress size={20} /> : 'Sign Up'}
                            </button>
                        </Form>
                    </div>
                    <p className="six-fine-print">We respect your privacy. All data collected is for internal use only. We won't sell your data, we promise.</p>
                </div>
                <Notification error={notifications} />
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.Auth.loading,
        msg: state.Auth.notification
    }
}

export default connect(mapStateToProps, {mailingList})(SectionSix);