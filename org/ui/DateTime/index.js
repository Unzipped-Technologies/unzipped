import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {addMonths} from 'date-fns/esm';
import Converter from 'utils/converter';
import {Icon, Input, OutsideAlerter, SelectInput, TextMaskInput} from 'components/ui';
import createAutoCorrectedDatePipe from 'components/ui/TextMaskInput/core/createAutoCorrectedDatePipe';
import {DAYS, MONTHS, TIMES} from './Dates';

const DateTimeContainer = styled.span`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

const DatePickerToggle = styled.span`
    position: relative;
`;

const DatePickerToggleButton = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({$small}) => ($small ? '204' : '361')}px;
    height: 100%;
`;

const TimeToggleButton = styled.span`
    position: relative;
    display: flex;
    align-items: center;
    width: ${({$small}) => ($small ? '146' : '361')}px;
    height: 53px;
    cursor: ${props => (props.$disabled ? 'not-allowed' : 'default')};
`;

const DatePickerDropdown = styled.span`
    display: ${({hidden}) => (hidden ? 'none' : 'flex')};
    width: 361px;
    height: 295px;
    background-color: #fff;
    border: 2px solid ${props => props.theme.tint3};
    box-sizing: border-box;
    border-radius: 4px;
    position: absolute;
    z-index: 4;
    overflow: visible;
`;

const Header = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    font-family: Arial;
    font-weight: bold;
    font-size: ${props => props.theme.baseFontSize};
    line-height: 1.125rem;
    color: ${props => props.theme.text};
    width: 100%;
    margin-top: 18px;
`;

const Calendar = styled.div`
    width: 100%;
`;

const CalendarIcon = styled.span`
    position: absolute;
    background-color: ${props => (props.disabled ? props.theme.tint4 : props.theme.tint5)};
    right: 5px;
    top: 8px;
    padding: 5px 15px;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
    svg {
        path {
            fill: ${props => (props.disabled ? props.theme.tint2 : props.theme.textSecondary)};
        }
    }
`;

const CloseIcon = styled.span`
    position: absolute;
    background-color: ${props => (props.disabled ? props.theme.tint4 : props.theme.tint5)};
    right: 60px;
    align-items: center;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'default')};
    svg {
        path {
            fill: ${props => (props.disabled ? props.theme.tint2 : props.theme.textSecondary)};
        }
    }
`;

const Rows = styled.div`
    display: grid;
    grid-template-column: repeat(6, 1fr);
    span:nth-child(8) {
        visibility: hidden;
    }
    span:nth-child(8) {
        visibility: hidden;
    }
    align-items: center;
    justify-content: center;
    margin-top: 13px;
    height: 80%;
`;

const Span = styled.div`
    margin: 0 20px;
`;

const DateTitle = styled.div``;

const Tr = styled.span`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 320px;
`;

const TI = styled.div``;

const Td = styled.div`
    width: 30px;
    height: 30px;
    background: ${({selected, today, theme, hover, isSelectedDateString}) =>
        selected && !isSelectedDateString ? theme.primary : today ? theme.tint3 : hover ? theme.tint3 : 'transparent'};
    border-radius: 50%;
    font-family: arial;
    display: flex;
    font-weight: ${({selected, bold, isSelectedDateString}) =>
        (selected && !isSelectedDateString) || bold ? 'bold' : 'normal'};
    font-size: ${props => props.theme.baseFontSize};
    line-height: 1.125rem;
    text-align: center;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: ${({selected, disabled, today, theme, isSelectedDateString}) =>
        selected && !isSelectedDateString
            ? '#ffffff'
            : today
            ? theme.textSecondary
            : !disabled
            ? theme.tint3
            : theme.textSecondary};
    margin: auto;
    padding: 0;
    cursor: default;
`;

const ArrowButton = styled.div`
    padding: 3px;
    cursor: pointer;
`;

const isDisabled = (value, today) => {
    const newValue = new Date(`${value}`.substring(0, 15));
    const newToday = new Date(`${today}`.substring(0, 15));
    if (value === 'Invalid Date') {
        return true;
    }
    if (newValue < newToday) {
        return false;
    }
    return true;
};

const formatTyping = date => {
    let day = new Date(date).getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = new Date(date).getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    const year = new Date(date).getFullYear();
    return `${month}-${day}-${year}`;
};

const getStartDate = date => {
    const newDate = new Date(`${date.getMonth() + 1}/1/${date.getFullYear()}`);
    const weekday = newDate.getDay() - 1;
    return new Date(newDate.setDate(0 - weekday));
};

const GetRows = (startDate, value) => {
    let newRow = [];
    let firstDay = new Date(startDate);
    const today = new Date();
    for (let j = 0; j < 6; j++) {
        let row = [];
        for (var i = 0; i < 7; i++) {
            const currentDate = new Date(`${firstDay.getMonth() + 1}/${firstDay.getDate()}/${firstDay.getFullYear()}`);
            const newSelected = `${currentDate}`.substring(0, 15) === `${value}`.substring(0, 15);
            row.push(
                <TI
                    value={firstDay}
                    datayear={firstDay.getFullYear()}
                    dataday={firstDay.getDate()}
                    selected={newSelected}
                    disabled={isDisabled(currentDate, today)}
                    datamonth={firstDay.getMonth()}>
                    {firstDay.getDate()}
                </TI>,
            );

            firstDay.setDate(firstDay.getDate() + 1);
        }
        newRow.push(row);
    }
    return newRow;
};

const RenderDaysInMonth = ({
    value,
    tempValue,
    today,
    setUpdate,
    setValue,
    setTyping,
    setDate,
    date,
    setHidden,
    setIsSelectedDateString,
    setShowClearButton,
    update,
    init,
    isSelectedDateString,
}) => {
    const [startDate, setStartDate] = useState(getStartDate(tempValue));
    const [allRows, setAllRows] = useState(GetRows(startDate, value));
    const [hover, setHover] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        if (!update && !init) {
            setShowClearButton(true);
            setIsSelectedDateString(false);
        }
    }, [update, init, setShowClearButton, setIsSelectedDateString, clickCount]);

    const clickDay = (e, disabled) => {
        if (disabled) {
            return;
        }
        const d = new Date(e.currentTarget.getAttribute('value'));
        const [year, month, day] = [d.getFullYear(), d.getMonth(), d.getDate()];
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(day);
        setValue(new Date(date));
        setIsSelectedDateString(true);
        setShowClearButton(true);
        setTyping(formatTyping(new Date(date)));
        setDate(new Date(date));
        setUpdate(false);
        setHidden(false);
        setClickCount(clickCount + 1);
    };

    useEffect(() => {
        setStartDate(getStartDate(tempValue));
    }, [tempValue]);
    useEffect(() => {
        setAllRows(GetRows(startDate, value));
    }, [startDate, value]);

    return allRows.map((row, i) => {
        return (
            <Tr key={row + i} id={clickCount}>
                {row.map((item, index) => {
                    const currentDate = new Date(
                        `${item.props.datamonth + 1}/${item.props.dataday}/${item.props.datayear}`,
                    );

                    return (
                        <Td
                            key={index + row}
                            value={currentDate}
                            hover={hover === `${index}${i}` && isDisabled(currentDate, today)}
                            onMouseEnter={() => setHover(`${index}${i}`)}
                            onMouseLeave={() => setHover(false)}
                            onClick={e => clickDay(e, !isDisabled(currentDate, today))}
                            dataday={startDate.getDate()}
                            datamonth={startDate.getMonth()}
                            datayear={startDate.getFullYear()}
                            today={`${currentDate}`.substring(0, 15) === `${today}`.substring(0, 15)}
                            selected={`${currentDate}`.substring(0, 15) === `${value}`.substring(0, 15)}
                            disabled={isDisabled(currentDate, today)}
                            isSelectedDateString={isSelectedDateString}>
                            {item}
                        </Td>
                    );
                })}
            </Tr>
        );
    });
};

const DateInput = ({
    update,
    typing,
    setHidden,
    autosize,
    updateDateViaKeyboard,
    setUpdate,
    setTempValue,
    value,
    disabled,
}) => {
    if (update) {
        return (
            <Input
                type="text"
                value="Select Date"
                disabled={disabled}
                onChange={updateDateViaKeyboard}
                autosize={autosize}
                onClick={() => {
                    setHidden(false);
                    setUpdate(false);
                }}
                onBlur={() => setTempValue(value)}
                height="53px"
            />
        );
    }
    return (
        <TextMaskInput
            onClick={() => setHidden(false)}
            value={typing}
            onChange={updateDateViaKeyboard}
            autosize={autosize}
            disabled={disabled}
            onBlur={() => setTempValue(value)}
            height="53px"
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            pipe={createAutoCorrectedDatePipe('mm/dd/yyyy')}
            keepCharPositions
        />
    );
};

/**
 * Form DateTime Component.
 */
const DateTime = ({date, setDate, dateOnly, timeObj, init, setInit, disabled = false}) => {
    const [hidden, setHidden] = useState(true);
    const [value, setValue] = useState(new Date(date));
    const [typing, setTyping] = useState(formatTyping(new Date(date)));
    const [year, setYear] = useState(new Date(value).getFullYear());
    const [month, setMonth] = useState(new Date(value).getMonth());
    const [update, setUpdateFunc] = useState(init);
    const [showClearButton, setShowClearButton] = useState(false);
    const [isSelectedDateString, setIsSelectedDateString] = useState(false);

    const setUpdate = init => {
        setUpdateFunc(init);
        setInit(init);
    };
    const today = new Date();
    const [tempValue, setTempValue] = useState(value);
    const [time, setTime] = useState(timeObj);
    const [focus, setFocus] = useState(false);

    // Show the current date in the calendar if the text input is invalid
    if (!Converter.isDateValid(tempValue)) {
        const now = new Date();
        setTempValue(now);
        setYear(now.getFullYear());
        setMonth(now.getMonth());
        setValue(now);
        setIsSelectedDateString(true);
    }

    const changeTime = e => {
        e && setFocus(false);
        setTime(e);
        date.setHours(e.value, 0, 0);
        setDate(new Date(date));
        document.activeElement.blur();
    };

    const updateDateViaKeyboard = e => {
        const typedText = e.target.value;
        const [month, day, year] = typedText.split('/');
        date.setFullYear(year);
        date.setMonth(month - 1);
        date.setDate(day);
        date.setHours(time.value);
        const newDate = new Date(date);
        setTyping(typedText);
        setValue(newDate);
        setIsSelectedDateString(true);
        setMonth(newDate.getMonth());
        setYear(newDate.getFullYear());
        setHidden(true);
        setDate(newDate);
    };

    const changeMonth = shift => {
        const newDate = addMonths(Converter.isDateValid(date) ? date : value, shift);
        const newMonth = newDate.getMonth();

        setMonth(newMonth);
        setValue(newDate);
        setIsSelectedDateString(true);
        setTyping(formatTyping(newDate));
        setYear(newDate.getFullYear());
        setTempValue(newDate);
        if (Converter.isDateValid(date)) {
            setDate(newDate);
        }
        setUpdate(false);
    };

    const handleHideOutside = () => setHidden(true);
    const handleClear = () => {
        setIsSelectedDateString(true);
        setUpdate(true);
        setShowClearButton(init);
    };
    const handleIconClick = () => {
        if (disabled) {
            return;
        }
        setHidden(!hidden);
        setDate(new Date());
        setUpdate(false);
    };
    return (
        <>
            {dateOnly ? (
                <DateTimeContainer>
                    <OutsideAlerter onClickOutside={handleHideOutside}>
                        <DatePickerToggle>
                            <DatePickerToggleButton>
                                <DateInput
                                    update={update}
                                    typing={typing}
                                    autosize={false}
                                    setHidden={setHidden}
                                    updateDateViaKeyboard={updateDateViaKeyboard}
                                    setUpdate={setUpdate}
                                    setTempValue={setTempValue}
                                    value={value}
                                    disabled={disabled}
                                />
                                {showClearButton && (
                                    <CloseIcon disabled={disabled}>
                                        <Icon name="close" onClick={!disabled ? handleClear : undefined} />
                                    </CloseIcon>
                                )}
                                <CalendarIcon disabled={disabled}>
                                    <Icon name="calendar" onClick={handleIconClick} />
                                </CalendarIcon>
                            </DatePickerToggleButton>
                            <DatePickerDropdown hidden={hidden}>
                                <Calendar>
                                    <Header>
                                        <ArrowButton>
                                            <Icon name="LeftArrow" onClick={() => changeMonth(-1)} />
                                        </ArrowButton>
                                        <DateTitle>
                                            <Span>
                                                {MONTHS[month]} {year}
                                            </Span>
                                        </DateTitle>
                                        <ArrowButton>
                                            <Icon name="RightArrow" onClick={() => changeMonth(1)} />
                                        </ArrowButton>
                                    </Header>
                                    <Rows>
                                        <Tr>
                                            {DAYS.map((item, index) => (
                                                <Td key={item + index} disabled bold>
                                                    {item}
                                                </Td>
                                            ))}
                                        </Tr>
                                        <RenderDaysInMonth
                                            value={value}
                                            setValue={setValue}
                                            tempValue={tempValue}
                                            setTempValue={setTempValue}
                                            today={today}
                                            setUpdate={setUpdate}
                                            setDate={setDate}
                                            setMonth={setMonth}
                                            setTyping={setTyping}
                                            month={month}
                                            date={date}
                                            setHidden={setHidden}
                                            setIsSelectedDateString={setIsSelectedDateString}
                                            setShowClearButton={setShowClearButton}
                                            update={update}
                                            init={init}
                                            isSelectedDateString={isSelectedDateString}
                                        />
                                    </Rows>
                                </Calendar>
                            </DatePickerDropdown>
                        </DatePickerToggle>
                    </OutsideAlerter>
                </DateTimeContainer>
            ) : (
                <DateTimeContainer>
                    <OutsideAlerter onClickOutside={handleHideOutside}>
                        <DatePickerToggle>
                            <DatePickerToggleButton $small>
                                <DateInput
                                    update={update}
                                    typing={typing}
                                    autosize={true}
                                    setHidden={setHidden}
                                    updateDateViaKeyboard={updateDateViaKeyboard}
                                    setUpdate={setUpdate}
                                    setTempValue={setTempValue}
                                    value={value}
                                    disabled={disabled}
                                />
                                {showClearButton && (
                                    <CloseIcon disabled={disabled}>
                                        <Icon name="close" onClick={!disabled ? handleClear : undefined} />
                                    </CloseIcon>
                                )}

                                <CalendarIcon disabled={disabled}>
                                    <Icon name="calendar" onClick={handleIconClick} />
                                </CalendarIcon>
                            </DatePickerToggleButton>
                            <DatePickerDropdown hidden={hidden}>
                                <Calendar>
                                    <Header>
                                        <ArrowButton>
                                            <Icon name="LeftArrow" onClick={() => changeMonth(-1)} />
                                        </ArrowButton>
                                        <DateTitle>
                                            <Span>
                                                {MONTHS[month]} {year}
                                            </Span>
                                        </DateTitle>
                                        <ArrowButton>
                                            <Icon name="RightArrow" onClick={() => changeMonth(1)} />
                                        </ArrowButton>
                                    </Header>
                                    <Rows>
                                        <Tr>
                                            {DAYS.map((item, index) => (
                                                <Td key={item + index} disabled bold>
                                                    {item}
                                                </Td>
                                            ))}
                                        </Tr>
                                        <RenderDaysInMonth
                                            value={value}
                                            setValue={setValue}
                                            tempValue={tempValue}
                                            setTempValue={setTempValue}
                                            today={today}
                                            setUpdate={setUpdate}
                                            setDate={setDate}
                                            setMonth={setMonth}
                                            month={month}
                                            date={date}
                                            setTyping={setTyping}
                                            setHidden={setHidden}
                                            disabled={disabled}
                                            setShowClearButton={setShowClearButton}
                                            setIsSelectedDateString={setIsSelectedDateString}
                                            init={init}
                                            update={update}
                                            isSelectedDateString={isSelectedDateString}
                                        />
                                    </Rows>
                                </Calendar>
                            </DatePickerDropdown>
                        </DatePickerToggle>
                    </OutsideAlerter>
                    <TimeToggleButton $small $disabled={disabled}>
                        <SelectInput
                            options={update ? [{label: 'Select Time', value: 0}] : TIMES}
                            value={update ? {label: 'Select Time', value: 0} : time}
                            menuIsOpen={focus}
                            disabled={disabled}
                            onChange={changeTime}
                            onFocus={() => {
                                setUpdate(false);
                                setFocus(true);
                                setHidden(true);
                            }}
                            onBlur={() => setFocus(false)}
                            width="146px"
                            dateTime
                        />
                    </TimeToggleButton>
                </DateTimeContainer>
            )}
        </>
    );
};

DateTime.propTypes = {
    /** A Date object */
    date: PropTypes.instanceOf(Date),
    /** Function to get current value. */
    setDate: PropTypes.func,
    /** Input type is date only. */
    dateOnly: PropTypes.bool,
    /** pass this to set component to default state */
    init: PropTypes.bool,
    /** Called when init value changes */
    setInit: PropTypes.func,
    /** An object representing the time */
    timeObj: PropTypes.shape({label: PropTypes.string, value: PropTypes.number}),
};

DateTime.defaultProps = {
    date: new Date(),
    setDate: () => {},
    dateOnly: false,
    timeObj: {label: '12:00 AM', value: 0},
    init: true,
    setInit: () => {},
};

export default DateTime;
