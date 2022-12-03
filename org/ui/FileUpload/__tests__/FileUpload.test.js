import React from 'react';
import {render, screen, fireEvent, waitFor} from 'testing/utils';
import FileUpload from '..';

describe('FileUpload', () => {
    test('Render FileUpload Component Without FileName', async () => {
        render(<FileUpload fileAddress="https:google.com" title="Upload W8 Form" toolTipText="Form is used for..." />);

        const noFileText = screen.getByText('No File Uploaded');

        expect(noFileText).toBeInTheDocument();
    });

    test('Render FileUpload Component With FileName', async () => {
        const fileName = 'File.pdf';

        render(
            <FileUpload
                fileAddress="https:google.com"
                fileName={fileName}
                title="Upload W8 Form"
                toolTipText="Form is used for..."
            />,
        );

        const noFileText = screen.getByText(fileName);

        expect(noFileText).toBeInTheDocument();
    });

    test('Render the FileUpload Component Without FileName & Fire onChange Function', async () => {
        const file = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'});

        const mockHandleFileChange = jest.fn(() => {});
        const title = 'Upload W8 Form';
        render(
            <FileUpload
                fileAddress="https:google.com"
                handleFileChange={mockHandleFileChange}
                title={title}
                toolTipText="Form is used for..."
                name={title}
            />,
        );

        // get the upload button
        let uploader = screen.getByTestId(`styledInput${title}`);

        // simulate upload event and wait until finish
        await waitFor(() =>
            fireEvent.change(uploader, {
                target: {files: [file]},
            }),
        );
        // get the same uploader from the dom
        let image = document.getElementById(`styledInput${title}`);
        // check if the file is there
        expect(image.files[0].name).toBe('chucknorris.png');
        expect(image.files.length).toBe(1);
    });

    test('Render the FileUpload Component With FileName & Fire onClick Functions', async () => {
        const mockDeleteDoc = jest.fn(() => {});
        const mockOpenDoc = jest.fn(() => {});

        render(
            <FileUpload
                deleteDoc={mockDeleteDoc}
                fileAddress="https:google.com"
                fileName="File.pdf"
                isView
                isDelete
                openDoc={mockOpenDoc}
                title="Upload W8 Form"
                toolTipText="Form is used for..."
            />,
        );

        const viewBtn = screen.getByText('View');
        const deleteBtn = screen.getByText('Delete');

        fireEvent.click(viewBtn);
        expect(mockOpenDoc).toHaveBeenCalled();
        fireEvent.click(deleteBtn);
        expect(mockDeleteDoc).toHaveBeenCalled();
    });

    test('Render the FileUpload Component With restore to default enabled - Restore to Default button shown', async () => {
        const mockOpenDoc = jest.fn(() => {});
        const mockHandleFileRestore = jest.fn(() => {});
        render(
            <FileUpload
                defaultFileName="File.pdf"
                fileAddress="https:google.com"
                fileName="File56.pdf"
                isView
                isRestore
                openDoc={mockOpenDoc}
                handleFileRestore={mockHandleFileRestore}
                title="Upload W8 Form"
                toolTipText="Form is used for..."
            />,
        );

        const viewBtn = screen.getByText('View');
        const restoreDefault = screen.getByText('Restore to Default');

        fireEvent.click(viewBtn);
        expect(mockOpenDoc).toHaveBeenCalled();
        fireEvent.click(restoreDefault);
        expect(mockHandleFileRestore).toHaveBeenCalled();
    });

    test('Render the FileUpload Component With restore to default enabled - Restore to Default button not shown', async () => {
        const mockOpenDoc = jest.fn(() => {});
        const mockHandleFileRestore = jest.fn(() => {});
        render(
            <FileUpload
                defaultFileName="File.pdf"
                fileAddress="https:google.com"
                fileName="File.pdf"
                isView
                isRestore
                openDoc={mockOpenDoc}
                handleFileRestore={mockHandleFileRestore}
                title="Upload W8 Form"
                toolTipText="Form is used for..."
            />,
        );

        const viewBtn = screen.getByText('View');
        const restoreDefault = screen.queryByText('Restore to Default');

        fireEvent.click(viewBtn);
        expect(mockOpenDoc).toHaveBeenCalled();
        expect(restoreDefault).not.toBeInTheDocument();
    });
});
