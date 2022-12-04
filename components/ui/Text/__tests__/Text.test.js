import React from 'react';
import {render, screen, fireEvent} from 'testing/utils';
import Text from '..';

describe('Text Component', () => {
    const text = 'Test Text Component';
    test('Renders Properly - p tag', () => {
        render(<Text>{text}</Text>);
        const textNode = screen.getByText(text)
        expect(textNode).toBeInTheDocument();
        expect(textNode.nodeName).toBe('P')
    })
    test('Renders Properly - span tag', () => {
        render(<Text type='span'>{text}</Text>);
        const textNode = screen.getByText(text)
        expect(textNode).toBeInTheDocument();
        expect(textNode.nodeName).toBe('SPAN')
    })
    test('Fires onClick', () => {
        const mockFunc = jest.fn(() => {});
        render(<Text onClick={mockFunc}>{text}</Text>);
        fireEvent.click(screen.getByText(text));
        expect(mockFunc).toHaveBeenCalled();
    })
});
