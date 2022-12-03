import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ConverterUtils} from 'utils';
import theme from 'themes/default';

const sizes = {
    big: {
        InvestorDisplayCountFontSize: '3.125rem',
        InvestorDisplayMarginRight: 40,
        TextAndCurrencyContainerMarginTop: 0,
        InvestorDisplayTextFontSize: theme.fontSizeXS,
        InvestorDisplayCurrencyFontSize: theme.fontSizeL,
    },
    medium: {
        InvestorDisplayCountFontSize: '1.875rem',
        InvestorDisplayMarginRight: 30,
        TextAndCurrencyContainerMarginTop: -8,
        InvestorDisplayTextFontSize: theme.fontSizeXXS,
        InvestorDisplayCurrencyFontSize: theme.baseFontSize,
    },
    small: {
        InvestorDisplayCountFontSize: '1.25rem',
        InvestorDisplayMarginRight: 20,
        TextAndCurrencyContainerMarginTop: -10,
        InvestorDisplayTextFontSize: '0.5rem',
        InvestorDisplayCurrencyFontSize: theme.fontSizeXS,
    },
};

const InvestorDisplayContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    ${props => (props.flex ? 'flex: ' + props.flex : '')};
`;

const InvestorDisplay = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: ${props => sizes[props.$size].InvestorDisplayMarginRight}px;
`;

const InvestorDisplayCount = styled.div`
    font-size: ${props => sizes[props.$size].InvestorDisplayCountFontSize};
    font-family: Arial;
    font-weight: 700;
    margin-right: 15px;
    color: ${props => props.theme.primary};
`;

const InvestorDisplayText = styled.div`
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: ${props => sizes[props.$size].InvestorDisplayTextFontSize};
    margin-right: 6px;
    margin-top: 10px;
    white-space: nowrap;
    color: ${props => props.theme.textSecondary};
    text-transform: uppercase;
`;

const InvestorDisplayCurrency = styled.div`
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: ${props => sizes[props.$size].InvestorDisplayCurrencyFontSize};
    color: ${props => props.theme.primary};
`;

const TextAndCurrencyContainer = styled.div`
    margin-top: ${props => sizes[props.$size].TextAndCurrencyContainerMarginTop}px;
`;

/**
 * Fund Title Component.
 */
const ValueCurrency = ({size, amount, title, currency, showCurrency, flex}) => (
    <InvestorDisplayContainer $size={size} flex={flex}>
        <InvestorDisplay $size={size}>
            <InvestorDisplayCount $size={size}>{amount}</InvestorDisplayCount>
            <TextAndCurrencyContainer $size={size}>
                <InvestorDisplayText $size={size}>{title}</InvestorDisplayText>
                {showCurrency && (
                    <InvestorDisplayCurrency $size={size}>
                        {isNaN(currency) ? currency : ConverterUtils.convertToCurrency(currency)}
                    </InvestorDisplayCurrency>
                )}
            </TextAndCurrencyContainer>
        </InvestorDisplay>
    </InvestorDisplayContainer>
);

ValueCurrency.propTypes = {
    /** Size of component big, medium, or small */
    size: PropTypes.string,
    /** Amount */
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Title */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Currency */
    currency: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** To show currency */
    showCurrency: PropTypes.bool,
    /** to set the flex value */
    flex: PropTypes.number,
};

ValueCurrency.defaultProps = {
    size: 'big',
    amount: null,
    title: null,
    currency: null,
    showCurrency: true,
    flex: null,
};

export default ValueCurrency;
