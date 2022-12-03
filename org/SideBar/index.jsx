import {PubSub} from 'pubsub-js';
import React, {Component} from 'react';
import {AccountAPI, NotificationAPI} from 'services/endpoints';
import {Constants, ConverterUtils, FSNetUtils, UserUtils} from 'utils';
import './index.css';
import SideBarInterface from './SideBarInterface';

let alertHeight = '';
let userObj = {};

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allAlertsList: [],
            alertCount: 0,
            alertObj: {},
            showModal: false,
            switchRoleModal: false,
        };
    }

    closeAlertModal = () => {
        this.props.toggleClose(this.state.alertCount);
    };

    componentDidMount() {
        //Get user obj from local storage.
        userObj = UserUtils.getUserData();
        this.getAllAlerts(userObj.id);
    }

    /**
     * @param {boolean} show
     */
    toggleModal = show => {
        this.setState({showModal: show});
    };

    getAllAlerts = async id => {
        if (id) {
            const result = await NotificationAPI.getAllAlerts(id);

            this.setState(
                {
                    allAlertsList: result.data.data,
                    alertCount: result.data.data.length,
                },
                () => {
                    this.modifyAlertList();
                    if (this.state.allAlertsList.length > 0) {
                        alertHeight = window.innerHeight - 100;
                    }
                },
            );
        }
    };

    navigate = data => event => {
        if (event.target.nodeName === 'A') {
            this.setState(
                {
                    alertObj: data,
                },
                () => {
                    if (!data.accountType || UserUtils.getUserAccountType() === data.accountType) {
                        this.generateAlertLink(data);
                    } else {
                        this.openSwitchRoleModal();
                    }
                },
            );
        }
    };

    generateAlertLink = (data = {}) => {
        const type =
            this.state.alertObj.notification && this.state.alertObj.notification.type
                ? this.state.alertObj.notification.type
                : null;
        const docType =
            this.state.alertObj.notification && this.state.alertObj.notification.docType
                ? this.state.alertObj.notification.docType
                : null;
        if (type === 'FUND_INVITED') {
            window.location.href = UserUtils.getUserDefaultDashboard();
        } else if (type === 'FUND_SIGNATURE') {
            if (data.isCooleyFirm) {
                window.location.href = `/Investor/review/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            } else {
                window.location.href = `/lp/review/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            }
        } else if (type === 'FUND_APPROVE') {
            if (data.isCooleyFirm) {
                window.location.href = `/Investor/pendingActions/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            } else {
                window.location.href = `/lp/pendingActions/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            }
        } else if (['CHANGE_COMMITMENT_AGREEMENT', 'SIDE_LETTER_AGREEMENT'].includes(docType)) {
            if (UserUtils.getUserAccountType() === Constants.accountType.lp) {
                window.location.href = `/${data.isCooleyFirm ? 'Investor' : 'lp'}/review/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}&envelope_id=${FSNetUtils._encrypt(this.state.alertObj['notification']['documentId'])}&type=${
                    this.state.alertObj['notification']['docType']
                }&id=${FSNetUtils._encrypt(this.state.alertObj['notification']['subscriptionId'])}`;
            } else {
                window.location.href = `/fund/view/${FSNetUtils._encrypt(
                    this.state.alertObj['notification']['fundId'],
                )}&envelope_id=${FSNetUtils._encrypt(this.state.alertObj['notification']['documentId'])}&type=${
                    this.state.alertObj['notification']['docType']
                }&id=${FSNetUtils._encrypt(this.state.alertObj['notification']['subscriptionId'])}`;
            }
        } else if (type === 'MANAGE_TAX') {
            if (data.isCooleyFirm) {
                window.location.href = `/Investor/taxReporting/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            } else {
                window.location.href = `/lp/taxReporting/${FSNetUtils._encrypt(
                    this.state.alertObj.notification.subscriptionId,
                )}`;
            }
        } else {
            if (UserUtils.getUserAccountType() === Constants.accountType.lp) {
                if (data.isCooleyFirm) {
                    window.location.href = `/Investor/review/${FSNetUtils._encrypt(
                        this.state.alertObj.notification.subscriptionId,
                    )}`;
                } else {
                    window.location.href = `/lp/review/${FSNetUtils._encrypt(
                        this.state.alertObj.notification.subscriptionId,
                    )}`;
                }
            } else {
                window.location.href = `/fund/view/${FSNetUtils._encrypt(
                    this.state.alertObj['notification']['fundId'],
                )}`;
            }
        }
    };

    switchUserRole = async () => {
        this.toggleModal(true);
        const postObj = {userId: this.state.alertObj.toUserId};

        try {
            const result = await AccountAPI.switch(postObj);

            UserUtils.userSetData(result.data);
            setTimeout(() => {
                this.toggleModal(false);
                this.generateAlertLink();
                this.closeSwitchRoleModal();
            }, 100);
        } catch (error) {
            this.toggleModal(false);
        }
    };

    closeSwitchRoleModal = () => {
        this.setState({switchRoleModal: false, alertObj: {}});
    };

    openSwitchRoleModal = () => {
        this.setState({switchRoleModal: true}, () => {
            this.closeAlertModal();
        });
    };

    modifyAlertList = () => {
        let list = this.state.allAlertsList;
        for (let index of list) {
            let message = index['notification']['htmlMessage'] ? index['notification']['htmlMessage'] : null;
            if (message) {
                if (message.indexOf('[GPName]') !== -1) {
                    message = message.replace(
                        '[GPName]',
                        index['notification']['gpName']
                            ? index['notification']['gpName']
                            : ConverterUtils.getFullName(index['notification']),
                    );
                }

                if (message.indexOf('[LPName]') !== -1) {
                    message = message.replace(
                        '[LPName]',
                        index['notification']['lpName']
                            ? this.htmlEncodeEntities(index['notification']['lpName'])
                            : ConverterUtils.getFullName(index['notification']),
                    );
                }

                if (message.indexOf('[numberOfexistingOrProspectives]') !== -1) {
                    message = message.replace(
                        '[numberOfexistingOrProspectives]',
                        index['notification']['numberOfexistingOrProspectives'],
                    );
                }

                if (message.indexOf('[fundName]') !== -1) {
                    message = message.replace('[fundName]', index['notification']['fundName']);
                }

                if (message.indexOf('[fundManagerCommonName]') !== -1) {
                    message = message.replace(
                        '[fundManagerCommonName]',
                        index['notification']['fundManagerCommonName'],
                    );
                }

                if (message.indexOf('[fundManager]') !== -1) {
                    message = message.replace('[fundManager]', index['notification']['fundManager']);
                }

                if (message.indexOf('[docType]') !== -1) {
                    message = message.replace('[docType]', index['notification']['docType']);
                }

                if (message.indexOf('[fundCommonName]') !== -1) {
                    message = message.replace('[fundCommonName]', index['notification']['fundCommonName']);
                }

                if (message.indexOf('[CapitalCommitmentAccepted]') !== -1) {
                    message = message.replace(
                        '[CapitalCommitmentAccepted]',
                        index['notification']['CapitalCommitmentAccepted']
                            ? index['notification']['CapitalCommitmentAccepted']
                            : index['notification']['capitalCommitmentAccepted'],
                    );
                }

                if (message.indexOf('[DelegateName]') !== -1) {
                    message = message.replace('[DelegateName]', index['notification']['delegateName']);
                }

                if (message.indexOf('[CapitalCommitmentOfferedAmount]') !== -1) {
                    message = message.replace(
                        '[CapitalCommitmentOfferedAmount]',
                        index['notification']['CapitalCommitmentOfferedAmount']
                            ? index['notification']['CapitalCommitmentOfferedAmount']
                            : index['notification']['capitalCommitmentOfferedAmount'],
                    );
                }

                if (message.indexOf('[VanillaLink]') !== -1) {
                    message = message.replace('[VanillaLink]', '<a>Click Here</a>');
                }

                if (message.indexOf('[approve]') !== -1) {
                    message = message.replace('[approve]', '<a>Approve</a>');
                }

                if (message.indexOf('[FundCommonName]') !== -1) {
                    if (
                        index.notification?.docType === 'CHANGE_COMMITMENT_AGREEMENT' &&
                        index.notification.message.includes('cancelled')
                    ) {
                        message = message.replace('[FundCommonName]', `${index['notification']['fundName']}`);
                    } else {
                        message = message.replace('[FundCommonName]', `<a>${index['notification']['fundName']}</a>`);
                    }
                }

                if (message.indexOf('[visit]') !== -1) {
                    message = message.replace('[visit]', '<a>visit</a>');
                }

                if (message.indexOf('[counter-sign]') !== -1) {
                    message = message.replace('[counter-sign]', '<a>sign</a>');
                }

                if (message.indexOf('[investorName]') !== -1) {
                    message = message.replace('[investorName]', index['notification']['investorName']);
                }

                if (message.indexOf('[documentName]') !== -1) {
                    message = message.replace('[documentName]', `<a>${index['notification']['documentName']}</a>`);
                }

                if (message.indexOf('[InvestmentName]') !== -1) {
                    message = message.replace('[InvestmentName]', `<a>${index['notification']['InvestmentName']}</a>`);
                }
            }

            index['notification']['htmlMessage'] = message;
        }

        this.setState({allAlertsList: list});
    };

    htmlEncodeEntities = str => {
        return String(str).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"', '&quot;');
    };

    htmlDecodeEntities = str => {
        return String(str)
            .replace('&amp;', '&')
            .replace('&lt;', '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"');
    };

    dismissAllAlerts = async () => {
        await NotificationAPI.dismissAllAlerts();

        this.setState({
            allAlertsList: [],
            alertCount: 0,
        });
        PubSub.publish('alertCount', true);
    };

    dismissAlert = async (e, data) => {
        if (data.record.id) {
            let postobj = {notificationId: data.record.id, isRead: true};

            await NotificationAPI.dismissAlert(postobj);

            let alertsList = this.state.allAlertsList.filter(alert => alert.id !== data.record.id);

            this.setState({
                allAlertsList: alertsList,
                alertCount: alertsList.length,
            });

            PubSub.publish('alertCount', true);
        }
    };

    render() {
        const config = {
            ...this.state,
            alertHeight,
            visible: this.props.visible,
            dismissAlert: this.dismissAlert,
            dismissAllAlerts: this.dismissAllAlerts,
            closeAlertModal: this.closeAlertModal,
            navigate: this.navigate,
            closeSwitchRoleModal: this.closeSwitchRoleModal,
            switchUserRole: this.switchUserRole,
        };
        return <SideBarInterface {...config} />;
    }
}

export default Sidebar;
