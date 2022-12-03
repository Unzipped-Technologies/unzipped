import React from 'react';
import PropTypes from 'prop-types';
import Profile from 'components/ui/Profile';
import {BrowserUtils, UserUtils, FSNetUtils} from 'utils';
import {AccountAPI} from 'services/endpoints';
import Constants from 'utils/constants';

/**
 * Vanilla User Profile Component, using new 2.0 Profile
 */
const UserProfile = ({className, user, sidebar}) => {
    const logout = async () => {
        if (UserUtils.isAdminLoggedIn()) {
            UserUtils.removeAdminData();
            setTimeout(() => (window.location.href = '/adminDashboard/firmView'), 200);
        } else {
            await AccountAPI.logout();
            BrowserUtils._ClearLocalStorage();
        }
    };
    const {firstName, lastName, middleName, id} = user && user.user ? user.user : user;
    return (
        <Profile
            className={className}
            sidebar={sidebar}
            firstName={firstName}
            lastName={lastName}
            middleName={!middleName ? null : middleName}
            links={[
                {
                    text: 'View Profile',
                    to: `${Constants.redesignPaths.settings.profile}${FSNetUtils._encrypt(id)}`,
                },
                {text: 'Log out', onClick: logout},
            ]}
        />
    );
};

UserProfile.propTypes = {
    /** Additional classNames, supports styled-components  */
    className: PropTypes.string,
    /** The user object */
    user: PropTypes.object,
    /** If this component is in the sidebar */
    sidebar: PropTypes.bool,
};

UserProfile.defaultProps = {
    className: '',
    user: {},
    sidebar: false,
};

export default UserProfile;
