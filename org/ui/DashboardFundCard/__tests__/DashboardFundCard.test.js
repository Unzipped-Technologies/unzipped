import React from 'react';
import {render} from 'testing/utils';
import DashboardFundCard from '..';

test('Render the DashboardFundCard component with numbers', async () => {
    render(
        <DashboardFundCard
            favorite={false}
            fundIsClosed={false}
            viewFundButtonOnClick={() => null}
            onFavoriteToggle={() => null}
            size="big"
            invited={100}
            fundTitleId="12"
            fundTitleName="This is the title of a fund"
            fundTitleDateJoined="1/1/2018"
            fundTitleInvestorCount="36 Total Investors"
            valueCurrencyClosedAmount={888}
            valueCurrencyClosedTitle="closed"
            valueCurrencyClosedCurrency={1500000}
            valueCurrencyClosedReadyAmount={777}
            valueCurrencyClosedReadyTitle="close-ready"
            valueCurrencyClosedReadyCurrency={800000}
            valueCurrencyInProgressAmount={555}
            valueCurrencyInProgressTitle="in progress"
            valueCurrencyInProgressCurrency={400000}
            fundChartTarget={600000}
            fundChartHardCap={400000}
            fundChartClosed={250000}
            fundChartCloseReady={300}
            fundChartLegalHold={400}
            fundChartInProgress={500}
        />,
    );
});

test('Render the DashboardFundCard component with strings', async () => {
    render(
        <DashboardFundCard
            favorite={false}
            fundIsClosed={false}
            viewFundButtonOnClick={() => null}
            onFavoriteToggle={() => null}
            size="big"
            invited={100}
            fundTitleId="12"
            fundTitleName="This is the title of a fund"
            fundTitleDateJoined="1/1/2018"
            fundTitleInvestorCount="36 Total Investors"
            valueCurrencyClosedAmount="888"
            valueCurrencyClosedTitle="closed"
            valueCurrencyClosedCurrency="1500000"
            valueCurrencyClosedReadyAmount="777"
            valueCurrencyClosedReadyTitle="close-ready"
            valueCurrencyClosedReadyCurrency="800000"
            valueCurrencyInProgressAmount="555"
            valueCurrencyInProgressTitle="in progress"
            valueCurrencyInProgressCurrency="400000"
            fundChartTarget={600000}
            fundChartHardCap={400000}
            fundChartClosed={250000}
            fundChartCloseReady={300}
            fundChartLegalHold={400}
            fundChartInProgress={500}
        />,
    );
});
