import React from 'react';
import {render} from 'testing/utils';
import FormError from '..';

test('Render a form error', async () => {
    render(<FormError>Error</FormError>);
});
