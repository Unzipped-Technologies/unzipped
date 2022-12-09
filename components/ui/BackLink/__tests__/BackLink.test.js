import React from 'react';
import {render} from 'testing/utils';
import BackLink from '..';

test('Render a link', async () => {
    render(
        <BackLink link="/" label="home">
            This is a Back Link
        </BackLink>,
    );
});
