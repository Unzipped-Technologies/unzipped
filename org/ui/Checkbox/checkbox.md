```jsx
import {changeCheckBoxSelections} from 'components/ui/utils/formHelper';
const [currentSelections, setSelections] = React.useState([]);
<Checkbox
    options={['Unselected Option', 'Selected Option', 'Default Option', 'New Option', 'tiger', 'hippo']}
    columns={2}
    name="check1"
    onChange={e => setSelections(changeCheckBoxSelections(e, currentSelections))}
    selectedValues={currentSelections}
/>;
```
