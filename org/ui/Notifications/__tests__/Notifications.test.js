import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import Notifications from '..';

describe('<Notifications />', () => {
    let bellIcon;
    const mockFunc = jest.fn(() => {});
    beforeEach(async () => {
        render(<Notifications notificationsAmount={125} setToggleMenu={mockFunc} />);
        bellIcon = screen.getByTestId('notification-filled-icon');
    });

    test('renders Notifications component with the bell icon and 125 notifications', async () => {
        expect(bellIcon).toBeInTheDocument();
        expect(screen.getByTestId('notification-count')).toHaveTextContent(125);
    });

    test('clicking bell icon toggles the menu and updates the state', async () => {
        fireEvent.click(bellIcon);
        expect(mockFunc).toHaveBeenCalled();
    });
});
