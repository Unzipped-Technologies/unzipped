import React, {useEffect, useRef} from 'react';

import {FSNetUtils} from 'utils';
import MsalChangePassword from 'pages/Settings/MsalChangePassword';

const UserProfile = ({
    profileImage,
    editImage,
    backImage,
    logout,
    showandhideUserDropdown,
    loggedInUserObj,
    handleClickOutSide,
}) => {
    const node = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            if (node?.current?.contains(e.target)) {
                return;
            } else {
                handleClickOutSide();
            }
        };

        document.addEventListener('mousedown', handleClick, false);

        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        };
    }, [handleClickOutSide]);

    return (
        <div
            className={'user-dropdown-list ' + (!window.location.href.includes('/lp') ? '' : 'lp-user-dropdoown-list')}
            hidden={showandhideUserDropdown}
            ref={node}>
            <ul>
                <li>
                    <img src={editImage} alt="edit-profile" className="dropDownImg" />
                    <a href={`/settings/profile/${FSNetUtils._encrypt(loggedInUserObj.id)}`}>Edit Profile</a>
                </li>
                <li>
                    <MsalChangePassword icon={profileImage} />
                </li>
                <li onClick={logout}>
                    <img src={backImage} alt="logout" className="dropDownImg" />
                    <a>Log Out</a>
                </li>
            </ul>
        </div>
    );
};

export default UserProfile;
