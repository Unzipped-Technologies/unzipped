NotificationSidePanel Example (see in isolated view)

```jsx
import {Button} from 'components/ui';
const [show, setShow] = React.useState(false);
const [notifications, setNotifications] = React.useState([
    {
        id: 1,
        dateTime: '7/24/21 - 10:30 PM',
        notification: {
            htmlMessage:
                'The Fund Manager for your investment in NexTest Ventures has issued a Side Letter for you to review and sign.',
        },
    },
    {
        id: 2,
        dateTime: '7/25/21 - 1:40 PM',
        notification: {
            htmlMessage:
                'Hello World. The Fund Manager for your investment in NexTest Ventures has issued a Side Letter for you to review and sign.',
        },
    },
    {
        id: 3,
        dateTime: '7/26/21 - 12:12 PM',
        notification: {
            htmlMessage:
                'Hello World 123. The Fund Manager for your investment in NexTest Ventures has issued a Side Letter for you to review and sign.',
        },
    },
]);

<>
    <Button onClick={() => setShow(!show)}>Click Me!</Button>
    <NotificationsSidePanel
        setToggleMenu={() => setShow(!show)}
        visible={show}
        notifications={notifications}
        dismissAlert={cardId => {
            var filterObj = notifications.filter(function (notificationObj) {
                return notificationObj.id !== cardId;
            });
            setNotifications(filterObj);
        }}
        dismissAllAlerts={() => {
            const emptyArray = [];
            setNotifications(emptyArray);
        }}
    />
</>;
```
