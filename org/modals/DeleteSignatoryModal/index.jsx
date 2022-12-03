import React from 'react';
import {Button, Col, Modal, Row} from 'react-bootstrap';

const {Body, Header, Title} = Modal;

/**
 *
 * @param {{
 * jsonData: {{}},
 * onConfirmDeletion: {() => void},
 * onHide: {() => void},
 * show: boolean,
 * }} props
 */

const DeleteSignatoryModal = ({jsonData, onConfirmDeletion, onHide, show}) => {
    const {SIGNATORY_DELETE} = jsonData;

    return (
        <Modal
            id="LPDelModal"
            backdrop="static"
            show={show}
            onHide={onHide}
            dialogClassName="LPDelModalDialog signatoryDialog">
            <Header closeButton />
            <Title>Delete Signatory</Title>
            <Body>
                <div className="subtext modal-subtext">{SIGNATORY_DELETE}</div>
                <div className="form-main-div" />
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button type="button" className="fsnetCancelButton" onClick={onHide}>
                            Cancel
                        </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button type="button" className="fsnetCancelButton btnEnabled" onClick={onConfirmDeletion}>
                            Confirm Deletion
                        </Button>
                    </Col>
                </Row>
            </Body>
        </Modal>
    );
};

export default DeleteSignatoryModal;
