Dashboard Sidebar (see in isolated view)

```jsx
import {Button} from 'components/ui';
const [show, setShow] = React.useState(false);

<>
    <Button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'} sidebar</Button>
    <DashboardSidebar showSidebar={show} toggleShowSidebar={() => setShow(!show)} />
</>;
```
