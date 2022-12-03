```jsx
import {changeCheckBoxSelections} from 'components/ui/utils/formHelper';

const [demoValue, setDemoValue] = React.useState();
const [demoRequiredValue, setDemoRequiredValue] = React.useState();
const [selectedRadio, selectRadio] = React.useState('');
const [checkBoxSelections, setCheckBoxSelections] = React.useState([]);

onChange = event => selectRadio(event.target.value);
const onSelectChange = event => setDemoValue({label: event.label, value: event.value});
const onSelectChangeRequired = event => setDemoRequiredValue({label: event.label, value: event.value});

<>
    <FormField
        required
        fieldType="radio"
        name="test3"
        help="what is this"
        onChange={onChange}
        options={['what', 'apple', 'bear']}
        selectedValue={selectedRadio}>
        This is some sort of test <strong>test</strong> hey.
    </FormField>
    <FormField
        fieldType="checkbox"
        required
        options={['what', 'apple', 'bear', 'lion', 'tiger', 'hippo']}
        selectedValues={checkBoxSelections}
        onChange={e => setCheckBoxSelections(changeCheckBoxSelections(e, checkBoxSelections))}
        columns={2}
        name="check4"
        help="what is this">
        This is a some sort of grid <strong>test</strong> hey.
    </FormField>
    <FormField fieldType="input" required textarea name="test1" help="what is this">
        This is some sort of test <strong>test</strong> hey.
    </FormField>
    <FormField
        fieldType="phoneNumberInput"
        inline
        name="phone-number-input-test"
        help="who you going to call?"
        required>
        This is the <i>Phone Number</i> Input.
    </FormField>
    <FormField fieldType="input" name="currency-input-test" currency required>
        This is the <i>Currency</i> Input.
    </FormField>
    With no label element
    <FormField fieldType="input" name="no-label-example" />
    <FormField
        fieldType="select"
        options={[
            {label: 'Alaska', value: 1},
            {label: 'California', value: 2},
            {label: 'Hawaii', value: 3},
            {label: 'New Mexico', value: 4},
            {label: 'New York', value: 5},
        ]}
        value={demoValue}
        onChange={onSelectChange}
        name="select"
        help="Select any of the options">
        This is a select component.
    </FormField>
    <FormField
        required
        fieldType="select"
        options={[
            {label: 'Alaska', value: 1},
            {label: 'California', value: 2},
            {label: 'Hawaii', value: 3},
            {label: 'New Mexico', value: 4},
            {label: 'New York', value: 5},
        ]}
        value={demoRequiredValue}
        onChange={onSelectChangeRequired}
        name="select"
        help="Select any of the options">
        This is a select component that is has required field.
    </FormField>
</>;
```
