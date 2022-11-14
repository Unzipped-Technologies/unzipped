import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Nav from '../components/Navbar/ColorNav';
import { connect, useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions';
import CircularProgress from '@material-ui/core/CircularProgress';

const Register = ({location, date, count, isAuthenticated, userVerified, error, loading}) => {
    const dispatch = useDispatch();
    const [focus, setFocus] = useState('');
    const [email, setEmail] = useState('');
    const [link, setLink] = useState('/services');
    const [password, setPassword] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [altLink, setAltLink] = useState('/verify');
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
      });

    const updateUser = () => {
    setUser({
        email: email,
        password: password,
    });
    console.log(user);
    };

      //update Email date
    const handleEmailFocus = (e) => {
        setFocus(e.target.name);
    };

    const handlePasswordFocus = (e) => {
        setFocus(e.target.name);
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmail(value);
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPassword(value);
    };

    const google = (ev) => {
        ev.preventDefault();
        router.push('/api/auth/google')
    }

    const isVerified = () => {
        if (userVerified === false) {
            setAltLink('/confirmVerify');
            console.log('false:' + altLink)
            return;
        } else {
            console.log('true:' + altLink)
            return;
        }
    }

      ///register
      const registerNow = (ev) => {
        ev.preventDefault();
        try {
          console.log(user)
          dispatch(registerUser(user))
          if(isAuthenticated !== true) {
            setEmailVerify('inUse');
            return;
        }
    } catch {
        console.log('error')
    }
    };

    useEffect(() => {
        updateUser();
      }, [email, password]);

      useEffect(() => {
        console.log(count)
        if (count === 0) {
            setAltLink('/services');
        } else if (date === 'Select a Date') {
            setAltLink('/schedule');
        } else if (location.name === 'Select map area') {
            setAltLink('/maps');
        } else {
            setAltLink('/cart');
        }
        if(isAuthenticated === true) {
            isVerified()
            console.log('last:' + altLink)
            if (userVerified === false) {
                router.push('/confirmVerify');
            } else {
                router.push(altLink);
            }
        }
        }, [isAuthenticated, userVerified, count, location, date]);


    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Unzipped | Register</title>
            <meta name="Unzipped | Register" content="Unzipped"/>
            </Head>
            <div className="service-header-1">
            <Nav popBox="services"/>
            {/* <div className="service-selector">
            <Selector />
            </div> */}
            {/* <div className="mobile-service-selector">
            <AppointmentMobile />
            </div> */}
            </div>
            <div className="service-section-1">
                <div className="vohnt-register">
                    <div className="register-box">
                        <p className="top-text-r">Login or create an account to continue with this order</p>
                        <button className="outer-button" onClick={(ev) => google(ev)}>
                            <div className="button-holder">
                            <img src={'/img/google-icon.png'} alt="" className="google-s-icon"/>
                            <span>Sign up with Google</span>
                            </div>
                        </button>
                        <div className="top-text-f">or</div>
                        <form onSubmit={registerNow} className="form-r">
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="email" 
                                value={email}
                                placeholder="Email"
                                onChange={handleEmailChange}
                                onFocus={handleEmailFocus}
                                onBlur={() => email.length < 6 ? setEmailVerify('valid') : setEmailVerify(false)}
                                required
                                // onBlur={() => setEmailVerify(false)}
                            />
                        </div>
                        {emailVerify === 'inUse' && <p id="alert-text">{error}</p>}
                        {emailVerify === 'valid' && <p id="alert-text">Enter a valid email</p>}
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="password" 
                                value={password}
                                placeholder="Password"
                                onChange={handlePasswordChange}
                                onFocus={handlePasswordFocus}
                                onBlur={() => password.length < 8 ? setPasswordVerify('valid') : setPasswordVerify(false)}
                                required
                            />
                        </div>
                        {passwordVerify === 'valid' && <p id="alert-text">Password must be a least 8 characters</p>}
                        <button className="outer-button" id="create-button" disabled={password.length < 8 ? true : false} type="submit">
                            {loading ? <CircularProgress /> : 'Create account'}
                        </button>
                        </form>
                        <div className="privacy-text-l">Already have an account? <a href="/login">Log in</a></div>
                        <div className="privacy-text-l" >
                            This site is protected by reCAPTCHA and the <a href="https://policies.google.com/privacy">Google Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="alt-footer-2">
            <Footer />
            </div> */}
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state.Auth)
    return {
        location: state.Booking.location,
        date: state.Booking.date,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        error: state.Auth.user.error,
        userVerified: state.Auth.user.emailVerified,
        loading: state.Auth.loading,
    }
  }

export default connect(mapStateToProps, {registerUser})(Register);