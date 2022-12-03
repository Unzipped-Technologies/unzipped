import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import 'pages/Investor/index.css';

const DupRoleErrorModal = ({showErrorModal, role, onClose}) => {
    const {roleName, attemptingRoleName, action} = role || {};
    const handleClose = () => {
        onClose(false);
        action && action();
    };

    return (
        <Modal
            id="subscriptionDelModal"
            backdrop="static"
            show={showErrorModal}
            onHide={handleClose}
            dialogClassName="dupErrorModal"
            backdropClassName="dupErrorBackdrop">
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title>Duplicate Role Error</Modal.Title>
            <Modal.Body>
                <div className="subtext modal-subtext mb-3">
                    {`The individual you are trying to enter already has another role for this subscription. An individual
                    can't have more than one role for a subscription as the roles progressively supersede each other.
                    This individual already has the following role:`}
                </div>
                <div className="subtext modal-subtext mb-4">{roleName}</div>
                <div className="subtext modal-subtext">
                    If they actually should be a {attemptingRoleName}, please remove their {roleName} access.
                </div>
                <div className="text-center">
                    <Button type="button" className="fsnetCancelButton btnEnabled width100Px" onClick={handleClose}>
                        Ok
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default React.memo(DupRoleErrorModal);
