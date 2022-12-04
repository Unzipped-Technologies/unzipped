import React from 'react';
import {render} from 'testing/utils';
import Button from '../../Button';
import Buttons from '..';

test('Renders 2 buttons', () => {
    render(
        <Buttons>
            <Button>Hello</Button>
            <Button>World</Button>
        </Buttons>,
    );
});
