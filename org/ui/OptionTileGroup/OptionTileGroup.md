Example:

```jsx
const [selectedValue, setSelectedValue] = React.useState(null);
<OptionTileGroup
    selectedValue={selectedValue}
    tileList={[
        {
            label: 'Sign In to existing account',
            iconName: 'profileNew',
            value: 'onlineAccount',
        },
        {
            label: 'Subscribe online without an account',
            iconName: 'desktop',
            value: 'onlineNoAccount',
        },
    ]}
    onChange={e => setSelectedValue(e.target.value)}
/>;
```
