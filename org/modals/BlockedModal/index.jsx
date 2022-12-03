import React from 'react';
import {Button, Col, Modal, Row} from 'react-bootstrap';

const {Body, Header, Title} = Modal;

/**
 * @param {{
 * onHide: {() => void},
 * show: boolean,
 * message: string
 * }} props
 */
const BlockedModal = ({onHide, show, message}) => (
    <Modal id="subscriptionDelModal" backdrop="static" className="resubmitModal" show={show} onHide={onHide}>
        <Header closeButton />
        <Title>Investor Blocked</Title>

        <Body>
            <div className="subtext minHeight50 marginTop10">{message}</div>

            <Row className="marginTop20">
                <Col lg={12} md={12} sm={12} xs={12} className="paddingZero text-center">
                    <Button
                        type="button"
                        className="fsnetCancelButton marginLeft50 btnEnabled proceedWidth"
                        onClick={onHide}>
                        Ok
                    </Button>
                </Col>
            </Row>
        </Body>
    </Modal>
);

export default BlockedModal;
