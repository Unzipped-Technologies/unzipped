import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Modal, Row, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {Constants, NavigationUtils, SubscriptionUtils} from 'utils';
import {SubscriptionActions} from 'actions';
import Loader from 'components/Loader';
import {LpAPI} from 'services/endpoints';

class ReIssueModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: false,
        };
    }

    // ProgressLoader : toggle progress loader
    toggleLoader = show => {
        const {showLoader} = this.state;
        this.setState({
            showLoader: show || !showLoader,
        });
    };

    discardChanges = reload => () => {
        this.props.dispatch(
            SubscriptionActions.updateReissueData({openResignModal: false}, () => {
                //Revert modified changes in discard and reload the page.
                if (reload) {
                    setTimeout(() => {
                        window.location.reload();
                    });
                }
            }),
        );
    };

    saveFn = async isNavigate => {
        this.props.dispatch(SubscriptionActions.updateSubscriptionStatus(false));
        if (this.props.reIssue.page === Constants.SIG_PAGE) {
            if (this.props.reIssue.link && !isNavigate) {
                this.props.history.push(this.props.reIssue.link);
            } else {
                this.navigateToReview();
            }
            return;
        }
        this.toggleLoader(true);

        try {
            const result = await LpAPI.updateSubscriptionDetails(this.props.reIssue.data);

            if (result) {
                this.props.dispatch(
                    SubscriptionActions.getSubscriptionDetails(this.props.subscriptionData.id, res => {
                        if (res) {
                            if (this.props.reIssue.link && !isNavigate) {
                                this.toggleLoader(false);
                                this.props.history.push(this.props.reIssue.link);
                            } else {
                                this.toggleLoader(false);
                                if (this.props.subscriptionData.isOfflineInvestor) {
                                    NavigationUtils.reviewNavigation(this.props.subscriptionData);
                                } else if (SubscriptionUtils._isAllPagesValid(this.props, true) === true) {
                                    this.navigateToReview();
                                } else {
                                    this.props.dispatch(
                                        SubscriptionActions.updateReissueData(
                                            {
                                                openResignModal: false,
                                            },
                                            () => {
                                                this.props.dispatch(
                                                    SubscriptionActions.subscriptionError(
                                                        {
                                                            isModalError: true,
                                                            page: Constants.REVIEW_PAGE,
                                                            data: this.props.subscriptionData,
                                                            link: NavigationUtils.reviewNavigation(
                                                                this.props.subscriptionData,
                                                                true,
                                                            ),
                                                        },
                                                        () => {},
                                                    ),
                                                );
                                            },
                                        ),
                                    );
                                }
                            }
                        }
                    }),
                );
            }
        } catch {
            this.toggleLoader(false);
        }
    };

    navigateToReview = () => {
        this.props.dispatch(
            SubscriptionActions.updateReissueData({
                openResignModal: false,
                isFromResissueModal: true,
            }),
        );
        const link = NavigationUtils.reviewNavigation(this.props.subscriptionData);
        if (!this.props.subscriptionData.isOfflineInvestor) {
            this.props.history.push(link);
        }
    };

    render() {
        const {showLoader} = this.state,
            {
                reIssue: {openResignModal},
            } = this.props,
            buttonText = SubscriptionUtils._getResignButtonText(this.props.subscriptionData),
            isLargeText = [
                Constants.SAVE_NOTIFY_SIGNATORIES,
                Constants.SAVE_NOTIFY_LP,
                Constants.PROCEED_TRACKER,
            ].includes(buttonText);

        return (
            <>
                <Modal
                    id="subscriptionDelModal"
                    backdrop="static"
                    className="resubmitModal"
                    show={openResignModal}
                    onHide={this.discardChanges(false)}
                    dialogClassName="marginTop10">
                    <Modal.Header closeButton />
                    <Modal.Title></Modal.Title>
                    <Modal.Body>
                        <label className="title-md marginBot20 width100 mt-2">
                            {SubscriptionUtils._getResignText(this.props.subscriptionData)}
                        </label>
                        <Row className="marginTop30">
                            <Col lg={isLargeText ? 6 : 4} md={isLargeText ? 6 : 4} sm={6} xs={12} className="mb-3">
                                <Button
                                    type="button"
                                    className="fsnetSubmitButton btnEnabled btn-md discard-btn"
                                    onClick={this.discardChanges(true)}>
                                    {Constants.DISCARD_CHANGES}
                                </Button>
                            </Col>
                            <Col
                                lg={isLargeText ? 6 : 4}
                                md={isLargeText ? 6 : 4}
                                sm={6}
                                xs={12}
                                className="p-sm-0 mb-3">
                                <Button
                                    type="button"
                                    className="fsnetSubmitButton btnEnabled btn-md btn btn-default"
                                    onClick={() => this.saveFn(false)}>
                                    {Constants.SAVE_CONTINUE}
                                </Button>
                            </Col>
                            <Col lg={isLargeText ? 12 : 4} md={isLargeText ? 12 : 4} xs={12} className="mb-1 pr-sm-0">
                                <Button
                                    className="fsnetSubmitButton btn-md btnEnabled"
                                    onClick={() => this.saveFn(true)}>
                                    {buttonText}
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>
                <Loader isShow={showLoader}></Loader>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        subscriptionData: state.SubscriptionData.data,
        isCloseReadyStatus: state.SubscriptionData.isCloseReadyStatus,
        reIssue: state.SubscriptionData.reIssue,
        subscriptionError: state.SubscriptionData.subscriptionError,
    };
}

export default connect(mapStateToProps)(withRouter(ReIssueModal));
