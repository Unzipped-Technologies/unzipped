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
    font-weight: 600;
    font-size: ${({small}) => small ? '16px' : '18px'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-bottom: ${({noMargin, half}) => noMargin ? '0px' : half ? '7px' :'15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    text-align: ${({center}) => center ? 'center' : 'unset'};
    width: 96%;
    align-items: center;
    color: ${({color}) => color ? color : theme.text2};
`;

const DarkText = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: ${({bold}) => bold ? '600' : '400'};
    font-size: ${({small, fontSize}) => small ? '14px' : fontSize ? fontSize : '16px'};
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-top: ${({topMargin}) => topMargin ? topMargin : 'unset'};
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
    text-overflow: ${({textOverflow}) => textOverflow ? textOverflow : 'unset'};
    white-space: ${({textOverflow}) => textOverflow ? 'nowrap' : 'unset'};
    overflow: ${({textOverflow}) => textOverflow ? 'hidden' : 'unset'};
    width: 96%;
    text-align: ${({center}) => center ? 'center' : 'unset'};
    color: ${theme.text2};
    &:hover {
        color: ${({hover}) => hover ? theme.selectedText : theme.text2}
    }
`;

const Absolute = styled.div`
    position: absolute;
    display: flex;
    flex-flow: row;
    align-items: center;
    text-overflow: ${({textOverflow}) => textOverflow ? textOverflow : 'unset'};
    width: ${({width}) => width ?  width : 'unset'};
    top: ${({top}) => top ? top : 'unset'};
    right: ${({left, right}) => left ? 'unset' : right ? right : '10px'};
    left: ${({left}) => left ? '10px' : 'unset'};
`;

const Underline = styled.div`
    border-bottom: solid 1px ${({color}) => color ? color : '#d8d8d8'};
    margin: ${({noMargin}) => noMargin ? "5px 0px 0px 0px" : "5px 0px"};
`;

const WhiteCard = styled.div`
    background: ${({background}) => background ? background : '#fff'};
    border: 1px ${({borderColor}) => borderColor ? borderColor : '#d8d8d8'} solid;
    border-radius: ${({borderRadius}) => borderRadius ? borderRadius : '5px'};
    width: 100%;
    display: flex;
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    flex-flow: ${({row}) => row ? 'row' : 'column'};
    height: ${({size, unset, height}) => size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : unset ? 'unset' : height ? height :'63px'};
    align-items: center;
    padding: ${({padding}) => padding ? padding : '20px 20px'};
    position: relative;
    box-shadow: ${({shadow}) => shadow ? shadow : 'none'};
    margin-bottom: ${({noMargin, half}) => noMargin ? '0px' : half ? '12px' : '24px'};
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
    width: 80%;
    margin: ${({margin}) => margin ? margin : '75px 0px'};
`;

module.exports = {
    BlackCard,
    WhiteText,
    Grid,
    Grid2,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss,
    Underline,
    SelectCard
}