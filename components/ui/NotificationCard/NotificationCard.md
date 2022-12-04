NotificationCard example:

```js
<NotificationCard
    card={{
        id: 16,
        fromUserId: 55,
        toUserId: 5060,
        isRead: false,
        notification: {
            htmlMessage: [
                'You have been invited to subscribe to ',
                {type: 'a', key: '1', ref: null, props: {children: 'Cooley Fund 1'}, _owner: null, _store: {}},
                '.',
            ],
            message: 'Invitation to join particular fund',
            fundManagerCommonName: 'Manager Title',
            fundName: 'Cooley Fund 1',
            fundId: 2,
            sentBy: 55,
            type: 'FUND_INVITED',
        },
        createdAt: '2022-03-10T14:39:13.659Z',
        accountType: 'LP',
        accountId: 2010,
        isCooleyFirm: true,
    }}
    dateTime="7/24/21 - 10:30 PM"
    notificationText="The Fund Manager for your investment in NexTest Ventures has issued a Side Letter for you to review and sign."
/>
```
