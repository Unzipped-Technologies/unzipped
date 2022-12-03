import React from 'react';
import {render} from 'testing/utils';
import SyndicationTitle from '..';

test('Render a Syndication Title', async () => {
    render(<SyndicationTitle name="test fund" />);
});
