import React from 'react';
import {render} from 'testing/utils';
import SyndicationBadge from '..';

test('Render a SyndicationBadge', async () => {
    render(<SyndicationBadge>This is a Syndication Badge</SyndicationBadge>);
});
