import React from 'react';
import {render} from 'testing/utils';
import {Constants} from 'utils';
import ProgressBar from '..';

test('Render a ProgressBar', async () => {
    render(<ProgressBar value={30} showValue status={Constants.subscriptionStatus.inProgress} />);
});
