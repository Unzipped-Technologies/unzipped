import styled from 'styled-components';
import { placeholderChar as defaultPlaceholderChar } from './constants';

const emptyArray = [];

export function convertMaskToPlaceholder(mask = emptyArray, placeholderChar = defaultPlaceholderChar) {
    if (!isArray(mask)) {
        throw new Error('Text-mask:convertMaskToPlaceholder; The mask property must be an array.');
    }

    if (mask.indexOf(placeholderChar) !== -1) {
        throw new Error(
            'Placeholder character must not be used as part of the mask. Please specify a character ' +
            'that is not present in your mask as your placeholder character.\n\n' +
            `The placeholder character that was received is: ${JSON.stringify(placeholderChar)}\n\n` +
            `The mask that was received is: ${JSON.stringify(mask)}`,
        );
    }

    return mask
        .map(char => {
            return char instanceof RegExp ? placeholderChar : char;
        })
        .join('');
}

export function isArray(value) {
    return (Array.isArray && Array.isArray(value)) || value instanceof Array;
}

export function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

export function isNumber(value) {
    return typeof value === 'number' && value.length === undefined && !isNaN(value);
}

export function isNil(value) {
    return typeof value === 'undefined' || value === null;
}

const strCaretTrap = '[]';
export function processCaretTraps(mask) {
    const indexes = [];

    let indexOfCaretTrap;
    while (((indexOfCaretTrap = mask.indexOf(strCaretTrap)), indexOfCaretTrap !== -1)) {
        // eslint-disable-line
        indexes.push(indexOfCaretTrap);

        mask.splice(indexOfCaretTrap, 1);
    }

    return { maskWithoutCaretTraps: mask, indexes };
}

export const LETTER_SPACING = '0.009rem';
export const COLORS = {
    black: '#000',
    gray: '#6A7465',
    blue: '#0057FF',
    green: '#8EDE64',
    greenishGray: '#5E6D55',
    lightGreengray: '#F2F7F2',
    royalBlue: '#255EC6',
    hrLineColor: '#F3F6F3',
    brownishGray: '#7A765C',
    faqColor: '#D5DFD5',
    hireDivider: '#555555',
    white: '#fff',
    hireButton: '#37DEC5'
}

export const FONT_SIZE = {
    PX_1: '0.063rem',
    PX_2: '0.125rem',
    PX_3: '0.188rem',
    PX_4: '0.250rem',
    PX_5: '0.313rem',
    PX_6: '0.375rem',
    PX_7: '0.438rem',
    PX_8: '0.500rem',
    PX_9: '0.563rem',
    PX_10: '0.625rem',
    PX_11: '0.688rem',
    PX_12: '0.750rem',
    PX_13: '0.813rem',
    PX_14: '0.875rem',
    PX_15: '0.938rem',
    PX_16: '1.000rem',
    PX_17: '1.063rem',
    PX_18: '1.125rem',
    PX_19: '1.188rem',
    PX_20: '1.250rem',
    PX_21: '1.313rem',
    PX_22: '1.375rem',
    PX_23: '1.438rem',
    PX_24: '1.500rem',
    PX_25: '1.563rem',
    PX_26: '1.625rem',
    PX_27: '1.688rem',
    PX_28: '1.750rem',
    PX_29: '1.813rem',
    PX_30: '1.875rem',
    PX_31: '1.938rem',
    PX_32: '2.000rem',
    PX_33: '2.063rem',
    PX_34: '2.125rem',
    PX_35: '2.188rem',
    PX_36: '2.250rem',
    PX_37: '2.313rem',
    PX_38: '2.375rem',
    PX_39: '2.438rem',
    PX_40: '2.500rem',
    PX_43: '2.688rem',
    PX_600: '37.5rem'
};


export function getFontStyled({ color, fontSize, fontWeight, fontStyle, lineHeight, letterSpacing }) {
    return `
        color: ${color};
        font-size: ${fontSize};
        font-style: ${fontStyle};
        font-weight: ${fontWeight};
        line-height: ${lineHeight};
        letter-spacing: ${letterSpacing};
    `;
}

export function getButtonStyled({ width, height, radius, border, background }) {
    return `
        width: ${width};
        height: ${height};
        border-radius: ${radius};
        border: ${border};
        background: ${background};
    `;
}

export function getStyledHeadingComponent({ color, fontSize, fontWeight, fontStyle, lineHeight, letterSpacing }) {
    return styled.h1`
        color: ${color},
        fontSize: ${fontSize},
        fontWeight: ${fontWeight},
        fontStyle: ${fontStyle},
        lineHeight: ${lineHeight},
        letterSpacing: ${letterSpacing}
    `
}