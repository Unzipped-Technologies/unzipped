import styled, { css } from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    justify-content : center;
    width:100%;
`;

const HeaderContainer = styled.div`
    display:flex;
    justify-content: center;
`;

const Body = styled.div`
    display:flex;
    justify-content: center;
    width: 100%;
`;

const ContentHeading = styled.h3`
    color: #000;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 82.143% */
    letter-spacing: 0.15px;
    @media screen and (max-width: 600px){
        font-size: 38px;
    }
`;

const TextHeadingStyled = styled.span`
color: #000;
font-size: 22px;
font-style: normal;
font-weight: 500;
line-height: 23px;
letter-spacing: 0.15px;

@media screen and (max-width: 600px){
    display: none;
}
`;

const ImageContainer = styled.div`
    width: 147px; 
    height: 110px;
    border-radius: 10px;
    // background-size : cover;
    // background-position :center;
    // background-repeat: no-repeat;

    // img{
    //     width : 100%;
    //     display : block;
    // }
    @media screen and (max-width: 600px){
        display: none;
        background:red;
    }
`;

const ImageBox = styled.div`
    padding: 10px 5px;
    width: 127px;
    height: 100px;
`;

const ParagraphTextStyled = styled.span`
    color: #6A7465;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.15px;
    margin-top: 5px;

    @media screen and (max-width: 600px){
        font-size: 20px;
        margin: 0;
    }
`;

const BodyContent = styled.div`
    padding: 20;
    display: 'flex';
`;

const CreateProfileButtonStyled = styled.button`
    width: 108px;
    height: 29px;
    border-radius: 16px;
    background: #8EDE64;
    border: 1px solid rgba(196, 196, 196, 0.00);
    @media screen and (max-width: 600px){
        width: 155px;
        height: 41px;
        border-radius: 24px;
    }
`;

const CreateButtonTextStyled = styled.span`
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin-left : 0;
    @media screen and (max-width: 600px){
        font-size: 14px;
    }
`;

const TrustedByStyled = styled.span`
    color: #7A765C;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
`;

const ResponsiveText = styled.span`
    color: #000;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 35px;
    letter-spacing: 0.15px;
    display: none;
    @media screen and (max-width: 600px){
    display: block;
    width: fit-content;
}
`;

export {
    BodyContent,
    ContentHeading,
    Wrapper,
    HeaderContainer,
    Body,
    TextHeadingStyled,
    ImageContainer,
    ImageBox,
    ParagraphTextStyled,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    TrustedByStyled,
    ResponsiveText
}