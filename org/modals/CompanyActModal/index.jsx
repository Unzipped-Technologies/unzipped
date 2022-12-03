import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorType: string,
 * onHide: {() => void},
 * show: boolean,
 * }} props
 */

const CompanyActModal = ({investorType, onHide, show}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Investment Company</h1>
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
                    <p className="list-heading">Investment company means any entity which either:</p>
                    <p>
                        (1) Is or holds itself out as being engaged primarily, or proposes to engage primarily, in the
                        business of investing, reinvesting, or trading in securities.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (2) Is engaged or proposes to engage in the business of issuing face-amount certificates of the
                        installment type, or has been engaged in such business and has any such certificate outstanding.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (3) Is engaged or proposes to engage in the business of investing, reinvesting, owning, holding,
                        or trading in securities, and owns or proposes to acquire investment securities having a value
                        exceeding 40 per centum of the value of such issuer’s total assets (exclusive of Government
                        securities and cash items) on an unconsolidated basis.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default CompanyActModal;
