import React from 'react';
import {render} from 'testing/utils';
import SelectList from '..';

test('Render a SelectList', async () => {
    render(
        <SelectList
            items={[
                {id: 123, content: 'List Item 1'},
                {id: 456, content: 'List Item 2'},
                {id: 789, content: 'List Item 3'},
                {id: 321, content: 'List Item 4'},
                {id: 654, content: 'List Item 5'},
            ]}
        />,
    );
});
