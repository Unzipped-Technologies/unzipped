import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'reactstrap';
import MenuDropdown from '../Custom/MenuDropdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import logo from '../../assets/img/cursive-logo-purple.png';

const NoLogo = () => {
    const [focus, setFocus] = useState(false);
    const wrapperRef = useRef(null);
    const router = useRouter();

    const WWDItems = [
        { names: `Car Wash ${'&'} Detail`, links: `/car-wash-detail` },
        { names: `Car Services`, links: `/car-services` },
        { names: `Car Repair`, links: `/car-repair` }, 
    ]

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

    return (
        <React.Fragment>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet"></link>
            {/* <div className="header-safety">
                    <img src={safe} alt="" className="safe-img"/>
            </div> */}
            <div className="nav-c-container">
                <div className="logo-left">
                    <a href="/" className="link-styleless">
                        {/* <img src={logo} alt="" className="cursive-logo-c"/> */}
                    </a>
                </div>
                <div className="menu-right-c">
                    <div className="menu-items-c" >
                        <ul className="menu-c" >
                            <li className="one-c">
                                <div onClick={()=> setFocus('dropdown')} className="menu-text-c dark-logo" id="">
                                    What We Do
                                </div>
                                {focus === 'dropdown' &&
                                    <div ref={wrapperRef} className="nav-right-wwd" id="position-menu-drop-nl">
                                        <MenuDropdown MenuItems={WWDItems} />
                                    </div>
                                }
                            </li>
                            <li className="two-c">
                                <a href="/how-it-works" className="menu-text-c dark-logo">How It Works</a>
                            </li>
                            <li className="three-c">
                                <a href="/partners" className="menu-text-c dark-logo">Become a Partner</a>
                            </li>
                            <li className="four-c">
                                <a href="/faqs" className="menu-text-c dark-logo">Answers</a>
                            </li>
                        </ul>
                    </div>
                    <div className="social-c-right">
                        <ul className="social-c-button">
                            <li >
                                <Link href="https://www.tiktok.com/@jason_unzipped">
                                    <svg id="instagram-unauth-icon" viewBox="0 0 64 64" width="38" height="38" fill="black" ><path d="M46.91,25.816c-0.073-1.597-0.326-2.687-0.697-3.641c-0.383-0.986-0.896-1.823-1.73-2.657c-0.834-0.834-1.67-1.347-2.657-1.73c-0.954-0.371-2.045-0.624-3.641-0.697C36.585,17.017,36.074,17,32,17s-4.585,0.017-6.184,0.09c-1.597,0.073-2.687,0.326-3.641,0.697c-0.986,0.383-1.823,0.896-2.657,1.73c-0.834,0.834-1.347,1.67-1.73,2.657c-0.371,0.954-0.624,2.045-0.697,3.641C17.017,27.415,17,27.926,17,32c0,4.074,0.017,4.585,0.09,6.184c0.073,1.597,0.326,2.687,0.697,3.641c0.383,0.986,0.896,1.823,1.73,2.657c0.834,0.834,1.67,1.347,2.657,1.73c0.954,0.371,2.045,0.624,3.641,0.697C27.415,46.983,27.926,47,32,47s4.585-0.017,6.184-0.09c1.597-0.073,2.687-0.326,3.641-0.697c0.986-0.383,1.823-0.896,2.657-1.73c0.834-0.834,1.347-1.67,1.73-2.657c0.371-0.954,0.624-2.045,0.697-3.641C46.983,36.585,47,36.074,47,32S46.983,27.415,46.91,25.816z M44.21,38.061c-0.067,1.462-0.311,2.257-0.516,2.785c-0.272,0.7-0.597,1.2-1.122,1.725c-0.525,0.525-1.025,0.85-1.725,1.122c-0.529,0.205-1.323,0.45-2.785,0.516c-1.581,0.072-2.056,0.087-6.061,0.087s-4.48-0.015-6.061-0.087c-1.462-0.067-2.257-0.311-2.785-0.516c-0.7-0.272-1.2-0.597-1.725-1.122c-0.525-0.525-0.85-1.025-1.122-1.725c-0.205-0.529-0.45-1.323-0.516-2.785c-0.072-1.582-0.087-2.056-0.087-6.061s0.015-4.48,0.087-6.061c0.067-1.462,0.311-2.257,0.516-2.785c0.272-0.7,0.597-1.2,1.122-1.725c0.525-0.525,1.025-0.85,1.725-1.122c0.529-0.205,1.323-0.45,2.785-0.516c1.582-0.072,2.056-0.087,6.061-0.087s4.48,0.015,6.061,0.087c1.462,0.067,2.257,0.311,2.785,0.516c0.7,0.272,1.2,0.597,1.725,1.122c0.525,0.525,0.85,1.025,1.122,1.725c0.205,0.529,0.45,1.323,0.516,2.785c0.072,1.582,0.087,2.056,0.087,6.061S44.282,36.48,44.21,38.061z M32,24.297c-4.254,0-7.703,3.449-7.703,7.703c0,4.254,3.449,7.703,7.703,7.703c4.254,0,7.703-3.449,7.703-7.703C39.703,27.746,36.254,24.297,32,24.297z M32,37c-2.761,0-5-2.239-5-5c0-2.761,2.239-5,5-5s5,2.239,5,5C37,34.761,34.761,37,32,37z M40.007,22.193c-0.994,0-1.8,0.806-1.8,1.8c0,0.994,0.806,1.8,1.8,1.8c0.994,0,1.8-0.806,1.8-1.8C41.807,22.999,41.001,22.193,40.007,22.193z"></path></svg>
                                {/* <i className="fa fa-instagram fix-social btn-w-icon fix-in i-size" /> */}
                                </Link>
                            </li>
                            <li>
                                <Link href="https://twitter.com/jason_unzipped">
                                    {/* <i className="fa fa-twitter fix-social btn-w-icon fix-tw i-size" /> */}
                                    <svg id="twitter-unauth-icon" viewBox="0 0 64 64" width="38" height="38" fill="black"><path d="M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z"></path></svg>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.facebook.com/Alien4Hire/">
                                    {/* <i className="fa fa-facebook fix-social btn-w-icon fix-fb i-size" /> */}
                                    <svg id="facebook-unauth-icon" viewBox="0 0 64 64" width="38" height="38" fill="black"><path d="M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z"></path></svg>
                                </Link>
                            </li>
                        </ul>
                        <div className="button-container">
                            <button className="btn-two" onClick={() => router.push('/services')}>
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NoLogo;