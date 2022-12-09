import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import createTextMaskInputElement from './core/createTextMaskInputElement';
import {isNil} from './core/utilities';

const ControlContainer = styled.div`
    position: relative;
    display: inline-block;
    height: ${props => (props ? props.height : 'auto')};
    min-width: ${props => (props.autosize ? 'auto' : '360px')};
    max-width: ${props => (props.autosize ? 'none' : '800px')};
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        width: 100%;
        min-width: ${props => (props.autosize ? 'auto' : '280px')};
    }
    width: ${props => (props.textarea ? '100%' : 'auto')};
`;

const inputContainerStyles = props => `
    background-color: ${props.disabled ? props.theme.tint4 : props.theme.tint5};
    border-radius: 4px;
    border: 2px solid ${props.theme.tint3};
    height: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    ${props => inputContainerStyles(props)}
`;

const inputStyles = props => `
    background-color: inherit;
    width: 100%;
    border: none;
    outline: none;
    color: ${props.disabled ? props.theme.tint2 : props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props.theme.baseFontSize};
    padding: 14px 20px;
    font-family: arial;
    box-sizing: border-box;
    &::placeholder {
        color: ${props.theme.tint2};
    }
    &:focus {
        border: none !important; // Overriding global css
        outline: none !important;
    }
    :disabled {
        cursor: not-allowed;
    }
`;

const InputControl = styled.input`
    ${props => inputStyles(props)}
`;

export default class TextMaskInput extends React.PureComponent {
    constructor(...args) {
        super(...args);

        this.setRef = this.setRef.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    setRef(inputElement) {
        this.inputElement = inputElement;
    }

    initTextMask() {
        const {
            props,
            props: {value},
        } = this;

        this.textMaskInputElement = createTextMaskInputElement({
            inputElement: this.inputElement,
            ...props,
        });
        this.textMaskInputElement.update(value);
    }

    componentDidMount() {
        this.initTextMask();
    }

    componentDidUpdate(prevProps) {
        // Getting props affecting value
        const {value, pipe, mask, guide, placeholderChar, showMask} = this.props;

        // Сalculate that settings was changed:
        // - `pipe` converting to string, to compare function content
        // - `mask` converting to string, to compare values or function content
        // - `keepCharPositions` excludes, because it affect only cursor position
        const settings = {guide, placeholderChar, showMask};
        const isPipeChanged =
            typeof pipe === 'function' && typeof prevProps.pipe === 'function'
                ? pipe.toString() !== prevProps.pipe.toString()
                : (isNil(pipe) && !isNil(prevProps.pipe)) || (!isNil(pipe) && isNil(prevProps.pipe));
        const isMaskChanged = mask.toString() !== prevProps.mask.toString();
        const isSettingChanged =
            Object.keys(settings).some(prop => settings[prop] !== prevProps[prop]) || isMaskChanged || isPipeChanged;

        // Сalculate that value was changed
        const isValueChanged = value !== this.inputElement.value;

        // Check value and settings to prevent duplicating update() call
        if (isValueChanged || isSettingChanged) {
            this.initTextMask();
        }
    }

    render() {
        const {...props} = this.props;

        delete props.mask;
        delete props.guide;
        delete props.pipe;
        delete props.placeholderChar;
        delete props.keepCharPositions;
        delete props.value;
        delete props.onBlur;
        delete props.onChange;
        delete props.showMask;

        return (
            <ControlContainer autosize={props.autosize} height={props.height}>
                <InputContainer disabled={props.disabled}>
                    <InputControl
                        ref={this.setRef}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        defaultValue={this.props.value}
                        {...props}
                    />
                </InputContainer>
            </ControlContainer>
        );
    }

    onChange(event) {
        this.textMaskInputElement.update();

        if (typeof this.props.onChange === 'function') {
            this.props.onChange(event);
        }
    }

    onBlur(event) {
        if (typeof this.props.onBlur === 'function') {
            this.props.onBlur(event);
        }
    }
}

TextMaskInput.propTypes = {
    /** An array or a function that defines how the user input is going to be masked. */
    mask: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.bool,
        PropTypes.shape({
            mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
            pipe: PropTypes.func,
        }),
    ]).isRequired,
    /** Tells the component whether to be in guide or no guide mode */
    guide: PropTypes.bool,
    /** Input value */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Modify the conformed value before it is displayed on the screen */
    pipe: PropTypes.func,
    /** Represents the fillable spot in the mask */
    placeholderChar: PropTypes.string,
    /** When true, adding or deleting characters will not affect the positions of existing characters */
    keepCharPositions: PropTypes.bool,
    /** Show mask when input value is empty */
    showMask: PropTypes.bool,
    /** Render this input without size constraints */
    autosize: PropTypes.bool,
    /** If input should not be accepted has been disabled */
    disabled: PropTypes.bool,
};

TextMaskInput.defaultProps = {
    guide: true,
    value: '',
    pipe: null,
    placeholderChar: '_',
    keepCharPositions: false,
    showMask: false,
    autosize: false,
    disabled: false,
};

export {default as conformToMask} from './core/conformToMask';
