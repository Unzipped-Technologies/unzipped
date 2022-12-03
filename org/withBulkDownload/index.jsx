import React from 'react';
import useBulkDownload from 'components/ui/hooks/useBulkDownload';

const withBulkDownload = Component => {
    return function WithBulkDownloadWrapper(props) {
        const {
            downloadState,
            startDownload,
            cancelDownload,
            getLatestDownload,
            initiateDownload,
            hideDownloadNotification,
        } = useBulkDownload();
        return (
            <Component
                downloadState={downloadState}
                startDownload={startDownload}
                getLatestDownload={getLatestDownload}
                cancelDownload={cancelDownload}
                initiateDownload={initiateDownload}
                hideDownloadNotification={hideDownloadNotification}
                {...props}
            />
        );
    };
};

export default withBulkDownload;
