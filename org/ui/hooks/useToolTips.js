import React, {createContext, isValidElement, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

const ToolTipsContext = createContext();

const ToolTipsContextProvider = ({children}) => {
    const {
        location: {pathname},
    } = useHistory();
    const [toolTips, setToolTips] = useState([]);

    useEffect(() => {
        setToolTips([]);
    }, [pathname]);

    return (
        <ToolTipsContext.Provider
            value={{
                setToolTips,
            }}>
            {children}
            {toolTips.filter(toolTip => isValidElement(toolTip))}
        </ToolTipsContext.Provider>
    );
};

export default ToolTipsContext;

export {ToolTipsContextProvider};
