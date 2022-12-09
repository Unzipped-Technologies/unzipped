import React from 'react';
import {render} from 'testing/utils';
import Action from '../../Action';
import Icon from '../../Icon';
import ValueList from '..';

test('Render a ValueList', async () => {
    render(
        <ValueList
            data={[
                {
                    name: 'Name',
                    content: ['Jason'],
                },
                {
                    name: 'Email Address',
                    content: ['jmaynard@nexient.com'],
                },
            ]}
            action={
                <Action onClick={() => console.log('clicked')}>
                    <Icon name="dotmenu" />
                </Action>
            }
        />,
    );
});
