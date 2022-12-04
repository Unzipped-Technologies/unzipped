import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {currencyFormatter} from '../utils/formHelper';

const TileContainer = styled.div`
    background: ${props => (props.highlight ? '#eeeff4' : '#f2f2f2')};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px;
    font-family: arial, sans-serif;
    text-align: ${props => (props.alignContent ? props.alignContent : 'center')};
    width: 320px;
    min-width: 200px;
`;
const Value = styled.div`
    color: ${props => (props.valueError ? props.theme.error : props.theme.primary)};
    font-size: 1.75rem;
    font-weight: 600;
    height: 32px;
`;
const Title = styled.div`
    color: ${props => (props.highlight ? '#002269' : '#55565b')};
    font-size: ${props => props.theme.fontSizeXS};
    font-weight: 600;
    padding: 0 0 5px 0;
    text-transform: ${({uppercase}) => uppercase && 'uppercase'};
`;

/**
 * Value Tile Component.
 */
const ValueTile = ({
    highlight = false,
    valueError = false,
    title = '',
    value = 0,
    type = 'dollars',
    alignContent = '',
    className,
    hideValue = false,
    showFractionDigits = true,
    uppercase = false,
}) => {
    const displayedValue = hideValue
        ? ''
        : type === 'dollars'
        ? currencyFormatter(value, showFractionDigits)
        : `${value}%`;
    return (
        <TileContainer highlight={highlight} className={className} alignContent={alignContent}>
            <Title uppercase={uppercase} highlight={highlight}>
                {title}
            </Title>
            <Value className={className} valueError={valueError}>
                {displayedValue}
            </Value>
        </TileContainer>
    );
};

ValueTile.propTypes = {
    /** Value to display */
    value: PropTypes.number,
    /** Title of value */
    title: PropTypes.string,
    /** Whether this tile is highlighted */
    highlight: PropTypes.bool,
    /** Whether to hide the value, instead of showing 0 when no value is given */
    hideValue: PropTypes.bool,
    /** Whether to show the value in red or not */
    valueError: PropTypes.bool,
    /** Whether to show the value in red or not */
    showFractionDigits: PropTypes.bool,
    /** Determines if the title should be all uppercase */
    uppercase: PropTypes.bool,
    /** Type of currency */
    type: PropTypes.string,
    /** Determines the direction to align tile content */
    alignContent: PropTypes.string,
};

export default ValueTile;
