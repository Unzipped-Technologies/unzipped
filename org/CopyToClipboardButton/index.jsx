import React, {useState} from 'react';
import styled from 'styled-components';

const LinkButton = styled.button`
    text-decoration: underline;
    font-size: ${props => props.theme.fontSizeS};
    color: #524ffb;
    margin: 0;
    padding: 0.75rem;
    background-color: transparent;
    border: none;

    :focus {
        outline: none;
    }
`;

const CopyToClipboardButton = ({targetRef, textBeforeCopy = 'Copy Text', textAfterCopy = 'Copied'}) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async event => {
        try {
            event.preventDefault();
            await navigator.clipboard.writeText(targetRef.current.innerText);
            setIsCopied(true);
        } catch (e) {
            setIsCopied(false);
        }
    };
    return <LinkButton onClick={copyToClipboard}>{isCopied ? textAfterCopy : textBeforeCopy}</LinkButton>;
};

export default CopyToClipboardButton;
