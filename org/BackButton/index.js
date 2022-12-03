import React from 'react';
import styled from 'styled-components';
import {FSNetUtils} from 'utils';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FundHTTP} from 'services/endpoints';
import leftChevron from '../../images/leftChevron.svg';

const Button = styled.button`
    width: 10%;
    height: 5%;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-family: OpenSans-Bold, sans-serif;
    color: blue;
    position: absolute;
    top: 28px;
    left: 9%;
    border: none;
    background: none;

    &:focus {
        outline: none;
    }
`;

const LeftChevron = styled.img`
    padding-right: 0.5rem;
`;

const BackButton = ({
    step,
    type,
    fundId,
    isCooleyFirm,
    isChangedPages,
    amendmentCount,
    PDFList,
    handleGoBack,
    subscriptionID,
}) => {
    let history = useHistory();
    const encryptedFundId = FSNetUtils._encrypt(fundId);

    const fundTaxFormId = async () => {
        const params = {
            order: 'documentName',
            orderCol: 'asc',
        };
        const list = await FundHTTP.getLpDocumentsList(
            step === 'countersign' ? subscriptionID : FSNetUtils._decrypt(subscriptionID),
            params,
        );
        const W9 = list.data.data.find(document => document.name === 'W9 Form');

        if (W9) {
            return W9.fundTaxFormId;
        }
    };

    const goBack = async () => {
        const checkIfCooleyFirm = isCooleyFirm === 'true' ? 'Investor' : 'lp';

        const setHistoryURL = url => `/${checkIfCooleyFirm}/${url}/${subscriptionID}`;
        const setW9URL = `/${checkIfCooleyFirm}/W9form/${FSNetUtils._encrypt(await fundTaxFormId())}/${subscriptionID}`;

        if (step === 'SA' && type === 'SA') {
            history.push(setHistoryURL('review'));
        } else if (type === 'CPFA' && isChangedPages === true) {
            history.push(setHistoryURL('pendingActions'));
        } else if (PDFList.join() === 'CP,FA' && step === 'CP') {
            history.push(setHistoryURL('review'));
        } else if (type === 'W9') {
            history.push(setW9URL);
        } else if (step === 'countersign') {
            history.push(`/fund/view/${encryptedFundId}`);
        } else {
            if (handleGoBack) {
                handleGoBack();
            }
            history.goBack();
        }
    };

    return (
        <div>
            <Button onClick={goBack} data-testid="backButton">
                <LeftChevron src={leftChevron} alt="left arrow" />
                {FSNetUtils._getBackButtonPlaceHolder(step, amendmentCount, isChangedPages, type, fundId, PDFList)}
            </Button>
        </div>
    );
};

BackButton.propTypes = {
    step: PropTypes.string,
    type: PropTypes.string,
    subscriptionID: PropTypes.string,
    fundId: PropTypes.string,
    isCooleyFirm: PropTypes.string,
    isChangedPages: PropTypes.bool,
    amendmentCount: PropTypes.number,
    PDFList: PropTypes.array,
    handleGoBack: PropTypes.func,
};

BackButton.defaultProps = {
    step: '',
    type: '',
    subscriptionID: '',
    fundId: '',
    isCooleyFirm: '',
    isChangedPages: false,
    amendmentCount: 0,
    PDFList: [],
    handleGoBack: null,
};

export default BackButton;
