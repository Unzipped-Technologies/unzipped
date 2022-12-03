import React, {Component} from 'react';
import './index.css';
import {Row} from 'react-bootstrap';
import vanillaLogo from 'images/vanilla-wordmark-rgb.svg';

class HeaderComponent extends Component {
    render() {
        return (
            <Row className="headerContainer">
                <a href="/">
                    <img src={vanillaLogo} alt="vanilla" className="vanilla-logo marginLeft30" />
                </a>
            </Row>
        );
    }
}

export default HeaderComponent;
