```js
const viewFundButtonOnClick = () => console.log('view fund button fired');
const [isFav, setIsFav] = React.useState(false);
const starIconOnClick = () => setIsFav(!isFav);

<DashboardFundCard
    favorite={isFav}
    fundIsClosed={false}
    viewFundButtonOnClick={viewFundButtonOnClick}
    onFavoriteToggle={starIconOnClick}
    size="big"
    status="In Progress"
    invited={100}
    fundTitleId={12}
    fundTitleName="This is the title of a fund"
    fundTitleDateJoined="1/1/2018"
    fundTitleSubscriptionName="36 Total Investors"
    fundTitleinvestortype="Entity"
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
/>;
```
