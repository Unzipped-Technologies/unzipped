import React from 'react';
import {render} from 'testing/utils';
import PhoneNumberInput from '..';

test('Render a Phone Number Input Component', async () => {
    render(<PhoneNumberInput name="phone-number-input-test" onChange={()=>{}}/>);
});
