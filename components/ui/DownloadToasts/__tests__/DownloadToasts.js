import React from 'react';
import {render} from 'testing/utils';
import DownloadToasts from '..';

test('Render DownloadToasts', async () => {
    render(<DownloadToasts successBanner="" />);
});
