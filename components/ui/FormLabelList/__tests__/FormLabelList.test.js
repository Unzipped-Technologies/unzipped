import React from 'react';
import {render} from 'testing/utils';
import FormLabelList from '..';

test('Render a form label list', async () => {
    render(
        <FormLabelList
            items={[
                {id: 1, value: 'hai'},
                {id: 2, value: 'oh hai'},
            ]}
        />,
    );
});
