import {useReducer} from 'react';
import {GpAPI, FSNetHTTP} from 'services/endpoints';
import {BrowserUtils} from 'utils';

const initialState = {
    isReady: false,
    isProcessing: false,
    hasDownload: false,
    download: null,
    showNotification: false,
    url: null,
};

const bulkDownloadReducer = (state, action) => {
    switch (action.type) {
        case 'CHECK_QUEUED':
            return {...state, ...action.payload};
        case 'DOWNLOAD_READY':
            return {...state, ...action.payload};
        case 'DOWNLOAD_QUEUED':
            return {...state, ...action.payload};
        case 'DOWNLOAD_CANCELLED':
            return {...state, ...action.payload};
        case 'DOWNLOAD_INITIATED':
            return {...state, ...action.payload};
        case 'NOTIFICATION_HIDDEN':
            return {...state, ...action.payload};
        default:
            return state;
    }
};

const useBulkDownload = () => {
    const [state, dispatch] = useReducer(bulkDownloadReducer, initialState);

    const startDownload = async options => {
        const {data} = await GpAPI.bulkDownloadFiles(options);

        if (!data.queued && data.url) {
            if (state.download?.filesForDownload) {
                /* If a user initiates a single doc download while a bulk download is processing,
                we want to cancel the bulk operation */
                await cancelDownload(options.fundId);
            }
            dispatch({
                type: 'DOWNLOAD_READY',
                payload: {...data, isProcessing: false, hasDownload: false, download: null, showNotification: true},
            });

            BrowserUtils._openNewTab(data.url, '_self');
        }
        if (data.queued) {
            dispatch({type: 'DOWNLOAD_QUEUED', payload: {...data, isProcessing: true, showNotification: true}});
        }
    };

    const getLatestDownload = async id => {
        const {data} = await FSNetHTTP.getLatestDownload({fundId: id});
        if (data.isReady) {
            dispatch({type: 'DOWNLOAD_READY', payload: {...data, showNotification: true}});
        } else if (data.isProcessing) {
            dispatch({type: 'DOWNLOAD_QUEUED', payload: {...data, showNotification: true}});
        }
    };

    const cancelDownload = async id => {
        const {data} = await FSNetHTTP.cancelDownload({fundId: id, filesForDownload: state.download.filesForDownload});

        dispatch({type: 'DOWNLOAD_CANCELLED', payload: data});
    };

    const initiateDownload = async id => {
        const {data} = await FSNetHTTP.markDownload({fundId: id, filesForDownload: state.download.filesForDownload});

        dispatch({type: 'DOWNLOAD_INITIATED', payload: {...data, isProcessing: false}});
        window.open(state.download.filePath, '_self');
    };

    const hideDownloadNotification = () => {
        dispatch({type: 'NOTIFICATION_HIDDEN', payload: {showNotification: false}});
    };

    return {
        downloadState: state,
        startDownload,
        getLatestDownload,
        cancelDownload,
        initiateDownload,
        hideDownloadNotification,
    };
};

export default useBulkDownload;
