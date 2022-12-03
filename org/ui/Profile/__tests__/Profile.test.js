import React from 'react';
import {render} from 'testing/utils';
import Profile from '..';

test('Render a Profile', async () => {
    render(<Profile firstName="John" lastName="Someone" sidebar />);
});
