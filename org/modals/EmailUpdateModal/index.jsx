import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * show: boolean,
 * logoutAndSave: {() => void},
 * }} props
 */

const EmailUpdateModal = ({onHide, show, logoutAndSave}) => {
    return (
        <div className="emailUpdateModalContainer">
            <Modal
                id="emailUpdateModal"
                backdrop="static"
                show={show}
                onHide={onHide}
                className="emailUpdateModal"
                dialogClassName="emailUpdateModal"
                backdropClassName="emailUpdateBackdrop">
                <Header closeButton className="emailUpdateModalHeader TtModalHeaderAlign">
                    <h1 className="emailUpdateModalHeaderH1">Sign Out Required</h1>
                </Header>
                <Body className="TtModalBody emailUpdateModalBody">
                    <div>
                        <div className="emailUpdateModalContent">
                            In order to complete the account email change, you need to sign out and sign in again using
                            your new email. Click &quot;Proceed&quot; below to sign out.
                        </div>
                        <div>
                            <Button
                                variant="link"
                                className="width215 colorOverride emailUpdateModalButtonLink"
                                onClick={onHide}>
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                className="emailUpdateModalButton width215 fsnetButton"
                                onClick={logoutAndSave}>
                                Proceed
                            </Button>
                        </div>
                    </div>
                </Body>
            </Modal>
        </div>
    );
};

EmailUpdateModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    show: PropTypes.bool,
    logoutAndSave: PropTypes.func.isRequired,
};

EmailUpdateModal.defaultProps = {
    show: false,
};

export default EmailUpdateModal;
