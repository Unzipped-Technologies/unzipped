import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Nav from '../components/Navbar/ColorNav';
import { loadUser } from '../redux/actions';
import { useRouter } from 'next/router';
import Notification from '../components/animation/notifications';


const Login = ({ location, date, isAuthenticated, count, error, userVerified, PassError }) => {
    const dispatch = useDispatch();
    const [focus, setFocus] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [link, setLink] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [notifications, setNotifications] = useState('');
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [altLink, setAltLink] = useState(link);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: '',
      });

    const updateUser = () => {
    setUser({
        email: email.toLowerCase(),
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

    const isVerified = () => {
        if (userVerified === false) {
            setAltLink('/verify');
            console.log('false:' + altLink)
            return;
        } else {
            console.log('true:' + altLink)
            return;
        }
    }

      ///login
  const loginUser = (ev) => {
    ev.preventDefault();
    if (password.length < 8) {
        setPasswordVerify('valid');
        return; 
    } 
    setLoading(true);
    try {
      console.log(user)
      dispatch(loadUser(user));
      if (PassError) {
          setPasswordVerify('match');
          setTimeout(() => {
            setLoading(false)
            setNotifications(error)
          }, 2000)
      }
      if(isAuthenticated !== true) {
            setEmailVerify('inUse');
            setTimeout(() => {
                setLoading(false)
              }, 2000)
            return;
        }
      } catch {
        console.log('error')
      }
    };

    const google = (ev) => {
        ev.preventDefault();
        setLoading(true);
        router.push('/api/auth/google');
    }

//   useEffect(() => {
//     if (count === 0) {
//         setLink('/services');
//     } else if (date === 'Select a Date') {
//         setLink('/schedule');
//     } else if (location.name === 'Select map area') {
//         setLink('/maps');
//     } else if (isAuthenticated !== true) {
//         setLink('/login');
//     } else {
//         setLink('/cart');
//     }
//     }, [count, location, date, isAuthenticated])

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
        if(isAuthenticated) {
            // isVerified()
            // console.log('last:' + altLink)
            // window.location.href = altLink;
            setNotifications('User Logged In');
            setTimeout(() => {  setNotifications(''); }, 4000);

            router.push(altLink);
        }
        }, [isAuthenticated, userVerified, count, location, date]);
    
        useEffect(() => {
            if (PassError === "Email and Password does not match") {
                setEmailVerify("inUse");
            }
        }, [PassError])

    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Unzipped | Login</title>
            <meta name="Unzipped | Login" content="Unzipped"/>
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
            <div className="service-section-1" id="login-sec-1">
                <div className="vohnt-register">
                    <div className="register-box">
                        <p className="top-text-r">Login or create an account to continue with this order</p>
                        {/* <Link href='/api/auth/google'> */}
                        <button className="outer-button" onClick={(ev) => google(ev)}>
                            <div className="button-holder">
                            <img src={'/img/google-icon.png'} alt="" className="google-s-icon"/>
                            <span>Log in with Google</span>
                            </div>
                        </button>
                        {/* </Link> */}
                        <div className="top-text-f">or</div>
                        <form onSubmit={loginUser} className="form-r">
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="email" 
                                value={email}
                                placeholder="Email"
                                onChange={handleEmailChange}
                                onFocus={handleEmailFocus}
                                required
                                onBlur={() => email.length < 4 ? setEmailVerify('valid') : setEmailVerify(false)}
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
                                required
                                onBlur={() => password.length < 8 ? setPasswordVerify('valid') : setPasswordVerify(false)}
                            />
                        </div>
                        {passwordVerify === 'valid' && <p id="alert-text">Password must be at least 8 characters</p>}
                        {passwordVerify === 'match' && <p id="alert-text">{PassError}</p>}
                        <button className="outer-button" id="create-button" type="submit">
                            {loading ? <CircularProgress /> : 'Sign in'}
                        </button>
                        </form>
                        <div className="privacy-text-l" >No account? <a href="/register">Register</a></div>
                        <a className="privacy-text-l" href="/forgot-password" id="register-link">Forgot password?</a>
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

const mapStateToProps = (state) => {
    return {
        location: state.Booking.location,
        date: state.Booking.date,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        error: state.Auth.user.error,
        userVerified: state.Auth.user.emailVerified,
        PassError: state.Auth.error.data,
    }
  }

export default connect(mapStateToProps, { loadUser })(Login);
