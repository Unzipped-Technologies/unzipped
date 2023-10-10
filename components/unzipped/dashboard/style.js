import styled from 'styled-components'
import theme from '../../ui/theme'

const BlackCard = styled.div`
    background: #202123;
    border-radius: 5px;
    width: 100%;
    display: flex;
    flex-flow: row;
    height: 87px;
    align-items: center;
    padding: 0px 40px;
    position: relative;
    margin-bottom: 24px;
`;


const WhiteText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0.15008px;

    color: ${theme.text};
`;

const TitleText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${({light,lighter})=> light ? '400' :lighter ? '300' : '600'};
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    font-size: ${({smallest,small, title, size}) => small ? '15px' : title ? '36px' : size? size : '16px'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-bottom: ${({noMargin, half, large}) => noMargin ? '0px' : half ? '7px' : large ? '45px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    text-align: ${({center}) => center ? 'center' : 'unset'};
    width: ${({width}) => width ? width : '96%'};
    align-items: center;
    text-overflow: ${({textOverflow}) => textOverflow ? textOverflow : 'unset'};
    white-space: ${({textOverflow}) => textOverflow ? 'nowrap' : 'unset'};
    overflow: ${({textOverflow}) => textOverflow ? 'hidden' : 'unset'};
    color: ${({color}) => color ? color : theme.text2};
`;

const DarkText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    position: relative;
    font-weight: ${({bold,lighter}) => bold ? '600' : lighter ? '300' : '400'};
    font-size: ${({small, fontSize}) => small ? '14px' : fontSize ? fontSize : '16px'};
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    line-height: ${({lineHeight, fontSize}) => lineHeight ? lineHeight : fontSize ? fontSize : '24px'};
    letter-spacing: 0.15008px;
    margin-top: ${({topMargin}) => topMargin ? topMargin : 'unset'};
    margin-bottom: ${({noMargin, marginLarge, half}) => noMargin ? '0px' : marginLarge ? '35px'  : half ? '7px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    margin-right: ${({marginRight}) => marginRight ? marginRight : '0px'};
    padding-top: ${({topPadding}) => topPadding ? '10px' : '0px'};
    text-overflow: ${({textOverflow}) => textOverflow ? textOverflow : 'unset'};
    white-space: ${({textOverflow}) => textOverflow ? 'nowrap' : 'pre-line'};
    overflow: ${({textOverflow}) => textOverflow ? 'hidden' : 'unset'};
    width: 96%;
    text-align: ${({center, right}) => center ? 'center' : right ? 'right' : 'unset'};
    color: ${({error, color}) => !error ? color ? color : theme.text2 : theme.error};
    &:hover {
        color: ${({hover, color}) => hover ? theme.selectedText : color ? color : theme.text2}
    }
    @media(max-width: 750px) {
        font-size: ${({small, fontSize}) => small ? '14px' : fontSize ? `${(fontSize.replace('px', '') * 0.75) > 16 ? fontSize.replace('px', '') * 0.75 : 16}px` : '16px'};
        line-height: ${({lineHeight, fontSize}) => lineHeight ? `${(lineHeight.replace('px', '') * 0.75) > 16 ? lineHeight.replace('px', '') * 0.75 : 16}px` : fontSize ? `${(fontSize.replace('px', '') * 0.75) > 16 ? fontSize.replace('px', '') * 0.75 : 18}px` : '18px'};
    }
    @media(max-width: 416px) {
        margin-left: ${({paddingLeft}) => paddingLeft ? '10px' : '0px'};
        font-size: ${({small}) => small ? '14px' : '16px'};
        line-height: '18px';
    }
    @media(max-width: 341px) {
        margin-left: ${({paddingLeft}) => paddingLeft ? '5px' : '0px'};
        font-size: ${({small}) => small ? '12px' : '14px'};
        line-height: '16px';
    }
`

const Absolute = styled.div`
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    text-overflow: ${({textOverflow}) => textOverflow ? textOverflow : 'unset'};
    width: ${({width}) => width ?  width : 'unset'};
    top: ${({top}) => top ? top : 'unset'};
    bottom: ${({bottom}) => bottom ? bottom : 'unset'};
    right: ${({left, right}) => left ? 'unset' : right ? right : '10px'};
    left: ${({left, wideLeft, smallLeft}) => left ? '10px' : wideLeft ? '20px' : smallLeft ? '0px' : 'unset'};
    z-index: ${({zIndex}) => zIndex ? zIndex : 'inherit'};
    @media(max-width: ${({hide}) => hide ? hide + 'px' : '0px'}) {
        display: none;
    }
`;

const Underline = styled.div`
    border-bottom: solid 1px ${({color}) => color ? color : '#d8d8d8'};
    margin: ${({noMargin, margin}) => noMargin ? "5px 0px 0px 0px" : margin ? margin : "5px 0px"};
    width: ${({width}) => width ? width : 'unset'}
`;

const WhiteCard = styled.div`
@media (min-width: 681px) {
    overflow: visible hidden;
    background: ${({background}) => background ? background : '#fff'};
    border: 1px ${({borderColor}) => borderColor ? borderColor : '#d8d8d8'} solid;
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '5px'};
    max-width: ${({maxWidth}) => maxWidth ? maxWidth : 'unset'};
    width: 100%;
    display: flex;
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    flex-flow: ${({row}) => row ? 'row' : 'column'};
    height: ${({size, unset, height,cardHeightDesktop}) => size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : unset ? 'unset' : cardHeightDesktop ? '262px' : height ? height :'63px'};
    align-items: ${({alignEnd}) => alignEnd ? 'flex-end' : 'center'};
    justify-content: ${({center, justifyEnd}) => center ? 'center' : justifyEnd ? 'flex-end' : 'normal'};
    padding: ${({padding}) => padding ? padding : '20px 20px'};
    position: relative;
    box-shadow: ${({shadow}) => shadow ? shadow : 'none'};
    margin-bottom: ${({noMargin, half}) => noMargin ? '0px' : half ? '12px' : '24px'};
    overflow: ${({overflow,overlayDesktop}) => overflow ? overflow : overlayDesktop ? 'visible hidden' : 'visible'};
}
    
`;

const SelectCard = styled.div`
    background: ${({background}) => background ? background : '#D9D9D9'};
    border: 1px ${({borderColor}) => borderColor ? borderColor : 'transparent'} solid;
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '0px'};
    width: 100%;
    display: flex;
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    flex-flow: ${({row}) => row ? 'column' : 'row'};
    height: ${({size, unset, height}) => size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : unset ? 'unset' : height ? height :'87px'};
    align-items: center;
    padding: ${({padding}) => padding ? padding : '20px 20px'};
    position: relative;
    box-shadow: ${({shadow}) => shadow ? shadow : 'none'};
    margin-bottom: ${({noMargin, half}) => noMargin ? '0px' : half ? '12px' : '24px'};
`;

const Dismiss = styled.div`
    font-weight: 500;
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.39998px;
    text-decoration-line: underline;
    text-transform: uppercase;
    cursor: pointer;
    color: #282932;

    margin: 0px 20px;
`;

const Grid = styled.div`
    display: grid;
    justify-items: ${({left}) => left ? 'left' : 'center'};
    align-items: center;
    width: 100%;
    margin: ${({margin}) => margin ? margin : '75px 0px'};
`;

const Grid2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: ${({block}) => block ? '100%' : '80%'};
    margin: ${({margin}) => margin ? margin : '75px 0px'};
`;

const Grid3 = styled.div`
    display: grid;
    grid-template-columns: ${({grid}) => grid ? grid : '1fr 1fr 1fr'};
    align-items: center;
    width: ${({block, width}) => block ? '100%' : width ? width : '80%'};
    margin: ${({margin}) => margin ? margin : '75px 0px'};
`;

const Box = styled.div`
    display: flex;
    flex-flow: row;
    width: 100%;
    align-items: center;
    margin: 6px 0px;
`;

export const Title = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 800;
    font-size: 52px;
    line-height: 56px;
    letter-spacing: 0.39998px;
    min-width: 80%;
    color: #fff;
    padding: 20px;
    margin-bottom: 10px;
    @media (max-width: 1435px) {
        min-width: 90%;
    }
`;

export const SimpleText = styled.span`
    display: flex;
    flex-flow: row;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24.5px;
    letter-spacing: 0.39998px;
    align-items: center;
    color: #333;
`;

export const Span = styled.span`
    display: flex;
    flex-flow: row;
    position: relative;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${({bold}) => bold ? 600 : 400};
    font-size: ${({size}) => size ? size : '26px'};
    line-height: 45px;
    letter-spacing: 0.39998px;
    width: ${({unset}) => unset ? 'unset' : '100%'};
    margin: ${({margin}) => margin ? margin : 'unset'};
    margin-left: ${({space}) => space ? '6px' : 'unset'};
    align-items: ${({top}) => top ? top : 'center'};
    color: ${({dark}) => dark ? theme.text2 : '#FFFFFF'};
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
`;

export const DarkSpan = styled.span`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: ${({large,small,medium})=> large?'24px':small?'15px':'18px'};
    padding-left: 3px;
    color: #333;
`;

export const PaddingLeft = styled.span`
    padding-left: 10px;
`;

export const MinWidth = styled.span`
    min-width: 10%;
`;



module.exports = {
    BlackCard,
    MinWidth,
    WhiteText,
    Grid,
    Grid2,
    DarkSpan,
    Grid3,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss,
    SimpleText,
    Underline,
    SelectCard,
    Span,
    Box,
    PaddingLeft,
    Title
}