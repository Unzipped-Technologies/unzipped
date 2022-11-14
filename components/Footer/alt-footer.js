import React from 'react';
import { Container, Button, Row, Col } from 'reactstrap';
import {useRouter} from 'next/router';

const Footer = () => {
    const router = useRouter();

    const data = [
        {
            name: "About",
            link: '/our-story',
        },
        {
            name: "Contact",
            link: '/contact',
        },
        {
            name: "Blog",
            link: '/faqs',
        },
    ]

    return (
        <React.Fragment>
            <footer className="footer footer-big">
            <Container className="footer-content-container">
            <Row className="row-two-footer"> 

            </Row>
            <Row className="footer-row">
                <Col></Col>
                <Col className="ml-auto mr-auto" md="6" sm="9">
                <div className="links">
                    <h3 className="footer-text">
                    Design.Develop.<span className="enjoy">enjoy </span>♡
                    </h3>
                    <hr />
                    <div className="copyright">
                    © {new Date().getFullYear()}, Made with{" "}
                    <i className="fa fa-heart heart" style={{fontStyle: 'normal'}}/> {"  "}by Jason
                    </div>
                </div>
                </Col>
                <Col md="4" sm="2" className="float-right-f">
                <div className="links-content">
                        {data.map((item, index) => {
                            return (
                                <div className="link-container" key={index}>
                                    <a href={item.link} className="link-footer">{item.name}</a>
                                </div>
                            )
                        })}
                </div>
                <div className="social-area">
                    <button
                    className="btn-round btn-just-icon btn-w-icon mr-1 fb-btn"
                    color="facebook"
                    href="#pablo"
                    aria-label="facebook"
                    onClick={(e) => router.push('https://www.facebook.com/Alien4Hire/')}
                    >
                    <i className="fa fa-facebook fix-social" />
                    </button>
                    <button
                    className="btn-just-icon btn-round btn-w-icon mr-1 tw-btn"
                    color="twitter"
                    href="#pablo"
                    aria-label="twitter"
                    onClick={(e) => router.push('https://twitter.com/jason_unzipped')}
                    >
                    <i className="fa fa-twitter fix-social btn-w-icon fix-tw" />
                    </button>
                    <button
                    className="btn-just-icon btn-round mr-1 in-btn"
                    color="instagram"
                    href="#pablo"
                    aria-label="instagram"
                    onClick={(e) => router.push('https://www.tiktok.com/@jason_unzipped')}
                    >
                    <i className="fa fa-instagram fix-social" />
                    </button>
                </div>
                </Col>
            </Row>
            </Container>
        </footer>
      </React.Fragment>
    )
}

export default Footer;