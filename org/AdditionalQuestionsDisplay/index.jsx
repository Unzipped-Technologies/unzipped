import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {Constants, FSNetUtils} from 'utils';

class AdditionalQuestionsDisplay extends Component {
    getMultiChoiceAnswers = question => {
        let answers = [];
        let options = question.options;
        for (let response of question.questionResponse) {
            options.forEach(obj => {
                if (obj.id === response) {
                    answers.push(obj.optionName);
                }
            });
        }
        return answers.length ? answers.join(', ') : null;
    };

    render() {
        const routerPath = this.props.isCooley ? 'Investor' : 'lp';

        return (
            this.props.subscriptionData?.investorQuestions?.length > 0 && (
                <Row className="step6-row">
                    <Col md={2} sm={2} xs={6} className="step-col-pad step-col-pad1">
                        <span className="col1">{this.props.jsonData.ADDITIONAL_QUESTIONS}</span>
                    </Col>
                    <Col md={9} sm={9} xs={6} className="step-col-pad2">
                        {this.props.subscriptionData.investorQuestions.map((record, index) => {
                            return (
                                <Row key={index}>
                                    <Col md={7} sm={7} xs={7} className="step-col-pad3">
                                        <div>
                                            <span className="col2">{record['questionTitle']}:</span>
                                        </div>
                                    </Col>
                                    <Col md={5} sm={5} xs={5}>
                                        <div>
                                            {record['typeOfQuestion'] === 2 || record['typeOfQuestion'] === 3 ? (
                                                record['typeOfQuestion'] === 2 ? (
                                                    <span className="lightContent">
                                                        {parseInt(record['questionResponse']) === 1
                                                            ? 'True'
                                                            : parseInt(record['questionResponse']) === 0
                                                            ? 'False'
                                                            : ''}
                                                    </span>
                                                ) : (
                                                    <span className="lightContent">
                                                        {parseInt(record['questionResponse']) === 1
                                                            ? 'Yes'
                                                            : parseInt(record['questionResponse']) === 0
                                                            ? 'No'
                                                            : ''}
                                                    </span>
                                                )
                                            ) : record['typeOfQuestion'] === 4 ? (
                                                <span className="lightContent">
                                                    {this.getMultiChoiceAnswers(record)}
                                                </span>
                                            ) : (
                                                <span className="lightContent">{record['questionResponse']}</span>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            );
                        })}
                    </Col>

                    <Col
                        md={1}
                        sm={1}
                        xs={6}
                        className="step-col-pad4"
                        hidden={
                            FSNetUtils._getSubscriptionStatus(this.props.subscriptionData) ===
                            Constants.subscriptionStatus.closed
                        }>
                        <span className="col4 colm">
                            <Link
                                to={
                                    '/' +
                                    routerPath +
                                    '/additionalQuestions/' +
                                    FSNetUtils._encrypt(this.props.subscriptionData.id)
                                }>
                                {this.props.jsonData.CHANGE}
                            </Link>
                        </span>
                    </Col>
                </Row>
            )
        );
    }
}

export default AdditionalQuestionsDisplay;
