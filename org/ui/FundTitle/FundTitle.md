```js
    <FundTitle
        id={12}
        size="big"
        status="In Progress"
        invited={100}
        created="1/1/2018"
        name="Big version, used as header"
    />
    <br />
    <FundTitle
        size="medium"
        id={12}
        status="In Progress"
        invited={100}
        created="1/1/2018"
        name="Medium standard version"
    />
    <br />
    <FundTitle
        size="small"
        id={12}
        status="In Progress"
        invited={100}
        created="1/1/2018"
        name="Small version"
    />
    <br />
    <FundTitle
        id={12}
        size="medium"
        name="Alternate version displayed to investors"
        dateJoined="8/15/2020"
        subscriptionName="This is a subscription"
        investorType="Entity"
    />
```

Use the `metadata` prop to override other props for that line

```js
<FundTitle size="medium" id={12} name="This is the title of a fund" metadata="This is metadata text" />
```

Use the `fundImage` prop to use a custom fund icon and no metadata

```js
<FundTitle
    id={12}
    name="This is the title of a fund"
    fundImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
    size="medium"
/>
```

Use the `badgeColor` prop to color the badge

```js
<FundTitle
    id={12}
    name="This is the title of a fund"
    fundImage="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
    size="medium"
    status={'Green Color'}
    badgeColor="green"
/>
```
