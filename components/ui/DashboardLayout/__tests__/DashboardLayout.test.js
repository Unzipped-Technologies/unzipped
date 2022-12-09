import DashboardLayout from '..';
import React from 'react';
import {render, screen} from 'testing/utils';

test('Render a dashboard layout', () => {
    render(
        <DashboardLayout>
            <div>test</div>
        </DashboardLayout>,
    );

    const layoutText = screen.getByText('test');

    expect(layoutText).toBeInTheDocument();
});
