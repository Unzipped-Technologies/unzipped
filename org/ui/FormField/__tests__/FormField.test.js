import React from 'react';
import {render} from 'testing/utils';
import FormField from '..';

test('Render a form field', async () => {
    render(
        <FormField fieldType="input" required name="check2" help="what is this">
            This is a test
        </FormField>,
    );
});
