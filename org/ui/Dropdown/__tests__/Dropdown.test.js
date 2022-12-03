import React from 'react';
import {render} from 'testing/utils';
import Dropdown from '..';

test('Render a Dropdown', async () => {
    render(
        <Dropdown
            visible
            links={[
                {text: 'View Profile', to: '/#badge'},
                {text: 'Log out', to: '/#badge'},
            ]}
        />,
    );
});
