import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/unzipped/header';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { resendVerify } from '../redux/actions';
import { useRouter } from 'next/router';
import { parseCookies } from "../services/cookieHelper";
import Notification from '../components/animation/notifications';

const Verify = ({token, error}) => {
    const dispatch = useDispatch();
    const [focus, setFocus] = useState('');
    const [email, setEmail] = useState('');
    const [link, setLink] = useState('/dashboard');
    const [password, setPassword] = useState('');
    const [notifications, setNotifications] = useState('');
    const [errorHandler, setErrorHandler] = useState(false);
    // const router = useRouter()
    const [cursor, setCursor] = useState({});
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: '',
      });

    const updateUser = () => {
    setUser({
        email: email,
    });
    console.log(user);
    };

      //update Email date
    const handleEmailFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleEmailChange = (e) => {
        const { name, value, selectionStart } = e.target;
        setEmail(value);
    };

    const Resend = (ev) => {
        ev.preventDefault();
        setLoading(true);
        dispatch(resendVerify({email: email}));
        setTimeout(() => {
            setLoading(false)
            setNotifications('Verification email sent');
          }, 2000)
        return;
    }

    const sleep = (duration) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, duration * 1000)
        })
    }

    useEffect(() => {
        updateUser();
      }, [email]);

    useEffect(() => {
        if (error) {
            setErrorHandler(true);
            sleep(5);
            setErrorHandler(false);
        }
    }, [error])


    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Confirm Password | Unzipped</title>
            <meta name="Confirm Password | Unzipped" content="Confirm Password"/>
            </Head>
            <Nav token={token}/>
            <div className="service-section-1">
                <div className="vohnt-register">
                    <div className="register-box-3">
                        <div className="verify-header">
                        <p className="verify-title">Check your email</p>
                        <p className="verify-content">Tap the link in the email we sent you. We verify so we know it's really you - and so we can send you important information about your Vohnt account.</p>
                        </div>
                        {/* <form onSubmit={Resend} className="form-q">type="submit" */}
                        <div className="form-q">
                        <div className="verify-label">
                            <p className="verify-email">Email</p>  
                        </div>
                        <div className="input-login" id="verify-input">
                            <input 
                                id="register-input" 
                                type="email" 
                                value={email}
                                placeholder=""
                                onChange={(e) => handleEmailChange(e)}
                                onFocus={(e) => handleEmailFocus(e)}
                                required
                            />
                        </div>
                        <button className="outer-button" id="create-button-2" onClick={(ev) => Resend(ev)} disabled={email.length < 8 ? true : false}>
                            {loading ? <CircularProgress /> : 'Resend Email'}
                        </button>
                        </div>
                        {/* </form> */}
                        <Link href={`${link}`} className="verify-link">I'll do this later</Link>
                    </div>
                    {/* <div className="floating-alert">{error}</div> */}
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

Verify.getInitialProps = async ({ req, res }) => {
    const token = parseCookies(req)
    
      return {
        token: token && token,
      }
    }

const mapStateToProps = (state) => {
    return {
        location: state.Booking.location,
        date: state.Booking.date,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
        auth: state.Auth.user,
        token: state.Auth.token,
        error: state.Auth.error,
        emails: state.Auth.user.email,
    }
  }

export default connect(mapStateToProps, {resendVerify})(Verify);