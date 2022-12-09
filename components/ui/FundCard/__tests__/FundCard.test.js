import React from 'react';
import {render} from 'testing/utils';
import FundCard from '..';

test('Render an Fund Card', async () => {
    render(<FundCard id={1} name="test fund" />);
});
