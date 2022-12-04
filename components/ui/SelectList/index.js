import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const SelectListContainer = styled.div`
    width: 574px;
    background: white;
    border: 2px solid ${props => props.theme.tint3};
    border-radius: 4px;
    padding: 20px 20px 10px 20px;
    max-height: ${props => props.maxHeight};
    min-height: ${props => props.minHeight};
    max-width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`;

const SelectedStatus = styled.div`
    font-family: arial;
    font-weight: 700;
    color: ${props => props.theme.textSecondary};
    margin-bottom: 10px;
    width: 574px;
    overflow-x: hidden;
    max-width: 100%;
`;

const SelectListLabel = styled.p`
    font-family: arial;
    color: ${props => props.theme.textSecondary};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizeXS};
    margin-bottom: 20px;
    margin-top: 0;
`;

const SelectListDescription = styled.div`
    font-family: arial;
    color: ${props => props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props => props.theme.baseFontSize};
    margin-bottom: 10px;
    margin-top: 0;
    line-height: ${props => props.theme.baseLineHeight};
`;

const ListItem = styled.button`
    display: flex;
    align-items: center;
    background: ${props => (!props.$readOnly ? props.theme.tint4 : 'white')};
    border-radius: 4px;
    margin-bottom: ${props => (!props.$readOnly ? '10px' : '0')};
    padding-left: ${props => (!props.$readOnly ? '20px' : '0')};
    height: ${props => (!props.$readOnly ? '79px' : '47px')};
    border: 2px solid ${props => (!props.$readOnly ? props.theme.tint4 : 'white')};
    width: 100%;
    cursor: ${props => (!props.$readOnly ? 'pointer' : 'default')};
    ${props =>
        props.itemChecked &&
        `
        background-color: ${props.theme.secondaryLight};
        border: 2px solid ${props.theme.secondary};
        padding-left: 18px;`}
`;

const CheckBox = styled.div`
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props =>
        props.itemChecked &&
        `
        background-color: ${props.theme.secondary};
        margin-left: 2px;`}
`;

const ItemName = styled.div`
    font-family: arial;
    color: ${props => props.theme.textSecondary};
    font-weight: 700;
    font-size: ${props => (!props.$readOnly ? '1rem' : '1.125rem')};
    padding-left: ${props => (!props.$readOnly ? '12px' : '0')};
    margin-bottom: 0;
    margin-top: 0;
    ${props =>
        props.itemChecked &&
        `
        color: ${props.theme.selectedText};`}
`;

/**
 * A list with checkboxes to select items.
 */
const SelectList = ({
    items,
    checkedItems,
    onChange,
    maxHeight,
    minHeight,
    readOnly,
    label,
    description,
    showCheckedStatus,
}) => {
    const isItemChecked = item => {
        return checkedItems.some(checkedItem => checkedItem.id === item.id);
    };

    const onClickHandler = item => {
        if (readOnly) return;

        if (isItemChecked(item)) {
            onChange(checkedItems.filter(checkedItem => checkedItem.id !== item.id));
        } else {
            onChange([...checkedItems, item]);
        }
    };

    return (
        <>
            {showCheckedStatus && <SelectedStatus>{checkedItems.length} Selected</SelectedStatus>}
            <SelectListContainer maxHeight={maxHeight} minHeight={minHeight} $readOnly={readOnly}>
                {label && <SelectListLabel>{label}</SelectListLabel>}
                {description && <SelectListDescription>{description}</SelectListDescription>}
                {items.map(item => {
                    const itemChecked = !readOnly && isItemChecked(item);
                    return (
                        <ListItem
                            key={item.id}
                            itemChecked={itemChecked}
                            $readOnly={readOnly}
                            onClick={() => onClickHandler(item)}>
                            {!readOnly && (
                                <CheckBox itemChecked={itemChecked}>
                                    <Icon name={itemChecked ? 'check' : 'checkbox'} />
                                </CheckBox>
                            )}
                            <ItemName itemChecked={itemChecked} $readOnly={readOnly}>
                                {item.content}
                            </ItemName>
                        </ListItem>
                    );
                })}
            </SelectListContainer>
        </>
    );
};

SelectList.propTypes = {
    /** array of options to select from */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        }),
    ).isRequired,
    /** array of selected options */
    checkedItems: PropTypes.arrayOf(PropTypes.object),
    /** function to call when checkbox is clicked */
    onChange: PropTypes.func,
    /** sets the max-height css property for outer container */
    maxHeight: PropTypes.string,
    /** sets whether the list has checkable items or not */
    readOnly: PropTypes.bool,
    /** sets a label for the component */
    label: PropTypes.string,
    /** sets a description for the component */
    description: PropTypes.string,
    /** indicates whether to show the number of checked items above the component */
    showCheckedStatus: PropTypes.bool,
};

SelectList.defaultProps = {
    items: [],
    checkedItems: [],
    onChange: () => {},
    maxHeight: '',
    readOnly: false,
    label: '',
    description: '',
    showCheckedStatus: false,
};

export default SelectList;
