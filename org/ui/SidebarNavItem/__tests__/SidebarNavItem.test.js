import React from 'react';
import {render} from 'testing/utils';
import SidebarNavItem from '..';

test('Render a SidebarNavItem item', async () => {
    render(<SidebarNavItem>test</SidebarNavItem>);
});
