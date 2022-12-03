import React from 'react';
import {render} from 'testing/utils';
import WarnIcon from '..';
import {ToolTipsContextProvider} from '../../hooks/useToolTips';

test('Warn Icon', async () => {
    render(
        <ToolTipsContextProvider>
            <WarnIcon text="test text" />
        </ToolTipsContextProvider>,
    );
});
