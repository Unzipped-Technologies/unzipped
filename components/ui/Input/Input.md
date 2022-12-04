```js
<div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
    <Input name="test" placeholder="test" />
    <Input name="test" accepted placeholder="Input that has been accepted." />
    <Input name="test" error="something is wrong" placeholder="Input that has an error." />
    <Input name="currency-test" placeholder="Input formats currency." currency />
    <Input name="currency-test" placeholder="Input with a custom width." width="240px" currency />
    <Input name="test-disabled" placeholder="Input that has been disabled." disabled />
    <Input name="test-green-border" placeholder="Input with a custom border color." borderColor="green" />
</div>
```
