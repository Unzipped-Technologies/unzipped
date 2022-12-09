import React from 'react';
import {render, screen} from 'testing/utils';
import Banner from '..';

describe('Banner Renders', () => {
    const testBanner = 'TEST BANNER';
    const testId = 'test';
    beforeEach(() => {
        render(<Banner testId={testId}>{testBanner}</Banner>);
    });
    test('Banner has testId', () => {
        const bannerById = screen.getByTestId(testId);
        expect(bannerById).toBeInTheDocument();
    });
    test('Banner has expected content', () => {
        const bannerByText = screen.getByText(testBanner);
        expect(bannerByText).toBeInTheDocument();
    });
});
