import React, {useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Text} from '../';
import theme from '../theme';
import {ConverterUtils} from '../../../utils';

const CountdownTimerContainer = styled.div`
    display: inline-flex;
    flex-flow: column nowrap;
    width: ${props => (props.$large ? '294px' : '256px')};
    height: ${props => (props.$large ? '95px' : '85px')};
    align-items: ${props => (props.$large && props.$center && 'center') || (props.$large && 'flex-start') || 'center'};
    background-color: ${props => (props.$large ? props.theme.tint5 : props.theme.tint4)};
    padding: 13px;
`;
const HeaderText = styled.div`
    font-family: arial;
    color: ${props => props.theme.textSecondary};
    font-size: ${props => (props.$large ? props.theme.fontSizeXS : props.theme.fontSizeXXS)};
    font-weight: 700;
    margin-bottom: ${props => (props.$large ? '15px' : '10px')};
`;
const Display = styled.div`
    display: inline-flex;
`;
const DigitContainer = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    row-gap: ${props => (props.$large ? '10px' : '0')};
`;
const DigitContainerDays = styled.div`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    row-gap: ${props => (props.$large ? '10px' : '0')};
    margin-right: 17px;
`;
const Digit = styled(Text)`
    font-size: ${props => (props.$large ? '3.125rem' : '1.875rem')};
    margin: 0;
`;
const DigitLabel = styled(Text)`
    font-size: ${props => props.theme.fontSizeXS};
    line-height: ${props => props.theme.lineHeightS};
    margin: 0;
`;

/**
 * Countdown Timer Component.
 */
const CountdownTimer = ({
    headerText = 'Time Remaining',
    large = false,
    deadline,
    columnsToHide = {},
    center = false,
}) => {
    const deadlineTime = useMemo(() => new Date(deadline), [deadline]);
    const calculateTimeLeft = timeLeft => {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return {
            days,
            hours,
            minutes,
            seconds,
        };
    };
    const initTimer = deadlineTime => {
        if (ConverterUtils.isDateValid(deadlineTime)) {
            const now = new Date();
            const timeLeft = deadlineTime.getTime() - now.getTime();
            if (timeLeft <= 0) {
                return {days: '0', hours: '0', minutes: '0', seconds: '0'};
            } else {
                return calculateTimeLeft(timeLeft);
            }
        }
    };
    const [time, setTime] = useState(initTimer(deadlineTime));
    useEffect(() => {
        const startTimer = setInterval(() => {
            const setZero = () => {
                clearInterval(startTimer);
                setTime({days: '0', hours: '0', minutes: '0', seconds: '0'});
            };
            if (ConverterUtils.isDateValid(deadlineTime)) {
                const now = new Date();
                const timeLeft = deadlineTime.getTime() - now.getTime();
                if (timeLeft <= 0) {
                    setZero();
                } else {
                    setTime(calculateTimeLeft(timeLeft));
                }
            } else {
                setZero();
            }
        }, 250);
        return () => clearInterval(startTimer);
    }, [deadlineTime]);

    const formatTime = number => {
        return number?.toString().padStart(2, '0');
    };

    return (
        <CountdownTimerContainer $large={large} $center={center}>
            <HeaderText $large={large}>{headerText}</HeaderText>
            <Display>
                {!columnsToHide?.days && (
                    <DigitContainerDays $large={large}>
                        <Digit color={theme.primary} fontWeight="700" $large={large}>
                            {time?.days}
                        </Digit>
                        <DigitLabel color={theme.textSecondary} fontWeight="700">
                            D
                        </DigitLabel>
                    </DigitContainerDays>
                )}
                {!columnsToHide?.hours && (
                    <>
                        <DigitContainer $large={large}>
                            <Digit color={theme.primary} fontWeight="700" $large={large}>
                                {formatTime(time?.hours)}
                            </Digit>
                            <DigitLabel color={theme.textSecondary} fontWeight="700">
                                H
                            </DigitLabel>
                        </DigitContainer>
                        <DigitContainer $large={large}>
                            <Digit color={theme.primary} fontWeight="700" $large={large}>
                                &#58;
                            </Digit>
                        </DigitContainer>
                    </>
                )}
                <DigitContainer $large={large}>
                    <Digit color={theme.primary} fontWeight="700" $large={large}>
                        {formatTime(time?.minutes)}
                    </Digit>
                    <DigitLabel color={theme.textSecondary} fontWeight="700">
                        M
                    </DigitLabel>
                </DigitContainer>
                <DigitContainer $large={large}>
                    <Digit color={theme.primary} fontWeight="700" $large={large}>
                        &#58;
                    </Digit>
                </DigitContainer>
                <DigitContainer $large={large}>
                    <Digit color={theme.primary} fontWeight="700" $large={large}>
                        {formatTime(time?.seconds)}
                    </Digit>
                    <DigitLabel color={theme.textSecondary} fontWeight="700">
                        S
                    </DigitLabel>
                </DigitContainer>
            </Display>
        </CountdownTimerContainer>
    );
};

CountdownTimer.propTypes = {
    /** Header displayed by the component */
    headerText: PropTypes.string,
    /** Set component type to large */
    large: PropTypes.bool,
    /** The deadline datetime in local timezone (Date object) or UTC (date string) */
    deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    /** Whether to center component timer inner workings (only needed for large) */
    center: PropTypes.bool,
    /** */
    columnsToHide: PropTypes.shape({
        days: PropTypes.bool,
        hours: PropTypes.bool,
    }),
};

export default CountdownTimer;
