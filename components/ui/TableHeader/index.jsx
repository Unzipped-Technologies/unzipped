import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LinkContainer = styled.div`
    display: flex;
    gap: 20px;
    white-space: nowrap;
`;

const FilterContainer = styled.div`
    display: flex;
    gap: 10px;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        flex-wrap: wrap;
        justify-content: space-between;
    }
`;

const HeaderContainer = styled.div`
    margin-top: 10px;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    flex-flow: row wrap;
    gap: 20px;
`;

const RightHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const LeftHeader = styled.div`
    display: flex;
    align-items: left;
    gap: 10px;
    flex-wrap: wrap;
    @media (max-width: ${props => props.theme.phoneWidth}px) {
        flex-grow: 1;
        & > button {
            flex: 1;
            display: flex;
        }
    }
`;

/**
 * A header for tables, that has actions, links and filter/search controls
 */
const TableHeader = ({actions = null, links = null, filters = null}) => (
    <HeaderContainer>
        <LeftHeader>{actions}</LeftHeader>
        <RightHeader>
            {!!links && <LinkContainer>{links}</LinkContainer>}
            <FilterContainer>{filters}</FilterContainer>
        </RightHeader>
    </HeaderContainer>
);

TableHeader.propTypes = {
    /** Children to display in the action button section */
    actions: PropTypes.node,
    /** Children to display in the links section */
    links: PropTypes.node,
    /** filter and search controls to display */
    filters: PropTypes.node,
};

export default TableHeader;
