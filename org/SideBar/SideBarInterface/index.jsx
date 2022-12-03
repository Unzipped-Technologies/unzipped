import htmlParse from 'html-react-parser';
import React from 'react';
import {Button, Col, Modal, Row} from 'react-bootstrap';
import closeSmall from 'images/close-small.svg';
import icon from 'images/icon.svg';
import info from 'images/info_alerts.svg';
import {ConverterUtils, UserUtils} from 'utils';
import Loader from 'components/Loader';
import '../index.css';

const SidebarInterface = ({
    alertObj,
    dismissAlert,
    alertHeight,
    allAlertsList,
    dismissAllAlerts,
    closeAlertModal,
    navigate,
    switchRoleModal,
    closeSwitchRoleModal,
    showModal,
    visible,
    switchUserRole,
}) => (
    <div>
        <div className={'notificationOverlay ' + (visible ? 'show' : 'hide')} />

        <Row className={'notificationContainer ' + (visible ? 'show' : 'hide')}>
            <Row className="header">
                <Col xs={10} sm={10} md={10} className="title">
                    Alerts
                </Col>

                <Col xs={2} sm={2} md={2} className="title closeAlert" onClick={closeAlertModal}>
                    <img src={icon} alt="home_image" className="" />
                </Col>

                <div className="dismissAll" hidden={allAlertsList.length === 0} onClick={dismissAllAlerts}>
                    Dismiss All
                </div>
            </Row>

            <Row className="alerts-section" id="user-alert" style={{height: alertHeight + 'px'}}>
                {allAlertsList.length > 0 &&
                    allAlertsList.map((record, index) => (
                        <Row className="alert-row" key={index}>
                            <Col xs={2} sm={2} md={2}>
                                <img src={info} alt="home_image" className="alert-home-image" />
                            </Col>

                            <Col xs={7} sm={7} md={7} className="alertPaddingLeft">
                                <Row>
                                    {record.notification && (
                                        <div onClick={navigate(record)} className="alert-text alertTextWidth">
                                            {htmlParse(record.notification.htmlMessage)}
                                        </div>
                                    )}
                                </Row>
                            </Col>

                            <Col xs={3} sm={3} md={3} className="paddingZero">
                                <Row>
                                    <div className="date">
                                        {ConverterUtils.convertDate(
                                            ConverterUtils.utcDateToLocalTimezoneWithoutFormat(record.createdAt),
                                        )}
                                    </div>

                                    <div className="date alertWidth">
                                        <div className="dismiss">
                                            <img
                                                src={closeSmall}
                                                alt="home_image"
                                                onClick={e => dismissAlert(e, {record})}
                                            />
                                        </div>
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    ))}

                {allAlertsList.length === 0 && <div className="title marginTop50 text-center width100">No Alerts</div>}
            </Row>
        </Row>

        <Modal
            id="confirmFundModal"
            show={switchRoleModal}
            onHide={closeSwitchRoleModal}
            dialogClassName="confirmFundDialog">
            <Modal.Header className="headerNone" closeButton />

            <Modal.Body>
                <div className="title-md ulpoadSignText">
                    The link which you have clicked is related to your role as a{' '}
                    {UserUtils.getAccountTypeName(alertObj.accountType)}. Do you want to switch to this role?
                </div>

                <Row className="fundBtnRow">
                    <Col lg={6} md={6} sm={6} xs={12} className="text-right">
                        <Button type="button" className="fsnetCancelButton" onClick={closeSwitchRoleModal}>
                            Cancel
                        </Button>
                    </Col>

                    <Col lg={6} md={6} sm={6} xs={12}>
                        <Button
                            type="button"
                            className="fsnetSubmitButton btnEnabled width200"
                            onClick={switchUserRole}>
                            Proceed
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>

        <Loader isShow={showModal} />
    </div>
);

export default SidebarInterface;
