import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NavigationTitleContainer = styled.h2`
    font-family: arial;
    font-weight: bold;
    font-size: ${props => props.theme.baseFontSize};
    color: ${props => props.theme.tint2};
    box-sizing: border-box;
    display: block;
    width: auto;
    padding: 10px 20px 10px;
    text-transform: uppercase;
`;

const GroupItems = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    > :not(:last-child) {
        margin-bottom: 5px;
    }
`;

const GroupContainer = styled.div`
    margin-top: ${props => (props.$bottom ? 'auto' : props.$marginTop ? `${props.$marginTop}px` : '0')};
`;

/**
 * Sub Navigation Title Component.
 */
const SubGroup = ({children, title = '', bottom = false, marginTop = ''}) => (
    <GroupContainer $bottom={bottom} $marginTop={marginTop}>
        <NavigationTitleContainer>{title}</NavigationTitleContainer>
        <GroupItems>{children}</GroupItems>
    </GroupContainer>
);

SubGroup.propTypes = {
    /** Children the component contains */
    children: PropTypes.node,
    /** Title of the group */
    title: PropTypes.string,
    /** Show this group at the bottom of the page */
    bottom: PropTypes.bool,
    /** add given margin to top of element (px) */
    marginTop: PropTypes.string,
};

export default SubGroup;
