import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'simplebar';
import Icon from 'components/ui/Icon';
import VanillaLogo from 'images/vanilla-wordmark-rgb.svg';
import theme from 'themes/default';

const HeaderContainer = styled.header`
    align-items: center;
    background-color: ${({theme}) => theme.tint5};
    border: 2px solid ${props => props.theme.border};
    border-style: none none solid none;
    display: flex;
    max-height: ${({$mobileVariation}) => ($mobileVariation ? 55 : 165)}px;
    justify-content: space-between;
    width: 100vw;
`;

const HeaderImage = styled.img`
    max-height: ${({$mobileVariation}) => ($mobileVariation ? 50 : 145)}px;
    padding-bottom: ${({$mobileVariation}) => ($mobileVariation ? 5 : 14)}px;
    padding-top: ${({$mobileVariation}) => ($mobileVariation ? 10 : 40)}px;
    margin: 0 auto;
`;

const LeftContainer = styled.div`
    flex: 1;
    margin-left: 58px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-start;
    gap: 25px;
`;

const RightContainer = styled.div`
    flex: 1;
    margin-right: 58px;
    text-align: right;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    gap: 25px;
`;

const DashboardMenuIcon = styled(Icon)`
    position: absolute;
    left: 20px;
`;

export const HeaderLink = styled.a`
    color: ${({theme}) => theme.text};
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeM};
    font-weight: bold;
    text-decoration: none;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    & :first-child {
        display: none;
    }
    ${({$mobileVariation, theme}) =>
        $mobileVariation &&
        `
        color: ${theme.primary};
        font-weight: 400;
        padding: 20px 0 20px 3px;
        & :first-child {
            display: flex;
            margin-right: 35px;`}
`;

/**
 * Header designed for the Vanilla dashboard
 */
const DashboardHeader = ({leftElements, rightElements, toggleShowSidebar, mobileVariation}) => {
    const Items = ({items}) => {
        if (!items) return items;
        return items.map((item, index) => <Fragment key={index}>{item}</Fragment>);
    };

    return (
        <>
            <HeaderContainer $mobileVariation={mobileVariation}>
                {mobileVariation && leftElements?.length > 0 ? (
                    <DashboardMenuIcon
                        height="22"
                        width="22"
                        fill={theme.primary}
                        name="menu"
                        $open={true}
                        onClick={toggleShowSidebar}
                    />
                ) : (
                    <LeftContainer>
                        <Items items={leftElements} />
                    </LeftContainer>
                )}
                <HeaderImage src={VanillaLogo} alt={'Vanilla Logo'} $mobileVariation={mobileVariation} />
                {!mobileVariation && (
                    <RightContainer>
                        <Items items={rightElements} />
                    </RightContainer>
                )}
            </HeaderContainer>
        </>
    );
};

DashboardHeader.propTypes = {
    /* Toggles Sidebar state in parent */
    toggleShowSidebar: PropTypes.func,
    /* Array of elements for left-align container */
    leftElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    /* Array of elements for right-align container */
    rightElements: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
    /* Boolean to show or hide the mobile view */
    mobileVariation: PropTypes.bool,
};

DashboardHeader.defaultProps = {
    leftElements: null,
    rightElements: null,
    toggleShowSidebar: () => {},
    mobileVariation: false,
};

export default DashboardHeader;
