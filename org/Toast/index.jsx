import React, {Component} from 'react';
import './index.css';
import {Alert} from 'react-bootstrap';
import {PubSub} from 'pubsub-js';
import removeWhite from 'images/removeWhite.svg';

class Toast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showToast: false,
            toastMessage: 'Test',
            toastType: 'success',
        };
    }

    componentWillReceiveProps() {
        this.setState({
            showToast: this.props.showToast,
            toastMessage: this.props.toastMessage,
            toastType: 'success',
        });
    }

    handleDismiss = () => {
        PubSub.publish('closeToast', {timed: false});
    };

    render() {
        if (this.props.showToast) {
            PubSub.publish('closeToast', {timed: true});
        }
        return (
            <div>
                {this.props.showToast ? (
                    <Alert bsStyle={this.props.toastType}>
                        <p>
                            <span>{this.props.toastMessage}</span>
                            <img alt="close" className="close" src={removeWhite} onClick={this.props.onClick} />
                        </p>
                    </Alert>
                ) : null}
            </div>
        );
    }
}

export default Toast;
