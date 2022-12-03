import React from 'react';
import {Button} from 'react-bootstrap';
import {ConverterUtils, UserUtils} from 'utils';
import {msalLogout} from 'utils/msal';

const GoBackToAdmin = ({loggedInUserObj}) => {
    const logout = async () => {
        if (UserUtils.isAdminLoggedIn()) {
            UserUtils.removeAdminData();
            setTimeout(() => {
                window.location.href = '/adminDashboard/firmView';
            }, 200);
        } else {
            await msalLogout();
        }
    };

    return (
        UserUtils.isAdminLoggedIn() &&
        !window.location.href.includes('/dashboard') &&
        !window.location.href.includes('/lp') &&
        !window.location.href.includes('/Investor') && (
            <div className="impersonateHeader text-center">
                <label className="title ellipsis">Impersonated as {ConverterUtils.getFullName(loggedInUserObj)}</label>
                <Button type="button" className="fsnetSubmitButton btnEnabled" onClick={logout}>
                    Go Back To Admin
                </Button>
            </div>
        )
    );
};

export default GoBackToAdmin;
