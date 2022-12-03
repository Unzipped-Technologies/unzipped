import React from 'react';
import {createPortal} from 'react-dom';

const withModalPortal = Component => {
    return function ModalPortalWrapper(props) {
        return createPortal(<Component {...props} />, document.body);
    };
};

export default withModalPortal;
