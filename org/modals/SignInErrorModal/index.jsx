import React, {useState, useEffect} from 'react';
import GenericModal from '../GenericModal';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';

export const ContactLink = styled.a`
    text-decoration: underline;
    color: #5046ff;
    &:hover {
        color: #0a2264;
    }
`;

const errorMessages = {
    default:
        'The application has encountered an unexpected error. Vanilla is unable to sign you in. Please refresh and try again in a few minutes.',
    networkError:
        'The application has encountered an unexpected server error. Please refresh and try again in a few minutes.',
};

const SignInErrorModal = () => {
    const history = useHistory();
    const [message, setMessage] = useState(errorMessages.default);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const closeModal = () => setShowErrorModal(false);

    useEffect(() => {
        setShowErrorModal(history.location.state && history.location.state.loginError);
        if (history.location.state && history.location.state.errorType) {
            setMessage(errorMessages[history.location.state.errorType] || errorMessages.default);
        }
    }, [history.location.state]);

    return (
        <GenericModal
            header="Unable to Sign In"
            isVisible={showErrorModal}
            alignFooter={'flex-end'}
            onClose={closeModal}
            onSubmit={closeModal}>
            <p>{message}</p>
            <p>
                If you have any questions, you can{' '}
                <ContactLink href="mailto:vanillavc@cooley.com">contact Vanilla Support</ContactLink>.
            </p>
        </GenericModal>
    );
};

export default SignInErrorModal;
