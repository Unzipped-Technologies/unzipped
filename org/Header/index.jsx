/* eslint-disable react/jsx-no-target-blank */
import React, {Component} from 'react';
import './index.scss';
import {Row, Col} from 'react-bootstrap';
import userDefaultImage from 'images/profile-picture-royal.svg';
import {AccountAPI, FSNetAuth, NotificationAPI, ProfileAPI} from 'services/endpoints';
import profileImage from 'images/key.svg';
import backImage from 'images/back.svg';
import editImage from 'images/edit.svg';
import notificationImage from 'images/notifications.png';
import SideBar from '../SideBar';
import {PubSub} from 'pubsub-js';
import $ from 'jquery';
import GoBackToAdmin from './components/GoBackToAdmin';
import WhatsNew from './components/WhatsNew';
import HelpCenter from './components/HelpCenter';
import UserProfile from './components/UserProfile';
import UserProfileTrigger from './components/UserProfileTrigger';
import Notifications from './components/Notifications';
import {BrowserUtils, UserUtils} from 'utils';
import {msalLogout} from 'utils/msal';

let userObj = {},
    alert = {};
class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInUserObj: [],
            showandhideUserDropdown: true,
            menuShow: false,
            userImage: userDefaultImage,
            allAlertsList: [],
            alertsCount: 0,
        };

        alert = PubSub.subscribe('alertCount', () => {
            this.getAllAlerts(userObj.id);
        });
    }

    toggleMenu = value => {
        if (value) {
            this.setState({
                alertsCount: value,
            });
        }
        if (!this.state.menuShow) {
            $('.alerts-section').css({'-webkit-overflow-scrolling': 'touch'});
            $('html,body').css({'overflow-y': 'hidden', height: '100%'});
        } else {
            $('html,body').css({'overflow-y': 'inherit', height: 'auto'});
        }
        this.setState({
            menuShow: !this.state.menuShow,
        });
    };

    userDropdownList = () => {
        let value = this.state.showandhideUserDropdown;
        this.setState({
            showandhideUserDropdown: !value,
        });
    };

    logout = async () => {
        if (UserUtils.isAdminLoggedIn()) {
            UserUtils.removeAdminData();
            setTimeout(() => (window.location.href = '/adminDashboard/firmView'), 200);
        } else {
            await msalLogout();
        }
    };

    componentDidMount() {
        if (FSNetAuth.isAuthenticated()) {
            // Get user obj from local storage.
            userObj = UserUtils.getUserData();
            let page = BrowserUtils.getLpFundId();
            if (userObj && page !== 'profile') {
                this.setState({
                    loggedInUserObj: userObj,
                    userImage: userObj.profilePic,
                });
            } else {
                this.getUserInfo();
            }
            this.getAllAlerts(userObj.id);
        } else {
            window.location = '/';
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(alert);
    }

    handleClickOutSide = () => {
        this.setState({
            showandhideUserDropdown: true,
        });
    };

    getUserInfo = async () => {
        const result = await ProfileAPI.getUserProfile();

        let userData = UserUtils.getUserData();
        userData['firstName'] = result.data.firstName;
        userData['middleName'] = result.data.middleName;
        userData['lastName'] = result.data.lastName;
        userData['cellNumber'] = result.data.cellNumber;
        userData['profilePic'] = result.data.profilePic;
        userData['signatureName'] = result.data.signatureName;
        UserUtils.setUser(userData);
        this.setState({
            loggedInUserObj: userData,
            userImage: userData.profilePic,
        });
    };

    getAllAlerts = async id => {
        if (id) {
            const result = await NotificationAPI.getAllAlerts(id);

            this.setState({
                allAlertsList: result.data.data,
                alertsCount: result.data.data.length,
            });
        }
    };

    // Whats new
    goToWhatsNew = async () => {
        const status = UserUtils.getUserData();
        const id = {accountId: status.accountId};

        if (UserUtils.isWhatsNewEnabled() === true) {
            try {
                const result = await AccountAPI.getWhatsNewLink(id);

                if (result.data.message === 'Updated Successfully.') {
                    UserUtils.setItem('whatsNewDisplay', false);
                    this.setState({formChanged: true});
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    render() {
        const isWhatsNewEnabled = UserUtils.isWhatsNewEnabled();
        return (
            <Col
                className={
                    'headers headersDashboard marginBot10  isPad ' +
                    (window.location.href.indexOf('/lp') === -1 ? 'marginTop10' : '')
                }>
                <GoBackToAdmin {...this.state} />
                <Row className="rightHeader">
                    <div
                        className={
                            'whatsNewSectionHelpCenter ' +
                            (window.location.href.indexOf('/lp') === -1 ? 'dashboardWidth' : 'notDashboardWith')
                        }>
                        <WhatsNew
                            {...{
                                isWhatsNewEnabled,
                                goToWhatsNew: this.goToWhatsNew,
                            }}
                        />
                        <HelpCenter />
                    </div>
                    <UserProfile
                        {...{
                            profileImage,
                            editImage,
                            backImage,
                            handleClickOutSide: this.handleClickOutSide,
                            logout: this.logout,
                            ...this.state,
                        }}
                    />
                    <UserProfileTrigger
                        {...{
                            userDropdownList: this.userDropdownList,
                            userObj,
                            ...this.state,
                        }}
                    />
                    <Notifications toggleMenu={this.toggleMenu} notificationImage={notificationImage} {...this.state} />
                </Row>
                <SideBar visible={this.state.menuShow} toggleClose={this.toggleMenu} />
            </Col>
        );
    }
}

export default Header;
