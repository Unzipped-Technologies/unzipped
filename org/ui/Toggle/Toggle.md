```jsx
const [demoValue, setDemoValue] = React.useState(false);
<>
    <Toggle
        toggled={demoValue}
        sideText="Enable Notifications"
        isToggled={() => setDemoValue(prevState => !prevState)}></Toggle>
    <Toggle
        disabled
        toggled={demoValue}
        sideText="Disabled"
        isToggled={() => setDemoValue(prevState => !prevState)}></Toggle>
</>;
```
