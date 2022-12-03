import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * onToggleTooltip: {() => void},
 * show: boolean,
 * }} props
 */

const BeneficialOwnersModal = ({onHide, onToggleTooltip, show}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Beneficial Owner</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div>
                    <p className="list-heading">
                        An individual or entity who, directly or indirectly, through any contract, arrangement,
                        understanding, relationship or otherwise has or shares, or is deemed to have or share: (1)
                        voting power, which includes the power to vote, or to direct the voting of, the Interest; and/or
                        (2) investment power, which includes the power to dispose, or to direct the disposition of, the
                        Interest, as determined consistent with Rule 13d-3 of the{' '}
                        <span className="helpWord" onClick={onToggleTooltip}>
                            Exchange Act
                        </span>
                        <span>.</span>
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default BeneficialOwnersModal;
