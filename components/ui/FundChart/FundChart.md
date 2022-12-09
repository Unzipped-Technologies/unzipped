```js
<h1>Target and Hardcap Example:</h1>
<br/>
<FundChart
    target={500000}
    hardCap={2000000}
    closed={1230000}
    closeReady={60000}
    legalHold={10000}
    inProgress={300000}
/>
<br/>
<br/>
<h1> Target with no Hardcap Example: </h1>
<br/>
<FundChart target={800000} closed={220000} closeReady={160000} legalHold={20000} inProgress={160000} />
<br/>
<br/>
<h1> No Target and No Hardcap Example: </h1>
<br/>
<FundChart closed={150000} closeReady={60000} legalHold={15000} inProgress={80000}
/>
```
