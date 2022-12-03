import React, {Component} from 'react';
import {Constants} from 'utils';
import {Modal, Button} from 'react-bootstrap';

class DLMaintenanceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maintenanceModal: false,
        };
    }

    closeMaintenanceModal = () => {
        this.setState(
            {
                maintenanceModal: false,
            },
            () => {
                this.props.closeDLModal(true);
            },
        );
    };

    componentDidMount() {
        this.setState({
            maintenanceModal: true,
        });
    }

    render() {
        return (
            <>
                <Modal
                    backdrop="static"
                    show={this.state.maintenanceModal}
                    onHide={this.closeMaintenanceModal}
                    dialogClassName="investorForSign maintenanceSign">
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <label className="title-md marginBot12 width100">
                            {Constants.DLMAINTENANCE}
                            <a className="vanilla-href-color" href={'mailto:' + Constants.COOLEY_EMAIL}>
                                {Constants.COOLEY_EMAIL}
                            </a>
                            .
                        </label>
                        <div className="text-center marginTop10">
                            <Button
                                type="button"
                                className="fsnetSubmitButton btnEnabled width100Px"
                                onClick={this.closeMaintenanceModal}>
                                Ok
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default DLMaintenanceModal;
