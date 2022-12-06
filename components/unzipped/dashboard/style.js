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
    font-weight: 400;
    font-size: ${({small, fontSize}) => small ? '14px' : fontSize ? fontSize : '16px'};
    cursor: ${({clickable}) => clickable ? 'pointer' : 'default'};
    line-height: ${({lineHeight}) => lineHeight ? lineHeight : '24px'};
    letter-spacing: 0.15008px;
    margin-top: ${({topMargin}) => topMargin ? topMargin : 'unset'};
    margin-bottom: ${({noMargin}) => noMargin ? '0px' : '15px'};
    margin-left: ${({paddingLeft}) => paddingLeft ? '20px' : '0px'};
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
    top: ${({top}) => top ? top : 'unset'};
    right: ${({left}) => left ? 'unset' : '10px'};
    left: ${({left}) => left ? '10px' : 'unset'};
`;

const Underline = styled.div`
    border-bottom: solid 1px ${({color}) => color ? color : '#d8d8d8'};
    margin: 5px 0px;
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

module.exports = {
    BlackCard,
    WhiteText,
    TitleText,
    DarkText,
    Absolute,
    WhiteCard,
    Dismiss,
    Underline
}