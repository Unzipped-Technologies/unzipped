import React, {useState, useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../animation/notifications';
import {connect, useDispatch} from 'react-redux';
import {contactEmail} from '../../redux/actions';

const Form = ({loading, msg}) => {
    const [focus, setFocus] = useState(false);
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false)
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState(null);
    const [notifications, setNotifications] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name, 
            phone: number, 
            email, 
            message,
            type: "Partner"
        }
        dispatch(contactEmail(data));
    }

    const handleFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleNameChange = (e) => {
        const { name, value } = e.target;
        setName(value);
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setNumber(value);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handleMessageChange = (e) => {
        const { name, value } = e.target;
        setMessage(value);
    };

    useEffect(() => {
        setNotifications(msg.message);
        if (msg.message === "success") {
            setName('');
            setEmail('');
            setMessage('');
            setNumber('');
        }
        setTimeout(() => {  
            setNotifications(''); 
        }, 4000);
        
    }, [msg])

    return (
        <React.Fragment>
        <div className="outer-contact-box">
            <h4 className="contact-title-2">Contact us</h4>
            <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-row-5">
                <div className="input-top">
                    <input 
                        type="name" 
                        placeholder="Name" 
                        className="input-class"
                        value={name}
                        onFocus={handleFocus}
                        onChange={handleNameChange}
                        required
                        />
                </div>
                <div className="input-top">
                    <input 
                        type="phone" 
                        placeholder="Phone" 
                        className="input-class" 
                        value={number}
                        onFocus={handleFocus}
                        onChange={handleNumberChange}
                        required
                        />
                </div>
            </div>
            <div className="input-email-contact" >
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="input-class" 
                    value={email}
                    onFocus={handleFocus}
                    onChange={handleEmailChange}
                    id="email-form-field"
                    required
                    />
            </div>
            <div className="input-email-contact-3">
                <textarea 
                    placeholder="Message" 
                    className="input-class" 
                    value={message}
                    onFocus={handleFocus}
                    onChange={handleMessageChange}
                    required
                    />
            </div>
            <button type="submit" className="contact-info-2">{loading ? <CircularProgress size={18}/> : 'send'}</button>
            </form>
            <Notification error={notifications} />
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.Auth.loading,
        msg: state.Auth.notification,
    }
}

export default connect(mapStateToProps, {contactEmail})(Form);