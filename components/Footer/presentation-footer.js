import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa';

const PresentationFooter = () => {

    const data = [
        {
            name: "About",
            link: '/',
        },
        {
            name: "Contact",
            link: '/',
        },
        {
            name: "Blog",
            link: '/',
        },
    ]

    return (
        <React.Fragment>
            <div className="footer-container">
                <div className="left-content-footer">
                    <div className="footer-title">
                        Vohnt, Inc.
                    </div>
                    <h3 className="footer-text">
                    Design.Develop.<span className="enjoy">enjoy </span>♡
                    </h3>
                </div>
                <div className="right-content-footer">
                    <div className="links-content">
                        {data.map((item, index) => {
                            return (
                                <div className="link-container" key={index}>
                                    <a href={item.link} className="link-footer">{item.name}</a>
                                </div>
                            )
                        })}
                    </div>
                    <div className="social-media-icons">
                    <FaFacebookF />
                    <FaInstagram />
                    <FaTwitter />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PresentationFooter;