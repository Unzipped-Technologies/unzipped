Full width Table with more than one action and checkboxes for some rows:

```js
<Table
    theadData={['START DATE', 'TYPE', 'COLOR', 'MONTH', 'LOCATION', 'NICKNAME']}
    columnWidths={['120px', '160px', '380px', '200px', '200px', '200px', '200px']}
    noCheckboxIds={['43234']}
    isFullWidth
    selectTitle="REMOVE"
    type="checkbox"
    onClick={ids => console.log('Table onClick ids: ', ids)}
    tbodyData={[
        {
            id: '21324',
            'start date': {isDate: true, value: '7/19/21', link: '#'},
            type: 'Review Subscription Agreement',
            color: {value: 'Aquamarine', link: '#'},
            month: 'July',
            location: 'Baltimore, Maryland',
            nickname: 'Big Bird',
            actions: [
                {name: 'Action 1', onClick: () => console.log('Action')},
                {name: 'Action 2', onClick: () => console.log('Action')},
            ],
        },
        {
            id: '43234',
            'start date': {isDate: true, value: '7/15/21'},
            type: 'Review Modified Subscription Agreement',
            color: 'Carrot Orange',
            month: 'September',
            location: 'Detroit, Michigan',
            nickname: 'Oscar the Grouch',
            actions: [
                {name: 'Action 1', onClick: () => console.log('Action')},
                {name: 'Action 2', onClick: () => console.log('Action')},
            ],
        },
        {
            id: '34534',
            'start date': {isDate: true, value: '7/10/21'},
            type: 'Review Fund Amendment',
            color: {value: 'Lime Green', link: '#'},
            month: 'January',
            location: 'Fargo, North Dakota',
            nickname: 'Bert',
            actions: [
                {name: 'Action 1', onClick: () => console.log('Action')},
                {name: 'Action 2', onClick: () => console.log('Action')},
            ],
        },
    ]}
    bold={0}
/>
```

Full width Table with one action and radios:

```js
<Table
    theadData={['START DATE', 'TYPE', 'COLOR', 'MONTH', 'LOCATION', 'NICKNAME']}
    columnWidths={['90px', '160px', '380px', '200px', '200px', '200px', '200px']}
    isFullWidth
    selectTitle="REMOVE"
    type="radio"
    onClick={ids => console.log('Table onClick ids: ', ids)}
    tbodyData={[
        {
            id: '21324',
            'start date': '7/19/21',
            type: 'Review Subscription Agreement',
            color: {value: 'Aquamarine', link: '#'},
            month: 'July',
            location: 'Baltimore, Maryland',
            nickname: 'Big Bird',
            actions: [{name: 'Action 1', onClick: () => console.log('Action')}],
        },
        {
            id: '34534',
            'start date': {value: '7/10/21', link: '#'},
            type: 'Review Fund Amendment',
            color: {value: 'Lime Green', link: '#'},
            month: 'January',
            location: 'Fargo, North Dakota',
            nickname: 'Bert',
            actions: [{name: 'Action 1', onClick: () => console.log('Action')}],
        },
    ]}
    bold={0}
/>
```

Small table with no row data and emptyMessage defined:

```js
<Table
    columnWidths={['250px']}
    theadData={['MANAGER NAME', 'EMAIL']}
    tbodyData={[]}
    bold={1}
    emptyMessage="There are no investors that match the search criteria. Please revise your search."
/>
```
