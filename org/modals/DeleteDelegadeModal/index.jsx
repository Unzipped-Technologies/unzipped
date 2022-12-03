import React from 'react';
import {Button, Col, Modal, Row} from 'react-bootstrap';

const {Body, Header, Title} = Modal;

/**
 *
 * @param {{
 * onDeleteDelegate: {() => void},
 * onHide: {() => void},
 * show: boolean,
 * }} props
 */

const DeleteDelegadeModal = ({onDeleteDelegate, onHide, show, lpDelegateId, lpSubscriptionObj}) => {
    let delegates;
    const investors = lpSubscriptionObj?.lps?.fundLps;

    if (investors) {
        // accessed from investor list in "Fund Setup"
        delegates = investors.reduce((acc, investor) => {
            const lpDelegates = investor.lpDelegatesList || [];
            return [...acc, ...lpDelegates];
        }, []);
    } else {
        // accessed from "Manage Delegates" as investor
        delegates = lpSubscriptionObj?.lpDelegates || [];
    }

    const delegate = delegates.find(lpDelegate => lpDelegate.id === lpDelegateId);
    const delegateName = `${delegate?.firstName || ''} ${delegate?.lastName || ''}`;

    const investor = investors?.find(lp => lp.subscriptionId === delegate?.subscriptionId);
    const investorName = investor?.nameMask;

    const nameText = `${delegateName}${investorName ? ` (for ${investorName})` : ''}`;

    return (
        <Modal id="LPDelModal" backdrop="static" show={show} onHide={onHide} dialogClassName="LPDelModalDialog">
            <Header closeButton />
            <Title>Remove Investor</Title>
            <Body>
                <div className="subtext modal-subtext">Are you sure you want to remove this investor delegate?</div>
                <div className="subtext modal-subtext text-center">{nameText}</div>
                <div className="subtext modal-subtext">
                    They will no longer be able to access this subscription for this fund.
                </div>
                <div className="form-main-div" />
                <Row>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button type="button" className="fsnetCancelButton" onClick={onHide}>
                            Cancel
                        </Button>
                    </Col>
                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button type="button" className="fsnetCancelButton btnEnabled" onClick={onDeleteDelegate}>
                            Confirm Removal
                        </Button>
                    </Col>
                </Row>
            </Body>
        </Modal>
    );
};

export default DeleteDelegadeModal;
