import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Badge from '../Badge';
import {statusFormat} from '../utils/dataFormat';

const BadgeStyled = styled(Badge)`
    ${props => props.xsmall && 'font-size: 0.6rem;'}
`;

const ProgressBarContainer = styled.div`
    font-family: arial;
    font-weight: 600;
    font-size: ${props => (props.$tileView ? '1.5rem' : '1.625rem')};
    padding: ${props => (props.$showValue ? '20px' : ' 5px 20px')};
    color: ${props => (props.$tileView ? props.theme.secondary : '#fff')};
    height: auto;
    ${props =>
        props.$tileView &&
        `background: ${props.theme.tint4};
        width: 320px;
        min-width: 200px;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    `}
`;

const ProgressBarBack = styled.div`
    background-color: ${props => (props.$tileView ? props.theme.secondaryLight : props.theme.accent2)};
    width: ${props => props.$width}px;
    min-height: 30px;
    height: 30px;
    position: relative;
    border-radius: 4px;
`;

const ProgressBarBar = styled.div`
    background-color: ${props => (props.$tileView ? props.theme.secondary : props.theme.important)};
    width: ${props => props.$width}px;
    min-height: 30px;
    height: 30px;
    position: absolute;
    border-radius: 4px;
`;

const Header = styled.div`
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    width: ${({$width}) => `${$width}px`};
`;

const Value = styled.span`
    margin-right: 10px;
`;

/**
 * Progress Bar Component.
 */
const ProgressBar = ({tileView, showValue, status, value, width}) => {
    const barWidth = (width / 100) * value;
    const displayedStatus = statusFormat(status);
    const showHeader = showValue || status;

    return (
        <ProgressBarContainer $showValue={showValue} $tileView={tileView}>
            {showHeader && (
                <Header $width={width}>
                    {showValue && <Value>{value}%</Value>}
                    {status && (
                        <BadgeStyled status={displayedStatus} small={tileView} xsmall={displayedStatus.length >= 20}>
                            {displayedStatus}
                        </BadgeStyled>
                    )}
                </Header>
            )}
            {showValue && (
                <ProgressBarBack $width={width} $tileView={tileView}>
                    <ProgressBarBar $width={barWidth} value={value} $tileView={tileView} />
                </ProgressBarBack>
            )}
        </ProgressBarContainer>
    );
};

ProgressBar.propTypes = {
    /** Progress value as a percentage */
    value: PropTypes.number.isRequired,
    /* if to show value */
    showValue: PropTypes.bool,
    /** Status to show as a badge */
    status: PropTypes.string,
    /** Changes color palette */
    tileView: PropTypes.bool,
};

ProgressBar.defaultProps = {
    showValue: false,
    status: null,
    width: 240,
    tileView: false,
};

export default ProgressBar;
