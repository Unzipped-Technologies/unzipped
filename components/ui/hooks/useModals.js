import React, {createContext, isValidElement, useEffect, useState} from 'react';
import {useHistory} from 'next/router';

const ModalContext = createContext();

const ModalContextProvider = ({children}) => {
    const {
        location: {pathname},
    } = useHistory();
    const [modals, setModals] = useState([]);

    useEffect(() => {
        setModals([]);
    }, [pathname]);

    return (
        <ModalContext.Provider
            value={{
                setModals,
            }}>
            {children}
            {modals.filter(modal => isValidElement(modal))}
        </ModalContext.Provider>
    );
};

export default ModalContext;

export {ModalContextProvider};
