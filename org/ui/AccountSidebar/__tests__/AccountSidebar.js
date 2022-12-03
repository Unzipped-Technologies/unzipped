import React from 'react';
import {render} from 'testing/utils';
import AccountSidebar from '..';

test('Render a AccountSidebar link', async () => {
    render(<AccountSidebar title="Create Account" link="#" />);
});
