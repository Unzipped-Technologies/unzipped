import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';

class BooleanLable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Row className={this.props.labelClass}>
                <Col md={7} sm={7} xs={7} className="step-col-pad3">
                    <div>
                        <span className="col2">{this.props.label}:</span>
                    </div>
                </Col>
                <Col md={5} sm={5} xs={5}>
                    <div>
                        <span className="lightContent">
                            {this.props.lableValue === 'N/A'
                                ? 'N/A'
                                : this.props.lableValue !== true
                                ? !this.props.type
                                    ? 'False'
                                    : 'No'
                                : !this.props.type
                                ? 'True'
                                : 'Yes'}
                        </span>
                    </div>
                </Col>
            </Row>
        );
    }
}

export default BooleanLable;
