```jsx
const [demoValue, setDemoValue] = React.useState();
const onChange = event => {
    setDemoValue({label: event.label, value: event.value});
};

<SelectInput
    options={[
        {label: 'Alaska', value: 1},
        {label: 'California', value: 2},
        {label: 'Hawaii', value: 3},
        {label: 'New Mexico', value: 4},
        {label: 'New York', value: 5},
    ]}
    value={demoValue}
    onChange={onChange}
/>;
```

Dropdown with checkbox selections

```jsx
import {changeCheckBoxSelections} from '../utils/formHelper';
const [currentSelections, setSelections] = React.useState([]);

<SelectInput
    options={[
        {label: 'Jordan', value: 1},
        {label: 'Lebron', value: 2},
        {label: 'Shaq', value: 3},
        {label: 'Hakeem', value: 4},
        {label: 'Steph', value: 5},
    ]}
    valueForMulti={currentSelections}
    onChange={e => {
        setSelections(changeCheckBoxSelections(e, currentSelections));
    }}
    isMulti
/>;
```
