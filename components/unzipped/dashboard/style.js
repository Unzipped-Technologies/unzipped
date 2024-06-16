import styled, { keyframes } from 'styled-components'
import theme from '../../ui/theme'

const BlackCard = styled.div`
  background: #202123;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-flow: row;
  min-height: 87px;
  align-items: center;
  padding: 0px 40px;
  position: relative;
  margin-bottom: ${({ smallMargin }) => (smallMargin ? '10px' : '24px')};
  @media (max-width: 681px) {
    justify-content: space-between;
    padding: 15px 20px;
    margin-top: 20px;
    display: ${({ display }) => (display ? display : 'flex')};
  }
`

const WhiteText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  letter-spacing: 0.15008px;
  color: ${theme.text};
`

const TitleText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: ${({ light, lighter }) => (light ? '400' : lighter ? '300' : '600')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  font-size: ${({ titleFontSize, smallest, small, title, size, mobile }) =>
    titleFontSize ? titleFontSize : mobile ? '22px' : small ? '15px' : title ? '36px' : size ? size : '16px'};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24px')};
  letter-spacing: 0.15008px;
  margin-bottom: ${({ mobile, noMargin, half, large }) =>
    mobile ? '8px' : noMargin ? '0px' : half ? '7px' : large ? '45px' : '15px'};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0px')};
  padding-left: ${({ paddingLeft }) => (paddingLeft ? '20px' : '0px')};
  text-align: ${({ center }) => (center ? 'center' : 'unset')};
  width: ${({ width }) => (width ? width : '96%')};
  align-items: center;
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? 'normal' : 'unset')};
  overflow: ${({ textOverflow }) => (textOverflow ? 'hidden' : 'unset')};
  color: ${({ color }) => (color ? color : theme.text2)};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '')};
  padding-right: ${paddingRight => (paddingRight ? paddingRight : '')};
  padding-top: ${paddingTop => (paddingTop ? paddingTop : '')};
  @media screen and (max-width: 600px) {
    width: ${({ width }) => (width ? width : '100%')};
    display: flex;
  }
`

const HeadingText = styled.div`
  display: ${({ doubleScreenBottom }) => (doubleScreenBottom ? 'none' : 'block')};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: #000;
`

const DarkText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  position: relative;
  word-break: break-word;
  font-weight: ${({ bold, lighter }) => (bold ? '600' : lighter ? '300' : '400')};
  font-size: ${({ small, fontSize }) => (small ? '14px' : fontSize ? fontSize : '16px')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  line-height: ${({ lineHeight, fontSize }) => (lineHeight ? lineHeight : fontSize ? fontSize : '24px')};
  letter-spacing: 0.15008px;
  margin-top: ${({ topMargin }) => (topMargin ? topMargin : '0px')};
  margin-bottom: ${({ noMargin, marginLarge, half, bottomMargin }) =>
    bottomMargin ? '22px' : noMargin ? '0px' : marginLarge ? '35px' : half ? '7px' : '15px'};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0px')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0px')};
  padding-top: ${({ topPadding }) => (topPadding ? '10px' : '0px')};
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  white-space: ${({ textOverflow }) => (textOverflow ? 'nowrap' : 'pre-line')};
  overflow: ${({ textOverflow }) => (textOverflow ? 'hidden' : 'unset')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  padding-left: ${({ paddingLeft, smallPadding }) => (paddingLeft ? (smallPadding ? smallPadding : '20px') : '0px')};
  width: ${({ width }) => (width ? width : '96%')};
  text-align-last: ${({ textAlignLast }) => (textAlignLast ? textAlignLast : '')};
  text-align: ${({ center, right, justify }) => (center ? 'center' : right ? 'right' : justify ? 'justify' : 'unset')};
  color: ${({ error, color }) => (!error ? (color ? color : theme.text2) : theme.error)};
  background: ${({ backgroundColor }) => (backgroundColor ? backgroundColor : '')};
  &:hover {
    color: ${({ hover, color }) => (hover ? theme.selectedText : color ? color : theme.text2)};
  }
  @media (max-width: 750px) {
    font-size: ${({ small, fontSize }) =>
      small
        ? '14px'
        : fontSize
        ? `${fontSize.replace('px', '') * 0.75 > 16 ? fontSize.replace('px', '') * 0.75 : 16}px`
        : '16px'};
    line-height: ${({ lineHeight, fontSize }) =>
      lineHeight
        ? `${lineHeight.replace('px', '') * 0.75 > 16 ? lineHeight.replace('px', '') * 0.75 : 16}px`
        : fontSize
        ? `${fontSize.replace('px', '') * 0.75 > 16 ? fontSize.replace('px', '') * 0.75 : 18}px`
        : '18px'};
  }

  @media screen and (max-width: 600px) {
    padding-left: ${({ paddingLeft }) => (paddingLeft ? paddingLeft : '0px')};
    margin-left: 10px;
    font-size: 16px;
    line-height: '18px';
  }

  @media (max-width: 341px) {
    margin-left: ${({ marginLeft }) => (marginLeft ? '5px' : '0px')};
    font-size: ${({ small }) => (small ? '12px' : '14px')};
    line-height: '16px';
  }
`

const Absolute = styled.div`
  position: ${({ position }) => (position ? position : 'absolute')};
  display: ${({ doubleScreenTop }) => (doubleScreenTop ? 'none' : 'flex')};
  flex-flow: row;
  align-items: center;
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  width: ${({ width }) => (width ? width : 'unset')};
  top: ${({ top }) => (top ? top : 'unset')};
  bottom: ${({ bottom }) => (bottom ? bottom : 'unset')};
  right: ${({ left, right }) => (left ? 'unset' : right ? right : '15px')};
  left: ${({ left, wideLeft, smallLeft }) => (left ? '10px' : wideLeft ? '20px' : smallLeft ? '0px' : 'unset')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 'inherit')};
  gap: ${({ gap, mobile }) => (mobile && gap ? '20px' : gap ? gap : 'unset')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  @media (max-width: ${({ hide }) => (hide ? hide + 'px' : '0px')}) {
    display: none;
  }
  @media (max-width: 681px) {
    justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : '')};
  }
`

const Underline = styled.div`
  border-bottom: solid 1px ${({ color }) => (color ? color : '#d8d8d8')};
  margin: ${({ noMargin, margin }) => (noMargin ? '5px 0px 0px 0px' : margin ? margin : '5px 0px')};
  width: ${({ width }) => (width ? width : 'unset')};
`

const WhiteCard = styled.div`
  @media (min-width: 681px) {
    padding-left: ${({ paddingLeft }) => (paddingLeft ? `${paddingLeft} !important` : '0px')};
    border-left: ${({ borderLeft }) => (borderLeft ? `4px solid ${borderLeft} !important` : '0px')};
    overflow: visible hidden;
    background: ${({ background }) => (background ? background : '#fff')};
    border: 1px ${({ borderColor }) => (borderColor ? borderColor : '#d8d8d8')} solid;
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'unset')};
    width: ${({ width }) => (width ? width : '100%')};
    // width: 100%;
    display: flex;
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
    flex-flow: ${({ row }) => (row ? 'row' : 'column')};
    min-height: ${({ size, unset, height, cardHeightDesktop }) =>
      size === 'large'
        ? '151px'
        : size === 'extraLarge'
        ? '370px'
        : unset
        ? 'unset'
        : cardHeightDesktop
        ? '262px'
        : height
        ? height
        : '63px'};
    align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'center')};
    justify-content: ${({ center, justifyEnd }) => (center ? 'center' : justifyEnd ? 'flex-end' : 'normal')};
    padding: ${({ padding }) => (padding ? padding : '20px 20px')};
    position: relative;
    box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
    margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
    overflow: ${({ overflow, overlayDesktop }) => (overflow ? overflow : overlayDesktop ? 'overlay' : 'visible')};
  }
  @media (max-width: 681px) {
    background: ${({ background }) => (background ? background : '#fff')};
    border: ${({ borderColor, noBorder }) => (noBorder ? '' : borderColor ? borderColor : '1px #d8d8d8 solid')};
    border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '5px')};
    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'unset')};
    width: 100%;
    display: ${({ display }) => (display ? display : 'flex')};
    gap: ${({ gap }) => (gap ? gap : '')};
    cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
    flex-flow: ${({ row }) => (row ? 'row' : 'column')};
    min-height: ${({ size, unset, height, cardHeightDesktop }) =>
      size === 'large'
        ? '151px'
        : size === 'extraLarge'
        ? '370px'
        : unset
        ? 'unset'
        : cardHeightDesktop
        ? '262px'
        : height
        ? height
        : '63px'};
    align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'center')};
    justify-content: ${({ center, justifyEnd }) => (center ? 'center' : justifyEnd ? 'flex-end' : 'normal')};
    padding: 0px;
    position: relative;
    box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
    margin-bottom: ${({ noMargin, half, marginBottom }) =>
      noMargin ? '0px' : half ? '12px' : marginBottom ? marginBottom : '24px'};
    overflow: ${({ overflow, overlayDesktop }) => (overflow ? overflow : overlayDesktop ? 'overlay' : 'visible')};
  }
  @media screen and (max-width: 600px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: ${({ padding }) => (padding ? padding : '0px')};
  }
`

const SelectCard = styled.div`
  background: ${({ background }) => (background ? background : '#D9D9D9')};
  border: 1px ${({ borderColor }) => (borderColor ? borderColor : 'transparent')} solid;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  width: 100%;
  display: flex;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  flex-flow: ${({ row }) => (row ? 'column' : 'row')};
  height: ${({ size, unset, height }) =>
    size === 'large' ? '151px' : size === 'extraLarge' ? '370px' : unset ? 'unset' : height ? height : '87px'};
  align-items: center;
  padding: ${({ padding }) => (padding ? padding : '20px 20px')};
  position: relative;
  box-shadow: ${({ shadow }) => (shadow ? shadow : 'none')};
  margin-bottom: ${({ noMargin, half }) => (noMargin ? '0px' : half ? '12px' : '24px')};
`

const Dismiss = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  text-align: right;
  letter-spacing: 0.39998px;
  text-decoration-line: underline;
  text-transform: uppercase;
  cursor: pointer;
  color: #282932;
  padding: ${({ padding }) => (padding ? padding : '0px')};
  margin: ${({ margin }) => (margin ? margin : '0px 20px')};
`

const Grid = styled.div`
  display: grid;
  justify-items: ${({ left }) => (left ? 'left' : 'center')};
  align-items: center;
  margin: ${({ margin }) => (margin ? margin : '30px 0px 0px')};
`

const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: ${({ block }) => (block ? '100%' : '80%')};
  margin: ${({ margin }) => (margin ? margin : '75px 0px')};
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const Grid3 = styled.div`
  display: grid;
  grid-template-columns: ${({ grid }) => (grid ? grid : '1fr 1fr 1fr')};
  align-items: center;
  width: ${({ block, width }) => (block ? '100%' : width ? width : '80%')};
  margin: ${({ margin }) => (margin ? margin : '75px 0px')};
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const Box = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  margin: 6px 0px;
`

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
`

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
`

export const Span = styled.span`
  display: flex;
  flex-flow: row;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  font-size: ${({ size }) => (size ? size : '26px')};
  line-height: 45px;
  letter-spacing: 0.39998px;
  width: ${({ unset }) => (unset ? 'unset' : '100%')};
  margin: ${({ margin }) => (margin ? margin : 'unset')};
  margin-left: ${({ space }) => (space ? '6px' : 'unset')};
  align-items: ${({ top }) => (top ? top : 'center')};
  color: ${({ dark }) => (dark ? theme.text2 : '#FFFFFF')};
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`

export const DarkSpan = styled.span`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: ${({ large, small, medium }) => (large ? '24px' : small ? '15px' : medium ? '16px' : '18px')};
  padding-left: 3px;
  color: #333;
`

export const PaddingLeft = styled.span`
  padding-left: 10px;
`

export const MinWidth = styled.span`
  min-width: 10%;
`

export const ScheduleInterviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ width }) => (width ? width : '100%')};
  border: 1px solid #d8d8d8;
  margin-bottom: 10px;
`

export const ScheduleInterviewButtonContainer = styled.div`
  width: ${({ isMobile }) => (isMobile ? '25%' : '10%')};
  display: flex;
  justify-content: flex-end;
  padding: 10px;
`

const CalanderParagraphStyled = styled.p`
  padding: 15px 10px 0px 10px;
  width: ${({ isMobile }) => (isMobile ? '75%' : '90%')};
`

const TableHeading = styled.th`
  color: ${({ color }) => (color ? color : '#000')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'Roboto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : 'normal')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '500')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24.5px')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.4px')};
  text-transform: ${({ textTransform }) => (textTransform ? textTransform : 'uppercase')};
`

const TableData = styled.td`
  color: ${({ color }) => (color ? color : '#000')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : '')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-style: ${({ fontStyle }) => (fontStyle ? fontStyle : 'normal')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24.5px')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.4px')};
  text-transform: ${({ textTransform }) => (textTransform ? textTransform : 'uppercase')};
  ${({ $default }) => ($default ? 'cursor: pointer;' : '')}
  &:hover {
    ${({ $default }) => ($default ? 'color: darkred;' : '')}
  }
`

const HelpCenterContainer = styled.div`
  padding-left: 35px;
  display: flex;
  width: 100%;
  @media screen and (max-width: 600px) {
    padding-left: 0px;
  }
`

const DIV = styled.div`
  // Display
  display: ${({ display }) => (display ? display : 'block')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'stretch')};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : 'flex-start')};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : 'row')};
  flex-flow: ${({ flexFlow }) => (flexFlow ? flexFlow : 'row nowrap')};
  flex: ${({ flex }) => (flex ? flex : '0 1 auto')};
  box-sizing: ${({ boxSizing }) => (boxSizing ? boxSizing : 'content-box')};
  // Style
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};

  height: ${({ height }) => (height ? height : 'auto')};
  position: ${({ position }) => (position ? position : 'static')};
  background: ${({ background }) => (background ? background : 'transparent')};
  border: ${({ border }) => (border ? border : '#d8d8d8')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  padding: ${({ padding }) => (padding ? padding : '0px')};

  margin: ${({ margin }) => (margin ? margin : '0px')};
  word-break: ${({ wordBreak }) => (wordBreak ? wordBreak : 'normal')};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.15008px')};
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : 'normal')};
  overflow: ${({ overflow }) => (overflow ? overflow : 'visible')};
  box-shadow: ${({ boxShadow }) => (boxShadow ? boxShadow : 'none')};
  z-index: ${({ zIndex }) => (zIndex ? zIndex : 'auto')};
`

const TEXT = styled.p`
  width: ${({ width }) => (width ? width : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  position: ${({ position }) => (position ? position : 'static')};
  background: ${({ background }) => (background ? background : 'transparent')};
  border: ${({ border }) => (border ? border : 'none')};
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : '0px')};
  padding: ${({ padding }) => (padding ? padding : '')};
  margin: ${({ margin }) => (margin ? margin : '')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : '400')};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '24px')};
  word-break: ${({ wordBreak }) => (wordBreak ? wordBreak : 'normal')};
  cursor: ${({ cursor }) => (cursor ? cursor : 'default')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.15008px')};
  text-overflow: ${({ textOverflow }) => (textOverflow ? textOverflow : 'unset')};
  white-space: ${({ whiteSpace }) => (whiteSpace ? whiteSpace : 'normal')};
  overflow: ${({ overflow }) => (overflow ? overflow : 'visible')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  color: ${({ textColor }) => (textColor ? textColor : '#000000')};
`
const bounceAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0px);
  }
`

const TypingAnimation = styled.div`
  width: 100%;
  padding-left: 10px;
  span {
    width: 7px;
    height: 7px;
    background-color: #848891;
    display: inline-block;
    margin: 1px;
    border-radius: 50%;
    &:nth-child(1) {
      animation: ${bounceAnimation} 1s infinite;
    }
    &:nth-child(2) {
      animation: ${bounceAnimation} 1s infinite 0.2s;
    }
    &:nth-child(3) {
      animation: ${bounceAnimation} 1s infinite 0.4s;
    }
  }
`

module.exports = {
  DIV,
  TEXT,
  HeadingText,
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
  TypingAnimation,
  Title,
  ScheduleInterviewContainer,
  ScheduleInterviewButtonContainer,
  TableHeading,
  TableData,
  HelpCenterContainer,
  CalanderParagraphStyled
}
