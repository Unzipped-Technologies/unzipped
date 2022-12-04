import React from 'react';
import {render} from 'testing/utils';
import FundChart from '..';

test('Render the GraphChart component', async () => {
    render(
        <FundChart
            target={500000}
            hardCap={2000000}
            closed={50000}
            closeReady={15000}
            legalHold={10000}
            inProgress={150000}
        />,
    );
});
