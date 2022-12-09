import React from 'react';
import {FormError} from '../';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';

const Bullet = styled.div`
    color: ${props => (props.error ? props.theme.error : props.accepted ? props.theme.primary : props.theme.tint5)};
    font-size: ${props => props.theme.fontSizeL};
    display: inline-block;
    align-items: center;
    position: absolute;
    right: 0;
    padding: 13px 20px 0 0;
`;

const BulletContainer = styled.div`
    display: flex;
`;

const StyledPhoneInput = styled(PhoneInput)`
    font-weight: 400;
    font-size: ${props => props.theme.fontSizeL};
    padding: 12px 11px;
    font-family: arial;
    border: 2px solid
        ${props => (props.error ? props.theme.error : props.$accepted ? props.theme.primary : props.theme.border)};
    box-sizing: border-box;
    border-radius: 4px;
    min-width: 360px;
    max-width: 100%;
    width: calc(100% + 0.3rem * 4 * 2);
    background-color: ${props => (props.disabled ? props.theme.tint4 : props.theme.tint5)};
    margin-bottom: 0;

    .PhoneInputInput {
        border: 0;
        font-size: ${props => props.theme.baseFontSize};

        &:focus {
            border: none !important;
            outline: none;
        }
    }
`;

/**
 * Form Phone Number Input Component.
 */
const PhoneNumberInput = ({
    accepted,
    name,
    value,
    error,
    autoComplete,
    country,
    placeholder,
    onChange,
    onBlur,
    disabled,
}) => {
    return (
        <>
            <BulletContainer>
                <StyledPhoneInput
                    $accepted={accepted}
                    autoComplete={autoComplete}
                    country={country}
                    defaultCountry="US"
                    error={error}
                    disabled={disabled}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    value={value}
                />
                {(accepted || error) && (
                    <Bullet accepted={accepted} error={error}>
                        &bull;
                    </Bullet>
                )}
            </BulletContainer>
            {error && <FormError>{error}</FormError>}
        </>
    );
};

PhoneNumberInput.propTypes = {
    /* Component displays accepted status (blue bullet and border) when true */
    accepted: PropTypes.bool,
    /** Phone Number Input name. Default is phone-number-input. */
    name: PropTypes.string,
    /** Phone Number Input autocomplete. Default is off */
    autoComplete: PropTypes.string,
    /* Error message to display */
    error: PropTypes.string,
    /** Phone Number Input value. Default is null */
    value: PropTypes.string,
    /** Phone Number Input onChangeFunction. Default is an empty function */
    onChange: PropTypes.func,
    /** OnBlur event callback, for when input loses focus */
    onBlur: PropTypes.func,
    /** Phone Number Input placeholder. Default is empty string */
    placeholder: PropTypes.string,
    /** Phone Number Input country. Default is US */
    country: PropTypes.string,
    /** Disable the input */
    disabled: PropTypes.bool,
};

PhoneNumberInput.defaultProps = {
    accepted: false,
    name: 'phone-number-input',
    autoComplete: 'off',
    error: null,
    value: null,
    onChange: () => {},
    onBlur: () => {},
    placeholder: '',
    country: 'US',
};

export default PhoneNumberInput;
