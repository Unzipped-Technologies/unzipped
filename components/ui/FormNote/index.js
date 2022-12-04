import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import theme from '../theme';

const FormNoteContainer = styled.div`
    background: ${props => props.colors.background};
    border-radius: 4px;
    color: ${props => props.colors.text};
    font-family: Arial, sans-serif;
    font-size: ${props => props.theme.baseFontSize};
    padding: 19px 18px;
    width: 100%;
    display: ${({$show}) => ($show ? 'flex' : 'none')};
    justify-content: space-between;
    line-height: ${props => props.theme.baseLineHeight};
    margin-top: ${({$marginTop}) => $marginTop && $marginTop + 'px'};
    margin-bottom: ${({marginBottom}) => marginBottom && marginBottom + 'px'};
`;

const IconWrapper = styled.div`
    cursor: pointer;
    display: ${({$show}) => ($show ? 'inherit' : 'none')};
    align-items: center;
`;

const typeColors = {
    default: {
        text: theme.secondary,
        background: theme.secondaryLight,
    },
    error: {
        text: theme.error,
        background: theme.errorLight,
    },
    green: {
        text: theme.green,
        background: theme.greenLight,
    },
    important: {
        text: theme.importantText,
        background: theme.importantLight,
    },
};

const FormNote = ({children, className, type, show, onHide, showCloseButton, marginBottom, marginTop}) => {
    const colors = typeColors[type] ? typeColors[type] : typeColors.default;
    return (
        <FormNoteContainer
            colors={colors}
            $show={show}
            className={className}
            marginBottom={marginBottom}
            $marginTop={marginTop}>
            <div>{children}</div>
            <IconWrapper onClick={onHide} $show={showCloseButton}>
                <Icon name="close" />
            </IconWrapper>
        </FormNoteContainer>
    );
};

FormNote.propTypes = {
    children: PropTypes.node,
    /** Styling of the FormNote: default, error, green or important */
    type: PropTypes.string,
    /** Whether to show the FormNote */
    show: PropTypes.bool,
    /** Function to hide the FormNote */
    onHide: PropTypes.func,
    /** Whether to show the close button */
    showCloseButton: PropTypes.bool,
    /** Adjustable number to add a margin bottom */
    marginBottom: PropTypes.number,
    /** Adjustable number to add to margin top */
    marginTop: PropTypes.number,
};

FormNote.defaultProps = {
    children: null,
    type: 'default',
    show: true,
    onHide: () => {},
    showCloseButton: false,
};

export default FormNote;
