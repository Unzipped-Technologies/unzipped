import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * selectedActModal: {{}},
 * show: boolean,
 * }} props
 */

const ActModal = ({onHide, selectedActModal, show}) => {
    const {content, heading} = selectedActModal;

    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>{heading}</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div>{content}</div>
            </Body>
        </Modal>
    );
};

export default ActModal;
