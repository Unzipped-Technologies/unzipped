import Constants from './constants';

class ErrorHandling {
    _formatError(error) {
        if (
            error.response !== undefined &&
            error.response.data !== undefined &&
            error.response.data.errors !== undefined
        ) {
            return error.response.data.errors[0].msg;
        } else {
            return Constants.INTERNAL_SERVER_ERROR;
        }
    }
}

export default new ErrorHandling();
