
import styled from "styled-components";

const Heading_1 = styled.h2`
    color: #052205;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin: 0;
`;

const Heading_2 = styled.h2`
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin: 0;
    @media screen and (max-width: 600px){
        font-size: 20px;
    }
`;

const ParagraphTextStyled = styled.p`
    color: #6A7465;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin: 0;
    margin-yop: 0.375rem;
    height: fit-content;
    @media screen and (max-width: 600px){
        font-size: 20px;
    }
`;

const ReadMoreTextStyled = styled.p`
    color: #255EC6;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 600px){
        font-size: 20px;
    }
`;

const FaqStyled = styled.div`
  width: 348px;
  :not(:nth-child(7))::after{
    content : '';
    display : block;
    height : 1px;
    width : 350px;
    background: #D5DFD5;
    margin-top: 8px;
  }
  @media screen and (max-width: 600px){
    :not(:nth-child(7))::after{
        margin-top: 10px;
        margin-bottom: 9px;
    }
  }
  
`;

const FaqContainer = styled.div`
    display: flex;
    flex-direction: column
`;
const Wrapper = styled.div`
    display: flex; 
    flex-direction: column; 
    align-items: center;
    margin-top: 81px;
    @media screen and (max-width: 600px){
        margin-top: 41px;
    }
`;

const ContentContainer = styled.div`
    width: 840px;
    border-radius: 10px;
    background: #F2F7F2;
    padding: 15px;
    @media screen and (max-width: 600px){
        display: flex;
        flex-direction: column;
        width: 370px;
    }
`;

const ContentBody = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 600px){
        flex-direction: column;
    }
`;
const HeaderContainer = styled.div`
    width: 260px;
`;


export {
    Heading_1,
    Heading_2,
    ParagraphTextStyled,
    ReadMoreTextStyled,
    FaqStyled,
    FaqContainer,
    Wrapper,
    ContentContainer,
    ContentBody,
    HeaderContainer
}