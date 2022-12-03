import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import close from '../../../images/close-gray.svg';

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    height: 100vh;
    width: 100%;
    display: ${props => (props.show ? 'block' : 'none')};
`;
const ModalContent = styled.div`
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 0.3rem;
    margin: auto;
    max-width: 750px;
    color: #304858;
`;
const ModalHeader = styled.div`
    padding: 1rem 1rem 0 1.5rem;
    margin-top: 20px;
    > h4 {
        font-weight: 700;
    }
`;
const ModalBody = styled.div`
    padding: 1rem 1.5rem;
    font-weight: 700;
`;
const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 20px;
    padding: 1rem;
`;
const Button = styled.button`
    border-style: none;
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
    font-size: ${props => props.theme.baseFontSize};
    border-radius: 0.25rem;
    line-height: 1.5;
    border: solid 1px transparent;
    &:focus {
        outline: none;
    }
`;
const PrimaryButton = styled(Button)`
    width: 40%;
    color: #fff;
    background-color: #524ffb;
    padding: 0.5rem 0.75rem;
`;
const SecondaryButton = styled(Button)`
    width: 40%;
    color: #2f4858;
    background-color: transparent;
    padding: 0.5rem 0.75rem;
    &:hover {
        border: 1px solid #000000;
    }
    display: ${props => (props.show ? 'block' : 'none')};
`;
const CloseButton = styled(Button)`
    position: absolute;
    right: 20px;
    top: 20px;
    background-color: transparent;
    font-size: ${props => props.theme.fontSizeS};
    padding: 0 0.375rem;
    color: #808080;
`;

const Modal = ({isVisible, header, primaryBtnText, secondaryBtnText, secondaryButton, children, onSubmit, onClose}) => {
    return (
        <ModalBackdrop role="dialog" show={isVisible}>
            <ModalContent>
                <ModalHeader>
                    <h4>{header}</h4>
                    <CloseButton data-testid="modal-close-btn" onClick={onClose}>
                        <img src={close} alt="close" />
                    </CloseButton>
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <SecondaryButton data-testid="modal-secondary-btn" onClick={onClose} show={secondaryButton}>
                        {secondaryBtnText}
                    </SecondaryButton>
                    <PrimaryButton data-testid="modal-primary-btn" onClick={onSubmit}>
                        {primaryBtnText}
                    </PrimaryButton>
                </ModalFooter>
            </ModalContent>
        </ModalBackdrop>
    );
};

export default Modal;

Modal.Proptypes = {
    isVisible: Proptypes.bool,
    header: Proptypes.string,
    primaryBtnText: Proptypes.string,
    secondaryBtnText: Proptypes.string,
    secondaryButton: Proptypes.bool,
    children: Proptypes.node,
    onSubmit: Proptypes.func.isRequired,
    onClose: Proptypes.func.isRequired,
};

Modal.defaultProps = {
    isVisible: false,
    header: '',
    primaryBtnText: 'OK',
    secondaryBtnText: 'Cancel',
    secondaryButton: false,
    children: null,
};
