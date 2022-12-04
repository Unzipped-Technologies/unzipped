import React from 'react';
import {render} from 'testing/utils';
import Modal from '..';

test('Render a modal', async () => {
    render(<Modal onHide={() => {}} />);
});
