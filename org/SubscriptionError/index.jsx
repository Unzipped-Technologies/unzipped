import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Constants, SubscriptionUtils} from 'utils';

class SubscriptionError extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getErrorData = () => {
        return SubscriptionUtils._getErrorKeys(this.props);
    };

    render() {
        return (
            <>
                {this.props.subscriptionError.isPage && this.getErrorData() && this.getErrorData().length > 0 && (
                    <div>
                        <h1 className="vanilla-note marginLeft30">Required fields are missing:</h1>
                        <ul>
                            {this.getErrorData().map((record, index) => {
                                return (
                                    <li className="vanilla-note marginLeft5" key={index}>
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
                    </div>
                )}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        subscriptionError: state.SubscriptionData.subscriptionError,
        subscriptionErrorJson: state.SubscriptionData.subscriptionErrorJson,
    };
}

export default connect(mapStateToProps)(SubscriptionError);
