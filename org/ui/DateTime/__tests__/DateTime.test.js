import React from 'react';
import {render} from 'testing/utils';
import DateTime from '..';

test('Render a Date', async () => {
    render(<DateTime />);
});

test('Render a Time', async () => {
    render(<DateTime isTime />);
});
