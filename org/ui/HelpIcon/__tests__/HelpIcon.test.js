import React from 'react';
import {render} from 'testing/utils';
import HelpIcon from '..';

test('Help Icon', async () => {
    render(<HelpIcon text="test text" />);
});
