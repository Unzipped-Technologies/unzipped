import React, {Component} from 'react';
import {Button, Col, FormControl, Row} from 'react-bootstrap';
import 'react-phone-number-input/style.css';

import {Constants} from 'utils';
import {FirmAPI, FSNetAuth, FSNetHTTP} from 'services/endpoints';

import Loader from 'components/Loader';
import './index.css';

class CreateVcFirmComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firmNameBorder: false,
            firmName: '',
            firmNameValid: false,
            firmNameMsz: '',
            firmFirstNameBorder: false,
            firmFirstName: '',
            firmFirstNameValid: false,
            firmFirstNameMsz: '',
            firmLastNameBorder: false,
            firmLastName: '',
            firmLastNameValid: false,
            firmLastNameMsz: '',
            emailBorder: false,
            email: '',
            emailValid: false,
            emailMsz: '',
            cellNumberBorder: false,
            cellNumber: '',
            cellNumberValid: false,
            cellNumberMsz: '',
            isFormValid: false,
            allowGPdelegatesToSign: null,
            isImporsonatingAllowed: null,
            isImporsonatingAllowedValid: false,
            allowGPdelegatesToSignValid: false,
            vcFirmError: '',
            jsonData: {},
            showHtml: false,
        };
    }

    componentDidMount() {
        if (FSNetAuth.isAdmin()) {
            this.getJsonData();
        } else {
            window.location.href = '/';
        }
    }

    async getJsonData() {
        const result = await FSNetHTTP.getJson();

        this.setState({
            jsonData: result.data,
            showHtml: true,
        });
    }

    redirectHome = () => {
        window.location.href = '/';
    };

    //Onchange event for all input text boxes.
    handleInputChangeEvent = (event, type) => {
        const value = event.target.value.trim();
        let dataObj = {};
        this.setState({
            vcFirmError: '',
        });
        switch (type) {
            case 'firmname':
                if (value === '' || value === undefined) {
                    this.setState({
                        firmNameMsz: Constants.FIRM_NAME_REQUIRED,
                        firmName: '',
                        firmNameBorder: true,
                        firmNameValid: false,
                    });
                    dataObj = {
                        firmNameValid: false,
                    };
                    this.updateStateParams(dataObj);
                } else {
                    this.setState({
                        firmNameMsz: '',
                        firmName: value,
                        firmNameBorder: false,
                        firmNameValid: true,
                    });
                    dataObj = {
                        firmNameValid: true,
                    };
                    this.updateStateParams(dataObj);
                }
                break;
            case 'firmFirstName':
                if (value === '' || value === undefined) {
                    this.setState({
                        firmFirstNameMsz: Constants.FIRST_NAME_REQUIRED,
                        firmFirstName: '',
                        firmFirstNameBorder: true,
                        firmFirstNameValid: false,
                    });
                    dataObj = {
                        firmFirstNameValid: false,
                    };
                    this.updateStateParams(dataObj);
                } else {
                    this.setState({
                        firmFirstNameMsz: '',
                        firmFirstName: value,
                        firmFirstNameBorder: false,
                        firmFirstNameValid: true,
                    });
                    dataObj = {
                        firmFirstNameValid: true,
                    };
                    this.updateStateParams(dataObj);
                }
                break;
            case 'firmLastName':
                if (value === '' || value === undefined) {
                    this.setState({
                        firmLastNameMsz: Constants.LAST_NAME_REQUIRED,
                        firmLastName: '',
                        firmLastNameBorder: true,
                        firmLastNameValid: false,
                    });
                    dataObj = {
                        firmLastNameValid: false,
                    };
                    this.updateStateParams(dataObj);
                } else {
                    this.setState({
                        firmLastNameMsz: '',
                        firmLastName: value,
                        firmLastNameBorder: false,
                        firmLastNameValid: true,
                    });
                    dataObj = {
                        firmLastNameValid: true,
                    };
                    this.updateStateParams(dataObj);
                }
                break;
            case 'email':
                if (value === '' || value === undefined) {
                    this.setState({
                        emailMsz: Constants.VALID_EMAIL,
                        email: '',
                        emailBorder: true,
                        emailValid: false,
                    });
                    dataObj = {
                        emailValid: false,
                    };
                    this.updateStateParams(dataObj);
                } else {
                    this.setState({
                        emailMsz: '',
                        email: value,
                        emailBorder: false,
                        emailValid: true,
                    });
                    dataObj = {
                        emailValid: true,
                    };
                    this.updateStateParams(dataObj);
                }
                break;
            case 'cellNumber':
                if (event === '' || event === undefined) {
                    this.setState({
                        cellNumberMsz: Constants.CELL_NUMBER_VALID,
                        cellNumber: '',
                        cellNumberBorder: true,
                        cellNumberValid: false,
                    });
                    dataObj = {
                        cellNumberValid: false,
                    };
                    this.updateStateParams(dataObj);
                } else {
                    this.setState({
                        cellNumberMsz: '',
                        cellNumber: event,
                        cellNumberBorder: false,
                        cellNumberValid: true,
                    });
                    dataObj = {
                        cellNumberValid: true,
                    };
                    this.updateStateParams(dataObj);
                }
                break;
            case 'allowGPdelegatesToSign':
                if (event === 'on') {
                    this.setState({
                        allowGPdelegatesToSign: 1,
                    });
                } else if (event === 'off') {
                    this.setState({
                        allowGPdelegatesToSign: 0,
                    });
                }
                dataObj = {
                    allowGPdelegatesToSignValid: true,
                };
                this.updateStateParams(dataObj);
                break;
            case 'isImporsonatingAllowed':
                if (event === 'on') {
                    this.setState({
                        isImporsonatingAllowed: 1,
                    });
                } else if (event === 'off') {
                    this.setState({
                        isImporsonatingAllowed: 0,
                    });
                }
                dataObj = {
                    isImporsonatingAllowedValid: true,
                };
                this.updateStateParams(dataObj);
                break;
            default:
                //Do Nothing
                break;
        }
    };

    // Update state params values and login button visibility

    updateStateParams(updatedDataObject) {
        this.setState(updatedDataObject, () => {
            this.enableDisableSubmitButton();
        });
    }

    // Enable / Disble functionality of Login Button

    enableDisableSubmitButton() {
        let status =
            this.state.firmNameValid &&
            this.state.firmFirstNameValid &&
            this.state.firmLastNameValid &&
            this.state.emailValid
                ? true
                : false;
        this.setState({
            isFormValid: status,
        });
    }

    /**
     * @param {boolean} show
     */
    toggleModal = show => {
        this.setState({showModal: show});
    };

    createVcFirmBtn = async () => {
        let postObj = {
            firmName: this.state.firmName,
            firstName: this.state.firmFirstName,
            lastName: this.state.firmLastName,
            email: this.state.email,
        };

        this.toggleModal(true);

        try {
            await FirmAPI.createVcFirm(postObj);

            this.toggleModal(false);
            this.props.history.push('fundsetup/funddetails');
        } catch (error) {
            this.toggleModal(false);
            if (
                error.response !== undefined &&
                error.response.data !== undefined &&
                error.response.data.errors !== undefined
            ) {
                this.setState({
                    vcFirmError: error.response.data.errors[0].msg,
                });
            } else {
                this.setState({
                    vcFirmError: Constants.INTERNAL_SERVER_ERROR,
                });
            }
        }
    };

    render() {
        return (
            <div id="addFirmContainer" hidden={!this.state.showHtml}>
                <Row className="addFirmRow">
                    <Row id="firm-header">
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className="firm-add">{this.state.jsonData.ADD_FIRM_TEXT}</div>
                        </Col>
                        <Col lg={6} md={6} sm={6} xs={6}>
                            <div className="firm-cancel">
                                <a href="/login">{this.state.jsonData.CANCEL_TEXT}</a>
                            </div>
                        </Col>
                    </Row>

                    <div className="topBorder"></div>
                    <div className="parentDiv">
                        <label className="label-header">{this.state.jsonData.FIRM_DETAILS}</label>
                        <div className="subText">{this.state.jsonData.FIRM_DETAILS_MESSAGE}</div>
                        <Row className="marginBot20">
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.FIRM_NAME_REQUIRED}</label>
                                <FormControl
                                    type="text"
                                    name="firmName"
                                    className={'inputFormControl ' + (this.state.firmNameBorder ? 'inputError' : '')}
                                    maxLength="200"
                                    placeholder={this.state.jsonData.ADD_FIRM_PLACEHOLDER}
                                    onChange={e => this.handleInputChangeEvent(e, 'firmname')}
                                    onBlur={e => this.handleInputChangeEvent(e, 'firmname')}
                                />
                                <span className="error">{this.state.firmNameMsz}</span>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className="width40"></Col>
                        </Row>
                        <label className="label-header">{this.state.jsonData.SIGNATORY_DETAILS}</label>
                        <div className="subText">{this.state.jsonData.FIRM_SIGNATORY_DETAILS}</div>
                        <Row className="marginBot20">
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.FIRST_NAME_REQUIRED}</label>
                                <FormControl
                                    type="text"
                                    name="firmFirstName"
                                    className={
                                        'inputFormControl ' + (this.state.firmFirstNameBorder ? 'inputError' : '')
                                    }
                                    maxLength="200"
                                    placeholder="Elisha"
                                    onChange={e => this.handleInputChangeEvent(e, 'firmFirstName')}
                                    onBlur={e => this.handleInputChangeEvent(e, 'firmFirstName')}
                                />
                                <span className="error">{this.state.firmFirstNameMsz}</span>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.LAST_NAME_REQUIRED}</label>
                                <FormControl
                                    type="text"
                                    name="firmLastName"
                                    className={
                                        'inputFormControl ' + (this.state.firmLastNameBorder ? 'inputError' : '')
                                    }
                                    maxLength="200"
                                    placeholder="Benedict"
                                    onChange={e => this.handleInputChangeEvent(e, 'firmLastName')}
                                    onBlur={e => this.handleInputChangeEvent(e, 'firmLastName')}
                                />
                                <span className="error">{this.state.firmLastNameMsz}</span>
                            </Col>
                        </Row>
                        <Row className="marginBot20">
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.PASSWORD_REQUIRED}</label>
                                <FormControl
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    className={'inputFormControl ' + (this.state.passwordBorder ? 'inputError' : '')}
                                />
                                <span className="error">{this.state.passwordMsz}</span>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.CNFRM_PASSWORD_REQUIRED}</label>
                                <FormControl
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    className={
                                        'inputFormControl ' + (this.state.cnfmPasswordBorder ? 'inputError' : '')
                                    }
                                />
                                <span className="error">{this.state.cnfrmPasswordMsz}</span>
                            </Col>
                        </Row>
                        <Row className="marginBot20">
                            <Col lg={6} md={6} sm={6} xs={12} className="width40">
                                <label className="label-text">{this.state.jsonData.EMAIL_ADDRESS_REQUIRED}</label>
                                <FormControl
                                    type="text"
                                    name="firmName"
                                    className={'inputFormControl ' + (this.state.emailBorder ? 'inputError' : '')}
                                    maxLength="200"
                                    placeholder="EBenedict@gmail.com"
                                    onChange={e => this.handleInputChangeEvent(e, 'email')}
                                    onBlur={e => this.handleInputChangeEvent(e, 'email')}
                                />
                                <span className="error">{this.state.emailMsz}</span>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} className="width40"></Col>
                        </Row>
                        <div className="error marginLeft15">{this.state.vcFirmError}</div>
                    </div>
                    <div className="topBorder"></div>
                    <div className="parentDiv">
                        <Button
                            className={'submitBtn ' + (this.state.isFormValid ? 'btnEnabled' : '')}
                            disabled={!this.state.isFormValid}
                            onClick={this.createVcFirmBtn}>
                            Submit
                        </Button>
                    </div>
                </Row>
                <Loader isShow={this.state.showModal}></Loader>
            </div>
        );
    }
}

export default CreateVcFirmComponent;
