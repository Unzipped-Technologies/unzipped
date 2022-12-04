import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import PropTypes from 'prop-types';

const ButtonContainer = styled.div`
    display: inline-flex;
    flex-flow: row nowrap;
    align-items: stretch;
    text-align: right;
    & > * {
        margin-left: 10px;
        min-width: 107px;
    }
    & :first-child {
        margin-left: 0px;
    }
`;

const PreviousNextHeader = ({
    onBackClick,
    onNextClick,
    backText,
    nextText,
    backBtnDisabled,
    nextBtnDisabled,
    actionFrom,
    noPrimary,
}) => {
    return (
        <ButtonContainer>
            {onBackClick && (
                <Button
                    type="outline"
                    onClick={onBackClick}
                    data-testid={`${actionFrom}-previous-back-btn`}
                    disabled={backBtnDisabled}>
                    {backText}
                </Button>
            )}
            {onNextClick && (
                <Button
                    type={noPrimary ? 'outline' : 'default'}
                    onClick={onNextClick}
                    data-testid={`${actionFrom}-next-btn`}
                    disabled={nextBtnDisabled}>
                    {nextText}
                </Button>
            )}
        </ButtonContainer>
    );
};

PreviousNextHeader.propTypes = {
    /** Previous button click. If not provided, will hide previous button */
    onBackClick: PropTypes.func,
    /** Next button click. If not provided, will hide next button */
    onNextClick: PropTypes.func,
    /** Text for back button */
    backText: PropTypes.string,
    /** Text for next button */
    nextText: PropTypes.string,
    /** Is back button disabled */
    backBtnDisabled: PropTypes.bool,
    /** Is next button disabled */
    nextBtnDisabled: PropTypes.bool,
    /** Used in the data testId */
    actionFrom: PropTypes.string,
    /** Make both buttons look like secondary buttons */
    noPrimary: PropTypes.bool,
};

PreviousNextHeader.defaultProps = {
    onBackClick: null,
    onNextClick: null,
    backText: 'previous',
    nextText: 'next',
    backBtnDisabled: false,
    nextBtnDisabled: false,
    actionFrom: '',
    noPrimary: false,
};

export default PreviousNextHeader;
