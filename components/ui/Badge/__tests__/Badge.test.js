import React from 'react';
import {render} from 'testing/utils';
import Badge from '..';

test('Render a badge', async () => {
    render(<Badge>This is a badge</Badge>);
});
