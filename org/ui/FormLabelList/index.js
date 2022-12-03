import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LabelContainer = styled.label`
    color: ${props => props.theme.textSecondary};
    font-weight: 400;
    font-size: ${props => (props.fontSize ? props.fontSize : props.theme.baseFontSize)};
    line-height: ${props => props.theme.baseLineHeight};
    font-family: arial;
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
    gap: 10px;
    svg {
        height: 16px;
        margin-left: 10px;
        vertical-align: middle;
    }
`;

const UnorderedList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    padding-left: 1em;
    text-indent: -1em;
    &:before {
        padding-right: 10px;
        content: '•';
    }
`;

/**
 * Form label list Component.
 */
const FormLabelList = ({items, forId = null, fontSize = ''}) => {
    return (
        <LabelContainer fontSize={fontSize} htmlFor={forId}>
            <UnorderedList>
                {items.map(item => (
                    <ListItem key={item.id}>{item.value}</ListItem>
                ))}
            </UnorderedList>
        </LabelContainer>
    );
};

FormLabelList.propTypes = {
    /** Items of the list */
    items: PropTypes.arrayOf(
        PropTypes.shape({id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), value: PropTypes.node}),
    ),
    /** The id of the input this is for */
    forId: PropTypes.string,
    /** String to override the base font size */
    fontSize: PropTypes.string,
};

export default FormLabelList;
