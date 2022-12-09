```js
<div style={{display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 10}}>
    <Button>Default Button</Button>
    <Button small>Small Button</Button>
    <Button icon="alert">Icon</Button>
    <Button icon="alert" iconRight>
        Icon on right
    </Button>
    <Button
        icon="largeExpand"
        popoutWidth="210px"
        popout={[
            {
                text: 'This is a very long list name do you like it I do thank you',
                onClick: () => console.log('ITEM 1'),
            },
            {
                text: 'short',
                onClick: () => console.log('ITEM 2'),
            },
            {
                text: 'another short',
                onClick: () => console.log('ITEM 3'),
            },
        ]}
        iconRight
        separateRightIcon>
        Popout with iconRight and separator
    </Button>
    <Button block>Block Spaced</Button>
    <Button disabled>Disabled</Button>
    <Button type="outline">Outline</Button>
    <Button type="outline" small>
        Outline small
    </Button>
    <Button type="soft">Soft</Button>
    <Button type="table">Table</Button>
    <Button type="page">Page</Button>
</div>
```
