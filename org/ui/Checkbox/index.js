import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'themes/default';
import FormError from 'components/ui/FormError';
import Icon from 'components/ui/Icon';

const CheckboxControl = styled.div`
    color: ${props => props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props => props.theme.baseFontSize};
    padding: 0 0;
    font-family: Arial, sans-serif;
    display: grid;
    grid-template-columns: ${props => `repeat(${props.columns}, 1fr);`};
    gap: 14px;
    height: ${({options}) => (options.length > 0 ? 'auto' : '18px')};
`;

/* The container */
const Container = styled.div`
    display: block;
    position: relative;
    padding-left: 28px;
    margin-bottom: 12px;
    line-height: ${props => props.theme.baseLineHeight};
    cursor: default;
    font-size: ${props => props.theme.baseFontSize};
    font-family: Arial, sans-serif;
    color: #54565b;
    font-weight: 500;
    font-style: normal;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    @media (max-width: 737px) {
        font-size: ${props => props.theme.fontSizeS} !important;
        padding-left: 24px;
    }
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }
    input:checked ~ .checkmark {
        background-color: transparent;
        height: 16.5px;
        width: 16.5px;
    }
    .checkmark:after {
        visibility: hidden;
    }
`;

const Text = styled.div`
    position: relative;
    bottom: 1px;
    @media (max-width: 737px) {
        bottom: 3px;
    }
`;

/* Create a custom checkbox */
const Checkmark = styled.span`
    position: ${props => (props.isMulti ? 'relative' : 'absolute')};
    top: 0;
    left: 0;
    height: 12.75px;
    width: 12.75px;
    border: transparent;
    border-radius: 6px;
    background-color: transparent;
    @media (max-width: 737px) {
        height: 10.75px;
        width: 10.75px;
    }
    :after {
        content: '';
        position: absolute;
        display: none;
    }
    svg {
        position: absolute;
        top: 1px;
        left: 1px;
        z-index: 10;
        @media (max-width: 737px) {
            height: 14px;
            width: 14px;
            left: 0.5px !important;
            bottom: -32px !important;
        }
    }
`;

const Check = ({
    id,
    name,
    option,
    checked,
    onChange,
    checkAll,
    disabled,
    checkSome,
    checkmarkAsHeader = false,
    ...rest
}) => {
    const iconName =
        checkSome & !checkmarkAsHeader
            ? 'checksome'
            : checkSome && checkmarkAsHeader
            ? 'check'
            : checkAll || checked
            ? 'check'
            : 'checkbox';
    return (
        // Since this the onClick on the container div, the event object doesnt contain much thats useful
        // so we pass the option value to onChange
        <div onClick={() => !disabled && onChange(option)}>
            <Text>{option}</Text>
            <input
                type="checkbox"
                id={id}
                name={name}
                value={option}
                checked={checkAll || checked}
                checkmarkasheader={checkmarkAsHeader ? checkmarkAsHeader : undefined}
                readOnly
            />
            <Checkmark
                className="checkmark"
                checked={checkAll || checked}
                checkmarkAsHeader={checkmarkAsHeader}
                isMulti={rest.isMulti}>
                <Icon name={iconName} style={{cursor: 'pointer'}} />
            </Checkmark>
        </div>
    );
};

/**
 * Bare Checkbox Component.
 */
const Checkbox = ({
    options,
    accepted,
    error,
    layout,
    name,
    onChange,
    checkAll,
    disabled,
    checked,
    selectedValues,
    checkSome,
    checkmarkAsHeader,
    ...rest
}) => {
    let border = theme.tint3;
    if (error) {
        border = theme.error;
    } else if (accepted) {
        border = theme.primary;
    }

    const optionElements = options.map(option => {
        const id = `${name}-${option}`;
        return (
            <Container key={id} className={rest.className}>
                <label htmlFor={id}>
                    <Check
                        checkSome={checkSome}
                        checked={checked || selectedValues.includes(option)}
                        option={option}
                        onChange={onChange}
                        checkAll={checkAll}
                        disabled={disabled}
                        isMulti={rest.isMulti}
                        checkmarkAsHeader={checkmarkAsHeader}
                    />
                </label>
            </Container>
        );
    });
    return (
        <>
            <CheckboxControl border={border} layout={layout} accepted={accepted} options={options} {...rest}>
                {optionElements}
            </CheckboxControl>
            {error && <FormError>{error}</FormError>}
        </>
    );
};

Checkbox.propTypes = {
    /** array of options for select */
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    /** If the value has been accepted */
    accepted: PropTypes.bool,
    /** Specify number of columns*/
    columns: PropTypes.number,
    /** If there is an error */
    error: PropTypes.string,
    /** Check All boxes */
    checkAll: PropTypes.bool,
    /** Lifting state for single checkbox usage */
    checked: PropTypes.bool,
    /** Lifting state for multiple checkbox usage */
    selectedValues: PropTypes.arrayOf(PropTypes.string),
    /** boolean to disable a checkbox */
    disabled: PropTypes.bool,
    /** Check Some boxes - used in a Check All checkbox */
    checkSome: PropTypes.bool,
    /** Handle change of the checkbox */
    onChange: PropTypes.func.isRequired,
    /** changes header in table to checkmark */
    checkmarkAsHeader: PropTypes.bool,
};

Checkbox.defaultProps = {
    options: [],
    accepted: false,
    error: null,
    columns: 1,
    checkAll: false,
    checkSome: false,
    checked: false,
    selectedValues: [],
    disabled: false,
};

export default Checkbox;
