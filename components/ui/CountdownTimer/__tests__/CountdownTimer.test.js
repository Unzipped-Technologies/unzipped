import React from 'react';
import {render} from 'testing/utils';
import CountdownTimer from '..';

test('Render a countdown timer', async () => {
    const midnight = new Date();
    render(<CountdownTimer deadline={midnight} />);
});
