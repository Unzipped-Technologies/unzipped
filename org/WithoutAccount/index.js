import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {PubSub} from 'pubsub-js';

const WithoutAccount = Component => {
    const WithoutAccountWrapper = props => {
        const [isCooleyFirm, setIsCooleyFirm] = useState(false);
        const fundData = useSelector(state => state.FundData.data);
        const [fundInfo, setFundInfo] = useState(null);
        const subscriptionData = useSelector(state => state.SubscriptionData.data);
        const isNewInvestorInviteEnabled = process.env.REACT_APP_ENABLE_NEW_INVESTOR_INVITE === 'true' && !isCooleyFirm;

        useEffect(() => {
            const fund = PubSub.subscribe('fundData', (_, data) => {
                setFundInfo(data);
            });

            return () => {
                PubSub.unsubscribe(fund);
            };
        }, []);

        useEffect(() => {
            let isCooleyFund;
            if (fundInfo) {
                isCooleyFund = fundInfo.isCooleyFirm;
                setIsCooleyFirm(isCooleyFund);
                return;
            }
            isCooleyFund = fundData
                ? fundData.isCooleyFirm
                : subscriptionData
                ? subscriptionData.fund?.vcfirm?.isCooleyFirm
                : false;
            setIsCooleyFirm(isCooleyFund);
        }, [fundData, subscriptionData, fundInfo]);

        return <Component {...props} isNewInvestorInviteEnabled={isNewInvestorInviteEnabled} />;
    };
    return WithoutAccountWrapper;
};

export default WithoutAccount;
