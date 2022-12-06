/**
 * Map backend status to user-facing status
 * @param {string} status: backend status
 * @returns {string} user-facing status
 */
export const statusFormat = status => {
    const statusMap = {
        'closeReady': 'Complete',
    };

    const convertStatus = status => statusMap[status] ?? status;

    return convertStatus(status);
};
