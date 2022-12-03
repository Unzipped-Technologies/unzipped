import React, {Component} from 'react';
import {Alert} from 'react-bootstrap';

import 'components/Toast/index.css';
import errorWhite from 'images/error.svg';
import removeWhite from 'images/removeWhite.svg';

class UserExists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
        };
    }

    handleDismiss = () => {
        this.setState(
            {
                showToast: false,
            },
            () => {
                this.props.closeUserExists(true);
            },
        );
    };

    componentDidMount() {
        this.setState({
            showToast: true,
        });
    }

    render() {
        return (
            <>
                {this.state.showToast && (
                    <Alert bsStyle="success">
                        <p>
                            <img alt="icon" className="success" src={errorWhite} />
                            <span>
                                A user with the email address you entered already exists. Their existing profile
                                information will be used.
                            </span>
                            <img alt="close" className="close" src={removeWhite} onClick={this.handleDismiss} />
                        </p>
                    </Alert>
                )}
            </>
        );
    }
}

export default UserExists;
