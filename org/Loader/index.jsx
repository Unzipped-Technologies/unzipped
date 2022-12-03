import React, {Component} from 'react';
import './index.css';
import {loader} from 'images/loader.gif';
import {Modal, Image} from 'react-bootstrap';

class Loader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: this.props.isShow || false,
        };
    }

    // Close progress loader
    closeLoader = () => {
        this.setState({
            showModal: false,
        });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.isShow !== undefined) {
            this.setState({
                showModal: nextProps.isShow,
            });
        }
    }

    render() {
        return (
            <Modal id="modalone" show={this.state.showModal} onHide={this.closeLoader} backdrop={'static'}>
                <Modal.Body className="mymodal">
                    <Image src={loader} />
                </Modal.Body>
            </Modal>
        );
    }
}

export default Loader;
