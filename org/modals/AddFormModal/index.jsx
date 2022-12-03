import React from 'react';
import {Button, Col, Modal, Row} from 'react-bootstrap';
import WithoutAccount from 'components/WithoutAccount';

const {Body, Header, Title} = Modal;

/**
 *
 * @param {{
 * accountType: string,
 * children: React.Element,
 * isDelegateAddingFromFund: boolean,
 * isLpDelegateFormValid: boolean,
 * lpName: string,
 * onHide: {() => void},
 * onSave: {() => Promise<void>},
 * show: boolean,
 * status: number,
 * }} props
 */

const AddFormModal = ({
    accountType,
    children,
    isDelegateAddingFromFund,
    isLpDelegateFormValid,
    lpName,
    onHide,
    onSave,
    show,
    status,
    isNewInvestorInviteEnabled,
}) => {
    return (
        <Modal id="LPModal" backdrop="static" show={show} onHide={onHide} dialogClassName="LPModalDialog">
            <Header closeButton />
            {accountType === 'lpDelegate' ? (
                <Title>{`Add ${isNewInvestorInviteEnabled ? 'Additional User' : 'Delegate'} ${
                    isDelegateAddingFromFund ? ` - ${lpName}` : ''
                }`}</Title>
            ) : (
                <Title>Add Signatory</Title>
            )}
            <Body>
                <div className="subtext modal-subtext">
                    {accountType === 'lpDelegate'
                        ? isNewInvestorInviteEnabled
                            ? `Fill in the form below to add an additional user to the subscription ${lpName}. Fields marked with an * are required.`
                            : 'Fill in the form below to add a new Delegate to the Fund. Fields marked with an * are required.'
                        : 'Fill in the form below to add a new Signatory to the Fund. Fields marked with an * are required.'}
                </div>
                <div className={`form-main-div ${isNewInvestorInviteEnabled ? 'marginBottom44' : 'add-delegate'}`}>
                    {children}
                </div>
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button type="button" className="fsnetCancelButton" onClick={onHide}>
                            Cancel
                        </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button
                            className={'fsnetSubmitButton ' + (isLpDelegateFormValid ? 'btnEnabled' : '')}
                            disabled={!isLpDelegateFormValid || parseInt(status) === 2}
                            onClick={onSave}>
                            Save
                        </Button>
                    </Col>
                </Row>
            </Body>
        </Modal>
    );
};

export default WithoutAccount(AddFormModal);
