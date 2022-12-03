import React, {Component} from 'react';
import './index.css';
import {Modal, Row, Col} from 'react-bootstrap';
import {ProfileAPI} from 'services/endpoints';
import Loader from 'components/Loader';
import letterImage from 'images/letter.svg';
import smartPhone from 'images/smartphone.svg';
import 'react-phone-number-input/style.css';
import {ConverterUtils, FundUtils, UserUtils} from 'utils';
import withAccessToken from 'components/withAccessToken';

class ProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lpNameProfileModal: false,
            data: {},
        };
    }

    componentDidMount() {
        this.getLpProfileData();
    }

    /**
     * @param {boolean} show
     */
    toggleModal = show => {
        this.setState({showModal: show});
    };

    getLpProfileData = () => {
        this.lpNameProfile(this.props.sendProfileData);
    };

    lpNameProfile = data => {
        this.getPublicProfile(data);
    };

    getPublicProfile = async user => {
        if (user) {
            this.toggleModal(true);

            try {
                const result = await ProfileAPI.getPublicProfile(user);

                this.toggleModal(false);
                if (result.data) {
                    this.setState({
                        lpProfileData: result.data.data,
                        lpNameProfileModal: true,
                    });
                }
            } catch {
                this.toggleModal(false);
            }
        } else {
            this.closeModal();
        }
    };

    // To close modal
    closeModal = () => {
        this.setState(
            {
                lpNameProfileModal: false,
            },
            () => {
                this.props.closingProfileModal(false);
            },
        );
    };

    render() {
        return (
            <>
                <Modal
                    id="lPNameProfileModal"
                    backdrop="static"
                    show={this.state.lpNameProfileModal}
                    onHide={this.closeModal}
                    dialogClassName="GPDelModalDialog fundModalDialog"
                    className="">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Title></Modal.Title>
                    {!!this.state.lpProfileData && (
                        <Modal.Body>
                            {!!this.state.lpProfileData['profilePic'] && (
                                <img
                                    src={this.props.addAccessTokenToUrl(this.state.lpProfileData.profilePic.url)}
                                    alt="img"
                                    className="profilePicLarge"
                                />
                            )}

                            {!this.state.lpProfileData['profilePic'] && (
                                <div className="custom-name-table inline-block profilePicLarge defaultProfilePicModal">
                                    {FundUtils._getCustomName(this.state.lpProfileData)}
                                </div>
                            )}
                            <div
                                className="profileNameModal ellipsis"
                                title={ConverterUtils.getFullName(this.state.lpProfileData)}>
                                {ConverterUtils.getFullName(this.state.lpProfileData)}
                            </div>
                            <div className="profileNameDelegate">
                                {UserUtils.getAccountTypeName(this.state.lpProfileData.accountType)}
                            </div>

                            <Row className="marginLpUserMail">
                                <Col lg={2} md={2} sm={2} xs={2}>
                                    <img alt="email" src={letterImage} className="marginRight15"></img>
                                </Col>
                                <Col lg={10} md={10} sm={10} xs={10} className="paddingLpUserMailId">
                                    <span className="LPUserMailId">{this.state.lpProfileData.email}</span>
                                </Col>
                            </Row>
                            {!!this.state.lpProfileData['cellNumber'] && (
                                <div className="marginLeft20">
                                    <img alt="mobile" src={smartPhone} className="marginLeft5 marginRight22"></img>
                                    <span className="LPUserMailId">{this.state.lpProfileData.cellNumber}</span>
                                </div>
                            )}
                        </Modal.Body>
                    )}
                </Modal>
                <Loader isShow={this.state.showModal}></Loader>
            </>
        );
    }
}

export default withAccessToken(ProfileModal);
