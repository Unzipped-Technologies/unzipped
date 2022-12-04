import React from 'react';
import {render} from 'testing/utils';
import Actions from '..';

test('Render actions', async () => {
    render(
        <Actions
            links={[
                {text: 'View Profile', to: '/#button'},
                {text: 'Log out', to: '/#card'},
            ]}
        />,
    );
});
