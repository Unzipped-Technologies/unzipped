import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {Constants, SubscriptionUtils} from 'utils';
import {SubscriptionActions} from 'actions';

class SubscriptionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    closeErrorModal = () => {
        this.props.dispatch(
            SubscriptionActions.subscriptionError(
                {
                    isModalError: false,
                    ispage: false,
                    link: this.props.subscriptionError.link,
                    data: this.props.subscriptionError.data,
                    page: this.props.subscriptionError.page,
                },
                () => {},
            ),
        );
    };

    getErrorData = () => {
        return SubscriptionUtils._getErrorKeys(this.props);
    };

    checkCloseReady = link => {
        const {isCloseReadyStatus, reIssue} = this.props;
        const {isFormChanged} = reIssue;
        // Dont save in autosave for close ready status
        if (isCloseReadyStatus) {
            if (!isFormChanged || reIssue.page === Constants.REVIEW_PAGE) {
                this.props.dispatch(
                    SubscriptionActions.subscriptionError(
                        {
                            isModalError: false,
                            ispage: false,
                            data: null,
                            page: null,
                        },
                        () => {},
                    ),
                );
                this.props.history.push(link);
            } else {
                this.props.dispatch(
                    SubscriptionActions.subscriptionError(
                        {
                            ...this.props.subscriptionError,
                            isModalError: false,
                        },
                        () => {},
                    ),
                );
                this.props.dispatch(
                    SubscriptionActions.updateReissueData({
                        link,
                        openResignModal: true,
                    }),
                );
            }
            return;
        }
        this.props.dispatch(
            SubscriptionActions.subscriptionError(
                {isModalError: false, ispage: false, data: null, page: null},
                () => {},
            ),
        );
        this.props.history.push(link);
    };

    navigatePage = () => {
        if (this.props.subscriptionError.link) {
            const {page, link} = this.props.subscriptionError || {};
            if (page && page === Constants.INVESTOR_INFO_PAGE) {
                this.props.dispatch(
                    SubscriptionActions.subscriptionError(
                        {
                            ...this.props.subscriptionError,
                            isModalError: false,
                        },
                        () => {},
                    ),
                );
                this.props.dispatch(
                    SubscriptionActions.confirmInvestor({
                        fromInvestorInfo: true,
                        link,
                    }),
                );
            } else {
                this.checkCloseReady(link);
            }
        }
    };

    render() {
        return (
            <>
                <Modal
                    id="restoreModal"
                    backdrop="static"
                    show={this.props.subscriptionError.isModalError}
                    onHide={this.closeErrorModal}
                    dialogClassName="delteFundDocDailog">
                    <Modal.Header className="headerNone" closeButton></Modal.Header>
                    <Modal.Title className="title titleModal errorColor"></Modal.Title>
                    <Modal.Body className="paddingTopNone">
                        <h1 className="vanilla-note font14">Required fields are missing:</h1>
                        <div className="errorMessages">
                            {this.getErrorData() && this.getErrorData().length > 0 && (
                                <ul className="paddingLeft17">
                                    {this.getErrorData().map((record, index) => {
                                        return (
                                            <li className="vanilla-note font14" key={index}>
                                                {this.props.subscriptionError.page === Constants.QUESTIONS_PAGE
                                                    ? Constants.QUESTION_ERROR_TEXT + record
                                                    : this.props.subscriptionErrorJson[record] &&
                                                      this.props.subscriptionErrorJson[record]['name']
                                                    ? this.props.subscriptionErrorJson[record]['name']
                                                    : Constants.QUESTION_ERROR_TEXT + record}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Row className="marginZero">
                            <Col lg={6} md={6} sm={6}>
                                <Button className="fsnetCancelButton fontFamilyBold" onClick={this.closeErrorModal}>
                                    Cancel
                                </Button>
                            </Col>
                            <Col lg={6} md={6} sm={6} className="paddingRight8 paddingLeft10">
                                <Button className="fsnetSubmitButton btnEnabled" onClick={this.navigatePage}>
                                    Proceed
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        subscriptionError: state.SubscriptionData.subscriptionError,
        subscriptionErrorJson: state.SubscriptionData.subscriptionErrorJson,
        reIssue: state.SubscriptionData.reIssue,
        isCloseReadyStatus: state.SubscriptionData.isCloseReadyStatus,
    };
}

export default connect(mapStateToProps)(withRouter(SubscriptionModal));
