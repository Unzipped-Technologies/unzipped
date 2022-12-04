import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import theme from '../theme';
import TabbedNavigation from '..';

describe('Tabbed Navigation Component', () => {
    const tabs = [{name: 'ADMIN', isCurrent: true, to: 'admin'}];
    const mockFunc = jest.fn(() => {});
    test('Renders Properly', () => {
        render(
            <TabbedNavigation
                activeColor={theme.primary}
                fontWeight={'600'}
                notActiveColor={theme.textSecondary}
                onClick={mockFunc}
                tabs={tabs}
            />,
        );
        const textNode = screen.getByText(tabs[0].name);
        expect(textNode).toBeInTheDocument();
    });
    test('Fires onClick', () => {
        const tabs = [{name: 'ADMIN', isCurrent: true, to: 'admin'}];
        const mockFunc = jest.fn(() => {});
        render(
            <TabbedNavigation
                activeColor={theme.primary}
                fontWeight={'600'}
                notActiveColor={theme.textSecondary}
                onClick={mockFunc}
                tabs={tabs}
            />,
        );
        fireEvent.click(screen.getByText(tabs[0].name));
        expect(mockFunc).toHaveBeenCalled();
    });
});
