import React from 'react';
import {render} from 'testing/utils';
import SubItem from '..';

test('Render a navigation item', async () => {
    render(<SubItem to="/" />);
});
