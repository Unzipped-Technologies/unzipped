import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from 'themes/default';
import {ConverterUtils} from 'utils';

const GraphChartContainer = styled.div`
    position: relative;
    background-color: ${props => props.theme.tint4};
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    height: 31px;
    border-radius: 4px;
    overflow: hidden;
`;

const ChartBar = styled.div`
    background-color: ${props => (props.fundClosed ? props.theme.primary : props.$color)};
    width: ${props => props.$width}%;
`;

const TargetLine = styled.div`
    background-color: ${props => props.$color};
    width: 2px;
    height: 31px;
    position: absolute;
    left: ${props => props.value}%;
`;

const HardCapLine = styled.div`
    background-color: ${props => props.$color};
    width: 2px;
    height: 31px;
    position: absolute;
    left: ${props => props.value}%;
`;

const UpperDisplay = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 6px;
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeXXS};
`;

const LowerDisplay = styled.div`
    display: flex;
    flex-direction: row;
    font-size: ${props => props.theme.fontSizeXXS};
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        flex-direction: column;
    }
`;

const TargetDisplay = styled.div`
    flex-direction: row;
    margin-right: 30px;
`;

const TargetDisplayText = styled.div`
    color: ${props => props.theme.secondary};
    font-family: Arial;
    font-weight: bold;
`;

const TargetDisplayCurrency = styled.div`
    color: ${props => props.theme.text};
`;

const TargetDisplayVerticalCSSLine = styled.div`
    border-left: 2.11px solid ${props => props.theme.secondary};
    height: 20px;
    margin-right: 6px;
`;

const HardCapDisplay = styled.div`
    flex-direction: row;
`;

const HardCapDisplayText = styled.div`
    color: ${props => props.theme.text};
    font-family: Arial;
    font-weight: bold;
`;

const HardCapDisplayCurrency = styled.div`
    color: ${props => props.theme.text};
    font-family: Arial;
`;

const HardCapDisplayVerticalCSSLine = styled.div`
    border-left: 2.11px solid ${props => props.theme.text};
    height: 20px;
    margin-right: 6px;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        margin-left: 30px;
    }
`;

const LowerDisplayContainer = styled.div`
    flex-direction: row;
    margin-right: 18px;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        margin-right: 25px;
    }
`;

const LowerDisplayUpperContainer = styled.div`
    display: flex;
    flex-direction: row;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        margin-bottom: 10px;
    }
`;
const LowerDisplayLowerContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const DisplaySquare = styled.div`
    background-color: ${props => props.$color};
    height: 20px;
    width: 20px;
    margin-right: 6px;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        margin-left: ${props => props.$marginLeft};
    }
`;

const LowerDisplayText = styled.div`
    font-weight: 700;
    color: ${props => props.theme.text};
    font-family: Arial;
`;

const LowerDisplayCurrency = styled.div`
    font-weight: 400;
    color: ${props => props.theme.text};
    font-family: Arial;
`;

/**
 * Graph Chart Component.
 */
const FundChart = ({className, target, hardCap, closed, closeReady, legalHold, inProgress, fundClosed}) => {
    let total;
    if (hardCap) {
        total = (100 / 75) * hardCap;
    } else {
        total = target || closed + closeReady + legalHold + inProgress;
    }
    const percent = value => (100 / total) * value;

    return (
        <div className={className}>
            <UpperDisplay>
                <TargetDisplayVerticalCSSLine></TargetDisplayVerticalCSSLine>
                <TargetDisplay>
                    <TargetDisplayText>Target:</TargetDisplayText>
                    {target === 0 ? (
                        <TargetDisplayCurrency>No set amount</TargetDisplayCurrency>
                    ) : (
                        <TargetDisplayCurrency>{ConverterUtils.convertToCurrency(target)}</TargetDisplayCurrency>
                    )}
                </TargetDisplay>
                <HardCapDisplayVerticalCSSLine></HardCapDisplayVerticalCSSLine>
                <HardCapDisplay>
                    <HardCapDisplayText>Hard Cap:</HardCapDisplayText>
                    {hardCap === 0 ? (
                        <HardCapDisplayCurrency>No set amount</HardCapDisplayCurrency>
                    ) : (
                        <HardCapDisplayCurrency>{ConverterUtils.convertToCurrency(hardCap)}</HardCapDisplayCurrency>
                    )}
                </HardCapDisplay>
            </UpperDisplay>
            <GraphChartContainer data-testid="graph-chart-container" id="progress-bar">
                <ChartBar $color={theme.primary} $width={percent(closed)} />
                <ChartBar fundClosed={fundClosed} $color={theme.green} $width={percent(closeReady)} />
                <ChartBar fundClosed={fundClosed} $color={theme.error} $width={percent(legalHold)} />
                <ChartBar fundClosed={fundClosed} $color={theme.important} $width={percent(inProgress)} />
                {target > 0 && <TargetLine $color={theme.secondary} value={percent(target)} />}
                {hardCap > 0 && <HardCapLine $color={theme.text} value={75} />}
            </GraphChartContainer>
            <LowerDisplay>
                <LowerDisplayUpperContainer>
                    <DisplaySquare $color={theme.primary}></DisplaySquare>
                    <LowerDisplayContainer>
                        <LowerDisplayText>Closed:</LowerDisplayText>
                        <LowerDisplayCurrency>{ConverterUtils.convertToCurrency(closed)}</LowerDisplayCurrency>{' '}
                    </LowerDisplayContainer>
                    {!fundClosed && (
                        <>
                            <DisplaySquare $color={theme.green} $marginLeft="16px"></DisplaySquare>
                            <LowerDisplayContainer>
                                <LowerDisplayText>Close-Ready:</LowerDisplayText>
                                <LowerDisplayCurrency>
                                    {ConverterUtils.convertToCurrency(closeReady)}
                                </LowerDisplayCurrency>
                            </LowerDisplayContainer>
                        </>
                    )}
                </LowerDisplayUpperContainer>

                {!fundClosed && (
                    <>
                        <LowerDisplayLowerContainer>
                            <DisplaySquare $color={theme.error}></DisplaySquare>
                            <LowerDisplayContainer>
                                <LowerDisplayText>Legal Hold:</LowerDisplayText>
                                <LowerDisplayCurrency>
                                    {ConverterUtils.convertToCurrency(legalHold)}
                                </LowerDisplayCurrency>
                            </LowerDisplayContainer>
                            <DisplaySquare $color={theme.important}></DisplaySquare>
                            <LowerDisplayContainer>
                                <LowerDisplayText>In Progress:</LowerDisplayText>
                                <LowerDisplayCurrency>
                                    {ConverterUtils.convertToCurrency(inProgress)}
                                </LowerDisplayCurrency>
                            </LowerDisplayContainer>
                        </LowerDisplayLowerContainer>
                    </>
                )}
            </LowerDisplay>
        </div>
    );
};

FundChart.propTypes = {
    /** Additional classNames, supports styled-components  */
    className: PropTypes.string,
    /** target value of fund */
    target: PropTypes.number,
    /** hard cap value of fund */
    hardCap: PropTypes.number,
    /** closed investor contribution value of fund */
    closed: PropTypes.number,
    /** closed ready investor contribution value of fund */
    closedReady: PropTypes.number,
    /** value of contributions on legal hold for the fund */
    legalHold: PropTypes.number,
    /** in progress investor contribution value of fund */
    inProgress: PropTypes.number,
    /** if account is closed, changed bar blue, get rid of other squares */
    fundClosed: PropTypes.bool,
};

FundChart.defaultProps = {
    className: '',
    target: 0,
    hardCap: 0,
    closed: 0,
    closedReady: 0,
    legalHold: 0,
    inProgress: 0,
    fundClosed: false,
};

export default FundChart;
