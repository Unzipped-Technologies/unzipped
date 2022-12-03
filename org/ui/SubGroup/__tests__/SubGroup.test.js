import React from 'react';
import {render} from 'testing/utils';
import SubGroup from '..';

test('Render a navigation group', async () => {
    render(<SubGroup title="this is a test">item</SubGroup>);
});
