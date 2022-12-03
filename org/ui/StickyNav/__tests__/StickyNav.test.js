import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import StickyNav from '..';

describe('StickyNav', () => {
    test('Renders StickyNav Buttons & Fires onClick Functions', () => {
        const mockBack = jest.fn(() => {});
        const mockNext = jest.fn(() => {});
        render(<StickyNav onBackClick={mockBack} onNextClick={mockNext} />);

        const backBtn = screen.getByText('previous');
        const nextBtn = screen.getByText('next');

        expect(backBtn).toBeInTheDocument();
        expect(nextBtn).toBeInTheDocument();

        fireEvent.click(backBtn);
        expect(mockBack).toHaveBeenCalled();
        fireEvent.click(nextBtn);
        expect(mockNext).toHaveBeenCalled();
    });
});
