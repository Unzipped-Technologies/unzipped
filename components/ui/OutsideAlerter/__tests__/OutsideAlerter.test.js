import React from 'react';
import {render} from 'testing/utils';
import OutsideAlerter from '..';

test('Render OutsideAlerter', async () => {
    render(
        <OutsideAlerter onClickOutside={() => {}}>
            <div>alert</div>
        </OutsideAlerter>,
    );
});
