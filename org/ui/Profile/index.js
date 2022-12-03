import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import InitialsIcon from 'components/ui/InitialsIcon';
import Dropdown from 'components/ui/Dropdown';
import Icon from 'components/ui/Icon';
import OutsideAlerter from 'components/ui/OutsideAlerter';
import {SidebarContext} from '../Sidebar';
import {SideContext} from '../SideContent';
import {UserUtils} from 'utils';

const Wrapper = styled.div`
    ${props => props.sidebar && 'display: flex;'}
    ${props => !props.sidebar && 'width: max-content;'}
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: ${props => (!props.isCondensed && props.sidebar ? '100%' : '')};
`;

const AContainer = styled.a`
    margin-right: ${props => (props.condense || props.isCondensed ? '10px' : props.marginRight)};
    color: ${props => (props.condense || props.sidebar ? '#fff' : props.theme.primary)};
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${props => props.padding};
    border-radius: 4px;
    font-family: arial;
    flex-grow: 1;
    cursor: pointer;
    &:hover {
        background: ${props => (props.sidebar ? props.theme.primaryHover : 'transparent')};
        color: ${props => (props.sidebar ? '#fff' : props.theme.primary)};
    }
`;

const NameContainer = styled.p`
    ${props =>
        props.isSidebarOpen &&
        `
        word-break: break-all;
        white-space: normal;
    `}

    margin-bottom: 0;
`;

const IconWrapper = styled.div`
    display: inline-block;
    width: ${props => (props.sidebar ? '30px' : '50px')};
    margin-right: 12px;
    text-align: center;
    svg {
        path {
            fill: ${props => (props.sidebar ? '#fff' : props.theme.primary)};
            stroke: ${props => (props.sidebar ? '#fff' : props.theme.primary)};
        }
    }
`;

const InitialsIconStyled = styled(InitialsIcon)`
    margin-right: 12px;
`;

const ProfilePic = styled.img`
    padding-right: 5px;
    margin-right: 12px;
    max-height: ${props => (props.sidebar ? '24px' : '36px')};
    max-width: ${props => (props.sidebar ? '24px' : '36px')};
`;

/**
 * Profile Component.
 */
const Profile = ({
    firstName,
    middleName,
    lastName,
    sidebar,
    dashboard,
    profilePicUrl,
    links,
    condense,
    marginRight,
    padding,
    ...rest
}) => {
    const {expanded} = useContext(SidebarContext);
    const {reducedView, mobileOpen} = React.useContext(SideContext);
    const isSidebar = condense ?? sidebar;
    const isCondensed = condense ?? !expanded;
    const isSidebarOpen = !reducedView && !mobileOpen ? !isCondensed : reducedView && mobileOpen;
    const newPadding = padding !== '15px 20px' ? padding : isSidebarOpen ? padding : '10px 20px';

    const [isDropdownVisible, setDropdown] = useState(false);

    const handleClick = () => {
        rest.onClick ? rest.onClick() : setDropdown(!isDropdownVisible);
    };

    const initials = UserUtils.getInitials({firstName, lastName});
    const profileIcon = profilePicUrl ? (
        <ProfilePic src={profilePicUrl} alt={`Profile picture of ${firstName} ${lastName}`} />
    ) : initials.length === 0 ? (
        <IconWrapper sidebar={isSidebar}>
            <Icon name="profile" alt="User profile icon" />
        </IconWrapper>
    ) : (
        <InitialsIconStyled initials={initials} sidebar={isSidebar} alt={`Icon with initials ${initials}`} />
    );
    const name = middleName !== null ? `${firstName} ${middleName} ${lastName}` : `${firstName} ${lastName}`;
    return (
        <OutsideAlerter onClickOutside={() => setDropdown(false)} autoWidth>
            <Wrapper sidebar={isSidebar} className={rest.className}>
                <ProfileContainer data-testid="profile" sidebar={isSidebar} isCondensed={isCondensed}>
                    <AContainer
                        sidebar={isSidebar}
                        onClick={handleClick}
                        marginRight={marginRight}
                        padding={newPadding}
                        isCondensed={isCondensed}
                        {...rest}>
                        {profileIcon}
                        {!isCondensed && <NameContainer isSidebarOpen={isSidebarOpen}>{name}</NameContainer>}
                        {!isSidebar && <Icon name="expand" />}
                    </AContainer>
                </ProfileContainer>
                <Dropdown dashboard={dashboard} visible={isDropdownVisible} links={links} sidebar={isSidebar} />
            </Wrapper>
        </OutsideAlerter>
    );
};

Profile.propTypes = {
    /** First name of user */
    firstName: PropTypes.string,
    /** Middle name of user, if available */
    middleName: PropTypes.string,
    /** Last name of user */
    lastName: PropTypes.string,
    /** URL of the user profile picture */
    profilePicUrl: PropTypes.string,
    /** List of objects for links, in form: [{text: 'link text', to: 'url'}, ...] */
    links: PropTypes.array,
    /** Is the component in the sidebar */
    sidebar: PropTypes.bool,
    /** Forces condensed view, optional prop while 'sidebar' is true (not need while used in Sidebar Component,
     * as its provided via context provider) */
    condense: PropTypes.bool,
    /** Override the default margin-right for AContainer (except when condense==true) */
    marginRight: PropTypes.string,
    /** Override the default padding value for AContainer */
    padding: PropTypes.string,
};

Profile.defaultProps = {
    firstName: '(unknown)',
    middleName: null,
    lastName: '(unknown)',
    sidebar: false,
    profilePicUrl: null,
    links: [],
    condense: null,
    marginRight: '20px',
    padding: '15px 20px',
};

export default Profile;
