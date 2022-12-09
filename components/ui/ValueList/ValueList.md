```jsx
import Action from '../Action';
import Actions from '../Actions';
import Icon from '../Icon';
import OverviewCard from '../OverviewCard';
<div style={{maxWidth: '747px'}}>
    <ValueList
        name="value-list-1"
        data={[
            {
                name: 'Closing Time zone',
                content: ['EST'],
            },
            {
                name: 'Cooley Lead Delegate',
                content: ['Ryan Mendoza'],
            },
            {
                name: 'Signatories',
                content: ['Lucy Liu'],
            },
        ]}
        secondary={true}
        top="5px"
        action={
            <Actions color="secondary">
                <Action onClick={() => {}}>Item 1</Action>
                <Action onClick={() => {}}>Item 2</Action>
            </Actions>
        }></ValueList>
    <ValueList
        name="value-list-2"
        data={[
            {
                name: 'Name',
                content: ['Jason'],
            },
            {
                name: 'Email Address',
                content: ['jmaynard@nexient.com'],
            },
        ]}
        action={
            <Actions color="secondary">
                <Action onClick={() => {}}>Item 1</Action>
                <Action onClick={() => {}}>Item 2</Action>
            </Actions>
        }
        top="5px"></ValueList>
    <ValueList
        name="value-list-2"
        data={[
            {
                name: 'Select Me',
                content: ['Yes'],
            },
            {
                name: 'Select Me',
                content: ['No'],
            },
        ]}
        secondary={true}
        style={'flex'}
        action={
            <Actions color="secondary">
                <Action onClick={() => {}}>Item 1</Action>
                <Action onClick={() => {}}>Item 2</Action>
            </Actions>
        }
        top="5px"></ValueList>
    <ValueList
        name="value-list-1"
        data={[
            {
                name: 'Closing Time zone',
                content: ['EST'],
            },
            {
                name: 'Cooley Lead Delegate',
                content: ['Jason Maynard'],
            },
            {
                name: 'Signatories',
                content: [
                    {
                        name: 'Jeff withalongname',
                        signed: 'Yes',
                        longName: 1.8,
                    },
                    {
                        name: 'Jamesdean Xavier',
                        signed: 'No',
                        longName: 1.6,
                    },
                ],
            },
        ]}
        longName={1.8}
        secondary={false}
        padding="0px"></ValueList>
    <OverviewCard title="Questions" flexWrapped>
        <ValueList
            name="value-list-1"
            data={[
                {
                    name: 'Text Example 1',
                    content: ['Insert Content Here'],
                },
                {
                    name: 'Text Example 2',
                    content: ['Content, insert here'],
                },
                {
                    name: 'Text Example 3',
                    content: ['Here, insert content'],
                },
            ]}
            longContent={0}
            containOverFlow></ValueList>
    </OverviewCard>
</div>;
```
