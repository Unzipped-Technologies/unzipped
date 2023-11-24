import styled from 'styled-components';
import {Icon} from '../../';

export const Tile = styled.div`

    background:  ${props => (props.selected ? '#8EDE64' : '#fff')}} ;
    border:  ${props => (props.selected ? '4px solid #DE43DE' : '1px solid')};
    border-radius: 10px;
    color: ${props => (props.selected ? props.theme.selectedText : props.theme.textSecondary)};
    margin: ${({margin}) => margin ? margin : '0'};
    width: ${({width}) => width ? width : '366px'};
    position: relative;
    text-align: left;

`;

export const RadioInput = styled.input.attrs({type: 'radio'})`
    width: 90%;
`;

export const TextBox = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 00px 0px;
`;

export const OptionLabel = styled.label`
    cursor: pointer;
    display: flex;
    flex-direction: ${({row}) => row ? 'row' : 'column'};
    align-items: center;
    justify-content: flex-start;
    align-items: center;
    font-family: Arial;
    font-size: ${props => props.theme.fontSizeS};
    font-weight: 700;
    height: 100%;
    padding: ${({small, mobile}) => mobile ? '30px 15px' : small ? '20px' : '30px'};
    width: 100%;
    @media (max-width: ${props => props.theme.tableMobileWidth}px) {
        font-size: ${props => props.theme.fontSizeXS};
    }
    [type="radio"]:checked+span:after, [type="radio"].with-gap:checked+span:after {
    background-color: #DE43DE ;
    border: 3px solid white;
    outline: 3px solid #DE43DE;
    }
`;

export const TextSpan = styled.span`
    text-transform: uppercase;
    line-height: ${props => props.theme.lineHeightXS};
    color: ${props => (props.checked ? '#DE43DE' : '#333')};
    
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
