import React from 'react';
import {render} from 'testing/utils';
import DashboardCard from '..';

test('Render the DashboardCard component', async () => {
    render(<DashboardCard viewFundButtonOnClick={() => {}} onFavoriteToggle={() => {}} />);
});
