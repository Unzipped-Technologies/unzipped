Fork of the unmaintained Text Mask: https://github.com/text-mask/text-mask

Phone number example

```js
<TextMaskInput mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
```

Date example. To use `createAutoCorrectedDatePipe`, `keepCharPositions` must be `true`.

```js
import createAutoCorrectedDatePipe from 'components/ui/TextMaskInput/core/createAutoCorrectedDatePipe';
<TextMaskInput
    mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
    pipe={createAutoCorrectedDatePipe('mm/dd/yyyy')}
    keepCharPositions
/>;
```
