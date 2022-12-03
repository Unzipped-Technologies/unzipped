Banner Component Example (see in isolated view)

```jsx
import Button from '../Button';

const [showBanner, setShowBanner] = React.useState(false);

<>
    <ImpersonationBanner show={showBanner} name="Pink Floyd" logout={() => alert('Logged Out')} />
    <Button onClick={() => setShowBanner(!showBanner)}>
        Click to Click to {showBanner ? 'hide banner' : 'show banner'}
    </Button>
</>;
```
