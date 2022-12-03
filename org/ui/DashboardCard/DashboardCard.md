```js
const viewFundButtonOnClick = () => {
    console.log('view fund button fired');
};
const [isFav, setIsFav] = React.useState(false);
const starIconOnClick = () => setIsFav(!isFav);

<DashboardCard
    favorite={isFav}
    fundIsClosed={false}
    viewFundButtonOnClick={viewFundButtonOnClick}
    onFavoriteToggle={starIconOnClick}
    size="big"
    fundTitleId={12}
    fundTitleName="This is the title of a fund"
    fundTitleDateJoined="8/15/2020"
    fundTitleSubscriptionName="This is a subscription"
    fundTitleInvestorType="Entity">
    Content goes here
</DashboardCard>;
```

```js
const viewFundButtonOnClick = () => {
    console.log('view fund button fired');
};
const [isFav, setIsFav] = React.useState(false);
const starIconOnClick = () => setIsFav(!isFav);

<DashboardCard
    buttonText='view subscription'
    subscriptionStatus='Action Required'
    favorite={isFav}
    fundIsClosed={false}
    viewFundButtonOnClick={viewFundButtonOnClick}
    viewActionsRequiredOnClick={() => alert('view actions required clicked')}
    onFavoriteToggle={starIconOnClick}
    size="big"
    fundTitleId={12}
    fundTitleName="This is the title of a fund"
    fundTitleDateJoined="8/15/2020"
    fundTitleSubscriptionName="This is a subscription"
    fundTitleInvestorType="Entity">
    Content goes here
</DashboardCard>;
```
