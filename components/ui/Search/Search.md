Search filter on characters, default filterCondition

```js
<p style={{'padding': '10px'}}>Small Search</p>
<Search
    searchableItems={[
        {id: 1, name: 'item 1'},
        {id: 2, name: 'item 2'},
        {id: 3, name: 'item 3'},
    ]}
    keys={['name']}
    onChange={filteredResults => console.log(filteredResults)}
    placeholder={'filter based on string'}
/>
<p style={{'padding': '10px'}}>Large Search</p>
<Search
    searchableItems={[
        {id: 1, name: 'item 1'},
        {id: 2, name: 'item 2'},
        {id: 3, name: 'item 3'},
    ]}
    keys={['name']}
    onChange={filteredResults => console.log(filteredResults)}
    placeholder={'filter based on string'}
    large
/>
```
