import React from 'react';
import {render} from 'testing/utils';
import AnchorLink from '..';

test('Render an external link', async () => {
    render(<AnchorLink external>This is an External Anchor Link</AnchorLink>);
});
test('Render an internal link', async () => {
    render(<AnchorLink>This is an Internal Anchor Link</AnchorLink>);
});
