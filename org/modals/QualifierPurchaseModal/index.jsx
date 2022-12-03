import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * investorType: string,
 * onHide: {() => void},
 * onToggleInvestmentTooltip: {() => void},
 * onToggleSecurityTooltip: {() => void},
 * onToggleValuedTooltip: {() => void},
 * show: boolean,
 * }} props
 */

const QualifierPurchaseModal = ({
    investorType,
    onHide,
    onToggleInvestmentTooltip,
    onToggleSecurityTooltip,
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
    const security = (
        <span className="helpWord" onClick={onToggleSecurityTooltip}>
            Securities Act
        </span>
    );

    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Qualified Purchaser</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div hidden={investorType !== 'Individual'}>
                    <p>
                        You are a qualified purchaser if you own {investments} that are {valued} at not less than USD
                        $5,000,000. If you propose to acquire the interest in the investment Fund as to which you
                        propose to subscribe in a joint capacity with your spouse, such as community property or a
                        similar shared interest, then you may include in this determination {investments} owned by your
                        spouse.
                    </p>
                </div>
                <div hidden={investorType !== 'LLC'}>
                    <p className="list-heading">
                        If any one of the four options below apply, the Entity is considered a qualified purchaser and
                        if none of the four options below apply, the Entity is not a qualified purchaser:
                    </p>
                    <p>
                        (1) [MOST COMMON] The Entity is acting for its own account or the accounts of others described
                        in clauses (2), (3) or (4) below, and in the aggregate owns and invests on a discretionary basis{' '}
                        {investments} that are {valued} at not less than USD $25,000,000.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (2) [MOST COMMON] The Entity owns {investments} that are {valued} at not less than $5,000,000
                        and is owned directly or indirectly by two (2) or more natural persons related as siblings,
                        spouses (including former spouses) or direct lineal descendants by birth or adoption, spouses of
                        such persons, the estates of such persons, or foundations, charitable organizations or trusts
                        established by or for the benefit of such persons.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (3) The Entity is a qualified institutional buyer as defined in paragraph (a) of Rule 144A under
                        the {security}, acting for its own account, the account of another qualified institutional
                        buyer, or the account of a qualified purchaser; provided that (i) a dealer described in
                        paragraph (a)(1)(ii) of Rule 144A must own and invest on a discretionary basis at least USD
                        $25,000,000 in securities of issuers that are not affiliated persons of the dealer and (ii) a
                        plan referred to in paragraph (a)(1)(i)(D) or (a)(1)(i)(E) of Rule 144A, or a trust Fund
                        referred to in paragraph (a)(1)(i)(F) of Rule 144A that holds the assets of such a plan, will
                        not be deemed to be acting for its own account if investment decisions with respect to the plan
                        are made by the beneficiaries of the plan, except with respect to investment decisions made
                        solely by the fiduciary, trustee or sponsor of such plan.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (4) The Entity is not covered by clauses (1), (2) or (3) above, is not formed for the specific
                        purpose of acquiring the investment in the Fund as to which the Entity proposes to subscribe,
                        and each equity owner of the Entity is an individual (including any person who is acquiring such
                        investment with his or her spouse in a joint capacity, as community property or similar shared
                        interest) who either individually or together with a spouse, owns {investments} that are{' '}
                        {valued} at not less than USD $5,000,000.
                    </p>
                </div>
                <div hidden={investorType !== 'Trust'}>
                    <p className="list-heading">
                        If any one of the four options below apply, the Trust is considered a qualified purchaser and if
                        none of the four options below apply, the Trust is not a qualified purchaser:
                    </p>
                    <p>
                        (1) [MOST COMMON] The Trust is acting for its own account or the accounts of others described in
                        clauses (2), (3) or (4) below, and in the aggregate owns and invests on a discretionary basis{' '}
                        {investments} that are {valued} at not less than USD $25,000,000.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (2) [MOST COMMON] The Trust owns {investments} that are {valued} at not less than $5,000,000 and
                        is owned directly or indirectly by two (2) or more natural persons related as siblings, spouses
                        (including former spouses) or direct lineal descendants by birth or adoption, spouses of such
                        persons, the estates of such persons, or foundations, charitable organizations or trusts
                        established by or for the benefit of such persons.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (3) The Trust is a qualified institutional buyer as defined in paragraph (a) of Rule 144A under
                        the {security}, acting for its own account, the account of another qualified institutional
                        buyer, or the account of a qualified purchaser; provided that (i) a dealer described in
                        paragraph (a)(1)(ii) of Rule 144A must own and invest on a discretionary basis at least USD
                        $25,000,000 in securities of issuers that are not affiliated persons of the dealer and (ii) a
                        plan referred to in paragraph (a)(1)(i)(D) or (a)(1)(i)(E) of Rule 144A, or a trust Fund
                        referred to in paragraph (a)(1)(i)(F) of Rule 144A that holds the assets of such a plan, will
                        not be deemed to be acting for its own account if investment decisions with respect to the plan
                        are made by the beneficiaries of the plan, except with respect to investment decisions made
                        solely by the fiduciary, trustee or sponsor of such plan.
                    </p>
                    <p className="text-center">OR</p>
                    <p>
                        (4) The Trust is not covered by clauses (1), (2) or (3) above, is not formed for the specific
                        purpose of acquiring the investment in the Fund as to which the Trust proposes to subscribe, as
                        to which the trustee or other person authorized to make decisions with respect to the Trust and
                        each settlor or other person who has contributed assets to the Trust is a person described as an
                        individual (including any person who is acquiring such investment with his or her spouse in a
                        joint capacity, as community property or similar shared interest) who either individually or
                        together with a spouse, owns {investments} that are {valued} at not less than USD $5,000,000.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default QualifierPurchaseModal;
