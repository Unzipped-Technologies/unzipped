import styled from 'styled-components'

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #fff;
  width: 100%;
  justify-content: center;
  items-align: center;
  align-items: center;
  margin-top: 130px;
`

const HeaderTitleStyled = styled.h3`
  font-family: Roboto;
  font-size: 36px;
  font-weight: 500;
  line-height: 24.5px;
  letter-spacing: 0.39998000860214233px;
  text-align: left !important;
  padding-left: 5px;
  color: #000000;
`

const ParagraphStyled = styled.p`
  margin: 8px 0px;
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  font-family: ${({ fontFamily }) => (fontFamily ? fontFamily : 'Roboto')};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : '25px')};
  letter-spacing: ${({ letterSpacing }) => (letterSpacing ? letterSpacing : '0.39998000860214233px')};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
  color: ${({ color }) => (color ? color : '#000')};
  padding: ${({ padding }) => (padding ? padding : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  ${({ textStyle }) =>
    textStyle &&
    `
    &:before {
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      background: #000;
      border-radius: 50%;
      margin-left: 15px;
    }
  `}
  cursor: pointer;
  @media screen and (max-width: 600px) {
    line-height: 18px;
    margin: 10px 0px;
  }
`

// Project Details Section

const Container = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 100%;
`

const HeadingSection = styled.div`
  // background: red;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 15px;
  &:after {
    position: absolute;
    top: 100%;
    content: '';
    display: block;
    background: #bcc5d3;
    width: 100%;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

const TagStyled = styled.span`
  background: #d9d9d9;
  padding: 10px 35px;
  border-radius: 20px;
  font-size: 16px;
  margin-right: 10px;
  font-weight: 600;
  text-transform: uppercase;
  @media screen and (max-width: 600px) {
    padding: 10px 25px;
    font-size: 14px;
    margin-top: 10px;
  }
`

const ReviewSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  padding: 40px;
  border-radius: 10px;
  margin-top: 30px;
  width: 100%;
  @media screen and (max-width: 600px) {
    padding: 15px 20px;
  }
`

const ReviewContent = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 50px;
  // top: 40px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`

const ReviewSubmitSection = styled.div`
  display: flex;
  justify-content: center;
  background: transparent;
  width: 100%;
  position: relative;
  padding-top: 25px;
  &:before {
    position: absolute;
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    top: 0px;
    background: #bcc5d3;
  }
  @media screen and (max-width: 600px) {
    padding-bottom: 55px;
  }
`

const Items = styled.div`
  margin-top: 30px;
  @media screen and (max-width: 600px) {
    margin-top: 10px;
  }
`

export {
  ReviewContainer,
  HeaderTitleStyled,
  ParagraphStyled,
  Container,
  HeadingSection,
  TagStyled,
  ReviewSectionStyled,
  ReviewContent,
  ReviewSubmitSection,
  Items
}
