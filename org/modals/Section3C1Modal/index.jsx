import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorType: string,
 * onHide: {() => void},
 * onToggleCompanyActTooltip: {() => void},
 * onToggleCompanyTooltip: {() => void},
 * onToggleSection3C7Tooltip: {() => void},
 * show: boolean,
 * }} props
 */

const Section3C1Modal = ({
    investorType,
    onHide,
    onToggleCompanyActTooltip,
    onToggleCompanyTooltip,
    onToggleSection3C7Tooltip,
    show,
}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Section 3(c)(1)</h1>
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
                        </span>{' '}
                        …Any issuer whose outstanding securities (other than short-term paper) are beneficially owned by
                        not more than one hundred persons and which is not making and does not presently propose to make
                        a public offering of its securities…For purposes of the preceding, beneficial ownership by a
                        company shall be deemed to be beneficial ownership by one person, except that, if the company
                        owns 10 per centum or more of the outstanding voting securities of the issuer and is or, but for
                        the exception provided for in this paragraph or under{' '}
                        <span className="helpWord" onClick={onToggleSection3C7Tooltip}>
                            Section 3(c)(7)
                        </span>{' '}
                        of the{' '}
                        <span className="helpWord" onClick={onToggleCompanyTooltip}>
                            Companies Act
                        </span>
                        , would be an{' '}
                        <span className="helpWord" onClick={onToggleCompanyActTooltip}>
                            investment company
                        </span>
                        , the beneficial ownership shall be deemed to be that of the holders of such company’s
                        outstanding securities (other than short-term paper).
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default Section3C1Modal;
