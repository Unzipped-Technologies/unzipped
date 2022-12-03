```jsx
import Button from '../Button';

const [show, setShow] = React.useState(false);

function fetch() {
    setShow(true);
    setTimeout(() => {
        setShow(false);
    }, 3000);
}

<>
    <Button onClick={() => fetch()}>Show Loader (3 seconds)</Button>
    <Loader isLoading={show} />
</>;
```
