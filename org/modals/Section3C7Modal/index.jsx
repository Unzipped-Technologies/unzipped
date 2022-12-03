import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorType: string,
 * onHide: {() => void},
 * onToggleCompanyActTooltip: {() => void},
 * onToggleQualifierTooltip: {() => void},
 * show: boolean,
 * }} props
 */

const Section3C7Modal = ({investorType, onHide, onToggleCompanyActTooltip, onToggleQualifierTooltip, show}) => {
    const qualifiedPurchaser = (
        <span className="helpWord" onClick={onToggleQualifierTooltip}>
            qualified purchaser
        </span>
    );

    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Section 3(c)(7)</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div hidden={investorType !== 'Individual'}>
                    You are an accredited investor if you either (x) have a net worth, either individually or upon a
                    joint basis with your spouse, of at least USD $1,000,000, or (y) have had an individual income in
                    excess of USD $200,000 for each of the two most recent fully completed calendar years, or a joint
                    income with your spouse in excess of USD $300,000 in each of those years, and have a reasonable
                    expectation of reaching the same income level in the current calendar year.
                    <br />
                </div>
                <div hidden={investorType !== 'LLC' && investorType !== 'Trust'}>
                    <p className="list-heading">
                        None of the following persons is an{' '}
                        <span className="helpWord" onClick={onToggleCompanyActTooltip}>
                            investment company
                        </span>
                        …Any issuer, the outstanding securities of which are owned exclusively by persons who, at the
                        time of acquisition of such securities, are {qualifiedPurchaser}, and which is not making and
                        does not at the time propose to make a public offering of such securities. Securities that are
                        owned by persons who received the securities from a {qualifiedPurchaser} as a gift or bequest,
                        or in a case in which the transfer was caused by legal separation, divorce, death, or other
                        involuntary event, shall be deemed to be owned by a {qualifiedPurchaser}, subject to such rules,
                        regulations, and orders as the United States Securities and Exchange Commission may prescribe as
                        necessary or appropriate in the public interest or for the protection of investors.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default Section3C7Modal;
