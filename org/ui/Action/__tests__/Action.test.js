import React from 'react';
import {render} from 'testing/utils';
import Action from '..';

test('Render an Action link', async () => {
    render(<Action onClick={() => {}}>View Profile</Action>);
});
