import React from 'react';
import {render} from 'testing/utils';
import MainLayout from '..';

test('Render a sub navigation bar', async () => {
    render(
        <MainLayout>
            <div>test</div>
            <div>test 2</div>
        </MainLayout>,
    );
});
