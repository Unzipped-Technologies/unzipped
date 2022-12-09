import React from 'react';
import {render} from 'testing/utils';
import Checkbox from '..';

test('Render a check box form field', async () => {
    render(<Checkbox options={['what', 'apple', 'bear']} name="test" columns={2} onChange={() => {}} />);
});
