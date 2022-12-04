import React from 'react';
import {fireEvent, render, screen, waitFor} from 'testing/utils';
import ToolTip from '..';

describe('ToolTip UI Component', () => {
    test('Renders children props', async () => {
        render(
            <ToolTip text="helping" testId="test">
                im a tooltip
            </ToolTip>,
        );
        expect(screen.getByText('im a tooltip')).toBeInTheDocument();
    });
    test('ToolTip text appears/disappears on children mouse over/out', async () => {
        render(
            <ToolTip text="helping" testId="test">
                im a tooltip
            </ToolTip>,
        );
        fireEvent.mouseOver(screen.getByText('im a tooltip'));
        await waitFor(() => screen.getByTestId('test-ToolTip-open'));
        expect(screen.getByText('helping')).toBeInTheDocument();
        fireEvent.mouseOut(screen.getByText('im a tooltip'));
        await waitFor(() => !screen.queryByTestId('test-ToolTip-open'));
        expect(screen.queryByText('helping')).not.toBeInTheDocument();
    });
});
