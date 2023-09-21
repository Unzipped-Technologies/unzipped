import styled from 'styled-components';


// Banner Section
const BannerWrapperStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    flex-direction: columns;
    @media screen and (max-width: 600px){
        display: none;
    }
`;

const BannerContainer = styled.div`
    width: 1020px;
    height: 373px;
    border-radius: 10px;
    background: rgba(142, 222, 100, 0.25);
    margin-top: 30px
`;

const BannerContent = styled.div`
    display: flex; 
    flexDirection: row;
`;

const BannerImageStyled = styled.div`
    width: 470px;
    height: 354px;
    border-radius: 15px;
    background: url('/img/Banner.png'), lightgray 50% / cover no-repeat;
`;

const BannerImageContainer = styled.div`
    width: 48.04%;
`;

const BannerParagraphContainer = styled.div`
    width:  51.96%;
    height: 354px;
    padding-left: 18px;
    display: flex;
    flex-direction: column;
`;

const BannerHeadingContainer = styled.h1`
    color: #14A800;
    font-size: 38px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0.15px;
    @media screen and (max-width: 600px){
        font-size: 47px;
        line-height: 50px;
        margin: 8px 0px 0px 21px;
    }
`;

const BannerTextContainer = styled.div``;

const BannerTextStyled = styled.span`
    font-size: 14px;
    font-style: normal;
    color: #000;
    font-weight: 500;
    line-height: 23px; /* 164.286% */
    letter-spacing: 0.15px;
`;

const CreateProfileButtonStyled = styled.button`
    width: 108px;
    height: 29px;
    border-radius: 16px;
    background: #8EDE64;
    border: 1px solid rgba(196, 196, 196, 0.00);
    @media screen and (max-width: 600px){
        width: 186px;
        height: 49px;
        border-radius: 24px;
        margin: 19px 0px 0px 21px;
    }
`;

const CreateButtonTextStyled = styled.span`
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px; /* 191.667% */
    letter-spacing: 0.15px;
    @media screen and (max-width: 600px){
        font-size: 16px;
    }
`;


const TrustedByTextStyled = styled.span`
    color: #7A765C;
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    @media screen and (max-width: 600px){
        font-size: 22px;
    }
`;

const BannerResponsiveWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const BannerResponsiveContent = styled.div`
    disply: flex;
    flex-direction: column;
`;

const BannerResponsiveContainer = styled.div`
    width: 377px;
    height: 478px;
    border-radius: 10px;
    background: rgba(142, 222, 100, 0.25);
    display: none;
    @media screen and (max-width: 600px){
        display: block;
    }
`;

const BannerResponsiveTextStyled = styled.p`
    color: #000;
    font-size: 23px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.15px;
    margin: 21px 0px 0px 21px;
`;

const ResponsiveTextStyled_2 = styled.p`
    color: #616F55;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin-left: 20px;
    &::before{
        content : '';
        display : block;
        height : 1px;
        width : 332px;
        background: #D5DFD5;
        margin-bottom: 8px;
        margin-top: 30px;
      }
`;

const ResponsiveTextStyled_4 = styled.p`
    color: #616F55;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    &::before{
        content : '';
        display : block;
        height : 1px;
        width : 482px;
        background: #D5DFD5;
        margin-bottom: 5px;
        margin-top: 25px;
    }
`;
const ResponsiveTextStyled_3 = styled.p`
    color: #616F55;
    font-size: 19px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin-left: 20px;
`;

const ResponsiveTextStyled_5 = styled.p`
    color: #616F55;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    margin-left: 20px;
`;

const ReviewTextStyled = styled.p`
    color: #616F55;
    font-family: Roboto;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    display: inline;
    margin-left: 20px;
`;

const ReviewTextStyledLg = styled.p`
    color: #616F55;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    width:150px;
    letter-spacing: 0.15px;
    display: flex;
    justify-content:center;
    align-items:center;
`;

export {
    BannerContainer,
    BannerWrapperStyled,
    BannerImageStyled,
    BannerImageContainer,
    TrustedByTextStyled,

    BannerParagraphContainer,
    BannerHeadingContainer,
    BannerTextContainer,
    BannerTextStyled,
    CreateProfileButtonStyled,
    CreateButtonTextStyled,
    BannerContent,

    BannerResponsiveWrapper,
    BannerResponsiveContent,
    BannerResponsiveContainer,
    BannerResponsiveTextStyled,
    ResponsiveTextStyled_2,
    ResponsiveTextStyled_3,
    ReviewTextStyled,
    ResponsiveTextStyled_4,
    ReviewTextStyledLg,
    ResponsiveTextStyled_5
}