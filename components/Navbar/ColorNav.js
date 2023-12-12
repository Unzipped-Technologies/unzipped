import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row, Button } from 'reactstrap';
import Icon from "@material-ui/core/Icon";
import { useRouter } from 'next/router'
import MenuDropdown from '../Custom/MenuDropdown';
import { connect, useDispatch } from 'react-redux';
import { logoutUser, reloadLogout } from '../../redux/actions';
// import logo from '../../public/img/vohnt-cursive-logo.png'
// import logo from '../../assets/img/vohnt-cursive-logo.png';


const ColorNav = ({ popBox, isAuthenticated, loggedOut, userType }) => {
    const [focus, setFocus] = useState(false);
    const [lineClass, setLineClass] = useState("line-two");
    const wrapperRef = useRef(null);
    const router = useRouter()
    const dispatch = useDispatch();

    // const WWDItems = [
    //     { names: `Car Wash ${'&'} Detail`, links: `/car-wash-detail` },
    //     { names: `Car Services`, links: `/car-services` },
    //     { names: `Car Repair`, links: `/car-repair` }, 
    // ]

    const signOut = () => {
        dispatch(logoutUser()) 
    }

    const MenuItems = () => {
        if (isAuthenticated) {
            if (userType === "Admin") {
                return (
                    [
                        { names: "Sign out", links: `/api/auth/logout`},
                        { names: "Dashboard", links: `/dashboard/calendar`},
                        { names: "Orders", links: `/receipt`},
                        { names: "<hr />", links: ''},
                        { names: "Schedule an appointment", links: `/schedule`},
                        { names: "Become a partner", links: `/partners` },
                        { names: "Help", links: `/faqs`},
                    ]
                )
            }
            return (
                [
                    { names: "Sign out", links: `/api/auth/logout`},
                    { names: "Membership", links: `/register`},
                    { names: "Orders", links: `/receipt`},
                    { names: "<hr />", links: ''},
                    { names: "Schedule an appointment", links: `/schedule`},
                    { names: "Become a partner", links: `/partners` },
                    { names: "Help", links: `/faqs`},
                ]
            )
        } else {
            return (
                [
                    { names: "Sign up", links: `/register`},
                    { names: "Log in", links: `/login`},
                    { names: "<hr />", links: ''},
                    { names: "Schedule an appointment", links: `/schedule`},
                    { names: "Become a partner", links: `/partners` },
                    { names: "Help", links: `/faqs`},
                ]
            )
        }
    }

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setFocus(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        if (loggedOut === true) {
            if (router.pathname === '/') {
                dispatch(reloadLogout())
                router.push('/')
            } else {
                dispatch(reloadLogout())
                router.push('/');
            }
        }
    }, [loggedOut])

    return (
        <React.Fragment>
            <div className="header-nav-1" id={popBox === 'services' ? 'header-nav-2' : '' }>
            <Row className="main-nav" id={popBox === 'services' ? "nav-correct" : ""} >
                <Col lg="2" className="py-2 logo-nav">
                    <div >
                    <a href="/"><img src={'/img/Unzipped-Primary-Logo.png'}  alt="" className="logo-img"/></a>
                    {/* width={196} height={100} */}
                    </div>
                </Col>
                <Col lg="6" className={popBox === 'home' ? "py-2 items-nav" : "py-2 items-nav-2"}>
                    <Col lg="2" xs="2" className="py-2 navbar-one underline">
                        <div className="nav-item-one menu-text">
                            Schedule now
                        </div>
                        <div>
                            <hr className="line-one" />
                        </div>
                    </Col>
                    <Col lg="2" xs="2" className="py-2 navbar-one" id="whatWeDo">
                        <div 
                            className="navhover menu-text"
                            onMouseEnter={()=> {
                                setLineClass("line-two")
                                setFocus('two')
                                } 
                            }
                            onMouseLeave={()=> {
                                setLineClass("line-three")
                                // setFocus(false)
                                }
                            }
                            onClick={()=> setFocus('WWD')}    
                            >
                            What we do
                        </div>
                        {focus === 'two' && 
                        <div>
                            <hr className={lineClass} />
                        </div>
                        }
                        {focus === "WWD" && 
                            <div onBlur={() => setFocus(false)} ref={wrapperRef} className={popBox === 'home' ? "nav-right-wwd" : "nav-right-service"}>
                            {/* <MenuDropdown MenuItems={WWDItems} /> */}
                            </div>
                        }
                    </Col>
                    <Col lg="2" xs="2" className="py-2 navbar-one">
                    <div 
                            className="navhover"
                            onMouseEnter={()=> {
                                setLineClass("line-two")
                                setFocus('three')
                                } 
                            }
                            onMouseLeave={()=> {
                                setLineClass("line-three")
                                // setFocus(false)
                                }
                            }    
                            >
                            <a href="/how-it-works" className="link-styleless menu-text" alt="">How it works</a>
                        </div>
                        {focus === 'three' && 
                        <div>
                            <hr className={lineClass} />
                        </div>
                        }
                    </Col>
                </Col>
                <Col lg="2" className={popBox === 'home' ? "py-2 additional-nav navbar-right" : "py-2 additional-nav-1 navbar-right-1"}>
                    <Link href="/partners">
                    <div className="driver-nav">
                        <span className="driver-text">
                            Become a partner
                        </span>
                    </div>
                    </Link>
                    <div className="right-menu-nav">
                        <Button className="right-nav-button" onClick={() => setFocus('dropdown')} aria-label="menu">
                        <Icon className="material-icons">
                        menu
                        </Icon>
                        <Icon className="material-icons">
                        person_outline
                        </Icon>
                        </Button>
                    </div>
                </Col>
            </Row>
            </div>
            {focus === "dropdown" && 
                <div onBlur={() => setFocus(false)} ref={wrapperRef} className={popBox === 'home' ? "nav-right-box" : "nav-right-box-service" }>
                <MenuDropdown MenuItems={MenuItems()} signOut={signOut}/>
                </div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.Auth.isAuthenticated,
        loggedOut: state.Auth.loggedOut,
        userType: state.Auth.user.userType,
    }
}

export default connect(mapStateToProps, {logoutUser, reloadLogout})(ColorNav);