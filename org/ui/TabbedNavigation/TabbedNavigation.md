Default Colors and Default Font Weight:

```jsx
const [tabs, setTabs] = React.useState([
    {name: 'ADMIN', to: 'admin', isCurrent: true},
    {name: 'MY FUNDS', to: 'myFunds', isCurrent: false},
    {name: 'MY INVESTMENTS', to: 'myInvestments', isCurrent: false},
    {name: 'GC&H ADMIN', to: 'gc&hAdmin', isCurrent: false},
]);

const onClick = (currentTabIndex, newTabIndex) => {
    const newTabs = [...tabs];
    newTabs[currentTabIndex] = {...tabs[currentTabIndex], isCurrent: false};
    newTabs[newTabIndex] = {...tabs[newTabIndex], isCurrent: true};
    setTabs([...newTabs]);
};

<TabbedNavigation onClick={onClick} tabs={tabs} />;
```

Non-default Colors and Non-Default Font Weight:

```jsx
const [tabs, setTabs] = React.useState([
    {name: 'ADMIN', to: 'admin', isCurrent: true},
    {name: 'MY FUNDS', to: 'myFunds', isCurrent: false},
    {name: 'MY INVESTMENTS', to: 'myInvestments', isCurrent: false},
    {name: 'GC&H ADMIN', to: 'gc&hAdmin', isCurrent: false},
]);

const onClick = (currentTabIndex, newTabIndex) => {
    const newTabs = [...tabs];
    newTabs[currentTabIndex] = {...tabs[currentTabIndex], isCurrent: false};
    newTabs[newTabIndex] = {...tabs[newTabIndex], isCurrent: true};
    setTabs([...newTabs]);
};

<TabbedNavigation activeColor={'red'} fontWeight={'normal'} notActiveColor={'blue'} onClick={onClick} tabs={tabs} />;
```
