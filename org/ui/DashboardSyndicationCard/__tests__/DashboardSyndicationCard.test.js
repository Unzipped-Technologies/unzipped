import React from 'react';
import {render} from 'testing/utils';
import DashboardSyndicationCard from '..';

test('Render the DashboardSyndicationCard component', async () => {
    render(<DashboardSyndicationCard viewButtonOnClick={() => {}} onFavoriteToggle={() => {}} status="STATUS" />);
});
