Banner Component Example (see in isolated view)

```jsx
import {Button} from '../../components/ui';
const [showBanner, setShowBanner] = React.useState(false);

<>
    <Banner show={showBanner} testId="banner-md-example">
        TEST BANNER <Button onClick={() => setShowBanner(false)}>Click to hide banner</Button>
    </Banner>
    <Button onClick={() => setShowBanner(!showBanner)}>
        Click to Click to {showBanner ? 'hide banner' : 'show banner'}
    </Button>
</>;
```
