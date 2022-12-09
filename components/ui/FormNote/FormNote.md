```js
<div style={{display: 'flex', flexFlow: 'column', alignItems: 'flex-start', gap: 10}}>
    <FormNote>
        {' '}
        <strong>DEFAULT:</strong> I am a form note{' '}
    </FormNote>
    <FormNote type="error">
        {' '}
        <strong>ERROR:</strong> I am a error note{' '}
    </FormNote>
    <FormNote type="green">
        {' '}
        <strong>GREEN:</strong> I am a green note{' '}
    </FormNote>
    <FormNote type="important">
        {' '}
        <strong>IMPORTANT:</strong> I am an important note{' '}
    </FormNote>
    <FormNote showCloseButton onHide={() => console.log('onHide clicked in FormNote!')}>
        {' '}
        <strong>CLOSE:</strong> I am a form note with a close button{' '}
    </FormNote>
</div>
```
