import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import API from '../utils/api';
import Calendar from '../components/Custom/Presentation/Calendar-display';
import Nav from '../components/Navbar/ColorNav';
import Selector from '../components/Custom/Presentation/MapSelector';
import Footer from '../components/Footer/alt-footer';
import { connect, useDispatch } from 'react-redux';
import { registerUser } from '../redux/actions';
import { tokenConfig } from '../services/tokenConfig';

const Register = ({location, date, count, isAuthenticated, token, error, users}) => {
    const dispatch = useDispatch();
    const [focus, setFocus] = useState('');
    const [email, setEmail] = useState('');
    const [link, setLink] = useState('/services');
    const [password, setPassword] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [passwordVerify, setPasswordVerify] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: '',
      });

    useEffect(() => {
    if (count === 0) {
        setLink('/services');
    } else if (date === 'Select a Date') {
        setLink('/schedule');
    } else if (location.name === 'Select map area') {
        setLink('/maps');
    } else if (isAuthenticated !== true) {
        setLink('/login');
    } else {
        setLink('/cart');
    }
    }, [count, location, date, isAuthenticated])

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

      ///register
      const verifyNow = (ev) => {
        ev.preventDefault();
        try {
          console.log(user)
            dispatch(registerUser(user))
              if (error) {
                setEmailVerify('inUse');
                return;
              
              } else {
                if(isAuthenticated) {
                    window.location.href = link;
                } else {
                      setEmailVerify('inUse');
                      return;
                }
              }
            
          } catch (e) {
            console.log(e);
          }
      };


    useEffect(() => {
        updateUser();
      }, [email, password]);
    


    return (
        <React.Fragment>
            <div className="services-page-register">
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Unzipped | Verify</title>
            <meta name="Unzipped | Verify" content="Car care, service, and repair done on your car's time, not yours. Because some of life's best moments begin with, &quot;I'll drive.&quot;"/>
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
                    <div className="register-box-3">
                        <div>
                        <p className="top-text-h">Verify your email</p>
                        <p className="top-text-z">Please enter the password for the Vohnt account associated with {users.email}</p>
                        </div>
                        <form onSubmit={verifyNow} className="form-r">
                        <p className="float-left">Password</p>
                        <p><a href="forgot-password" id="password-right">Forgot password?</a></p>
                        <div className="input-login">
                            <input 
                                id="register-input" 
                                type="password" 
                                value={user.password}
                                placeholder=""
                                onChange={handlePasswordChange}
                                onFocus={handlePasswordFocus}
                                required
                            />
                        </div>
                        <button className="outer-button" id="create-button" disabled={password.length < 8 ? true : false} type="submit">
                            Continue
                        </button>
                        </form>
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
    return {
        location: state.Booking.location,
        date: state.Booking.date,
        count: state.Booking.count,
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        error: state.Auth.error,
        users: state.Auth.user
    }
  }

export default connect(mapStateToProps, {registerUser})(Register);