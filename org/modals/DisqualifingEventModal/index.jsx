import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * onToggleAdviserToolTip: {() => void},
 * onToggleBeneficialTooltip: {() => void},
 * onToggleExchangeToolTip: {() => void},
 * onToggleSecurityToolTip: {() => void},
 * show: boolean,
 * }} props
 */

const DisqualifingEventModal = ({
    onHide,
    onToggleAdviserToolTip,
    onToggleBeneficialTooltip,
    onToggleExchangeToolTip,
    onToggleSecurityToolTip,
    show,
}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Disqualifying Event </h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div>
                    <p className="list-heading">
                        A Disqualifying Event means (Pursuant to Regulation D Rule 506(d) of the{' '}
                        <span className="helpWord" onClick={onToggleSecurityToolTip}>
                            Securities Act
                        </span>
                        ) that the Investor or any of its{' '}
                        <span className="helpWord" onClick={onToggleBeneficialTooltip}>
                            Beneficial Owners
                        </span>{' '}
                        has been subject to any one or more of the events described below, or is currently the subject
                        of any threatened or pending investigation, proceeding, action or other event that, if adversely
                        determined, would give rise to any of the events described below.
                    </p>
                    <p>
                        (1) The relevant person has been convicted within ten years of the date hereof of any felony or
                        misdemeanor (i) in connection with the purchase or sale of any security, (ii) involving the
                        making of any false filing with the U.S. Securities and Exchange Commission or (iii) arising out
                        of the conduct of the business of an underwriter, broker, dealer, municipal securities dealer,
                        investment adviser or paid solicitor of purchasers of securities.
                    </p>
                    <p>
                        (2) The relevant person is subject to any order, judgment or decree of any court of competent
                        jurisdiction entered within five years of the date hereof that presently restrains or enjoins
                        such person from engaging or continuing to engage in any conduct or practice (i) in connection
                        with the purchase or sale of any security, (ii) involving the making of any false filing with
                        the U.S. Securities and Exchange Commission or (iii) arising out of the conduct of the business
                        of an underwriter, broker, dealer, municipal securities dealer, investment adviser or paid
                        solicitor of purchasers of securities.
                    </p>
                    <p>
                        (3) The relevant person is subject to a final order of a U.S. state securities commission (or an
                        agency or officer of a state performing like functions); a state authority that supervises or
                        examines banks, savings associations or credit unions; a U.S. state insurance commission (or an
                        agency or officer of a state performing like functions); an appropriate federal banking agency;
                        the U.S. Commodity Futures Trading Commission; or the National Credit Union Administration that
                        (i) as of the date hereof, bars such person from (A) association with an entity regulated by
                        such commission, authority, agency or officer, (B) engaging in the business of securities,
                        insurance or banking or (C) engaging in savings association or credit union activities or (ii)
                        constitutes a final order based on a violation of any law or regulation that prohibits
                        fraudulent, manipulative or deceptive conduct entered within ten years of the date hereof.
                    </p>
                    <p>
                        (4) The relevant person is subject to any order of the U.S. Securities and Exchange Commission
                        pursuant to Section 15(b) or 15B(c) of the{' '}
                        <span className="helpWord" onClick={onToggleExchangeToolTip}>
                            Exchange Act
                        </span>
                        , or Section 203(e) or (f) of the{' '}
                        <span className="helpWord" onClick={onToggleAdviserToolTip}>
                            Advisers Act
                        </span>{' '}
                        that as of the date hereof (i) suspends or revokes such party’s registration as a broker,
                        dealer, municipal securities dealer or investment adviser, (ii) places limitations on the
                        activities, functions or operations of such person or (iii) bars such person from being
                        associated with any entity or from participating in the offering of any penny stock.
                    </p>
                    <p>
                        (5) The relevant person is subject to any order of the U.S. Securities and Exchange Commission
                        entered within five years of the date hereof that presently orders such person to cease and
                        desist from committing or causing a violation or future violation of (i) any scienter-based
                        anti-fraud provision of the federal securities laws or (ii) Section 5 of the{' '}
                        <span className="helpWord" onClick={onToggleSecurityToolTip}>
                            Securities Act
                        </span>
                        .
                    </p>
                    <p>
                        (6) The relevant person is, as of the date hereof, suspended or expelled from membership in, or
                        suspended or barred from association with a member of, a registered national securities exchange
                        or a registered national or affiliated securities association for any act or omission to act
                        constituting conduct inconsistent with just and equitable principles of trade.
                    </p>
                    <p>
                        (7) The relevant person has filed (as a registrant or issuer), or was or was named as an
                        underwriter in, any registration statement or Regulation A offering statement filed with the
                        U.S. Securities and Exchange Commission that, within five years of the date hereof, was the
                        subject of a refusal order, stop order or order suspending the Regulation A exemption, or is
                        presently the subject of an investigation or proceeding to determine whether a stop order or
                        suspension order should be issued.
                    </p>
                    <p>
                        (8) The relevant person is subject to a United States Postal Service false representation order
                        entered within five years of the date hereof or is presently subject to a temporary restraining
                        order or preliminary injunction with respect to conduct alleged by the United States Postal
                        Service to constitute a scheme or device for obtaining money or property through the mail by
                        means of false representations.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default DisqualifingEventModal;
