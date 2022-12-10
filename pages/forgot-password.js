import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Nav from '../components/unzipped/header';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect, useDispatch } from 'react-redux';
import Notification from '../components/animation/notifications';
import {forgotPassword} from '../redux/actions';
import { parseCookies } from "../services/cookieHelper";

const Reset = ({token}) => {
    const [focus, setFocus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState('');
    const [user, setUser] = useState({
        email: '',
      });
    const dispatch = useDispatch();

    const updateUser = () => {
    setUser({
        email: email,
    });
    console.log(user);
    };

    const resetPassword = (ev) => {
        ev.preventDefault();
        setLoading(true)
        dispatch(forgotPassword(user));
        setTimeout(() => {
            setLoading(false)
            setNotifications('Check your email for instructions to change password');
          }, 3000)
    }

      //update Email date
    const handleFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    useEffect(() => {
        updateUser();
      }, [email]);
    


    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Forgot Password | Unzipped</title>
            <meta name="Forgot Password | Unzipped" content="Forgot Password"/>
            </Head>
            <Nav token={token}/>
            <div className="service-section-1">
                <div className="vohnt-register">
                    <div className="register-box" id="change-password">
                        <p className="top-text-r">Enter your email to reset password</p>
                        <form onSubmit={(ev) => resetPassword(ev)} className="form-r">
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="email" 
                                value={email}
                                placeholder="Email"
                                onChange={handleEmailChange}
                                onFocus={handleFocus}
                            />
                        </div>
                        <button className="outer-button" id="create-button" type="submit">
                            {loading ? <CircularProgress /> : 'Reset Password'}
                        </button>
                        </form>
                        <div className="privacy-text-l" >No account? <a href="/register">Register</a></div>
                        <div className="privacy-text-l" id="bottom-text">
                            This site is protected by reCAPTCHA and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                        </div>
                    </div>
                    <Notification error = {notifications}/>
                </div>
            </div>
            
            {/* <div className="alt-footer-2">
            <Footer />
            </div> */}
            </div>
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
        error: state.Auth.error,
    }
}

export default connect(mapStateToProps, {forgotPassword})(Reset);