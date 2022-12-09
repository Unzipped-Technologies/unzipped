import React from 'react';
import {render} from 'testing/utils';
import Search from '..';

test('Render a Search bar', () => {
    render(
        <Search
            searchableItems={[
                {id: 1, name: 'item 1'},
                {id: 2, name: 'item 2'},
                {id: 3, name: 'item 3'},
            ]}
            keys={['name']}
            onChange={filteredResults => console.log(filteredResults)}
            placeholder={'placeholder 1'}
        />,
    );
});
