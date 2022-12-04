Select List, with checked items displayed by setting `showCheckedStatus` prop.

```js
const [selectedItems, setSelectedItems] = React.useState([]);
const handleclick = items => {
    setSelectedItems(items);
};
<SelectList
    showCheckedStatus
    items={[
        {id: 123, content: 'List Item 1'},
        {id: 456, content: 'List Item 2'},
        {id: 789, content: 'List Item 3'},
        {id: 321, content: 'List Item 4'},
        {id: 654, content: 'List Item 5'},
    ]}
    onChange={handleclick}
    checkedItems={selectedItems}
    maxHeight={'300px'}
/>;
```

Readonly Select List

```js
<SelectList
    items={[
        {id: 123, content: 'List Item 1'},
        {id: 456, content: 'List Item 2'},
        {id: 789, content: 'List Item 3'},
        {id: 321, content: 'List Item 4'},
        {id: 654, content: 'List Item 5'},
        {id: 124, content: 'List Item 6'},
        {id: 454, content: 'List Item 7'},
        {id: 784, content: 'List Item 8'},
        {id: 324, content: 'List Item Squid'},
        {id: 655, content: 'List Item Game'},
    ]}
    maxHeight={'300px'}
    readOnly
    label="The Select List Label"
    description="The funds listed below have already been applied. Return to the fund list to remove them."
/>
```

Readonly Select List with nodes as list items

```js
<SelectList
    items={[
        {
            id: 123,
            content: (
                <div>
                    List Item 1 <span style={{color: 'red'}}>Delete</span>
                </div>
            ),
        },
        {
            id: 456,
            content: (
                <div>
                    List Item 2 <span style={{color: 'red'}}>Delete</span>
                </div>
            ),
        },
    ]}
    maxHeight={'300px'}
    readOnly
    label="The Select List Label"
    description="The funds listed below have already been applied. Return to the fund list to remove them."
/>
```
