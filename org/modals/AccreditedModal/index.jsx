import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorSubType: SVGAnimatedString,
 * investorType: string,
 * onHide: {() => void},
 * onToggleAdviserTooltip: {() => void},
 * onToggleCodeTooltip: {() => void},
 * onToggleCompanyTooltip: {() => void},
 * onToggleExchangeToolTip: {() => void},
 * onToggleNetWorthTooltip: {() => void},
 * onToggleSecurityExchangeTooltip: {() => void},
 * show: boolean,
 * }} props
 */

const AccreditedModal = ({
    investorSubType,
    investorType,
    onHide,
    onToggleAdviserTooltip,
    onToggleCodeTooltip,
    onToggleCompanyTooltip,
    onToggleExchangeToolTip,
    onToggleNetWorthTooltip,
    onToggleSecurityExchangeTooltip,
    show,
}) => {
    const adviser = (
        <span className="helpWord" onClick={onToggleAdviserTooltip}>
            Advisers Act
        </span>
    );
    const netWorth = (
        <span className="helpWord" onClick={onToggleNetWorthTooltip}>
            net worth
        </span>
    );
    const securityExchange = (
        <span className="helpWord" onClick={onToggleSecurityExchangeTooltip}>
            Securities Exchange Act
        </span>
    );

    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Accredited Investor</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div hidden={investorType !== 'Individual'}>
                    <p className="list-heading">
                        You are an accredited investor if you either (x) have a {netWorth}, either individually or upon
                        a joint basis with your spouse, of at least USD $1,000,000, or (y) have had an individual income
                        in excess of USD $200,000 for each of the two most recent fully completed calendar years, or a
                        joint income with your spouse in excess of USD $300,000 in each of those years, and have a
                        reasonable expectation of reaching the same income level in the current calendar year.
                    </p>
                </div>
                <div hidden={investorType !== 'LLC'}>
                    <p className="list-heading">
                        If any one of the four options below apply, the Entity is considered an accredited investor and
                        if none of the four options below apply, the Entity is not an accredited investor:
                    </p>
                    <p>
                        (1) [MOST COMMON] The Entity is a corporation, partnership, limited liability company or
                        business trust, not formed for the purpose of acquiring the Interest, or an organization
                        described in Section 501(c)(3) of the{' '}
                        <span className="helpWord" onClick={onToggleCodeTooltip}>
                            Code
                        </span>
                        , in each case with total assets in excess of $5,000,000.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (2) All of the equity owners of the Entity qualify on their own merits as accredited investors.
                        This is true where each such equity owner {<a className="underline">either</a>} is an accredited
                        investor because it meets the entity definition of accredited investor on its own{' '}
                        <a className="underline">or</a> an individual which either (x) has a {netWorth} either
                        individually or upon a joint basis with such person’s spouse of at least USD $1,000,000, or (y)
                        has had an individual income in excess of USD $200,000 for each of the two most recent fully
                        completed calendar years, or a joint income with such person’s spouse in excess of USD $300,000
                        in each of those years, and have a reasonable expectation of reaching the same income level in
                        the current calendar year.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (3) The Entity is a bank, insurance company, investment company registered under the{' '}
                        <span className="helpWord" onClick={onToggleCompanyTooltip}>
                            Companies Act
                        </span>
                        , a broker or dealer registered pursuant to Section 15 of the{' '}
                        <span className="helpWord" onClick={onToggleExchangeToolTip}>
                            Exchange Act
                        </span>
                        , a business development company, a Small Business Investment Company licensed by the United
                        States Small Business Administration, a plan with total assets in excess of USD $5,000,000
                        established and maintained by a state for the benefit of its employees, or a private business
                        development company as defined in Section 202(a)(22) of the {adviser}.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (4) The Entity is an employee benefit plan and either all investment decisions are made by a
                        bank, savings and loan association, insurance company, or registered investment advisor, or the
                        employee benefit plan has total assets in excess of USD $5,000,000 or, if such employee benefit
                        plan is a self-directed plan, investment decisions are made solely by persons who are accredited
                        investors as described in clause (2) above.
                    </p>
                </div>
                {investorType === 'Trust' && parseInt(investorSubType) === 9 && (
                    <div hidden={investorType !== 'Trust'}>
                        <p className="list-heading">
                            If any one of the three options below apply, the Trust is considered an accredited investor
                            and if none of the three options below apply, the Trust is not an accredited investor:
                        </p>
                        <p>
                            (1) [MOST COMMON] The Trust is a living trust or other revocable trust in which all of the
                            grantors and trustees either (A) qualify under options (2), (3) or (4) below, or (B) either
                            (x) have a {netWorth} either individually or upon a joint basis with such person’s spouse of
                            at least USD $1,000,000, or (y) have had an individual income in excess of USD $200,000 for
                            each of the two most recent fully completed calendar years, or a joint income with such
                            person’s spouse in excess of USD $300,000 in each of those years, and have a reasonable
                            expectation of reaching the same income level in the current calendar year.
                        </p>
                        <p className="text-center">OR</p>
                        <p>
                            (2) The Trust is a business trust, not formed for the purpose of acquiring the investment in
                            the Fund as to which the Trust proposes to subscribe, or an organization described in
                            Section 501(c)(3) of the Code, in each case with total assets in excess of USD $5,000,000.
                        </p>
                        <p className="text-center">OR</p>
                        <p>
                            (3) The Trust is a bank, insurance company, investment company registered under the
                            Companies Act, a broker or dealer registered pursuant to Section 15 of the{' '}
                            {securityExchange}, a business development company, a Small Business Investment Company
                            licensed by the United States Small Business Administration, a plan with total assets in
                            excess of USD $5,000,000 established and maintained by a state for the benefit of its
                            employees, or a private business development company as defined in Section 202(a)(22) of the{' '}
                            {adviser}.
                        </p>
                    </div>
                )}

                {!(investorType === 'Trust' && parseInt(investorSubType) === 9) && (
                    <div hidden={investorType !== 'Trust'}>
                        <p className="list-heading">
                            If any one of the three options below apply, the Trust is considered an accredited investor
                            and if none of the three options below apply, the Trust is not an accredited investor:
                        </p>
                        <p>
                            (1) The Trust has total assets in excess of USD $5,000,000 and the acquisition of those
                            assets is directed by a person with such knowledge and experience in financial and business
                            matters that such person is capable of evaluating the merits and risks of an investment in
                            the investment Fund as to which the Trust proposes to subscribe.
                        </p>
                        <p className="text-center">OR</p>
                        <p>
                            (2) The Trust is a business trust, not formed for the purpose of acquiring the investment in
                            the Fund as to which the Trust proposes to subscribe, or an organization described in
                            Section 501(c)(3) of the Code, in each case with total assets in excess of USD $5,000,000.
                        </p>
                        <p className="text-center">OR</p>
                        <p>
                            (3) The Trust is a bank, insurance company, investment company registered under the
                            Companies Act, a broker or dealer registered pursuant to Section 15 of the{' '}
                            {securityExchange}, a business development company, a Small Business Investment Company
                            licensed by the United States Small Business Administration, a plan with total assets in
                            excess of USD $5,000,000 established and maintained by a state for the benefit of its
                            employees, or a private business development company as defined in Section 202(a)(22) of the{' '}
                            {adviser}.
                        </p>
                    </div>
                )}
            </Body>
        </Modal>
    );
};

export default AccreditedModal;
