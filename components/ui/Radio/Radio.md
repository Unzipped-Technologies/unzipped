```jsx
const [selectedValue, selectValue] = React.useState('');

onChange = event => {
    selectValue(event.target.value);
};

<Radio name="test" options={['what', 'apple', 'bear']} onChange={onChange} selectedValue={selectedValue} />;
```

Vertical, with help text

```jsx
const [selectedValue, selectValue] = React.useState('');

onChange = event => {
    selectValue(event.target.value);
};

<Radio
    name="test"
    options={['what', 'apple', 'bear']}
    options={['what', 'apple', 'bear']}
    onChange={onChange}
    selectedValue={selectedValue}
    optionHelperDescript={['what help', null, 'bear help']}
    vertical
/>;
```
