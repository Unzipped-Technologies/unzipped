import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import { loadUser } from '../redux/actions';
import { useRouter } from 'next/router';
import Notification from '../components/animation/notifications';
import styled from 'styled-components'
import {
    Text,
    FormField,
    Button,
    Image,
    Icon
} from '../components/ui'
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link'
import theme from '../components/ui/theme'
import {ValidationUtils} from '../utils'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: 'Roboto';
`;
const Box = styled.div`
    display: flex;
    background-color: #D9D9D9;
    width: 464px;
    height: 674px;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const Sign = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;

    text-align: center;
    letter-spacing: 0.39998px;
    text-transform: uppercase;

    color: #333333;
`;

const Google = styled.button`
    background-color: #4285F4;
    outline: none;
    border: none;
    color: ${theme.text};
    border-radius: 24px;
    width: 80%;
    height: 44px;
    margin: 20px 10%;
    position: relative;
    cursor: pointer;
`;

const Abs = styled.div`
    position: absolute;
    left: -2px;
    bottom: -4px;
`;

const Span = styled.span`
    padding: 15px;
`;

const Form = styled.form`
    position: relative;
    bottom: 20px;
    margin: 40px 0px 0px 0px;;
    display: grid;
    height: 225px;
`;

const Hold = styled.div`
    width: 79%;
`;

const Or = styled.div`
    position: relative;
    font-size: 16px;
    z-index: 1;
    overflow: hidden;
    text-align: center;
    &:after {
        position: absolute;
        top: 51%;
        overflow: hidden;
        width: 50%;
        height: 1px;
        content: '\a0';
        background-color: #444;
    }
    &:before {
        position: absolute;
        top: 51%;
        overflow: hidden;
        width: 50%;
        height: 1px;
        content: '\a0';
        background-color: #444;
        margin-left: -50%;
        text-align: right;
    }
`;

const TextBox = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 00px 0px;
`;

const Contain = styled.div`
    position: relative;
    bottom: 25px;
    width: 80%;
    align-items: left;
`;

const Login = ({ loading, PassError, loadUser, isAuthenticated, error }) => {
    const [emailAlert, setEmailAlert] = useState('');
    const [passwordAlert, setPasswordAlert] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [link, setLink] = useState('');
    const [emailVerify, setEmailVerify] = useState(false);
    const [notifications, setNotifications] = useState('');
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
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            loginUser();
        }
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
        updateUser();
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
        updateUser();
    };

    const updateRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const validateEmail = () => {
        const error = !ValidationUtils._emailValidation(email)
        if (!error) {
            setEmailAlert('Please enter a valid email address');
        } else {
            setEmailAlert('');
        }
        return error;
    }

    const validatePassword = () => {
        const error = ValidationUtils._passwordValidation(password)
        if (!error) {
            setPasswordAlert('Password must be at least 8 characters long');
        } else {
            setPasswordAlert('');
        }
        return error;
    }

      ///login
  const loginUser = async () => {
    if (passwordAlert || emailAlert) {
        return;
    }
    try {
        await loadUser(user)
    } catch (e) {
        console.log('error:', e)
    }
  };

    const google = () => {
        router.push('/api/auth/google');
    }

    useEffect(() => {
        updateUser();
      }, [email, password]);
    
    useEffect(() => {
        if (PassError === "Email and Password does not match") {
            setEmailVerify("inUse");
        }
    }, [PassError])

    useEffect(() => {
        if (isAuthenticated) {
            setNotifications('Login Successful')
            setTimeout(() => {  
                router.push('/dashboard')
            }, 2000);
        } else {
            console.log('set note')
            setNotifications(error?.data)
            setTimeout(() => {  
                setNotifications('')
            }, 1000);
        }
    }, [isAuthenticated])

    return (
        <React.Fragment>
            <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <title>Unzipped | Login</title>
            <meta name="Unzipped | Login" content="Unzipped"/>
            </Head>
            <Container>
                <Box>
                    <Image src='/img/Unzipped-Primary-Logo.png' alt='logo' width="50%" />
                    <Sign textAlign="center" level={2} fontWeight={500}>SIGN UP</Sign>
                    <Google onClick={google}>CONTINUE WITH GOOGLE<Abs><Icon name="googleCircle" /></Abs></Google>
                    <Hold><Or><Span>OR</Span>  </Or></Hold>
                    <Form>
                    <FormField validate={validateEmail} error={emailAlert} placeholder="Email" name="email" type="email" fieldType="input" fontSize={'18px'} bottom="0px" onChange={updateEmail}>
                    </FormField>
                    <FormField validate={validatePassword} onKeyDown={handleKeyDown} error={passwordAlert} placeholder="Password" name="password" type="password" fieldType="input" fontSize={'18px'} bottom="0px" onChange={updatePassword}>
                    </FormField>
                    <TextBox>
                    <Checkbox
                        color="primary"
                        checked={rememberMe}
                        onClick={updateRememberMe}
                        name="Remember Me"
                        
                    ></Checkbox>
                    <Text>Remember Me <Link href="/">Forgot password</Link></Text></TextBox>
                    <Button noBorder background="#1890FF" block type="submit" onClick={loginUser}>{loading ? <CircularProgress size={18} /> : 'Log in'}</Button>
                    </Form>
                    <Contain><Text> Or <Link href="/">register now!</Link></Text></Contain>
                    <Notification error={notifications}/>
                </Box>
                
            </Container>
            {/* <div className="service-section-1" id="login-sec-1">
                <div className="vohnt-register">
                    <div className="register-box">
                        <button className="outer-button" onClick={(ev) => google(ev)}>
                            <div className="button-holder">
                            <img src={'/img/google-icon.png'} alt="" className="google-s-icon"/>
                            <span>Log in with Google</span>
                            </div>
                        </button>
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
            </div>  */}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        token: state.Auth.token,
        loading: state.Auth.loading,
        error: state.Auth.error
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        loadUser: bindActionCreators(loadUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
