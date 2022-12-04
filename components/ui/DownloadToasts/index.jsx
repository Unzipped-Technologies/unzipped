import React from 'react';
import PropTypes from 'prop-types';
import FormNote from '../FormNote';
import InlineLink from '../InlineLink';

export const BULK_DOWNLOAD_READY = 'BULK_DOWNLOAD_READY';
export const BULK_DOWNLOAD_PROCESSING = 'BULK_DOWNLOAD_PROCESSING';
export const BULK_DOWNLOAD_COMPLETE = 'BULK_DOWNLOAD_COMPLETE';

const DownloadToasts = ({onHide = () => {}, successBanner, downloadBulk = () => {}, textVersion = 2, ...rest}) => {
    return (
        <div {...rest}>
            <FormNote type="default" show={successBanner === BULK_DOWNLOAD_PROCESSING}>
                <strong>Bulk download processing.</strong> The selected documents are being prepared for download. You
                will receive a notification when they are ready for you to download.
            </FormNote>
            <FormNote type="green" showCloseButton onHide={onHide} show={successBanner === BULK_DOWNLOAD_READY}>
                <strong>Bulk download ready.</strong> The selected documents are ready for you to download. Please note
                that these documents will expire after 24 hours. You can download the documents by clicking&nbsp;
                <InlineLink onClick={downloadBulk}>here</InlineLink>
                {textVersion === 2 && ' or the link below'}.
            </FormNote>
            <FormNote type="green" showCloseButton onHide={onHide} show={successBanner === BULK_DOWNLOAD_COMPLETE}>
                <strong>Documents downloaded.</strong> You have successfully downloaded the documents. If you would like
                to download any additional documents, use the “
                {textVersion === 2 ? 'Start Bulk Download' : 'Download Selected Docs'}” button to start the process.
            </FormNote>
        </div>
    );
};

DownloadToasts.propTypes = {
    /** Function to handle hide of the FormNote */
    onHide: PropTypes.func,
    /** String that represents the message to show */
    successBanner: PropTypes.string.isRequired,
    /** Async function that downloads a bulk download */
    downloadBulk: PropTypes.func,
    /** Number that determines which version of text to show (Vanilla 1.0 vs 2.0) */
    textVersion: PropTypes.oneOf([1, 2]),
};

export default DownloadToasts;
