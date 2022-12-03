import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Proptypes from 'prop-types';
import arrow from '../../images/arrow-up-white.svg';

const Wrapper = styled.footer`
    width: 100%;
    max-width: ${props => (props.fixedWidth ? '1400px' : 'auto')};
    margin: auto;
    background-color: #0a2264;
    color: #fff;
`;

const Container = styled.footer`
    max-width: 1440px;
    margin: auto;
    height: 100%;
    padding: 30px;
`;

const FooterItems = styled.div`
    font-size: 0.8rem;
    overflow: hidden;
`;

const FooterNavBlock = styled.div`
    padding: 0;
    float: right;
    @media only screen and (max-width: 834px) {
        float: none;
        width: 100%;
        text-align: center;
    }
`;

const NavItem = styled.li`
    text-decoration: underline;
    font-weight: 700;
`;

const NavLink = styled(Link)`
    text-decoration: underline;
    font-weight: 700;
    color: #fff;
    &:hover {
        color: #fff;
    }
`;

const FAQItem = styled.div`
    font-size: ${props => props.theme.fontSizeXXL};
    text-align: center;
    padding: 0 0 30px 0;
    margin-bottom: 30px;
    border-bottom: 1px solid #fff;
`;

const FAQLink = styled(NavLink)`
    font-weight: 400;
    text-decoration: none;
`;

const Copyright = styled.div`
    text-align: left;
    @media only screen and (max-width: 834px) {
        float: none;
        width: 100%;
        text-align: center;
        margin-top: 20px;
    }
`;

const FooterNav = styled.ul`
    display: inline-flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

const Hr = styled.hr`
    border: 1px solid #fff;
    transform: rotate(90deg);
    width: 1.2rem;
    height: 0;
    background-color: #fff;
    margin: 0.6rem 0.3rem;
`;

const Arrow = styled.img`
    transform: rotate(90deg);
    width: 50px;
    margin-left: 10px;
    margin-bottom: 5px;
`;

const Footer = ({bigFAQ, showCooleyLogin, fixedWidth}) => {
    return (
        <Wrapper fixedWidth={fixedWidth}>
            <Container>
                {bigFAQ && (
                    <FAQItem>
                        <FAQLink to="faq">
                            Vanilla FAQs
                            <Arrow alt="arrow" src={arrow} />
                        </FAQLink>
                    </FAQItem>
                )}
                <FooterItems>
                    <FooterNavBlock>
                        <FooterNav>
                            {showCooleyLogin && (
                                <>
                                    <NavItem>
                                        <NavLink to="login">Cooley User Sign In</NavLink>
                                    </NavItem>
                                    <Hr />
                                </>
                            )}
                            <NavItem>
                                <NavLink to="/terms-and-conditions">Terms of Service</NavLink>
                            </NavItem>
                            <Hr />
                            <NavItem>
                                <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                            </NavItem>
                            {!bigFAQ && (
                                <>
                                    <Hr />
                                    <NavItem>
                                        <NavLink to="faq">FAQs</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </FooterNav>
                    </FooterNavBlock>
                    <Copyright>&#169; 2021 Cooley LLP and Cooley (UK) LLP. All rights reserved.</Copyright>
                </FooterItems>
            </Container>
        </Wrapper>
    );
};

Footer.Proptypes = {
    bigFAQ: Proptypes.bool,
    showCooleyLogin: Proptypes.bool,
    fixedWidth: Proptypes.bool,
};

Footer.defaultProps = {
    bigFAQ: false,
    showCooleyLogin: false,
    fixedWidth: false,
};

export default Footer;
