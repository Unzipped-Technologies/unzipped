
import styled from "styled-components";
import { getFontStyled, FONT_SIZE, COLORS, LETTER_SPACING } from "../../ui/TextMaskInput/core/utilities";

const Heading = styled.h1`
    margin-bottom: ${FONT_SIZE.PX_16};
    ${getFontStyled({
    color: COLORS.black,
    fontSize: FONT_SIZE.PX_26,
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: FONT_SIZE.PX_23,
    letterSpacing: LETTER_SPACING,
})
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 120px;
    background: #BCA1E6;
    overflow:hidden;
    img{
        display : block;
        margin:auto;
        width:100%;
        object-fit:contain;
        object-position :center;
    }
    @media screen and (max-width: 600px){
        height: 225px;
        display:flex;
        justify-content:center;
        align-items:center;
        img{
            width:100%;
        }
    }
`;

const TitleTextStyled = styled.h5`
    color: #000;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 104.545% */
    letter-spacing: 0.15px;
    margin-left: 15px;
    @media screen and (max-width: 600px){
        font-size: 31px;
    }
`;

const LearnButtonStyled = styled.button`
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0.15px;
    display: block;
    margin-left: 15px;
    border-radius: 16px;
    border: 1px solid rgba(196, 196, 196, 0.00);
    background: #8EDE64;
    margin-bottom: 9px;
    @media screen and (max-width: 600px){
        height: 39px;
        width: 134px;
        font-size: 12px;
        border-radius: 24px;
        margin-top: 22px;
        margin-bottom: 13px;
    }
`;

const ContentTitleStyled = styled.h5`
    color: #000;
    font-size: 26px;
    font-style: normal;
    font-weight: 500;
    line-height: 23px; /* 88.462% */
    letter-spacing: 0.15px;
    margin-bottom: 22px;
    margin-top: 69px;
    @media screen and (max-width: 600px){
        font-size: 31px;
    }
`;

const CardWrapper = styled.div`
    justify-content: center;
    display: flex; 
    margin-bottom: 69px;
`;

const CartContainer = styled.div`
    width: 820px;
    @media screen and (max-width: 600px){
        width: 375px;
    }
`;
const ItemContainer = styled.div`
    width: 820px;
    display: flex;
    gap: 32px;
    @media screen and (max-width: 600px){
        width: 375px;
        flex-direction: column;
    }
`;

const CardItem = styled.div`
    width: 252px; 
    border-radius: 10px; 
    background-color: #F2F7F2; 
    overflow: hidden;
    @media screen and (max-width: 600px){
        width: 375px;
        height: 339px;
    }
`
export {
    Heading,
    ImageContainer,
    TitleTextStyled,
    LearnButtonStyled,
    ContentTitleStyled,
    CardWrapper,
    CartContainer,
    ItemContainer,
    CardItem
}