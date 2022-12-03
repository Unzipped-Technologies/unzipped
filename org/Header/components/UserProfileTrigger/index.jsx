import React from 'react';

import {Col} from 'react-bootstrap';
import {ConverterUtils, FundUtils, UserUtils} from 'utils';
import withAccessToken from 'components/withAccessToken';

const UserProfileTrigger = ({
    addAccessTokenToUrl,
    userDropdownList,
    userObj,
    showandhideUserDropdown,
    loggedInUserObj,
}) => {
    const profilePic =
        userObj.profilePic && userObj.profilePic.url ? addAccessTokenToUrl(userObj.profilePic.url) : null;
    return (
        <>
            <Col xs={8} className="" onClick={userDropdownList}>
                <div>
                    <div
                        className={
                            'user-name userNameAlignment ' +
                            (showandhideUserDropdown ? '' : 'active') +
                            (window.location.href.indexOf('/lp') === -1 ? '' : ' lpUserNameAlignment')
                        }
                        title={ConverterUtils.getFullName(loggedInUserObj)}>
                        {ConverterUtils.getFullNameWithEllipsis(loggedInUserObj)}
                    </div>
                    {window.location.href.indexOf('userRoles') === -1 && (
                        <span className="tableHeadingAlignment table-heading remember-text">
                            {UserUtils.getAccountTypeName(UserUtils.getUserAccountType())}
                        </span>
                    )}
                </div>
            </Col>
            <Col xs={1} className="downArrowIcon" onClick={userDropdownList}>
                <i className="fa fa-chevron-down" />
            </Col>
            <Col xs={2} className="">
                {profilePic && <img src={profilePic} alt="profilePic" className="profilePic" />}
                {!profilePic && (
                    <div className="custom-name-table inline-block defaultProfilePic profilePic">
                        {FundUtils._getCustomName(userObj)}
                    </div>
                )}
            </Col>
        </>
    );
};

export default withAccessToken(UserProfileTrigger);
