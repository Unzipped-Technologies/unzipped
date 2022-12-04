Overview Countdown Timer

```js
const midnight = new Date();
midnight.setHours(24, 0, 0, 0);
<>
    <CountdownTimer deadline={midnight.toString()} />
    <CountdownTimer large deadline={midnight.toString()} headerText="Dashboard Countdown Timer" />
    <CountdownTimer
        large
        center
        deadline={midnight.toString()}
        headerText="Dashboard Countdown Timer"
        columnsToHide={{days: true, hours: true}}
    />
</>;
```
