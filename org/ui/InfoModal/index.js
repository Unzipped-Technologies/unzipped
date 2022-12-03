import React, {useState} from 'react';
import Modal from 'components/ui/Modal';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalLink = styled.span`
    color: ${props => props.theme.secondary};
    text-decoration: underline;
    &:hover {
        cursor: pointer;
    }
`;

const InfoModal = ({heading, children, textLink}) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <ModalLink role="button" tabindex="0" onClick={() => setShow(true)}>
                {textLink}
            </ModalLink>
            {show && (
                <Modal heading={heading} onHide={() => setShow(false)}>
                    {children}
                </Modal>
            )}
        </>
    );
};

InfoModal.propTypes = {
    /** Link To Display Modal */
    textLink: PropTypes.string,
    /** Heading of Modal */
    heading: PropTypes.string,
    /** Content of Modal */
    children: PropTypes.node,
};

InfoModal.defaultProps = {
    textLink: null,
    heading: null,
    children: null,
};

export default InfoModal;
