import React from 'react';
import {render} from 'testing/utils';
import FundTitle from '..';

test('Render a Fund Title', async () => {
    render(<FundTitle name="test fund" />);
});
