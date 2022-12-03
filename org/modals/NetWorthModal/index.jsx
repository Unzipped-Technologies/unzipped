import React from 'react';
import {Modal} from 'react-bootstrap';

const {Body, Header} = Modal;

/**
 *
 * @param {{
 * onHide: {() => void},
 * show: boolean,
 * }} props
 */

const NetWorthModal = ({onHide, show}) => {
    return (
        <Modal id="confirmInvestorModal" backdrop="static" dialogClassName="tooltipDialog" show={show} onHide={onHide}>
            <Header className="TtModalHeaderAlign" closeButton>
                <h1>Net Worth</h1>
            </Header>
            <Body className="TtModalBody investorModal">
                <div>
                    <p className="list-heading">In calculating your net worth:</p>
                    <p>(i) your primary residence shall not be included as an asset.</p>
                    <p>
                        (ii) indebtedness that is secured by your primary residence, up to the estimated fair market
                        value of the primary residence at the time of the closing on your investment in the investment
                        Fund for which you are proposing to subscribe (the Closing), shall not be included as a
                        liability (except that if the amount of such indebtedness outstanding at the time of the Closing
                        exceeds the amount outstanding 60 days before such time, other than as a result of the
                        acquisition of the primary residence, the amount of such excess shall be included as a
                        liability).
                    </p>
                    <p>
                        (iii) indebtedness that is secured by your primary residence in excess of the estimated fair
                        market value of the primary residence at the time of the Closing shall be included as a
                        liability. In calculating your joint net worth with your spouse, your spouse’s primary residence
                        (if different from your own primary residence) and indebtedness secured by such primary
                        residence should be treated in a similar manner.
                    </p>
                </div>
            </Body>
        </Modal>
    );
};

export default NetWorthModal;
