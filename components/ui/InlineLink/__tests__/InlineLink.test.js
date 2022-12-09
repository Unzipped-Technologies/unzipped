import React from 'react';
import {render} from 'testing/utils';
import InlineLink from '..';

test('Render an inline link', async () => {
    render(<InlineLink onClick={() => {}}>View Profile</InlineLink>);
});
