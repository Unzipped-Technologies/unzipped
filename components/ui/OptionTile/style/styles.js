import styled from 'styled-components';
import {Icon} from '../../';

export const Tile = styled.div`
    background: ${props => (props.selected ? props.theme.secondaryLight : props.theme.tint4)};
    border: 1px solid ${props => (props.selected ? props.theme.selectedText : 'transparent')};
    border-radius: 4px;
    color: ${props => (props.selected ? props.theme.selectedText : props.theme.textSecondary)};
    margin: 0;
    position: relative;
    text-align: center;
`;

export const RadioInput = styled.input.attrs({type: 'radio'})`
    position: absolute;
    visibility: hidden;
`;

export const OptionLabel = styled.label`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeS};
    font-weight: 700;
    height: 100%;
    padding: 30px;
    width: 100%;
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        font-size: ${props => props.theme.fontSizeXS};
    }
`;

export const TextSpan = styled.span`
    max-width: 140px;
    text-transform: uppercase;
    line-height: ${props => props.theme.lineHeightXS};
`;

export const SecondaryTextSpan = styled.span`
    font-size: ${props => props.theme.fontSizeXS};
    font-weight: normal;
    max-width: 140px;
    padding-top: 8px;
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        font-size: ${props => props.theme.fontSizeXXS};
    }
`;

export const StyledIcon = styled(Icon)`
    padding-bottom: 10px;
`;
