```jsx
import {Button} from 'components/ui';
const [showModal, setShowModal] = React.useState(false);
<>
    <Button onClick={() => setShowModal(true)}>SHOW MODAL</Button>
    <ProfileModal
        initials="CD"
        name="Cooley Delegate"
        emailHeader="Email"
        roleHeader="Role"
        role="Signatory - Investor"
        email="vanilla_cooley@nexient.com"
        showModal={showModal}
        phone="867-5309"
        onHide={() => setShowModal(false)}
    />
</>;
```
