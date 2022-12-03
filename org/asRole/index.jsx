import React, {useEffect, useState} from 'react';
import {switchToRole} from 'redesign/Dashboard/dashboardHelper';

const asRole = (roles, Component) => {
    return function ComponentWrapper(props) {
        const [isSwitched, setIsSwitched] = useState(false);
        useEffect(() => {
            (async () => {
                await switchToRole(roles);
                setIsSwitched(true);
            })();
        }, []);
        return isSwitched ? <Component {...props} /> : null;
    };
};

export default asRole;
