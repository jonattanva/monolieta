import File from '../index.jsx';

import {render, screen, fireEvent} from '@testing-library/react';

describe('<File />', function () {
    it('files added', function () {
        const onFilesAdded = jest.fn();
        render(<File onFilesAdded={onFilesAdded} />);

        const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
            type: 'image/png',
        });

        const input = screen.getByTestId('file');
        fireEvent.change(input, {target: {files: [file]}});

        const elements = onFilesAdded.mock.calls[0][0];
        expect(onFilesAdded).toHaveBeenCalledTimes(1);
        expect(elements.length).toEqual(1);
    });
});
