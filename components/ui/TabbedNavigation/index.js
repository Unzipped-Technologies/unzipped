import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Text} from '../';
import theme from '../theme';
import 'simplebar';

/**
 * Tabbed Navigation Component Styling
 */
const MainContainer = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
`;

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
`;
export const Simplebar = styled.div`
    width: 100%;
    z-index: 1;
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint2};
        opacity: 0.1;
    }
    .simplebar-track > .simplebar-scrollbar.simplebar-visible:before {
        opacity: 0.3;
    }
    .simplebar-track[style] {
        background-color: transparent !important;
    }
    .simplebar-placeholder {
        width: auto !important;
        height: 1px;
    }
`;

const StyledTextContainer = styled.div`
    &:not(:last-of-type) {
        margin-right: 40px;
    }
    & > a {
        text-decoration-color: ${({theme}) => theme.primary} !important;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const SpaceBetweenContainer = styled.div`
    position: relative;
    z-index: 2;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`;

const Line = styled.div`
    position: relative;
    top: -3px;
    z-index: 1;
    height: 2px;
    background: ${theme.tint3};
`;

const UnderLine = styled.div`
    position: relative;
    z-index: 3;
    margin-top: 20px;
    height: 4px;
    border-radius: 4px;
    background: ${props => (props.isCurrent ? `${props.activeColor}` : `transparent`)};
`;

const TabbedNavigation = ({activeColor, children, fontWeight, notActiveColor, onClick, tabs}) => {
    let currentTabIndex = -1;
    return (
        <MainContainer>
            <SpaceBetweenContainer>
                <Simplebar data-simplebar>
                    <Container>
                        {tabs.map((tab, index) => {
                            const isCurrent = !!tab.isCurrent;
                            if (isCurrent) {
                                currentTabIndex = index;
                            }
                            const textColor = isCurrent ? activeColor : notActiveColor;
                            return (
                                <StyledTextContainer key={index}>
                                    <Link to={`/${tab.to}`}>
                                        <Text
                                            color={textColor}
                                            fontWeight={fontWeight}
                                            onClick={() => {
                                                onClick(currentTabIndex, index);
                                            }}
                                            whiteSpace={'nowrap'}>
                                            {tab.name}
                                        </Text>
                                    </Link>
                                    <UnderLine isCurrent={isCurrent} activeColor={activeColor} />
                                </StyledTextContainer>
                            );
                        })}
                    </Container>
                </Simplebar>
                {children}
            </SpaceBetweenContainer>
            <Line />
        </MainContainer>
    );
};

TabbedNavigation.propTypes = {
    /* Color of active tabs */
    activeColor: PropTypes.string,
    /* Font weight */
    fontWeight: PropTypes.string,
    /* Color of non active tabs */
    notActiveColor: PropTypes.string,
    /* Functions fired on nav item click */
    onClick: PropTypes.func,
    /* Object with tab data */
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            to: PropTypes.string.isRequired,
            isCurrent: PropTypes.bool.isRequired,
        }),
    ).isRequired,
    /* Child elements or components */
    children: PropTypes.node,
};

TabbedNavigation.defaultProps = {
    children: null,
    activeColor: theme.primary,
    fontWeight: '600',
    notActiveColor: theme.textSecondary,
    onClick: () => {},
};

export default TabbedNavigation;
