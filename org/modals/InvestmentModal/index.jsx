import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * onToggleCompanyToolTip: {() => void},
 * onToggleExchangeToolTip: {() => void},
 * onToggleSecurityToolTip: {() => void},
 * show: boolean,
 * }} props
 */

const InvestmentModal = ({onHide, onToggleCompanyToolTip, onToggleExchangeToolTip, onToggleSecurityToolTip, show}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Investments</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div>
                    <p className="list-heading">Investments shall mean any of the following:</p>
                    <p>
                        (1) Securities as such term is defined by Section 2(a)(1) of the{' '}
                        <span className="helpWord" onClick={onToggleSecurityToolTip}>
                            Securities Act.
                        </span>{' '}
                        Notwithstanding the foregoing, securities of an issuer that controls, is controlled by, or is
                        under common control with the Investor shall not be deemed Investments unless the issuer is:
                    </p>
                    <p className="marginLeft30">
                        (i) An investment company or a company that would be an investment company but for the
                        exclusions provided by Sections 3(c)(1) through 3(c)(9) of the Investment Company Act, a foreign
                        bank or insurance company, an issuer of asset-backed securities that meets certain requirements
                        or a commodity pool;
                    </p>
                    <p className="marginLeft30">
                        {`(ii) A company whose equity securities are listed on a national securities exchange, traded on
                        Nasdaq or listed on a "designated offshore securities market" (as defined by Regulation S
                        promulgated pursuant to the Securities Act); or`}
                    </p>
                    <p className="marginLeft30">
                        {`(iii) A company with shareholders' equity of not less than $50,000,000 (determined in accordance
                        with generally accepted accounting principles) as reflected on the company's most recent
                        financial statements (provided such financial statements present information as of a date not
                        more than sixteen (16) months preceding the Investor's investment in the Fund).`}
                    </p>
                    <p>
                        (2) Real estate held for investment purposes (i.e., not used by you for personal purposes or as
                        a place of business or in connection with your trade or business).
                    </p>
                    <p>
                        (3) Commodities futures contracts, options on such contracts or options on commodities that are
                        traded on or subject to the rules of (i) any contract market designated for trading under the{' '}
                        <span className="helpWord" onClick={onToggleExchangeToolTip}>
                            Exchange Act
                        </span>{' '}
                        and rules thereunder or (ii) any board of trade or exchange outside the United States, as
                        contemplated in Part 30 of the rules under the{' '}
                        <span className="helpWord" onClick={onToggleExchangeToolTip}>
                            Exchange Act
                        </span>{' '}
                        held for investment purposes.
                    </p>
                    <p>
                        (4) Physical commodities (with respect to which a Commodity Interest is traded on a market
                        specified in paragraph 3 above) held for investment purposes.
                    </p>
                    <p>
                        (5) Financial contracts within the meaning of Section 3(c)(2)(B)(ii) of the{' '}
                        <span className="helpWord" onClick={onToggleCompanyToolTip}>
                            Companies Act
                        </span>
                        , which are held for investment purposes.
                    </p>
                    <p>
                        (6) Cash and cash equivalents (including bank deposits, certificates of deposits, bankers
                        acceptances and similar bank instruments held for investment purposes and the net cash surrender
                        value of insurance policies).
                    </p>
                    <p>
                        (7) If the Investor is a company that would be an investment company but for the exclusion
                        provided by Section 3(c)(1) or 3(c)(7) of the Investment Company Act, or a commodity pool, any
                        amounts payable to the Investor pursuant to a binding commitment pursuant to which a person has
                        agreed to acquire an interest in, or make capital contributions to, the Investor upon demand by
                        the Investor.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default InvestmentModal;
