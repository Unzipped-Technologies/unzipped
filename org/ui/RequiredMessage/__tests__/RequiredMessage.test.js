import React from 'react';
import {render} from 'testing/utils';
import RequiredMessage from '..';

test('Render a message', async () => {
    render(<RequiredMessage />);
});
