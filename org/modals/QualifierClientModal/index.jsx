import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorType: string,
 * onHide: {() => void},
 * onToggleInvestmentTooltip: {() => void},
 * onToggleNetWorthTooltip: {() => void},
 * onToggleValuedTooltip: {() => void},
 * show: boolean,
 * }} props
 */

const QualifierClientModal = ({
    investorType,
    onHide,
    onToggleInvestmentTooltip,
    onToggleNetWorthTooltip,
    onToggleValuedTooltip,
    show,
}) => {
    const investments = (
        <span className="helpWord" onClick={onToggleInvestmentTooltip}>
            investments
        </span>
    );
    const valued = (
        <span className="helpWord" onClick={onToggleValuedTooltip}>
            valued
        </span>
    );

    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Qualified Client</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div hidden={investorType !== 'Individual'}>
                    <p>You are a qualified client if you either</p>
                    <p>
                        (x) are making a capital commitment to the investment Fund for which you propose to subscribe of
                        USD $1,100,000 or greater, or
                    </p>
                    <p>
                        (y) have a{' '}
                        <span className="helpWord" onClick={onToggleNetWorthTooltip}>
                            net worth
                        </span>
                        , either individually or upon a joint basis with your spouse, of more than USD $2,200,000.
                    </p>
                </div>
                <div hidden={investorType !== 'LLC'}>
                    <p className="list-heading">
                        The Entity is a qualified client if it is either making a capital commitment to the investment
                        Fund for which it proposes to subscribe of USD $1,100,000 or greater or is an Entity with{' '}
                        {investments} that are {valued} at more than $2,200,000.
                    </p>
                </div>
                <div hidden={investorType !== 'Trust'}>
                    <p className="list-heading">
                        The Trust is a qualified client if it is either making a capital commitment to the investment
                        Fund for which it proposes to subscribe of USD $1,100,000 or greater or is a Trust with{' '}
                        {investments} that are {valued} at more than $2,200,000.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default QualifierClientModal;
