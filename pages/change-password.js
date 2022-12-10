import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../components/animation/notifications';
import { useRouter } from 'next/router';
import {changePassword} from '../redux/actions';
import Nav from '../components/unzipped/header';
import { parseCookies } from "../services/cookieHelper";

const Reset = ({ error, token }) => {
    const [focus, setFocus] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState('');
    const [user, setUser] = useState({
        password: '',
      });
    const dispatch = useDispatch();
    const router = useRouter()

    const updateUser = () => {
    setUser({
        password: password,
    });
    console.log(user);
    };

    const resetPassword = (ev) => {
        ev.preventDefault();
        setLoading(true)
        dispatch(changePassword(user, token.access_token));
        setTimeout(() => {
            setLoading(false)
            setNotifications('Password Updated');
          }, 2000)
        setTimeout(() => {
            router.push('/')
          }, 2000)
        
    }

      //update password date
    const handleFocus = (e) => {
        setFocus(e.target.name);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword(value);
    };

    useEffect(() => {
        updateUser();
      }, [password]);
    


    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Change Password | Unzipped</title>
            <meta name="Change Password | Unzipped" content="Change Password"/>
            </Head>
            <Nav token={token}/>
            <div className="service-section-1">
                <div className="vohnt-register">
                    <div className="register-box" id="change-password">
                        <p className="top-text-r">Enter a new password</p>
                        <form onSubmit={(ev) => resetPassword(ev)} className="form-r">
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="password" 
                                value={password}
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                onFocus={handleFocus}
                                required
                                onBlur={() => password.length < 8 ? setPasswordVerify('valid') : setPasswordVerify(false)}
                            />
                        </div>
                        {passwordVerify === 'valid' && <p id="alert-text">Enter a valid password</p>}
                        <button className="outer-button" id="create-button" type="submit" disabled={password.length < 8 ? true : false}>
                            {loading ? <CircularProgress /> : 'Change password'}
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

export default connect(mapStateToProps, {changePassword})(Reset);