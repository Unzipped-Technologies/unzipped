import React from 'react';
import {render} from 'testing/utils';
import {ToolTipText} from '..';

test('ToolTipText Test', async () => {
    render(<ToolTipText showToolTip text="test text" />);
});
