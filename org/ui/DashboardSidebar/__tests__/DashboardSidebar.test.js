import DashboardSidebar from '..';
import React from 'react';
import {render} from 'testing/utils';

test('Render our DashboardSidebar', () => {
    render(<DashboardSidebar showSidebar={true} toggleShowSidebar={() => {}} />);
});
