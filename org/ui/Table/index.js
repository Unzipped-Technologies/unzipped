import React, {useEffect, useState, isValidElement, useMemo, useCallback, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import {
    Table as Container,
    THead,
    TRow,
    TItem,
    BodyT,
    FilterIcons,
    Empty,
    Select,
    Box,
    Checkmark,
    CheckTitle,
    Radio,
    RadioTitle,
    RightSideGradient,
    LeftSideGradient,
    FullWidthTHead,
    FullWidthContainer,
    LeftSidebar,
    RightSidebar,
    Content,
    ScrollableWrapper,
    TableLink,
    SimpleBar,
    FullWidthMobileRow,
    MobileColTitle,
    MobileColValue,
    MobileCard,
    FullWidthMobileHeader,
    InlineLink,
} from './style/styling';
import {Action, Actions, Button, Icon} from 'components/ui';
import useSharedWidth from 'components/ui/hooks/useSharedWidth';
import {SetUtils} from 'utils';
import theme from 'themes/default';
import 'simplebar';
import useWindowSize from 'components/ui/hooks/useWindowSize';

const CHECK_ALL = 'CHECK_ALL';
const CHECK_SOME = 'CHECK_SOME';
const CHECK_NONE = 'CHECK_NONE';

const FIRST_COLUMN = 'FIRST_COLUMN';
const MIDDLE_COLUMNS = 'MIDDLE_COLUMNS';
const LAST_COLUMN = 'LAST_COLUMN';

const getLabel = (theadData, index) => {
    const item = theadData[index];
    const isString = typeof item === 'string';
    return isString ? item : item.label;
};

const hasChecksOrRadios = type => type === 'radio' || type === 'checkbox';

/**
 * Extract the value and link (if there is one) from the item in a row
 * @param {object, node or string} item
 * @returns an object with value as the row value and link if the object contained a link keyvalue pair
 */
const getValue = item => {
    const isObject = typeof item === 'object';
    const isNode = isValidElement(item);
    return isNode || !isObject
        ? {value: item, link: null, onClick: null}
        : {value: item?.value, link: item?.link, onClick: item?.onClick};
};

const getValueNode = ({item, index, bold, multiline = true}) => {
    const {value, link, onClick} = getValue(item);
    const valueNode = link ? (
        <TableLink to={link} $bold={index === bold} $multiline={multiline}>
            {value}
        </TableLink>
    ) : onClick ? (
        <InlineLink onClick={onClick} multiline={multiline}>
            {value}
        </InlineLink>
    ) : (
        value
    );
    return {value, valueNode};
};

const getMobileValueNodes = ({dataValues, theadData, bold, multiline}) => {
    let mobileDataIndexOffset = 0;
    return theadData.map((header, index) => {
        if (Object.keys(dataValues)[index] === 'id') {
            // want id in the data, so we can determine which item was clicked
            // but we want to make sure we are not rendering the id
            mobileDataIndexOffset = 1;
        }
        const headerValue = header.label || header;
        const {valueNode} = getValueNode({
            item: Object.values(dataValues)[index + mobileDataIndexOffset],
            index,
            bold,
            multiline,
        });
        return {
            index,
            headerValue,
            valueNode,
        };
    });
};

const getFirstValueNode = ({dataValues, theadData, bold, multiline}) => {
    const [firstValueNode] = getMobileValueNodes({dataValues, theadData, bold, multiline});
    return firstValueNode.valueNode;
};

const removeId = obj => {
    const newObj = {...obj};
    delete newObj.id;
    return newObj;
};

const calculateType = ({type, data, noCheckboxIds}) =>
    type === 'checkbox' && data?.id && noCheckboxIds.includes(data.id) ? 'default' : type;

//render filter icons
const Filter = ({sort, theadData, column, index}) => {
    const label = getLabel(theadData, index);
    return (
        <FilterIcons data-testid="action-table-filter-icon">
            <Icon
                name="filterup"
                fill={sort === 'up' && column === label.toLowerCase() ? theme.secondary : theme.tint2}
            />
            <Icon
                name="filterdown"
                fill={sort === 'down' && column === label.toLowerCase() ? theme.secondary : theme.tint2}
            />
        </FilterIcons>
    );
};

//render header of table
const TableHead = ({item, theadData, index, onSortChange, sort, column, width, upperCaseHeadings}) => {
    const isString = typeof item === 'string' && item.length > 0;
    const label = isString ? item : item.label;
    const isSortable = isString || item.isSortable;
    const handleClick = isSortable ? () => onSortChange(label.toLowerCase(), index) : () => {};
    return (
        <TItem
            button={isSortable}
            role="columnheader"
            data-testid="action-table-filter-item"
            width={width}
            onClick={handleClick}
            upperCaseHeadings={upperCaseHeadings}>
            {label}
            {isSortable && <Filter theadData={theadData} sort={sort} column={column} index={index} />}
        </TItem>
    );
};

//return radio or checkbox with table
const RowType = ({
    role,
    type,
    focus,
    selectedIds,
    checkAll,
    onClickCheckAll,
    onClickCheck,
    selectTitle,
    selectTitleRef,
    getSelectTitleWidth,
    columnSubset,
    isMobile,
    data,
    onClickRadio,
    noCheckboxIds,
}) => {
    // Don't want radio buttons or checks to show up outside of first col
    if (columnSubset && columnSubset !== FIRST_COLUMN) {
        return '';
    }

    const changeCheckValue = () => {
        if (onClickCheckAll) {
            onClickCheckAll();
        } else {
            onClickCheck();
        }
    };

    type = calculateType({type, data, noCheckboxIds});

    //switch checkbox, radio, default from type prop
    switch (type) {
        case 'checkbox':
            return (
                <Select ref={selectTitle && selectTitleRef} width={!selectTitle ? getSelectTitleWidth() ?? '60' : ''}>
                    <Checkmark
                        selectTitle={selectTitle}
                        columns={1}
                        options={['']}
                        onChange={changeCheckValue}
                        checkAll={checkAll === CHECK_ALL}
                        checkSome={role !== 'row' && checkAll === CHECK_SOME}
                        checked={selectedIds && selectedIds.has(data?.id)}
                        isMobile={isMobile}
                    />
                    {selectTitle && <CheckTitle>{selectTitle}</CheckTitle>}
                </Select>
            );
        case 'radio':
            return (
                <Select $radio ref={selectTitle && selectTitleRef}>
                    {!selectTitle && <Radio type="radio" checked={focus === data.id} onChange={onClickRadio} />}
                    {selectTitle && <RadioTitle>{selectTitle}</RadioTitle>}
                </Select>
            );
        default:
            return '';
    }
};

//render table rows and actions
const TableRow = ({
    data,
    type,
    row,
    focus,
    selectedIds,
    checkAll,
    bold,
    columnWidths,
    onClickCheck,
    selectTitleRef,
    getSelectTitleWidth,
    onClickRadio,
    multiline,
    noCheckboxIds,
}) => {
    const objectWithoutId = removeId(data);
    const dataValues = {...objectWithoutId, actions: undefined};
    // forceMenu is used to show a menu icon when a single action is pushed in
    const forceMenu = data.actions?.length === 1 && data.actions[0].forceMenu;
    const isSingleAction = data.actions?.length === 1;
    const isCustomAction = data.actions?.length === 1 && data.actions[0].customAction;
    const hasMultipleActions = data.actions?.length > 1;
    const disabled = hasMultipleActions && data.actions[0].disabled;

    return (
        <BodyT type={type} data-testid="action-table-checkbox">
            <RowType
                role="row"
                type={type}
                row={row}
                focus={focus}
                selectedIds={selectedIds}
                onClickCheck={onClickCheck}
                checkAll={checkAll}
                data={data}
                selectTitleRef={selectTitleRef}
                getSelectTitleWidth={getSelectTitleWidth}
                onClickRadio={onClickRadio}
                noCheckboxIds={noCheckboxIds}
            />
            {Object.values(dataValues).map((item, index) => {
                const {value, valueNode} = getValueNode({item, index, bold});
                return (
                    <TItem
                        multiline={multiline}
                        bold={index === bold}
                        shift={type !== 'default'}
                        role="cell"
                        key={`${value ?? ''}${index}`}
                        index={index}
                        width={columnWidths[index]}
                        className={index === bold ? (type !== 'default' ? 'Bold Shift' : 'Bold') : ''}>
                        {valueNode}
                    </TItem>
                );
            })}
            {isSingleAction &&
                (isCustomAction ? (
                    <TItem $action right>
                        {data.actions[0].customAction}
                    </TItem>
                ) : forceMenu ? (
                    <TItem right>
                        <Actions forceMenu={forceMenu} color="secondary">
                            <Action onClick={data.actions[0].onClick}>{data.actions[0].name}</Action>
                        </Actions>
                    </TItem>
                ) : (
                    <TItem $action right>
                        <Button type="table" onClick={data.actions[0].onClick} disabled={data.actions[0].disabled}>
                            {data.actions[0].name}
                        </Button>
                    </TItem>
                ))}
            {hasMultipleActions && (
                <TItem right>
                    <Actions color={disabled ? 'tint3' : 'secondary'} disabled={disabled}>
                        {data.actions.map((action, index) => (
                            <Action key={action.name + index} onClick={action.onClick}>
                                {action.name}
                            </Action>
                        ))}
                    </Actions>
                </TItem>
            )}
        </BodyT>
    );
};

// render table rows
const TableRows = ({
    data,
    type,
    focus,
    setSelectedIds,
    checkAll,
    selectedIds,
    bold,
    columnWidths,
    onClickCheck,
    selectTitleRef,
    getSelectTitleWidth,
    onClickRadio,
    multiline,
    noCheckboxIds,
}) => {
    return (
        <Box>
            {data.map((item, index) => {
                return (
                    <TRow key={item + index}>
                        <TableRow
                            data={item}
                            multiline={multiline}
                            index={index}
                            row={index}
                            checkAll={checkAll}
                            type={type}
                            focus={focus}
                            setSelectedIds={setSelectedIds}
                            selectedIds={selectedIds}
                            bold={bold}
                            columnWidths={columnWidths}
                            onClickCheck={onClickCheck(item.id)}
                            selectTitleRef={selectTitleRef}
                            getSelectTitleWidth={getSelectTitleWidth}
                            onClickRadio={onClickRadio(item.id)}
                            noCheckboxIds={noCheckboxIds}
                        />
                    </TRow>
                );
            })}
        </Box>
    );
};

//render full width table rows and actions
const FullWidthTableRow = ({
    data,
    type,
    row,
    focus,
    selectedIds,
    checkAll,
    bold,
    columnWidths,
    onClickCheck,
    selectTitleRef,
    getSelectTitleWidth,
    columnSubset,
    isMobile,
    theadData,
    onClickRadio,
    multiline,
    noCheckboxIds,
}) => {
    const dataValues = {...data};
    // forceMenu is used to show a menu icon when a single action is pushed in
    const forceMenu = data.actions?.length === 1 && data.actions[0].forceMenu;
    const isSingleAction = data.actions?.length === 1;
    const isCustomAction = data.actions?.length === 1 && data.actions[0].customAction;
    const hasMultipleActions = data.actions?.length > 1;
    const disabled = hasMultipleActions && data.actions[0].disabled;
    const getWidthIndex = index => (columnSubset === MIDDLE_COLUMNS ? index + 1 : index);
    const showActions = columnSubset === LAST_COLUMN || isMobile;
    const showDesktopTableContent =
        (columnSubset === MIDDLE_COLUMNS || (columnSubset === FIRST_COLUMN && !hasChecksOrRadios(type))) && !isMobile;
    return (
        <BodyT
            type={type}
            isFirstOrLastCol={columnSubset === FIRST_COLUMN || columnSubset === LAST_COLUMN}
            data-testid="action-table-select">
            {!isMobile && (
                <RowType
                    role="row"
                    type={type}
                    row={row}
                    focus={focus}
                    selectedIds={selectedIds}
                    onClickCheck={onClickCheck}
                    checkAll={checkAll}
                    selectTitleRef={selectTitleRef}
                    getSelectTitleWidth={getSelectTitleWidth}
                    columnSubset={columnSubset}
                    isMobile={isMobile}
                    data={data}
                    onClickRadio={onClickRadio}
                    noCheckboxIds={noCheckboxIds}
                />
            )}
            {columnSubset === LAST_COLUMN
                ? showActions &&
                  (isSingleAction ? (
                      isCustomAction ? (
                          <TItem $action isFullWidthAction isSingleAction fullWidthSingleActionMobile={isMobile}>
                              {data.actions[0].customAction}
                          </TItem>
                      ) : forceMenu ? (
                          <TItem
                              right
                              isFullWidthAction
                              fullWidthMultiActionDesktop={!isMobile}
                              fullWidthMultiActionMobile={isMobile}>
                              <Actions forceMenu={forceMenu} color="secondary">
                                  <Action onClick={data.actions[0].onClick}>{data.actions[0].name}</Action>
                              </Actions>
                          </TItem>
                      ) : (
                          <TItem $action isFullWidthAction isSingleAction fullWidthSingleActionMobile={isMobile}>
                              <Button
                                  type="table"
                                  onClick={data.actions[0].onClick}
                                  disabled={data.actions[0].disabled}>
                                  {data.actions[0].name}
                              </Button>
                          </TItem>
                      )
                  ) : (
                      hasMultipleActions && (
                          <TItem
                              right
                              isFullWidthAction
                              fullWidthMultiActionDesktop={!isMobile}
                              fullWidthMultiActionMobile={isMobile}>
                              <Actions color={disabled ? 'tint3' : 'secondary'} disabled={disabled}>
                                  {data.actions.map((action, index) => (
                                      <Action key={action.name + index} onClick={action.onClick}>
                                          {action.name}
                                      </Action>
                                  ))}
                              </Actions>
                          </TItem>
                      )
                  ))
                : showDesktopTableContent &&
                  Object.values(dataValues).map((item, index) => {
                      const {value, valueNode} = getValueNode({item, index, bold});
                      return (
                          <TItem
                              multiline={multiline}
                              bold={index === bold}
                              shift={type !== 'default'}
                              role="cell"
                              key={value + index}
                              index={index}
                              width={columnWidths[getWidthIndex(index)]}
                              className={index === bold ? (type !== 'default' ? 'Bold Shift' : 'Bold') : ''}>
                              {valueNode}
                          </TItem>
                      );
                  })}
            {isMobile && (
                <MobileCard>
                    <FullWidthMobileHeader tableType={calculateType({type, data, noCheckboxIds})}>
                        <RowType
                            role="row"
                            type={type}
                            row={row}
                            focus={focus}
                            selectedIds={selectedIds}
                            onClickCheck={onClickCheck}
                            checkAll={checkAll}
                            selectTitleRef={selectTitleRef}
                            getSelectTitleWidth={getSelectTitleWidth}
                            columnSubset={columnSubset}
                            isMobile={isMobile}
                            data={data}
                            onClickRadio={onClickRadio}
                            noCheckboxIds={noCheckboxIds}
                        />
                        {getFirstValueNode({dataValues, theadData, bold, multiline})}
                        {hasMultipleActions && (
                            <Actions color={disabled ? 'tint3' : 'secondary'} disabled={disabled} forceMenu={forceMenu}>
                                {data.actions.map((action, index) => (
                                    <Action key={action.name + index} onClick={action.onClick}>
                                        {action.name}
                                    </Action>
                                ))}
                            </Actions>
                        )}
                    </FullWidthMobileHeader>
                    {getMobileValueNodes({dataValues, theadData, bold, multiline})
                        .filter((_, index) => index !== 0)
                        .map(({index, headerValue, valueNode}) => (
                            <FullWidthMobileRow key={index}>
                                <MobileColTitle>{headerValue}</MobileColTitle>
                                <MobileColValue>{valueNode}</MobileColValue>
                            </FullWidthMobileRow>
                        ))}
                </MobileCard>
            )}
        </BodyT>
    );
};

// render full width table rows
const FullWidthTableRows = ({
    data,
    type,
    focus,
    setSelectedIds,
    checkAll,
    selectedIds,
    bold,
    isFullWidth,
    columnWidths,
    onClickCheck,
    selectTitleRef,
    getSelectTitleWidth,
    columnSubset,
    isMobile,
    theadData,
    onClickRadio,
    multiline,
    noCheckboxIds,
}) => {
    const getRelevantData = () => {
        const firstLabel = getLabel(theadData, 0).toLowerCase();
        if (columnSubset === FIRST_COLUMN) {
            // in first col, dont want to have first col data when hasChecksOrRadios is true
            return data.map(dataObj => {
                if (hasChecksOrRadios(type)) {
                    return {id: dataObj.id};
                }
                // want the first key that is not id or actions
                return {[firstLabel]: dataObj[firstLabel]};
            });
        } else if (columnSubset === MIDDLE_COLUMNS) {
            return data.map(dataObj => {
                // eslint-disable-next-line no-unused-vars
                const {actions, id, [firstLabel]: firstItem, ...dataObjValues} = dataObj;
                return hasChecksOrRadios(type) ? {[firstLabel]: firstItem, ...dataObjValues} : dataObjValues;
            });
        } else if (columnSubset === LAST_COLUMN) {
            return data.map(dataObj => {
                return {actions: dataObj.actions};
            });
        }
    };
    const relevantData = isMobile ? data : getRelevantData();
    return (
        <Box isMiddleCol={columnSubset === MIDDLE_COLUMNS}>
            {relevantData.map((item, index) => {
                return (
                    <TRow key={item + index} isMobile={isMobile}>
                        <FullWidthTableRow
                            data={item}
                            index={index}
                            row={index}
                            checkAll={checkAll}
                            type={type}
                            focus={focus}
                            setSelectedIds={setSelectedIds}
                            selectedIds={selectedIds}
                            bold={bold}
                            isFullWidth={isFullWidth}
                            columnWidths={columnWidths}
                            onClickCheck={onClickCheck(item.id)}
                            selectTitleRef={selectTitleRef}
                            getSelectTitleWidth={getSelectTitleWidth}
                            columnSubset={columnSubset}
                            isMobile={isMobile}
                            theadData={theadData}
                            onClickRadio={onClickRadio(item.id)}
                            multiline={multiline}
                            noCheckboxIds={noCheckboxIds}
                        />
                    </TRow>
                );
            })}
        </Box>
    );
};

///main table component
const Table = forwardRef(
    (
        {
            name,
            theadData,
            tbodyData,
            type,
            bold,
            isFullWidth,
            columnWidths,
            selectTitle,
            emptyMessage,
            onClick,
            upperCaseHeadings,
            multiline,
            noCheckboxIds,
            isPadding,
        },
        ref,
    ) => {
        const [rowData, setRowData] = useState([]);
        const [sort, setSort] = useState('default');
        const [column, setColumn] = useState('type');
        const [focus, setFocus] = useState(-1);
        const [checkAll, setCheckAll] = useState(CHECK_NONE);
        const customCheckedValues = tbodyData.filter(data => !noCheckboxIds.includes(data.id));
        const allCheckedValues = useMemo(() => new Set(customCheckedValues.map(item => item.id)), [
            customCheckedValues,
        ]);
        const [selectedIds, setSelectedIds] = useState(new Set());
        const [selectTitleRef, getSelectTitleWidth] = useSharedWidth();
        const {width} = useWindowSize();
        const isMobile = width <= theme.tableMobileWidth;
        const onClickCheckAll = useCallback(() => {
            const newCheckAll = checkAll === CHECK_ALL ? CHECK_NONE : CHECK_ALL;
            setCheckAll(newCheckAll);
            const nextValues = newCheckAll === CHECK_ALL ? new Set(allCheckedValues) : new Set();
            setSelectedIds(nextValues);
            onClick([...nextValues]);
        }, [allCheckedValues, checkAll, onClick]);

        const uncheckAll = useCallback(() => {
            setCheckAll(CHECK_NONE);
            setSelectedIds(new Set());
            onClick([]);
        }, [onClick]);

        const updateCheckAll = useCallback(
            selectedIds => {
                const newCheckAll = SetUtils.areSetsEqual(allCheckedValues, selectedIds)
                    ? CHECK_ALL
                    : selectedIds.size === 0
                    ? CHECK_NONE
                    : CHECK_SOME;
                setCheckAll(newCheckAll);
            },
            [allCheckedValues],
        );

        const onClickCheck = useCallback(
            id => () => {
                selectedIds.has(id) ? selectedIds.delete(id) : selectedIds.add(id);
                setSelectedIds(new Set(selectedIds));
                updateCheckAll(selectedIds);
                onClick([...selectedIds]);
            },
            [onClick, selectedIds, updateCheckAll],
        );

        const onClickRadio = useCallback(
            id => () => {
                setFocus(id);
                onClick(id);
            },
            [onClick],
        );

        //types and functions for sorting table
        const sortTypes = useMemo(
            () => ({
                up: {
                    date: (a, b) => new Date(a[column].value ?? a[column]) - new Date(b[column].value ?? b[column]),
                    default: (a, b) =>
                        (a[column].label?.toLowerCase() ?? a[column].value?.toLowerCase() ?? a[column].toLowerCase()) >
                        (b[column].label?.toLowerCase() ?? b[column].value?.toLowerCase() ?? b[column].toLowerCase())
                            ? 1
                            : -1,
                },
                down: {
                    date: (a, b) => new Date(b[column].value ?? b[column]) - new Date(a[column].value ?? a[column]),
                    default: (a, b) =>
                        (b[column].label?.toLowerCase() ?? b[column].value?.toLowerCase() ?? b[column].toLowerCase()) >
                        (a[column].label?.toLowerCase() ?? a[column].value?.toLowerCase() ?? a[column].toLowerCase())
                            ? 1
                            : -1,
                },
                default: {
                    default: a => a,
                },
            }),
            [column],
        );
        ///function when click sort
        const onSortChange = useCallback(
            (name, col) => {
                let nextSort;
                // eslint-disable-next-line no-unused-vars
                const {id, ...objectWithoutId} = tbodyData[0];
                const isDate = Object.values(objectWithoutId)[col].isDate ?? false;
                const type = isDate ? 'date' : 'default';
                const colChange = name === column;
                setColumn(name);
                const label = getLabel(theadData, col);
                if (name === label.toLowerCase()) {
                    if (sort === 'down') nextSort = {direction: colChange ? 'up' : 'default'};
                    else if (sort === 'up') nextSort = {direction: colChange ? 'default' : 'default'};
                    else if (sort === 'default') nextSort = {direction: colChange ? 'down' : 'default'};

                    setSort(nextSort.direction);
                    setRowData([...tbodyData].sort(sortTypes[nextSort.direction][type]));
                }
            },
            [column, sort, sortTypes, tbodyData, theadData],
        );

        useImperativeHandle(
            ref,
            () => ({onClickCheckAll, onClickCheck, onClickRadio, onSortChange, sortTypes, uncheckAll}),
            [onClickCheck, onClickCheckAll, onClickRadio, onSortChange, sortTypes, uncheckAll],
        );

        ///init set row data
        useEffect(() => {
            setRowData(tbodyData);
        }, [tbodyData]);

        // Keep selected checkboxes in sync with table data
        useEffect(() => {
            const ids = tbodyData.map(row => row.id);
            const selected = Array.from(selectedIds);
            const keepIds = selected.filter(id => ids.includes(id));

            if (selected.length === keepIds.length) {
                return;
            }

            // Update selected checkboxes
            const newSelectedIds = new Set(keepIds);
            setSelectedIds(newSelectedIds);

            // Update check all checkbox
            updateCheckAll(newSelectedIds);
            onClick(keepIds);
        }, [tbodyData, selectedIds, setSelectedIds, onClick, updateCheckAll]);

        const hasMultipleActions = rowData[0]?.actions?.length > 1;
        const hasNoActions = rowData[0]?.actions === undefined;
        const hasCustomActionHeading = !hasNoActions && rowData[0]?.actions[0]?.customActionHeading;
        const isEmpty = rowData.length === 0;
        if (isFullWidth && !isMobile) {
            const getFullWidthTableRows = columnSubset => {
                return (
                    <FullWidthTableRows
                        data={rowData}
                        sort={sort}
                        theadData={theadData}
                        column={column}
                        focus={focus}
                        setSelectedIds={setSelectedIds}
                        selectedIds={selectedIds}
                        bold={bold}
                        checkAll={checkAll}
                        type={type}
                        isFullWidth={isFullWidth}
                        columnWidths={columnWidths}
                        onClickCheck={onClickCheck}
                        selectTitleRef={selectTitleRef}
                        getSelectTitleWidth={getSelectTitleWidth}
                        columnSubset={columnSubset}
                        onClickRadio={onClickRadio}
                        multiline={multiline}
                        noCheckboxIds={noCheckboxIds}
                    />
                );
            };
            return (
                <>
                    <Container name={name} data-testid={name} isFullWidth={isFullWidth} role="table">
                        <Box>
                            <FullWidthContainer>
                                <LeftSidebar width={columnWidths[0]}>
                                    <THead
                                        type={type}
                                        isFullWidth={isFullWidth}
                                        $isEmpty={isEmpty}
                                        noChecksNorRadios={!hasChecksOrRadios}>
                                        <RowType
                                            type={type}
                                            checkAll={checkAll}
                                            onClickCheckAll={onClickCheckAll}
                                            selectTitle={selectTitle}
                                            selectTitleRef={selectTitleRef}
                                            getSelectTitleWidth={getSelectTitleWidth}
                                            selectedIds={selectedIds}
                                            onClickRadio={onClickRadio}
                                            noCheckboxIds={noCheckboxIds}
                                        />
                                        {/* Get only the first header for the left side of scrollable area */}
                                        {!hasChecksOrRadios(type) &&
                                            theadData.slice(0, 1).map((header, index) => {
                                                return (
                                                    <TableHead
                                                        key={header + index}
                                                        item={header}
                                                        index={index}
                                                        focus={focus}
                                                        theadData={theadData}
                                                        onSortChange={onSortChange}
                                                        sort={sort}
                                                        column={column}
                                                        width={columnWidths[index]}
                                                        isMiddleCol={false}
                                                        upperCaseHeadings={upperCaseHeadings}
                                                    />
                                                );
                                            })}
                                    </THead>
                                    {getFullWidthTableRows(FIRST_COLUMN)}
                                </LeftSidebar>
                                <ScrollableWrapper isPadding={isPadding}>
                                    <SimpleBar data-simplebar>
                                        <div>
                                            <Content>
                                                <FullWidthTHead
                                                    type={type}
                                                    isFullWidth={isFullWidth}
                                                    $isEmpty={isEmpty}>
                                                    {theadData
                                                        .slice(hasChecksOrRadios(type) ? 0 : 1)
                                                        .map((header, index) => {
                                                            return (
                                                                <TableHead
                                                                    key={header + index}
                                                                    item={header}
                                                                    index={hasChecksOrRadios(type) ? index : index + 1}
                                                                    focus={focus}
                                                                    theadData={theadData}
                                                                    onSortChange={onSortChange}
                                                                    sort={sort}
                                                                    column={column}
                                                                    width={
                                                                        columnWidths[
                                                                            hasChecksOrRadios(type)
                                                                                ? index + 1
                                                                                : index + 1
                                                                        ]
                                                                    }
                                                                    isMiddleCol={true}
                                                                    upperCaseHeadings={upperCaseHeadings}
                                                                />
                                                            );
                                                        })}
                                                </FullWidthTHead>
                                                {getFullWidthTableRows(MIDDLE_COLUMNS)}
                                            </Content>
                                        </div>
                                    </SimpleBar>
                                </ScrollableWrapper>
                                <LeftSideGradient left={columnWidths[0]} type={type} />
                                {!hasNoActions && (
                                    <>
                                        <RightSideGradient hasMultipleActions={hasMultipleActions} type={type} />
                                        <RightSidebar hasMultipleActions={hasMultipleActions}>
                                            <THead type={type} isFullWidth={isFullWidth} $isEmpty={isEmpty}>
                                                <TItem
                                                    right
                                                    isSingleAction={!hasMultipleActions}
                                                    singleActionTitle={!hasMultipleActions}>
                                                    {hasCustomActionHeading
                                                        ? rowData[0].actions[0].customActionHeading
                                                        : 'ACTION'}
                                                    {hasMultipleActions && !hasCustomActionHeading ? 'S' : ''}
                                                </TItem>
                                            </THead>
                                            {getFullWidthTableRows(LAST_COLUMN)}
                                        </RightSidebar>
                                    </>
                                )}
                            </FullWidthContainer>
                        </Box>
                    </Container>
                    {emptyMessage && tbodyData.length === 0 && <Empty>{emptyMessage}</Empty>}
                </>
            );
        } else if (isMobile) {
            return (
                <>
                    <Container name={name} data-testid={name} role="table">
                        <FullWidthTableRows
                            data={rowData}
                            multiline={multiline}
                            sort={sort}
                            column={column}
                            focus={focus}
                            setFocus={setFocus}
                            setSelectedIds={setSelectedIds}
                            selectedIds={selectedIds}
                            bold={bold}
                            checkAll={checkAll}
                            type={type}
                            isFullWidth={isFullWidth}
                            columnWidths={columnWidths}
                            onClickCheck={onClickCheck}
                            selectTitleRef={selectTitleRef}
                            getSelectTitleWidth={getSelectTitleWidth}
                            columnSubset={null}
                            isMobile={true}
                            theadData={theadData}
                            onClickRadio={onClickRadio}
                            noCheckboxIds={noCheckboxIds}
                        />
                    </Container>
                    {emptyMessage && tbodyData.length === 0 && <Empty>{emptyMessage}</Empty>}
                </>
            );
        } else {
            return (
                <>
                    <Container name={name} data-testid={name} role="table">
                        <THead type={type} $isEmpty={isEmpty} isFullWidth={isFullWidth}>
                            <RowType
                                type={type}
                                checkAll={checkAll}
                                onClickCheckAll={onClickCheckAll}
                                selectTitle={selectTitle}
                                selectTitleRef={selectTitleRef}
                                getSelectTitleWidth={getSelectTitleWidth}
                                selectedIds={selectedIds}
                                onClickRadio={onClickRadio}
                                noCheckboxIds={noCheckboxIds}
                            />
                            {theadData.map((header, index) => {
                                return (
                                    <TableHead
                                        key={header + index}
                                        item={header}
                                        index={index}
                                        focus={focus}
                                        theadData={theadData}
                                        onSortChange={onSortChange}
                                        sort={sort}
                                        column={column}
                                        width={columnWidths[index]}
                                        isMiddleCol={false}
                                        upperCaseHeadings={upperCaseHeadings}
                                    />
                                );
                            })}
                            {!hasNoActions && (
                                <TItem right isSmallAndSingleAction={!hasMultipleActions}>
                                    {hasCustomActionHeading ? rowData[0].actions[0].customActionHeading : 'ACTION'}
                                    {hasMultipleActions ? 'S' : ''}
                                </TItem>
                            )}
                        </THead>
                        <TableRows
                            data={rowData}
                            multiline={multiline}
                            sort={sort}
                            column={column}
                            focus={focus}
                            selectedIds={selectedIds}
                            bold={bold}
                            checkAll={checkAll}
                            type={type}
                            columnWidths={columnWidths}
                            onClickCheck={onClickCheck}
                            selectTitleRef={selectTitleRef}
                            getSelectTitleWidth={getSelectTitleWidth}
                            onClickRadio={onClickRadio}
                            noCheckboxIds={noCheckboxIds}
                        />
                    </Container>
                    {emptyMessage && tbodyData.length === 0 && <Empty>{emptyMessage}</Empty>}
                </>
            );
        }
    },
);

Table.propTypes = {
    /** Array of data for table header */
    columnWidths: PropTypes.arrayOf(PropTypes.string),
    /** Array of data for table header */
    theadData: PropTypes.array.isRequired,
    /** Array of data for table body */
    tbodyData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        }),
    ).isRequired,
    /** Give your table a name */
    name: PropTypes.string,
    /** Specify 'default', 'checkbox' or 'radio'*/
    type: PropTypes.string,
    /** Index (starting at zero) of a single item to bold on mobile card */
    bold: PropTypes.number,
    /** Label above the checkbox or radio button column */
    selectTitle: PropTypes.string,
    /** To show full width table styles or small table styles */
    isFullWidth: PropTypes.bool,
    /** Text to display when tbodyData is empty */
    emptyMessage: PropTypes.string,
    /** Function called when a checkbox or radio button is clicked */
    onClick: PropTypes.func,
    /** To show headings uppercase */
    upperCaseHeadings: PropTypes.bool,
    /** To allow text to wrap inside columns */
    multiline: PropTypes.bool,
    /** To remove checkbox option for given ids list when the prop type is checkbox */
    noCheckboxIds: PropTypes.array,
    /** add this to correct for scrollbar missing in vanilla 1.0 */
    isPadding: PropTypes.bool,
};

Table.defaultProps = {
    noCheckboxIds: [],
    columnWidths: [],
    name: '',
    type: 'default',
    bold: 1,
    sortable: true,
    isFullWidth: false,
    emptyMessage: '',
    onClick: () => {},
    upperCaseHeadings: false,
    multiline: true,
    isPadding: false,
};

Table.displayName = 'Table';

export default Table;
