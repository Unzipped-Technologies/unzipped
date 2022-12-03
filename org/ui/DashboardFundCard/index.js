import React from 'react';
import PropTypes from 'prop-types';
import DashboardCard from 'components/ui/DashboardCard';
import ValueCurrency from 'components/ui/ValueCurrency';
import FundChart from 'components/ui/FundChart';

import styled from 'styled-components';

const StyledFundChart = styled(FundChart)`
    @media (max-width: 985px) {
        width: 100%;
    }
`;

const ValueCurrencyContainer = styled.span`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
`;

/**
 * Dashboard Card Component.
 */
const DashboardFundCard = ({
    favorite,
    fundIsClosed,
    viewFundButtonOnClick,
    onFavoriteToggle,
    fundImage = '',
    fundTitleName,
    fundTitleInvestorCount,
    valueCurrencyClosedAmount,
    valueCurrencyClosedTitle,
    valueCurrencyClosedCurrency,
    valueCurrencyClosedReadyAmount,
    valueCurrencyClosedReadyTitle,
    valueCurrencyClosedReadyCurrency,
    valueCurrencyInProgressAmount,
    valueCurrencyInProgressTitle,
    valueCurrencyInProgressCurrency,
    fundChartTarget,
    fundChartHardCap,
    fundChartClosed,
    fundChartCloseReady,
    fundChartLegalHold,
    fundChartInProgress,
    finalClosingDate,
    lastUpdatedDate,
    badgeText,
    badgeColor,
    role,
}) => {
    return (
        <DashboardCard
            favorite={favorite}
            finalClosingDate={finalClosingDate}
            fundIsClosed={fundIsClosed}
            viewFundButtonOnClick={viewFundButtonOnClick}
            onFavoriteToggle={onFavoriteToggle}
            size={'medium'}
            status={badgeText}
            badgeColor={badgeColor}
            fundTitleName={fundTitleName}
            fundTitleInvestorType={fundTitleInvestorCount}
            lastUpdatedDate={lastUpdatedDate}
            role={role}
            fundImage={fundImage}>
            <ValueCurrencyContainer>
                <ValueCurrency
                    size={'big'}
                    amount={valueCurrencyClosedAmount}
                    title={valueCurrencyClosedTitle}
                    currency={valueCurrencyClosedCurrency}></ValueCurrency>
                <ValueCurrency
                    size={'big'}
                    amount={valueCurrencyClosedReadyAmount}
                    title={valueCurrencyClosedReadyTitle}
                    currency={valueCurrencyClosedReadyCurrency}></ValueCurrency>
                <ValueCurrency
                    size={'big'}
                    amount={valueCurrencyInProgressAmount}
                    title={valueCurrencyInProgressTitle}
                    currency={valueCurrencyInProgressCurrency}></ValueCurrency>
                <StyledFundChart
                    target={fundChartTarget}
                    hardCap={fundChartHardCap}
                    closed={fundChartClosed}
                    closeReady={fundChartCloseReady}
                    legalHold={fundChartLegalHold}
                    inProgress={fundChartInProgress}
                />
            </ValueCurrencyContainer>
        </DashboardCard>
    );
};

DashboardFundCard.propTypes = {
    /** If this fund is a user favorite */
    favorite: PropTypes.bool,
    /** Fund final closing date  */
    finalClosingDate: PropTypes.string,
    /** children the component contains */
    children: PropTypes.node,
    /** view fund button on click function */
    viewFundButtonOnClick: PropTypes.func.isRequired,
    /** star icon on click function */
    onFavoriteToggle: PropTypes.func.isRequired,
    /** the name for the fund title component */
    fundTitleName: PropTypes.string,
    /** the role for the investor/fund */
    role: PropTypes.string,
    /** the total investors of fund for the fund title component */
    fundTitleInvestorCount: PropTypes.string,
    /** Size of component big, medium, or small*/
    ValueCurrencySize: PropTypes.string,
    /** Amount of closed investors*/
    closed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Amount of closedReady investors*/
    closedReady: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Amount of inProgress investors*/
    inProgress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Amount of closed investor currency*/
    closedCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Amount of closedReady currency*/
    closedReadyCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Amount of inProgress currency*/
    inProgressCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** target value of fund */
    fundChartTarget: PropTypes.number,
    /** hard cap value of fund */
    fundChartHardCap: PropTypes.number,
    /** closed investor contribution value of fund */
    fundChartClosed: PropTypes.number,
    /** closed ready investor contribution value of fund */
    fundChartCloseReady: PropTypes.number,
    /** value of contributions on legal hold for the fund */
    fundChartLegalHold: PropTypes.number,
    /** in progress investor contribution value of fund */
    fundChartInProgress: PropTypes.number,
    /** Date to display Last Updated */
    lastUpdatedDate: PropTypes.string,
    /** Quantity of closed investors */
    valueCurrencyClosedAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Sum of closed subscriptions*/
    valueCurrencyClosedCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Quantity of close-ready investors */
    valueCurrencyClosedReadyAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Sum of close-ready subscriptions not in Legal Hold */
    valueCurrencyClosedReadyCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Title for close-ready field */
    valueCurrencyClosedReadyTitle: PropTypes.string,
    /** Title for closed field */
    valueCurrencyClosedTitle: PropTypes.string,
    /** Quantity of in-progress investors */
    valueCurrencyInProgressAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Sum of in-progress subscriptions not in Legal Hold */
    valueCurrencyInProgressCurrency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Title for in-progress field */
    valueCurrencyInProgressTitle: PropTypes.string,
};

DashboardFundCard.defaultProps = {
    favorite: false,
    finalClosingDate: null,
    fundTitleName: 'This is the title of a fund',
    ValueCurrencySize: 'big',
    closed: '0',
    closedReady: '0',
    inProgress: '0',
    closedCurrency: 0,
    closedReadyCurrency: 0,
    inProgressCurrency: 0,
    children: null,
    fundChartTarget: 0,
    fundChartHardCap: 0,
    fundChartClosed: 0,
    fundChartCloseReady: 0,
    fundChartLegalHold: 0,
    fundChartInProgress: 0,
    lastUpdatedDate: null,
    valueCurrencyClosedAmount: 0,
    valueCurrencyClosedCurrency: 0,
    valueCurrencyClosedReadyAmount: 0,
    valueCurrencyClosedReadyCurrency: 0,
    valueCurrencyClosedReadyTitle: 'close-ready',
    valueCurrencyClosedTitle: 'closed',
    valueCurrencyInProgressAmount: 0,
    valueCurrencyInProgressCurrency: 0,
    valueCurrencyInProgressTitle: 'in progress',
};

export default DashboardFundCard;
