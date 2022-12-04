import styled from 'styled-components';
import Link from 'next/link';
import {Checkbox, InlineLink as InlineLinkBase} from '../../';
import theme from '../../theme';

export const Table = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    font-family: Arial;
    font-size: 0.8rem;
    border: 2px solid ${props => props.theme.tint3};
    box-sizing: border-box;
    border-radius: 4px;
    align-items: center;
    margin: 0;
    line-height: 1.5;
    flex: 1 2 auto;
    max-width: ${({isFullWidth}) => (isFullWidth ? 'auto' : '900px')};
    width: 100%;
    @media (max-width: ${props => props.theme.mobileWidth}px) {
        min-width: auto;
        border: none;
        display: grid;
        height: auto;
    }
`;

export const Empty = styled.div`
    padding-top: 30px;
    font-family: Arial;
    color: ${props => props.theme.textSecondary};
`;

const tr = `
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    background-color: white;
`;

export const THead = styled.div`
    ${tr};
    position: relative;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizeXS};
    line-height: 2.625rem;
    background-color: ${props => props.theme.tint5};
    height: 44px;
    align-items: center;
    border-bottom: ${({$isEmpty, theme}) => ($isEmpty ? 'initial' : `1px solid ${theme.tint3}`)};
    color: ${props => props.theme.textSecondary};
    justify-content: ${({noChecksNorRadios, isFullWidth}) =>
        (!isFullWidth && 'flex-start;') || (!noChecksNorRadios && 'center;')}
    :first-of-type div input {
        visibility: hidden;
    }
`;

export const Radio = styled.input``;

export const BodyT = styled.div`
    ${tr};
    position: relative;
    align-items: center;
    min-width: 100%;
    ${({isFirstOrLastCol}) => isFirstOrLastCol && `justify-content: center;`};
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        display: flex;
        flex-direction: column;
        height: fit-content;
        background: transparent;
    }
`;
BodyT.displayName = 'BodyT';

export const TRow = styled.div`
    ${tr};
    font-size: ${props => props.theme.baseFontSize};
    line-height: 1.125rem;
    font-weight: normal;
    height: 84px;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.tint3};
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        display: flex;
        grid-template-columns: 1fr;
        justify-items: left;
        border: 2px solid ${props => props.theme.tint3};
        border-radius: 4px;
        width: ${props => (props.isMobile ? '100%' : '335px')};
        height: fit-content;
        padding: 5px;
        margin-bottom: 20px;
    }
`;

export const RightSideGradient = styled.div`
    position: absolute;
    top: ${props => (props.type === 'checkbox' ? `47px;` : `44px;`)};
    right: ${props => (props.hasMultipleActions ? `90px;` : `130px;`)};
    width: 15px;
    height: ${props => (props.type === 'checkbox' ? `calc(100% - 47px);` : `calc(100% - 44px);`)};
    justify-content: center;
    background: linear-gradient(to left, rgba(234, 234, 234, 1), rgba(255, 255, 255, 0));
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        background: transparent;
    }
`;

export const LeftSideGradient = styled.div`
    position: absolute;
    left: ${props => props.left};
    top: ${props => (props.type === 'checkbox' ? `47px;` : `44px;`)};
    width: 15px;
    height: ${props => (props.type === 'checkbox' ? `calc(100% - 47px);` : `calc(100% - 44px);`)};
    justify-content: center;
    background: linear-gradient(to right, rgba(234, 234, 234, 1), rgba(255, 255, 255, 0));
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        background: transparent;
    }
`;

export const TItem = styled.div`
    display: flex;
    cursor: ${({button}) => (button ? 'pointer' : 'default')};
    user-select: ${({button}) => (button ? 'none' : 'auto')};
    flex-direction: row;
    border: transparent;
    word-break: break-word;
    align-items: center;
    text-overflow: ellipsis;
    min-width: 0;
    width: ${({width, fullWidthSingleActionMobile}) =>
        width ? width : fullWidthSingleActionMobile ? '100%' : '100px'};
    white-space: ${({multiline}) => (multiline ? 'normal' : 'nowrap')};
    padding-right: ${({multiline}) => (multiline ? '10px' : '0px')};
    overflow: ${({multiline}) => (multiline ? 'hidden' : 'visible')};
    &:hover {
        overflow: ${({multiline}) => (multiline ? 'auto' : 'visible')};
    }
    ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
    }
    ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 7px;
        background: #cccccc;
    }
    flex-wrap: ${({multiline}) => (multiline ? 'wrap' : 'nowrap')};
    height: 100%;
    justify-content: ${({childIsComponent}) => (childIsComponent ? 'center' : 'left')};
    line-height: ${props => props.theme.baseLineHeight};
    :first-of-type {
        padding-left: ${({isFullWidthAction, singleActionTitle}) =>
            isFullWidthAction ? `0;` : singleActionTitle ? `0;` : `20px;`};
    }
    ${({$action, isFullWidthAction, fullWidthSingleActionMobile}) =>
        $action &&
        `
        ${({fullWidthSingleActionMobile}) => {
            !fullWidthSingleActionMobile &&
                `
            position: absolute;
            right: ${isFullWidthAction ? `13px;` : `20px;`}
            width: ${isFullWidthAction ? `100px;` : `125px;`}
            `;
        }}
        text-align: left;
        padding-left: 0;
        justify-items: left;
        button {
            width: ${fullWidthSingleActionMobile ? `100%;` : `125px;`};
            text-align: left;
            div {
                padding-left: 0;
            }
            ${fullWidthSingleActionMobile && `margin: 20px; margin-bottom: 30px;`}
        }
        @media (max-width: ${props => props.theme.tableMobileWidth}px) {
            position: relative;
            right: 0;
            justify-items: center;
            width: 100%;
        }
    `}
    ${({right, isFullWidth}) =>
        right &&
        `
        position: absolute;
        right: ${!isFullWidth ? '39px' : '63px'};
        width: 40px;
        height: 100%;
        justify-content: center;
        @media (max-width: ${props => props.theme.tableMobileWidth}px) {
            position: relative;
            justify-items: center;
            width: 100%;
        }
    `}
    ${({fullWidthMultiActionMobile}) =>
        fullWidthMultiActionMobile &&
        `
        right: 22px;
        margin-top: 22px;
        height: 0;
    `}
    ${({fullWidthSingleActionMobile}) =>
        fullWidthSingleActionMobile &&
        `
        position: relative
    `}
    ${({fullWidthMultiActionDesktop}) =>
        fullWidthMultiActionDesktop &&
        `
        right: unset;
        width: unset;
    `};
    ${({upperCaseHeadings}) => upperCaseHeadings && 'text-transform: uppercase;'};
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        flex-flow: column nowrap;
        margin-right: auto;
        font-size: ${props => props.theme.fontSizeXS};
        font-weight: 400;
        line-height: ${props => props.theme.lineHeightXS};
        text-align: left;
        padding-left: 20px;
        padding-right: 20px;
        ${({shift}) =>
            shift &&
            `
        padding-left: 45px;
    `}
        ${({bold}) =>
            bold &&
            `
        font-weight: bold;
        font-size: ${props => props.theme.fontSizeS};
        line-height: ${props => props.theme.lineHeightS};
    `}
    }
`;
TItem.displayName = 'TItem';

export const Checkmark = styled(Checkbox)`
    display: flex;
    padding-bottom: ${({isMobile}) => (isMobile ? '0' : `5px`)};
    ${({selectTitle}) => !!selectTitle && 'margin-left: 10px;'}
`;

export const CheckTitle = styled.div`
    padding-right: 10px;
`;

export const RadioTitle = styled.div`
    padding-left: 20px;
`;

export const Select = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    bottom: 4px;
    width: ${({width}) => width}px;
    white-space: nowrap;
    input {
        appearance: none;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        border: 2px solid ${props => props.theme.tint2};
        &:checked {
            border: 5px solid ${props => props.theme.secondary};
        }
    }
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        position: absolute;
        height: 0;
        width: 18px;
        padding: 0;
        margin: 0;
        left: 19px;
        top: ${({$radio}) => ($radio ? '28px' : '22px')};
    }
`;

export const FilterIcons = styled.div`
    display: flex;
    padding-top: 2px;
    outline: none;
    border: none;
    background-color: transparent;
    padding-left: 10px;
    flex-flow: column;
    align-items: center;
    svg {
        path {
            color: ${props => `${props.theme.secondary}`};
        }
    }
    :nth-of-type(1) svg {
        margin-bottom: 2.5px;
    }
`;

export const Box = styled.div`
    width: 100%;
    min-width: 100%;
    ${({isMiddleCol}) => isMiddleCol && `padding-top: 44px;  width: fit-content;`};
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        justify-items: center;
    }
`;

export const FullWidthContainer = styled.div`
    display: flex;
    width: 100%;
`;

export const LeftSidebar = styled.div`
    position: sticky;
    width: ${props => props.width};
    top: 0;
    left: 0;
    color: black;
    flex-grow: 0;
    flex-shrink: 0;
`;

export const RightSidebar = styled.div`
    position: sticky;
    width: ${props => (props.hasMultipleActions ? `90px;` : `130px;`)};
    top: 0;
    right: 0;
    flex-grow: 0;
    flex-shrink: 0;
`;

export const Content = styled.div`
    position: relative;
    flex-grow: 0;
    flex-shrink: 0;
`;

export const ScrollableWrapper = styled.div`
    width: 100%;
    position: relative;
    @media (min-width: ${theme.mobileWidth}px) and (max-width: ${theme.extraLargeScreen}px) {
        padding-bottom: ${({isPadding}) => (isPadding ? '5px' : '0px')};
    }
`;

export const FullWidthTHead = styled.div`
    ${tr};
    position: absolute;
    width: unset;
    left: 0;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizeXS};
    line-height: 2.625rem;
    background-color: ${props => props.theme.tint5};
    height: 44px;
    min-width: 100%;
    align-items: center;
    border-bottom: ${({$isEmpty, theme}) => ($isEmpty ? 'initial' : `1px solid ${theme.tint3}`)};
    color: ${props => props.theme.textSecondary};
    :first-of-type div input {
        visibility: hidden;
    }
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        display: none;
    }
`;

export const TableLink = styled(Link)`
    white-space: ${({$multiline}) => ($multiline ? 'normal' : 'nowrap')};
    overflow: ${({$multiline}) => ($multiline ? 'hidden' : 'visible')};
    font-weight: ${({$bold}) => ($bold ? '700' : 'normal')};
    color: ${props => props.theme.secondary};
    text-decoration: unset;
    &:link {
        color: ${({theme}) => theme.secondary};
        text-decoration: none;
    }
    &:visited {
        color: ${({theme}) => theme.secondary};
        text-decoration: none;
    }
    &:hover {
        color: ${({theme}) => theme.secondary};
        text-decoration: underline;
    }
    &:active {
        color: ${({theme}) => theme.secondary};
        text-decoration: underline;
    }
`;

export const SimpleBar = styled.div`
    .simplebar-wrapper {
        height: unset;
    }
    .simplebar-track > .simplebar-scrollbar:before {
        background-color: ${props => props.theme.tint2};
    }
    .simplebar-track {
        background-color: transparent !important;
    }
`;

export const MobileCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
MobileCard.displayName = 'MobileCard';

export const FullWidthMobileRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 20px 20px 0 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${({theme}) => theme.tint3};
    :last-of-type {
        border-bottom: 0;
    }
`;
FullWidthMobileRow.displayName = 'FullWidthMobileRow';

export const MobileColTitle = styled.div`
    font-family: arial;
    font-weight: 700;
    font-size: ${props => props.theme.fontSizeXXS};
    color: ${({theme}) => theme.textSecondary};
`;

export const MobileColValue = styled.div`
    font-family: arial;
    font-weight: 400;
    font-size: ${props => props.theme.fontSizeS};
    color: ${({theme}) => theme.textSecondary};
    text-align: right;
`;

export const InlineLink = styled(InlineLinkBase)`
    align-items: flex-start;
    white-space: ${({multiline}) => (multiline ? 'normal' : 'nowrap')};
    overflow: ${({multiline}) => (multiline ? 'hidden' : 'visible')};
`;

export const FullWidthMobileHeader = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: ${({tableType}) => (tableType === 'radio' ? '20px' : '16px')};
    margin-right: 25px;
    margin-bottom: 0;
    margin-left: ${({tableType}) => (tableType === 'default' ? '20px' : '42px')};
`;
FullWidthMobileHeader.displayName = 'FullWidthMobileHeader';
