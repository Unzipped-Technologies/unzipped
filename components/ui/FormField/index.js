import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Select from '../Select';
import Radio from '../Radio';
import Checkbox from '../Checkbox';
import Input from '../Input';
import PhoneNumberInput from '../PhoneNumberInput';
import PropTypes from 'prop-types';
import FormLabel from '../FormLabel';

const types = {
    radio: Radio,
    checkbox: Checkbox,
    input: Input,
    phoneNumberInput: PhoneNumberInput,
    select: Select,
};

const FormFieldContainer = styled.div`
    vertical-align: top;
    width: 100%;
    z-index: 10;
    color: ${props => props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
    line-height: ${props => props.theme.baseLineHeight};
    font-family: arial;
    display: ${props => (props.$inline ? 'inline-block' : 'block')};
    max-width: ${props => props.maxWidth};
    padding-bottom: ${({$bottom}) => $bottom};
    position: relative;
    & > label:first-of-type {
        // Override menlo styling here, line 659
        // src/pages/Dashboard/index.scss
        // label { margin-bottom: 0 !important; }
        margin-bottom: 14px !important;
    }
    & > label {
        width: 100%;
    }
`;

/**
 * Form Field Component. Handles the presentation of an entire form field, including label and the control. Holds error state of the field.
 */
const FormField = ({
    className,
    fieldType,
    required,
    inline,
    error,
    children,
    name,
    help,
    bottom,
    requiredError,
    validate,
    disabled,
    onBlur,
    maxWidth,
    modalSelect,
    currency,
    onChange,
    onFocus,
    fontSize = '',
    ...rest
}) => {
    const Control = types[fieldType];
    const [currentError, setCurrentError] = useState(error);
    const handleBlur = e => {
        const value = e?.label || e?.target?.value || e?.value || null;
        if (required && (!value || !validate(value))) {
            setCurrentError(requiredError);
        } else {
            if (!value || !validate(value)) {
                setCurrentError(error);
            } else {
                setCurrentError(null)
            }
        }
        onBlur && onBlur(e);
    };
    if (disabled && currentError) {
        setCurrentError('');
    }
    const onInputChange = e => {
        const value = fieldType === 'select' ? e.value : e.target.value;
        onChange && onChange(e);

        if (!required || (value && validate(value))) {
            setCurrentError(null);
        }
    };

    const handleFocus = e => {
        return onFocus && onFocus(e);
    };

    useEffect(() => {
        setCurrentError(error);
    }, [error]);

    return (
        <FormFieldContainer className={className} $inline={inline} $bottom={bottom} maxWidth={maxWidth}>
            {children && (
                <FormLabel forId={name} fontSize={fontSize} help={help} required={required}>
                    {children}
                </FormLabel>
            )}
            <Control
                onBlur={handleBlur}
                error={currentError}
                name={name}
                id={name}
                fontSize={fontSize}
                disabled={disabled}
                $modalSelect={modalSelect}
                currency={currency}
                onChange={fieldType === 'input' || fieldType === 'select' ? onInputChange : onChange}
                onFocus={handleFocus}
                {...rest}
            />
        </FormFieldContainer>
    );
};

FormField.propTypes = {
    /** The type of field this is: select, radio, input, phoneNumberInput, checkbox, datetime */
    fieldType: PropTypes.string.isRequired,
    /** Show field as inline */
    inline: PropTypes.bool,
    /** Is this field required */
    required: PropTypes.bool,
    /** Children the component contains */
    children: PropTypes.node,
    /** If there is an error */
    error: PropTypes.string,
    /** The message to show for a required error */
    requiredError: PropTypes.string,
    /** Unique name for this field */
    name: PropTypes.string,
    /** Help tooltip text */
    help: PropTypes.string,
    /** Validate the input. Returns true if input is valid. */
    validate: PropTypes.func,
    /** Function to call on blur of Control */
    onBlur: PropTypes.func,
    /** Format input as currency */
    currency: PropTypes.bool,
    /** Bottom Padding */
    bottom: PropTypes.string,
    /** If the field is a select and will be used in a modal */
    modalSelect: PropTypes.bool,
    /** On change of the FormField */
    onChange: PropTypes.func,
    /** maxWidth for FormFieldContainer */
    maxWidth: PropTypes.string,
    /** Additional classNames, supports styled-components  */
    className: PropTypes.string,
    /** Function to call on blur of Control */
    onFocus: PropTypes.func,
    /** String to override the base font size */
    fontSize: PropTypes.string,
};

FormField.defaultProps = {
    required: false,
    inline: false,
    children: null,
    error: null,
    requiredError: 'This field is required.',
    name: null,
    help: null,
    validate: () => true,
    onBlur: null,
    currency: false,
    bottom: '0px',
    modalSelect: false,
    onChange: () => {},
    maxWidth: 'none',
    onFocus: () => {},
};

export default FormField;
