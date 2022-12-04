import React from 'react';
import {render} from 'testing/utils';
import ProfileModal from '..';

test('Render a profile modal', async () => {
    render(
        <ProfileModal
            onHide={() => {}}
            initials="AB"
            name="Alec Baldwin"
            role="actor"
            email="alec@baldwin.com"
            showModal
        />,
    );
});
