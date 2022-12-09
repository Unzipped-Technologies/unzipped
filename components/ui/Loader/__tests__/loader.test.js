import React from 'react';
import {render, screen} from 'testing/utils';
import Loader from 'components/ui/Loader';

describe('Loader', () => {
    test('Displays an img of a loading circle when needed', () => {
        render(<Loader isLoading={true} />);
        expect(screen.getByTestId('loader-img')).toBeInTheDocument();
    });
    test('Does not display when not needed', () => {
        render(<Loader isLoading={false} />);
        expect(screen.queryByTestId('loader-img')).not.toBeInTheDocument();
    });
});
